import loki from "lokijs";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { OpenAI } from "langchain/llms/openai";
import { Buffer } from "buffer";
import { PDFJS } from "pdf-parse/lib/pdf.js/v1.10.100/build/pdf.js";
import nlp from "wink-nlp";
import model from "wink-eng-lite-web-model";
import similarity from "wink-nlp/utilities/similarity";

class KeyData {
  name: string;
  value: string;
}

class TopicData
{
  id : number;
  title: string;
  query: string;
  files: string[];
}

export class CardData
{
  id :string;
  key : number;
  score: number;
  color: string;
  pre2: string;
  pre1: string;
  text: string;
  post1: string;
  post2: string;
  filename: string;
  page : number;
}

export class VectorMetaData
{
  id :string;
  filename: string;
  key: number;
  pre1: string; 
  pre2: string;
  pre3: string;
  text: string;
  post1:string;
  post2:string;
  post3:string;
  page: number;
  score: number;
}

export class PageMetaData
{
  id :string;
  filename: string;
  key: number;
  text: string;
  page: number;
}

type DB = IDBDatabase;
type Store = IDBObjectStore;

const queryLabelLength = 100;

var db:loki = null; 

var keys_collection_name = "keys.v2.0.0";
var topics_collection_name = "topics.v2.0.0";
var vectors_collection_name = "vectors.v2.0.0";
var pages_collection_name = "pages.v2.0.0";

PDFJS.workerSrc = "pdf.worker.js";
globalThis.Buffer = Buffer;

databaseInitialize();

function consoleLog(msg:string)
{
  console.log(msg);
}

function consoleAnyLog(obj)
{
  console.log(obj);
}

export function getAllTopics() {
  var topics = db.getCollection<TopicData>(topics_collection_name);
  return topics.find();
}

function initDB()
{
  consoleLog("initDB");
  if (db == null)
  {
    db = new loki('ra.db', 
    { 
      autoload: true,
      autosave: true, 
      autosaveInterval: 1000            
    }
    );
  }
}

export function databaseInitialize() {
  initDB();
  initKeys();
  initTopics();
  initVectors();
  initPages();
} 

function initVectors()
{
  consoleLog("initVectors");
  var vectors = db.getCollection<VectorMetaData>(vectors_collection_name);
  if (vectors == null)
  {
    vectors = db.addCollection<VectorMetaData>(vectors_collection_name, {
      unique: <["id"]>["id"],
      indices: <["id"]>["id"],
      autoupdate: true
    });
  }
}

function SetVectorMetaData(metadatas:VectorMetaData[]) {
  consoleLog("SetVectorMetaData");
  consoleAnyLog(metadatas);
  var vectors = db.getCollection<VectorMetaData>(vectors_collection_name);
  if (vectors)
  {
    vectors.insert(metadatas);
  }
}

function updateVectorMetaData(metadata:VectorMetaData)
{
  consoleLog("updateVectorMetaData");
  consoleAnyLog(metadata);
  var vectors = db.getCollection<VectorMetaData>(vectors_collection_name);
  if (vectors)
  {
    var data = vectors.findOne({id: metadata.id});
    data.score = metadata.score;
    vectors.update(data);
  }
}

export function getCurrentVectors() {
  var currentId = getKey("currentTopic",null);
  consoleLog("getCurrentVectors:"+currentId);
  var vectors = db.getCollection<VectorMetaData>(vectors_collection_name);
  return vectors.find({ key : { $eq: parseInt(currentId) } });
}

function initPages()
{
  consoleLog("initPages");
  var pages = db.getCollection<PageMetaData>(pages_collection_name);
  if (pages == null)
  {
    pages = db.addCollection<PageMetaData>(pages_collection_name, {
      unique: <["id"]>["id"],
      indices: <["id"]>["id"],
      autoupdate: true
    });
  }
}

function SetPageMetaData(metadatas:PageMetaData[]) {
  consoleLog("SetPageMetaData");
  consoleAnyLog(metadatas);
  var pages = db.getCollection<PageMetaData>(pages_collection_name);
  if (pages)
  {
    pages.insert(metadatas);
  }
}

export function getCurrentPages() {
  var currentId = getKey("currentTopic",null);
  consoleLog("getCurrentPages:"+currentId);
  var vectors = db.getCollection<PageMetaData>(pages_collection_name);
  return vectors.find({ key : { $eq: parseInt(currentId) } });
}

function initTopics()
{
  consoleLog("initTopics");
  var topics = db.getCollection<TopicData>(topics_collection_name);
  if (topics == null)
  {
      topics = db.addCollection<TopicData>(topics_collection_name, {
      unique: <["id"]>["id"],
      indices: <["id"]>["id"],
      autoupdate: true
    });
  }
}

function setTopicQuery(query:string) {
   var topics = db.getCollection<TopicData>(topics_collection_name);
   if (topics)
   {
       var newDoc = topics.insert( { id:topics.maxId+1, query: query, title : substringQuery(query), files: null } );
       return newDoc.id;
  }
}

function setTopicFileName(key:number, fileName:string) {
  var topics = db.getCollection<TopicData>(topics_collection_name);
  if (topics)
  {
    var data = topics.by('id', key);
    if (data)
    {
      if (data.files == null)
      {
        data.files = [];
      }
      data.files.push(fileName);
      topics.update(data);
    }
  }
}

export function getCurrentTopicFiles() {
  var currentId = getKey("currentTopic",null);
  consoleLog("getCurrentTopicFiles:"+currentId);
  if (currentId)
  {
    var topics = db.getCollection<TopicData>(topics_collection_name);
    if (topics)
    {
      var data = topics.by('id', currentId);
      if (data)
      {
          return data.files;
      }
    }
  }
  return [];
}

export function setCurrentTopicQuery(query:string) {
  var currentId = getKey("currentTopic",null);
  consoleLog("setCurrentTopicQuery:"+query);
  if (currentId)
  {
    var topics = db.getCollection<TopicData>(topics_collection_name);
    if (topics)
    {
      var data = topics.by('id', currentId);
      if (data)
      {
          data.query = query;
          data.title = substringQuery(query);
          topics.update(data);
      }
    }
  }
}

export function getCurrentTopicQuery() {
  var currentId = getKey("currentTopic",null);
  consoleLog("getCurrentTopicQuery:"+currentId);
  if (currentId)
  {
    var topics = db.getCollection<TopicData>(topics_collection_name);
    if (topics)
    {
      var data = topics.by('id', currentId);
      if (data)
      {
          return data.query;
      }
    }
  }
  return "brak bieżącego tematu";
}

export function getCurrentTopicTitle() {
  var currentId = getKey("currentTopic",null);
  consoleLog("getCurrentTopicTitle:"+currentId);
  if (currentId)
  {
    var topics = db.getCollection<TopicData>(topics_collection_name);
    if (topics)
    {
      var data = topics.by('id', currentId);
      if (data)
      {
          return data.title;
      }
    }
  }
  return "brak bieżącego tematu";
}

function substringQuery(query:string)
{
  if (query.length < queryLabelLength)
  {
    return query;
  }
  else
  {
    return query.substring(0, queryLabelLength-3)+"...";
  }
}

export function prepareNewTopic(searchText:string)
{
  if (searchText && searchText!="" && getKey("apiKey","")!="")
  {
    consoleLog("prepareNewTopic:"+searchText);
    var key = setTopicQuery(searchText);
    setKey("currentTopic", key.toString());
    return key;
  }
  return 0;
}

export async function prepareNewTopicFile(key:number, file:File, fileName: string)
{
  if (key > 0 && file && getKey("apiKey","")!="")
  {
    consoleLog("prepareNewTopicFile:"+fileName);
    saveFile(file, fileName);
    setTopicFileName(key, fileName);
    await prepareFileContent(key, file, fileName);
  }
}

async function prepareFileContent(key:number, file:File, fileName: string)
{
  if (key > 0 && file && getKey("apiKey","")!="")
  {
    consoleLog("prepareFileContent:" + fileName);
    let loader = new PDFLoader(file);
    let winknlp = nlp(model);
    let doc = await loader.load();
    let pre3:string = "";
    let pre2:string = "";
    let pre1:string = "";
    let text:string = "";
    let post1:string = "";
    let post2:string = "";
    let post3:string = "";
    var metadatas:VectorMetaData[];
    metadatas= [];
    var pages:PageMetaData[];
    pages= [];
    for (let p = 0; p < doc.length; p++){
      const pageText = doc[p].pageContent.toString();
      const nlpdoc = winknlp.readDoc(pageText);
      consoleLog("prepareFileContent page:" + p.toString());
      const items = nlpdoc.sentences();
      pages.push({id: fileName+":"+(p+1).toString(), text:pageText, page:p+1, filename:fileName, key:key });
      consoleLog("prepareFileContent sentences count:" + items.length().toString());
      for (let n = 0; n < items.length(); n++){
        pre3="";
        pre2="";
        pre1="";
        post1="";
        post2="";
        post3="";
        if (n > 2) {
          pre3 = items.itemAt(n-3).out();
        }
        if (n > 1) {
          pre2 = items.itemAt(n-2).out();
        }
        if (n > 0) {
          pre1 = items.itemAt(n-1).out();
        }
        text = items.itemAt(n).out();
        if (n < items.length()-1) {
          post1 = items.itemAt(n+1).out();
        }
        if (n < items.length()-2) {
          post2 = items.itemAt(n+2).out();
        }
        if (n < items.length()-3) {
          post3 = items.itemAt(n+3).out();
        }
        metadatas.push({id: (p+1).toString()+":"+(n+1).toString(), score:0, text:text, page:p+1, filename:fileName, key:key, pre1:pre1, pre2:pre2, pre3:pre3, post1:post1, post2:post2, post3:post3 });
      };
    }
    SetVectorMetaData(metadatas);
    SetPageMetaData(pages);
  }
}

async function wait(ms:number)
{
  await new Promise(resolve => setTimeout(resolve, ms));
}

export function saveFile(file: File, fileName: string)
{

  let request: IDBOpenDBRequest = indexedDB.open("ra.files.v2.0.0", 2);

  request.onsuccess = function(event:Event) {
    let db: DB = (event.target as IDBOpenDBRequest).result;
    let tx: IDBTransaction = db.transaction("Files", "readwrite");
    let store: Store = tx.objectStore("Files");
    let blob = new Blob([file], {type: file.type});
    store.put(blob, fileName);
  }

  request.onupgradeneeded = function(event: IDBVersionChangeEvent) {
    let db: DB = (event.target as IDBOpenDBRequest).result;
    if (!db.objectStoreNames.contains("Files")) {
      db.createObjectStore("Files");
    }
  }

}

function initKeys()
{
  consoleLog("initKeys");
  var keys = db.getCollection<KeyData>(keys_collection_name);
  if (keys == null)
  {
    keys = db.addCollection<KeyData>(keys_collection_name, {
      unique: <["name"]>["name"],
      indices: <["name"]>["name"],
      autoupdate: true
    });
  }
}

export function setKey(key:string, value:string) {
  consoleLog("setKey:" + key + ":" + value);
  var keys = db.getCollection<KeyData>(keys_collection_name);
  if (keys)
  {
    var data = keys.by('name', key);
    if (data)
    {
      data.value = value;
      keys.update(data);
    }
    else
    {
      keys.insert( { name : key, value: value } );
    }
  }
}

export function getKey(key:string,defaultVal:string) {
  consoleLog("getKey:"+key+":"+defaultVal);
  var keys = db.getCollection<KeyData>(keys_collection_name);
  if (keys)
  {
    var data = keys.by('name', key);
    if (data)
    {
      if (!data.value || data.value =="")
      {
        consoleLog("getKey:"+key+":"+defaultVal);
        return defaultVal;
      }
      else
      {
        consoleLog("getKey:"+key+":"+data.value);
        return data.value;
      }
    }
  }
  return defaultVal;
}

export async function prepareResults()
{
  var queryContent = getCurrentTopicQuery();
  consoleLog("prepareResults for ["+ queryContent + "]");
  var vectors:VectorMetaData[];
  vectors = getCurrentVectors();
  consoleAnyLog(vectors);
  const pages = getCurrentPages();
  consoleAnyLog(pages);
  let requestA = getKey("requestA","");
  let requestB = getKey("requestB","");
  let tempA = parseFloat(getKey("temperatureA","0.9"));
  let tempB = parseFloat(getKey("temperatureB","0.9"));
  let apiKey = getKey("apiKey","");
  let requestType = getKey("requestType","A+B");
  let apiModel = getKey("apiModel","gpt-3.5-turbo");
  const modelForChat = new OpenAI({ openAIApiKey: apiKey, modelName: apiModel, temperature: tempA });
  const modelForChat2 = new OpenAI({ openAIApiKey: apiKey, modelName: apiModel, temperature: tempB });
  var res1 = "";
  var res2 = "";  
  let pageLimit = parseInt(getKey("pageLimit","1"));
  if (pageLimit>pages.length)
  {
    pageLimit = pages.length;
  }
  for (let p = 0; p < pageLimit; p++){

    const pageText = pages[p].text;
    
    if (requestType=="A+B" || requestType=="A-B" || requestType=="A")
    {
      consoleLog("callChatGPT request A");
      let queryA = requestA.replace("[query]", queryContent);
      consoleLog("request A: ");
      consoleLog(queryA);
      res1 = await modelForChat.call(
        queryA+"\n\n" + pageText
      );
      consoleLog("response A: ");
      consoleLog(res1);
    }

    if (requestType=="A+B" || requestType=="A-B" || requestType=="B")
    {
      consoleLog("callChatGPT request B");
      let queryB = requestB.replace("[query]", queryContent);
      consoleLog("request B: ");
      consoleLog(queryB);
      res2 = await modelForChat.call(
        queryB+"\n\n" + pageText
      );
      consoleLog("response B: ");
      consoleLog(res2);
    }

  };
  
  consoleLog("analyzing responses");
  var result:VectorMetaData[];
  result = [];
  var resultA:string[];
  resultA = [];
  var resultB:string[];
  resultB = [];
  let winknlp = nlp(model);
  const docRes1 = winknlp.readDoc(res1);
  const items1 = docRes1.sentences();
  const docRes2 = winknlp.readDoc(res2);
  const items2 = docRes2.sentences();

  let similarityLevel = parseFloat(getKey("similarityLevel","0.6"));

  vectors.forEach(v => {
    if (requestType=="A+B" || requestType=="A-B" || requestType=="A")
    {
      for (let n = 0; n < items1.length(); n++){
        const doc1 = winknlp.readDoc(v.text);
        const doc2 = winknlp.readDoc(items1.itemAt(n).out());
        const set1 = doc1.tokens().out(winknlp.its.value, winknlp.as.set);
        const set2 = doc2.tokens().out(winknlp.its.value, winknlp.as.set);
        const simX = similarity.set.oo(set1 as Set<string>, set2 as Set<string>);
        if (simX > similarityLevel)
        {
          v.score = simX;
          updateVectorMetaData(v);  
          if (!resultA.includes(v.text))
          {
            resultA.push(v.text);
          }
        }
      }
    }

    if (requestType=="A+B" || requestType=="A-B" || requestType=="B")
    {
      for (let n = 0; n < items2.length(); n++){
        const doc1 = winknlp.readDoc(v.text);
        const doc2 = winknlp.readDoc(items2.itemAt(n).out());
        const set1 = doc1.tokens().out(winknlp.its.value, winknlp.as.set);
        const set2 = doc2.tokens().out(winknlp.its.value, winknlp.as.set);
        const simX = similarity.set.oo(set1 as Set<string>, set2 as Set<string>);
        if (simX > similarityLevel)
        {
          v.score = simX;
          updateVectorMetaData(v);  
          if (!resultB.includes(v.text))
          {
            resultB.push(v.text);
          }
        }
      }
    }
  });

  if (requestType=="A+B" || requestType=="A-B" || requestType=="A")
  {
    consoleLog("result A:");
    consoleAnyLog(resultA);
  }
  if (requestType=="A+B" || requestType=="A-B" || requestType=="B")
  {
    consoleLog("result B:");
    consoleAnyLog(resultB);
  }

  if (requestType=="A+B")
  {
    let intersection = resultA.concat(resultB);
    vectors = getCurrentVectors();
    vectors.forEach(v => {
      if (intersection.includes(v.text))
      {
        result.push(v);
      }
    });    
  }
  if (requestType=="A-B")
  {
    let intersection = resultA.filter(x => resultB.includes(x));
    vectors = getCurrentVectors();
    vectors.forEach(v => {
      if (intersection.includes(v.text))
      {
        result.push(v);
      }
    });    
  }
  if (requestType=="A")
  {
    let intersection = resultA;
    vectors = getCurrentVectors();
    vectors.forEach(v => {
      if (intersection.includes(v.text))
      {
        result.push(v);
      }
    });    
  }
  if (requestType=="B")
  {
    let intersection = resultB;
    vectors = getCurrentVectors();
    vectors.forEach(v => {
      if (intersection.includes(v.text))
      {
        result.push(v);
      }
    });    
  }

  consoleLog("result final:");
  consoleAnyLog(result);

  return result;
}

export function canUsingThisApp()
{
  let accessKey = getKey("accessKey","");
  let keys = [
    "930477ba","930479ea","93047aee","93047eae","93047fa8","930480e8","930481c4","930482aa","9304837c","9304866a","93048750","9304882c","930488f4","930489da","93048ab6","93048b9c","93048fca","930490ba","93049196","93049268","93049344","93049420","93049592","93049664","930498d0","930499b6","93049ad8","93049c2c","93049fa6","9304a096","9304a17c","9304a24e","9304a348","9304a424","9304a4f6","9304a5c8","9304a870","9304a956","9304aa3c","9304ab22","9304abf4","9304ace4","9304af96","9304b07c","9304b158","9304b22a","9304b310","9304b400","9304b4dc","9304b5b8"
  ];
  if (keys.includes(accessKey))
  {
    return true;
  }
  return false;
}