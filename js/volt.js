
// render the main page
var showMainPage = function() {
  $('#addformpanel').addClass("hidden");
  $('#loginpanel').addClass("hidden");
  $('#cloudpanel').addClass("hidden");
  $('#status').html("");
  $('#status').removeClass("hidden");
  $('#topnav').removeClass("hidden");
  
  vaultSize(function(err, size) {
    console.log(err, size);
    $('#vaultsizebadge').html(size);
  })
  
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
};

var showLoginPanel = function() {
  $('#addformpanel').addClass("hidden");
  $('#loginpanel').removeClass("hidden");
  $('#cloudpanel').addClass("hidden");
  $('#status').addClass("hidden");
  $('#topnav').addClass("hidden");
  
  // clear the form
  $('#name').val("");
  $('#password').val("");
};



// when the page has loaded
$( document ).ready(function() {
  
  loadSession(function(err, session) {
    if (err || session == null) {
      showLoginPanel();
    } else {
      showMainPage();
    }
    
  });

  
  // when the add button is pressed
  $("#addbutton").bind("click", function() {
    
    // remove the main page and show the add form
    $('#addformpanel').removeClass("hidden");
    $('#loginpanel').addClass("hidden");
    $('#cloudpanel').addClass("hidden");
    $('#status').addClass("hidden");
    $('#topnav').addClass("hidden");
    
    // pre-populate the form
    $('#url').val("");
    $('#username').val("");
    $('#password').val("");
    getCurrentTabUrl(function(err, url) {
      $('#url').val(url);
    });
  });
  
  // when the cloud button is pressed
  $("#cloudbutton").bind("click", function() {
    
    // remove the main page and show the add form
    $('#cloudpanel').removeClass("hidden");
    $('#loginpanel').addClass("hidden");
    $('#addformpanel').addClass("hidden");
    $('#status').addClass("hidden");
    
    // clear the form
    $('#cloudurl').val("");
  });
  
  // when the logout button is pressed
  $("#logoutbutton").bind("click", function() {
    
    // kill the session
    clearSession(function(err, data) {
       showLoginPanel();
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
  
  // when the cloud form submit button is pressed
  $('#cloudform').bind("submit", function(event) {
    event.preventDefault();
    
    var url = $('#cloudurl').val();
    vaultdb.replicate.to(url)
     .on("change", function(info) { console.log("change",info)})
     .on("complete", function(info){ console.log("complete",info)})
     .on("error", function(err) { console.log("error",err)});
  });
  
  // when the login form submit button is pressed
  $('#loginform').bind("submit", function(event) {
    event.preventDefault();
    
    var name = $('#loginname').val();
    var password = $('#loginpassword').val();
    
    vaultSize(function(err, vaultsize) {
      if(err) return;
      
      // if there are secrets already stored
      if (vaultsize > 0) {
        
        // read back the verification document to see if we can decrypt it correctly
        vaultRead("verify", password, function(err, data) {
          console.log("verifydoc",err, data);
          if (!err && data && data.password && data.password == "volt") {
            saveSession({ name: name, password: password}, function(err, data) {
              showMainPage();
            });
          }
        })
      } else {
        // create an entry in the vault encrypted with this password
        vaultWrite({_id: "verify", domain:"test.com", url:"http://test.com", password:"volt"}, password, function(err, data) {
          saveSession({ name: name, password: password}, function(err, data) {
            showMainPage();
          });
        });
        
        
      }
      
      console.log(err, vaultsize);
    })
    

    console.log(name,password);
  });
  
});


