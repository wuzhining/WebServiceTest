/* 启动时加载 */
/*
 */
(function() {
	function factoryInfo() {
		initGridData = function() {
			var dgrid = dataGrid.datagrid('options');
			if(!dgrid) return;
			/*工厂名称下拉框*/
			var Factory = {
	            url: "/iPlant_ajax",
	            dataType: "JSON",
	            data: {IFS: "B000021"},
	            successCallBack: function(a) {
	            	dataFactory = [];
	            	var op = a.RESPONSE[0].RESPONSE_DATA;
	                $.each(op,function(n,obj) {
	                	dataFactory.push({'value':obj.FT_CD,'text':obj.FT_NM});
				    });  
	            },
	            errorCallBack: function() {
	                $.messager.alert("提示", '请联系管理员，查询失败！')
	            }
		    };
			iplantAjaxRequest(Factory);
			
			var searchCALL_TY = $('#searchCALL_TY').combobox('getValue');
			var searchFCT_CD = $('#searchFCT_CD').combobox('getValue');
			var reqData = {
				IFS: 'ST00050',
				CALL_TY:searchCALL_TY,
				FCT_CD:searchFCT_CD,
				pageIndex: 1,
				pageSize: dgrid.pageSize
			}
			reqGridData('/iPlant_ajax', 'callWarningParameterSettings_tab', reqData);
		},
		
		dataGrade = [];dataGrade1 = [];
		dataGrade=[{'value':'1','text':'时间'},{'value':'2','text':'数量'},{'value':'3','text':'长度'}];
		dataGrade1=[{'value':'3','text':'转产'},{'value':'1','text':'JIT预警'},{'value':'2','text':'接料预警'}];
		bindGridData = function(reqData, jsonData) {
			var gridList = {
				name: 'callWarningParameterSettings_tab',
				dataType: 'json',
				columns: [[
				    {field: 'SEQ',title: '序号',width: 60,hidden:true,align: 'right',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
					{field: 'FCT_CD',title: '工厂名称',width: 100,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" +  value + "'>" +  (row.FCT_NM || value)+ "</span>";},
				    	 	editor:{type:'combobox',id:"status",options:{valueField:'value',textField:'text',data:dataFactory,required:true,editable:false}}},
		    	 	{field: 'CALL_CD',title: '预警代码',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
						   options:{required:true, validType:['length[1,50]','specialTextCharacter']}}},
				    {field: 'CALL_NM',title: '预警名称',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
					   options:{required:true, validType:['length[1,50]','specialTextCharacter']}}},
		    	 	{field: 'CALL_TY',title: '预警类型',width: 100,align: 'center',formatter: function (value,row) {if(value == 1) {return 'JIT预警';}else if(value == 2){return '接料预警';} else if(value == 3){return '转产';}else {return value;}},
						   editor:{type:'combobox',options:{valueField:'value',textField:'text',data:dataGrade1,required:true,editable:false}}},	 
				    {field: 'CALL_CLS',title: '预警类别',width: 100,align: 'center',formatter: function (value,row) {if(value == 1) {return '时间';}else if(value == 2){return '数量';} else if(value == 3){return '长度';}else {return value;}},
					       editor:{type:'combobox',options:{valueField:'value',textField:'text',data:dataGrade,required:true,editable:false}}},	 	
					{field: 'CALL_VAL',title: '叫料值',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
						   options:{required:true, validType:['length[1,30]','specialTextCharacter']}}},
				    {field: 'PREP_TIME',title: '备料时长',width: 60,align: 'right',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'numberbox', options:{required:true,precision:2,min:0}}, 
            	           formatter:function(value,row,index){ return formatNumber(value,0); }},
					{field: 'USE_YN',title: '是否启用',width: 80,align: 'center',formatter: function(value, row, index) {if(value == 'Y') { return '启用';} else { return '未启用';}},editor:{type:'checkbox',options:{on: 'Y',off: 'N'}}},
				    {field: 'MO',title: '备注',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
						   options:{validType:['length[1,25]','specialTextCharacter']}}},
				    {field: 'CRT_ID',title: '创建人',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
					{field: 'CRT_DT',title: '创建时间',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
					{field: 'UPT_ID',title: '修改人',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
					{field: 'UPT_DT',title: '修改时间',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}
						   
				]],
				/**结束编辑模式的操作*/
			     onEndEdit:function(index,row){
			    	 var edditmp = $(this).datagrid('getEditor', {index: index,field: 'FCT_CD'});
			    	 row.FCT_CD = $(edditmp.target).combobox('getValue');
			    	 row.FCT_NM = $(edditmp.target).combobox('getText');
			     },
			     /**进入编辑模式的操作*/
				onBeforeEdit:function(index,row){
			    	 showmessage.html('');
			    	 row.editing = true;
			    	 row.edited = false;
			    	 oldRow = JSON.stringify(row).replace(reg,'\"\"');
			    	 $(this).datagrid('refreshRow', index);
			     },
			     /**编辑模式进入之后的操作*/
			    onAfterEdit:function(index,row){
			    	 /**判断是否进行数据变更*/
			    	 var temp = JSON.stringify(row).replace(reg,'\"\"');
			    	 if(temp!=oldRow){
			    		 row.edited = true;
			    	 }
			    	 row.editing = false;
			    	 $(this).datagrid('refreshRow', index);
			     },
		        onCancelEdit:function(index,row){
		            row.editing = false;
		            $(this).datagrid('refreshRow', index);
		        },
		        /**单击进入编辑模式*/
		        onClickCell: function (index,field,value) {
		        	var tabName,dialogName,titleName,rowEdit,editem,editorFt,itemCd,reqData,dgrid;
		        	var rows = dataGrid.datagrid('getRows'),row = rows[index];
		        	/**判断是否为可编辑字段*/
		        	addDatagridEditor(dataGrid,index);
		        },
		        /**单击进入编辑模式*/
			}
			initGridMultiView(reqData, gridList);
			dataGrid.datagrid('loadData', jsonData);
		},
		
		/*检索*/
	   searchDataGrid=function(dgrid){
			initGridData();
		},
			
		deleteDataGrid = function () {
			var checkedItems = $('#callWarningParameterSettings_tab').datagrid('getSelections');
	        if (checkedItems.length==0) {
	            $.messager.alert('提示', '请选择一条数据进行删除');
	            return;
	        }
	        /*确认提示框*/
	        var delCnt=0,arrUpdate = new Array();
	        $.messager.confirm('确认框', '您确定要删除您所选择的数据吗?', function (r) {
	           	if(r==true){
	           		 $.each(checkedItems, function (index, item) {
	           			 arrUpdate.push({SEQ:item.SEQ});
	                 });
	           		 
	           		 if(arrUpdate.length>0){
	     	           	/*批量删除*/
	                     var ajaxUpdate = {
	                         url: '/iPlant_ajax',
	                         dataType: 'JSON',
	                         data: {
	                             list: arrUpdate,
	                             IFS: 'ST00053'
	                         },
	                         successCallBack: function (data) {
	                         	showmessage.html('<font color=red>删除成功！</font>');
	                         	initGridData();
	                             return;
	                         },
	                         errorCallBack: function (data) {
	                         	showmessage.html('<font color=red>删除失败！</font>');
	                             return;
	                         }
	                     };
	                     iplantAjaxRequest(ajaxUpdate);

	           		 }
	           	}
	        });      
		}
	}
	/*导入*/
	OpenImprotFramedr = function(){
		$("#enditTabupload").dialog("open").dialog('setTitle', '叫料预警参数设置导入');
	}
	/**
	 * ImportStation 导入提交
	 * importFile 验证文件是否为空
	 * @param tabName
	 */
	importFile = function (){
 	   /* 以下即为完整客户端路径*/
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
    }
	ImportStation = function(){
       var webroot=document.location.origin;
 	   var pic = document.getElementById('txtPHOTO'),file,fileName,fileType,temp = [],strSrc;
 	   if(pic.files.length>0){
 		   file = pic.files[0],fileName = file.name,fileType=file.type;
 		   if(fileName.indexOf('.')>0){
 			   temp=fileName.split('.');
 			   strSrc = temp[temp.length-1];
 			   if(strSrc.toLowerCase().localeCompare('xlsx') === 0 || strSrc.toLowerCase().localeCompare('xls') === 0 ){
 				   $('#FILE_BELONG').val("BOM_CD"),
 		    	   $('#FILE_CLS').val("import"),
 		    	   $('#FILE_TYPE').val('xlsx'),
 		    	   $('#importType').val('1'),
 		    	   $('#IFS').val('ST00051');
 				   var formData = new FormData($( "#importUplod" )[0]);  
 				   $.ajax({
 		                cache: true,
 		                type: "POST",
 		                url:webroot+'/iTaurus/iPlant_ImgUpload',
 		                data:formData,/* 你的formid*/
 		                async: false,
 		                processData:false,
 		                contentType:false,
 		                
 		                error: function(request) {
 		                	$.messager.alert("提示", '导入失败！');
 		                	console.log(request);
 		                },
 		                success: function(data) {
 		                	$("#enditTabupload").dialog("close");
 		                	//initGridData();
 		                	$.messager.alert("提示", data[0].msg);
 		                }
 		            });
 			   }else{
 				   $('#showFileName').html('<font color=red>请输入excel文件！</font>');
 				   return false;
 			   }
 		   }
 	   }
	}
	factoryInfo.prototype = {
		init: function() {
			$(function() {
				/*工厂名称下拉搜索框*/
				var ajaxParam2={
	                    url:'/iPlant_ajax',
	                    data:{
	                        IFS:'B000021',
	                    },
	                    successCallBack:function(data){
	                    	$('#searchFCT_CD').combobox('clear');
	                        var rowCollection=createSourceObj(data); 
	                        var arr = [];
	                        arr.push({"value":"", "text":"全部"});
	                        for(var i=0; i< rowCollection.length; i++){
	                        	arr.push({"value":rowCollection[i].FT_CD, "text":rowCollection[i].FT_NM});
	                        }
	                        $('#searchFCT_CD').combobox({
	                            data:arr,
	                            valueField:'value',
	                            textField:'text',
	                            panelWidth:150
	                        });
	                    }
	                }
				
	            iplantAjaxRequest(ajaxParam2);
				$('#searchCALL_TY').combobox('clear');
				dataGrade.push({"value":"", "text":"全部"});
				$('#searchCALL_TY').combobox({
                    data:dataGrade,
                    valueField:'value',
                    textField:'text',
                    panelWidth:150
                });
				/*初始化全局变量对象*/
				dataGrid = $('#callWarningParameterSettings_tab'),dataCompany=[],dataitemAttr=[],dataFactory=[],showmessage=$('#showMessageInfo'),editIndex = undefined,oldRow=undefined, reg=new RegExp("null","g");
				initGridData();
				
				$('#btnSearch').click(function() {					
					searchDataGrid(dataGrid);
				});
				
				$('#btnAdd').click(function() {
					var initData = {};
					if(dataFactory.length>0){
						initData={FCT_CD:dataFactory[0].value,USE_YN:"Y"}
					}
					insertDataGrid('callWarningParameterSettings_tab',initData);
				});
				
				$('#btnDelete').click(function(){
					deleteDataGrid();
	            });

				$('#btnSave').click(function() {
					saveDataGrid('callWarningParameterSettings_tab','ST00051','ST00052','showMessageInfo');
				});
				

				$('#btnImport').click(function() {						/*导入*/
					OpenImprotFramedr();
				});
				
				 $('#btnExprt').click(function(){						/*导出*/
				 	var now = new Date();
                    var year =now.getFullYear();
                	var reqData = {
                			IFS:'ST00050'
                	}
                	createTable('tbIMESReport','叫料预警参数设置导出','callWarningParameterSettings_tab',reqData);
                });
				
			});
		}
	}
	var fcfo = new factoryInfo();var dataGrade,dataGrade1
	fcfo.init();
})();