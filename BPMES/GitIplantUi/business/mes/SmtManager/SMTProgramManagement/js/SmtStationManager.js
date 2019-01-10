/* 启动时加载 */
/*
 */
(function() {
	function factoryInfo() {
		initGridData = function() {
			var dgrid = dataGrid.datagrid('options');
			if(!dgrid) return;
			var searchITEM_CD = $('#searchITEM_CD').textbox('getValue');
			var searchITEM_NM = $('#searchITEM_NM').textbox('getValue');
			var searchPROGRAM_NM = $('#searchPROGRAM_NM').textbox('getValue');
			var searchLINE_NM = $('#searchLINE_NM').textbox('getValue');
			var reqData = {
				IFS: 'ST00001',
				ITEM_CD:searchITEM_CD,
				ITEM_NM:searchITEM_NM,
				PROGRAM_NM:searchPROGRAM_NM,
				LINE_NM:searchLINE_NM,
				pageIndex: 1,
				pageSize: dgrid.pageSize
			}
			reqGridData('/iPlant_ajax', 'SMTPalletStation_tab', reqData);
		};
		
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
		
		/*feeder类型下拉框查询*/
		var feedType = {
	        url: "/iPlant_ajax",
	        dataType: "JSON",
	        data: {
	        	IFS: 'D000008',
	        	DICT_CD: 'FDT01'
	        },
	        successCallBack: function(a) {
	        	dataFeedType = [];
	        	var op = a.RESPONSE[0].RESPONSE_DATA;
	            $.each(op,function(n,obj) {
	            	dataFeedType.push({'value':obj.DICT_IT,'text':obj.DICT_IT_NM});
	            	objFeedType[obj.DICT_IT]=obj.DICT_IT_NM;
			    });  
	        },
	        errorCallBack: function() {
	            $.messager.alert("提示", '请联系管理员，查询失败！')
	        }
	    };
		iplantAjaxRequest(feedType);
		
		dataFeedpw1=[{'value':'L','text':'L'},{'value':'R','text':'R'},{'value':'D','text':'D'}]
		dataGrade=[{'value':'T','text':'正面'},{'value':'B','text':'反面'}];
		dataSdSide=[{'value':'D','text':'单面'},{'value':'S','text':'双面'}];
		bindGridData = function(reqData, jsonData) {
			var gridList = {
				name: 'SMTPalletStation_tab',
				dataType: 'json',
				columns: [[					
					{field: 'FCT_CD',title: '工厂名称',width: 100,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + ( row.FCT_NM  || value)+ "</span>";},
				           editor:{type:'combobox',options:{valueField:'value',textField:'text',data:dataTmp,required:true,editable:false}}},
	           		
				    {field:'ITEM_CD_VERSION',title: '产品编码-版本号', width:250,align:'center',
                        editor:{  
                            type:'combobox',
                            options:{
                            	required:true,
                            	valueField:'value',
                                textField:'text',
                                panelWidth:250,
                                panelHeight:250,
                                editable:false,
                                data:dataBOM2,
                                onSelect:function(data){	
									var target = $('#SMTPalletStation_tab').datagrid('getEditor', {'index':ccIndex,'field':'ITEM_NM'}).target;
									target.textbox('setValue', BOM[data.value]);
									
									var arr = data.text.split('-');
									var version = arr[arr.length-1];
									
									var target2 = $('#SMTPalletStation_tab').datagrid('getEditor', {'index':ccIndex,'field':'VERSION'}).target;
									target2.textbox('setValue', version);
									
									var target3 = $('#SMTPalletStation_tab').datagrid('getEditor', {'index':ccIndex,'field':'ITEM_CD'}).target;
									target3.textbox('setValue', itemCDS[data.value]);
								}
                            }    
                        }
                      },
                    {field:'ITEM_CD', hidden:true,title: '产品编码', width:120,align:'center',editor:{type:'textbox',options:{editable:false}}},
                    {field:'ITEM_NM', title: '产品名称', width:120,align:'center',editor:{type:'textbox',options:{editable:false}}},   
                    {field:'VERSION', title: '版本号', width:120,align:'center',editor:{type:'textbox',options:{editable:false}}},  
				           
	        	    {field: 'PROGRAM_NM',title: '程序名称',width: 150,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + (value)+ "</span>";},editor:{type:'validatebox',
	        	    		options:{validType:['length[1,30]','specialTextCharacter'],required:true}}}, 
	        	    {field: 'LINE_CD',title: '拉线名称',width: 100,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + ( row.LINE_NM  || value)+ "</span>";},
	        	    		editor:{type:'combobox',options:{valueField:'value',textField:'text',data:dataFactory,required:true}}}, 
	        	    {field: 'PANEL_QTY',title: '拼板数',width: 60,align: 'right',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'numberbox', options:{required:true,precision:0,min:0}}, 
		            	   formatter:function(value,row,index){ return formatNumber(value,0); }},
            	    {field: 'SD_SIDE',title: '单双面',width: 80,align: 'center',formatter: function (value,row) {if(value=='D'){return '单面'}else if(value=='S'){}return '双面'},
		            	   editor:{type:'combobox',options:{
		            		   		valueField:'value',
		            		   		textField:'text',
		            		   		data:dataSdSide,
		            		   		required:true,
		            		   		editable:true,
		            		   		onSelect:function(data){
		            		   			var target = $('#SMTPalletStation_tab').datagrid('getEditor', {'index':ccIndex,'field':'PGT_NVG'}).target;
		            		   			target.combobox('setValue','');
		            		   			if(data.value == 'D'){
		            		   				dataGrade=[{'value':'T','text':'正面'}];
		            		   			}else{
		            		   				dataGrade=[{'value':'T','text':'正面'},{'value':'B','text':'反面'}];
		            		   			};
							    		target.combobox('loadData',dataGrade);
		            		   		}
		            	   }}},
	        	    {field: 'PGT_NVG',title: '正反面(T/B)',width: 80,align: 'center',formatter: function (value,row) {if(value=='T'){return '正面'}else if(value=='B'){}return '反面'},
						   editor:{type:'combobox',options:{valueField:'value',textField:'text',data:dataGrade,required:true,editable:true}}},
					{field: 'IF_SIDE',title: '是否已审核',width: 80,align: 'center',formatter: function(value, row, index) {if(value == 'Y') { return '是';} else { return '否';}}},
    			    {field: 'CAPACITY',title: '产能',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
    				   	 options:{validType:['length[1,30]','specialCharacterTextArea']}}},
	        	    {field: 'USE_YN',title: '是否启用',width: 80,align: 'center',formatter: function(value, row, index) {if(value == '1') { return '是';} else { return '否';}},editor:{type:'checkbox',options:{on: '1',off: '0'}}}, 
			        {field: 'MO',title: '备注',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
				           options:{validType:['length[0,50]','specialTextCharacter']}}},
			        {field: 'CRT_ID',title: '创建人',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
					{field: 'CRT_DT',title: '创建时间',width: 180,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
					{field: 'UPT_ID',title: '修改人',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
					{field: 'UPT_DT',title: '修改时间',width: 180,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}
			    ]],
		        /**单击进入编辑模式*/
				onClickRow: function (index,row) {
					ccIndex=index;
					onloadFun(row.ITEM_CD,row.VERSION);
		        	OpenFrameAttribute(row.FCT_CD,row.ITEM_CD,row.PROGRAM_NM,row.VERSION,row.PGT_NVG);
		        	getSelectedNO();
		        	itemName = row.ITEM_NM;
		        	programName = row.PROGRAM_NM;   
		        	addVersion = row.VERSION;
		        	fctNM = row.FCT_NM;
		        	itemCD = row.ITEM_CD;
		    		fctCD = row.FCT_CD;
		    		lineCD = row.LINE_CD;
		    		lineNM = row.LINE_NM;
		    		pgt_nvg = row.PGT_NVG;
		        },
		        /**结束编辑模式的操作*/
			     onEndEdit:function(index,row){
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
		        onDblClickRow: function (index,field,value) {
		        	var tabName,dialogName,titleName,rowEdit,editem,editorFt,itemCd,reqData,dgrid;
		        	var rows = dataGrid.datagrid('getRows'),row = rows[index];
		        	addDatagridEditor(dataGrid,index);
		        	if(!checkNotEmpty(row.editType)){/*如果是修改的情况，ft_cd字段为只读模式*/
			    		ed = $(this).datagrid('getEditor', {index: index,field: 'FCT_CD'});
			    		fc = ed.target;
			    		fc.combobox("disable");
			    		
			    		ed2 = $(this).datagrid('getEditor', {index: index,field: 'ITEM_CD'});
			    		fc2 = ed2.target;
			    		fc2.combobox("disable");
			    		
			    		ed3 = $(this).datagrid('getEditor', {index: index,field: 'PROGRAM_NM'});
			    		fc3 = ed3.target;
			    		fc3.prop('readonly',true);
			    		
			    		ed4 = $(this).datagrid('getEditor', {index: index,field: 'LINE_CD'});
			    		fc4 = ed4.target;
			    		fc4.combobox("disable");
			    		
			    		ed5 = $(this).datagrid('getEditor', {index: index,field: 'VERSION'});
			    		fc5 = ed5.target;
			    		fc5.prop('readonly',true);
		    		}
		        }
			}
			initGridView(reqData, gridList);
			dataGrid.datagrid({"onLoadSuccess":function(data){
			    if(data.rows.length == 0){
			    	OpenFrameAttribute('','','','','');
			    }else{
			    	OpenFrameAttribute(data.rows[0].FCT_CD,data.rows[0].ITEM_CD,data.rows[0].PROGRAM_NM,data.rows[0].VERSION,data.rows[0].PGT_NVG);
			    }
			}}).datagrid('loadData', jsonData);
		}
		
	}
	/*底部的关联表格*/   
	OpenFrameAttribute = function(FCT_CD,ITEM_CD,PROGRAM_NM,VERSION,PGT_NVG){
		var tabName = 'SMTPalletStationInformationQuerybottom_tab';
		var dgridOp = $('#'+tabName).datagrid('options');
		if(!dgridOp) return;
		var reqDataA = {
			IFS: 'ST00010',
			FCT_CD: FCT_CD,			
			ITEM_CD: ITEM_CD,
			PROGRAM_NM: PROGRAM_NM,
			VERSION: VERSION,
			PGT_NVG: PGT_NVG,
			pageIndex: 1,
			pageSize: dgridOp.pageSize	
		}
		dialogDataGrid('/iPlant_ajax', tabName, reqDataA);
		
		stations = {
                url: "/iPlant_ajax",
                dataType: "JSON",
                data: {IFS: "ST00100"},
                successCallBack: function(a) {
                	dataStations = [];
                	var op = a.RESPONSE[0].RESPONSE_DATA;
                    $.each(op,function(n,obj) {
                    	dataStations.push({'value':obj.STACK_LB,'text':obj.STACK_LB});
				    }); 
                },
                errorCallBack: function() {
                    $.messager.alert("提示", '请联系管理员，查询失败！')
                }
            };
		iplantAjaxRequest(stations);
		
		/*贴片区域下拉*/
		PHARE = {
                url: "/iPlant_ajax",
                dataType: "JSON",
                data: {IFS: "ST00100"},
                successCallBack: function(a) {
                	dataGrade2 = [];
                	var pha = [];
                	var new_pha =[];
                	var op = a.RESPONSE[0].RESPONSE_DATA;
                    $.each(op,function(n,obj) {
                    	pha.push(obj.PH_ARE);
				    });  
                    for(var i=0;i<pha.length;i++){
                    	var item = pha[i];
                    	if($.inArray(item,new_pha)== -1){
                    		new_pha.push(item);
                    	}
                    }
                    $.each(new_pha,function(m,phas){
                    	dataGrade2.push({'value':phas,'text':phas})
                    })
                },
                errorCallBack: function() {
                    $.messager.alert("提示", '请联系管理员，查询失败！')
                }
            };
		iplantAjaxRequest(PHARE);
		
		
		/*机器编码下拉*/
		ETCD = {
                url: "/iPlant_ajax",
                dataType: "JSON",
                data: {IFS: "ST00100"},
                successCallBack: function(a) {
                	dataGrade3 = [];
                	var et = [];
                	var new_et =[];
                	var op = a.RESPONSE[0].RESPONSE_DATA;
                    $.each(op,function(n,obj) {
                    	et.push(obj.ET_CD);
				    });  
                    for(var i=0;i<et.length;i++){
                    	var item = et[i];
                    	if($.inArray(item,new_et)== -1){
                    		new_et.push(item);
                    	}
                    }
                    $.each(new_et,function(m,ets){
                    	dataGrade3.push({'value':ets,'text':ets})
                    })
                },
                errorCallBack: function() {
                    $.messager.alert("提示", '请联系管理员，查询失败！')
                }
            };
		iplantAjaxRequest(ETCD);
		
		/*feeder状态下拉框查询*/
		materiel = {
	        url: "/iPlant_ajax",
	        dataType: "JSON",
	        data: {IFS:'ST00037'},
	        successCallBack: function(a) {
	        	dataMaterielType=[];
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
		
		dialogEditorDataGrid = function(tabName,reqDataA, jsonData) {
			var columnsTab,edDataGrid,messageInfo;
			columnsTab=[       	
					{field: 'FCT_CD',title: '工厂编码',hidden:true,width: 100,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + ( row.FCT_NM  || value)+ "</span>";}},
					{field: 'FCT_NM',title: '工厂名称',width: 100,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + ( row.FCT_NM  || value)+ "</span>";}},
		           	{field: 'ITEM_CD',title: '产品编码',width: 150,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" +  value + "'>" +  (value)+ "</span>";}},
	           		{field: 'PROGRAM_NM',title: '程序名称',width: 120,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + (value) + "</span>";}},
	           		{field: 'LINE_CD',title: '产线名称',hidden:true,width: 80,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + ( row.LINE_NM  || value)+ "</span>";}},
		           	{field: 'LINE_NM',title: '拉线名称',width: 120,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + ( row.LINE_NM  || value)+ "</span>";}},  
	           		{field: 'VERSION',title: '版本',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + (value) + "</span>";}},
	           		{field: 'PGT_NVG',title: '正反面',width: 80,align: 'center',formatter: function (value) {if(value=='T'){return '正面'}else if(value=='B'){}return '反面'}},
	           		{field: 'FD_TY',title: '飞达类型',width: 80,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + ( row.FD_TY_NM  || value)+ "</span>";},
	           		       editor:{type:'combobox',options:{valueField:'value',textField:'text',data:dataFeedType,required:true,editable:false}}},
				    {field: 'ET_CD',title: '机器编码',width: 80,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return value},
				       editor:{type:'combobox',options:{valueField:'value',textField:'text',data:dataGrade3,required:true,editable:false,
				    	   onSelect:function(data){	
				    		   var equipment = data.text;
				    		   machine = {
				    	                url: "/iPlant_ajax",
				    	                dataType: "JSON",
				    	                data: {IFS: "ST00100",ET_CD:equipment},
				    	                successCallBack: function(a) {
				    	                	dataMachine = [];
				    	                	var op = a.RESPONSE[0].RESPONSE_DATA;
				    	                	var et=[],new_et=[];
				    	                	$.each(op,function(n,obj) {
				    	                    	et.push(obj.PH_ARE);
				    					    });  
				    	                    for(var i=0;i<et.length;i++){
				    	                    	var item = et[i];
				    	                    	if($.inArray(item,new_et)== -1){
				    	                    		new_et.push(item);
				    	                    	}
				    	                    }
				    	                    $.each(new_et,function(n,pha) {
				    	                    	dataMachine.push({'value':pha,'text':pha});
				    					    }); 
				    	                    var target = $('#SMTPalletStationInformationQuerybottom_tab').datagrid('getEditor', {'index':0,'field':'PH_ARE'}).target;
								    		target.combobox('loadData',dataMachine);
				    	                },
				    	                errorCallBack: function() {
				    	                    $.messager.alert("提示", '请联系管理员，查询失败！')
				    	                }
				    	            };
				    		   iplantAjaxRequest(machine);
							}
				       }}},
				    {field: 'PH_ARE',title: '贴片区域',width: 80,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return value},
					       editor:{type:'combobox',options:{valueField:'value',textField:'text',data:dataGrade2,required:true,editable:false,
					    	   onSelect:function(data){	
					    		   var phAre = data.text;
					    		   stations = {
					    	                url: "/iPlant_ajax",
					    	                dataType: "JSON",
					    	                data: {IFS: "ST00100",PH_ARE:phAre},
					    	                successCallBack: function(a) {
					    	                	dataStations = [];
					    	                	var op = a.RESPONSE[0].RESPONSE_DATA;
					    	                    $.each(op,function(n,obj) {
					    	                    	dataStations.push({'value':obj.STACK_LB,'text':obj.STACK_LB});
					    					    }); 
					    	                    var target = $('#SMTPalletStationInformationQuerybottom_tab').datagrid('getEditor', {'index':0,'field':'STACK_CD'}).target;
									    		target.combobox('loadData',dataStations);
					    	                },
					    	                errorCallBack: function() {
					    	                    $.messager.alert("提示", '请联系管理员，查询失败！')
					    	                }
					    	            };
					    		   iplantAjaxRequest(stations);
								}
					       }}},
			        {field: 'STACK_CD',title: '栈位代码',width: 100,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + (value)+ "</span>";},
        	    		editor:{type:'combobox',options:{valueField:'value',textField:'text',data:dataStations,required:true}}}, 
				    {field: 'FEED_PW',title: '飞达轨道',width: 80,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + (value) + "</span>";},
				           editor:{type:'combobox',options:{valueField:'value',textField:'text',data:dataFeedpw1,required:true,editable:false}}},
		            {field: 'MAT_CD',title: '材料编码',width: 210,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" +  value + "'>" +  (value)+ "</span>";},
					   editor:{type:'combobox',options:{valueField:'value',textField:'text',data:dataBOM,required:true,editable:false}}},
	        	    {field: 'POSIT_NO',title: '位置号',width: 120,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + ( row.CP_NM  || value)+ "</span>";},editor:{type:'validatebox',
		        	   options:{required:true, validType:['length[1,30]','specialTextCharacter']}}},
	        	    {field: 'QTY',title: '用量',width: 60,align: 'right',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'numberbox', options:{required:true,precision:0,min:0}}, 
	            	   formatter:function(value,row,index){ return formatNumber(value,0); }},
	        	    {field: 'USE_YN',title: '是否启用',width: 80,align: 'center',formatter: function(value, row, index) {if(value == 'Y') { return '是';} else { return '否';}},editor:{type:'checkbox',options:{on: 'Y',off: 'N'}}}, 
			        {field: 'MO',title: '备注',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
				           options:{validType:['length[0,50]','specialTextCharacter']}}},
			        {field: 'CRT_ID',title: '创建人',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
					{field: 'CRT_DT',title: '创建时间',width: 180,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
					{field: 'UPT_ID',title: '修改人',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
					{field: 'UPT_DT',title: '修改时间',width: 180,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}];
			
			

			var gridLists = {
				name: tabName,
				dataType: 'json',
				columns: [columnsTab]
			}
			initEditorDataGridView(reqDataA, gridLists);
			$('#'+tabName).datagrid('loadData', jsonData);
		}
	};
	
	
	
	/*是否打印弹出打印预览页面*/
	openPrintPreview = function(PROGRAM_NM,LINE_NM,VERSION,FD_TY,ET_CD,CRT_DT,PH_ARE,STACK_CD,MAT_CD){
		$("#PrintPreview_openDiv").dialog("open").dialog('setTitle', '打印预览页面');

		$("#PROGRAM_NM").textbox('setValue',PROGRAM_NM);
		$("#LINE_NM").textbox('setValue',LINE_NM);
		$("#VERSION").textbox('setValue',VERSION);
		$("#FD_TY").textbox('setValue',FD_TY);
		$("#ET_CD").textbox('setValue',ET_CD);
		$("#PH_ARE").textbox('setValue',PH_ARE);
		$("#STACK_CD").textbox('setValue',STACK_CD);
		$("#txtCRT_ID").textbox('setValue',CRT_ID);
		$("#MAT_CD").textbox('setValue',MAT_CD);
		$("#txtCurrentCount").textbox('setValue',1);
		
	}
	
	
	
	/**
	 * 打印SN
	 * 
	 * @param dgrid
	 */
	saveMesSNcode = function(){
		
		var post = $("#SMTPalletStationInformationQuerybottom_tab").datagrid('getSelections');
		var postLenght = post.length;
		
		var data1=new Array();
		var barCodeList="";
		for (var i=0;i<postLenght;i++){			  			
        		data1.push({"SN":post[i].PROGRAM_NM,"FSNM":"栈位编码","FDSN":post[i].STACK_CD,"FNNM":"机器编码","FDNM":post[i].ET_CD,"TITLE":"栈位标签打印"});
        };
        barCodeStr = {labName:"common01.lab","barCodeList":data1};
		zbSocketPrinter(barCodeStr);
		console.log(barCodeStr)
		$('#PrintPreview_openDiv').dialog('close');
		$.messager.alert("提示", '条码打印完成！');
	}
    	
	
	/*检索*/
	searchDataGrid=function(dgrid){
		initGridData();
	}
	
	deleteDataGrid = function (tabName) {
		if(tabName==1){
			var checkedItems = $('#SMTPalletStation_tab').datagrid('getSelections');
	        if (checkedItems.length==0) {
	            $.messager.alert('提示', '请选择一条数据进行删除');
	            return;
	        }
	        /*确认提示框*/
	        $.messager.confirm('确认框', '您确定要删除您所选择的数据吗?', function (r) {
	           	if(r==true){
	           		var ajaxQuery = {
	                         url: '/iPlant_ajax',
	                         dataType: 'JSON',
	                         data: {
	                        	IFS: 'ST00010',
	                 			FCT_CD: checkedItems[0].FCT_CD,
	                 			ITEM_CD: checkedItems[0].ITEM_CD,
	                 			PROGRAM_NM: checkedItems[0].PROGRAM_NM,
	                         },
	                         successCallBack: function (data) {
	                        	 var  detail = data.RESPONSE[0].RESPONSE_DATA;
	                        	 var detail_len = detail.length;
	                        	 /*循环删除明细*/
	                        	 for(var i=0;i<detail_len;i++){
	                        		 var ajaxUpdateDetail = {
	                                         url: '/iPlant_ajax',
	                                         dataType: 'JSON',
	                                         data: {
	                	                       	 STACK_CD: detail[i].STACK_CD,
	                	                       	 ITEM_CD: detail[i].ITEM_CD,
	                	                       	 PROGRAM_NM: detail[i].PROGRAM_NM,
	                                             IFS: 'ST00013'
	                                         },
	                                         successCallBack: function (data) {
	                                        	 
	                                         },
	                                         errorCallBack: function (data) {
	                                         	showmessage.html('<font color=red>删除失败！</font>');
	                                             return;
	                                         }
	                                     };
	                                     iplantAjaxRequest(ajaxUpdateDetail);
	                        	 };
	                        	 /*删除主表信息*/
	                             var ajaxUpdate = {
	                                 url: '/iPlant_ajax',
	                                 dataType: 'JSON',
	                                 data: {
	                                	 FCT_CD: checkedItems[0].FCT_CD,
	        	                       	 ITEM_CD: checkedItems[0].ITEM_CD,
	        	                       	 PROGRAM_NM: checkedItems[0].PROGRAM_NM,
	        	                       	 VERSION: checkedItems[0].VERSION,    
	                                     IFS: 'ST00004'
	                                 },
	                                 successCallBack: function (data) {
	                                	showmessage.html('<font color=red>删除成功！</font>');
	                                 	initGridData();
	                                 	OpenFrameAttribute(checkedItems[0].FCT_CD,checkedItems[0].ITEM_CD,checkedItems[0].PROGRAM_NM
	                                 			,checkedItems[0].VERSION,checkedItems[0].PGT_NVG);
	                                    return;
	                                 },
	                                 errorCallBack: function (data) {
	                                 	 showmessage.html('<font color=red>删除失败！</font>');
	                                     return;
	                                 }
	                             };
	                             iplantAjaxRequest(ajaxUpdate);
	                         }
	                     };
	           		iplantAjaxRequest(ajaxQuery);
	           	}
	        }); 
		}else if(tabName==2){
			var checkedItems2 = $('#SMTPalletStationInformationQuerybottom_tab').datagrid('getSelections');
	        if (checkedItems2.length==0) {
	            $.messager.alert('提示', '请选择一条数据进行删除');
	            return;
	        }
	        /*确认提示框*/
	        $.messager.confirm('确认框', '您确定要删除您所选择的数据吗?', function (r) {
	           	if(r==true){
     	           	/*批量删除*/
                     var ajaxUpdate = {
                         url: '/iPlant_ajax',
                         dataType: 'JSON',
                         data: {
	                       	 STACK_CD: checkedItems2[0].STACK_CD,
	                       	 ITEM_CD: checkedItems2[0].ITEM_CD,
	                       	 PROGRAM_NM: checkedItems2[0].PROGRAM_NM,
                             IFS: 'ST00013'
                         },
                         successCallBack: function (data) {
                        	showmessage.html('<font color=red>删除成功！</font>');
                        	console.log(checkedItems2[0].PROGRAM_NM);
                        	OpenFrameAttribute(checkedItems2[0].FCT_CD,checkedItems2[0].ITEM_CD,checkedItems2[0].PROGRAM_NM,checkedItems2[0].VERSION,checkedItems2[0].PGT_NVG);
                             return;
                         },
                         errorCallBack: function (data) {
                         	showmessage.html('<font color=red>删除失败！</font>');
                             return;
                         }
                     };
                     iplantAjaxRequest(ajaxUpdate);
	           	}
	        }); 
		}
		     
	}
	
	/*判断主表有无选中行，决定明细表新增按钮是否禁用*/
	getSelectedNO = function(){
		var YN = $('#SMTPalletStation_tab').datagrid('getSelected');
		if(YN == null){
			$("#btnAddBottom").linkbutton("disable");
		}else{
			$("#btnAddBottom").linkbutton("enable");
		}
	}
	
	setDataNull=function(){
		 $('#showFileName').html('');
	},
	
	onloadFun = function(itemCD,version){
		var BOMAA = {
	            url: "/iPlant_ajax",
	            dataType: "JSON",
	            async:false,
	            data: {
	            	IFS: 'ST00122',
	            	ITEM_CD: itemCD,
	            	VERSION:version
	            },
	            successCallBack: function(a) {
	            	dataBOM=[];
	            	var op = a.RESPONSE[0].RESPONSE_DATA;
	                $.each(op,function(n,obj) {
	                	dataBOM.push({'text':obj.BOM_CD+'('+obj.BOM_NM+')','value':obj.BOM_CD});
				    });
	            },
	            errorCallBack: function() {
	                $.messager.alert("提示", '请联系管理员，查询失败！')
	            }
	        };
		iplantAjaxRequest(BOMAA);
	},
	
	/*审核功能*/
	audit = function(item_cd,sd_side,version,pgt_nvg){
		var audit = {
	            url: "/iPlant_ajax",
	            dataType: "JSON",
	            async:false,
	            data: {
	            	IFS: 'ST00121',
	            	ITEM_CD: item_cd,															
	            	VERSION:version,
	            	SD_SIDE:sd_side,
	            	PGT_NVG:pgt_nvg

	            },
	            successCallBack: function(a) {
	            	var callBackCode = a.RESPONSE[0].RESPONSE_DATA[0].ERRCODE;
	            	if(callBackCode == 1){
	            		var msg = a.RESPONSE[0].RESPONSE_DATA[0].MGE;
		            	$.messager.alert("提示", msg);
	            	}else{
	            		$.messager.alert("提示", '审核失败。');
	            	}
	            },
	            errorCallBack: function() {
	                $.messager.alert("提示", '请联系管理员，查询失败！');
	            }
	        };
		iplantAjaxRequest(audit);
	},
	/*审核功能		END*/
	
	insertDataGrid=function (tabName,data){
		var editorDataGrid = $('#'+tabName), row = editorDataGrid.datagrid('getSelected');
			index = 0;
			editIndex = 0;
		editorDataGrid.datagrid('insertRow', {
			index: index,
			row:data
		});
		/**新增一个字段判断是否为新增*/ 
		var rowEdit = editorDataGrid.datagrid('getRows')[index]; 
		rowEdit.editType='add';
		editorDataGrid.datagrid('selectRow',index);
		editorDataGrid.datagrid('beginEdit',index);
		if (editIndex != index){
			if (endEditing(editorDataGrid)){
				editorDataGrid.datagrid('selectRow', index).datagrid('beginEdit', index);
				editIndex = index;
			} else {
				editorDataGrid.datagrid('selectRow', editIndex);
			}
		}else{
			endEditing(editorDataGrid);
		}
	},
	
    saveDataGrid=function(tabName){
		var tabTop = $('#SMTPalletStation_tab');
		var tabBottom = $('#SMTPalletStationInformationQuerybottom_tab');
		//endEditingAll(tabTop);endEditingAll(tabBottom);
		if(tabName == 1){
			 var edDataGrid = $('#SMTPalletStationInformationQuerybottom_tab');
			    if (endEditing(edDataGrid)){
			   /*判断后变更数据*/
			   	if (edDataGrid.datagrid('getChanges').length) {
			           var inserted = edDataGrid.datagrid('getChanges', "inserted");
			           /*验证栈位代码不能重复*/
			            var selectValue = inserted[0].STACK_CD;
	    				var allData = $('#SMTPalletStationInformationQuerybottom_tab').datagrid('getData'),flag=0,len=allData.rows.length;
	    				for(var i=0;i<len;i++){
	    					if(selectValue == allData.rows[i].STACK_CD){
	    	            		flag +=1;
	    	            	}
	    				}
	    				if(flag>1){
    	            		$.messager.alert("提示", '栈位代码已有重复，请重新选择。');
    	            		$('#SMTPalletStationInformationQuerybottom_tab').datagrid('beginEdit',0);
    	            		return;
    	            	}
	    				/*验证栈位代码不能重复END*/
			           
			           var updated = edDataGrid.datagrid('getChanges', "updated");
			           /**装载数据*/
			           var arrInsert = new Array(),arrUpdate = new Array();
			           if(inserted.length>0){
			           	for(var m=0;m<inserted.length;m++){
			           		arrInsert.push(inserted[m]);
			           	}
			           	/*批量先增*/
			               var ajaxInsert = {
			                   url: '/iPlant_ajax',
			                   dataType: 'JSON',
			                   data: {
			                       list: arrInsert,
			                       IFS: 'ST00011'
			                   },
			                   successCallBack: function (data) {
			                   	   edDataGrid.datagrid('acceptChanges');
			                   	   OpenFrameAttribute(fctCD,itemCD,programName,addVersion,pgt_nvg);
			                   	   $('#showMessageInfoBottom').html('<font color=red>保存成功！</font>');
			                       return;
			                   },
			                   errorCallBack: function (data) {
			                   	$('#showMessageInfoBottom').html('<font color=red>保存失败！</font>');
			                       return;
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
			                       list: arrUpdate,
			                       IFS: 'ST00012'
			                   },
			                   successCallBack: function (data) {
			                	   OpenFrameAttribute(fctCD,itemCD,programName,addVersion,pgt_nvg);
			                   	   edDataGrid.datagrid('acceptChanges');
			                   	   $('#showMessageInfoBottom').html('<font color=red>保存成功！</font>');
			                       return;
			                   },
			                   errorCallBack: function (data) {
			                   	   $('#showMessageInfoBottom').html('<font color=red>保存失败！</font>');
			                       return;
			                   }
			               };
			               iplantAjaxRequest(ajaxUpdate);
			           }
			       }else{
			       	$('#showMessageInfoBottom').html('<font color=red>没有进行变更！</font>');
			       }
				}else{
					$('#showMessageInfoBottom').html('<font color=red>请输入必填项！</font>');
				}
		}
		
		if(tabName == 2){
			 var edDataGrid = $('#SMTPalletStation_tab');		
			    if (endEditing(edDataGrid)){					
			   	/*判断后变更数据*/
			   	if (edDataGrid.datagrid('getChanges').length) {
			           var inserted = edDataGrid.datagrid('getChanges', "inserted");  
			           var updated = edDataGrid.datagrid('getChanges', "updated");
			           /**装载数据*/
			           var arrInsert = new Array(),arrUpdate = new Array();
			           if(inserted.length>0){
			           	for(var m=0;m<inserted.length;m++){
			           		arrInsert.push(inserted[m]);
			            	/*批量先增*/
			                var ajaxInsert = {
			                   url: '/iPlant_ajax',
			                   dataType: 'JSON',
			                   data: {
			                       list: arrInsert,
			                       IFS: 'ST00002'
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
			                       list: arrUpdate,
			                       IFS: 'ST00003'
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
			       	$('#showMessageInfo').html('<font color=red>没有进行变更！</font>');
			       }
				}else{
					$('#showMessageInfo').html('<font color=red>请输入必填项！</font>');
				}
		};
		
	},
	
	selectdataBOM = function(){
		var Defer = $.Deferred();          //声明一个Defer对象
		var BOM2 = {
	            url: "/iPlant_ajax",
	            dataType: "JSON",
	            data: {IFS:'Z000053'},
	            successCallBack: function(a) {
	            	dataBOM2 = [];
	            	var op = a.RESPONSE[0].RESPONSE_DATA;	
	                $.each(op,function(n,obj) {
	                	dataBOM2.push({'text':obj.BOM_CD+"("+obj.BOM_NM+")"+"-"+obj.VERSION,'value':obj.BOM_CD+"-"+obj.VERSION});
                    	BOM[obj.BOM_CD+"-"+obj.VERSION]=obj.BOM_NM;
                    	itemCDS[obj.BOM_CD+"-"+obj.VERSION] = obj.BOM_CD;
				    }); 
	                Defer.resolve();               //在Defer对象的resolve状态中把combobox对象传出去
	            },
	            errorCallBack: function() {
	                $.messager.alert("提示", '请联系管理员，查询失败！')
	            }
	        };
			iplantAjaxRequest(BOM2);
			return Defer.promise();                                   //返回一个promise对象
	}
	
	factoryInfo.prototype = {
		init: function() {
			$(function() {
				
				/*初始化全局变量对象*/
				dataGrid = $('#SMTPalletStation_tab'),dataFeedType=[],dataMaterielType=[],dataGrade3=[],dataGrade2=[],dataTmp=[],dataBOM=[],dataStations=[],dataMachine=[],dataBOM2=[],dataFactory=[],dataFeedpw=[],showmessage=$('#showMessageInfo'),editIndex = undefined,oldRow=undefined, reg=new RegExp("null","g");
				selectdataBOM().then(function(){initGridData()});
				$('#btnSearch').click(function() {	
					var dgrid = dataGrid.datagrid('options');
					searchDataGrid(dgrid);
				});
				
				$('#btnAdd').click(function() {
					ccIndex= 0;
					var editData = $('#SMTPalletStation_tab').datagrid('getChanges', "inserted");
					if(editData.length == 0){
						var initData = {};
						if(dataTmp.length>0 && dataBOM2.length>0){
							initData={FCT_CD:dataTmp[0].value,ITEM_CD:dataBOM2[0].value,USE_YN:'1',IF_SIDE:'N'}
						}
						insertDataGrid('SMTPalletStation_tab',initData);
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
				
				$('#btnDelete').click(function(){
					deleteDataGrid(1);
	            });

				$('#btnSave').click(function() {
					var edDataGrid = $('#SMTPalletStation_tab');		
				    if (endEditing(edDataGrid)){					
				   	/*判断后变更数据*/
				   	if (edDataGrid.datagrid('getChanges').length) {
				           var inserted = edDataGrid.datagrid('getChanges', "inserted");  
				           if(inserted.length>0){
								for(var m =0;m<inserted.length;m++){
									/*保存之前查重*/
									var Inquire = {
								            url: "/iPlant_ajax",
								            dataType: "JSON",
								            data: {
								            	IFS:'ST00001',
								            	ITEM_CD: inserted[m].ITEM_CD,
								            	VERSION: inserted[m].VERSION,
								            	PGT_NVG: inserted[m].PGT_NVG
								            },
								            successCallBack: function(a) {
								            	if(a.RESPONSE[0].RESPONSE_DATA.length == 0){
								            		saveDataGrid(2);
								            	}else{
								            		$.messager.alert("提示", '此条数据已存在。');
								            		initGridData();
								            		return;
								            	}
								            },
								            errorCallBack: function() {
								                $.messager.alert("提示", '请联系管理员，查询失败！')
								            }
								        };
										iplantAjaxRequest(Inquire);
									/*保存之前查重	END*/
								}
							}
				   		}
				    }
				});
				
				$('#btnImport').click(function() {						/*导入*/
					$("#materialImportDialog").dialog("open").dialog('setTitle', 'SMT栈位物料导入');
				});
				
				 $('#btnExprt').click(function(){						/*导出*/
				 	var now = new Date();
                    var year =now.getFullYear();
                	var reqData = {
                			IFS:'ST00001'
                	}
                	createTable('tbIMESReport','SMT栈位信息导出','SMTPalletStation_tab',reqData);
                });
				 
				 /*明细表导入导出功能*/
			    $('#btnExprt2').click(function(){						/*导出*/
				 	var now = new Date();
                    var year =now.getFullYear();
                	var reqData = {
            			FCT_CD: fctCD,
            			ITEM_CD: itemCD,
            			PROGRAM_NM: programName,
            			IFS:'ST00010'
                	}
                	createTable('tbIMESReports','SMT栈位明细信息导出','SMTPalletStationInformationQuerybottom_tab',reqData);
                });
				
				/*底部框增删改*/
				$('#btnAddBottom').click(function() {
					var editData = $('#SMTPalletStationInformationQuerybottom_tab').datagrid('getChanges', "inserted");
					if(editData.length == 0){
						var initData = {};
						if(dataTmp.length>0){	
							initData={STACK_CD:dataStations[0].value,FCT_CD:fctCD,FCT_NM:fctNM,ITEM_CD:itemCD,
									USE_YN:'1',VERSION:addVersion,PROGRAM_NM:programName,LINE_CD:lineCD,LINE_NM:lineNM,PH_ARE:dataGrade2[0].value,
									PGT_NVG:pgt_nvg
							}
						}
						insertDataGrid('SMTPalletStationInformationQuerybottom_tab',initData);
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
				
				$('#btnDeleteBottom').click(function(){
					deleteDataGrid(2);
	            });

				$('#btnSaveBottom').click(function() {
					saveDataGrid(1);
				});
				
				$("#btnAudit").click(function(){
					var selectRow = $("#SMTPalletStation_tab").datagrid('getSelected');
					if(selectRow != null || selectRow != ''){
						var item_cd = selectRow.ITEM_CD;
						var sd_side = selectRow.SD_SIDE;
						var version = selectRow.VERSION;
						var pgt_nvg = selectRow.PGT_NVG;
						audit(item_cd,sd_side,version,pgt_nvg);
					}else{
						$.messager.alert('提示','请选择一条数据后再进行审核操作。')
					}
				})
				
				$('#btnPrint').click(function(){
					var post = $("#SMTPalletStationInformationQuerybottom_tab").datagrid('getSelections');
					if(post == null || post == ''){
						$.messager.alert('提示', '请选择一条数据进行打印');
					}else{
						var PROGRAM_NM,LINE_NM,VERSION,FD_TY,ET_CD,CRT_DT,PH_ARE,STACK_CD,MAT_CD;
						PROGRAM_NM = post[0].PROGRAM_NM;LINE_NM = post[0].LINE_NM;VERSION = post[0].VERSION;FD_TY = post[0].FD_TY;
						ET_CD = post[0].ET_CD;CRT_ID = post[0].CRT_ID;PH_ARE = post[0].PH_ARE;STACK_CD = post[0].STACK_CD;MAT_CD = post[0].MAT_CD;
						openPrintPreview(PROGRAM_NM,LINE_NM,VERSION,FD_TY,ET_CD,CRT_DT,PH_ARE,STACK_CD,MAT_CD);
					}
				})
				
				/*判断主表有无选中行，决定明细表新增按钮是否禁用*/
				getSelectedNO();
			});
		}
	}
	var fcfo = new factoryInfo(),itemName,stations,itemCD,fctCD,lineCD,fctNM,lineNM,dataFeedType,dataBOM,dataBOM2 = [];  
	var objFeedType={},BOM = {},itemCDS = {};var addVersion,pgt_nvg,programName;
	var ccIndex= 0;
	fcfo.init();
})();