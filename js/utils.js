var extractDomainName = function(url) {
  var domain = url;
  domain = domain.replace(/https?:\/\//,"");
  domain = domain.replace(/\/.*$/,"");
  return domain;  
};

var copyToClipboard = function(selector) {
  // Select the email link anchor text  
  var el = document.querySelector(selector);  
  var range = document.createRange();  
  range.selectNode(el);  
  window.getSelection().addRange(range);  

  try {  
    // Now that we've selected the anchor text, execute the copy command  
    var successful = document.execCommand('copy');  
    var msg = successful ? 'successful' : 'unsuccessful';  
    console.log('Copy email command was ' + msg);  
  } catch(err) {  
    console.log('Oops, unable to copy');  
  }  

  // Remove the selections - NOTE: Should use
  // removeRange(range) when it is supported  
  window.getSelection().removeAllRanges();  
};