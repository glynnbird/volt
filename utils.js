var extractDomainName = function(url) {
  var domain = url;
  domain = domain.replace(/https?:\/\//,"");
  domain = domain.replace(/\/.*$/,"");
  return domain;  
}