var matchRowTemplate = _.template('<tr>\n' + 
                                  '  <td><%= domain %></td>\n'+
                                  '  <td><%= username %> <button class="clippy btn btn-primary btn-xs" data-clipboard-text="<%= username %>">Copy</button>\n'+
                                  '  </td>\n'+
                                  '  <td><button class="clippy btn btn-warning btn-xs" data-clipboard-text="<%= password %>">Copy</button>\n'+
                                  '  </td>\n'+    
                                  '  <td><button class="deletebutton btn btn-danger btn-xs" data-id="<%= _id %>" data-rev="<%= _rev %>">X</button>\n'+
                                  '  </td>\n'+                               
                                  '</tr>');
                                  
var emptyVaultTemplate = _.template('<div class="container"><div class="alert alert-info emptyvault">Your password vault is empty. <br /><br />Save your credentials by clicking the <span class="glyphicon glyphicon-plus" aria-hidden="true"></span> icon on the top bar.</div></div>');
                                  
var noMatchesTemplate = _.template('<div class="container"><div class="alert alert-info emptyvault">There are no matches for <b><%= domain %></b>.<br /><br /> Save your credentials by clicking the <span class="glyphicon glyphicon-plus" aria-hidden="true"></span> icon on the top bar.</div></div>')                                  
                                  