/* 启动时加载 */
/*
 */
(function() {
	function materialMaintenance() {
		initGridData = function() {
			var dgrid = dataGrid.datagrid('options');
			if(!dgrid) return;
			searchDataGrid(dgrid);
		},
		bindGridData = function(reqData, jsonData) {
			var gridList = {
				name: 'InTheTemplate_tab',
				dataType: 'json',
				columns: [[
					{field: 'FCT_CD',title: '工厂编码',width: 80, align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
						   options:{required:true, validType:['length[1,30]','specialTextCharacter']}}},
					{field: 'SAMP_ST',title: '模板名',width: 150,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + ( row.CP_NM  || value)+ "</span>";},
						editor:{type:'combobox',options:{valueField:'value',textField:'text',data:dataCompany,required:true}}},
					{field: 'SAMP_ST',title: '模板描述',width: 150,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + ( row.CP_NM  || value)+ "</span>";},
						editor:{type:'combobox',options:{valueField:'value',textField:'text',data:dataCompany,required:true}}}, 
					{field: 'SAMP_ST',title: '任务名',width: 150,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + ( row.CP_NM  || value)+ "</span>";},
						editor:{type:'combobox',options:{valueField:'value',textField:'text',data:dataCompany,required:true}}}, 
					{field: 'SAMP_LOT',title: '任务描述',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
			        	   options:{validType:['length[1,150]','specialTextCharacter']}}},
			        {field: 'SAMP_LOT',title: '执行顺序',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
			        	   options:{validType:['length[1,150]','specialTextCharacter']}}},
			        {field: 'SAMP_LOT',title: '任务组',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
			        	   options:{validType:['length[1,150]','specialTextCharacter']}}},
			        {field: 'SAMP_LOT',title: '类别',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
			        	   options:{validType:['length[1,150]','specialTextCharacter']}}},
				    {field: 'CRT_ID',title: '创建人',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
					{field: 'CRT_DT',title: '创建时间',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
					{field: 'UPT_ID',title: '修改人',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
					{field: 'UPT_DT',title: '修改时间',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}
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
		        	/**判断是否为可编辑字段*/
		        	if(field=='img1'){
		        		endEditingAll(dataGrid);
						titleName = 'MSD设置',
						dialogName = 'editTabMSD',
						tabName = 'materialMSD_tab',
						$("#MSDtitle").html("<label>物料号："+row.ITEM_CD+"</label><label>&nbsp;&nbsp;物料描述："+row.ITEM_NM+"</label>"),
						dgrid = $('#materialMSD_tab').datagrid('options'),
						dgrid.itemCd = row.ITEM_CD,
						dgrid.itemNm = row.ITEM_NM,
						dgrid.fctCd = row.FCT_CD,
						reqData = {IFS: 'Z000022',ITEM_CD:row.ITEM_CD,pageIndex: 1,pageSize: dgrid.pageSize};
						openDialogFrame(tabName,dialogName,titleName,reqData)
		        	}else if(field=='img2'){
		        		
		        	}else if(field=='img3'){
		        		
		        	}else if(field=='img4'){
		        		
		        	}else{
			        	if (editIndex != index){
				    		var ed,fc,editorFt;
				    		if(editIndex!=undefined){
			    				/**判断是否为新增行，并验证新增工厂编码重复*/
				    			rowEdit = dataGrid.datagrid('getRows')[editIndex],editem = $(this).datagrid('getEditor', {index: editIndex,field: 'ITEM_CD'}),editorFt = editem.target,itemCd = editorFt.val();
				    			if(checkNotEmpty(rowEdit.editType)){
				    				if(rowEdit.editType=='add'){
				    					if(checkNotEmpty(itemCd)){
						    				var ajaxParam = {
												url : '/iPlant_ajax',
												dataType : 'JSON',
												data : {
													IFS : 'Z000007',
													ITEM_CD : itemCd,
													pageIndex : 1,
													pageSize : 10
												},
												successCallBack : function(data) {
													rowNum = parseInt(data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS);
													if (rowNum > 0) {
														dataGrid.datagrid('selectRow', editIndex).datagrid('beginEdit', editIndex);
											       		showmessage.html('<font color=red>您输入的物料编码['+ itemCd + ']已有相同,请重新输入!</font>');
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
				    					if(!checkNotEmpty(row.editType)){/*如果是修改的情况，ft_cd字段为只读模式*/
								    		ed = $(this).datagrid('getEditor', {index: index,field: 'ITEM_CD'});
								    		fc = ed.target;
								    		fc.prop('readonly',true);
							    		}
				    				}
				    			}else{
						    		 addDatagridEditor(dataGrid,index);
						    		 if(!checkNotEmpty(row.editType)){
								    		ed = $(this).datagrid('getEditor', {index: index,field: 'ITEM_CD'});
								    		fc = ed.target;
								    		fc.prop('readonly',true);
							    		}
				    			}
				    		}else{
				    			addDatagridEditor(dataGrid,index);
				    			if(!checkNotEmpty(row.editType)){
						    		ed = $(this).datagrid('getEditor', {index: index,field: 'ITEM_CD'});
						    		fc = ed.target;
						    		fc.prop('readonly',true);
					    		}
				    		}
				    	}
		        	}
		        },
		        /**单击进入编辑模式*/
			}
			initGridView(reqData, gridList);
			dataGrid.datagrid('loadData', jsonData);
		},
		searchDataGrid=function(dgrid){
			var searchITEM_CD = $('#searchITEM_CD').textbox('getValue'),searchITEM_CD = $('#searchITEM_CD').textbox('getValue'),searchITEM_CD = $('#searchITEM_CD').textbox('getValue');
			var reqData = {
				IFS: 'Z000007',
				ITEM_CD:searchITEM_CD,
				ITEM_TYPE:searchITEM_CD,
				ITEM_NM:searchITEM_CD,
				pageIndex: 1,
				pageSize: dgrid.pageSize
			}
			reqGridData('/iPlant_ajax', 'InTheTemplate_tab', reqData);
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
			if(tabName=='materialMSD_tab'){
				columnsTab=[{field: 'ITEM_MSD_CD',title: '',width: 10,align: 'center',hidden:true,formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox'}},
						{field: 'ITEM_CD',title: '',width: 10,align: 'center',hidden:true,formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox'}},
						{field: 'ITEM_NM',title: '',width: 10,align: 'center',hidden:true,formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox'}},
						{field: 'FCT_CD',title: '',width: 10,align: 'center',hidden:true,formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox'}},
				        {field: 'ALARM_DT',title: '报警时间',width: 110,align: 'center',formatter:function(value,row,index){if(row.ALARM_DT){return row.ALARM_DT;}},
		            		   editor:{type:'datebox',options:{required:true,editable:false}}},
					    {field: 'OVERDUE_DT',title: '过期时间',width: 110,align: 'center',formatter:function(value,row,index){if(row.OVERDUE_DT){return row.OVERDUE_DT;}},
			            		   editor:{type:'datebox',options:{required:true,editable:false}}},
						{field: 'USE_YN',title: '是否启用',width: 80,align: 'center',formatter: function(value, row, index) {if(value == 'Y') { return '启用';} else { return '未启用';}},editor:{type:'checkbox',options:{on: 'Y',off: 'N'}}},
		        	    {field: 'MO',title: 'MO',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
			        	   options:{validType:['length[1,100]','specialTextCharacter']}}}];
				edDataGrid = $('#'+tabName);
				messageInfo = $('#showMSDInfo');
			}else if(tabName=='materialMSD_tab'){
				
			}
			
			var gridList = {
				name: tabName,
				dataType: 'json',
				pagination:false,
				rownumbers:true,
				loadMsg: '数据加载中...',
				columns: [columnsTab],
				/**结束编辑模式的操作*/
			     onEndEdit:function(index,row){
			    	 if(tabName=='materialMSD_tab'){
			    		 var ed = $(this).datagrid('getEditor', {index: index,field: 'ALARM_DT'});
			    		 row.ALARM_DT = $(ed.target).datebox('getValue');
			    	 }
			     },
			     /**进入编辑模式的操作*/
			     onBeforeEdit:function(index,row){
			    	 messageInfo.html('');
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
			    			if(tabName=='materialMSD_tab'){
			    				addDatagridEditor(edDataGrid,index);
			    			}
			    		}else{
			    			addDatagridEditor(edDataGrid,index);
			    		}
			    	}
	            }
			}
			initGridView(reqData, gridList);
			$('#'+tabName).datagrid('loadData', jsonData);
		},
	     /*替代料设置*/
	     initListdata2 = function() {
			 $('#df').datagrid({
	             columns: [[
						{field: 'MSD_dfCD',title: '原物料号',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
				        	   options:{required:true, validType:['length[1,30]','specialTextCharacter']}}},
						{field: 'MSD_yNM',title: '替代料',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
				        	   options:{required:true, validType:['length[1,30]','specialTextCharacter']}}},
						{field: 'MSD_fgADR',title: '员工',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
				        	   options:{validType:['length[1,25]','specialTextCharacter']}}},
				        {field: 'MSD_AhDR',title: '过期时间',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
					        	options:{validType:['length[1,25]','specialTextCharacter']}}},
				        {field: 'MSD_AfhDR',title: '描述',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
					        	options:{validType:['length[1,25]','specialTextCharacter']}}},
				        {field: 'MSD_ADdfR',title: '最新时间',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
					        	options:{validType:['length[1,25]','specialTextCharacter']}}},
					     ]]
	         })
	     },
	    /*物料属性*/
		initListdata3 = function() {
			 $('#MSD').datagrid({
	             columns: [[
						{field: 'MSD_CdfD1',title: '属性名称',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
				        	   options:{required:true, validType:['length[1,30]','specialTextCharacter']}}},
						{field: 'MSD_NdfM2',title: '值',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
				        	   options:{required:true, validType:['length[1,30]','specialTextCharacter']}}},
						{field: 'MSD_AdhDR3',title: '备注',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
				        	   options:{validType:['length[1,25]','specialTextCharacter']}}}
					     ]]
	         })
	     },
	     /*物料位置*/
	     initListdata4 = function() {
			 $('#df').datagrid({
	             columns: [[
						{field: 'MSD_CjhD1',title: '上一级料号',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
				        	   options:{required:true, validType:['length[1,30]','specialTextCharacter']}}},
						{field: 'MSD_NkjM2',title: '物料位号',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
				        	   options:{required:true, validType:['length[1,30]','specialTextCharacter']}}},
						{field: 'MSD_AuiDR3',title: '状态',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
				        	   options:{validType:['length[1,25]','specialTextCharacter']}}}
					     ]]
	         })
	     }
	}

	materialMaintenance.prototype = {
		init: function() {
			$(function() {
				/*初始化全局变量对象*/
				dataGrid = $('#InTheTemplate_tab'),dataCompany=[],dataFactory=[],showmessage=$('#showMessageInfo'),editIndex = undefined,oldRow=undefined, reg=new RegExp("null","g");
				initGridData();
				/*获取工厂类别下拉*/
				$('#btnSearch').click(function() {					
					searchDataGrid();
				});
				$('#btnAdd').click(function() {					
					insertDataGrid('InTheTemplate_tab',{});
				});
				
				$('#btnDelete').click(function(){
					deleteDataGrid('InTheTemplate_tab','ITEM_CD','Z000010','showMSDInfo');
	            });

				$('#btnSave').click(function() {
					saveDataGrid('InTheTemplate_tab','Z000008','Z000009','showMessageInfo');
				});
				
				/*物料msd设置*/
				$('#btnMSDAdd').click(function() {		
					var dgrid = $('#materialMSD_tab').datagrid('options');
					insertDataGrid('materialMSD_tab',{ITEM_MSD_CD:autoCreateCode('MES'),FCT_CD:dgrid.fctCd,ITEM_CD:dgrid.itemCd,ITEM_NM:dgrid.itemNm});/*初始化默认数据*/
				});
				
				$('#btnMSDDelete').click(function(){
					deleteDataGrid('materialMSD_tab','ITEM_MSD_CD','Z000034','showMSDInfo');
	            });

				$('#btnMSDSave').click(function() {
					saveDataGrid('materialMSD_tab','Z000023','Z000024','showMSDInfo');
				});
			
				$('.panel-tool-close').click(function() {
					editIndex = undefined;
					$('#showMessageInfo').html('');
					$('#showMSDInfo').html('');
				});
			});
		}
	}
	var fcfo = new materialMaintenance();
	fcfo.init();
})();