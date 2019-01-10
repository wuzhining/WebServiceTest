/* 启动时加载 */
/*
*/
var CompanyOpttype;  //0：新增   1:编辑
(function () {
    function SupplierInfo() {
    	initGridData=function(){
    		var dgrid=$('#Supplier_tab').datagrid('options');
    		if(!dgrid) return;
       	    var reqData = {
                    IFS: 'B000082',
                    pageIndex:1,
            		pageSize:dgrid.pageSize
            }
       	 reqGridData('/iPlant_ajax','Supplier_tab', reqData);
        },
        dataArr={},
        bindGridData=function(reqDate,jsonData){
			        var grid={
						name:'Supplier_tab',
						dataType: 'json', 
						columns: [[
//						           {field : "CZ",width : 10,checkbox : true},
						           { field: 'SUP_CD', title: '供应商编码', width: 100 ,align:'center'},
					               { field: 'SUP_NM', title: '供应商名称', width: 200,align:'center'},
					               { field: 'ST_NM', title: '供应商简称', width: 100,align:'center'},
					               { field: 'SUP_BC', title: '供应商条形码', width: 100,align:'center'},
					               { field: 'DICT_IT_NM', title: '供应商类别', width: 150,align:'center'},
					               { field: 'SUP_ST', title: '供应商状态', width: 100,align:'center'},
					               { field: 'CT_MN', title: '联系人', width: 200,align:'center'},
					               { field: 'TEL', title: '电话', width: 200,align:'center'},
					               { field: 'PN_NB', title: '手机', width: 200,align:'center'},
					               { field: 'E_MAIL', title: '邮箱', width: 200,align:'center'},
					               { field: 'FAX', title: '传真', width: 200,align:'center'},
					               { field: 'SUP_ADR', title: '地址', width: 200,align:'center'},
					               { field: 'WS', title: '主页', width: 200,align:'center'},
					               { field: 'LG_PS', title: '法人代表', width: 200,align:'center'},
					               { field: 'BANK', title: '开户银行', width: 200,align:'center'},
					               { field: 'ACCOUNT', title: '银行账号', width: 200,align:'center'},
					               { field: 'ZP_CD', title: '邮编', width: 100,align:'center'},
					               { field: 'CRT_ID', title: '创建人', width: 100,align:'center'},
					               { field: 'CRT_DT', title: '创建时间', width: 100,align:'center',
					            	   	formatter:function(value,row,index) {
			                      		  if(row.CRT_DT){
			                      	         return gridToDate(row.CRT_DT);
			                      		  }
			                      	   }
					               },
					               { field: 'UPT_ID', title: '修改人', width: 100,align:'center'},
					               { field: 'UPT_DT', title: '修改时间', width: 100,align:'center',
					            	   formatter:function(value,row,index) {
			                     		  if(row.UPT_DT){
			                     	         return gridToDate(row.UPT_DT);
			                     		  }
			                     	    }
					               },
					               { field: 'CUS_RM', title: '备注', width: 200,align:'center'}
					     ]],
					     onDblClickRow: function(index,row){	
						    	CompanyOpttype=1;
						    	 $("#enditTab").dialog("open").dialog('setTitle', '查看 供应商信息');
						    	 checkFun();
						    	 $('#txtSupplierCode').textbox('setValue',row.SUP_CD==null?'':row.SUP_CD);
							        $('#txtSupplierName').textbox('setValue',row.SUP_NM==null?'':row.SUP_NM);
							        $('#txtSupplierAbbreviation').textbox('setValue',row.ST_NM==null?'':row.ST_NM);
							        $('#txtSupplierType').combobox('setText',row.DICT_IT_NM==null?'':row.DICT_IT_NM);
							        $('#txtContactName').textbox('setValue',row.CT_MN==null?'':row.CT_MN);
							        $('#txtSupplierTel').textbox('setValue',row.TEL==null?'':row.TEL);
							        $('#txtTelphone').textbox('setValue',row.PN_NB==null?'':row.PN_NB);
							        $('#txtSupplierBarNumber').textbox('setValue',row.SUP_BC==null?'':row.SUP_BC);
							        $('#txtSupplierEmail').textbox('setValue',row.E_MAIL=null?'':row.E_MAIL);
							        $('#txtSupplierFox').textbox('setValue',row.FAX==null?'':row.FAX);
							        $('#txtLegalRepresentative').textbox('setValue',row.LG_PS==null?'':row.LG_PS);
							        $('#txtSupplierBank').textbox('setValue',row.BANK==null?'':row.BANK);
							        $('#txtSupplierBankNumber').textbox('setValue',row.ACCOUNT==null?'':row.ACCOUNT);
							         $('#txtSupplierHomePage').textbox('setValue',row.WS==null?'':row.WS);
							        $('#txtSupplierAdress').textbox('setValue',row.SUP_ADR==null?'':row.SUP_ADR);
							        $('#txtSupplierZopCode').textbox('setValue',row.ZP_CD==null?'':row.ZP_CD);
							        $('#txtNote').textbox('setValue',row.CUS_RM==null?'':row.CUS_RM);
						     }
					}
					initGridView(reqDate,grid);
					$('#Supplier_tab').datagrid('loadData',jsonData);

        }
        checkFun = function (){
        	var qx = getUpdateRight();
			if(qx=="Y"){
				$('#txtSupplierCode').textbox('textbox').attr('disabled', true);
		    	 $('#txtSupplierName').textbox('textbox').attr('disabled', false);
		    	 $('#txtSupplierAbbreviation').textbox('textbox').attr('disabled', false);
		    	 $('#txtContactName').textbox('textbox').attr('disabled', false);
		    	 $('#txtSupplierTel').textbox('textbox').attr('disabled', false);
		    	 $('#txtTelphone').textbox('textbox').attr('disabled', false);
		    	 $('#txtSupplierBarNumber').textbox('textbox').attr('disabled', false);
		    	 $('#txtSupplierEmail').textbox('textbox').attr('disabled', false);
		    	 $('#txtSupplierFox').textbox('textbox').attr('disabled', false);
		    	 $('#txtLegalRepresentative').textbox('textbox').attr('disabled', false);
		    	 $('#txtSupplierBank').textbox('textbox').attr('disabled', false);
		    	 $('#txtSupplierBankNumber').textbox('textbox').attr('disabled', false);
		    	 $('#txtSupplierHomePage').textbox('textbox').attr('disabled', false);
		    	 $('#txtSupplierAdress').textbox('textbox').attr('disabled', false);
		    	 $('#txtSupplierZopCode').textbox('textbox').attr('disabled', false);
		    	 $('#txtNote').textbox('textbox').attr('disabled', false);
		    	 $('#txtSupplierType').combobox('textbox').attr('disabled', false);
		    	 $('#saveID').show();
		    	 $('#cancleID').show();
			}else{
				CompanyOpttype=2;
				$('#txtSupplierCode').textbox('textbox').attr('disabled', true);
		    	 $('#txtSupplierName').textbox('textbox').attr('disabled', true);
		    	 $('#txtSupplierAbbreviation').textbox('textbox').attr('disabled', true);
		    	 $('#txtContactName').textbox('textbox').attr('disabled', true);
		    	 $('#txtSupplierTel').textbox('textbox').attr('disabled', true);
		    	 $('#txtTelphone').textbox('textbox').attr('disabled', true);
		    	 $('#txtSupplierBarNumber').textbox('textbox').attr('disabled', true);
		    	 $('#txtSupplierEmail').textbox('textbox').attr('disabled', true);
		    	 $('#txtSupplierFox').textbox('textbox').attr('disabled', true);
		    	 $('#txtLegalRepresentative').textbox('textbox').attr('disabled', true);
		    	 $('#txtSupplierBank').textbox('textbox').attr('disabled', true);
		    	 $('#txtSupplierBankNumber').textbox('textbox').attr('disabled', true);
		    	 $('#txtSupplierHomePage').textbox('textbox').attr('disabled', true);
		    	 $('#txtSupplierAdress').textbox('textbox').attr('disabled', true);
		    	 $('#txtSupplierZopCode').textbox('textbox').attr('disabled', true);
		    	 $('#txtNote').textbox('textbox').attr('disabled', true);
		    	 $('#txtSupplierType').combobox('textbox').attr('disabled', true);
		    	 $('#saveID').hide();
		    	 $('#cancleID').hide();
			}
        }
        existSupplierInfo = function(supplierCode){
        	var rowNum, tpm = $('#txtSupplierCode');
			if (CompanyOpttype == 0) {
				if(/[　，。、！？：“”［］——（）…！＠＃￥＆＊＋＞＜；：‘\u4e00-\u9fa5\s\n\r\t]+/.test($('#txtSupplierCode').textbox('getText'))){
		        	$.messager.alert('提示', "供应商编码不能是中文和非法字符，请重新输入。","",function(){
						$('#txtSupplierCode').textbox('setValue', '');
						
					});
		        	return;
		        }
				if (tpm.val() != undefined && tpm.val() != ''
						&& tpm.val() != null) {
					if (supplierCode != undefined && supplierCode != ''
							&& supplierCode != null) {
						if (tpm.textbox('getValue') != undefined
								&& tpm.textbox('getValue') != ''
								&& tpm.textbox('getValue') != null) {
							var ajaxParam = {
								url : '/iPlant_ajax',
								dataType : 'JSON',
								data : {
									IFS : 'B000082',
									SUP_CD : supplierCode,
									pageIndex : 1,
									pageSize : 10
								},
								successCallBack : function(data) {
									rowNum = parseInt(data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS);
									if (rowNum > 0) {
										$.messager
												.alert(
														'提示',
														'您输入的供应商编码['
																+ supplierCode
																+ ']已有相同,请重新输入!');
										tpm.textbox('setValue', '');
										return false;
									} else {
										return 1;
									}
								}
							};
							iplantAjaxRequest(ajaxParam);
						}
					}
				}
			}
        }
//		setDataNull = function () {
//		    $('#txtCompanyCode').textbox({ required: false });
//			$('#txtCompanyCode').textbox('setValue','');
//			$('#txtCompanyName').textbox('setValue','');
//	    }	    	
        	
        getDataByCondition = function() {
			$("#searchCondition").dialog("open").dialog('setTitle', '查询员工信息');
				$("#fmSearchCondition").form("clear");
							
		}
		getDataBySearch = function(){
			var dgrid = $('#Supplier_tab').datagrid('options');
				if(!dgrid) return;
					var SupplierCode = $('#SupplierCode').val();
					var SupplierName = $('#SupplierName').val();
					var SupplierAbbreviation = $('#SupplierAbbreviation').val();
					var SupplierType = $('#SupplierType').combobox('getValue');
//					var contactName = $('#contactName').val();
					var reqData = {
						SUP_CD: SupplierCode,
						SUP_NM: SupplierName,
						ST_NM: SupplierAbbreviation,
						DICT_IT: SupplierType,
//						CT_MN: contactName,
						IFS: 'B000082',
						pageIndex: 1,
						pageSize: dgrid.pageSize
					}
					reqGridData('/iPlant_ajax', 'Supplier_tab',reqData);
			}		

					/* 修改供应商信息 */
		updateSupplier = function() {
					    var checkedItems = $('#Supplier_tab').datagrid('getSelections');
					    var moveIds = [];
					    var num = 0;
					    
					    $.each(checkedItems, function (index, item) {
					        moveIds.push(item.moveid);
					        num++;
					    });
					    if (num != 1) {
					        $.messager.alert('提示', '请选择一条数据进行修改');
					        return false;
					    }
					    var row = $("#Supplier_tab").datagrid("getSelected");
   
					    if (row) {
					        $("#enditTab").dialog("open").dialog('setTitle', '编辑公司信息');
					        $('#txtSupplierCode').textbox('textbox').attr('readonly', true);
							$('#txtSupplierCode').textbox('textbox').attr('disabled', true);
					        $('#txtSupplierCode').textbox('setValue',row.SUP_CD==null?'':row.SUP_CD);
					        $('#txtSupplierName').textbox('setValue',row.SUP_NM==null?'':row.SUP_NM);
					        $('#txtSupplierAbbreviation').textbox('setValue',row.ST_NM==null?'':row.ST_NM);
					        $('#txtSupplierType').combobox('setText',row.DICT_IT_NM==null?'':row.DICT_IT_NM);
					        $('#txtContactName').textbox('setValue',row.CT_MN==null?'':row.CT_MN);
					        $('#txtSupplierTel').textbox('setValue',row.TEL==null?'':row.TEL);
					        $('#txtTelphone').textbox('setValue',row.PN_NB==null?'':row.PN_NB);
					        $('#txtSupplierBarNumber').textbox('setValue',row.SUP_BC==null?'':row.SUP_BC);
					        $('#txtSupplierEmail').textbox('setValue',row.E_MAIL=null?'':row.E_MAIL);
					        $('#txtSupplierFox').textbox('setValue',row.FAX==null?'':row.FAX);
					        $('#txtLegalRepresentative').textbox('setValue',row.LG_PS==null?'':row.LG_PS);
					        $('#txtSupplierBank').textbox('setValue',row.BANK==null?'':row.BANK);
					        $('#txtSupplierBankNumber').textbox('setValue',row.ACCOUNT==null?'':row.ACCOUNT);
					         $('#txtSupplierHomePage').textbox('setValue',row.WS==null?'':row.WS);
					        $('#txtSupplierAdress').textbox('setValue',row.SUP_ADR==null?'':row.SUP_ADR);
					        $('#txtSupplierZopCode').textbox('setValue',row.ZP_CD==null?'':row.ZP_CD);
					        $('#txtNote').textbox('setValue',row.CUS_RM==null?'':row.CUS_RM);
					        CompanyOpttype=1;
					    }
					    checkFun();
		}
		validSelectedData = function (gridName,type) {
            var checkedItems = $(gridName).datagrid('getSelections');
            var num = 0;
            $.each(checkedItems, function (index, item) {
               num++;
            });
            if (type == 'Update') {
                if (num != 1) {
                    return false;
                }
            }
            else {
                if (num <= 0) {
                    return false;
                }
            }
            return true;
        },
		deleteSupplier = function () {
             var isSelectedData = validSelectedData('#Supplier_tab', 'Delete');
             if (!isSelectedData) {
                 $.messager.alert('提示', '请选择一条数据进行删除');
                 return;
             }
             var checkedItems = $('#Supplier_tab').datagrid('getSelections');
             //确认提示框
             var delCnt=0;
             $.messager.confirm('确认框', '您确定要删除您所选择的数据?', function (r) {
            	 if(r==true){
            		 $.each(checkedItems, function (index, item) {
            			 delCnt++;
                    	 var ajaxParam = {
                                 url: '/iPlant_ajax',
                                 dataType: 'JSON',
                                 data: {
                                     IFS: 'B000007',
                                     SUP_CD: item.SUP_CD,
                                 },
                                 successCallBack:function(data){
                                 	 if(delCnt==checkedItems.length){
	                              	 	if(data.RESPONSE["0"].RESPONSE_HDR.MSG_CODE=='0'){
	                              	 		$.messager.alert('提示', '删除成功!','',function(){
	                                	      initGridData();
	                                    });	
	                              	 	}else{
	                              	 		$.messager.alert('提示','删除失败,此数据正在使用!')
	                              	 	}
	                                     
	                            	 }
                         		},
                         		errorCallBack:function(data){
                         			if(delCnt==checkedItems.length){
                         				$.messager.alert('提示','删除失败,服务器无响应!');
                         			}
                         		}
                    	 
                          };
                         iplantAjaxRequest(ajaxParam);
                     });
            	 }
             });      
        },
		/* 添加供应商信息 */
		addSupplier=function() {
        	CompanyOpttype=0;
		    checkFun();
        	$('#txtSupplierCode').textbox('textbox').attr('readonly',
					false);
			$('#txtSupplierCode').textbox('textbox').attr('disabled',
					false);
		    $("#enditTab").dialog("open").dialog('setTitle', '供应商信息维护');
		    $("#fmSupplier").form("clear");
		    
		},
		saveUpdateValidate = function() {
			var checkedItems = $('#Supplier_tab').datagrid('getSelections');
			row = checkedItems[0];
			if (row.SUP_CD) {
				if ($('#txtSupplierCode').textbox('getValue') != row.SUP_CD
						|| $('#txtSupplierName').textbox('getValue') != row.SUP_NM
						|| $('#txtSupplierAbbreviation').textbox('getValue') != row.ST_NM
						|| $('#txtSupplierType').textbox('getValue') != row.DICT_IT_NM
						|| $('#txtContactName').textbox('getValue') != row.CT_MN
						|| $('#txtSupplierTel').textbox('getValue') != row.TEL
						|| $('#txtTelphone').textbox('getValue') != row.PN_NB
						|| $('#txtSupplierBarNumber').textbox('getValue') != row.SUP_BC
						|| $('#txtSupplierEmail').textbox('getValue') != row.E_MAIL
						|| $('#txtSupplierFox').textbox('getValue') != row.FAX
						|| $('#txtLegalRepresentative').textbox('getValue') != row.LG_PS
						|| $('#txtSupplierBank').textbox('getValue') != row.BANK
						|| $('#txtSupplierBankNumber').textbox('getValue') != row.ACCOUNT
						|| $('#txtSupplierHomePage').textbox('getValue') != row.WS
						|| $('#txtSupplierAdress').textbox('getValue') != row.SUP_ADR
						|| $('#txtSupplierZopCode').textbox('getValue') != row.ZP_CD
						|| $('#txtNote').textbox('getValue') != row.CUS_RM) {
					return true;
				} else {
					return false;
				}
			}
		}
		checkedInput =function(ele,rep,mes){
			var myInput =$('#'+ele).val();
			if(myInput){
				if(!rep.test(myInput)){
					$('#'+ele).textbox('setValue','');
					$.messager.alert('提示',mes+'不正确');
					return
				}
			}
		},
		savaSupplier=function(){ 
			if(!checkForm()) return;
			   var IFServerNo='';
			   var reqData=[];
			   if(CompanyOpttype==0){ 
				   IFServerNo='B000006'   
			   }
			   else if(CompanyOpttype==1){
				   if (!saveUpdateValidate()) {
						$.messager.alert("提示", '内容没有更新，请修改')
						return false;
					}
				   IFServerNo='B000008'
			   }
			   else{
				   IFServerNo='B000051'
			   }
			   
			   var useYn = '';
			    if($('#txtCompanyUse').is(':checked')){
		             useYn = "Y";
		           
		             }else {
		             useYn = "N"; 	
		             }
		       var susMsg='',errorMsg='';
		            if(CompanyOpttype==0){
		           	 susMsg='添加成功';
		           	 errorMsg='添加失败,请联系管理员';
		            }
		            else{
		           	 susMsg='更新成功';
		           	 errorMsg='更新失败,请联系管理员';
		            }
			   
			  
			   var ajaxParam={
			      url:'/iPlant_ajax',
			      dataType:'JSON',
			        
		  	      data:{
		  	      		TEL:$('#txtSupplierTel').val(),
					    SUP_CD:$('#txtSupplierCode').val(),
					    SUP_NM:$('#txtSupplierName').val(),
					    SUP_BC:$('#txtSupplierBarNumber').val(),
					    ST_NM:$('#txtSupplierAbbreviation').val(),
					    DICT_IT:$('#txtSupplierType').combobox('getValue'),
					    CT_MN:$('#txtContactName').val(),
					    PN_NB:$('#txtTelphone').val(),
					    CUS_BC:$('#txtSupplierBarNumber').val(),
					    E_MAIL:$('#txtSupplierEmail').val(),
					    FAX:$('#txtSupplierFox').val(),
					    LG_PS:$('#txtLegalRepresentative').val(),
					    BANK:$('#txtSupplierBank').val(),
					    ACCOUNT:$('#txtSupplierBankNumber').val(),
					    WS:$('#txtSupplierHomePage').val(),
					    SUP_ADR:$('#txtSupplierAdress').val(),
					    ZP_CD:$('#txtSupplierZopCode').val(),
					    CUS_RM:$('#txtNote').val(),
		          	    IFS:IFServerNo
		          },
			          successCallBack:function(data){
			        	  var susMsg=getReturnMsg(data);
		                	$.messager.alert("提示",susMsg,"",function(){
		            			reqGridData('/iPlant_ajax','Supplier_tab',{IFS:'B000082'});
		            			$('#enditTab').dialog('close');
		            			//setDataNull();
		            			initGridData();
		            		});
//			         	 if($.messager.alert('提示', susMsg)){
//			         		 $('#enditTab').dialog('close');
//			             	 setDataNull();
//			             	 initGridData();	 
//			         	 }
			          },
			          errorCallBack:function(){
			         	 $.messager.alert('提示', errorMsg);
			          }
			    };
					iplantAjaxRequest(ajaxParam);
					$("#enditTab").dialog("close");
		 		}
			initCombogridData=function(){
				//查询供应商类别表   SupplierType
	    		iplantAjaxRequest( {
	    			url: '/iPlant_ajax',
	    			data: {IFS:'D000008',DICT_CD:"CSP01",USE_YN:'Y'},
	    			successCallBack: function (data) {
	    				var array = new Array();
	    				var cxArr = [];
	    				var rowCollection=createSourceObj(data);
	    				cxArr.push({"id":"","text":"全部"});
	    				for(var i=0; i<rowCollection.length;i++){
	    					array.push({"id":rowCollection[i].DICT_IT,"text":rowCollection[i].DICT_IT_NM});
	    					cxArr.push({"id":rowCollection[i].DICT_IT,"text":rowCollection[i].DICT_IT_NM});
	    				}
	        	
	    				for(var i=0; i<rowCollection.length; i++){
			            	dataArr[rowCollection[i].DICT_IT]=rowCollection[i].DICT_IT_NM;
			            }
	    				//编辑时的数据
	    				$('#txtSupplierType').combobox({
	    					data:array,
	    					valueField:'id',
	    					textField:'text'
	    				});
	    				//查询时
	    				$('#SupplierType').combobox({
	    					data:cxArr,
	    					valueField:'id',
	    					textField:'text'
	    				});
	    				if(CompanyOpttype == 1){
	    					updateSupplier();	
	    				}
	    				
	    			}
	    		});
			}
		}
				    
    
    		SupplierInfo.prototype={
							  init: function () {
						            $(function () {
							            	$("body")[0].onkeydown = keyPress;
							                $("body")[0].onkeyup = keyRelease;
						            		initCombogridData();
										    initGridData();
										    
										    $("input",$("#txtSupplierTel").next("span")).blur(function(){ 
												checkedInput('txtSupplierTel',/^(\d{3,4}-)?\d{7,8}$/,'联系电话输入');
											})
//											$('#txtContactTel').textbox('textbox').attr('maxlength', 13);

											$("input",$("#txtTelphone").next("span")).blur(function(){ 
												checkedInput('txtTelphone',/^1[34578]\d{9}$/,'手机号码输入');
											})
//											$('#txtTelphone').textbox('textbox').attr('maxlength', 11);

											$("input",$("#txtSupplierEmail").next("span")).blur(function(){ 
												checkedInput('txtSupplierEmail',/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/,'邮箱输入');
											})

											$("input",$("#txtSupplierFox").next("span")).blur(function(){ 
												checkedInput('txtSupplierFox',/^(\d{3,4}-)?\d{7,8}$/,'传真号码输入');
											})

											$("input",$("#txtSupplierBankNumber").next("span")).blur(function(){ 
												checkedInput('txtSupplierBankNumber',/^[0-9]*$/,'银行账号输入');
											})

											$("input",$("#txtSupplierZopCode").next("span")).blur(function(){ 
												checkedInput('txtSupplierZopCode',/^[1-9]{1}(\d+){5}$/,'邮政编号输入');
											})
											
										    $('#btnSearch').click(function() {
										    	getDataBySearch();
											});
										    $('#btnFreshen').click(function() {
										    	getDataBySearch();
											});
										    $('.saveCustoms').click(function() {
												getDataBySearch();
												$('#searchCondition').dialog('close');
											});
											$('.add').click(function(){
												initCombogridData();
												addSupplier();
											})
											$('#btnDelete').click(function(){
												deleteSupplier();
											});
											$('.update').click(function(){
												initCombogridData();
												updateSupplier();
											})
											$('.save').click(function(){
												savaSupplier(); 
											})
											$('.close').click(function(){
//												setDataNull();
												$('#enditTab').dialog('close');
											})
											$('.closeCustoms').click(function() {
					//							setDataNull();
												$('#searchCondition').dialog('close');
											});
											//判断输入文字的长度
											$("input", $("#txtSupplierCode").next("span")).keyup(function() {
												checkInputLength('txtSupplierCode', 20);
											})

											$("input", $("#txtSupplierName").next("span")).keyup(function() {
												checkInputLength('txtSupplierName', 100);
											})											
								
											$("input", $("#txtContactName").next("span")).keyup(
													function() {
														checkInputLength('txtContactName', 20);
													})		
											
											$("input", $("#txtTelphone").next("span")).keyup(
													function() {
														checkInputLength('txtTelphone', 50);
													})		
												
											$("input", $("#txtSupplierTel").next("span")).keyup(
													function() {
														checkInputLength('txtSupplierTel', 50);
													})
													
											$("input", $("#txtSupplierEmail").next("span")).keyup(
													function() {
														checkInputLength('txtSupplierEmail', 50);
													})	
													
											$("input", $("#txtSupplierFox").next("span")).keyup(
													function() {
														checkInputLength('txtSupplierFox', 50);
													})																								
													
											$("input", $("#txtSupplierBank").next("span")).keyup(
													function() {
														checkInputLength('txtSupplierBank', 50);
													})
													
											$("input", $("#txtSupplierBankNumber").next("span")).keyup(
													function() {
														checkInputLength('txtSupplierBankNumber', 100);
													})																								
													
											$("input", $("#txtSupplierAdress").next("span")).keyup(
													function() {
														checkInputLength('txtSupplierAdress', 200);
													})
													
											$("input", $("#txtSupplierZopCode").next("span")).keyup(
													function() {
														checkInputLength('txtSupplierZopCode', 20);
													})
										
											$("input", $("#txtLegalRepresentative").next("span")).keyup(
													function() {
														checkInputLength('txtLegalRepresentative', 100);
													})
											
											$("input", $("#txtSupplierHomePage").next("span")).keyup(
													function() {
														checkInputLength('txtSupplierHomePage', 100);
													})
													
											$("input", $("#txtSupplierAbbreviation").next("span")).keyup(
													function() {
														checkInputLength('txtSupplierAbbreviation', 30);
													})
													
											$("input", $("#txtSupplierBarNumber").next("span")).keyup(
													function() {
														checkInputLength('txtSupplierBarNumber', 200);
													})																									
													
											$("#txtNote").textbox('textbox').bind("keyup", function() {
												checkInputLength('txtNote', 200);
											})
											//限制输入英文单引号
											$("input",$("#txtSupplierCode").next("span")).keydown(function(e){
								          		   if(e.keyCode==222){
								        				if(e.preventDefault){
								                            e.preventDefault();
								                        }
								                		else
								                		{
								                			e.returnValue = false;
								                        }      
								        			}
								          	   });
											$("input",$("#txtSupplierName").next("span")).keydown(function(e){
								          		   if(e.keyCode==222){
								        				if(e.preventDefault){
								                            e.preventDefault();
								                        }
								                		else
								                		{
								                			e.returnValue = false;
								                        }      
								        			}
								          	   });
											$("input",$("#txtContactName").next("span")).keydown(function(e){
								          		   if(e.keyCode==222){
								        				if(e.preventDefault){
								                            e.preventDefault();
								                        }
								                		else
								                		{
								                			e.returnValue = false;
								                        }      
								        			}
								          	   });
											$("input",$("#txtTelphone").next("span")).keydown(function(e){
								          		   if(e.keyCode==222){
								        				if(e.preventDefault){
								                            e.preventDefault();
								                        }
								                		else
								                		{
								                			e.returnValue = false;
								                        }      
								        			}
								          	   });
											$("input",$("#txtSupplierTel").next("span")).keydown(function(e){
								          		   if(e.keyCode==222){
								        				if(e.preventDefault){
								                            e.preventDefault();
								                        }
								                		else
								                		{
								                			e.returnValue = false;
								                        }      
								        			}
								          	   });
											$("input",$("#txtSupplierEmail").next("span")).keydown(function(e){
								          		   if(e.keyCode==222){
								        				if(e.preventDefault){
								                            e.preventDefault();
								                        }
								                		else
								                		{
								                			e.returnValue = false;
								                        }      
								        			}
								          	   });
											$("input",$("#txtSupplierFox").next("span")).keydown(function(e){
								          		   if(e.keyCode==222){
								        				if(e.preventDefault){
								                            e.preventDefault();
								                        }
								                		else
								                		{
								                			e.returnValue = false;
								                        }      
								        			}
								          	   });
											$("input",$("#txtSupplierBank").next("span")).keydown(function(e){
								          		   if(e.keyCode==222){
								        				if(e.preventDefault){
								                            e.preventDefault();
								                        }
								                		else
								                		{
								                			e.returnValue = false;
								                        }      
								        			}
								          	   });
											$("input",$("#txtSupplierBankNumber").next("span")).keydown(function(e){
								          		   if(e.keyCode==222){
								        				if(e.preventDefault){
								                            e.preventDefault();
								                        }
								                		else
								                		{
								                			e.returnValue = false;
								                        }      
								        			}
								          	   });
											$("input",$("#txtSupplierAdress").next("span")).keydown(function(e){
								          		   if(e.keyCode==222){
								        				if(e.preventDefault){
								                            e.preventDefault();
								                        }
								                		else
								                		{
								                			e.returnValue = false;
								                        }      
								        			}
								          	   });
											$("input",$("#txtSupplierZopCode").next("span")).keydown(function(e){
								          		   if(e.keyCode==222){
								        				if(e.preventDefault){
								                            e.preventDefault();
								                        }
								                		else
								                		{
								                			e.returnValue = false;
								                        }      
								        			}
								          	   });
											$("input",$("#txtLegalRepresentative").next("span")).keydown(function(e){
								          		   if(e.keyCode==222){
								        				if(e.preventDefault){
								                            e.preventDefault();
								                        }
								                		else
								                		{
								                			e.returnValue = false;
								                        }      
								        			}
								          	   });
											$("input",$("#txtSupplierHomePage").next("span")).keydown(function(e){
								          		   if(e.keyCode==222){
								        				if(e.preventDefault){
								                            e.preventDefault();
								                        }
								                		else
								                		{
								                			e.returnValue = false;
								                        }      
								        			}
								          	   });
											$("input",$("#txtSupplierAbbreviation").next("span")).keydown(function(e){
								          		   if(e.keyCode==222){
								        				if(e.preventDefault){
								                            e.preventDefault();
								                        }
								                		else
								                		{
								                			e.returnValue = false;
								                        }      
								        			}
								          	   });
											$("input",$("#txtSupplierBarNumber").next("span")).keydown(function(e){
								          		   if(e.keyCode==222){
								        				if(e.preventDefault){
								                            e.preventDefault();
								                        }
								                		else
								                		{
								                			e.returnValue = false;
								                        }      
								        			}
								          	   });
											$("input",$("#txtNote").next("span")).keydown(function(e){
								          		   if(e.keyCode==222){
								        				if(e.preventDefault){
								                            e.preventDefault();
								                        }
								                		else
								                		{
								                			e.returnValue = false;
								                        }      
								        			}
								          	   });
									});
								}
					}
				var SupplierInfo = new SupplierInfo();
    			SupplierInfo.init();
				})();
		 	

 
