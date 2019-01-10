
/* 启动时加载 */
/*
 */
(function() {
	function materialMaintenance() {
		
		DisplayArchitecture=function(){
			dataPi=[],dataSer=[{'value':'','text':'-- 请选择 --'}];
    		var pi = {
                url: "/iPlant_ajax",
                dataType: "JSON",
                data: {
                    IFS: "Q000015"
                },
                successCallBack: function(a) {
                	var op = a.RESPONSE[0].RESPONSE_DATA;
                    $.each(op,function(n,obj) {
                    	dataPi.push({'value':obj.PRNT_CD,'text':obj.PRNT_NM});
                    	dataSer.push({'value':obj.PRNT_CD,'text':obj.PRNT_NM});
				    });  
                    $("#search_DisplayArchitecture").combobox("loadData", dataSer);
                    $("#search_DisplayArchitecture").combobox('select', dataSer[0].value);
                },
                errorCallBack: function() {
                    $.messager.alert("提示", e)
                }
            };
    		iplantAjaxRequest(pi);
		}
		
		initGridData = function() {
			var dgrid = $("#ProjectMaintain_tab").datagrid('options');
			if(!dgrid) return;
			DisplayArchitecture();
			QueryProcess();
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
			searchDataGrid(dgrid);
		}
		bindGridData = function(reqData, jsonData) {
			var gridList = {
				name: 'ProjectMaintain_tab',
				dataType: 'json',
				columns: [[  
							{field: 'FCT_CD',title: '工厂名称',width: 100,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" +  value + "'>" +  (row.FCT_NM || value)+ "</span>";},
				    	 	editor:{type:'combobox',options:{valueField:'value',textField:'text',data:dataFactory,required:true,editable:false}}},
				    	 	{field: 'PRNT_CD',title: '所属架构',width: 100,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" +  value + "'>" +  (row.PRNT_NM || value)+ "</span>";},
					    	 	editor:{type:'combobox',options:{valueField:'value',textField:'text',data:dataPi,required:true,editable:false}}},
				    	 	{field: 'SAMP_ITEM_CD',title: '检查项目编码',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
					        	   options:{required:true, validType:['length[1,50]','specialTextCharacter']}}},
				    	 	{field: 'SAMP_ITEM_NM',title: '检查项目名称',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
					        	   options:{required:true, validType:['length[1,50]','specialTextCharacter']}}},
							{field: 'SAMP_ITEM_DESC',title: '检查详情',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
					        	   options:{ validType:['length[1,50]','specialTextCharacter']}}},
					       
					        {field: 'USE_YN',title: '是否启用',width: 80,align: 'center',formatter: function(value, row, index) {if(value == 'Y') { return '是';} else { return '否';}},editor:{type:'checkbox',options:{on: 'Y',off: 'N'}}}, 
					        {field: 'MO',title: '备注',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
					        	   options:{ validType:['length[1,50]','specialTextCharacter']}}},
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
			    	 var edditmp2 = $(this).datagrid('getEditor', {index: index,field: 'PRNT_CD'});
			    	 row.PRNT_CD = $(edditmp2.target).combobox('getValue');
			    	 row.PRNT_NM = $(edditmp2.target).combobox('getText');
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
			        	if (editIndex != index){
				    		var ed,fc,editorFt;
				    		if(editIndex!=undefined){
			    				/**判断是否为新增行，并验证新增工厂编码重复*/
				    			rowEdit = dataGrid.datagrid('getRows')[editIndex]
				    			if(checkNotEmpty(rowEdit.editType)){
				    				
				    			}else{
						    		 addDatagridEditor(dataGrid,index);
						    		 if(!checkNotEmpty(row.editType)){
								    		ed = $(this).datagrid('getEditor', {index: index,field: 'FCT_CD'});
								    		fc = ed.target;
								    		fc.prop('readonly',true);
		    					    		ed2 = $(this).datagrid('getEditor', {index: index,field: 'SAMP_ITEM_CD'});
		    					    		fc2 = ed2.target;
		    					    		fc2.prop('readonly',true);
							    		}
				    			}
				    		}else{
				    			addDatagridEditor(dataGrid,index);
				    			if(!checkNotEmpty(row.editType)){
						    		ed = $(this).datagrid('getEditor', {index: index,field: 'FCT_CD'});
						    		fc = ed.target;
						    		fc.prop('readonly',true);
    					    		ed2 = $(this).datagrid('getEditor', {index: index,field: 'SAMP_ITEM_CD'});
    					    		fc2 = ed2.target;
    					    		fc2.prop('readonly',true);
					    		}
				    		}
				    	}
		        	}
		        /**单击进入编辑模式*/
			}
			initGridView(reqData, gridList);
			dataGrid.datagrid('loadData', jsonData);
			
		},
		
		setDataNull=function(){
			$("#checkboxProcess").prop('checked',false);
			$("#MR_YN").prop('checked',false);
		}
		
		/*查询维修方法明细*/
		searchDataGrid=function(){
			var dgrid=$("#ProjectMaintain_tab").datagrid("options");search_SamplingItems = $('#search_SamplingItems').textbox('getValue'),search_DisplayArchitecture = $('#search_DisplayArchitecture').combobox('getValue');
			var reqData = {
				IFS: 'Q000005',
				SAMP_ITEM_NM:search_SamplingItems,
				PRNT_CD:search_DisplayArchitecture,
				pageIndex: 1,
				pageSize:dgrid.pageSize
			}
			reqGridData('/iPlant_ajax', 'ProjectMaintain_tab', reqData);
		},
		/*创建右边树形结构*/
		bindTreeData = function (jsonData) {
		    var treeConfig = {
		        name: 'dd',
		        lines:true,
		        method: 'get',
		        parentField: "sT_P_CD",
		        textFiled: "sT_C_NM",
		        idFiled: "sT_C_CD",
		        data: jsonData,
		        onClick: function (node) {
		            if (node['sT_C_NM']) {
		                var dgrid = $('#ProjectMaintain_tab').datagrid('options');
						if(!dgrid) return;
						var P_CD = node['sT_P_CD'];
						var C_CD = node['sT_C_CD'];
						if(P_CD=='N/A'){
							var reqData = {
									PRNT_CD:C_CD,
									IFS: 'Q000005',
									pageIndex: 1,
									pageSize: dgrid.pageSize
								}
						}else{
							var reqData = {
									SAMP_ITEM_CD:C_CD,
									IFS: 'Q000005',
									pageIndex: 1,
									pageSize: dgrid.pageSize
								}
						}
						reqGridData('/iPlant_ajax', 'ProjectMaintain_tab',reqData);
		            }
		        },
		    }
		    initTree(treeConfig);
		    $('#dd').tree(treeConfig);

		},
		initLeftMenu = function () {
		    var reqData = {
		        IFS: 'Q000009'
		    }
		    reqTreeData('/iPlant_ajax',reqData);
		},
		checkDataValid = function() {
			if(document.getElementById("search_Process").type=="text"){
       		 	var a=$("#search_Process").textbox("getValue");
	 			if ("" == a) 
	 				return !1;
	 			return 1;
       	 	}else{
	       	 	var a=$("#search_Process").combobox("getValue");
	 			if ("" == a) 
	 				return !1;
	 			return 1;
       	 	}
			
         },
		savaStation=function(){
        	var MR_YN
			var FCT_CD = $('#search_FCT_CD').combobox('getValue');
			var PRNT_CD = $('#search_Process').combobox('getValue');
			var PRNT_NM = $('#search_Process').combobox('getText');
			var MR_YNs = $('#MR_YN').prop('checked');
			if(MR_YNs ==true){
				MR_YN = 'Y'
			}else{
				MR_YN = 'N'
			}
			/*查询新增的父节点是否已存在*/   
			var work = {
                    url: "/iPlant_ajax",
                    dataType: "JSON",
                    data: {IFS: "Q000015",PRNT_CD:PRNT_CD},
                    successCallBack: function(a) {
                    	if(a.RESPONSE[0].RESPONSE_DATA.length <= 0){
                    		/*增加树的父节点*/
                			ajaxParamTime = {
                					url: '/iPlant_ajax',
                					dataType: 'JSON',
                					data:{
                						FCT_CD:FCT_CD,
                						PRNT_CD:PRNT_CD,
                						PRNT_NM:PRNT_NM,
                						MR_YN:MR_YN,
                						USE_YN:'Y',
                						IFS:'Q000010'
                					},
                					successCallBack: function(data){
                						initLeftMenu();
                						bindTreeData();
                						$("#enditTab").dialog("close");
                					},
                				};
                			iplantAjaxRequest(ajaxParamTime);
                    	}else{
                    		$("#enditTab").dialog("close");
                    		$('#showMessageInfo').html('<font color=red>此顶层结构已存在</font>');
                    	}
                    },
                    errorCallBack: function() {
                        $.messager.alert("提示", '请联系管理员，查询失败！')
                    }
                };
    		iplantAjaxRequest(work);
		}
         
         removeTheTopArchitecture = function(){
        	 var nodes = $('#dd').tree('getSelected');
        	 if(nodes.id == null||nodes.id == ''){
        		 $('#showMessageInfo').html('<font color=red>请选中顶层节点进行删除！</font>');
        		 return;
        	 }else if(nodes.attr!='0'){
        		 $('#showMessageInfo').html('<font color=red>请选中顶层节点进行删除！</font>');
        		 return;
        	 }else{
        		 $.messager.confirm('确认框', '您确定要删除当前顶层架构?', function (row) {
      	           	if(row==true){
                   	 var ajaxParam = {
                            url: '/iPlant_ajax',
                            dataType: 'JSON',
                            data: {
                                IFS: 'Q000008',
                                PRNT_CD: nodes.id
                            },
                            successCallBack:function(){
                        	 var ajaxParamSon = {
     	                            url: '/iPlant_ajax',
     	                            dataType: 'JSON',
     	                            data: {
     	                                IFS: 'Q000017',
     	                                PRNT_CD: nodes.id
     	                            },
     	                            successCallBack:function(){
     	                            	initGridData();
     	                            	initLeftMenu();
     	                            }
     	                      };
     	                      iplantAjaxRequest(ajaxParamSon);
                            }
                      };
                      iplantAjaxRequest(ajaxParam);
  	           		}
                });
        	 }
         }
         
         /*给工厂编码和工序下拉赋值*/
         QueryProcess=function(){
        	 /*工序下拉*/
        	 var ajaxParam1={
		                url:'/iPlant_ajax',
		                data:{
		                    IFS:'GX00001',
		                },
		                successCallBack:function(data){
		                	$('#search_Process').combobox('clear');
		                    var rowCollection=createSourceObj(data); 
		                    var arr = [];
		                    for(var i=0; i< rowCollection.length; i++){
		                    	arr.push({"value":rowCollection[i].PRF_CD, "text":rowCollection[i].PRF_NAME});
		                    }
		                    $('#search_Process').combobox({
		                        data:arr,
		                        valueField:'value',
		                        textField:'text',
		                        panelWidth:200
		                    });
		                }
		            }
		            iplantAjaxRequest(ajaxParam1);
        	 
        	 /*工厂名称下拉*/
        	 var ajaxParam2={
		                url:'/iPlant_ajax',
		                data:{
		                    IFS:'B000021',
		                },
		                successCallBack:function(data){
		                	$('#search_FCT_CD').combobox('clear');
		                    var rowCollection=createSourceObj(data); 
		                    var arr2 = [];
		                    for(var i=0; i< rowCollection.length; i++){
		                    	arr2.push({"value":rowCollection[i].FT_CD, "text":rowCollection[i].FT_NM});
		                    }
		                    $('#search_FCT_CD').combobox({
		                        data:arr2,
		                        valueField:'value',
		                        textField:'text',
		                        panelWidth:200
		                    });
		                }
		            }
		            iplantAjaxRequest(ajaxParam2);
         	}
         
         
         
         
		
	}

	materialMaintenance.prototype = {
		init: function() {
			$(function() {
				/*初始化全局变量对象*/
				dataGrid = $('#ProjectMaintain_tab'),dataWork=[],dataPi=[],dataTmp=[],dataFactory=[],showmessage=$('#showMessageInfo'),editIndex = undefined,oldRow=undefined, reg=new RegExp("null","g");
				initLeftMenu();
				bindTreeData();
				initGridData();
				$('#btnSearch').click(function() {					
					searchDataGrid();
				});
				$('#btnAdd').click(function() {					
					insertDataGrid('ProjectMaintain_tab',{FCT_CD:dataFactory[0].value,USE_YN:"Y",PRNT_NM:dataPi[0].value});
				});
				
				$('#btnExprt').click(function(){
                	var now = new Date();
                    var year =now.getFullYear();
                	var reqData = {
                		IFS:'Q000005'
                	}
                	createTable('tbIMESReport','抽检项目维护导出','ProjectMaintain_tab',reqData);
                });
				
				$('#btnDelete').click(function(){
					var checkedItems = $('#ProjectMaintain_tab').datagrid('getSelections');
			        if (checkedItems.length==0) {
			            $.messager.alert('提示', '请选择一条数据进行删除！');
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
		                        	 SAMP_ITEM_CD: checkedItems[0].SAMP_ITEM_CD,
		                             IFS: 'Q000008'
		                         },
		                         successCallBack: function (data) {
		                        	$('#showMessageInfo').html('<font color=red>删除成功！</font>');
		                         	initGridData();
		                         	initLeftMenu();
		                             return;
		                         },
		                         errorCallBack: function (data) {
		                        	 $('#showMessageInfo').html('<font color=red>删除失败！</font>');
		                             return;
		                         }
		                     };
		                     iplantAjaxRequest(ajaxUpdate);
			           	}
			        }); 
					
	            });

				$('#btnSave').click(function() {
					tabName='ProjectMaintain_tab',insertIfs='Q000006',updateIfs='Q000007',messageId='showMessageInfo';
					var edDataGrid = $('#'+tabName);
			         if (endEditing(edDataGrid)){
			        	/*判断后变更数据*/
			        	if (edDataGrid.datagrid('getChanges').length) {
			                var inserted = edDataGrid.datagrid('getChanges', "inserted");  
			                var updated = edDataGrid.datagrid('getChanges', "updated");
			                var deleted = edDataGrid.datagrid('getChanges', "deleted");
			                /**装载数据*/
			                var arrInsert = new Array(),arrUpdate = new Array();
			                if(inserted.length>0){
			                	for(var m=0;m<inserted.length;m++){
			                		arrInsert.push(inserted[m]);
			                	}
			                	/*批量先增*/
			                    var ajaxInsert = {
			                        url: '/iPlant_ajax',
			                        dataType: 'JSON',
			                        data: {
			                            list: arrInsert,
			                            IFS: insertIfs
			                        },
			                        successCallBack: function (data) {
			                        	edDataGrid.datagrid('acceptChanges');
			                        	if(tabName=='WorkOrderMaterialInformationQuery_tab'){
			                        		initGridData();
			                        	}
			                        	$('#'+messageId).html('<font color=red>保存成功！</font>');
			                        	initLeftMenu();
			                            return;
			                        },
			                        errorCallBack: function (data) {
			                        	$('#'+messageId).html('<font color=red>保存失败！</font>');
			                            return;
			                        }
			                    };
			                    iplantAjaxRequest(ajaxInsert);
			                }
			                if(updated.length>0){
			                	for(var m=0;m<updated.length;m++){
			                		if(updated[m].edited){
			                			arrUpdate.push(updated[m]);
			                		}
			                	}
			                	/*批量修改*/
			                    var ajaxUpdate = {
			                        url: '/iPlant_ajax',
			                        dataType: 'JSON',
			                        data: {
			                            list: arrUpdate,
			                            IFS: updateIfs
			                        },
			                        successCallBack: function (data) {
			                        	edDataGrid.datagrid('acceptChanges');
			                        	$('#'+messageId).html('<font color=red>保存成功！</font>');
			                        	initLeftMenu();
			                            return;
			                        },
			                        errorCallBack: function (data) {
			                        	$('#'+messageId).html('<font color=red>保存失败！</font>');
			                            return;
			                        }
			                    };
			                    iplantAjaxRequest(ajaxUpdate);
			                }
			            }else{
			            	$('#'+messageId).html('<font color=red>没有进行变更！</font>');
			            }
					}else{
						$('#'+messageId).html('<font color=red>请输入必填项！</font>');
					}
				});
				$('#btnCreate').click(function() {	
					$("#topProcess").html("");
					$.parser.parse($("#topProcess").html("<input id='search_Process' name='Process' style='width: 200px;' class='easyui-textbox' />"));
					$("#enditTab").dialog("open").dialog('setTitle', '顶层架构信息');
					$("#checkboxProcess").click(function () {
						 if(this.checked){
							 
						 }else{
							 
						 }
					 });
					$("#MR_YN").click(function () {
						if(this.checked){
							
						}else{
							
						}
					});
					
				});
				
				$('#btnRemove').click(function(){
					removeTheTopArchitecture();
				})
				
				
				$('.panel-tool-close').click(function() {
					editIndex = undefined;
					$('#showMessageInfo').html('');
					$('#showMSDInfo').html('');
				});
				
				
			});
		}
	}
	var fcfo = new materialMaintenance();
	fcfo.init();
})();