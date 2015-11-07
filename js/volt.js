chrome.tabs.getSelected(null,function(tab) {
    var domain = extractDomainName(tab.url);
    
    vaultFilter(domain, "monkey",  function(err, data) {
      var html = '<table class="table">';
      html += '<tr><th>Site</th><th>Username</th><th>Password</th></tr>\n';
      for(var i in data) {
        html += matchRow(data[i]);
      }
      html += "</table>";
      $('#status').html(html);
      new Clipboard('.clippy');
      console.log(err,data);
    });

});
