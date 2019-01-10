(function () {
    function cardDetail() {
        pageConfig={
            gridName: 'spare_tab'
        },
        initGridData=function(){
            var dgrid=$('#'+pageConfig.gridName).datagrid('options');
            if(!dgrid) return;
            var reqData = {
                    IFS: 'H000089',
                    pageIndex:1,
                    pageSize:dgrid.pageSize
            }
         reqGridData('/iPlant_ajax',pageConfig.gridName, reqData);
        },
        bindGridData = function (reqData,jsonData) {
            var grid = {
                name: pageConfig.gridName,
                dataType: 'json',
                columns: [[
//                	{field: 'CK',checkbox:'true'},
                    { field: 'SP_CD', title: '备件编码', width: 200, align: 'center' ,hidden:'true'},
                    { field: 'SP_NM', title: '备件名称', width: 200, align: 'center' },
                    { field: 'DICT_IT_NM', title: '备件类型', width: 200, align: 'center' },
                    { field: 'SP_LD', title: '备件退还期限(时)', width: 200, align: 'center' ,
						formatter : function(value, row, index) {
							return parseInt(parseInt(value)/24)+"天"+parseInt(value)%24+"小时";
						}
                    },
                    { field: 'SP_US', title: '备件用途', width: 200, align: 'center' }, 
                    { field: 'CRT_ID', title: '创建人', width: 100,align:'center'},
				    { field: 'CRT_DT', title: '创建时间', width: 180,align:'center'},
				    { field: 'UPT_ID', title: '修改人', width: 100,align:'center'},
				    { field: 'UPT_DT', title: '修改时间', width: 180,align:'center'}
                ]],
                onDblClickRow: function(index,row){	
                	CompanyOpttype=1;
    		    	 $("#queryTab").dialog("open").dialog('setTitle', '查看备件信息维护');
    		    	 checkFun();
    		    	 $('#spareCDX').textbox('setValue',row.SP_CD==null?'':row.SP_CD);
    			        $('#spareNMX').textbox('setValue',row.SP_NM==null?'':row.SP_NM);
    			        $('#spareLX').combobox('setText',row.DICT_IT_NM==null?'':row.DICT_IT_NM);
    			        
    			        $('#spareTH').textbox('setValue',row.SP_LD==null?'':parseInt(parseInt(row.SP_LD)/24));
    			        $('#spareXS').textbox('setValue',row.SP_LD==null?'':parseInt(row.SP_LD)%24);
    			        
    			        $('#spareYT').textbox('setValue',row.SP_US==null?'':row.SP_US);
    		     }
            }
            initGridView(reqData,grid);
            $('#'+pageConfig.gridName).datagrid('loadData', jsonData);
        },
        checkFun = function (){
        	var qx = getUpdateRight();
			if(qx=="Y"){
				$('#spareCDX').textbox('textbox').attr('disabled', true);
		    	 $('#spareNMX').textbox('textbox').attr('disabled', false);
		    	 $('#spareTH').textbox('textbox').attr('disabled', false);
		    	 $('#spareXS').textbox('textbox').attr('disabled', false);
		    	 $('#spareYT').textbox('textbox').attr('disabled', false);
		    	 $('#spareLX').combobox('textbox').attr('disabled', false);
		    	 $('#saveID').show();
		    	 $('#cancleID').show();
			}else{
				CompanyOpttype=2;
				$('#spareCDX').textbox('textbox').attr('disabled', true);
		    	 $('#spareNMX').textbox('textbox').attr('disabled', true);
		    	 $('#spareTH').textbox('textbox').attr('disabled', true);
		    	 $('#spareXS').textbox('textbox').attr('disabled', true);
		    	 $('#spareYT').textbox('textbox').attr('disabled', true);
		    	 $('#spareLX').combobox('textbox').attr('disabled', true);
		    	 $('#saveID').hide();
		    	 $('#cancleID').hide();
			}
			 
      }
        /* 验证是否重复 */
        existSpare = function(spareCode) {
			var rowNum, tpm = $('#spareCDX');
			if (CompanyOpttype == 0) {
				if(/[　，。、！？：“”［］——（）…！＠＃￥＆＊＋＞＜；：‘\u4e00-\u9fa5\s\n\r\t]+/.test($('#spareCDX').textbox('getText'))){
		        	$.messager.alert('提示', "备件编码不能是中文和非法字符，请重新输入。","",function(){
						$('#spareCDX').textbox('setValue', '');
						
					});
		        	return;
		        }
				if (tpm.val() != undefined && tpm.val() != ''
						&& tpm.val() != null) {
					if (spareCode != undefined && spareCode != ''
							&& spareCode != null) {
						if (tpm.textbox('getValue') != undefined
								&& tpm.textbox('getValue') != ''
								&& tpm.textbox('getValue') != null) {
							var ajaxParam = {
								url : '/iPlant_ajax',
								dataType : 'JSON',
								data : {
									IFS : 'H000089',
									SP_CD : spareCode,
									pageIndex : 1,
									pageSize : 10
								},
								successCallBack : function(data) {
									rowNum = parseInt(data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS);
									if (rowNum > 0) {
										$.messager
												.alert(
														'提示',
														'您输入的备件编码['
																+ spareCode
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
        //查询
        getDataByCondition =function(){
        	var spareCD = $('#spareCD').val();
        	var spareNM = $('#spareNM').val();
            var reqData ={
            	SP_CD:spareCD,
            	SP_NM:spareNM,
                IFS:'H000089'
            };
            reqGridData('/iPlant_ajax',pageConfig.gridName,reqData);
        }
        //修改
        var spareXl;
        updateCompany=function() {
		    var checkedItems = $('#'+pageConfig.gridName).datagrid('getSelections');
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
		    var row = $('#'+pageConfig.gridName).datagrid("getSelected");
		   
		    if (row) {
		        $("#queryTab").dialog("open").dialog('setTitle', '备件信息维护');
		        $('#spareCDX').textbox('textbox').attr('readonly', true);
				$('#spareCDX').textbox('textbox').attr('disabled', true);
		        $('#spareCDX').textbox('setValue',row.SP_CD==null?'':row.SP_CD);
		        $('#spareNMX').textbox('setValue',row.SP_NM==null?'':row.SP_NM);
		        $('#spareLX').combobox('setText',row.DICT_IT_NM==null?'':row.DICT_IT_NM);
		        
		        $('#spareTH').textbox('setValue',row.SP_LD==null?'':parseInt(parseInt(row.SP_LD)/24));
		        $('#spareXS').textbox('setValue',row.SP_LD==null?'':parseInt(row.SP_LD)%24);
		        
		        $('#spareYT').textbox('setValue',row.SP_US==null?'':row.SP_US);
		        CompanyOpttype=1;
		        checkFun();
		    	 spareXl =  row.DICT_IT_NM;
		    }
    
		}
        saveUpdateValidate = function() {
			var checkedItems = $('#spare_tab').datagrid('getSelections');
			row = checkedItems[0];
			if (row.SP_CD) {
				if ($('#spareCDX').textbox('getValue') != row.SP_CD
						|| $('#spareNMX').textbox('getValue') != row.SP_NM
						|| $('#spareLX').combobox('getText') != row.DICT_IT_NM
						|| $('#spareTH').textbox('getValue') != parseInt(parseInt(row.SP_LD)/24)
						|| $('#spareXS').textbox('getValue') != parseInt(row.SP_LD)%24
						|| $('#spareYT').textbox('getValue') != row.SP_US) {
					return true;
				} else {
					return false;
				}
			}
		}
        //添加
        addSpare=function() {
        	CompanyOpttype=0;
		    checkFun();
        	$('#spareCDX').textbox('textbox').attr('readonly', false);
			$('#spareCDX').textbox('textbox').attr('disabled', false);
		    $("#queryTab").dialog("open").dialog('setTitle', '添加备件信息');
		    $("#fmquery").form("clear");
		    
		}
        //删除
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
		deleteSpare = function () {
             var isSelectedData = validSelectedData('#spare_tab', 'Delete');
             if (!isSelectedData) {
                 $.messager.alert('提示', '请选择一条数据进行删除');
                 return;
             }
             var checkedItems = $('#'+pageConfig.gridName).datagrid('getSelections');
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
                                     IFS: 'H000087',
                                     SP_CD: item.SP_CD,
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
        //保存
        saveSpare=function(){ 
        	if(!checkForm()) return;
			   var IFServerNo='';
			   var reqData=[];
			   if(CompanyOpttype==0){ 
				   IFServerNo='H000086'
				   $.extend(reqData, { CP_ID: '',CP_IP: '',IFS:IFServerNo}); 
			   }
			   else if(CompanyOpttype==1){
				   if (!saveUpdateValidate()) {
						$.messager.alert("提示", '内容没有更新，请修改')
						return false;
					}
				   IFServerNo='H000088'
				   $.extend(reqData, { CP_ID: '',CP_IP: '',IFS:IFServerNo}); 
			   }
			   else{
				   IFServerNo='H000087'
			   }
		        var susMsg='',errorMsg='';
		             if(CompanyOpttype==0){
		            	 susMsg='添加成功';
		            	 errorMsg='添加失败,请联系管理员';
		             }
		             else{
		            	 susMsg='修改成功';
		            	 errorMsg='更新失败,请联系管理员';
		             }
		       var strTemp = parseInt($('#spareTH').val())*24+parseInt($('#spareXS').val());
			   var ajaxParam={
			      url:'/iPlant_ajax',
			      dataType:'JSON',
		  	      data:{
		              SP_CD:$('#spareCDX').val(),
		              SP_NM:$('#spareNMX').val(),
		              DICT_IT:$('#spareLX').combobox('getValue'),
		              SP_LD:strTemp,
		              SP_US:$('#spareYT').val(),
		          	  IFS:IFServerNo
		         },
		         successCallBack:function(data){
                	 if($.messager.alert('提示', susMsg)){
//                  	 setDataNull();
                    	 initGridData();	 
                	 }
                 },
                 errorCallBack:function(){
                	 $.messager.alert('提示', errorMsg);
                 }
		    };
			iplantAjaxRequest(ajaxParam);
			$('#queryTab').dialog('close'); 
		}
        initComboboxData=function(){
        	iplantAjaxRequest( {
    			url: '/iPlant_ajax',
    			data: {IFS:'D000008',DICT_CD:"RSP01",USE_YN:'Y'},
    			successCallBack: function (data) {
    				var array = new Array();
    				var rowCollection=createSourceObj(data);
    				for(var i=0; i<rowCollection.length;i++){
    					array.push({"id":rowCollection[i].DICT_IT,"text":rowCollection[i].DICT_IT_NM});
    				}
    				$('#spareLX').combobox({
    					data:array,
    					valueField:'id',
    					textField:'text'
    				});
    				$('#spareLX').combobox('setText',spareXl);
    			}
    		});
        }
    }
    cardDetail.prototype = {
        init: function () {
            $(function () {
            	$("body")[0].onkeydown = keyPress;
                $("body")[0].onkeyup = keyRelease;
                var CompanyOpttype; // 0：新增 1:编辑
                initGridData();
                
				$('#btnAdd').click(function(){
					initComboboxData();
					addSpare();
				})
				$('#btnUpdate').click(function(){
					updateCompany();
					initComboboxData();
				})
				$('#btnDelete').click(function(){
					deleteSpare();
				})
                $('#btnSearch').click(function(){
                	getDataByCondition();
                })
                $('#btnFreshen').click(function(){
                	getDataByCondition();
                })

                $('#save').click(function(){
                	saveSpare();
                })

                $('#close').click(function(){
                    $('#queryTab').dialog('close');
                })
                $('input',$('#spareCDX').next('span')).keyup(function(){
                    checkInputLength('spareCDX',20);
                })
                $('input',$('#spareNMX').next('span')).keyup(function(){
                    checkInputLength('spareNMX',30);
                })
                $('input',$('#spareYT').next('span')).keyup(function(){
                    checkInputLength('spareYT',100);
                })
              //限制输入英文单引号
				$("input",$("#spareCDX").next("span")).keydown(function(e){
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
				$("input",$("#spareNMX").next("span")).keydown(function(e){
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
				$("input",$("#spareYT").next("span")).keydown(function(e){
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
    var card = new cardDetail();
    card.init();
})();