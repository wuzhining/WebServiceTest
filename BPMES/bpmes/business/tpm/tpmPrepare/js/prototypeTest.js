/* 启动时加载 */
/*
 */
(function() {
	function equipmentTestInfo() {
		initGridData = function() {
			$("#txtREQUESTNUM").combobox({  
			       onSelect: function (record) {  
			    	   $("#txtPROJECTNAME").textbox('setValue', arrList[record.value].IT_NM);
						$("#txtREQUESTSL").textbox('setValue', arrList[record.value].RQ_CN);
						$("#txtSUPPLIER").textbox('setValue', arrList[record.value].ET_SP); 
			       }  
			   })
			dataPi=[],dataSer=[{'value':'','text':'-- 请选择 --'}],
			fileName="",
			fileType="";
    		var pi = {
                url: "/iPlant_ajax",
                dataType: "JSON",
                data: {
                    IFS: "T000056"
                },
                successCallBack: function(a) {
                	var op = a.RESPONSE[0].RESPONSE_DATA;
                    $.each(op,function(n,obj) {
                    	dataSer.push({'value':obj.RQ_SN,'text':obj.RQ_SN});
                    	arrList[obj.RQ_SN]=obj;
                    	dataPi.push({'value':obj.RQ_SN,'text':obj.RQ_SN});
				    });  
                    $("#serREQUEST").combobox("loadData", dataSer);
                    $("#serREQUEST").combobox('select', dataSer[0].value);
                },
                errorCallBack: function() {
                    $.messager.alert("提示", e)
                }
            };
			iplantAjaxRequest(pi);
			
		/*	var p2 = {
	                url: "/iPlant_ajax",
	                dataType: "JSON",
	                data: {
	                    IFS: "T000056",
	                    YN:'1'
	                },
	                successCallBack: function(a) {
	                	var op = a.RESPONSE[0].RESPONSE_DATA;
	                    $.each(op,function(n,obj) {
	                    	dataPi.push({'value':obj.RQ_SN,'text':obj.RQ_SN});
					    });  
	                },
	                errorCallBack: function() {
	                    $.messager.alert("提示", e)
	                }
	            };
				iplantAjaxRequest(p2);*/
			
			var dgrid = $('#RequestTest_tab').datagrid('options');
			if(!dgrid) return;
			var reqData = {
				IFS: 'T000036',
				NUMBER: $("#serNUMBER").textbox("getValue"),
				NAME: $("#serNAME").textbox("getValue"),
				REQUEST: $("#serREQUEST").combobox("getValue"),
				pageIndex: 1,
				pageSize:dgrid.pageSize
			}
			reqGridData('/iPlant_ajax', 'RequestTest_tab', reqData);
			
		},
		bindGridData = function(reqData, jsonData) {
			var grid = {
				name: 'RequestTest_tab',
				dataType: 'json',
				columns: [	
				   [{field: 'LM_SN',title: '样机编号',width: 100,align: 'center'}, 
					{field: 'LM_NM',title: '样机名称',width: 100,align: 'center'}, 					
					{field: 'RQ_SN',title: '需求编号 ',width: 150,align: 'center'},
					{field: 'IT_NM',title: '项目名',width: 100,align: 'center'}, 
					{field: 'RQ_CN',title: '需求数量',width: 80,align: 'center'}, 
					{field: 'LM_SM',title: '样机规格型号',width: 80,align: 'center'}, 
					{field: 'ET_SP',title: '供应商',width: 150,align: 'center'},					
					{field: 'TT_DT',title: '试用时间',width: 100,align: 'center',formatter: function(value, row, index) {if(row.TT_DT) return gridToDate(row.TT_DT);}},
					{field: 'TT_PE',title: '试用地点',width: 150,align: 'center'}, 
					{field: 'CK_DT',title: '验收时间',width: 100,align: 'center',formatter: function(value, row, index) {if(row.CK_DT) return gridToDate(row.CK_DT);}},
					{field: 'CK_RU',title: '验收结果',width: 100,align: 'center'},
					{field: 'LM_ST',title: '样机状态',width: 150,align: 'center',formatter: function(value, row, index) {if(value =='0') return "通过"; else return "不通过";}},					
					{field: 'IS_BP_NM',title: '是否批量采购',width: 200,align: 'center'},
					{field: 'PL_DT',title: '计划上线时间',width: 200,align: 'center'},					
					{field: 'LM_AT',title: '附件',width: 200,align: 'center'}, 
					{field: 'CRT_ID',title: '创建人',width: 200,align: 'center'}, 
					{field: 'CRT_DT',title: '创建时间',width: 200,align: 'center'}, 
					{field: 'UPT_ID',title: '修改人',width: 200,align: 'center'}, 
					{field: 'UPT_DT',title: '修改时间',width: 200,align: 'center'}, 
					{field: 'IS_BP',title: '',hidden:true,width: 200,align: 'center'},
					{field: 'FILE_BELONG',title: '',hidden:true,width: 5,align: 'center'},
					{field: 'FILE_CLS',title: '',hidden:true,width: 5,align: 'center'},
					{field: 'FILE_SAVE_PATH',title: '',hidden:true,width: 5,align: 'center'},
					{field: 'SAVE_FILE_NM',title: '',hidden:true,width: 5,align: 'center'},
					{field: 'FILE_TYPE',title: '',hidden:true,width: 5,align: 'center'},
					{field: 'FILE_SIZE',title: '',hidden:true,width: 5,align: 'center'},
					{field: 'FILE_BELONG',title: '',hidden:true,width: 5,align: 'center'}]
				],
				onDblClickRow: function(index,row){
			    	 var grid = $('#RequestTest_tab');
			    	 $("#txtREQUESTNUM").combobox("loadData", dataPi);
			    	 if (row) {
			    		 $("#fmWorkShopArea").form("clear");
			    		 CompanyOpttype = 1;
			    		 $("#searchCondition").dialog("close");
			    		 $("#enditTab").dialog("open").dialog('setTitle', '修改样机试用信息');			    		 
			    		 $('#txtID').val(row.ID);
			    		 $('#txtTESTNUM').textbox('setValue', row.LM_SN);
			    		 $('#txtTESTNUM').textbox('textbox').attr('readonly',true);
						 $('#txtTESTNUM').textbox('textbox').attr('disabled',true);
			    		 $('#txtTESTNAME').textbox('setValue', row.LM_NM);
			    		 $('#txtREQUESTNUM').combobox('setValue', row.RQ_SN);
			    		 $('#txtPROJECTNAME').textbox('setValue', row.IT_NM);
			    		 $('#txtREQUESTSL').textbox('setValue', row.RQ_CN);
			    		 $('#txtSUPPLIER').textbox('setValue', row.ET_SP);
			    		 $('#txtSYDD').textbox('setValue', row.TT_PE);
			    		 $('#txtSIZE').textbox('setValue', row.LM_SM);
			    		 $('#txtYJZT').combobox('setValue', row.LM_ST);
			    		 var f1 = document.getElementById('txtSFCG1');
						 var f2 = document.getElementById('txtSFCG2');
			    		 $('#txtPLANDATE').datebox('setValue', row.PL_DT);
			    		 $('#showFileName').html(row.LM_AT);
			    		 $("#showFileName").attr("title",row.LM_AT);			    							
			    		 var file = document.getElementById('txtFJ');
						 var img = document.getElementById('imgPicture');
						 img.src = filterUrlPath(row.FILE_SAVE_PATH);
						 grid.datagrid('clearSelections'), 
						 grid.datagrid('selectRow',index);						
						 if("Y" == row.IS_BP) {
								f1.checked=true; 
							} else if("N" == row.IS_BP){
								f2.checked=true; 
							}else{
								$('#SFCG').prop('checked', '');
							}
			    	 }
				}
			}
			initGridView(reqData, grid);
			$('#RequestTest_tab').datagrid('loadData', jsonData);
		},
		setDataNull = function () {
            $('#txtTESTNUM').textbox('setValue',''),
            $('#txtTESTNUM').textbox('textbox').attr('readonly',false);
            $('#txtTESTNUM').textbox('textbox').attr('disabled',false);
            var obj = document.getElementById('txtFJ');
      	  	//obj.outerHTML=obj.outerHTML,
      	  	$('#showFileName').html('');
            $('#imgPicture').attr("src", ""),
            fileType="",fileName="";
            $('input:radio:checked').removeAttr("checked"); 
            $('input:radio:checked').attr("checked",false);
            //navigator.userAgent.indexOf('MSIE') >= 0? $('#txtPHOTO').replaceWith($('#txtPHOTO').clone(true)) : $('#txtPHOTO').clone().val('')
		},
		checkDataValid = function() {
			var a = $("#txtTESTNUM").val(),
			b = $("#txtTESTNAME").val();
			c = $('#txtREQUESTNUM').combobox('getValue');			
			if ("" == a || "" == b || "" ==c ) 
				return !1;
			return 1;
         },
		validSelectedData = function (gridName,type) {
            var checkedItems = $('#RequestTest_tab').datagrid('getSelections');
            var num = 0;
            $.each(checkedItems, function (index, item) {
               num++;
            });
            if (type == 'Update') {
                if (num != 1) {
                    return false;
                }
            }else {
                if (num <= 0) {
                    return false;
                }
            }
            return true;
        },
       /* 查询员工信息 */
		searchTest=function() {
			var a = $('#RequestTest_tab'),
			b = $("#serNUMBER").textbox("getValue"),
			e = $("#serNAME").textbox("getValue"),
            c = $("#serREQUEST").combobox("getValue"),
            d = {
				LM_SN: b,			
				LM_NM: e,
				RQ_SN: c,
				IFS: "T000036",
                pageIndex: 1,
                pageSize: a.pageSize                
            };
            reqGridData("/iPlant_ajax", "RequestTest_tab", d)
            
		},
		deleteConfig = function () {
            var isSelectedData = validSelectedData('RequestTest_tab', 'Delete');
            if (!isSelectedData) {
                $.messager.alert('提示', '请选择一条数据进行删除');
                return;
            }
            var checkedItems = $('#RequestTest_tab').datagrid('getSelections');
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
                                IFS: 'T000039',
                                LM_SN: item.LM_SN,
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
       },		      
       /*显示图片*/
       showPic = function (){
    	   // 以下即为完整客户端路径
    	   var img = document.getElementById('imgPicture');
    	   var pic = document.getElementById('txtFJ');
    	   var file,strSrc;
    	   
    	   getPicPath(img,pic,img);
    	   if(pic.files.length>0){
    		   file = pic.files[0],fileName = file.name,fileType=file.type;
    		   var temp = [];
    		   if(fileName.indexOf('.')>0){
    			   temp=fileName.split('.');
    			   strSrc = temp[temp.length-1];
    			   if(strSrc.localeCompare('jpg')===0 || strSrc.localeCompare('jpeg') === 0 || strSrc.localeCompare('gif') === 0 || strSrc.localeCompare('png') === 0 || strSrc.localeCompare('pdf') === 0 || strSrc.localeCompare('xlsx') === 0){
    				   $('#showFileName').html(fileName);
    			   }
    		   }
    	   }
       },
       /* 修改信息 */
       updateStation = function() {		    	   
			var checkedItems = $('#RequestTest_tab').datagrid('getSelections');					
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
			var row = $("#RequestTest_tab").datagrid("getSelected");	
			$("#txtREQUESTNUM").combobox("loadData", dataPi);
			if(row) {
				CompanyOpttype = 1;
	    		 $("#searchCondition").dialog("close");
	    		 $("#enditTab").dialog("open").dialog('setTitle', '修改样机试用信息');			    		 	    		 
	    		 $('#txtTESTNUM').textbox('setValue', row.LM_SN);
	    		 $('#txtTESTNUM').textbox('textbox').attr('readonly',true);
				 $('#txtTESTNUM').textbox('textbox').attr('disabled',true);
	    		 $('#txtTESTNAME').textbox('setValue', row.LM_NM);
	    		 $('#txtREQUESTNUM').combobox('setValue', row.RQ_SN);
	    		 $('#txtPROJECTNAME').textbox('setValue', row.IT_NM);
	    		 $('#txtREQUESTSL').textbox('setValue', row.RQ_CN);
	    		 $('#txtSUPPLIER').textbox('setValue', row.ET_SP);
	    		 $('#txtSYDD').textbox('setValue', row.TT_PE);
	    		 $('#txtSIZE').textbox('setValue', row.LM_SM);
	    		 $('#txtYJZT').combobox('setValue', row.LM_ST);	    		 
	    		 var f1 = document.getElementById('txtSFCG1');
				 var f2 = document.getElementById('txtSFCG2');
	    		 $('#txtPLANDATE').datebox('setValue', row.PL_DT);
	    		 $('#showFileName').html(row.LM_AT);
	    		 $("#showFileName").attr("title",row.LM_AT);			    							
	    		 var file = document.getElementById('txtFJ');
				 var img = document.getElementById('imgPicture');
				 img.src = filterUrlPath(row.FILE_SAVE_PATH);				
				 grid.datagrid('clearSelections'), 
				 grid.datagrid('selectRow',index);
				 if("Y" == row.IS_BP) {
						f1.checked=true; 
					} else if("N" == row.IS_BP){
						f2.checked=true; 
					}else{
						$('#SFCG').prop('checked', '');
					}
			}
       },
		/* 添加商品移动信息 */
		addStation = function() {
    	   var j= $('#txtREQUESTNUM').combobox('getData');
    	   CompanyOpttype = 0,
    	   $("#searchCondition").dialog("close"),
    	   $("#txtREQUESTNUM").combobox("loadData", dataPi),
    	   $("#enditTab").dialog("open").dialog('setTitle', '添加样机试用信息'),
    	   $("#fmWorkShopArea").form("clear");
    	   if(dataPi.length>0){
    		   $("#txtREQUESTNUM").combobox('select', dataPi[0].value);
    	   }
		},
         checkedInput =function(ele,rep,mes){
 			var myInput =$('#'+ele).val();
 			if(myInput){
 				if(!rep.test(myInput)){
 					$('#'+ele).textbox('setValue','');
 					$.messager.alert('提示',mes+'错误');
 					return 
 				}
 			}
 		},
 		saveUpdateValidate=function(){
			var checkedItems = $('#RequestTest_tab').datagrid('getSelections'),row = checkedItems[0];
			var isbp = 'N';
			if ($('#txtSFCG').is(':checked')) {
				isbp = "Y";
			} else {
				isbp = "N";
			}
			if(row.LM_NM){
				if($('#txtTESTNAME').textbox('getValue')!=row.LM_NM || $('#txtREQUESTNUM').combobox('getValue')!=row.RQ_SN ||
				$('#txtPROJECTNAME').textbox('getValue')!=row.IT_NM ||
				$('#txtREQUESTSL').textbox('getValue')!=row.RQ_CN || $('#txtSUPPLIER').textbox('getValue')!=row.ET_SP ||
				$('#txtSYDD').textbox('getValue')!=row.TT_PE ||$('#txtSIZE').textbox('getValue')!=row.LM_SM ||
				$("input[name='SFCG']:checked").val()!=row.IS_BP|| $('#txtYJZT').combobox('getValue')!=row.LM_ST ||
				$('#txtPLANDATE').datebox('getValue')!=formatterDate(row.PL_DT) || $('#showFileName').text()!=row.LM_AT){
					return true;
				}else{
					return false;
				}
			}
		},
		formatterDate=function(value) {
            var date = new Date(value),year = date.getFullYear().toString(),month = (date.getMonth() + 1),day = date.getDate().toString(),hour = date.getHours().toString(),minutes = date.getMinutes().toString(),seconds = date.getSeconds().toString();
            if (month < 10) month = "0" + month;
            if (day < 10) day = "0" + day;
            if (hour < 10) hour = "0" + hour;
            if (minutes < 10) minutes = "0" + minutes;
            if (seconds < 10) seconds = "0" + seconds;
            return year + "-" + month + "-" + day;
        },
        /*验证是否重复*/
        existTest=function(test){
			var rowNum,tpm = $('#txtTESTNUM');
			if(CompanyOpttype==0){
				if(test!=undefined && test!='' && test!=null){
	 	    		var ajaxParam = {
	 	    				url: '/iPlant_ajax',
	 	    				dataType: 'JSON',
	 	    				data: {
	 	    					IFS: 'T000036',	 	    					
	 	    					LM_SN: test,	     							
	 	  					 	pageIndex: 1,
	 	  					 	pageSize: 10
	 	    				},
	 	    				successCallBack:function(data){
	 	                   	 	rowNum = parseInt(data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS);
	 	                   	 	if(rowNum>0){	 	                   	 		
	 	                   	 		$.messager.alert('提示', '您输入的样机编号['+test+']已有相同,请重新输入!');
	 	                   	 		tpm.textbox('setValue','');
		                   			return false;
	 	                   	 	}else{
	 	                   		 	return 1;
	 	                   	 	}
	 	                   	}
	 	    			};
	 	               	iplantAjaxRequest(ajaxParam);
	 	    	 }
			}
        },
		savaStation = function() {			
			if (!checkDataValid()) return void $.messager.alert("提示", "请添加必选信息");
			var IFServerNo = '',reqData = [],susMsg = '',errorMsg = '';
			if(CompanyOpttype == 0) {
				susMsg = '添加成功',errorMsg = '添加失败,请联系管理员',IFServerNo = 'T000037';
				/*判断是否上传图片*/
				if(fileName!=undefined && fileName!='' && fileName!=null){
					$('#FILE_BELONG').val($('#txtTESTNUM').val()),
					$('#FILE_CLS').val($('#txtREQUESTNUM').combobox('getValue')),
					$('#FILE_NAME').val(fileName),
					$('#FILE_TYPE').val(fileType),
					$('#importType').val('0'),
					$('#fmWorkShopArea').submit();
				}				
				/*验证是否重复*/
	 			var rowNum,tpm = $('#txtTESTNUM');
	 	    	if(tpm.textbox('getValue')!=undefined && tpm.textbox('getValue')!='' && tpm.textbox('getValue')!=null){
	 	    		var ajaxParamExist = {
	 	                   url: '/iPlant_ajax',
	 	                   dataType: 'JSON',
	 	                   data: {
	 	                       	IFS: 'T000036',
	 	                       	LM_SN: tpm.textbox('getValue'),	     							
	 	  					 	pageIndex: 1,
	 	  					 	pageSize: 10
	 	                   },
	 	                   successCallBack:function(data){
	 	                   	 	rowNum = parseInt(data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS);
	 	                   	 	if(rowNum>0){
	 	                   	 		//chrome支持
	 	//                       		$('#showInfo').html("<font color='red'>(已存在)</font>");
	 	                   	 		$.messager.alert("提示", '您输入的样机编号['+tpm.textbox('getValue')+']已有相同,请重新输入!');
	 	                   			return false;
	 	                   	 	}else{
		 	                   	 	ajaxParam = {
		 	           					url: '/iPlant_ajax',
		 	           					dataType: 'JSON',
		 	           					data: {
		 	           						LM_SN: $('#txtTESTNUM').val(),
		 	           						LM_NM: $('#txtTESTNAME').val(),
		 	           						RQ_SN :$('#txtREQUESTNUM').combobox('getValue'),
		 	           					    IT_NM: $('#txtPROJECTNAME').val(),
		 	           						RQ_CN :$('#txtREQUESTSL').val(),
		 	           					    ET_SP :$('#txtSUPPLIER').val(),		 	           						
		 	           						TT_PE :$('#txtSYDD').val(),
		 	           					    LM_SM :$('#txtSIZE').val(),
		 	           					    LM_ST :$('#txtYJZT').combobox('getValue'),
		 	           					    IS_BP :$("input[name='SFCG']:checked").val(),
		 	           						PL_DT :$('#txtPLANDATE').datebox('getValue'),
		 	           						LM_AT :fileName,		 	           						
		 	           						IFS: IFServerNo
		 	           					},
		 	           					
		 	           					successCallBack: function(data) {
		 	           						if($.messager.alert('提示', susMsg)) {
		 	           							$('#enditTab').dialog('close'),setDataNull(),initGridData();
		 	           						}
		 	           					},
		 	           					errorCallBack: function() {
		 	           						$.messager.alert('提示', errorMsg);
		 	           					}
		 	           				
		 	           				};
		 	           				iplantAjaxRequest(ajaxParam);
		 	           				$("#enditTab").dialog("close");
	 	                   	 	}
	 	                   	}
	 	    			};
	 	               	iplantAjaxRequest(ajaxParamExist);
	 	    	 }
			} else if(CompanyOpttype == 1) {
				susMsg = '更新成功',errorMsg = '更新失败,请联系管理员',IFServerNo = 'T000038';
				if(!saveUpdateValidate()){
            		$.messager.alert("提示", '内容没有更新，请修改') 
            		return false;
            	}
				//判断是否变更了文件信息
				var row = $("#RequestTest_tab").datagrid("getSelected");
				console.log("fileName="+fileName);
				if(row){
					if(fileName!=undefined && fileName!="" && fileName!=null && row.SAVE_FILE_NM!=fileName){
						$('#FILE_BELONG').val($('#txtTESTNUM').val()),
						$('#FILE_CLS').val($('#txtREQUESTNUM').combobox('getValue')),
						$('#FILE_NAME').val(fileName),
						$('#FILE_TYPE').val(fileType),
						$('#importType').val('0'),
						$('#fmWorkShopArea').submit();
					}
				}
				if(fileName!=undefined && fileName!='' && fileName!=null){
        	 	}else{
        	 		fileName = $('#txtFJ').val();
        	 	}
				ajaxParam = {
					url: '/iPlant_ajax',
					dataType: 'JSON',
					data: {
						ID: $('#txtID').val(),
						LM_SN: $('#txtTESTNUM').val(),
						LM_NM: $('#txtTESTNAME').val(),
						RQ_SN :$('#txtREQUESTNUM').combobox('getValue'),
						IT_NM :$('#txtPROJECTNAME').val(),
						RQ_CN :$('#txtREQUESTSL').val(),
						ET_SP :$('#txtSUPPLIER').val(),
						TT_PE :$('#txtSYDD').val(),
						LM_SM :$('#txtSIZE').val(),
						LM_ST :$('#txtYJZT').combobox('getValue'),
						IS_BP :$("input[name='SFCG']:checked").val(),
						PL_DT :$('#txtPLANDATE').datebox('getValue'),
						LM_AT :fileName,						
						IFS: IFServerNo
					},
					successCallBack: function(data) {
						if($.messager.alert('提示', susMsg)) {
							$('#enditTab').dialog('close'),setDataNull(),initGridData();
						}
					},
					errorCallBack: function() {
						$.messager.alert('提示', errorMsg);
					}
				};
				iplantAjaxRequest(ajaxParam);
				$("#enditTab").dialog("close");
			} else {
				IFServerNo = 'T000039'
			}
		}
	};
	equipmentTestInfo.prototype = {
		init: function() {
			$(function() {
				var CompanyOpttype; //0：新增   1:编辑
				initGridData();				
				$('#btnSearch').click(function() {
					searchTest();
				});
				
				$('#btnAdd').click(function() {					
					addStation();
				});
				$('#btnUpdate').click(function() {					
					updateStation();
				});
				
                $('#btnDelete').click(function() {
                	deleteConfig();
				});

				$('.save').click(function() {					
					savaStation();
					
				});

				$('.close').click(function() {
					setDataNull();
					$('#enditTab').dialog('close');
				});
				
				$('.panel-tool-close').click(function() {
					setDataNull();
				});
				
			});
		}
	}
	var arrList={};
	var pofo = new equipmentTestInfo();
	pofo.init();
})();