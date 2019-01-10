/* 启动时加载 */
/*
 */
(function() {
	function TrayInfo2() {
		/**初始化公司combobox内容*/
		initGridData = function() {
			var companybox = {
	                url: "/iPlant_ajax",
	                dataType: "JSON",
	                data: {IFS: "WMS_B000006"},
	                successCallBack: function(a) {
	                	var op = a.RESPONSE[0].RESPONSE_DATA;
	                    $.each(op,function(n,obj) {
	                    	warehouse.push({'value':obj.WAREHOUSE_ID,'text':obj.WAREHOUSE_NAME});
					    });  
	                },
	                errorCallBack: function() {
	                    $.messager.alert("提示", '请联系管理员，查询失败！')
	                }
	            };
				iplantAjaxRequest(companybox)
				/**储区信息*/
			var storebox = {
                url: "/iPlant_ajax",
                dataType: "JSON",
                data: {IFS: "WMS_B00020"},
                successCallBack: function(a) {
                	var op = a.RESPONSE[0].RESPONSE_DATA;
                    $.each(op,function(n,obj) {
                    	store.push({'value':obj.STORE_ID,'text':obj.STORE_NAME});
				    });  
                },
                errorCallBack: function() {
                    $.messager.alert("提示", '请联系管理员，查询失败！')
                }
            };
			iplantAjaxRequest(storebox)
			/**货架信息*/
			var goodsShelfbox = {
                url: "/iPlant_ajax",
                dataType: "JSON",
                data: {IFS: "WMS_B000018"},
                successCallBack: function(a) {
                	var op = a.RESPONSE[0].RESPONSE_DATA;
                    $.each(op,function(n,obj) {
                    	goodsShelf.push({'value':obj.SHELF_ID,'text':obj.SHELF_NAME});
				    });  
                },
                errorCallBack: function() {
                    $.messager.alert("提示", '请联系管理员，查询失败！')
                }
            };
			iplantAjaxRequest(goodsShelfbox)
			/**货位信息*/
			/*var positionbox = {
                url: "/iPlant_ajax",
                dataType: "JSON",
                data: {IFS: "WMS_B00028"},
                successCallBack: function(a) {
                	var op = a.RESPONSE[0].RESPONSE_DATA;
                    $.each(op,function(n,obj) { 
                    	position.push({'value':obj.POSITION_ID,'text':obj.POSITION_NAME});
				    });  
                },
                errorCallBack: function() {
                    $.messager.alert("提示", '请联系管理员，查询失败！')
                }
            };
			iplantAjaxRequest(positionbox)*/
			var dgrid = dataGrid.datagrid('options');
			if(!dgrid) return;
			var reqData = {
				IFS: 'WMS_D000003',
				pageIndex: 1,
				pageSize: dgrid.pageSize
			}
			reqGridData('/iPlant_ajax', 'TaryInfo_tab', reqData);
		},
		bindGridData = function(reqData, jsonData) {
			var gridList = {
				name: 'TaryInfo_tab',
				dataType: 'json',
				columns: [[
					 {field: 'RETURN_ID',title: '订单编号',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
				           options:{validType:['length[1,100]','specialTextCharacter']}}}, 
				      {field: 'WAREHOUSE_ID',title: '仓库名称',width: 200,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + ( row.WAREHOUSE_NAME  || value)+ "</span>";},
							   editor:{type:'combobox',options:{valueField:'value',textField:'text',data:warehouse,required:true}}},
					  {field: 'STORE_ID',title: '储区名称',width: 200,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + ( row.STORE_NAME  || value)+ "</span>";},
								   editor:{type:'combobox',options:{valueField:'value',textField:'text',data:store,required:true}}},
					   {field: 'SHELF_ID',title: '货架名称',width: 200,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + ( row.SHELF_NAME  || value)+ "</span>";},
									   editor:{type:'combobox',options:{valueField:'value',textField:'text',data:goodsShelf,required:true}}},
					   {field: 'POSITION_ID',title: '货位编码',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
				        	   options:{validType:['length[1,100]','specialTextCharacter']}}}, 
				        {field: 'POSITION_NAME',title: '货位名称',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
					           options:{validType:['length[1,100]','specialTextCharacter']}}}, 
				        {field: 'MATERIA_ID',title: '物料ID',width: 60,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
					           options:{validType:['length[1,100]','specialTextCharacter']}}},
				        {field: 'MATERIA_NAME',title: '物料名称',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
				        	   options:{validType:['length[1,100]','specialTextCharacter']}}}, 
				        {field: 'RETURN_NUMBER',title: '退料数量',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
					           options:{validType:['length[1,100]','specialTextCharacter']}}}, 
				        {field: 'RETURN_TYPE',title: '退料类型',width: 60,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
					           options:{validType:['length[1,100]','specialTextCharacter']}}},
				        {field: 'UNIT_ID',title: '计量单位ID',width: 60,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
					           options:{validType:['length[1,100]','specialTextCharacter']}}},
				        {field: 'UNIT_NAME',title: '计量单位名称',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
					           options:{validType:['length[1,100]','specialTextCharacter']}}}, 
				        {field: 'SUPPLIER_ID',title: '供应商ID',width: 60,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
					           options:{validType:['length[1,100]','specialTextCharacter']}}},
				        {field: 'SUPPLIER_NAME',title: '供应商名称',width: 60,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
					           options:{validType:['length[1,100]','specialTextCharacter']}}},
				        {field: 'CONNECTOR_ID',title: '联系人ID',width: 60,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
					           options:{validType:['length[1,100]','specialTextCharacter']}}},
				        {field: 'CONNECTOR_NAME',title: '联系人名称',width: 60,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
					           options:{validType:['length[1,100]','specialTextCharacter']}}},
				        {field: 'CONNECTOR_PHONE',title: '联系电话',width: 60,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
					           options:{validType:['length[1,100]','specialTextCharacter']}}},
				        {field: 'STATUS',title: '退货状态',width: 60,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
					           options:{validType:['length[1,100]','specialTextCharacter']}}},
				        {field: 'CREATER_NAME',title: '制单人名称',width: 60,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
				        {field: 'CREATE_DATE',title: '制单日期',width: 60,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
				]],
    	     	            	 
				/**结束编辑模式的操作*/
			    onEndEdit:function(index,row){
			    	 var edditmpWarehouse = $(this).datagrid('getEditor', {index: index,field: 'WAREHOUSE_ID'});
			    	 row.WAREHOUSE_ID = $(edditmpWarehouse.target).combobox('getValue');
			    	 row.WAREHOUSE_NAME = $(edditmpWarehouse.target).combobox('getText');
			    	 var edditmpStore = $(this).datagrid('getEditor', {index: index,field: 'STORE_ID'});
			    	 row.STORE_ID = $(edditmpStore.target).combobox('getValue');
			    	 row.STORE_NAME = $(edditmpStore.target).combobox('getText');
			    	 var edditmpShelf = $(this).datagrid('getEditor', {index: index,field: 'SHELF_ID'});
			    	 row.SHELF_ID = $(edditmpShelf.target).combobox('getValue');
			    	 row.SHELF_NAME = $(edditmpShelf.target).combobox('getText');
			     },
			     /**进入编辑模式的操作*/
			     onBeforeEdit:function(index,row){
			    	 showmessage.html('');
			    	 row.editing = true;
			    	 row.edited = false;
			    	 oldRow = JSON.stringify(row).replace(reg,'\"\"');
			    	 $(this).datagrid('refreshRow', index);
			    	 
			     },
			     /**进入编辑模式的操作*/
			     
			    onAfterEdit: function(index, row, changes){
			    	alert('在这写逻辑'+value);
			    	 /*if (field && field == 'WAREHOUSE_NAME') {
			    		 
			    	 }*/
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
			    onClickRow: function (index, row) {
		       /* *//**双击进入编辑模式*//*
		        onDblClickRow: function (index, row) {*/
			    	if (editIndex != index){
			    		var ed,fc,editorFt;
			    		if(editIndex!=undefined){
		    				/**判断是否为新增行，并验证新增托盘编码重复*/
			    			var rowEdit = dataGrid.datagrid('getRows')[editIndex],edft = $(this).datagrid('getEditor', {index: editIndex,field: 'ORDER_ID'}),editorFt = edft.target,ORDER_ID2 = editorFt.val();
			    			if(checkNotEmpty(rowEdit.editType)){
			    				if(rowEdit.editType=='add'){
			    					if(checkNotEmpty(ORDER_ID2)){
					    				var ajaxParam = {
											url : '/iPlant_ajax',
											dataType : 'JSON',
											data : {
												IFS : 'WMS_C000002',
												ORDER_ID : ORDER_ID2,
												pageIndex : 1,
												pageSize : 10
											},
											successCallBack : function(data) {
												rowNum = parseInt(data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS);
												if (rowNum > 0) {
													dataGrid.datagrid('selectRow', editIndex).datagrid('beginEdit', editIndex);
										       		showmessage.html('<font color=red>您输入的托盘编码['+ ORDER_ID2 + ']已有相同,请重新输入!</font>');
										       		return false;
												} else {
													addDatagridEditor(dataGrid,index);
												}
											}
										};
										iplantAjaxRequest(ajaxParam);
					    			}else{
						        	   addDatagridEditor(dataGrid,index);
					    			}
			    				}else{
			    					addDatagridEditor(dataGrid,index);
			    					if(!checkNotEmpty(row.editType)){//如果是修改的情况，TRAY_ID字段为只读模式
							    		ed = $(this).datagrid('getEditor', {index: index,field: 'ORDER_ID'});
							    		fc = ed.target;
							    		fc.prop('readonly',true);
						    		}
			    				}
			    			}else{
					    		 addDatagridEditor(dataGrid,index);
					    		 if(!checkNotEmpty(row.editType)){
							    		ed = $(this).datagrid('getEditor', {index: index,field: 'ORDER_ID'});
							    		fc = ed.target;
							    		fc.prop('readonly',true);
						    		}
			    			}
			    		}else{
			    			addDatagridEditor(dataGrid,index);
			    			if(!checkNotEmpty(row.editType)){
					    		ed = $(this).datagrid('getEditor', {index: index,field: 'ORDER_ID'});
					    		fc = ed.target;
					    		fc.prop('readonly',true);
				    		}
			    		}
			    	}
	            }
			}
			initGridView(reqData, gridList);
			dataGrid.datagrid('loadData', jsonData);
			console.log(gridList.columns);
		},
		/**批量新增和修改的保存*/
		saveDataGrid=function(){
            if (endEditing(dataGrid)){
            	//判断后变更数据
            	if (dataGrid.datagrid('getChanges').length) {
                    var inserted = dataGrid.datagrid('getChanges', "inserted");  
                    var updated = dataGrid.datagrid('getChanges', "updated");
                    var deleted = dataGrid.datagrid('getChanges', "deleted");
                    /**装载数据*/
                    var arrInsert = new Array(),arrUpdate = new Array();
                    if(inserted.length>0){
                    	for(var m=0;m<inserted.length;m++){
                    		arrInsert.push({ 
                    			RETURN_ID: inserted[m].RETURN_ID,
                    			WAREHOUSE_ID: inserted[m].WAREHOUSE_ID,
                    			WAREHOUSE_NAME: inserted[m].WAREHOUSE_NAME,
                    			STORE_ID: inserted[m].STORE_ID,
                    			STORE_NAME:inserted[m].STORE_NAME,
                    			SHELF_ID:inserted[m].SHELF_ID,
                    			SHELF_NAME: inserted[m].SHELF_NAME,
                    			POSITION_ID: inserted[m].POSITION_ID,
                    			POSITION_NAME:inserted[m].POSITION_NAME,
                    			MATERIA_ID:inserted[m].MATERIA_ID,
                    			MATERIA_NAME: inserted[m].MATERIA_NAME,
                    			RETURN_NUMBER: inserted[m].RETURN_NUMBER,
                    			RETURN_TYPE:inserted[m].RETURN_TYPE,
                    			UNIT_ID:inserted[m].UNIT_ID,
                    			UNIT_NAME: inserted[m].UNIT_NAME,
                    			SUPPLIER_ID:inserted[m].SUPPLIER_ID,
                    			SUPPLIER_NAME: inserted[m].SUPPLIER_NAME,
                    			CONNECTOR_ID: inserted[m].CONNECTOR_ID,
                    			CONNECTOR_NAME:inserted[m].CONNECTOR_NAME,
                    			CONNECTOR_PHONE:inserted[m].CONNECTOR_PHONE,
                    			STATUS: inserted[m].STATUS,
                    			});
                    	}
                    	//批量先增
                        var ajaxInsert = {
                            url: '/iPlant_ajax',
                            dataType: 'JSON',
                            data: {
                                list: arrInsert,
                                IFS: 'WMS_D000008'
                            },
                            successCallBack: function (data) {
                            	dataGrid.datagrid('acceptChanges');
                            	showmessage.html('<font color=red>保存成功！</font>');
                            	initGridData();
                                return;
                            },
                            errorCallBack: function (data) {
                            	showmessage.html('<font color=red>保存失败！</font>');
                                return;
                            }
                        };
                        iplantAjaxRequest(ajaxInsert);
                    }
                    if(updated.length>0){
                    	for(var m=0;m<updated.length;m++){
                    		if(updated[m].edited){
                    			arrUpdate.push({ 
                    				RETURN_ID: updated[m].RETURN_ID,
                        			WAREHOUSE_ID: updated[m].WAREHOUSE_ID,
                        			WAREHOUSE_NAME: updated[m].WAREHOUSE_NAME,
                        			STORE_ID: updated[m].STORE_ID,
                        			STORE_NAME:updated[m].STORE_NAME,
                        			SHELF_ID:updated[m].SHELF_ID,
                        			SHELF_NAME: updated[m].SHELF_NAME,
                        			POSITION_ID: updated[m].POSITION_ID,
                        			POSITION_NAME:updated[m].POSITION_NAME,
                        			MATERIA_ID:updated[m].MATERIA_ID,
                        			MATERIA_NAME: updated[m].MATERIA_NAME,
                        			RETURN_NUMBER: updated[m].RETURN_NUMBER,
                        			RETURN_TYPE:updated[m].RETURN_TYPE,
                        			UNIT_ID:updated[m].UNIT_ID,
                        			UNIT_NAME: updated[m].UNIT_NAME,
                        			SUPPLIER_ID:updated[m].SUPPLIER_ID,
                        			SUPPLIER_NAME: updated[m].SUPPLIER_NAME,
                        			CONNECTOR_ID: updated[m].CONNECTOR_ID,
                        			CONNECTOR_NAME:updated[m].CONNECTOR_NAME,
                        			CONNECTOR_PHONE:updated[m].CONNECTOR_PHONE,
                        			STATUS: updated[m].STATUS,
                    				});
                    		}
                    	}
                    	//批量修改
                        var ajaxUpdate = {
                            url: '/iPlant_ajax',
                            dataType: 'JSON',
                            data: {
                                list: arrUpdate,
                                IFS: 'WMS_D000006'
                            },
                            successCallBack: function (data) {
                            	dataGrid.datagrid('acceptChanges');
                            	showmessage.html('<font color=red>保存成功！</font>');
                                return;
                            },
                            errorCallBack: function (data) {
                            	showmessage.html('<font color=red>保存失败！</font>');
                                return;
                            }
                        };
                        iplantAjaxRequest(ajaxUpdate);
                    }
                }else{
                	showmessage.html('<font color=red>没有进行变更！</font>');
                }
			}else{
				showmessage.html('<font color=red>请输入必填项！</font>');
			}
		},
		/**删除行*/
		deleteDataGrid=function (){
			/**删除行有2中情况，一种新增的还没有保存，一种是原来就有的直接删除*/
			var indexs = datagridEditorRows(),del = [],row;
			if(indexs.length>0){
				$.messager.confirm("确认框", "您确定要删除您所选择的数据?",function(a) {
					if(a){
						for(var j=0;j<indexs.length;j++){							
							row = dataGrid.datagrid('getRows')[indexs[j]];
							var num =row.RETURN_ID;
							console.log(num);
							if(checkNotEmpty(row.RETURN_ID)){
								var e = {
									async: false,
			                        url: "/iPlant_ajax",
			                        dataType: "JSON",
			                        data: {
			                            IFS: "WMS_D000004",
			                            RETURN_ID:num                        
			                        },
			                        successCallBack: function() {
			                        	editIndex = undefined;
			                        }
			                    };
								dataGrid.datagrid('deleteRow', indexs[j]);
			                    iplantAjaxRequest(e);
							}else{
								/**判断多个空行只删除最顶上的*/
								del.push(indexs[j]);
							}
						}
						if(del.length>0){
							dataGrid.datagrid('deleteRow', del[0]);
						}
						if(del.length==1){
							editIndex = undefined;
						}
						showmessage.html('<font color=red>删除成功！</font>');
						
					}
	            })
			}else{
				showmessage.html('<font color=red>请选中要删除的数据！</font>');
			}
		},
		/**插入一个新的空白行*/
		insertDataGrid=function (){
			var row = dataGrid.datagrid('getSelected');
			if (row){
				var index = dataGrid.datagrid('getRowIndex', row);
			} else {
				index = 0;
				editIndex = 0;
			}
			//CP_CD:dataCompany[0].value,CP_NM:dataCompany[0].text,DICT_IT:dataFactory[0].value,DICT_IT_NM:dataFactory[0].text
			dataGrid.datagrid('insertRow', {
				index: index,
				row:{}
			});
			/**新增一个字段判断是否为新增*/
			var rowEdit = dataGrid.datagrid('getRows')[index];
			rowEdit.editType='add';
			dataGrid.datagrid('selectRow',index);
			dataGrid.datagrid('beginEdit',index);
			if (editIndex != index){
				if (endEditing(dataGrid)){
					dataGrid.datagrid('selectRow', index).datagrid('beginEdit', index);
					editIndex = index;
				} else {
					dataGrid.datagrid('selectRow', editIndex);
				}
			}else{
				endEditing(dataGrid);
			}
		}
	}
	

//高级查询
serchInfomation  =function(){
	  var ORDER_ID = $("#ORDER_ID").textbox('getValue');	
	  var MATERIA_ID = $("#MATERIA_ID").combobox('getValue');
	  var START_DATE = $('#START_DATE').datetimebox('getValue');		
      var END_DATE = $('#END_DATE').datetimebox('getValue');
      var ITEM_NM=$('#ITEM_NM').textbox('getValue');
      var SUP_NM=$('#SUP_NM').textbox('getValue');
	  var CT_MN=$('#CT_MN').textbox('getValue');
	  var PN_NB=$('#PN_NB').textbox('getValue');
	  var P_DELIVE_DATE=$('#P_DELIVE_DATE').datebox('getValue');

      var reqData ={
		IFS:'WMS_C000002',
		ORDER_ID:ORDER_ID,
		MATERIA_ID:MATERIA_ID,
		START_DATE:START_DATE,
		END_DATE :END_DATE,
		ITEM_NM :ITEM_NM,
		SUP_NM :SUP_NM,
		CT_MN:CT_MN,
		PN_NB:PN_NB,
        P_DELIVE_DATE:P_DELIVE_DATE,       
        pageIndex:1,
        pageSize:$('#TaryInfo_tab').datagrid('options').pageSize
      };
      reqGridData('../iPlant_ajax',"TaryInfo_tab",reqData);
      $('#queryTab').dialog('close'); 
}

//关闭弹出框	
closeDialog =function(){

    $('#ORDER_ID').textbox('getValue','');
    $('#MATERIA_ID').combobox('getValue','');
    $('#START_DATE').datetimebox('setValue','');
    $('#END_DATE').datetimebox('setValue','');
 	$('#ITEM_NM').textbox('getValue','');
 	$('#SUP_NM').textbox('getValue','');
 	$('#CT_MN').textbox('getValue','');
	$('#PN_NB').textbox('getValue','');
    $('#P_DELIVE_DATE').datebox('setValue','');
    $('#queryTab').dialog('close');	
	},
	
	onschalarmInfo=function(){
 		$('#queryTab').dialog('open').dialog('setTitle', "查询条件");
 		
 	}
//初始化查询
initSearchMateriaId=function(){
	var ajaxParam={
        url: '/iPlant_ajax',
        data: { IFS: 'Z000007' },
        successCallBack: function (data) {
            var array = new Array();
            array.push({ "id": "", "text": "全部"});
            for (var i = 0; i < data.RESPONSE[0].RESPONSE_DATA.length; i++) {
                array.push({ "id": data.RESPONSE[0].RESPONSE_DATA[i].ITEM_CD, "text": data.RESPONSE[0].RESPONSE_DATA[i].ITEM_NM });
            }
            console.log(array);
            $('#MATERIA_ID').combobox({
                data: array,
                valueField: 'id',
                textField: 'text'
            });          
        }
    };
	
       iplantAjaxRequest(ajaxParam);
}

	TrayInfo2.prototype = {
		init: function() {
			$(function() {
				//初始化全局变量对象
				dataGrid = $('#TaryInfo_tab'), warehouse = [],store= [],goodsShelf= [], showmessage = $('#showMessageInfo'),editIndex = undefined, oldRow = undefined,reg = new RegExp("null", "g");
				initGridData();
				initSearchMateriaId();
				//获取工厂类别下拉
				$('.add').click(function() {					
					insertDataGrid();
				});
				$('#btnGaoSearch').click(function () {
					onschalarmInfo();
					/*closeDialog();    */     
                });
				$('.delete').click(function(){
					deleteDataGrid();
	            });
				
				$('.save').click(function() {
					saveDataGrid();
				});
			});
		}
	}
	var fcfo = new TrayInfo2();
	fcfo.init();
})();
function conditionQuery() {
	var dgrid = dataGrid.datagrid('options');
	var returnId = $("#return_ID").val();
	var materiaId = $("#purchase_ID").val();
	var reqData = {
		IFS : 'WMS_D000003',
		pageIndex : 1,
		pageSize : dgrid.pageSize,
		RETURN_ID : returnId,
		MATERIA_ID : materiaId
	}
	reqGridData('../iPlant_ajax', 'TaryInfo_tab', reqData);
}