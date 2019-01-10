/* 启动时加载 */
/*
 */
(function() {
	function classGrounp() {
		initGridData = function() {
			var dgrid = dataGrid.datagrid('options');
			if(!dgrid) return;
			var reqData = {
				IFS: 'B000113',
				pageIndex: 1,
				pageSize: dgrid.pageSize
			}
			reqGridData('/iPlant_ajax', 'classgrounp_tab', reqData);
		},
		bindGridData = function(reqData, jsonData) {
			var gridList = {
				name: 'classgrounp_tab',
				dataType: 'json',
				columns: [[
					{field: 'TG_CD',title: '班组代码',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
			        	   options:{required:true, validType:['length[1,15]','specialTextCharacter']}}},
				    {field: 'TG_NM',title: '班组描述',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
					       options:{validType:['length[1,100]','specialTextCharacter']}}},
					{field: 'TG_LD',title: '班组长',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
					       options:{validType:['length[1,100]','specialTextCharacter']}}},
					{field: 'PD_LN_CD',title: '产线代码',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
					       options:{validType:['length[1,100]','specialTextCharacter']}}},
					{field: 'TG_NUM',title: '班组人数',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
				           options:{validType:['length[1,15]','specialTextCharacter']}}},
				    {field: 'TT_PD',title: '目标生产效率',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
					       options:{validType:['length[1,15]','specialTextCharacter']}}},
					{field: 'CRT_ID',title: '创建人',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
					{field: 'CRT_DT',title: '创建时间',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
				]],
    	     	            	 
				/**结束编辑模式的操作*/
			     onEndEdit:function(index,row){
			    	 //
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
			    			var rowEdit = dataGrid.datagrid('getRows')[editIndex],edft = $(this).datagrid('getEditor', {index: editIndex,field: 'TG_CD'}),editorFt = edft.target,cd = editorFt.val();
			    			if(checkNotEmpty(rowEdit.editType)){
			    				if(rowEdit.editType=='add'){
			    					if(checkNotEmpty(cd)){
					    				var ajaxParam = {
											url : '/iPlant_ajax',
											dataType : 'JSON',
											data : {
												IFS : 'B000113',
												PT_CD : cd,
												pageIndex : 1,
												pageSize : 10
											},
											successCallBack : function(data) {
												rowNum = parseInt(data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS);
												if (rowNum > 0) {
													dataGrid.datagrid('selectRow', editIndex).datagrid('beginEdit', editIndex);
										       		showmessage.html('<font color=red>您输入的班组编码['+ cd + ']已有相同,请重新输入!</font>');
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
			    					if(!checkNotEmpty(row.editType)){//如果是修改的情况，TG_CD字段为只读模式
							    		ed = $(this).datagrid('getEditor', {index: index,field: 'TG_CD'});
							    		fc = ed.target;
							    		fc.prop('readonly',true);
						    		}
			    				}
			    			}else{
					    		 addDatagridEditor(dataGrid,index);
					    		 if(!checkNotEmpty(row.editType)){
							    		ed = $(this).datagrid('getEditor', {index: index,field: 'TG_CD'});
							    		fc = ed.target;
							    		fc.prop('readonly',true);
						    		}
			    			}
			    		}else{
			    			addDatagridEditor(dataGrid,index);
			    			if(!checkNotEmpty(row.editType)){
					    		ed = $(this).datagrid('getEditor', {index: index,field: 'TG_CD'});
					    		fc = ed.target;
					    		fc.prop('readonly',true);
				    		}
			    		}
			    	}
	            }
			}
			initGridView(reqData, gridList);
			dataGrid.datagrid('loadData', jsonData);
		}
		getDataByCondition =function (){
			var classGrounpCode = $('#classGrounpCode').textbox('getValue');
			var txtClassGrounp = $('#txtClassGrounp').textbox('getValue');
			var productionLineCode = $('#productionLineCode').textbox('getValue');
			var dgrid = dataGrid.datagrid('options');
	        var reqData ={
	        	TG_CD : classGrounpCode,
	        	TG_NM : txtClassGrounp,
	        	PD_LN_CD : productionLineCode,
	        	IFS:'B000113',
	        	pageIndex:1,
	        	pageSize:dgrid.pageSize
	        };
	        reqGridData('/iPlant_ajax','classgrounp_tab',reqData)
	      }
	}

	classGrounp.prototype = {
			init: function() {
				$(function() {
					//初始化全局变量对象
					dataGrid = $('#classgrounp_tab'),showmessage=$('#showMessageInfo'),editIndex = undefined,oldRow=undefined, reg=new RegExp("null","g");
					initGridData();
					
					$('#btnSearch').click(function(){
			        	  getDataByCondition(); 
					});
					
					$('.add').click(function() {					
						insertDataGrid('classgrounp_tab',{CD:autoCreateCode('SYS')});
					});
					
					$('.delete').click(function(){
						deleteDataGrid('classgrounp_tab','CD','B000115','showMessageInfo');
		            });

					$('.save').click(function() {
						saveDataGrid('classgrounp_tab','B000114','B000116','showMessageInfo');
					});
				});
			}
		}
	var fcfo = new classGrounp();
	fcfo.init();
})();