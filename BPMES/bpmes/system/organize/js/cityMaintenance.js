/* 启动时加载 */
/*
 */
(function() {
	function cityInfo() {
		initGridData = function() {
			var national = {
	                url: "/iPlant_ajax",
	                dataType: "JSON",
	                data: {IFS: "B000089"},
	                successCallBack: function(a) {
	                	var op = a.RESPONSE[0].RESPONSE_DATA;
	                    $.each(op,function(n,obj) {
	                    	dataNational.push({'value':obj.CY_CD,'text':obj.CY});
					    });  
	                },
	                errorCallBack: function() {
	                    $.messager.alert("提示", '请联系管理员，查询失败！')
	                }
	            };
				iplantAjaxRequest(national);
			var dgrid = dataGrid.datagrid('options');
			if(!dgrid) return;
			var reqData = {
				IFS: 'B000093', 
				pageIndex: 1,
				pageSize: dgrid.pageSize
			}
			reqGridData('/iPlant_ajax', 'city_tab', reqData);
		},
		bindGridData = function(reqData, jsonData) {
			var gridList = {
				name: 'city_tab',
				dataType: 'json',
				columns: [[
				    {field: 'CD',title: '城市代码',width: 100,align: 'center',hidden:'true'},
					{field: 'CT_CD',title: '城市代码',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
			        	   options:{required:true, validType:['length[1,15]','specialTextCharacter']}}},
			        {field: 'CT',title: '城市',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
			        	   options:{required:true,validType:['length[1,25]','specialTextCharacter']}}}, 
				    {field: 'CY_CD',title: '所属国家',width: 150,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + ( row.CY || value)+ "</span>";},
						   editor:{type:'combobox',options:{valueField:'value',textField:'text',data:dataNational,required:true}}}, 
					{field: 'CRT_ID',title: '创建人',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
					{field: 'CRT_DT',title: '创建时间',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
				]], 
				/**结束编辑模式的操作*/
			     onEndEdit:function(index,row){
			    	 var ed = $(this).datagrid('getEditor', {index: index,field: 'CY_CD'});
			    	 row.CY_CD = $(ed.target).combobox('getValue');
			    	 row.CY = $(ed.target).combobox('getText');
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
			    			var rowEdit = dataGrid.datagrid('getRows')[editIndex],edft = $(this).datagrid('getEditor', {index: editIndex,field: 'CT_CD'}),editorFt = edft.target,cd = editorFt.val();
			    			if(checkNotEmpty(rowEdit.editType)){
			    				if(rowEdit.editType=='add'){
			    					if(checkNotEmpty(cd)){
					    				var ajaxParam = {
											url : '/iPlant_ajax',
											dataType : 'JSON',
											data : {
												IFS : 'B000093',
												CT_CD : cd,
												pageIndex : 1,
												pageSize : 10
											},
											successCallBack : function(data) {
												rowNum = parseInt(data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS);
												if (rowNum > 0) {
													dataGrid.datagrid('selectRow', editIndex).datagrid('beginEdit', editIndex);
										       		showmessage.html('<font color=red>您输入的工厂编码['+ cd + ']已有相同,请重新输入!</font>');
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
			    					if(!checkNotEmpty(row.editType)){//如果是修改的情况，PT_CD字段为只读模式
							    		ed = $(this).datagrid('getEditor', {index: index,field: 'CT_CD'});
							    		fc = ed.target;
							    		fc.prop('readonly',true);
						    		}
			    				}
			    			}else{
					    		 addDatagridEditor(dataGrid,index);
					    		 if(!checkNotEmpty(row.editType)){
							    		ed = $(this).datagrid('getEditor', {index: index,field: 'CT_CD'});
							    		fc = ed.target;
							    		fc.prop('readonly',true);
						    		}
			    			}
			    		}else{
			    			addDatagridEditor(dataGrid,index);
			    			if(!checkNotEmpty(row.editType)){
					    		ed = $(this).datagrid('getEditor', {index: index,field: 'CT_CD'});
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
		getDataByCondition =function (){
			var queryMaterialCode = $('#queryMaterialCode').textbox('getValue');
			var queryProductionOrder = $('#queryProductionOrder').textbox('getValue');
			var queryLabelType = $('#queryLabelType').textbox('getValue');
			var queryLabelName = $('#queryLabelName').textbox('getValue');
			var dgrid = dataGrid.datagrid('options');
	        var reqData ={
	        	PT_CD: queryMaterialCode,
	        	MO_CD: queryProductionOrder,
	        	LB_TY_DES: queryLabelType,
	        	LB_NM: queryLabelName,
	        	IFS:'L000041',
	        	pageIndex:1,
	        	pageSize:dgrid.pageSize
	        };
	        reqGridData('/iPlant_ajax','city_tab',reqData)
	      }
	}

	cityInfo.prototype = {
		init: function() {
			$(function() {
				//初始化全局变量对象
				dataGrid = $('#city_tab'),dataLabelType=[],showmessage=$('#showMessageInfo'),editIndex = undefined,oldRow=undefined, reg=new RegExp("null","g"),dataNational = [];
				initGridData();
				
				$('#btnSearch').click(function(){
		        	  getDataByCondition(); 
				});
				
				$('.add').click(function() {					
					insertDataGrid('city_tab',{CD:autoCreateCode('SYS')});
				});
				
				$('.delete').click(function(){
					deleteDataGrid('city_tab','CD','B000095','showMessageInfo');
	            });

				$('.save').click(function() {
					saveDataGrid('city_tab','B000094','B000096','showMessageInfo');
				});
			});
		}
	}
	var fcfo = new cityInfo();
	fcfo.init();
})();