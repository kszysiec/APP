import loki from "lokijs";
import { VectorStorage } from "vector-storage";

class KeyData {
  name: string;
  value: string;
}

class TopicData
{
  id : number;
  title: string;
  query: string;
}

type DB = IDBDatabase;
type Store = IDBObjectStore;

const queryLabelLength = 100;

var db_keys = initKeys();
var db_topics = initTopics();

export function getAllTopics() {
  var topics = db_topics.getCollection<TopicData>('topics');
  return topics.find();
}

function initTopics()
{
  var db = new loki('ra.db', 
  { 
    autoload: true,
    autosave: true, 
    autosaveInterval: 2000            
  }
  );
  var topics = db.getCollection<TopicData>('topics');
  if (!topics)
  {
      topics = db.addCollection<TopicData>('topics', {
      unique: <["id"]>["id"],
      indices: <["id"]>["id"],
      autoupdate: true
  });
  }
  return db;
}

export function setTopicQuery(key:number, query:string) {
  var topics = db_topics.getCollection<TopicData>('topics');
  var data = topics.by('id', key);
  if (data)
  {
    data.query = query;
    data.title = substringQuery(query);
    topics.update(data);
  }
  else
  {
    topics.insert( { id : key, query: query, title : substringQuery(query) } );
  }
}

export function getCurrentTopicQuery() {
  var currentId = getKey("currentTopic");
  if (currentId)
  {
    var topics = db_topics.getCollection<TopicData>('topics');
    var data = topics.by('id', currentId);
    if (data)
    {
        return data.query;
    }
  }
  return "brak bieżącego tematu";
}

export function getCurrentTopicTitle() {
  var currentId = getKey("currentTopic");
  if (currentId)
  {
    var topics = db_topics.getCollection<TopicData>('topics');
    var data = topics.by('id', currentId);
    if (data)
    {
        return data.title;
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

export function SaveFile(file: File, fileName: string)
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
  var db = new loki('ra.db', 
  { 
    autoload: true,
    autosave: true, 
    autosaveInterval: 2000            }
  );
  var keys = db.getCollection<KeyData>('keys');
  if (!keys)
  {
    keys = db.addCollection<KeyData>('keys', {
      unique: <["name"]>["name"],
      indices: <["name"]>["name"],
      autoupdate: true
  });
  }
  return db;
}

export function setKey(key:string, value:string) {
  var keys = db_keys.getCollection<KeyData>('keys');
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

export function getKey(key:string) {
  var keys = db_keys.getCollection<KeyData>('keys');
  var data = keys.by('name', key);
  if (data)
  {
      return data.value;
  }
  return null;
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