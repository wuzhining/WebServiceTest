(function () {
    function UserMes() {
    	pageConfig={
    	    gridName:'userMes_tab',
    	    txtUserCode:'txtUserMesCode',
    	    txtUserPas:'txtUserMesPass',
    	    txtUserMesNum:'txtUserMesNum',
    	    txtUserMesGroup:'txtUserMesGroup',
    	    txtNote:'txtNote',
    	    txtUserMesUse:'txtUserMesUse',
    	    title:'用户管理',
    	},
    	initGridData=function(){
    		var dgrid=$('#'+pageConfig.gridName).datagrid('options');
    		if(!dgrid) return;
       	    var reqData = {
                    IFS: 'D000037',
                    pageIndex:1,
            		pageSize:dgrid.pageSize
            }
       	 reqGridData('/iPlant_ajax',pageConfig.gridName, reqData);
        },
    	bindGridData = function (reqData,jsonData) {
            var grid = {
                name: pageConfig.gridName,
                dataType: 'json',
				columns:[[
//				   {field : "CZ",width : 10,checkbox : true},
				   { field: 'USE_CD', title: '用户编码', width: 100 ,align:'center' },
		           { field: 'EMP_NO', title: '员工号', width: 100 ,align:'center',hidden:true},
                   { field: 'USE_NM', title: '员工名称', width: 100 ,align:'center'},
                   { field: 'GR_CD', title: '所属用户组编码', width: 100 ,align:'center'},
		           { field: 'GR_NM', title: '所属用户组', width: 100 ,align:'center'},
		           { field: 'USE_ST', title: '用户状态', width: 100 ,align:'center',formatter:function(value,row,index) {
		           		if(row.USE_ST=='2'){
		           			return"试用期";
		           		}else if(row.USE_ST=='1'){
		           			return"在职";
		           		}
		           		else{
		           			return"离职";
		           		}
		           }},
                   { field: 'USE_RM', title: '备注', width: 200 ,align:'center'},
		           { field: 'USE_YN', title: '是否启用' , width: 100 ,align:'center',formatter:function(value,row,index) {
		           		if(row.USE_YN=='Y'){
		           			return"启用";
		           		}else{
		           			return"不启用";
		           		}
		           }},
		           { field: 'CRT_ID', title: '创建人', width: 100 ,align:'center'},
		           { field: 'CRT_DT', title: '创建时间', width: 200 ,align:'center'},
		           { field: 'UPT_ID', title: '修改人', width: 100 ,align:'center'},
		           { field: 'UPT_DT', title: '修改时间', width: 200 ,align:'center'},
				]],
				onClickRow: function(index,row){
					var del = $("#btnDelete");
			    	if(row.USE_CD=="admin"){
			    		 del.linkbutton("disable");
			    	}else{
			    		del.linkbutton("enable");
			    	}
			    },
				onDblClickRow: function(index,row){	
			    	 $("#enditTab").dialog("open").dialog('setTitle', '编辑'+pageConfig.title+'维护');
			    	 OptType=1;
			    	 checkFun();
			    	 $('#txtUserMesPas').textbox('setValue',row.PW==null?'':row.PW);
		                $('#txtUserMesCode').textbox('setValue',row.USE_CD==null?'':row.USE_CD);
		                $('#txtUserMesNum').combobox('setValue',row.EMP_NO==null?'':row.EMP_NO);
		                $('#txtUserMesNum').combobox('setText',row.USE_NM==null?'':row.USE_NM);
		                /*$('#txtUserMesNum').combobox('setText',row.USE_NM);
		                $('#txtUserMesGroup').combobox('setText',row.GR_NM);*/
		                $('#txtUserMesGroup').combobox('setValue',row.GR_CD==null?'':row.GR_CD);
		                $('#txtNote').textbox('setValue',row.USE_RM==null?'':row.USE_RM);
		                $('#txtUserMesSta').combobox('setValue',row.USE_ST==null?'':row.USE_ST);
		                if (row.USE_YN == "Y") {
		                     $('#'+pageConfig.txtUserMesUse).prop('checked', 'checked');
		                } else {
		                     $('#'+pageConfig.txtUserMesUse).prop('checked', '');
		                }
			     }
            }
            initGridView(reqData,grid);
            $('#'+pageConfig.gridName).datagrid('loadData', jsonData);
        },  
        checkFun = function (){
        	var qx = getUpdateRight();
 			if(qx=="Y"){
				 $('#txtUserMesPas').textbox('textbox').attr('disabled', false);
		    	 $('#txtUserMesCode').textbox('textbox').attr('disabled', true);
		    	 $('#txtNote').textbox('textbox').attr('disabled', false);
		    	 $('#txtUserMesNum').combobox('textbox').attr('disabled', false);
		    	 $('#txtUserMesNum').combobox('textbox').attr('disabled', false);
		    	 $('#txtUserMesGroup').combobox('textbox').attr('disabled', false);
		    	 $('#txtUserMesSta').combobox('textbox').attr('disabled', false);
		    	 $('#saveID').show();
		    	 $('#cancleID').show();
			}else{
				OptType=2;
				$('#txtUserMesPas').textbox('textbox').attr('disabled', true);
		    	 $('#txtUserMesCode').textbox('textbox').attr('disabled', true);
		    	 $('#txtNote').textbox('textbox').attr('disabled', true);
		    	 $('#txtUserMesNum').combobox('textbox').attr('disabled', true);
		    	 $('#txtUserMesNum').combobox('textbox').attr('disabled', true);
		    	 $('#txtUserMesGroup').combobox('textbox').attr('disabled', true);
		    	 $('#txtUserMesSta').combobox('textbox').attr('disabled', true);
		    	 $('#saveID').hide();
			}
			 
		}
        OptType=0,
        getOptType=function(){
        	return this.OptType;
        },
        setOptType=function(value){
        	this.OptType=value;
        },
        /*数据有效性验证*/
        /*数据不能为空验证*/
       /* checkDataValid = function () {
              var dictCode = $('#'+pageConfig.txtUserCode).val();
              var txtUserMesNum =$('#txtUserMesNum').combobox('getValue');
              var txtUserMesGroup =$('#txtUserMesGroup').combobox('getValue');
              if (dictCode == ''||txtUserMesNum==''||txtUserMesGroup=='') {
                  $('#'+pageConfig.txtUserCode).textbox({ required: true });
                  return false;
              }
              return true;
        },*/
        setDataNull = function () {
              $('#'+pageConfig.txtUserCode).textbox({ required: false });
              $('#'+pageConfig.txtUserCode).textbox('setValue','');
              $('#'+pageConfig.txtUserPas).textbox('setValue','');
              $('#'+pageConfig.txtUserMesNum).textbox('setValue','');
              $('#'+pageConfig.txtUserMesGroup).textbox('setValue','');
              $('#'+pageConfig.txtNote).textbox('setValue','');            
        }
        validSelectedData = function (gridName,type) {
            var checkedItems = $('#' + gridName).datagrid('getSelections');
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
        addUserMes = function () {
             bindCombogridEMP();
             setOptType(0);
             checkFun();
             $('#txtUserMesCode').textbox('textbox').attr('readonly', false);
			 $('#txtUserMesCode').textbox('textbox').attr('disabled', false);
			 $('#txtUserMesPas').textbox('textbox').attr('readonly', false);
             $("#enditTab").dialog("open").dialog('setTitle', pageConfig.title+'维护');
             $("#fmUserMes").form("clear");
             $('#txtUserMesSta').combobox({
                data:[
                    {value:'0',text:'离职'},
                    {value:'1',text:'在职'},
                    {value:'2',text:'试用期'}
                ],
                valueField:'value',
                textField:'text',
                panelHeight:80, 
             });
             $('#'+pageConfig.txtUserMesUse).prop('checked', 'checked');
             /*$('#save').mouseover(function(){
                    if(!$("#txtUserMesUse").is(':checked')){
                        if($.messager.alert('警告','不启用该用户无任何操作权限')){
                            $("#save").unbind("mouseover");
                            return
                        }
                    }                       
             });*/
        },
        deleteUserMes = function () {
             if ($('#btnDelete').linkbutton('options').disabled) {
 				return false;
 			 }else{
 				var isSelectedData = validSelectedData(pageConfig.gridName, 'Delete');
 	             if (!isSelectedData) {
 	                 $.messager.alert('提示', '请选择至少一条数据进行删除');
 	                 return;
 	             }
 	             var checkedItems = $('#' + pageConfig.gridName).datagrid('getSelections');
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
 	                                     IFS: 'D000039',
 	                                     USE_CD: item.USE_CD,
 	                                 },
 	                                 successCallBack:function(){
 	                                	 if(delCnt==checkedItems.length){
 	                                	    initGridData();
 	                                	 }
 	                                 }
 	                    	 
 	                          };
 	                         iplantAjaxRequest(ajaxParam);
 	                     });
 	            	 }
 	             }); 
 			 }
        },
        //修改
        
        updateUserMes = function () {
            $('#txtUserMesSta').combobox({
                data:[
                    {value:'0',text:'离职'},
                    {value:'1',text:'在职'},
                    {value:'2',text:'试用期'}
                ],
                valueField:'value',
                textField:'text',
                panelHeight:80,
            });
            var row = $("#"+pageConfig.gridName).datagrid("getSelected");
            if (row) {
            	userGrounp=row.GR_NM;
                $('#queryTab').dialog('close');
                $("#enditTab").dialog("open").dialog('setTitle', '编辑'+pageConfig.title+'维护'); 
                $('#txtUserMesCode').textbox('textbox').attr('readonly', true);
   			 	$('#txtUserMesCode').textbox('textbox').attr('disabled', true);
   			    $('#txtUserMesPas').textbox('setValue',row.PW==null?'':row.PW).textbox('readonly',true);
                $('#txtUserMesCode').textbox('setValue',row.USE_CD==null?'':row.USE_CD);
                $('#txtUserMesNum').combobox('setValue',row.EMP_NO==null?'':row.EMP_NO);
                $('#txtUserMesNum').combobox('setText',row.USE_NM==null?'':row.USE_NM);
                /*$('#txtUserMesNum').combobox('setText',row.USE_NM);
                $('#txtUserMesGroup').combobox('setText',row.GR_NM);*/
                $('#txtUserMesGroup').combobox('setValue',row.GR_CD==null?'':row.GR_CD);
                $('#txtNote').textbox('setValue',row.USE_RM==null?'':row.USE_RM);
                $('#txtUserMesSta').combobox('setValue',row.USE_ST==null?'':row.USE_ST);
                if (row.USE_YN == "Y") {
                     $('#'+pageConfig.txtUserMesUse).prop('checked', 'checked');
                } else {
                     $('#'+pageConfig.txtUserMesUse).prop('checked', '');
                }
            }
            checkFun();
        },
        getDataByCondition =function (){
            var dgrid=$('#'+pageConfig.gridName).datagrid('options');
        	var userMesCode = $('#queryUserMesCode').textbox('getValue');
			var userMesNum = $('#queryUserMesNum').textbox('getValue');
			var userMesGroup =$('#queryUserMesGroup').combobox('getValue');
			var reqData ={
				USE_CD: userMesCode,
				EMP_NO: userMesNum,
				GR_CD: userMesGroup,
			    IFS:'D000037',
                pageIndex:1,
                pageSize:dgrid.pageSize
			};
			reqGridData('/iPlant_ajax','userMes_tab',reqData)
			$('#queryTab').dialog('close');	
//			if(userMesCode==''&&userMesNum==''&&userMesGroup==''){
//				$.messager.alert('提示','请输入选择条件');
//			}else{
//				reqGridData('/iPlant_ajax','userMes_tab',reqData)
//				$('#queryTab').dialog('close');	
//			}
        },
        resetPassword =function(){
            var isSelectedData = validSelectedData(pageConfig.gridName, 'Update');
                if (!isSelectedData) {
                     $.messager.alert('提示', '请选择一个用户重置密码');
                     return;
                }
            var row = $("#"+pageConfig.gridName).datagrid("getSelected");
            var resetPass='123456';
            var ajaxParam = {
                 url: '/iPlant_ajax',
                 dataType: 'JSON',
                 data: {
                     IFS: 'D000040',
                     USE_CD: row.USE_CD,
                     PW: resetPass,
                 },
                 successCallBack:function(){
                    $.messager.alert('提示','新密码为123456');
                    initGridData();
                 }
            };
            iplantAjaxRequest(ajaxParam);
        }
        saveUserMes = function () {
            /*if (!checkDataValid()){
            	$.messager.alert('提示','请输入必选添加信息');
            	return
            };*/
            if(!checkForm()) return;
		    var userMesId =$('#txtUserMesCode').textbox('getValue');
		    var userMesNum =$('#txtUserMesNum').combobox('getValue');
		    var userMesGroup =$('#txtUserMesGroup').combobox('getValue');
		    var userMesNote =$('#txtNote').textbox('getValue');
		    var userMesSta =$('#txtUserMesSta').combobox('getValue');
		   
            var IFServerNo = '';
            var isUsed='';
            var userMesPas='';
            var optType=getOptType();
            if(optType=='0'){
                var password =/^[0-9a-zA-Z_#]{4,10}$/;
                if(!password.test(userMesId) ){
                    $.messager.alert('提示','用户名由6至10位数字或字母组成');
                    return
                }
                if( !password.test($('#txtUserMesPas').textbox('getValue'))){
                    $.messager.alert('提示','密码由6至16位数字或字母组成');
                    return
                } 
            }
            if($("#txtUserMesUse").is(':checked')){
                isUsed='Y';
            }
            else{
                isUsed='N';
            }
            if(userMesSta == '0' && isUsed == 'Y'){
 			   $.messager.alert('提示','离职人员无法启用，请确认');
 			   return;
 		   }
            var reqData={
                  	USE_CD: userMesId,
					EMP_NO: userMesNum,
					GR_CD: userMesGroup,
					USE_ST: userMesSta,
					USE_RM: userMesNote,
                  	USE_YN:  isUsed      //是否启用	 
            }
             //新增
             if (optType == 0) {
                 IFServerNo = 'D000038',
                 userMesPas =$('#txtUserMesPas').textbox('getValue');
                 $.extend(reqData, { CRT_ID: '',CRT_IP: '',PW: userMesPas,IFS:IFServerNo}); 
             }
             //修改
             else if (optType == 1) {
            	 if (!saveUpdateValidate()) {
 					$.messager.alert("提示", '内容没有更新，请修改',"",function(){
 					})
 					return;
 				}
                 IFServerNo = 'D000040',
                 reqData =$.extend(reqData, { CRT_ID: '',CRT_IP: '',PW: userMesPas,IFS:IFServerNo});
             }
             var susMsg='',errorMsg='';
             if(optType==0){
            	 susMsg='添加成功';
            	 errorMsg='添加失败,请联系管理员';
             }
             else{
            	 susMsg='更新成功';
            	 errorMsg='更新失败,请联系管理员';
             }
             var ajaxParam = {
                 url: '/iPlant_ajax',
                 dataType: 'JSON',
                 data: reqData,
                 successCallBack:function(data){               	 
                    if(data.RESPONSE["0"].RESPONSE_HDR.MSG_CODE=='0'){
                        if($.messager.alert('提示', susMsg)){
                            $('#enditTab').dialog('close');
//                            setDataNull();
                            initGridData();     
                        }
                    }else{
                        $.messager.alert('提示', errorMsg);
                        $("#enditTab").dialog("close");
                    }
                 },
                 errorCallBack:function(data){
                	 $.messager.alert('提示', errorMsg);
                 },
             };
             console.log(ajaxParam.data.PW);
             iplantAjaxRequest(ajaxParam);
        },	
        bindCombogridGR =function () {
            var ajaxParam={
                url:'/iPlant_ajax',
                data:{
                    IFS:'D000025',
                	USE_YN:'Y'
                },
                successCallBack:function(data){
                    var rowNum=0
                    if(data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS){
                       rowNum=parseInt(data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS);
                    }
                    var rowCollection=createSourceObj(data);
                    var jsonData={
                          total:rowNum,
                          rows:rowCollection
                    }
                    $('#txtUserMesGroup').combobox({
                        data:rowCollection,
                        valueField:'GR_CD',
                        textField:'GR_NM',
                        panelWidth:200,
                       /* columns:[[
                           { field: 'GR_CD', title: '用户组ID' , width: 100 ,align:'center'},
                           { field: 'GR_NM', title: '用户组名', width: 100 ,align:'center'},
                        ]],*/
                    });
                    /*$('#txtUserMesGroup').combogrid("grid").datagrid("loadData", jsonData);*/
//                 if(optType == 1){
//                 		$('#txtUserMesGroup').combobox('setText',userGrounp);
//                   		updateUserMes();
//                 }
                }
            }
            iplantAjaxRequest(ajaxParam);
        }
        bindCombogridEMP =function () {
            var ajaxParam2={
                url:'/iPlant_ajax',
                data:{
                    IFS:'B000084',
                },
                    successCallBack:function(data){
                        var rowNum=0
                        if(data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS){
                           rowNum=parseInt(data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS);
                        }
                        var rowCollection=createSourceObj(data); 
                        $('#txtUserMesNum').combobox({
                            data:rowCollection,
                            valueField:'EMP_CD',
                            textField:'EMP_NM',
                            panelWidth:200,
                        });
                       /* $('#txtUserMesNum').combogrid("grid").datagrid("loadData", jsonData);*/
                        if(OptType == 1){
                        	updateUserMes();
                        }
                        
                    }
            }
            iplantAjaxRequest(ajaxParam2);
        },
        /* 验证是否重复 */
		existCompany = function(companyCode) {
			var rowNum, tpm = $('#txtUserMesCode');
			if (OptType == 0) {
				if(/[　，。、！？：“”［］——（）…！＠＃￥＆＊＋＞＜；：‘\u4e00-\u9fa5\s\n\r\t]+/.test($('#txtUserMesCode').textbox('getText'))){
		        	$.messager.alert('提示', "用户编码不能是中文和非法字符，请重新输入。","",function(){
						$('#txtUserMesCode').textbox('setValue', '');
					});
		        	return;
		        }
				if (tpm.val() != undefined && tpm.val() != ''
						&& tpm.val() != null) {
					if (companyCode != undefined && companyCode != ''
							&& companyCode != null) {
						if (tpm.textbox('getValue') != undefined
								&& tpm.textbox('getValue') != ''
								&& tpm.textbox('getValue') != null) {
							var ajaxParam = {
								url : '/iPlant_ajax',
								dataType : 'JSON',
								data : {
									IFS : 'D000037',
									USE_CD : companyCode,
									pageIndex : 1,
									pageSize : 10
								},
								successCallBack : function(data) {
									rowNum = parseInt(data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS);
									if (rowNum > 0) {
										$.messager
												.alert(
														'提示',
														'您输入的用户编码['
																+ companyCode
																+ ']已有相同,请重新输入!');
										tpm.textbox('setValue', '');
										return false;
									} else {
										return true;
									}
								}
							};
							iplantAjaxRequest(ajaxParam);
						}
					}
				}
			}
        },
        saveUpdateValidate = function() {
			var checkedItems = $('#'+pageConfig.gridName).datagrid('getSelections');
			row = checkedItems[0];
			if(row.EMP_NO==null){
				row.EMP_NO="";
			}
			if(row.GR_CD==null){
				row.GR_CD="";
			}
			if(row.USE_ST==null){
				row.USE_ST="";
			}
			if(row.USE_YN==null){
				row.USE_YN="";
			}
			if(row.USE_RM==null){
				row.USE_RM="";
			}
			if (row.USE_CD) {
				var isUserYn = 'N';
				if($("#txtUserMesUse").is(':checked')){
					isUserYn = "Y";
				} else {
					isUserYn = "N";
				}
				if ($('#txtUserMesNum').combobox('getValue') != row.EMP_NO//员工号
						|| $('#txtUserMesGroup').textbox('getValue') != row.GR_CD//所属用户组
						|| $('#txtUserMesSta').textbox('getValue') != row.USE_ST//用户状态
						|| isUserYn != row.USE_YN//是否启用
						|| $('#txtNote').textbox('getValue') != row.USE_RM //备注
				) {
					return true;
				} else {
					return false;
				}
			}
		}
    }
    UserMes.prototype = {
        init: function () {
            $(function () {
            	$("body")[0].onkeydown = keyPress;
                $("body")[0].onkeyup = keyRelease;
                //添加鼠标移开事件
                $("input",$("#txtUserMesCode").next("span")).blur(function(){
        		    var txtUserMesCode = $('#txtUserMesCode').val();
        			existCompany(txtUserMesCode);
        	    });
            	var userGrounp;
            	var ajaxParam2={
                        url:'/iPlant_ajax',
                        data:{
                            IFS:'D000025',
                        },
                            successCallBack:function(data){
                                var rowCollection=createSourceObj(data); 
                                var arr = [];
                                arr.push({"id":"", "text":"全部"});
                                for(var i=0; i< rowCollection.length; i++){
                                	arr.push({"id":rowCollection[i].GR_CD, "text":rowCollection[i].GR_NM});
                                }
                                $('#queryUserMesGroup').combobox({
                                    data:arr,
                                    valueField:'id',
                                    textField:'text',
                                    panelWidth:150
                                });
                               /* $('#txtUserMesNum').combogrid("grid").datagrid("loadData", jsonData);*/
                                if(OptType == 1){
                                	updateUserMes();
                                }
                                
                            }
                    }
                    iplantAjaxRequest(ajaxParam2);
                initGridData();
                $('#txtUserMesCode').textbox('textbox').attr('maxlength', 16);
                $('#txtUserMesPas').textbox('textbox').attr('maxlength', 16);
                $("#txtNote").textbox('textbox').bind("keyup", function () {
                    checkInputLength('txtNote',50);
                })
                $('#btnAdd').click(function () {
                    $('#' + pageConfig.gridName).datagrid('clearSelections');
                    addUserMes();
                    bindCombogridGR();
                });
                $('#btnUpdate').click(function () {
                    var isSelectedData = validSelectedData(pageConfig.gridName, 'Update');
                    if (!isSelectedData) {
                         $.messager.alert('提示', '请选择一条数据进行修改');
                         return;
                    }
                    setOptType(1);
                    bindCombogridGR();
                    bindCombogridEMP();
                });
//                $('#txtUserMesSta').combobox({change:function(){
//                	if(userMesSta == 0 || ){
//                		$.massage.alert('提示'，'该员工离职无法启用')；
//                		return;
//                	}
//                	}
//                })
                $('#saveID').click(function () {
                    saveUserMes();
                });
                $('.close').click(function () {
                    setDataNull();
                    $('#enditTab').dialog('close');
                    $('#queryTab').dialog('close');
                    initGridData();
                });
                $('#btnDelete').click(function(){
                	deleteUserMes();
                });
                $('#btnSearch').click(function(){
                	getDataByCondition();
                })
                $('#btnFreshen').click(function() {
                	getDataByCondition();
				});
                $('#confirm').click(function(){
					getDataByCondition();	
				})
                $('#btnReset').click(function(){
                    resetPassword();
                });
              //限制输入英文单引号
				$("input",$("#txtUserMesCode").next("span")).keydown(function(e){
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
				$("input",$("#txtUserMesPas").next("span")).keydown(function(e){
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
              //判断输入文字的长度
				$("input", $("#txtUserMesCode").next("span")).keyup(function() {
					checkInputLength('txtUserMesCode', 20);
				})

				$("input", $("#txtUserMesPas").next("span")).keyup(function() {
					checkInputLength('txtUserMesPas', 100);
				})
				
				$("#txtNote").textbox('textbox').bind("keyup", function() {
					checkInputLength('txtNote', 200);
				})
            });
        }
    }
    var FUser = new UserMes();
    FUser.init();
})();
