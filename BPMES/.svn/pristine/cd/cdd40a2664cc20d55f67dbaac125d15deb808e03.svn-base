
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

						
		

		var Line1={
                url: "/iPlant_ajax",
                dataType: "JSON",
                data: {IFS: "MES_SPC0002"},
                successCallBack: function(a) {
                	dataTmp = [];
                	var op = a.RESPONSE[0].RESPONSE_DATA;
                    $.each(op,function(n,obj) {
                    	dataTmp.push({'value':obj.SPCPROJECT_NAME,'text':obj.SPCPROJECT_NAME});
				    });  
                    $('#PROJECTNAME').combobox({
                        data:dataTmp,
                        valueField:'value',
                        textField:'text'
                    });
                },
                errorCallBack: function() {
                    $.messager.alert("提示", '请联系管理员，查询失败！')
                }
            };
		iplantAjaxRequest(Line1);
		//初始化表格
		initGridData = function() {
			    var dgrid = $('#productWConf_tab').datagrid('options');
				if(!dgrid) return;
				var reqData = {
					IFS: 'MES_SPC0006',
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
						}
						,{
								field: 'SPCTASKLISTID',
								title: '项目ID',
								hidden:true,
								width: 150,
								align: 'center',formatter: function (value) {
					           	if(value != null)
                                return "<span title='" + value + "'>" + value + "</span>";}
							}
							,{
								field: 'PROJECTNAME',
								title: '项目名称',
								width: 150,
								align: 'center',formatter: function (value) {
					           	if(value != null)
                                return "<span title='" + value + "'>" + value + "</span>";}
							},{
								field: 'TASKNAME',
								title: '任务名称',
								width: 150,
								align: 'center',formatter: function (value) {
					           	if(value != null)
                                return "<span title='" + value + "'>" + value + "</span>";}
							},
							{
								field: 'TASKNUMBER',
								title: '产品编码',
								width: 150,
								align: 'center',formatter: function (value) {
					           	if(value != null)
                                return "<span title='" + value + "'>" + value + "</span>";}
							},
								{
									field: 'LINE',
									title: '线别',
									width: 150,
									align: 'center',formatter: function (value) {
						           	if(value != null)
	                                return "<span title='" + value + "'>" + value + "</span>";}
								},
								{
									field: 'WORKPROCEDURE',
									title: '工序',
									width: 150,
									align: 'center',formatter: function (value) {
						           	if(value != null)
	                                return "<span title='" + value + "'>" + value + "</span>";}
								},
								{								
									field : 'YN',
									title : '是否自动刷新',
									width : 100,
									align : 'center',
									formatter : function(value, row, index) {
										if (value == 'Y') {
											return '是';
										} else {
											return '否';
										}
									}
								},
								{
									field: 'INTERVALTIME',
									title: '间隔时间(分钟)',
									width: 150,
									align: 'center',formatter: function (value) {
						           	if(value != null)
	                                return "<span title='" + value + "'>" + value + "</span>";}
								},
								{
									field: 'USL',
									title: '规格上限(USL)',
									width: 150,
									align: 'center',formatter: function (value) {
						           	if(value != null)
	                                return "<span title='" + value + "'>" + value + "</span>";}
								},
								{
									field: 'LSL',
									title: '规格下限(LSL)',
									width: 150,
									align: 'center',formatter: function (value) {
						           	if(value != null)
	                                return "<span title='" + value + "'>" + value + "</span>";}
								},
								{
									field: 'REMARK',
									title: '描述',
									width: 220,
									align: 'center',formatter: function (value) {
						           	if(value != null)
	                                return "<span title='" + value + "'>" + value + "</span>";}
								},
							
							{
								field: 'CREATE_DATE',
								title: '创建日期',
								width: 180,
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
								width: 180,
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
					
					updateStation();
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
					CompanyOpttype=1;
					// $('#txtID').textbox('textbox').attr('disabled', true);
/*			    	 $('#txtBARCODE').textbox('textbox').attr('disabled', false);
			    	 $('#txtRFID').textbox('textbox').attr('disabled', false);*/
			    	 $('#saveID').hide();
//			    	 $('#cancleID').hide();
				}
				 
			}
			
			/* 添加商品移动信息 */
//			checkedRadio = function() {
//				
//				$('#By_product').prop('checked',true);
//				
//				/*$('[name="Supplier"]:radio').each(function() {  
//		                if (this.value == '0'){   
//		                   //this.prop('checked','checked');
//		                  $('#By_product').prop('checked','checked');
//		                }			  
//					}); */
//			}
			
			addStation = function() {
	        	CompanyOpttype = 0;
//	        	checkFun();
				$("#enditTab").dialog("open").dialog('setTitle', 'SPC任务列表信息添加');
				$("#fmStation").form("clear");			
			};
			
			
			
//			setDataNull = function () {           
//	             // $('#txtID').textbox('setValue','');              
//	          }	

		getDataBySearch = function(){
				var dgrid = $('#productWConf_tab').datagrid('options');
				if(!dgrid) return;
				var txtSPCProjectName = $('#txtSPCProjectName').val();
				var txtTaskName = $('#txtTaskName').val();
				var reqData = {
					PROJECTNAME: txtSPCProjectName,
					TASKNAME:txtTaskName,
					IFS: 'MES_SPC0006',
					pageIndex: 1,
					pageSize: dgrid.pageSize
				};
				reqGridData('/iPlant_ajax', 'productWConf_tab',reqData);
			};
		/* 修改SPC任务列表信息 */			
		updateStation = function() {
			CompanyOpttype = 1;	
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
				$("#enditTab").dialog("open").dialog('setTitle', '修改SPC任务列表信息');
				$('#PROJECTNAME').combobox('setValue', row.PROJECTNAME==null?'':row.PROJECTNAME);
				$('#LINE').combobox('setValue', row.LINE==null?'':row.LINE);
				$('#TASKNAME').textbox('setValue', row.TASKNAME==null?'':row.TASKNAME);
				$('#TASKNUMBER').textbox('setValue', row.TASKNUMBER==null?'':row.TASKNUMBER);
				$('#WORKPROCEDURE').textbox('setValue', row.WORKPROCEDURE==null?'':row.WORKPROCEDURE);
				$('#INTERVALTIME').numberbox('setValue', row.INTERVALTIME==null?'':row.INTERVALTIME);
				$('#USL').textbox('setValue', row.USL==null?'':row.USL);
				$('#LSL').textbox('setValue', row.LSL==null?'':row.LSL);
				$('#remark').textbox('setValue', row.MO==null?'':row.MO);
				$('#SPCTASKLISTID').textbox('setValue', row.SPCTASKLISTID==null?'':row.SPCTASKLISTID);
				
				$('#YN').val(row.YN);
				if(row.YN=='Y'){
					$('#YN').prop('checked', 'checked');
				}else{
					$('#YN').prop('checked', '');
				}
				CompanyOpttype = 1;	
//				checkedRow = 0;

			}
//			checkFun();
			CompanyOpttype = 1;	
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
               				arrUpdate.push({SPCTASKLISTID:item.SPCTASKLISTID});
                     });
               		 
               		 if(arrUpdate.length>0){
         	          /*批量删除*/
                         var ajaxUpdate = {
                             url: '/iPlant_ajax',
                             dataType: 'JSON',
                             data: {
                                 list: arrUpdate,
                                 IFS: 'MES_SPC0008'
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
               			showmessage.html('<font color=red>删除失败！</font>');
               		 }
               	}
            });      
    	},
        
        
        dataArr={},
        
		//置空查询输入框
		setQueryNull=function() {
			$('#txtTaskName').textbox('setValue',"");
			$('#txtSPCProjectName').textbox('setValue',"");
		},
       
       
        /*验证修改内容是否重复*/
        saveUpdateValidate = function() {
			var checkedItems = $('#productWConf_tab').datagrid('getSelections');
			row = checkedItems[0];
			if (row.SPCTASKLISTID) {
				if(
						$('#PROJECTNAME').combobox('getValue')!= ( row.PROJECTNAME==null?'':row.PROJECTNAME)||
						$('#LINE').combobox('getValue')!= ( row.LINE==null?'':row.LINE)||
						$('#TASKNAME').textbox('getValue')!= ( row.TASKNAME==null?'':row.TASKNAME)||
						$('#TASKNUMBER').textbox('getValue')!= ( row.TASKNUMBER==null?'':row.TASKNUMBER)||
						$('#WORKPROCEDURE').textbox('getValue')!= ( row.WORKPROCEDURE==null?'':row.WORKPROCEDURE)||
						$('#INTERVALTIME').numberbox('getValue')!= (row.INTERVALTIME==null?'':row.INTERVALTIME)||
						$('#USL').textbox('getValue')!= (row.USL==null?'':row.USL)||
						$('#LSL').textbox('getValue')!= (row.LSL==null?'':row.LSL)||
						$('#remark').textbox('getValue')!= ( row.MO==null?'':row.MO)||
						$('#SPCTASKLISTID').textbox('getValue')!= ( row.SPCTASKLISTID==null?'':row.SPCTASKLISTID))
					return true;
				else {
					return false;
				}
			}
		}
		
		
		
		
		
		
		
		
//		/* 添加供应商弹出框	 */
//		addVendorCode=function() {
//			$("#VendorCodeDetails").dialog("open").dialog('setTitle', '供应商详情');
//			$('#showMaster').html('');
//		}
//
//		/**根据条件查询供应商信息**/
//		getVendorCodeBySearch = function(){
//			var tabName = 'VendorCodeDetails_tab';
//			var dgridOp = $('#'+tabName).datagrid('options');
//			if(!dgridOp) return;
//			var name = $('#searchVendorName').val();
//			var code = $('#searchVendorCode').val();
//			var reqDataA = {
//				//MASTER_FLAG: 'Y',
//				SUP_NM:name,
//				SUP_CD:code,
//				IFS: 'B000082',
//				pageIndex: 1,
//				pageSize: dgridOp.pageSize
//			}
//			dialogDataGrid('/iPlant_ajax', tabName, reqDataA);
//			dialogEditorDataGrid = function(tabName,reqDataA, jsonData) {
//				var gridLists = {
//						name :tabName,
//						dataType : 'json',
//						columns : [[
//						      {field:'SUP_CD',title: '供应商编码',width: 130,align: 'center',formatter: function (value,row) {if (value != null) return "<span title='" + value + "'>" + value + "</span>";}},
//						      {field:'SUP_NM',title: '供应商名称',width: 130,align: 'center',formatter: function (value) {if (value != null) return "<span title='" + value + "'>" + value + "</span>";}},
//							  {field:'ST_NM',title: '供应商简称',width: 130,align: 'center',formatter: function (value) {if (value != null) return "<span title='" + value + "'>" + value + "</span>";}},					  
//							  {field:'SUP_BC',title: '供应商条形码',width: 130,align: 'center',formatter: function (value) {if (value != null) return "<span title='" + value + "'>" + value + "</span>";}},					  
//							  {field:'DICT_IT_NM',title: '供应商类别',width: 130,align: 'center',formatter: function (value) {if (value != null) return "<span title='" + value + "'>" + value + "</span>";}},
//							  {field:'SUP_ST',title: '供应商状态',width: 130,align: 'center',formatter: function (value) {if (value != null) return "<span title='" + value + "'>" + value + "</span>";}},
//						 ]],
//						 onDblClickRow: function(index,row){							
//							 selectVendorCode();
//				         }
//					}
//				initEditorDataGridView(reqDataA, gridLists);
//				$('#'+tabName).datagrid('loadData', jsonData);
//				var VendorCode = $('#VendorCode').textbox('getValue');
//		 		if(VendorCode){
//		 			var items = $('#VendorCodeDetails_tab').datagrid('getRows');
//		 			for (var i = 0; i < items.length; i++)
//		 			{
//		 				if(VendorCode == items[i].SUP_CD){
//		 					index = i;
//		 				}
//		 		   }
//		 		   $('#VendorCodeDetails_tab').datagrid('selectRow', index); //选中对应的行
//		 		}
//			}
//		}
//		
//		
//		/*选择供应商并赋值*/
//		selectVendorCode=function(){
//			var isSlect = $("#VendorCodeDetails_tab").datagrid('getSelected');			 
//			if(isSlect == null){
//				//$('#showVendor').html('请选择一条物料信息');
//			    $.messager.alert('提示', '请选择一条供应商信息');	
//			}else{
//				var vendorNM = isSlect.SUP_NM;
//				vendorCd = isSlect.SUP_CD;
//				$("#VendorCodeDetails").dialog("close");
//				$('#VendorCode').textbox('setValue',vendorNM);
//			}
//		}
//		
		
		
		/* 添加物料信息弹出框	 */
		 addMaterial=function() {
			$("#addMaterialDetails").dialog("open").dialog('setTitle', '物料信息详情');
			$('#showMaterial').html('');
			
		}
		
		/**根据条件查询物料信息**/
//		 getMaterialDataBySearch = function(){
//			var tabName = 'materialDetails_tab';
//			var dgrid = $('#'+tabName).datagrid('options');
//			if(!dgrid) return;
//			var materialCode = $('#materialCode').val();
//			var materialName = $('#materialName').val();
//			var reqData = {
//				ITEM_CD:materialCode,
//				ITEM_NM:materialName,
//				IFS: 'Z000007',
//				pageIndex: dgrid.pageNumber,
//				pageSize: dgrid.pageSize
//			}
//			dialogDataGrid('/iPlant_ajax', tabName, reqData);
//		   /*绑定物料详情列表数据*/
////		   dialogEditorDataGrid = function(tabName,reqData, jsonData){
////			var gridLists = {
////				name : tabName,
////				dataType : 'json',
////				columns : [[
////					{field:'ITEM_CD',title:'物料编码',width:180,align:'center',formatter:function(value) {if (value != null) return "<span title='" + value+ "'>" + value + "</span>";}},
////					{field:'ITEM_NM',title:'物料名称',width:180,align:'center',formatter:function(value) {if (value != null) return "<span title='" + value+ "'>" + value + "</span>";}},
////					{field:'ITEM_TYPE_NM',title:'物料类型',width:130,align:'center',formatter:function(value) {if (value != null) return "<span title='" + value+ "'>" + value + "</span>";}},
////					{field:'UOM_NM',title:'单位',width:130,align:'center',formatter:function(value) {if (value != null) return "<span title='" + value+ "'>" + value + "</span>";}},
////				 ]],
////				 onDblClickRow: function(index,row){
////					 assignment();
////		         }
////			}	
////			initEditorDataGridView(reqData, gridLists);
////			$('#'+tabName).datagrid('loadData', jsonData);
////			var MaterialCode = $('#txtMaterialCode').textbox('getValue');
////	  		if(MaterialCode){
////	  			var items = $('#materialDetails_tab').datagrid('getRows');
////	  			for (var i = 0; i < items.length; i++)
////	  			{
////	  				if(MaterialCode == items[i].MATERIAL_ID){
////	  					index = i;
////	  				}
////	  		   }
////	  		   $('#materialDetails_tab').datagrid('selectRow', index); //选中对应的行
////	  		}
////		}
//	 }

	    /*选择物料详情并赋值*/
//      assignment=function(){
//			var isSlect = $("#materialDetails_tab").datagrid('getSelected');
//			if(isSlect == null){
//				$.messager.alert('提示', '请选择一条物料信息');
//				//$('#showMaterial').html('请选择一条物料信息');
//			}else{
//				  materialCode = isSlect.ITEM_CD;
//				var materialName = isSlect.ITEM_NM;
//				$("#addMaterialDetails").dialog("close");
//				$('#txtMaterialCode').textbox('setValue',materialName);
//			}
//		}
      
      
      
      
      
	  /* 添加模板信息出框	 */
      addTemplateName=function() {
			$("#TemplateNameDetails").dialog("open").dialog('setTitle', '新增检验模板');
			$('#showTemplate').html('');
		}
      
		/**根据条件模板信息信息**/
//      getTemplateNamBySearche = function(){
//			var tabName = 'TemplateNameDetails_tab';
//			var dgridOp = $('#'+tabName).datagrid('options');
//			if(!dgridOp) return;
//			var name = $('#searchTemplateName').val();
//			var code = $('#searchTemplateCode').val();
//			var reqDataA = {
//				//MASTER_FLAG: 'Y',
//				INSPECTIONTEMPLATENAME:name,
//				DESCRIPTION:code,
//				IFS: 'WMS_AQL00007',
//				pageIndex: 1,
//				pageSize: dgridOp.pageSize
//			}
//			dialogDataGrid('/iPlant_ajax', tabName, reqDataA);
//			dialogEditorDataGrid = function(tabName,reqDataA, jsonData) {
//				var gridLists = {
//						name :tabName,
//						dataType : 'json',
//						columns : [[
//						      {field:'INSPECTIONTEMPLATENAME',title: '检验模板名',width: 230,align: 'center',formatter: function (value,row) {if (value != null) return "<span title='" + value + "'>" + value + "</span>";}},
//						      {field:'DESCRIPTION',title: '检验类型名称',width: 230,align: 'center',formatter: function (value) {if (value != null) return "<span title='" + value + "'>" + value + "</span>";}}
//						 ]],
//						 onDblClickRow: function(index,row){							
//							 selectTemplateName();
//				         }
//					}
//				initEditorDataGridView(reqDataA, gridLists);
//				$('#'+tabName).datagrid('loadData', jsonData);
//				var TemplateName = $('#TemplateName').textbox('getValue');
//		 		if(TemplateName){
//		 			var items = $('#TemplateNameDetails_tab').datagrid('getRows');
//		 			for (var i = 0; i < items.length; i++)
//		 			{
//		 				if(TemplateName == items[i].SUP_CD){
//		 					index = i;
//		 				}
//		 		   }
//		 		   $('#TemplateNameDetails_tab').datagrid('selectRow', index); //选中对应的行
//		 		}
//			}
//		}
		
		
		/*选择模板信息赋值*/
//      selectTemplateName=function(){
//			var isSlect = $("#TemplateNameDetails_tab").datagrid('getSelected');			 
//			if(isSlect == null){
//				//$('#showVendor').html('请选择一条模板信息');
//			    $.messager.alert('提示', '请选择一条模板信息');	
//			}else{
//				var vendorNM = isSlect.INSPECTIONTEMPLATENAME;
//				vendorCd = isSlect.INSPECTIONTYPEID;
//				$("#TemplateNameDetails").dialog("close");
//				$('#TemplateName').textbox('setValue',vendorNM);
//			}
//		}
      
      

      
      
	  /* 添加AQL规则出框	 */
//	addAQLRuleInfo=function() {
//			$("#AQLruleinfoDetails").dialog("open").dialog('setTitle', '新增AQL规则');
//			$('#showAQLRuleInfo').html('');
//		}
      
		/**根据条件AQL规则信息**/
//	getAQLRuleInfoSearche = function(){
//			var tabName = 'AQLRuleInfoDetails_tab';
//			var dgridOp = $('#'+tabName).datagrid('options');
//			if(!dgridOp) return;
//			var name = $('#searchAQLRuleName').val();
//			var type = $('#searchAQLRuleTypeName').val();
//			var reqDataA = {
//				//MASTER_FLAG: 'Y',
//				RULENAME:name,
//				AQLRULETYPEID:type,
//				IFS: 'WMS_AQL0001',
//				pageIndex: 1,
//				pageSize: dgridOp.pageSize
//			}
//			dialogDataGrid('/iPlant_ajax', tabName, reqDataA);
//			dialogEditorDataGrid = function(tabName,reqDataA, jsonData) {
//				var gridLists = {
//						name :tabName,
//						dataType : 'json',
//						columns : [[
//						      {field:'RULENAME',title: '规则名',width: 230,align: 'center',formatter: function (value,row) {if (value != null) return "<span title='" + value + "'>" + value + "</span>";}},
//						      {	
//								field: 'AQLRULETYPEID',
//								title: '类别名称',								
//								width: 230,
//								align: 'center',formatter: function (value) {
//					           	if(value != null){
//					           		if(value==1){
//					           			return "<span title='" + '正常' + "'>" + '正常' + "</span>";
//					           		}else if(value==2){
//					           			return "<span title='" + '加严' + "'>" + '加严' + "</span>";
//				           			}else if(value==3){
//					           			return "<span title='" + '放宽' + "'>" + '放宽' + "</span>";
//					           		}
//					           	}
//					           }
//							}
//						      
//						 ]],
//						 onDblClickRow: function(index,row){							
//							 selectAQLRuleInfo();
//				         }
//					}
//				initEditorDataGridView(reqDataA, gridLists);
//				$('#'+tabName).datagrid('loadData', jsonData);
//				var AQLRule = $('#AQLRule').textbox('getValue');
//		 		if(AQLRule){
//		 			var items = $('#AQLRuleInfoDetails_tab').datagrid('getRows');
//		 			for (var i = 0; i < items.length; i++)
//		 			{
//		 				if(AQLRule == items[i].RULENAME){
//		 					index = i;
//		 				}
//		 		   }
//		 		   $('#AQLRuleInfoDetails_tab').datagrid('selectRow', index); //选中对应的行
//		 		}
//			}
//		}
		
		
		/*选择AQL规则赋值*/
//      selectAQLRuleInfo=function(){
//			var isSlect = $("#AQLRuleInfoDetails_tab").datagrid('getSelected');			 
//			if(isSlect == null){
//				//$('#showVendor').html('请选择一条模板信息');
//			    $.messager.alert('提示', '请选择一条模板信息');	
//			}else{
//				var vendorNM = isSlect.RULENAME;
//				vendorCd = isSlect.AQLRULETYPEID;
//				$("#AQLruleinfoDetails").dialog("close");
//				$('#AQLRule').textbox('setValue',vendorNM);
//			}
//		}
      
      
      
      
   
      
     
		

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
				IFServerNo = 'MES_SPC0005'
			} else if(CompanyOpttype == 1) {
				if (!saveUpdateValidate()) {
					$.messager.alert("提示", '内容没有更新,请修改')
					return false;
				}
				
				IFServerNo = 'MES_SPC0007'
				var checkedItems = $('#productWConf_tab').datagrid('getSelections');
				row = checkedItems[0];
			} else {
				IFServerNo = 'MES_SPC0006';
			}
		    var enable;
			if ($('#YN').is(':checked')) {
				enable = 'Y';
			}
			else {
				enable = 'N';
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
			if(!checkSelect()) return;
			if(!checkForm()) return;
			var ajaxParam = {
				url: '/iPlant_ajax',
				dataType: 'JSON',
				data: {
					SPCTASKLISTID:$('#SPCTASKLISTID').val(),
					PROJECTNAME: $('#PROJECTNAME').combobox('getValue'),
					TASKNAME: $('#TASKNAME').val(),
					TASKNUMBER:$('#TASKNUMBER').val(),
					WORKPROCEDURE:$('#WORKPROCEDURE').val(),
					YN:enable,
					INTERVALTIME:$('#INTERVALTIME').val(),
					LINE:$('#LINE').combobox('getValue'),
					USL:$('#USL').val(),
					LSL:$('#LSL').val(),
					MO: $('#remark').val(),									
					IFS: IFServerNo
				},
				successCallBack: function(data) {
					var susMsg=getReturnMsg(data);
                	$.messager.alert("提示",susMsg,"",function(){
            			reqGridData('/iPlant_ajax','productWConf_tab',{IFS:'MES_SPC0006'});
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
//					checkedRadio();
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
//				$('.panel-tool-close').click(function() {
//					setDataNull();
//				});
			});
		}
	};
	var CompanyOpttype; //0：新增   1:编辑  
	var fcfo = new application();
	fcfo.init();
})();