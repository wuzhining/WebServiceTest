/* 启动时加载 */
/*
 */
(function() {
	function factoryInfo() {
		initGridData = function() {
			var dgrid = dataGrid.datagrid('options');
			if(!dgrid) return;
			var searchWP_TYPE = $('#searchWP_TYPE').textbox('getValue');
			var searchWP_NM = $("#searchWP_NM").textbox("getValue");
			var searchWP_CD = $("#searchWP_CD").textbox("getValue");
			var reqData = {
				IFS: 'GX00081',
				async:false,
				WP_TYPE:searchWP_TYPE,
				WP_NM:searchWP_NM,
				WP_CD:searchWP_CD,
				pageIndex: 1,
				pageSize: dgrid.pageSize
			}
			reqGridData('/iPlant_ajax', 'theProcessDefinition_tab', reqData);
		}		
			bindGridData = function(reqData, jsonData) {
			var gridList = {
				name: 'theProcessDefinition_tab',
				dataType: 'json',
				columns: [[			
				            {field: 'WP_ID',title: '工序id',width: 50,hidden:true,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
						           options:{validType:['length[1,30]','specialCharacterTextArea']}}},
			           		{field: 'WP_CD',title: '工序代码',width: 120,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},
				           			   editor:{ type:'textbox',
				           				   		options:{required:true,
					        		   		    onChange: function(newValue){
						        		   			if(newValue == '' || newValue==undefined) return;
						        		   			if(add){	/*新增的数据行才查重验证*/
						        		   				/*新增工序信息查重*/
								        				var processRepeat = {
								        		                url: "/iPlant_ajax",
								        		                dataType: "JSON",
								        		                data: {
								        		                	IFS: 'GX00081',
								        		                	WP_CD:newValue
								        		    			},
								        		                successCallBack: function(a) {
								        		                	var callBack = a.RESPONSE[0].RESPONSE_DATA;
								        		                	if(callBack.length >0){
								        		                		$.messager.alert("提示",'工序代码['+newValue+']已存在，不能重复添加。' ,'',function(){
								        		                			var PCBCD = $('#theProcessDefinition_tab').datagrid('getEditor', {'index':ccIndex,'field':'WP_CD'}).target;
								        									PCBCD.textbox('setValue','');
								        		                		})
								        		                	}
								        		                },
								        		                errorCallBack: function() {
								        		                    $.messager.alert("提示", '请联系管理员，查询失败！')
								        		                }
								        		            };
								        				iplantAjaxRequest(processRepeat);
						        		   			};
					        		   		    }
					        	   }}},
						    {field: 'WP_NM',title: '工序名称',width: 120,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
						           options:{required:true,validType:['length[1,30]','specialCharacterTextArea']}}},
						    {field: 'WP_TYPE',title: '工艺类型',width: 120,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
							           options:{required:true, validType:['length[1,30]','specialCharacterTextArea']}}},
				            {field: 'IS_CONTROL',title: '是否参与管控(1-是;0-否)',width: 80,align: 'center',formatter: function(value, row, index) {if(value == 'Y') { return '是';} else { return '否';}},editor:{type:'checkbox',options:{on: 'Y',off: 'N'}}}, 
						    {field: 'IS_KEYWP',title: '是否关键工序(1-是;0-否)',width: 80,align: 'center',formatter: function(value, row, index) {if(value == 'Y') { return '是';} else { return '否';}},editor:{type:'checkbox',options:{on: 'Y',off: 'N'}}}, 
					        {field: 'IS_COLLECTION',title: '是否数据连线',width: 80,align: 'center',formatter: function(value, row, index) {if(value == 'Y') { return '是';} else { return '否';}},editor:{type:'checkbox',options:{on: 'Y',off: 'N'}}}, 
						    {field: 'DEVICETYPE',title: '是否数据连线',width: 80,align: 'center',formatter: function(value, row, index) {if(value == 'Y') { return '是';} else { return '否';}},editor:{type:'checkbox',options:{on: 'Y',off: 'N'}}}, 
							 {field: 'URL',title: '操作页面路径',width: 120,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
								  options:{validType:['length[0,50]','specialTextCharacter']}}},
							 {field: 'WP_DESC',title: '工序描述',width: 170,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
									options:{validType:['length[0,50]','specialTextCharacter']}}},
					        {field: 'CR_USR',title: '创建人',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
							{field: 'CR_DT',title: '创建时间',width: 180,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
							{field: 'UP_USR',title: '修改人',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
							{field: 'UP_DT',title: '最后修改时间',width: 180,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}
							]],
					/**结束编辑模式的操作*/
						onEndEdit:function(index,row){
						var edditmp = $(this).datagrid('getEditor', {index: index,field: 'WP_CD'});
						row.WP_CD = $(edditmp.target).textbox('getValue');
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
		        	ccIndex = index;
		        	row.editType == 'add'?add=true:add=false;
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
			    		        	if(!checkNotEmpty(row.editType)){			
			    			    		ed = $(this).datagrid('getEditor', {index: index,field: 'WP_CD'});
			    			    		fc = ed.target;
			    			    		fc.textbox('disable');
			    		    		}
			    				}
			    			}else{
			    				addDatagridEditor(dataGrid,index);
					        	//**判断是否为可编辑字段*//*
					        	if(!checkNotEmpty(row.editType)){			
						    		ed = $(this).datagrid('getEditor', {index: index,field: 'WP_CD'});
						    		fc = ed.target;
						    		fc.textbox('disable');
					    		}
			    			}
			    		}else{
			    			addDatagridEditor(dataGrid,index);
				        	//**判断是否为可编辑字段*//*
				        	if(!checkNotEmpty(row.editType)){			
					    		ed = $(this).datagrid('getEditor', {index: index,field: 'WP_CD'});
					    		fc = ed.target;
					    		fc.textbox('disable');
				    		}
			    		}
		        },
		    
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
		
		/*检索*/
	   searchDataGrid=function(dgrid){
			initGridData();
		},
		
		setDataNull=function(){
			 $('#showFileName').html('');
		},
		
		deleteDataGrid = function () {
			var select = $('#theProcessDefinition_tab').datagrid('getSelected');
	        if (select == null) {
	            $.messager.alert('提示', '请选择一条数据进行删除');
	            return;
	        }else{
	        /*确认提示框*/
	        $.messager.confirm('确认框', '您确定要删除您所选择的数据吗?', function (r) {
	           	if(r==true){
	           		
	           		  	  var ajaxDelete = {
	                         url: '/iPlant_ajax',
	                         dataType: 'JSON',
	                         data: {
	                        	 WP_CD:select.WP_CD,
	                            IFS: 'GX00084'
	                         },
	                         successCallBack: function (data) {
	                        	 if(data.RESPONSE[0].RESPONSE_HDR.MSG_CODE == '0'){
	                         	showmessage.html('<font color=red>删除成功！</font>');
	                         	initGridData();
	                             return;
	                        	 }else{
	                        		 $('#showProcessInfo').html('<font color=red>删除失败,请联系管理员！</font>');
	                        	 }
	                         },
	                         errorCallBack: function (data) {
	                        	 $('#showProcessInfo').html('<font color=red>删除失败！</font>');
	                             return;
	                         }
	                     };
	                     iplantAjaxRequest(ajaxDelete);
	           	}
	        }); 
	       }
		},
		
		//置空查询输入框
		setQueryNull=function() {
			$("#nanan").form("clear");
		}
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
							initData={WP_CD:dataTmp[0].value,WP_NM:dataMaterielType[0].value}
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
					saveDataGrid('theProcessDefinition_tab','GX00082','GX00083','showMessageInfo');
				});
				 $('#btnResets').click(function() {
						setQueryNull();
				});
			});
		}
	}
	var fcfo = new factoryInfo();var dataRoute = {};var ccIndex= 0;/*全局索引;*/var wpCD,wpNM,branchRout,add;
	fcfo.init();
})();