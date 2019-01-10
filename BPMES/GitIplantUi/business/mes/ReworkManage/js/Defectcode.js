/* 启动时加载 */
/*
 */
(function() {
	function materialMaintenance() {
		initGridData = function() {
			QueryProcess();
			var dgrid = $("#Defectcode_tab").datagrid('options');
			if(!dgrid) return;
			searchDataGrid(dgrid);
			
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
			
			var pi = {
	                url: "/iPlant_ajax",
	                dataType: "JSON",
	                data: {IFS:'E0000018'},
	                successCallBack: function(a) {
	                	dataPi=[];
	                	var op = a.RESPONSE[0].RESPONSE_DATA;
	                    $.each(op,function(n,obj) {
	                    	dataPi.push({'text':obj.sT_C_NM,'value':obj.sT_C_CD});
					    });  
	                },
	                errorCallBack: function() {
	                    $.messager.alert("提示", '请联系管理员，查询失败！')
	                }
	            };
				iplantAjaxRequest(pi);
		}
		
		dataFactory=[],dataSer=[{'value':'','text':'-- 请选择 --'}];
		dataFactory.push({'value':"ACTINVE",'text':"ACTINVE"});
		dataFactory.push({'value':"INACTIVE",'text':"INACTIVE"});
		dataFactory.push({'value':"SCRAP",'text':"SCRAP"});
		bindGridData = function(reqData, jsonData) {
			var gridList = {
				name: 'Defectcode_tab',
				dataType: 'json',
				columns: [[ 
							{field: 'FCT_CD',title: '工厂名称',width: 120,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + ( row.FCT_NM  || value)+ "</span>";},
								   	editor:{type:'combobox',options:{valueField:'value',textField:'text',data:dataTmp,required:true,editable:false}}},
					        {field: 'MT_DEF_CD',title: '维修缺陷代码',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
						           	options:{required:true, validType:['length[1,30]','specialTextCharacter']}}},
							{field: 'MT_DEF_NM',title: '维修缺陷描述',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
					        	   	options:{required:true, validType:['length[1,30]','specialTextCharacter']}}},
					        {field: 'MT_FUN_ST',title: '状态',width: 100,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" +  value + "'>" +  (row.MT_FUN_ST || value)+ "</span>";},
					        		   editor:{type:'combobox',options:{valueField:'value',textField:'text',data:dataFactory,required:false}}},
						    {field: 'PRNT_CD',title: '顶层架构编码',width: 100,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" +  value + "'>" + value+ "</span>";},
									   editor:{type:'combobox',options:{valueField:'value',textField:'text',data:dataPi,required:true,editable:false}}},
				        	{field: 'PRNT_NM',title: '顶层架构名称',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},    
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
			    	 
			    	 var edditmp1 = $(this).datagrid('getEditor', {index: index,field: 'PRNT_CD'});
			    	 row.PRNT_CD = $(edditmp1.target).combobox('getValue');
			    	 row.PRNT_NM = $(edditmp1.target).combobox('getText');
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
				    			rowEdit = dataGrid.datagrid('getRows')[editIndex],editem = $(this).datagrid('getEditor', {index: editIndex,field: 'MT_DEF_CD'}),editorFt = editem.target,itemCd = editorFt.val();
				    			if(checkNotEmpty(rowEdit.editType)){
				    				if(rowEdit.editType=='add'){
				    					if(checkNotEmpty(itemCd)){
						    				var ajaxParam = {
												url : '/iPlant_ajax',
												dataType : 'JSON',
												data : {
													IFS : 'E0000013',
													MT_DEF_CD : itemCd,
													pageIndex : 1,
													pageSize : 10
												},
												successCallBack : function(data) {
													rowNum = parseInt(data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS);
													if (rowNum > 0) {
														dataGrid.datagrid('selectRow', editIndex).datagrid('beginEdit', editIndex);
											       		showmessage.html('<font color=red>您输入的维修缺陷编码['+ itemCd + ']已有相同,请重新输入!</font>');
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
				    					if(!checkNotEmpty(row.editType)){		/*如果是修改的情况，ft_cd字段为只读模式*/
								    		ed = $(this).datagrid('getEditor', {index: index,field: 'MT_DEF_CD'});
								    		fc = ed.target;
								    		fc.prop('readonly',true);
							    		}
				    				}
				    			}else{
						    		 addDatagridEditor(dataGrid,index);
						    		 if(!checkNotEmpty(row.editType)){
								    		ed = $(this).datagrid('getEditor', {index: index,field: 'MT_DEF_CD'});
								    		fc = ed.target;
								    		fc.prop('readonly',true);
							    		}
				    			}
				    		}else{
				    			addDatagridEditor(dataGrid,index);
				    			if(!checkNotEmpty(row.editType)){
						    		ed = $(this).datagrid('getEditor', {index: index,field: 'MT_DEF_CD'});
						    		fc = ed.target;
						    		fc.prop('readonly',true);
					    		}
				    		}
				    	}
		        	}
		        /**单击进入编辑模式*/
			}
			initGridView(reqData, gridList);
			dataGrid.datagrid('loadData', jsonData);
			
			
		},
		
		/*查询维修缺陷明细*/
		searchDataGrid=function(){
			var dgrid=$("#Defectcode_tab").datagrid("options"),MT_DEF_CD = $('#MT_DEF_CD').textbox('getValue'),PRNT_CD = $('#PRNT_CD').combobox('getValue');;
			var reqData = {
				IFS: 'E0000013',
				MT_DEF_CD:MT_DEF_CD,
				PRNT_CD:PRNT_CD,
				pageIndex: 1,
				pageSize:dgrid.pageSize
			}
			reqGridData('/iPlant_ajax', 'Defectcode_tab', reqData);
		},
		
		savaStation=function(){
			var FCT_CD = $('#search_FCT_CD').combobox('getValue');
        	var prnid = $('input[name=radios]:checked').val();
			var PRNT_CD = $('#'+prnid).combobox('getValue');
			var PRNT_NM = $('#'+prnid).combobox('getText');
			var MR_YNs = $('#MR_YN').prop('checked');
			if(MR_YNs ==true){
				MR_YN = 'Y'
			}else{
				MR_YN = 'N'
			}
			var insert = [{
				FCT_CD:FCT_CD,PRNT_CD:PRNT_CD,PRNT_NM:PRNT_NM,MR_YN:MR_YN,USE_YN:'Y'
			}];
			/*查询新增的父节点是否已存在*/   
			var work = {
                    url: "/iPlant_ajax",
                    dataType: "JSON",
                    data: {IFS: "E0000018",PRNT_CD:PRNT_CD},
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
                						IFS:'E000006'
                					},
                					successCallBack: function(data){
                						$("#enditTab").dialog("close");
                						initGridData();
                						initLeftMenu();
                						bindTreeData();
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
	      	 }else if(nodes.sT_P_CD != 'N/A'){
	      		 $('#showMessageInfo').html('<font color=red>请选中顶层节点进行删除！</font>');
	      		 return;
	      	 }else{
	      		 $.messager.confirm('确认框', '您确定要删除当前顶层架构?', function (row) {
	    	           	if(row==true){
	                 	 var ajaxParam = {
	                          url: '/iPlant_ajax',
	                          dataType: 'JSON',
	                          data: {
	                              IFS: 'E0000016',		/*删除子节点（明细）*/
	                              PRNT_CD: nodes.id
	                          },
	                          successCallBack:function(){
	                      	 var ajaxParamSon = {
	   	                            url: '/iPlant_ajax',
	   	                            dataType: 'JSON',
	   	                            data: {
	   	                                IFS: 'E000008',		/*删除父节点（主表）*/
	   	                                PRNT_CD: nodes.id
	   	                            },
	   	                            successCallBack:function(){
	   	                            	initGridData();
		   	         					initLeftMenu();
		   	         					bindTreeData();
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
		        	console.log(node)
		            if (node['sT_C_NM']) {
		                var dgrid = $('#Defectcode_tab').datagrid('options');
						if(!dgrid) return;
						if(node['sT_P_CD']=="N/A"){
							var reqData = {
								PRNT_CD: node.id,
								IFS: 'E0000013',
								pageIndex: 1,
								pageSize: dgrid.pageSize
							}
						}else{
							var MT_DEF_CD = node['sT_C_CD'];
							var MT_DEF_NM = node['sT_C_NM'];
							var PRNT_CD = node['sT_P_CD'];
							var reqData = {
								MT_DEF_CD:MT_DEF_CD,
								MT_DEF_NM:MT_DEF_NM,
								PRNT_CD:PRNT_CD,
								IFS: 'E0000013',
								pageIndex: 1,
								pageSize: dgrid.pageSize
							}
						}
						reqGridData('/iPlant_ajax', 'Defectcode_tab',reqData);
		            }
		        },
		    }
		    initTree(treeConfig);
		    $('#dd').tree(treeConfig);

		},
		initLeftMenu = function () {
		    var reqData = {
		        IFS: 'E0000018'
		    }
		    reqTreeData('/iPlant_ajax',reqData);
		}
		
	}
	
	 /*给工厂编码和工序下拉赋值*/
    QueryProcess=function(){
   	 /*工序下拉*/
    /*拉下选择框的禁用和启用*/
    $('#check select').combobox({ disabled:true });
    
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
   	 
   	 /*机型下拉*/
   	 var ajaxParam3={
	                url:'/iPlant_ajax',
	                data:{
	                    IFS:'Z000007',
	                },
	                successCallBack:function(data){
	                	$('#search_Modle').combobox('clear');
	                    var rowCollection=createSourceObj(data); 
	                    var arr3 = [];
	                    
	                    for(var i=0; i< data.RESPONSE[0].RESPONSE_DATA.length; i++){
	                    	if(data.RESPONSE[0].RESPONSE_DATA[i].MODEL_CD !=null){
	                    		arr3.push({"value":data.RESPONSE[0].RESPONSE_DATA[i].MODEL_CD, "text":data.RESPONSE[0].RESPONSE_DATA[i].MODEL_NM});
	                    		
	                    	}else{
	                    		
	                    	}
	                    }
	                    $('#search_Modle').combobox({
	                        data:arr3,
	                        valueField:'value',
	                        textField:'text',
	                        panelWidth:200
	                    });
	                }
	            }
	            iplantAjaxRequest(ajaxParam3);
   	 
	       	 /*物料编码*/
	         var ajaxParam4={
	                 url:'/iPlant_ajax',
	                 data:{
	                     IFS:'Z000051',
	                 },
	                 successCallBack:function(data){
	                 	$('#search_ITEMCD').combobox('clear');
	                     var arr4 = [];
	                     var op = data.RESPONSE[0].RESPONSE_DATA;
	                     $.each(op,function(n,obj) {
	                     	arr4.push({'text':obj.BOM_CD+"("+obj.BOM_NM+")",'value':obj.BOM_CD});
	 				    }); 
	                     
	                     $('#search_ITEMCD').combobox({
	                         data:arr4,
	                         valueField:'value',
	                         textField:'text',
	                         panelWidth:230
	                     });
	                 }
	             }
	             iplantAjaxRequest(ajaxParam4);
    	}
	
	materialMaintenance.prototype = {
		init: function() {
			$(function() {
				/*初始化全局变量对象*/
				dataGrid = $('#Defectcode_tab'),dataPi=[],dataTmp=[],dataCompany=[],dataFactory=[],showmessage=$('#showMessageInfo'),editIndex = undefined,oldRow=undefined, reg=new RegExp("null","g");
				bindTreeData();
				initLeftMenu();
				initGridData();
				$('#btnSearch').click(function() {					
					searchDataGrid();
				});
				$('#btnAdd').click(function() {					
					insertDataGrid('Defectcode_tab',{});
				});
				
				$('#btnDelete').click(function(){
					deleteDataGrid('Defectcode_tab','MT_DEF_CD','E0000016','showMessageInfo');
					initGridData();
					initLeftMenu();
					bindTreeData();
	            });

				$('#btnSave').click(function() {
					saveDataGrid('Defectcode_tab','E0000014','E0000015','showMessageInfo');
					initGridData();
					initLeftMenu();
					bindTreeData();
				});
				$('#btnCreate').click(function() {					
					$("#enditTab").dialog("open").dialog('setTitle', '顶层架构信息');
				});
				$('#btnRemove').click(function() {					
					removeTheTopArchitecture();
				});
				$('.panel-tool-close').click(function() {
					editIndex = undefined;
					$('#showMessageInfo').html('');
					$('#showMSDInfo').html('');
				});
				
				$('#btnExprt').click(function(){
                	var now = new Date();
                    var year =now.getFullYear();
                	var reqData = {
                		IFS:'E0000013'
                	}
                	createTable('tbIMESReport','缺陷代码维护导出','Defectcode_tab',reqData);
                });
				
				$('input[name=radios]').click(function(){
					var isChecked = $('input[name=radios]:checked').val();
					$('#check select').combobox({ disabled:true });
					$('#'+isChecked).combobox({ disabled:false });
				})
			});
		}
	}
	var fcfo = new materialMaintenance();
	fcfo.init();
})();