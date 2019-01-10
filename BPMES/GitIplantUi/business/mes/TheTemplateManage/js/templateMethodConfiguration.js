/* 启动时加载 */
/*
 */
(function() {
	function factoryInfo() {
		
		searchMethodCD=function(){
			dataPi=[],dataSer=[{'value':'','text':'-- 请选择 --'}];
    		var pi = {
                url: "/iPlant_ajax",
                dataType: "JSON",
                data: {
                    IFS: "MF00041"
                },
                successCallBack: function(a) {
                	var op = a.RESPONSE[0].RESPONSE_DATA;
                    $.each(op,function(n,obj) {
                    	dataPi.push({'value':obj.FUN_CODE,'text':obj.FUN_NAME});
                    	dataSer.push({'value':obj.FUN_CODE,'text':obj.FUN_NAME});
				    });  
                    $("#searchMethod_CD").combobox("loadData", dataSer);
                    $("#searchMethod_CD").combobox('select', dataSer[0].value);
                },
                errorCallBack: function() {
                    $.messager.alert("提示", e)
                }
            };
    		iplantAjaxRequest(pi);
		}
		
		searchTemplateCD=function(){
			dataPi2=[],dataSer2=[{'value':'','text':'-- 请选择 --'}];
    		var pi = {
                url: "/iPlant_ajax",
                dataType: "JSON",
                data: {
                    IFS: "MF00031"
                },
                successCallBack: function(a) {
                	var op = a.RESPONSE[0].RESPONSE_DATA;
                    $.each(op,function(n,obj) {
                    	dataPi2.push({'value':obj.TEMP_CODE,'text':obj.TEMP_NAME});
                    	dataSer2.push({'value':obj.TEMP_CODE,'text':obj.TEMP_NAME});
				    });  
                    $("#searchTemplate_CD").combobox("loadData", dataSer2);
                    $("#searchTemplate_CD").combobox('select', dataSer2[0].value);
                },
                errorCallBack: function() {
                    $.messager.alert("提示", e)
                }
            };
    		iplantAjaxRequest(pi);
		}
		
		initGridData = function() {
			var dgrid = dataGrid.datagrid('options');
			if(!dgrid) return;
			searchMethodCD();
			searchTemplateCD();
			/*工厂名称下拉框*/
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
			
			/*方法名称下拉框*/
			 funName = {
	                url: "/iPlant_ajax",
	                dataType: "JSON",
	                data: {IFS: "MF00041"},
	                successCallBack: function(a) {
	                	dataFunName= [];
	                	var op = a.RESPONSE[0].RESPONSE_DATA;
	                    $.each(op,function(n,obj) {
	                    	dataFunName.push({'value':obj.FUN_CODE,'text':obj.FUN_NAME});
					    });  
	                },
	                errorCallBack: function() {
	                    $.messager.alert("提示", '请联系管理员，查询失败！')
	                }
	            };
			iplantAjaxRequest(funName);
			
			
			/*模板名称下拉框*/
			 /*tempName = {
	                url: "/iPlant_ajax",
	                dataType: "JSON",
	                data: {IFS: "MF00031"},
	                successCallBack: function(a) {
	                	dataTempName = [];
	                	var op = a.RESPONSE[0].RESPONSE_DATA;
	                    $.each(op,function(n,obj) {
	                    	dataTempName.push({'value':obj.TEMP_CODE,'text':obj.TEMP_NAME});
					    });  
	                    $("#searchTemplate_CD").combobox("loadData", dataSer);
	                    $("#searchTemplate_CD").combobox('select', dataSer[0].value);
	                },
	                errorCallBack: function() {
	                    $.messager.alert("提示", '请联系管理员，查询失败！')
	                }
	            };
			iplantAjaxRequest(tempName);*/
			
			var searchTemplate_CD = $('#searchTemplate_CD').combobox('getValue');
			var searchMethod_CD =$("#searchMethod_CD").combobox("getValue");
			var reqData = {
				IFS: 'MF00051',
				FUN_CODE:searchMethod_CD,
				TEMP_CODE:searchTemplate_CD,
				pageIndex: 1,
				pageSize: dgrid.pageSize
			}
			reqGridData('/iPlant_ajax', 'templateMethodConfiguration_tab', reqData);
		}
		
		
		
		bindGridData = function(reqData, jsonData) {
			var gridList = {
				name: 'templateMethodConfiguration_tab',
				dataType: 'json',
				columns: [[
                                    
				           	{field : "CZ",width : 10,checkbox : true},
				           	{field: 'FCT_CD',title: '工厂名称',width: 120,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + ( row.FCT_NM  || value)+ "</span>";},
				           		   editor:{type:'combobox',options:{valueField:'value',textField:'text',data:dataTmp,required:true,editable:false}}},
			           		{field: 'TEMP_CODE',title: '模板名称',width: 150,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" +  value + "'>" +  (row.TEMP_NAME || value)+ "</span>";},
						    	     editor:{type:'combobox',options:{required:true,valueField:'value',textField:'text',data:dataTempName,required:true,editable:false}}},
				           	{field: 'FUN_CODE',title: '方法名称',width: 150,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" +  value + "'>" +  (row.FUN_NAME || value)+ "</span>";},
							    	 editor:{type:'combobox',options:{required:true,valueField:'value',textField:'text',data:dataFunName,required:true,editable:false}}},
				    	    {field: 'EXCU_SEQU',title: '执行顺序',width: 60,align: 'right',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'numberbox', options:{required:true,precision:0,min:0}}, 
				            	   formatter:function(value,row,index){ return formatNumber(value,0); }},
						    {field: 'USE_YN',title: '是否启用',width: 80,align: 'center',formatter: function(value, row, index) {if(value == '1') { return '是';} else { return '否';}},editor:{type:'checkbox',options:{on: '1',off: '0'}}}, 
					        {field: 'MO',title: '备注',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
						           options:{validType:['length[0,50]','specialTextCharacter']}}},
					        {field: 'CRT_ID',title: '创建人',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
							{field: 'CRT_DT',title: '创建时间',width: 180,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
							{field: 'UPT_ID',title: '修改人',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
							{field: 'UPT_DT',title: '修改时间',width: 180,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}
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
		        onClickCell: function (index,field,value) {
		        	var tabName,dialogName,titleName,rowEdit,editem,editorFt,itemCd,reqData,dgrid;
		        	var rows = dataGrid.datagrid('getRows'),row = rows[index];
		        	/**判断是否为可编辑字段*/
		        	addDatagridEditor(dataGrid,index);
		        },
		        /**单击进入编辑模式*/
			}
			initGridMultiView(reqData, gridList);
			dataGrid.datagrid('loadData', jsonData);
		},
		/*检索*/
	   searchDataGrid=function(dgrid){
			initGridData();
		},
		
		deleteDataGrid = function () {
			var checkedItems = $('#templateMethodConfiguration_tab').datagrid('getSelections');
	        if (checkedItems.length==0) {
	            $.messager.alert('提示', '请选择一条数据进行删除');
	            return;
	        }
	        /*确认提示框*/
	        var delCnt=0,arrUpdate = new Array();;
	        $.messager.confirm('确认框', '您确定要删除您所选择的数据吗?', function (r) {
	           	if(r==true){
		           	 $.each(checkedItems, function (index, item) {
		           		arrUpdate.push({FCT_CD:item.FCT_CD,PRF_CD:item.PRF_CD,FROM_ROUT_CD:item.FROM_ROUT_CD,TO_ROUT_CD:item.TO_ROUT_CD});
		             });
	                
	           		 if(arrUpdate.length>0){
	     	           	/*批量删除*/
	                     var ajaxUpdate = {
	                         url: '/iPlant_ajax',
	                         dataType: 'JSON',
	                         data: {
	                             list: arrUpdate,
	                             IFS: 'MF00054'
	                         },
	                         successCallBack: function (data) {
	                        	 console.log(data)
	                        	showmessage.html('<font color=red>删除成功！</font>');
	                         	initGridData();
	                             return;
	                         },
	                         errorCallBack: function (data) {
	                         	showmessage.html('<font color=red>删除失败！</font>');
	                             return;
	                         }
	                     };
	                     iplantAjaxRequest(ajaxUpdate);

	           		 }else{
	           			showmessage.html('<font color=red>删除失败，此工单不是创建状态！</font>');
	           		 }
	           	}
	        });      
		}
	}
	factoryInfo.prototype = {
		init: function() {
			$(function() {
				
				/*初始化全局变量对象*/
				dataGrid = $('#templateMethodConfiguration_tab'),dataFunName=[],dataTempName=[],dataTmp=[],showmessage=$('#showMessageInfo'),editIndex = undefined,oldRow=undefined, reg=new RegExp("null","g");
				initGridData();
				$('#btnSearch').click(function() {	
					var dgrid = dataGrid.datagrid('options');
					searchDataGrid(dgrid);
				});
				
				$('#btnAdd').click(function() {
					var initData = {};
					if(dataTmp.length>0 && dataFunName.length>0 && dataTempName.length>0){
						initData={FCT_CD:dataTmp[0].value,FUN_CODE:dataFunName[0].value,TEMP_NAME:dataTempName[0].value,USE_YN:'1'}
					}
					insertDataGrid('templateMethodConfiguration_tab',initData);
				});
				
				$('#btnDelete').click(function(){
					deleteDataGrid();
	            });
				
				$('#btnExprt').click(function(){						/*导出*/
				 	var now = new Date();
                    var year =now.getFullYear();
                	var reqData = {
                			IFS:'MF00051'
                	}
                	createTable('tbIMESReport','模板方法配置导出','templateMethodConfiguration_tab',reqData);
                });
				
				$('#btnSave').click(function() {
					saveDataGrid('templateMethodConfiguration_tab','MF00052','MF00053','showMessageInfo');
				});
				
			});
		}
	}
	var fcfo = new factoryInfo();
	fcfo.init();
})();