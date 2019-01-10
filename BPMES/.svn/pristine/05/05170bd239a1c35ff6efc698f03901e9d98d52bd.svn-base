
/* 启动时加载 */
/*
 */
(function() {
	function ProLineCalendar() {
		/**初始化combobox内容*/
		initGridData = function() {
			var workshop = {
                url: "/iPlant_ajax",
                dataType: "JSON",
                data: {IFS: "B000117"},
                successCallBack: function(a) {
                	var op = a.RESPONSE[0].RESPONSE_DATA;
                    $.each(op,function(n,obj) {
                    	dataWorkshop.push({'value':obj.PLA_CD,'text':obj.PLA_CD});
				    });
                },
                errorCallBack: function() {
                    $.messager.alert("提示", '请联系管理员，查询失败！')
                }
            };
			iplantAjaxRequest(workshop);
			var classes = {
	                url: "/iPlant_ajax",
	                dataType: "JSON",
	                data: {IFS: "B000117"},
	                successCallBack: function(a) {
	                	var op = a.RESPONSE[0].RESPONSE_DATA;
	                    $.each(op,function(n,obj) {
	                    	dataClasses.push({'value':obj.CS_CD,'text':obj.CS_NM});
					    });
	                },
	                errorCallBack: function() {
	                    $.messager.alert("提示", '请联系管理员，查询失败！')
	                }
	            };
				iplantAjaxRequest(classes);
			var dgrid = dataGrid.datagrid('options');
			if(!dgrid) return;
			var reqData = {
				IFS: 'B000117',
				pageIndex: 1,
				pageSize: dgrid.pageSize
			}
			reqGridData('/iPlant_ajax', 'prolinecalendar_tab', reqData);
		},
		bindGridData = function(reqData, jsonData) {
			var gridList = {
				name: 'prolinecalendar_tab',
				dataType: 'json',
				columns: [[
					// {field : "CZ",width : 10,checkbox : true},
					{ field: 'CD', hidden:true,title: '编码', width: 100,align:'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
			        	   options:{required:true, validType:['length[1,25]','specialTextCharacter']}}},
					{ field: 'PLA_CD', title: '车间代码', width: 150,align:'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + ( row.PLA_CD  || value)+ "</span>";},
						editor:{type:'combobox',options:{valueField:'value',textField:'text',data:dataWorkshop,required:true}}}, 
					{ field: 'PD_LN_CD', title: '产线代码', width: 100,align:'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
			        	   options:{validType:['length[1,25]','specialTextCharacter']}}}, 
					{ field: 'CS_NM', title: '班次', width: 100,align:'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + ( row.CS_NM  || value)+ "</span>";},
						editor:{type:'combobox',options:{valueField:'value',textField:'text',data:dataClasses,required:true}}}, 
					{ field: 'PD_LN_DT', title: '日期', width:100,align:'center',formatter: function (value,row,index) {if(row.PD_LN_DT) {return formatterDate(row.PD_LN_DT,'yyyy-MM-dd')}},
							editor:{type:'datebox',options:{required:true,editable:false}}},  
					{ field: 'PD_LN_BEG', title: '开始时间', width: 200,align:'center',formatter: function(value,row,index){if(row.PD_LN_BEG){return formatterDate(row.PD_LN_BEG,'yyyy-MM-dd hh:mm:ss')}},
							      editor:{type:'datetimebox',options:{required:true,editable:false}}},
			        { field: 'PD_LN_END', title: '结束时间', width: 200,align:'center',formatter: function(value,row,index){if(row.PD_LN_END){return formatterDate(row.PD_LN_BEG,'yyyy-MM-dd hh:mm:ss')}},
						      editor:{type:'datetimebox',options:{required:true,editable:false}}},
					{ field: 'OT_ST', title: '是否加班', width: 200,align:'center',formatter: function(value, row, index) {if(value == 'Y') { return '启用';} else { return '未启用';}},editor:{type:'checkbox',options:{on: 'Y',off: 'N'}}},
					{ field: 'OT_TI', title: '加班时间', width: 200,align:'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
							options:{validType:['length[1,25]','specialTextCharacter']}}}, 
					{ field: 'REMARK', title: '备注', width: 200,align:'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
			        	   options:{validType:['length[1,25]','specialTextCharacter']}}},    
					]],
				/**结束编辑模式的操作*/
			     onEndEdit:function(index,row){
			    	 var ed = $(this).datagrid('getEditor', {index: index,field: 'PLA_CD'});
			    	 row.PLA_CD = $(ed.target).combobox('getValue');
			    	 row.PLA_CD = $(ed.target).combobox('getText');
			     },
			     /**进入编辑模式的操作*/
			     onBeforeEdit:function(index,row){
			    	 /*row.PD_LN_DT = formatterDate(row.PD_LN_DT,'yyyy-MM-dd');
			    	 row.PD_LN_BEG = formatterDate(row.PD_LN_BEG,'yyyy-MM-dd hh:mm:ss');
			    	 row.PD_LN_END = formatterDate(row.PD_LN_END,'yyyy-MM-dd hh:mm:ss');*/
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
			    			var rowEdit = dataGrid.datagrid('getRows')[editIndex],edft = $(this).datagrid('getEditor', {index: editIndex,field: 'PLA_CD'}),editorFt = edft.target,cd = editorFt.val();
			    			if(checkNotEmpty(rowEdit.editType)){
			    				if(rowEdit.editType=='add'){
			    					if(checkNotEmpty(cd)){
					    				var ajaxParam = {
											url : '/iPlant_ajax',
											dataType : 'JSON',
											data : {
												IFS : 'L000041',
												PLA_CD : cd,
												pageIndex : 1,
												pageSize : 10
											},
											successCallBack : function(data) {
												rowNum = parseInt(data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS);
												if (rowNum > 0) {
													dataGrid.datagrid('selectRow', editIndex).datagrid('beginEdit', editIndex);
										       		showmessage.html('<font color=red>您输入的车间编码['+ cd + ']已有相同,请重新输入!</font>');
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
			    					if(!checkNotEmpty(row.editType)){//如果是修改的情况，PLA_CD字段为只读模式
			    						ed = $(this).datagrid('getEditor', {index: index,field: 'PLA_CD'});
							    		fc = ed.target;
							    		fc.prop('readonly',true);
						    		}
			    				}
			    			}else{
					    		 addDatagridEditor(dataGrid,index);
					    		 if(!checkNotEmpty(row.editType)){
							    		ed = $(this).datagrid('getEditor', {index: index,field: 'PLA_CD'});
							    		fc = ed.target;
							    		fc.prop('readonly',true);
						    		}
			    			}
			    		}else{
			    			addDatagridEditor(dataGrid,index);
			    			if(!checkNotEmpty(row.editType)){
					    		ed = $(this).datagrid('getEditor', {index: index,field: 'PLA_CD'});
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
			var ProductionDate1 = $('#ProductionDate1').textbox('getValue');
			var ProductionDate2 = $('#ProductionDate2').textbox('getValue');
			var WorkShop = $('#WorkShop').textbox('getValue');
			var dgrid = dataGrid.datagrid('options');
	        var reqData ={
	        	PD_LN_BEG: ProductionDate1,
	        	PD_LN_END: ProductionDate2,
	        	PLA_CD: WorkShop,
	        	IFS:'B000117',
	        	pageIndex:1,
	        	pageSize:dgrid.pageSize
	        };
	        reqGridData('/iPlant_ajax','prolinecalendar_tab',reqData);
		}
	}

	ProLineCalendar.prototype = {
		init: function() {
			$(function() {
				//初始化全局变量对象
				dataGrid = $('#prolinecalendar_tab'),dataWorkshop=[],dataClasses=[],showmessage=$('#showMessageInfo'),editIndex = undefined,oldRow=undefined, reg=new RegExp("null","g");
				initGridData();
				
				$('#btnSearch').click(function(){
			       	  getDataByCondition(); 
				});
				
				$('.add').click(function() {					
					insertDataGrid('prolinecalendar_tab',{CD:autoCreateCode('SYS')});
				});
				
				$('.delete').click(function(){
					deleteDataGrid('prolinecalendar_tab','CD','B000119','showMessageInfo');
		         });

				$('.save').click(function() {
					saveDataGrid('prolinecalendar_tab','B000118','B000120','showMessageInfo');
				});
			});
		}
	}
	var fcfo = new ProLineCalendar();
	fcfo.init();
})();