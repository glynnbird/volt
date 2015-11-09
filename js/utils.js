// extract a domain name from a URL
var extractDomainName = function(url) {
  var domain = url;
  domain = domain.replace(/https?:\/\//,"");
  domain = domain.replace(/\/.*$/,"");
  return domain;  
};

// get the currently seleted Chrome tab
var getCurrentTabUrl = function(callback) {
  chrome.tabs.getSelected(null,function(tab) {
    callback(null, tab.url);
  });
};

var hashPassword = function(password) {
  var salt = "8db685bf71c15f37c71cc792d02e0e75";
  var key256Bits = CryptoJS.PBKDF2(password, salt, { keySize: 256/32 , iterations: 1000});
  console.log("key",key256Bits.toString())
  return key256Bits.toString();
  
//  return CryptoJS.SHA256(salt+password).toString()
}