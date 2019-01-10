/* 启动时加载 */
/*
 */
(function() {
	function factoryInfo() {
		initGridData = function() {
			var dgrid = dataGrid.datagrid('options');
			if(!dgrid) return;
			var searchProcess_CD = $('#searchProcess_CD').textbox('getValue');
			var searchProcess_NM =$("#searchProcess_NM").textbox("getValue");
			var reqData = {
				IFS: 'GX00001',
				PRF_CD:searchProcess_CD,
				PRF_NAME:searchProcess_NM,
				pageIndex: 1,
				pageSize: dgrid.pageSize
			}
			reqGridData('/iPlant_ajax', 'theProcessDefinition_tab', reqData);
		}		
		var tmp = {
                url: "/iPlant_ajax",
                dataType: "JSON",
                data: {IFS: "B000021"},
                successCallBack: function(a) {
                	dataTmp = [];
                	var op = a.RESPONSE[0].RESPONSE_DATA;
                    $.each(op,function(n,obj) {
                    	dataTmp.push({'value':obj.FT_CD,'text':obj.FT_NM});
				    });  
                },
                errorCallBack: function() {
                    $.messager.alert("提示", '请联系管理员，查询失败！')
                }
            };
		iplantAjaxRequest(tmp);
		
		/*类型下拉框查询*/
		materiel = {
		        url: "/iPlant_ajax",
		        dataType: "JSON",
		        data: {IFS:'GX00071'},
		        successCallBack: function(a) {
		        	dataMaterielType = [];
		        	var op = a.RESPONSE[0].RESPONSE_DATA;
		            $.each(op,function(n,obj) {
		            	dataMaterielType.push({'value':obj.DICT_IT,'text':obj.DICT_IT_NM});
				    });  
		        },
		        errorCallBack: function() {
		            $.messager.alert("提示", '请联系管理员，查询失败！')
		        }
		    };
		iplantAjaxRequest(materiel);
		
		/*加载工艺路线配置弹出框数据网格*/
		searchProcessDatagrid = function(){
			var dgrid = $('#process_tab').datagrid('options');
			var reqData = {
					IFS: 'GX00021',
					PRF_CD:prfCd,
					pageIndex: 1,
					pageSize: dgrid.pageSize
				}
			dialogDataGrid('/iPlant_ajax', 'process_tab', reqData);
		},
			
		bindGridData = function(reqData, jsonData) {
			var gridList = {
				name: 'theProcessDefinition_tab',
				dataType: 'json',
				columns: [[			
				           	{field : "CZ",width : 10,checkbox : true},
			        	    {field: 'FCT_CD',title: '工厂名称',width: 100,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + ( row.FCT_NM  || value)+ "</span>";},
				           		   editor:{type:'combobox',options:{valueField:'value',textField:'text',data:dataTmp,required:true,editable:false}}},
			           		{field: 'PRF_CD',title: '工艺路线编码',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},
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
								        		                	IFS: 'GX00001',
								        		    				PRF_CD:newValue
								        		    			},
								        		                successCallBack: function(a) {
								        		                	var callBack = a.RESPONSE[0].RESPONSE_DATA;
								        		                	if(callBack.length >0){
								        		                		$.messager.alert("提示",'工艺路线编码['+newValue+']已存在，不能重复添加。' ,'',function(){
								        		                			var PCBCD = $('#theProcessDefinition_tab').datagrid('getEditor', {'index':ccIndex,'field':'PRF_CD'}).target;
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
						    {field: 'PRF_NAME',title: '工艺路线名称',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
						           options:{required:true, validType:['length[1,30]','specialCharacterTextArea']}}},
				            {field: 'img1',title: '工艺路线配置',width: 120,align: 'center',formatter:function(){
			        		   return "<img href='javascript:void(0)' class='easyui-linkbutton'  src='../../../common/IplantCompent/themes/default/images/Folder.png'/>"}},
						    {field: 'PRF_TY',title: '工序类型',width: 100,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + ( row.PRF_TYPE_NM  || value)+ "</span>";},
			           		   editor:{type:'combobox',options:{valueField:'value',textField:'text',data:dataMaterielType,required:true,editable:false}}},
						    {field: 'USE_YN',title: '是否启用',width: 80,align: 'center',formatter: function(value, row, index) {if(value == 'Y') { return '是';} else { return '否';}},editor:{type:'checkbox',options:{on: 'Y',off: 'N'}}}, 
					        {field: 'MO',title: '备注',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
						           options:{validType:['length[0,50]','specialTextCharacter']}}},
					        {field: 'CRT_ID',title: '创建人',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
							{field: 'CRT_DT',title: '创建时间',width: 180,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
							{field: 'UPT_ID',title: '修改人',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
							{field: 'UPT_DT',title: '修改时间',width: 180,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}
							]],
				/**结束编辑模式的操作*/
			     onEndEdit:function(index,row){
			    	 var edditmp = $(this).datagrid('getEditor', {index: index,field: 'FCT_CD'});
			    	 row.FCT_CD = $(edditmp.target).combobox('getValue');
			    	 row.FCT_NM = $(edditmp.target).combobox('getText');
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
		        	/*点击的列为弹出图标，弹出工位配置列表*/
		        	if(field=='img1'){
		        		endEditingAll(dataGrid);
						titleName = '工艺路线配置',
						dialogName = 'editTabProcess',
						tabName = 'process_tab',
						dgrid = $('#process_tab').datagrid('options'),
						prfCd = row.PRF_CD;
						fctCD = row.FCT_CD;	
						branchRout = row.BRANCH_ROUT;	
						$("#ProcessTitle").html("<label>工艺路线编码："+prfCd+"</label><label>&nbsp;&nbsp;工艺路线名称："+row.PRF_NAME+"</label>");
						if(row.PRF_CD!=undefined && row.PRF_CD!=''){
								/*验证此工序数据是否已经保存*/
								 var ajaxSelect = {
				                         url: '/iPlant_ajax',
				                         dataType: 'JSON',
				                         data: {
				                        	 PRF_CD:row.PRF_CD,
				                             IFS: 'GX00001'
				                         },
				                         successCallBack: function (data) {
				                        	 if(data.RESPONSE[0].RESPONSE_DATA.length == 0){
				                        		 $.messager.alert('提示','请先维护并保存工艺路线信息后再定义工序信息！');
				     							 return;
				                        	 }else{
				                        		 reqData = {IFS: 'GX00021',PRF_CD:row.PRF_CD,pageIndex: 1,pageSize: dgrid.pageSize};
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
							$.messager.alert('提示','请先维护并保存工艺路线信息后再定义工序信息！');
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
			    							$("#theProcessDefinition_tab").datagrid('uncheckAll');
			    							$("#theProcessDefinition_tab").datagrid('checkRow',editIndex);
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
			    			    		ed = $(this).datagrid('getEditor', {index: index,field: 'PRF_CD'});
			    			    		fc = ed.target;
			    			    		fc.textbox('disable');
			    		    		}
			    				}
			    			}else{
			    				addDatagridEditor(dataGrid,index);
					        	//**判断是否为可编辑字段*//*
					        	if(!checkNotEmpty(row.editType)){			
						    		ed = $(this).datagrid('getEditor', {index: index,field: 'PRF_CD'});
						    		fc = ed.target;
						    		fc.textbox('disable');
					    		}
			    			}
			    		}else{
			    			addDatagridEditor(dataGrid,index);
				        	//**判断是否为可编辑字段*//*
				        	if(!checkNotEmpty(row.editType)){			
					    		ed = $(this).datagrid('getEditor', {index: index,field: 'PRF_CD'});
					    		fc = ed.target;
					    		fc.textbox('disable');
				    		}
			    		}
		        },
		        /**单击进入编辑模式*/
		        /*onClickRow: function(rowIndex, rowData){
		        	var tabName,dialogName,titleName,rowEdit,editem,editorFt,itemCd,reqData,dgrid;
		        	var rows = dataGrid.datagrid('getRows'),row = rows[rowIndex];
		        	ccIndex = rowIndex;
		        	row.editType == 'add'?add=true:add=false;
		        	addDatagridEditor(dataGrid,rowIndex);
		        	var editIndexs = $("#theProcessDefinition_tab").datagrid('getEditingRowIndexs');
		        	*//**判断是否为可编辑字段*//*
		        	if(!checkNotEmpty(row.editType)){			如果是修改的情况，ft_cd字段为只读模式
			    		ed = $(this).datagrid('getEditor', {index: rowIndex,field: 'PRF_CD'});
			    		fc = ed.target;
			    		fc.prop('readonly',true);
		    		}
		        }*/
			}
			initGridMultiView(reqData, gridList);
			dataGrid.datagrid('loadData', jsonData);
		},
		
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
				dialogDataGrid('/iPlant_ajax', tabName, reqData);
			}
		},
		
		dialogEditorDataGrid = function(tabName,reqData, jsonData) {
			/*根据tabName判断哪个列表*/
			var columnsTab,edDataGrid,messageInfo;
			columnsTab=[		
					{field: 'ROUTE_CD',title: '工序编码',width: 120,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" +  value + "'>" +  (value)+ "</span>";}},
					{field: 'ROUTE_NAME',title: '工序名称',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
			        	   options:{required:true, validType:['length[1,30]','specialCharacterTextArea']}}},
	        	    /*{field: 'MAC_ADDRESS',title: 'MAC地址',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
	        	    	   options:{required:true, validType:['length[1,30]','checkMacAddress']}}},*/
	        	    	   {field: 'MAC_ADDRESS',title: 'MAC地址',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
					           options:{validType:['length[0,50]','specialTextCharacter']}}},
					{field: 'ORDER_CD',title: '顺序',width: 60,align: 'right',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
					{field: 'IS_INPUT',title: '是否计投入数',width: 80,align: 'center',formatter: function(value, row, index) {if(value == 'Y') { return '是';} else { return '否';}},editor:{type:'checkbox',options:{on: 'Y',off: 'N'}}},
				    {field: 'IS_OUTPUT',title: '是否计产出数',width: 80,align: 'center',formatter: function(value, row, index) {if(value == 'Y') { return '是';} else { return '否';}},editor:{type:'checkbox',options:{on: 'Y',off: 'N'}}},
				    {field: 'IS_BIND',title: '是否解绑',width: 80,align: 'center',formatter: function(value, row, index) {if(value == 'Y') { return '是';} else { return '否';}},editor:{type:'checkbox',options:{on: 'Y',off: 'N'}}},
				    {field: 'USE_YN',title: '是否启用',width: 80,align: 'center',formatter: function(value, row, index) {if(value == '1') { return '是';} else { return '否';}},editor:{type:'checkbox',options:{on: '1',off: '0'}}},
				    {field: 'MO',title: '备注',width: 250,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
				           options:{validType:['length[0,50]','specialTextCharacter']}}}];
			edDataGrid = $('#'+tabName);
			messageInfo = $('#showMSDInfo');	
			var gridList = {
					name: tabName,
					dataType: 'json',
					pagination:false,
					rownumbers:true,
					loadMsg: '数据加载中...',
					columns: [columnsTab],
			}
			initGridView(reqData, gridList);
			$('#'+tabName).datagrid('loadData', jsonData);
		},
		
		/*检索*/
	   searchDataGrid=function(dgrid){
			initGridData();
		},
		
		setDataNull=function(){
			 $('#showFileName').html('');
		},
		
		/*导入*/
		OpenImprotFramedr = function(){
			$("#enditTabupload").dialog("open").dialog('setTitle', '工序定义导入');
		}
		
		deleteDataGrid = function () {
			var checkedItems = $('#theProcessDefinition_tab').datagrid('getSelections');
	        if (checkedItems.length==0) {
	            $.messager.alert('提示', '请选择一条数据进行删除');
	            return;
	        }
	        /*确认提示框*/
	        var delCnt=0,arrUpdate = new Array();;
	        $.messager.confirm('确认框', '您确定要删除您所选择的数据吗?', function (r) {
	           	if(r==true){
	           		 $.each(checkedItems, function (index, item) {
	           			 arrUpdate.push({PRF_CD:item.PRF_CD});
	                 });
	           		 
	           		 if(arrUpdate.length>0){
	     	           	/*批量删除*/
	                     var ajaxUpdate = {
	                         url: '/iPlant_ajax',
	                         dataType: 'JSON',
	                         data: {
	                             list: arrUpdate,
	                             IFS: 'GX00004'
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
		
		/*保存工艺路线配置*/
		saveDataGridProcess = function(){
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
	                		var mac = inserted[m].MAC_ADDRESS;
	                		if(mac !=undefined && mac != ''){
	                			/*查询mac地址是否重复*/
		   	                     var ajaxCheck = {
		   	                         url: '/iPlant_ajax',
		   	                         dataType: 'JSON',
		   	                         async:false,
		   	                         data: {
		   	                             IFS: 'GX00021',
		   	                             MAC_ADDRESS:mac
		   	                         },
		   	                         successCallBack: function (data) {
		   	                        	 if(data.RESPONSE[0].RESPONSE_DATA.length == 0){
		   	                        		flag = true;
		   	                        	 }else{
		   	                        		 flag = false;
		   	                        		 $.messager.alert('提示','MAC地址['+mac+']已存在，请重新输入。','',function(){
		   	                        			 edDataGrid.datagrid('beginEdit',index);
		   	                        			 var taget = edDataGrid.datagrid('getEditor', {index:index,field:'MAC_ADDRESS'}).target;
		   	                        			 taget.val('');
		   	                        		 });
		   	                        	 }
		   	                         },
		   	                         errorCallBack: function (data) {
		   	                         	showmessage.html('<font color=red>查询重复失败！</font>');
		   	                             return;
		   	                         }
		   	                     };
		   	                     iplantAjaxRequest(ajaxCheck);
	                		}else{
	                			$.messager.alert('提示','新增行必填项为空，不能保存。')
	                			return;
	                		};
	                		if(flag){
	                			arrInsert.push({
   	  	                			'IS_BIND':inserted[m].IS_BIND,
   	  	                			'IS_INPUT':inserted[m].IS_INPUT,
   	  	                			'IS_OUTPUT':inserted[m].IS_OUTPUT,
   	  	                			'MO':inserted[m].MO,
   	  	                			'ORDER_CD':inserted[m].ORDER_CD,
   	  	                			'ROUTE_CD':inserted[m].ROUTE_CD,
   	  	                			'ROUTE_NAME':inserted[m].ROUTE_NAME,
   	  	                			'USE_YN':inserted[m].USE_YN,
   	  	                			'FCT_CD':fctCD,
   	  	                			'PRF_CD':prfCd,
   	  	                			'MAC_ADDRESS':mac
   	  	                		});
	                		}
	                	}
	                	if(arrInsert.length>0){
	                		//批量先增
		                    var ajaxInsert = {
		                        url: '/iPlant_ajax',
		                        dataType: 'JSON',
		                        data: {
		                            list: arrInsert,
		                            IFS: 'GX00022'
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
                            	 PRF_CD: prfCd,
                            	 ROUTE_CD: select.ROUTE_CD,
                            	 ORDER_CD: select.ORDER_CD,
	                             IFS: 'GX00024'
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
		
		/*两个数组删除重复值*/
		removeDuplicates = function(arr1,arr2){
			var temp = []; //临时数组1 
			var temparray = [];//临时数组2 
			for (var i = 0; i < arr2.length; i++) { 
				temp[arr2[i]] = true;//巧妙地方：把数组B的值当成临时数组1的键并赋值为真 
			}; 
			for (var i = 0; i < arr1.length; i++) { 
				if (!temp[arr1[i]]) { 
				temparray.push(arr1[i]);//巧妙地方：同时把数组A的值当成临时数组1的键并判断是否为真，如果不为真说明没重复，就合并到一个新数组里，这样就可以得到一个全新并无重复的数组 
				} ; 
			}; 
			return temparray;
			//PS：缺点，arr2中与arr1数组不重复的值将被忽略，只找出了arr1数组中与arr2不同的值。
		}
		
		/*新增工艺路线编码和顺序赋默认值*/
		addRouteCD = function(){
			var rowsData = $("#process_tab").datagrid('getData');					//获取所有工艺路线datagrid数据行
			ccIndex=0;
       	 	eeEndEdit('process_tab');												//结束所有行编辑状态
			var dgrid = $('#process_tab').datagrid('options');						//获取弹出框datagrid列表配置项属性
			var index = Number(rowsData.total) + 1,routeIndex;	
			if(rowsData.rows.length >0){
				var row = rowsData.rows;
				var nowArr = [],idealArr = [],lackArr = [];							
				/*nowArr储存现有数据的顺序字段，idealArr储存从现有的顺序字段最大值到1的所有数字值，
				两个数组查重即可得出现有数据顺序是否缺失,缺失的顺序push到lackArr数组中去*/
				
				/*循环出现有数据行中所有ORDER_CD字段*/
				$.each(row,function(o,obj){
					nowArr.push(obj.ORDER_CD);
				});
				/*将nowArr数组从小到大排序，sort方法排序方法返回值小于0表示a在b前面*/
				nowArr.sort(function(a,b){return a-b});									
				//获取当前数据网格中所有数据ORDER_CD字段的最大值，就是排序后的nowArr数组的最后一个下标值
				var nowMax = nowArr[nowArr.length - 1];		
				//获取数据行数，数据行数代表顺序无缺失情况下的最大值
				var idealMax = rowsData.total;	
				//如果现有数据条数和顺序字段的最大值不相等，代表工艺路线数据有缺失
				if(nowMax != idealMax){												
					for(var i=1;i<=idealMax;i++){
						idealArr.push(i);
					};
					lackArr = removeDuplicates(idealArr,nowArr);
					index = lackArr[0];
				};
			}
			if(index >= 10 && index <100){
				routeIndex = prfCd+'-'+'0'+index;
			}else if(index >= 100){
				routeIndex = prfCd+'-'+index;
			}else{
				routeIndex = prfCd+'-'+'00'+index;
			}
			insertDataGrid('process_tab',{ROUTE_CD:routeIndex,ORDER_CD:index,IS_INPUT:'N',IS_OUTPUT:'N',IS_BIND:'N',USE_YN:'1'});//初始化默认数据
		}
	}
	factoryInfo.prototype = {
		init: function() {
			$(function() {
				/*初始化全局变量对象*/
				dataGrid = $('#theProcessDefinition_tab'),dataRouteName=[],dataMaterielType=[],dataWorkshop=[],dataBOM=[],dataCompany=[],dataMaterielType=[],dataTmp=[],dataFactory=[],showmessage=$('#showMessageInfo'),editIndex = undefined,oldRow=undefined, reg=new RegExp("null","g");
				initGridData();
				$('#btnSearch').click(function() {	
					var dgrid = dataGrid.datagrid('options');
					searchDataGrid(dgrid);
				});
				
				$('#btnAdd').click(function() {
					var editData = $('#theProcessDefinition_tab').datagrid('getChanges', "inserted");
					if(editData.length == 0){
						add = true;				//add为true代表数据行为新增行，需进行主键查重验证
						var initData = {};
						if(dataMaterielType.length>0 && dataTmp.length>0){
							initData={FCT_CD:dataTmp[0].value,PRF_TYPE:dataMaterielType[0].value,USE_YN:'1'}
						}
						ccIndex = insertDataGrid('theProcessDefinition_tab',initData);		//新增的公共方法新增返回值，返回的值为新增行的索引
						$("#theProcessDefinition_tab").datagrid('checkRow',ccIndex);
					}else{
						$.messager.alert('提示','请先维护完上一条新增数据之后再继续添加新的数据。');
					}
				});
				
				$('#btnDelete').click(function(){
					deleteDataGrid();
	            });
				
				$('#btnSave').click(function() {
					saveDataGrid('theProcessDefinition_tab','GX00002','GX00003','showMessageInfo');
				});
				
				$('#btnImport').click(function() {						/*导入*/
					OpenImprotFramedr();
				});
				
				 $('#btnExprt').click(function(){						/*导出*/
					 	var now = new Date();
	                    var year =now.getFullYear();
	                	var reqData = {
	                			IFS:'GX00001'
	                	}
	                	createTable('tbIMESReport','工序定义导出','theProcessDefinition_tab',reqData);
	                });
				
				 /*工序工位配置*/
				 $('#btnProcessAdd').click(function() {	
					 addRouteCD();
				 });
				
				 $('#btnProcessDelete').click(function(){
					 deleteProcessDataGrid();
	             });

				 $('#btnProcessSave').click(function() {
					 editIndex = undefined;
					 saveDataGridProcess();
				 });
			});
		}
	}
	var fcfo = new factoryInfo();var dataRoute = {};var ccIndex= 0;/*全局索引;*/var prfCd,fctCD,branchRout,add;
	fcfo.init();
})();