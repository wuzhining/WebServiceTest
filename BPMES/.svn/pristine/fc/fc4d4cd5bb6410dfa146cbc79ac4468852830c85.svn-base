/* 启动时加载 */
/*
 */
(function() {
	function bWorkFlow() {
		initGridData = function() {
			dataLvl = [{'value':'1','text':'一级'},{'value':'2','text':'二级'},{'value':'3','text':'三级'}];
			dataScope = [{'value':'mes','text':'生产执行'},{'value':'wms','text':'仓库管理'},{'value':'tpm','text':'生产维护'}];
			var company = {
                url: "/iPlant_ajax",
                dataType: "JSON",
                data: {IFS: "ACT0000",ACT_TYPE:'listProcessList'},
                successCallBack: function(a) {
                	var op = a.RESPONSE[0].RESPONSE_DATA;
                    $.each(op,function(n,obj) {
                    	dataProcess.push({'value':obj.proDefKey,'text':obj.proDefName});
				    });  
                },
                errorCallBack: function() {
                    //$.messager.alert("提示", '请联系管理员，查询失败！');
                	showmessage.html('<font color=red>提示:请联系管理员，查询失败！</font>');
                }
            };
			iplantAjaxRequest(company),
			queryBusFlow();
		},
		bindGridData = function(reqData, jsonData) {
			var gridList = {
				name: 'bWorkFlow_tab',
				dataType: 'json',
				columns: [[
					{field: 'BUSI_CODE',title: '业务代码',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
			        	   options:{required:true, validType:['length[1,30]','specialTextCharacter']}}},
					{field: 'BUSI_NAME',title: '业务名称',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
			        	   options:{required:true, validType:['length[1,30]','specialTextCharacter']}}},
	        	    {field: 'PROCDEF_KEY',title: '工作流标示',width: 120,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + ( row.PROCDEF_KEY_NM  || value)+ "</span>";},
						editor:{type:'combobox',options:{valueField:'value',textField:'text',data:dataProcess,required:true,editable:false}}}, 
					{field: 'PRIO_LVL',title: '优先级',width: 100,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + ( row.PRIO_LVL_NM  || value)+ "</span>";},
						editor:{type:'combobox',options:{valueField:'value',textField:'text',data:dataLvl,required:true,editable:false}}}, 
					{field: 'BUSI_SCOPE',title: '业务适用范围',width: 100,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" +  value + "'>" +  (row.BUSI_SCOPE_NM || value)+ "</span>";},
							editor:{type:'combobox',options:{valueField:'value',textField:'text',data:dataScope,required:true}}},
					{field: 'HIST_URL',title: '归档URL',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
			        	   options:{ validType:['length[1,200]']}}},
					{field: 'BATCH_YN',title: '是否批量审核',width: 100,align: 'center',formatter: function(value, row, index) {if(value == 'Y') { return '是';} else { return '否';}},editor:{type:'checkbox',options:{on: 'Y',off: 'N'}}},
					{field: 'ENABLE_ALLDAY',title: '是否支持7*24',width: 100,align: 'center',formatter: function(value, row, index) {if(value == 'Y') { return '是';} else { return '否';}},editor:{type:'checkbox',options:{on: 'Y',off: 'N'}}},
					{field: 'MO',title: 'MO',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
			        	   options:{validType:['length[1,100]','specialTextCharacter']}}},
					{field: 'CRT_ID',title: '创建人',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
					{field: 'CRT_IP',title: '创建人IP',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
					{field: 'CRT_DT',title: '创建时间',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
					{field: 'UPT_ID',title: '修改人',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
					{field: 'UPT_IP',title: '修改人IP',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
					{field: 'UPT_DT',title: '修改时间',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}
				]],
				/**结束编辑模式的操作*/
			     onEndEdit:function(index,row){
			    	 var ed = $(this).datagrid('getEditor', {index: index,field: 'PROCDEF_KEY'});
			    	 row.PROCDEF_KEY = $(ed.target).combobox('getValue');
			    	 row.PROCDEF_KEY_NM = $(ed.target).combobox('getText');
			    	 var eddi = $(this).datagrid('getEditor', {index: index,field: 'PRIO_LVL'});
			    	 row.PRIO_LVL = $(eddi.target).combobox('getValue');
			    	 row.PRIO_LVL_NM = $(eddi.target).combobox('getText');
			    	 var edbs = $(this).datagrid('getEditor', {index: index,field: 'BUSI_SCOPE'});
			    	 row.BUSI_SCOPE = $(edbs.target).combobox('getValue');
			    	 row.BUSI_SCOPE_NM = $(edbs.target).combobox('getText');
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
			    			var rowEdit = dataGrid.datagrid('getRows')[editIndex],edft = $(this).datagrid('getEditor', {index: editIndex,field: 'BUSI_CODE'}),ftCd = $(edft.target).val(),
			    			edkey = $(this).datagrid('getEditor', {index: editIndex,field: 'PROCDEF_KEY'}),key = $(edkey.target).combobox('getValue');
			    			if(checkNotEmpty(rowEdit.editType)){
			    				if(rowEdit.editType=='add'){
			    					if(checkNotEmpty(ftCd) && checkNotEmpty(key) ){
					    				var ajaxParam = {
											url : '/iPlant_ajax',
											dataType : 'JSON',
											data : {
												IFS : 'ACT0020',
												BUSI_CODE : ftCd,
												PROCDEF_KEY : key,
												pageIndex : 1,
												pageSize : 10
											},
											successCallBack : function(data) {
												rowNum = parseInt(data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS);
												if (rowNum > 0) {
													dataGrid.datagrid('selectRow', editIndex).datagrid('beginEdit', editIndex);
										       		showmessage.html('<font color=red>业务代码['+ ftCd + ']和工作流标示['+ key + ']已存在,请重新输入!</font>');
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
							    		ed = $(this).datagrid('getEditor', {index: index,field: 'BUSI_CODE'});
							    		fc = ed.target;
							    		fc.prop('readonly',true);
						    		}
			    				}
			    			}else{
					    		 addDatagridEditor(dataGrid,index);
					    		 if(!checkNotEmpty(row.editType)){
					    			 ed = $(this).datagrid('getEditor', {index: index,field: 'BUSI_CODE'});
					    			 fc = ed.target;
					    			 fc.prop('readonly',true);
					    		 }
			    			}
			    		}else{
			    			addDatagridEditor(dataGrid,index);
			    			if(!checkNotEmpty(row.editType)){
					    		ed = $(this).datagrid('getEditor', {index: index,field: 'BUSI_CODE'});
					    		fc = ed.target;
					    		fc.prop('readonly',true);
				    		}
			    		}
			    	}
	            }
			}
			initGridView(reqData, gridList);
			dataGrid.datagrid('loadData', jsonData);
		},
		
		queryBusFlow = function (){
			var dgrid = $('#bWorkFlow_tab').datagrid('options');
			if (!dgrid)
				return;
			var reqData = {
				IFS : 'ACT0016',
				BUSI_NAME:$('#bNameTxt').textbox('getValue'),
				PROCDEF_KEY:$('#keyTxt').textbox('getValue'),
				pageIndex: 0,
				pageSize: dgrid.pageSize
			}
			reqGridData('/iPlant_ajax', 'bWorkFlow_tab', reqData);
		},
		
		saveBusFlow = function(){
			var index = 0;
			$('.datagrid-row-editing').each(function(i, row) {
	            index = row.sectionRowIndex;
	        });
			var row = dataGrid.datagrid('getRows')[index]
			if(row.editType=='add') {
				var bcRow = dataGrid.datagrid('getEditor', {index: index,field: 'BUSI_CODE'}),bc = $(bcRow.target).val(),
    			edkey = dataGrid.datagrid('getEditor', {index: index,field: 'PROCDEF_KEY'}),key = $(edkey.target).combobox('getValue')
				if(checkNotEmpty(bc) && checkNotEmpty(key) ){
					var ajaxParam = {
	                    url: '/iPlant_ajax',
	                    dataType: 'JSON',
	                    data: {
	                       	BUSI_CODE:bc,
	                       	PROCDEF_KEY:key,
	        				IFS: 'ACT0020'
	                    },
	                    successCallBack:function(data){
							rowNum = parseInt(data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS);
							if (rowNum > 0) {
					       		showmessage.html('<font color=red>业务代码['+ bc + ']和工作流标示['+ key + ']已存在,请重新输入!</font>');
					       		return false;
							} else {
								saveDataGrid('bWorkFlow_tab','ACT0017','ACT0018','showMessageInfo');
							}
						},
	            		errorCallBack:function(data){
	            			showmessage.html('<font color=red>提示:保存失败,服务器无响应!</font>');
	            			return false;
	            		}
	                 };
	                iplantAjaxRequest(ajaxParam);
				}else{
					showmessage.html('<font color=red>提示:请输入必填项!</font>');
					return false;
				}
			}else{
				saveDataGrid('bWorkFlow_tab','ACT0017','ACT0018','showMessageInfo');
			}
		}
	}

	bWorkFlow.prototype = {
		init : function() {
			$(function() {
				//初始化全局变量对象
				dataGrid = $('#bWorkFlow_tab'),dataProcess=[],dataLvl=[],dataScope=[],showmessage=$('#showMessageInfo'),editIndex = undefined,oldRow=undefined, reg=new RegExp("null","g");
				initGridData();
				
				$('#btnSearch').click(function() {					
					queryBusFlow();
				});
				
				$('.add').click(function() {
					var data = {PRIO_LVL:'1',BUSI_SCOPE:'mes'};
					insertDataGrid('bWorkFlow_tab',data);
				});
				
				$('.save').click(function() {
					//判断是否有重复的数据，BUSI_CODE，PROCDEF_KEY
					saveBusFlow();
					//saveDataGrid('bWorkFlow_tab','ACT0017','ACT0018','showMessageInfo');
				});
				
				$('.delete').click(function() {
					var datadel = ['BUSI_CODE','PROCDEF_KEY'];
					deleteDataGridMore('bWorkFlow_tab',datadel,'ACT0019','showMessageInfo');
				});
				
			});
		}
	}
	var mwf = new bWorkFlow();
	mwf.init();
})();
