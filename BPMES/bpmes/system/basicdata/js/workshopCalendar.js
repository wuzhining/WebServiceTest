
/* 启动时加载 */
/*
 */
(function() {
	function workshopCalendar() {
		/**初始化公司combobox内容*/
		initGridData = function() {
			var workshop = {
                url: "/iPlant_ajax",
                dataType: "JSON",
                data: {IFS: "B000125"},
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
	                    	dataClasses.push({'value':obj.CS_NM,'text':obj.CS_NM});
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
				IFS: 'B000125',
				pageIndex: 1,
				pageSize: dgrid.pageSize
			}
			reqGridData('/iPlant_ajax', 'workshopcalendar_tab', reqData);
		},
		bindGridData = function(reqData, jsonData) {
			var gridList = {
				name: 'workshopcalendar_tab',
				dataType: 'json',
				columns: [[
					{field: 'PLA_CD',title: '车间代码',width: 150,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + ( row.CP_NM  || value)+ "</span>";},
						   editor:{type:'combobox',options:{valueField:'value',textField:'text',data:dataWorkshop,required:true}}},
					{field: 'CS_NM',title: '班次',width: 150,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + ( row.CS_NM  || value)+ "</span>";},
					       editor:{type:'combobox',options:{valueField:'value',textField:'text',data:dataClasses,required:true}}},
					{field: 'PLA_DT',title: '生产日期',width: 150,align: 'center',formatter: function(value,row,index){if(row.PLA_DT){return formatterDate(row.PLA_DT,'yyyy-MM-dd')}},
			            		editor:{type:'datebox',options:{required:true,editable:false}}},   
					{field: 'PLA_BEG',title: '开始时间',width: 200,align: 'center',formatter:function(value,row,index){if(row.PLA_BEG){return formatterDate(row.PLA_BEG,'yyyy-MM-dd hh:mm:ss')}},
				            	editor:{type:'datetimebox',options:{required:true,editable:false}}},
				    {field: 'PLA_END',title: '结束时间',width: 200,align: 'center',formatter: function(value,row,index){if(row.PLA_END){return formatterDate(row.PLA_END,'yyyy-MM-dd hh:mm:ss')}},
					            editor:{type:'datetimebox',options:{required:true,editable:false}}},
					{field: 'OT_ST',title: '是否加班',width: 100,align: 'center',formatter: function(value, row, index) {if(value == 'Y') { return '是';} else { return '否';}},editor:{type:'checkbox',options:{on: 'Y',off: 'N'}}},
					{field: 'OT_TI',title: '加班时间',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
						   options:{validType:['length[1,100]','specialTextCharacter']}}},
					{field: 'REMARK',title: '备注',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
						   options:{validType:['length[1,15]','specialTextCharacter']}}},
					{field: 'CRT_ID',title: '创建人',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
					{field: 'CRT_DT',title: '创建时间',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
				]],
				/**结束编辑模式的操作*/
			     onEndEdit:function(index,row){
/*			    	 var ed = $(this).datagrid('getEditor', {index: index,field: 'PLA_CD'});
			    	 row.PLA_CD = $(ed.target).combobox('getValue');
			    	 row.PLA_CD = $(ed.target).combobox('getText');*/
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
			    			var rowEdit = dataGrid.datagrid('getRows')[editIndex],edft = $(this).datagrid('getEditor', {index: editIndex,field: 'PLA_CD'}),editorFt = edft.target,cd = editorFt.val();
			    			if(checkNotEmpty(rowEdit.editType)){
			    				if(rowEdit.editType=='add'){
			    					if(checkNotEmpty(cd)){
					    				var ajaxParam = {
											url : '/iPlant_ajax',
											dataType : 'JSON',
											data : {
												IFS : 'B000125',
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
			var productionStartTime = $('#productionStartTime').textbox('getValue');
			var productionEndTime = $('#productionEndTime').textbox('getValue');
			var workshopCode = $('#workshopCode').textbox('getValue');
			var dgrid = dataGrid.datagrid('options');
	        var reqData ={
	        	PLA_DT: productionStartTime,
	        	PLA_DT: productionEndTime,
	        	PLA_CD: workshopCode,
	        	IFS:'B000125',
	        	pageIndex:1,
	        	pageSize:dgrid.pageSize
	        };
	        reqGridData('/iPlant_ajax','workshopcalendar_tab',reqData);
	      }
	}

	workshopCalendar.prototype = {
		init: function() {
			$(function() {
				//初始化全局变量对象
				dataGrid = $('#workshopcalendar_tab'),dataWorkshop=[],dataClasses=[],showmessage=$('#showMessageInfo'),editIndex = undefined,oldRow=undefined, reg=new RegExp("null","g");
				initGridData();
				
				$('#btnSearch').click(function(){
		        	  getDataByCondition(); 
				});
				
				$('.add').click(function() {					
					insertDataGrid('workshopcalendar_tab',{CD:autoCreateCode('SYS')});
				});
				
				$('.delete').click(function(){
					deleteDataGrid('workshopcalendar_tab','CD','B000127','showMessageInfo');
	            });

				$('.save').click(function() {
					saveDataGrid('workshopcalendar_tab','B000126','B000128','showMessageInfo');
				});
			});
		}
	}
	var fcfo = new workshopCalendar();
	fcfo.init();
})();