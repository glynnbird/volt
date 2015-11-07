
// render the main page
var showMainPage = function() {
  $('#addformpanel').addClass("hidden");
  $('#status').html("");
  $('#status').removeClass("hidden");
  
  // calculate the current tab in view
  getCurrentTabUrl(function(err, url) {
    if(err || !url) return;
    
    // extract the domain name from the url
    var domain = extractDomainName(url);
  
    // find all vault entries that match this domain name
    vaultFilter(domain, "monkey",  function(err, data) {
      
      // render as a table of passwords
      var html = '<table class="table">';
      html += '<tr><th>Site</th><th>Username</th><th>Password</th></tr>\n';
      for(var i in data) {
        html += matchRow(data[i]);
      }
      html += "</table>";
      $('#status').html(html);
      
      // enable clipboard integration
      new Clipboard('.clippy');
    });
  
  });
}




$( document ).ready(function() {
  
  showMainPage();
  
  // when the add button is pressed
  $("#addbutton").bind("click", function() {
    
    // remove the main page and show the add form
    $('#addformpanel').removeClass("hidden");
    $('#status').addClass("hidden");
    
    // pre-populate the form
    $('#url').val("");
    $('#username').val("");
    $('#password').val("");
    getCurrentTabUrl(function(err, url) {
      $('#url').val(url);
    });
  });
  
  // when the add form submit button is pressed
  $('#addform').bind("submit", function(event) {
    event.preventDefault();
    
    // create a document to add to the database
    var doc = {
      url: $('#url').val(),
      domain: "",
      username: $('#username').val(),
      password: $('#password').val(),
    }
    doc.domain = extractDomainName(doc.url);
    
    // write it
    vaultWrite(doc,'monkey', function(err,data) {
      
      // re-render the main page
      showMainPage();
    });
  });
  
  
});


