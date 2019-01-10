/* 启动时加载 */
/*
 */
(function() {
	function factoryInfo() {
		initGridData = function() {
			var dgrid = dataGrid.datagrid('options');
			if(!dgrid) return;
			var searchSTACK_LB = $('#searchSTACK_LB').textbox('getValue');
			var searchPH_ARE = $('#searchPH_ARE').textbox('getValue');
			var searchET_CD =$("#searchET_CD").combobox("getValue");
			var searchSTACK_CD =$("#searchSTACK_CD").textbox("getValue");
			var reqData = {
				IFS: 'ST00100',
				STACK_LB:searchSTACK_LB,
				ET_CD:searchET_CD,
				PH_ARE:searchPH_ARE,
				STACK_CD:searchSTACK_CD,
				pageIndex: 1,
				pageSize: dgrid.pageSize
			}
			reqGridData('/iPlant_ajax', 'equipmentStationManager_tab', reqData);
		}		
			
		bindGridData = function(reqData, jsonData) {
			var gridList = {
				name: 'equipmentStationManager_tab',
				dataType: 'json',
				columns: [[
				       		{field : "CZ",width : 10,checkbox : true},
			           		{field: 'STACK_LB',title: '栈位条码',width: 120,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
						           options:{required:true, validType:['length[1,50]','specialCharacterTextArea']}}},
				            {field: 'ET_CD',title: '设备编码',width: 100,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + (value)+ "</span>";},
			           		   editor:{type:'combobox',options:{valueField:'value',textField:'text',data:dataTmp,required:true,editable:false}}},
				            {field: 'PH_ARE',title: '贴片区域',width: 120,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
					               options:{required:true, validType:['length[1,50]','specialCharacterTextArea']}}},
			                {field: 'STACK_CD',title: '栈位代码',width: 120,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
				                   options:{required:true, validType:['length[1,50]','specialCharacterTextArea']}}},      
						    {field: 'USE_YN',title: '是否启用',width: 80,align: 'center',formatter: function(value, row, index) {if(value == 'Y') { return '是';} else { return '否';}},editor:{type:'checkbox',options:{on: 'Y',off: 'N'}}}, 
					        {field: 'MO',title: '备注',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
						           options:{validType:['length[0,50]','specialTextCharacter']}}},
					        {field: 'CRT_ID',title: '创建人',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
							{field: 'CRT_DT',title: '创建时间',width: 180,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
							{field: 'UPT_ID',title: '修改人',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
							{field: 'UPT_DT',title: '修改时间',width: 180,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}
							]],
				/**结束编辑模式的操作*/
			     onEndEdit:function(index,row){
			    	 var edditmp = $(this).datagrid('getEditor', {index: index,field: 'ET_CD'});
			    	 row.ET_CD = $(edditmp.target).combobox('getValue');
			    	 row.ET_NM = $(edditmp.target).combobox('getText');
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
		        	if(!checkNotEmpty(row.editType)){/*如果是修改的情况，ft_cd字段为只读模式*/
			    		ed = $(this).datagrid('getEditor', {index: index,field: 'STACK_LB'});
			    		fc = ed.target;
			    		fc.prop('readonly',true);
		    		}
		        },
		        /**单击进入编辑模式*/
			}
			initGridMultiView(reqData, gridList);
			dataGrid.datagrid('loadData', jsonData);
		},
		
		/*是否打印弹出打印预览页面*/
		openPrintPreview = function(STACK_LB,ET_CD,PH_ARE,STACK_CD,CRT_DT){
			$("#PrintPreview_openDiv").dialog("open").dialog('setTitle', '打印预览页面');
	
			$("#STACK_LB").textbox('setValue',STACK_LB);
			$("#ET_CD").textbox('setValue',ET_CD);
			$("#PH_ARE").textbox('setValue',PH_ARE);
			$("#STACK_CD").textbox('setValue',STACK_CD);
			$("#txtCRT_DT").textbox('setValue',CRT_DT);
		}
		
		/**
		 * 打印SN
		 * 
		 * @param dgrid
		 */
		saveMesSNcode = function(){
			
			var post = $("#equipmentStationManager_tab").datagrid('getSelections');
			var postLenght = post.length;
			var rowSz = $('#rowSize').textbox('getValue');
			var data1=new Array();
			var barCodeList="";
			for (var i=0;i<postLenght;i++){			
	        		data1.push({"CODE":post[i].STACK_LB});
            };
            barCodeStr = {labName:"STACKLB.lab",'rowSize':rowSz,"barCodeList":data1};
    		zbSocketPrinter(barCodeStr);
    		console.log(barCodeStr)
			$('#PrintPreview_openDiv').dialog('close');
			$.messager.alert("提示", '条码打印完成！');
			initGridData();	
		}
		
		/*检索*/
	   searchDataGrid=function(dgrid){
			initGridData();
		},
		
		setDataNull=function(){
			 $('#showFileName').html('');
		},
		
		/*保存*/
		saveDataGrid=function(tabName,insertIfs,updateIfs,messageId){
	    	 var edDataGrid = $('#equipmentStationManager_tab');
	         if (endEditing(edDataGrid)){
	        	//判断后变更数据
	        	if (edDataGrid.datagrid('getChanges').length) {
	                var inserted = edDataGrid.datagrid('getChanges', "inserted");  
	                var updated = edDataGrid.datagrid('getChanges', "updated");
	                var deleted = edDataGrid.datagrid('getChanges', "deleted");
	                /**装载数据*/
	                var arrInsert = new Array(),arrUpdate = new Array();
	                if(inserted.length>0){
	                	for(var m=0;m<inserted.length;m++){
	                		arrInsert.push(inserted[m]);
	                		//批量先增
		                    var ajaxInsert = {
		                        url: '/iPlant_ajax',
		                        dataType: 'JSON',
		                        data: {
		                        	STACK_LB : inserted[m].STACK_LB,
		                        	ET_CD : inserted[m].ET_CD,
		                        	PH_ARE : inserted[m].PH_ARE,
		                        	STACK_CD : inserted[m].STACK_CD,
		                        	USE_YN : inserted[m].USE_YN,
		                        	MO : inserted[m].MO,
		                            IFS: 'ST00101'
		                        },
		                        successCallBack: function (data) {
		                        	edDataGrid.datagrid('acceptChanges');
		                        	initGridData();
		                        	$('#showMessageInfo').html('<font color=red>保存成功！</font>');
		                            return;
		                        },
		                        errorCallBack: function (data) {
		                        	$('#showMessageInfo').html('<font color=red>保存失败！</font>');
		                            return;
		                        }
		                    };
		                    iplantAjaxRequest(ajaxInsert);
	                	}
	                }
	                if(updated.length>0){
	                	for(var m=0;m<updated.length;m++){
	                		if(updated[m].edited){
	                			//批量修改
	    	                    var ajaxUpdate = {
	    	                        url: '/iPlant_ajax',
	    	                        dataType: 'JSON',
	    	                        data: {
	    	                        	STACK_LB : updated[m].STACK_LB,
	    	                        	ET_CD : updated[m].ET_CD,
	    	                        	PH_ARE : updated[m].PH_ARE,
	    	                        	STACK_CD : updated[m].STACK_CD,
	    	                        	USE_YN : updated[m].USE_YN,
	    	                        	MO : updated[m].MO,
	    	                            IFS: 'ST00102'
	    	                        },
	    	                        successCallBack: function (data) {
	    	                        	initGridData();
	    	                        	edDataGrid.datagrid('acceptChanges');
	    	                        	$('#showMessageInfo').html('<font color=red>保存成功！</font>');
	    	                            return;
	    	                        },
	    	                        errorCallBack: function (data) {
	    	                        	$('#showMessageInfo').html('<font color=red>保存失败！</font>');
	    	                            return;
	    	                        }
	    	                    };
	    	                    iplantAjaxRequest(ajaxUpdate);
	                		}
	                	}
	                }
	            }else{
	            	$('#showMessageInfo').html('<font color=red>没有进行变更！</font>');
	            }
			}else{
				$('#showMessageInfo').html('<font color=red>请输入必填项！</font>');
			}
		},
		
		deleteDataGrid = function () {
			var checkedItems = $('#equipmentStationManager_tab').datagrid('getSelections');
	        if (checkedItems.length==0) {
	            $.messager.alert('提示', '请选择一条数据进行删除');
	            return;
	        }
	        /*确认提示框*/
	        var delCnt=0,arrUpdate = new Array();;
	        $.messager.confirm('确认框', '您确定要删除您所选择的数据吗?', function (r) {
	           	if(r==true){
	           		 $.each(checkedItems, function (index, item) {
		     	           	/*批量删除*/
		                     var ajaxUpdate = {
		                         url: '/iPlant_ajax',
		                         dataType: 'JSON',
		                         data: {
		                        	 STACK_LB: item.STACK_LB,
		                             IFS: 'ST00103'
		                         },
		                         successCallBack: function (data) {
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
	                 });
	           	}
	        });      
		}
	}
	factoryInfo.prototype = {
		init: function() {
			$(function() {
				/*初始化全局变量对象*/
				
				var tmp = {
		                url: "/iPlant_ajax",
		                dataType: "JSON",
		                data: {IFS: "B000029"},
		                successCallBack: function(a) {
		                	dataTmp = [];
		                	var op = a.RESPONSE[0].RESPONSE_DATA;
		                    $.each(op,function(n,obj) {
		                    	dataTmp.push({'value':obj.ET_CD,'text':obj.ET_NM});
						    }); 
		                    $('#searchET_CD').combobox({
		                        data:dataTmp,
		                        valueField:'value',
		                        textField:'text',
		                        panelWidth:200
		                    });
		                    initGridData();
		                },
		                errorCallBack: function() {
		                    $.messager.alert("提示", '请联系管理员，查询失败！')
		                }
		            };
				iplantAjaxRequest(tmp);
				
				dataGrid = $('#equipmentStationManager_tab'),dataMaterielType=[],dataWorkshop=[],dataBOM=[],dataCompany=[],dataMaterielType=[],dataTmp=[],dataFactory=[],showmessage=$('#showMessageInfo'),editIndex = undefined,oldRow=undefined, reg=new RegExp("null","g");
				
				$('#btnSearch').click(function() {	
					var dgrid = dataGrid.datagrid('options');
					searchDataGrid(dgrid);
				});
				
				$('#btnAdd').click(function() {
					var initData = {};
					if(dataTmp.length>0){
						initData={ET_CD:dataTmp[0].text,USE_YN:'Y'}
					}
					insertDataGrid('equipmentStationManager_tab',initData);
				});
				
				$('#btnDelete').click(function(){
					deleteDataGrid();
	            });
				
				$('#btnSave').click(function() {
					saveDataGrid();
				});
				
				$('#btnImport').click(function() {						/*导入*/
					$("#materialImportDialog").dialog("open").dialog('setTitle', '设备栈位导入');
				});
				
				 $('#btnExprt').click(function(){						/*导出*/
					 	var now = new Date();
	                    var year =now.getFullYear();
	                	var reqData = {
	                			IFS:'ST00100'
	                	}
	                	createTable('tbIMESReport','设备栈位导出','equipmentStationManager_tab',reqData);
	                });
				
				 $('#btnPrint').click(function(){
						var post = $("#equipmentStationManager_tab").datagrid('getSelections');
						if(post == null || post == ''){
							$.messager.alert('提示', '请选择一条数据进行打印');
						}else{
										
							var STACK_LB,ET_CD,PH_ARE,STACK_CD,CRT_DT;
							STACK_LB = post[0].STACK_LB;ET_CD = post[0].ET_CD;PH_ARE = post[0].PH_ARE;STACK_CD = post[0].STACK_CD;
							CRT_ID = post[0].CRT_ID;
							openPrintPreview(STACK_LB,ET_CD,PH_ARE,STACK_CD,CRT_DT);
						}
					})
			});
		}
	}
	var fcfo = new factoryInfo();
	fcfo.init();
})();