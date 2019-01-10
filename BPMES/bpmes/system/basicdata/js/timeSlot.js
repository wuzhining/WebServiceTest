/* 启动时加载 */
/*
 */
(function() {
	function timeSlot() {
		initGridData = function() {
			var company = {
	                url: "/iPlant_ajax",
	                dataType: "JSON",
	                data: {IFS: "L000021"},
	                successCallBack: function(a) {
	                	var op = a.RESPONSE[0].RESPONSE_DATA;
	                    $.each(op,function(n,obj) {
	                    	dataTimeSlot.push({'value':obj.CS_CD,'text':obj.CS_NM});
					    });  
	                },
	                errorCallBack: function() {
	                    $.messager.alert("提示", '请联系管理员，查询失败！')
	                }
	            };
			iplantAjaxRequest(company);
			var dgrid = dataGrid.datagrid('options');
			if(!dgrid) return;
			var reqData = {
				IFS: 'B000121', 
				pageIndex: 1,
				pageSize: dgrid.pageSize
			}
			reqGridData('/iPlant_ajax', 'timeslot_tab', reqData);
		},
		bindGridData = function(reqData, jsonData) {
			var gridList = {
				name: 'timeslot_tab',
				dataType: 'json',
				columns: [[
					{field: 'CD',hidden:true,title: '编码',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
					{field: 'TS_CD',title: '时段代码',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
			        	   options:{required:true, validType:['length[1,30]','specialTextCharacter']}}},
					{field: 'TS_NM',title: '时段描述',width: 300,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
			        	   options:{validType:['length[1,25]','specialTextCharacter']}}}, 
					{field: 'CS_NM',title: '班次',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
			        	   options:{validType:['length[1,25]','specialTextCharacter']}}},
					{field: 'CS_CD',title: '班次代码',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
			        	   options:{validType:['length[1,25]','specialTextCharacter']}}},
					{field: 'ST_NM',title: '班制',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
			        	   options:{validType:['length[1,25]','specialTextCharacter']}}}, 
					{field: 'ST_CD',title: '班制代码',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
			        	   options:{validType:['length[1,25]','specialTextCharacter']}}}, 
					{field: 'CS_BGN',title: '上班时间',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
					{field: 'CS_END',title: '下班时间',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
					{field: 'TS_ST',title: '是否跨日期',width: 200,align: 'center',formatter: function(value, row, index) {if(value == 'Y') { return '启用';} else { return '未启用';}},editor:{type:'checkbox',options:{on: 'Y',off: 'N'}}}
				]],
				/**结束编辑模式的操作*/
			     onEndEdit:function(index,row){
			    	 //
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
			    			var rowEdit = dataGrid.datagrid('getRows')[editIndex],edft = $(this).datagrid('getEditor', {index: editIndex,field: 'CS_CD'}),editorFt = edft.target,cd = editorFt.val();
			    			if(checkNotEmpty(rowEdit.editType)){
			    				if(rowEdit.editType=='add'){
			    					if(checkNotEmpty(cd)){
					    				var ajaxParam = {
											url : '/iPlant_ajax',
											dataType : 'JSON',
											data : {
												IFS : 'B000121',
												CS_CD : cd,
												pageIndex : 1,
												pageSize : 10
											},
											successCallBack : function(data) {
												rowNum = parseInt(data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS);
												if (rowNum > 0) {
													dataGrid.datagrid('selectRow', editIndex).datagrid('beginEdit', editIndex);
										       		showmessage.html('<font color=red>您输入的班次代码['+ cd + ']已有相同,请重新输入!</font>');
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
			    					if(!checkNotEmpty(row.editType)){//如果是修改的情况，CS_CD字段为只读模式
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
	            }
			}
			initGridView(reqData, gridList);
			dataGrid.datagrid('loadData', jsonData);
		},
		getDataByCondition =function (){
			var timeCode = $('#timeCode').textbox('getValue');
			var classGrounp = $('#classGrounp').textbox('getValue');
			var shiftsCode = $('#shiftsCode').textbox('getValue');
			var dgrid = dataGrid.datagrid('options');
	        var reqData ={
	        	TS_CD: timeCode,
	        	CS_CD: classGrounp,
	        	ST_CD: shiftsCode,
	        	IFS:'B000121',
	        	pageIndex:1,
	        	pageSize:dgrid.pageSize
	        };
	        reqGridData('/iPlant_ajax','timeslot_tab',reqData)
	      }
	}

	timeSlot.prototype = {
		init: function() {
			$(function() {
				//初始化全局变量对象
				dataGrid = $('#timeslot_tab'),dataTimeSlot=[],showmessage=$('#showMessageInfo'),editIndex = undefined,oldRow=undefined, reg=new RegExp("null","g");
				initGridData();
				
				$('#btnSearch').click(function(){
		        	  getDataByCondition(); 
				});
				
				$('.add').click(function() {					
					insertDataGrid('timeslot_tab',{CD:autoCreateCode('SYS')});
				});
				
				$('.delete').click(function(){
					deleteDataGrid('timeslot_tab','CD','B000123','showMessageInfo');
	            });

				$('.save').click(function() {
					saveDataGrid('timeslot_tab','B000122','B000124','showMessageInfo');
				});
			});
		}
	}
	var fcfo = new timeSlot();
	fcfo.init();
})();