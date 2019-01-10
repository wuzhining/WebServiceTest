/* 启动时加载 */
/*
 */
(function() {
	function dWorkFlow() {
		initGridData = function() {
			queryFlow();
		},
		bindGridData = function(reqData, jsonData) {
			var grid = {
				name : 'dWorkFlow_tab',
				dataType : 'json',
				columns : [[{field : 'proDefId',title : '流程ID',width : 150,align : 'center'},
				            {field : 'depId',title : '部署ID',width : 120,align : 'center'},
				            {field : 'proDefName',title : '名称',width : 200,align : 'center'},
				            {field : 'proDefKey',title : 'KEY',width : 100,align : 'center'},
				            {field : 'version',title : '版本号',width : 60,align : 'center'},
				            //{field : 'proXml',title : 'XML',width : 200,align : 'center',formatter:function(value,row,index){return "<a href='"+getRootPath_web()+"/model?method=loadByDeployment&processDefinitionId="+row.proDefId+"&resourceType=xml' target='_blank' style='text-decoration:none;'>"+value+"</a>"}},
				            {field : 'proXml',title : 'XML',width : 200,align : 'center',formatter:function(value,row,index){return "<a href='#' style='text-decoration:none;' onclick=showInfo('"+row.proDefId+"','xml') >"+value+"</a>"}},
				            {field : 'proDiagram',title : '图片',width : 200,align : 'center',formatter:function(value,row,index){return "<a href='#' style='text-decoration:none;' onclick=showInfo('"+row.proDefId+"','image') >"+value+"</a>"}},
				            {field : 'depTime',title : '部署时间',width : 200,align : 'center'},
				            {field : 'suspended',title : '是否挂起',width : 100,align : 'center',
				            	formatter : function(value, row, index) {
									if (value=="true") {return "<a href='#' style='text-decoration:none;' onclick=statusFlow('"+row.proDefId+"','active') >激活</a>";
									} else { return "<a href='#' style='text-decoration:none;' onclick=statusFlow('"+row.proDefId+"','suspend') >挂起</a>";
							}}},
				            {field : 'code',title : '',width : 100,align : 'center',hidden:true}
						]],
				onDblClickRow: function(index,row){
					
			    }
			}
			initGridView(reqData, grid);
			$('#dWorkFlow_tab').datagrid('loadData', jsonData);
		},
		
		queryFlow = function(){
			var dgrid = $('#dWorkFlow_tab').datagrid('options');
			if (!dgrid)
				return;
			var reqData = {
				IFS : 'ACT0000',
				ACT_TYPE:'listProcessList',
				pageIndex: 0,
				pageSize: dgrid.pageSize
			}
			reqGridData('/iPlant_ajax', 'dWorkFlow_tab', reqData);
		},
		
		showInfo = function(id,type){
			var url = getRootPath_web() + '/model?method=loadByDeployment&processDefinitionId=' + id+"&resourceType="+type;
			var title='',iWidth=720,iHeight=600;//弹出窗口的宽度高度;
			//获得窗口的垂直位置 
            var iTop = (window.screen.availHeight - 30 - iHeight) / 2; 
            //获得窗口的水平位置 
            var iLeft = (window.screen.availWidth - 10 - iWidth) / 2; 
			if(type=='xml'){
				title='显示XML';
			}else if(type=='image'){
				title='显示图片';
			}
            window.open(url, title, 'height=' + iHeight + ',,innerHeight=' + iHeight + ',width=' + iWidth + ',innerWidth=' + iWidth + ',top=' + iTop + ',left=' + iLeft + ',status=no,toolbar=no,menubar=no,location=no,resizable=no,scrollbars=0,titlebar=no'); 
            //addTabIndex(title, url);
		},
		
		showFile = function (){
    	   // 以下即为完整客户端路径
    	   var df = document.getElementById('txtDeployFile'),fileName = $('#showFileName');
    	   if(df.files.length>0){
    		   file = df.files[0],fileName = file.name,fileType=file.type;
    		   var temp = [];
    		   if(fileName.indexOf('.')>0){
    			   temp=fileName.split('.');
    			   strSrc = temp[temp.length-1];
    			   if(strSrc.localeCompare('zip')===0 || strSrc.localeCompare('bar') === 0 || strSrc.localeCompare('xml') === 0 || strSrc.localeCompare('bpmn20.xml') === 0|| strSrc.localeCompare('bpmn') === 0){
    				   fileName.html(fileName);
    			   }else{
    				   fileName.html("<font color=red>提示:请选择要支持的文件类型!</font>");
    			   }
    		   }
    	   }
       },

       removeDeploy = function() {
			var modelId,moveIds = [],num = 0,IFServerNo='ACT0000';
			var checkedItems = $('#dWorkFlow_tab').datagrid('getSelections');
			$.each(checkedItems, function(index, item) {
				moveIds.push(item.moveid);
				num++;
			});
			if(num != 1) {
				$("#showMessageInfo").html('<font color=red>提示:请选择一条数据进行删除!</font>');
				//$.messager.alert('提示', '请选择一条数据进行修改');
				return false;
			}
			var row = $("#dWorkFlow_tab").datagrid("getSelected");
			if(row) {
				var delCnt=0;
	            $.messager.confirm('确认框', '您确定要删除您所选择的数据?', function (r) {
	            	 if(r==true){
	            		 $.each(checkedItems, function (index, item) {
	            			 delCnt++;
	                    	 var ajaxParam = {
	                                 url: '/iPlant_ajax',
	                                 dataType: 'JSON',
	                                 data: {
	                                	ACT_TYPE:'deleteDeployment',
	                                	deploymentId:row.depId,
	                 					IFS: IFServerNo
	                                 },
	                                 successCallBack:function(data){
	                                 	 if(delCnt==checkedItems.length){
		                              	 	if(data.RESPONSE["0"].RESPONSE_HDR.MSG_CODE=='0'){
		                              	 		/*$.messager.alert('提示', '删除成功!','',function(){
			                                	    initGridData();
			                                     });*/
		                              	 		$("#showMessageInfo").html('<font color=red>提示:删除成功!</font>');
		                              	 		initGridData();
		                              	 	}else{
		                              	 		$("#showMessageInfo").html('<font color=red>提示:删除失败,此数据正在使用!</font>');
		                              	 		//$.messager.alert('提示','删除失败,此数据正在使用!')
		                              	 	}
		                                     
		                            	 }
	                         		},
	                         		errorCallBack:function(data){
	                         			if(delCnt==checkedItems.length){
	                         				$("#showMessageInfo").html('<font color=red>提示:删除失败,服务器无响应!</font>');
	                         				//$.messager.alert('提示','删除失败,服务器无响应!');
	                         			}
	                         		}
	                          };
	                         iplantAjaxRequest(ajaxParam);
	                     });
	            	 }
	             });  
			}
		},
		
		statusFlow = function(id,status) {
			var modelId,moveIds = [],num = 0,IFServerNo='ACT0000',msg="激活";
			if(status=="suspend"){
				msg="挂起";
			}
			var ajaxParam = {
                url: '/iPlant_ajax',
                dataType: 'JSON',
                data: {
	               	ACT_TYPE:'statusProcess',
	               	processDefinitionId:id,
	               	status:status,
					IFS: IFServerNo
	            },
	            successCallBack:function(data){
	            	if(data.RESPONSE["0"].RESPONSE_HDR.MSG_CODE=='0'){
	         	 		$("#showMessageInfo").html("<font color=red>提示:"+msg+"操作成功!</font>");
	         	 		initGridData();
	                //});	
	         	 	}else{
	         	 		$("#showMessageInfo").html("<font color=red>提示:"+msg+"操作失败,此数据正在使用!</font>");
	         	 	}
	    		},
	    		errorCallBack:function(data){
	    			if(delCnt==checkedItems.length){
	    				$("#showMessageInfo").html("<font color=red>提示:"+msg+"操作失败,服务器无响应!</font>");
	    			}
	    		}
			};
            iplantAjaxRequest(ajaxParam);
		},
		
		saveFlow = function(){
			var fileName = $('#showFileName'),df = $("#txtDeployFile").val();
			if(checkNotEmpty(df)){
				$('#flowDeploy').submit();
			}else{
				fileName.html("<font color=red>提示:请选择要上传的文件!</font>");
			}
		},
       
		setDataNull = function () {
			var obj = document.getElementById('txtDeployFile'); 
			obj.outerHTML=obj.outerHTML; 
            $('#showFileName').html('');
		},
		
		addStation = function() {
			$("#editTab").dialog("open").dialog('setTitle', '部署新流程');
		}
	}

	dWorkFlow.prototype = {
		init : function() {
			$(function() {
				initGridData();
				$('.add').click(function() {
					addStation();
				});
				
				/*$('.search').click(function() {
					queryFlow();
				});*/
				
				$('.delete').click(function() {
					removeDeploy();
				});
				
				$('.panel-tool-close').click(function() {
					setDataNull();
					$('#editTab').dialog('close');
				});
			});
		}
	}
	var mwf = new dWorkFlow();
	mwf.init();
})();
