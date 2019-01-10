/* 启动时加载 */
/*
 */
(function() {
	function workShopArea() {
		initGridData = function() {
				var dgrid = $('#WorkShopArea_tab').datagrid('options');
				if(!dgrid) return;
				var reqData = {
					IFS: 'B000053',
					pageIndex: 1,
					pageSize: dgrid.pageSize
				}
				reqGridData('/iPlant_ajax', 'WorkShopArea_tab', reqData);
			},
			bindGridData = function(reqData, jsonData) {
				var gridList = {
						name: 'WorkShopArea_tab',
						dataType: 'json',
						columns: [[
							{field: 'LC_CD',title: '区域编码',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
					        	   options:{required:true, validType:['length[1,30]','specialTextCharacter']}}},
							{field: 'LC_NM',title: '区域名称',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
					        	   options:{required:true, validType:['length[1,30]','specialTextCharacter']}}},
							{field: 'LC_ST',title: '区域状态',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
					        	   options:{validType:['length[1,25]','specialTextCharacter']}}}, 
							{field: 'PL_CD',title: '所属车间',width: 150,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + ( row.LC_NM  || value)+ "</span>";},
								editor:{type:'combobox',options:{valueField:'value',textField:'text',data:dataStation,required:true,editable:false}}}, 
							{field: 'DICT_IT',title: '区域类别',width: 100,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" +  value + "'>" +  (row.DICT_IT_NM || value)+ "</span>";},
									editor:{type:'combobox',options:{valueField:'value',textField:'text',data:dataDidt,required:true}}}, 
							{field: 'USE_YN',title: '是否启用',width: 100,align: 'center',formatter: function(value, row, index) {if(value == 'Y') { return '启用';} else { return '未启用';}},editor:{type:'checkbox',options:{on: 'Y',off: 'N'}}},
							{field: 'LC_RM',title: '备注',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
					        	   options:{validType:['length[1,100]','specialTextCharacter']}}}, 
							{field: 'CRT_ID',title: '创建人',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
							{field: 'CRT_DT',title: '创建时间',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
							{field: 'UPT_ID',title: '修改人',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
							{field: 'UPT_DT',title: '修改时间',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}
						]],
						/**结束编辑模式的操作*/
					     onEndEdit:function(index,row){
					    	 var ed = $(this).datagrid('getEditor', {index: index,field: 'PL_CD'});
					    	 row.PL_CD = $(ed.target).combobox('getValue');
					    	 row.PL_NM = $(ed.target).combobox('getText');
					    	 var eddi = $(this).datagrid('getEditor', {index: index,field: 'DICT_IT'});
					    	 row.DICT_IT = $(eddi.target).combobox('getValue');
					    	 row.DICT_IT_NM = $(eddi.target).combobox('getText');
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
					    			var rowEdit = dataGrid.datagrid('getRows')[editIndex],edft = $(this).datagrid('getEditor', {index: editIndex,field: 'LC_CD'}),editorFt = edft.target,ftCd = editorFt.val();
					    			if(checkNotEmpty(rowEdit.editType)){
					    				if(rowEdit.editType=='add'){
					    					if(checkNotEmpty(ftCd)){
							    				var ajaxParam = {
													url : '/iPlant_ajax',
													dataType : 'JSON',
													data : {
														IFS : 'B000021',
														FT_CD : ftCd,
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
									    		ed = $(this).datagrid('getEditor', {index: index,field: 'LC_CD'});
									    		fc = ed.target;
									    		fc.prop('readonly',true);
								    		}
					    				}
					    			}else{
							    		 addDatagridEditor(dataGrid,index);
							    		 if(!checkNotEmpty(row.editType)){
									    		ed = $(this).datagrid('getEditor', {index: index,field: 'LC_CD'});
									    		fc = ed.target;
									    		fc.prop('readonly',true);
								    		}
					    			}
					    		}else{
					    			addDatagridEditor(dataGrid,index);
					    			if(!checkNotEmpty(row.editType)){
							    		ed = $(this).datagrid('getEditor', {index: index,field: 'LC_CD'});
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
			/*验证重复*/
			existworkShopArea = function(workShopArea) {
				var rowNum, tpm = $('#txtWorkShopAreaCode');
				if (CompanyOpttype == 0) {
					if(/[　，。、！？：“”［］——（）…！＠＃￥＆＊＋＞＜；：‘\u4e00-\u9fa5\s\n\r\t]+/.test($('#txtWorkShopAreaCode').textbox('getText'))){
			        	$.messager.alert('提示', "区域编码不能是中文和非法字符，请重新输入。","",function(){
							$('#txtWorkShopAreaCode').textbox('setValue', '');
							
						});
			        	return;
			        }
					if (tpm.val() != undefined && tpm.val() != ''
							&& tpm.val() != null) {
						if (workShopArea != undefined && workShopArea != ''
								&& workShopArea != null) {
							if (tpm.textbox('getValue') != undefined
									&& tpm.textbox('getValue') != ''
									&& tpm.textbox('getValue') != null) {
								var ajaxParam = {
									url : '/iPlant_ajax',
									dataType : 'JSON',
									data : {
										IFS : 'B000053',
										LC_CD : workShopArea,
										pageIndex : 1,
										pageSize : 10
									},
									successCallBack : function(data) {
										rowNum = parseInt(data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS);
										if (rowNum > 0) {
											$.messager
													.alert(
															'提示',
															'您输入的区域编码['
																	+ workShopArea
																	+ ']已有相同,请重新输入!');
											tpm.textbox('setValue', '');
											return false;
										} else {
											return 1;
										}
									}
								};
								iplantAjaxRequest(ajaxParam);
							}
						}
					}
				}
        }
		
		getDataBySearch = function(){
				var dgrid = $('#WorkShopArea_tab').datagrid('options');
				if(!dgrid) return;
				var workCode = $('#workCode').val();
				var workName = $('#workName').val();
				var workUse =$('#workUse').combobox('getValue');
				var reqData = {
						LC_CD: workCode,
						LC_NM: workName,
						USE_YN: workUse,
						IFS: 'B000053',
						pageIndex: 1,
						pageSize: dgrid.pageSize
				}
				reqGridData('/iPlant_ajax', 'WorkShopArea_tab',reqData);	
		}
	
	
		/* 修改商品移动信息 */
	
	}
	workShopArea.prototype = {
		init: function() {
			$(function() {
				dataGrid = $('#WorkShopArea_tab'),dataStation=[],dataDidt=[],showmessage=$('#showMessageInfo'),editIndex = undefined,oldRow=undefined, reg=new RegExp("null","g");
				$("body")[0].onkeydown = keyPress;
                $("body")[0].onkeyup = keyRelease;
				initGridData();
				var station = {
		                url: "/iPlant_ajax",
		                dataType: "JSON",
		                data: {IFS: "B000025",USE_YN:'Y'},
		                successCallBack: function(a) {
		                	var op = a.RESPONSE[0].RESPONSE_DATA;
		                    $.each(op,function(n,obj) {
		                    	dataStation.push({'value':obj.PL_CD,'text':obj.PL_NM});
						    });  
		                },
		                errorCallBack: function() {
		                    $.messager.alert("提示", '请联系管理员，查询失败！')
		                }
		            };
					iplantAjaxRequest(station);
					/**初始化工厂类型combobox内容*/
				var dict = {
		                url: "/iPlant_ajax",
		                dataType: "JSON",
		                data: {IFS:'D000008',DICT_CD:"CLC01",USE_YN:'Y'},
		                successCallBack: function(a) {
		                	var op = a.RESPONSE[0].RESPONSE_DATA;
		                    $.each(op,function(n,obj) {
		                    	dataDidt.push({'value':obj.DICT_IT,'text':obj.DICT_IT_NM});
						    });  
		                },
		                errorCallBack: function() {
		                    $.messager.alert("提示", '请联系管理员，查询失败！')
		                }
		            };
					iplantAjaxRequest(dict);
				$('#btnSearch').click(function() {
					getDataBySearch();
				});
				$('#btnFreshen').click(function() {
					getDataBySearch();
				});
				 $('#workUse').combobox({
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
					insertDataGrid('WorkShopArea_tab',{LC_CD:"",LC_NM:""});
				});

				$('#btnDelete').click(function(){
					deleteDataGrid('WorkShopArea_tab','LC_CD','B000055','showMessageInfo');
                });

				$('.save').click(function() {
					saveDataGrid('WorkShopArea_tab','B000054','B000056','showMessageInfo');
				});
				$('.panel-tool-close').click(function() {
					setDataNull();
				});
			});
		}
	}
	var wsa = new workShopArea();
	wsa.init();
})();