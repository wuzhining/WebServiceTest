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
					{field: 'RETURN_ID',title: '退货单号',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox', options:{validType:['length[1,25]','specialTextCharacter']}}},
					{field: 'ORDER_ID',title: '采购单号',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox', options:{validType:['length[1,25]','specialTextCharacter']}}}, 
					{field: 'MATERIA_ID',title: '物料编号',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
			        	   options:{validType:['length[1,100]','specialTextCharacter']}}}, 
			        {field: 'MATERIA_NAME',title: '物料名称',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
				           options:{validType:['length[1,100]','specialTextCharacter']}}}, 
			        {field: 'SUPPLIER_ID',title: '供应商编号',width: 60,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
				           options:{validType:['length[1,100]','specialTextCharacter']}}},
				    {field: 'SUPPLIER_NAME',title: '供应商名称',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
					       options:{required:true, validType:['length[1,30]','specialTextCharacter']}}},
					{field: 'CONNECTOR_ID',title: '联系人编号',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox', options:{validType:['length[1,25]','specialTextCharacter']}}}, 
					{field: 'CONNECTOR_NAME',title: '联系人名称',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
			        	   options:{validType:['length[1,100]','specialTextCharacter']}}}, 
			        {field: 'CONNECTOR_PHONE',title: '联系人电话',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
				           options:{validType:['length[1,100]','specialTextCharacter']}}}, 
			        {field: 'RETURN_NUMBER',title: '退货数量',width: 60,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
				           options:{validType:['length[1,100]','specialTextCharacter']}}},
			        {field: 'PURCHASE_NUMBER',title: '采购数量',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
			        	   options:{validType:['length[1,100]','specialTextCharacter']}}}, 
			        {field: 'UNIT_ID',title: '计量单位ID',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
				           options:{validType:['length[1,100]','specialTextCharacter']}}}, 
			        {field: 'UNIT_NAME',title: '计量单位名称',width: 60,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
				           options:{validType:['length[1,100]','specialTextCharacter']}}},
			        {field: 'STATUS',title: '状态',width: 60,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
				           options:{validType:['length[1,100]','specialTextCharacter']}}},
			        {field: 'CREATE_DATE',title: '制单时间',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
			        {field: 'CREATER_ID',title: '制单人',width: 60,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
			        {field: 'CREATER_NAME',title: '制单人名称',width: 60,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
			        {field: 'img1',title: '采购订单查看',width: 60,align: 'center',formatter:function(){//使用formatter格式化刷子
		        		   return "<img href='javascript:void(0)' class='easyui-linkbutton' onclick='openDialogFrame(1)'  src='../../../common/IplantCompent/themes/default/images/Folder.png'/>"}},
		            {field: 'img2',title: '退货物料详情',width: 70,align: 'center',formatter:function(){//使用formatter格式化刷子
			        	   return "<img href='javascript:void(0)' class='easyui-linkbutton' onclick='openDialogFrame(2)'  src='../../../common/IplantCompent/themes/default/images/Folder.png'/>"}},
			        ]],
			        
				/**结束编辑模式的操作*/
			     onEndEdit:function(index,row){
			    	 /*var ed = $(this).datagrid('getEditor', {index: index,field: 'CP_CD'});
			    	 row.CP_CD = $(ed.target).combobox('getValue');
			    	 row.CP_NM = $(ed.target).combobox('getText');
			    	 var eddi = $(this).datagrid('getEditor', {index: index,field: 'DICT_IT'});
			    	 row.DICT_IT = $(eddi.target).combobox('getValue');
			    	 row.DICT_IT_NM = $(eddi.target).combobox('getText');*/
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
		        	/**判断是否为可编辑字段*/
		        	if(field=='img1'){
		        		endEditingAll(dataGrid);
						titleName = 'MSD设置',
						dialogName = 'editTabMSD',
						tabName = 'materialMSD_tab',
						$("#MSDtitle").html("<label>退货单号："+row.RETURN_ID+"</label><label>&nbsp;&nbsp;制单人："+row.CREATER_NAME+"</label>"),
						dgrid = $('#materialMSD_tab').datagrid('options'),
						dgrid.itemCd = row.ITEM_CD,
						dgrid.itemNm = row.ITEM_NM,
						dgrid.fctCd = row.FCT_CD,
						reqData = {IFS: 'WMS_D000009',ORDER_ID:row.ORDER_ID,ITEM_CD:row.ITEM_CD,pageIndex: 1,pageSize: dgrid.pageSize};
						openDialogFrame(tabName,dialogName,titleName,reqData);
		        	}else if(field=='img2'){
		        		endEditingAll(dataGrid);
						titleName = '替代料设置',
						dialogName = 'editTabSubstitute',
						tabName = 'materialSubstitute_tab',
						dgrid = $('#materialSubstitute_tab').datagrid('options'),
						dgrid.itemCd = row.ITEM_CD,
						dgrid.itemNm = row.ITEM_NM,
						dgrid.fctCd = row.FCT_CD,
						reqData = {IFS: 'Z000035',ITEM_CD:row.ITEM_CD,pageIndex: 1,pageSize: dgrid.pageSize};
						openDialogFrame(tabName,dialogName,titleName,reqData);
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
				    					if(!checkNotEmpty(row.editType)){//如果是修改的情况，ft_cd字段为只读模式
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
		},/** 删除行 */
		deleteDataGrid = function() {
			/** 删除行有2中情况，一种新增的还没有保存，一种是原来就有的直接删除 */
			var indexs = datagridEditorRows(), del = [], row;
			if (indexs.length > 0) {
				$.messager
						.confirm(
								"确认框",
								"您确定要删除您所选择的数据?",
								function(a) {
									if (a) {
										for (var j = 0; j < indexs.length; j++) {
											row = dataGrid
													.datagrid('getRows')[indexs[j]];
											if (checkNotEmpty(row.RETURN_ID)) {
												var e = {
													url : "/iPlant_ajax",
													dataType : "JSON",
													data : {
														IFS : "WMS_D000002",
														RETURN_ID : row.RETURN_ID
													},
													successCallBack : function() {
														// dataGrid.datagrid('deleteRow',
														// indexs[j]);
													}
												};
												dataGrid.datagrid(
														'deleteRow',
														indexs[j]);
												iplantAjaxRequest(e);
											} else {
												/** 判断多个空行只删除最顶上的 */
												del.push(indexs[j]);
											}
										}
										if (del.length > 0) {
											dataGrid
													.datagrid(
															'deleteRow',
															del[0]);
										}
										if (del.length == 1) {
											editIndex = undefined;
										}
										showmessage
												.html('<font color=red>删除成功！</font>');
									}
								})
			} else {
				showmessage.html('<font color=red>请选中要删除的数据！</font>');
			}
		},
		
		/**插入一个新的空白行*/
		insertDataGrid=function (){
			var row = dataGrid.datagrid('getSelected');
			if (row){
				var index = dataGrid.datagrid('getRowIndex', row);
			} else {
				index = 0;
				editIndex = 0;
			}
			//CP_CD:dataCompany[0].value,CP_NM:dataCompany[0].text,DICT_IT:dataFactory[0].value,DICT_IT_NM:dataFactory[0].text
			dataGrid.datagrid('insertRow', {
				index: index,
				row:{}
			});
			/**新增一个字段判断是否为新增*/
			var rowEdit = dataGrid.datagrid('getRows')[index];
			rowEdit.editType='add';
			dataGrid.datagrid('selectRow',index);
			dataGrid.datagrid('beginEdit',index);
			if (editIndex != index){
				if (endEditing(dataGrid)){
					dataGrid.datagrid('selectRow', index).datagrid('beginEdit', index);
					editIndex = index;
				} else {
					dataGrid.datagrid('selectRow', editIndex);
				}
			}else{
				endEditing(dataGrid);
			}
		},
	
		
		searchDataGrid=function(dgrid){
			var searchITEM_CD = $('#searchITEM_CD').textbox('getValue'),searchITEM_CD = $('#searchITEM_CD').textbox('getValue'),searchITEM_CD = $('#searchITEM_CD').textbox('getValue');
			var reqData = {
				IFS: 'WMS_D000001',
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
				dialogDataGrid('/iPlant_ajax', tabName, reqData);
			}
		},
		dialogEditorDataGrid = function(tabName,reqData, jsonData) {
			//根据tabName判断哪个列表
			var columnsTab,edDataGrid,messageInfo;
			if(tabName=='materialMSD_tab'){
				columnsTab=[
				        {field: 'RETURN_ID',title: '退货单号',width: 110,align: 'center',formatter:function(value,row,index){if(row.RETURN_ID){return row.RETURN_ID;}},
		            		   editor:{type:'validatebox',options:{required:true,editable:false}}},
					    {field: 'ORDER_ID',title: '采购订单编号',width: 110,align: 'center',formatter:function(value,row,index){if(row.ORDER_ID){return row.ORDER_ID;}},
			            		   editor:{type:'validatebox',options:{required:true,editable:false}}},
						{field: 'MATERIA_ID',title: '物料ID',width: 110,align: 'center',formatter:function(value,row,index){if(row.MATERIA_ID){return row.MATERIA_ID;}},
		            		   editor:{type:'validatebox',options:{required:true,editable:false}}},
					    
						{field: 'SUPPLIER_NAME',title: '供应商名称',width: 110,align: 'center',formatter:function(value,row,index){if(row.SUPPLIER_NAME){return row.SUPPLIER_NAME;}},
		            		   editor:{type:'validatebox',options:{required:true,editable:false}}},
					    {field: 'CONNECTOR_NAME',title: '联系人名称',width: 110,align: 'center',formatter:function(value,row,index){if(row.CONNECTOR_NAME){return row.CONNECTOR_NAME;}},
			            		   editor:{type:'validatebox',options:{required:true,editable:false}}},
						{field: 'CONNECTOR_PHONE',title: '联系人电话',width: 110,align: 'center',formatter:function(value,row,index){if(row.CONNECTOR_PHONE){return row.CONNECTOR_PHONE;}},
		            		   editor:{type:'validatebox',options:{required:true,editable:false}}},
					    
						{field: 'PURCHASE_NUMBER',title: '采购数量',width: 110,align: 'center',formatter:function(value,row,index){if(row.PURCHASE_NUMBER){return row.PURCHASE_NUMBER;}},
		            		   editor:{type:'validatebox',options:{required:true,editable:false}}},
					    {field: 'DELIVE_NUMBER',title: '到货数量',width: 110,align: 'center',formatter:function(value,row,index){if(row.DELIVE_NUMBER){return row.DELIVE_NUMBER;}},
			            		   editor:{type:'validatebox',options:{required:true,editable:false}}},
						{field: 'UNIT_NAME',title: '计量名称',width: 110,align: 'center',formatter:function(value,row,index){if(row.UNIT_NAME){return row.UNIT_NAME;}},
		            		   editor:{type:'validatebox',options:{required:true,editable:false}}},
		            		   {field: 'CREATE_DATE',title: '制单日期',width: 110,align: 'center',formatter:function(value,row,index){if(row.CREATE_DATE){return row.CREATE_DATE;}},
			            		   editor:{type:'validatebox',options:{required:true,editable:false}}}
						];
				edDataGrid = $('#'+tabName);
				messageInfo = $('#showMSDInfo');
			}else if(tabName="materialSubstitute_tab"){
				columnsTab=[
						    {field: 'FCT_CD',title: '工厂编码',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
						    		options:{required:true, validType:['length[1,30]','specialTextCharacter']}}},
						    {field: 'ITEM_CD',title: '物料编码',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
								   	options:{required:true, validType:['length[1,30]','specialTextCharacter']}}},
						   	{field: 'REPL_ITEM_CD',title: '替代料物料编码',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
							   	    options:{required:true, validType:['length[1,30]','specialTextCharacter']}}},
						    {field: 'STAFF',title: '员工',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
							    	options:{required:true, validType:['length[1,30]','specialTextCharacter']}}},
							{field: 'LATEST_DT',title: '最新时间',width: 110,align: 'center',formatter:function(value,row,index){if(row.ALARM_DT){return row.ALARM_DT;}},
					                editor:{type:'datebox',options:{required:true,editable:false}}},
							{field: 'OVERDUE_DT',title: '过期时间',width: 110,align: 'center',formatter:function(value,row,index){if(row.OVERDUE_DT){return row.OVERDUE_DT;}},
						            editor:{type:'datebox',options:{required:true,editable:false}}},
							{field: 'MO',title: '备注',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
									options:{validType:['length[1,100]','specialTextCharacter']}}},
							{field: 'USE_YN',title: '是否启用',width: 80,align: 'center',formatter: function(value, row, index) {if(value == 'Y') { return '启用';} else { return '未启用';}},editor:{type:'checkbox',options:{on: 'Y',off: 'N'}}},
							{field: 'CRT_ID',title: '创建人',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
							{field: 'CRT_DT',title: '创建时间',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
							{field: 'UPT_ID',title: '修改人',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
							{field: 'UPT_DT',title: '修改时间',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}
						];
						edDataGrid = $('#'+tabName);
						messageInfo = $('#showSubstituteInfo');
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
			    	 }/*else if(tabName=="MaterialSetiing"){
			    		 var ed = $(this).datagrid('getEditor', {index: index,field: 'ALARM_DT'});
			    		 row.ALARM_DT = $(ed.target).datebox('getValue');
			    	 }*/
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
		},/** 批量新增和修改的保存 */
		saveDataGrid = function() {
			if (endEditing(dataGrid)) {
				// 判断后变更数据
				if (dataGrid.datagrid('getChanges').length) {
					var inserted = dataGrid.datagrid('getChanges',
							"inserted");
					var updated = dataGrid.datagrid('getChanges',
							"updated");
					var deleted = dataGrid.datagrid('getChanges',
							"deleted");
					/** 装载数据 */
					var arrInsert = new Array(), arrUpdate = new Array();
					if (inserted.length > 0) {
						for (var m = 0; m < inserted.length; m++) {
							arrInsert
									.push({
										RETURN_ID : inserted[m].RETURN_ID,
										ORDER_ID : inserted[m].ORDER_ID,
										MATERIA_ID: inserted[m].MATERIA_ID,
										MATERIA_NAME : inserted[m].MATERIA_NAME,
										SUPPLIER_ID : inserted[m].SUPPLIER_ID,
										SUPPLIER_NAME : inserted[m].SUPPLIER_NAME,
										CONNECTOR_ID : inserted[m].CONNECTOR_ID,
										CONNECTOR_NAME : inserted[m].CONNECTOR_NAME,
										CONNECTOR_PHONE : inserted[m].CONNECTOR_PHONE,
										RETURN_NUMBER : inserted[m].RETURN_NUMBER,
										PURCHASE_NUMBER : inserted[m].PURCHASE_NUMBER,
										UNIT_ID : inserted[m].UNIT_ID,
										UNIT_NAME : inserted[m].UNIT_NAME,
										STATUS : inserted[m].STATUS,
									});
						}
						// 批量先增
						var ajaxInsert = {
							url : '/iPlant_ajax',
							dataType : 'JSON',
							data : {
								list : arrInsert,
								IFS : 'WMS_D000007'
							},
							successCallBack : function(data) {
								dataGrid.datagrid('acceptChanges');
								showmessage
										.html('<font color=red>保存成功！</font>');
								return;
							},
							errorCallBack : function(data) {
								showmessage
										.html('<font color=red>保存失败！</font>');
								return;
							}
						};
						iplantAjaxRequest(ajaxInsert);
					}
					if (updated.length > 0) {
						for (var m = 0; m < updated.length; m++) {
							if (updated[m].edited) {
								arrUpdate
										.push({
											RETURN_ID : updated[m].RETURN_ID,
											ORDER_ID : updated[m].ORDER_ID,
											MATERIA_ID: updated[m].MATERIA_ID,
											MATERIA_NAME : updated[m].MATERIA_NAME,
											SUPPLIER_ID : updated[m].SUPPLIER_ID,
											SUPPLIER_NAME : updated[m].SUPPLIER_NAME,
											CONNECTOR_ID : updated[m].CONNECTOR_ID,
											CONNECTOR_NAME : updated[m].CONNECTOR_NAME,
											CONNECTOR_PHONE : updated[m].CONNECTOR_PHONE,
											RETURN_NUMBER : updated[m].RETURN_NUMBER,
											PURCHASE_NUMBER : updated[m].PURCHASE_NUMBER,
											UNIT_ID : updated[m].UNIT_ID,
											UNIT_NAME : updated[m].UNIT_NAME,
											STATUS : updated[m].STATUS,
										});
							}
						}
						// 批量修改
						var ajaxUpdate = {
							url : '/iPlant_ajax',
							dataType : 'JSON',
							data : {
								list : arrUpdate,
								IFS : 'WMS_D000005'
							},
							successCallBack : function(data) {
								dataGrid.datagrid('acceptChanges');
								showmessage
										.html('<font color=red>保存成功！</font>');
								return;
							},
							errorCallBack : function(data) {
								showmessage
										.html('<font color=red>保存失败！</font>');
								return;
							}
						};
						iplantAjaxRequest(ajaxUpdate);
					}
				} else {
					showmessage.html('<font color=red>没有进行变更！</font>');
				}
			} else {
				showmessage.html('<font color=red>请输入必填项！</font>');
			}
		},
	     
	     OpenImprotFrame = function(){
	 		$("#enditTabupload").dialog("open").dialog('setTitle', '物料导入');
	 	}
	     
	     ImportStation =function(){
	    	   $('#FILE_BELONG').val("ITEM_CD"),
				$('#FILE_CLS').val("import"),
				$('#FILE_TYPE').val('xlsx'),
				$('#importType').val('1'),
				$('#IFS').val('Z000008'),
				$('#importUplod').submit();
	     }
	     
	}

	materialMaintenance.prototype = {
		init: function() {
			$(function() {
				//初始化全局变量对象
				dataGrid = $('#material_tab'),dataCompany=[],dataFactory=[],showmessage=$('#showMessageInfo'),editIndex = undefined,oldRow=undefined, reg=new RegExp("null","g");
				initGridData();
				// 获取工厂类别下拉
				$('.add').click(function() {
					insertDataGrid();
				});

				$('.delete').click(function() {
					deleteDataGrid();
				});

				$('.save').click(function() {
					saveDataGrid();
				});
				
				
				
				
				
				
				//导入
				$('#import').click(function() {
					OpenImprotFrame();
				});
				$('#btnExprt').click(function(){
                	var now = new Date();
                    var year =now.getFullYear();
                	var reqData = {
                			IFS:'Z000007',
                            pageIndex:1,
                            pageSize:10
                	}
                	createTable('tbIMESReport','物料信息导出','material_tab',reqData);
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
function conditionQuery() {
	var dgrid = dataGrid.datagrid('options');
	var returnId = $("#searchITEM_CD").val();
	var materiaId = $("#searchITEM_NM").val();
	var reqData = {
		IFS : 'WMS_D000001',
		pageIndex : 1,
		pageSize : dgrid.pageSize,
		RETURN_ID : returnId,
		MATERIA_ID : materiaId
	}
	reqGridData('../iPlant_ajax', 'material_tab', reqData);
}