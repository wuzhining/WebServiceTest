
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
			    var dgrid = $('#EMA_tab').datagrid('options');
				if(!dgrid) return;
				var reqData = {
					IFS: 'WMS_DC010',
					pageIndex: 1,
					pageSize: dgrid.pageSize
				}
				reqGridData('/iPlant_ajax', 'EMA_tab', reqData);
			},
			bindGridData = function(reqData, jsonData) {
				var gridList = {
					name: 'EMA_tab',
					dataType: 'json',
					singleSelect:false,
					columns: [
						[
							{
							field : 'ck',
							checkbox : true
						},{
								field: 'ITEMCODE',
								title: '物料编码',
								width: 400,
								align: 'center',formatter: function (value) {
					           	if(value != null)
                                return "<span title='" + value + "'>" + value + "</span>";}
							},{
								field: 'REMARK',
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
						var checkedRows = $('#EMA_tab').datagrid('getSelected');
						if(checkedRows){
				    	 CompanyOpttype=1;
				    	 $("#enditTab").dialog("open").dialog('setTitle', '修改紧急物料配置清单信息');
				    	 checkFun();
				    	 var  itemcode= $('#materialCoding').val(row.ITEMCODE==null?'':row.ITEMCODE);
						 $('#remarks').val(row.REMARK==null?'':row.REMARK);
						 cong_id = row.MATERIALEMERGENCYID;
						 itemcode.attr('disabled', true);
						 checkedRow=1;
					    }else{
							$.messager.alert("提示", '请选中行再进行修改')
							return false;
					    }
				     }
				}
				initGridView(reqData, gridList);
				$('#EMA_tab').datagrid('loadData', jsonData);
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
				$("#enditTab").dialog("open").dialog('setTitle', '紧急物料配置清单信息添加');
				$("#fmStation").form("clear");	
				$('#materialCoding').attr('disabled', false);
			}	
			
			
			setDataNull = function () {           
	             // $('#txtID').textbox('setValue','');  
				$('#materialCoding').html('');
				$('#remarks').html('');
	          }	

		getDataBySearch = function(){
				var dgrid = $('#EMA_tab').datagrid('options');
				if(!dgrid) return;
				var QmaterialCoding = $('#QmaterialCoding').val();
				var checkeds = $('#fullMatching').prop('checked');
				var reqData = {
					ITEMCODE: QmaterialCoding,
					CK:checkeds,
					IFS: 'WMS_DC010',
					pageIndex: 1,
					pageSize: dgrid.pageSize
				}
				reqGridData('/iPlant_ajax', 'EMA_tab',reqData);
			}
		/* 修改成品入库配置信息 */			
		updateStation = function() {
			var checkedItems = $('#EMA_tab').datagrid('getSelections');
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
			var row = $("#EMA_tab").datagrid("getSelected");
			if(row) {	
				$("#searchCondition").dialog("close");
				$("#enditTab").dialog("open").dialog('setTitle', '编辑紧急物料配置清单信息');
				var mat = $('#materialCoding').val( row.ITEMCODE==null?'':row.ITEMCODE);
				$('#remarks').val(row.REMARK==null?'':row.REMARK);
				mat.attr('disabled', true);
				CompanyOpttype = 1;	
				checkedRow=0;

			}
			checkFun();
		}


        deleteStation = function () {
    		var checkedItems =  $('#EMA_tab').datagrid('getSelections');
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
               				arrUpdate.push({MATERIALEMERGENCYID:item.MATERIALEMERGENCYID});
                     });
               		 
               		 if(arrUpdate.length>0){
         	          /*批量删除*/
                         var ajaxUpdate = {
                             url: '/iPlant_ajax',
                             dataType: 'JSON',
                             data: {
                                 list: arrUpdate,
                                 IFS: 'WMS_DC012'
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
			$('#QmaterialCoding').textbox('setValue',""),
			$('#fullMatching').prop('checked',false);
		},
       
       
        /*验证修改内容是否重复*/
        saveUpdateValidate = function() {
			var checkedItems = $('#EMA_tab').datagrid('getSelections');
			row = checkedItems[0];
			console.log(row);
				if ($('#materialCoding').val() != (row.ITEMCODE==null?'':row.ITEMCODE) || $('#remarks').val() != (row.REMARK==null?'':row.REMARK)) {
					return true;
				} else {
					return false;
				}
			
		}
		
		

	savaStation = function() {
		 var IFServerNo = '',enble=true;
		 var reqData = [];
		  var arrUpdate = new Array();
		  var remarks = $('#remarks').val();
		  var materialCoding = $.trim($('#materialCoding').val());
		  var reg1=/^[0-9,]+$/;
		
	  if(checkNotEmpty(materialCoding) && checkNotEmpty(remarks)){
		    if(reg1.test(materialCoding)){
		    	var array=materialCoding.split(",");		    	
	    			for(var i=0;i<array.length;i++){
	    				if(array[i].length ==11){
		    				  arrUpdate.push({ITEMCODE:array[i],REMARK:remarks});
		        			  isid = arrUpdate;
	    				}else{
	    					$("#showSaveInfo").html("<font color=red>提示:每个物料编码必须是11位数字!</font>");
	    					return false;
	    				}
	    			 
	    			  }	
	    	          var ajaxParam = {
	    							url : '/iPlant_ajax',
	    							dataType : 'JSON',
	    							data : {
	    								IFS : 'WMS_DC013',
	    								list : arrUpdate,
	    								pageIndex : 1,
	    								pageSize : 10
	    							},
	    							successCallBack : function(data) {
	    								console.log(data);
	    								rowNum = parseInt(data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS);	    								
	    								if (rowNum > 0 && CompanyOpttype == 0) {
	    									$.messager.alert('提示','您输入的['+ data.RESPONSE["0"].RESPONSE_DATA[0].ITEMCODE+ ']已有相同,请重新输入!');
	    									$('#materialCoding').val('');
	    									return false;
	    								} else{
    			       				    if(CompanyOpttype == 0) {
	    			 						IFServerNo = 'WMS_DC009'	

	    			 					} else if(CompanyOpttype == 1) {
	    			 						if (!saveUpdateValidate()) {
	    			 							$.messager.alert("提示", '内容没有更新，请修改')
	    			 							return false;
	    			 						}
	    			 						IFServerNo = 'WMS_DC011'
	    			 					if(checkedRow!=0){
	    			 						checkedid = cong_id;
	    			 						}else{
	    			 							var checkedItems = $('#EMA_tab').datagrid('getSelections');
	    			 							row = checkedItems[0];
	    			 							checkedid = row.MATERIALEMERGENCYID;
	    			 					    }			
	    			 					} else {
	    			 						IFServerNo = 'WMS_DC010'
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
	    			 								list: isid,									
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
	    			 									ITEMCODE:materialCoding,
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
	    								

	    							}
	    							
	    						};
	    						iplantAjaxRequest(ajaxParam);


	    					
	    		


		    }else{

		    	$("#showSaveInfo").html("<font color=red>提示:物料编码必须是数字,填写多个以英文逗号隔开!</font>");
		    	enble=false;
		    }
    		
		}else{
			$("#showSaveInfo").html("<font color=red>提示:物料编码和备注不能为空!</font>");
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
