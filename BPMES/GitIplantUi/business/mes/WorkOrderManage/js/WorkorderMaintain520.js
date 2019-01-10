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
				name: 'material_tab',
				dataType: 'json',
				columns: [[
							{field: 'MO_NO',title: '工单号',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
					        	   options:{required:true, validType:['length[1,30]','specialTextCharacter']}}},
							{field: 'img',title: 'BOM资料',width: 80,align: 'center',formatter:function(value,row,index){//使用formatter格式化刷子
				        		   return "<img href='javascript:void(0)' class='easyui-linkbutton' onclick='OpenFrame("+row.MO_NO+")' style=\"height: 30px;\" src='../../../common/IplantCompent/themes/default/images/Folder.png'/>"}},
							{field: 'ITEM_CD',title: '物料号',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
					        	   options:{required:true,validType:['length[1,25]','specialTextCharacter']}}}, 
							{field: 'PLAN_PO_QTY',title: '计划量',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
					        	   options:{validType:['length[1,25]','specialTextCharacter']}}},
							{field: 'PROD_PO_QTY',title: '排产量',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
					        	   options:{validType:['length[1,25]','specialTextCharacter']}}}, 
							{field: 'PLAN_STRT_DT',title: '计划开始时间',width: 200,align: 'center',formatter:function(value,row,index){if(row.PLAN_STRT_DT){return row.PLAN_STRT_DT;}},
				            		   editor:{type:'datebox',options:{required:true,editable:false}}},
							{field: 'PLAN_END_DT',title: '计划完成时间',width: 200,align: 'center',formatter:function(value,row,index){if(row.PLAN_END_DT){return row.PLAN_END_DT;}},
					            		   editor:{type:'datebox',options:{required:true,editable:false}}},
							{field: 'MO_STATE',title: '工单状态',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
					        	   options:{validType:['length[1,25]','specialTextCharacter']}}},
							{field: 'CRT_ID',title: '创建用户',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
							{field: 'CRT_DT',title: '创建时间',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
							{field: 'MODEL_NM',title: '机型',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
					        	   options:{validType:['length[1,25]','specialTextCharacter']}}}, 
					        {field: 'img1',title: '排产信息',width: 80,align: 'center',formatter:function(row){
					        		return "<img href='javascript:void(0)' class='easyui-linkbutton' onclick='OpenFrame("+row+")' style=\"height: 30px;\" src='../../../common/IplantCompent/themes/default/images/Folder.png'/>"}},
			        		{field: 'img2',title: '工单属性',width: 80,align: 'center',formatter:function(){
				        		   return "<img href='javascript:void(0)' class='easyui-linkbutton' onclick='OpenFrame()' style=\"height: 30px;\" src='../../../common/IplantCompent/themes/default/images/Folder.png'/>"}}
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
						titleName = '排产信息',
						dialogName = 'editTabMSD',
						tabName = 'materialMSD_tab',
						$("#MSDtitle").html("<label>工单号："+row.MO_NO+"</label><label>&nbsp;&nbsp;物料号："+row.ITEM_CD+"</label><label>&nbsp;&nbsp;数量："+row.PLAN_PO_QTY+"</label>"),
						$("#MSDtitle1").html("<label>员工："+row.CRT_ID+"</label><label>&nbsp;&nbsp;&nbsp;&nbsp;开工时间："+row.PLAN_STRT_DT+"</label>"),
						dgrid = $('#materialMSD_tab').datagrid('options'),
						dgrid.ITEM_CD = row.ITEM_CD,
						dgrid.fctCd = row.FCT_CD,
						dgrid.MO_NO = row.MO_NO,
						reqData = {IFS: 'W0000013',MO_NO:row.MO_NO,pageIndex: 1,pageSize: dgrid.pageSize};
						openDialogFrame(tabName,dialogName,titleName,reqData)
		        	}else if(field=='img2'){
		        		endEditingAll(dataGrid);
						titleName = '工单属性',
						dialogName = 'editTabSingleattribute',
						tabName = 'Singleattribute_tab',
						dgrid = $('#Singleattribute_tab').datagrid('options'),
						dgrid.itemCd = row.ITEM_CD,
						dgrid.itemNm = row.ITEM_NM,
						dgrid.fctCd = row.FCT_CD,
						reqData = {IFS: 'W000009',MO_NO:row.MO_NO,pageIndex: 1,pageSize: dgrid.pageSize};
						openDialogFrame(tabName,dialogName,titleName,reqData)
		        	}else if(field=='img3'){
		        		
		        	}else if(field=='img4'){
		        		
		        	}else{
			        	if (editIndex != index){
				    		var ed,fc,editorFt;
				    		if(editIndex!=undefined){
			    				/**判断是否为新增行，并验证新增工厂编码重复*/
				    			var rowEdit = dataGrid.datagrid('getRows')[editIndex],edft = $(this).datagrid('getEditor', {index: editIndex,field: 'MO_NO'}),editorFt = edft.target,ftCd = editorFt.val();
				    			if(checkNotEmpty(rowEdit.editType)){
				    				if(rowEdit.editType=='add'){
							        	   addDatagridEditor(dataGrid,index);
				    				}else{
				    					addDatagridEditor(dataGrid,index);
				    					if(!checkNotEmpty(row.editType)){
								    		ed = $(this).datagrid('getEditor', {index: index,field: 'MO_NO'});
								    		fc = ed.target;
								    		fc.prop('readonly',true);
							    		}
				    				}
				    			}else{
						    		 addDatagridEditor(dataGrid,index);
						    		 if(!checkNotEmpty(row.editType)){
								    		ed = $(this).datagrid('getEditor', {index: index,field: 'MO_NO'});
								    		fc = ed.target;
								    		fc.prop('readonly',true);
							    		}
				    			}
				    		}else{
				    			addDatagridEditor(dataGrid,index);
				    			if(!checkNotEmpty(row.editType)){
						    		ed = $(this).datagrid('getEditor', {index: index,field: 'MO_NO'});
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
				IFS: 'W000001',
				ITEM_CD:searchITEM_CD,
				ITEM_TYPE:searchITEM_CD,
				ITEM_NM:searchITEM_CD,
				pageIndex: 1,
				pageSize: dgrid.pageSize
			}
			reqGridData('/iPlant_ajax', 'material_tab', reqData);
		},
		openDialogFrame =function(tabName,dialogName,titleName,reqData){
			$("#"+dialogName).dialog("open").dialog('setTitle', titleName);
			if(checkNotEmpty(reqData)){
				dataFactory.splice(0,dataFactory.length);
				var company = {
		                url: "/iPlant_ajax",
		                dataType: "JSON",
		                data: {IFS: "B000109"},
		                successCallBack: function(a) {
		                	var op = a.RESPONSE[0].RESPONSE_DATA;
		                    $.each(op,function(n,obj) {
		                    	dataFactory.push({'value':obj.PD_LN_CD,'text':obj.PD_LN_NM});
						    });  
		                },
		                errorCallBack: function() {
		                    $.messager.alert("提示", '请联系管理员，查询失败！')
		                }
		            };
				iplantAjaxRequest(company),
				dataCompany.splice(0,dataCompany.length);
				var company1 = {
		                url: "/iPlant_ajax",
		                dataType: "JSON",
		                data: {IFS: "B000113"},
		                successCallBack: function(a) {
		                	var op = a.RESPONSE[0].RESPONSE_DATA;
		                    $.each(op,function(n,obj) {
		                    	dataCompany.push({'value':obj.TG_CD,'text':obj.TG_NM});
						    });  
		                },
		                errorCallBack: function() {
		                    $.messager.alert("提示", '请联系管理员，查询失败！')
		                }
		            };
				iplantAjaxRequest(company1),
				dialogDataGrid('/iPlant_ajax', tabName, reqData);
			}
		},
		dialogEditorDataGrid = function(tabName,reqData, jsonData) {
			/*根据tabName判断哪个列表*/
			var columnsTab,edDataGrid,messageInfo;
			if(tabName=='materialMSD_tab'){
				columnsTab=[{field: 'MO_NO',title: '',width: 10,align: 'center',hidden:true,formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox'}},
				            {field: 'ITEM_CD',title: '',width: 10,align: 'center',hidden:true,formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox'}},
					        {field: 'WO_NO',title: '排产号',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
						        	   options:{validType:['length[1,100]','specialTextCharacter']}}},
			        	   {field: 'LINE_CD',title: '线别',width: 150,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + ( row.CP_NM  || value)+ "</span>";},
								editor:{type:'combobox',options:{valueField:'value',textField:'text',data:dataFactory,required:true}}}, 
							{field: 'SHIFT_CD',title: '班组',width: 150,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + ( row.CP_NM  || value)+ "</span>";},
								editor:{type:'combobox',options:{valueField:'value',textField:'text',data:dataCompany,required:true}}}, 
							{field: 'PLAN_WO_QTY',title: '排产数量',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
									        	   options:{validType:['length[1,100]','specialTextCharacter']}}},
			        	   {field: 'PLAN_STRT_DT',title: '计划开始时间',width: 200,align: 'center',formatter:function(value,row,index){if(row.PLAN_STRT_DT){return row.PLAN_STRT_DT;}},
			            		   editor:{type:'datebox',options:{required:true,editable:false}}},
	            		   {field: 'PLAN_END_DT',title: '计划完成时间',width: 200,align: 'center',formatter:function(value,row,index){if(row.PLAN_END_DT){return row.PLAN_END_DT;}},
				            		   editor:{type:'datebox',options:{required:true,editable:false}}}
									        	   ];
				edDataGrid = $('#'+tabName);
				messageInfo = $('#showMSDInfo');
			}else if(tabName=='Singleattribute_tab'){
				columnsTab=[{field: 'MO_NO',title: '',width: 10,align: 'center',hidden:true,formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox'}},
				            {field: 'PO_ATTR',title: '工单属性',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox'}},
					        {field: 'PO_ATTR_NM',title: '工单属性名称',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
						        	   options:{validType:['length[1,100]','specialTextCharacter']}}},
						    {field: 'PO_ATTR_VAL',title: '值',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
						        	   options:{validType:['length[1,100]','specialTextCharacter']}}},
			        	   {field: 'MO',title: '备注',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
						        	   options:{validType:['length[1,100]','specialTextCharacter']}}}
									        	   ];
				edDataGrid = $('#'+tabName);
				messageInfo = $('#showMSDInfo1');
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
	     
	     OpenImprotFrame = function(){
	 		$("#enditTabupload").dialog("open").dialog('setTitle', '排产导入');
	 	}
	     ImportStation =function(){
	    	   $('#FILE_BELONG').val("MO_NO"),
				$('#FILE_CLS').val("import"),
				$('#FILE_TYPE').val('xlsx'),
				$('#importType').val('1'),
				$('#IFS').val('W000002'),
				$('#importUplod').submit();
	     }
	}

	materialMaintenance.prototype = {
		init: function() {
			$(function() {
				/*初始化全局变量对象*/
				dataGrid = $('#material_tab'),dataCompany=[],dataFactory=[],showmessage=$('#showMessageInfo'),editIndex = undefined,oldRow=undefined, reg=new RegExp("null","g");
				initGridData();
				/*获取工厂类别下拉*/
				$('#btnSearch').click(function() {					
					searchDataGrid();
				});
				$('#btnAdd').click(function() {					
					insertDataGrid('material_tab',{});
				});
				
				$('#btnDelete').click(function(){
					deleteDataGrid('material_tab','MO_NO','W000004','showMSDInfo');
	            });
					
				$('#btnSave').click(function() {
					saveDataGrid('material_tab','W000002','W000003','showMessageInfo');
				});
				
				/*物料msd设置*/
				$('#btnMSDAdd').click(function() {		
					var dgrid = $('#materialMSD_tab').datagrid('options');
					insertDataGrid('materialMSD_tab',{FCT_CD:"00001",WO_NO:autoCreateCode('MES'),MO_NO:dgrid.MO_NO,WO_STATE:"Y",ITEM_CD:dgrid.ITEM_CD});//初始化默认数据
				});
				
				$('#btnMSDDelete').click(function(){
					deleteDataGrid('materialMSD_tab','WO_NO','W0000016','showMSDInfo');
	            });

				$('#btnMSDSave').click(function() {
					saveDataGrid('materialMSD_tab','W0000014S','W0000015S','showMSDInfo');
				});
				/*工单属性设置*/
				$('#btnMSD1Add').click(function() {		
					var dgrid = $('#Singleattribute_tab').datagrid('options');
					insertDataGrid('Singleattribute_tab',{FCT_CD:"00001",ID:1,MO_NO:"M023"});/*初始化默认数据*/
				});
				
				$('#btnMSD1Delete').click(function(){
					deleteDataGrid('Singleattribute_tab','PO_ATTR','W0000012','showMSDInfo');
	            });

				$('#btnMSD1Save').click(function() {
					saveDataGrid('Singleattribute_tab','W0000010','W0000011','showMSDInfo');
				});
				
				$('#import').click(function() {
					OpenImprotFrame();
				});
			
				$('.panel-tool-close').click(function() {
					editIndex = undefined;
				});
			});
		}
	}
	var fcfo = new materialMaintenance();
	fcfo.init();
})();