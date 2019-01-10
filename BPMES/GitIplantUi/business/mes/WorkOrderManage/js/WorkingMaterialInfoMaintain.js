/* 启动时加载 */
/*
 */
(function() {
	function factoryInfo() {
		initGridData = function() {
			var dgrid = dataGrid.datagrid('options');
			if(!dgrid) return;
			var search_MaterialType = $('#DeptCode').textbox('getValue');
			var workshops =$("#workShops").combobox("getValue");
			var orderstatus =$("#orderStatus").combobox("getValue");
			var statdate = $("#productionStartTime").datebox("getValue");
			var overdate = $("#productionEndTime").datebox("getValue");
			var reqData = {
				IFS: 'W0000013',
				WO_NO:search_MaterialType,
				WC_CD:workshops,
				WO_STATE:orderstatus,
				PLAN_STRT_DT:statdate,
				PLAN_END_DT:overdate,
				pageIndex: 1,
				pageSize: dgrid.pageSize
			}
			reqGridData('/iPlant_ajax', 'WorkOrderMaterialInformationQuery_tab', reqData);
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
		iplantAjaxRequest(tmp),
		
			Workshop = {
	                url: "/iPlant_ajax",
	                dataType: "JSON",
	                data: {IFS:'B000025'},
	                successCallBack: function(a) {
	                	dataWorkshop = [];
	                	var op = a.RESPONSE[0].RESPONSE_DATA;
	                    $.each(op,function(n,obj) {
	                    	dataWorkshop.push({'value':obj.PL_CD,'text':obj.PL_NM});
					    });  
	                },
	                errorCallBack: function() {
	                    $.messager.alert("提示", '请联系管理员，查询失败！')  
	                }
	            };
				iplantAjaxRequest(Workshop);
				
				var company = {
		                url: "/iPlant_ajax",
		                dataType: "JSON",
		                data: {IFS: "B000109"},
		                successCallBack: function(a) {
		                	dataFactory = [];
		                	var op = a.RESPONSE[0].RESPONSE_DATA;
		                    $.each(op,function(n,obj) {
		                    	dataFactory.push({'value':obj.PD_LN_CD,'text':obj.PD_LN_NM});
						    });  
		                },
		                errorCallBack: function() {
		                    $.messager.alert("提示", '请联系管理员，查询失败！')
		                }
		            };
				iplantAjaxRequest(company);
				
				var company1 = {
	                url: "/iPlant_ajax",
	                dataType: "JSON",
	                data: {IFS: "B000113"},
	                successCallBack: function(a) {
	                	dataCompany = [];
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
				
				materiel = {
	                url: "/iPlant_ajax",
	                dataType: "JSON",
	                data: {IFS:'MB00038'},
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
				
				bom2 = {
		                url: "/iPlant_ajax",
		                dataType: "JSON",
		                data: {IFS:'Z000051'},
		                successCallBack: function(a) {
		                	dataBOM = [];
		                	var op = a.RESPONSE[0].RESPONSE_DATA;
		                    $.each(op,function(n,obj) {
		                    	dataBOM.push({'text':obj.BOM_CD+"("+obj.BOM_NM+")",'value':obj.BOM_CD});
		                    	BOM[a.RESPONSE[0].RESPONSE_DATA[n].BOM_CD]=a.RESPONSE[0].RESPONSE_DATA[n].BOM_NM;
						    });  
		                },
		                errorCallBack: function() {
		                    $.messager.alert("提示", '请联系管理员，查询失败！')
		                }
		            };
				iplantAjaxRequest(bom2);	
					
				MO = {
		                url: "/iPlant_ajax",
		                dataType: "JSON",
		                data: {IFS:'W000001'},
		                successCallBack: function(a) {
		                	dataMO = [];
		                	var op = a.RESPONSE[0].RESPONSE_DATA;
		                    $.each(op,function(n,obj) {
		                    	dataMO.push({'text':obj.MO_NO,'value':obj.MO_NO});
						    });  
		                },
		                errorCallBack: function() {
		                    $.messager.alert("提示", '请联系管理员，查询失败！')
		                }
		            };
				iplantAjaxRequest(MO);
		dataGrade=[{'value':'一级','text':'一级'},{'value':'二级','text':'二级'},{'value':'三级','text':'三级'}];
		bindGridData = function(reqData, jsonData) {
			var gridList = {
				name: 'WorkOrderMaterialInformationQuery_tab',
				dataType: 'json',
				columns: [[
				           	{field : "CZ",width : 10,checkbox : true},
			        	    {field: 'FCT_CD',title: '工厂名称',width: 100,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + ( row.FCT_NM  || value)+ "</span>";},
				           		   editor:{type:'combobox',options:{valueField:'value',textField:'text',data:dataTmp,required:true,editable:false}}},
				            {field:'MD_SN',title:'模具编号',hidden:true,align:'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
				            {field:'MC_CN',title:'模穴数',hidden:true,align:'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
				            {field:'MU_CN',title:'可用模穴数',hidden:true,align:'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
						    {field: 'WC_CD',title: '车间',width: 80,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" +  value + "'>" +  (row.WC_NM || value)+ "</span>";},
								   editor:{type:'combobox',options:{valueField:'value',textField:'text',data:dataWorkshop,required:true,editable:false}}},
						    {field: 'MO_NO',title: '工单号',width: 150,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" +  value + "'>" +  (row.MO_NO ||value)+ "</span>";},
							       editor:{type:'combobox',options:{valueField:'value',textField:'text',data:dataMO,required:true,editable:true}}},
							{field:'WO_NO',title:'作业指示号',width:150,align:'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},
									options:{required:true, validType:['length[1,30]','specialTextCharacter']}},
							{field:'PROD_TYPE_NM',title:'工单类型',width:100,align:'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},
								   options:{required:true, validType:['length[1,30]','specialTextCharacter']}},
						    {field:'PROD_TYPE',title:'工单类型',hidden:true,width:100,align:'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},
							       options:{required:true, validType:['length[1,30]','specialTextCharacter']}},	
					        /*{field:'RELATED_WO',title:'关联的作业指示',width:140,align:'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},
						           options:{required:true, validType:['length[1,30]','specialTextCharacter']}},	
					        {field: 'img1',title: '设置关联工单',width: 100,align: 'center',formatter:function(){
							        return "<img href='javascript:void(0)' class='easyui-linkbutton' src='../../../common/IplantCompent/themes/default/images/Folder.png'/>"}},*/
							{field: 'LINE_CD',title: '线别',width: 110,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + ( row.LINE_NM  || value)+ "</span>";},
		            			   editor:{type:'combobox',options:{valueField:'value',textField:'text',data:dataFactory,required:true}}}, 
							/*{field: 'SHIFT_CD',title: '班组',width: 80,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + ( row.SHIFT_NM  || value)+ "</span>";},
								   editor:{type:'combobox',options:{valueField:'value',textField:'text',data:dataCompany,required:true}}}, */
							{field: 'PLAN_PO_QTY',title: '工单计划产量',width: 85,align: 'right',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
						    {field: 'PLAN_WO_QTY',title: '排产数量',width: 80,align: 'right',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'numberbox', options:{precision:0,required:true,
										onChange:function(newValue,oldValue,rowIndex){
											var edDataGrid = $('#WorkOrderMaterialInformationQuery_tab');
											var rowIndex=$('#WorkOrderMaterialInformationQuery_tab').datagrid('getRowIndex',$('#WorkOrderMaterialInformationQuery_tab').datagrid('getSelected'))
									         if (endEditing(edDataGrid)){ 
									        	/*判断后变更数据*/
									        	if (edDataGrid.datagrid('getChanges').length) {
									                var inserted = edDataGrid.datagrid('getChanges', "inserted");  
									                var updated = edDataGrid.datagrid('getChanges', "updated");
									                var deleted = edDataGrid.datagrid('getChanges', "deleted");
									                /**装载数据*/
									                var arrInsert = new Array(),arrUpdate = new Array();
									                if(inserted.length>0){
									                	for(var m=0;m<inserted.length;m++){
									                		arrInsert.push(inserted[m].MO_NO,inserted[m].WO_NO);
									                	}
									                	/*批量先增*/
									                    var ajaxInsert = {
									                        url: '/iPlant_ajax',
									                        dataType: 'JSON',
									                        data: {
									                        	MO_NO: inserted[0].MO_NO,
									                            IFS: 'W0000030'
									                        },
									                        successCallBack: function (data) {
									                        	var newNum = parseInt(newValue);
											                    var planAllNum = parseInt(data.RESPONSE["0"].RESPONSE_DATA['0'].PLAN_WO_QTY);
									                        	var planPoNum = parseInt(data.RESPONSE["0"].RESPONSE_DATA['0'].PLAN_PO_QTY);
									                        	var total = newNum + planAllNum;
											                    if(total > planPoNum){
									                        		$("#showMessageInfo").html('<font color=red>排产数量不能大于计划产量！</font>');
									                        	}else{
									                        		$("#showMessageInfo").html('');
									                        	}
									                            return
									                        },
									                        errorCallBack: function (data) {
									                        	$('#'+messageId).html('<font color=red>保存失败！</font>');
									                            return
									                        }
									                    };
									                    iplantAjaxRequest(ajaxInsert);
									                }
									                if(updated.length>0){
									                	for(var m=0;m<updated.length;m++){
									                		if(updated[m].edited){
									                			arrUpdate.push(updated[m]);
									                		}
									                	}
									                	/*批量修改*/
									                	 var ajaxUpdate = {
									                        url: '/iPlant_ajax',
									                        dataType: 'JSON',
									                        data: {
									                        	MO_NO: updated[0].MO_NO,
									                        	WO_NO : updated[0].WO_NO,
									                            IFS: 'W0000030'
									                        },
									                        successCallBack: function (data) {
									                        	var newNum = parseInt(newValue);
											                    var planAllNum = parseInt(data.RESPONSE["0"].RESPONSE_DATA['0'].PLAN_WO_QTY);
									                        	var planPoNum = parseInt(data.RESPONSE["0"].RESPONSE_DATA['0'].PLAN_PO_QTY);
									                        	var total = newNum + planAllNum;
											                    if(total > planPoNum){
											                    	updated[0].PLAN_WO_QTY = '';
											                    	$('#WorkOrderMaterialInformationQuery_tab').datagrid('endEdit', rowIndex).datagrid('refreshRow', rowIndex).datagrid('selectRow', rowIndex).datagrid('beginEdit',rowIndex);
									                        		$("#showMessageInfo").html('<font color=red>排产数量不能大于计划产量！</font>');
									                        	}else{
									                        		$("#showMessageInfo").html('');
									                        	}
									                            return
									                        },
									                        errorCallBack: function (data) {
									                        	$('#'+messageId).html('<font color=red>保存失败！</font>');
									                            return
									                        }
									                    };
									                    iplantAjaxRequest(ajaxUpdate);
									                }
									            }
											}
										}
										}
									}, 
											      formatter:function(value,row,index){ return formatNumber(value,0); }},
						    {field:'WO_STATE_NM',title:'作业指示状态',width:100,align:'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},
							       options:{required:true, validType:['length[1,30]','specialTextCharacter']}},	   
					        {field:'ITEM_CD',title: '物料编码', width:250,align:'center',
		 	                        editor:{  
		 	                            type:'combobox',
		 	                            options:{
		 	                            	valueField:'value',
		 	                                textField:'text',
		 	                                panelWidth:250,
		 	                                panelHeight:250,
		 	                                editable:false,
		 	                                data:dataBOM,
		 	                                onSelect:function(data){	
		 										var target = $('#WorkOrderMaterialInformationQuery_tab').datagrid('getEditor', {'index':ccIndex,'field':'ITEM_NM'}).target;
		 										target.textbox('setValue', BOM[data.value]);
		 									}
		 	                            }    
		 	                        }
		 	                    },			
		 	                {field: 'VERSION',title: '产品版本',width: 80,align: 'right',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
		 	                {field:'ITEM_NM', title: '物料名称', width:120,align:'center',editor:{type:'textbox',options:{editable:false}}}, 
			        	    {field: 'ITEM_TYPE',title: '物料类型',width: 100,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" +  value + "'>" +  (row.ITEM_TYPE_NM || value)+ "</span>";},
							       editor:{type:'combobox',options:{valueField:'value',textField:'text',data:dataMaterielType,required:true,editable:false}}},
							{field: 'CAR_BO_QTY',title: '载具拼版数',width: 80,align: 'right',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
							{field: 'CAPA',title: '产能',width: 80,align: 'right',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
							{field: 'CYCTM',title: '周期',width: 80,align: 'right',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
							{field: 'INPUT_QTY',title: '累计投入数',width: 90,align: 'right',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
							{field: 'PROD_QTY',title: '累计生产数量',width: 90,align: 'right',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
							{field: 'GOOD_QTY',title: '良品数量',width: 80,align: 'right',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
							{field: 'DFCT_QTY',title: '不良品数量',width: 80,align: 'right',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
							{field: 'SCRAP_QTY',title: '报废数量',width: 80,align: 'right',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
							{field: 'PLAN_STRT_DT',title: '计划开始日期',width: 150,align: 'center',formatter:function(value,row,index){if(row.PLAN_STRT_DT){return row.PLAN_STRT_DT;}},
			            		   editor:{type:'datebox',options:{required:true,editable:true}}}, 
							{field: 'PLAN_END_DT',title: '计划结束日期',width: 150,align: 'center',formatter:function(value,row,index){if(row.PLAN_END_DT){return row.PLAN_END_DT;}},
			            		   editor:{type:'datebox',options:{required:true,editable:true}}}, 
		            	    {field: 'UGT_TYPE',title: '紧急等级',width: 100,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" +  value + "'>" +  (row.UGT_TYPE ||value)+ "</span>";},
								   editor:{type:'combobox',options:{valueField:'value',textField:'text',data:dataGrade,required:true,editable:false}}},
							{field: 'NXT_OPER',title: '后工程',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
					        	   options:{validType:['length[0,30]','specialTextCharacter']}}},
			        	    {field: 'PRF_CD',title: '工艺流程',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
				        	   options:{validType:['length[1,30]','specialTextCharacter']}}},
							{field: 'CRT_ID',title: '创建人',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
							{field: 'CRT_DT',title: '创建时间',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
							{field: 'UPT_ID',title: '修改人',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
							{field: 'UPT_DT',title: '修改时间',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}
							]],
				/**结束编辑模式的操作*/
			     onEndEdit:function(index,row){
			    	 var eddi = $(this).datagrid('getEditor', {index: index,field: 'WC_CD'});
			    	 row.WC_CD = $(eddi.target).combobox('getValue');
			    	 row.WC_NM = $(eddi.target).combobox('getText');
			    	 var edditmp = $(this).datagrid('getEditor', {index: index,field: 'FCT_CD'});
			    	 row.FCT_CD = $(edditmp.target).combobox('getValue');
			    	 row.FCT_NM = $(edditmp.target).combobox('getText');
			    	 
			    	 var edditype = $(this).datagrid('getEditor', {index: index,field: 'ITEM_TYPE'});
			    	 row.ITEM_TYPE = $(edditype.target).combobox('getValue');
			    	 row.ITEM_TYPE_NM = $(edditype.target).combobox('getText');
			    	 
			    	 var edddg = $(this).datagrid('getEditor', {index: index,field: 'UGT_TYPE'});
			    	 row.UGT_TYPE = $(edddg.target).combobox('getValue');
			    	 
			    	 var ewq = $(this).datagrid('getEditor', {index: index,field: 'MO_NO'});
			    	 row.MO_NO = $(ewq.target).combobox('getValue');
			    	 
			    	 var edddgBOM2 = $(this).datagrid('getEditor', {index: index,field: 'LINE_CD'});
			    	 row.LINE_CD = $(edddgBOM2.target).combobox('getValue');
			    	 row.LINE_NM = $(edddgBOM2.target).combobox('getText');
			    	 
			    	 /*var edddgBOM3 = $(this).datagrid('getEditor', {index: index,field: 'SHIFT_CD'});
			    	 row.SHIFT_CD = $(edddgBOM3.target).combobox('getValue');
			    	 row.SHIFT_NM = $(edddgBOM3.target).combobox('getText');*/
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
		        	ccIndex=index;
               	 	eeEndEdit('WorkOrderMaterialInformationQuery_tab');
		        	var tabName,dialogName,titleName,rowEdit,editem,editorFt,itemCd,reqData,dgrid;
		        	var rows = dataGrid.datagrid('getRows'),row = rows[index];
		        	if(field=='img1'){
		        		endEditingAll(dataGrid);
		        		dgrid = $('#WorkOrderMaterialInformationQuery_tab').datagrid('options'),
						WONO = row.WO_NO;
		        		PRODTYPE =row.PROD_TYPE
		        		$("#RELATED_WO_open").dialog("open").dialog('setTitle', '关联工单');
		        		RelatedMo();
		        	}
		        	if(row.WO_STATE!=1){
		        		return;       /*只有创建状态才能修改删除*/
		        	}
		        	/**判断是否为可编辑字段*/
		        	addDatagridEditor(dataGrid,index);
		        },
		        /**单击进入编辑模式*/
			}
			initGridMultiView(reqData, gridList);
			dataGrid.datagrid('loadData', jsonData);
		},
		/*导入*/
		OpenImprotFramedr = function(){
			$("#enditTabupload").dialog("open").dialog('setTitle', '工单信息导入');
		},
		/*显示图片*/
       importFile = function (){
    	   /*以下即为完整客户端路径*/
    	   var pic = document.getElementById('txtPHOTO'),file,fileName,fileType,temp = [],strSrc;
    	   if(pic.files.length>0){
    		   file = pic.files[0],fileName = file.name,fileType=file.type;
    		   if(fileName.indexOf('.')>0){
    			   temp=fileName.split('.');
    			   strSrc = temp[temp.length-1];
    			   if(strSrc.toLowerCase().localeCompare('xlsx') === 0 || strSrc.toLowerCase().localeCompare('xls') === 0 ){
    				   $('#showFileName').html(fileName);
    			   }else{
    				   $('#showFileName').html('<font color=red>请输入excel文件！</font>');
    				   return false;
    			   }
    		   }
    	   }
       },
	   ImportStation =function(){
    	   var webroot=document.location.origin;
    	   var pic = document.getElementById('txtPHOTO'),file,fileName,fileType,temp = [],strSrc;
    	   if(pic.files.length>0){
    		   file = pic.files[0],fileName = file.name,fileType=file.type;
    		   if(fileName.indexOf('.')>0){
    			   temp=fileName.split('.');
    			   strSrc = temp[temp.length-1];
    			   if(strSrc.toLowerCase().localeCompare('xlsx') === 0 || strSrc.toLowerCase().localeCompare('xls') === 0 ){
    				   $('#FILE_BELONG').val("ITEM_CD"),
    		    	   $('#FILE_CLS').val("import"),
    		    	   $('#FILE_TYPE').val('xlsx'),
    		    	   $('#importType').val('1'),
    		    	   $('#IFS').val('W000002');
    				   var formData = new FormData($( "#importUplod" )[0]);  
    				   $.ajax({
    		                cache: true,
    		                type: "POST",
    		                url:webroot+'/iTaurus/iPlant_ImgUpload',
    		                data:formData,/* 你的formid*/
    		                async: false,
    		                processData:false,
    		                contentType:false,
    		                error: function(request) {
    		                	$.messager.alert("提示", '导入失败！');
    		                	console.log(request);
    		                },
    		                success: function(data) {
    		                	$.messager.alert("提示", data[0].msg);
    		                }
    		            });
    			   }else{
    				   $('#showFileName').html('<font color=red>请输入excel文件！</font>');
    				   return false;
    			   }
    		   }
    	   }
	   },
		/*检索*/
	   searchDataGrid=function(dgrid){
			initGridData();
			
		},
		setDataNull=function(){
			 $('#showFileName').html('');
		},
		/*释放*/
		releasedDataGrid = function () {
			var checkedItems = $('#WorkOrderMaterialInformationQuery_tab').datagrid('getSelections');
	        if (checkedItems.length==0) {
	            $.messager.alert('提示', '请选择一条数据进行释放');
	            return;
	        }
	        /*确认提示框*/
	        var delCnt=0,arrUpdate = new Array();;
	        $.messager.confirm('确认框', '您确定要释放您所选择的数据吗?', function (r) {
	           	if(r==true){
	           		var tmp='',WC_CD,PROD_TYPE;var veri = '';
	           		 $.each(checkedItems, function (index, item) {
	           			/* if(item.WO_STATE!='1'){
	           					tmp=item.WO_NO+","+tmp;	
	           			 }else{*/
	           				/*arrUpdate.push({WO_NO:item.WO_NO,WO_STATE:'2'});*/
	           				WC_CD = item.WC_CD;
	           				PROD_TYPE = item.PROD_TYPE;
	           			 /*}*/	  
	           	
//	           if(item.PROD_TYPE =='SMT'){
//	        	   
//	           		/*释放前的验证*/
//	 	           		var ajaxVerification = {
//	 	                        url: '/iPlant_ajax',
//	 	                        dataType: 'JSON',
//	 	                        async : false,
//	 	                        data: {
//	 	                        	ITEM_CD: item.ITEM_CD,
//	 	                            IFS: 'ST00104'
//	 	                        },
//	 	                        successCallBack: function (data) {
//	 	                        	var Verification = data.RESPONSE[0].RESPONSE_DATA[0].NOT_QTY;
//	 	                        	if(Verification == 'N'){
//	 	                        		veri=item.ITEM_CD+","+veri;	
//	 	                        	}
//	 	                        },
//	 	                        errorCallBack: function (data) {
//	 	                        	showmessage.html('<font color=red>查询失败！</font>');
//	 	                            return;
//	 	                        }
//	 	                    };
//	 	                    iplantAjaxRequest(ajaxVerification); 
//	 	                    
//	           		 }
	                 });
	           		 
	           		 
	           	/*	if(veri !=''){
                  		$.messager.alert('提示',"请先到 SMT栈位维护 页面维护   产品"+veri+'的栈位信息'); 
                  		//return;
                  	}else{
                  		批量修改
                        var ajaxUpdate = {
                            url: '/iPlant_ajax',
                            dataType: 'JSON',
                            data: {
                                list: arrUpdate,
                                IFS: 'W0000015S'
                            },
                            successCallBack: function (data) {
                                	if(tmp!=null && tmp!=''){
                                		$.messager.alert('提示',tmp+"   已释放,不能再次释放"); 
                                		return
                                	}else{
                                		MQTTFun();
                                		showmessage.html('<font color=red>释放成功！</font>');
                                		
                                		*/
                           	 var ajaxGenerate = {
                                    url: '/iPlant_ajax',
                                    dataType: 'JSON',
                                    data: {
                                   	    /*WC_CD: WC_CD,*/
                                    	PROD_TYPE: PROD_TYPE,
                                        IFS: 'W0000028'
                                    },
                           	 		successCallBack: function (data) {
                           	 			showmessage.html('<font color=red>释放成功！</font>');
                           	 		}
                                 };
                            iplantAjaxRequest(ajaxGenerate);
                       		initGridData();
                                   		
                          /*         		
                                	}
                            },
                            errorCallBack: function (data) {
                            		showmessage.html('<font color=red>释放失败！</font>');
                                 return;
                            }
                        };
                       iplantAjaxRequest(ajaxUpdate);
                  	}*/
	           	}
	        });      
		}
		
		/*
		 * Showrelated()  保存关联工单
		 * */
		Showrelated = function(){
			var checkedItems = $('#RELATED_WO_tab').datagrid('getSelections');
	        if (checkedItems.length==0) {
	            $.messager.alert('提示', '请选择作业指示关联！');
	            return;
	        }
	        var NEW_WONO = checkedItems[0].WO_NO;
	        console.log("NEW_WONO="+NEW_WONO);
	        
        	var ajaxUpdateRelated = {
                url: '/iPlant_ajax',
                dataType: 'JSON',
                data: {
                	RELATED_WO: NEW_WONO,
                	WO_NO: WONO,
                    IFS: 'W0000015'
                },
                successCallBack: function (data) {
                    $.messager.alert('提示',"关联成功！");
                    $('#RELATED_WO_open').dialog('close');
                    initGridData();
                },
                errorCallBack: function (data) {
                    return;
                }
            };
            iplantAjaxRequest(ajaxUpdateRelated);
		}
		
		
		/*关联工单*/
		RelatedMo =function(){
			var dgrid = dataGrid.datagrid('options');
			if(!dgrid) return;
			var MO_NO = $("#related_mo").textbox('getValue');
			var WO_NO = $("#related_wo").textbox('getValue');
			var CRT_DT = $("#related_time").datebox('getValue');
			
			console.log(MO_NO+"  "+WO_NO+"  "+CRT_DT+" "+PRODTYPE);
			
			var reqDataA = {
			    MO_NO: MO_NO,
			    WO_NO: WO_NO,
			    MEWO_NO: WONO,
			    PROD_TYPE: PRODTYPE,
				IFS: 'W0000036',
				pageIndex: 1,
				pageSize: dgrid.pageSize
			}
			reqGridData('/iPlant_ajax', 'RELATED_WO_tab', reqDataA);
			
			bindGridData = function(reqDataA, jsonData) {
				var tabName = 'RELATED_WO_tab';
				var gridLists = {
					name: 'RELATED_WO_tab',
					dataType: 'json',
					columns: [[
						{field: 'MO_NO',title: '工单号',width: 130,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
						{field: 'WO_NO',title: '作业指示号',width: 140,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
						{field: 'ITEM_CD',title: '物料编码',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
						{field: 'ITEM_NM',title: '物料名称',width: 180,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}
				     ]]
				}
				initGridView(reqDataA, gridLists);
				$('#RELATED_WO_tab').datagrid('loadData', jsonData);
			}
		}
		
		/*暂停*/
		pauseDataGrid = function () {
			var checkedItems = $('#WorkOrderMaterialInformationQuery_tab').datagrid('getSelections');
	        if (checkedItems.length==0) {
	            $.messager.alert('提示', '请选择一条数据进行释放');
	            return;
	        }
	        /*确认提示框*/
	        var delCnt=0,arrUpdate = new Array();;
	        $.messager.confirm('确认框', '您确定要释放您所选择的数据吗?', function (r) {
	           	if(r==true){
	           		var tmp='',WC_CD;
	           		 $.each(checkedItems, function (index, item) {
	           			 if(item.WO_STATE!='3'){
	           					tmp=item.WO_NO+","+tmp;	
	           			 }else{
	           				arrUpdate.push({WO_NO:item.WO_NO,WO_STATE:'3'});
	           				WC_CD = item.WC_CD;
	           			 }	           			
	                 });
	           		 
	           		 
	           	/*批量修改*/
                    var ajaxUpdate = {
                        url: '/iPlant_ajax',
                        dataType: 'JSON',
                        data: {
                            list: arrUpdate,
                            IFS: 'W0000015S'
                        },
                        successCallBack: function (data) {
                        	if(tmp!=null && tmp!=''){
                        		$.messager.alert('提示',tmp+"   已暂停,不能再次暂停"); 
                        	}
                        	showmessage.html('<font color=red>暂停成功！</font>');
                        	initGridData();
                        },
                        errorCallBack: function (data) {
                        	showmessage.html('<font color=red>暂停失败！</font>');
                            return;
                        }
                    };
                    iplantAjaxRequest(ajaxUpdate);
                    
                   
	           	}
	        });      
		}
		
		/*取消*/
		countermandDataGrid = function () {
			var checkedItems = $('#WorkOrderMaterialInformationQuery_tab').datagrid('getSelections');
	        if (checkedItems.length==0) {
	            $.messager.alert('提示', '请选择一条数据进行释放');
	            return;
	        }
	        /*确认提示框*/
	        var delCnt=0,arrUpdate = new Array();;
	        $.messager.confirm('确认框', '您确定要释放您所选择的数据吗?', function (r) {
	           	if(r==true){
	           		var tmp='',WC_CD;
	           		 $.each(checkedItems, function (index, item) {
	           			 if(item.WO_STATE!='6'){
	           					tmp=item.WO_NO+","+tmp;	
	           			 }else{
	           				arrUpdate.push({WO_NO:item.WO_NO,WO_STATE:'6'});
	           				WC_CD = item.WC_CD;
	           			 }	           			
	                 });
	           		 
	           		 
	           	/*批量修改*/
                    var ajaxUpdate = {
                        url: '/iPlant_ajax',
                        dataType: 'JSON',
                        data: {
                            list: arrUpdate,
                            IFS: 'W0000015S'
                        },
                        successCallBack: function (data) {
                        	if(tmp!=null && tmp!=''){
                        		$.messager.alert('提示',tmp+"   已取消,不能再次取消"); 
                        	}
                        	showmessage.html('<font color=red>取消成功！</font>');
                        	initGridData();
                        },
                        errorCallBack: function (data) {
                        	showmessage.html('<font color=red>取消失败！</font>');
                            return;
                        }
                    };
                    iplantAjaxRequest(ajaxUpdate);
                    
                   
	           	}
	        });      
		}
		
		/*修改作业指示状态为主单*/
		updateByMoNoStateMainSingle = function(){
			var checkedItems = $('#WorkOrderMaterialInformationQuery_tab').datagrid('getSelections');
	        if (checkedItems.length==0) {
	            $.messager.alert('提示', '请先选择一条数据！');
	            return;
	        }
	        var MoNoStateMainSingle = {
                url: "/iPlant_ajax",
                dataType: "JSON",
                async:false, 
                data: {
                   LINE_CD:checkedItems[0].LINE_CD,
                   WO_NO:checkedItems[0].WO_NO,
                   IDENTIFICATION:'A',
                   IFS: 'W0000043'
               },
               successCallBack: function(a) {
                	var op = a.RESPONSE[0].RESPONSE_DATA;
                	$.messager.alert('提示', op[0].MESSAGE);
                	initGridData();
                }
          };
		 iplantAjaxRequest(MoNoStateMainSingle);
		}
		
		/*修改作业指示状态为次单*/
		updateByMoNoStateSingle= function(){
			var checkedItems = $('#WorkOrderMaterialInformationQuery_tab').datagrid('getSelections');
	        if (checkedItems.length==0) {
	            $.messager.alert('提示', '请先选择一条数据！');
	            return;
	        }
	        var MoNoStateSingle = {
                url: "/iPlant_ajax",
                dataType: "JSON",
                async:false, 
                data: {
                   LINE_CD:checkedItems[0].LINE_CD,
                   WO_NO:checkedItems[0].WO_NO,
                   IDENTIFICATION:'B',
                   IFS: 'W0000043'
               },
               successCallBack: function(a) {
                	var op = a.RESPONSE[0].RESPONSE_DATA;
                	$.messager.alert('提示', op[0].MESSAGE);
                	initGridData();
                }
          };
		 iplantAjaxRequest(MoNoStateSingle);
		}
		
		
		/*MQTT下发工单给C++端*/		
		MQTTFun = function(){
			var webroot=document.location.origin;
			var checkedItems = $('#WorkOrderMaterialInformationQuery_tab').datagrid('getSelections');
			var arrMQTT = new Array();
			if(checkedItems.length==0){
				$.messager.alert("提示", '请先选中要下发的工单！');
				return;
			}
			
			 for(var i=0;i<checkedItems.length;i++){
					ETdataTmp = [];
					 //请求拉线对应的设备信息
					 var tmp = {
			                url: "/iPlant_ajax",
			                dataType: "JSON",
			                async:false, 
			                data: {
			                	LINE_CD:checkedItems[i].LINE_CD,
	                           IFS: 'MF00112'
	                       },
			                successCallBack: function(a) {
			                	var op = a.RESPONSE[0].RESPONSE_DATA;
			                    $.each(op,function(n,obj) {
			                    	ETdataTmp.push(obj.ET_CD);
							    });  
			                },
			                errorCallBack: function() {
			                    $.messager.alert("提示", '请联系管理员，查询失败！')
			                }
			            };
				 iplantAjaxRequest(tmp);
				 arrMQTT.push({PLAN_END_DT:checkedItems[i].PLAN_END_DT,PLAN_STRT_DT:checkedItems[i].PLAN_STRT_DT,SCRAP_QTY:checkedItems[i].SCRAP_QTY,
   					 DFCT_QTY:checkedItems[i].DFCT_QTY,GOOD_QTY:checkedItems[i].GOOD_QTY,PROD_QTY:checkedItems[i].PROD_QTY,ITEM_TYPE:checkedItems[i].ITEM_TYPE,
   					 ITEM_NM:checkedItems[i].ITEM_NM,ITEM_CD:checkedItems[i].ITEM_CD,WO_STATE_NM:checkedItems[i].WO_STATE_NM,PLAN_WO_QTY:checkedItems[i].PLAN_WO_QTY,
   					 PLAN_PO_QTY:checkedItems[i].PLAN_PO_QTY,LINE_CD:checkedItems[i].LINE_CD,WO_NO:checkedItems[i].WO_NO,
   					 MO_NO:checkedItems[i].MO_NO,WC_CD:checkedItems[i].WC_CD,FCT_CD:checkedItems[i].FCT_CD,MD_SN:checkedItems[i].MD_SN,MU_CN:checkedItems[i].MU_CN,MC_CN:checkedItems[i].MC_CN
   					 ,ET_INFO:ETdataTmp
   				 });
				 var topics;wcnm = checkedItems[i].WC_NM;
				 if(wcnm.indexOf('注塑') >= 0 ){
					 topics = 'm2s/'+checkedItems[i].WO_NO +'/2/wo_no'		/*注塑*/
				 }else{
					 topics = 'm2s/'+checkedItems[i].WO_NO +'/3/wo_no'
				 }
				 
				 var strmsg = JSON.stringify(arrMQTT);  
				 var reqDataObj={
						 mqttType : 'p',
						 topic : topics,
						 message :	strmsg	 
				 };
//			            reqStr = JSON.stringify(reqDataObj);
	             if (reqDataObj != null) {
	                reqStr = '{\"REQ\":[{\"REQ_DATA\":' + JSON.stringify(reqDataObj) + '}]}';
	             }
		        var ajaxParam={
	        		url:webroot+'/iTaurus/iPlant_MQTT',
	    		    type: 'POST',
	                contentType: "application/x-www-form-urlencoded; charset=utf-8",
	    		    data:{ "reqStr": reqStr },
	    		    success:function(data){ 
	    		    	$.messager.alert(data.message);
	    		   },
	               errorCallBack:function(e){
	            	   
	               }
	    		}
		        $.ajax(ajaxParam);
			 }
		}
		
		
		/*完工*/
		completeDataGrid = function () {
			var checkedItems = $('#WorkOrderMaterialInformationQuery_tab').datagrid('getSelections');
	        if (checkedItems.length==0) {
	            $.messager.alert('提示', '请选择一条数据完工');
	            return;
	        }
	        /*确认提示框*/
	        var delCnt=0,arrUpdate = new Array();;
	        $.messager.confirm('确认框', '您确定要完工您所选择的数据吗?', function (r) {
	           	if(r==true){
	           		var tmp='';
	           		 $.each(checkedItems, function (index, item) {
	           			 if(item.WO_STATE=='4'){
	           					tmp=item.WO_NO+","+tmp;	
	           			 }else{
	           				arrUpdate.push({WO_NO:item.WO_NO,WO_STATE:'4'});
	           			 }	           			
	                 });
	           		 
	           		 
	           	/*批量修改*/
                    var ajaxUpdate = {
                        url: '/iPlant_ajax',
                        dataType: 'JSON',
                        data: {
                            list: arrUpdate,
                            IFS: 'W0000015S'
                        },
                        successCallBack: function (data) {
                        	if(tmp!=null && tmp!=''){
                        		$.messager.alert('提示',tmp+"   已完工,不能再次完工");
                        		initGridData();
                        		return;
                        	}
                        	showmessage.html('<font color=red>完工成功！</font>');
                        	initGridData();
                            return;
                        },
                        errorCallBack: function (data) {
                        	showmessage.html('<font color=red>完工失败！</font>');
                            return;
                        }
                    };
                    iplantAjaxRequest(ajaxUpdate);
                    
                   
	           	}
	        });      
		}
		
		saveDataGrid=function(){
	    	 var edDataGrid = $('#WorkOrderMaterialInformationQuery_tab');
	         if (endEditing(edDataGrid)){
	        	/*判断后变更数据*/
	        	if (edDataGrid.datagrid('getChanges').length) {
	                var inserted = edDataGrid.datagrid('getChanges', "inserted");  
	                var updated = edDataGrid.datagrid('getChanges', "updated");
	                console.log(inserted)
	                /**装载数据*/
	                if(inserted.length>0){
	                	for(var m=0;m<inserted.length;m++){
	                		/*批量先增*/
		                    var ajaxInsert = {
		                        url: '/iPlant_ajax',
		                        dataType: 'JSON',
		                        data: {
		                        	FCT_CD: inserted[m].FCT_CD,
		                        	WC_CD: inserted[m].WC_CD,
		                        	MO_NO: inserted[m].MO_NO,
		                        	LINE_CD: inserted[m].LINE_CD,
		                        	/*SHIFT_CD: inserted[m].SHIFT_CD,*/
		                        	PLAN_WO_QTY: inserted[m].PLAN_WO_QTY,
		                        	ITEM_CD: inserted[m].ITEM_CD,
		                        	ITEM_TYPE: inserted[m].ITEM_TYPE,
		                        	PLAN_STRT_DT: inserted[m].PLAN_STRT_DT,
		                        	PLAN_END_DT: inserted[m].PLAN_END_DT,
		                        	UGT_TYPE: inserted[m].UGT_TYPE,
		                        	NXT_OPER: inserted[m].NXT_OPER,
		                        	PRF_CD: inserted[m].PRF_CD,
		                            IFS: 'W0000014'
		                        },
		                        successCallBack: function (data) {
		                        	edDataGrid.datagrid('acceptChanges');
		                        	initGridData();
		                        	$('#showMessageInfo').html('<font color=red>保存成功！</font>');
		                            return;
		                        },
		                        errorCallBack: function (data) {
		                        	$('#showMessageInfo').html('<font color=red>保存失败！</font>');
		                            return;
		                        }
		                    };
		                    iplantAjaxRequest(ajaxInsert);
	                	}
	                	
	                }
	                if(updated.length>0){
	                	for(var m=0;m<updated.length;m++){
	                		if(updated[m].edited){
	                			arrUpdate.push(updated[m]);
	                		}
	                	}
	                	/*批量修改*/
	                    var ajaxUpdate = {
	                        url: '/iPlant_ajax',
	                        dataType: 'JSON',
	                        data: {
	                        	FCT_CD: inserted[m].FCT_CD,
	                        	WC_CD: inserted[m].WC_CD,
	                        	MO_NO: inserted[m].MO_NO,
	                        	LINE_CD: inserted[m].LINE_CD,
//	                        	SHIFT_CD: inserted[m].SHIFT_CD,
	                        	PLAN_WO_QTY: inserted[m].PLAN_WO_QTY,
	                        	ITEM_CD: inserted[m].ITEM_CD,
	                        	ITEM_TYPE: inserted[m].ITEM_TYPE,
	                        	PLAN_STRT_DT: inserted[m].PLAN_STRT_DT,
	                        	PLAN_END_DT: inserted[m].PLAN_END_DT,
	                        	UGT_TYPE: inserted[m].UGT_TYPE,
	                        	NXT_OPER: inserted[m].NXT_OPER,
	                        	PRF_CD: inserted[m].PRF_CD,
	                            IFS: 'W0000015S'
	                        },
	                        successCallBack: function (data) {
	                        	initGridData();
	                        	edDataGrid.datagrid('acceptChanges');
	                        	$('#showMessageInfo').html('<font color=red>保存成功！</font>');
	                            return;
	                        },
	                        errorCallBack: function (data) {
	                        	$('#showMessageInfo').html('<font color=red>保存失败！</font>');
	                            return;
	                        }
	                    };
	                    iplantAjaxRequest(ajaxUpdate);
	                }
	            }else{
	            	$('#'+messageId).html('<font color=red>没有进行变更！</font>');
	            }
			}else{
				$('#'+messageId).html('<font color=red>请输入必填项！</font>');
			}
		},
		
		eeEndEdit = function(str){
			var rows = $('#'+str).datagrid('getRows');
			if(rows.length>0){
				for(var i=0; i<rows.length; i++){
					$('#'+str).datagrid('endEdit',i);
				}
			}
		},
		
		
		deleteDataGrid = function () {
			var checkedItems = $('#WorkOrderMaterialInformationQuery_tab').datagrid('getSelections');
	        if (checkedItems.length==0) {
	            $.messager.alert('提示', '请选择一条数据进行删除');
	            return;
	        }
	        /*确认提示框*/
	        var delCnt=0,arrUpdate = new Array();;
	        $.messager.confirm('确认框', '您确定要删除您所选择的数据吗?', function (r) {
	           	if(r==true){
	           		var tmp='';
	           		 $.each(checkedItems, function (index, item) {
	           			 if(item.WO_STATE!='1'){
	           				 tmp=item.WO_NO+","+tmp;		
	           			 }else{
	           				arrUpdate.push({WO_NO:item.WO_NO});
	           			 }	           			
	                 });
	           		 
	           		 if(arrUpdate.length>0){
	     	           	/*批量删除*/
	                     var ajaxUpdate = {
	                         url: '/iPlant_ajax',
	                         dataType: 'JSON',
	                         data: {
	                             list: arrUpdate,
	                             IFS: 'W0000016'
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

	           		 }else{
	           			showmessage.html('<font color=red>删除失败，此工单不是创建状态！</font>');
	           		 }
	           	}
	        });      
		}
	}
	factoryInfo.prototype = {
		init: function() {
			$(function() {
				var ajaxParam2={
                    url:'/iPlant_ajax',
                    data:{
                        IFS:'W0000025',
                    },
                    successCallBack:function(data){
                    	$('#orderStatus').combobox('clear');
                        var rowCollection=createSourceObj(data); 
                        var arr = [];
                        arr.push({"value":"", "text":"全部"});
                        for(var i=0; i< rowCollection.length; i++){
                        	arr.push({"value":rowCollection[i].DICT_IT, "text":rowCollection[i].DICT_IT_NM});
                        }
                        $('#orderStatus').combobox({
                            data:arr,
                            valueField:'value',
                            textField:'text',
                            panelWidth:150
                        });
                    }
                }
                iplantAjaxRequest(ajaxParam2);
				var ajaxParam3={
	                    url:'/iPlant_ajax',
	                    data:{
	                        IFS:'B000025',
	                    },
	                    successCallBack:function(data){
	                    	$('#workShops').combobox('clear');
	                        var rowCollection=createSourceObj(data); 
	                        var arr = [];
	                        arr.push({"value":"", "text":"全部"});
	                        for(var i=0; i< rowCollection.length; i++){
	                        	arr.push({"value":rowCollection[i].PL_CD, "text":rowCollection[i].PL_NM});
	                        }
	                        $('#workShops').combobox({
	                            data:arr,
	                            valueField:'value',
	                            textField:'text',
	                            panelWidth:150
	                        });
	                    }
	                }
	            iplantAjaxRequest(ajaxParam3);
				
				/*初始化全局变量对象*/
				dataGrid = $('#WorkOrderMaterialInformationQuery_tab'),dataMO=[],dataWorkshop=[],dataBOM=[],dataCompany=[],dataMaterielType=[],dataTmp=[],dataFactory=[],showmessage=$('#showMessageInfo'),editIndex = undefined,oldRow=undefined, reg=new RegExp("null","g");
				initGridData();											
				var MO_NO;
				$('#btnSearch').click(function() {	
					var dgrid = dataGrid.datagrid('options');
					searchDataGrid(dgrid);
				});
				
				/*MQTT下发*/
				$('#btnMQtt').click(function() {	
					MQTTFun();
				});
				
				
				$('#btnAdd').click(function() {
					ccIndex= 0;
					eeEndEdit('WorkOrderMaterialInformationQuery_tab');
					var initData = {};
					if(dataMaterielType.length>0 && dataTmp.length>0 && dataWorkshop.length>0 && dataFactory.length>0  && dataCompany.length>0 && dataBOM.length>0  && dataMO.length>0){
						$('#WorkOrderMaterialInformationQuery_tab').datagrid('insertRow',{WO_STATE_NM:'创建',WO_NO:'系统自动生成',FCT_CD:dataTmp[0].value,WC_CD:dataWorkshop[0].value,WO_STATE:'1',ITEM_TYPE:dataMaterielType[0].value,REM_PO_QTY:0,PROD_TYPE:'组装工单',UGT_TYPE:dataGrade[0].value});
						$('#WorkOrderMaterialInformationQuery_tab').datagrid('selectRow', 0).datagrid('beginEdit', 0); 
					}
					insertDataGrid('WorkOrderMaterialInformationQuery_tab',initData);
				});
				
				$('#btnDelete').click(function(){
					deleteDataGrid();
	            });
				
				$('#btnReleased').click(function(){
					releasedDataGrid();					/*释放*/
	            });
				
				$('#btncomplete').click(function(){
					completeDataGrid();					/*完工*/
	            });
				
				$('#btnpause').click(function(){
					pauseDataGrid();					/*暂停*/
	            });
				
				$('#btncountermand').click(function(){
					countermandDataGrid();					/*取消*/
	            });
				/*修改为次单*/
				$('#btnSingle').click(function(){
					updateByMoNoStateSingle();		      
	            });
				/*修改为主单*/
				$('#btnMainSingle').click(function(){
					updateByMoNoStateMainSingle();			  
	            });
				
				$('#btnSave').click(function() {
					saveDataGrid();
				});
				
				$('#btnImport').click(function() {						
					OpenImprotFramedr();
				});
				
				$('.panel-tool-close').click(function() {
					setDataNull();
				});
				
				$('#btnExprt').click(function(){						/*导出*/
				 	var now = new Date();
                    var year =now.getFullYear();
                	var reqData = {
                			IFS:'W000001'
                	}
                	createTable('tbIMESReport','工单物料信息导出','WorkOrderMaterialInformationQuery_tab',reqData);
	            });
				
				$('#btnRelated').click(function() {
					RelatedMo();
				});
			});
		}
	}
	var fcfo = new factoryInfo();var ccIndex= 0,WONO,PRODTYPE;/*全局索引;*/
	fcfo.init();var BOM = {};
	var ETdataTmp;
})();