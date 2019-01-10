
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
					IFS: 'WMS_QMS0002',
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
						    },

								{
									field: 'ITEMID',
									title: '产品编码',
									width: 150,
									align: 'center',formatter: function (value) {
						           	if(value != null)
	                                return "<span title='" + value + "'>" + value + "</span>";}
								},
								{
									field: 'VENDORCODE',
									title: '供应商名称',
									width: 150,
									align: 'center',formatter: function (value) {
						           	if(value != null)
	                                return "<span title='" + value + "'>" + value + "</span>";}
								},
								{
									field: 'INSPECTIONTEMPLATEID',
									title: '检验模板名',
									width: 150,
									align: 'center',formatter: function (value) {
						           	if(value != null)
	                                return "<span title='" + value + "'>" + value + "</span>";}
								},
								{
									field: 'LOTAUDIT',
									title: '检验水平',
									width: 150,
									align: 'center',formatter: function(value, row, index) {
										if (value == 'Audit_I') {
											return '一般水平I';
										} else if(value=='Audit_II') {
											return '一般水平II';
										} else if(value=='Audit_III') {
											return '一般水平III';
										} else if(value=='Audit_Other') {
											return '一般水平';
										} else if(value=='Audit_S1') {
											return '特殊水平S1';
										} else if(value=='Audit_S2') {
											return '特殊水平S2';
										} else if(value=='Audit_S3') {
											return '特殊水平S3';
										} else if(value=='Audit_S4') {
											return '特殊水平S4';
										}
										
									}
								
								},
								{
									field: 'AQLRULEID',
									title: 'AQL规则',
									width: 150,
									align: 'center',formatter: function (value) {
						           	if(value != null)
	                                return "<span title='" + value + "'>" + value + "</span>";}
								},
								{
									field: 'AQLSAMPLEID',
									title: '检验项',
									width: 150,
									align: 'center',formatter: function(value, row, index) {
										if (value == 1) {
											return '功能';
										} else {
											return '外观';
										}
									}
								},    
							{
								field: 'CREATE_DATE',
								title: '创建日期',
								width: 180,
								align: 'center',formatter: function (value) {
					           	if(value != null)
                                return "<span title='" + value + "'>" + value + "</span>";}
							},{
								field: 'CREATER_ID',
								title: '创建人',
								width: 150,
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
								field: 'UPDATER_ID',
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
				    	 $("#enditTab").dialog("open").dialog('setTitle', '修改模块关联列表信息');
				    	 checkFun();
				    	 $("#searchCondition").dialog("close");
						 $('#TemplateName').searchbox('setValue', row.INSPECTIONTEMPLATEID==null?'':row.INSPECTIONTEMPLATEID);
						 $('#VendorCode').textbox('setValue', row.VENDORCODE==null?'':row.VENDORCODE);
						 $('#txtMaterialCode').textbox('setValue', row.ITEMID==null?'':row.ITEMID);
						 $('#testLevel').combobox('setValue', row.LOTAUDIT==null?'':row.LOTAUDIT);
						 $('#AQLRule').textbox('setValue', row.AQLRULEID==null?'':row.AQLRULEID);
						 $('#inspectionItem').combobox('setValue', row.AQLSAMPLEID==null?'':row.AQLSAMPLEID);	
						 
						 cong_id = row.INSPECTIONTEMPLATEITEMID;
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
				$("#enditTab").dialog("open").dialog('setTitle', '模块关联列表信息添加');
	 			 $("#byProduct").prop('checked',true);
	 			 $("#byType").prop('checked',false);
				$("#fmStation").form("clear");
				
			}	
			
			
			
			setDataNull = function () {           
	             // $('#txtID').textbox('setValue','');              
	          }	

		getDataBySearch = function(){
				var dgrid = $('#productWConf_tab').datagrid('options');
				if(!dgrid) return;
				var selectTemplateName = $('#selectTemplateName').textbox('getValue');
				var selectProductCoding = $('#selectProductCoding').textbox('getValue');
				var checkeds = $('#fullMatching').prop('checked');
				var reqData = {
					INSPECTIONTEMPLATEID: selectTemplateName,
					ITEMID: selectProductCoding,
					CK:checkeds,
					IFS: 'WMS_QMS0002',
					pageIndex: 1,
					pageSize: dgrid.pageSize
				};
				reqGridData('/iPlant_ajax', 'productWConf_tab',reqData);
			};
		/* 修改模块关联列表信息 */			
		updateStation = function() {
			var checkedItems = $('#productWConf_tab').datagrid('getSelections');
			var moveIds = [];
			var num = 0;
			CompanyOpttype = 1;	
			checkedRow = 1;
			$.each(checkedItems, function(index, item) {
				moveIds.push(item.moveid);
				num++;
			});
			if(num != 1) {
				$.messager.alert('提示', '请选择一条数据进行修改');
				return false;
			}
			var row = $("#productWConf_tab").datagrid("getSelected");
			cong_id = row.INSPECTIONTEMPLATEITEMID;
				console.log(row);
			if(row) {				
				$("#searchCondition").dialog("close");
				$("#enditTab").dialog("open").dialog('setTitle', '修改模块关联列表信息');
				 $('#TemplateName').searchbox('setValue', row.INSPECTIONTEMPLATEID==null?'':row.INSPECTIONTEMPLATEID);
				 $('#VendorCode').textbox('setValue', row.VENDORCODE==null?'':row.VENDORCODE);
				 $('#txtMaterialCode').textbox('setValue', row.ITEMID==null?'':row.ITEMID);
				 $('#testLevel').combobox('setValue', row.LOTAUDIT==null?'':row.LOTAUDIT);
				 $('#AQLRule').textbox('setValue', row.AQLRULEID==null?'':row.AQLRULEID);
				 $('#inspectionItem').combobox('setValue', row.AQLSAMPLEID==null?'':row.AQLSAMPLEID);

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
               			
               				arrUpdate.push({INSPECTIONTEMPLATEITEMID:item.INSPECTIONTEMPLATEITEMID});
                     });
               		 
               		 if(arrUpdate.length>0){
         	          /*批量删除*/
                         var ajaxUpdate = {
                             url: '/iPlant_ajax',
                             dataType: 'JSON',
                             data: {
                                 list: arrUpdate,
                                 IFS: 'WMS_QMS0004'
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
			$('#selectTemplateName').textbox('setValue',""),
			$('#selectProductCoding').textbox('setValue',""),
			$('#fullMatching').prop('checked',false);
		},
       
       
        /*验证修改内容是否重复*/
    /*    saveUpdateValidate = function() {
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
		}*/
		
		
		
		
		  saveUpdateValidate = function() {
				var checkedItems = $('#productWConf_tab').datagrid('getSelections');
				row = checkedItems[0];
//				alert(JSON.stringify(checkedItems))
				if (row.INSPECTIONTEMPLATEITEMID) {
					if($('#TemplateName').textbox('getValue')!= (row.INSPECTIONTEMPLATEID==null?'':row.INSPECTIONTEMPLATEID)||
					   $('#VendorCode').textbox('getValue')!= ( row.VENDORCODE==null?'':row.VENDORCODE)||
					   $('#txtMaterialCode').textbox('getValue')!= (row.ITEMID==null?'':row.ITEMID)||
					   $('#testLevel').combobox('getValue')!= ( row.LOTAUDIT==null?'':row.LOTAUDIT)||
					   $('#AQLRule').textbox('getValue')!= ( row.AQLRULEID==null?'':row.AQLRULEID)||
					   $('#inspectionItem').combobox('getValue')!= ( row.AQLSAMPLEID==null?'':row.AQLSAMPLEID)){
						
						
						return true;
					}else{
						
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
						 onClickRow: function(index,row){							
//							 selectVendorCode();
							 $("#VendorCodeDetails").dialog("close");
							$('#VendorCode').textbox('setValue',row.SUP_NM);
				         }
					}
				initEditorDataGridView(reqDataA, gridLists);
				$('#'+tabName).datagrid('loadData', jsonData);
				var VendorCode = $('#VendorCode').textbox('getValue');
		 		if(VendorCode){
		 			var items = $('#VendorCodeDetails_tab').datagrid('getRows');
		 			var index=-1;
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
				 onClickRow: function(index,row){
					 //assignment();
						$("#addMaterialDetails").dialog("close");
						$('#txtMaterialCode').textbox('setValue',row.ITEM_NM);
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



	  /* 添加模板信息出框	 */
      addTemplateName=function() {
			$("#TemplateNameDetails").dialog("open").dialog('setTitle', '新增检验模板');
			$('#showTemplate').html('');
		}
      
		/**根据条件模板信息信息**/
      getTemplateNamBySearche = function(){
			var tabName = 'TemplateNameDetails_tab';
			var dgridOp = $('#'+tabName).datagrid('options');
			if(!dgridOp) return;
			var name = $('#searchTemplateName').val();
			var code = $('#searchTemplateCode').val();
			var reqDataA = {
				//MASTER_FLAG: 'Y',
				INSPECTIONTEMPLATENAME:name,
				DESCRIPTION:code,
				IFS: 'WMS_AQL00007',
				pageIndex: 1,
				pageSize: dgridOp.pageSize
			}
			dialogDataGrid('/iPlant_ajax', tabName, reqDataA);
			dialogEditorDataGrid = function(tabName,reqDataA, jsonData) {
				var gridLists = {
						name :tabName,
						dataType : 'json',
						columns : [[
						      {field:'INSPECTIONTEMPLATENAME',title: '检验模板名',width: 230,align: 'center',formatter: function (value,row) {if (value != null) return "<span title='" + value + "'>" + value + "</span>";}},
						      {field:'DESCRIPTION',title: '检验类型名称',width: 230,align: 'center',formatter: function (value) {if (value != null) return "<span title='" + value + "'>" + value + "</span>";}}
						 ]],
						 onClickRow: function(index,row){							
							    //selectTemplateName();
							 //	console.log(row);
								$("#TemplateNameDetails").dialog("close");
								$('#TemplateName').textbox('setValue',row.INSPECTIONTEMPLATENAME);
				         }
					}
				initEditorDataGridView(reqDataA, gridLists);
				$('#'+tabName).datagrid('loadData', jsonData);
				var TemplateName = $('#TemplateName').textbox('getValue');
		 		if(TemplateName){
		 			var items = $('#TemplateNameDetails_tab').datagrid('getRows');
		 			var index=-1;
		 			for (var i = 0; i < items.length; i++)
		 			{
		 				if(TemplateName == items[i].INSPECTIONTEMPLATENAME){
		 					index = i;
		 				}
		 		   }
		 		//	console.log(index);
		 		   $('#TemplateNameDetails_tab').datagrid('selectRow', index); //选中对应的行
		 		}
			}
		}
		
		


      
	 /* 添加AQL规则出框	 */
	addAQLRuleInfo=function() {
			$("#AQLruleinfoDetails").dialog("open").dialog('setTitle', '新增AQL规则');
			$('#showAQLRuleInfo').html('');
		}
      
		/**根据条件AQL规则信息**/
	getAQLRuleInfoSearche = function(){
			var tabName = 'AQLRuleInfoDetails_tab';
			var dgridOp = $('#'+tabName).datagrid('options');
			if(!dgridOp) return;
			var name = $('#searchAQLRuleName').val();
			var type = $('#searchAQLRuleTypeName').val();
			var reqDataA = {
				//MASTER_FLAG: 'Y',
				RULENAME:name,
				AQLRULETYPEID:type,
				IFS: 'WMS_AQL0001',
				pageIndex: 1,
				pageSize: dgridOp.pageSize
			}
			dialogDataGrid('/iPlant_ajax', tabName, reqDataA);
			dialogEditorDataGrid = function(tabName,reqDataA, jsonData) {
				var gridLists = {
						name :tabName,
						dataType : 'json',
						columns : [[
						      {field:'RULENAME',title: '规则名',width: 230,align: 'center',formatter: function (value,row) {if (value != null) return "<span title='" + value + "'>" + value + "</span>";}},
						      {	
								field: 'AQLRULETYPEID',
								title: '类别名称',								
								width: 230,
								align: 'center',formatter: function (value) {
					           	if(value != null){
					           		if(value==1){
					           			return "<span title='" + '正常' + "'>" + '正常' + "</span>";
					           		}else if(value==2){
					           			return "<span title='" + '加严' + "'>" + '加严' + "</span>";
				           			}else if(value==3){
					           			return "<span title='" + '放宽' + "'>" + '放宽' + "</span>";
					           		}
					           	}
					           }
							}
						      
						 ]],
						 onClickRow: function(index,row){							
							 //selectAQLRuleInfo();
								$("#AQLruleinfoDetails").dialog("close");
								$('#AQLRule').textbox('setValue',row.RULENAME);
				         }
					}
				initEditorDataGridView(reqDataA, gridLists);
				$('#'+tabName).datagrid('loadData', jsonData);
				var AQLRule = $('#AQLRule').textbox('getValue');
		 		if(AQLRule){
		 			var items = $('#AQLRuleInfoDetails_tab').datagrid('getRows');
		 			for (var i = 0; i < items.length; i++)
		 			{
		 				if(AQLRule == items[i].RULENAME){
		 					index = i;
		 				}
		 		   }
		 		   $('#AQLRuleInfoDetails_tab').datagrid('selectRow', index); //选中对应的行
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
				IFServerNo = 'WMS_QMS0001'
				isid = 'INSPECTIONTEMPLATEITEMID_SEQ.NEXTVAL';
			} else if(CompanyOpttype == 1) {
				

				if (!saveUpdateValidate()) {
					$.messager.alert("提示", '内容没有更新，请修改');
					return false;
				}
				IFServerNo = 'WMS_QMS0003'
	
					
				var checkedItems = $('#productWConf_tab').datagrid('getSelections');
				row = checkedItems[0];
				
			  
			 

				
			if(checkedRow!=0){
				    isid = cong_id;
				}else{
					isid = row.INSPECTIONTEMPLATEITEMID;
				}
			} else {
				IFServerNo = 'WMS_QMS0002'
			}
		    var TemplateName=$('#TemplateName').textbox("getValue");
		    var VendorCode=$('#VendorCode').textbox("getValue");
			var check = $('#byProduct').prop('checked');
			var version;
			if(check == true){
				version = 0;
			}else{
				version = 1;
			}
			var txtMaterialCode=$('#txtMaterialCode').textbox("getValue");
			var testLevel=$('#testLevel').combobox("getValue");
			var AQLRule=$('#AQLRule').textbox("getValue");
			var inspectionItem=$('#inspectionItem').combobox("getValue");
			
			
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
			
				  // ID:isid ,
				  INSPECTIONTEMPLATEITEMID:isid,
				  INSPECTIONTEMPLATEID:TemplateName ,
				  ITEMID :txtMaterialCode  ,
				  AQLRULEID:AQLRule        ,
				  LOTAUDIT:  testLevel     ,
				  VENDORCODE: VendorCode   ,
				  AQLSAMPLEID :inspectionItem ,
				  CATEGORYONE:''           ,
				  CATEGORYTWO:''           ,
				  CATEGORYTHREE:''         ,
				  IFS: IFServerNo
				},
				successCallBack: function(data) {
					var susMsg=getReturnMsg(data);
                	$.messager.alert("提示",susMsg,"",function(){
            			reqGridData('/iPlant_ajax','productWConf_tab',{IFS:'WMS_QMS0002'});
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
		          $('#inspectionItem').combobox({
		              data:[
			              {value:'1',text:'功能'},
			              {value:'2',text:'外观'}              
		              ],
		              valueField:'value',
		              textField:'text',
		              panelHeight:50, 
		            });
		          
		          $('#testLevel').combobox({
		              data:[
			              {value:'Audit_I',text:'一般水平I'},
			              {value:'Audit_II',text:'一般水平II'},
			              {value:'Audit_III',text:'一般水平III'},
			              {value:'Audit_Other',text:'一般水平'},
			              {value:'Audit_S1',text:'特殊水平S1'}, 
			              {value:'Audit_S2',text:'特殊水平S2'}, 
			              {value:'Audit_S3',text:'特殊水平S3'},
			              {value:'Audit_S4',text:'特殊水平S4'} 
		              ],
		              valueField:'value',
		              textField:'text',
		              panelHeight:150, 
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