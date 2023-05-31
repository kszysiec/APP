import loki from "lokijs";
import { VectorStorage } from "vector-storage";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { Buffer } from "buffer";
import { PDFJS } from "pdf-parse/lib/pdf.js/v1.10.100/build/pdf.js";
import nlp from "wink-nlp";
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

type DB = IDBDatabase;
type Store = IDBObjectStore;

const queryLabelLength = 100;

var db = initDB(); 

initKeys();
initTopics();

var vectorStore:VectorStorage = null;

PDFJS.workerSrc = "pdf.worker.js";
globalThis.Buffer = Buffer;

export function getAllTopics() {
  var topics = db.getCollection<TopicData>('topics');
  return topics.find();
}

function initDB()
{
  var db = new loki('ra.db', 
  { 
    autoload: true,
    autosave: true, 
    autosaveInterval: 1000            
  }
  );
  return db;
}

function initTopics()
{
  var topics = db.getCollection<TopicData>('topics');
  if (!topics)
  {
      topics = db.addCollection<TopicData>('topics', {
      unique: <["id"]>["id"],
      indices: <["id"]>["id"],
      autoupdate: true
    });
  }
}

function setTopicQuery(query:string) {
   var topics = db.getCollection<TopicData>('topics');
   if (topics)
   {
       var newDoc = topics.insert( { id:topics.maxId+1, query: query, title : substringQuery(query), files: null } );
       return newDoc.id;
  }
}

function setTopicFileName(key:number, fileName:string) {
  var topics = db.getCollection<TopicData>('topics');
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
  var currentId = getKey("currentTopic");
  console.log("getCurrentTopicFiles:"+currentId);
  if (currentId)
  {
    var topics = db.getCollection<TopicData>('topics');
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

export function getCurrentTopicQuery() {
  var currentId = getKey("currentTopic");
  console.log("getCurrentTopicQuery:"+currentId);
  if (currentId)
  {
    var topics = db.getCollection<TopicData>('topics');
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
  var currentId = getKey("currentTopic");
  console.log("getCurrentTopicTitle:"+currentId);
  if (currentId)
  {
    var topics = db.getCollection<TopicData>('topics');
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
  if (searchText && searchText!="" && getKey("apiKey")!="")
  {
    console.log("prepareNewTopic:"+searchText);
    var key = setTopicQuery(searchText);
    setKey("currentTopic", key.toString());
    return key;
  }
  return 0;
}

export async function prepareNewTopicFile(key:number, file:File, fileName: string)
{
  if (key > 0 && file && getKey("apiKey")!="")
  {
    if (vectorStore==null)
    {
      vectorStore = new VectorStorage({ openAIApiKey: getKey("apiKey") });
    }
    console.log("prepareNewTopicFile:"+fileName);
    saveFile(file, fileName);
    setTopicFileName(key, fileName);
    await prepareFileContent(key, file, fileName);
  }
}

async function prepareFileContent(key:number, file:File, fileName: string)
{
  if (key > 0 && file && getKey("apiKey")!="")
  {
    const loader = new PDFLoader(file);
    const winknlp = nlp(model);
    var doc = await loader.load();
    var pre3:string = "";
    var pre2:string = "";
    var pre1:string = "";
    var text:string = "";
    var post1:string = "";
    var post2:string = "";
    var post3:string = "";
    //doc.forEach(async element => {
      var element = doc.at(0);
      const nlpdoc = winknlp.readDoc(element.pageContent.toString());
      const items = nlpdoc.sentences();
      var itemsLength = 100;
      if (items.length() < itemsLength)
      {
        itemsLength = items.length();
      }
      for (let n = 0; n < itemsLength; n++){
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
        await PrepareVector(vectorStore, text, fileName, key, pre1, pre2, pre3, post1, post2, post3);
      };
    //});
  }
}

async function PrepareVector(vectorStore:VectorStorage, text:string, fileName:string,key: number, pre1:string, pre2:string, pre3:string, post1:string, post2:string, post3:string)
{
  await new Promise(resolve => setTimeout(resolve, 1000));
  await vectorStore.addText(text, {filename: fileName, key: key, pre1:pre1, pre2:pre2, pre3:pre3, post1:post1, post2:post2, post3:post3 });
}

export function saveFile(file: File, fileName: string)
{

  let request: IDBOpenDBRequest = indexedDB.open("ra.files", 1);

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
  var keys = db.getCollection<KeyData>('keys');
  if (!keys)
  {
    keys = db.addCollection<KeyData>('keys', {
      unique: <["name"]>["name"],
      indices: <["name"]>["name"],
      autoupdate: true
  });
  }
}

export function setKey(key:string, value:string) {
  console.log("setKey:" + key + ":" + value);
  var keys = db.getCollection<KeyData>('keys');
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

export function getKey(key:string) {
  var keys = db.getCollection<KeyData>('keys');
  if (keys)
  {
    var data = keys.by('name', key);
    if (data)
    {
        return data.value;
    }
  }
  return "";
}

export async function vectorTest()
{
  const vectorStore = new VectorStorage({ openAIApiKey: getKey("apiKey") });
  await vectorStore.addText("Anielka jeszcze nie śpi", {additionalInfo: "zdanie1"});
  await vectorStore.addText("Krzysiek jeszcze nie gotuje zup", {additionalInfo: "zdanie2"});
  await vectorStore.addText("Mały Staś bawi się klockami", {additionalInfo: "zdanie3"});
  const wynik = await vectorStore.similaritySearch({
    query: "Babcia przygotowuje obiad",
  });
  console.log(wynik);
}