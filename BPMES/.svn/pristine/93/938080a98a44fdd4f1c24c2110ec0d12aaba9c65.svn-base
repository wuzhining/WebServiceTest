
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
			    var dgrid = $('#Trading_tab').datagrid('options');
				if(!dgrid) return;
				var reqData = {
					IFS: 'WMS_DC015',
					pageIndex: 1,
					pageSize: dgrid.pageSize
				}
				reqGridData('/iPlant_ajax', 'Trading_tab', reqData);
			},
			bindGridData = function(reqData, jsonData) {
				var gridList = {
					name: 'Trading_tab',
					dataType: 'json',
					singleSelect:false,
					columns: [
						[
							{
							field : 'ck',
							checkbox : true
						},{
								field: 'TYPECODE',
								title: '交易类型/项目代码',
								width: 200,
								align: 'center',formatter: function (value) {
					           	if(value != null)
                                return "<span title='" + value + "'>" + value + "</span>";}
							},{
								field: 'TRANTYPEID',
								title: '所属分类',
								width: 150,
								align: 'center',formatter:function(value, row, index) {if(value == '1') { return '领料类型';} else { return '领料项目';}}//类别(1=领料类型, 2=领料项目)
							},{
								field: 'TYPENAME',
								title: '类型名称',
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
								width: 170,
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
								width: 170,
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
							},{
								field: 'ENABLEFLAG',
								title: '状态',
								width: 100,
								align: 'center',formatter: function(value, row, index) {if(value == '1') { return '有效';} else { return '无效';}}//启用标志(1=有效，2=无效)
							},{
								field: 'APPTYPE',
								title: '应用环境',
								width: 100,
								align: 'center',formatter: function(value, row, index) {
									if(value == 'GD') { return '工单领料';}
									else if(value == 'QT') { return '其他领料';}
									else if(value == 'WP') { return '委派领料';}
									else { return '全部';}
									}//应用程序类型(QB=全部, GD=工单领料, QT=其他领料, WP=委派领料)
							}
						]
					],
					onDblClickRow: function(index,row){
						var checkedRows = $('#Trading_tab').datagrid('getSelected');
					if(checkedRows){
					    	 CompanyOpttype=1;
					    	 $("#enditTab").dialog("open").dialog('setTitle', '修改交易类型清单信息');
					    	 checkFun();
							var tradingTypeCode = $('#TradingTypeCode').textbox('setValue', row.TYPECODE==null?'':row.TYPECODE);
							$('#typeName').textbox('setValue', row.TYPENAME==null?'':row.TYPENAME);
							$('#category').combobox('setValue', row.TRANTYPEID==null?'':row.TRANTYPEID);
							$('#appEnviro').combobox('setValue', row.APPTYPE==null?'':row.APPTYPE);
						    $('#Remarks').textbox('setValue', row.REMARK==null?'':row.REMARK);	
						    $('#tradingState').combobox('setValue', row.ENABLEFLAG==null?'':row.ENABLEFLAG);
						    tradingTypeCode.textbox('textbox').attr('disabled', true);
							 cong_id = row.PRODADDITIONTYPEID;
							 checkedRow=1;
						    }else{
								$.messager.alert("提示", '请选中行再进行修改')
								return false;
						    }
				     }
				}
				initGridView(reqData, gridList);
				$('#Trading_tab').datagrid('loadData', jsonData);
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
				$("#enditTab").dialog("open").dialog('setTitle', '交易类型清单信息添加');
				$("#fmStation").form("clear");	
				$('#TradingTypeCode').textbox('textbox').attr('disabled', false);
				
			}	
			
			
			setDataNull = function () {           
	             // $('#txtID').textbox('setValue','');  
				$('#TradingTypeCode').html('');
				$('#typeName').html('');
	          }	

		getDataBySearch = function(){
				var dgrid = $('#Trading_tab').datagrid('options');
				if(!dgrid) return;
				var qtradingTypeCode = $('#QtradingTypeCode').textbox('getValue');
				var qtradingTypeName = $('#QtradingTypeName').textbox('getValue');
				var qtradingState = $('#QtradingState').combobox('getValue');
				
				var reqData = {
						TYPECODE: qtradingTypeCode,
						TYPENAME:qtradingTypeName,
						ENABLEFLAG:qtradingState,
					IFS: 'WMS_DC015',
					pageIndex: 1,
					pageSize: dgrid.pageSize
				}
				reqGridData('/iPlant_ajax', 'Trading_tab',reqData);
			}
		/* 修改成品入库配置信息 */			
		updateStation = function() {
			var checkedItems = $('#Trading_tab').datagrid('getSelections');
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
			var row = $("#Trading_tab").datagrid("getSelected");
			if(row) {	
				$("#searchCondition").dialog("close");
				$("#enditTab").dialog("open").dialog('setTitle', '编辑交易类型清单信息');			
				var tradingTypeCode = $('#TradingTypeCode').textbox('setValue', row.TYPECODE==null?'':row.TYPECODE);
				$('#typeName').textbox('setValue', row.TYPENAME==null?'':row.TYPENAME);
				$('#category').combobox('setValue', row.TRANTYPEID==null?'':row.TRANTYPEID);
				$('#appEnviro').combobox('setValue', row.APPTYPE==null?'':row.APPTYPE);
			    $('#Remarks').textbox('setValue', row.REMARK==null?'':row.REMARK);	
			    $('#tradingState').combobox('setValue', row.ENABLEFLAG==null?'':row.ENABLEFLAG);
				$('#TradingTypeCode').textbox('textbox').attr('disabled', true);
				CompanyOpttype = 1;
				checkedRow=0;


			}
			checkFun();
		}


        deleteStation = function () {
    		var checkedItems =  $('#Trading_tab').datagrid('getSelections');
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
               				arrUpdate.push({PRODADDITIONTYPEID:item.PRODADDITIONTYPEID});
                     });
               		 
               		 if(arrUpdate.length>0){
         	          /*批量删除*/
                         var ajaxUpdate = {
                             url: '/iPlant_ajax',
                             dataType: 'JSON',
                             data: {
                                 list: arrUpdate,
                                 IFS: 'WMS_DC017'
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
			var checkedItems = $('#Trading_tab').datagrid('getSelections');
			row = checkedItems[0];
			console.log(checkedItems);
			if(row.PRODADDITIONTYPEID){
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
		var tradingTypeCode = $('#TradingTypeCode').textbox('getValue'),typeName = $('#typeName').textbox('getValue'),category = $('#category').combobox('getValue');
		var appEnviro = $('#appEnviro').combobox('getValue'),tradingState = $('#tradingState').combobox('getValue'),remarks = $('#Remarks').textbox('getValue');

	  if(checkNotEmpty(tradingTypeCode) && checkNotEmpty(typeName)){
	    	          var ajaxParam = {
	    							url : '/iPlant_ajax',
	    							dataType : 'JSON',
	    							data : {
	    								IFS : 'WMS_DC018',
	    								TYPECODE : tradingTypeCode,
	    								pageIndex : 1,
	    								pageSize : 10
	    							},
	    							successCallBack : function(data) {
	    								console.log(data);
	    								rowNum = parseInt(data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS);	    								
	    								if (rowNum > 0 && CompanyOpttype == 0) {
	    									$.messager.alert('提示','您输入的['+ data.RESPONSE["0"].RESPONSE_DATA[0].TYPECODE+ ']已有相同,请重新输入!');
	    									$('#TradingTypeCode').textbox('setValue','');
	    									return false;
	    								} else{
    			       				    if(CompanyOpttype == 0) {
	    			 						IFServerNo = 'WMS_DC014'	

	    			 					} else if(CompanyOpttype == 1) {
	    			 						if (!saveUpdateValidate()) {
	    			 							$.messager.alert("提示", '内容没有更新，请修改')
	    			 							return false;
	    			 						}
	    			 						IFServerNo = 'WMS_DC016'
	    			 					if(checkedRow!=0){
	    			 						checkedid = cong_id;
	    			 						}else{
	    			 							var checkedItems = $('#Trading_tab').datagrid('getSelections');
	    			 							row = checkedItems[0];
	    			 							checkedid = row.PRODADDITIONTYPEID;
	    			 					    }			
	    			 					} else {
	    			 						IFServerNo = 'WMS_DC015'
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
	    			 								  PRODADDITIONTYPEID:autoCreateCode('JY'),
	    			 								  TYPECODE:tradingTypeCode,
	    			 								  TRANTYPEID:category,
	    			 								  TYPENAME:typeName,
	    			 								  APPTYPE:appEnviro,
	    			 								  REMARK:remarks,
	    			 								  ENABLEFLAG:tradingState, // 1 >有效, 2 >无效
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
		    			 								  //TYPECODE:tradingTypeCode,
		    			 								  TRANTYPEID:category,
		    			 								  TYPENAME:typeName,
		    			 								  APPTYPE:appEnviro,
		    			 								  REMARK:remarks,
		    			 								  ENABLEFLAG:tradingState,
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


		}else{
			$("#showSaveInfo").html("<font color=red>提示:代码和描述不能为空!</font>");
			enble = false;
		}
			
			  

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
		        $('#QtradingState').combobox({
		              data:[
		              {value:'',text:'全部'},
		              {value:'1',text:'有效'},
		              {value:'2',text:'无效'}
		              ],
		              valueField:'value',
		              textField:'text',
		              panelHeight:80, 
		            });
		        
		        $('#tradingState').combobox({
		              data:[
		              {value:'1',text:'有效'},
		              {value:'2',text:'无效'}
		              ],
		              valueField:'value',
		              textField:'text',
		              panelHeight:80, 
		            });  		        
		        $('#category').combobox({
		              data:[
		              {value:'1',text:'领料类型'},
		              {value:'2',text:'领料项目'}
		              ],
		              valueField:'value',
		              textField:'text',
		              panelHeight:70, 
		            });
		        
		        $('#appEnviro').combobox({
		              data:[
		              {value:'QB',text:'全部'},
		              {value:'GD',text:'工单领料'},
		              {value:'QT',text:'其他领料'},
		              {value:'WP',text:'委派领料'}
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
