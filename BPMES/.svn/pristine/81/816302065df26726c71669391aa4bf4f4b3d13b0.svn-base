/* 启动时加载 */
/*
*/
(function(){
	function customInfo(){
    	initGridData=function(){
    		var dgrid=$('#custom_tab').datagrid('options');
    		if(!dgrid) return;
       	    var reqData = {
                    IFS: 'B000081',
                    pageIndex:1,
            		pageSize:dgrid.pageSize
            }
       	   reqGridData('/iPlant_ajax','custom_tab', reqData);
        },
        dataArr={};
		bindGridData=function(reqData,jsonData){
			var grid={
					name:'custom_tab',
					dataType: 'json', 
					columns: [[
//					    {field : "CZ",width : 10,checkbox : true},
						{ field: 'CUS_CD', title: '客户编码', width: 100 ,align:'center'},
						{ field: 'CUS_NM', title: '客户名称', width: 200,align:'center'},
						{ field: 'ST_NM', title: '客户简称', width: 100,align:'center'},
						{ field: 'DICT_IT_NM',title:'客户类别', width: 150,align:'center'},
						{ field: 'CT_MN', title: '联系人', width: 200,align:'center'},
						{ field: 'TEL', title: '客户电话', width: 200,align:'center'},
						{ field: 'PN_NB', title: '客户手机', width: 200,align:'center'},
						{ field: 'E_MAIL', title: '邮箱', width: 200,align:'center'},
						{ field: 'FAX', title: '传真', width: 200,align:'center'},
						{ field: 'CUS_ADR', title: '地址', width: 200,align:'center'},
						{ field: 'WS', title: '主页', width: 200,align:'center'},
						{ field: 'CUS_BC', title: '客户条形码', width: 100,align:'center'},
						{ field: 'LG_PS', title: '法人代表', width: 200,align:'center'},
						{ field: 'BANK', title: '开户银行', width: 200,align:'center'},
						{ field: 'ACCOUNT', title: '银行账号', width: 200,align:'center'},
						{ field: 'ZP_CD', title: '邮编', width: 100,align:'center'},
						{ field: 'CP_RM', title: '备注', width: 200,align:'center'},
		                { field: 'CRT_ID', title: '创建人', width: 100,align:'center'},
		                { field: 'CRT_DT', title: '创建时间', width: 100,align:'center'},
		                { field: 'UPT_ID', title: '修改人', width: 100,align:'center'},
		                { field: 'UPT_DT', title: '修改时间', width: 100,align:'center'}
				    ]],
				    onDblClickRow: function(index,row){	
				    	CompanyOpttype=1;
				    	 $("#enditTab").dialog("open").dialog('setTitle', '查看客户信息');
				    	 checkFun();
				    	 $('#txtCustomCode').textbox('setValue',row.CUS_CD==null?'':row.CUS_CD);
					        $('#txtCustomName').textbox('setValue',row.CUS_NM==null?'':row.CUS_NM);
					        $('#txtCustomAbbreviation').textbox('setValue',row.ST_NM==null?'':row.ST_NM);
					        $('#txtCustomType').combobox('setText',row.DICT_IT_NM==null?'':row.DICT_IT_NM);
					        $('#txtContactName').textbox('setValue',row.CT_MN==null?'':row.CT_MN);
					        $('#txtContactTel').textbox('setValue',row.TEL==null?'':row.TEL);
					        $('#txtTelphone').textbox('setValue',row.PN_NB==null?'':row.PN_NB);
					        $('#txtCustomBarNumber').textbox('setValue',row.CUS_BC==null?'':row.CUS_BC);
					        $('#txtCustomEmail').textbox('setValue',row.E_MAIL==null?'':row.E_MAIL);
					        $('#txtCustomFox').textbox('setValue',row.FAX==null?'':row.FAX);
					        $('#txtLegalRepresentative').textbox('setValue',row.LG_PS==null?'':row.LG_PS);
					        $('#txtCustomBank').textbox('setValue',row.BANK==null?'':row.BANK);
					        $('#txtCustomBankNumber').textbox('setValue',row.ACCOUNT==null?'':row.ACCOUNT);
					        $('#txtCustomHomePage').textbox('setValue',row.WS==null?'':row.WS);
					        $('#txtCustomAdress').textbox('setValue',row.CUS_ADR==null?'':row.CUS_ADR);
					        $('#txtCustomZopCode').textbox('setValue',row.ZP_CD==null?'':row.ZP_CD);
					        $('#txtNote').textbox('setValue',row.CUS_RM==null?'':row.CUS_RM);
				     }
			}
			initGridView(reqData,grid);
			$('#custom_tab').datagrid('loadData',jsonData);
		},
		checkFun = function (){
			var qx = getUpdateRight();
			if(qx=="Y"){
				$('#txtCustomCode').textbox('textbox').attr('disabled', true);
		    	 $('#txtCustomName').textbox('textbox').attr('disabled', false);
		    	 $('#txtCustomAbbreviation').textbox('textbox').attr('disabled', false);
		    	 $('#txtContactName').textbox('textbox').attr('disabled', false);
		    	 $('#txtContactTel').textbox('textbox').attr('disabled', false);
		    	 $('#txtTelphone').textbox('textbox').attr('disabled', false);
		    	 $('#txtCustomBarNumber').textbox('textbox').attr('disabled', false);
		    	 $('#txtCustomEmail').textbox('textbox').attr('disabled', false);
		    	 $('#txtCustomFox').textbox('textbox').attr('disabled', false);
		    	 $('#txtLegalRepresentative').textbox('textbox').attr('disabled', false);
		    	 $('#txtCustomBank').textbox('textbox').attr('disabled', false);
		    	 $('#txtCustomBankNumber').textbox('textbox').attr('disabled', false);
		    	 $('#txtCustomHomePage').textbox('textbox').attr('disabled', false);
		    	 $('#txtCustomAdress').textbox('textbox').attr('disabled', false);
		    	 $('#txtCustomZopCode').textbox('textbox').attr('disabled', false);
		    	 $('#txtNote').textbox('textbox').attr('disabled', false);
		    	 $('#txtCustomType').combobox('textbox').attr('disabled', false);
		    	 $('#saveID').show();
		    	 $('#cancleID').show();
			}else{
				CompanyOpttype=2;
				$('#txtCustomCode').textbox('textbox').attr('disabled', true);
		    	 $('#txtCustomName').textbox('textbox').attr('disabled', true);
		    	 $('#txtCustomAbbreviation').textbox('textbox').attr('disabled', true);
		    	 $('#txtContactName').textbox('textbox').attr('disabled', true);
		    	 $('#txtContactTel').textbox('textbox').attr('disabled', true);
		    	 $('#txtTelphone').textbox('textbox').attr('disabled', true);
		    	 $('#txtCustomBarNumber').textbox('textbox').attr('disabled', true);
		    	 $('#txtCustomEmail').textbox('textbox').attr('disabled', true);
		    	 $('#txtCustomFox').textbox('textbox').attr('disabled', true);
		    	 $('#txtLegalRepresentative').textbox('textbox').attr('disabled', true);
		    	 $('#txtCustomBank').textbox('textbox').attr('disabled', true);
		    	 $('#txtCustomBankNumber').textbox('textbox').attr('disabled', true);
		    	 $('#txtCustomHomePage').textbox('textbox').attr('disabled', true);
		    	 $('#txtCustomAdress').textbox('textbox').attr('disabled', true);
		    	 $('#txtCustomZopCode').textbox('textbox').attr('disabled', true);
		    	 $('#txtNote').textbox('textbox').attr('disabled', true);
		    	 $('#txtCustomType').combobox('textbox').attr('disabled', true);
//		    	 $('#saveID').hide();
		    	 $('#cancleID').hide();
			}
			 
		}
		/*checkDataValid = function () {
            var txtCustomCode =$('#txtCustomCode').textbox('getValue');
            var txtCustomName =$('#txtCustomName').textbox('getValue');
            var txtCustomType =$('#txtCustomType').combobox('getValue');
            if(txtCustomCode==''||txtCustomName==''||txtCustomType=='') {
                return false;
            }
            return true;
        },*/
		existCustomInfo = function(customCode) {
			var rowNum, tpm = $('#txtCustomCode');
			if (CompanyOpttype == 0) {
				if(/[　，。、！？：“”［］——（）…！＠＃￥＆＊＋＞＜；：‘\u4e00-\u9fa5\s\n\r\t]+/.test($('#txtCustomCode').textbox('getText'))){
		        	$.messager.alert('提示', "客户编码不能是中文和非法字符，请重新输入。","",function(){
						$('#txtCustomCode').textbox('setValue', '');
						
					});
		        	return;
		        }
				if (tpm.val() != undefined && tpm.val() != ''
						&& tpm.val() != null) {
					if (customCode != undefined && customCode != ''
							&& customCode != null) {
						if (tpm.textbox('getValue') != undefined
								&& tpm.textbox('getValue') != ''
								&& tpm.textbox('getValue') != null) {
							var ajaxParam = {
								url : '/iPlant_ajax',
								dataType : 'JSON',
								data : {
									IFS : 'B000081',
									CUS_CD : customCode,
									pageIndex : 1,
									pageSize : 10
								},
								successCallBack : function(data) {
									rowNum = parseInt(data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS);
									if (rowNum > 0) {
										$.messager
												.alert(
														'提示',
														'您输入的客户编码['
																+ customCode
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
//              $('#txtCompanyCode').textbox({ required: false });
//              $('#txtCompanyCode').textbox('setValue','');
//              $('#txtCompanyName').textbox('setValue','');
//        }
		getDataByCondition = function() {
			$("#searchCondition").dialog("open").dialog('setTitle', '查询员工信息');
				$("#fmSearchCondition").form("clear");
							
			}
		getDataBySearch = function(){
			var dgrid = $('#custom_tab').datagrid('options');
				if(!dgrid) return;
					var customCode = $('#customCode').textbox('getValue');
					var customName = $('#customName').textbox('getValue');
//					var customAbbreviation = $('#customAbbreviation').textbox('getValue');
					var customType = $('#customType').combobox('getValue');
//					var contactName = $('#contactName').textbox('getValue');
					var reqData = {
						CUS_CD: customCode,
						CUS_NM: customName,
//						ST_NM: customAbbreviation,
						DICT_IT: customType,
//						CT_MN: contactName,
						IFS: 'B000001',
						pageIndex: 1,
						pageSize: dgrid.pageSize
					}
					reqGridData('/iPlant_ajax', 'custom_tab',reqData);
			}									
		/* 修改客户信息 */
		updateCustom=function() {
		    var checkedItems = $('#custom_tab').datagrid('getSelections');
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
		    var row = $("#custom_tab").datagrid("getSelected");
		   
		    if (row) {
		        $("#enditTab").dialog("open").dialog('setTitle', '编辑客户信息维护');
		        $('#txtCustomCode').textbox('textbox').attr('readonly', true);
				$('#txtCustomCode').textbox('textbox').attr('disabled', true);
		        $('#txtCustomCode').textbox('setValue',row.CUS_CD==null?'':row.CUS_CD);
		        $('#txtCustomName').textbox('setValue',row.CUS_NM==null?'':row.CUS_NM);
		        $('#txtCustomAbbreviation').textbox('setValue',row.ST_NM==null?'':row.ST_NM);
		        $('#txtCustomType').combobox('setText',row.DICT_IT_NM==null?'':row.DICT_IT_NM);
		        $('#txtContactName').textbox('setValue',row.CT_MN==null?'':row.CT_MN);
		        $('#txtContactTel').textbox('setValue',row.TEL==null?'':row.TEL);
		        $('#txtTelphone').textbox('setValue',row.PN_NB==null?'':row.PN_NB);
		        $('#txtCustomBarNumber').textbox('setValue',row.CUS_BC==null?'':row.CUS_BC);
		        $('#txtCustomEmail').textbox('setValue',row.E_MAIL==null?'':row.E_MAIL);
		        $('#txtCustomFox').textbox('setValue',row.FAX==null?'':row.FAX);
		        $('#txtLegalRepresentative').textbox('setValue',row.LG_PS==null?'':row.LG_PS);
		        $('#txtCustomBank').textbox('setValue',row.BANK==null?'':row.BANK);
		        $('#txtCustomBankNumber').textbox('setValue',row.ACCOUNT==null?'':row.ACCOUNT);
		        $('#txtCustomHomePage').textbox('setValue',row.WS==null?'':row.WS);
		        $('#txtCustomAdress').textbox('setValue',row.CUS_ADR==null?'':row.CUS_ADR);
		        $('#txtCustomZopCode').textbox('setValue',row.ZP_CD==null?'':row.ZP_CD);
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
		deleteCustom = function () {
             var isSelectedData = validSelectedData('#custom_tab', 'Delete');
             if (!isSelectedData) {
                 $.messager.alert('提示', '请选择一条数据进行删除');
                 return;
             }
             var checkedItems = $('#custom_tab').datagrid('getSelections');
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
                                     IFS: 'B000003',
                                     CUS_CD: item.CUS_CD
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
		/* 添加客户信息 */
		addCustom=function() {
        	CompanyOpttype=0;
		    checkFun();
        	$('#txtCustomCode').textbox('textbox').attr('readonly',
					false);
			$('#txtCustomCode').textbox('textbox').attr('disabled',
					false);
		    $("#enditTab").dialog("open").dialog('setTitle', '客户信息维护');
		    $("#fmCustom").form("clear");
		    
//		    $('.save').mouseover(function(){
//		    });
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
		}
		
		saveUpdateValidate = function() {
			var checkedItems = $('#custom_tab').datagrid('getSelections');
			row = checkedItems[0];
			if (row.CUS_CD) {
				if ( $('#txtCustomCode').textbox('getValue') != (row.CUS_CD==null?'':row.CUS_CD)
						|| $('#txtCustomName').textbox('getValue') != (row.CUS_NM==null?'':row.CUS_NM)
						|| $('#txtCustomAbbreviation').textbox('getValue') != (row.ST_NM==null?'':row.ST_NM)
						|| $('#txtCustomType').combobox('getValue') != (row.DICT_IT_CD==null?'':row.DICT_IT_CD)
						|| $('#txtContactName').textbox('getValue') != (row.CT_MN==null?'':row.CT_MN)
						|| $('#txtContactTel').textbox('getValue') != (row.TEL==null?'':row.TEL)
						|| $('#txtTelphone').textbox('getValue') != (row.PN_NB==null?'':row.PN_NB)
						|| $('#txtCustomBarNumber').textbox('getValue') != (row.CUS_BC==null?'':row.CUS_BC)
						|| $('#txtCustomEmail').textbox('getValue') != (row.E_MAIL==null?'':row.E_MAIL)
						|| $('#txtCustomFox').textbox('getValue') != (row.FAX==null?'':row.FAX)
						|| $('#txtLegalRepresentative').textbox('getValue') != (row.LG_PS==null?'':row.LG_PS)
						|| $('#txtCustomBank').textbox('getValue') != (row.BANK==null?'':row.BANK)
						|| $('#txtCustomBankNumber').textbox('getValue') != (row.ACCOUNT==null?'':row.ACCOUNT)
						|| $('#txtCustomHomePage').textbox('getValue') != (row.WS==null?'':row.WS)
						|| $('#txtCustomAdress').textbox('getValue') != (row.CUS_ADR==null?'':row.CUS_ADR)
						|| $('#txtCustomZopCode').textbox('getValue') != (row.ZP_CD==null?'':row.ZP_CD)
						|| $('#txtNote').textbox('getValue') != (row.CUS_RM==null?'':row.CUS_RM)) {
					return true;
				} else {
					return false;
				}
			}
		}
		
		saveCustomInfo=function(){ 
				/*if (!checkDataValid()){
	                $.messager.alert('提示','请添加必选信息');
	                return
	            }*/
	           if(!checkForm()) return; 
			   var IFServerNo='';
			   var reqData=[];
			   if(CompanyOpttype==0){ 
				   IFServerNo='B000002'
				   $.extend(reqData, { CP_ID: '',CP_IP: '',IFS:IFServerNo}); 
			   }else if(CompanyOpttype==1){
				   if (!saveUpdateValidate()) {
						$.messager.alert("提示", '内容没有更新，请修改')
						return false;
					}
				   IFServerNo='B000004'
				   $.extend(reqData, { CP_ID: '',CP_IP: '',IFS:IFServerNo}); 
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
		             if(!checkForm()) return;
		       	  var ajaxParam={
				      url:'/iPlant_ajax',
				      dataType:'JSON',
			  	      data:{
			              CUS_CD:$('#txtCustomCode').val(),
			              CUS_NM:$('#txtCustomName').val(),
			              ST_NM:$('#txtCustomAbbreviation').val(),
			              DICT_IT:$('#txtCustomType').combobox('getValue'),
			              CT_MN:$('#txtContactName').val(),
			              USE_YN: useYn,
			              TEL:$('#txtContactTel').val(),
			              PN_NB:$('#txtTelphone').val(),
			              E_MAIL:$('#txtCustomEmail').val(),
			              FAX:$('#txtCustomFox').val(),
			              LG_PS:$('#txtLegalRepresentative').val(),
			              BANK:$('#txtCustomBank').val(),
			              ACCOUNT:$('#txtCustomBankNumber').val(),
			              WS:$('#txtCustomHomePage').val(), //客户主页
			              CUS_ADR:$('#txtCustomAdress').val(),
			              ZP_CD:$('#txtCustomZopCode').val(),
			              CUS_RM:$('#txtNote').val(), 
			          	  IFS:IFServerNo
			         },
			         successCallBack:function(data){
			        	 var susMsg=getReturnMsg(data);
		                	$.messager.alert("提示",susMsg,"",function(){
		            			reqGridData('/iPlant_ajax','custom_tab',{IFS:'B000081'});
		            			$('#enditTab').dialog('close');
		            			//setDataNull();
		            			initGridData();
		            		});
//	                	 if($.messager.alert('提示', susMsg)){
//	                		 $('#enditTab').dialog('close');
//	                    	 setDataNull();
//	                    	 initGridData();	 
//	                	 }

	                 },
	                 errorCallBack:function(){
	                	 $.messager.alert('提示', errorMsg);
	                 }
			      };
					iplantAjaxRequest(ajaxParam);
					$("#enditTab").dialog("close");
		}
		doSearch =function(q,data,searchList,ele){  
          ele.combogrid('grid').datagrid('loadData', []);  
          if(q == ""){  
              ele.combogrid('grid').datagrid('loadData', data);  
              return;  
          }  
          var rows = [];  
          $.each(data,function(i,obj){  
              for(var p in searchList){  
                  var v = obj[searchList[p]];  
                  if (!!v && v.toString().indexOf(q) >= 0){  
                      rows.push(obj);  
                      break;  
                  }  
              }  
          });  
          if(rows.length == 0){
              ele.combogrid('grid').datagrid('loadData', []);  
              return;  
          }  
          ele.combogrid('grid').datagrid('loadData', rows);  
        }  
		bindCombogrid =function(){
			 //客户类别   
    		iplantAjaxRequest( {
    			url: '/iPlant_ajax',
    			data: {IFS:'D000008',DICT_CD:"CCT01",USE_YN:"Y"},
    			successCallBack: function (data) {
    				var array = new Array();
    				var rowCollection=createSourceObj(data);
    				array.push({"id":"","text":"全部"});
    				for(var i=0; i<rowCollection.length;i++){
    					array.push({"id":rowCollection[i].DICT_IT,"text":rowCollection[i].DICT_IT_NM});
    				}
    				var ccArr = [];
		            for(var i=0; i<rowCollection.length; i++){
		            	dataArr[rowCollection[i].DICT_IT]=rowCollection[i].DICT_IT_NM;
		            	ccArr.push({"id":rowCollection[i].DICT_IT,"text":rowCollection[i].DICT_IT_NM});
		            }
    				//高级查询
    				$('#customType').combobox({
    					data:array,
    					valueField:'id',
    					textField:'text'
    				});
    				//编辑时
    				$('#txtCustomType').combobox({
    					data:ccArr,
    					valueField:'id',
    					textField:'text'
    				});
    				if(CompanyOpttype == 1){
    					updateCustom();
    				}
    			}
    		});
		}
}
				customInfo.prototype={
							  init: function () {
						            $(function () {
							            	$("body")[0].onkeydown = keyPress;
							                $("body")[0].onkeyup = keyRelease;
										    initGridData();
										    var CompanyOpttype;
										    /*$('txtContactTel').keyup(function() {
										    	value=value.replace(/[^\d|chun]/g,'');
											});*/
											$("input",$("#txtContactTel").next("span")).blur(function(){ 
												checkedInput('txtContactTel',/^(\d{3,4}-)?\d{7,8}$/,'联系电话');
											})
											$('#txtContactTel').textbox('textbox').attr('maxlength', 13);

											$("input",$("#txtTelphone").next("span")).blur(function(){ 
												checkedInput('txtTelphone',/^1[34578]\d{9}$/,'手机号码');
											})
											$('#txtTelphone').textbox('textbox').attr('maxlength', 11);

											$("input",$("#txtCustomEmail").next("span")).blur(function(){ 
												checkedInput('txtCustomEmail',/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/,'邮箱');
											})

											$("input",$("#txtCustomFox").next("span")).blur(function(){ 
												checkedInput('txtCustomFox',/^(\d{3,4}-)?\d{7,8}$/,'传真号码');
											})
											$('#txtCustomFox').textbox('textbox').attr('maxlength', 13);

											$("input",$("#txtCustomBankNumber").next("span")).blur(function(){ 
												checkedInput('txtCustomBankNumber',/^[0-9]*$/,'银行账号');
											})
											$('#txtCustomBankNumber').textbox('textbox').attr('maxlength', 19);

											$("input",$("#txtCustomZopCode").next("span")).blur(function(){ 
												checkedInput('txtCustomZopCode',/^[1-9]{1}(\d+){5}$/,'邮政编号');
											})
											$('#txtCustomZopCode').textbox('textbox').attr('maxlength', 6);

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
												addCustom();
												bindCombogrid();
											})
											$('#btnDelete').click(function(){
												deleteCustom();
											});
											$('.update').click(function(){
												updateCustom();
												bindCombogrid();
											})
											$('#customType').combobox('textbox').bind('focus',function(){  
									          	bindCombogrid();
									         }); 
											$('.save').click(function(){
												saveCustomInfo(); 
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
											$("input", $("#txtCustomCode").next("span")).keyup(function() {
												checkInputLength('txtCustomCode', 20);
											})

											$("input", $("#txtCustomName").next("span")).keyup(function() {
												checkInputLength('txtCustomName', 100);
											})

											$("input", $("#txtCustomAbbreviation").next("span")).keyup(
													function() {
														checkInputLength('txtCustomAbbreviation', 30);
													})
								
											$("input", $("#txtContactName").next("span")).keyup(
													function() {
														checkInputLength('txtContactName', 20);
													})		
											
											$("input", $("#txtContactTel").next("span")).keyup(
													function() {
														checkInputLength('txtContactTel', 50);
													})		
												
											$("input", $("#txtTelphone").next("span")).keyup(
													function() {
														checkInputLength('txtTelphone', 50);
													})
													
											$("input", $("#txtCustomEmail").next("span")).keyup(
													function() {
														checkInputLength('txtCustomEmail', 50);
													})	
													
											$("input", $("#txtCustomFox").next("span")).keyup(
													function() {
														checkInputLength('txtCustomFox', 50);
													})
													
											$("input", $("#txtLegalRepresentative").next("span")).keyup(
													function() {
														checkInputLength('txtLegalRepresentative', 100);
													})
													
											$("input", $("#txtCustomBank").next("span")).keyup(
													function() {
														checkInputLength('txtCustomBank', 50);
													})
													
											$("input", $("#txtCustomBankNumber").next("span")).keyup(
													function() {
														checkInputLength('txtCustomBankNumber', 100);
													})
													
											$("input", $("#txtCustomHomePage").next("span")).keyup(
													function() {
														checkInputLength('txtCustomHomePage', 100);
													})
													
											$("input", $("#txtCustomAdress").next("span")).keyup(
													function() {
														checkInputLength('txtCustomAdress', 200);
													})
													
											$("input", $("#txtCustomZopCode").next("span")).keyup(
													function() {
														checkInputLength('txtCustomZopCode', 20);
													})
										
											$("input", $("#txtCustomBarNumber").next("span")).keyup(
													function() {
														checkInputLength('txtCustomBarNumber', 200);
													})
																																		
											$("#txtNote").textbox('textbox').bind("keyup", function() {
												checkInputLength('txtNote', 200);
											})
											//限制输入英文单引号
											$("input",$("#txtCustomCode").next("span")).keydown(function(e){
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
											$("input",$("#txtCustomName").next("span")).keydown(function(e){
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
											$("input",$("#txtCustomAbbreviation").next("span")).keydown(function(e){
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
											$("input",$("#txtContactTel").next("span")).keydown(function(e){
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
											$("input",$("#txtCustomEmail").next("span")).keydown(function(e){
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
											$("input",$("#txtCustomFox").next("span")).keydown(function(e){
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
											$("input",$("#txtCustomBank").next("span")).keydown(function(e){
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
											$("input",$("#txtCustomBankNumber").next("span")).keydown(function(e){
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
											$("input",$("#txtCustomHomePage").next("span")).keydown(function(e){
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
											$("input",$("#txtCustomAdress").next("span")).keydown(function(e){
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
											$("input",$("#txtCustomZopCode").next("span")).keydown(function(e){
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
											$("input",$("#txtCustomBarNumber").next("span")).keydown(function(e){
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
 var custom = new customInfo();
 custom.init();
})();
