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