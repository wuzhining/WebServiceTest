
(function() {
	function application() {					
		//初始化表格
		initGridData = function() {
			    var dgrid = $('#MaterialSuppConfig_tab').datagrid('options');
				if(!dgrid) return;
				var reqData = {
					IFS: 'WMS_DC030',
					pageIndex: 1,
					pageSize: dgrid.pageSize
				}
				reqGridData('/iPlant_ajax', 'MaterialSuppConfig_tab', reqData);
			},
			bindGridData = function(reqData, jsonData) {
				var gridList = {
					name: 'MaterialSuppConfig_tab',
					dataType: 'json',
					singleSelect:false,
					columns: [
						[
							{
							field : 'ck',
							checkbox : true
						},{
								field: 'VENDORCODE',
								title: '供应商',
								width: 250,
								align: 'center',formatter: function (value) {
					           	if(value != null)
                                return "<span title='" + value + "'>" + value + "</span>";}
							},{
								field: 'SUPPLIERID',
								title: '供应商编码',
								width: 150,
								align: 'center',formatter: function (value) {
						        if(value != null)
	                            return "<span title='" + value + "'>" + value + "</span>";}
							},{
								field: 'ITEMCODE',
								title: '物料名称',
								width: 160,
								align: 'center',formatter: function (value) {					
								if(value != null)
		                            return "<span title='" + value + "'>" + value + "</span>";}
							},{
								field: 'ITEMID',
								title: '物料编码',
								width:150,
								align: 'center',formatter: function (value) {
					           	if(value != null)
                                return "<span title='" + value + "'>" + value + "</span>";}
							},{
								field: 'PRINTTYPE',
								title: '打印方式',
								width: 100,
								align: 'center',formatter: function (value) {
					           	if(value != null)
                                return "<span title='" + value + "'>" + value + "</span>";}
							},{
								field: 'REMARK',
								title: '备注',
								width: 250,
								align: 'center',formatter: function (value) {
					           	if(value != null)
                                return "<span title='" + value + "'>" + value + "</span>";}
							},{
								field: 'CREATE_DATE',
								title: '创建日期',
								width: 180,
								align: 'center',formatter: function (value) {
					           	if(value != null)
                                return "<span title='" + value + "'>" + value + "</span>";}
							},{
								field: 'CRT_ID',
								title: '创建人',
								width: 100,
								align: 'center',formatter: function (value) {
					           	if(value != null)
                                return "<span title='" + value + "'>" + value + "</span>";}
							},{
								field: 'UPDATE_DATE',
								title: '修改日期',
								width: 180,
								align: 'center',formatter: function (value) {
					           	if(value != null)
                                return "<span title='" + value + "'>" + value + "</span>";}
							},{
								field: 'UPT_ID',
								title: '修改人',
								width: 100,
								align: 'center',formatter: function (value) {
					           	if(value != null)
                                return "<span title='" + value + "'>" + value + "</span>";}
							}
						]
					],
					onDblClickRow: function(index,row){
						var checkedItems = $('#MaterialSuppConfig_tab').datagrid('getSelections');
						if(checkedItems.length !=1){
							$.messager.alert('提示', '请选择一条数据进行修改');
							return false;
						};

							$("#searchCondition").dialog("close");
							$("#enditTab").dialog("open").dialog('setTitle', '编辑供应商配置列表信息');
						    $('#VendorCode').textbox('setValue', row.VENDORCODE==null?'':row.VENDORCODE);
						    $('#txtMaterialCode').textbox('setValue', row.ITEMCODE==null?'':row.ITEMCODE);
							$('#PrintType').combobox('setValue', row.PRINTTYPE==null?'':row.PRINTTYPE);
							$('#remarks').val(row.REMARK==null?'':row.REMARK);
							 cong_id = row.MATERIALSUPPLIERCONFIG_ID;
							 checkedRow=1;
							 CompanyOpttype=1;

				     }
				}
				initGridView(reqData, gridList);
				$('#MaterialSuppConfig_tab').datagrid('loadData', jsonData);
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
				$("#enditTab").dialog("open").dialog('setTitle', '新增供应商配置列表信息');
				$("#fmStation").form("clear");
		        $('#PrintType').combobox({
		              data:[
		              {value:'1',text:'IQC检验前'},
		              {value:'2',text:'IQC检验后'}
		              ],
		              valueField:'value',
		              textField:'text',
		              panelHeight:50, 
	    		      onLoadSuccess:function(){
	    		    		$('#PrintType').combobox('setValue',"1");

		               }		              
		            });
			}	
			
			
			setDataNull = function () {           
	              //$('#QcheckResult').textbox('setValue','');  
	          }	

		getDataBySearch = function(){
				var dgrid = $('#MaterialSuppConfig_tab').datagrid('options');
				if(!dgrid) return;
				var qvendorcode = $('#QVendorCode').textbox('getValue');
				var qcheckresult = $('#QMaterialCoding').textbox('getValue');
				var reqData = {
					SUPPLIERID: qvendorcode,
					ITEMID: qcheckresult,
					IFS: 'WMS_DC030',
					pageIndex: 1,
					pageSize: dgrid.pageSize
				}
				reqGridData('/iPlant_ajax', 'MaterialSuppConfig_tab',reqData);
			}
		
		
		/* 修改成品入库配置信息 */			
		updateStation = function() {
			var checkedItems = $('#MaterialSuppConfig_tab').datagrid('getSelections');
			if(checkedItems.length !=1){
				$.messager.alert('提示', '请选择一条数据进行修改');
				return false;
			};
				$("#searchCondition").dialog("close");
				$("#enditTab").dialog("open").dialog('setTitle', '编辑供应商配置列表信息');
			    $('#VendorCode').textbox('setValue', checkedItems[0].VENDORCODE==null?'':checkedItems[0].VENDORCODE);
			    $('#txtMaterialCode').textbox('setValue', checkedItems[0].ITEMCODE==null?'':checkedItems[0].ITEMCODE);
				$('#PrintType').combobox('setValue', checkedItems[0].PRINTTYPE==null?'':checkedItems[0].PRINTTYPE);
				$('#remarks').val(checkedItems[0].REMARK==null?'':checkedItems[0].REMARK);
				vendorCd = checkedItems[0].SUPPLIERID;
				materialCode =checkedItems[0].ITEMID;
				CompanyOpttype = 1;
				checkedRow=0;
			    checkFun();

		}


        deleteStation = function () {
    		var checkedItems =  $('#MaterialSuppConfig_tab').datagrid('getSelections');
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
               				arrUpdate.push({MATERIALSUPPLIERCONFIG_ID:item.MATERIALSUPPLIERCONFIG_ID});
                     });
               		 
               		 if(arrUpdate.length>0){
         	          /*批量删除*/
                         var ajaxUpdate = {
                             url: '/iPlant_ajax',
                             dataType: 'JSON',
                             data: {
                                 list: arrUpdate,
                                 IFS: 'WMS_DC032'
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
		setQueryNull=function(searchFromType) {
	    	 if(searchFromType==0){
	    		 $('#QVendorCode').textbox('setValue',"");
	    		 $('#QMaterialCoding').textbox('setValue',"");	 
	    	 }else if(searchFromType==2){
	    		 $('#searchMaterialForm').form('clear');
	    	 }else{
	    		 $('#searchVendorCodeForm').form('clear');
	    	 }
		},

		
        /*验证修改内容是否重复*/
        saveUpdateValidate = function() {
        	var checkedItems = $('#MaterialSuppConfig_tab').datagrid('getSelections');
        	console.log(checkedItems);
			row = checkedItems[0];
			if (row.MATERIALSUPPLIERCONFIG_ID) {
				if ( vendorCd != (row.SUPPLIERID==null?'':row.SUPPLIERID)
						|| materialCode != (row.ITEMID==null?'':row.ITEMID)						
						|| $('#PrintType').combobox('getText') != (row.PRINTTYPE==null?'':row.PRINTTYPE)
						|| $('#remarks').val() != (row.REMARK==null?'':row.REMARK)) {
					return true;
				} else {
					return false;
				}
			}
		}
		
	
		
		/* 添加供应商弹出框	 */
		addVendorCode=function() {
			$("#VendorCodeDetails").dialog("open").dialog('setTitle', '供应商详情');
			$('#showMaster').html('');
		}

		/**根据条件查询供应商信息**/
		getVendorCodeBySearch = function(){
			var tabName = 'VendorCodeDetails_tab';
			var dgridOp = $('#'+tabName).datagrid('options');
			if(!dgridOp) return;
			var name = $('#searchVendorName').val();
			var code = $('#searchVendorCode').val();
			var reqDataA = {
				//MASTER_FLAG: 'Y',
				SUP_NM:name,
				SUP_CD:code,
				IFS: 'B000082',
				pageIndex: 1,
				pageSize: dgridOp.pageSize
			}
			dialogDataGrid('/iPlant_ajax', tabName, reqDataA);
			dialogEditorDataGrid = function(tabName,reqDataA, jsonData) {
				var gridLists = {
						name :tabName,
						dataType : 'json',
						columns : [[
						      {field:'SUP_CD',title: '供应商编码',width: 130,align: 'center',formatter: function (value,row) {if (value != null) return "<span title='" + value + "'>" + value + "</span>";}},
						      {field:'SUP_NM',title: '供应商名称',width: 130,align: 'center',formatter: function (value) {if (value != null) return "<span title='" + value + "'>" + value + "</span>";}},
							  {field:'ST_NM',title: '供应商简称',width: 130,align: 'center',formatter: function (value) {if (value != null) return "<span title='" + value + "'>" + value + "</span>";}},					  
							  {field:'SUP_BC',title: '供应商条形码',width: 130,align: 'center',formatter: function (value) {if (value != null) return "<span title='" + value + "'>" + value + "</span>";}},					  
							  {field:'DICT_IT_NM',title: '供应商类别',width: 130,align: 'center',formatter: function (value) {if (value != null) return "<span title='" + value + "'>" + value + "</span>";}},
							  {field:'SUP_ST',title: '供应商状态',width: 130,align: 'center',formatter: function (value) {if (value != null) return "<span title='" + value + "'>" + value + "</span>";}},
						 ]],
						 onDblClickRow: function(index,row){							
							 selectVendorCode();
				         }
					}
				initEditorDataGridView(reqDataA, gridLists);
				$('#'+tabName).datagrid('loadData', jsonData);
				var VendorCode = $('#VendorCode').textbox('getValue');
		 		if(VendorCode){
		 			var items = $('#VendorCodeDetails_tab').datagrid('getRows');
		 			for (var i = 0; i < items.length; i++)
		 			{
		 				if(VendorCode == items[i].SUP_CD){
		 					index = i;
		 				}
		 		   }
		 		   $('#VendorCodeDetails_tab').datagrid('selectRow', index); //选中对应的行
		 		}
			}
		}
		
		
		/*选择供应商并赋值*/
		selectVendorCode=function(){
			var isSlect = $("#VendorCodeDetails_tab").datagrid('getSelected');			 
			if(isSlect == null){
				//$('#showVendor').html('请选择一条物料信息');
			    $.messager.alert('提示', '请选择一条供应商信息');	
			}else{
				var vendorNM = isSlect.SUP_NM;
				vendorCd = isSlect.SUP_CD;
				$("#VendorCodeDetails").dialog("close");
				$('#VendorCode').textbox('setValue',vendorNM);
			}
		}
		
		

		
		
		/* 添加物料信息弹出框	 */
		 addMaterial=function() {
			$("#addMaterialDetails").dialog("open").dialog('setTitle', '物料信息详情');
			$('#showMaterial').html('');
			
		}
		
		/**根据条件查询物料信息**/
		 getMaterialDataBySearch = function(){
			var tabName = 'materialDetails_tab';
			var dgrid = $('#'+tabName).datagrid('options');
			if(!dgrid) return;
			var materialCode = $('#materialCode').val();
			var materialName = $('#materialName').val();
			var reqData = {
				ITEM_CD:materialCode,
				ITEM_NM:materialName,
				IFS: 'Z000007',
				pageIndex: dgrid.pageNumber,
				pageSize: dgrid.pageSize
			}
			dialogDataGrid('/iPlant_ajax', tabName, reqData);
		   /*绑定物料详情列表数据*/
		   dialogEditorDataGrid = function(tabName,reqData, jsonData){
			var gridLists = {
				name : tabName,
				dataType : 'json',
				columns : [[
					{field:'ITEM_CD',title:'物料编码',width:180,align:'center',formatter:function(value) {if (value != null) return "<span title='" + value+ "'>" + value + "</span>";}},
					{field:'ITEM_NM',title:'物料名称',width:180,align:'center',formatter:function(value) {if (value != null) return "<span title='" + value+ "'>" + value + "</span>";}},
					{field:'ITEM_TYPE_NM',title:'物料类型',width:130,align:'center',formatter:function(value) {if (value != null) return "<span title='" + value+ "'>" + value + "</span>";}},
					{field:'UOM_NM',title:'单位',width:130,align:'center',formatter:function(value) {if (value != null) return "<span title='" + value+ "'>" + value + "</span>";}},
				 ]],
				 onDblClickRow: function(index,row){
					 assignment();
		         }
			}		
			initEditorDataGridView(reqData, gridLists);
			$('#'+tabName).datagrid('loadData', jsonData);
			var MaterialCode = $('#txtMaterialCode').textbox('getValue');
	  		if(MaterialCode){
	  			var items = $('#materialDetails_tab').datagrid('getRows');
	  			for (var i = 0; i < items.length; i++)
	  			{
	  				if(MaterialCode == items[i].MATERIAL_ID){
	  					index = i;
	  				}
	  		   }
	  		   $('#materialDetails_tab').datagrid('selectRow', index); //选中对应的行
	  		}
		}
	 }

	    /*选择物料详情并赋值*/
       assignment=function(){
			var isSlect = $("#materialDetails_tab").datagrid('getSelected');
			if(isSlect == null){
				$.messager.alert('提示', '请选择一条物料信息');
				//$('#showMaterial').html('请选择一条物料信息');
			}else{
				  materialCode = isSlect.ITEM_CD;
				var materialName = isSlect.ITEM_NM;
				$("#addMaterialDetails").dialog("close");
				$('#txtMaterialCode').textbox('setValue',materialName);
			}
		} 
		 

	savaStation = function() {
		var IFServerNo = '';
		var vendorCode = $('#VendorCode').textbox('getValue');
		var printType = $('#PrintType').combobox('getValue');
		var printText = $('#PrintType').combobox('getText');	
		var materialName = $('#txtMaterialCode').textbox('getValue');
		var remarks = $('#remarks').val();
		var checkedItems = $('#MaterialSuppConfig_tab').datagrid('getSelections');
		
		if(printType=='IQC检验前'){
			printType = 1;
		}else if(printType=='IQC检验后'){
			printType = 2;
		}
		
		if(!checkForm()) return;
   	          var ajaxParam = {
					url : '/iPlant_ajax',
					dataType : 'JSON',
					data : {
						IFS : 'WMS_DC033',
						  SUPPLIERID:vendorCd,
						  ITEMID:materialCode,
						  pageIndex : 1,
						  pageSize : 10
					},
					successCallBack : function(data) {
						console.log(data);
						rowNum = parseInt(data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS);
				if(CompanyOpttype == 1){
						var checkedItems = $('#MaterialSuppConfig_tab').datagrid('getSelections');	
						if (vendorCd != (checkedItems[0].SUPPLIERID==null?'':checkedItems[0].SUPPLIERID) && materialCode != (checkedItems[0].ITEMID==null?'':checkedItems[0].ITEMID) ) {
							if (rowNum > 0) {
								$.messager.alert('提示','您输入的供应商编码：['+ data.RESPONSE["0"].RESPONSE_DATA[0].SUPPLIERID+ '] 和物料编码：['+ data.RESPONSE["0"].RESPONSE_DATA[0].ITEMID+ ']已有相同,请重新输入!');
								return false;
							}
							
						}
					}else if(CompanyOpttype == 0){
						if (rowNum > 0) {
							$.messager.alert('提示','您输入的供应商编码：['+ data.RESPONSE["0"].RESPONSE_DATA[0].SUPPLIERID+ '] 和物料编码：['+ data.RESPONSE["0"].RESPONSE_DATA[0].ITEMID+ ']已有相同,请重新输入!');
							return false;
						}	
					}

       				    if(CompanyOpttype == 0) {
	 						IFServerNo = 'WMS_DC029'	

	 					} else if(CompanyOpttype == 1) {
	 						if (!saveUpdateValidate()) {
	 							$.messager.alert("提示", '内容没有更新，请修改')
	 							return false;
	 						}
	 						IFServerNo = 'WMS_DC031'
	 					if(checkedRow!=0){
	 						checkedid = cong_id;
	 						}else{
	 							var checkedItems = $('#MaterialSuppConfig_tab').datagrid('getSelections');
	 							row = checkedItems[0];
	 							checkedid = row.MATERIALSUPPLIERCONFIG_ID;
	 					    }			
	 					} else {
	 						IFServerNo = 'WMS_DC030'
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
	 								  MATERIALSUPPLIERCONFIG_ID:autoCreateCode('GYS'),
	 								  SUPPLIERID:vendorCd,
	 								  VENDORCODE:vendorCode,
	 								  ITEMID:materialCode,
	 								  ITEMCODE:materialName,
	 								  PRINTTYPEID:printType,
	 								  PRINTTYPE:printText,
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
		 								  SUPPLIERID:vendorCd,
		 								  VENDORCODE:vendorCode,
		 								  ITEMID:materialCode,
		 								  ITEMCODE:materialName,
		 								  PRINTTYPEID:printType,
		 								  PRINTTYPE:printText,
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
				var materialCode;
				var vendorCd;
				initGridData();	

		        $('#PrintType').combobox({
		              data:[
		              {value:'1',text:'IQC检验前'},
		              {value:'2',text:'IQC检验后'}
		              ],
		              valueField:'value',
		              textField:'text',
		              panelHeight:50, 
	    		      onLoadSuccess:function(){
	    		    		$('#PrintType').combobox('setValue',"1");

		               }		              
		            });

		       
				$('#btnResets').click(function(){
					setQueryNull(0);
		        });
				
				$('#btnResets2').click(function(){
					setQueryNull(2);
		        });
				
				$('#btnResets3').click(function(){
					setQueryNull(3);					
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
