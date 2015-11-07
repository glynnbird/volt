var sessiondb = new PouchDB('session');
var currentSession = null;


var loadSession = function(callback) {
  if (currentSession) {
    return callback(null, currentSession);
  }
  // get the latest session document
  var fun = function(doc) {
    emit(doc.ts, null);
  };
  sessiondb.query(fun, { include_docs: true, limit:1, descending: true}, function(err, data) {
    if(!err && data && data.rows && data.rows[0] && data.rows[0].doc) {
      currentSession = data.rows[0].doc;
      callback(null, data.rows[0].doc);
    } else {
      callback(null, null);
    }
  });  
};

var saveSession = function(s, callback) {
  s.ts = new Date().getTime();
  currentSession = s;
  sessiondb.post(s, callback);
};

var clearSession = function(callback) {
  currentSession = null;
  sessiondb.destroy(callback);
}
/*
saveSession({a:1, b:2}, function(err, data) {
  console.log(err, data);
});

loadSession(function(e,d) {
  console.log(e, d);
  
});
*/
