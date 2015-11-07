chrome.tabs.getSelected(null,function(tab) {
    var domain = extractDomainName(tab.url);
    
    vaultFilter(domain, "monkey",  function(err, data) {
      var html = "";
      for(var i in data) {
        html += matchTemplate(data[i])
      }
      $('#status').html(html);
      console.log(err,data);
    });
});


