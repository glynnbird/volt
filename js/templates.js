var matchRow = _.template('<tr>\n' + 
                          '  <td><%= domain %></td>\n'+
                          '  <td><%= username %> <button class="clippy btn btn-primary btn-xs" data-clipboard-text="<%= username %>">Copy</button>\n'+
                          '  </td>\n'+
                          '  <td><button class="clippy btn btn-warning btn-xs" data-clipboard-text="<%= password %>">Copy</button>\n'+
                          '  </td>\n'+                                
                          '</tr>');
