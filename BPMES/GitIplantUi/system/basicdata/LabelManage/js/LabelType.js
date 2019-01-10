
/* 启动时加载 */
/*
 */
(function() {
	function labelType() {
		/**初始化combobox内容*/
		initGridData = function() {
			var dgrid = dataGrid.datagrid('options');
			if(!dgrid) return;
			var reqData = {
				IFS: 'L000001',
				pageIndex: 1,
				pageSize: dgrid.pageSize
			}
			reqGridData('/iPlant_ajax', 'labeltype_tab', reqData);
		},
		bindGridData = function(reqData, jsonData) {
			var gridList = {
				name: 'labeltype_tab',
				dataType: 'json',
				columns: [[
					// {field : "CZ",width : 10,checkbox : true},
					{ field: 'CD',hidden:true, title: '编码', width: 100,align:'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
					{ field: 'LB_TY', title: '标签种类', width: 150,align:'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
			        	   options:{required:true,validType:['length[1,25]','specialTextCharacter']}}}, 
					{ field: 'LB_TY_DES', title: '种类描述', width: 100,align:'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
			        	   options:{required:true,validType:['length[1,25]','specialTextCharacter']}}}, 
			        { field: 'REMARK', title: '备注', width: 200,align:'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
				        	options:{validType:['length[1,25]','specialTextCharacter']}}},
					{ field: 'CRT_ID', title: '创建人', width: 100,align:'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
					{ field: 'CRT_DT', title: '创建时间', width:200,align:'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
					{ field: 'UP_DT', title: '修改时间', width: 200,align:'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}
					]],
				/**结束编辑模式的操作*/
			     onEndEdit:function(index,row){
			    	 //combobox 设置值
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
			    		var ed,cd,editorFt;
			    		if(editIndex!=undefined){
		    				/**判断是否为新增行，并验证新增标签编码重复*/
			    			var rowEdit = dataGrid.datagrid('getRows')[editIndex],edft = $(this).datagrid('getEditor', {index: editIndex,field: 'LB_TY'}),editorFt = edft.target,lbty = editorFt.val();
			    			if(checkNotEmpty(rowEdit.editType)){
			    				if(rowEdit.editType=='add'){
			    					if(checkNotEmpty(lbTy)){
					    				var ajaxParam = {
											url : '/iPlant_ajax',
											dataType : 'JSON',
											data : {
												IFS : 'L000001',
												LB_TY : lbTy,
												pageIndex : 1,
												pageSize : 10
											},
											successCallBack : function(data) {
												rowNum = parseInt(data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS);
												if (rowNum > 0) {
													dataGrid.datagrid('selectRow', editIndex).datagrid('beginEdit', editIndex);
										       		showmessage.html('<font color=red>您输入的标签类型['+ lbTy + ']已有相同,请重新输入!</font>');
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
			    					if(!checkNotEmpty(row.editType)){//如果是修改的情况，LB_TY字段为只读模式
							    		ed = $(this).datagrid('getEditor', {index: index,field: 'LB_TY'});
							    		cd = ed.target;
							    		cd.prop('readonly',true);
						    		}
			    				}
			    			}else{
					    		 addDatagridEditor(dataGrid,index);
					    		 if(!checkNotEmpty(row.editType)){
							    		ed = $(this).datagrid('getEditor', {index: index,field: 'LB_TY'});
							    		cd = ed.target;
							    		cd.prop('readonly',true);
						    		}
			    			}
			    		}else{
			    			addDatagridEditor(dataGrid,index);
			    			if(!checkNotEmpty(row.editType)){
					    		ed = $(this).datagrid('getEditor', {index: index,field: 'LB_TY'});
					    		cd = ed.target;
					    		cd.prop('readonly',true);
				    		}
			    		}
			    	}
	            }
			}
			initGridView(reqData, gridList);
			dataGrid.datagrid('loadData', jsonData);
		},
		getDataByCondition = function (){
			var queryLabelType = $('#queryLabelType').textbox('getValue');
			var dgrid = dataGrid.datagrid('options');
	        var reqData ={
	          LB_TY: queryLabelType,
	          IFS:'L000001',
	          pageIndex:1,
	          pageSize:dgrid.pageSize
	        };
	        reqGridData('/iPlant_ajax','labeltype_tab',reqData)
		}
	}

labelType.prototype = {
		init: function() {
			$(function() {
				//初始化全局变量对象
				dataGrid = $('#labeltype_tab'),showmessage=$('#showMessageInfo'),editIndex = undefined,oldRow=undefined, reg=new RegExp("null","g");
				initGridData();
				
				$('#btnSearch').click(function(){
		        	  getDataByCondition(); 
		         });
				
				$('.add').click(function() {
					console.log(editIndex);
					insertDataGrid('labeltype_tab',{CD:autoCreateCode('SYS')});
				});
				
				$('.delete').click(function(){
					deleteDataGrid('labeltype_tab','CD','L000003','showMessageInfo');
	            });

				$('.save').click(function() {
					saveDataGrid('labeltype_tab','L000002','L000004','showMessageInfo');
				});
			});
		}
	}
	var fcfo = new labelType();
	fcfo.init();
})();