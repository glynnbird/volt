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


var preprocessSearchResults = function(data, encryptionKey) {
  var retval = [];
  if (data && data.rows && data.rows.length > 0) {
    for(var i in data.rows) {
      data.rows[i].doc.username = decrypt(data.rows[i].doc.username, encryptionKey);
      data.rows[i].doc.password = decrypt(data.rows[i].doc.password, encryptionKey);
      if (!data.rows[i].doc.notes) {
        data.rows[i].doc.notes="";
      }
      retval.push(data.rows[i].doc)
    }
  } 
  return retval
}
var vaultFilter = function(domain, encryptionKey, callback) {
  var fun = function(doc) {
    if (!doc.deleted) {
      emit(doc.domain, null);
    }
  };
  vaultdb.query(fun, { key:domain, include_docs: true }, function(err, data) {
    var retval = preprocessSearchResults(data, encryptionKey);
    callback(err, retval);
  });
};

var vaultSize = function(callback) {
  
  var fun = function(doc) {
    if (typeof doc.deleted == "undefined" && doc._id != 'verify') {
      emit(null, 1);
    }
  };
  vaultdb.query({map:fun, reduce: "_count"}, {  }, function(err, data) {
    if (!err && data && data.rows && data.rows.length == 1) {
      console.log("count", data.rows[0].value);
      callback(null, data.rows[0].value);
    } else {
      callback(null, 0)
    }
  });
};

var vaultRemove = function(id, rev, callback) {
  vaultdb.get(id, function(err, doc) {
    if (err) return callback(err, null);
    // just mark it as deleted, don't actually delete it
    doc.deleted=true;
    vaultdb.put(doc,callback);
  });
};

var vaultSearch = function(searchterm, encryptionKey, callback) {
  vaultdb.search({
    query: searchterm,
    fields: ['domain', 'notes'],
    include_docs: true,
    filter: function (doc) {
      return doc.deleted !== true;
    }
  }, function(err, data) {
    console.log("search", err, data);
    var retval = preprocessSearchResults(data, encryptionKey);
    callback(err, retval);
    
  });
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
  
