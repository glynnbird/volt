chrome.tabs.getSelected(null,function(tab) {
    var domain = extractDomainName(tab.url);
    
    vaultFilter(domain, function(err, data) {
      $('#status').html(JSON.stringify(data));
      console.log(err,data);
    });
    console.log(tablink);
});
