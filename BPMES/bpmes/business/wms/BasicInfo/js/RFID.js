
(function() {
	function application() {	
		function CurentTime()
	    { 
	        var now = new Date();
	        
	        var year = now.getFullYear();       //年
	        var month = now.getMonth() + 1;     //月
	        var day = now.getDate();            //日
	        
	        var hh = now.getHours();            //时
	        var mm = now.getMinutes();          //分
	        var ss = now.getSeconds();           //秒
	        
	        var clock = year + "-";
	        
	        if(month < 10)
	            clock += "0";
	        
	        clock += month + "-";
	        
	        if(day < 10)
	            clock += "0";
	            
	        clock += day + " ";
	        
	        if(hh < 10)
	            clock += "0";
	            
	        clock += hh + ":";
	        if (mm < 10) clock += '0'; 
	        clock += mm + ":"; 
	         
	        if (ss < 10) clock += '0'; 
	        clock += ss; 
	        return(clock); 
	}
		printConfig = function () {			
			var barcode = $('#txtBARCODE').textbox("getValue");//批次号
			var RFID = $('#txtRFID').textbox("getValue");//供应商编号	
			var mytime=CurentTime(); 
		    data = [];
//		    var printData = $('#RFID_tab').datagrid('getData');
//		    console.log(printData);
//		    for(var i=0;i<printData.rows.length;i++){
		    	data.push({"NumBer":barcode,"RFID":RFID,"Date":mytime});
//		    }
		    var url = getRootPath_web()+"/iPlant_printer",barCodeStr="";
			barCodeStr = {"labName":"wms01.lab","barCodeList":data};
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
		// 向打印机传值
		getprintlist = function() {
						var printData = $('#RFID_tab').datagrid(
								'getSelections'), data = [];
						if (printData.length == 0) {
							$.messager.alert('提示', '请选择一条数据进行打印');
							return;
						}
						for (var i = 0; i < printData.length; i++) {
							data.push({
								"NumBer" : printData[i].BARCODE,
								"RFID" : printData[i].RFID,								
								"Date" : printData[i].CREATE_DATE
							});
						}
						return data;
					},
	    //链接打印机
		barcodePrint = function() {
						var url = getRootPath_web() + "/iPlant_printer", data = getprintlist(), barCodeStr = "";
						barCodeStr = {
							"labName" : "wms01.lab",
							"barCodeList" : data
						};
						// 提交打印信息给socketservice，socketsevice服务下发给socketclient客户端调用打印机打印
						if (data.length > 0) {
							zbSocketPrinter(barCodeStr);
						} else {
							$.messager.alert("提示", "请选择打印数据！")
						}
					},
					
		//初始化表格
		initGridData = function() {
			    var dgrid = $('#RFID_tab').datagrid('options');
				if(!dgrid) return;
				var reqData = {
					IFS: 'WMS_B00056',
					pageIndex: 1,
					pageSize: dgrid.pageSize
				}
				reqGridData('/iPlant_ajax', 'RFID_tab', reqData);
				
			},
			bindGridData = function(reqData, jsonData) {
				var gridList = {
					name: 'RFID_tab',
					dataType: 'json',
					singleSelect:false,
					columns: [
						[
							{
							field : 'ck',
							checkbox : true
						},{
								
								field: 'ID',
								title: 'ID',								
								width: 150,
								align: 'center',formatter: function (value) {
					           	if(value != null)
                return "<span title='" + value + "'>" + value + "</span>";}
							}, {
								field: 'BARCODE',
								title: '条形码',
								width: 180,
								align: 'center',formatter: function (value) {
					           	if(value != null)
                return "<span title='" + value + "'>" + value + "</span>";}
							},{
								field: 'RFID',
								title: 'RFID',
								width: 100,
								align: 'center',formatter: function (value) {
					           	if(value != null)
                return "<span title='" + value + "'>" + value + "</span>";}
							},{
								field : 'ENABLE',
								title : '是否启用',
								width : 100,
								align : 'center',
								formatter : function(value, row, index) {
									if (value == 'Y') {
										return '启用';
									} else {
										return '未启用';
									}
								}
							},{
								field: 'CREATE_DATE',
								title: '创建时间',
								width: 200,
								align: 'center',formatter: function (value) {
					           	if(value != null)
                return "<span title='" + value + "'>" + value + "</span>";}								
							},{
								field: 'UPDATE_DATE',
								title: '修改时间',
								width: 200,
								align: 'center',formatter: function (value) {
					           	if(value != null)
                return "<span title='" + value + "'>" + value + "</span>";}
								}, 

						]
					],
					onDblClickRow: function(index,row){	
				    	 CompanyOpttype=1;
				    	 $("#enditTab").dialog("open").dialog('setTitle', '修改仓库唯一码和RFID关联信息');
				    	 checkFun();
				    	    $('#txtID').textbox('setValue', row.ID==null?'':row.ID);
							$('#txtBARCODE').textbox('setValue', row.BARCODE==null?'':row.BARCODE);
							$('#txtENABLE').val(row.ENABLE);
							$('#txtRFID').textbox('setValue', row.RFID==null?'':row.RFID);
							if ("Y" == row.ENABLE) {
								$('#txtENABLE').prop('checked', 'checked');
						 } else {
								$('#txtENABLE').prop('checked', '');
						 }							
				     }
				}
				initGridView(reqData, gridList);
				$('#RFID_tab').datagrid('loadData', jsonData);
			}
			checkFun = function (){
				var qx = getUpdateRight();
				if(qx=="Y"){
					 $('#txtID').textbox('textbox').attr('disabled', true);
			    	 $('#txtBARCODE').textbox('textbox').attr('disabled', false);
			    	 $('#txtRFID').textbox('textbox').attr('disabled', false);		    	
			    	 $('#saveID').show();
			    	 $('#cancleID').show();
				}else{
					CompanyOpttype=2;
					 $('#txtID').textbox('textbox').attr('disabled', true);
			    	 $('#txtBARCODE').textbox('textbox').attr('disabled', false);
			    	 $('#txtRFID').textbox('textbox').attr('disabled', false);
			    	 $('#saveID').hide();
//			    	 $('#cancleID').hide();
				}
				 
			}		
		setDataNull = function () {           
              $('#txtID').textbox('setValue','');              
          }
		getDataBySearch = function(){
				var dgrid = $('#RFID_tab').datagrid('options');
				if(!dgrid) return;
				var cxBARCODE = $('#queryBARCODE').val();
				var cxRFID = $('#queryRFID').val();				
				var reqData = {
						BARCODE: cxBARCODE,
						RFID: cxRFID,					
					IFS: 'WMS_B00056',
					pageIndex: 1,
					pageSize: dgrid.pageSize
				}
				reqGridData('/iPlant_ajax', 'RFID_tab',reqData);
			}
			/* 修改商品移动信息 */			
		updateStation = function() {
			var checkedItems = $('#RFID_tab').datagrid('getSelections');
			var moveIds = [];
			var num = 0;
			$.each(checkedItems, function(index, item) {
				moveIds.push(item.moveid);
				num++;
			});
			if(num != 1) {
				$.messager.alert('提示', '请选择一条数据进行修改');
				return false;
			}
			var row = $("#RFID_tab").datagrid("getSelected");
			if(row) {				
				$("#searchCondition").dialog("close");
				$("#enditTab").dialog("open").dialog('setTitle', '编辑仓库唯一码和RFID关联信息');
				$('#txtID').textbox('textbox').attr('readonly', true);
				$('#txtID').textbox('textbox').attr('disabled', true);
				$('#txtID').textbox('setValue', row.ID==null?'':row.ID);
				$('#txtBARCODE').textbox('setValue', row.BARCODE==null?'':row.BARCODE);
				$('#txtENABLE').val(row.ENABLE);
				$('#txtRFID').textbox('setValue', row.RFID==null?'':row.RFID);
				CompanyOpttype = 1;	
				if ("Y" == row.ENABLE) {
					$('#txtENABLE').prop('checked', 'checked');
				} else {
					$('#txtENABLE').prop('checked', '');
				}
			}
			checkFun();
		}
		validSelectedData = function (gridName,type) {
            var checkedItems = $(gridName).datagrid('getSelections');
            var num = 0;
            $.each(checkedItems, function (index, item) {
               num++;
            });
            if (type == 'Update') {
                if (num != 1) {
                    return false;
                }
            }
            else {
                if (num <= 0) {
                    return false;
                }
            }
            return true;
        },
        deleteStation = function () {
             var isSelectedData = validSelectedData('#RFID_tab', 'Delete');
             if (!isSelectedData) {
                 $.messager.alert('提示', '请选择一条数据进行删除');
                 return;
             }
             var checkedItems = $('#RFID_tab').datagrid('getSelections');
             //确认提示框
             var delCnt=0;
             $.messager.confirm('确认框', '您确定要删除您所选择的数据?', function (r) {
            	 if(r==true){
            		 $.each(checkedItems, function (index, item) {
            			 delCnt++;
                    	 var ajaxParam = {
                                 url: '/iPlant_ajax',
                                 dataType: 'JSON',
                                 data: {
                                     IFS: 'WMS_B00059',
                                     ID: item.ID,
                                 },
                                 successCallBack:function(data){
                                 	 if(delCnt==checkedItems.length){
	                              	 	if(data.RESPONSE["0"].RESPONSE_HDR.MSG_CODE=='0'){
	                              	 		$.messager.alert('提示', '删除成功!','',function(){
	                                	      initGridData();
	                                     });	
	                              	 	}else{
	                              	 		$.messager.alert('提示','删除失败,此数据正在使用!')
	                              	 	}
	                                     
	                            	 }
                         		},
                         		errorCallBack:function(data){
                         			if(delCnt==checkedItems.length){
                         				$.messager.alert('提示','删除失败,服务器无响应!');
                         			}
                         		}
                          };
                         iplantAjaxRequest(ajaxParam);
                     });
            	 }
             });      
        },
        dataArr={},
        
        getApplyOrder =function(){
            var workOrderData='';
            var ajaxParam={
                url:'/iPlant_ajax',
                data:{
                      IFS:'WMS_B00060',
                },
                successCallBack:function(data){
                    var rowNum=0
                    if(data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS){
                        rowNum=parseInt(data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS);
                        workOrderData=data.RESPONSE["0"].RESPONSE_DATA[0];
                    }
                    $('#txtID').textbox('setValue',workOrderData.ID).textbox('readonly').textbox({ required: true });                                                                         
                }
            } 
            iplantAjaxRequest(ajaxParam); 
        }
		/* 添加商品移动信息 */
		addStation = function() {
        	CompanyOpttype = 0;
        	getApplyOrder();
        	checkFun();
        	$('#txtID').textbox('textbox').attr('readonly',false);
			$('#txtID').textbox('textbox').attr('disabled',false);
			$("#enditTab").dialog("open").dialog('setTitle', '仓库唯一码和RFID关联信息添加');
			$("#fmStation").form("clear");			
		}
        /*验证修改内容是否重复*/
        saveUpdateValidate = function() {
			var checkedItems = $('#RFID_tab').datagrid('getSelections');
			row = checkedItems[0];
			if (row.ID) {
				var isUserYn = 'N';
				if ($('#txtENABLE').is(':checked')) {
					isUserYn = "Y";
				} else {
					isUserYn = "N";
				}
				if ($('#txtID').textbox('getValue') != (row.ID==null?'':row.ID)
						|| $('#txtBARCODE').textbox('getValue') != (row.BARCODE==null?'':row.BARCODE)						
						|| isUserYn != row.USE_YN
						|| $('#txtRFID').textbox('getValue') != (row.RFID==null?'':row.RFID)) {
					return true;
				} else {
					return false;
				}
			}
		}
		savaStation = function() {
			
			var IFServerNo = '';
			var reqData = [];
		    if(CompanyOpttype == 0) {
				IFServerNo = 'WMS_B00057'
			} else if(CompanyOpttype == 1) {
				if (!saveUpdateValidate()) {
					$.messager.alert("提示", '内容没有更新，请修改')
					return false;
				}
				IFServerNo = 'WMS_B00058'
			} else {
				IFServerNo = 'WMS_B00056'
			}
		    var useYn = '';
			if ($('#txtENABLE').is(':checked')) {
				useYn = "Y";
			} else {
				useYn = "N";
			}
			var susMsg = '',
				errorMsg = '';
			if(CompanyOpttype == 0) {
				susMsg = '添加成功';
				errorMsg = '添加失败,请联系管理员';
			} else {
				susMsg = '更新成功';
				errorMsg = '更新失败,请联系管理员';
			}
			if(!checkForm()) return;
			var ajaxParam = {
				url: '/iPlant_ajax',
				dataType: 'JSON',
				data: {
					ID: $('#txtID').val(),
					BARCODE: $('#txtBARCODE').val(),
					ENABLE: useYn,
  				    RFID: $('#txtRFID').val(),									
					IFS: IFServerNo
				},
				successCallBack: function(data) {
					var susMsg=getReturnMsg(data);
                	$.messager.alert("提示",susMsg,"",function(){
            			reqGridData('/iPlant_ajax','RFID_tab',{IFS:'WMS_B00056'});
            			$('#enditTab').dialog('close');
            			setDataNull();
            			initGridData();
            		});
				},
				errorCallBack: function() {
					$.messager.alert('提示', errorMsg);
				}
					
			};
			iplantAjaxRequest(ajaxParam);
			
		}
		
			
	};
	application.prototype = {
		init: function() {
			$(function() {			
				var CompanyOpttype; //0：新增   1:编辑
				initGridData();							
				$('#btnSearch').click(function() {
					getDataBySearch();
				});				
				$('.add').click(function() {					
					setDataNull();
					addStation();
				});
				$('#btnUpdate').click(function() {										
					updateStation();
				});
				$('.save').click(function() {
					savaStation();
				});
				$('#btnDelete').click(function(){
	                deleteStation();
	            });
				$('#btnprint').click(function() {
					barcodePrint();
				});
				$('.close').click(function() {
					setDataNull();
					$('#enditTab').dialog('close');
				});
				$('.panel-tool-close').click(function() {
					setDataNull();
				});
			});
		}
	}
	var fcfo = new application();
	fcfo.init();
})();