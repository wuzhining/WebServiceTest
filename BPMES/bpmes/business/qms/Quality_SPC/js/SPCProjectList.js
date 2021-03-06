
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
					IFS: 'MES_SPC0002',
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
									field: 'SPCPROJECT_NAME',
									title: 'SPC项目名称',
									width: 150,
									align: 'center',formatter: function (value) {
						           	if(value != null)
	                                return "<span title='" + value + "'>" + value + "</span>";}
								},
								{
									field: 'SPCPROJECT_DESC',
									title: 'SPC项目描述',
									width: 150,
									align: 'center',formatter: function (value) {
						           	if(value != null)
	                                return "<span title='" + value + "'>" + value + "</span>";}
								},
								{
									field: 'SPCPROJECT_TYPE',
									title: 'SPC图表类型',
									width: 150,
									align: 'center',formatter: function (value) {
						           	if(value != null)
	                                return "<span title='" + value + "'>" + value + "</span>";}
								},
								{
									field: 'SAMPLE_NUMBER',
									title: '组内样本数',
									width: 150,
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
						/*var checkedRows = $('#productWConf_tab').datagrid('getSelected');
						if(checkedRows){
				    	 CompanyOpttype=1;
				    	 $("#enditTab").dialog("open").dialog('setTitle', '修改SPC项目列表信息');
				    	 checkFun();
						 $('#config_Name').combobox('setValue', row.CONFIGURATION_NAME==null?'':row.CONFIGURATION_NAME);
						 $('#config_Desc').combobox('setValue', row.CONFIGURATION_DESC==null?'':row.CONFIGURATION_DESC);
						 $('#remarks').textbox('setValue', row.REMARKS==null?'':row.REMARKS);
						 cong_id = row.SPCPROJECT_ID;
						 checkedRow=1;
					    }else{
							$.messager.alert("提示", '请选中行再进行修改')
							return false;
					    }
						 */
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
				$("#enditTab").dialog("open").dialog('setTitle', 'SPC项目列表信息添加');
				$("#fmStation").form("clear");
				
			}	
			
			
			
			setDataNull = function () {           
	             // $('#txtID').textbox('setValue','');              
	          }	

		getDataBySearch = function(){
				var dgrid = $('#productWConf_tab').datagrid('options');
				if(!dgrid) return;
				var projectName = $('#projectName').val();
				var checkeds = $('#fullMatching').prop('checked');
				var reqData = {
				    SPCPROJECT_NAME: projectName,
					CK:checkeds,
					IFS: 'MES_SPC0002',
					pageIndex: 1,
					pageSize: dgrid.pageSize
				};
				reqGridData('/iPlant_ajax', 'productWConf_tab',reqData);
			};
			
			
			
			
		/* 修改SPC项目列表信息 */			
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
			  $("#enditTab").dialog("open").dialog('setTitle', '修改SPC项目列表信息');
			  $('#SPCprojectName').textbox('setValue', row.SPCPROJECT_NAME==null?'':row.SPCPROJECT_NAME);
			  $('#SPCprojectDesc').textbox('setValue', row.SPCPROJECT_DESC==null?'':row.SPCPROJECT_DESC);
			  $('#SPCchartType').combobox('setValue', row.SPCPROJECT_TYPE==null?'':row.SPCPROJECT_TYPE);
			  
			  $('#sampleNumber').numberbox('setValue', row.SAMPLE_NUMBER==null?'':row.SAMPLE_NUMBER);
			  $('#groupNumber').numberbox('setValue', row.GROUP_NUMBER==null?'':row.GROUP_NUMBER);
			  $('#DecimalDigits').numberbox('setValue', row.DECIMAL_DIGITS==null?'':row.DECIMAL_DIGITS);
			  
			  if(row.DISPLAY_CP !=null){
					if(row.DISPLAY_CP == 'Y'){
						$('#displayCP').prop('checked',true);
					}else{
						$('#displayCP').prop('checked',false);
					}
			   };
			  
			  if(row.DISPLAY_CPK !=null){
					if(row.DISPLAY_CPK == 'Y'){
						$('#displayCPK').prop('checked',true);
					}else{
					    $('#displayCPK').prop('checked',false);
				 	}
			   
			   };
			  
			  if(row.DISPLAY_PP !=null){
					if(row.DISPLAY_PP == 'Y'){
						$('#displayPP').prop('checked',true);
					}else{
						$('#displayPP').prop('checked',false);
					}
			  };
			  
			  
			  if(row.DISPLAY_PPK !=null){
					if(row.DISPLAY_PPK == 'Y'){
						$('#displayPPK').prop('checked',true);
					}else{
						$('#displayPPK').prop('checked',false);
					}
			  };
				
				
				$('#NGdefectGroup').textbox('setValue', row.NGDEFECT_GROUP==null?'':row.NGDEFECT_GROUP);
				$('#NGdefectA').textbox('setValue', row.NG_DEFECT_A==null?'':row.NG_DEFECT_A);
				
				$('#NGdefectB').textbox('setValue', row.NG_DEFECT_B==null?'':row.NG_DEFECT_B);
				$('#NGdefectC').textbox('setValue', row.NG_DEFECT_C==null?'':row.NG_DEFECT_C);

				$('#NGdefectD').textbox('setValue', row.NG_DEFECT_D==null?'':row.NG_DEFECT_D);
				$('#NGdefectE').textbox('setValue', row.NG_DEFECT_E==null?'':row.NG_DEFECT_E);

				if(row.CONTROL_LINE !=null){
					if(row.CONTROL_LINE == 'Y'){
						$('#controlLine').prop('checked',true);
					}else{
						$('#controlLine').prop('checked',false);
					}
				};
				
				if(row.GAUGE_LINE !=null){
					if(row.GAUGE_LINE == 'Y'){
						$('#gaugeLine').prop('checked',true);
					}else{
						$('#gaugeLine').prop('checked',false);
					}
				};
				
				if(row.EARLY_WARNING_C !=null){
					if(row.EARLY_WARNING_C == 'Y'){
						$('#earlyWarning_C').prop('checked',true);
					}else{
						$('#earlyWarning_C').prop('checked',false);
				    }
				};

				$('#EWformatC').textbox('setValue', row.EW_FORMAT_C==null?'':row.EW_FORMAT_C);

				if(row.EARLY_WARNING_D !=null){
					if(row.EARLY_WARNING_D == 'Y'){
						$('#earlyWarning_D').prop('checked',true);
					}else{
						$('#earlyWarning_D').prop('checked',false);
					}
					
				};
				
				$('#EWformatD').textbox('setValue', row.EW_FORMAT_D==null?'':row.EW_FORMAT_D);
				
				
				if(row.EARLY_WARNING_E !=null){
					if(row.EARLY_WARNING_E  == 'Y'){
						$('#earlyWarning_E').prop('checked',true);
					}else{
						$('#earlyWarning_E').prop('checked',false);
					}
				};
		
				$('#EWformatE').textbox('setValue', row.EW_FORMAT_E==null?'':row.EW_FORMAT_E);
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
               				arrUpdate.push({SPCPROJECT_ID:item.SPCPROJECT_ID});
                     });
               		 
               		 if(arrUpdate.length>0){
         	          /*批量删除*/
                         var ajaxUpdate = {
                             url: '/iPlant_ajax',
                             dataType: 'JSON',
                             data: {
                                 list: arrUpdate,
                                 IFS: 'MES_SPC0004'
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
               			showmessage.html('<font color=red>删除失败,此工单不Y创建状态！</font>');
               		 }
               	}
            });      
    	},
        
        
        dataArr={},
        
		//置空查询输入框
		setQueryNull=function() {
			$('#projectName').textbox('setValue',""),
			$('#fullMatching').prop('checked',false);
		},
		
		
		
		
		
		//验证SPC项目名称是否存在
		saveAddValidate = function(){
			var spc = $('#SPCprojectName').textbox('getValue');
			var  check = false;
			var work = {
					url: '/iPlant_ajax',
					dataType: 'JSON',
					async:false,
					data: {
						SPCPROJECT_NAME:spc,
					  IFS: 'MES_SPC0002'
					},
					successCallBack: function(data) {
						var	rowNum = parseInt(data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS);
						
						if (rowNum > 0) {
							
							 $.messager.alert('提示', '您输入信息已有相同,请重新输入');
							 check=true;
						}
	                	
					},
		
				};
			
			  iplantAjaxRequest(work);
			  return check;

		}

       
		/*验证修改内容YN重复*/
       /* saveUpdateValidate = function() {
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
        
        /*验证修改内容YN重复*/
        
        saveUpdateValidate = function() {
			var checkedItems = $('#productWConf_tab').datagrid('getSelections');
			row = checkedItems[0];
			if (row.SPCPROJECT_ID) {
				var displayCP = 'N';
				if ($('#displayCP').is(':checked')) {
					displayCP = "Y";
				} else {
					displayCP = "N";
				}
				
				var displayCPK = 'N';
				if ($('#displayCPK').is(':checked')) {
					displayCPK = "Y";
				} else {
					displayCPK = "N";
				}
				
				var displayPP = 'N';
				if ($('#displayPP').is(':checked')) {
					displayPP = "Y";
				} else {
					displayPP = "N";
				}
				
				var displayPPK = 'N';
				if ($('#displayPPK').is(':checked')) {
					displayPPK = "Y";
				} else {
					displayPPK = "N";
				}
				
				var controlLine = 'N';
				if ($('#controlLine').is(':checked')) {
					controlLine = "Y";
				} else {
					controlLine = "N";
				}
				
				var gaugeLine = 'N';
				if ($('#gaugeLine').is(':checked')) {
					gaugeLine = "Y";
				} else {
					gaugeLine = "N";
				}
				
				var earlyWarning_C = 'N';
				if ($('#earlyWarning_C').is(':checked')) {
					earlyWarning_C = "Y";
				} else {
					earlyWarning_C = "N";
				}
				
				var earlyWarning_D = 'N';
				if ($('#earlyWarning_D').is(':checked')) {
					earlyWarning_D = "Y";
				} else {
					earlyWarning_D = "N";
				}
				
				var earlyWarning_E = 'N';
				if ($('#earlyWarning_E').is(':checked')) {
					earlyWarning_E = "Y";
				} else {
					earlyWarning_E = "N";
				}	
				
				if(
						$('#SPCprojectName').textbox('getValue')!= ( row.SPCPROJECT_NAME==null?'':row.SPCPROJECT_NAME)||
						$('#SPCprojectDesc').textbox('getValue')!= ( row.SPCPROJECT_DESC==null?'':row.SPCPROJECT_DESC)||
						$('#SPCchartType').combobox('getValue')!= ( row.SPCPROJECT_TYPE==null?'':row.SPCPROJECT_TYPE)||
						$('#sampleNumber').numberbox('getValue')!= ( row.SAMPLE_NUMBER==null?'':row.SAMPLE_NUMBER)||
						$('#groupNumber').numberbox('getValue')!= ( row.GROUP_NUMBER==null?'':row.GROUP_NUMBER)||
						$('#DecimalDigits').numberbox('getValue')!= (row.DECIMAL_DIGITS==null?'':row.DECIMAL_DIGITS)||
						$('#NGdefectGroup').textbox('getValue')!= (row.NGDEFECT_GROUP==null?'':row.NGDEFECT_GROUP)||
						$('#NGdefectA').textbox('getValue')!= (row.NG_DEFECT_A==null?'':row.NG_DEFECT_A)||
						$('#NGdefectB').textbox('getValue')!= ( row.NG_DEFECT_B==null?'':row.NG_DEFECT_B)||
						$('#NGdefectC').textbox('getValue')!= ( row.NG_DEFECT_C==null?'':row.NG_DEFECT_C)||
						$('#NGdefectD').textbox('getValue')!= ( row.NG_DEFECT_D==null?'':row.NG_DEFECT_D)||
						$('#NGdefectE').textbox('getValue')!= ( row.NG_DEFECT_E==null?'':row.NG_DEFECT_E)
						|| displayCP != row.DISPLAY_CP
						|| displayCPK != row.DISPLAY_CPK
						|| displayPP != row.DISPLAY_PP
						|| displayPPK != row.DISPLAY_PPK
						|| controlLine != row.CONTROL_LINE
						|| gaugeLine != row.GAUGE_LINE
						|| earlyWarning_C != row.EARLY_WARNING_C
						|| earlyWarning_D != row.EARLY_WARNING_D
						|| earlyWarning_E != row.EARLY_WARNING_E){
					return true;
					}
				else {
					return false;
				}
			}
		}
        
        
        
        
        
        
        
        
        
        
        
		

		/* 添加供应商弹出框	 */
		addNGdefectGroup=function() {
			$("#NGdefectGroupDetails").dialog("open").dialog('setTitle', '供应商详情');
			$('#showMaster').html('');
		}

		/**根据条件查询供应商信息**/
		getNGdefectGroupBySearch = function(){
			var tabName = 'NGdefectGroupDetails_tab';
			var dgridOp = $('#'+tabName).datagrid('options');
			if(!dgridOp) return;
			var name = $('#searchVendorName').val();
			var code = $('#searchNGdefectGroup').val();
			var reqDataA = {
				//MASTER_FLAG: 'Y',
				SUP_NM:name,
				SUP_CD:code,
				DICT_CD:'CBR01',
				IFS: 'D000008',
				pageIndex: 1,
				pageSize: dgridOp.pageSize
			}
			dialogDataGrid('/iPlant_ajax', tabName, reqDataA);
			dialogEditorDataGrid = function(tabName,reqDataA, jsonData) {
				var gridLists = {
						name :tabName,
						dataType : 'json',
						columns : [[
						      {field:'DICT_IT',title: '不良类别编号',width: 180,align: 'center',formatter: function (value,row) {if (value != null) return "<span title='" + value + "'>" + value + "</span>";}},
						      {field:'DICT_IT_NM',title: '不良类别名称',width: 180,align: 'center',formatter: function (value) {if (value != null) return "<span title='" + value + "'>" + value + "</span>";}},
							  {field:'DICT_RM',title: '备注',width: 250,align: 'center',formatter: function (value) {if (value != null) return "<span title='" + value + "'>" + value + "</span>";}}			  
						 ]],
						 onDblClickRow: function(index,row){							
							 //selectNGdefectGroup();
							$("#NGdefectGroupDetails").dialog("close");
							$('#NGdefectGroup').textbox('setValue',row.DICT_IT_NM);
				         }
					}
				initEditorDataGridView(reqDataA, gridLists);
				$('#'+tabName).datagrid('loadData', jsonData);
				var NGdefectGroup = $('#NGdefectGroup').textbox('getValue');
		 		if(NGdefectGroup){
		 			var items = $('#NGdefectGroupDetails_tab').datagrid('getRows');
		 			for (var i = 0; i < items.length; i++)
		 			{
		 				if(NGdefectGroup == items[i].DICT_IT){
		 					index = i;
		 				}
		 		   }
		 		   $('#NGdefectGroupDetails_tab').datagrid('selectRow', index); //选中对应的行
		 		}
			}
		}
		
		
		/*选择供应商并赋值*/
/*		selectNGdefectGroup=function(){
			var isSlect = $("#NGdefectGroupDetails_tab").datagrid('getSelected');			 
			if(isSlect == null){
				//$('#showVendor').html('请选择一条物料信息');
			    $.messager.alert('提示', '请选择一条供应商信息');	
			}else{
				var vendorNM = isSlect.DICT_IT_NM;
				vendorCd = isSlect.DICT_IT;
				$("#NGdefectGroupDetails").dialog("close");
				$('#NGdefectGroup').textbox('setValue',vendorNM);
			}
		}*/
		

	 /* 添加AQL规则出框	 */
	addAQLRuleInfo=function() {
			$("#AQLruleinfoDetails").dialog("open").dialog('setTitle', '新增AQL规则');
			$('#showAQLRuleInfo').html('');
		}
      
		/**根据条件AQL规则信息**/
	getAQLRuleInfoSearche = function(id){
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
						 onDblClickRow: function(index,row){
							 var value = row.RULENAME;
							 $("#AQLruleinfoDetails").dialog("close");
							 $('#'+id).searchbox('setValue',value);
							 //selectAQLRuleInfo(id,value);
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
		
		
	 /*选择AQL规则赋值*/
/*      selectAQLRuleInfo=function(id,value){
			var isSlect = $("#AQLRuleInfoDetails_tab").datagrid('getSelected');			 
			if(isSlect == null){
			    $.messager.alert('提示', '请选择一条模板信息');	
			}else{
				var vendorNM = isSlect.RULENAME;
				vendorCd = isSlect.AQLRULETYPEID;
				
			}
		}*/
      

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
		    	
		    	  var checkResult = saveAddValidate();
			    	 
					if(checkResult){
						
						return false;
					}  
		    	
				IFServerNo = 'MES_SPC0001'
				isid = 'SPCPROJECT_ID_SEQ.NEXTVAL';
			} else if(CompanyOpttype == 1) {
				if (!saveUpdateValidate()) {
					$.messager.alert("提示", '内容没有更新,请修改')
					return false;
				}
				
				  
				
				IFServerNo = 'MES_SPC0003'
				var checkedItems = $('#productWConf_tab').datagrid('getSelections');
				row = checkedItems[0];
			if(checkedRow!=0){
				isid = cong_id;
				}else{
					isid = row.SPCPROJECT_ID;
				}
			} else {
				IFServerNo = 'MES_SPC0002'
			}

		    var SPCprojectName = $('#SPCprojectName').textbox("getValue");
		    var SPCprojectDesc = $('#SPCprojectDesc').textbox("getValue");
		    var SPCchartType = $('#SPCchartType').combobox("getValue");
		    var sampleNumber = $('#sampleNumber').numberbox("getValue");
		    var groupNumber = $('#groupNumber').numberbox("getValue");
		    var DecimalDigits = $('#DecimalDigits').numberbox("getValue");
			var checkCP = $('#displayCP').prop('checked');
			var displayCP;
			if(checkCP == true){
				displayCP = 'Y';
			}else{
				displayCP = 'N';
			}
			
			var checkCPK = $('#displayCPK').prop('checked');
			var displayCPK;
			if(checkCPK == true){
				displayCPK = 'Y';
			}else{
				displayCPK = 'N';
			}

			var checkPP = $('#displayPP').prop('checked');
			var displayPP;
			if(checkPP == true){
				displayPP = 'Y';
			}else{
				displayPP = 'N';
			}
			
			var checkPPK = $('#displayPPK').prop('checked');
			var displayPPK;
			if(checkPP == true){
				displayPPK = 'Y';
			}else{
				displayPPK = 'N';
			}
			var NGdefectGroup = $('#NGdefectGroup').textbox("getValue");
			var NGdefectA = $('#NGdefectA').textbox("getValue");
			
			var NGdefectB = $('#NGdefectB').textbox("getValue");
			var NGdefectC = $('#NGdefectC').textbox("getValue");

			var NGdefectD = $('#NGdefectD').textbox("getValue");
			var NGdefectE = $('#NGdefectE').textbox("getValue");
			
			var checkControl = $('#controlLine').prop('checked');
			var controlLine;
			if(checkControl == true){
				controlLine = 'Y';
			}else{
				controlLine = 'N';
			}
			
			var checkGauge = $('#gaugeLine').prop('checked');
			var gaugeLine;
			if(checkGauge == true){
				gaugeLine = 'Y';
			}else{
				gaugeLine = 'N';
			}

			var check_C = $('#earlyWarning_C').prop('checked');
			var earlyWarning_C;
			if(check_C == true){
				earlyWarning_C = 'Y';
			}else{
				earlyWarning_C = 'N';
			}
			var EWformatC = $('#EWformatC').textbox("getValue");

			var check_D = $('#earlyWarning_D').prop('checked');
			var earlyWarning_D;
			if(check_D == true){
				earlyWarning_D = 'Y';
			}else{
				earlyWarning_D = 'N';
			}
			var EWformatD = $('#EWformatD').textbox("getValue");

			var check_E = $('#earlyWarning_E').prop('checked');
			var earlyWarning_E;
			if(check_E == true){
				earlyWarning_E = 'Y';
			}else{
				earlyWarning_E = 'N';
			}
			var EWformatE = $('#EWformatE').textbox("getValue");
			
			
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
			
				  ID:isid ,
				  SPCPROJECT_NAME:SPCprojectName ,
				  SPCPROJECT_DESC:SPCprojectDesc ,
				  SPCPROJECT_TYPE:SPCchartType ,
				  SAMPLE_NUMBER:sampleNumber   ,
				  GROUP_NUMBER:groupNumber    ,
				  DECIMAL_DIGITS:DecimalDigits  ,
				  DISPLAY_CP:displayCP      ,
				  DISPLAY_CPK:displayCPK     ,
				  DISPLAY_PP:displayPP      ,
				  DISPLAY_PPK:displayPPK     ,
				  NGDEFECT_GROUP:NGdefectGroup  ,
				  NG_DEFECT_A:NGdefectA     ,
				  NG_DEFECT_B:NGdefectB     ,
				  NG_DEFECT_C:NGdefectC     ,
				  NG_DEFECT_D:NGdefectD     ,
				  NG_DEFECT_E:NGdefectE     ,
				  CONTROL_LINE:controlLine    ,
				  GAUGE_LINE:gaugeLine      ,
				  EARLY_WARNING_C:earlyWarning_C ,
				  EW_FORMAT_C:EWformatC     ,
				  EARLY_WARNING_D:earlyWarning_D ,
				  EW_FORMAT_D:EWformatD     ,
				  EARLY_WARNING_E:earlyWarning_E ,
				  EW_FORMAT_E:EWformatE     ,
				  IFS: IFServerNo
				},
				successCallBack: function(data) {
					var susMsg=getReturnMsg(data);
                	$.messager.alert("提示",susMsg,"",function(){
            			reqGridData('/iPlant_ajax','productWConf_tab',{IFS:'MES_SPC0002'});
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
		          $('#SPCchartType').combobox({
		              data:[
		                  {value:'',text:'--请选择--'},
			              {value:'X-bar R',text:'X-bar R'},
			              {value:'p Chart',text:'p Chart'},
			              {value:'np Chart',text:'np Chart'},
			              {value:'c Chart',text:'c Chart'},
			              {value:'u Chart',text:'u Chart'} 
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
					//insertDataGrid('productWConf_tab',{SPCPROJECT_ID:autoCreateCode('Cfg')});
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