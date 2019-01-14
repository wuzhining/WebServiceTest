(function(){
	function returnOrderCreate(){
		
		function initReturnOrder(){
			var returnOrder=$("#queryReturnOrder").textbox("getValue"),Mono=$("#queryMono").textbox("getValue"),MachineNo=$("#queryMachineNo").textbox("getValue"),beginDate=$("#queryBeginDate").datebox("getValue"),endDate=$("#queryEndDate").datebox("getValue");
			var dgrid=$('#'+exports.gridName).datagrid('options');
		    if(!dgrid) return;
		    if(returnOrder=="" || returnOrder==null){
		    	returnOrder = "";
		    };
		    var reqData ={
		    		FEED_ID: returnOrder,
		    		MO_NO: Mono,
		    		MACHINE_NO: MachineNo,
		    		beginDate: beginDate,
		    		endDate: endDate,
			        pageIndex:dgrid.pageNumber,
	                pageSize:dgrid.pageSize,
			        IFS:'WMS_RE00045'
			    };
			reqGridData('/iPlant_ajax',exports.gridName,reqData);
		};
		bindGridData=function (reqData,jsonData){
			 var gridList = {
		    		  name: exports.gridName,
		              dataType: 'json',
		              singleSelect:true,
		              columns:[[
		                    { field: 'SERIAL_NUMBER', title: '物料条码', width: 200 ,align:'center'}, 
		                    { field: 'FEED_ID', title: '投料单号', width: 150 ,align:'center'},
							{ field: 'MO_NO', title: '工单号', width: 150 ,align:'center'},
					   		{ field: 'DO_NO', title: '派工单号', width: 150 ,align:'center'},
					   		{ field: 'MATERIAL_ID', title: '物料编码', width: 120 ,align:'center'},
					   		{ field: 'MATERIAL_NAME', title: '物料名称', width: 120 ,align:'center'},
					   		{ field: 'SUPPLIER_NAME', title: '供应商', width: 120 ,align:'center'},
					   		{ field: 'SPEC_MODEL', title: '规格', width: 200 ,align:'center'},
					   		{ field: 'TOTAL_QTY', title: '投料数量', width: 120 ,align:'center'},
					   		{ field: 'UNIT_NAME', title: '单位', width: 120 ,align:'center'},
					   		{ field: 'MACHINE_NO', title: '机台号', width: 120 ,align:'center'},
					   		{ field: 'EMP_NO', title: '投料人', width: 120 ,align:'center'},
					   		{ field: 'CUST_NAME', title: '客户', width: 120 ,align:'center'},
					   		{ field: 'FEED_DT', title: '投料时间', width: 200 ,align:'center'}
			            ]]
		    	  	}
		     initGridView(reqData, gridList);	  	
			 $('#'+exports.gridName).datagrid('loadData', jsonData);
		};
		function setQueryNull(){
			$("#queryReturnOrder").textbox("setValue","");
			$("#queryMono").textbox("setValue","");
			$("#queryMachineNo").textbox("setValue","");
			$("#queryBeginDate").datebox("setValue","");
			$("#queryEndDate").datebox("setValue","");
		};
		var exports={
			gridName:'returnOrder_tab',
		    initReturnOrder:initReturnOrder,
		    setQueryNull:setQueryNull,
		};
		return exports;
	};
	$(function(){
		var myFun=returnOrderCreate();
		showMessage = $("#showMessageInfo");
		myFun.initReturnOrder();
		$("#btnSearch").click(function(){myFun.initReturnOrder();});
		$("#btnReset").click(function(){myFun.setQueryNull();});
  })
})();

