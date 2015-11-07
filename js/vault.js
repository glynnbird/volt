var vaultdb = new PouchDB('vault');

var encrypt = function(str, key) {
  return "" + CryptoJS.AES.encrypt(str, key);
};

var decrypt = function(str, key) {
  return CryptoJS.AES.decrypt(str, key).toString(CryptoJS.enc.Utf8).toString(CryptoJS.enc.Utf8);
};

var vaultWrite = function(doc, encryptionKey, callback) {
  doc.username = encrypt(doc.username, encryptionKey);
  doc.password = encrypt(doc.password, encryptionKey);
  if (doc._id) {
    vaultdb.get(doc, function(err, data) {
      if (!err) {
        doc._rev = data._rev;
      }
      vaultdb.put(doc, callback);
    });
  } else {
    vaultdb.post(doc, callback);
  }
};

var vaultRead = function(id, encryptionKey, callback) {
  vaultdb.get(id, function(err, doc) {
    if (err) return callback(err, null);
    doc.username = decrypt(doc.username, encryptionKey);
    doc.password = decrypt(doc.password, encryptionKey);
    callback(null, doc)
  });
};

var vaultFilter = function(domain, encryptionKey, callback) {
  var fun = function(doc) {
    emit(doc.domain,null);
  };
  vaultdb.query(fun, { key:domain, include_docs: true }, function(err, data) {
    var retval = [];
    if (!err && data && data.rows) {
      for(var i in data.rows) {
        data.rows[i].doc.username = decrypt(data.rows[i].doc.username, encryptionKey);
        data.rows[i].doc.password = decrypt(data.rows[i].doc.password, encryptionKey);
        retval.push(data.rows[i].doc)
      }
    } 
    callback(err, retval);
  });
};

var vaultSize = function(callback) {
  vaultdb.info(function(err, data) {
    console.log("vaultsize", err, data);
    callback(err, data.doc_count);
  })
};

/*
vaultdb.destroy(function(err, data) {
  vaultWrite({ username: "glynn.bird@gmail.com", password: "poolshifter", url: "http://twitter.com", domain: "twitter.com"},
    key, function(err, data) {
      vaultRead(data.id, key, function(err, doc) {
        console.log("unencrypted",err, doc);
      })
    });
  
});
*/


/*var key = "monkey";


/*vaultFilter("amazon.com", function(err, data) {
  console.log(err, data);
});  */
  
