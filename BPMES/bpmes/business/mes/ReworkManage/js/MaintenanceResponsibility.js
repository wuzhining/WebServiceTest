/* 启动时加载 */
/*维修职责
 */
(function() {
	function factoryInfo() {
		initGridData = function() {
			var dgrid = dataGrid.datagrid('options');
			if(!dgrid) return;
			var reqData = {
				IFS: 'E000040',
				pageIndex: 1,
				pageSize: dgrid.pageSize
			}
			reqGridData('/iPlant_ajax', 'MaintenanceResponsibility_tab', reqData);
		}
		
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
		bindGridData = function(reqData, jsonData) {
			var gridList = {
				name: 'MaintenanceResponsibility_tab',
				dataType: 'json',
				columns: [[
					{field: 'FCT_CD',title: '工厂名称',width: 120,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + ( row.FCT_NM  || value)+ "</span>";},
				           		   editor:{type:'combobox',options:{valueField:'value',textField:'text',data:dataTmp,required:true,editable:false}}},
					{field: 'MT_POST_CD',title: '职责代码',width: 120,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
			        	   options:{required:true, validType:['length[1,30]','specialTextCharacter']}}},
					{field: 'MT_POST_NM',title: '维修职责描述',width: 300,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
			        	   options:{validType:['length[1,25]','specialTextCharacter']}}}, 
			        {field: 'USE_YN',title: '是否启用',width: 100,align: 'center',formatter: function(value, row, index) {if(value == 'Y') { return '启用';} else { return '未启用';}},editor:{type:'checkbox',options:{on: 'Y',off: 'N'}}},
			        {field: 'MO',title: '备注',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
						   options:{validType:['length[1,150]','specialTextCharacter']}}},
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
			    onClickRow: function (index, row) {
			    	if (editIndex != index){
			    		var ed,fc,editorFt;
			    		if(editIndex!=undefined){
		    				/**判断是否为新增行，并验证新增工厂编码重复*/
			    			var rowEdit = dataGrid.datagrid('getRows')[editIndex],edft = $(this).datagrid('getEditor', {index: editIndex,field: 'MT_POST_CD'}),editorFt = edft.target,ftCd = editorFt.val();
			    			if(checkNotEmpty(rowEdit.editType)){
			    				if(rowEdit.editType=='add'){
			    					if(checkNotEmpty(ftCd)){
					    				var ajaxParam = {
											url : '/iPlant_ajax',
											dataType : 'JSON',
											data : {
												IFS : 'E000041',
												MT_POST_CD : ftCd,
												pageIndex : 1,
												pageSize : 10
											},
											successCallBack : function(data) {
												rowNum = parseInt(data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS);
												if (rowNum > 0) {
													dataGrid.datagrid('selectRow', editIndex).datagrid('beginEdit', editIndex);
										       		showmessage.html('<font color=red>您输入的物料编码['+ ftCd + ']已有相同,请重新输入!</font>');
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
			    					if(!checkNotEmpty(row.editType)){/*如果是修改的情况，ft_cd字段为只读模式*/
							    		ed = $(this).datagrid('getEditor', {index: index,field: 'MT_POST_CD'});
							    		fc = ed.target;
							    		fc.prop('readonly',true);
						    		}
			    				}
			    			}else{
					    		 addDatagridEditor(dataGrid,index);
					    		 if(!checkNotEmpty(row.editType)){
							    		ed = $(this).datagrid('getEditor', {index: index,field: 'MT_POST_CD'});
							    		fc = ed.target;
							    		fc.prop('readonly',true);
						    		}
			    			}
			    		}else{
			    			addDatagridEditor(dataGrid,index);
			    			if(!checkNotEmpty(row.editType)){
					    		ed = $(this).datagrid('getEditor', {index: index,field: 'MT_POST_CD'});
					    		fc = ed.target;
					    		fc.prop('readonly',true);
				    		}
			    		}
			    	}
	            }
			}
			initGridView(reqData, gridList);
			dataGrid.datagrid('loadData', jsonData);
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
							if(checkNotEmpty(row.MT_POST_CD)){
								var e = {
			                        url: "/iPlant_ajax",
			                        dataType: "JSON",
			                        data: {
			                            IFS: "E000043",
			                              MT_POST_CD: row.MT_POST_CD
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
			var row = dataGrid.datagrid('getSelected'),
			compV = '',compT='',facV = '',facT='';
			var rowEditRows = dataGrid.datagrid('getRows');
			if(dataCompany.length>0){compV=dataCompany[0].value,compT=dataCompany[0].text;}
			if(dataFactory.length>0){facV=dataFactory[0].value,facT=dataFactory[0].text;}
			if (row){
				var index = dataGrid.datagrid('getRowIndex', row);
			} else {
				index = 0;
				editIndex = 0;
			}
			dataGrid.datagrid('insertRow', {
				index: index,
				row:{CP_CD:compV,CP_NM:compT,DICT_IT:facV,DICT_IT_NM:facT}
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
	/*物料类型查询 */
	openSearchLayer = function() {
		
		    var dgrid=$('#MaintenanceResponsibility_tab').datagrid('options');
        	var search_MaterialType = $('#search_MaterialType').val();
        	
			var reqData ={
				MT_POST_NM:search_MaterialType,
				IFS:'E000040',
                pageIndex:1,
                pageSize:dgrid.pageSize
			}
			reqGridData('/iPlant_ajax','MaintenanceResponsibility_tab',reqData);
			
	},
	
	showcontent=function(ABC){
		
		
	}
	
	//物料属性绑定
	initListdata1 = function() {                              
		 $('#MaterialTypeMaintenance_open_Type').datagrid({
           columns: [[
					{field: 'FT_NM',title: '属性名称',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
			        	   options:{required:true, validType:['length[1,30]','specialTextCharacter']}}},
					{field: 'FT_ADR',title: '值',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
			        	   options:{validType:['length[1,25]','specialTextCharacter']}}}, 
					{field: 'FT_RM',title: '备注',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
			        	   options:{validType:['length[1,100]','specialTextCharacter']}}}
			 ]]
       })
   },
   //已分配物料绑定
	initListdata2 = function() {
		 $('#MaterialTypeMaintenance_open_YI').datagrid({
            columns: [[
					{field: 'FT_NM',title: '物料编码',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
			        	   options:{required:true, validType:['length[1,30]','specialTextCharacter']}}},
					{field: 'FT_ADR',title: '物料描述',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
			        	   options:{validType:['length[1,25]','specialTextCharacter']}}}, 
					{field: 'CP_CD',title: '物料类别',width: 100,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + ( row.CP_NM  || value)+ "</span>";},
						editor:{type:'combobox',options:{valueField:'value',textField:'text',data:dataCompany,required:true}}}, 
					{field: 'DICT_IT',title: '其它',width: 100,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" +  value + "'>" +  (row.DICT_IT_NM || value)+ "</span>";},
							editor:{type:'combobox',options:{valueField:'value',textField:'text',data:dataFactory,required:true}}}, 
					{field: 'FT_RM',title: '备注',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
			        	   options:{validType:['length[1,100]','specialTextCharacter']}}}
			 ]]
        })
    }
	
	factoryInfo.prototype = {
		init: function() {
			$(function() {
				/*初始化全局变量对象*/
				dataGrid = $('#MaintenanceResponsibility_tab'),dataCompany=[],dataFactory=[],dataTmp=[],showmessage=$('#showMessageInfo'),editIndex = undefined,oldRow=undefined, reg=new RegExp("null","g");
				initGridData();
				/*获取工厂类别下拉*/
				$('.add').click(function() {					
					insertDataGrid();
				});
				
				$('.delete').click(function(){
					deleteDataGrid();
	            });
				
				$('#btnExprt').click(function(){
                	var now = new Date();
                    var year =now.getFullYear();
                	var reqData = {
                		IFS:'E000040'
                	}
                	createTable('tbIMESReport','维修职责导出','MaintenanceResponsibility_tab',reqData);
                });
				
				$('#btnSearch').click(function(){
					openSearchLayer();
				});
				
				$('#btnSave').click(function() {
					saveDataGrid('MaintenanceResponsibility_tab','E000041','E000042','showMessageInfo');
				});
			});
		}
	}
	var fcfo = new factoryInfo();
	fcfo.init();
})();