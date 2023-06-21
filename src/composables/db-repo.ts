import loki from "lokijs";
import { VectorStorage } from "vector-storage";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { Buffer } from "buffer";
import { PDFJS } from "pdf-parse/lib/pdf.js/v1.10.100/build/pdf.js";
import nlp, { WinkMethods } from "wink-nlp";
import model from "wink-eng-lite-web-model";

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
}

export class VectorMetaData
{
  filename: string;
  key: number;
  pre1: string; 
  pre2: string;
  pre3: string;
  post1:string;
  post2:string;
  post3:string;
}

type DB = IDBDatabase;
type Store = IDBObjectStore;

const queryLabelLength = 100;

var db:loki = null; 

var vectorStore:VectorStorage = null;

var keys_collection_name = "keys.v2.0.0";
var topics_collection_name = "topics.v2.0.0";

PDFJS.workerSrc = "pdf.worker.js";
globalThis.Buffer = Buffer;

export function getAllTopics() {
  var topics = db.getCollection<TopicData>(topics_collection_name);
  return topics.find();
}

function consoleLog(msg:string)
{
  console.log(msg);
}

function consoleAnyLog(obj)
{
  console.log(obj);
}

export function initDB()
{
  consoleLog("initDB");
  if (db == null)
  {
    db = new loki('ra.db', 
    { 
      autoload: true,
      autoloadCallback : databaseInitialize,
      autosave: true, 
      autosaveInterval: 1000            
    }
    );
  }
}

async function databaseInitialize() {
  initTopics();
  initKeys();
  await wait(3000);
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

export async function setCurrentTopicQuery(query:string) {
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

export async function getCurrentTopicQuery() {
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

export async function getCurrentTopicTitle() {
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

export async function prepareNewTopic(searchText:string)
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
    if (vectorStore == null)
    {
        vectorStore = new VectorStorage({ openAIApiKey: getKey("apiKey",""), openaiModel: getKey("apiModel","text-embedding-ada-002") });
    }
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
    let apiPages = getKey("apiPages","1");
    let sentencesCount = 0;
    let pagesLimit = Number.parseInt(apiPages);
    if (pagesLimit > doc.length)
    {
      pagesLimit = doc.length;
    }
    if (Number.parseInt(apiPages) == 0)
    {
      pagesLimit = doc.length;
    }
    for (let p = 0; p < pagesLimit; p++){
      const nlpdoc = winknlp.readDoc(doc[p].pageContent.toString());
      consoleLog("prepareFileContent page:" + p.toString());
      const items = nlpdoc.sentences();
      consoleLog("prepareFileContent sentences count:" + items.length().toString());
      var texts:string[];
      var metadatas:object[];
      texts = [];
      metadatas= [];
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
        texts.push(text);
        metadatas.push({filename: fileName, key: key, pre1:pre1, pre2:pre2, pre3:pre3, post1:post1, post2:post2, post3:post3 });
        sentencesCount = sentencesCount + 1;
        if (sentencesCount == 50 || n == items.length()-1)
        {
          consoleLog("prepareFileContent PrepareVectors");
          var apiTimeout = getKey("apiTimeout","20000");
          await wait(Number.parseInt(apiTimeout));
          PrepareVectors(vectorStore, texts, metadatas);
          texts=[];
          metadatas=[];
          sentencesCount=0;
        }
      };
    }
  }
}

async function wait(ms:number)
{
  await new Promise(resolve => setTimeout(resolve, ms));
}

async function PrepareVectors(vectorStore:VectorStorage, texts:string[], metadatas: object[])
{
  await vectorStore.addTexts(texts, metadatas);
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
  initKeys();
  var keys = db.getCollection<KeyData>(keys_collection_name);
  if (keys)
  {
    var data = keys.by('name', key);
    if (data)
    {
      if (!data.value || data.value =="")
      {
        return defaultVal;
      }
      else
      {
        return data.value;
      }
    }
  }
  return defaultVal;
}

export async function prepareResults()
{
  if (vectorStore == null)
  {
      vectorStore = new VectorStorage({ openAIApiKey: getKey("apiKey",""), openaiModel: getKey("apiModel","text-embedding-ada-002") });
  }
  var paramK = getKey("paramK","8");
  var queryContent = await getCurrentTopicQuery();
  consoleLog("prepareResults for:"+queryContent);
  const res = await vectorStore.similaritySearch({
    query: queryContent,
    k:Number.parseInt(paramK)
  });
  consoleAnyLog(res);
  return res;
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