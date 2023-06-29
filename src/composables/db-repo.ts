import loki from "lokijs";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { OpenAI } from "langchain/llms/openai";
import { Buffer } from "buffer";
import { PDFJS } from "pdf-parse/lib/pdf.js/v1.10.100/build/pdf.js";
import nlp from "wink-nlp";
import model from "wink-eng-lite-web-model";
import similarity from "wink-nlp/utilities/similarity";
import {Bow} from "wink-nlp";

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

function consoleLog(msg:string)
{
  console.log(msg);
}

function consoleAnyLog(obj)
{
  console.log(obj);
}

export function callChatGPT()
{
/*
  let winknlp = nlp(model);
  const doc1 = winknlp.readDoc("Two endocannabinoid receptors are known: CB1R, which is widely expressed in the brain, with lower levels observed in the peripheral circulation, and CB2R, which is mostly expressed in the peripheral circulation, predominantly in immune-related organs and cells.");
  const doc2 = winknlp.readDoc("Two endocannabinoid receptors are known: CB1R, which is widely\nexpressed in the brain, with lower levels observed in the peripheral\ncirculation, and CB2R, which is mostly expressed in the peripheral\ncirculation, predominantly in immune-related organs and cells.");
  const docX = winknlp.readDoc("In the brain, CB1Rs are widespread in the     hippocampus, cerebellum, cerebral cortex, basal ganglia, amyglada and     sensory motor sectors of the striatum; however, they are sparsely distributed     in the brainstem, diencephalon and spinal cord (Herkenham     et al., 1991; Glass et al., 1997; Van Waes et al., 2012; Chevaleyre et al.,     2006).");
  const docPage = winknlp.readDoc(pageText);
  const set1 = doc1.tokens().out(winknlp.its.value, winknlp.as.set);
  const set2 = doc2.tokens().out(winknlp.its.value, winknlp.as.set);
  const setX = docX.tokens().out(winknlp.its.value, winknlp.as.set);
  const bow1 = doc1.tokens().out(winknlp.its.value, winknlp.as.bow);
  const bow2 = doc2.tokens().out(winknlp.its.value, winknlp.as.bow);
  const bow3 = docPage.tokens().out(winknlp.its.value, winknlp.as.bow);
  const bowX = docX.tokens().out(winknlp.its.value, winknlp.as.bow);
  consoleAnyLog(similarity.set.oo(set1 as Set<string>, set2 as Set<string>));
  consoleAnyLog(similarity.set.oo(set1 as Set<string>, setX as Set<string>));
  consoleAnyLog(similarity.set.oo(set2 as Set<string>, setX as Set<string>));
  consoleAnyLog(similarity.bow.cosine(bow1 as Bow, bow2 as Bow));
  consoleAnyLog(similarity.bow.cosine(bow1 as Bow, bow3 as Bow));
  consoleAnyLog(similarity.bow.cosine(bow2 as Bow, bow3 as Bow));
  consoleAnyLog(similarity.bow.cosine(bow1 as Bow, bowX as Bow));
  consoleAnyLog(similarity.bow.cosine(bow2 as Bow, bowX as Bow));
  consoleAnyLog(similarity.bow.cosine(bowX as Bow, bow3 as Bow));
*/
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
  consoleLog("prepareResults for:"+queryContent);
  const vectors = getCurrentVectors();
  consoleAnyLog(vectors);
  const pages = getCurrentPages();
  consoleAnyLog(pages);
  const modelForChat = new OpenAI({ openAIApiKey: getKey("apiKey",""), modelName: "gpt-3.5-turbo", temperature: 0.9 });
  const modelForChat2 = new OpenAI({ openAIApiKey: getKey("apiKey",""), modelName: "gpt-3.5-turbo", temperature: 0.9 });
  var res1 = "CB1R is widely expressed in the brain, with lower levels observed in the peripheral circulation. (source)\
  CB1Rs are widespread in the hippocampus, cerebellum, cerebral cortex, basal ganglia, amygdala, and sensory motor sectors of the striatum. (source)\
  CB1Rs are sparsely distributed in the brainstem, diencephalon, and spinal cord. (source)\
  CB1Rs are mostly distributed presynaptically, with much higher density in GABA-ergic than in glutamatergic neurons. (source)\
  CB1Rs are most abundant in the hippocampal GABA-ergic interneurons. (source)";
  var res2 = "CB1R is widely expressed in the brain, with lower levels observed in the peripheral circulation.\
\
  CB1Rs are widespread in the hippocampus, cerebellum, cerebral cortex, basal ganglia, amyglada and sensory motor sectors of the striatum.\
  \
  CB1Rs are mostly distributed presynaptically, with much higher density in GABA-ergic than in glutamatergic neurons.\
  \
  The highest CB1R content is found on the GABA-ergic synapses of hippocampus CCK-positive interneurons.";
  
  for (let p = 0; p < pages.length; p++){
    const pageText = pages[p].text;
    consoleLog("callChatGPT 1");
    let res1 = await modelForChat.call(
      "Based on the below text, list cited sentences that answer : where is CB1R located in brain?. Do not generate any additional text.  \n\n" + pageText
    );
    consoleLog(res1);
    consoleLog("callChatGPT 2");
    let res2 = await modelForChat2.call(
      "Based on the below text, find sentences which deal with the subject: where is CB1R located in brain. Do not generate any additional text.  \n\n" + pageText
    );
    consoleLog(res2);
    break;
  };
  
  consoleLog("search");
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
  vectors.forEach(v => {
    for (let n = 0; n < items1.length(); n++){
      const doc1 = winknlp.readDoc(v.text);
      const doc2 = winknlp.readDoc(items1.itemAt(n).out());
      const set1 = doc1.tokens().out(winknlp.its.value, winknlp.as.set);
      const set2 = doc2.tokens().out(winknlp.its.value, winknlp.as.set);
      const simX = similarity.set.oo(set1 as Set<string>, set2 as Set<string>);
      if (simX > 0.40)
      {
        if (!resultA.includes(v.text))
        {
          resultA.push(v.text);
        }
      }
    }
    for (let n = 0; n < items2.length(); n++){
      const doc1 = winknlp.readDoc(v.text);
      const doc2 = winknlp.readDoc(items2.itemAt(n).out());
      const set1 = doc1.tokens().out(winknlp.its.value, winknlp.as.set);
      const set2 = doc2.tokens().out(winknlp.its.value, winknlp.as.set);
      const simX = similarity.set.oo(set1 as Set<string>, set2 as Set<string>);
      if (simX > 0.40)
      {
        if (!resultB.includes(v.text))
        {
          resultB.push(v.text);
        }
      }
    };
  });
  consoleAnyLog(resultA);
  consoleAnyLog(resultB);
  let intersection = resultA.filter(x => resultB.includes(x));
  consoleAnyLog(intersection);
  vectors.forEach(v => {
    if (intersection.includes(v.text))
    {
      v.score = 1;
      result.push(v);
    }
  });    
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