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
			reqGridData('/iPlant_ajax', 'moBarCodePrint_tab', reqData);
		},
		
		bindGridData = function(reqData, jsonData) {
			var gridList = {
				name: 'moBarCodePrint_tab',
				dataType: 'json',
				columns: [[
				    {field: 'FCT_NM',title: '工厂名称',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
					{field: 'MO_NO',title: '工单编号',width: 140,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
					{field: 'WO_NO',title: '作业指示编号',width: 170,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
				    {field: 'WC_NM',title: '车间名称',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
					{field: 'SHIFT_NM',title: '班组',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
					{field: 'LINE_NM',title: '产线名称',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
					{field: 'ITEM_CD',title: '物料编码',width: 140,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
					{field: 'ITEM_NM',title: '物料名称',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
					{field: 'PLAN_WO_QTY',title: '排程量',width: 80,align: 'right',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
				    {field: 'CRT_DT',title: '开工时间',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
					{field: 'FIRST_BAR_CODE',title: '起始条码流水',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
					{field: 'LAST_BAR_CODE',title: '结束条码流水',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
					{field: 'PTY_QTY',title: '已打印数量',width: 80,align: 'right',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
					{field: 'img1',title: '打印',width: 90,align: 'center',formatter:function(){
					       return "<img href='javascript:void(0)' class='easyui-linkbutton' src='../../../common/IplantCompent/themes/default/images/Printer.png'/>"}},
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
		        		openPrintPreview(row.LINE_CD,row.WO_NO,row.PLAN_WO_QTY,row.PTY_QTY,row.CRT_ID,row.CRT_DT,row.LAST_BAR_CODE,row.LAST_PRINT_TIME,row.MO_NO,row.ITEM_CD,row.ITEM_NM);
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
	openPrintPreview = function(LINE_CD,WO_NO,PLAN_WO_QTY,PTY_QTY,CRT_ID,CRT_DT,LAST_BAR_CODE,LAST_PRINT_TIME,MO_NO,ITEM_CD,ITEM_NM){
		$("#PrintPreview_openDiv").dialog("open").dialog('setTitle', '打印预览页面');
		
		$("#txtLINE_CD").textbox('setValue',LINE_CD);
		$("#txtWO_NO").textbox('setValue',WO_NO);
		$("#txtPLAN_WO_QTY").textbox('setValue',PLAN_WO_QTY);
		$("#txtMO_NO").textbox('setValue',MO_NO);
		$("#txtITEM_CD").textbox('setValue',ITEM_CD);
		$("#txtITEM_NM").textbox('setValue',ITEM_NM);
		$("#txtPTY_QTY").textbox('setValue',PTY_QTY);
		$("#txtCRT_ID").textbox('setValue',CRT_ID);
		$("#txtCurrentCount").textbox('setValue',1);
		$("#txtLAST_PRINT_TIME").textbox('setValue',LAST_PRINT_TIME);
		$("#txtLAST_BAR_CODE").textbox('setValue',LAST_BAR_CODE);
		
		
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
		
		var currentCount =$("#txtCurrentCount").val();
		var WOSN =$("#txtWO_NO").val();
		var JOBINS =$("#txtMO_NO").val();
		var MERSN =$("#txtITEM_CD").val();
		var MERNM =$("#txtITEM_NM").val();
		var LINE =$("#txtLINE_CD").val();
		var data1=new Array();
		var barCodeList="";
		for (var i=0;i<currentCount;i++){
			
			var ajaxParam4={
	                url:'/iPlant_ajax',
	                async: false,
	                data:{
	                    IFS:'S0000013',
	                    NAME_RULES:'SN',
	                }, 
	                successCallBack:function(data){
	                	  var rowCollection=createSourceObj(data);
                        	console.log(rowCollection[0].C_RESULT);
                    		data1.push({"SN":rowCollection[0].C_RESULT,"WOSN":JOBINS,"JOBINS":WOSN,"MERSN":MERSN,"MERNM":MERNM,"LINE":LINE});
                    		barCodeStr = {labName:"workorder.lab","barCodeList":data1};
                    		insertIntoMoBc(rowCollection[0].C_RESULT,WOSN,JOBINS);
                    		if(i==currentCount-1){
                    			zbSocketPrinter(barCodeStr);
                    		}
                    },
	            };
	        iplantAjaxRequest(ajaxParam4);
       }
		$('#PrintPreview_openDiv').dialog('close');
		$.messager.alert("提示", '条码打印完成！');
		initGridData();	
	}
	
	/**
	 * 插入SN_NO信息
	 * @param sn_no
	 */
	insertIntoMoBc =function(SN_NO,WO_NO,MO_NO){
	
		var ajaxParam5={
                url:'/iPlant_ajax',
                async: false,
                data:{
                    IFS:'MES_S000002',
                    SN_NO:SN_NO,
                    WO_NO:WO_NO,
                    MO_NO:MO_NO,
                }, 
                successCallBack:function(data){
    
                },
            };
        iplantAjaxRequest(ajaxParam5);
		
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
		reqGridData('/iPlant_ajax', 'moBarCodePrint_tab', reqData);
	}
	
	factoryInfo.prototype = {
		init: function() {
			$(function() {
				/*初始化全局变量对象*/
				dataGrid = $('#moBarCodePrint_tab'),dataCompany=[],dataFactory=[],showmessage=$('#showMessageInfo'),editIndex = undefined,oldRow=undefined, reg=new RegExp("null","g");
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
                	createTable('tbIMESReport','产品条码打印导出','moBarCodePrint_tab',reqData);
	            });
			});
		}
	}
	var fcfo = new factoryInfo();
	fcfo.init();
})();