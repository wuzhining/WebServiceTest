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
				IFS: 'W000001',
				MO_NO:search_MaterialType,
				WC_CD:workshops,
				MO_STATE:orderstatus,
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
		iplantAjaxRequest(tmp);
		
		var pi = {
                url: "/iPlant_ajax",
                dataType: "JSON",
                data: {
                    IFS: "MB00038"
                },
                successCallBack: function(a) {
                	dataMaterielType = [];
                	var op = a.RESPONSE[0].RESPONSE_DATA;
                    $.each(op,function(n,obj) {
                    	if(obj.DICT_IT != 'MAT'){
                    		dataMaterielType.push({'value':obj.DICT_IT,'text':obj.DICT_IT_NM});
                    	}
				    });  
                },
                errorCallBack: function() {
                    $.messager.alert("提示","请联系管理员，查询失败！");
                }
            };
    		iplantAjaxRequest(pi);
    		
    		
    	var DictionaryMoType = {
            url: "/iPlant_ajax",
            dataType: "JSON",
            data: {
                IFS: "W0000035"
            },
            successCallBack: function(a) {
            	dataProdType = [];
            	var op = a.RESPONSE[0].RESPONSE_DATA;
                $.each(op,function(n,obj) {
                	dataProdType.push({'value':obj.DICT_IT,'text':obj.DICT_IT_NM});
			    });  
            },
            errorCallBack: function() {
                $.messager.alert("提示","请联系管理员，查询失败！");
            }
        };
		iplantAjaxRequest(DictionaryMoType);
		
		
		var tmpAttr = {
            url: "/iPlant_ajax",
            dataType: "JSON",
            data: {IFS: "W000005"},
            successCallBack: function(a) {
            	dataTmpAttr = [];
            	var op = a.RESPONSE[0].RESPONSE_DATA;
                $.each(op,function(n,obj) {
                	dataTmpAttr.push({'value':obj.PO_ATTR,'text':obj.PO_ATTR});
                	POATTR[a.RESPONSE[0].RESPONSE_DATA[n].PO_ATTR]=a.RESPONSE[0].RESPONSE_DATA[n].PO_ATTR_NM;
			    });  
            },
            errorCallBack: function() {
                $.messager.alert("提示", '请联系管理员，查询失败！')
            }
        };
	   iplantAjaxRequest(tmpAttr);
		
			
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
					
				bom2 = {
		                url: "/iPlant_ajax",
		                dataType: "JSON",
		                data: {IFS:'Z000053'},
		                successCallBack: function(a) {
		                	dataBOM = [];
		                	var op = a.RESPONSE[0].RESPONSE_DATA;
		                    $.each(op,function(n,obj) {
		                    	dataBOM.push({'text':obj.BOM_CD+"("+obj.BOM_NM+")"+"-"+obj.VERSION,'value':obj.BOM_CD+"-"+obj.VERSION});
		                    	BOM[obj.BOM_CD+"-"+obj.VERSION]=obj.BOM_NM;
		                    	itemCDS[obj.BOM_CD+"-"+obj.VERSION] = obj.BOM_CD;
						    });  
		                },
		                errorCallBack: function() {
		                    $.messager.alert("提示", '请联系管理员，查询失败！')
		                }
		            };
				iplantAjaxRequest(bom2);	
				
		dataGrade=[{'value':'一级','text':'一级'},{'value':'二级','text':'二级'},{'value':'三级','text':'三级'}];
		/*dataProdType=[{'value':'SMT','text':'SMT(贴片机)'},{'value':'ZZ','text':'ZZ(组装)'}];*/
		bindGridData = function(reqData, jsonData) {
			var gridList = {
				name: 'WorkOrderMaterialInformationQuery_tab',
				dataType: 'json',
				columns: [[
				           	{field : "CZ",width : 10,checkbox : true},
			        	    {field: 'FCT_CD',title: '工厂名称',width: 120,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + ( row.FCT_NM  || value)+ "</span>";},
				           		   	   editor:{type:'combobox',options:{valueField:'value',textField:'text',data:dataTmp,required:true,editable:false}}},
						    {field: 'WC_CD',title: '车间',width: 100,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" +  value + "'>" +  (row.WC_NM || value)+ "</span>";},
				           			   editor:{type:'combobox',options:{valueField:'value',textField:'text',data:dataWorkshop,required:true,editable:false}}}, 
							{field:'MO_NO',title:'工单号',width:150,align:'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},
									   options:{validType:['length[0,30]','specialTextCharacter']}},
						    {field:'MO_STATE_NM',title:'工单状态',width:80,align:'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},
									   options:{validType:['length[0,30]','specialTextCharacter']}},   
							{field:'ITEM_CD_VERSION',title: '物料编码-版本号', width:250,align:'center',
		 	                        editor:{  
		 	                            type:'combobox',
		 	                            options:{
		 	                            	required:true,
		 	                            	valueField:'value',
		 	                                textField:'text',
		 	                                panelWidth:250,
		 	                                panelHeight:250,
		 	                                editable:true,
		 	                                data:dataBOM,
		 	                                onSelect:function(data){
		 										var target = $('#WorkOrderMaterialInformationQuery_tab').datagrid('getEditor', {'index':ccIndex,'field':'ITEM_NM'}).target;
		 										target.textbox('setValue', BOM[data.value]);
		 										
		 										var arr = data.text.split('-');
		 										var version = arr[arr.length-1];
		 										
		 										var target2 = $('#WorkOrderMaterialInformationQuery_tab').datagrid('getEditor', {'index':ccIndex,'field':'VERSION'}).target;
		 										target2.textbox('setValue', version);
		 										
		 										var target3 = $('#WorkOrderMaterialInformationQuery_tab').datagrid('getEditor', {'index':ccIndex,'field':'ITEM_CD'}).target;
		 										target3.textbox('setValue', itemCDS[data.value]);
		 									}
		 	                            }    
		 	                        }
		 	                      },
		 	                {field:'ITEM_CD', hidden:true,title: '物料名称', width:120,align:'center',editor:{type:'textbox',options:{editable:false}}},
		 	                {field:'ITEM_NM', title: '物料名称', width:120,align:'center',editor:{type:'textbox',options:{editable:false}}},   
		 	                {field:'VERSION', title: '版本号', width:120,align:'center',editor:{type:'textbox',options:{editable:false}}}, 
							{field: 'ITEM_TYPE',title: '物料类型',width: 80,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" +  value + "'>" +  (row.ITEM_TYPE_NM || value)+ "</span>";},
							    editor:{type:'combobox',options:{valueField:'value',textField:'text',data:dataMaterielType,required:true,editable:false}}}, 
						    
							{field: 'PROD_TYPE',title: '工单类型',width: 120,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" +  value + "'>" +  (row.PROD_TYPE_NM || value)+ "</span>";},
							    editor:{type:'combobox',options:{valueField:'value',textField:'text',data:dataProdType,required:true,editable:false}}}, 
							
						    /*{field: 'MD_V',title: '机型版本信息',hidden:'true',width: 200,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" +  value + "'>" +  (row.DICT_IT_NM || value)+ "</span>";},editor:{type:'validatebox',
					        	   options:{ required:true,validType:['length[1,200]','specialTextCharacter']}}}, 
			        	    {field: 'C_SOFT_V',title: '客户软件版本信息',hidden:'true',width: 200,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" +  value + "'>" +  (row.DICT_IT_NM || value)+ "</span>";},editor:{type:'validatebox',
				        	       options:{ required:true,validType:['length[1,200]','specialTextCharacter']}}}, 
			        	    {field: 'OD_CHIP',title: '订单和主芯片信息',hidden:'true',width: 200,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" +  value + "'>" +  (row.DICT_IT_NM || value)+ "</span>";},editor:{type:'validatebox',
				        	       options:{ required:true,validType:['length[1,200]','specialTextCharacter']}}}, */
							
							{field: 'PLAN_STRT_DT',title: '计划开始日期',width: 200,align: 'center',formatter:function(value,row,index){if(row.PLAN_STRT_DT){return row.PLAN_STRT_DT;}},
			            		   editor:{type:'datebox',options:{required:true,editable:true}}}, 
							{field: 'PLAN_END_DT',title: '计划结束日期',width: 200,align: 'center',formatter:function(value,row,index){if(row.PLAN_END_DT){return row.PLAN_END_DT;}},
			            		   editor:{type:'datebox',
			            			   		options:{
			            			   			required:true,
			            			   			editable:true,
					            			    onSelect : function(date){
					            			    	var target = $('#WorkOrderMaterialInformationQuery_tab').datagrid('getEditor', {'index':ccIndex,'field':'PLAN_STRT_DT'}).target;
					            			    	var target2 = $('#WorkOrderMaterialInformationQuery_tab').datagrid('getEditor', {'index':ccIndex,'field':'PLAN_END_DT'}).target;
			 										var startTime = target.datebox('getValue')
			 														.split("-");
			 										var endTime = (date.getFullYear()+":"+(date.getMonth()+1)+":"+date.getDate())
														.split(":");
			 										
			 										var starttime = new Date(startTime[0], startTime[1], startTime[2]);
			 										var starttimes = starttime.getTime();
			 										
			 										var endtime = new Date(endTime[0], endTime[1], endTime[2]);
			 										var endtimes = endtime.getTime();
			 										if(starttimes > endtimes){
			 											$.messager.alert("提示", '开始时间不能大于结束时间！');
			 											target.datebox('setValue','');
			 											target2.datebox('setValue','');
			 										}
						            		    }
			            			   		}
			            		   		}
							}, 
	            		    
		        		    {field: 'PLAN_PO_QTY',title: '工单计划产量',width: 85,align: 'right',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'numberbox', options:{precision:0,min:1,required:true}}, 
				            	   formatter:function(value,row,index){ return formatNumber(value,0); }},
		            	    {field: 'PLAN_WO_QTY',title: '排产数量',width: 80,align: 'right',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
		            	    {field: 'REM_PO_QTY',title: '剩余数量',width: 80,align: 'right',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
		            	    {field: 'CAR_BO_QTY',title: '载具拼版数',width: 80,align: 'right',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'numberbox', options:{precision:0,required:true}}, 
				            	   formatter:function(value,row,index){ return formatNumber(value,0); }},
		            	    {field: 'CYCTM',title: '周期',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
					        	   options:{validType:['length[0,30]','specialTextCharacter']}}},
			        	    {field: 'CAPA',title: '产能',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
				        	       options:{validType:['length[0,30]','specialTextCharacter']}}},	   
		            	    {field: 'UGT_TYPE',title: '紧急等级',width: 100,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" +  value + "'>" +  (row.UGT_TYPE ||value)+ "</span>";},
								   editor:{type:'combobox',options:{valueField:'value',textField:'text',data:dataGrade,editable:false}}},
		            	    {field: 'SO_NO',title: '销售订单',width: 80,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" +  value + "'>" +  (row.DICT_IT_NM || value)+ "</span>";},editor:{type:'validatebox',
					        	   options:{ validType:['length[0,30]','specialTextCharacter']}}}, 
							{field: 'NXT_OPER',title: '后工程',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
					        	   options:{validType:['length[0,30]','specialTextCharacter']}}},
			        	    {field: 'PRF_CD',title: '工艺流程',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
				        	   options:{validType:['length[0,30]','specialTextCharacter']}}},
				        	{field: 'img1',title: '排产信息',width: 80,align: 'center',formatter:function(row){
					        		return "<img href='javascript:void(0)' class='easyui-linkbutton' onclick='openDialogFrame(1)'  src='../../../common/IplantCompent/themes/default/images/Folder.png'/>"}},
			        		{field: 'img2',title: '工单属性',width: 80,align: 'center',formatter:function(){
				        		    return "<img href='javascript:void(0)' class='easyui-linkbutton' onclick='openDialogFrame(2)'  src='../../../common/IplantCompent/themes/default/images/Folder.png'/>"}},
		        		    {field: 'img3',title: '产品BOM',width: 80,align: 'center',formatter:function(){
			        		    return "<img href='javascript:void(0)' class='easyui-linkbutton' onclick='openDialogFrame(3)'  src='../../../common/IplantCompent/themes/default/images/Folder.png'/>"}}, 
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
			    	 
			    	 var edditypepro = $(this).datagrid('getEditor', {index: index,field: 'PROD_TYPE'});
			    	 row.PROD_TYPE = $(edditypepro.target).combobox('getValue');
			    	 row.PROD_TYPE_NM = $(edditypepro.target).combobox('getText');
			    	 
			    	 var edddg = $(this).datagrid('getEditor', {index: index,field: 'UGT_TYPE'});
			    	 row.UGT_TYPE = $(edddg.target).combobox('getValue');
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
						titleName = '排产信息',
						dialogName = 'editTabMSD',
						tabName = 'materialMSD_tab',
						$('#MO_NO').html(row.MO_NO);
						$('#ITEM_CD').html(row.ITEM_CD);
						$('#PLAN_PO_QTY').html(row.PLAN_PO_QTY);
						$('#CRT_ID').html(row.CRT_ID);
						$('#PLAN_STRT_DT').html(row.PLAN_STRT_DT);
						dgrid = $('#materialMSD_tab').datagrid('options'),
						dgrid.ITEM_TYPE = row.ITEM_TYPE,
						dgrid.ITEM_CD = row.ITEM_CD,
						dgrid.ITEM_NM = row.ITEM_NM,
						dgrid.UGT_TYPE = row.UGT_TYPE,
						dgrid.FCT_CD = row.FCT_CD,
						dgrid.MO_NO = row.MO_NO,
						dgrid.WC_CD = row.WC_CD,
						reqData = {IFS: 'W0000013',MO_NO:row.MO_NO,pageIndex: 1,pageSize: dgrid.pageSize};
						openDialogFrame(tabName,dialogName,titleName,reqData);
		        	}else if(field=='img2'){
		        		endEditingAll(dataGrid);
		        		dgrid = $('#MaterialView').datagrid('options'),
		        		tabName = 'MaterialView',
		        		dialogName = 'editTabSet',
		        	    titleName  = '工单属性',
						dgrid.FCT_CD = row.FCT_CD,
						dgrid.MO_NO = row.MO_NO,
						reqData = {IFS: 'W000005',pageIndex: 1,pageSize: dgrid.pageSize};
						openDialogFrame(tabName,dialogName,titleName,reqData);
		        	}else if(field=='img3'){
						OpenFrameAttribute(row.ITEM_CD);
		        	}else{
		        		if (editIndex != index){
		    	    		var ed,fc,editorFt;
		    	    		if(editIndex!=undefined){
		    					/**判断是否为新增行，并验证新增工厂编码重复*/
		    	    			rowEdit = dataGrid.datagrid('getRows')[editIndex]/*,editem = $(this).datagrid('getEditor', {index: editIndex,field: 'ITEM_CD'}),editorFt = editem.target,itemCd = editorFt.val()*/;
		    	    			if(checkNotEmpty(rowEdit.editType)){
		    	    				if(rowEdit.editType=='add'){
		    	    				}else{
		    	    					addDatagridEditor(dataGrid,index);
		    	    					
		    	    				}
		    	    			}
		    	    		
		    	    		}
		    	    	}
		        	}
		        	
		        	if(row.MO_STATE!=1){
		        		return;       /*只有创建状态才能修改删除*/
		        	}
		        	if(field=='img1'){
		        		return;
		        	}
		        	if(field=='img2'){
		        		return;
		        	}
		        	/**判断是否为可编辑字段*/
		        	addDatagridEditor(dataGrid,index);
		        },
		        /**单击进入编辑模式*/
			}
			initGridMultiView(reqData, gridList);
			dataGrid.datagrid('loadData', jsonData);
		},
		
		/**
		 * 工单维护-产品BOM弹框
		 * @param ITEM_CD
		 */
		OpenFrameAttribute = function(ITEM_CD){
			$("#editTabBOM").dialog("open").dialog('setTitle', 'BOM明细');
			var dgrid = dataGrid2.datagrid('options');
			if(!dgrid) return;
			var reqData = {
					IFS: 'Z000033',
					ITEM_CD:ITEM_CD,
					pageIndex: 1,
					pageSize: dgrid.pageSize
			}
		   reqTreeGridData('/iPlant_ajax', 'editTabBOM_tab', reqData);
		},
		
		eeEndEdit = function(str){
			var rows = $('#'+str).datagrid('getRows');
			if(rows.length>0){
				for(var i=0; i<rows.length; i++){
					$('#'+str).datagrid('endEdit',i);
				}
			}
		},
		
		bindTreeGridData = function(reqData,jsonData) {
			var gridList = {
				name: 'editTabBOM_tab',
		        parentField: "_parentId",
		        textFiled: "ST_C_CD",
		        idField: "ST_C_CD",
		        treeField:"ST_C_CD",
		        state: "closed",
		        pagination: true,
	            pageSize: 3,
	            pageList: [3,10,15],
				dataType: 'json',
				columns: [[
					{field: 'ST_C_CD',title: 'BOM编码',width: 170,align: 'left',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
						  options:{required:true, validType:['length[1,50]','specialTextCharacter']}}},	  
				    {field: 'ST_C_NM',title: 'BOM名称',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
		        	      options:{validType:['length[1,400]','specialTextCharacter']}}},			  
		            {field: 'ST_P_CD',title: '母BOM编码',width:130 ,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
						  options:{ validType:['length[1,50]']}}},	
				    {field: 'ST_P_NM',title: '母BOM名称',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
		 	    	      options:{ validType:['length[1,400]','specialTextCharacter']}}},
				    {field: 'FT_NM',title: '工厂名称',width: 120,align: 'center'},	  
		    		{field: 'UNIT_QTY',title: '单机用量',width: 60,align: 'right',editor:{type:'numberbox', options:{precision:8}}, 
	            	      formatter:function(value,row,index){ return formatNumber(value,0);}},	 		
	    		    {field: 'VALID_STAT_DT',title: '有效开始日期',width: 150,align: 'center',formatter:function(value,row,index){if(row.VALID_STAT_DT){return row.VALID_STAT_DT;}},
            		     editor:{type:'datebox',}}, 
    	    		{field: 'VALID_END_DT',title: '有效结束日期',width: 150,align: 'center',formatter:function(value,row,index){if(row.VALID_END_DT){return row.VALID_END_DT;}},
	            		   editor:{type:'datebox',}}, 
    	    		{field: 'MD_CL',title: '成型周期',width:60,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'numberbox', options:{precision:0}}, 
		            	      formatter:function(value,row,index){ return formatNumber(value,0);}},
    	    		{field: 'USE_YN',title: '是否启用',width: 100,align: 'center',formatter: function(value, row, index) {if(value == 'Y') { return '是';} else { return '否';}},
					      editor:{type:'checkbox',options:{on: 'Y',off: 'N'}}},
					{field: 'CRT_DT',title: '创建时间',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
				]]
			}
			initTreeGrid(reqData, gridList);
			dataGrid2.treegrid('loadData', jsonData);
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
		$(function(){
        	$("#tt").tabs({
        		onSelect:function(data){
        			var tab=$("#tt").tabs("getSelected");
        			var index=$("#tt").tabs("getTabIndex",tab);
        			if(index==1&&data=='设置'){
        				endEditingAll(dataGrid);
		        		dgrid = $('#MaterialView').datagrid('options'),
		        		$("#titleMO").html("<label>工单号："+dgrid.MO_NO+""),
		        		tabName = 'MaterialSetiing',
		        		dialogName = 'editTabSet',
		        	    titleName  = '工单属性',
						reqData = {IFS: 'W000009',MO_NO:dgrid.MO_NO,pageIndex: 1,pageSize: dgrid.pageSize};
		        		openDialogFrame(tabName,dialogName,titleName,reqData);
        			}
        		}
        	});
        });
		
		dialogEditorDataGrid = function(tabName,reqData, jsonData) {
			/*根据tabName判断哪个列表*/
			var columnsTab,edDataGrid,messageInfo;
			if(tabName=='materialMSD_tab'){
				columnsTab=[
				            {field: 'ITEM_TYPE',title: '物料类型',width: 80,align: 'center',hidden:true,formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" +  value + "'>" +  (row.ITEM_TYPE_NM || value)+ "</span>";},
				            		editor:{type:'combobox',options:{valueField:'value',textField:'text',data:dataMaterielType,required:true,editable:false}}}, 
				            {field: 'UGT_TYPE',title: '紧急等级',width: 100,align: 'center',hidden:true,formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" +  value + "'>" +  (row.UGT_TYPE ||value)+ "</span>";},
									 editor:{type:'combobox',options:{valueField:'value',textField:'text',data:dataGrade,editable:false}}},
					        {field: 'WO_NO',title: '排产号',width: 180,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
						        	   options:{validType:['length[1,100]','specialTextCharacter']}}},
			        	   {field: 'LINE_CD',title: '线别',width: 80,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + ( row.LINE_NM  || value)+ "</span>";},
	            			   editor:{type:'combobox',options:{valueField:'value',textField:'text',data:dataFactory,required:true}}}, 
            			   {field: 'SHIFT_CD',title: '班组',width: 80,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + ( row.SHIFT_NM  || value)+ "</span>";},
							   editor:{type:'combobox',options:{valueField:'value',textField:'text',data:dataCompany,required:true}}}, 
							{field: 'PLAN_WO_QTY',title: '排产数量',width: 80,align: 'right',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'numberbox', options:{precision:0,required:true,min:0,
								onChange:function(newValue,oldValue){
									contrast();
								}
								}
							}, 
									      formatter:function(value,row,index){ return formatNumber(value,0); }},
							{field: 'ITEM_CD',title: '物料编码',width: 150,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" +  value + "'>" +  (value)+ "</span>";},
									editor:{type:'combobox',options:{valueField:'value',textField:'text',data:dataBOM,required:true,disabled:true}}},
							{field: 'ITEM_NM',title: '物料名称',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
			        	   {field: 'PLAN_STRT_DT',title: '计划开始时间',width: 200,align: 'center',formatter:function(value,row,index){if(row.PLAN_STRT_DT){return row.PLAN_STRT_DT;}},
			            		   editor:{type:'datebox',options:{required:true,editable:false}}},
	            		   {field: 'PLAN_END_DT',title: '计划完成时间',width: 200,align: 'center',formatter:function(value,row,index){if(row.PLAN_END_DT){return row.PLAN_END_DT;}},
				            		   editor:{type:'datebox',options:{required:true,editable:false}}}
									        	   ];
				edDataGrid = $('#'+tabName);
				messageInfo = $('#showMSDInfo');
			}else if(tabName=='MaterialSetiing'){
				columnsTab=[
							{field: 'FCT_CD',title: '工厂名称',width: 120,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + ( row.FCT_NM  || value)+ "</span>";},
				           		   editor:{type:'combobox',options:{valueField:'value',textField:'text',data:dataTmp,required:true,editable:false}}},
				           	{field: 'MO_NO',title: '工单编号',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox'}},
							{field: 'SEQ',title: '序号',width: 10,hidden:true,align: 'center',hidden:true,formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox'}},						    
							{field:'PO_ATTR',title: '工单属性', width:120,align:'center',
	 	                        editor:{  
	 	                            type:'combobox',
	 	                            options:{
	 	                            	valueField:'value',
	 	                                textField:'text',
	 	                                panelWidth:120,
	 	                                panelHeight:120,
	 	                                editable:false,
	 	                                data:dataTmpAttr,
	 	                                onSelect:function(data){	
	 										var target = $('#MaterialSetiing').datagrid('getEditor', {'index':ccIndex,'field':'PO_ATTR_NM'}).target;
	 										target.textbox('setValue', POATTR[data.value]);
	 									}
	 	                            }    
	 	                        }
	 	                      },
	 	                     {field:'PO_ATTR_NM', title: '工单属性名称', width:150,align:'center',editor:{type:'textbox',options:{editable:false}}}, 
								
							{field: 'PO_ATTR_VAL',title: '工单属性值',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
								options:{required:true,validType:['length[1,50]','specialTextCharacter']}}},
							{field: 'MO',title: '备注',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
								options:{validType:['length[1,50]','specialTextCharacter']}}},
							{field: 'USE_YN',title: '是否启用',width: 80,align: 'center',formatter: function(value, row, index) {if(value == 'Y') { return '启用';} else { return '未启用';}},editor:{type:'checkbox',options:{on: 'Y',off: 'N'}}},
							{field: 'CRT_ID',title: '创建人',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
							{field: 'CRT_DT',title: '创建时间',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
							{field: 'UPT_ID',title: '修改人',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
							{field: 'UPT_DT',title: '修改时间',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}
							
						];
						edDataGrid = $('#'+tabName);
						messageInfo = $('#showSetInfo');
			}else if(tabName=="MaterialView"){
				columnsTab=[
							{field: 'FCT_CD',title: '工厂名称',width: 120,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + ( row.FCT_NM  || value)+ "</span>";},
				           		   editor:{type:'combobox',options:{valueField:'value',textField:'text',data:dataTmp,required:true,editable:false}}},						    
							{field: 'PO_ATTR',title: '工单属性',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
							    options:{required:true, validType:['length[1,30]','specialTextCharacter']}}},
							{field: 'PO_ATTR_NM',title: '工单属性名称',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
								options:{required:true, validType:['length[1,30]','specialTextCharacter']}}},
							{field: 'MO',title: '备注',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
								options:{validType:['length[1,100]','specialTextCharacter']}}},
							{field: 'USE_YN',title: '是否启用',width: 80,align: 'center',formatter: function(value, row, index) {if(value == 'Y') { return '启用';} else { return '未启用';}},editor:{type:'checkbox',options:{on: 'Y',off: 'N'}}},
							{field: 'CRT_ID',title: '创建人',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
							{field: 'CRT_DT',title: '创建时间',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
							{field: 'UPT_ID',title: '修改人',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
							{field: 'UPT_DT',title: '修改时间',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}
						];
				edDataGrid = $('#'+tabName);
				messageInfo = $('#showViewInfo');
			}else if(tabName=='editTabBOM_tab'){
				columnsTab=[
							{field: 'FCT_NM',title: '工厂名称',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
								   options:{required:true, validType:['length[1,50]','specialTextCharacter']}}},  
							{field: 'MO_NO',title: '工单号',width: 120,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
								   options:{required:true, validType:['length[1,50]','specialTextCharacter']}}},
							{field: 'MAT_CD',title: 'Mat编码',width: 120,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
								   options:{required:true, validType:['length[1,50]','specialTextCharacter']}}},
							{field: 'MAT_NM',title: 'Mat名称',width: 160,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
								   options:{required:true, validType:['length[1,400]','specialTextCharacter']}}},
						    {field: 'PRF_CD',title: '工艺代码',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
						          options:{required:true, validType:['length[1,400]','specialTextCharacter']}}},	   
						    {field: 'PRF_NM',title: '工艺名称',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
							       options:{required:true, validType:['length[1,400]','specialTextCharacter']}}},
							{field: 'UOM',title: '单位',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
								   options:{required:true, validType:['length[1,50]','specialTextCharacter']}}}, 
							{field: 'UNIT_QTY',title: '单位数量',width: 80,align: 'right',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + ( row.CP_NM  || value)+ "</span>";},editor:{type:'validatebox',
								   options:{required:true, validType:['length[1,30]','specialTextCharacter']}}}, 
							{field: 'PLAN_PO_QTY',title: '总计划数量',width: 80,align: 'right',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + ( row.CP_NM  || value)+ "</span>";},editor:{type:'validatebox',
							 	   options:{required:true, validType:['length[1,30]','specialTextCharacter']}}}, 
							{field: 'REQ_QTY',title: '发料数量',width: 80,align: 'right',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + ( row.CP_NM  || value)+ "</span>";},editor:{type:'validatebox',
							 	   options:{required:true, validType:['length[1,30]','specialTextCharacter']}}},
							{field: 'STD_QTY',title: '标准用量',width: 80,align: 'right',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + ( row.CP_NM  || value)+ "</span>";},editor:{type:'validatebox',
								   options:{required:true, validType:['length[1,30]','specialTextCharacter']}}},
						    {field: 'REDU_QTY',title: '耗料数量',width: 80,align: 'right',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + ( row.CP_NM  || value)+ "</span>";},editor:{type:'validatebox',
								   options:{required:true, validType:['length[1,30]','specialTextCharacter']}}},
							{field: 'RTN_QTY',title: '退回数量',width: 80,align: 'right',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + ( row.CP_NM  || value)+ "</span>";},editor:{type:'validatebox',
								   options:{required:true, validType:['length[1,30]','specialTextCharacter']}}},
							{field: 'MO',title: '说明',width: 150,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + ( row.CP_NM  || value)+ "</span>";},editor:{type:'validatebox',
							 	   options:{required:true, validType:['length[1,30]','specialTextCharacter']}}},
							{field: 'CRT_ID',title: '创建人',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
							{field: 'CRT_DT',title: '创建时间',width: 180,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
							{field: 'UPT_ID',title: '修改人',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
							{field: 'UPT_DT',title: '修改时间',width: 180,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}];
				edDataGrid = $('#'+tabName);
				messageInfo = $('#showMSDInfo1');
			}
			if(tabName=='editTabBOM_tab'){}
			
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
			    		 var edddgBOM = $(this).datagrid('getEditor', {index: index,field: 'ITEM_CD'});
				    	 row.ITEM_CD = $(edddgBOM.target).combobox('getText');
				    	 row.ITEM_NM = $(edddgBOM.target).combobox('getValue');

			    		 var edddgBOM2 = $(this).datagrid('getEditor', {index: index,field: 'LINE_CD'});
				    	 row.LINE_CD = $(edddgBOM2.target).combobox('getValue');
				    	 row.LINE_NM = $(edddgBOM2.target).combobox('getText');
				    	 
				    	 var edddgBOM3 = $(this).datagrid('getEditor', {index: index,field: 'SHIFT_CD'});
				    	 row.SHIFT_CD = $(edddgBOM3.target).combobox('getValue');
				    	 row.SHIFT_NM = $(edddgBOM3.target).combobox('getText');
			    	 }
			    	 if(tabName=='MaterialView'){
			    		 var edddgView = $(this).datagrid('getEditor', {index: index,field: 'FCT_CD'});
				    	 row.FCT_CD = $(edddgView.target).combobox('getText');
				    	 row.FCT_NM = $(edddgView.target).combobox('getValue');
			    	 }
			    	 if(tabName=='MaterialSetiing'){
				    	 var edddgView1 = $(this).datagrid('getEditor', {index: index,field: 'FCT_CD'});
				    	 row.FCT_CD = $(edddgView1.target).combobox('getText');
				    	 row.FCT_NM = $(edddgView1.target).combobox('getValue');
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
			    	 ccIndex=index;
                	 eeEndEdit('MaterialSetiing');
			    	if (editIndex != index){
			    		var ed,fc,editorFt;
			    		var rows = dataGrid.datagrid('getRows'),row = rows[index];
			    		if(tabName!='editTabBOM_tab'){
				    		if(editIndex!=undefined){
				    			if(tabName=='materialMSD_tab'){
				    				rowEdit = dataGrid.datagrid('getRows')[editIndex]
				    				if(checkNotEmpty(rowEdit.editType)){
					    				if(rowEdit.editType=='add'){
					    					flag=0;
					    					}
					    				else{
					    					flag=1;
					    					addDatagridEditor(edDataGrid,index);
					    				}
					    				}
				    				
				    			}else if(tabName=='MaterialSetiing'){
				    				addDatagridEditor(edDataGrid,index);
				    			}
				    		}else{
				    			addDatagridEditor(edDataGrid,index);
				    		}
			    		}
			    	}
	            }
			}
			initGridView(reqData, gridList);
			$('#'+tabName).datagrid('loadData', jsonData);
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
    		                data:formData,			/*你的formid*/
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
	           		var tmp='';
	           		var arritemcd = '';
	           		 $.each(checkedItems, function (index, item) {
	           			 if(item.MO_STATE!='1'){
	           					tmp=item.MO_NO+","+tmp;	
	           			 }else{
	           				arrUpdate.push({MO_NO:item.MO_NO,MO_STATE:'2'});
	           			 }	           			
	                 });
	           		
	           		/*判断是否已经释放*/
		           		if(tmp!=null && tmp!=''){
	                		$.messager.alert('提示',tmp+"   已释放,不能再次释放"); 
	                		return;
	                	}
		           	/*判断是否已经释放END*/
	           		 
	           		/*判断该工单是否已经配置过工序路线*/
	           		$.each(checkedItems, function (index, item2) {
	           			var ajaxroute = {
		                        url: '/iPlant_ajax',
		                        dataType: 'JSON',
		                        async : false, 
		                        data: {
		                        	ITEM_CD: item2.ITEM_CD,
		                            IFS: 'GX00061'
		                        },
		                        successCallBack: function (data) {
		                        	if(data.RESPONSE[0].RESPONSE_DATA.length <= 0){
		                        		arritemcd=item2.MO_NO+","+arritemcd;	
		                        	}
		                        },
		                        errorCallBack: function (data) {
		                        	showmessage.html('<font color=red>查询产品工序路线配置失败！</font>');
		                            return;
		                        }
		                    };
		                    iplantAjaxRequest(ajaxroute);
	                 });
	           		if(arritemcd!=null && arritemcd!=''){
                		$.messager.alert('提示',arritemcd+"   未进行产品工序路线配置,不能进行释放操作"); 
                		return;
                	}
	           		
	                /*判断该工单是否已经配置过工序路线END*/
	           		 var WC_CD = 1;
	           	    /*批量修改*/
                    var ajaxUpdate = {
                        url: '/iPlant_ajax',
                        dataType: 'JSON',
                        data: {
                            list: arrUpdate,
                            IFS: 'W000003'
                        },
                        successCallBack: function (data) {
                        	showmessage.html('<font color=red>释放成功！</font>');
                        	 var ajaxGenerate = {
                                 url: '/iPlant_ajax',
                                 dataType: 'JSON',
                                 data: {
                                	 WC_CD: WC_CD,
                                     IFS: 'W0000033'
                                 }
                             };
                            iplantAjaxRequest(ajaxGenerate);
                        	initGridData();
                        },
                        errorCallBack: function (data) {
                        	showmessage.html('<font color=red>释放失败！</font>');
                            return;
                        }
                    };
                    iplantAjaxRequest(ajaxUpdate);
	           	}
	        });      
		}
		
		/*排产数量验证*/
		contrast = function (){
			var rowsMSD = $("#materialMSD_tab").datagrid('getRows');
			var total = 0;  
		    for (var i = 0; i < rowsMSD.length; i++) {
		        total += Number(rowsMSD[i]['PLAN_WO_QTY']); /*获取指定列*/  
		    }
		    if(isNaN(total)){
		    	total = 0;
		    }
		    
		    var num = Number($("#PLAN_PO_QTY").html());
		    
	    	var edDataGrid = $('#materialMSD_tab');
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
	                		var newsNum = Number(inserted[m].PLAN_WO_QTY);
	                	}
	                	/*新增*/
	                	total += newsNum;
	                	if(total>num){
					    	$("#showMSDInfo").html('<font color=red>排产数量不能大于计划产量,保存失败！</font>');
					    	inserted[0].PLAN_WO_QTY = '';
					    	return false
					    }else{
					    	$("#showMSDInfo").html('');
					    	return true
					    }
	                }
	                if(updated.length>0){
	                	for(var m=0;m<updated.length;m++){
	                		if(updated[m].edited){
	                			var modifyNum = Number(updated[m].PLAN_WO_QTY);
	                		}	
	                	}
	                	/*修改*/
	                	if(total>num){
					    	$("#showMSDInfo").html('<font color=red>排产数量不能大于计划产量,保存失败！</font>');
					    	updated[0].PLAN_WO_QTY = '';
					    	return false
					    }else{
					    	$("#showMSDInfo").html('');
					    	return true
					    }
	                }
	            }
			}
		},
			
		
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
	           			 if(item.MO_STATE=='4'){
	           					tmp=item.MO_NO+","+tmp;	
	           			 }else{
	           				arrUpdate.push({MO_NO:item.MO_NO,MO_STATE:'4'});
	           			 }	           			
	                 });
	           		 
	           		 
	           	/*批量修改*/
                    var ajaxUpdate = {
                        url: '/iPlant_ajax',
                        dataType: 'JSON',
                        data: {
                            list: arrUpdate,
                            IFS: 'W000003'
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
		
		eeEndEdit = function(str){
			var rows = $('#'+str).datagrid('getRows');
			if(rows.length>0){
				for(var i=0; i<rows.length; i++){
					$('#'+str).datagrid('endEdit',i);
				}
			}
		},
		
		deleteWO = function () {
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
	           			 if(item.MO_STATE!='1'){
	           				 tmp=item.MO_NO+","+tmp;		
	           			 }else{
	           				arrUpdate.push({MO_NO:item.MO_NO,MO_STATE:'2'});
	           			 }	           			
	                 });
	           		 
	           		 if(arrUpdate.length>0){
	     	           	/*批量删除*/
	                     var ajaxUpdate = {
	                         url: '/iPlant_ajax',
	                         dataType: 'JSON',
	                         data: {
	                             list: arrUpdate,
	                             IFS: 'W000004'
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
                            panelWidth:150,
                            panelHeight:150
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
				dataGrid2 = $('#editTabBOM_tab'),dataGrid = $('#WorkOrderMaterialInformationQuery_tab'),dataCompany=[],dataFactory=[],dataWorkshop=[],dataBOM=[],dataMaterielType=[],dataProdType=[],dataTmp=[],dataTmpAttr=[],showmessage=$('#showMessageInfo'),editIndex = undefined,oldRow=undefined, reg=new RegExp("null","g");
				initGridData();
				$('#btnSearch').click(function() {	
					var dgrid = dataGrid.datagrid('options');
					searchDataGrid(dgrid);
				});
				
				$('#btnAdd').click(function() {
					ccIndex= 0;
					eeEndEdit('WorkOrderMaterialInformationQuery_tab');
					if(dataTmp.length>0 && dataTmpAttr.length>0 && dataWorkshop.length>0 && dataBOM.length>0){
						$('#WorkOrderMaterialInformationQuery_tab').datagrid('insertRow',{index:0,row:{MO_STATE_NM:'创建',MO_NO:'系统自动生成',FCT_CD:dataTmp[0].value,WC_CD:dataWorkshop[0].value,MO_STATE:'1',ITEM_TYPE:dataMaterielType[0].value,REM_PO_QTY:0}});
						$('#WorkOrderMaterialInformationQuery_tab').datagrid('selectRow', 0).datagrid('beginEdit', 0); 
					}else{
						var initData = {};
						insertDataGrid('WorkOrderMaterialInformationQuery_tab',initData);
					}
				});
				
				$('#btnDelete').click(function(){
					deleteWO();
	            });
				
				$('#btnMSDAdd').click(function() {	
					var dgrid = $('#materialMSD_tab').datagrid('options');			    
					insertDataGrid('materialMSD_tab',{FCT_CD:dgrid.FCT_CD,WC_CD:dgrid.WC_CD,WO_NO:'系统自动生成',MO_NO:dgrid.MO_NO,WO_STATE:"1",ITEM_CD:dgrid.ITEM_CD,ITEM_NM:dgrid.ITEM_NM,ITEM_TYPE:dgrid.ITEM_TYPE,UGT_TYPE:dgrid.UGT_TYPE});//初始化默认数据
				});
				
				$('#btnMSDDelete').click(function(){
					deleteDataGrid('materialMSD_tab','WO_NO','W0000029','showMSDInfo');
	            });

				$('#btnMSDSave').click(function() {
					saveDataGrid('materialMSD_tab','W0000014','W0000015S','showMSDInfo');
					reqData = {IFS: 'W0000013',MO_NO:$('#materialMSD_tab').datagrid('options').MO_NO,pageIndex: 1,pageSize: 10};
					dialogDataGrid('/iPlant_ajax', 'materialMSD_tab', reqData);
				});
				
				
				$('#btnReleased').click(function(){
					releasedDataGrid();
	            });
				
				$('#btncomplete').click(function(){
					completeDataGrid();
	            });
				
				$('#btnSave').click(function() {
					saveDataGrid('WorkOrderMaterialInformationQuery_tab','W000002','W000003','showMessageInfo');
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
				
				$('#btnViewAdd').click(function() {
					var dgrid = $('#MaterialView').datagrid('options');
					insertDataGrid('MaterialView',{FCT_CD:dgrid.FCT_CD,USE_YN:"Y"});/*初始化默认数据*/
				});
				
				$('#btnViewDelete').click(function(){
					deleteDataGrid('MaterialView','ID','W000008','showViewInfo');
	            });

				$('#btnViewSave').click(function() {
					saveDataGrid('MaterialView','W000006','W000007','showViewInfo');
				});
				
				$('#btnSetDelete').click(function(){
					deleteDataGrid('MaterialSetiing','ID','W0000012','showSetInfo');
	            });
				
				$('#btnSetAdd').click(function() {	
					ccIndex= 0;
					eeEndEdit('materialMSD_tab');
					var dgrid = $('#MaterialSetiing').datagrid('options');
					insertDataGrid('MaterialSetiing',{FCT_CD:dgrid.FCT_CD,MO_NO:dgrid.MO_NO,USE_YN:"Y"});
				});
				
				$('#btnSetSave').click(function() {
					saveDataGrid('MaterialSetiing','W0000010','W0000011','showSetInfo');
				});
				
			});
		}
	}
	var fcfo = new factoryInfo();var ccIndex= 0;/*全局索引;*/
	var POATTR = {};var BOM = {};var itemCDS={};
	fcfo.init();
})();