/* 启动时加载 */
/*
 */
(function() {
	function productionLineMaintenance() {
		initGridData = function() {
			var workshop = {
                url: "/iPlant_ajax",
                dataType: "JSON",
                data: {IFS: "B000025"},
                successCallBack: function(a) {
                	var op = a.RESPONSE[0].RESPONSE_DATA;
                    $.each(op,function(n,obj) {
                    	dataWorkshop.push({'value':obj.PL_CD,'text':obj.PL_NM});
				    });  
                },
                errorCallBack: function() {
                    $.messager.alert("提示", '请联系管理员，查询失败！')
                }
        	};
			iplantAjaxRequest(workshop);
			var area = {
                url: "/iPlant_ajax",
                dataType: "JSON",
                data: {IFS: "B000053"},
                successCallBack: function(a) {
                	var op = a.RESPONSE[0].RESPONSE_DATA;
                    $.each(op,function(n,obj) {
                    	dataArea.push({'value':obj.LC_CD,'text':obj.LC_NM});
				    });  
                },
                errorCallBack: function() {
                    $.messager.alert("提示", '请联系管理员，查询失败！')
                }
        	};
			iplantAjaxRequest(area);
			var protype = {
                url: "/iPlant_ajax",
                dataType: "JSON",
                data: {IFS: "D000008",DICT_CD:"SYS02"},
                successCallBack: function(a) {
                	var op = a.RESPONSE[0].RESPONSE_DATA;
                    $.each(op,function(n,obj) {
                    	dataPlTp.push({'value':obj.DICT_IT,'text':obj.DICT_IT_NM});
				    });  
                },
                errorCallBack: function() {
                    $.messager.alert("提示", '请联系管理员，查询失败！')
                }
        	};
			iplantAjaxRequest(protype);
			
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
			
			var bom2 = {
	                url: "/iPlant_ajax",
	                dataType: "JSON",
	                data: {IFS:'B000109'},
	                successCallBack: function(a) {
	                	var op = a.RESPONSE[0].RESPONSE_DATA;
	                    $.each(op,function(n,obj) {
	                    	dataBOM.push({'text':obj.PD_LN_CD+"("+obj.PD_LN_NM+")",'value':obj.PD_LN_CD});
	                    	BOM[a.RESPONSE[0].RESPONSE_DATA[n].PD_LN_CD]=a.RESPONSE[0].RESPONSE_DATA[n].PD_LN_NM;
					    });  
	                },
	                errorCallBack: function() {
	                    $.messager.alert("提示", '请联系管理员，查询失败！')
	                }
	            };
			iplantAjaxRequest(bom2);
			
			var et = {
	                url: "/iPlant_ajax",
	                dataType: "JSON",
	                data: {IFS:'B000029'},
	                successCallBack: function(a) {
	                	dataET=[];
	                	var op = a.RESPONSE[0].RESPONSE_DATA;
	                    $.each(op,function(n,obj) {
	                    	dataET.push({'text':obj.ET_CD+"("+obj.ET_NM+")",'value':obj.ET_CD});
	                    	ET[a.RESPONSE[0].RESPONSE_DATA[n].ET_CD]=a.RESPONSE[0].RESPONSE_DATA[n].ET_NM;
					    });  
	                },
	                errorCallBack: function() {
	                    $.messager.alert("提示", '请联系管理员，查询失败！')
	                }
	            };
			iplantAjaxRequest(et);
			
			var dgrid = dataGrid.datagrid('options');
			if(!dgrid) return;
			var reqData = {
				IFS: 'B000109',
				pageIndex: 1,
				pageSize: dgrid.pageSize
			}
			reqGridData('/iPlant_ajax', 'prolinemaintenance_tab', reqData);
		},
		bindGridData = function(reqData, jsonData) {
			var gridList = {
				name: 'prolinemaintenance_tab',
				dataType: 'json',
				columns: [[ 
					{field: 'PD_LN_CD',title: '产线代码',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
			        	   options:{required:true, validType:['length[1,15]','specialTextCharacter']}}},
			        {field: 'PD_LN_NM',title: '产线描述',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
				           options:{validType:['length[1,15]','specialTextCharacter']}}},
				    {field: 'PL_TP',title: '产线类型',width: 150,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + ( row.PL_TP_NM || value)+ "</span>";},
							   editor:{type:'combobox',options:{valueField:'value',textField:'text',data:dataPlTp,required:true}}},
				    {field: 'PL_CD',title: '所属车间',width: 150,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + ( row.PL_CD_NM || value)+ "</span>";},
						   editor:{type:'combobox',options:{valueField:'value',textField:'text',data:dataWorkshop,required:true}}},
					{field: 'LC_CD',title: '所在位置',width: 150,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + ( row.LC_CD_NM || value)+ "</span>";},
						   editor:{type:'combobox',options:{valueField:'value',textField:'text',data:dataArea,required:true}}}, 
					{field: 'CRT_ID',title: '创建人',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
					{field: 'CRT_DT',title: '创建时间',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
				]],            	 
				/**结束编辑模式的操作*/
			     onEndEdit:function(index,row){
			    	 var ed = $(this).datagrid('getEditor', {index: index,field: 'PL_CD'});
			    	 row.PL_CD = $(ed.target).combobox('getValue');
			    	 row.PL_CD_NM = $(ed.target).combobox('getText'); 
			    	 var edtp = $(this).datagrid('getEditor', {index: index,field: 'PL_TP'});
			    	 row.PL_TP = $(edtp.target).combobox('getValue');
			    	 row.PL_TP_NM = $(edtp.target).combobox('getText');
			    	 var edlc = $(this).datagrid('getEditor', {index: index,field: 'LC_CD'});
			    	 row.LC_CD = $(edlc.target).combobox('getValue');
			    	 row.LC_CD_NM = $(edlc.target).combobox('getText');
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
			    			var rowEdit = dataGrid.datagrid('getRows')[editIndex],edft = $(this).datagrid('getEditor', {index: editIndex,field: 'PD_LN_CD'}),editorFt = edft.target,cd = editorFt.val();
			    			if(checkNotEmpty(rowEdit.editType)){
			    				if(rowEdit.editType=='add'){
			    					if(checkNotEmpty(cd)){
					    				var ajaxParam = {
											url : '/iPlant_ajax',
											dataType : 'JSON',
											data : {
												IFS : 'B000109',
												PT_CD : cd,
												pageIndex : 1,
												pageSize : 10
											},
											successCallBack : function(data) {
												rowNum = parseInt(data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS);
												if (rowNum > 0) {
													dataGrid.datagrid('selectRow', editIndex).datagrid('beginEdit', editIndex);
										       		showmessage.html('<font color=red>您输入的产线编码['+ cd + ']已有相同,请重新输入!</font>');
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
			    					if(!checkNotEmpty(row.editType)){//如果是修改的情况，PD_LN_CD字段为只读模式
							    		ed = $(this).datagrid('getEditor', {index: index,field: 'PD_LN_CD'});
							    		fc = ed.target;
							    		fc.prop('readonly',true);
							    		
							    		ed2 = $(this).datagrid('getEditor', {index: index,field: 'PD_LN_NM'});
							    		fc2 = ed2.target;
							    		fc2.prop('readonly',true);
						    		}
			    				}
			    			}else{
					    		 addDatagridEditor(dataGrid,index);
					    		 if(!checkNotEmpty(row.editType)){
							    		ed = $(this).datagrid('getEditor', {index: index,field: 'PD_LN_CD'});
							    		fc = ed.target;
							    		fc.prop('readonly',true);
							    		
							    		ed2 = $(this).datagrid('getEditor', {index: index,field: 'PD_LN_NM'});
							    		fc2 = ed2.target;
							    		fc2.prop('readonly',true);
						    		}
			    			}
			    		}else{
			    			addDatagridEditor(dataGrid,index);
			    			if(!checkNotEmpty(row.editType)){
					    		ed = $(this).datagrid('getEditor', {index: index,field: 'PD_LN_CD'});
					    		fc = ed.target;
					    		fc.prop('readonly',true);
					    		
					    		ed2 = $(this).datagrid('getEditor', {index: index,field: 'PD_LN_NM'});
					    		fc2 = ed2.target;
					    		fc2.prop('readonly',true);
				    		}
			    		}
			    	}
			    	lineCD = row.PD_LN_CD;
			    	lineNM = row.PD_LN_NM;
			    	OpenFrameAttribute(row.PD_LN_CD);
	            }
			}
			initGridView(reqData, gridList);
			dataGrid.datagrid('loadData', jsonData);
		},
		
		eeEndEdit = function(str){
			var rows = $('#'+str).datagrid('getRows');
			if(rows.length>0){
				for(var i=0; i<rows.length; i++){
					$('#'+str).datagrid('endEdit',i);
				}
			}
		},
		
		//底部的关联表格   
		OpenFrameAttribute = function(LINE_CD){
			var tabName = 'prolinemaintenanceBottom_tab';
			var dgridOp = $('#'+tabName).datagrid('options');
			if(!dgridOp) return;
			var reqDataA = {
				LINE_CD:LINE_CD,
				IFS: 'MF00112',
				pageIndex: 1,
				pageSize: dgridOp.pageSize	
			}
			dialogDataGrid('/iPlant_ajax', tabName, reqDataA);
			dialogEditorDataGrid = function(tabName,reqDataA, jsonData) {
				var columnsTab,edDataGrid,messageInfo;
				columnsTab=[   
						{field: 'FCT_CD',title: '工厂名称',width: 100,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + ( row.FCT_NM  || value)+ "</span>";},
						    editor:{type:'combobox',options:{valueField:'value',textField:'text',data:dataTmp,editable:true,}}},
					    {field:'LINE_CD',title: '产线编码', width:150,align:'center'},
	 	                {field:'PD_LN_NM', title: '产线名称', width:120,align:'center'},
	 	                {field:'ET_CD',title: '设备代码', width:150,align:'center',
 	                        editor:{  
 	                            type:'combobox',
 	                            options:{
 	                            	valueField:'value',				
 	                                textField:'text',
 	                                panelWidth:150,
 	                                panelHeight:150,
 	                                editable:false,
 	                                data:dataET,
 	                                onSelect:function(data){	
 										var target = $('#prolinemaintenanceBottom_tab').datagrid('getEditor', {'index':ccIndex,'field':'ET_NM'}).target;
 										target.textbox('setValue', ET[data.value]);
 									}
 	                            }    
 	                        }
 	                      },
	 	                {field:'ET_NM', title: '设备名称', width:120,align:'center',editor:{type:'textbox',options:{editable:false}}},
		        	    {field: 'USE_YN',title: '是否启用',width: 80,align: 'center',formatter: function(value, row, index) {if(value == '1') { return '是';} else { return '否';}},editor:{type:'checkbox',options:{on: '1',off: '0'}}}, 
				        {field: 'MO',title: '备注',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
					           options:{validType:['length[0,50]','specialTextCharacter']}}},
				        {field: 'CRT_ID',title: '创建人',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
						{field: 'CRT_DT',title: '创建时间',width: 180,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
						{field: 'UPT_ID',title: '修改人',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
						{field: 'UPT_DT',title: '修改时间',width: 180,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}];
				
				

				var gridLists = {
					name: tabName,
					dataType: 'json',
					columns: [columnsTab]
				}
				initEditorDataGridView(reqDataA, gridLists);
				$('#'+tabName).datagrid('loadData', jsonData);
			}
		}
		
		getDataByCondition =function (){
			var queryDeptCode = $('#queryDeptCode').textbox('getValue');
			var dgrid = dataGrid.datagrid('options');
	        var reqData ={
	        	PD_LN_CD: queryDeptCode,
	        	IFS:'B000109',
	        	pageIndex:1,
	        	pageSize:dgrid.pageSize
	        };
	        reqGridData('/iPlant_ajax','prolinemaintenance_tab',reqData)
	      }
	}

	productionLineMaintenance.prototype = {
			init: function() {
				$(function() {
					//初始化全局变量对象
					dataGrid = $('#prolinemaintenance_tab'),dataET=[],dataBOM=[],dataTmp=[],dataWorkshop=[],dataArea=[],dataPlTp=[],showmessage=$('#showMessageInfo'),editIndex = undefined,oldRow=undefined, reg=new RegExp("null","g");
					initGridData();
					OpenFrameAttribute();
					
					$('#btnSearch').click(function(){
			        	  getDataByCondition(); 
					});
					
					$('#btnAdd').click(function() {					
						insertDataGrid('prolinemaintenance_tab',{CD:autoCreateCode('SYS')});
					});
					
					$('#btnDelete').click(function(){
						deleteDataGrid('prolinemaintenance_tab','CD','B000111','showMessageInfo');
		            });

					$('#btnSave').click(function() {
						saveDataGrid('prolinemaintenance_tab','B000110','B000112','showMessageInfo');
					});
					
					/*底部表增删*/
					$('#btnAddBottom').click(function() {
						var initData = {};
						ccIndex= 0;
						if(dataTmp.length>0){
							initData = {FCT_CD:dataTmp[0].value,LINE_CD:lineCD,PD_LN_NM:lineNM};
						}
						insertDataGrid('prolinemaintenanceBottom_tab',initData);
						eeEndEdit('prolinemaintenanceBottom_tab');
						$('#prolinemaintenanceBottom_tab').datagrid('beginEdit', 0);
					});
					
					$('#btnDeleteBottom').click(function(){
						var checkedItems = $('#prolinemaintenanceBottom_tab').datagrid('getSelections');
				        if (checkedItems.length==0) {
				            $.messager.alert('提示', '请选择一条数据进行删除');
				            return;
				        }
				        //确认提示框
				        $.messager.confirm('确认框', '您确定要删除您所选择的数据吗?', function (r) {
				           	if(r==true){
				                
			     	           	//批量删除
			                     var ajaxUpdate = {
			                         url: '/iPlant_ajax',
			                         dataType: 'JSON',
			                         data: {
			                        	 FCT_CD: checkedItems[0].FCT_CD,
			                        	 LINE_CD: checkedItems[0].LINE_CD,
			                        	 ET_CD: checkedItems[0].ET_CD,
			                             IFS: 'MF00114'
			                         },
			                         successCallBack: function (data) {
			                        	$('#showMessageInfoBottom').html('<font color=red>删除成功！</font>');
			                        	OpenFrameAttribute();
			                            return;
			                         },
			                         errorCallBack: function (data) {
			                        	 $('#showMessageInfoBottom').html('<font color=red>删除失败！</font>');
			                             return;
			                         }
			                     };
			                     iplantAjaxRequest(ajaxUpdate);
				           	}
				        }); 
		            });

					$('#btnSaveBottom').click(function() {
							 eeEndEdit('prolinemaintenanceBottom_tab');
					    	 var edDataGrid = $('#prolinemaintenanceBottom_tab');
					        	//判断后变更数据
					        	if (edDataGrid.datagrid('getChanges').length) {
					                var inserted = edDataGrid.datagrid('getChanges', "inserted");  
					                /**装载数据*/
					                var arrInsert = new Array();
					                if(inserted.length>0){
					                	for(var m=0;m<inserted.length;m++){
					                		arrInsert.push(inserted[m]);
					                	}
					                	console.log(arrInsert[0].ET_NM);
					                	//批量先增
					                    var ajaxInsert = {
					                        url: '/iPlant_ajax',
					                        dataType: 'JSON',
					                        data: {
					                            list: arrInsert,
					                            IFS: 'MF00113'
					                        },
					                        successCallBack: function (data) {
					                        	edDataGrid.datagrid('acceptChanges');
					                        	OpenFrameAttribute(lineCD);
					                        	$('#showMessageInfoBottom').html('<font color=red>保存成功！</font>');
					                            return;
					                        },
					                        errorCallBack: function (data) {
					                        	$('#showMessageInfoBottom').html('<font color=red>保存失败！</font>');
					                            return;
					                        }
					                    };
					                    iplantAjaxRequest(ajaxInsert);
					                }
					            };
					});
				});
			}
		}
	var productionLine = new productionLineMaintenance();var BOM = {};var ET = {};var lineCD,lineNM
	productionLine.init();
})();