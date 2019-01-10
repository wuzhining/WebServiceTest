/* 启动时加载 */
/*
 */
(function() {
	function factoryInfo() {
		initGridData = function() {
			var dgrid = dataGrid.datagrid('options');
			if(!dgrid) return;
			
			/*工厂名称下拉框*/
			var tmp = {
	                url: "/iPlant_ajax",
	                dataType: "JSON",
	                data: {IFS: "B000021"},
	                successCallBack: function(a) {
	                	dataTmp = [];
	                	var op = a.RESPONSE[0].RESPONSE_DATA;
	                    $.each(op,function(n,obj) {
	                    	dataTmp.push({'value':obj.FT_CD,'text':obj.FT_NM});
					    });  
	                },
	                errorCallBack: function() {
	                    $.messager.alert("提示", '请联系管理员，查询失败！')
	                }
	            };
			iplantAjaxRequest(tmp);
			
			/*工序名称下拉框*/
			var processName = {
	                url: "/iPlant_ajax",
	                dataType: "JSON",
	                data: {IFS: "GX00001"},
	                successCallBack: function(a) {
	                	dataProcessName = [];
	                	var op = a.RESPONSE[0].RESPONSE_DATA;
	                    $.each(op,function(n,obj) {
	                    	dataProcessName.push({'value':obj.PRF_CD,'text':obj.PRF_NAME});
					    });  
	                },
	                errorCallBack: function() {
	                    $.messager.alert("提示", '请联系管理员，查询失败！')
	                }
	            };
			iplantAjaxRequest(processName);
			
			
			/*工序路线下拉框*/
			var routeName = {
	                url: "/iPlant_ajax",
	                dataType: "JSON",
	                data: {IFS: "GX00011"},
	                successCallBack: function(a) {
	                	dataRouteName = [];
	                	var op = a.RESPONSE[0].RESPONSE_DATA;
	                    $.each(op,function(n,obj) {
	                    	dataRouteName.push({'value':obj.ROUT_CD,'text':obj.ROUT_NAME});
	                    	dataRoute[obj.ROUT_CD] = obj.ROUT_NAME;
					    });  
	                },
	                errorCallBack: function() {
	                    $.messager.alert("提示", '请联系管理员，查询失败！')
	                }
	            };
			iplantAjaxRequest(routeName);
			
			var searchProcess_CD = $('#searchProcess_CD').combobox('getValue');
			var searchRoute_CD = $('#searchRoute_CD').combobox('getValue');
			var searchNextRoute_CD =$("#searchNXRoute_CD").combobox("getValue");
			var reqData = {
				IFS: 'GX00021',
				PRF_CD:searchProcess_CD,
				FROM_ROUT_CD:searchRoute_CD,
				TO_ROUT_CD:searchNextRoute_CD,
				pageIndex: 1,
				pageSize: dgrid.pageSize
			}
			reqGridData('/iPlant_ajax', 'configurationTheProcessRoute_tab', reqData);
		}
		
		
		
		bindGridData = function(reqData, jsonData) {
			var gridList = {
				name: 'configurationTheProcessRoute_tab',
				dataType: 'json',
				columns: [[
				           	{field : "CZ",width : 10,checkbox : true},
				           	{field: 'FCT_CD',title: '工厂名称',width: 120,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + ( row.FCT_NM  || value)+ "</span>";},
				           		   editor:{type:'combobox',options:{valueField:'value',textField:'text',data:dataTmp,required:true,editable:false}}},
				           	{field: 'PRF_CD',title: '工序名称',width: 120,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" +  value + "'>" +  (row.PRF_NAME || value)+ "</span>";},
							    	 editor:{type:'combobox',options:{required:true,valueField:'value',textField:'text',data:dataProcessName,required:true,editable:false}}},
					    	{field: 'CURRENT_VS',title: '当前版本',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
					        	    options:{required:true, validType:['length[1,30]','specialCharacterTextArea']}}},
			        	    {field: 'img1',title: '工位配置',width: 80,align: 'center',formatter:function(){
				        		   return "<img href='javascript:void(0)' class='easyui-linkbutton'  src='../../../common/IplantCompent/themes/default/images/Folder.png'/>"}},
					    	{field: 'BRANCH_ROUT',title: '分支路由标识',width: 85,align: 'right',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'numberbox', options:{required:true,precision:0,min:0}}, 
				            	   formatter:function(value,row,index){ return formatNumber(value,0); }},
					        {field: 'MO',title: '备注',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
						           options:{validType:['length[0,50]','specialTextCharacter']}}},
					        {field: 'CRT_ID',title: '创建人',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
							{field: 'CRT_DT',title: '创建时间',width: 180,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
							{field: 'UPT_ID',title: '修改人',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
							{field: 'UPT_DT',title: '修改时间',width: 180,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}
							]],
				/**结束编辑模式的操作*/
			     onEndEdit:function(index,row){
			    	 var edditmp = $(this).datagrid('getEditor', {index: index,field: 'FCT_CD'});
			    	 row.FCT_CD = $(edditmp.target).combobox('getValue');
			    	 row.FCT_NM = $(edditmp.target).combobox('getText');
			    	 
			    	 var eddiProcessName = $(this).datagrid('getEditor', {index: index,field: 'PRF_CD'});
			    	 row.PRF_CD = $(eddiProcessName.target).combobox('getValue');
			    	 row.PRF_NAME = $(eddiProcessName.target).combobox('getText');
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
		        	/*点击的列为弹出图标，弹出工位配置列表*/
		        	if(field=='img1'){
		        		endEditingAll(dataGrid);
						titleName = '工位配置',
						dialogName = 'editTabProcess',
						tabName = 'process_tab',
						dgrid = $('#process_tab').datagrid('options'),
						$("#ProcessTitle").html("<label>工序编码："+row.PRF_CD+"</label><label>&nbsp;&nbsp;工序名称："+row.PRF_NAME+"</label>"),
						reqData = {IFS: 'Z000022',ITEM_CD:row.ITEM_CD,pageIndex: 1,pageSize: dgrid.pageSize};
						openDialogFrame(tabName,dialogName,titleName,reqData);
		        	}
		        	
		        	/**判断是否为可编辑字段*/
		        	if (editIndex != index){
			    		var ed,fc,ed2,fc2,ed3,fc3,ed4,fc4,editorFt;
			    		if(editIndex!=undefined){
		    				/**判断是否为新增行，并验证新增工厂编码重复*/
			    			rowEdit = dataGrid.datagrid('getRows')[editIndex];
			    				if(checkNotEmpty(rowEdit.editType)){
			    					if(rowEdit.editType=='add'){
			    						
	    			    			}else{
	    			    				
	    				        	   addDatagridEditor(dataGrid,index);
	    			    			}
			    				}else{
			    					addDatagridEditor(dataGrid,index);
			    					if(!checkNotEmpty(row.editType)){
	    				        	    ed = $(this).datagrid('getEditor', {index: index,field: 'FCT_CD'});
							    		fc = ed.target;
							    		fc.combobox('disable');
    			    				}
			    				}
			    			}else{
					    		 addDatagridEditor(dataGrid,index);
					    		 if(!checkNotEmpty(row.editType)){
					    			 ed = $(this).datagrid('getEditor', {index: index,field: 'FCT_CD'});
							    		fc = ed.target;
							    		fc.combobox('disable');
						    		}
			    			}
			    		}else{
			    			addDatagridEditor(dataGrid,index);
			    			if(!checkNotEmpty(row.editType)){
			    				ed = $(this).datagrid('getEditor', {index: index,field: 'FCT_CD'});
					    		fc = ed.target;
					    		fc.combobox('disable');
		    				}
			    		}
		        },
		        /**单击进入编辑模式*/
			}
			initGridMultiView(reqData, gridList);
			dataGrid.datagrid('loadData', jsonData);
		},
		
		openDialogFrame =function(tabName,dialogName,titleName,reqData){
			$("#"+dialogName).dialog("open").dialog('setTitle', titleName);
			if(checkNotEmpty(reqData)){
				dialogDataGrid('/iPlant_ajax', tabName, reqData);
			}
		},
		
		dialogEditorDataGrid = function(tabName,reqData, jsonData) {
			/*根据tabName判断哪个列表*/
			var columnsTab,edDataGrid,messageInfo;
			columnsTab=[
					{field: 'ROUT_CD',title: '工艺路线编码',width: 120,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" +  value + "'>" +  (row.FROM_ROUT_NAME || value)+ "</span>";},
					    editor:{type:'combobox',options:{required:true,valueField:'value',textField:'text',data:dataRouteName,required:true,editable:false,
					    	onSelect: function(value){
					    		let target = $('#process_tab').datagrid('getEditor', {'index':ccIndex,'field':'ROUT_NAME'}).target;
        		   				target.textbox('setValue',dataRoute[value]);
					    	}
					    }}},
					{field: 'ROUT_NAME',title: '工艺路线名称',width: 120,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
					{field: 'ORDER_CD',title: '顺序',width: 60,align: 'right',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'numberbox', options:{required:true,precision:0,min:1}}, 
		            	   formatter:function(value,row,index){ return formatNumber(value,1); }},
					{field: 'IS_INPUT',title: '是否计投入数',width: 100,align: 'center',formatter: function(value, row, index) {if(value == 'Y') { return '是';} else { return '否';}}},
				    {field: 'IS_OUTPUT',title: '是否计产出数',width: 100,align: 'center',formatter: function(value, row, index) {if(value == 'Y') { return '是';} else { return '否';}}},
				    {field: 'IS_BIND',title: '是否解绑',width: 70,align: 'center',formatter: function(value, row, index) {if(value == 'Y') { return '是';} else { return '否';}}},
				    {field: 'USE_YN',title: '是否启用',width: 80,align: 'center',formatter: function(value, row, index) {if(value == '1') { return '是';} else { return '否';}},editor:{type:'checkbox',options:{on: '1',off: '0'}}}, ];
			edDataGrid = $('#'+tabName);
			messageInfo = $('#showMSDInfo');
			var gridList = {
					name: tabName,
					dataType: 'json',
					pagination:false,
					rownumbers:true,
					loadMsg: '数据加载中...',
					columns: [columnsTab],
			}
			initGridView(reqData, gridList);
			$('#'+tabName).datagrid('loadData', jsonData);
		},
		/*检索*/
	   searchDataGrid=function(dgrid){
			initGridData();
		},
		
		setDataNull=function(){
			 $('#showFileName').html('');
		},
		
		/*导入*/
		OpenImprotFramedr = function(){
			$("#enditTabupload").dialog("open").dialog('setTitle', '工序路线模板配置导入');
		}
		
		deleteDataGrid = function () {
			var checkedItems = $('#configurationTheProcessRoute_tab').datagrid('getSelections');
	        if (checkedItems.length==0) {
	            $.messager.alert('提示', '请选择一条数据进行删除');
	            return;
	        }
	       /*确认提示框*/
	        var delCnt=0,arrUpdate = new Array();;
	        $.messager.confirm('确认框', '您确定要删除您所选择的数据吗?', function (r) {
	           	if(r==true){
		           	 $.each(checkedItems, function (index, item) {
		           		arrUpdate.push({FCT_CD:item.FCT_CD,PRF_CD:item.PRF_CD,FROM_ROUT_CD:item.FROM_ROUT_CD,TO_ROUT_CD:item.TO_ROUT_CD});
		             });
	                
	           		 if(arrUpdate.length>0){
	     	           	/*批量删除*/
	                     var ajaxUpdate = {
	                         url: '/iPlant_ajax',
	                         dataType: 'JSON',
	                         data: {
	                             list: arrUpdate,
	                             IFS: 'GX00024'
	                         },
	                         successCallBack: function (data) {
	                        	 console.log(data)
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

	           		 }else{
	           			showmessage.html('<font color=red>删除失败，此工单不是创建状态！</font>');
	           		 }
	           	}
	        });      
		}
	}
	factoryInfo.prototype = {
		init: function() {
			$(function() {
				
				var ajaxParam1={
		                url:'/iPlant_ajax',
		                data:{
		                    IFS:'GX00001',
		                },
		                successCallBack:function(data){
		                	$('#searchProcess_CD').combobox('clear');
		                    var rowCollection=createSourceObj(data); 
		                    var arr = [];
		                    arr.push({"value":"", "text":"全部"});
		                    for(var i=0; i< rowCollection.length; i++){
		                    	arr.push({"value":rowCollection[i].PRF_CD, "text":rowCollection[i].PRF_NAME});
		                    }
		                    $('#searchProcess_CD').combobox({
		                        data:arr,
		                        valueField:'value',
		                        textField:'text',
		                        panelWidth:150
		                    });
		                }
		            }
		            iplantAjaxRequest(ajaxParam1);
				
				var ajaxParam2={
		                url:'/iPlant_ajax',
		                data:{
		                    IFS:'GX00011',
		                },
		                successCallBack:function(data){
		                	$('#searchRoute_CD').combobox('clear');
		                	$('#searchNXRoute_CD').combobox('clear');
		                    var rowCollection=createSourceObj(data); 
		                    var arr = [];
		                    arr.push({"value":"", "text":"全部"});
		                    for(var i=0; i< rowCollection.length; i++){
		                    	arr.push({"value":rowCollection[i].ROUT_CD, "text":rowCollection[i].ROUT_NAME});
		                    }
		                    $('#searchRoute_CD').combobox({
		                        data:arr,
		                        valueField:'value',
		                        textField:'text',
		                        panelWidth:150
		                    });
		                    $('#searchNXRoute_CD').combobox({
		                        data:arr,
		                        valueField:'value',
		                        textField:'text',
		                        panelWidth:150
		                    });
		                }
		            }
		            iplantAjaxRequest(ajaxParam2);
				
				/*初始化全局变量对象*/
				dataGrid = $('#configurationTheProcessRoute_tab'),dataMO=[],dataRouteName=[],dataBOM=[],dataProcessName=[],dataMaterielType=[],dataTmp=[],dataFactory=[],showmessage=$('#showMessageInfo'),editIndex = undefined,oldRow=undefined, reg=new RegExp("null","g");
				initGridData();
				$('#btnSearch').click(function() {	
					var dgrid = dataGrid.datagrid('options');
					searchDataGrid(dgrid);
				});
				
				$('#btnAdd').click(function() {
					var initData = {};
					if(dataTmp.length>0 && dataProcessName.length>0){														  
						initData={FCT_CD:dataTmp[0].value,CURRENT_VS:1,BRANCH_ROUT:0}
					}
					insertDataGrid('configurationTheProcessRoute_tab',initData);
				});
				
				$('#btnDelete').click(function(){
					deleteDataGrid();
	            });
				
				$('#btnSave').click(function() {
					saveDataGrid('configurationTheProcessRoute_tab','GX00022','GX00023','showMessageInfo');
				});
				
				$('#btnImport').click(function() {						/*导入*/
					OpenImprotFramedr();
				});
				
				 $('#btnExprt').click(function(){						/*导出*/
					 	var now = new Date();
	                    var year =now.getFullYear();
	                	var reqData = {
	                			IFS:'GX00021'
	                	}
	                	createTable('tbIMESReport','工序路线模板配置导出','configurationTheProcessRoute_tab',reqData);
	                });
				 
				 /*工序工位配置*/
				 $('#btnProcessAdd').click(function() {	
					ccIndex=0;
               	 	eeEndEdit('materialMSD_tab');
					var dgrid = $('#materialMSD_tab').datagrid('options');
					insertDataGrid('materialMSD_tab',{ITEM_MSD_CD:autoCreateCode('MES'),FCT_CD:dgrid.FCT_CD,ITEM_CD:dgrid.ITEM_CD,ITEM_NM:dgrid.ITEM_NM,USE_YN:"Y"});//初始化默认数据
				 });
				
				 $('#btnProcessDelete').click(function(){
					deleteDataGrid('materialMSD_tab','ITEM_MSD_CD','Z000034','showMSDInfo');
	             });

				 $('#btnProcessSave').click(function() {
					saveDataGrid('materialMSD_tab','Z000023','Z000024','showMSDInfo');
					$("#materialMSD_tab").datagrid('reload');
				 });
				
			});
		}
	}
	var fcfo = new factoryInfo();var dataRoute={};
	fcfo.init();
})();