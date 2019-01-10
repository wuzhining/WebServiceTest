
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
			    var dgrid = $('#warehouseType_tab').datagrid('options');
				if(!dgrid) return;
				var reqData = {
					IFS: 'WMS_AQL0013',
					pageIndex: 1,
					pageSize: dgrid.pageSize
				}
				
				reqGridData('/iPlant_ajax', 'warehouseType_tab', reqData);
				
			},
			bindGridData = function(reqData, jsonData) {
				var gridList = {
					name: 'warehouseType_tab',
					dataType: 'json',
					columns: [
						[ {field: 'QCENTRY_ID',title: '客户id',hidden:true,width: 80,align: 'left',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
							  options:{required:true, validType:['length[1,50]','specialVersionTextArea']}}},
								{field: 'SUPPLIER_NAME',title: '供应商名称',width: 170,align: 'left',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
									  options:{required:true, validType:['length[1,50]','specialVersionTextArea']}}},	  
							    {field: 'SUPPLIER_CODE',title: '供应商编码',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
					        	      options:{validType:'length[1,400]'}}},
			        	        {field: 'MATERIAL_NAME',title: '物料名称',width:130 ,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
			        	        	  options:{ validType:['length[1,50]']}}},  
					            {field: 'MATERIAL_CODE',title: '物料编码',width:130 ,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
									  options:{ validType:['length[1,50]']}}},
							    {field: 'CLIENT_DIVISION',title: '客户部门',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
					 	    	      options:{ validType:'length[1,400]'}}},
				 	    	    {field: 'CLIENT_REASON',title: '客诉原因',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
					 	    	      options:{ validType:['length[1,400]','specialVersionTextArea']}}},
							    {field: 'REMARK',title: '备注',width: 250,align: 'center'},	  
					    		{field: 'UPDATE_DATE',title: '修改时间',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
								{field: 'UPDATER_NAME',title: '修改人',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
								{field: 'CREATE_DATE',title: '创建时间',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
								{field: 'CREATE_NAME',title: '创建人',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}
							]],
					onDblClickRow: function(index,row){
						var checkedRows = $('#warehouseType_tab').datagrid('getSelected');
						if(checkedRows){
				    	 CompanyOpttype=1;
				    	 $("#enditTab").dialog("open").dialog('setTitle', '修改客诉列表信息');
				    	 checkFun();
						 $('#MATERIAL_CODE').searchbox('setValue', row.MATERIAL_CODE==null?'':row.MATERIAL_CODE);
						 $('#MATERIAL_NM').textbox('setValue', row.MATERIAL_NAME==null?'':row.MATERIAL_NAME);
						 $('#SUPPLIER_CODE').searchbox('setValue', row.SUPPLIER_CODE==null?'':row.SUPPLIER_CODE);
						 $('#SUPPLIER_NM').textbox('setValue', row.SUPPLIER_NAME==null?'':row.SUPPLIER_NAME);
						 $('#CLIENT_DIVISION').textbox('setValue', row.CLIENT_DIVISION==null?'':row.CLIENT_DIVISION);
						 $('#CLIENT_REASON').textbox('setValue', row.CLIENT_REASON==null?'':row.CLIENT_REASON);
						 $('#REMARK').textbox('setValue', row.REMARK==null?'':row.REMARK);
						 cong_id = row.QCENTRY_ID;
						 checkedRow=1;
					    }else{
							$.messager.alert("提示", '请选中行再进行修改')
							return false;
					    }
						 
						 
				     }
				}
				initGridView(reqData, gridList);
				$('#warehouseType_tab').datagrid('loadData', jsonData);
			}
			checkFun = function (){
				var qx = getUpdateRight();
				if(qx=="Y"){
					  	
			    	 $('#saveID').show();
			    	 $('#cancleID').show();
				}else{
					CompanyOpttype=2;
					
			    	 $('#saveID').hide();			    	
				}
			}
			/* 添加商品移动信息 */
			checkedRadio = function() {
				
				$('#By_product').prop('checked',true);
			}
			addStation = function() {
	        	CompanyOpttype = 0;
	        	checkFun();
				$("#enditTab").dialog("open").dialog('setTitle', '客诉列表信息添加');
				$("#fmStation").form("clear");			
			}	
			
			
			
			setDataNull = function () {           
	             // $('#txtID').textbox('setValue','');              
	          }	
			getDataBySearch = function(){
				var dgrid = $('#warehouseType_tab').datagrid('options');
				if(!dgrid) return;
				var config_m_code = $('#MATERIAL_NAME').textbox('getValue');
				var SUPPLIER_NM = $('#SUPPLIER_NAME').textbox('getValue');
				var checkeds = $('#fullMatching').prop('checked');
				var reqData = {
					MATERIAL_NAME: config_m_code,
					CK:checkeds,
					SUPPLIER_NAME:SUPPLIER_NM,
					IFS: 'WMS_AQL0013',
					pageIndex: 1,
					pageSize: dgrid.pageSize
				};
				reqGridData('/iPlant_ajax', 'warehouseType_tab',reqData);
			};
			
			/* 修改客诉列表信息 */			
			updateStation = function() {
				var checkedItems = $('#warehouseType_tab').datagrid('getSelections');
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
				var row = $("#warehouseType_tab").datagrid("getSelected");
				if(row) {
					$("#searchCondition").dialog("close");
					$("#enditTab").dialog("open").dialog('setTitle', '修改客户列表信息');
					$('#MATERIAL_CODE').searchbox('setValue', row.MATERIAL_CODE==null?'':row.MATERIAL_CODE);
					 $('#MATERIAL_NM').textbox('setValue', row.MATERIAL_NAME==null?'':row.MATERIAL_NAME);
					 $('#SUPPLIER_CODE').searchbox('setValue', row.SUPPLIER_CODE==null?'':row.SUPPLIER_CODE);
					 $('#SUPPLIER_NM').textbox('setValue', row.SUPPLIER_NAME==null?'':row.SUPPLIER_NAME);
					 $('#CLIENT_DIVISION').textbox('setValue', row.CLIENT_DIVISION==null?'':row.CLIENT_DIVISION);
					 $('#CLIENT_REASON').textbox('setValue', row.CLIENT_REASON==null?'':row.CLIENT_REASON);
					 $('#REMARK').textbox('setValue', row.REMARK==null?'':row.REMARK);
					CompanyOpttype = 1;	
					checkedRow = 0;

				}
				checkFun();
			}
			
			deleteStation = function () {
	    		var checkedItems =  $('#warehouseType_tab').datagrid('getSelections');
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
	               				arrUpdate.push({QCENTRY_ID:item.QCENTRY_ID});
	                     });
	               		
	               		 if(arrUpdate.length>0){
	         	          /*批量删除*/
	                         var ajaxUpdate = {
	                             url: '/iPlant_ajax',
	                             dataType: 'JSON',
	                             data: {
	                            
	                                 list: arrUpdate,
	                                 IFS: 'WMS_AQL0016'
	                                	
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
	 			$('#MATERIAL_NAME').textbox('setValue',""),
	 			$('#SUPPLIER_NAME').textbox('setValue',""),
	 			$('#materialCode').textbox('setValue',""),
	 			$('#searchVendorCode').textbox('setValue',""),
	 			$('#fullMatching').prop('checked',false);
	 		},
	    	
			      
	 		 /*验证修改内容是否重复*/
	        saveUpdateValidate = function() {
				var checkedItems = $('#warehouseType_tab').datagrid('getSelections');
				row = checkedItems[0];
				if (row.QCENTRY_ID) {
					
					if($('#MATERIAL_CODE').textbox('getValue')!= (row.MATERIAL_CODE==null?'':row.MATERIAL_CODE)||
					   $('#SUPPLIER_CODE').textbox('getValue')!= (row.SUPPLIER_CODE==null?'':row.SUPPLIER_CODE)||
					   $('#CLIENT_DIVISION').textbox('getValue')!= (row.CLIENT_DIVISION==null?'':row.CLIENT_DIVISION)||
					   $('#CLIENT_REASON').textbox('getValue')!= (row.CLIENT_REASON==null?'':row.CLIENT_REASON)||
					   $('#REMARK').textbox('getValue')!=( row.REMARK==null?'':row.REMARK))

							
						return true;
						else {
							return false;
						}
					}
			}
			
			
	 		
	 		/* 添加供应商选择窗口弹出框	 */
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
							 onClickRow: function(index,row){
								 selectVendorCode(row.SUP_CD,row.SUP_NM);
					         }
						}
					initEditorDataGridView(reqDataA, gridLists);
					$('#'+tabName).datagrid('loadData', jsonData);
					var VendorCode = $('#SUPPLIER_CODE').textbox('getValue');
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
			selectVendorCode=function(item_cd,item_nm){
				  console.log(item_nm);
		    	  $('#SUPPLIER_CODE').textbox('setValue',item_cd);
		    	  $('#SUPPLIER_NM').textbox('setValue',item_nm);
		    	  $("#VendorCodeDetails").dialog("close");
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
					 onClickRow: function(index,row){
						 assignment(row.ITEM_CD,row.ITEM_NM);
			         }
				}		
				initEditorDataGridView(reqData, gridLists);
				$('#'+tabName).datagrid('loadData', jsonData);
				var MaterialCode = $('#MATERIAL_CODE').searchbox('getValue');
				//alert(MaterialCode)
		  		if(MaterialCode){
		  			var items = $('#materialDetails_tab').datagrid('getRows');
		  			for (var i = 0; i < items.length; i++)
		  			{
		  				if(MaterialCode == items[i].ITEM_CD){
		  					index = i;
		  				}
		  		   }
		  		   $('#materialDetails_tab').datagrid('selectRow', index); //选中对应的行
		  		}
			}
		 }
			 /*点击选择物料searchMaterialForm查询物料信息*/
		     doSearch = function(){
		    	$("#searchMaterialForm").textbox('setValue','');		//置空搜索框
		    	var titleName = '客诉列表信息添加';
				var dialogName = 'addMaterialDetails';
				var tabName = 'materialDetails_tab';
				var dgrid = $('#materialDetails_tab').datagrid('options');
				var reqData = {
						IFS: 'Z000007',
						pageIndex: 1,
						pageSize: dgrid.pageSize
					}
				openDialogFrame(tabName,dialogName,titleName,reqData);
		     }
		    /*选择物料详情并赋值*/
	      assignment=function(item_cd,item_nm){
	    	  console.log(item_nm);
	    	  $('#MATERIAL_CODE').textbox('setValue',item_cd);
	    	  $('#MATERIAL_NM').textbox('setValue',item_nm);
	    	  $("#addMaterialDetails").dialog("close");
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
					IFServerNo = 'WMS_AQL0015'
					isid = 'mes1.agv_seq.nextval';
				} else if(CompanyOpttype == 1) {
					if (!saveUpdateValidate()) {
						$.messager.alert("提示", '内容没有更新，请修改')
						return false;
					}
					IFServerNo = 'WMS_AQL0014'
					var checkedItems = $('#warehouseType_tab').datagrid('getSelections');
					row = checkedItems[0];
				if(checkedRow!=0){
					isid = cong_id;
				}else{
					isid = row.QCENTRY_ID;
				}
				} else {
					IFServerNo = 'WMS_AQL0013'
				}
			    
			    var MATERIAL_CODE=$('#MATERIAL_CODE').searchbox("getValue");
			    var MATERIAL_NAME=$('#MATERIAL_NM').val();
				var SUPPLIER_CODE=$('#SUPPLIER_CODE').searchbox("getValue");
				var SUPPLIER_NAME=$('#SUPPLIER_NM').textbox("getValue"); 
				var CLIENT_DIVISION=$('#CLIENT_REASON').val();
			    var CLIENT_REASON=$('#CLIENT_REASON').val();
			    var REMARK=$('#REMARK').val();
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
						MATERIAL_CODE: MATERIAL_CODE,
						MATERIAL_NAME: MATERIAL_NAME,
						SUPPLIER_CODE: SUPPLIER_CODE,
						SUPPLIER_NAME: SUPPLIER_NAME,
						CLIENT_DIVISION: CLIENT_DIVISION,
						CLIENT_REASON: CLIENT_REASON,
						REMARK: REMARK,									
						IFS: IFServerNo
					},
					successCallBack: function(data) {
						var susMsg=getReturnMsg(data);
	                	$.messager.alert("提示",susMsg,"",function(){
	            			reqGridData('/iPlant_ajax','warehouseType_tab',{IFS:'WMS_AQL0013'});
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
				initGridData();							
				$('#btnSearch').click(function() {
					getDataBySearch();
				});
				$('#btnAdd').click(function() {
					$("#enditTab").dialog("open").dialog('setTitle', '新增客诉列表信息');
				});
				$('#btnClean').click(function() {
					$('#cxRuleName').textbox('setValue',"");
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
				$('#btnSearch1').click(function(){
					var titleName = '客诉列表信息添加';
					var dialogName = 'addMaterialDetails';
					var tabName = 'materialDetails_tab';
					var search_itemCD = $('#search_itemCD').textbox('getValue');
					var reqData = {
						IFS: 'WMS_AQL0015',
						ITEM_CD:search_itemCD,
						/*pageIndex: 1,
						pageSize: dgrid.pageSize*/
					}
					openDialogFrame(tabName,dialogName,titleName,reqData);
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
				$('#btnResets').click(function() {
					setQueryNull();
				});
			});
		}
	}
	var fcfo = new application();
	fcfo.init();
	
})();