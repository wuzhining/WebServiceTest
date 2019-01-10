(function(){
	function machineMx(){
		initData = function(zt){
			$('#ccGrid').datagrid({       
					name:'ccGrid',
					dataType: 'json', 
					columns: [[
					            { field: 'POSITION_ID',  title: '货位编号' ,align:'center'},
					            { field: 'ROW_ID',  title: '货位所在行', width: 200,align:'center'},
	       						{ field: 'COLUMN_ID',  title: '货位所在列', width: 150,align:'center'},
	       						{ field: 'MATERIA_ID',  title: '物料编号', width: 150,align:'center'},		
	       		                { field: 'MATERIA_NAME', title: '物料名称', width: 130,align:'center'},
	       		                { field: 'BARCODE', title: '唯一码', width: 200,align:'center'},
	       		                { field: 'POS_BARCODE', title: '货位唯一码', width: 200,align:'center'},
	 	       		            { field: 'PACKAGE_NUMBER', title: '物料打包数量', width: 130,align:'center'},
	 	       		            { field: 'PACKAGE_CAPACITY', title: '每包数量', width: 130,align:'center'},
	 	       		        	{ field: 'P_UNIT_ID', title: '物料打包单位', width: 130,align:'center'},
	 	       		    		{ field: 'P_UNIT_NAME', title: '物料打包名称', width: 130,align:'center'},
	 	       					{ field: 'ORDER_ID', title: '订单编号', width: 130,align:'center'},
	     	       				{ field: 'PURCHASE_NUMBER', title: '采购数量', width: 130,align:'center'},
	 	       		            { field: 'DELIVE_NUMBER', title: '到货数量', width: 130,align:'center'},
	 	       		        	{ field: 'SN_NUMBER', title: '批次号', width: 130,align:'center'},
	 	       		    		{ field: 'P_DELIVE_DATE', title: '预计到货日期', width: 130,align:'center'},
	 	       					{ field: 'UNIT_ID', title: '物料计量单位编号', width: 130,align:'center'},
	     	       				{ field: 'UNIT_NAME', title: '物料计量单位名称', width: 130,align:'center'}
	       				    ]]    
		       	});
			 var ajaxParam={
	     				url:'/iPlant_ajax',
	     				dataType:'JSON',
	     				data:{
	     					SHELF_ID:zt,
	     					IFS:"WMS_B00028"
	     				},
	                    successCallBack:function(data){
	                     	 //赋值
	                     	 arrRow = createSourceObj(data);
	                     	 var i=0;
	                     	 var widthCount = 0;//每行个数
		        	    	 var heightCount = 0;//每列个数
		        	    	 var wid = 0; //每个货位的宽度
		        	    	 var hit = 0; //每个货位的高度
	                     	 if(arrRow.length>0){
	                     		widthCount = arrRow[0].CNUM;
	                     		heightCount= arrRow[0].RNUM;
	                     		hit = parseInt(((document.body.clientHeight)-370-parseInt(heightCount*5)-5-10)/heightCount);
	                     		wid = hit*1.5;
	                     		document.getElementById("zfaxxGrid").style.width=wid*widthCount+widthCount*5+10;
	                     		for(var i = 0; i < heightCount; i++) {   
				       	    		     _row = document.createElement("tr");
				       	    		 	 _row.align="left";
				       	    		     document.getElementById("zfaxxGrid").appendChild(_row); 
				       	    		     for(var j = 0; j < widthCount; j++) {	
				       	    			 	_cell = document.createElement("td"); 
				       	    			 	_cell.nowrap="nowrap";
				       	    			 	_row.appendChild(_cell);
				       	    		 		//加载div
				       	    		 		var _maindiv = document.createElement("div"); 
					       	    		 	_maindiv.style.width=wid+"px";
					       	    		 	_maindiv.style.height=hit+"px";
					       	    		 	if(arrRow[(heightCount-i-1)*widthCount+j].STATUS == 'PST01.02'){
					       	    		 		_maindiv.style.background="url(mxz.jpg)";
					       	    		 	}
					       	    		 	else if(arrRow[(heightCount-i-1)*widthCount+j].STATUS == 'PST01.03'){
					       	    		 		_maindiv.style.background="url(ck.jpg)";
					       	    		 	}
					       	    		 	else if(arrRow[(heightCount-i-1)*widthCount+j].STATUS == 'PST01.01'){
					       	    		 		_maindiv.style.background="url(yfpxz.jpg)";
					       	    		 	}
//					       	    		    if(arrRow[(heightCount-i-1)*widthCount+j].STATUS = 'PST01.03'){
//					       	    		 		_maindiv.style.background="url(ck.jpg)";
//					       	    		 	}
					       	    		    else{
					       	    		 		_maindiv.style.background="url(kw.jpg)";
					       	    		 	}
					       	    		 	
					       	    		 	_maindiv.style.backgroundSize = "100% 100%";
					       	    		 	_maindiv.style.textAlign = "left";
					       	    		 	_maindiv.id = arrRow[(heightCount-i-1)*widthCount+j].LOTID;
					       	    		    _maindiv.ondblclick = function clickImg(){
					       	    		    	addStation();
					       	    		    },
					       	    		 	_maindiv.onclick = function clickImg(){	
					       	    		 	    getRow = this.id;
						       	    		 	var ajaxParam={
							     	     				url:'/iPlant_ajax',
							     	     				dataType:'JSON',
							     	     				data:{
							     	     					POSITION_ID:this.id,
							     	     					IFS:"WMS_C000039"
							     	     				},
							     	                    successCallBack:function(data){
							     	                    	var jsonData ={total:0,rows:[]};
							     	        				if(data.RESPONSE[0].length != 0){
							     	        					jsonData.rows=data.RESPONSE[0].RESPONSE_DATA;
							     	        	 				jsonData.total=data.RESPONSE[0].RESPONSE_DATA.length;
							     	        				}
							     	        				$('#ccGrid').datagrid('loadData',jsonData);
							     	        			
							     	                    }
						     	     		};
						     	     		iplantAjaxRequest(ajaxParam); 
					       	    		 	};
					       	    		 	_cell.appendChild(_maindiv); 
				       	    		 	} 
				       	    	}   
				       	    }
	                    }
	     		};
	     		iplantAjaxRequest(ajaxParam); 
		}
    };
	
    
    setDataNull = function () {           
        $('#txtTEMP_ID_1').textbox('setValue',''); 
        $('#txtTEMP_ID_2').textbox('setValue','');   
    }
    dataArr={},
    getApplyOrder =function(){
        var workOrderData='';
        var ajaxParam={
            url:'/iPlant_ajax',
            data:{
                  IFS:'WMS_B00065',
            },
            successCallBack:function(data){
                var rowNum=0
                if(data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS){
                    rowNum=parseInt(data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS);
                    workOrderData=data.RESPONSE["0"].RESPONSE_DATA[0];
                }
                $('#txtTEMP_ID_1').textbox('setValue',workOrderData.TEMP_ID).textbox('readonly').textbox({ required: true });                                                                         
            }
        } 
        iplantAjaxRequest(ajaxParam); 
    }
	/* 空箱入库 */
	addStation = function() {
		
    	CompanyOpttype = 0;
    	getApplyOrder();
    	$('#txtTEMP_ID_1').textbox('textbox').attr('readonly',false);
		$('#txtTEMP_ID_1').textbox('textbox').attr('disabled',false);			
		$("#enditTab").dialog("open").dialog('setTitle', '仓储出入库中间表信息添加');
		$("#fmStation").form("clear");	
		
		
		var ajaxParam={
			url:'/iPlant_ajax',
			dataType:'JSON',
			data:{
				POSITION_ID:getRow,
				IFS:"WMS_C000042"
			},
             successCallBack:function(data){
            	 var rowCollection=createSourceObj(data);					
 				$('#txtSHELF_NAME_1').textbox('setValue',rowCollection[0].SHELF_NAME),
 				$('#txtROW_ID_1').textbox('setValue',rowCollection[0].ROW_ID),
 				$('#txtCOLUMN_ID_1').textbox('setValue',rowCollection[0].COLUMN_ID),
 				$('#txtDIRECT_1').combobox('setValue','IN'),
 				$('#txtDIRECT_1').combobox('setText','上架'),
 				$('#txtOPERATE_STATUS_1').combobox('setValue','0'),
 				$('#txtOPERATE_STATUS_1').combobox('setText','未处理'),
 				$('#txtDATA_STATUS_1').combobox('setValue','0'),
 				$('#txtDATA_STATUS_1').combobox('setText','未处理')
             }
		};
		iplantAjaxRequest(ajaxParam); 
	}
    /*验证修改内容是否重复*/
//    saveUpdateValidate = function() {
//		var checkedItems = $('#WMSWCSlink_tab').datagrid('getSelections');
//		row = checkedItems[0];
//		if (row.TEMP_ID) {
//			if ($('#txtTEMP_ID_1').textbox('getValue') != (row.TEMP_ID==null?'':row.TEMP_ID)						
//					||$('#txtSHELF_NAME_1').combobox('getValue') != (row.SHELF_NAME==null?'':row.SHELF_NAME)						
//					||$('#txtROW_ID_1').combobox('getValue') != (row.ROW_ID==null?'':row.ROW_ID)
//					||$('#txtCOLUMN_ID_1').combobox('getValue') != (row.COLUMN_ID==null?'':row.COLUMN_ID)						
//					||$('#txtDIRECT_1').combobox('getValue') != (row.DIRECT==null?'':row.DIRECT)
//					||$('#txtOPERATE_STATUS_1').combobox('getValue') != (row.OPERATE_STATUS==null?'':row.OPERATE_STATUS)
//					||$('#txtDATA_STATUS_1').combobox('getValue') != (row.DATA_STATUS==null?'':row.DATA_STATUS)
//					||$('#txtDETAIL_1').textbox('getValue') != (row.DETAIL==null?'':row.DETAIL)
//					||$('#txtBarcode_1').textbox('getValue') != (row.BARCODE==null?'':row.BARCODE)) {
//				return true;
//			} else {
//				return false;
//			}
//		}
//	}
	savaStation = function() {
		
		var IFServerNo = '';
		var reqData = [];
	    if(CompanyOpttype == 0) {
			var ajaxParam = {
				url: '/iPlant_ajax',
				dataType: 'JSON',
				data: {
					TEMP_ID: $('#txtTEMP_ID_1').val(),					
					SHELF_NAME: $('#txtSHELF_NAME_1').combobox('getValue'),
					ROW_ID: $('#txtROW_ID_1').combobox('getValue'),
					COLUMN_ID: $('#txtCOLUMN_ID_1').combobox('getValue'),
					DIRECT: $('#txtDIRECT_1').combobox('getValue'),
					OPERATE_STATUS: $('#txtOPERATE_STATUS_1').combobox('getValue'),
					DATA_STATUS: $('#txtDATA_STATUS_1').combobox('getValue'),
					DETAIL: $('#txtDETAIL_1').val(),
					BARCODE: $('#txtBarcode_1').val(),
					IFS: 'WMS_B00062'
				},
				successCallBack: function(data) {
					var susMsg=getReturnMsg(data);
	            	$.messager.alert("提示",susMsg,"",function(){
	        			$('#enditTab').dialog('close');
	        			setDataNull();
	        			 var reqData = {
	        					    POSITION_ID:getRow,
								    STATUS: 'PST01.02',
								    BARCODE: 'N',
									IFS: 'WMS_C000043'
								}
							   universalAccess('/iPlant_ajax',reqData);
	        		});
	            	
	            	
				},
				errorCallBack: function() {
					$.messager.alert('提示', errorMsg);
				}
					
			};
			iplantAjaxRequest(ajaxParam);
		} 
//	    else if(CompanyOpttype == 1) {
//			if (!saveUpdateValidate()) {
//				$.messager.alert("提示", '内容没有更新，请修改')
//				return false;
//			}
//			IFServerNo = 'WMS_B00063'
//		}
		else {
			IFServerNo = 'WMS_B00061'
		}
		var susMsg = '',
			errorMsg = '';
		if(CompanyOpttype == 0) {
			susMsg = '添加成功';
			errorMsg = '添加失败,请联系管理员';
		} 
//		else {
//			susMsg = '更新成功';
//			errorMsg = '更新失败,请联系管理员';
//		}
		if(!checkForm()) return;
//		var ajaxParam = {
//			url: '/iPlant_ajax',
//			dataType: 'JSON',
//			data: {
//				TEMP_ID: $('#txtTEMP_ID_1').val(),					
//				SHELF_NAME: $('#txtSHELF_NAME_1').combobox('getValue'),
//				ROW_ID: $('#txtROW_ID_1').combobox('getValue'),
//				COLUMN_ID: $('#txtCOLUMN_ID_1').combobox('getValue'),
//				DIRECT: $('#txtDIRECT_1').combobox('getValue'),
//				OPERATE_STATUS: $('#txtOPERATE_STATUS_1').combobox('getValue'),
//				DATA_STATUS: $('#txtDATA_STATUS_1').combobox('getValue'),
//				DETAIL: $('#txtDETAIL_1').val(),
//				BARCODE: $('#txtBarcode_1').val(),
//				IFS: IFServerNo
//			},
//			successCallBack: function(data) {
//				var susMsg=getReturnMsg(data);
//            	$.messager.alert("提示",susMsg,"",function(){
////        			reqGridData('/iPlant_ajax','WMSWCSlink_tab',{IFS:'WMS_B00061'});
//        			$('#enditTab').dialog('close');
//        			setDataNull();
////        			initGridData();
//        		});
//			},
//			errorCallBack: function() {
//				$.messager.alert('提示', errorMsg);
//			}
//				
//		};
//		iplantAjaxRequest(ajaxParam);
//		
	};
	
	
//	空箱出库
    
	getApplyOrder2 =function(){
        var workOrderData='';
        var ajaxParam={
            url:'/iPlant_ajax',
            data:{
                  IFS:'WMS_B00065',
            },
            successCallBack:function(data){
                var rowNum=0
                if(data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS){
                    rowNum=parseInt(data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS);
                    workOrderData=data.RESPONSE["0"].RESPONSE_DATA[0];
                }
                $('#txtTEMP_ID_2').textbox('setValue',workOrderData.TEMP_ID).textbox('readonly').textbox({ required: true });                                                                         
            }
        } 
        iplantAjaxRequest(ajaxParam); 
    }
	addStation2 = function() {
		
    	CompanyOpttype = 0;
    	getApplyOrder2();
    	$('#txtTEMP_ID_2').textbox('textbox').attr('readonly',false);
		$('#txtTEMP_ID_2').textbox('textbox').attr('disabled',false);			
		$("#enditTab2").dialog("open").dialog('setTitle', '仓储出入库中间表信息添加');
		$("#fmStation2").form("clear");	
		
		
		var ajaxParam={
			url:'/iPlant_ajax',
			dataType:'JSON',
			data:{
				POSITION_ID:getRow,
				IFS:"WMS_C000042"
			},
             successCallBack:function(data){
            	 var rowCollection=createSourceObj(data);					
 				$('#txtSHELF_NAME_2').textbox('setValue',rowCollection[0].SHELF_NAME),
 				$('#txtROW_ID_2').textbox('setValue',rowCollection[0].ROW_ID),
 				$('#txtCOLUMN_ID_2').textbox('setValue',rowCollection[0].COLUMN_ID),
 				$('#txtDIRECT_2').combobox('setValue','OUT'),
 				$('#txtDIRECT_2').combobox('setText','下架'),
 				$('#txtOPERATE_STATUS_2').combobox('setValue','0'),
 				$('#txtOPERATE_STATUS_2').combobox('setText','未处理'),
 				$('#txtDATA_STATUS_2').combobox('setValue','0'),
 				$('#txtDATA_STATUS_2').combobox('setText','未处理')
             }
		};
		iplantAjaxRequest(ajaxParam); 
	}
	savaStation2 = function() {
		
		var IFServerNo = '';
		var reqData = [];
	    if(CompanyOpttype == 0) {
			var ajaxParam = {
				url: '/iPlant_ajax',
				dataType: 'JSON',
				data: {
					TEMP_ID: $('#txtTEMP_ID_2').val(),					
					SHELF_NAME: $('#txtSHELF_NAME_2').textbox('getValue'),
					ROW_ID: $('#txtROW_ID_2').textbox('getValue'),
					COLUMN_ID: $('#txtCOLUMN_ID_2').textbox('getValue'),
					DIRECT: $('#txtDIRECT_2').combobox('getValue'),
					OPERATE_STATUS: $('#txtOPERATE_STATUS_2').combobox('getValue'),
					DATA_STATUS: $('#txtDATA_STATUS_2').combobox('getValue'),
					DETAIL: $('#txtDETAIL_2').val(),
					BARCODE: $('#txtBarcode_2').val(),
					IFS: 'WMS_B00062'
				},
				successCallBack: function(data) {
					var susMsg=getReturnMsg(data);
	            	$.messager.alert("提示",susMsg,"",function(){
	        			$('#enditTab2').dialog('close');
	        			setDataNull();
	        			 var reqData = {
	        					    POSITION_ID:getRow,
								    STATUS: 'PST01.03',
								    BARCODE: '',
									IFS: 'WMS_C000043'
								}
							   universalAccess('/iPlant_ajax',reqData);
	        		});
				},
				errorCallBack: function() {
					$.messager.alert('提示', errorMsg);
				}
					
			};
			iplantAjaxRequest(ajaxParam);
		} 

		else {
			IFServerNo = 'WMS_B00061'
		}
		var susMsg = '',
			errorMsg = '';
		if(CompanyOpttype == 0) {
			susMsg = '添加成功';
			errorMsg = '添加失败,请联系管理员';
		} 

		if(!checkForm()) return;	
	};
	
	
	machineMx.prototype={
	    init:function(){
	    	 $(function(){
	    		 var zt = getQueryString("zt");
	    		 initData(zt); 
	    		 
	    		 $('#btnNullin').click(function(){
	    		   if(getRow ==null || getRow==''){
	    			 $.messager.alert("提示", '请选择货箱！')
	    		       }	
	    		   else{
	    			   setDataNull();
					   addStation();
	    		   }
	                 
	             });
	             $('#btnNullout').click(function(){
	            	 if(getRow ==null || getRow==''){
		    			 $.messager.alert("提示", '请选择货箱！')
		    		       }	
		    		   else{
		    			   setDataNull();
						   addStation2();
		    		   } 
	             });
//	             $('#btnEnoughin').click(function(){
//	            	 if(getRow ==null || getRow==''){
//		    			 $.messager.alert("提示", '请选择货箱！')
//		    		       }	
//		    		   else{
//		    			   $.messager.alert("提示", '已选中货箱！')
//		    		   }
//	             });
//	             $('#btnEnoughout').click(function(){
//	            	 if(getRow ==null || getRow==''){
//		    			 $.messager.alert("提示", '请选择货箱！')
//		    		       }	
//		    		   else{
//		    			   $.messager.alert("提示", '已选中货箱！')
//		    		   }  
//	             });
	             $('.save').click(function() {
						savaStation();
					});
	         });
	    	 
        }
   }
	var bc = new machineMx();
	var arrRow=[];//所有机器
	var getRow=[];
    bc.init();
})();