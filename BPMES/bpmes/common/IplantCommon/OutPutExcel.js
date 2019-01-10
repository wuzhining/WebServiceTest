(function(){
    getExplorer=function() {  
    	var u_agent = navigator.userAgent; 
    	var browser_name='Failed to identify the browser'; 
    	if(u_agent.indexOf('Firefox')>-1){ 
    		browser_name='Firefox'; 
    	}
    	else if(u_agent.indexOf('Chrome')>-1){
    		browser_name='Chrome'; 
    	}
    	else if(u_agent.indexOf('Trident')>-1&&u_agent.indexOf('rv:11')>-1){ 
    		browser_name='IE11'; 
    	}
    	else if(u_agent.indexOf('MSIE')>-1&&u_agent.indexOf('Trident')>-1){
    		browser_name='IE(8-10)'; 
    	}
    	else if(u_agent.indexOf('MSIE')>-1){ 
    		browser_name='IE(6-7)'; 
    	}
    	else if(u_agent.indexOf('Opera')>-1){ 
    		browser_name='Opera'; 
    	}
    	else{
    		browser_name+=',info:'+u_agent; 
    	} 
    	return browser_name;
    	
    	/*var browserName=window.navigator.userAgent.toLowerCase();  
    	alert(browserName);
    	if(/msie/i.test(browserName) && !/opera/.test(browserName)){  
    	        alert("IE");  
    	        return ;  
    	}
    	else if(/firefox/i.test(browserName)){  
    	       alert("Firefox");  
    	        return 'Firefox';  
    	}
    	else if(/chrome/i.test(browserName) && /webkit/i.test(browserName) && /mozilla/i.test(browserName)){  
    	        alert("Chrome");
    	        return 'Chrome' ;  
    	}
    	else if(/opera/i.test(browserName)){  
    	       alert("Opera");
    	       return 'Opera'
    	       return ;  
        }
    	else if(/iPad/i.test(browserName)){  
    		alert("ipad");
    		return 'ipad';
        }
    	else if(/webkit/i.test(browserName) &&!(/chrome/i.test(browserName) && /webkit/i.test(browserName) && /mozilla/i.test(browserName))){  
    	        alert("Safari");  
    	        return 'Safari';  
    	}
    	else{  
    	    return '';
    	}*/
    	
    };
    exportData=function(tableid,execlName) {  
    	var browserType=getExplorer().toLowerCase();
    	if(/ie/i.test(browserType))  
        {  
            var curTbl = document.getElementById(tableid);  
            var oXL = new ActiveXObject("Excel.Application");  
            var oWB = oXL.Workbooks.Add();  
            var xlsheet = oWB.Worksheets(1);  
            xlsheet.Columns.ColumnWidth = 20;
            var sel = document.body.createTextRange();  
            sel.moveToElementText(curTbl);  
            //sel.select();  
            sel.execCommand("Copy");  
            xlsheet.Paste();  
            oXL.Visible = true;  

            try {  
                var fname = oXL.Application.GetSaveAsFilename("Excel.xls", "Excel Spreadsheets (*.xls), *.xls"); 
            } catch (e) {  
                print("Nested catch caught " + e);  
            } finally {  
            	oWB.SaveAs(fname);  
                oWB.Close(savechanges = false);  
                oXL.Quit();  
                oXL = null;  
                idTmr = window.setInterval("Cleanup();", 1);  
            }  

        }  
        else  
        {  
           tableToExcel(tableid);  
        }  
    };
   
    createTable=function(tableId,execlName,gridId,reqData) {
          var ajaxParam={
        		data:reqData,
        	    successCallBack:function(data){
        	    	var exportResData=data.RESPONSE["0"].RESPONSE_DATA;
        	    	if(exportResData.length==0){
        	    		$.messager.alert('该条件范围内没有记录');
        	    		return;
        	    	}
        	    	var mybody = document.getElementsByTagName("body")[0];
                	mytable= document.createElement("table");
                	mytable.id=tableId;
                	header_row = document.createElement("tr");
                	var fields=$("#"+gridId).datagrid('getColumnFields',false);
                	var panel = $("#"+gridId).datagrid("getPanel");  
                	var headerTds =panel.find(".datagrid-view2 .datagrid-header .datagrid-header-inner table tr:first-child").children();
                	headerTds.each(function (i, obj) {
                	   var col = $("#"+gridId).datagrid('getColumnOption',fields[i]);
                	   if (!col.hidden && !col.checkbox)
                	   {
                		   header_cell = document.createElement("td");
               	           headertext = document.createTextNode(col.title);
               	           header_cell.appendChild(headertext);
               	           header_row.appendChild(header_cell);
                	   }
                	})
                	mytable.appendChild(header_row);
                	$.each(exportResData,function(i,item){
                		mycurrent_row = document.createElement("tr");
                		headerTds.each(function (i, obj) {
                     	   var col = $("#"+gridId).datagrid('getColumnOption',fields[i]);
                     	   if (!col.hidden && !col.checkbox)
                     	   {
                     			  var colValue=item[col.field];
                     			  if(colValue==null){colValue=' '}
                     			  else colValue=item[col.field].toString();
                     			  mycurrent_cell = document.createElement("td");
                     	     	  currenttext = document.createTextNode(colValue);
                        		  mycurrent_cell.appendChild(currenttext);
                        		  mycurrent_row.appendChild(mycurrent_cell);
                            }
                     	})
                     	mytable.appendChild(mycurrent_row);
                	});
                	mybody.appendChild(mytable);
                	exportData(tableId);
                }
        	}
        	iplantAjaxRequest(ajaxParam);
        }
})();
var tableToExcel = (function() {  
                 var uri = 'data:application/vnd.ms-excel;base64,',  
                 template = '<html><head><meta charset="utf-8"/><style type="text/css">.table-c table{border-right:1px solid #b1b5bb;border-bottom:1px solid #b1b5bb;width:200px} .table-c table td{border-left:1px solid #b1b5bb;border-top:1px solid #b1b5bb;text-align:left}</style></head><body><div class="table-c"><table border="0" cellspacing="0" cellpadding="0">{table}</table></div></body></html>',  
                 base64 = function(s) { return window.btoa(unescape(encodeURIComponent(s))) },  
                 format = function(s, c) {  
                          return s.replace(/{(\w+)}/g,function(m, p){ 
                	             return c[p]; 
                          }) 
                 }
                 return function(table, name) {  
            	        if (!table.nodeType) table = document.getElementById(table)
            	        var ctx ={
            		        worksheet: name || 'Worksheet', 
            		    table: table.innerHTML
                }
               //alert(format(template, ctx));
               window.location.href = uri + base64(format(template, ctx))  
    }  
})();