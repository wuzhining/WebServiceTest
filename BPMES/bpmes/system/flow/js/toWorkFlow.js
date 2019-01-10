/* 启动时加载 */
/*
 */
(function() {
	function toWorkFlow() {
		initGridData = function() {
			queryFlow();
		},
		bindGridData = function(reqData, jsonData) {
			var grid = {
				name : 'toWorkFlow_tab',
				dataType : 'json',
				columns : [[{field : 'proDefId',title : '流程ID',width : 150,align : 'center'},
				            {field : 'depId',title : '部署ID',width : 120,align : 'center'},
				            {field : 'proDefName',title : '名称',width : 200,align : 'center'},
				            {field : 'proDefKey',title : 'KEY',width : 100,align : 'center'},
				            {field : 'version',title : '版本号',width : 60,align : 'center'},
				            {field : 'proDiagram',title : '当前节点',width : 200,align : 'center',formatter:function(value,row,index){return "<a href='#' style='text-decoration:none;' onclick=showInfo('"+row.proDefId+"','image') >"+value+"</a>"}},
				            {field : 'depTime',title : '部署时间',width : 200,align : 'center'},
				            {field : 'suspended',title : '是否挂起',width : 100,align : 'center',formatter : function(value, row, index) {if (value=="true") {return "挂起";} else { return "激活";}}},
				            {field : 'code',title : '',width : 100,align : 'center',hidden:true}
						]],
				onDblClickRow: function(index,row){
					
			    }
			}
			initGridView(reqData, grid);
			$('#toWorkFlow_tab').datagrid('loadData', jsonData);
		},
		
		queryFlow = function(){
			var dgrid = $('#toWorkFlow_tab').datagrid('options');
			if (!dgrid)
				return;
			var reqData = {
				IFS : 'ACT0000',
				ACT_TYPE:'listProcessList',
				pageIndex: 0,
				pageSize: dgrid.pageSize
			}
			reqGridData('/iPlant_ajax', 'toWorkFlow_tab', reqData);
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

		statusFlow = function(id,status) {
			var num = 0,IFServerNo='ACT0000',msg="激活";
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
	         	 	}else{
	         	 		$("#showMessageInfo").html("<font color=red>提示:"+msg+"操作失败,此数据正在使用!</font>");
	         	 	}
	    		},
	    		errorCallBack:function(data){
    				$("#showMessageInfo").html("<font color=red>提示:"+msg+"操作失败,服务器无响应!</font>");
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

	toWorkFlow.prototype = {
		init : function() {
			$(function() {
				initGridData();
			});
		}
	}
	var mwf = new toWorkFlow();
	mwf.init();
})();
