var matchRowTemplate = _.template('<tr>\n' + 
                                  '  <td><a href="<%= url %>" target="_new" title="<%= notes %>"><%= domain %></a></td>\n'+
                                  '  <td><%= displayUsername %></td>\n'+
                                  '  <td><button class="clippy btn btn-primary btn-xs" data-clipboard-text="<%= username %>">Copy</button></td> \n'+
                                  '  <td>&nbsp;</td>\n' + 
                                  '  <td><button class="clippy btn btn-warning btn-xs" data-clipboard-text="<%= password %>">Copy</button></td>\n'+
                                  '  <td><button class="deletebutton btn btn-danger btn-xs" data-id="<%= _id %>" data-rev="<%= _rev %>">X</button>\n'+
                                  '  </td>\n'+                               
                                  '</tr>');
                                  
var emptyVaultTemplate = _.template('<div class="container"><div class="alert alert-info emptyvault">Your password vault is empty. <br /><br />Save your credentials by clicking the <span class="glyphicon glyphicon-plus" aria-hidden="true"></span> icon on the top bar.</div></div>');
                                  
var noMatchesTemplate = _.template('<div class="container"><div class="alert alert-info emptyvault">There are no matches for <b><%= domain %></b>.<br /><br /> Save your credentials by clicking the <span class="glyphicon glyphicon-plus" aria-hidden="true"></span> icon on the top bar.</div></div>');


var replicationStartedTemplate = _.template('<div class="alert alert-info repstatus">Starting replication</div>');                                  

var replicationChangeTemplate = _.template('<div class="alert alert-info repstatus">Change: <br /> <br /><%= info %></div>');                                  

var replicationCompleteTemplate = _.template('<div class="alert alert-success repstatus">Complete!</div>');                                  
                                  
var replicationErrorTemplate = _.template('<div class="alert alert-danger repstatus">Error: <br /> <br /><%= info %></div>');                                  
                                