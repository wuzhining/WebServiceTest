/* 启动时加载 */
/*
 */
(function() {
	function barCodePrint() {
		initGridData = function() {
			//初始化查询数据
			initComboboxData();
			/*var lbi = $("#labelBarInfo"),lmi=$("#labelMoInfo"),bnt = $('#barNameTxt'),mnt = $('#moNoTxt');
			$("#queryFunType").combobox({
		    	onChange: function (n,o) {
		    		if(n=='MB00026'){
		    			lbi.html('名称 ：');
		    			bnt.textbox('textbox').attr({'display':'block'});
		    			lmi.html('');
		    			mnt.textbox('textbox').css({'display':'none'});
		    		}else if(n=='MB00030'){
		    			$("#labelInfo").html('名称 ：');
		    		}else if(n=='W000001'){
		    			$("#labelInfo").html('名称 ：');
		    		}else if(n=='WMS_BP00021'){
		    			$("#labelInfo").html('名称 ：');
		    		}
		    	}
	    	});*/
			var data = $('#queryFunType').combobox('getData');
		    $("#queryFunType ").combobox('select',data[0].value);
		    searchDataByCondition();
		},
		bindGridData = function(reqData, jsonData) {
			var queryFunType = $('#queryFunType').combobox('getValue'),dataColumn;
			if(queryFunType=='MB00026'){
				dataColumn=[
				    {field : "CZ",width : 10,checkbox : true},
					{field: 'PRF_CD',title: '工序编码',width: 200,align: 'center'},
					{field: 'PRF_NM',title: '工序名称',width: 200,align: 'center'}, 
					{field: 'BAR_CODE',title: '工序条码',width: 200,align: 'center'}, 
					{field: 'CRT_ID',title: '创建人',width: 100,align: 'center'},
					{field: 'CRT_DT',title: '创建时间',width: 150,align: 'center'} 
				];
			}else if(queryFunType=='MB00030'){
				dataColumn=[
				    {field : "CZ",width : 10,checkbox : true},
					{field: 'MO_NO',title: '工单',width: 200,align: 'center'},
					{field: 'ET_CD',title: '设备编码',width: 200,align: 'center'},
					{field: 'ET_NM',title: '设备名称',width: 200,align: 'center'}, 
					{field: 'BAR_CODE',title: '设备条码',width: 200,align: 'center'}, 
					{field: 'CRT_ID',title: '创建人',width: 100,align: 'center'},
					{field: 'CRT_DT',title: '创建时间',width: 200,align: 'center'} 
				];
			}else if(queryFunType=='W000001'){
				dataColumn=[
				    {field : "CZ",width : 10,checkbox : true},
					{field: 'MO_NO',title: '工单',width: 200,align: 'center'},
					{field: 'ITEM_NM',title: '物料名称',width: 200,align: 'center'}, 
					{field: 'MO_STATE_NM',title: '状态',width: 200,align: 'center'}, 
					{field: 'CRT_ID',title: '创建人',width: 100,align: 'center'},
					{field: 'CRT_DT',title: '创建时间',width: 200,align: 'center'} 
				];
			}else if(queryFunType=='D000037'){
				dataColumn=[
				    {field : "CZ",width : 10,checkbox : true},
					{field: 'EMP_NO',title: '员工编号',width: 200,align: 'center'},
					{field: 'USE_NM',title: '员工姓名',width: 200,align: 'center'}, 
					{field: 'BAR_CN',title: '员工条码',width: 200,align: 'center'}, 
					{field: 'GR_CD',title: '所属用户组编码',width: 100,align: 'center'},
					{field: 'GR_NM',title: '所属用户组',width: 200,align: 'center'} 
				];
			}else if(queryFunType=='WMS_BP00021'){
				dataColumn=[
		            {field : "CZ",width : 10,checkbox : true},
		            {field : 'CHECKIN_ID',title:'录入编码 ',width:100}, 
		    		{field : 'CHECKIN_NAME',title : '录入名称 ',width : 100},
		    		{field : 'MATERIA_ID',title : '物料编码 ',width : 200}, 
		    		{field : 'MATERIA_NAME',title : '物料名称',width : 100}, 
		    		{field : 'UNIT_ID',title : '物料单位ID',width : 100},
		    		{field : 'UNIT_NAME',title : '物料单位',width : 100},
		    		{field : 'PACKAGE_NUMBER',title : '打包数量',width : 100}, 
		    		{field : 'PACKAGE_CAPACITY',title : '每包数量',width : 100},
		    		{field : 'BARCODE',title : '物料条码',width : 100}, 
		    		{field : 'CHECKIN_STATUS',title : '状态',width : 100}
			    ];
			}else if(queryFunType=='resultList'){
				dataColumn=[
		            {field : "CZ",width : 10,checkbox : true},
		            {field : 'BAR_CODE',title:'系统条码 ',width:200}, 
		    		{field : 'BAR_NM',title : '条码名称 ',width : 200},
		    		{field : 'SYS_DESC',title : '描述',width : 200}
			    ];
			}
			var gridList = {
				name: 'barCodePrint_tab',
				dataType: 'json',
				singleSelect:false,
				columns: [dataColumn]
			}
			initGridMultiView(reqData, gridList);
			dataGrid.datagrid('loadData', jsonData);
		},
		initComboboxData = function (){
	        $('#queryFunType').combobox({
	          data:[
	            {value:'MB00026',text:'工序条码'},
	            {value:'MB00030',text:'工单对应设备条码'},
	            {value:'W000001',text:'工单条码'},
	            {value:'D000037',text:'员工条码'},
	            {value:'WMS_BP00021',text:'物料条码'},
	            {value:'resultList',text:'系统条码'}
	          ],
	          valueField:'value',
	          textField:'text',
	          panelHeight:80 
	        });
		},
		 /*删除操作*/
		printConfig = function () {
			var queryFunType = $('#queryFunType').combobox('getValue');
			var checkedItems = $('#barCodePrint_tab').datagrid('getSelections');
            if (checkedItems.length==0) {
                $.messager.alert('提示', '请选择一条数据进行打印');
                return;
            }
            //确认提示框
            var delCnt=0;
            $.messager.confirm('确认框', '您确定要打印您所选择的条码?', function (r) {
	           	if(r==true){
	           		 $.each(checkedItems, function (index, item) {
	           			if(queryFunType=='MB00026'){
	           				barCodePrinter(item.BAR_CODE,'工序',item.PRF_NM,'');
	        			}else if(queryFunType=='MB00030'){
	        				barCodePrinter(item.BAR_CODE,'工单设备',item.ET_NM,'');
	        			}else if(queryFunType=='W000001'){
	        				barCodePrinter(item.MO_NO,'工单物料',item.ITEM_NM,'');
	        			}else if(queryFunType=='D000037'){
	        				barCodePrinter(item.BAR_CN,'员工姓名',item.USE_NM+'  '+item.GR_NM,'');
	        			}else if(queryFunType=='WMS_BP00021'){
	        				barCodePrinter(item.BARCODE,'物料'+item.MATERIA_NAME,item.UNIT_NAME,item.PACKAGE_CAPACITY);
	        			}else if(queryFunType=='resultList'){
	        				barCodePrinter(item.BAR_CODE,item.BAR_NM,item.SYS_DESC,'');
	        			}
	                 });
	           	}
            });
            /*var print_epl = $('#print_epl')[0];
            print_epl.Open_Port("ZDesigner GK888t (EPL)");//选择打印机
            print_epl.Begin_Job("2", "12", "False", "B");//设置其实位置? 
            print_epl.Print_BarCode(20, 160, "1234567890", "1", "48", "2", "6", "N", "0");//设置条码图片
            print_epl.Print_Winfont(120, 120, "1234567890", "宋体", 25, 13, "True", "False", "False", "False", "False");//添加文字label 
            print_epl.End_Job();//结束符
            print_epl.Close_Port();//关闭
            print_epl.Printing_USBPORT("ZDesigner GK888t (EPL)");//启动打印机打印
*/       },
       barCodePrinter=function(barCode,tilte,content,num){
    	   var pi = {
                   url: "/iPlant_ajax",
                   dataType: "JSON",
                   data: {
                       IFS: "B000141",
                       barCode:barCode,
                       title:tilte,
                       content:content,
                       num:num
                   },
                   successCallBack: function(data) {
                   	console.log(data);
                   },
                   errorCallBack: function() {
                       $.messager.alert("提示", e)
                   }
               };
   			iplantAjaxRequest(pi)
       },
       barCodePrinterList=function(dataList){
    	   var pi = {
               url: "/iPlant_ajax",
               dataType: "JSON",
               data: {
                   IFS: "B000142",
                   dataList:dataList
               },
               successCallBack: function(data) {
               	console.log(data);
               },
               errorCallBack: function() {
                   $.messager.alert("提示", e)
               }
           	};
   			iplantAjaxRequest(pi)
       },
       searchDataByCondition =function (){
    	    var url='/iPlant_ajax';
			var queryFunType = $('#queryFunType').combobox('getValue'),barNameTxt = $('#barNameTxt').textbox('getValue'),moNoTxt = $('#moNoTxt').textbox('getValue');
			var dgrid = dataGrid.datagrid('options'),barName,prfType,moNo,userYn,url;
			if(queryFunType=='MB00026'){
				barName = 'PRF_NM';
				prfType = 'PRF_TYPE';
				moNo = 'MO_NO';
			}else if(queryFunType=='MB00030'){
				barName = 'ET_NM';
				moNo = 'MO_NO';
			}else if(queryFunType=='W000001'){
				moNo = 'MO_NO';
			}else if(queryFunType=='D000037'){
				barName = 'EMP_NM';
				userYn = 'USE_YN';
			}else if(queryFunType=='WMS_BP00021'){
				moNo = 'MO_NO';
			}
			var reqData ={

		        	IFS:queryFunType,
		        	pageIndex:1,
		        	pageSize:dgrid.pageSize
		   };
			if(queryFunType=='resultList'){
				url='barCodePrintData.json';
				$.extend(reqData,{staticFlag:1});
				
			}else{
		        reqData[barName]=barNameTxt;
		        reqData[moNo]=moNoTxt;
		        if(checkNotEmpty(prfType)){
		        	reqData[prfType]='-1';
		        }
		        if(checkNotEmpty(userYn)){
		        	reqData[userYn]='Y';
		        }
		    }
		
			reqGridData(url,'barCodePrint_tab',reqData);
	    },
	    
	    webBrowserZb = function (){
	    	//设置打印格式，可循环打印
	    	$("#bcTarget_tiaoxingma").barcode({code: "1234567", crc:false}, "int25",{barWidth:2, barHeight:20});  
	    	//bcTarget5中ie8一下render用table   ie9以上用canvas  两个不同的渲染     
    		var LODOP=getLodop(document.getElementById('LODOP_OB'),document.getElementById('LODOP_EM'));    
    		var strFormHtml="<body style='margin-top: 15px;margin-left: 15px;'>"+document.getElementById('biaoqian').innerHTML+"</body>";
    		strFormHtml.replace('<div','<span');
    		strFormHtml.replace('</div','</span');
    		LODOP.SET_PRINT_PAGESIZE(1,80,80,'');
    		LODOP.ADD_PRINT_HTM(0,0,80,80,strFormHtml);
    		//LODOP.PREVIEW();
    		LODOP.PRINT(); 
	    },
	    getPrinterList = function(){
	    	var queryFunType = $('#queryFunType').combobox('getValue'),checkedItems = $('#barCodePrint_tab').datagrid('getSelections'),delCnt=0,data=[];
	    	if (checkedItems.length==0) {
                $.messager.alert('提示', '请选择一条数据进行打印');
                return;
            }
	    	for(var i=0;i<checkedItems.length;i++){
       			data.push({"SN":checkedItems[i].BAR_CODE,"ProductNo":checkedItems[i].BAR_CODE,"SUPNO":checkedItems[i].BAR_CODE,"RN":"123456789","PTime":"2017-04-08 10:00:00","LOTNO":"123456789","NUM":"100"});
       		 }
	    	return data;
	    },
	    webSocketZb = function (){
	    	var url = getRootPath_web()+"/iPlant_printer",data = getPrinterList(),barCodeStr="";
	    	barCodeStr = {"type":"01","barCodeList":data};
            //提交打印信息给socketservice，socketsevice服务下发给socketclient客户端调用打印机打印
	    	if(data.length>0){
	    		$.ajax({
	                type: "POST",
	                url: url,
	                //dataType: "json",
	                contentType: "application/x-www-form-urlencoded; charset=utf-8",
	                async: true,
	                data: {"dataList":JSON.stringify(barCodeStr)},
	                success: function (data) {
	                	console.log(data);
	                },
	                error:function(e){
	                }
	            });
	    	}else{
	    		 $.messager.alert("提示", "请选择打印数据！")
	    	}
	    }
	}

	barCodePrint.prototype = {
		init: function() {
			$(function() {
				//dataResult=[{'BAR_CODE':'OK','BAR_NM':'测试通过','SYS_DESC':'测试判定结果'},{'BAR_CODE':'NG','BAR_NM':'测试不通过','SYS_DESC':'测试判定结果'}];
				//初始化全局变量对象
				dataGrid = $('#barCodePrint_tab'), showmessage=$('#showMessageInfo');
				initGridData();
				$('#btnSearch').click(function(){
					searchDataByCondition(); 
				});
				
				$('#btnPrint').click(function(){
					//printConfig();
					webSocketZb();
				});
			});
		}
	}
	var bcp = new barCodePrint();
	bcp.init();
})();