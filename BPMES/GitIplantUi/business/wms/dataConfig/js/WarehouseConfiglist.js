
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
			    var dgrid = $('#WConfig_tab').datagrid('options');
				if(!dgrid) return;
				var reqData = {
					IFS: 'WMS_DC020',
					pageIndex: 1,
					pageSize: dgrid.pageSize
				}
				reqGridData('/iPlant_ajax', 'WConfig_tab', reqData);
			},
			bindGridData = function(reqData, jsonData) {
				var gridList = {
					name: 'WConfig_tab',
					dataType: 'json',
					singleSelect:false,
					columns: [
						[
							{
							field : 'ck',
							checkbox : true
						},{
								field: 'CONFIGTYPE',
								title: '配置类型',
								width: 300,
								align: 'center',formatter: function (value) {
					           	if(value != null)
                                return "<span title='" + value + "'>" + value + "</span>";}
							},{
								field: 'CONFIGDESC',
								title: '配置数据源',
								width: 150,
								align: 'center',formatter: function (value) {
						        if(value != null)
	                            return "<span title='" + value + "'>" + value + "</span>";}
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
						var checkedItems = $('#WConfig_tab').datagrid('getSelections');
						if(checkedItems.length !=1){
							$.messager.alert('提示', '请选择一条数据进行修改');
							return false;
						};

							$("#searchCondition").dialog("close");
							$("#enditTab").dialog("open").dialog('setTitle', '编辑仓库配置信息');
						    $('#configType').combobox('setValue', checkedItems[0].CONFIGTYPE==null?'':checkedItems[0].CONFIGTYPE);
							$('#configData').combobox('setValue', checkedItems[0].CONFIGDESC==null?'':checkedItems[0].CONFIGDESC);
							if(checkedItems[0].CONFIGTYPEID == 6){
								$(".tr1").css('display','');
			            		$(".tr3").css('display',''); 
								$('#controlRange').combobox('setValue',checkedItems[0].CONTROL_RANGE==null?'':checkedItems[0].CONTROL_RANGE);
							}	
							$('#remarks').val(checkedItems[0].REMARK==null?'':checkedItems[0].REMARK);
							 cong_id = row.WAREHOUSECONFIG_ID;
							 checkedRow=1;

				     }
				}
				initGridView(reqData, gridList);
				$('#WConfig_tab').datagrid('loadData', jsonData);
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
				$("#enditTab").dialog("open").dialog('setTitle', '新增仓库配置信息');
				$("#fmStation").form("clear");	
				 $(".tr1").css('display','none');

				/*绑定*/
				$("#configType").combobox({  
		             onChange:function(n,o){
		            	if(n==6){
		            		$(".tr1").css('display','');
		    		        $('#configData').combobox({
			  		              data:[
			  		              {value:'生产日期',text:'生产日期'},
			  		              {value:'入库日期',text:'入库日期'}
			  		              ],
			  		              valueField:'value',
			  		              textField:'text',
			  		              panelHeight:80,
				    		      onLoadSuccess:function(){
				    		            $('#configData').combobox('setValue',"生产日期");
				    		        }
			  		            });
		    		        
		    		        $('#controlRange').combobox({
		  		              data:[
		  		              {value:'1',text:'日'},
		  		              {value:'2',text:'周'},
		  		              {value:'3',text:'月'}
		  		              ],
		  		              valueField:'value',
		  		              textField:'text',
		  		              panelHeight:80, 
			    		      onLoadSuccess:function(){
			    		            $('#controlRange').combobox('setValue',"日");
			    		        }
		  		            }); 

		            	 }else{
		            		 $(".tr1").css('display','none'); 
		            		 $(".tr3").css('display',''); 
		            	 }
		            	
		            		
		            	if(n==1){
		    		        $('#configData').combobox({
		  		              data:[
		  		              {value:'采购订单',text:'采购订单'},
		  		              {value:'IQC检验单',text:'IQC检验单'}
		  		              ],
		  		              valueField:'value',
		  		              textField:'text',
		  		              panelHeight:80, 
			    		      onLoadSuccess:function(){
			    		            $('#configData').combobox('setValue',"采购订单");
			    		        }
		  		            });

		    		        
		            	}else if(n==2){
		    		        $('#configData').combobox({
			  		              data:[
			  		              {value:'采购订单',text:'采购订单'},
			  		              {value:'到货单',text:'到货单'},
			  		              {value:'送货单',text:'送货单'}
			  		              ],
			  		              valueField:'value',
			  		              textField:'text',
			  		              panelHeight:80,
				    		      onLoadSuccess:function(){
				    		            $('#configData').combobox('setValue',"采购订单");
				    		        }
			  		            });
		            	}else if(1!=n && 2!=n &&  6!=n){
		    		        $('#configData').combobox({
			  		              data:[
			  		              {value:'是',text:'是'},
			  		              {value:'否',text:'否'},
			  		              ],
			  		              valueField:'value',
			  		              textField:'text',
			  		              panelHeight:80, 
				    		      onLoadSuccess:function(){
				    		            $('#configData').combobox('setValue',"是");
				    		        }
			  		            });
		            	    }
		            	
		             }}) 

				
				
			}	
			
			
			setDataNull = function () {           
	             // $('#txtID').textbox('setValue','');  
				$('#TradingTypeCode').html('');
				$('#typeName').html('');
	          }	

		getDataBySearch = function(){
				var dgrid = $('#WConfig_tab').datagrid('options');
				if(!dgrid) return;
				var configType = $('#QconfigType').combobox('getText');	
				var reqData = {
					CONFIGTYPE: configType,
					IFS: 'WMS_DC020',
					pageIndex: 1,
					pageSize: dgrid.pageSize
				}
				reqGridData('/iPlant_ajax', 'WConfig_tab',reqData);
			}
		
		
	
		
		
		/* 修改成品入库配置信息 */			
		updateStation = function() {
			var checkedItems = $('#WConfig_tab').datagrid('getSelections');
			if(checkedItems.length !=1){
				$.messager.alert('提示', '请选择一条数据进行修改');
				return false;
			};

				$("#searchCondition").dialog("close");
				$("#enditTab").dialog("open").dialog('setTitle', '编辑仓库配置信息');
			    $('#configType').combobox('setValue', checkedItems[0].CONFIGTYPE==null?'':checkedItems[0].CONFIGTYPE);
				$('#configData').combobox('setValue', checkedItems[0].CONFIGDESC==null?'':checkedItems[0].CONFIGDESC);
				if(checkedItems[0].CONFIGTYPEID == 6){
					$(".tr1").css('display','');
            		$(".tr3").css('display',''); 
					$('#controlRange').combobox('setValue',checkedItems[0].CONTROL_RANGE==null?'':checkedItems[0].CONTROL_RANGE);
				}	
				$('#remarks').val(checkedItems[0].REMARK==null?'':checkedItems[0].REMARK);
				CompanyOpttype = 1;
				checkedRow=0;
			    checkFun();

		}


        deleteStation = function () {
    		var checkedItems =  $('#WConfig_tab').datagrid('getSelections');
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
               				arrUpdate.push({WAREHOUSECONFIG_ID:item.WAREHOUSECONFIG_ID});
                     });
               		 
               		 if(arrUpdate.length>0){
         	          /*批量删除*/
                         var ajaxUpdate = {
                             url: '/iPlant_ajax',
                             dataType: 'JSON',
                             data: {
                                 list: arrUpdate,
                                 IFS: 'WMS_DC022'
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
			$('#QtradingTypeCode').textbox('setValue',""),
			$('#QtradingTypeName').textbox('setValue',""),
			$('#QtradingState').combobox('setValue','');
		},
       
       
        //验证修改内容是否重复
        saveUpdateValidate = function() {
			var checkedItems = $('#WConfig_tab').datagrid('getSelections');
			row = checkedItems[0];
			if(row.WAREHOUSECONFIG_ID){
				if ($('#typeName').textbox('setValue', row.TYPENAME==null?'':row.TYPENAME)
				   || $('#category').val() != (row.TRANTYPEID==null?'':row.TRANTYPEID) || $('#appEnviro').val() != (row.APPTYPE==null?'':row.APPTYPE)
				   || $('#Remarks').val() != (row.REMARK==null?'':row.REMARK)) {
					return true;
				} else {
					return false;
				}
			}
		}
	


	savaStation = function() {
		 var IFServerNo = '';

		var configType = $('#configType').combobox('getText');
		var configTypeId = $('#configType').combobox('getValue');
		
		var configData = $('#configData').combobox('getValue');
		var controlRange = $('#controlRange').combobox('getText');

		
		var remarks = $('#remarks').val();
   	          var ajaxParam = {
					url : '/iPlant_ajax',
					dataType : 'JSON',
					data : {
						IFS : 'WMS_DC023',
						CONFIGTYPE : configType,
						pageIndex : 1,
						pageSize : 10
					},
					successCallBack : function(data) {
						console.log(data);
						rowNum = parseInt(data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS);	    								
						if (rowNum > 0) {
							$.messager.alert('提示','您输入的['+ data.RESPONSE["0"].RESPONSE_DATA[0].CONFIGTYPE+ ']已有相同,请重新选择!');
							//$('#TradingTypeCode').textbox('setValue','');
							return false;
						} else{
       				    if(CompanyOpttype == 0) {
	 						IFServerNo = 'WMS_DC019'	

	 					} else if(CompanyOpttype == 1) {
	 						if (!saveUpdateValidate()) {
	 							$.messager.alert("提示", '内容没有更新，请修改')
	 							return false;
	 						}
	 						IFServerNo = 'WMS_DC021'
	 					if(checkedRow!=0){
	 						checkedid = cong_id;
	 						}else{
	 							var checkedItems = $('#WConfig_tab').datagrid('getSelections');
	 							row = checkedItems[0];
	 							checkedid = row.WAREHOUSECONFIG_ID;
	 					    }			
	 					} else {
	 						IFServerNo = 'WMS_DC020'
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
	 					
	 					if(CompanyOpttype == 0){
	 						var ajaxParam = {
	 							url: '/iPlant_ajax',
	 							dataType: 'JSON',
	 							data: {
	 								  WAREHOUSECONFIG_ID:autoCreateCode('CK'),
	 								  CONFIGTYPEID:configTypeId,
	 								  CONFIGCODE:null,
	 								  CONFIGTYPE:configType,
	 								  CONFIGRESULT:null,
	 								  CONFIGDESC:configData,
	 								  REMARK:remarks,
	 								  CONTROL_RANGE:controlRange,
	 								 ISGLOBAL:'是', // 
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
		 								  //CONFIGTYPEID:null,
		 								  //CONFIGCODE:null,
		 								  CONFIGTYPE:configType,
		 								  //CONFIGRESULT:null,
		 								  CONFIGDESC:configData,		 
		 								  REMARK:remarks,
		 								  CONTROL_RANGE:controlRange,
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

		        $('#configType').combobox({
		              data:[
		              {value:'1',text:'物料条码打印'},
		              {value:'2',text:'仓库收料'},		              
		              {value:'3',text:'是否备料确认'},
		              {value:'4',text:'是否进行IQC检验'},
		              {value:'5',text:'供应商是否交期维护'},
		              {value:'6',text:'先进先出备料规则'},
		              {value:'7',text:'IQC退料扫描确认'},
		              {value:'8',text:'是否取消IQC后交接确认'}
		              ],
		              valueField:'value',
		              textField:'text',
		              panelHeight:200, 
	    		      onLoadSuccess:function(){
	    		    		$('#configType').combobox('setValue',"1");

		               },
				      onChange:function(n,o){
			            	if(n=='先进先出备料规则'|| n=='6'){
			            		$(".tr1").css('display','');
			            		$(".tr3").css('display',''); 
			    		        $('#configData').combobox({
				  		              data:[
				  		              {value:'生产日期',text:'生产日期'},
				  		              {value:'入库日期',text:'入库日期'}
				  		              ],
				  		              valueField:'value',
				  		              textField:'text',
				  		              panelHeight:80,
					    		      onLoadSuccess:function(){
					    		            $('#configData').combobox('setValue',"生产日期");
					    		        }
				  		            });
			    		        
			    		        $('#controlRange').combobox({
			  		              data:[
			  		              {value:'1',text:'日'},
			  		              {value:'2',text:'周'},
			  		              {value:'3',text:'月'}
			  		              ],
			  		              valueField:'value',
			  		              textField:'text',
			  		              panelHeight:80, 
				    		      onLoadSuccess:function(){
				    		            $('#controlRange').combobox('setValue','日');
				    		        }
			  		            }); 

			            	 }else if(n=='物料条码打印'|| n=='1'){
			            		 $(".tr1").css('display','none'); 
			    		        $('#configData').combobox({
			  		              data:[
			  		              {value:'采购订单',text:'采购订单'},
			  		              {value:'IQC检验单',text:'IQC检验单'}
			  		              ],
			  		              valueField:'value',
			  		              textField:'text',
			  		              panelHeight:80, 
				    		      onLoadSuccess:function(){
				    		            $('#configData').combobox('setValue',"采购订单");
				    		        }
			  		            });    
			            	}else if(n=='仓库收料'|| n=='2'){
			            		 $(".tr1").css('display','none'); 
			    		        $('#configData').combobox({
				  		              data:[
				  		              {value:'采购订单',text:'采购订单'},
				  		              {value:'到货单',text:'到货单'},
				  		              {value:'送货单',text:'送货单'}
				  		              ],
				  		              valueField:'value',
				  		              textField:'text',
				  		              panelHeight:80,
					    		      onLoadSuccess:function(){
					    		            $('#configData').combobox('setValue',"采购订单");
					    		        }
				  		            });
			            	}else if(n!='物料条码打印' && n!='仓库收料' && n!='先进先出备料规则' || n!=1 && n!=2 && n!=6){
			            		 $(".tr1").css('display','none'); 
			    		        $('#configData').combobox({
				  		              data:[
				  		              {value:'1',text:'是'},
				  		              {value:'2',text:'否'},
				  		              ],
				  		              valueField:'value',
				  		              textField:'text',
				  		              panelHeight:80, 
					    		      onLoadSuccess:function(){
					    		            $('#configData').combobox('setValue',"1");
					    		        }
				  		            });
			            	    }
			            	
				         }
		              
		            });


		       

		        $('#QconfigType').combobox({
		              data:[
		              {value:'1',text:'物料条码打印'},
		              {value:'2',text:'仓库收料'},		              
		              {value:'3',text:'是否备料确认'},
		              {value:'4',text:'是否进行IQC检验'},
		              {value:'5',text:'供应商是否交期维护'},
		              {value:'6',text:'先进先出备料规则'},
		              {value:'7',text:'IQC退料扫描确认'},
		              {value:'8',text:'是否取消IQC后交接确认'}
		              ],
		              valueField:'value',
		              textField:'text',
		              panelHeight:200, 
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
