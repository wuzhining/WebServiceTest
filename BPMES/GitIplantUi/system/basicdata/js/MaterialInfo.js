(function () {
    function materialInfo() {
    	var CompanyOpttype;
    	InitGrid=function(){
    		var reqData={
    			IFS:'B000009'
    		}
    		reqGridData('/iPlant_ajax','custom_tab',reqData);
    	},
 	    CompanyOpttype=0,
    	bindGridData = function (reqData,jsonData) {
    		var grid={
    				name:'custom_tab',
    				//toolbar : "#tb",
    				dataType: 'json', 
    				columns: [[
//                       {field : "CZ",width : 10,checkbox : true},
			           { field: 'PT_CD', title: '物料编码', width: 200 ,align:'center',hidden:'true'},
		               { field: 'DICT_IT', title: '物料类别', width: 200,align:'center',hidden:true},
		               { field: 'DICT_IT_NM', title: '物料类别', width: 200,align:'center'},
		               { field: 'PT_NM', title: '物料名称', width: 200,align:'center'},
		               { field: 'PT_SD', title: '物料规格', width: 200,align:'center'},
		               { field: 'PT_CL', title: '颜色', width: 100,align:'center'},
		               { field: 'PT_ST', title: '毛重', width: 100,align:'center'},
		               { field: 'PT_RW', title: '净重', width: 100,align:'center'},
		               { field: 'PT_DP', title: '次品率', width: 100,align:'center'},
                       { field: 'PT_RM', title: '备注', width: 200,align:'center'},
		               { field: 'CRT_ID', title: '创建人', width: 100,align:'center'},
		               { field: 'CRT_DT', title: '创建时间', width: 200,align:'center'},
                       { field: 'UPT_ID', title: '修改人', width: 100,align:'center'},
                       { field: 'UPT_DT', title: '修改时间', width: 200,align:'center'}
		               ]],
		               onDblClickRow: function(index,row){	
		            	   CompanyOpttype=1;
					    	 $("#enditTab").dialog("open").dialog('setTitle', '查看物料信息');
					    	 checkFun();
					    	 $('#txtWLBH').textbox('setValue',row.PT_CD==null?'':row.PT_CD);
				    			$('#txtWLLB').combobox('setValue', row.DICT_IT==null?'':row.DICT_IT);
				                $('#txtWLLB').combobox('setText', row.DICT_IT_NM==null?'':row.DICT_IT_NM);
				    			$('#txtWLMC').textbox('setValue',row.PT_NM==null?'':row.PT_NM);
				    			$('#txtWLGG').textbox('setValue',row.PT_SD==null?'':row.PT_SD);
				    			$('#txtYS').textbox('setValue',row.PT_CL==null?'':row.PT_CL);
				    			$('#txtMZ').textbox('setValue',row.PT_ST==null?'':row.PT_ST);
				    			$('#txtJZ').textbox('setValue',row.PT_RW==null?'':row.PT_RW);
				    			$('#txtCPL').textbox('setValue',row.PT_DP==null?'':row.PT_DP);
				    			$('#txtBZ').textbox('setValue',row.PT_RM==null?'':row.PT_RM);
					     }
    		}
    		initGridView(reqData,grid);
    		$('#custom_tab').datagrid('loadData',jsonData);
    	}, 
    	checkFun = function (){
    		var qx = getUpdateRight();
			if(qx=="Y"){
				$('#txtWLBH').textbox('textbox').attr('disabled', true);
		    	 $('#txtWLMC').textbox('textbox').attr('disabled', false);
		    	 $('#txtWLGG').textbox('textbox').attr('disabled', false);
		    	 $('#txtYS').textbox('textbox').attr('disabled', false);
		    	 $('#txtMZ').textbox('textbox').attr('disabled', false);
		    	 $('#txtJZ').textbox('textbox').attr('disabled', false);
		    	 $('#txtCPL').textbox('textbox').attr('disabled', false);
		    	 $('#txtBZ').textbox('textbox').attr('disabled', false);
		    	 $('#txtWLLB').combobox('textbox').attr('disabled', false);
		    	 $('#txtWLLB').combobox('textbox').attr('disabled', false);
		    	 $('#saveID').show();
		    	 $('#cancleID').show();
			}else{
				CompanyOpttype=2;
				$('#txtWLBH').textbox('textbox').attr('disabled', true);
		    	 $('#txtWLMC').textbox('textbox').attr('disabled', true);
		    	 $('#txtWLGG').textbox('textbox').attr('disabled', true);
		    	 $('#txtYS').textbox('textbox').attr('disabled', true);
		    	 $('#txtMZ').textbox('textbox').attr('disabled', true);
		    	 $('#txtJZ').textbox('textbox').attr('disabled', true);
		    	 $('#txtCPL').textbox('textbox').attr('disabled', true);
		    	 $('#txtBZ').textbox('textbox').attr('disabled', true);
		    	 $('#txtWLLB').combobox('textbox').attr('disabled', true);
		    	 $('#txtWLLB').combobox('textbox').attr('disabled', true);
		    	 $('#saveID').hide();
//		    	 $('#cancleID').hide();
			}
			 
		}
    	/* 验证是否重复 */
    	existMaterial = function(materialCode) {
			var rowNum, tpm = $('#txtWLBH');
			if (CompanyOpttype == 0) {
				if(/[　，。、！？：“”［］——（）…！＠＃￥＆＊＋＞＜；：‘\u4e00-\u9fa5\s\n\r\t]+/.test($('#txtWLBH').textbox('getText'))){
		        	$.messager.alert('提示', "物料编码不能是中文和非法字符，请重新输入。","",function(){
						$('#txtWLBH').textbox('setValue', '');
						
					});
		        	return;
		        }
				if (tpm.val() != undefined && tpm.val() != ''
						&& tpm.val() != null) {
					if (materialCode != undefined && materialCode != ''
							&& materialCode != null) {
						if (tpm.textbox('getValue') != undefined
								&& tpm.textbox('getValue') != ''
								&& tpm.textbox('getValue') != null) {
							var ajaxParam = {
								url : '/iPlant_ajax',
								dataType : 'JSON',
								data : {
									IFS : 'B000009',
									PT_CD : materialCode,
									pageIndex : 1,
									pageSize : 10
								},
								successCallBack : function(data) {
									rowNum = parseInt(data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS);
									if (rowNum > 0) {
										$.messager
												.alert(
														'提示',
														'您输入的物料编码['
																+ materialCode
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
        /*数据有效性验证*/
        updateCustom = function (){
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
    			$("#enditTab").dialog("open").dialog('setTitle', '物料信息');
    			$('#txtWLBH').textbox('textbox').attr('readonly', true);
				$('#txtWLBH').textbox('textbox').attr('disabled', true);
    			$('#txtWLBH').textbox('setValue',row.PT_CD==null?'':row.PT_CD);
    			$('#txtWLLB').combobox('setValue', row.DICT_IT==null?'':row.DICT_IT);
                $('#txtWLLB').combobox('setText', row.DICT_IT_NM==null?'':row.DICT_IT_NM);
    			$('#txtWLMC').textbox('setValue',row.PT_NM==null?'':row.PT_NM);
    			$('#txtWLGG').textbox('setValue',row.PT_SD==null?'':row.PT_SD);
    			$('#txtYS').textbox('setValue',row.PT_CL==null?'':row.PT_CL);
    			$('#txtMZ').textbox('setValue',row.PT_ST==null?'':row.PT_ST);
    			$('#txtJZ').textbox('setValue',row.PT_RW==null?'':row.PT_RW);
    			$('#txtCPL').textbox('setValue',row.PT_DP==null?'':row.PT_DP);
    			$('#txtBZ').textbox('setValue',row.PT_RM==null?'':row.PT_RM);
    			CompanyOpttype=1;
    		}
    		checkFun();
    	},
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
        deleteMateria = function () {
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
                                     IFS: 'B000088',
                                     PT_CD: item.PT_CD,
                                 },
                                 successCallBack:function(data){
                                     if(data.RESPONSE['0'].RESPONSE_DATA[0].STATUS=='1'){
                                        $.messager.alert('提示','编号为'+item.PT_CD+'的物料正在生产，不能删除！');
                                        return
                                     }else{
                                        var ajaxParam = {
                                         url: '/iPlant_ajax',
                                         dataType: 'JSON',
                                         data: {
                                             IFS: 'B000011',
                                             PT_CD: item.PT_CD,
                                         },
                                         successCallBack:function(){
                                             if(delCnt==checkedItems.length){
                                                InitGrid();
                                             }
                                         }
                                  };
                                 iplantAjaxRequest(ajaxParam);
                                     }
                                 }
                          };
                         iplantAjaxRequest(ajaxParam);
                     });
                 }
             });      
        },
    	addCustom=function() {
        	CompanyOpttype=0;
    		checkFun();
        	$('#txtWLBH').textbox('textbox').attr('readonly',false);
			$('#txtWLBH').textbox('textbox').attr('disabled',false);
    		$("#enditTab").dialog("open").dialog('setTitle', '物料信息维护');
    		$("#fmCustom").form("clear");
    	},
    	saveUpdateValidate = function() {
			var checkedItems = $('#custom_tab').datagrid('getSelections');
			row = checkedItems[0];
			if (row.PT_CD) {
				if ($('#txtWLBH').textbox('getValue') != (row.PT_CD==null?'':row.PT_CD)
						|| $('#txtWLLB').combobox('getValue') != (row.DICT_IT==null?'':row.DICT_IT)
						|| $('#txtWLMC').textbox('getValue') != (row.PT_NM==null?'':row.PT_NM)
						|| $('#txtWLGG').textbox('getValue') != (row.PT_SD==null?'':row.PT_SD)
						|| $('#txtYS').textbox('getValue') != (row.PT_CL==null?'':row.PT_CL)
						|| $('#txtMZ').textbox('getValue') != (row.PT_ST==null?'':row.PT_ST)
						|| $('#txtJZ').textbox('getValue') != (row.PT_RW==null?'':row.PT_RW)
						|| $('#txtCPL').textbox('getValue') != (row.PT_DP==null?'':row.PT_DP)
						|| $('#txtBZ').textbox('getValue') != (row.PT_RM==null?'':row.PT_RM) ){
					return true;
				} else {
					return false;
				}
			}
		}
    	savaCustom=function (){ 
    		if(!checkForm()) return;
    		var IFServerNo='';
    		var reqData=[];
    		if(CompanyOpttype==0){ 
    			IFServerNo='B000010'   
    		}
    		else if(CompanyOpttype==1){
    			if (!saveUpdateValidate()) {
					$.messager.alert("提示", '内容没有更新，请修改')
					return false;
				}
    			IFServerNo='B000012'
    		}
//	   else{
//		   IFServerNo='B000051'
//	   }
	   
    		var ajaxParam={
    				url:'/iPlant_ajax',
    				dataType:'JSON',
    				data:{
    					PT_CD:$('#txtWLBH').val(),
    					DICT_IT:$('#txtWLLB').combobox('getValue'),
    					DICT_IT_NM:$('#txtWLLB').combobox('getText'),
    					PT_NM:$('#txtWLMC').val(),
    					PT_SD:$('#txtWLGG').val(),
    					PT_CL:$('#txtYS').val(),
    					PT_ST:$('#txtMZ').val(),
    					PT_RW:$('#txtJZ').val(),
    					PT_DP:$('#txtCPL').val(),
    					PT_RM:$('#txtBZ').val(),
    					IFS:IFServerNo
    				}
    		};
    		iplantAjaxRequest(ajaxParam);
    		$.messager.alert("提示","保存成功！","",function(){
    			reqGridData('/iPlant_ajax','custom_tab',{IFS:'B000009'});
    		});
    		$("#enditTab").dialog("close");

    	},
    	serchconfirm =function (){
    		var bh = $("#txtWLBHCX").val();
    		var mc = $("#txtWLMCCX").val();
    		var lb = $("#ccWLLB").combobox('getValue');
    		var reqData ={
    				PT_CD:bh,
    				PT_NM:mc,
    				DICT_IT:lb,
    				IFS:"B000009"
    		};
    		reqGridData('/iPlant_ajax','custom_tab',reqData)
//    		if(bh=='' && mc==''){
//    			$.messager.alert('提示','请输入选择条件');
//    		}else{
//    			reqGridData('/iPlant_ajax','custom_tab',reqData)
//    			$('#queryTab').dialog('close');	
//    		}
    	},
    	serchCustom = function () {
    		$("#queryTab").dialog("open").dialog('setTitle', '物料查询');
    		$("#querywlMes").form("clear");
    	},
    		//查询物料类别表
    	initComboboxData=function(){
    		iplantAjaxRequest( {
    			url: '/iPlant_ajax',
    			data: {IFS:'D000008',DICT_CD:"CPT01",USE_YN:'Y'},
    			successCallBack: function (data) {
    				var array = new Array();
    				var ccArr = [];
    				array.push({"id":"","text":"全部"});
    				for(var i=0; i<data.RESPONSE[0].RESPONSE_DATA.length;i++){
    					array.push({"id":data.RESPONSE[0].RESPONSE_DATA[i].DICT_IT,"text":data.RESPONSE[0].RESPONSE_DATA[i].DICT_IT_NM});
    					ccArr.push({"id":data.RESPONSE[0].RESPONSE_DATA[i].DICT_IT,"text":data.RESPONSE[0].RESPONSE_DATA[i].DICT_IT_NM});
    				}
        	
    				$('#txtWLLB').combobox({
    					data:ccArr,
    					valueField:'id',
    					textField:'text'
    				});
    				$('#ccWLLB').combobox({
    					data:array,
    					valueField:'id',
    					textField:'text'
    				});
    			}
    		});
    	}
      
    }
    materialInfo.prototype = {
    		init: function () {
    			$(function () {
    				$("body")[0].onkeydown = keyPress;
                    $("body")[0].onkeyup = keyRelease;
    				InitGrid();
    				initComboboxData();
                    $('#btnDelete').click(function(){
                        deleteMateria();
                    });
                    $('#btnUpdate').click(function(){
                    	updateCustom();
                    })
                    //判断输入文字的长度
											$("input", $("#txtWLBH").next("span")).keyup(function() {
												checkInputLength('txtWLBH', 30);
											})

											$("input", $("#txtWLMC").next("span")).keyup(function() {
												checkInputLength('txtWLMC', 200);
											})
								
											$("input", $("#txtWLGG").next("span")).keyup(
													function() {
														checkInputLength('txtWLGG', 200);
													})		
											
											$("input", $("#txtYS").next("span")).keyup(
													function() {
														checkInputLength('txtYS', 50);
													})		
												
											$("input", $("#txtMZ").next("span")).keyup(
													function() {
														checkInputLength('txtMZ', 20);
													})
													
											$("input", $("#txtJZ").next("span")).keyup(
													function() {
														checkInputLength('txtJZ', 20);
													})	
													
											$("input", $("#txtCPL").next("span")).keyup(
													function() {
														checkInputLength('txtCPL', 20);
													})
											//限制输入英文单引号
											$("input",$("#txtWLBH").next("span")).keydown(function(e){
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
											$("input",$("#txtWLMC").next("span")).keydown(function(e){
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
											$("input",$("#txtWLGG").next("span")).keydown(function(e){
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
											$("input",$("#txtYS").next("span")).keydown(function(e){
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
											$("input",$("#txtMZ").next("span")).keydown(function(e){
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
											$("input",$("#txtJZ").next("span")).keydown(function(e){
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
											$("input",$("#txtCPL").next("span")).keydown(function(e){
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
    var pCode = new materialInfo();
    pCode.init();
})();
