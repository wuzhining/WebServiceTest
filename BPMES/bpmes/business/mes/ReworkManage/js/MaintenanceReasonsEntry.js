/* 启动时加载 */
/*
 */
(function() {
	function factoryInfo() {
		initGridData = function() {
			QueryProcess();
			var dgrid = dataGrid.datagrid('options');
			if(!dgrid) return;
			
			var reqData = {
				IFS: 'E000020',
				pageIndex: 1,
				pageSize: dgrid.pageSize
			}
			reqGridData('/iPlant_ajax', 'MaintenanceReasonsEntry_tab', reqData);
			
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
	                data: {IFS:'E000024'},
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
		
		
		bindGridData = function(reqData, jsonData) {
			var gridList = {
				name: 'MaintenanceReasonsEntry_tab',
				dataType: 'json',
				columns: [[
							{field: 'FCT_CD',title: '工厂名称',width: 120,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + ( row.FCT_NM  || value)+ "</span>";},
								   	editor:{type:'combobox',options:{valueField:'value',textField:'text',data:dataTmp,required:true,editable:false}}},
			        	    {field: 'MT_CAUSE_CD',title: '维修原因编码',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
			        	    		options:{required:true, validType:['length[1,50]','specialTextCharacter']}}}, 
			        	    {field: 'MT_CAUSE_NM',title: '维修原因名称',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
			        	    		options:{required:true, validType:['length[1,50]','specialTextCharacter']}}}, 
			        	    {field: 'PRNT_CD',title: '顶层架构编码',width: 100,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" +  value + "'>" + value+ "</span>";},
			        	    		editor:{type:'combobox',options:{valueField:'value',textField:'text',data:dataPi,required:true,editable:false}}},
			        	    {field: 'PRNT_NM',title: '顶层架构名称',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
				        	{field: 'USE_YN',title: '是否启用',width: 100,align: 'center',formatter: function(value, row, index) {if(value == 'Y') { return '启用';} else { return '未启用';}},editor:{type:'checkbox',
				        			options:{on: 'Y',off: 'N'}}},
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
		        	var tabName,dialogName,titleName,rowEdit,editem,editorFt,itemCD,reqData,dgrid;
		        	var rows = dataGrid.datagrid('getRows'),row = rows[index];
		        	/**判断是否为可编辑字段*/			/*1.属性框接口    2.设置框接口*/
		        	
			        	if (editIndex != index){
				    		var ed,fc,editorFt;
				    		if(editIndex!=undefined){
			    				/**判断是否为新增行，并验证新增工单编码重复*/
				    			rowEdit = dataGrid.datagrid('getRows')[editIndex],editem = $(this).datagrid('getEditor', {index: editIndex,field: 'MT_CAUSE_CD'}),editorFt = editem.target,itemCD = editorFt.val();
				    			if(checkNotEmpty(rowEdit.editType)){
				    				if(rowEdit.editType=='add'){
				    					if(checkNotEmpty(itemCD)){
						    				var ajaxParam = {
												url : '/iPlant_ajax',
												dataType : 'JSON',
												data : {
													IFS : 'E000020',
													MT_CAUSE_CD : itemCD,
													pageIndex : 1,
													pageSize : 10
												},
												successCallBack : function(data) {
													rowNum = parseInt(data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS);
													if (rowNum > 0) {
														dataGrid.datagrid('selectRow', editIndex).datagrid('beginEdit', editIndex);
											       		showmessage.html('<font color=red>您输入的物料编码['+ itemCD + ']已有相同,请重新输入!</font>');
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
								    		ed = $(this).datagrid('getEditor', {index: index,field: 'MT_CAUSE_CD'});
								    		fc = ed.target;
								    		fc.prop('readonly',true);
							    		}
				    				}
				    			}else{
						    		 addDatagridEditor(dataGrid,index);
						    		 if(!checkNotEmpty(row.editType)){
								    		ed = $(this).datagrid('getEditor', {index: index,field: 'MT_CAUSE_CD'});
								    		fc = ed.target;
								    		fc.prop('readonly',true);
							    		}
				    			}
				    		}else{
				    			addDatagridEditor(dataGrid,index);
				    			if(!checkNotEmpty(row.editType)){
						    		ed = $(this).datagrid('getEditor', {index: index,field: 'MT_CAUSE_CD'});
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
	
	
	savaStation=function(){
    	var MR_YN
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
		/*查询新增的父节点是否已存在*/   
		var work = {
                url: "/iPlant_ajax",
                dataType: "JSON",
                data: {IFS: "E000024",PRNT_CD:PRNT_CD},
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
            						IFS:'E000025'
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
                             IFS: 'E000023',		/*删除子节点（明细）*/
                             PRNT_CD: nodes.id
                         },
                         successCallBack:function(){
	                     	 var ajaxParamSon = {
	  	                            url: '/iPlant_ajax',
	  	                            dataType: 'JSON',
	  	                            data: {
	  	                                IFS: 'E000027',		/*删除父节点（主表）*/
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
	        	var node = $('#dd').tree('getSelected');
        	    var dgrid = $('#MaintenanceReasonsEntry_tab').datagrid('options');
				if(!dgrid) return;
				
				if(node['sT_P_CD']=="N/A"){
					var reqData = {
						PRNT_CD: node.id,
						IFS: 'E000020',
						pageIndex: 1,
						pageSize: dgrid.pageSize
					}
				}else{
					var reqData = {
						MT_CAUSE_CD: node.id,
						IFS: 'E000020',
						pageIndex: 1,
						pageSize: dgrid.pageSize
					}
				}
				reqGridData('/iPlant_ajax', 'MaintenanceReasonsEntry_tab', reqData);
	        },
	    }
	    initTree(treeConfig);
	    $('#dd').tree(treeConfig);

	},
	initLeftMenu = function () {
	    var reqData = {
	        IFS: 'E000024'
	    }
	    reqTreeData('/iPlant_ajax',reqData);
	}
	
	deleteDataGrid = function () {
		var checkedItems = $('#MaintenanceReasonsEntry_tab').datagrid('getSelections');
        if (checkedItems.length==0) {
            $.messager.alert('提示', '请选择一条数据进行删除');
            return;
        }
        /*确认提示框*/
        var delCnt=0,arrUpdate = new Array();;
        $.messager.confirm('确认框', '您确定要删除您所选择的数据吗?', function (r) {
           	if(r==true){
	           	 $.each(checkedItems, function (index, item) {
	           		arrUpdate.push({PRNT_CD:item.PRNT_CD,MT_CAUSE_CD:item.MT_CAUSE_CD});
	             });
                
           		 if(arrUpdate.length>0){
     	           	/*批量删除*/
                     var ajaxUpdate = {
                         url: '/iPlant_ajax',
                         dataType: 'JSON',
                         data: {
                             list: arrUpdate,
                             IFS: 'E000023'
                         },
                         successCallBack: function (data) {
                        	$('#showMessageInfo').html('<font color=red>删除成功！</font>');
                        	initGridData();
    						initLeftMenu();
    						bindTreeData();
                             return;
                         },
                         errorCallBack: function (data) {
                        	 $('#showMessageInfo').html('<font color=red>删除失败！</font>');
                             return;
                         }
                     };
                     iplantAjaxRequest(ajaxUpdate);

           		 }
           	}
        });      
	}
     
	searchDataGrid=function(dgrid){							
		var search_MaterialType = $('#search_SamplingItems').textbox('getValue');
		var PRNTCD = $("#search_DisplayArchitecture").combobox("getValue");
		var reqData = {
			IFS: 'E000020',
			MT_CAUSE_CD:search_MaterialType,
			PRNT_CD: PRNTCD,
			pageIndex: 1,
			pageSize: dgrid.pageSize
		}
		reqGridData('/iPlant_ajax', 'MaintenanceReasonsEntry_tab', reqData);
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
	
	
	factoryInfo.prototype = {
		init: function() {
			$(function() {
				/*初始化全局变量对象*/
				dataGrid = $('#MaintenanceReasonsEntry_tab'),dataCompany=[],dataTmp=[],dataPi=[],dataFactory=[],showmessage=$('#showMessageInfo'),editIndex = undefined,oldRow=undefined, reg=new RegExp("null","g");
				initGridData();
				bindTreeData();						/*初始化树结构*/
				initLeftMenu();
				$('#btnSearch').click(function() {				/*检索*/	
					searchDataGrid(dataGrid);
				});
				
				$('#btnAdd').click(function() {					/*增加*/
					insertDataGrid('MaintenanceReasonsEntry_tab',{USE_YN:"Y"});
				});
				
				$('#btnDelete').click(function(){				/*删除*/
					deleteDataGrid();
	            });
				
				$('#btnExprt').click(function(){
                	var now = new Date();
                    var year =now.getFullYear();
                	var reqData = {
                		IFS:'E000020'
                	}
                	createTable('tbIMESReport','维修原因录入导出','MaintenanceReasonsEntry_tab',reqData);
                });
				
				$('#btnSave').click(function() {					
					saveDataGrid('MaintenanceReasonsEntry_tab','E000021','E000022','showMessageInfo');
					initGridData();
					initLeftMenu();
					bindTreeData();
				});
				
				$('input[name=radios]').click(function(){
					var isChecked = $('input[name=radios]:checked').val();
					$('#check select').combobox({ disabled:true });
					$('#'+isChecked).combobox({ disabled:false });
				})
				
				$('#btnoriginality').click(function() {
					$("#enditTab").dialog("open").dialog('setTitle', '顶层结构配置信息');
				});
				
				 
				$('#btnRemove').click(function(){
					removeTheTopArchitecture();
				});
			});
		}
	}
	var fcfo = new factoryInfo();
	fcfo.init();
})();