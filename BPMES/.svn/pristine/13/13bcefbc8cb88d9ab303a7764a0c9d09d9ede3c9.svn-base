/* 启动时加载 */
/*
 */
(function() {
	function factoryInfo() {
		initGridData = function() {
			var dgrid = dataGrid.datagrid('options');
			if(!dgrid) return;
			var searchITEM_CD = $('#searchITEM_CD').textbox('getValue');
			var searchET_CD = $('#searchET_CD').textbox('getValue');
			var searchWO_NO = $('#searchWO_NO').textbox('getValue');
			var searchLINE_CD = $('#searchLINE_CD').textbox('getValue');
			var reqData = {
				IFS: 'ST00129',
				ITEM_CD:searchITEM_CD,
				ET_CD:searchET_CD,
				WO_NO:searchWO_NO,
				LINE_CD:searchLINE_CD,
				pageIndex: 1,
				pageSize: dgrid.pageSize
			}
			reqGridData('/iPlant_ajax', 'SMTPalletStation_tab', reqData);
		};
		
		//工厂下拉框
		var tmp = {
                url: "/iPlant_ajax",
                dataType: "JSON",
                data: {IFS: "B000021"},
                successCallBack: function(a) {
                	dataTmp = [];
                	var op = a.RESPONSE[0].RESPONSE_DATA;
                    $.each(op,function(n,obj) {
                    	dataTmp.push({'value':obj.FT_NM,'text':obj.FT_NM});
				    });  
                },
                errorCallBack: function() {
                    $.messager.alert("提示", '请联系管理员，查询失败！')
                }
            };
		iplantAjaxRequest(tmp);
		
		/**
		 * 产品编号下拉框查询
		 */
		var ITEM = {
                url: "/iPlant_ajax",
                dataType: "JSON",
                data: {IFS: "W000001"},
                successCallBack: function(a) {
                	dataITEM = [];
                	var op = a.RESPONSE[0].RESPONSE_DATA;
                    $.each(op,function(n,obj) {
                    	dataITEM.push({'value':obj.ITEM_CD,'text':obj.ITEM_CD});
				    });  
                },
                errorCallBack: function() {
                    $.messager.alert("提示", '请联系管理员，查询失败！')
                }
            };
		iplantAjaxRequest(ITEM);
		
		/**
		 * 产品名称下拉框查询
		 */
		var nm = {
                url: "/iPlant_ajax",
                dataType: "JSON",
                data: {IFS: "Z000033"},
                successCallBack: function(a) {
                	dataNM = [];
                	var op = a.RESPONSE[0].RESPONSE_DATA;
                    $.each(op,function(n,obj) {
                    	dataNM.push({'value':obj.ITEM_NM,'text':obj.ITEM_NM});
				    });  
                },
                errorCallBack: function() {
                    $.messager.alert("提示", '请联系管理员，查询失败！')
                }
            };
		iplantAjaxRequest(nm);
		
		/**
		 * 作业指示号下拉框查询
		 */
		var mo = {
                url: "/iPlant_ajax",
                dataType: "JSON",
                data: {IFS: "W000001"},
                successCallBack: function(a) {
                	dataMO = [];
                	var op = a.RESPONSE[0].RESPONSE_DATA;
                    $.each(op,function(n,obj) {
                    	dataMO.push({'value':obj.MO_NO,'text':obj.MO_NO});
				    });  
                },
                errorCallBack: function() {
                    $.messager.alert("提示", '请联系管理员，查询失败！')
                }
            };
		iplantAjaxRequest(mo);
		
		/**
		 * 工单下拉框查询
		 */
		var wo = {
                url: "/iPlant_ajax",
                dataType: "JSON",
                data: {IFS: "W0000013"},
                successCallBack: function(a) {
                	dataWO = [];
                	var op = a.RESPONSE[0].RESPONSE_DATA;
                    $.each(op,function(n,obj) {
                    	dataWO.push({'value':obj.WO_NO,'text':obj.WO_NO});
				    });  
                },
                errorCallBack: function() {
                    $.messager.alert("提示", '请联系管理员，查询失败！')
                }
            };
		iplantAjaxRequest(wo);
		

		/*机器编码下拉*/
	   var  ETCD = {
                url: "/iPlant_ajax",
                dataType: "JSON",
                data: {IFS: "ST00100"},
                successCallBack: function(a) {
                	dataGrade3 = [];
                	var op = a.RESPONSE[0].RESPONSE_DATA;
                    $.each(op,function(n,obj) {
                    	dataGrade3.push({'value':obj.ET_CD,'text':obj.ET_CD});
				    });  
                    
                },
                errorCallBack: function() {
                    $.messager.alert("提示", '请联系管理员，查询失败！')
                }
            };
		iplantAjaxRequest(ETCD);
		
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
		
		bindGridData = function(reqData, jsonData) {
			var gridList = {
				name: 'SMTPalletStation_tab',
				dataType: 'json',
				columns: [[					
					{field: 'FCT_CD',title: '工厂名称',width: 125,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + ( row.FCT_NM  || value)+ "</span>";},
				           editor:{type:'combobox',options:{valueField:'value',textField:'text',data:dataTmp,required:true,editable:false}}},
	           		{field:'ITEM_CD',title: '产品编码', width:150,align:'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + ( row.ITEM_CD  || value)+ "</span>";},
					       editor:{type:'combobox',options:{
					    	   valueField:'value',
					    	   textField:'text',
					    	   data:dataITEM,
					    	   required:true,
					    	   editable:false,
					    	   onSelect:function(data){	
									var target = $('#SMTPalletStation_tab').datagrid('getEditor', {'index':ccIndex,'field':'ITEM_NM'}).target;
									target.textbox('setValue', BOM[data.value]);
					    	   }	
					       }
	           		}},
	           		{field:'ITEM_NM', title: '产品名称', width:125,align:'center',editor:{type:'textbox',options:{editable:false}}},  
				 	 {field: 'MO_NO',title: '工单号',width: 125,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + ( row.MO_NO  || value)+ "</span>";},
					    editor:{type:'combobox',options:{valueField:'value',textField:'text',data:dataMO,required:true,editable:false}}},
					{field: 'WO_NO',title: '作业指示号',width: 125,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + ( row.WO_NO  || value)+ "</span>";},
						   editor:{type:'combobox',options:{valueField:'value',textField:'text',data:dataWO,required:true,editable:false}}},
	        	    {field: 'LINE_CD',title: '拉线名称',width: 150,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + ( row.LINE_NM  || value)+ "</span>";},
			        	   editor:{type:'combobox',options:{valueField:'value',textField:'text',data:dataFactory,required:true}}}, 
			        {field: 'ET_CD',title: '设备编码',width: 150,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + ( row.ET_CD  || value)+ "</span>";},
				           editor:{type:'combobox',options:{valueField:'value',textField:'text',data:dataGrade3,required:true}}}, 
			        {field:'VERSION', title: '版本号', width:125,align:'center',editor:{type:'textbox',options:{editable:false}}},  
                    {field: 'CRT_ID',title: '创建人',width: 125,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
					{field: 'CRT_DT',title: '创建时间',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
					{field: 'UPT_ID',title: '修改人',width: 125,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
					{field: 'UPT_DT',title: '修改时间',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}
			    ]],
		        /**单击进入编辑模式*/
				onClickRow: function (index,row) {
					ccIndex=index;
					onloadFun(row.ITEM_CD,row.VERSION);
		        	OpenFrameAttribute(row.FCT_CD,row.ITEM_CD,row.ET_CD,row.VERSION);
		        	getSelectedNO();
		        	itemName = row.ITEM_NM;
		        	programName = row.WO_NO;   
		        	addVersion = row.VERSION;
		        	fctNM = row.FCT_NM;
		        	itemCD = row.ITEM_CD;
		        	etCD = row.ET_CD;
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
			    		
			    		ed3 = $(this).datagrid('getEditor', {index: index,field: 'WO_NO'});
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
			    	OpenFrameAttribute('','','','');
			    }else{
			    	OpenFrameAttribute(data.rows[0].FCT_CD,data.rows[0].ITEM_CD,data.rows[0].ET_CD,data.rows[0].VERSION);
			    }
			}}).datagrid('loadData', jsonData);
		}
		
	}
	/*底部的关联表格*/   
	OpenFrameAttribute = function(FCT_CD,ITEM_CD,ET_CD,VERSION){
		var tabName = 'SMTPalletStationInformationQuerybottom_tab';
		var dgridOp = $('#'+tabName).datagrid('options');
		if(!dgridOp) return;
		var reqDataA = {
			IFS: 'ST00140',
			FCT_CD:FCT_CD,
			ITEM_CD:ITEM_CD,
			ET_CD:ET_CD,
			VERSION:VERSION,
			pageIndex: 1,
			pageSize: dgridOp.pageSize	
		}
		dialogDataGrid('/iPlant_ajax', tabName, reqDataA);
		stations = {
                url: "/iPlant_ajax",
                dataType: "JSON",
                data: {IFS: "ST00100"
               	    ,ET_CD:ET_CD
                	    },
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
		
	
		
		/*物料编码状态下拉框查询*/
		wuliao = {
	        url: "/iPlant_ajax",
	        dataType: "JSON",
	        data: {IFS:'ST00010'},
	        successCallBack: function(a) {
	        	datawuliao=[];
	        	var op = a.RESPONSE[0].RESPONSE_DATA;
	            $.each(op,function(n,obj) {
	            	datawuliao.push({'value':obj.MAT_CD,'text':obj.MAT_CD});
			    });  
	        },
	        errorCallBack: function() {
	            $.messager.alert("提示", '请联系管理员，查询失败！')
	        }
	    };
		iplantAjaxRequest(wuliao);
		
		dialogEditorDataGrid = function(tabName,reqDataA, jsonData) {
			var columnsTab,edDataGrid,messageInfo;
			columnsTab=[       	
					{field: 'FCT_CD',title: '工厂名称',hidden:true,width: 100,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + ( row.FCT_CD  || value)+ "</span>";}},
					{field: 'ITEM_CD',title: '产品编码',hidden:true,width: 100,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + ( row.ITEM_CD  || value)+ "</span>";}},
					{field: 'ET_CD',title: '设备编码',hidden:true,width: 100,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + ( row.ET_CD  || value)+ "</span>";}},
					{field: 'VERSION',title: '版本号',hidden:true,width: 100,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + ( row.VERSION  || value)+ "</span>";}},
					{field: 'STACK_CD',title: '栈位条码',width: 130,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + (value)+ "</span>";},
        	    		editor:{type:'combobox',options:{valueField:'value',textField:'text',data:dataStations,required:true}}}, 
					{field: 'FD_TY',title: '飞达类型',width: 150,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + ( row.FD_TY_NM  || value)+ "</span>";},
	           		       editor:{type:'combobox',options:{valueField:'value',textField:'text',data:dataFeedType,required:true,editable:false}}},
					{field: 'MAT_CD',title: '物料编码',width: 150,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" +  value + "'>" +  (value)+ "</span>";}},
					{field: 'MAT_PSN',title: '物料条码',width: 150,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" +  value + "'>" +  (value)+ "</span>";}},
					{field: 'MAT_QUA',title: '上料数量',width: 140,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" +  value + "'>" +  (value)+ "</span>";}},
	        	    {field: 'MAT_CON',title: '已用数量',width: 140,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" +  value + "'>" +  (value)+ "</span>";}},
	        	    {field: 'SUR_QUA',title: '剩余数量',width: 140,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" +  value + "'>" +  (value)+ "</span>";}},
	        	    {field: 'USE_YN',title: '是否启用',width: 140,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" +  value + "'>" +  (value)+ "</span>";}},
	            	/*{field: 'USE_YN',title: '是否启用',width: 100,align: 'center',formatter: function(value, row, index) {if(value == 'Y') { return '是';} else { return '否';}},editor:{type:'checkbox',options:{on: 'Y',off: 'N'}}}, */
			        {field: 'CRT_ID',title: '创建人',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
					{field: 'CRT_DT',title: '创建时间',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
					{field: 'UPT_ID',title: '修改人',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
					{field: 'UPT_DT',title: '修改时间',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}];
			
			

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
	openPrintPreview = function(WO_NO,LINE_NM,VERSION,FD_TY,ET_CD,CRT_DT,PH_ARE,STACK_CD,MAT_CD){
		$("#PrintPreview_openDiv").dialog("open").dialog('setTitle', '打印预览页面');

		$("#WO_NO").textbox('setValue',WO_NO);
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
        		data1.push({"SN":post[i].WO_NO,"FSNM":"栈位编码","FDSN":post[i].STACK_CD,"FNNM":"机器编码","FDNM":post[i].ET_CD,"TITLE":"栈位标签打印"});
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
	                        	IFS: 'ST00140',
	                        	STACK_CD: checkedItems[0].STACK_CD,
	                        	FD_TY: checkedItems[0].FD_TY,
	                        	MAT_CD: checkedItems[0].MAT_CD,
	                        	MAT_QUA: checkedItems[0].MAT_QUA,
	                        	MAT_CON: checkedItems[0].MAT_CON,
	                        	PROGRAM_NM: checkedItems[0].PROGRAM_NM
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
	                	                       	WO_NO: detail[i].WO_NO,
	                                             IFS: 'ST00136'
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
	                                	 LINE_CD: checkedItems[0].LINE_CD,
	        	                       	 ITEM_CD: checkedItems[0].ITEM_CD,
	        	                       	 WO_NO: checkedItems[0].WO_NO,
	        	                       	ET_CD: checkedItems[0].ET_CD,    
	                                     IFS: 'ST00132'
	                                 },
	                                 successCallBack: function (data) {
	                                	showmessage.html('<font color=red>删除成功！</font>');
	                                 	initGridData();
	                                 	OpenFrameAttribute(checkedItems[0].FCT_CD,checkedItems[0].ITEM_CD,checkedItems[0].ET_CD,//checkedItems[0].WO_NO,checkedItems[0].LINE_CD,
	                                 			checkedItems[0].VERSION/*,checkedItems[0].PGT_NVG*/);
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
	                       	WO_NO: checkedItems2[0].WO_NO,
                             IFS: 'ST00135'
                         },
                         successCallBack: function (data) {
                        	showmessage.html('<font color=red>删除成功！</font>');
                        	console.log(checkedItems2[0].WO_NO);
                        	OpenFrameAttribute(checkedItems2[0].FCT_CD,
                        					   checkedItems2[0].ITEM_CD,
                        					   //checkedItems2[0].WO_NO,
                        					   checkedItems2[0].ET_CD,
                        					   checkedItems2[0].VERSION);
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
		rowEdit.editType='';
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
			                       IFS: 'ST00134'
			                   },
			                   successCallBack: function (data) {
			                   	   edDataGrid.datagrid('acceptChanges');
			                   	   OpenFrameAttribute(fctCD,itemCD,etCD,addVersion);
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
			                       IFS: 'ST00135'
			                   },
			                   successCallBack: function (data) {
			                	   OpenFrameAttribute(fctCD,itemCD,etCD,addVersion);
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
			           
			           //alert(inserted[0].ITEM_CD+"-"+inserted[0].ET_CD);
	    				
			           var selectV = {//通过设备编码和产品编码来确定唯一版本号
			        		   url: '/iPlant_ajax',
			                   dataType: 'JSON',
			                   async:false,
			                   data: {
			                	   ITEM_CD: inserted[0].ITEM_CD,
			                	   ET_CD: inserted[0].ET_CD,
			                       IFS: 'ST00128'
			                   },
			                   successCallBack: function (data) {
			                   	   var dataS = data.RESPONSE[0].RESPONSE_DATA[0].A;
			                   	   inserted[0].VERSION = Number(dataS) + 1;
			                   } 
			           }
			           iplantAjaxRequest(selectV);	
			           
			           inserted[0].VERSION = 'V'+inserted[0].VERSION+'.0';
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
			                       IFS: 'ST00130'
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
			                       IFS: 'ST00131'
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
	                	dataBOM2.push({'text':obj.BOM_CD+"("+obj.BOM_NM+")",'value':obj.BOM_CD});
                    	BOM[obj.BOM_CD]=obj.BOM_NM;
                    	itemCDS[obj.BOM_CD] = obj.BOM_CD;
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
				dataGrid = $('#SMTPalletStation_tab'),dataFeedType=[],dataMaterielType=[],dataITEM = [],dataNM = [],dataWO = [],dataMO = [],
				dataGrade3=[],dataGrade2=[],dataGrade3=[],datawuliao=[],dataTmp=[],dataBOM=[],dataStations=[],dataMachine=[],dataBOM2=[],dataFactory=[],dataFeedpw=[],showmessage=$('#showMessageInfo'),editIndex = undefined,oldRow=undefined, reg=new RegExp("null","g");
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
								            	IFS:'ST00129',
								            	FCT_CD: inserted[m].FCT_CD,
								            	ITEM_CD: inserted[m].ITEM_CD,
								            	ITEM_NM: inserted[m].ITEM_NM,
								            	MO_NO: inserted[m].MO_NO,
								            	WO_NO: inserted[m].WO_NO,
								            	LINE_CD: inserted[m].LINE_CD,
								            	ET_CD: inserted[m].ET_CD,
								            	VERSION: inserted[m].VERSION
								            },
								            successCallBack: function(a) {
								            	saveDataGrid(2);
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
                			IFS:'ST00129'
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
            			WO_NO: programName,
            			IFS:'ST00140'
                	}
                	createTable('tbIMESReports','SMT栈位明细信息导出','SMTPalletStationInformationQuerybottom_tab',reqData);
                });
				
				/*底部框增删改*/
				$('#btnAddBottom').click(function() {
					var editData = $('#SMTPalletStationInformationQuerybottom_tab').datagrid('getChanges', "inserted");
					if(editData.length == 0){
						var initData = {};
						if(dataTmp.length>0){	
							/*initData={STACK_CD:dataStations[0].value,FCT_CD:fctCD,FCT_NM:fctNM,ITEM_CD:itemCD,
									USE_YN:'1',VERSION:addVersion,WO_NO:programName,LINE_CD:lineCD,LINE_NM:lineNM,PH_ARE:dataGrade2[0].value,
									PGT_NVG:pgt_nvg
							}*/
							initData={FCT_CD:fctCD,ITEM_CD:itemCD,ET_CD:etCD,VERSION:addVersion
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
						var WO_NO,LINE_NM,VERSION,FD_TY,ET_CD,CRT_DT,PH_ARE,STACK_CD,MAT_CD;
						WO_NO = post[0].WO_NO;LINE_NM = post[0].LINE_NM;VERSION = post[0].VERSION;FD_TY = post[0].FD_TY;
						ET_CD = post[0].ET_CD;CRT_ID = post[0].CRT_ID;PH_ARE = post[0].PH_ARE;STACK_CD = post[0].STACK_CD;MAT_CD = post[0].MAT_CD;
						openPrintPreview(WO_NO,LINE_NM,VERSION,FD_TY,ET_CD,CRT_DT,PH_ARE,STACK_CD,MAT_CD);
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