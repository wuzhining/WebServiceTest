/* 启动时加载 */
/*
 */

(function() {
	function companyInfo() {
				initGridData = function() {
					var dgrid = $('#company_tab').datagrid('options');
					if (!dgrid)
						return;
					var reqData = {
						IFS : 'B000049',
						pageIndex : 1,
						pageSize : dgrid.pageSize
					}
					reqGridData('/iPlant_ajax', 'company_tab', reqData);
				},
				bindGridData = function(reqData, jsonData) {
					var gridList = {
							name: 'company_tab',
							dataType: 'json',
							columns: [[
								{field: 'CP_CD',title: '公司编码',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
						        	   options:{required:true, validType:['length[1,30]','specialTextCharacter']}}},
								{field: 'CP_NM',title: '公司名称',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
						        	   options:{required:true, validType:['length[1,30]','specialTextCharacter']}}},
								{field: 'EL_TM',title: '成立时间',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'datebox'}}, 
						        {field: 'CP_ADR',title: '公司地址',width: 300,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
							           options:{validType:['length[1,100]','specialTextCharacter']}}}, 
							    {field: 'CP_WEB',title: '公司主页',width: 300,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
								       options:{validType:['length[1,25]']}}}, 
								{field: 'USE_YN',title: '是否启用',width: 100,align: 'center',formatter: function(value, row, index) {if(value == 'Y') { return '启用';} else { return '未启用';}},editor:{type:'checkbox',options:{on: 'Y',off: 'N'}}},
								{field: 'CP_RM',title: '备注',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
						        	   options:{validType:['length[1,100]','specialTextCharacter']}}}, 
								{field: 'CRT_ID',title: '创建人',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
								{field: 'CRT_DT',title: '创建时间',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
								{field: 'UPT_ID',title: '修改人',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
								{field: 'UPT_DT',title: '修改时间',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}
							]],
							/**结束编辑模式的操作*/
						     onEndEdit:function(index,row){
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
						    			var rowEdit = dataGrid.datagrid('getRows')[editIndex],edft = $(this).datagrid('getEditor', {index: editIndex,field: 'CP_CD'}),editorFt = edft.target,ftCd = editorFt.val();
						    			if(checkNotEmpty(rowEdit.editType)){
						    				if(rowEdit.editType=='add'){
						    					if(checkNotEmpty(ftCd)){
								    				var ajaxParam = {
														url : '/iPlant_ajax',
														dataType : 'JSON',
														data : {
															IFS : 'B000049',
															CP_CD : ftCd,
															pageIndex : 1,
															pageSize : 10
														},
														successCallBack : function(data) {
															rowNum = parseInt(data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS);
															if (rowNum > 0) {
																dataGrid.datagrid('selectRow', editIndex).datagrid('beginEdit', editIndex);
													       		showmessage.html('<font color=red>您输入的公司编码['+ ftCd + ']已有相同,请重新输入!</font>');
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
						    					if(!checkNotEmpty(row.editType)){//如果是修改的情况，ft_cd字段为只读模式
										    		ed = $(this).datagrid('getEditor', {index: index,field: 'CP_CD'});
										    		fc = ed.target;
										    		fc.prop('readonly',true);
									    		}
						    				}
						    			}else{
								    		 addDatagridEditor(dataGrid,index);
								    		 if(!checkNotEmpty(row.editType)){
										    		ed = $(this).datagrid('getEditor', {index: index,field: 'CP_CD'});
										    		fc = ed.target;
										    		fc.prop('readonly',true);
									    		}
						    			}
						    		}else{
						    			addDatagridEditor(dataGrid,index);
						    			if(!checkNotEmpty(row.editType)){
								    		ed = $(this).datagrid('getEditor', {index: index,field: 'CP_CD'});
								    		fc = ed.target;
								    		fc.prop('readonly',true);
							    		}
						    		}
						    	}
				            },
						}
					initGridView(reqData, gridList);
					dataGrid.datagrid('loadData', jsonData);
				}
	}

	companyInfo.prototype = {
		init : function() {
			$(function() {
				dataGrid = $('#company_tab'),dataCompany=[],dataFactory=[],showmessage=$('#showMessageInfo'),editIndex = undefined,oldRow=undefined, reg=new RegExp("null","g");
				$("body")[0].onkeydown = keyPress;
                $("body")[0].onkeyup = keyRelease;
				var CompanyOpttype; // 0：新增 1:编辑
				initGridData();
				$('.add').click(function() {
					insertDataGrid('company_tab',{CP_CD:"",CP_NM:""});
				})
				$('.delete').click(function() {
					deleteDataGrid('company_tab','CP_CD','B000051','showMessageInfo');
				})

				$('.save').click(function() {
					saveDataGrid('company_tab','B000050','B000052','showMessageInfo');
				})
				$('.panel-tool-close').click(function() {
					setDataNull();
				});
			});
		}
	}
	var cmfo = new companyInfo();
	cmfo.init();
})();
