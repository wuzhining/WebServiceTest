/* 启动时加载 */
/*
 */
(function() {
	function nonOrderReturn() {
		initCombValue=function(){
			//物料名称绑定
			iplantAjaxRequest( {
				url: '/iPlant_ajax',
				data: {IFS:'WMS_B000010',UNIT_TYPE:'WUNIT-01'},
				successCallBack: function (data) {
					var rowCollection = createSourceObj(data);
					unitNames=[];
					for(var i=0; i<rowCollection.length;i++){
						unitNames.push({"id":rowCollection[i].UNIT_ID,"text":rowCollection[i].UNIT_NAME});
					};
					$("#combUnitName").combobox({
			            data:unitNames,
			            valueField:"id",
			            textField: "text"
			        })	
				}
			});
			//仓库绑定
			iplantAjaxRequest( {
				url: '/iPlant_ajax',
				data: {IFS:'WMS_RE00026'},
				successCallBack: function (data) {
					var rowCollection = createSourceObj(data);
					stores=[];
					for(var i=0; i<rowCollection.length;i++){
						stores.push({"id":rowCollection[i].STORE_ID,"text":rowCollection[i].STORE_NAME});
					};
					$("#combStore").combobox({
			            data:stores,
			            valueField:"id",
			            textField: "text",
			            onSelect:function(res){
			            	store=res.id;
			            	getArea();
			            }
			        })	
				}
			});
		},
		getArea=function(){
			//区域绑定
			iplantAjaxRequest( {
				url: '/iPlant_ajax',
				data: {IFS:'WMS_RE00028',STORE_ID:store},
				successCallBack: function (data) {
					var rowCollection = createSourceObj(data);
					areas=[];
					for(var i=0; i<rowCollection.length;i++){
						areas.push({"id":rowCollection[i].AREA_ID,"text":rowCollection[i].AREA_NAME});
					};
					$("#combArea").combobox({
			            data:areas,
			            valueField:"id",
			            textField: "text",
			            onSelect: function(res){
			            	area=res.id;
			            	getShelf();
			            }
			        });
					$('#combArea').combobox('setValue',areas[0].id);
				}
			});
		},
		getShelf=function(){
			//货架绑定
			iplantAjaxRequest( {
				url: '/iPlant_ajax',
				data: {IFS:'WMS_RE00029',AREA_ID:area},
				successCallBack: function (data) {
					var rowCollection = createSourceObj(data);
					shelfs=[]; 
					for(var i=0; i<rowCollection.length;i++){
						shelfs.push({"id":rowCollection[i].SHELF_ID,"text":rowCollection[i].SHELF_NAME});
					};
					$("#combShelf").combobox({
			            data:shelfs,
			            valueField:"id",
			            textField: "text",
			            onSelect: function(res){
			            	shelf=res.id;
			            	if(shelf==null||shelf==''){
			            		shelf='';
			            		return;
			            	}else {
			            		getLocation();
							}
			            }
			        });
					if(rowCollection.length==0){
						$('#trShelf').css("display","none");
					}else {
						$('#trShelf').css("display","");
						$('#combShelf').combobox('setValue',shelfs[0].id);
					}
				},
				errorCallBack:function(){
					$('#trShelf').css("display","none");
   	             }
			});
		},
		getLocation=function(){
			//货位绑定
			iplantAjaxRequest( {
				url: '/iPlant_ajax',
				data: {IFS:'WMS_RE00030',STORE_ID:store,AREA_ID:area,SHELF_ID:shelf},
				successCallBack: function (data) {
					var rowCollection = createSourceObj(data);
					locations=[];
					for(var i=0; i<rowCollection.length;i++){
						locations.push({"id":rowCollection[i].LOCATION_ID,"text":rowCollection[i].LOCATION_NAME});
					};
					$("#combLocation").combobox({
			            data:locations,
			            valueField:"id",
			            textField: "text",
			            onSelect:function(res){
			            	location=res.id;
			            	if(location==null||location==''){
			            		location='';
			            		return;
			            	}
			            }	
			        });
					$('#combLocation').combobox('setValue',locations[0].id);
				}
			});
		},
		initGridData = function() {
			var dgrid = $('#nonOrderReturn_tab').datagrid('options');
			if(!dgrid) return;
			var startDate=$("#queryTime1").datebox("getValue");
			var endDate=$("#queryTime2").datebox("getValue");
			var queryOrder=$("#queryOrder").textbox("getValue");
			
			var reqData = {
				IFS: 'WMS_RE00048',
				MO_NO:queryOrder,
				beginDate:startDate,
				endDate:endDate,
				pageIndex: dgrid.pageNumber,
				pageSize: dgrid.pageSize
			}
			reqGridData('/iPlant_ajax', 'nonOrderReturn_tab', reqData);
		},
		bindGridData = function(reqData, jsonData) {
			var gridList = {
				name: 'nonOrderReturn_tab',
				dataType: 'json',
				singleSelect:true,
				columns: [[
				    {field: 'SURPLUS_NO',title: '结存单号',width: 200,align: 'center'},       
				    {field: 'MO_NO',title:'制令单号',width:200,align:'center'},
				    {field: 'DO_NO',title:'派工单号',width:200,align:'center'},
					{field: 'MATERIAL_ID',title: '物料编码',width: 200,align: 'center'},
					{field: 'MATERIAL_NAME',title: '物料名称',width: 150,align: 'center'},
					{field: 'MACHINE_NO',title: '设备编码',width: 100,align: 'center'},
					{field: 'SERIALS',title: '条码数量',width: 100,align: 'center'},
					{field: 'SURPLUS_DT',title: '结存时间',width: 200,align: 'center'}
				]],
				 onClickRow: function(index,row){
		            	initDataBarcode(row.MO_NO,row.SURPLUS_NO);
		            	$('#nonOrderShow').html(row.SURPLUS_NO);
		            	$('#nonMonoShow').html(row.MO_NO);
				    }
			}
			initGridView(reqData, gridList);
			$('#nonOrderReturn_tab').datagrid({"onLoadSuccess":function(data){
			    var moNo = "";var surplusNo = "";
			    if(data.rows.length>0){
	        		$(this).datagrid('selectRow',0);
	        		if(checkNotEmpty(data.rows[0].SURPLUS_NO)&&checkNotEmpty(data.rows[0].MO_NO)){
	        			surplusNo = data.rows[0].SURPLUS_NO;
	        			moNo = data.rows[0].MO_NO;
	        		}
			    }else if(data.rows.length == 0){
			    	moNo='#';
			    	surplusNo='#'
			    }
			    initDataBarcode(moNo,surplusNo);
			    $('#nonOrderShow').html(surplusNo);
            	$('#nonMonoShow').html(moNo);
			}}).datagrid('loadData', jsonData);
			$('#nonOrderReturn_tab').datagrid('loadData', jsonData);
		},
		initDataBarcode = function(moNo,surplusNo){
			var tabName = 'nonOrderDetailReturn_tab';
			var dgridOp = $('#'+tabName).datagrid('options');
			if(!dgridOp) return;
			if(!checkNotEmpty(moNo)||!checkNotEmpty(surplusNo)){
				moNo = "NO";
				surplusNo= "NO";
			}
			var reqData = {
				IFS: 'WMS_RE00006',
				SURPLUS_NO: surplusNo,
				MO_NO: moNo,
				pageIndex: dgridOp.pageNumber,
				pageSize: dgridOp.pageSize	
			}
			dialogDataGrid('/iPlant_ajax', tabName, reqData);
			dialogEditorDataGrid = function(tabName,reqData, jsonData) {
				var columnsTab;
				columnsTab=[
				    { field: 'SERIAL_NUMBER', title: '物料条码', width: 200 ,align:'center'},
				    { field: 'SUPPLIER_ID', title: '供应商', width: 100 ,align:'center',hidden:true},
				    { field: 'SUPPLIER_NAME', title: '供应商', width: 120 ,align:'center'},
				    { field: 'SPEC_MODEL', title: '规格', width: 120 ,align:'center'},
				    { field: 'MACHINE_NO', title: '机台编码', width: 120 ,align:'center',hidden:true},
				    { field: 'SURPLUS_QTY', title: '结存数量', width: 120 ,align:'center'},
				    { field: 'UNIT_ID', title: '单位编码', width: 100 ,align:'center',hidden:true},
				    { field: 'UNIT_NAME', title: '单位', width: 120 ,align:'center'},
				    { field: 'EMP_NO', title: '结存人', width: 120 ,align:'center'},
				    { field: 'STORE_ID', title: '仓库编码', width: 120 ,align:'center'},
				    { field: 'AREA_ID', title: '区域编码', width: 120 ,align:'center'},
				    { field: 'SHELF_ID', title: '货架编码', width: 120 ,align:'center'},
				    { field: 'LOCATION_ID', title: '货位编码', width: 120 ,align:'center'}
				];
				var gridLists = {
						name: tabName,
						dataType: 'json',
						singleSelect:true,
						columns: [columnsTab]
					}
				initEditorDataGridView(reqData, gridLists);
				$('#'+tabName).datagrid('loadData', jsonData);
			}
	    },
		setDataNull = function () {           
			$('#startDate').datebox('setValue','');
    		$('#endDate').datebox('setValue','');
    		$('#combEquipmentNumber').combobox('setValue','');
            $('#combOrder').combobox('setValue','');
            $('#txtMaterial').textbox('setValue','');  
            $('#combUnitName').combobox('setValue',unitNames[0].id);
            $('#combStore').combobox('setValue',stores[0].id);
            $('#txtQuantity').textbox('setValue',''); 
            $("#txtLotNo").textbox("setValue",'');
            $("#txtDONO").textbox("setValue",'');
        },
        initRequipMentCombobox=function(startDate,endDate){
        	iplantAjaxRequest({
        		url: '/iPlant_ajax',
				data: {IFS:'QMES00001',MoDtBegin:startDate,MoDtEnd:endDate},
				successCallBack: function (data) {
					var rowCollection = createSourceObj(data);
					var array=[];
					equipCodes=[];
					for(var i=0; i<rowCollection.length;i++){
						array.push({"id":rowCollection[i].MACHINENO,"text":rowCollection[i].MACHINENO});
						equipCodes.push({"id":rowCollection[i].MACHINENO,"text":rowCollection[i].MACHINENO});
					};
					$("#combEquipmentNumber").combobox({
			            data:array,
			            valueField:"id",
			            textField: "text"
			        });
					$("#combEquipmentNumber").combobox("setValue",equipCodes[0].id);
				}
			});
        },
        initRequipCombobox=function(status){
        	iplantAjaxRequest({
        		url: '/iPlant_ajax',
				data: {IFS:'QMES00001',DispatchStatus:status},  
				successCallBack: function (data) {
					var rowCollection = createSourceObj(data);
					var array=[];
					equipCodes=[];
					for(var i=0; i<rowCollection.length;i++){
						array.push({"id":rowCollection[i].MACHINENO,"text":rowCollection[i].MACHINENO});
						equipCodes.push({"id":rowCollection[i].MACHINENO,"text":rowCollection[i].MACHINENO});
					};
					$("#combEquipmentNumber").combobox({
			            data:array,
			            valueField:"id",
			            textField: "text"
			        });
				}
			});
        },
        initMaterialTextbox=function(startDate,endDate,status,equipCode,mono){
        	if(status==""){
        		iplantAjaxRequest({
        			url: '/iPlant_ajax',
    				data: {IFS:'QMES00002',MoDtBegin:startDate,MoDtEnd:endDate,MachineNo:equipCode,Mono:mono},
    				successCallBack: function (data) {
    					var rowCollection = createSourceObj(data);
    					if(rowCollection.length>0){
    						$("#txtDONO").textbox("setValue",rowCollection[0].DO_NO);
    						$("#txtMaterial").textbox("setValue",rowCollection[0].TZ_MATERIALNO);
    						if(rowCollection[0].TZ_MATERIALNO!=null&&rowCollection[0].TZ_MATERIALNO!=""){
        						initMaterialInfo(rowCollection[0].TZ_MATERIALNO);
        						initMaterialLotNo();
        					}
    					}
    				}
    			});
        	}else {
        		iplantAjaxRequest({
        			url: '/iPlant_ajax',
        			data: {IFS:'QMES00002',DispatchStatus:status,MachineNo:equipCode,Mono:mono},
    				successCallBack: function (data) {
    					var rowCollection = createSourceObj(data);
    					if(rowCollection.length>0){
    						$("#txtDONO").textbox("setValue",rowCollection[0].DO_NO);
    						$("#txtMaterial").textbox("setValue",rowCollection[0].TZ_MATERIALNO);
    						if(rowCollection[0].TZ_MATERIALNO!=null&&rowCollection[0].TZ_MATERIALNO!=""){
        						initMaterialInfo(rowCollection[0].TZ_MATERIALNO);
        						initMaterialLotNo();
        					}
    					}
    				}
    			});
			}
        },
        initMaterialInfo=function(materialCode){
        	iplantAjaxRequest( {
				url: '/iPlant_ajax',
				data: {IFS:'WMS_RE00047',materialId:materialCode},
				successCallBack: function (data) {
					var rowCollection = createSourceObj(data);
					if(rowCollection.length>0){
						if (rowCollection[0].UNIT_ID==null||rowCollection[0].UNIT_ID==""){
							$("#combUnitName").combobox("enable");
						}else {
							$("#combUnitName").combobox("setValue",rowCollection[0].UNIT_ID);
							$("#combUnitName").combobox("disable");
						}
						$("#txtModel").textbox("setValue",rowCollection[0].DEFAULT_PACKAGE);
					}
				}
			});
        }
        initMaterialLotNo=function(){
        	var moNo=$("#txtOrder").textbox("getValue");
        	var doNo=$("#txtDONO").textbox("getValue");
        	var materialId=$("#txtMaterial").textbox("getValue");
        	var machineId=$("#combEquipmentNumber").combobox("getValue");
        	iplantAjaxRequest( {
				url: '/iPlant_ajax',
				data: {IFS:'WMS_RE00049',moNo:moNo,doNo:doNo,materialId:materialId,machineId:machineId},
				successCallBack: function (data) {
					var rowCollection = createSourceObj(data);
					if(rowCollection.length>0){
						if (rowCollection[0].LOT_NO==null||rowCollection[0].LOT_NO==""){
							//$("#txtLotNo").textbox("enable");
							$("#showMessageInfo").html("<font color=red>提示:批次号查询为空值!</font>");
							return;
						}else {
							$("#txtLotNo").textbox("setValue",rowCollection[0].LOT_NO);
							$("#txtLotNo").textbox("disable");
						}
					}
				}
			});
        },
        initMONODetailTable=function(isFirst){
        	var reqData=[];
        	var tabName="orderDetailList";
        	if(startDateComb==""||endDateComb==""){
        		reqData = {
                        IFS: 'QMES00002',Dono: dono,DispatchStatus:1,MachineNo:requipCodeComb,ISFirst:isFirst,
                        pageIndex: 1,pageSize: 5,reqType:"APP"
                    };
        	}else {
        		reqData = {
                        IFS: 'QMES00002',Dono: dono,MoDtBegin:startDateComb,MoDtEnd:endDateComb,ISFirst:isFirst,
                        MachineNo:requipCodeComb,pageIndex: 1,pageSize: 5,reqType:"APP"
                    };
			}
        	dialogWarehouseGrid(MES_URL, tabName, reqData);
            dialogWarehouseDataGrid = function(tabName,reqData, jsonData) {
				var columnsTab;
				columnsTab=[
        				    { field: 'TZ_MONO', title: '制令单号', width: 240 ,align:'center'},
        				    { field: 'SOCKETNUM', title: '模穴数', width: 100 ,align:'center'},
        				    {field: 'MK', title: '结存数', width: 100 ,align:'center'},
        				    {field: 'AK', title: '结存条码号', width: 100 ,align:'center'}
        				];
            	
				var gridLists = {
					name: tabName,
					dataType: 'json',
					singleSelect:true,
					columns: [columnsTab],
				}
				initEditorDataGridView(reqData, gridLists);
				var totalQty=100,sumQty=0;
				var preporQty=[];
				totalQty=$("#txtQuantity").textbox("getValue");
				var num=0;
					for(var i=0;i<socketnums.length-1;i++){
						num=totalQty*socketnums[i]/Total;
						console.log(parseFloat(num).toFixed(2));
						preporQty.push(parseFloat(num).toFixed(2));
						sumQty+=parseFloat(preporQty[i]);
					}
				if(jsonData!=null && jsonData.rows.length>0){
					for(var i=0;i<jsonData.rows.length;i++){
						if(i<jsonData.rows.length-1){
							$.extend(jsonData.rows[i],{MK:preporQty[i]});
						}
						else 
						{	
							var sheng=parseFloat(totalQty-sumQty).toFixed(2)
							$.extend(jsonData.rows[i],{MK:sheng});
						}
					    
					}
				}
				$('#'+tabName).datagrid('loadData', jsonData);
			}
        },
        saveAddKittingSurplus=function(){
        	var lotNo=$("#txtLotNo").textbox("getValue");
        	var surplusModel=$("#txtModel").textbox("getValue");
        	var surplusQty=$("#txtQuantity").textbox("getValue");
        	var materialId=$("#txtMaterial").textbox("getValue");
        	var machineNo=$("#combEquipmentNumber").combobox("getValue");
        	var moNo=$("#txtOrder").textbox("getValue");
        	var doNo=$("#txtDONO").textbox("getValue");
        	var unitId=$("#combUnitName").combobox("getValue");
        	var storeId=$("#combStore").combobox("getValue");
        	var areaId=$("#combArea").combobox("getValue");
        	var shelfId=$("#combShelf").combobox("getValue");
        	var locationId=$("#combLocation").combobox("getValue");
        	if (materialId=="" ||materialId==null) {
        		$("#showMessageInfo").html("<font color=red>提示:请选择设备编码信息!</font>");
        		return;
			}else if(lotNo==null || lotNo==""){
        		$("#showMessageInfo").html("<font color=red>提示:请输入批次号!</font>");
        		return;
        	} else if(surplusModel==null || surplusModel==""){
        		$("#showMessageInfo").html("<font color=red>提示:请输入结存包规!</font>");
        		return;
        	} else if (surplusQty=="" ||surplusQty==null) {
        		$("#showMessageInfo").html("<font color=red>提示:请输入结存总数!</font>");
        		return;
			}
        	var ajaxInsert = {
					url : '/iPlant_ajax',
					dataType : 'JSON',
					data : {IFS : 'WMS_RE00007',moNo:moNo,machinoId:machineNo,doNo:doNo,materialId:materialId,unitId:unitId,
						storeId:storeId,areaId:areaId,shelfId:shelfId,locationId:locationId,lotNo:lotNo,packageModel:surplusModel,surplusQty:surplusQty},
					successCallBack : function(data) {
						$("#showMessageInfo").html('<font color=red>保存成功！</font>');
						initGridData();
						$('#enditTab').dialog('close')
						return;
					},
					errorCallBack : function(data) {
						$("#showMessageInfo").html('<font color=red>保存失败！</font>');
						return;
					}
				};
				iplantAjaxRequest(ajaxInsert);
        },
        /*验证日期*/
        dateValid1=function (startDateID,endDateID){
    		/*计划开始日期不能大于当前日期*/
    	    $('#'+startDateID).datebox('calendar').calendar({
    		    validator:function(date){
    		        var now=new Date();
    		    	var nowDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    		        return nowDate>=date;
    		    }
    		});
    	    $('#'+endDateID).datebox('calendar').calendar({
    		    validator:function(date){
    		        var now=new Date();
    		    	var nowDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    		        return nowDate>=date;
    		    }
    		});
    	    $('#'+startDateID).datebox({
    	    	onSelect:function(date){
    	    		startDateComb=date;
    	    	    setEndDate2(date,endDateID);
    	    	    if(vaildDate($('#startDate').datebox('getValue'),$('#endDate').datebox('getValue'))){
    	    	    	initRequipMentCombobox($('#startDate').datebox('getValue'),$('#endDate').datebox('getValue'));
    	    	    }
    	    	}

    	    });
    	    $('#'+endDateID).datebox({
    	    	onSelect:function(date){
    	    		endDateComb=date;
    	    		setStartDate2(date,startDateID);
    	    		if(vaildDate($('#startDate').datebox('getValue'),$('#endDate').datebox('getValue'))){
    	    			initRequipMentCombobox($('#startDate').datebox('getValue'),$('#endDate').datebox('getValue'));
    	    	    }
    	    	}
    	    });
    	},
    	vaildDate=function(startDate,endDate){
    		if(startDate==''||startDate==undefined){
    			//$("#showMessageInfo").html("<font color=red>提示:请选择开始时间。</font>");
    			return false;
    		}else if(endDate==''||endDate==undefined){
    			//$("#showMessageInfo").html("<font color=red>提示:请选择结束时间。</font>");
    			return false;
    		}else {
				return true;
			}
    		
    	},
    	//设置开始日期
    	setStartDate2=function (compareDate,controlID){
        	$('#'+controlID).datebox('calendar').calendar({
    		    validator:function(date){
    		    	var now=new Date();
    			    var nowDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    		    	var compDate = new Date(compareDate.getFullYear(), compareDate.getMonth(), compareDate.getDate());
    		    	console.log(nowDate-compDate);
    		    	console.log(compDate-date);
    		        return nowDate>=date && date<=compDate && compDate-date<=518400000;
    		    }
    		});
        },
    	//设置结束日期
        setEndDate2=function (compareDate,controlID){
    		$('#'+controlID).datebox('calendar').calendar({
    		    validator:function(date){
    		    	var now=new Date();
    			    var nowDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    		    	var compDate = new Date(compareDate.getFullYear(), compareDate.getMonth(), compareDate.getDate());
    		        return compDate<=date && date-compDate<=518400000 && nowDate>=date;
    		    }
    		});
        },
        setQueryNull=function(){
        	$("#queryOrder").textbox("setValue","");queryTime1
        	$("#queryMaterialName").textbox("setValue","");
        	$("#queryTime1").datebox("setValue","");
        	$("#queryTime2").textbox("setValue","");
        }

	};
	nonOrderReturn.prototype = {
		init: function() {
			$(function() {
				/*初始化全局变量对象*/
				dateValid1('startDate','endDate');
				dateValid("queryTime1","queryTime2","2");
				initGridData();
				initCombValue();
				initRequipCombobox(1);
				$('#btnSearch').click(function() {	
					initGridData();
				});
				$('#btnResets').click(function(){
		            setQueryNull();
		        });
		        $('#btnAdd').click(function() {	
		        	isAdd=true;
		        	setDataNull();
		        	$("#enditTab").dialog("open").dialog('setTitle', '结存条码信息新增');
		        	//initMONODetailTable('11');
		        	$("#combEquipmentNumber").combobox("setValue",equipCodes[0].id);
		        	$("#txtDONO").textbox('textbox').attr('disabled', true);
		        	$("#txtMaterial").textbox('textbox').attr('disabled', true);
		        	$("#txtLotNo").textbox('textbox').attr('disabled', true);
				});
		        $('#combEquipmentNumber').combobox({
		        	onSelect: function(data){
		        		var monoCode=$("#txtOrder").textbox('getValue');
			        	var requipCodeComb=data.id;
			        	if(requipCodeComb==""){
			        		$("#showMessageInfo").html("<font color=red>提示:请选择设备编码!</font>");
		        			return;
		        		}
		        		if(monoCode==""){
		        			$("#showMessageInfo").html("<font color=red>提示:请输入制令单号!</font>");
		        			return;
		        		}
		        		$("#showMessageInfo").html("");
	        			$("#txtQuantity").textbox('setValue','');
	        			$("#txtMaterial").textbox("setValue",'');
	        			$("#txtDONO").textbox("setValue",'');
	        			$("#txtLotNo").textbox("setValue",'');
	        			$("#txtModel").textbox("setValue",'');
	        			if(endDateComb==""||startDateComb==""){
	        				initMaterialTextbox("","",1,requipCodeComb,monoCode);
		        		}else {
		        			initMaterialTextbox(startDateComb,endDateComb,"",requipCodeComb,monoCode);
						}
		        	}
		        });
		        $("input", $("#txtOrder").next("span")).blur(function() {
		        	var monoCode=$("#txtOrder").textbox('getValue');
		        	var requipCodeComb=$('#combEquipmentNumber').combobox('getValue');
		        	if(monoCode==""){
	        			$("#showMessageInfo").html("<font color=red>提示:请输入制令单号!</font>");
	        			return;
	        		}
		        	if(requipCodeComb==""){
	 			    	 $("#showMessageInfo").html("<font color=red>提示:请选择设备编码!</font>");
	 			    	 return;
	 			    }
		        	$("#showMessageInfo").html("");
 			    	if(endDateComb==""||startDateComb==""){
	        			initMaterialTextbox("","",1,requipCodeComb,monoCode);
	        		}else {
	        			initMaterialTextbox(startDateComb,endDateComb,"",requipCodeComb,monoCode);
					}
		        });
		        /*$("input", $("#txtQuantity").next("span")).blur(function() {
		        	var num=$("#txtQuantity").textbox('getValue');
		        	var num1=$("#txtModel").textbox('getValue');
		        	var lotNo=$("#txtLotNo").textbox('getValue');
		        	if(requipCodeComb==""){
	 			    	 $("#showMessageInfo").html("<font color=red>提示:请录入设备信息!</font>");
	 			       }else if (monoCode=="") {
	 			    	 $("#showMessageInfo").html("<font color=red>提示:请录入工单信息!</font>");
	 			       }else if (materialCode=="") {
	 			    	 $("#showMessageInfo").html("<font color=red>提示:请录入物料信息!</font>");
	 			       }else if (lotNo=="") {
	 			    	 $("#showMessageInfo").html("<font color=red>提示:请输入批次号!</font>");
	 			       }else if (isNaN(num1)) {
	 			    	 $("#showMessageInfo").html("<font color=red>提示:请输入规格!</font>");
	 			       }else if (isNaN(num)) {
	 			    	 $("#showMessageInfo").html("<font color=red>提示:请输入结存总数!</font>");
	 			       }else {
	 			    	 $("#showMessageInfo").html("");   
						 initMONODetailTable();
					}
		        });*/
		        $("#txtQuantity").textbox('textbox').bind('keyup', function(e){
	 			       $("#txtQuantity").textbox('setValue', $(this).val().replace(/\.\d{3,}$/,''));
	 			       var num = $(this).val();
	 			       if(!checkNotEmpty(num)){
	 			    	  $("#showMessageInfo").html("<font color=red>提示:请输入结存总数!</font>");
	 			       }
	            	});
		        $("#txtModel").textbox('textbox').bind('keyup', function(e){
	 			       $("#txtModel").textbox('setValue', $(this).val().replace(/\.\d{3,}$/,''));
	 			       var num = $(this).val();
	 			       if(!checkNotEmpty(num)){
	 			    	  $("#showMessageInfo").html("<font color=red>提示:请输入规格!</font>");
	 			       }
	            	});
		        $('.panel-tool-close').click(function() {
                	if(isAdd){
                		$('#startDate').datebox('setValue','');
                		$('#endDate').datebox('setValue','');
                		$('#combEquipmentNumber').combobox('setValue','');
                		$('#combOrder').combobox('setValue','');
                		//initMONODetailTable('11');
					}
                });
			});
		}
	}
	var or = new nonOrderReturn();
	var unitNames=[],donos=[],requipCodes=[],monos=[],ratios=[],socketnums=[],stores=[],areas=[],shelfs=[],location=[];
	var startDateComb="",endDateComb="",requipCodeComb="",monoCode="",monoCodeComb="",materialCode="",materialType="",insertIFS="",
	unitCode="",quantity="",dono="",Total=0,lastestNum=0,hasrequipCodeComb="",hasmonoCodeComb="",store="",area="",shelf="",location="";
	var isAdd=false,isFirst=true;
	or.init();
})();