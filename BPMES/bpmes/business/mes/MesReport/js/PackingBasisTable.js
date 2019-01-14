/* 启动时加载 */
/*
 */
(function() {
	function factoryInfo() {
		initGridData = function() {
			var dgrid = dataGrid.datagrid('options');
			if(!dgrid) return;
			var reqData = {
				IFS: 'S0000048',
				async:false,
				pageIndex: 1,
				pageSize: dgrid.pageSize
			}
			reqGridData('/iPlant_ajax', 'BindOfCarrier_tab', reqData);
		}
		bindGridData = function(reqData, jsonData) {
			var gridList = {
				name: 'BindOfCarrier_tab',
				dataType: 'json',
				columns: [[
				         {field : "CZ",width : 10,checkbox : true}, 
						 {field: 'RULE_CD',title: '包装规则编码',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},
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
							        		                	IFS: 'S0000048',
							        		                	RULE_CD:newValue
							        		    			},
							        		                successCallBack: function(a) {
							        		                	var callBack = a.RESPONSE[0].RESPONSE_DATA;
							        		                	if(callBack.length >0){
							        		                		$.messager.alert("提示",'包装规则编码['+newValue+']已存在，不能重复添加。' ,'',function(){
							        		                			var PCBCD = $('#BindOfCarrier_tab').datagrid('getEditor', {'index':ccIndex,'field':'RULE_CD'}).target;
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
				      {field: 'RULE_NAME',title: '包装规则名称',width: 180,align: 'center',color: "blue",formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
				        	   options:{required:true,validType:['length[1,50]','specialTextCharacter']}}},
		        	    {field: 'VERSIONS',title: '版本',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'numberbox', options:{required:true,precision:0,min:0}}, 
							          formatter:function(value,row,index){ return formatNumber(value,0); }},
					    {field: 'img1',title: '产品引用',width: 120,align: 'center',formatter:function(){
				        	return "<img href='javascript:void(0)' class='easyui-linkbutton'  src='../../../common/IplantCompent/themes/default/images/Folder.png'/>"}},
			            {field: 'REMARK',title: '备注',width: 250,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
				        	   options:{validType:['length[1,50]','specialTextCharacter']}}},
				        {field: 'CRT_ID',title: '创建人',width: 120,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
						{field: 'CRT_DT',title: '创建时间',width: 180,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
						{field: 'UPT_ID',title: '修改人',width: 120,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
						{field: 'UPT_DT',title: '修改时间',width: 180,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}
					]],
					
					/**单击进入编辑模式*/
					onClickRow: function (index,row) {
						ccIndex=index;
						$("#header-bottom").html(row.RULE_CD+':');
						OpenFrameAttribute(row.RULE_CD,row.RULE_NAME);
			        	ruleCD = row.RULE_CD;
			    		ruleNA = row.RULE_NAME;
			        },
			        /**结束编辑模式的操作*/
				     onEndEdit:function(index,row){
				    	 var edditmp = $(this).datagrid('getEditor', {index: index,field: 'RULE_CD'});
				    	 row.RULE_CD = $(edditmp.target).textbox('getValue');
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
			        	/*点击的列为弹出图标，弹出产品引用列表*/
			        	if(field=='img1'){
			        		endEditingAll(dataGrid);
							titleName = '包装规则引用表',
							dialogName = 'editTabProcess',
							tabName = 'process_tab',
							dgrid = $('#process_tab').datagrid('options'),
							ruleCD = row.RULE_CD;
							ruleNM = row.RULE_NAME;	
							branchRout = row.BRANCH_ROUT;	
							$("#ProcessTitle").html("<label>包装规则编码："+ruleCD+"</label><label>&nbsp;&nbsp;包装规则名称："+row.RULE_NAME+"</label>");
							if(row.RULE_CD!=undefined && row.RULE_CD!=''){
									/*验证此工序数据是否已经保存*/
									 var ajaxSelect = {
					                         url: '/iPlant_ajax',
					                         dataType: 'JSON',
					                         data: {
					                        	RULE_CD:row.RULE_CD,
					                             IFS: 'S0000048'
					                         },
					                         successCallBack: function (data) {
					                        	 if(data.RESPONSE[0].RESPONSE_DATA.length == 0){
					                        		 $.messager.alert('提示','请先维护并保存工艺路线信息后再定义工序信息！');
					     							 return;
					                        	 }else{
					                        		 reqData = {IFS: 'S0000056',RULE_CD:row.RULE_CD,pageIndex: 1,pageSize: dgrid.pageSize};
					         						 openDialogFrame(tabName,dialogName,titleName,reqData);
					                        	 }
					                         },
					                         errorCallBack: function (data) {
					                         	showmessage.html('<font color=red>删除失败！</font>');
					                            return;
					                         }
					                     };
						                iplantAjaxRequest(ajaxSelect);
						              /*验证此工序数据是否已经保存	END*/
							}else{
								$.messager.alert('提示','请先维护并保存产品引用信息后再定义产品引用信息！');
								return;
							}
			        	};
			        	/**判断是否为可编辑字段*/
			        	if (editIndex != index){
				    		if(editIndex!=undefined){
			    				/**判断是否为新增行，并验证新增工厂编码重复*/
				    			rowEdit = dataGrid.datagrid('getRows')[editIndex];
				    				if(checkNotEmpty(rowEdit.editType)){
				    					if(rowEdit.editType=='add'){
				    						$.messager.alert('提示','请先维护并保存新增的数据后再进行其他操作！','',function(){
				    							$("#BindOfCarrier_tab").datagrid('uncheckAll');
				    							$("#BindOfCarrier_tab").datagrid('checkRow',editIndex);
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
				    			    		ed = $(this).datagrid('getEditor', {index: index,field: 'RULE_CD'});
				    			    		fc = ed.target;
				    			    		fc.textbox('disable');
				    		    		}
				    				}
				    			}else{
				    				addDatagridEditor(dataGrid,index);
						        	//**判断是否为可编辑字段*//*
						        	if(!checkNotEmpty(row.editType)){			
							    		ed = $(this).datagrid('getEditor', {index: index,field: 'RULE_CD'});
							    		fc = ed.target;
							    		fc.textbox('disable');
						    		}
				    			}
				    		}else{
				    			addDatagridEditor(dataGrid,index);
					        	//**判断是否为可编辑字段*//*
					        	if(!checkNotEmpty(row.editType)){			
						    		ed = $(this).datagrid('getEditor', {index: index,field: 'RULE_CD'});
						    		fc = ed.target;
						    		fc.textbox('disable');
					    		}
				    		}
			        },
			        
			        onDblClickRow: function (index,field,value) {
			        	var tabName,dialogName,titleName,rowEdit,editem,editorFt,itemCd,reqData,dgrid;
			        	var rows = dataGrid.datagrid('getRows'),row = rows[index];
			        	addDatagridEditor(dataGrid,index);
			        	if(!checkNotEmpty(row.editType)){/*如果是修改的情况，ft_cd字段为只读模式*/
				    		ed = $(this).datagrid('getEditor', {index: index,field: 'RULE_NAME'});
				    		fc = ed.target;
				    		fc.combobox("disable");
				    		
				    		ed2 = $(this).datagrid('getEditor', {index: index,field: 'VERSIONS'});
				    		fc2 = ed2.target;
				    		fc2.combobox("disable");
				    		
				    		ed3 = $(this).datagrid('getEditor', {index: index,field: 'REMARK'});
				    		fc3 = ed3.target;
				    		fc3.prop('readonly',true);
				    	}
			        }     
		   }
			initGridView(reqData, gridList);
			dataGrid.datagrid({"onLoadSuccess":function(data){
			    $(this).datagrid('selectRow',0);
			    OpenFrameAttribute(data.rows[0].RULE_CD);
			    $('#header-bottom').html(data.rows[0].RULE_CD+':');
			}}).datagrid('loadData', jsonData);
		}

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
			if(tabName == 'materialDetails_tab'){
				initItemCDGridData();
				return;
			};
			if(tabName == 'process_tab'){
				$("#ruleCd").html(reqData.RULE_CD);
			}
			dialogDataGrid('/iPlant_ajax', tabName, reqData);
		}
	},
	
	//置空查询输入框
	setQueryNull=function() {
		$("#nanan").form("clear");
	},
/*根据条件查询*/
searchDataGrid=function(dgrid){
	var RULE_CD =$("#serachRULE_CD").textbox("getValue");
	var RULE_NAME =$("#serachRULE_NAME").textbox("getValue");
	var reqData = {
		IFS: 'S0000048',
		RULE_CD:RULE_CD,
		RULE_NAME:RULE_NAME,
		pageIndex: 1,
		pageSize: dgrid.pageSize
	}
	reqGridData('/iPlant_ajax', 'BindOfCarrier_tab', reqData);
}
	
	/*底部的关联表格*/   
	OpenFrameAttribute = function(RULE_CD,RULE_NAME){
		$('#sysRule_tab').treegrid('unselectAll');//清空明细表的所有选择行
		var tabName = 'sysRule_tab';
		var dgridOp = $('#'+tabName).treegrid('options');
		if(!dgridOp) return;
		var reqData = {
				IFS:'S0000052',
				RULE_CD:RULE_CD,
				pageIndex: 1,
				pageSize: dgridOp.pageSize
			}
		reqTreeGridData('/iPlant_ajax', 'sysRule_tab', reqData);
	},
	
	bindTreeGridData = function(reqData,jsonData) {
		var gridList = {
				name: 'sysRule_tab',
		        parentField: "_parentId",
		        textFiled: "BYTE_NUM",
		        idField: "ST_C_CD",
		        treeField:"PACK_NAME",
		        state: "closed",
		        pagination:true,
	            pageSize: 5,
	            pageList: [5,10,15],
				dataType: 'json',
				loadFilter:treePagerFilter2,
				columns: [[
					{field: 'PACK_NAME',title: '包装容器名称',width: 250,align: 'left',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
						  options:{required:true, validType:['length[1,50]','specialVersionTextArea']}}},
				    {field: 'ST_C_CD',hidden:true,title: '树形子节点字段',width: 200,align: 'left',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
						  options:{required:true, validType:['length[1,50]','specialVersionTextArea']}}},
        	        {field: 'BYTE_NUM',title: '下层数量',width:200 ,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
			        	   options:{required:true,validType:['length[1,50]','specialTextCharacter']}}},
		            {field: 'ST_P_CD',title: '树形父节点字段',hidden:true,width:200 ,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
						  options:{ validType:['length[1,400]']}}},  
				    {field: 'BOT_NUM',title: '底层数量',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
			        	   options:{required:true,validType:['length[1,50]','specialTextCharacter']}}},
		 	    	{field: 'UNIT',title: '单位',width: 300,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
			 	    	  options:{ validType:'length[1,400]'}}},
			 	    {field: 'UPPER_LIMIT',title: '上限值',width:200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
			        	   options:{required:true,validType:['length[1,50]','specialTextCharacter']}}},
				 	{field: 'LOWER_LIMIT',title: '下限值',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
			        	   options:{required:true,validType:['length[1,50]','specialTextCharacter']}}}
				]]
			       
				}
			initTreeGrid(reqData, gridList);
			$('#sysRule_tab').treegrid('loadData', jsonData);
			$('#btnDelete').linkbutton('enable');
	},

		/*删除明细表*/
		deleteTreeDataGrid=function (){
			var checkedItems = $('#sysRule_tab').datagrid('getSelections');
	        if (checkedItems == 0) {
	            $.messager.alert('提示', '请选择一条数据进行删除');
	            return;
	        }
	        var row = $('#sysRule_tab').datagrid('getSelected');
			var getChildren = $('#sysRule_tab').treegrid('getChildren',row.ST_C_CD);//判断节点是否有子节点
			if(getChildren.length>0){//有
				$.messager.alert("提示", row.PACK_NAME+':已存在子节点，请先删除子节点！！');
				return;
			}
	        /*确认提示框*/
	        $.messager.confirm('确认框', '您确定要删除您所选择的数据吗?', function (r) {
	           	if(r==true){
	           		var numb = $('#sysRule_tab').treegrid('getLevel',row.ST_C_CD);//获得点击行的层级
	           		 var ajaxUpdateDetail = {
	                         url: '/iPlant_ajax',
	                         dataType: 'JSON',
	                         data: {
	                        	 ST_C_CD: row.ST_C_CD,
		                       	 IFS: 'S0000055'
	                         },
	                         successCallBack: function (data) {
	                        	 var callBackCode = data.RESPONSE[0].RESPONSE_HDR.MSG_CODE;
	                        	 if(callBackCode == '0'){
	                        		 showmessage.html('<font color=red>删除成功！</font>');
	                        		 if(row.ST_P_CD == 'N/A'){
	                        			 OpenFrameAttribute(row.RULE_CD,'');
	                        		 }else{
	                        			 UpDateF(row.ST_P_CD,'-2',row.RULE_CD,numb,row.BYTE_NUM);
	                        		 }
		                         }else{
		                        
		                         	showmessage.html('<font color=red>删除失败！</font>');
		                         } 
	                         }
	                     };
	                     iplantAjaxRequest(ajaxUpdateDetail);
	           	}
	        })
	        
	};
		
		
	/*加载产品引用弹出框数据网格*/
	searchProcessDatagrid = function(){
		var tabName = 'process_tab';
		var dgrid = $('#process_tab').datagrid('options');
		var reqData = {
				IFS: 'S0000056',
				RULE_CD:ruleCD,
				pageIndex: 1,
				pageSize: dgrid.pageSize
			}
		dialogDataGrid('/iPlant_ajax', 'process_tab', reqData);
	},
	
	dialogEditorDataGrid = function(tabName,reqData, jsonData) {
		var gridList = {
		name: 'process_tab',
		dataType: 'json',
		columns:
			[[
			    {field: 'ID',title: '引用表主键',width: 27,hidden:true,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
		         options:{validType:['length[1,50]','specialTextCharacter']}}},
		        {field: 'RULE_CD',title: '包装规则编号',width: 110,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" +  value + "'>" +  (value)+ "</span>";}},
       	   		{field: 'RULE_NAME',title: '包装规则名称',hidden:true,width: 110,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" +  value + "'>" +  (value)+ "</span>";}},
       	   		{field: 'img2',title: '产品编码详情',width: 150,align: 'center', formatter:function(){
       	   			return "<img href='javascript:void(0)' class='easyui-linkbutton' onclick='openDialogFrame(3)' src='../../../common/IplantCompent/themes/default/images/Folder.png'/>"}},
       	   		{field:'PRO_CD',title: '产品编码',width: 130,align: 'center',formatter: function (value,row) {if (value != null) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'textbox',
       	   		options:{required:true, validType:['length[1,30]','specialCharacterTextArea']}}},
       	   		{field: 'PRO_NAME',title: '产品名称',width: 130,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'textbox',
           	   		options:{required:true, validType:['length[1,30]','specialCharacterTextArea']}}},
			    {field: 'REMARK',title: '备注',width: 177,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
		           options:{validType:['length[1,50]','specialTextCharacter']}}}
				 ]],
				 onDblClickRow : function(index, row) {
						OptType = 1;
						$("#process_tab").dialog("open").dialog('setTitle', '查询产品引用信息');
						$('#' + tabName.txtDictTp).combobox('setValue',row.PRO_CD == null ? '' : row.PRO_CD);
						var grid = $('#dict_tab');
		            	grid.datagrid('clearSelections'),   
						grid.datagrid('selectRow',index);
					},
				 
				 /**单击进入编辑模式*/
			        onClickCell : function (index,field,value) {
			        	var tabName,dialogName,titleName,rowEdit,editem,editorFt,reqData,dgrid;
			        	var rows = $('#process_tab').datagrid('getRows'),row = rows[index];
			        	status=[];
			        	var grid = $('#materialDetails_tab');
		            	grid.datagrid('clearSelections'),   
						grid.datagrid('selectRow',index);
			        	/**判断是否为可编辑字段*/
			        	if(clickSign==true){
			        		if(field=='img2'){
			        			endEditingAll(dataGrid);
								titleName = '产品信息查询',
								dialogName = 'addMaterialDetails',
								tabName = 'materialDetails_tab',
								dgrid = $('#materialDetails_tab').datagrid('options'),
								dgrid.ITEM_CD = row.ITEM_CD,
								status=row.MT_FLAG,
								itemCD = row.ITEM_CD,
								reqData = {IFS: 'Z000007',ITEM_CD:row.DICT_CD,pageIndex: dgrid.pageNumber,pageSize: dgrid.pageSize};
								openDialogFrame(tabName,dialogName,titleName,reqData);
								processTbIndex = index;
								addDatagridEditor($("#process_tab"),index);
				        	}
			        	}
			        } 
				
			}
		
		initGridView(reqData, gridList);
		$('#process_tab').datagrid('loadData', jsonData);
		
	},
	
	
	/**根据条件查询产品信息**/
	initItemCDGridData = function(){
		var tabName = 'materialDetails_tab';
		var dgridOp = $('#'+tabName).datagrid('options');
		if(!dgridOp) return;
		var ITEM_CD =$("#searchITEM_CD").val();
		var ITEM_NM =$("#searchITEM_NM").val();
		var reqDataA = {
			ITEM_CD:ITEM_CD,
			ITEM_NM:ITEM_NM,
			IFS: 'Z000007',
			pageIndex: 1,
			pageSize: dgridOp.pageSize
		}
		var myBindDataGrid = function(tabName,reqDataA, jsonData) {
			var gridLists = {
					name :tabName,
					dataType : 'json',
					columns : [[
					      {field:'ITEM_CD',title: '产品编码',width: 250,align: 'center',formatter: function (value,row) {if (value != null) return "<span title='" + value + "'>" + value + "</span>";}},
					      {field:'ITEM_NM',title: '产品名称',width: 250,align: 'center',formatter: function (value) {if (value != null) return "<span title='" + value + "'>" + value + "</span>";}},
					]],
					 onDblClickRow: function(index,row){
						 var ed1 = $('#process_tab').datagrid('getEditor', {index:processTbIndex,field:'PRO_CD'});
						 $(ed1.target).textbox('setValue', row.ITEM_CD);
						 var ed2 = $('#process_tab').datagrid('getEditor', {index:processTbIndex,field:'PRO_NAME'});
						 $(ed2.target).textbox('setValue', row.ITEM_NM);
						 $("#addMaterialDetails").dialog('close');
			         }
				}
			initEditorDataGridView(reqDataA, gridLists);
			$('#'+tabName).datagrid('loadData', jsonData);
		}
		myDataGrid('/iPlant_ajax', tabName,reqDataA,myBindDataGrid);
	}
	
	/*新增产品引用列表*/
		addRouteCD = function(){
			var rowsData = $("#process_tab").datagrid('getData');					
			ccIndex=0;
       	 	eeEndEdit('process_tab');												
			var dgrid = $('#process_tab').datagrid('options');					
			insertDataGrid('process_tab',{RULE_CD:$("#ruleCd").html()});
		},
		/*保存产品应用列表*/
		saveDataGridProcessY = function(){
			 var edDataGrid = $('#process_tab');
	         if (endEditing(edDataGrid)){
	        	//判断后变更数据
	        	if (edDataGrid.datagrid('getChanges').length) {
	                var inserted = edDataGrid.datagrid('getChanges', "inserted");  
	                /**装载数据*/
	                var arrInsert = new Array(),flag;
	                if(inserted.length>0){
	                	for(var m=0;m<inserted.length;m++){
	                		var index = edDataGrid.datagrid('getRowIndex',inserted[m]);
	                			arrInsert.push({
   	  	                			'RULE_CD':inserted[m].RULE_CD,
   	  	                			'RULE_NAME':inserted[m].RULE_NAME,
   	  	                			'PRO_CD':inserted[m].PRO_CD,
   	  	                			'PRO_NAME':inserted[m].PRO_NAME,
   	  	                			'REMARK':inserted[m].REMARK
   	  	                			});
	                	}
	                	if(arrInsert.length>0){
	                		//批量先增
		                    var ajaxInsert = {
		                        url: '/iPlant_ajax',
		                        dataType: 'JSON',
		                        data: {
		                            list: arrInsert,
		                            IFS: 'S0000057'
		                        },
		                        successCallBack: function (data) {
		                        	if(data.RESPONSE[0].RESPONSE_HDR.MSG_CODE == 0){
		                        		edDataGrid.datagrid('acceptChanges');
		                        		searchProcessDatagrid();
			                        	$('#showProcessInfo').html('<font color=red>保存成功！</font>');
			                            return;
		                        	}else{
		                        		$('#showProcessInfo').html('<font color=red>保存失败,请联系管理员！</font>');
		                        	}
		                        },
		                        errorCallBack: function (data) {
		                        	$('#showProcessInfo').html('<font color=red>保存失败！</font>');
		                            return;
		                        }
		                    };
		                    iplantAjaxRequest(ajaxInsert);
	                	}
	                }
	            }else{
	            	$('#showProcessInfo').html('<font color=red>没有进行变更！</font>');
	            }
			}else{
				$('#showProcessInfo').html('<font color=red>请输入必填项！</font>');
			}
		},
		
		deleteProcessDataGrid = function(){
			var select = $("#process_tab").datagrid('getSelected');
			if(select == null){
				$.messager.alert('提示', '请选择一条数据进行删除');
	            return;
			}else{
				$.messager.confirm('确认框', '您确定要删除您所选择的数据吗?', function (r) {
		           	if(r==true){
		           		var ajaxDelete = {
	                         url: '/iPlant_ajax',
	                         dataType: 'JSON',
	                         data: {
	                        	 ID:select.ID,
                            	 IFS: 'S0000059'
	                         },
	                         successCallBack: function (data) {
	                        	 if(data.RESPONSE[0].RESPONSE_HDR.MSG_CODE == '0'){
	                        		searchProcessDatagrid();
		                        	$('#showProcessInfo').html('<font color=red>删除成功！</font>');
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
		};
	
		/*删除主表信息*/
		deleteDataGrid = function (tabName) {
			var checkedItems = $('#BindOfCarrier_tab').datagrid('getSelections');
		        if (checkedItems.length==0) {
		            $.messager.alert('提示', '请选择一条数据进行删除');
		            return;
		        }
		        /*确认提示框*/
		        arrUpdate = new Array();
		        $.messager.confirm('确认框', '您确定要删除您所选择的数据吗?', function (r) {
		           	if(r==true){
		           	 $.each(checkedItems, function (index, item) {
	           			 arrUpdate.push({RULE_CD:item.RULE_CD});
	                 });
		           	 if(arrUpdate.length>0){
		           	 /*删除主表信息*/
                     var ajaxUpdate = {
                         url: '/iPlant_ajax',
                         dataType: 'JSON',
                         data: {
                        	 list: arrUpdate,
                             IFS: 'S0000051'
                         },
                         successCallBack: function (data) {
                        	showmessage.html('<font color=red>删除成功！</font>');
                         	initGridData();
                           return;
                         },
                         errorCallBack: function (data) {
                         	 showmessage.html('<font color=red>删除失败！</font>');
                             return;
                         }
                     };
                     iplantAjaxRequest(ajaxUpdate);
		           	 }
                 }
		        }); 
		},
		
	addCustom=function() {
			$("#fmCustom").form("clear");
			var row = $("#BindOfCarrier_tab").datagrid("getSelected");//判断是否选中主表数据
			if(row == null){
				$.messager.alert("提示", '请先选择主表数据！');
				return;
			};
			var row1 = $("#sysRule_tab").datagrid("getSelected");//获取明细表选择行
			if(row1 != null){
				var getChildren = $('#sysRule_tab').treegrid('getChildren',row1.ST_C_CD);//判断节点是否有子节点
				assignment(row1.PACK_NAME,row1.ST_C_CD);
				if(getChildren.length>0){//有
					$.messager.alert("提示", row1.PACK_NAME+':已存在子节点，不能新增！！');
					return;
				}
			}
			$("#enditTabBOM").dialog("open").dialog('setTitle', '新增包装规则明细表');
		}
		/* 底部明细表弹出框 */
		UpdateCustom = function() {
			var row = $("#sysRule_tab").datagrid("getSelected");
			if(row == null){
				$.messager.alert("提示", '请先选择明细表的一条数据！');
				return;
			};
			if(row) {				
				$("#enditTabBOM").dialog("open").dialog('setTitle', '修改包装规则明细表');
				$('#ST_P_CD').textbox('setValue', row.ST_P_NM==null?'':row.ST_P_NM);
				$('#PACK_NAME').textbox('setValue', row.PACK_NAME==null?'':row.PACK_NAME);
				$('#BYTE_NUM').textbox('setValue', row.BYTE_NUM==null?'':row.BYTE_NUM);
				$('#UNIT').textbox('setValue', row.UNIT==null?'':row.UNIT);
				$('#UPPER_LIMIT').textbox('setValue', row.UPPER_LIMIT==null?'':row.UPPER_LIMIT);
				$('#LOWER_LIMIT').textbox('setValue', row.LOWER_LIMIT==null?'':row.LOWER_LIMIT);
				$('#ST_C_CD').val(row.ST_C_CD);
			}
		}
		
	     //赋值
	     assignment=function(pack_name,st_c_cd){
	    	  $('#ST_P_CD').textbox('setValue',pack_name);
	    	  $('#ST_C_CD').val(st_c_cd);//吧父id赋值给input标签
	    	  $("#addMaterialDetails").dialog("close");
		}
	    //明细表保存
	    saveDataGridProcess = function (){
	    	var row = $("#BindOfCarrier_tab").datagrid("getSelected");//获取明细表选择行
			//alert(row.RULE_CD);
			var IFServerNo = '';
			var reqData = [];
		    if(CompanyOpttype == 0) {
				IFServerNo = 'S0000053'
			} else if(CompanyOpttype == 1) {
				if (!saveUpdateValidate()) {
					$.messager.alert("提示", '内容没有更新，请修改')
					return false;
				}
				IFServerNo = 'S0000054'
			} else {
				IFServerNo = 'S0000052'
			}
		    var RULE_CD = row.RULE_CD;
		    var ST_P_NM=$('#ST_P_CD').textbox("getValue");
		    var ST_P_CD=$('#ST_C_CD').val();//获取隐藏input的值，该值为父id
		    var PACK_NAME=$('#PACK_NAME').textbox("getValue");
		    var BYTE_NUM=$('#BYTE_NUM').textbox("getValue");
		    var BOT_NUM=$('#BOT_NUM').val();
		    var UNIT=$('#UNIT').textbox("getValue");
		    var UPPER_LIMIT=$('#UPPER_LIMIT').textbox("getValue");
		    var LOWER_LIMIT=$('#LOWER_LIMIT').textbox("getValue");
		    if (Number(UPPER_LIMIT) < Number(LOWER_LIMIT)){
		    	$.messager.alert('提示','上限值必须大于或者等于下限制!');
		    	var LOWER_LIMIT = $('#LOWER_LIMIT').textbox("setValue",'');
		    	return;
		    }
		    if(ST_P_CD=='' || ST_P_CD == null){
		    	ST_P_CD = 'N/A'
		    }
		    var susMsg = '',
		    errorMsg = '';
			if(CompanyOpttype == 0) {
				susMsg = '添加成功';
				errorMsg = '添加失败,请联系管理员';
			} else {
				susMsg = '更新成功';
				errorMsg = '更新失败,请联系管理员';
			}
			if(!checkSelect()) return;
			if(!checkForm()) return;
			var ajaxParam = {
				url: '/iPlant_ajax',
				dataType: 'JSON',
				data: {
					ST_P_NM:ST_P_NM,
					RULE_CD:RULE_CD,
					ST_P_CD: ST_P_CD,
					PACK_NAME: PACK_NAME,
					BYTE_NUM: BYTE_NUM,
					BOT_NUM: BOT_NUM,
					UNIT: UNIT,
					UPPER_LIMIT:UPPER_LIMIT,
					LOWER_LIMIT:LOWER_LIMIT,
					IFS: IFServerNo
				},
				successCallBack: function(data) {
					var susMsg=getReturnMsg(data);
                	$.messager.alert("提示",susMsg,"",function(){      	  	
                		var row1 = $("#sysRule_tab").datagrid("getSelected");
                		if(row1 == '' || row1 == null){//新增最顶层结构，就不走存储过程
                			OpenFrameAttribute(RULE_CD,'');
                			$('#sysRule_tab').datagrid('clearSelections');//清空明细表的所有选择行
                			$('#enditTabBOM').dialog('close');
                			return;
                		}else{
                			var numb = $('#sysRule_tab').treegrid('getLevel',row1.ST_C_CD);//获得点击行的层级
                		}
            			$('#enditTabBOM').dialog('close');
            			if(CompanyOpttype == 0){//新增
            				var ST_C_CD1 = Number(data.RESPONSE["0"].RESPONSE_DATA[0].ID) + 1;
            				UpDateF(ST_C_CD1,ST_P_CD,RULE_CD,numb,1);
            				$("#ST_C_CD").val('');//清空隐藏的input框
            			}else if(CompanyOpttype == 1){//修改
            				UpDateF(ST_P_CD,'-1',RULE_CD,numb,1);
            			}
            			
            		});
				},
			    errorCallBack: function() {
			    	alert("S");
					$.messager.alert('提示', errorMsg);
				}
					
			};
			iplantAjaxRequest(ajaxParam);
	    }
	    
	    UpDateF = function(ST_C_CD,ST_P_CD,RULE_CD,numb,DELE){
	    	var SelectAjax = {
    			url: '/iPlant_ajax',
				dataType: 'JSON',
				data: {
					ST_C_CD:ST_C_CD,
					ST_P_CD:ST_P_CD,
					NUMB:numb,
					DELE:DELE,
					IFS: 'S0000060'
				},
				successCallBack: function(data) {
					OpenFrameAttribute(RULE_CD,'');
				}
	    	}
	    	iplantAjaxRequest(SelectAjax);
	    }
	    
		/*验证修改内容是否重复*/
        saveUpdateValidate = function() {
			var checkedItems = $('#sysRule_tab').datagrid('getSelections');
			row = checkedItems[0];
			if (row.ST_C_CD) {
				if ($('#ST_P_CD').val() != (row.ST_P_CD==null?'':row.ST_P_CD)
						|| $('#PACK_NAME').textbox('getValue') != (row.PACK_NAME==null?'':row.PACK_NAME)
						|| $('#BYTE_NUM').textbox('getValue') != (row.BYTE_NUM==null?'':row.BYTE_NUM)
						|| $('#UNIT').textbox('getValue') != (row.UNIT==null?'':row.UNIT)
						|| $('#UPPER_LIMIT').textbox('getValue') != (row.UPPER_LIMIT==null?'':row.UPPER_LIMIT)
						|| $('#UPPER_LIMIT').textbox('getValue') != (row.UPPER_LIMIT==null?'':row.UPPER_LIMIT)){
					return true;
				} else {
					return false;
				}
			}
		}
        
	    /*必填项空值验证*/
	    checkSelect=function() {
			pass = true; 
			$("select[required]").each(function(){
				if((this.value == '')&&($(this).combobox('getText')=='')) { 
					text = $(this).parent().prev().text(); 
					$.messager.alert('提示',text+"必填项不能为空"); 
					this.focus(); 
					pass = false; 
					return false;//跳出each 
				} 
			}); 
			return pass; 
		} 
	    verify = function(RULE_NAME,VERSIONS){
			var a;
			//验证包装规则名称和版本组合时唯一性
            var ajaxSelect = {
                url: '/iPlant_ajax',
                dataType: 'JSON',
                async:false,
                data: {
                	RULE_NAME : RULE_NAME,
                	VERSIONS : VERSIONS,
                	IFS: 'S0000048'
                },
                successCallBack: function (data) {
                	a = data.RESPONSE[0].RESPONSE_DATA.length;
                }
            };
            iplantAjaxRequest(ajaxSelect);
            return a
		}
	    
	    //为底层数量赋值
	    setBOT = function(){
	    	var BYTE_NUM = $("#BYTE_NUM").textbox("getValue").replace(/(^\s*)|(\s*$)/g, "");
	    	if(BYTE_NUM == '' || BYTE_NUM == null){
	    		return;
	    	}
	    	$('#BOT_NUM').val(BYTE_NUM);
	    	
	    }
	    
	    /*必填项空值验证*/
		   checkSelect=function() {
				pass = true; 
				$("select[required]").each(function(){
					if((this.value == '')&&($(this).combobox('getText')=='')) { 
						text = $(this).parent().prev().text(); 
						$.messager.alert('提示',text+"必填项不能为空"); 
						this.focus(); 
						pass = false; 
						return false;//跳出each 
					} 
				}); 
				return pass; 
			};
	}
	factoryInfo.prototype = {
		init: function() {
			$(function() {
			/*初始化全局变量对象*/
				dataGrid = $('#BindOfCarrier_tab'),dataTmp=[],dataFactory=[],showmessage=$('#showMessageInfo'),editIndex = undefined,oldRow=undefined, reg=new RegExp("null","g");
				initGridData();
				$('#btnSearch').click(function() {					
					searchDataGrid(dataGrid);
				});

				$('#btnAdd').click(function() {
					ccIndex= 0;
					var editData = $('#BindOfCarrier_tab').datagrid('getChanges', "inserted");
					if(editData.length == 0){
						add = true;
						var initData = {};
						if(dataTmp.length>0 && dataBOM2.length>0){
							initData={RULE_CD:dataTmp[0].value,RULE_NAME:dataBOM2[0].value}
						}
						insertDataGrid('BindOfCarrier_tab',initData);
					}else{
						$.messager.show({
			         	    title:'提示',
			         	    msg:'请先维护完上一条新增数据之后再继续添加新的数据。',
			         	    showType:'slide',
			         	    showSpeed:'8600',
			         	    style:{
			         	    	left:document.body.clientWidth-250, // 与左边界的距离
			         	    	top:document.body.clientHeight-100 // 与顶部的距离
			         	    }
			         	});
					}
				});

				$('#btnSave').click(function() {
					saveDataGrid('BindOfCarrier_tab','S0000049','S0000050','showMessageInfo');
				});
				$('#btnDelete').click(function() {					
					deleteDataGrid();
				});
			
			 //明细表添加
				$('#btnAdd1').click(function() {
					CompanyOpttype = 0;
					addCustom();
				});
				//明细表删除
				$('#btnDelete1').click(function(){
					deleteTreeDataGrid();
	            });
				//明细表保存
				$('#btnSave1').click(function() {
					saveDataGridProcess();
				});
				//明细表修改
				$('#btnUpdate1').click(function() {
					CompanyOpttype = 1;
					UpdateCustom();
				});
				$('#btnSearch1').click(function(){
					initItemCDGridData();
				});
				$('#btnResets').click(function() {
					setQueryNull();
				});
				$('#btnExprt').click(function(){
					var now = new Date();
	                var year =now.getFullYear();
	                var reqData = {
	                		IFS:'S0000048'
	                	}
	                	createTable('tbIMESReport','包装规则头表导出','BindOfCarrier_tab',reqData);
	             });
				$('#btnExprt1').click(function(){
					var now = new Date();
	                var year =now.getFullYear();
	                var reqData = {
	                		CARE_LB: careLB,
	                		IFS:'S0000052'
	                	}
	                	createTable('tbIMESReport','包装规则明细表导出','sysRule_tab',reqData);
	            });
				 /*产品引用*/
				 $('#btnProcessAdd').click(function() {	
					 addRouteCD();
				 });
		
				 //当tetxbox失去焦点时触发
				 $("input",$("#BYTE_NUM").next("span")).blur(function(){  
				     setBOT();  
				 })
				 
				 $('#btnProcessDelete').click(function(){
					 deleteProcessDataGrid();
	             });

				 $('#btnProcessSave').click(function() {
					 editIndex = undefined;
					 saveDataGridProcessY();
				 });
			
			    /*验证下层只能输入数字*/
			    $("input",$("#BYTE_NUM").next("span")).blur(function(){
				    var low_n=$("#BYTE_NUM").textbox('getText');
				    if(low_n != ""){
				    	var reg=/^[0-9]+([.]{1}[0-9]{1,2})?$/;
				 	   	var result=reg.test(low_n);
			        	 if(!result){
							 $.messager.alert('提示','请输入数字');
							 $('#BYTE_NUM').textbox('setValue', '');
							 return false;
						}	
			        }else{
			        	 $('#BYTE_NUM').textbox('setValue', '');
			        	 return;
			        }
			     });
			    /*验证底层只能输入数字*/
			    $("input",$("#BOT_NUM").next("span")).blur(function(){
				    var low_n=$("#BOT_NUM").textbox('getText');
				    if(low_n != ""){
				    	var reg=/^[0-9]+([.]{1}[0-9]{1,2})?$/;
				 	   	var result=reg.test(low_n);
			        	 if(!result){
							 $.messager.alert('提示','请输入数字');
							 $('#BOT_NUM').textbox('setValue', '');
							 return false;
						}	
			        }else{
			        	 $('#BOT_NUM').textbox('setValue', '');
			        	 return;
			        }
			     });
			    /*验证上限值只能输入数字*/
			    $("input",$("#UPPER_LIMIT").next("span")).blur(function(){
				    var low_n=$("#UPPER_LIMIT").textbox('getText');
				    if(low_n != ""){
				    	var reg=/^[0-9]+([.]{1}[0-9]{1,2})?$/;
				 	   	var result=reg.test(low_n);
			        	 if(!result){
							 $.messager.alert('提示','请输入数字');
							 $('#UPPER_LIMIT').textbox('setValue', '');
							 return false;
						}	
			        }else{
			        	 $('#UPPER_LIMIT').textbox('setValue', '');
			        	 return;
			        }
			     });
			    /*验证下限值只能输入数字*/
			    $("input",$("#LOWER_LIMIT").next("span")).blur(function(){
				    var low_n=$("#LOWER_LIMIT").textbox('getText');
				    if(low_n != ""){
				    	var reg=/^[0-9]+([.]{1}[0-9]{1,2})?$/;
				 	   	var result=reg.test(low_n);
			        	 if(!result){
							 $.messager.alert('提示','请输入数字');
							 $('#LOWER_LIMIT').textbox('setValue', '');
							 return false;
						}	
			        }else{
			        	 $('#LOWER_LIMIT').textbox('setValue', '');
			        	 return;
			        }
			     });
			});
		}
	}
	var fcfo = new factoryInfo();var careLB,Tmp={};var ccIndex= 0;/*全局索引;*/var ruleCD,branchRout,add ;clickSign=true,itemCD="",status="";var processTbIndex;
	fcfo.init();
})();