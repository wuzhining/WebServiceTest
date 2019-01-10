
(function() {
	function application() {
		initGridData = function() {
			var dgrid = dataGrid.datagrid('options');
			if(!dgrid) return;
			var reqData = {
				IFS: 'S000007', 
				pageIndex: 1,
				pageSize: dgrid.pageSize
			}
			reqGridData('/iPlant_ajax', 'warehouseType_tab', reqData);
		},
		bindGridData = function(reqData, jsonData) {
			var gridList = {
				name: 'warehouseType_tab',
				dataType: 'json',
				columns: [[
				            //{field : "CZ",width : 10,checkbox : true},
				            {field:'SKILL_ID', title: '主键ID', hidden:true,width:280,align:'center',formatter: function (value) {if(value != null)return "<span title='" + value + "'>" + value + "</span>";}},
					        {field:'SKILL_CD', title: '技能编码', width:270,align:'center',formatter: function (value) {if(value != null)return "<span title='" + value + "'>" + value + "</span>";}},
						 	{field: 'SKILL_NAME',title: '技能名称',width: 260,align: 'center',formatter: function (value) {if(value != null)return "<span title='" + value + "'>" + value + "</span>";}},
							{field: 'SKILL_TYPE',title: '技能类型',width: 260,align: 'center',formatter: function (value) {if(value != null)return "<span title='" + value + "'>" + value + "</span>";}},
			        	    {field: 'DESCRIBE',title: '描述',width: 280,align: 'center',formatter: function (value) {if(value != null)return "<span title='" + value + "'>" + value + "</span>";}},
					        {field: 'DATE_DUE',title: '到期日期',width: 280,align: 'center',formatter: function (value) {if(value != null)return "<span title='" + value + "'>" + value + "</span>";}},
					        {field:'ADVANCE_WARNING_DATE', title: '到期提前警告天数', width:300,align:'center',formatter:function (value) {if(value != null)return "<span title='" + value + "'>" + value + "</span>";}}
							]], 
							/**
							 * 单机进入编辑模式
							 */
					  onDblClickRow: function(index,row){
						var checkedRows = $('#warehouseType_tab').datagrid('getSelected');
						if(checkedRows){
				    	 CompanyOpttype=1;
				    	 $("#enditTab").dialog("open").dialog('setTitle', '编辑岗位资格技能');
				    	 checkFun();
						$('#SKILL_CD').textbox('setValue', row.SKILL_CD==null?'':row.SKILL_CD);
						$('#SKILL_NAME').textbox('setValue', row.SKILL_NAME==null?'':row.SKILL_NAME);
						 $('#SKILL_TYPE').combobox('setValue', row.SKILL_TYPE==null?'':row.SKILL_TYPE);
						 $('#DESCRIBE').val(row.DESCRIBE==null?'':row.DESCRIBE);
						 $('#DATE_DUE').textbox('setValue', row.DATE_DUE==null?'':row.DATE_DUE);
						 $('#ADVANCE_WARNING_DATE').textbox('setValue', row.ADVANCE_WARNING_DATE==null?'':row.ADVANCE_WARNING_DATE);
						 cong_id = row.SKILL_ID;
						 checkedRow=1;
					    }else{
							$.messager.alert("提示", '请选中行再进行修改')
							return false;
					    }
						 
						 
				     }
				}
				initGridView(reqData, gridList);
			dataGrid.datagrid('loadData', jsonData);
			}
			checkFun = function (){
				var qx = getUpdateRight();
				if(qx=="Y"){
					  	
			    	 $('#saveID').show();
			    	 $('#cancleID').show();
				}else{
					CompanyOpttype=2;
					
			    	 $('#saveID').hide();			    	
				}
			}
			/*checkedRadio = function() {
				
				$('#By_product').prop('checked',true);
			}*/
			addStation = function() {
	        	CompanyOpttype = 0;
	        	checkFun();
				$("#enditTab").dialog("open").dialog('setTitle', '新建技能项');
				$("#fmStation").form("clear");			
			}	
			
			
			
			setDataNull = function () {           
	             // $('#txtID').textbox('setValue','');              
	          }	
			getDataBySearch = function(){
				var dgrid = $('#warehouseType_tab').datagrid('options');
				if(!dgrid) return;
				var SKILL_NAME = $('#searchSKILL_NAME').textbox('getValue');
				var SKILL_TYPE =$("#searchSKILL_TYPE").combobox('getValue');
				var reqData = {
						SKILL_NAME:SKILL_NAME,
						SKILL_TYPE:SKILL_TYPE,
						IFS: 'S000007',
					pageIndex: 1,
					pageSize: dgrid.pageSize
				};
				reqGridData('/iPlant_ajax', 'warehouseType_tab',reqData);
			};
			
			/* 编辑岗位资格技能 */			
			updateStation = function() {
				var checkedItems = $('#warehouseType_tab').datagrid('getSelections');
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
				var row = $("#warehouseType_tab").datagrid("getSelected");
				if(row) {
					$("#searchCondition").dialog("close");
					$("#enditTab").dialog("open").dialog('setTitle', '编辑技能项列表');
					 $('#SKILL_CD').textbox('setValue', row.SKILL_CD==null?'':row.SKILL_CD);
					 $('#SKILL_CD').textbox('textbox').attr('readonly', true);
					 $('#SKILL_CD').textbox('textbox').attr('disabled', true);
					 $('#SKILL_NAME').textbox('setValue', row.SKILL_NAME==null?'':row.SKILL_NAME);
					 $('#SKILL_TYPE').combobox('setValue', row.SKILL_TYPE==null?'':row.SKILL_TYPE);
					 $('#DESCRIBE').val(row.DESCRIBE==null?'':row.DESCRIBE);
					 $('#DATE_DUE').textbox('setValue', row.DATE_DUE==null?'':row.DATE_DUE);
					 $('#ADVANCE_WARNING_DATE').textbox('setValue', row.ADVANCE_WARNING_DATE==null?'':row.ADVANCE_WARNING_DATE);
					CompanyOpttype = 1;	
					checkedRow = 0;

				}
				checkFun();
			}
			
			/*删除技能项列表*/
			deleteStation = function () {
	    		var checkedItems =  $('#warehouseType_tab').datagrid('getSelections');
	            if (checkedItems.length==0) {
	                $.messager.alert('提示', '请选择一条数据进行删除');
	                return;
	            }
	            
	            /*确认提示框*/
	            var delCnt=0;
	            $.messager.confirm('确认框', '您确定要删除您所选择的数据吗?', function (r) {
	               	if(r==true){
	               		var tmp='';
	               		 $.each(checkedItems, function (index, item) {
	               			 delCnt++;
	                   var ajaxUpdate = {
	                             url: '/iPlant_ajax',
	                             dataType: 'JSON',
	                             data: {
	                            	 SKILL_ID: item.SKILL_ID,
	                                 IFS: 'S000010'
	                                	
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
	               	   });
	               	}
	            });      
	    	},
	    	
	    	 dataArr={},
	         
	 		//置空查询输入框
	 		setQueryNull=function() {
	 			$("#nanan").form("clear");
	 		},
	    	
			      
	 		 /*验证修改内容是否重复*/
	        saveUpdateValidate = function() {
				var checkedItems = $('#warehouseType_tab').datagrid('getSelections');
				row = checkedItems[0];
				if (row.SKILL_ID) {
					if($('#SKILL_CD').textbox('getValue')!= (row.SKILL_CD==null?'':row.SKILL_CD)||
					  $('#SKILL_NAME').textbox('getValue')!= (row.SKILL_NAME==null?'':row.SKILL_NAME)||
					   $('#SKILL_TYPE').combobox('getValue')!= (row.SKILL_TYPE==null?'':row.SKILL_TYPE)||
					    $('#DESCRIBE').val()!= (row.DESCRIBE==null?'':row.DESCRIBE)||
					   $('#DATE_DUE').textbox('getValue')!= (row.DATE_DUE==null?'':row.DATE_DUE)||
					   $('#ADVANCE_WARNING_DATE').textbox('getValue')!=( row.ADVANCE_WARNING_DATE==null?'':row.ADVANCE_WARNING_DATE))

							
						return true;
						else {
							return false;
						}
					}
			}
			
			/*新建岗位资格技能	 */
			 addMaterial=function() {
				$("#enditTab").dialog("open").dialog('setTitle', '新建岗位资格技能	');
				$('#showMaterial').html('');
				
			}
	

		    /*必填项空值验证*/
			   checkSelect=function() {
					pass = true; 
					$("select[required]").each(function(){
						if((this.value == '')&&($(this).textbox('getText')=='')) { 
							text = $(this).parent().prev().text(); 
							$.messager.alert('提示',text+"必填项不能为空"); 
							this.focus(); 
							pass = false; 
							return false;//跳出each 
						} 
					}); 
					return pass; 
				};
			
				  /* 验证是否重复 */
				existCompany = function(companyCode) {
					var rowNum, tpm = $('#SKILL_CD');
					if(/[　，。、！？：“”［］——（）…！＠＃￥＆＊＋＞＜；：‘\u4e00-\u9fa5\s\n\r\t]+/.test($('#SKILL_CD').textbox('getText'))){
				        	$.messager.alert('提示', "技能编码不能是中文和非法字符，请重新输入。","",function(){
								$('#SKILL_CD').textbox('setValue', '');
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
											IFS : 'S000007',
											SKILL_CD : companyCode,
											pageIndex : 1,
											pageSize : 10
										},
										successCallBack : function(data) {
											rowNum = parseInt(data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS);
											if (rowNum > 0) {
												$.messager
														.alert(
																'提示',
																'您输入的技能编码['
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
					
		        },
		        
		        
				//保存
			savaStation = function() {
				var IFServerNo = '';
				var reqData = [];
			    if(CompanyOpttype == 0) {
					IFServerNo = 'S000008'
					isid = 'mes1.agv_seq.nextval';
				} else if(CompanyOpttype == 1) {
					if (!saveUpdateValidate()) {
						$.messager.alert("提示", '内容没有更新，请修改')
						return false;
					}
					IFServerNo = 'S000009'
					var checkedItems = $('#warehouseType_tab').datagrid('getSelections');
					row = checkedItems[0];
					if(checkedRow!=0){
						isid = cong_id;
					}else{
						isid = row.SKILL_ID;
					}
				} else {
					IFServerNo = 'S000007'
				}
			    var SKILL_CD=$('#SKILL_CD').textbox('getValue');
			    var SKILL_NAME=$('#SKILL_NAME').textbox('getValue');
			    var SKILL_TYPE=$('#SKILL_TYPE').combobox('getValue');
			    var DESCRIBE=$('#DESCRIBE').val();
				var DATE_DUE=$('#DATE_DUE').textbox('getValue'); 
				var ADVANCE_WARNING_DATE=$('#ADVANCE_WARNING_DATE').textbox('getValue'); 
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
						SKILL_ID:isid, 
						SKILL_CD: SKILL_CD,
						SKILL_NAME: SKILL_NAME,
						SKILL_TYPE: SKILL_TYPE,
						DESCRIBE: DESCRIBE,
						DATE_DUE: DATE_DUE,
						ADVANCE_WARNING_DATE: ADVANCE_WARNING_DATE,									
						IFS: IFServerNo
					},
					successCallBack: function(data) {
						var susMsg=getReturnMsg(data);
	                	$.messager.alert("提示",susMsg,"",function(){ 
	            			reqGridData('/iPlant_ajax','warehouseType_tab',{IFS:'S000007'});
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
				//初始化全局变量对象
				dataGrid = $('#warehouseType_tab'),dataLabelType=[],showmessage=$('#showMessageInfo'),editIndex = undefined,oldRow=undefined, reg=new RegExp("null","g"),dataNational = [];
				initGridData();
				
				var CompanyOpttype; //0：新增   1:编辑
				initGridData();							
				$('#btnSearch').click(function() {
					getDataBySearch();
				});
			     //添加鼠标移开事件
                $("input",$("#SKILL_CD").next("span")).blur(function(){
        		    var SKILL_CD = $('#SKILL_CD').val();
        			existCompany(SKILL_CD);
        	    });
				$('#btnAdd').click(function() {
					$("#enditTab").dialog("open").dialog('setTitle', '新建岗位资格技能');
				});
				$('#btnClean').click(function() {
					$('#cxRuleName').textbox('setValue',"");
				});	  
				$('.add').click(function() {					
					setDataNull();
					addStation();
				});
				$('#btnUpdate').click(function() {	
					updateStation();
				});
				$('.save').click(function() {
					savaStation();
				});
				$('#btnSearch1').click(function(){
					var titleName = '新建岗位资格技能';
					var dialogName = 'enditTab';
					var tabName = 'materialDetails_tab';
					var SKILL_ID = $('#SKILL_ID').textbox('getValue');
					var reqData = {
						IFS: 'S000008',
						SKILL_ID:SKILL_ID,
					}
					openDialogFrame(tabName,dialogName,titleName,reqData);
				});
				$('#btnDelete').click(function(){
	                deleteStation();
	            });
				$('.close').click(function() {
					setDataNull();
					$('#enditTab').dialog('close');
				});
				$('.panel-tool-close').click(function() {
					setDataNull();
				});
				$('#btnResets').click(function() {
					setQueryNull();
				});
			});
		}
	}
	var fcfo = new application();
	fcfo.init();
	
})();