/* 启动时加载 */
/*
 */
(function() {
	function flightInfo() {
		/**初始化公司combobox内容*/
		initGridData = function() {
			var company = {
	                url: "/iPlant_ajax",
	                dataType: "JSON",
	                data: {IFS: "B000017"},
	                successCallBack: function(a) {
	                	var op = a.RESPONSE[0].RESPONSE_DATA;
	                    $.each(op,function(n,obj) {
	                    	dataClass.push({'value':obj.CS_CD,'text':obj.CS_CD});
					    });  
	                },
	                errorCallBack: function() {
	                    $.messager.alert("提示", '请联系管理员，查询失败！')
	                }
	            };
			iplantAjaxRequest(company);
			/**初始化工厂类型combobox内容*/
			factory = {
                url: "/iPlant_ajax",
                dataType: "JSON",
                data: {IFS:'B000017'},
                successCallBack: function(a) {
                	var op = a.RESPONSE[0].RESPONSE_DATA;
                    $.each(op,function(n,obj) {
                    	dataFactory.push({'value':obj.CS_CD,'text':obj.CS_NM});
				    }); 
                },
                errorCallBack: function() {
                    $.messager.alert("提示", '请联系管理员，查询失败！')
                }
            };
			iplantAjaxRequest(factory);
			var dgrid = dataGrid.datagrid('options');
			if(!dgrid) return;
			var reqData = {
				IFS: 'B000017',
				pageIndex: 1,
				pageSize: dgrid.pageSize
			}
			reqGridData('/iPlant_ajax', 'classmaintenance_tab', reqData);
		},
		bindGridData = function(reqData, jsonData) {
			var gridList = {
				name: 'classmaintenance_tab',
				dataType: 'json',
				columns: [[
							{ field: 'CS_CD',title:'班次代码',width: 100,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + ( row.CS_CD  || value)+ "</span>";},
								editor:{type:'combobox',options:{required:true,valueField:'value',textField:'text',data:dataClass,required:true}}}, 
							{ field: 'CS_NM',title:'班次名称',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
						        	options:{required:true, validType:['length[1,30]','specialTextCharacter']}}},
							{ field: 'LB_DES',title:'班次描述',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
					        	   options:{required:true, validType:['length[1,30]','specialTextCharacter']}}},
							{ field: 'BL_SHT', title: '所属班制', width: 150,align:'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + ( row.CS_NM  || value)+ "</span>";},
								editor:{type:'combobox',options:{required:true,valueField:'value',textField:'text',data:dataFactory,required:true}}}, 
							{ field: 'CS_BGN', title: '上班时间',width: 150,align: 'center',formatter: function(value,row,index){if(row.PLAN_STRT_DT){return row.PLAN_STRT_DT;}},
						            editor:{type:'datetimebox',options:{required:true,editable:false}}},
							{ field: 'CS_END', title: '下班时间', width: 150,align:'center',formatter: function(value,row,index){if(row.PLAN_STRT_DT){return row.PLAN_STRT_DT;}},
							            editor:{type:'datetimebox',options:{required:true,editable:false}}},
							{ field: 'CS_ST', title: '是否跨日期', width: 100,align:'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
					        	   options:{validType:['length[1,25]','specialTextCharacter']}}}
						]],
				/**结束编辑模式的操作*/
			     onEndEdit:function(index,row){
			    	 var ed = $(this).datagrid('getEditor', {index: index,field: 'BL_SHT'});
			    	 row.BL_SHT = $(ed.target).combobox('getValue');
			    	 row.CS_NM = $(ed.target).combobox('getText');
			     },
			     /**进入编辑模式的操作*/
			     onBeforeEdit:function(index,row){
				    	if (editIndex != index){
				    		var ed,fc,editorFt;
				    		if(editIndex!=undefined){
			    				/**判断是否为新增行，并验证新增工厂编码重复*/
				    			var rowEdit = dataGrid.datagrid('getRows')[editIndex],edft = $(this).datagrid('getEditor', {index: editIndex,field: 'CS_CD'}),editorFt = edft.target,cd = editorFt.val();
				    			if(checkNotEmpty(rowEdit.editType)){
				    				if(rowEdit.editType=='add'){
				    					if(checkNotEmpty(cd)){
						    				var ajaxParam = {
												url : '/iPlant_ajax',
												dataType : 'JSON',
												data : {
													IFS : 'L000041',
													CS_CD : cd,
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
								    		ed = $(this).datagrid('getEditor', {index: index,field: 'CS_CD'});
								    		fc = ed.target;
								    		fc.prop('readonly',true);
							    		}
				    				}
				    			}else{
						    		 addDatagridEditor(dataGrid,index);
						    		 if(!checkNotEmpty(row.editType)){
								    		ed = $(this).datagrid('getEditor', {index: index,field: 'CS_CD'});
								    		fc = ed.target;
								    		fc.prop('readonly',true);
							    		}
				    			}
				    		}else{
				    			addDatagridEditor(dataGrid,index);
				    			if(!checkNotEmpty(row.editType)){
						    		ed = $(this).datagrid('getEditor', {index: index,field: 'CS_CD'});
						    		fc = ed.target;
						    		fc.prop('readonly',true);
					    		}
				    		}
				    	}
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
			    	addDatagridEditor(dataGrid,index);
			    }
			}
			initGridView(reqData, gridList);
			dataGrid.datagrid('loadData', jsonData);
		},
		getDataByCondition =function (){
			var queryClassCode = $('#queryClassCode').textbox('getValue');
			var queryClassName = $('#queryClassName').textbox('getValue');
			var dgrid = dataGrid.datagrid('options');
	        var reqData ={
	        	CS_CD: queryClassCode,
	        	CS_NM: queryClassName,
	        	IFS:'B000017',
	        	pageIndex:1,
	        	pageSize:dgrid.pageSize
	        };
	        reqGridData('/iPlant_ajax','classmaintenance_tab',reqData)
	      }
	}

	flightInfo.prototype = {
		init: function() {
			$(function() {
				//初始化全局变量对象
				dataGrid = $('#classmaintenance_tab'),dataClass=[],dataFactory=[],showmessage=$('#showMessageInfo'),editIndex = undefined,oldRow=undefined, reg=new RegExp("null","g");
				initGridData();
				
				$('#btnSearch').click(function(){
		        	  getDataByCondition(); 
				});
				
				$('.add').click(function() {					
					insertDataGrid('classmaintenance_tab',{});
				});
				
				$('.delete').click(function(){
					deleteDataGrid('classmaintenance_tab','CS_CD','B000019','showMessageInfo');
	            });

				$('.save').click(function() {
					saveDataGrid('classmaintenance_tab','B000018','B000020','showMessageInfo');
				});
			});
		}
	}
	var fcfo = new flightInfo();
	fcfo.init();
})();