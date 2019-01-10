/* 启动时加载 */
/*
 */
(function() {
	function factoryInfo() {
		initGridData = function() {
			var dgrid = dataGrid.datagrid('options');
			if(!dgrid) return;
			var reqData = {
				IFS: 'WMS_QC0005',
				pageIndex: 1,
				pageSize: dgrid.pageSize
			}
			reqGridData('/iPlant_ajax', 'theProcessDefinition_tab', reqData);
		}		
		
		/*加载工艺路线配置弹出框数据网格*/
		searchProcessDatagrid = function(){
			var dgrid = $('#process_tab').datagrid('options');
			var reqData = {
					IFS: 'GX00021',
					PRF_CD:prfCd,
					pageIndex: 1,
					pageSize: dgrid.pageSize
				}
			dialogDataGrid('/iPlant_ajax', 'process_tab', reqData);
		},
			
		bindGridData = function(reqData, jsonData) {
			var gridList = {
				name: 'theProcessDefinition_tab',
				dataType: 'json',
				columns: [[			
				           	{field : "CZ",width : 10,checkbox : true},
				           	{field: 'INSPECTION_SEQ',title: '检查项编码',width: 10,hidden:true,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
				            {field: 'INSPECTION_NM',title: '检查项名称',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
							        options:{required:true, validType:['length[1,30]','specialCharacterTextArea']}}},
							{field: 'img1',title: '检查项明细',width: 120,align: 'center',formatter:function(){
						           return "<img href='javascript:void(0)' class='easyui-linkbutton'  src='../../../common/IplantCompent/themes/default/images/Folder.png'/>"}},
					        {field: 'CRT_ID',title: '创建人',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
							{field: 'CRT_DT',title: '创建时间',width: 180,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
							{field: 'UPT_ID',title: '修改人',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
							{field: 'UPT_DT',title: '修改时间',width: 180,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}
							]],
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
		        	ccIndex = index;
		        	row.editType == 'add'?add=true:add=false;
		        	/*点击的列为弹出图标，弹出工位配置列表*/
		        	if(field=='img1'){
		        		endEditingAll(dataGrid);
						titleName = '检查项明细',
						dialogName = 'editTabProcess',
						tabName = 'process_tab',
						dgrid = $('#process_tab').datagrid('options'),
						$("#ProcessTitle").html("<label><label>&nbsp;&nbsp;检查项名称："+row.INSPECTION_NM+"</label>");
						INSPECTION = row.INSPECTION_SEQ;
						if(row.INSPECTION_SEQ!=undefined && row.INSPECTION_SEQ!=''){
								/*验证此工序数据是否已经保存*/
								 var ajaxSelect = {
				                         url: '/iPlant_ajax',
				                         dataType: 'JSON',
				                         data: {
				                        	 INSPECTION_CD:row.INSPECTION_SEQ,
				                             IFS: 'WMS_QC0005'
				                         },
				                         successCallBack: function (data) {
				                        	 if(data.RESPONSE[0].RESPONSE_DATA.length == 0){
				                        		 $.messager.alert('提示','请先维护并保存检查项后再检查项清单信息！');
				     							 return;
				                        	 }else{
				                        		 reqData = {IFS: 'WMS_QC0014',INSPECTION_CD:row.INSPECTION_SEQ,pageIndex: 1,pageSize: dgrid.pageSize};
				         						 openDialogFrame(tabName,dialogName,titleName,reqData);
				                        	 }
				                         },
				                         errorCallBack: function (data) {
				                         	showmessage.html('<font color=red>删除失败！</font>');
				                            return;
				                         }
				                     };
					                iplantAjaxRequest(ajaxSelect);
					              /*验证此工序数据是否已经保存	END*/
						}else{
							$.messager.alert('提示','请先维护并保存检查项再定义检查明细信息！');
							return;
						}
		        	};
		        	/**判断是否为可编辑字段*/
		        	if (editIndex != index){
			    		if(editIndex!=undefined){
		    				/**判断是否为新增行，并验证新增工厂编码重复*/
			    			rowEdit = dataGrid.datagrid('getRows')[editIndex];
			    				if(checkNotEmpty(rowEdit.editType)){
			    					if(rowEdit.editType=='add'){
			    						$.messager.alert('提示','请先维护并保存新增的数据后再进行其他操作！','',function(){
			    							$("#theProcessDefinition_tab").datagrid('uncheckAll');
			    							$("#theProcessDefinition_tab").datagrid('checkRow',editIndex);
			    							add = true;
			    							ccIndex = editIndex;
			    						});
	    			    			}else{
	    				        	   addDatagridEditor(dataGrid,index);
	    			    			}
			    				}else{
			    					addDatagridEditor(dataGrid,index);
			    		        	//**判断是否为可编辑字段*//*
			    		        	/*if(!checkNotEmpty(row.editType)){			
			    			    		ed = $(this).datagrid('getEditor', {index: index,field: 'INSPECTION_NM'});
			    			    		fc = ed.target;
			    			    		fc.textbox('disable');
			    		    		}*/
			    				}
			    			}else{
			    				addDatagridEditor(dataGrid,index);
					        	//**判断是否为可编辑字段*//*
					        	/*if(!checkNotEmpty(row.editType)){			
						    		ed = $(this).datagrid('getEditor', {index: index,field: 'INSPECTION_NM'});
						    		fc = ed.target;
						    		fc.textbox('disable');
					    		}*/
			    			}
			    		}else{
			    			addDatagridEditor(dataGrid,index);
				        	//**判断是否为可编辑字段*//*
				        	/*if(!checkNotEmpty(row.editType)){			
					    		ed = $(this).datagrid('getEditor', {index: index,field: 'INSPECTION_NM'});
					    		fc = ed.target;
					    		fc.textbox('disable');
				    		}*/
			    		}
		        },
		        /**单击进入编辑模式*/
		        /*onClickRow: function(rowIndex, rowData){
		        	var tabName,dialogName,titleName,rowEdit,editem,editorFt,itemCd,reqData,dgrid;
		        	var rows = dataGrid.datagrid('getRows'),row = rows[rowIndex];
		        	ccIndex = rowIndex;
		        	row.editType == 'add'?add=true:add=false;
		        	addDatagridEditor(dataGrid,rowIndex);
		        	var editIndexs = $("#theProcessDefinition_tab").datagrid('getEditingRowIndexs');
		        	*//**判断是否为可编辑字段*//*
		        	if(!checkNotEmpty(row.editType)){			如果是修改的情况，ft_cd字段为只读模式
			    		ed = $(this).datagrid('getEditor', {index: rowIndex,field: 'PRF_CD'});
			    		fc = ed.target;
			    		fc.prop('readonly',true);
		    		}
		        }*/
			}
			initGridMultiView(reqData, gridList);
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
		
		openDialogFrame =function(tabName,dialogName,titleName,reqData){
			$("#"+dialogName).dialog("open").dialog('setTitle', titleName);
			if(checkNotEmpty(reqData)){
				dialogDataGrid('/iPlant_ajax', tabName, reqData);
			}
		},
		
		dialogEditorDataGrid = function(tabName,reqData, jsonData) {
			/*根据tabName判断哪个列表*/
			var columnsTab,edDataGrid,messageInfo;
			columnsTab=[		
					{field: 'IN_DETAIL_SEQ',title: '自增主键',width: 10,hidden:true,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" +  value + "'>" +  (value)+ "</span>";}},
					{field: 'INSPECTION_CD',title: '检查项编码',width: 10,hidden:true,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
	        	    {field: 'INSPECTION_NM',title: '检查项名称',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
		        	        options:{required:true, validType:['length[1,30]','specialCharacterTextArea']}}},
				    {field: 'MO',title: '备注',width: 250,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
				           options:{validType:['length[0,50]','specialTextCharacter']}}}];
			edDataGrid = $('#'+tabName);
			messageInfo = $('#showMSDInfo');	
			var gridList = {
					name: tabName,
					dataType: 'json',
					pagination:false,
					rownumbers:true,
					loadMsg: '数据加载中...',
					columns: [columnsTab],
			}
			initGridView(reqData, gridList);
			$('#'+tabName).datagrid('loadData', jsonData);
		},
		
		/*检索*/
	   searchDataGrid=function(dgrid){
			initGridData();
		},
		
		setDataNull=function(){
			 $('#showFileName').html('');
		},
		
		/*导入*/
		OpenImprotFramedr = function(){
			$("#enditTabupload").dialog("open").dialog('setTitle', '工序定义导入');
		}
		
		deleteDataGrid = function () {
			var checkedItems = $('#theProcessDefinition_tab').datagrid('getSelections');
	        if (checkedItems.length==0) {
	            $.messager.alert('提示', '请选择一条数据进行删除');
	            return;
	        }
	        /*确认提示框*/
	        var delCnt=0,arrUpdate = new Array();
	        
	        $.messager.confirm('确认框', '您确定要删除您所选择的数据吗?', function (r) {
	           	if(r==true){
	           		delDatas='';
	           		 $.each(checkedItems, function (index, item) {
	           			 if(checkedItems.length==1){
	           				delDatas=item.INSPECTION_SEQ;
	           			 }
	           			 if(checkedItems.length>1){
	           				delDatas+=item.INSPECTION_SEQ+',';
	           			 }
	                 });
	           		 console.log(delDatas);
	           		 /*if(arrUpdate.length>0){
	     	           	批量删除
	                     var ajaxUpdate = {
	                         url: '/iPlant_ajax',
	                         dataType: 'JSON',
	                         data: {
	                             list: arrUpdate,
	                             IFS: 'GX00004'
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

	           		 }*/
	           	}
	        });      
		},
		
		/*保存检查项明细*/
		saveDataGridProcess = function(){
			var edDataGrid = $('#process_tab');
	         if (endEditing(edDataGrid)){
	        	//判断后变更数据
	        	if (edDataGrid.datagrid('getChanges').length) {
	                var inserted = edDataGrid.datagrid('getChanges', "inserted");  
	                /**装载数据*/
	                var arrInsert = new Array(),flag;
	                if(inserted.length>0){
	                	for(var m=0;m<inserted.length;m++){
                			arrInsert.push({
  	                			'INSPECTION_CD':INSPECTION,
  	                			'INSPECTION_NM':inserted[m].INSPECTION_NM,
  	                		    'MO':inserted[m].MO,
  	                		});
	                	}
	                	console.log(arrInsert);
	                	if(arrInsert.length>0){
	                		//批量先增
		                    var ajaxInsert = {
		                        url: '/iPlant_ajax',
		                        dataType: 'JSON',
		                        data: {
		                            list: arrInsert,
		                            IFS: 'WMS_QC0011'
		                        },
		                        successCallBack: function (data) {
		                        	if(data.RESPONSE[0].RESPONSE_HDR.MSG_CODE == 0){
		                        		edDataGrid.datagrid('acceptChanges');
			                        	$('#showProcessInfo').html('<font color=red>保存成功！</font>');
			                            return;
		                        	}else{
		                        		$('#showProcessInfo').html('<font color=red>保存失败,请联系管理员！</font>');
		                        	}
		                        },
		                        errorCallBack: function (data) {
		                        	$('#showProcessInfo').html('<font color=red>保存失败！</font>');
		                            return;
		                        }
		                    };
		                    iplantAjaxRequest(ajaxInsert);
	                	}
	                }
	            }else{
	            	$('#showProcessInfo').html('<font color=red>没有进行变更！</font>');
	            }
			}else{
				$('#showProcessInfo').html('<font color=red>请输入必填项！</font>');
			}
		},
		
		deleteProcessDataGrid = function(){
			var checkedItems = $('#process_tab').datagrid('getSelections');
			if(checkedItems == null){
				$.messager.alert('提示', '请选择一条数据进行删除');
	            return;
			}else{
				var arrdelete = new Array();
				$.messager.confirm('确认框', '您确定要删除您所选择的数据吗?', function (r) {
		           	if(r==true){
		           		$.each(checkedItems, function (index, item) {
		           			 arrdelete.push({IN_DETAIL_SEQ:item.IN_DETAIL_SEQ});
		                 });
		           		var ajaxDelete = {
                         url: '/iPlant_ajax',
                         dataType: 'JSON',
                         data: {
                             list: arrdelete,
                             IFS: 'WMS_QC0012'
                         },
                         successCallBack: function (data) {
                        	 $('#showProcessInfo2').html('<font color=red>删除成功！</font>');
                             return;
                         },
                         errorCallBack: function (data) {
                        	 $('#showProcessInfo2').html('<font color=red>删除失败！</font>');
                             return;
                         }
                     };
                     iplantAjaxRequest(ajaxDelete);
		           	}
		       });
			}
		};
	}
	factoryInfo.prototype = {
		init: function() {
			$(function() {
				/*初始化全局变量对象*/
				dataGrid = $('#theProcessDefinition_tab'),dataRouteName=[],dataMaterielType=[],dataWorkshop=[],dataBOM=[],dataCompany=[],dataMaterielType=[],dataTmp=[],dataFactory=[],showmessage=$('#showMessageInfo'),editIndex = undefined,oldRow=undefined, reg=new RegExp("null","g");
				initGridData();
				$('#btnSearch').click(function() {	
					var dgrid = dataGrid.datagrid('options');
					searchDataGrid(dgrid);
				});
				
				$('#btnAdd').click(function() {
					var editData = $('#theProcessDefinition_tab').datagrid('getChanges', "inserted");
					if(editData.length == 0){
						add = true;				//add为true代表数据行为新增行，需进行主键查重验证
						var initData = {};
						if(dataMaterielType.length>0 && dataTmp.length>0){
							initData={FCT_CD:dataTmp[0].value,PRF_TYPE:dataMaterielType[0].value,USE_YN:'1'}
						}
						ccIndex = insertDataGrid('theProcessDefinition_tab',initData);		//新增的公共方法新增返回值，返回的值为新增行的索引
						$("#theProcessDefinition_tab").datagrid('checkRow',ccIndex);
					}else{
						$.messager.alert('提示','请先维护完上一条新增数据之后再继续添加新的数据。');
					}
				});
				
				$('#btnDelete').click(function(){
					deleteDataGrid();
	            });
				
				$('#btnSave').click(function() {
					saveDataGrid('theProcessDefinition_tab','WMS_QC0012','WMS_QC0006','showMessageInfo');
				});
				
				$('#btnImport').click(function() {						/*导入*/
					OpenImprotFramedr();
				});
				
				 $('#btnExprt').click(function(){						/*导出*/
					 	var now = new Date();
	                    var year =now.getFullYear();
	                	var reqData = {
	                			IFS:'GX00001'
	                	}
	                	createTable('tbIMESReport','工序定义导出','theProcessDefinition_tab',reqData);
	                });
				
				 /*工序工位配置*/
				 $('#btnProcessAdd').click(function() {	
					 var dgrid = $('#process_tab').datagrid('options');
					 insertDataGrid('process_tab',{});//初始化默认数据
				 });
				
				 $('#btnProcessDelete').click(function(){
					 deleteProcessDataGrid();
	             });

				 $('#btnProcessSave').click(function() {
					 editIndex = undefined;
					 saveDataGridProcess();
				 });
			});
		}
	}
	var fcfo = new factoryInfo();var dataRoute = {};var ccIndex= 0;/*全局索引;*/var prfCd,fctCD,branchRout,add,INSPECTION,delDatas;
	fcfo.init();
})();