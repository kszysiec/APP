import loki from "lokijs";

export function getAll() {
  var db = new loki('topics.db', 
  { 
    autoload: true,
    autosave: true, 
    autosaveInterval: 4000            }
  );
  var topics = db.addCollection('topics', { indices: ['id','title','current'] });
  return topics.find();
}

export function init() {
  var db = new loki('topics.db', 
  { 
    autoload: true,
    autosave: true, 
    autosaveInterval: 4000            }
  );
  db.removeCollection('topics');
  var topics = db.addCollection('topics', { indices: ['id','title','current'] });
  var topic1 = topics.insert( { id : 1, title: 'temat 1', current: 0 } );
  var topic2 = topics.insert( { id : 2, title: 'temat 2', current: 0 } );
  var topic3 = topics.insert( { id : 3, title: 'temat 3', current: 0 } );
  var topic4 = topics.insert( { id : 4, title: 'temat 4', current: 0 } );
}

export function setCurrent(id) {
  var db = new loki('topics.db', 
  { 
    autoload: true,
    autosave: true, 
    autosaveInterval: 4000            }
  );
  var topics = db.addCollection('topics', { indices: ['id','title','current'] });

  return;
}