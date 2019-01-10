/* 启动时加载 */
/*
 */
(function() {
	function factoryInfo() {
		initGridData = function() {
			var dgrid = dataGrid.datagrid('options');
			if(!dgrid) return;
			
			var ajaxParam3={
                url:'/iPlant_ajax',
                data:{
                    IFS:'B000025',
                },
                successCallBack:function(data){
                    var rowCollection=createSourceObj(data); 
                    var arr = [];
                    arr.push({"value":"", "text":"全部"});
                    for(var i=0; i< rowCollection.length; i++){
                    	arr.push({"value":rowCollection[i].PL_CD, "text":rowCollection[i].PL_NM});
                    }
                    $('#WC_CD').combobox({
                        data:arr,
                        valueField:'value',
                        textField:'text',
                        panelWidth:150
                    });
                }
            }
            iplantAjaxRequest(ajaxParam3);
			
			var reqData = {
				IFS: 'MES_S000001',
				pageIndex: 1,
				pageSize: dgrid.pageSize
			}
			reqGridData('/iPlant_ajax', 'workOrderBarCodePrint_tab', reqData);
		},
		
		bindGridData = function(reqData, jsonData) {
			var gridList = {
				name: 'workOrderBarCodePrint_tab',
				dataType: 'json',
				columns: [[
					{field: 'img1',title: '打印',width: 90,align: 'center',formatter:function(){
					    	return "<img href='javascript:void(0)' class='easyui-linkbutton' src='../../../common/IplantCompent/themes/default/images/Printer.png'/>"}},
				    {field: 'FCT_CD',hidden:true,title: '工厂名称',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
				    {field: 'FCT_NM',title: '工厂名称',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
					{field: 'MO_NO',title: '工单编号',width: 140,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
					{field: 'WO_NO',title: '作业指示编号',width: 170,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
					{field: 'PROD_TYPE',title: '工单类型',width: 170,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
					
					{field: 'MD_V',title: '机型版本信息',width: 200,hidden:true,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
					{field: 'C_SOFT_V',title: '客户软件版本信息',width: 200,hidden:true,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
					{field: 'OD_CHIP',title: '订单和主芯片信息',width: 200,hidden:true,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
					
				    {field: 'WC_NM',title: '车间名称',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
					/*{field: 'SHIFT_CD',title: '班组',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},*/ 
					{field: 'LINE_NM',title: '产线名称',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
					{field: 'ITEM_CD',title: '物料编码',width: 140,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
					{field: 'ITEM_NM',title: '物料名称',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
					{field: 'PLAN_WO_QTY',title: '排程量',width: 80,align: 'right',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
				    {field: 'CRT_DT',title: '开工时间',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
				    {field: 'FIRST_BAR_CODE',title: '起始条码流水',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
					{field: 'LAST_BAR_CODE',title: '结束条码流水',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
					{field: 'PTY_QTY',title: '已打印数量',width: 80,align: 'right',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
					{field: 'CRT_ID',title: '打印人',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
					{field: 'LAST_PRINT_TIME',title: '打印时间',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
			 	   
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
		        	var tabName,dialogName,titleName,rowEdit,editem,editorFt,itemCD,reqData,dgrid,reqDataPro;
		        	var rows = dataGrid.datagrid('getRows'),row = rows[index];
		        	/**判断是否为可编辑字段*/
		        	if(field=='img1'){
		        		maxQty = Number(row.PLAN_WO_QTY) - Number(row.PTY_QTY);
		        		if(Number(row.PTY_QTY) < Number(row.PLAN_WO_QTY)){
		        			 //'PTY_QTY',title: '已打印数量'
		        	         //'PLAN_WO_QTY',title: '排程量'
		        			openPrintPreview(row.MD_V,row.C_SOFT_V,row.OD_CHIP,row.LINE_CD,row.WO_NO,row.PLAN_WO_QTY,row.PTY_QTY,row.CRT_ID,row.CRT_DT,row.LAST_BAR_CODE,row.LAST_PRINT_TIME,row.MO_NO,row.ITEM_CD,row.ITEM_NM,row.FCT_CD,row.PROD_TYPE);
		        		}else{
		        			$.messager.alert("提示", '工单编号['+ row.MO_NO +']已打印数量不能大于排程量 !');
		        		}	
		        	}else{
			        	if (editIndex != index){
				    		var ed,fc,editorFt;
				    		
				    	}
		        	}
		        },
			}
			initGridView(reqData, gridList);
			dataGrid.datagrid('loadData', jsonData);
		}
	}
	
	/*是否打印弹出打印预览页面*/
	openPrintPreview = function(MD_V,C_SOFT_V,OD_CHIP,LINE_CD,WO_NO,PLAN_WO_QTY,PTY_QTY,CRT_ID,CRT_DT,LAST_BAR_CODE,LAST_PRINT_TIME,MO_NO,ITEM_CD,ITEM_NM,FCT_CD,PROD_TYPE){
		$("#PrintPreview_openDiv").dialog("open").dialog('setTitle', '打印预览页面');
		function p(s) {
		    return s < 10 ? '0' + s: s;
		}
		var myDate = new Date();
		//获取当前年
		var year=myDate.getFullYear();
		//获取当前月
		var month=myDate.getMonth()+1;
		//获取当前日
		var date=myDate.getDate(); 

		var now=year+p(month)+p(date);
		$("#txtNOW_PRINT_TIME").textbox('setValue',now);
		$("#FCT_CD").val(FCT_CD);
		$("#txtLINE_CD").textbox('setValue',LINE_CD);
		$("#txtWO_NO").textbox('setValue',WO_NO);
		$("#txtPLAN_WO_QTY").textbox('setValue',PLAN_WO_QTY);
		$("#txtMO_NO").textbox('setValue',MO_NO);
		$("#txtITEM_CD").textbox('setValue',ITEM_CD);
		$("#txtITEM_NM").textbox('setValue',ITEM_NM);
		$("#txtPTY_QTY").textbox('setValue',PTY_QTY);
		$("#txtCRT_ID").textbox('setValue',CRT_ID);
		$("#txtLAST_PRINT_TIME").textbox('setValue',LAST_PRINT_TIME);
		$("#txtLAST_BAR_CODE").textbox('setValue',LAST_BAR_CODE);
		
		$("#txtMD_V").textbox('setValue',MD_V);
		$("#txtC_SOFT_V").textbox('setValue',C_SOFT_V);
		$("#txtOD_CHIP").textbox('setValue',OD_CHIP);
		$("#txtPROD_TYPE").textbox('setValue',PROD_TYPE);
		/*本次打印数量控制最大值*/
		$("#txtCurrentCount").numberbox({
			max: maxQty,
			min: 1,
			precision: 0,
			value:1
		})
	}
	
	openSerialNumber = function(){
		$("#Print_openSerialNumber").dialog("open").dialog('setTitle', '当前流水号打印');
		$("#Print_openSerialNumber").html("<h2>当前流水：ph00000004</h2><br/>" +
				"<input type='button' style='width: 200px;height: 35px;' value='是否从ph00000004开始打印'><br/>" +
				"<input type='button' style='width: 40px;height: 25px;' value='YES'>&nbsp;&nbsp;<input type='button' style='width: 40px;height: 25px;' value='NO'>" +
				"");
	}
	
	/**
	 * 打印SN
	 * 
	 * @param dgrid
	 */
	saveMesSNcode = function(){
		/*var required = $('#prefix').textbox('getValue');	获取前缀的值
		if(required == '' || required == null){
			$.messager.alert('提示','请输入必填项后再打印');
			return
		}*/
		
		var planWoQTY = $("#txtPLAN_WO_QTY").textbox('getValue');
		
		var currentCount =$("#txtCurrentCount").val();
		
		var ptyQty =$("#txtPTY_QTY").textbox('getValue');
		
		/*if(currentCount >= Number(planWoQTY)){
			$.messager.alert("提示", '本次打印张数量 ['+currentCount+']不能大于作业指示计划数量['+planWoQTY+']!');
			return false;
		}else if(currentCount+Number(ptyQty) > Number(planWoQTY)){
			$.messager.alert("提示", '输入本次打印张数量 ['+currentCount+'] + 已打印数量['+ptyQty+'],不能大于作业指示计划数量['+planWoQTY+']!');
			return false;
		}*/
		var PREFIX = $("#prefix").textbox('getValue');
		var datetime = $("#txtNOW_PRINT_TIME").textbox('getValue');
		var fctCD = $("#FCT_CD").val();
		var data1=new Array();
		var barCodeList="";
		var WOSN =$("#txtWO_NO").val();
		var rowSz = $('#rowSize').textbox('getValue');
		var WO_QTY = $('#txtPLAN_WO_QTY').textbox('getValue');
		var JOBINS =$("#txtMO_NO").val();
		var lastBarCode = $("#txtLAST_BAR_CODE").textbox('getValue');
		var printNum = $('#txtPTY_QTY').textbox('getValue');
		var buildNO = parseInt(printNum) + parseInt(currentCount);
		
		var MD_V = $("#txtMD_V").textbox('getValue');
		var C_SOFT_V = $("#txtC_SOFT_V").textbox('getValue');
		var OD_CHIP = $("#txtOD_CHIP").textbox('getValue');
		var PROD_TYPE = $("#txtPROD_TYPE").textbox('getValue');
		if(lastBarCode == null || lastBarCode == ''){
			for (var i=1;i<=currentCount;i++){
			    var lastSN = '00000' + i;
	    		var ajaxParam9={
	                    url:'/iPlant_ajax',
	                    async: false,
	                    data:{
	                        IFS:'S0000022',
	                        WO_NO:JOBINS,
	                        WO_QTY:WO_QTY,
	                        NUM_IN: rowSz,
	                        PROD_TYPE:PROD_TYPE
	                    }, 
	                    successCallBack:function(data){
	                    	if(data.RESPONSE[0].RESPONSE_DATA.length > 0){
	                    		var snno = data.RESPONSE[0].RESPONSE_DATA[0].SN_NO.split(',');
		                    	insertIntoMoBc(lastSN,WOSN,JOBINS,PREFIX,snno,MD_V,C_SOFT_V,OD_CHIP);
		                    	data1.push({"SN1":snno[0],"SN2":snno[1],"SN3":snno[2],"SN4":snno[3],  "MD_V":MD_V,"C_SOFT_V":C_SOFT_V,'OD_CHIP':OD_CHIP});
		        	    		barCodeStr = {labName:"MOlaberPrinter.lab",'rowSize':rowSz,"barCodeList":data1};
	                    	}else{
	                    		$.messager.alert('提示','生成SN条码失败，请联系管理员。');
	                    	}
	                    	
	                    },
	                };
	            iplantAjaxRequest(ajaxParam9);
	            
			}
			zbSocketPrinter(barCodeStr);
			updateIntoMoBc(fctCD,buildNO,JOBINS);
		}else{
			var parseL = buildNO.toString();
			var beforNum = 6 - parseL.length;
			if(parseL.length < 6){
				var lastNum;
				for (var i=1;i<=currentCount;i++){
					var lastNum = parseInt(printNum) + i;
					var beforZero = '0';
					var parseL2 = lastNum.toString();
					var beforNum2 = 6 - parseL2.length;
					for(var n=1;n<beforNum2;n++){
						beforZero = beforZero + '0';
					}
					var lastSN = beforZero + lastNum;
		    		
		    		var ajaxParam9={
		                    url:'/iPlant_ajax',
		                    async: false,
		                    data:{
		                        IFS:'S0000022',
		                        WO_NO:JOBINS,
		                        WO_QTY:WO_QTY,
		                        NUM_IN: rowSz,
		                        PROD_TYPE:PROD_TYPE
		                    }, 
		                    successCallBack:function(data){
		                    	var snno = data.RESPONSE[0].RESPONSE_DATA[0].SN_NO.split(',');
		                    	insertIntoMoBc(lastSN,WOSN,JOBINS,PREFIX,snno,MD_V,C_SOFT_V,OD_CHIP);
		                    	data1.push({"SN1":snno[0],"SN2":snno[1],"SN3":snno[2],"SN4":snno[3],  "MD_V":MD_V,"C_SOFT_V":C_SOFT_V,'OD_CHIP':OD_CHIP});
		        	    		barCodeStr = {labName:"MOlaberPrinter.lab",'rowSize':rowSz,"barCodeList":data1};
		                    },
		                };
		            iplantAjaxRequest(ajaxParam9);
				}
				zbSocketPrinter(barCodeStr);
				updateIntoMoBc(fctCD,buildNO,JOBINS);
			}else if(parseL.length = 6){
				for (var i=1;i<=currentCount;i++){
				    var lastSN = parseInt(printNum) + i;
		    		
		    		var ajaxParam9={
		                    url:'/iPlant_ajax',
		                    async: false,
		                    data:{
		                    	IFS:'S0000022',
		                        NUM_IN: rowSz
		                    }, 
		                    successCallBack:function(data){
		                    	var snno = data.RESPONSE[0].RESPONSE_DATA[0].SN_NO.split(',');
		                    	insertIntoMoBc(lastSN,WOSN,JOBINS,PREFIX,snno,MD_V,C_SOFT_V,OD_CHIP);
		                    	data1.push({"SN1":snno[0],"SN2":snno[1],"SN3":snno[2],"SN4":snno[3],  "MD_V":MD_V,"C_SOFT_V":C_SOFT_V,'OD_CHIP':OD_CHIP});
		        	    		barCodeStr = {labName:"MOlaberPrinter.lab",'rowSize':rowSz,"barCodeList":data1};
		                    },
		                };
		            iplantAjaxRequest(ajaxParam9);
		            
				}
				zbSocketPrinter(barCodeStr);
				updateIntoMoBc(fctCD,buildNO,JOBINS);
			}
			
		}
		
		
		$('#PrintPreview_openDiv').dialog('close');
		$.messager.alert("提示", '条码打印完成！');
		initGridData();	
	}
	
	/**
	 * 插入SN_NO信息
	 * @param sn_no
	 */
	insertIntoMoBc =function(SN_NO,WO_NO,MO_NO,PRE_FIX,snno,MD_V,C_SOFT_V,OD_CHIP){
		var sn = snno;
		for(var i=0;i<sn.length;i++){
			var ajaxParam5={
	                url:'/iPlant_ajax',
	                async: false,
	                data:{
	                    IFS:'MES_S000002',
	                    SN_NO:sn[i],
	                    WO_NO:WO_NO,
	                    MO_NO:MO_NO,
	                    PRE_FIX : PRE_FIX,
	                    BUILD_SN : SN_NO,
	                    MD_V: MD_V,
	                    C_SOFT_V: C_SOFT_V,
	                    OD_CHIP: OD_CHIP
	                }, 
	                successCallBack:function(data){
	    
	                },
	            };
	        iplantAjaxRequest(ajaxParam5);
		}
	}
	
	updateIntoMoBc = function(fctCD,buildNO,JOBINS){
			var ajaxParam6={
	                url:'/iPlant_ajax',
	                async: false,
	                data:{
	                    IFS:'MES_S000003',
	                    list :	[{
	                    	FCT_CD : fctCD ,
		                    BUILD_NO : buildNO,
		                    MO_NO : JOBINS
	                    }],
	                }, 
	                successCallBack:function(data){
	    
	                },
	            };
	        iplantAjaxRequest(ajaxParam6);
	}
     
	searchDataGrid=function(dgrid){
		var WC_CD = $('#WC_CD').combobox('getValue');
		var ITEM_CD = $('#ITEM_CD').textbox('getValue');
		var MO_NO = $('#MO_NO').textbox('getValue');
		var WC_CD = $('#WC_CD').textbox('getValue');
		var WO_NO = $('#WO_NO').textbox('getValue');
		var reqData = {
			IFS: 'MES_S000001',
			WC_CD:WC_CD,
			ITEM_CD:ITEM_CD,
			MO_NO:MO_NO,
			WC_CD:WC_CD,
			WO_NO:WO_NO,
			pageIndex: 1,
			pageSize: dgrid.pageSize
		}
		reqGridData('/iPlant_ajax', 'workOrderBarCodePrint_tab', reqData);
	}
	
	factoryInfo.prototype = {
		init: function() {
			$(function() {
				/*初始化全局变量对象*/
				dataGrid = $('#workOrderBarCodePrint_tab'),dataCompany=[],dataFactory=[],showmessage=$('#showMessageInfo'),editIndex = undefined,oldRow=undefined, reg=new RegExp("null","g");
				initGridData();
				
				$('#btnSearch').click(function() {	
					searchDataGrid(dataGrid);
				});
				
				$('#btnExprt').click(function(){						/*导出*/
				 	var now = new Date();
                    var year =now.getFullYear();
                	var reqData = {
                			IFS:'MES_S000001'
                	}
                	createTable('tbIMESReport','产品条码打印导出','workOrderBarCodePrint_tab',reqData);
	            });
			});
		}
	}
	var fcfo = new factoryInfo();var maxQty;
	fcfo.init();
})();