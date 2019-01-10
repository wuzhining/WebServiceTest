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
	                    	dataProcessName.push({'value':obj.PRF_CD,'text':obj.PRF_CD});
	                    	dataPRF[obj.PRF_CD] = obj.PRF_NAME;
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
	                    	routName[a.RESPONSE[0].RESPONSE_DATA[n].ROUT_CD]=a.RESPONSE[0].RESPONSE_DATA[n].ROUT_NAME;
					    }); 
	                },
	                errorCallBack: function() {
	                    $.messager.alert("提示", '请联系管理员，查询失败！')
	                }
	            };
			iplantAjaxRequest(routeName);
			
			var searchProcess_CD = $('#searchProcess_CD').combobox('getValue');
			var searchItem_CD = $('#searchItem_CD').combobox('getValue');
			var searchVersion =$("#searchVersion").textbox("getValue");
			var reqData = {
				IFS: 'GX00061',
				PRF_CD:searchProcess_CD,
				VERSION:searchVersion,
				ITEM_CD:searchItem_CD,
				pageIndex: 1,
				pageSize: dgrid.pageSize
			}
			reqGridData('/iPlant_ajax', 'configurationTheProcessRouteOfProduct_tab', reqData);
		},
		
		routeCD =function (){
			var Defer = $.Deferred();          //声明一个Defer对象
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
	                    	routName[a.RESPONSE[0].RESPONSE_DATA[n].ROUT_CD]=a.RESPONSE[0].RESPONSE_DATA[n].ROUT_NAME;
					    }); 
	                    Defer.resolve();               //在Defer对象的resolve状态中把combobox对象传出去
	                },
	                errorCallBack: function() {
	                    $.messager.alert("提示", '请联系管理员，查询失败！')
	                }
	            };
			iplantAjaxRequest(routeName);
			return Defer.promise();                                   //返回一个promise对象
		},
		
		itemCD = function(){
			var Defer = $.Deferred();          //声明一个Defer对象
			var BOM = {
	                url: "/iPlant_ajax",
	                dataType: "JSON",
	                data: {IFS:'Z000053'},
	                successCallBack: function(a) {
	                	dataBOM = [];
	                	var op = a.RESPONSE[0].RESPONSE_DATA;
	                    $.each(op,function(n,obj) {
	                    	dataBOM.push({'text':obj.BOM_CD+"("+obj.BOM_NM+")"+"-"+obj.VERSION,'value':obj.BOM_CD+"-"+obj.VERSION});
	                    	BOMS[obj.BOM_CD+"-"+obj.VERSION]=obj.BOM_NM;
	                    	itemCDS[obj.BOM_CD+"-"+obj.VERSION] = obj.BOM_CD;
					    });  
	                    Defer.resolve();               //在Defer对象的resolve状态中把combobox对象传出去
	                },
	                errorCallBack: function() {
	                    $.messager.alert("提示", '请联系管理员，查询失败！')
	                }
	            };
				iplantAjaxRequest(BOM);
				return Defer.promise();                                   //返回一个promise对象
		}
		
		bindGridData = function(reqData, jsonData) {
			var gridList = {
				name: 'configurationTheProcessRouteOfProduct_tab',
				dataType: 'json',
				columns: [[
                                    
				           	{field : "CZ",width : 10,checkbox : true},
				           	{field: 'FCT_CD',title: '工厂名称',width: 120,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + ( row.FCT_NM  || value)+ "</span>";},
				           		   editor:{type:'combobox',options:{valueField:'value',textField:'text',data:dataTmp,required:true,editable:false}}},
			           		
		           		    {field:'ITEM_CD_VERSION',title: '产品编码-版本号', width:250,align:'center',
	 	                        editor:{  
	 	                            type:'combobox',
	 	                            options:{
	 	                            	required:true,
	 	                            	valueField:'value',
	 	                                textField:'text',
	 	                                panelWidth:250,
	 	                                panelHeight:250,
	 	                                editable:false,
	 	                                data:dataBOM,
	 	                                onSelect:function(data){
	 	                                	/*产品名称数据列赋值*/
	 										var target = $('#configurationTheProcessRouteOfProduct_tab').datagrid('getEditor', {'index':ccIndex,'field':'ITEM_NM'}).target;
	 										target.textbox('setValue', BOMS[data.value]);
	 										
	 										/*获取版本号的值*/
	 										var arr = data.text.split('-');
	 										var version = arr[arr.length-1];
	 										
	 										/*版本号数据列赋值*/
	 										var target2 = $('#configurationTheProcessRouteOfProduct_tab').datagrid('getEditor', {'index':ccIndex,'field':'VERSION'}).target;
	 										target2.textbox('setValue', version);
	 										
	 										/*产品编码隐藏数据列赋值*/
	 										var target3 = $('#configurationTheProcessRouteOfProduct_tab').datagrid('getEditor', {'index':ccIndex,'field':'ITEM_CD'}).target;
	 										target3.textbox('setValue', itemCDS[data.value]);
	 										
	 										/*工序编码数据列置空*/
	 										var target4 = $('#configurationTheProcessRouteOfProduct_tab').datagrid('getEditor', {'index':ccIndex,'field':'PRF_CD'}).target;
	 										target4.textbox('setValue', '');
	 										
	 										/*工序名称数据列置空*/
	 										var target5 = $('#configurationTheProcessRouteOfProduct_tab').datagrid('getEditor', {'index':ccIndex,'field':'PRF_NAME'}).target;
	 										target5.textbox('setValue', '');
	 									}
	 	                            }    
	 	                        }
	 	                      },
				           		   
	 	                    {field:'ITEM_CD', hidden:true,title: '产品名称', width:120,align:'center',editor:{type:'textbox',options:{editable:false}}},
			 	            {field:'ITEM_NM', title: '产品名称', width:120,align:'center',editor:{type:'textbox',options:{editable:false}}},   
			 	            {field:'VERSION', title: '版本号', width:120,align:'center',editor:{type:'textbox',options:{editable:false}}}, 
			 	            
			           		{field: 'PRF_CD',title: '工艺路线编码',width: 120,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" +  value + "'>" +  (value)+ "</span>";},
							    	 editor:{type:'combobox',options:{
							    		 required:true,
							    		 valueField:'value',
							    		 textField:'text',
							    		 data:dataProcessName,
							    		 required:true,
							    		 editable:false,
							    		 onSelect:function(a){
							    			 var ItemCD_target = $('#configurationTheProcessRouteOfProduct_tab').datagrid('getEditor', {'index':ccIndex,'field':'ITEM_CD'}).target;
							    			 var item = ItemCD_target.textbox('getValue');
							    			 
							    			 var version_target = $('#configurationTheProcessRouteOfProduct_tab').datagrid('getEditor', {'index':ccIndex,'field':'VERSION'}).target;
							    			 var version = version_target.textbox('getValue');
							    			 
					        		   		 if(add){	/*新增的数据行才查重验证*/
								    			 var Verify = {
								                         url: '/iPlant_ajax',
								                         dataType: 'JSON',
								                         data: {
								                        	 PRF_CD: a.value,
								                        	 ITEM_CD: item,
								                        	 VERSION:version,
								                             IFS: 'GX00061'
								                         },
								                         successCallBack: function (data) {
								                        	 if(data.RESPONSE[0].RESPONSE_DATA.length > 0){		//主键产品编码和工序编码重复，弹出提示，置空工序编码、名称数据列。
								                        		 $.messager.alert('提示','工序['+a.value+']已与['+item+']产品绑定，不能重复配置。','',function(){
								                        			 var target = $('#configurationTheProcessRouteOfProduct_tab').datagrid('getEditor', {'index':ccIndex,'field':'PRF_CD'}).target;
								 									 target.combobox('setValue', '');
								 									 
								 									 var target2 = $('#configurationTheProcessRouteOfProduct_tab').datagrid('getEditor', {'index':ccIndex,'field':'PRF_NAME'}).target;
								 									 target2.textbox('setValue', '');
								                        		 });
								                        	 }else{
								                        		 var target = $('#configurationTheProcessRouteOfProduct_tab').datagrid('getEditor', {'index':ccIndex,'field':'PRF_NAME'}).target;
							 									 target.textbox('setValue', dataPRF[a.value]);
								                        	 }
								                         },
								                         errorCallBack: function (data) {
								                         	showmessage.html('<font color=red>验证查询失败！</font>');
								                             return;
								                         }
								                     };
								                     iplantAjaxRequest(Verify);
					        		   		 	}
		 									}
			           		}}},
			           		{field:'PRF_NAME', title: '工艺路线名称', width:120,align:'center',editor:{type:'textbox',options:{editable:false}}},
						    {field: 'USE_YN',title: '是否启用',width: 80,align: 'center',formatter: function(value, row, index) {if(value == '1') { return '是';} else { return '否';}},editor:{type:'checkbox',options:{on: '1',off: '0'}}}, 
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
		        	ccIndex=index;
		        	var tabName,dialogName,titleName,rowEdit,editem,editorFt,itemCd,reqData,dgrid;
		        	var rows = dataGrid.datagrid('getRows'),row = rows[index];
		        	row.editType == 'add'?add=true:add=false;
		        	/**判断是否为可编辑字段*/
		        	if (editIndex != index){
			    		var ed,fc,ed2,fc2,ed3,fc3,ed4,fc4,editorFt;
			    		if(editIndex!=undefined){
		    				/**判断是否为新增行，并验证新增工厂编码重复*/
			    			rowEdit = dataGrid.datagrid('getRows')[editIndex];
			    				if(checkNotEmpty(rowEdit.editType)){
			    					if(rowEdit.editType=='add'){
			    						$.messager.alert('提示','请先维护并保存新增的数据后再进行其他操作！','',function(){
			    							$("#configurationTheProcessRouteOfProduct_tab").datagrid('uncheckAll');
			    							$("#configurationTheProcessRouteOfProduct_tab").datagrid('checkRow',editIndex);
			    							add = true;
			    							ccIndex = editIndex;
			    						});
	    			    			}else{
	    				        	   addDatagridEditor(dataGrid,index);
	    			    			}
			    				}else{
			    					addDatagridEditor(dataGrid,index);
			    					if(!checkNotEmpty(row.editType)){
	    				        	    ed = $(this).datagrid('getEditor', {index: index,field: 'FCT_CD'});
							    		fc = ed.target;
							    		fc.combobox('disable');
	    					    		
	    					    		ed3 = $(this).datagrid('getEditor', {index: index,field: 'ITEM_CD_VERSION'});
	    					    		fc3 = ed3.target;
	    					    		fc3.combobox('disable');
    			    				}
			    				}
			    			}else{
					    		 addDatagridEditor(dataGrid,index);
					    		 if(!checkNotEmpty(row.editType)){
					    			    ed = $(this).datagrid('getEditor', {index: index,field: 'FCT_CD'});
							    		fc = ed.target;
							    		fc.combobox('disable');
	    					    		
	    					    		ed3 = $(this).datagrid('getEditor', {index: index,field: 'ITEM_CD_VERSION'});
	    					    		fc3 = ed3.target;
	    					    		fc3.combobox('disable');
						    		}
			    			}
			    		}else{
			    			addDatagridEditor(dataGrid,index);
			    			if(!checkNotEmpty(row.editType)){
			    				ed = $(this).datagrid('getEditor', {index: index,field: 'FCT_CD'});
					    		fc = ed.target;
					    		fc.combobox('disable');
					    		
					    		ed3 = $(this).datagrid('getEditor', {index: index,field: 'ITEM_CD_VERSION'});
					    		fc3 = ed3.target;
					    		fc3.combobox('disable');
		    				}
			    		}
		        },
			}
			initGridMultiView(reqData, gridList);
			dataGrid.datagrid('loadData', jsonData);
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
			$("#enditTabupload").dialog("open").dialog('setTitle', '产品工序路线配置导入');
		}
		
		deleteDataGrid = function () {
			var checkedItems = $('#configurationTheProcessRouteOfProduct_tab').datagrid('getSelected');
	        if (checkedItems == null || checkedItems == '') {
	            $.messager.alert('提示', '请选择一条数据进行删除');
	            return;
	        }
	        /*确认提示框*/
	        $.messager.confirm('确认框', '您确定要删除您所选择的数据吗?', function (r) {
	           	if(r==true){
     	           	/*批量删除*/
                     var ajaxUpdate = {
                         url: '/iPlant_ajax',
                         dataType: 'JSON',
                         data: {
                        	 PRF_CD:checkedItems.PRF_CD,
                        	 ITEM_CD:checkedItems.ITEM_CD,
                        	 VERSION:checkedItems.VERSION,
                             IFS: 'GX00064'
                         },
                         successCallBack: function (data) {
                        	 if(data.RESPONSE[0].RESPONSE_HDR.MSG_CODE == '0'){
                        		showmessage.html('<font color=red>删除成功！</font>');
                              	initGridData();
                                return;
                        	 }
                         },
                         errorCallBack: function (data) {
                         	showmessage.html('<font color=red>删除失败！</font>');
                             return;
                         }
                     };
                     iplantAjaxRequest(ajaxUpdate);
	           	}
	        });      
		}
	};
	
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
		                        panelWidth:200
		                    });
		                }
		            }
		            iplantAjaxRequest(ajaxParam1);
				
				var ajaxParam3={
		                url:'/iPlant_ajax',
		                data:{
		                    IFS:'Z000053',
		                },
		                successCallBack:function(data){
		                	$('#searchItem_CD').combobox('clear');
		                    var rowCollection=createSourceObj(data); 
		                    var arr = [];
		                    arr.push({"value":"", "text":"全部"});
		                    for(var i=0; i< rowCollection.length; i++){
		                    	arr.push({"value":rowCollection[i].BOM_CD, "text":rowCollection[i].BOM_NM});
		                    }
		                    $('#searchItem_CD').combobox({
		                        data:arr,
		                        valueField:'value',
		                        textField:'text',
		                        panelWidth:200
		                    });
		                }
		            }
		            iplantAjaxRequest(ajaxParam3);
				
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
				dataGrid = $('#configurationTheProcessRouteOfProduct_tab'),dataMO=[],dataRouteName=[],dataBOM=[],dataProcessName=[],dataMaterielType=[],dataTmp=[],dataFactory=[],showmessage=$('#showMessageInfo'),editIndex = undefined,oldRow=undefined, reg=new RegExp("null","g");
				routeCD().then(function(){itemCD()}).then(function(){initGridData()});
				
				var b = $.isEmptyObject(routName);
				if(!b){
					initGridData();
				}
				$('#btnSearch').click(function() {	
					var dgrid = dataGrid.datagrid('options');
					searchDataGrid(dgrid);
				});
				
				$('#btnAdd').click(function() {
					var editData = $('#configurationTheProcessRouteOfProduct_tab').datagrid('getChanges', "inserted");
					if(editData.length == 0){
						add = true;
						var initData = {};
						if(dataTmp.length>0 && dataProcessName.length>0 && dataRouteName.length>0 && dataBOM.length>0){
							initData={FCT_CD:dataTmp[0].value,ITEM_CD:dataBOM[0].value,USE_YN:'1'}
						}
						ccIndex = insertDataGrid('configurationTheProcessRouteOfProduct_tab',initData);
					}else{
						$.messager.alert('提示','请先维护完上一条新增数据之后再继续添加新的数据。');
					}
				});
				
				$('#btnDelete').click(function(){
					deleteDataGrid();
	            });
				
				$('#btnSave').click(function() {
					saveDataGrid('configurationTheProcessRouteOfProduct_tab','GX00062','GX00063','showMessageInfo');
				});
				
				$('#btnImport').click(function() {						/*导入*/
					OpenImprotFramedr();
				});
				
				 $('#btnExprt').click(function(){						/*导出*/
					 	var now = new Date();
	                    var year =now.getFullYear();
	                	var reqData = {
	                			IFS:'GX00061'
	                	}
	                	createTable('tbIMESReport','产品工序路线配置导出','configurationTheProcessRouteOfProduct_tab',reqData);
	                });
				
			});
		}
	}
	var fcfo = new factoryInfo();var routName = {},BOMS ={},itemCDS = {},dataPRF = {};var ccIndex= 0,add;/*全局索引;*/
	fcfo.init();
})();