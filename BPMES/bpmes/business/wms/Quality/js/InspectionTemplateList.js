
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
			    var dgrid = $('#productWConf_tab').datagrid('options');
				if(!dgrid) return;
				var reqData = {
					IFS: 'WMS_DC002',
					pageIndex: 1,
					pageSize: dgrid.pageSize
				}
				reqGridData('/iPlant_ajax', 'productWConf_tab', reqData);
				
			},
			bindGridData = function(reqData, jsonData) {
				var gridList = {
					name: 'productWConf_tab',
					dataType: 'json',
					singleSelect:false,
					columns: [
						[
							{
							field : 'ck',
							checkbox : true
						},{
								field: 'CONFIGURATION_NAME',
								title: '配置名称',
								width: 400,
								align: 'center',formatter: function (value) {
					           	if(value != null)
                                return "<span title='" + value + "'>" + value + "</span>";}
							},{
								field : 'CONFIGURATION_DESC',
								title : '配置描述',
								width : 100,
								align : 'center',
								formatter : function(value, row, index) {
									if (value == 'Y') {
										return '是';
									} else {
										return '否';
									}
								}
							},{
								field: 'REMARKS',
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
						var checkedRows = $('#productWConf_tab').datagrid('getSelected');
						if(checkedRows){
				    	 CompanyOpttype=1;
				    	 $("#enditTab").dialog("open").dialog('setTitle', '修改成品入库配置信息');
				    	 checkFun();
						 $('#config_Name').combobox('setValue', row.CONFIGURATION_NAME==null?'':row.CONFIGURATION_NAME);
						 $('#config_Desc').combobox('setValue', row.CONFIGURATION_DESC==null?'':row.CONFIGURATION_DESC);
						 $('#remarks').textbox('setValue', row.REMARKS==null?'':row.REMARKS);
						 cong_id = row.CONFIG_ID;
						 checkedRow=1;
					    }else{
							$.messager.alert("提示", '请选中行再进行修改')
							return false;
					    }
						 
						 
				     }
				}
				initGridView(reqData, gridList);
				$('#productWConf_tab').datagrid('loadData', jsonData);
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
				$("#enditTab").dialog("open").dialog('setTitle', '成品入库配置信息添加');
				$("#fmStation").form("clear");			
			}	
			
			
			setDataNull = function () {           
	             // $('#txtID').textbox('setValue','');              
	          }	

		getDataBySearch = function(){
				var dgrid = $('#productWConf_tab').datagrid('options');
				if(!dgrid) return;
				var configName = $('#configName').val();
				var checkeds = $('#fullMatching').prop('checked');
				var reqData = {
					CONFIGURATION_NAME: configName,
					CK:checkeds,
					IFS: 'WMS_DC002',
					pageIndex: 1,
					pageSize: dgrid.pageSize
				};
				reqGridData('/iPlant_ajax', 'productWConf_tab',reqData);
			};
		/* 修改成品入库配置信息 */			
		updateStation = function() {
			var checkedItems = $('#productWConf_tab').datagrid('getSelections');
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
			var row = $("#productWConf_tab").datagrid("getSelected");
			if(row) {				
				$("#searchCondition").dialog("close");
				$("#enditTab").dialog("open").dialog('setTitle', '编辑修改成品入库配置信息');
				$('#config_Name').combobox('setValue', row.CONFIGURATION_NAME==null?'':row.CONFIGURATION_NAME);
				$('#config_Desc').combobox('setValue', row.CONFIGURATION_DESC==null?'':row.CONFIGURATION_DESC);
				$('#remarks').textbox('setValue', row.REMARKS==null?'':row.REMARKS);
				CompanyOpttype = 1;	
				checkedRow = 0;

			}
			checkFun();
		}


        deleteStation = function () {
    		var checkedItems =  $('#productWConf_tab').datagrid('getSelections');
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
               				arrUpdate.push({CONFIG_ID:item.CONFIG_ID});
                     });
               		 
               		 if(arrUpdate.length>0){
         	          /*批量删除*/
                         var ajaxUpdate = {
                             url: '/iPlant_ajax',
                             dataType: 'JSON',
                             data: {
                                 list: arrUpdate,
                                 IFS: 'WMS_DC004'
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
               			showmessage.html('<font color=red>删除失败，此工单不是创建状态！</font>');
               		 }
               	}
            });      
    	},
        
        
        dataArr={},
        
		//置空查询输入框
		setQueryNull=function() {
			$('#configName').textbox('setValue',""),
			$('#fullMatching').prop('checked',false);
		},
       
       
        /*验证修改内容是否重复*/
        saveUpdateValidate = function() {
			var checkedItems = $('#productWConf_tab').datagrid('getSelections');
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

	    /*必填项空值验证*/
		   checkSelect=function() {
				pass = true; 
				$("select[required]").each(function(){
					if((this.value == '')&&($(this).combobox('getText')=='')) { 
						text = $(this).parent().prev().text(); 
						$.messager.alert('提示',text+"必填项不能为空"); 
						this.focus(); 
						pass = false; 
						return false;//跳出each 
					} 
				}); 
				return pass; 
			};
		
		savaStation = function() {			
			var IFServerNo = '';
			var reqData = [];
		    if(CompanyOpttype == 0) {
				IFServerNo = 'WMS_DC001'
				isid = 'CONFIG_ID_SEQ.NextVal';
			} else if(CompanyOpttype == 1) {
				/*if (!saveUpdateValidate()) {
					$.messager.alert("提示", '内容没有更新，请修改')
					return false;
				}*/
				IFServerNo = 'WMS_DC003'
				var checkedItems = $('#productWConf_tab').datagrid('getSelections');
				row = checkedItems[0];
			if(checkedRow!=0){
				isid = cong_id;
				}else{
					isid = row.CONFIG_ID;
				}
			} else {
				IFServerNo = 'WMS_DC002'
			}

		   var useYn=$('#config_Desc').combobox("getValue");
		   var config_Name=$('#config_Name').combobox("getValue");

			var susMsg = '',
				errorMsg = '';
			if(CompanyOpttype == 0) {
				susMsg = '添加成功';
				errorMsg = '添加失败,请联系管理员';
			} else {
				susMsg = '更新成功';
				errorMsg = '更新失败,请联系管理员';
			}
			if(!checkSelect()) return;
			if(!checkForm()) return;
			var ajaxParam = {
				url: '/iPlant_ajax',
				dataType: 'JSON',
				data: {
					ID:isid, 
					CONFIGURATION_NAME: config_Name,
					CONFIGURATION_DESC: useYn,
					REMARKS: $('#remarks').val(),									
					IFS: IFServerNo
				},
				successCallBack: function(data) {
					var susMsg=getReturnMsg(data);
                	$.messager.alert("提示",susMsg,"",function(){
            			reqGridData('/iPlant_ajax','productWConf_tab',{IFS:'WMS_DC002'});
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
		          $('#config_Desc').combobox({
		              data:[
			              {value:'Y',text:'是'},
			              {value:'N',text:'否'}              
		              ],
		              valueField:'value',
		              textField:'text',
		              panelHeight:100, 
		            });
		          
		          $('#config_Name').combobox({
		              data:[
			              {value:'是否启用PDA入库扫描',text:'是否启用PDA入库扫描'},
			              {value:'是否启用PDA备货扫描',text:'是否启用PDA备货扫描'},
			              {value:'是否启用OQC',text:'是否启用OQC'},
			              {value:'选择PDA入库扫描单据类型',text:'选择PDA入库扫描单据类型'},
			              {value:'是否启用FQC',text:'是否启用FQC'}  
		              ],
		              valueField:'value',
		              textField:'text',
		              panelHeight:100, 
		            });
		          
		          
				
				$('#btnResets').click(function(){
		            setQueryNull();
		        });
				$('#btnSearch').click(function() {
					getDataBySearch();
				});				
				$('.add').click(function() {
					//insertDataGrid('productWConf_tab',{CONFIG_ID:autoCreateCode('Cfg')});
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