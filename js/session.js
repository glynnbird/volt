var sessiondb = new PouchDB('session');

var loadSession = function(callback) {
  // get the latest session document
  var fun = function(doc) {
    emit(doc.ts, null);
  };
  sessiondb.query(fun, { include_docs: true, limit:1, descending: true}, function(err, data) {
    if(!err && data && data.rows && data.rows[0].doc) {
      callback(null, data.rows[0].doc);
    } else {
      callback(null, null);
    }
  });  
};

var saveSession = function(s, callback) {
  s.ts = new Date().getTime();
  sessiondb.post(s, callback);
}
/*
saveSession({a:1, b:2}, function(err, data) {
  console.log(err, data);
});

loadSession(function(e,d) {
  console.log(e, d);
  
});
*/
