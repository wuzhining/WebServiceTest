/* 启动时加载 */
/*
*/
 
(function () {
    function grounpmanage() {
    	initGridData=function(){
    		var dgrid=$('#alarmgroup_tab').datagrid('options');
    		if(!dgrid) return;
       	    var reqData = {
                    IFS: 'A000001',
                    pageIndex:1,
            		pageSize:dgrid.pageSize
            };
       	 reqGridData('/iPlant_ajax','alarmgroup_tab', reqData);
        }
		bindGridData=function(reqData,jsonData){
			var grid={
					name:'alarmgroup_tab',
					dataType: 'json',
					rownumbers:true,
					columns: [[
//					           {field : "CZ",width : 10,checkbox : true},
					           { field: 'AT_CD', title: '班组编码', width: 100,align:'center'},
				               { field: 'AT_NM', title: '班组名称', width: 150,align:'center'},
				               { field: 'AC_NM', title: '班次名称', width: 100,align:'center'},
				               { field: 'AC_CD', title: '班次代码', width: 100,align:'center'},
				               { field: 'USE_YN', title: '是否启用', width:100,align:'center',
				               	 formatter: function (value, row, index) {
		                                   if (value == 'Y') {
		                                       return '启用';
		                                   }
		                                   else {
		                                       return '未启用';
		                                   }
		                              }	
				              },
				               { field: 'AT_RM', title: '备注', width: 200,align:'center'},
				               { field: 'CRT_ID', title: '创建人', width: 100,align:'center'},
				               { field: 'CRT_DT', title: '创建时间', width: 200,align:'center'},
				               { field: 'UPT_ID', title: '修改人', width: 100,align:'center'},
				               { field: 'UPT_DT', title: '修改时间', width: 200,align:'center'},
				               
				     ]],
				     onDblClickRow: function(index,row){
				    	 $('#searchCondition').dialog('close');	
				    	 CompanyOpttype=1;
				    	 if (row) {
						        $("#enditTab").dialog("open").dialog('setTitle', '编辑报警班组信息');
						        checkFun();
//						        $('#txtGrounpCode').textbox('readonly', true);
						        $('#txtGrounpCode').textbox('setValue',row.AT_CD);
						        $('#txtGrounpName').textbox('setValue',row.AT_NM);
						        $('#cbUsedFlag').combobox('setValue',row.AC_CD);
						        $('#txtNote').textbox('setValue',row.AT_RM);
						        if("Y" == row.USE_YN){
						        	$('#txtGrounpUse').prop('checked','checked');
						        }else{
						        	$('#txtGrounpUse').prop('checked','');
						        }

						 		   var reqData = {
										AT_CD:$('#txtGrounpCode').val(),
						        		IFS:'A000017'
												}
									reqGroundData1('/iPlant_ajax', reqData,'grounps');
						    }
						    initCombogridData();
				     }
			}
			initGridView(reqData,grid);
			$('#alarmgroup_tab').datagrid('loadData',jsonData);
		}
		checkFun = function (){
			var qx = getUpdateRight();
			if(qx=="Y"){
				$('#txtGrounpCode').textbox('textbox').attr('disabled', true);
		    	 $('#txtGrounpName').textbox('textbox').attr('disabled', false);
		    	 $('#cbUsedFlag').combobox('textbox').attr('disabled', false);
		    	 $('#txtNote').textbox('textbox').attr('disabled', false);
		    	 $('#saveID').show();
		    	 $('#cancleID').show();
			}else{
				CompanyOpttype=2;
				$('#txtGrounpCode').textbox('textbox').attr('disabled', true);
		    	 $('#txtGrounpName').textbox('textbox').attr('disabled', true);
		    	 $('#cbUsedFlag').combobox('textbox').attr('disabled', true);
		    	 $('#txtNote').textbox('textbox').attr('disabled', true);
		    	 $('#saveID').hide();
//		    	 $('#cancleID').hide();
			}
			 
		}
		/* 验证是否重复 */
		existGroup = function(groupCode) {
			var rowNum, tpm = $('#txtGrounpCode');
			if (CompanyOpttype == 0) {
				if(/[　，。、！？：“”［］——（）…！＠＃￥＆＊＋＞＜；：‘\u4e00-\u9fa5\s\n\r\t]+/.test($('#txtGrounpCode').textbox('getText'))){
		        	$.messager.alert('提示', "班组编码不能是中文和非法字符，请重新输入。","",function(){
						$('#txtGrounpCode').textbox('setValue', '');
						
					});
		        	return;
		        }
				if (tpm.val() != undefined && tpm.val() != ''
						&& tpm.val() != null) {
					if (groupCode != undefined && groupCode != ''
							&& groupCode != null) {
						if (tpm.textbox('getValue') != undefined
								&& tpm.textbox('getValue') != ''
								&& tpm.textbox('getValue') != null) {
							var ajaxParam = {
								url : '/iPlant_ajax',
								dataType : 'JSON',
								data : {
									IFS : 'A000001',
									AT_CD : groupCode,
									pageIndex : 1,
									pageSize : 10
								},
								successCallBack : function(data) {
									rowNum = parseInt(data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS);
									if (rowNum > 0) {
										$.messager
												.alert(
														'提示',
														'您输入的班组编码['
																+ groupCode
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
        checkDataValid = function () {
              /*数据不能为空验证*/
              var txtGrounpCode =$('#txtGrounpCode').textbox('getValue');
              var txtGrounpName =$('#txtGrounpName').textbox('getValue');
              var cbUsedFlag =$('#cbUsedFlag').combobox('getValue');
              if (cbUsedFlag == ''||txtGrounpCode==''||txtGrounpName=='') {
                  return false;
              }
              return true;
        },
		getDataByCondition = function() {
			$("#searchCondition").dialog("open").dialog('setTitle', '查询部门信息');
			$("#fmSearchCondition").form("clear");
				
			}
		getDataBySearch = function(){
				var dgrid = $('#alarmgroup_tab').datagrid('options');
				if(!dgrid) return;
				var grounpCode = $('#grounpCode').val();
				var grounpName = $('#grounpName').val();
				var bcName = $('#bcName').combobox('getValue');
				var workUse = $('#isUse').combobox('getValue');
				var reqData = {
					AT_CD: grounpCode,
					AT_NM: grounpName,
					AC_NM: bcName,
					USE_YN: workUse,
					IFS: 'A000001',
					pageIndex: 1,
					pageSize: dgrid.pageSize
				}
				reqGridData('/iPlant_ajax', 'alarmgroup_tab',reqData);
		}  
		getDataEmployee = function() {
							var deptName = $('#txtGrounp').val();
							var reqData = {
								EMP_NM: deptName,
								IFS: 'A000050'
							}
							reqGroundData('/iPlant_ajax', reqData);
						};
	    initCombogridData = function() {
							    var reqData = {
									IFS: 'A000050'
								};
							reqGroundData('/iPlant_ajax', reqData);
						},

		bindGroundgrid = function(jsonData) {
							 $('#grounp').datagrid({
							
							        selectOnCheck:'false',
							        dataType: 'json',
							        columns:[
									[{
										field:"ck", 
										checkbox:"true"
									},
									{
										field: 'EMP_CD',
										title: '编码',
										width:  103,
										hidden:'true',
										align: 'center'		
									},
									{
										field: 'EMP_NM',
										title: '姓名',
										width:  180,
										align: 'center'		
									}
									]
								] 
							   });
							   
							  
							$("#grounp").datagrid("loadData", jsonData);
									$('.btn1').click(function(){
										var options =$("#grounp").datagrid('getSelections');
										for(var i=0;i<options.length;i++){
											$('#grounps').datagrid('appendRow',{
														EMP_CD: options[i].EMP_CD,
														EMP_NM: options[i].EMP_NM
												    });
											var index = $('#grounp').datagrid('getRowIndex', options[i]);
											$('#grounp').datagrid('clearChecked');
											$('#grounp').datagrid('deleteRow',index);
										};
										
									})
									$('.btn2').click(function(){
										var options =$("#grounps").datagrid('getSelections');
										var index =$("#grounps").datagrid('getRowIndex','options');
										for(var i=0;i<options.length;i++){
											
											$('#grounp').datagrid('appendRow',{
														EMP_CD: options[i].EMP_CD,
														EMP_NM: options[i].EMP_NM
													
												    });
											var index = $('#grounps').datagrid('getRowIndex', options[i]);
											$('#grounps').datagrid('deleteRow',index);
											$('#grounps').datagrid('clearChecked');	
										};
										
									})
							$("#grounp").datagrid({	
								onDblClickRow: function(rowIndex, rowData){
										    $('#grounps').datagrid('appendRow',{
										    	EMP_CD: rowData.EMP_CD,	
												EMP_NM: rowData.EMP_NM			
										    });
										    $('#grounp').datagrid('clearChecked');
										    $('#grounp').datagrid('deleteRow',rowIndex);
										    
							    }
							});
							$("#grounps").datagrid({
								onDblClickRow: function(rowIndex, rowData) {										
										    $('#grounps').datagrid('deleteRow',rowIndex);
										    $('#grounp').datagrid('appendRow',{
												EMP_CD: rowData.EMP_CD,	
												EMP_NM: rowData.EMP_NM	
										    });
										    $('#grounps').datagrid('clearChecked');	
							   }
							});
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
		 deleteData = function () {
             var isSelectedData = validSelectedData('alarmgroup_tab', 'Delete');
             if (!isSelectedData) {
                 $.messager.alert('提示', '请选择数据进行删除');
                 return;
             }
             var rowItems = 0;
             var checkedItems = $('#alarmgroup_tab').datagrid('getSelections');
             //确认提示框
             $.messager.confirm('确认框', '您确定要删除您所选择的数据?', function (r) {
            	 if(r==true){
            		 $.each(checkedItems, function (index, item) {
            		 	rowItems++;
            		 	var ajaxParam1 = {
                                 url: '/iPlant_ajax',
                                 dataType: 'JSON',
                                 data: {
						    		AT_CD: item.AT_CD,
						            IFS:'A000019'	
                                 },
                                }
                         iplantAjaxRequest(ajaxParam1);
                    	 var ajaxParam = {
                                 url: '/iPlant_ajax',
                                 dataType: 'JSON',
                                 data: {
						    		AT_CD: item.AT_CD,
						            IFS:'A000004'	
                                 },
                                 async: false,
                                 successCallBack:function(data){
	                              	 if(rowItems==checkedItems.length){
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
                         			if(rowItems==checkedItems.length){
                         				$.messager.alert('提示','删除失败,服务器无响应!');
                         			}
                         		}
                            }
                         iplantAjaxRequest(ajaxParam);
                     });
                   };
            	});
		 }
		setDataNull = function () {
              $('#txtGrounpCode').textbox({ required: false });
              $('#txtGrounpCode').textbox('setValue','');
              $('#txtGrounpName').textbox('setValue','');
          }
			ajaxParam2 = function() {
				var listData = [];
				var ajaxParam2 = {
					url: '/iPlant_ajax',
					data: {
						USE_YN:'Y',
						IFS: 'A000038'
					},
					successCallBack: function(data) {
						var ccArr = [];
						ccArr.push({"id":"","text":"全部"});
						for(var i = 0; i < data.RESPONSE[0].RESPONSE_DATA.length; i++) {
							listData.push({
								"id": data.RESPONSE[0].RESPONSE_DATA[i].AC_CD,
								"text": data.RESPONSE[0].RESPONSE_DATA[i].AC_NM
							});
							ccArr.push({
								"id": data.RESPONSE[0].RESPONSE_DATA[i].AC_NM,
								"text": data.RESPONSE[0].RESPONSE_DATA[i].AC_NM
							});
						}	
						var hash = {};
						listData = listData.reduce(function(item, next) {
							hash[next.id] ? '' : hash[next.id] = true && item.push(next);
							return item
						}, [])
						$('#cbUsedFlag').combobox({
							data: listData,
							valueField: 'id',
							textField: 'text'
						});
						$('#bcName').combobox({
							data: ccArr,
							valueField: 'id',
							textField: 'text'
						});
						
					}
				}
				iplantAjaxRequest(ajaxParam2);
			}
		sendData = function(CompanyOpttype,grounpName){
//        		if (CompanyOpttype == 0) {
//	                IFServerNo = 'A000020';
//	            }
	            /*else if (CompanyOpttype == 1) {
	            	var ajaxParamEmpoyee = {
		                	async: false,
		                    url: '/iPlant_ajax',
		                    dataType: 'JSON',
		                    data:{
		                    	AT_CD: $('#txtGrounpCode').val(),
		                    	IFS: 'A000019'
		                    }
		              }  
		                iplantAjaxRequest(ajaxParamEmpoyee);
	            }
	            else {
	                IFServerNo = 'A000019'
	            }
            	
        		var getData = $('#'+grounpName).datagrid('getRows');
            	
	            $.each(getData, function (i,item) {
	                var ajaxParamEmpoyee = {
	                	async: false,
	                    url: '/iPlant_ajax',
	                    dataType: 'JSON',
	                    data:{
	                    AT_CD: $('#txtGrounpCode').val(),
	                    EMP_CD: getData[i].EMP_CD,
	                	EMP_NM: getData[i].EMP_NM,
	                    IFS: 'A000020',
	                    }
	                }
	                iplantAjaxRequest(ajaxParamEmpoyee);
	
	
	            });*/
        		var arr = [];
        		var getData = $('#'+grounpName).datagrid('getRows');
        		var groupCD = $('#txtGrounpCode').val();
        		for(i=0; i<getData.length; i++){
        			arr.push({ AT_CD: groupCD,EMP_CD: getData[i].EMP_CD, EMP_NM: getData[i].EMP_NM});
        		}
        		var ajaxParamEmpoyee = {//批量删除 班组姓名
	                	async: false,
	                    url: '/iPlant_ajax',
	                    dataType: 'JSON',
	                    data:{
	                    AT_CD: groupCD,
	                    IFS: 'A000018'
	                    },successCallBack: function(data) {
	                    	if(arr.length > 0){
	                    		var ajaxParam1 = {
		        	                	async: false,
		        	                    url: '/iPlant_ajax',
		        	                    dataType: 'JSON',
		        	                    data:{
		        	                    list:arr,
		        	                    IFS: 'A000020'
		        	                    },successCallBack: function(data) {
		        	                    	
		        	                    }
		        	                };
		        	                iplantAjaxRequest(ajaxParam1);
	                    	}
	                    }
	                };
	                iplantAjaxRequest(ajaxParamEmpoyee);
//            	$.each(getData, function (i,item) {
//	                var ajaxParamEmpoyee = {
//	                	async: false,
//	                    url: '/iPlant_ajax',
//	                    dataType: 'JSON',
//	                    data:{
//	                    AT_CD: $('#txtGrounpCode').val(),
//	                    EMP_CD: getData[i].EMP_CD,
//	                	EMP_NM: getData[i].EMP_NM,
//	                    IFS: 'A000018'
//	                    }
//	                };
//	                iplantAjaxRequest(ajaxParamEmpoyee);
//	             });
           }
		
		/* 修改商品移动信息 */
		updateGrounp=function() {
		    var checkedItems = $('#alarmgroup_tab').datagrid('getSelections');
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
		    var row = $("#alarmgroup_tab").datagrid("getSelected");
		    if (row) {
		        $("#enditTab").dialog("open").dialog('setTitle', '编辑报警班组信息');
		        $(document).keydown(function(event){ 
					if(event.keyCode==13){ 
						getDataEmployee();
					}
				});
		        $('#txtGrounp').textbox('setValue', "");

				$('#txtGrounpCode').textbox('textbox').attr('readonly', true);
				$('#txtGrounpCode').textbox('textbox').attr('disabled', true);
		        $('#txtGrounpCode').textbox('setValue',row.AT_CD);
		        $('#txtGrounpName').textbox('setValue',row.AT_NM);
		        $('#cbUsedFlag').combobox('setValue',row.AC_CD);
		        $('#txtNote').textbox('setValue',row.AT_RM);
		        CompanyOpttype=1;
		        if("Y" == row.USE_YN){
		        	$('#txtGrounpUse').prop('checked','checked');
		        }
		        else{
		        	$('#txtGrounpUse').prop('checked','');
		        }
		        var reqData = {
						AT_CD:$('#txtGrounpCode').val(),
		        		IFS:'A000017'
								}
					reqGroundData1('/iPlant_ajax', reqData,'grounps');
		    }
		    checkFun();
		    initCombogridData();
		}

		/* 添加商品移动信息 */
		addGrounp=function() {
			CompanyOpttype=0;
			checkFun();
			$('#txtGrounpCode').textbox('textbox').attr('readonly', false);
			$('#txtGrounpCode').textbox('textbox').attr('disabled', false);
		    $("#enditTab").dialog("open").dialog('setTitle', '班组信息维护');
		    $(document).keydown(function(event){ 
				if(event.keyCode==13){ 
					getDataEmployee();
				}
			});
		    $("#fmAlarmGroup").form("clear");
		    $('#txtGrounpUse').prop('checked','checked');
		    $('#grounps').datagrid('loadData', { total: 0, rows: [] });
		    $('#grounp').datagrid('loadData', { total: 0, rows: [] });
		    $('#txtGrounp').textbox('setValue', "");
		    initCombogridData();
		}
		saveGrounp=function(){
			   if (!checkDataValid()){
            		$.messager.alert('提示','请输入必选添加信息');
            		return
               }; 
			   var IFServerNo='';
			   var reqData=[];
			   if(CompanyOpttype==0){ 
				   IFServerNo='A000002'
//				   $.extend(reqData, { CP_ID: '',CP_IP: '',IFS:IFServerNo}); 
			   }
			   else if(CompanyOpttype==1){
				   IFServerNo='A000003'
//				   $.extend(reqData, { CP_ID: '',CP_IP: '',IFS:IFServerNo}); 
			   }
			   else{
				   IFServerNo='A000004'
			   }
			   var useYn = '';
			    if($('#txtGrounpUse').is(':checked')){
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
				  async: false,
			      url:'/iPlant_ajax',
			      dataType:'JSON',
		  	      data:{
		              AT_CD:$('#txtGrounpCode').val(),
		              AT_NM:$('#txtGrounpName').val(), 
		              AC_CD:$('#cbUsedFlag').combobox('getValue'),
		              USE_YN: useYn,
		              AT_RM:$('#txtNote').val(),
		          	  IFS:IFServerNo
		         },
		         successCallBack:function(data){
		        	 sendData(CompanyOpttype,'grounps');  
                	 if($.messager.alert('提示', susMsg)){
                		 $('#enditTab').dialog('close');
//                  	 setDataNull();
                    	 initGridData();
                    	 $('#grounps').datagrid('loadData', { total: 0, rows: [] });
                	 }
                 },
                 errorCallBack:function(){
                	 $.messager.alert('提示', errorMsg);
                 }
		    };
			iplantAjaxRequest(ajaxParam);
			$("#enditTab").dialog("close");
			
		}
		}

grounpmanage.prototype = {
        init: function () {
            $(function () {
            	$("body")[0].onkeydown = keyPress;
                $("body")[0].onkeyup = keyRelease;
            	$('#isUse').combobox({
                    data:[
                    {value:'',text:'全部'},
                    {value:'Y',text:'启用'},
                    {value:'N',text:'不启用'}
                    ],
                    valueField:'value',
                    textField:'text',
                    panelHeight:80, 
                  });
            	var CompanyOpttype;  //0：新增   1:编辑
				    initGridData();
				    ajaxParam2();
//				    getDataByCondition();
				    $('#btnSearch').click(function() {
				    	getDataBySearch();
					});
				    $('#btnFreshen').click(function() {
				    	getDataBySearch();
					});
					$('.add').click(function(){
//						initCombogridData();
						addGrounp();
					})
					
					$('.update').click(function(){
//						ajaxParam2();
						updateGrounp();
					})
					
//					$('.save').click(function(){
//						saveGrounp(); 
//					})
					$('.delete').click(function(){
						deleteData(); 
					})
//					$('.close').click(function(){
//						setDataNull();
//						$('#enditTab').dialog('close');
//					})
					$('.linkbtn').click(function(){
						getDataEmployee();
					});
//					$('.saveGround').click(function() {
//						getDataBySearch();
//						$('#searchCondition').dialog('close');
//					});
//					$('.closeGround').click(function() {
//	//					setDataNull();
//						$('#searchCondition').dialog('close');
//					});
					//验证输入长度
					$("input", $("#txtGrounpCode").next("span")).keyup(function() {
						checkInputLength('txtGrounpCode', 20);
					})
					
					$("input", $("#txtGrounpName").next("span")).keyup(function() {
						checkInputLength('txtGrounpName', 30);
					})

					$("#txtNote").textbox('textbox').bind("keyup", function() {
					checkInputLength('txtNote', 200);
				    })
				  //限制输入英文单引号
					$("input",$("#txtGrounpCode").next("span")).keydown(function(e){
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
					$("input",$("#txtGrounpName").next("span")).keydown(function(e){
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
				    var gpfo = new grounpmanage();
				    gpfo.init();
})();


