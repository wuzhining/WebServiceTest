
(function() {
	function application() {					
		//初始化表格
		initGridData = function() {
			    var dgrid = $('#IQCCheckConfig_tab').datagrid('options');
				if(!dgrid) return;
				var reqData = {
					IFS: 'WMS_DC025',
					pageIndex: 1,
					pageSize: dgrid.pageSize
				}
				reqGridData('/iPlant_ajax', 'IQCCheckConfig_tab', reqData);
			},
			bindGridData = function(reqData, jsonData) {
				var gridList = {
					name: 'IQCCheckConfig_tab',
					dataType: 'json',
					singleSelect:false,
					columns: [
						[
							{
							field : 'ck',
							checkbox : true
						},{
								field: 'CHECKTYPE',
								title: '检验结果',
								width: 300,
								align: 'center',formatter: function (value) {
					           	if(value != null)
                                return "<span title='" + value + "'>" + value + "</span>";}
							},{
								field: 'MATERIALSTATUS',
								title: '物料状态',
								width: 150,
								align: 'center',formatter: function (value) {
						        if(value != null)
	                            return "<span title='" + value + "'>" + value + "</span>";}
							},{
								field: 'ISSTORAGE',
								title: '是否可入库',
								width: 150,
								align: 'center',
                               formatter : function(value, row, index) {
									if (value == '1') {
										return '是';
									} else {
										return '否';
									}
								}
							},{
								field: 'ISGLOBAL',
								title: '系统内置',
								width: 150,
								align: 'center',formatter: function (value) {
					           	if(value != null)
                                return "<span title='" + value + "'>" + value + "</span>";}
							},{
								field: 'REMARK',
								title: '备注',
								width: 300,
								align: 'center',formatter: function (value) {
					           	if(value != null)
                                return "<span title='" + value + "'>" + value + "</span>";}
							},{
								field: 'CREATE_DATE',
								title: '创建日期',
								width: 230,
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
								width: 230,
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
						var checkedItems = $('#IQCCheckConfig_tab').datagrid('getSelections');
						if(checkedItems.length !=1){
							$.messager.alert('提示', '请选择一条数据进行修改');
							return false;
						};

							$("#searchCondition").dialog("close");
							$("#enditTab").dialog("open").dialog('setTitle', '编辑IQC检验配置信息');
						    $('#IQCCheckResult').textbox('setValue', row.CHECKTYPE==null?'':row.CHECKTYPE);
							$('#materielCheckStatus').combobox('setValue',row.MATERIALSTATUS==null?'':row.MATERIALSTATUS);	
							if(row.ISSTORAGE == 1){
								 $('#checkWarehousing').prop('checked',true);
							}else{
								$('#checkWarehousing').prop('checked',false);
							}	
							$('#remarks').val(row.REMARK==null?'':row.REMARK);
							 cong_id = row.IQCCHECKCONFIG_ID;
							 checkedRow=1;
							 CompanyOpttype=1;

				     }
				}
				initGridView(reqData, gridList);
				$('#IQCCheckConfig_tab').datagrid('loadData', jsonData);
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
				$("#enditTab").dialog("open").dialog('setTitle', '新增IQC检验配置信息');
				$("#fmStation").form("clear");	
			}	
			
			
			setDataNull = function () {           
	              $('#QcheckResult').textbox('setValue','');  

	          }	

		getDataBySearch = function(){
				var dgrid = $('#IQCCheckConfig_tab').datagrid('options');
				if(!dgrid) return;
				var QcheckResult = $('#QcheckResult').textbox('getValue');
				var reqData = {
					CHECKTYPE: QcheckResult,
					IFS: 'WMS_DC025',
					pageIndex: 1,
					pageSize: dgrid.pageSize
				}
				reqGridData('/iPlant_ajax', 'IQCCheckConfig_tab',reqData);
			}
		
		
	
		
		
		/* 修改成品入库配置信息 */			
		updateStation = function() {
			var checkedItems = $('#IQCCheckConfig_tab').datagrid('getSelections');
			if(checkedItems.length !=1){
				$.messager.alert('提示', '请选择一条数据进行修改');
				return false;
			};

				$("#searchCondition").dialog("close");
				$("#enditTab").dialog("open").dialog('setTitle', '编辑IQC检验配置信息');
			    $('#IQCCheckResult').textbox('setValue', checkedItems[0].CHECKTYPE==null?'':checkedItems[0].CHECKTYPE);
				$('#materielCheckStatus').combobox('setValue', checkedItems[0].MATERIALSTATUS==null?'':checkedItems[0].MATERIALSTATUS);			
				if(checkedItems[0].ISSTORAGE == 1){
					 $('#checkWarehousing').prop('checked',true);
				}else{
					$('#checkWarehousing').prop('checked',false);
				}	
				$('#remarks').val(checkedItems[0].REMARK==null?'':checkedItems[0].REMARK);
				CompanyOpttype = 1;
				checkedRow=0;
			    checkFun();

		}


        deleteStation = function () {
    		var checkedItems =  $('#IQCCheckConfig_tab').datagrid('getSelections');
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
               				arrUpdate.push({IQCCHECKCONFIG_ID:item.IQCCHECKCONFIG_ID});
                     });
               		 
               		 if(arrUpdate.length>0){
         	          /*批量删除*/
                         var ajaxUpdate = {
                             url: '/iPlant_ajax',
                             dataType: 'JSON',
                             data: {
                                 list: arrUpdate,
                                 IFS: 'WMS_DC027'
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
			$('#QcheckResult').textbox('setValue',"");
		},
       
		
        /*验证修改内容是否重复*/
        saveUpdateValidate = function() {
        	var checkedItems = $('#IQCCheckConfig_tab').datagrid('getSelections');
			row = checkedItems[0];
			if (row.IQCCHECKCONFIG_ID) {
				var isUserYn = '0';
				if ($('#checkWarehousing').is(':checked')) {
					isUserYn = "1";
				} else {
					isUserYn = "0";
				}
				if ($('#IQCCheckResult').textbox('getValue') != (row.CHECKTYPE==null?'':row.CHECKTYPE)
						|| $('#materielCheckStatus').combobox('getValue') != (row.MATERIALSTATUS==null?'':row.MATERIALSTATUS)						
						|| isUserYn != row.ISSTORAGE
						|| $('#remarks').val() != (row.REMARK==null?'':row.REMARK)) {
					return true;
				} else {
					return false;
				}
			}
		}
		
		


		
		
	


	savaStation = function() {
		 var IFServerNo = '';

		var IQCCheckResult = $('#IQCCheckResult').textbox('getValue');
		var materielCheckStatus = $('#materielCheckStatus').combobox('getValue');	
		var CheckStatus = $('#materielCheckStatus').combobox('getText');		
		var checkWarehousing;
		    checkWarehousing = $('#checkWarehousing').prop('checked');
		    if(checkWarehousing==true){
		    	checkWarehousing=1;
		    }else if(checkWarehousing==false){
		    	checkWarehousing=0;
		    }
		var remarks = $('#remarks').val();
   	          var ajaxParam = {
					url : '/iPlant_ajax',
					dataType : 'JSON',
					data : {
						IFS : 'WMS_DC028',
						CHECKTYPE : IQCCheckResult,
						pageIndex : 1,
						pageSize : 10
					},
					successCallBack : function(data) {
						console.log(data);
						rowNum = parseInt(data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS);
				if(CompanyOpttype == 1){
						var checkedItems = $('#IQCCheckConfig_tab').datagrid('getSelections');						
						if ($('#IQCCheckResult').textbox('getValue') != (checkedItems[0].CHECKTYPE==null?'':checkedItems[0].CHECKTYPE)) {
							if (rowNum > 0) {
								$.messager.alert('提示','您输入的['+ data.RESPONSE["0"].RESPONSE_DATA[0].CHECKTYPE+ ']已有相同,请重新输入!');
								return false;
							}
							
						}
					}else if(CompanyOpttype == 0){
						if (rowNum > 0) {
							$.messager.alert('提示','您输入的['+ data.RESPONSE["0"].RESPONSE_DATA[0].CHECKTYPE+ ']已有相同,请重新输入!');
							return false;
						}	
					}

       				    if(CompanyOpttype == 0) {
	 						IFServerNo = 'WMS_DC024'	

	 					} else if(CompanyOpttype == 1) {
	 						if (!saveUpdateValidate()) {
	 							$.messager.alert("提示", '内容没有更新，请修改')
	 							return false;
	 						}
	 						IFServerNo = 'WMS_DC026'
	 					if(checkedRow!=0){
	 						checkedid = cong_id;
	 						}else{
	 							var checkedItems = $('#IQCCheckConfig_tab').datagrid('getSelections');
	 							row = checkedItems[0];
	 							checkedid = row.IQCCHECKCONFIG_ID;
	 					    }			
	 					} else {
	 						IFServerNo = 'WMS_DC025'
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
	 					if(CompanyOpttype == 0){
	 						var ajaxParam = {
	 							url: '/iPlant_ajax',
	 							dataType: 'JSON',
	 							data: {
	 								  IQCCHECKCONFIG_ID:autoCreateCode('IQC'),
	 								  CHECKTYPEID:"",
	 								  CHECKTYPE:IQCCheckResult,
	 								  MATERIALSTATUSID:materielCheckStatus,
	 								  MATERIALSTATUS:CheckStatus,
	 								  ISGLOBAL:'是',
	 								  ISSTORAGE:checkWarehousing,
	 								  REMARK:remarks,
	 								  FACTORYCODE:"",
	 								  IFS: IFServerNo
	 							},
	 							successCallBack: function(data) {
	 								if ($.messager.alert('提示', susMsg)) {
	 									  $('#enditTab').dialog('close');
	 									  setDataNull();
	 									  initGridData();
	 								}	
	 							},
	 						    errorCallBack: function() {
	 								$.messager.alert('提示', errorMsg);
	 							}
	 								
	 						};
	 						
	 						iplantAjaxRequest(ajaxParam); 
	 					}else if(CompanyOpttype == 1) {
	 						var ajaxParam = {
	 								url: '/iPlant_ajax',
	 								dataType: 'JSON',
	 								data: {
	 									  ID: checkedid,
		 								  CHECKTYPE:IQCCheckResult,
		 								  MATERIALSTATUS:CheckStatus,
		 								  ISSTORAGE:checkWarehousing,
		 								  REMARK:remarks,
	 									  IFS: IFServerNo
	 								},
	 								successCallBack: function(data) {
	 									if ($.messager.alert('提示', susMsg)) {
	 										  $('#enditTab').dialog('close');
	 										  setDataNull();
	 										  initGridData();
	 									}
	 								},
	 							    errorCallBack: function() {
	 									$.messager.alert('提示', errorMsg);
	    			 								}
	    			 									
	    			 							};			
	    			 							iplantAjaxRequest(ajaxParam);			
	    			 				     	}	

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
				var enble;
				initGridData();	

		        $('#materielCheckStatus').combobox({
		              data:[
		              {value:'1',text:'待检验'},
		              {value:'2',text:'批过'},		              
		              {value:'3',text:'批退'},
		              {value:'4',text:'特采'},
		              {value:'5',text:'挑选'},
		              {value:'6',text:'报废'},
		              {value:'7',text:'不合格待处理'}
		              ],
		              valueField:'value',
		              textField:'text',
		              panelHeight:200, 
	    		      onLoadSuccess:function(){
	    		    		$('#materielCheckStatus').combobox('setValue',"1");

		               }		              
		            });

		       
				$('#btnResets').click(function(){
		            setQueryNull();
		        });
				$('#btnSearch').click(function() {
					getDataBySearch();
				});				
				$('.add').click(function() {
					 $('#showSaveInfo').html("");
					 setDataNull();
					 addStation();
				});
				$('#btnUpdate').click(function() {
					 $('#showSaveInfo').html("");
					updateStation();
				});
				$('.save').click(function() {
					savaStation();
				});
				$('#btnDelete').click(function(){
	                deleteStation();
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
