
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

					
		//初始化表格
		initGridData = function() {
			    var dgrid = $('#deliveryMode_tab').datagrid('options');
				if(!dgrid) return;
				var reqData = {
					IFS: 'WMS_DC006',
					pageIndex: 1,
					pageSize: dgrid.pageSize
				}
				reqGridData('/iPlant_ajax', 'deliveryMode_tab', reqData);
				
			},
			bindGridData = function(reqData, jsonData) {
				var gridList = {
					name: 'deliveryMode_tab',
					dataType: 'json',
					singleSelect:false,
					columns: [
						[
							{
							field : 'ck',
							checkbox : true
						},{
								field: 'DELIVERY_MODE_NAME',
								title: '出货方式',
								width: 400,
								align: 'center',formatter: function (value) {
					           	if(value != null)
                                return "<span title='" + value + "'>" + value + "</span>";}
							},{
								field: 'DELIVERY_MODE_REMARKS',
								title: '备注',
								width: 420,
								align: 'center',formatter: function (value) {
					           	if(value != null)
                                return "<span title='" + value + "'>" + value + "</span>";}
							},{
								field: 'CREATE_DATE',
								title: '创建日期',
								width: 220,
								align: 'center',formatter: function (value) {
					           	if(value != null)
                                return "<span title='" + value + "'>" + value + "</span>";}
							},{
								field: 'CRT_ID',
								title: '创建人',
								width: 150,
								align: 'center',formatter: function (value) {
					           	if(value != null)
                                return "<span title='" + value + "'>" + value + "</span>";}
							},{
								field: 'UPDATE_DATE',
								title: '修改日期',
								width: 220,
								align: 'center',formatter: function (value) {
					           	if(value != null)
                                return "<span title='" + value + "'>" + value + "</span>";}
							},{
								field: 'UPT_ID',
								title: '修改人',
								width: 150,
								align: 'center',formatter: function (value) {
					           	if(value != null)
                                return "<span title='" + value + "'>" + value + "</span>";}
							}
						]
					],
					onDblClickRow: function(index,row){
						var checkedRows = $('#deliveryMode_tab').datagrid('getSelected');
					if(checkedRows){
				    	 CompanyOpttype=1;
				    	 $("#enditTab").dialog("open").dialog('setTitle', '修改出货方式信息');
				    	 checkFun();
						 $('#deliveryModeType').textbox('setValue', row.DELIVERY_MODE_NAME==null?'':row.DELIVERY_MODE_NAME);
						 $('#remarks').textbox('setValue', row.DELIVERY_MODE_REMARKS==null?'':row.DELIVERY_MODE_REMARKS);
						 cong_id = row.DELIVERY_MODE_ID;
						 checkedRow = 1;
				    }else{
						$.messager.alert("提示", '请选中行再进行修改')
						return false;
				    }
				     }
				}
				initGridView(reqData, gridList);
				$('#deliveryMode_tab').datagrid('loadData', jsonData);
			}
			checkFun = function (){
				var qx = getUpdateRight();
				if(qx=="Y"){
					// $('#txtID').textbox('textbox').attr('disabled', true);
/*			    	 $('#txtBARCODE').textbox('textbox').attr('disabled', false);
			    	 $('#txtRFID').textbox('textbox').attr('disabled', false);*/		    	
			    	 $('#saveID').show();
			    	 $('#cancleID').show();
				}else{
					CompanyOpttype=2;
					// $('#txtID').textbox('textbox').attr('disabled', true);
/*			    	 $('#txtBARCODE').textbox('textbox').attr('disabled', false);
			    	 $('#txtRFID').textbox('textbox').attr('disabled', false);*/
			    	 $('#saveID').hide();
//			    	 $('#cancleID').hide();
				}
				 
			}
			
			/* 添加商品移动信息 */
			addStation = function() {
	        	CompanyOpttype = 0;
	        	checkFun();
				$("#enditTab").dialog("open").dialog('setTitle', '出货方式信息添加');
				$("#fmStation").form("clear");			
			}	
			
			
			setDataNull = function () {           
	             // $('#txtID').textbox('setValue','');              
	          }	

		getDataBySearch = function(){
				var dgrid = $('#deliveryMode_tab').datagrid('options');
				if(!dgrid) return;
				var deliveryModeName = $('#deliveryModeName').val();
				var checkeds = $('#fullMatching').prop('checked');
				var reqData = {
					DELIVERY_MODE_NAME: deliveryModeName,
					CK:checkeds,
					IFS: 'WMS_DC006',
					pageIndex: 1,
					pageSize: dgrid.pageSize
				}
				reqGridData('/iPlant_ajax', 'deliveryMode_tab',reqData);
			}
		/* 修改成品入库配置信息 */			
		updateStation = function() {
			var checkedItems = $('#deliveryMode_tab').datagrid('getSelections');
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
			var row = $("#deliveryMode_tab").datagrid("getSelected");
			if(row) {				
				$("#searchCondition").dialog("close");
				$("#enditTab").dialog("open").dialog('setTitle', '编辑出货方式信息');
				$('#deliveryModeType').textbox('setValue', row.DELIVERY_MODE_NAME==null?'':row.DELIVERY_MODE_NAME);
				$('#remarks').textbox('setValue', row.DELIVERY_MODE_REMARKS==null?'':row.DELIVERY_MODE_REMARKS);
				CompanyOpttype = 1;	
				checkedRow = 0;

			}
			checkFun();
		}


        deleteStation = function () {
    		var checkedItems =  $('#deliveryMode_tab').datagrid('getSelections');
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
               				arrUpdate.push({DELIVERY_MODE_ID:item.DELIVERY_MODE_ID});
                     });
               		 
               		 if(arrUpdate.length>0){
         	          /*批量删除*/
                         var ajaxUpdate = {
                             url: '/iPlant_ajax',
                             dataType: 'JSON',
                             data: {
                                 list: arrUpdate,
                                 IFS: 'WMS_DC008'
                             },
                             successCallBack: function (data) {
	                       	 		$.messager.alert('提示', '删除成功!','',function(){
	                          	      initGridData();
	                               });
                             },
                             errorCallBack: function (data) {
                                 $.messager.alert('提示', '删除失败!');
                                 return;
                             }
                         };
                         iplantAjaxRequest(ajaxUpdate);

               		 }else{
               			messager.alert('<font color=red>删除失败！</font>');
               		 }
               	}
            });      
    	},
        
        
        dataArr={},
        
		//置空查询输入框
		setQueryNull=function() {
			$('#deliveryModeName').textbox('setValue',""),
			$('#fullMatching').prop('checked',false);
		},
       
       
        /*验证修改内容是否重复*/
        saveUpdateValidate = function() {
			var checkedItems = $('#deliveryMode_tab').datagrid('getSelections');
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
				IFServerNo = 'WMS_DC005'
				isid = 'DELIVERY_MODE_ID_SEQ.NextVal';
			} else if(CompanyOpttype == 1) {
				/*if (!saveUpdateValidate()) {
					$.messager.alert("提示", '内容没有更新，请修改')
					return false;
				}*/
				IFServerNo = 'WMS_DC007'
				var checkedItems = $('#deliveryMode_tab').datagrid('getSelections');
				row = checkedItems[0];
			if(checkedRow!=0){
				isid = cong_id;
				}else{isid = row.DELIVERY_MODE_ID;}			
			} else {
				IFServerNo = 'WMS_DC006'
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
					ID:isid, 
					DELIVERY_MODE_NAME: $('#deliveryModeType').val(),
					DELIVERY_MODE_REMARKS:$('#remarks').val(),										
					IFS: IFServerNo
				},
				successCallBack: function(data) {
					var susMsg=getReturnMsg(data);
                	$.messager.alert("提示",susMsg,"",function(){
            			reqGridData('/iPlant_ajax','deliveryMode_tab',{IFS:'WMS_DC006'});
            			$('#enditTab').dialog('close');
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
				var isid ='';
				var cong_id;
				var checkedRow;
				initGridData();	

				$('#btnResets').click(function(){
		            setQueryNull();
		        });
				$('#btnSearch').click(function() {
					getDataBySearch();
				});				
				$('.add').click(function() {
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
				$('.close').click(function() {
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