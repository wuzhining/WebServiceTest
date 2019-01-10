/* 启动时加载 */
/*
 */
(function() {
	function postInfo() {
		initGridData = function() {
				var dgrid = $('#postInfo_tab').datagrid('options');
				if(!dgrid) return;
				var reqData = {
					IFS: 'D000020',
					pageIndex: 1,
					pageSize: dgrid.pageSize
				}
				reqGridData('/iPlant_ajax', 'postInfo_tab', reqData);
			},
			bindGridData = function(reqData, jsonData) {
				var gridList = {
						name: 'postInfo_tab',
						dataType: 'json',
						columns: [[
							{field: 'PS_CD',title: '岗位编码',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
					        	   options:{required:true, validType:['length[1,30]','specialTextCharacter']}}},
							{field: 'PS_NM',title: '岗位名称',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
					        	   options:{required:true, validType:['length[1,30]','specialTextCharacter']}}},
							{field: 'PS_ST',title: '岗位状态',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
					        	   options:{validType:['length[1,25]','specialTextCharacter']}}}, 
							{field: 'DPT_CD',title: '所属部门',width: 150,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + ( row.CP_NM  || value)+ "</span>";},
								editor:{type:'combobox',options:{valueField:'value',textField:'text',data:dataDept,required:true,editable:false}}}, 
							{field: 'USE_YN',title: '是否启用',width: 100,align: 'center',formatter: function(value, row, index) {if(value == 'Y') { return '启用';} else { return '未启用';}},editor:{type:'checkbox',options:{on: 'Y',off: 'N'}}},
							{field: 'PS_RM',title: '备注',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
					        	   options:{validType:['length[1,100]','specialTextCharacter']}}}, 
							{field: 'CRT_ID',title: '创建人',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
							{field: 'CRT_DT',title: '创建时间',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
							{field: 'UPT_ID',title: '修改人',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
							{field: 'UPT_DT',title: '修改时间',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}
						]],
						/**结束编辑模式的操作*/
					     onEndEdit:function(index,row){
					    	 var ed = $(this).datagrid('getEditor', {index: index,field: 'DPT_CD'});
					    	 row.DPT_CD = $(ed.target).combobox('getValue');
					    	 row.DPT_NM = $(ed.target).combobox('getText');
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
					    			var rowEdit = dataGrid.datagrid('getRows')[editIndex],edft = $(this).datagrid('getEditor', {index: editIndex,field: 'PS_CD'}),editorFt = edft.target,ftCd = editorFt.val();
					    			if(checkNotEmpty(rowEdit.editType)){
					    				if(rowEdit.editType=='add'){
					    					if(checkNotEmpty(ftCd)){
							    				var ajaxParam = {
													url : '/iPlant_ajax',
													dataType : 'JSON',
													data : {
														IFS : 'D000020',
														PS_CD : ftCd,
														pageIndex : 1,
														pageSize : 10
													},
													successCallBack : function(data) {
														rowNum = parseInt(data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS);
														if (rowNum > 0) {
															dataGrid.datagrid('selectRow', editIndex).datagrid('beginEdit', editIndex);
												       		showmessage.html('<font color=red>您输入的工厂编码['+ ftCd + ']已有相同,请重新输入!</font>');
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
									    		ed = $(this).datagrid('getEditor', {index: index,field: 'PS_CD'});
									    		fc = ed.target;
									    		fc.prop('readonly',true);
								    		}
					    				}
					    			}else{
							    		 addDatagridEditor(dataGrid,index);
							    		 if(!checkNotEmpty(row.editType)){
									    		ed = $(this).datagrid('getEditor', {index: index,field: 'PS_CD'});
									    		fc = ed.target;
									    		fc.prop('readonly',true);
								    		}
					    			}
					    		}else{
					    			addDatagridEditor(dataGrid,index);
					    			if(!checkNotEmpty(row.editType)){
							    		ed = $(this).datagrid('getEditor', {index: index,field: 'PS_CD'});
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
		getDataBySearch = function(){
				var dgrid = $('#postInfo_tab').datagrid('options');
				if(!dgrid) return;
				var postInfoCode = $('#postInfoCode').val();
				var postInfoName = $('#postInfoName').val();
				var postIndoUse =$('#postIndoUse').combobox('getValue');
				var reqData = {
					PS_CD: postInfoCode,
					PS_NM: postInfoName,
					USE_YN: postIndoUse,
					IFS: 'D000020',
					pageIndex: 1,
					pageSize: dgrid.pageSize
				}
				reqGridData('/iPlant_ajax', 'postInfo_tab',reqData);
		}
	}
	postInfo.prototype = {
		init: function() {
			$(function() {
				dataGrid = $('#postInfo_tab'),dataDept=[],dataFactory=[],showmessage=$('#showMessageInfo'),editIndex = undefined,oldRow=undefined, reg=new RegExp("null","g");
				$("body")[0].onkeydown = keyPress;
                $("body")[0].onkeyup = keyRelease;
				var CompanyOpttype; //0：新增   1:编辑
				initGridData();

				var dept = {
	                url: "/iPlant_ajax",
	                dataType: "JSON",
	                data: {IFS: "D000024",USE_YN:"Y"},
	                successCallBack: function(a) {
	                	var op = a.RESPONSE[0].RESPONSE_DATA;
	                    $.each(op,function(n,obj) {
	                    	dataDept.push({'value':obj.DPT_CD,'text':obj.DPT_NM});
					    });  
	                },
	                errorCallBack: function() {
	                    $.messager.alert("提示", '请联系管理员，查询失败！')
	                }
	            };
				iplantAjaxRequest(dept),
				$('#btnSearch').click(function() {
					getDataBySearch();
					
				});
				$('#btnFreshen').click(function() {
					getDataBySearch();
					
				});
				$('#postIndoUse').combobox({
		              data:[
		              {value:'',text:'全部'},
		              {value:'Y',text:'启用'},
		              {value:'N',text:'不启用'}
		              ],
		              valueField:'value',
		              textField:'text',
		              panelHeight:80, 
		            });
				$('.add').click(function() {
					insertDataGrid('postInfo_tab',{PS_CD:"",PS_NM:""});
				});

				$('#btnDelete').click(function(){
					deleteDataGrid('postInfo_tab','PS_CD','D000018','showMessageInfo');
                });
				$('.save').click(function() {
					saveDataGrid('postInfo_tab','D000017','D000019','showMessageInfo');
				});
				$('.panel-tool-close').click(function() {
					setDataNull();
				});

			});
		}
	}
	var pofo = new postInfo();
	pofo.init();
})();