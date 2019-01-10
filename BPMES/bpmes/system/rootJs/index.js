(function () {
    function index() {
		initIndexList = function () {
			var sysBel = request.QueryString ("sysBel");
			if(!checkNotEmpty(sysBel)){
				sysBel='1';
			}
		    var ajaxParam = {
                 url: '/iPlant_ajax',
                 dataType: 'JSON',
                 data: {
                     IFS: 'D000046',
                     SYS_BEL:sysBel
                 },
                 successCallBack:function(data){
                	 //加载列表
                	 var tbl = $('#tableList'),userName = $.cookie('UserName');
                     var dataList =  data.RESPONSE[0].RESPONSE_DATA;
                     var childData=[],str;
                     $.each(dataList, function(i, item){
                    	 if(item.attr3==1){
                    		 var chd = item.children;
                    		 $.each(chd, function(j, child){
                    			 if(child.children.length==0){
                    				 if(child.attr3==1){
                        				 childData.push(child);
                        			 }
                    			 }else{
                    				 var schd = child.children;
                    				 $.each(schd, function(n, schild){
                    					 if(schild.attr3==1){
                            				 childData.push(schild);
                            			 }
                    				 })
                    			 }
		          			 });
                    	 }
                     });
                     $.each(childData, function(i, item){
                    	 var lastNum = 0;
                    	 if(childData.length>16){
                    		 lastNum = 15;
                    	 }else{
                    		 lastNum = childData.length-1;
                    	 }
                    	 if(i<16){
                    		 if(i==0){
          			   			str="<tbody><tr><td><div class='display_"+item.attr2+" display' style=''><a href='#'  onclick=addTabIndex('"+item.sT_C_NM+"','"+item.attr1+"?userName="+userName+"&cdId="+item.sT_C_CD+"')><span style='margin-left:140px'>"+item.sT_C_NM+"</span></a></div></td>";
          			   		 }else if(i%4===0 && i!=0){
          			   			str = str+"</tr><tr><td><div class='display_"+item.attr2+" display' style=''><a href='#' onclick=addTabIndex('"+item.sT_C_NM+"','"+item.attr1+"?userName="+userName+"&cdId="+item.sT_C_CD+"')><span style='margin-left:140px'>"+item.sT_C_NM+"</span></a></div></td>";
          			   		 }else if(lastNum ==i){
          			   			str = str+"<td><div class='display_"+item.attr2+" display' style=''><a href='#' onclick=addTabIndex('"+item.sT_C_NM+"','"+item.attr1+"?userName="+userName+"&cdId="+item.sT_C_CD+"')><span style='margin-left:140px'>"+item.sT_C_NM+"</span></a></div></td></tr></tbody>";
          			   		 }else{
          			   			str = str+"<td><div class='display_"+item.attr2+" display' style=''><a href='#' onclick=addTabIndex('"+item.sT_C_NM+"','"+item.attr1+"?userName="+userName+"&cdId="+item.sT_C_CD+"')><span style='margin-left:140px'>"+item.sT_C_NM+"</span></a></div></td>";
          			   		 }
                    	 }
                     })
                     tbl.append(str);
//                     console.log(tbl.html());
//                     console.log(str);
                 }
            };
            iplantAjaxRequest(ajaxParam);
		},
		addTabIndex = function (subtitle, url) {
			var tabs = parent.$('#tabs'),mainPanle = parent.$('#mainPanle');
			
			if (tabs.tabs('exists', subtitle)) {
				if(subtitle=='首页'){
					refreshTabs(tabs.tabs('getTab',subtitle),url);
				}
				tabs.tabs('select', subtitle);
				return;
			}
			//控制展开10项
			var allTabs = tabs.tabs('tabs');
			if(allTabs.length>9){
				$.messager.confirm('提示', '您已经打开了'+allTabs.length+'张页签，继续打开会影响页面响应速度，您确定打开?', function (r) {
	              	 if(r==true){
	              		if (!tabs.tabs('exists', subtitle)) {
	        		        tabs.tabs('add', {
	        		            title: subtitle,
	        		            content: createFrame(url),
	        		            closable: true,
	        		            width: mainPanle.width(),
	        		            height: mainPanle.height()
	        		        });
	        		        tabs.tabs({
	        		            border: false,
	        		            onSelect: function (title) {
	        		                var pp = tabs.tabs("getSelected");
	        		                var tabObj = pp.panel("options").tab;    // 相应的 tab 对象
	        		                var iframe = $(pp.panel('options').content);
	        		                var src = iframe.attr('src');
	        		                if (src != undefined) {
	        		                    tabs.tabs('update', { tab: pp, options: { content: createFrame(src) } });
	        		                }
	        		            },
	        		            
	        		        });
	        		        /*tabs.tabs('bindDblclick', function(index, title){
	        		        	 tabs.tabs('close',index);
	        		        });*/
	        		    }
	        		    tabs.tabs('select', subtitle);
	              	 }else{
	              		 return;
	              	 }
	               });
			}else{
				if (!tabs.tabs('exists', subtitle)) {
			        tabs.tabs('add', {
			            title: subtitle,
			            content: createFrame(url),
			            closable: true,
			            selected: false,
			            width: mainPanle.width(),
			            height: mainPanle.height()
			        });
			        tabs.tabs({
			            border: false,
			            onSelect: function (title) {
			                var pp = tabs.tabs("getSelected");
			                var tabObj = pp.panel("options").tab;    // 相应的 tab 对象
			                var iframe = $(pp.panel('options').content);
			                var src = iframe.attr('src');
			                if (src != undefined) {
			                    tabs.tabs('update', { tab: pp, options: { content: createFrame(src) } });
			                }
			            }
			        });
			        /*tabs.tabs('bindDblclick', function(index, title){
			        	tabs.tabs('close',index);
			        });*/
			    }
			    tabs.tabs('select', subtitle);
			}
		}
    }
    index.prototype = {
        init: function () {
            $(function () {
            	initIndexList();
            });
        }
    }
    var indexPage = new index();
    indexPage.init();
})();
