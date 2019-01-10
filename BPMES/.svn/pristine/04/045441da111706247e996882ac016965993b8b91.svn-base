/* 启动时加载 */
/*
 */
(function() {
	function factoryInfo() {
		initGridData = function() {
			var dgrid = dataGrid.datagrid('options');
			if(!dgrid) return;
			openSearchLayer();
			
		},
		
		bindGridData = function(reqData, jsonData) {
			var gridList = {
				name: 'productionScheduleImport_tab',
				dataType: 'json',
				columns: [[
					{field: 'FCT_NM',title: '工厂名称',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
						   options:{required:true, validType:['length[1,30]','specialTextCharacter']}}},
					{field: 'MO_NO',title: '工单号',width: 120,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
			        	   options:{required:true, validType:['length[1,30]','specialTextCharacter']}}},
					{field:'image',title:'排产明细',width:100,align:'center',
			        		 formatter:function(){
			        		   return "<img href='javascript:void(0)' class='easyui-linkbutton' onclick='OpenFrame()'  src='../../../common/IplantCompent/themes/default/images/Folder.png'/>"}},
					{field: 'ITEM_CD',title: '物料号',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
			        	   options:{required:true, validType:['length[1,30]','specialTextCharacter']}}}, 
					{field: 'WO_NO',title: '作业指示号',width: 150,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + ( row.CP_NM  || value)+ "</span>";},editor:{type:'validatebox',
			        	   options:{required:true, validType:['length[1,30]','specialTextCharacter']}}}, 
			        {field: 'WO_STATE_NM',title: '排产状态',width: 100,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + ( row.CP_NM  || value)+ "</span>";},editor:{type:'validatebox',
				        	   options:{required:true, validType:['length[1,30]','specialTextCharacter']}}}, 
					{field: 'LINE_NM',title: '生产线',width: 100,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" +  value + "'>" +  (row.DICT_IT_NM || value)+ "</span>";},editor:{type:'validatebox',
			        	   options:{required:true, validType:['length[1,30]','specialTextCharacter']}}}, 
					{field: 'SHIFT_NM',title: '班组',width: 100,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" +  value + "'>" +  (row.DICT_IT_NM || value)+ "</span>";},editor:{type:'validatebox',
			        	   options:{required:true, validType:['length[1,30]','specialTextCharacter']}}}, 
					{field: 'PLAN_PO_QTY',title: '工单计划产量',width: 85,align: 'right',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
			        	   options:{required:false, validType:['length[1,30]','specialTextCharacter']}}}, 
					{field: 'PLAN_WO_QTY',title: '排产量',width: 80,align: 'right',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
			        	   options:{required:true, validType:['length[1,30]','specialTextCharacter']}}},
					{field: 'PLAN_STRT_DT',title: '计划开始时间',width: 200,align: 'center',formatter:function(value,row,index){if(row.PLAN_STRT_DT){return row.PLAN_STRT_DT;}},
		            		   editor:{type:'datebox',options:{required:true,editable:false}}}, 
					{field: 'PLAN_END_DT',title: '计划完成时间',width: 200,align: 'center',formatter:function(value,row,index){if(row.PLAN_END_DT){return row.PLAN_END_DT;}},
			            		   editor:{type:'datebox',options:{required:true,editable:false}}}, 
					{field: 'MO',title: '备注',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
			        	   options:{ validType:['length[1,30]','specialTextCharacter']}}}, 
					{field: 'CRT_ID',title: '创建人',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
					{field: 'CRT_DT',title: '创建时间',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
					{field: 'UPT_ID',title: '修改人',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
					{field: 'UPT_DT',title: '修改时间',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}
				]],
			     
		        /**单击进入编辑模式*/
		        onClickCell: function (index,field,value) {
		        	var tabName,dialogName,titleName,rowEdit,editem,editorFt,woNo,reqData,dgrid;
		        	var rows = dataGrid.datagrid('getRows'),row = rows[index];
		        	/**判断是否为可编辑字段*/
		        	if(field=='image'){
		        		endEditingAll(dataGrid);
		        		dgrid = $('#productionScheduleImport_tab').datagrid('options'),
						dgrid.woNo = row.MO_NO,
						dgrid.fctCd = row.FCT_CD,
						reqData = {IFS: 'W0000013',MO_NO:row.MO_NO,pageIndex: 1,pageSize: dgrid.pageSize};
						OpenFrame(reqData);
		        	}
		        },
			}
			initGridView(reqData, gridList);
			dataGrid.datagrid('loadData', jsonData);
		}
		
	}
	
	openSearchLayer = function() {
		    var dgrid=$('#productionScheduleImport_tab').datagrid('options');
		    var searchMO_NO = $('#searchMO_NO').textbox('getValue');		/*工单号*/
		    var searchITEM_CD = $('#searchITEM_CD').textbox('getValue');	
	  		var searchPLAN_STRT_DT = $('#searchPLAN_STRT_DT').textbox('getValue');	
	  		var searchPLAN_END_DT = $('#searchPLAN_END_DT').textbox('getValue');	
	  		var searchMODEL_NM = $('#searchMODEL_NM').textbox('getValue');	
	        var searchMO_STATE =$('#searchMO_STATE').combobox('getValue');			/*工单状态*/
	        var searchWO_NO =$('#searchWO_NO').textbox('getValue');
				var reqData ={
					  MO_NO: searchMO_NO,
			          ITEM_CD: searchITEM_CD,
			          PLAN_STRT_DT: searchPLAN_STRT_DT,
			          PLAN_END_DT: searchPLAN_END_DT,
			          WO_STATE: searchMO_STATE,
			          WO_NO :searchWO_NO,
			          MODEL_NM : searchMODEL_NM,
					  IFS:'W0000013',
	              pageIndex:1,
	              pageSize:dgrid.pageSize
				}
				reqGridData('/iPlant_ajax','productionScheduleImport_tab',reqData);
	}
	
	OpenImprotFrame = function(){
		$("#enditTabupload").dialog("open").dialog('setTitle', '排产导入');
	}
	OpenFrame =function(reqData){
		$("#enditTab").dialog("open").dialog('setTitle', '排产明细');
		if(checkNotEmpty(reqData)){
			dialogDataGrid('/iPlant_ajax', 'poDetil_tab', reqData);
		}
	}
	
	dialogEditorDataGrid = function(tabName,reqData, jsonData) {
		var gridList = {
				name: 'poDetil_tab',
				dataType: 'json',
				columns: [[
					{field: 'WO_NO',title: '作业指示号',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
					{field: 'WO_STATE_NM',title: '排程状态',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
					{field: 'WC_NM',title: '车间代码',width: 120,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
					{field: 'LINE_NM',title: '线别代码',width: 120,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + ( row.CP_NM  || value)+ "</span>";},}, 
					{field: 'SHIFT_NM',title: '班次代码',width: 120,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" +  value + "'>" +  (row.DICT_IT_NM || value)+ "</span>";},}, 
					{field: 'MO_NO',title: '订单号',width: 120,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
					{field: 'CRT_ID',title: '订单类型',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
					{field: 'PROD_TYPE',title: '生产类型',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
					{field: 'ITEM_CD',title: '物料编号',width: 120,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
					{field: 'PLAN_PO_QTY',title: '订单批量',width: 60,align: 'right',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
					{field: 'PLAN_WO_QTY',title: '计划量',width: 60,align: 'right',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}
				     ]]
         }
         initGridView(reqData, gridList);
		$('#'+tabName).datagrid('loadData', jsonData);
     }
	/*导入*/
	OpenImprotFramedr = function(){
		$("#enditTabupload").dialog("open").dialog('setTitle', '作业指示排产导入');
	},
	/*显示图片*/
   importFile = function (){
	   /*以下即为完整客户端路径*/
	   var pic = document.getElementById('txtPHOTO'),file,fileName,fileType,temp = [],strSrc;
	   if(pic.files.length>0){
		   file = pic.files[0],fileName = file.name,fileType=file.type;
		   if(fileName.indexOf('.')>0){
			   temp=fileName.split('.');
			   strSrc = temp[temp.length-1];
			   if(strSrc.toLowerCase().localeCompare('xlsx') === 0 || strSrc.toLowerCase().localeCompare('xls') === 0 ){
				   $('#showFileName').html(fileName);
			   }else{
				   $('#showFileName').html('<font color=red>请输入excel文件！</font>');
				   return false;
			   }
		   }
	   }
   },
   ImportStation =function(){
	   var webroot=document.location.origin;
	   var pic = document.getElementById('txtPHOTO'),file,fileName,fileType,temp = [],strSrc;
	   if(pic.files.length>0){
		   file = pic.files[0],fileName = file.name,fileType=file.type;
		   if(fileName.indexOf('.')>0){
			   temp=fileName.split('.');
			   strSrc = temp[temp.length-1];
			   if(strSrc.toLowerCase().localeCompare('xlsx') === 0 || strSrc.toLowerCase().localeCompare('xls') === 0 ){
				   $('#FILE_BELONG').val("ITEM_CD"),
		    	   $('#FILE_CLS').val("import"),
		    	   $('#FILE_TYPE').val('xlsx'),
		    	   $('#importType').val('1'),
		    	   $('#IFS').val('W0000014');
				   var formData = new FormData($( "#importUplod" )[0]);  
				   $.ajax({
		                cache: true,
		                type: "POST",
		                url:webroot+'/iTaurus/iPlant_ImgUpload',
		                data:formData,			/*你的formid*/
		                async: false,
		                processData:false,
		                contentType:false,
		                error: function(request) {
		                	$.messager.alert("提示", '导入失败！');
		                	console.log(request);
		                },
		                success: function(data) {
		                	$.messager.alert("提示", data[0].msg);
		                }
		            });
			   }else{
				   $('#showFileName').html('<font color=red>请输入excel文件！</font>');
				   return false;
			   }
		   }
	   }
   },
     
	factoryInfo.prototype = {
		init: function() {
			$(function() {
				var ajaxParam2={
	                    url:'/iPlant_ajax',
	                    data:{
	                        IFS:'W0000025',
	                    },
	                    successCallBack:function(data){
	                    	$('#searchMO_STATE').combobox('clear');
	                        var rowCollection=createSourceObj(data); 
	                        var arr = [];
	                        arr.push({"value":"", "text":"全部"});
	                        for(var i=0; i< rowCollection.length; i++){
	                        	arr.push({"value":rowCollection[i].DICT_IT, "text":rowCollection[i].DICT_IT_NM});
	                        }
	                        $('#searchMO_STATE').combobox({
	                            data:arr,
	                            valueField:'value',
	                            textField:'text',
	                            panelWidth:150
	                        });
	                    }
	                }
	                iplantAjaxRequest(ajaxParam2);
				
				dataGrid = $('#productionScheduleImport_tab'),dataCompany=[],dataFactory=[],showmessage=$('#showMessageInfo'),editIndex = undefined,oldRow=undefined, reg=new RegExp("null","g");
				initGridData();
				
				$('#btnSearch').click(function() {
					openSearchLayer();
				});
				
				$('#btnImport').click(function() {						
					OpenImprotFramedr();
				});
				
				 $('#btnExprt').click(function(){
	                	var now = new Date();
	                    var year =now.getFullYear();
	                	var reqData = {
	                			IFS:'W0000013'
	                	}
	                	createTable('tbIMESReport','排产信息导出','productionScheduleImport_tab',reqData);
	                });
			});
		}
	}
	var fcfo = new factoryInfo();
	fcfo.init();
})();