
(function() {
	function kanbanType() {	
		getSelectedMaintain = function(t){
			iplantAjaxRequest({
				url :'/iPlant_ajax',
				data :{
					IFS : 'WMS_QC0001'
				},
				successCallBack : function(data){
					var array = new Array();
					if(t==''){
						array.push({
							"id" : "",
							"text" : "全部"
						});
					}
					var rowCollection = createSourceObj(data);
					for (var i = 0; i< rowCollection.length;i++){
						array.push({
							"id" : rowCollection[i].INSPECTIONTYPEID,
							"text" : rowCollection[i].INSPECTIONTYPENAME
						});
					}
					//绑定看板类型下拉框
					$('#INSPECTIONTYPEID1,#INSPECTIONTYPEID').combobox({
						data : array,
						valueField : 'id',
						textField : 'text'
					});
				}
			})
		}
		
		//初始化表格 INSPECTIONTEMPLATEID
		initGridData = function() {
			    var dgrid = $('#RFID_tab').datagrid('options');
				if(!dgrid) return;
				var reqData = {
					IFS: 'WMS_AQL00007',
					pageIndex: 1,
					pageSize: dgrid.pageSize
				}
				reqGridData('/iPlant_ajax', 'RFID_tab', reqData);
				
			},
			bindGridData = function(reqData, jsonData) {
				var gridList = {
					name: 'RFID_tab',
					dataType: 'json',
					singleSelect:false,
					columns: [
						[
							{
							field : 'ck',
							checkbox : true
						},{
								field: 'INSPECTIONTEMPLATENAME',
								title: '检验模板名',
								width: 150,
								align: 'center',formatter: function (value) {
					           	if(value != null)
                                return "<span title='" + value + "'>" + value + "</span>";}
							},{
								field : 'INSPECTIONTYPENAME',
								title : '检验类型名',
								width : 150,
								align : 'center',formatter : function(value) {
								return "<span title='" + value + "'>" + value + "</span>";}
							},{
								field : 'STATUS',
								title : '状态',
								width : 150,
								align : 'center',formatter : function(value) {
									if(value == '1'){
										return "<span title='禁用'>禁用</span>";
									}else{
										return "<span title='启用'>启用</span>";
									}
								}
							},{
								field : 'DESCRIPTION',
								title : '描述',
								width : 150,
								align : 'center',formatter : function(value) {
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
								field: 'CRT_DT',
								title: '创建日期',
								width: 200,
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
							},{
								field: 'UPT_DT',
								title: '修改日期',
								width: 200,
								align: 'center',formatter: function (value) {
					           	if(value != null)
                                return "<span title='" + value + "'>" + value + "</span>";}
							}
						]
					],
				
				
				onDblClickRow: function(index,row){
					var checkedRows = $('#RFID_tab').datagrid('getSelected');
					if(checkedRows){
			    	 CompanyOpttype=1;
			    	
			    	 checkFun();
			    	
			    	 $("#searchCondition").dialog("close");
					 $("#enditTab").dialog("open").dialog('setTitle', '编辑修改检验模板清单');
					 $('#INSPECTIONTEMPLATENAME').textbox('setValue', row.INSPECTIONTEMPLATENAME==null?'':row.INSPECTIONTEMPLATENAME);
					 $('#INSPECTIONTYPEID').textbox('setValue', row.INSPECTIONTYPEID==null?'':row.INSPECTIONTYPEID);
					 $('#INSPECTIONTYPENAME').textbox('setValue',row.INSPECTIONTYPENAME==null?'':row.INSPECTIONTYPENAME);
					 $('#STATUS').combobox('setValue', row.STATUS==null?'':row.STATUS);
					 $('#DESCRIPTION').textbox('setValue', row.DESCRIPTION==null?'':row.DESCRIPTION);
					 $('#hidd').val(row.INSPECTIONTEMPLATEID);
			    	 
			    	 
					 
					 cong_id = row.INSPECTIONTEMPLATEID;
					 checkedRow=1;
				    }else{
						$.messager.alert("提示", '请选中行再进行修改')
						return false;
				    }
					 
					 
			     }
				
				
				
				
				
				
				
				
				
				}
				initGridView(reqData, gridList);
				$('#RFID_tab').datagrid('loadData', jsonData);
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
				$("#tabAddPro tbody tr").remove();
				InspId =[];
	        	CompanyOpttype = 0;
	        	getSelectedMaintain('1');
	        	//$('#STATUS').combobox('select', '0');
	        	//$('#STATUS').combobox('select', '1');
	        	getApplyOrder();
				$("#enditTab").dialog("open").dialog('setTitle', '成品入库配置信息添加');
				$("#fmStation").form("clear");			
			}	
			
			
			setDataNull = function () {           
				InspId =[];          
	        }	

		getDataBySearch = function(){
			var dgrid = $('#RFID_tab').datagrid('options');
			if(!dgrid) return;
			var INSPECTIONTEMPLATENAME = $('#INSPECTIONTEMPLATENAME1').val();
			var INSPECTIONTYPEID = $("#INSPECTIONTYPEID1").combobox('getValue');
			var reqData = {
				INSPECTIONTEMPLATENAME: INSPECTIONTEMPLATENAME,
				INSPECTIONTYPEID:INSPECTIONTYPEID,
				IFS: 'WMS_AQL00007',
				pageIndex: 1,
				pageSize: dgrid.pageSize
			}
			reqGridData('/iPlant_ajax', 'RFID_tab',reqData);
		}
		/* 修改成品入库配置信息 */			
		updateStation = function() {
			$("#tabAddPro tbody tr").remove();
			ArrayD = [];
			var checkedItems = $('#RFID_tab').datagrid('getSelections');
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
			var row = $("#RFID_tab").datagrid("getSelected");
			if(row) {
				savaStation1(row.INSPECTIONTEMPLATEID);
				$("#searchCondition").dialog("close");
				$("#enditTab").dialog("open").dialog('setTitle', '编辑修改检验模板清单');
				$('#INSPECTIONTEMPLATENAME').textbox('setValue', row.INSPECTIONTEMPLATENAME==null?'':row.INSPECTIONTEMPLATENAME);
				$('#INSPECTIONTYPEID').combobox('setValue', row.INSPECTIONTYPEID==null?'':row.INSPECTIONTYPEID);
				$('#STATUS').combobox('setValue', row.STATUS==null?'':row.STATUS);
				$('#DESCRIPTION').textbox('setValue', row.DESCRIPTION==null?'':row.DESCRIPTION);
				$('#hidd').val(row.INSPECTIONTEMPLATEID);
				CompanyOpttype = 1;	
				checkedRow = 0;
			}
		}


        deleteStation = function () {
    		var checkedItems =  $('#RFID_tab').datagrid('getSelections');
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
           				arrUpdate.push({INSPECTIONTEMPLATEID:item.INSPECTIONTEMPLATEID});
                     });
               		 if(arrUpdate.length>0){
         	          /*批量删除*/
                         var ajaxUpdate = {
                             url: '/iPlant_ajax',
                             dataType: 'JSON',
                             data: {
                                 list: arrUpdate,
                                 IFS: 'WMS_AQL00010'
                             },
                             successCallBack: function (data) {
                            	 deleteZ(arrUpdate);
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
               			showmessage.html('<font color=red>删除失败，此工单不是创建状态！</font>');
               		 }
               	}
            });      
    	},
        
    	deleteZ = function (arrUpdate) {
    		var ajaxDelete = {
    				url:'/iPlant_ajax',
                    data:{
                    	list:arrUpdate,
                        IFS:'WMS_AQL000101',
                    },
                    successCallBack:function(data){
                        
                    }
                } 
                iplantAjaxRequest(ajaxDelete);	
    	}
        
        dataArr={},
        
        getApplyOrder =function(){
            var workOrderData='';
            var ajaxParam={
                url:'/iPlant_ajax',
                data:{
                      IFS:'WMS_AQL000071',
                },
                successCallBack:function(data){
                    $('#hidd').val(data.RESPONSE[0].RESPONSE_DATA[0].NUMBE);
                }
            } 
            iplantAjaxRequest(ajaxParam); 
        }
        
		//置空查询输入框
		setQueryNull=function() {
			$('#configName').textbox('setValue',""),
			$('#fullMatching').prop('checked',false);
		},

		/*验证修改内容是否重复*/
        saveUpdateValidate = function() {
			var checkedItems = $('#RFID_tab').datagrid('getSelections');
			row = checkedItems[0];
			if (row.INSPECTIONTEMPLATEID) {
				if ($('#INSPECTIONTEMPLATENAME').textbox('getValue') != (row.INSPECTIONTEMPLATENAME==null?'':row.INSPECTIONTEMPLATENAME)
						|| $('#INSPECTIONTYPEID').combobox('getValue') != (row.INSPECTIONTYPEID==null?'':row.INSPECTIONTYPEID)
						|| $('#STATUS').combobox('getValue') != (row.STATUS==null?'':row.STATUS)
						|| $('#DESCRIPTION').textbox('getValue') != (row.DESCRIPTION==null?'':row.DESCRIPTION)) {
					return true;
				} else {
					return false;
				}
			}
		}

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
			} 
		
		savaStation = function() {
			var INSPECTIONTEMPLATEID= '';
			var IFServerNo = '';
			var reqData = [];
			if ($("#tabAddPro tbody tr").length == '0') {//判断检验项目
				$.messager.alert("提示", '请添加检验项目');
				return;
			}
		    if(CompanyOpttype == 0) {
				IFServerNo = 'WMS_AQL00009'
			} else if(CompanyOpttype == 1) {
				var row = $("#RFID_tab").datagrid("getSelected");
				INSPECTIONTEMPLATEID = row.INSPECTIONTEMPLATEID;
				var IdDel=[];
				IdDel.push({INSPECTIONTEMPLATEID:INSPECTIONTEMPLATEID})
				deleteZ(IdDel);
				IFServerNo = 'WMS_AQL00008'
			} else {
				IFServerNo = 'WMS_AQL00007'
			}
		   if(!checkSelect()) return;
		   if(!checkForm()) return; 
		   var INSPECTIONTEMPLATENAME=$('#INSPECTIONTEMPLATENAME').textbox("getValue");
		   var INSPECTIONTYPEID=$('#INSPECTIONTYPEID').combobox("getValue");
		   var STATUS=$('#STATUS').combobox("getValue");
		   var DESCRIPTION=$('#DESCRIPTION').textbox("getValue");
			var susMsg = '',
				errorMsg = '';
			var tr = $("#tabAddPro tbody tr");
			var IdZ =[];
			for(var i = 0;i < tr.length ;i++){
				var INSPECTION_SE = $(tr[i]).find('td').eq(0).text();
				var INSPECTIONTEMPLATEI;
				if(CompanyOpttype == 0) {
					INSPECTIONTEMPLATEI = Number($("#hidd").val())+1;
				}else {
					INSPECTIONTEMPLATEI = Number($("#hidd").val());
				}
				IdZ.push({INSPECTION_SEQ:INSPECTION_SE,INSPECTIONTEMPLATEID:INSPECTIONTEMPLATEI})
			}
			if(CompanyOpttype == 0) {
				susMsg = '添加成功';
				errorMsg = '添加失败,请联系管理员';
				insertZ(IdZ);
			} else {
				susMsg = '更新成功';
				errorMsg = '更新失败,请联系管理员';
				insertZ(IdZ);
			}
			var ajaxParam = {
				url: '/iPlant_ajax',
				dataType: 'JSON',
				data: {
					INSPECTIONTEMPLATEID:$("#hidd").val(),
					INSPECTIONTEMPLATENAME: INSPECTIONTEMPLATENAME,
					INSPECTIONTYPEID: INSPECTIONTYPEID,
					STATUS: STATUS,
					DESCRIPTION: DESCRIPTION,
					IFS: IFServerNo
				},
				successCallBack: function(data) {
					var susMsg=getReturnMsg(data);
                	$.messager.alert("提示",susMsg,"",function(){
            			reqGridData('/iPlant_ajax','RFID_tab',{IFS:'WMS_AQL00007'});
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
		
		AddPro = function(){
			var dgridOp = $('#RFID_tab').datagrid('options');
			if(!dgridOp) return;
			$("#tbo tr").remove();
			$("#enditTab1").dialog("open").dialog('setTitle', '添加检验项清单');
			var tabName = 'tabAddPro1';
			
			var reqDataA = {
					IFS: 'WMS_QC0005',
					pageIndex: 1,
					pageSize: dgridOp.pageSize
				}        
			dialogDataGrid('/iPlant_ajax', tabName, reqDataA);
			dialogEditorDataGrid = function(tabName,reqDataA, jsonData) {
				var gridLists = {
						name :tabName,
						dataType : 'json',
						columns : [[ 
								{field : 'ck',checkbox : true},
						      {field:'INSPECTION_NM',title: '供应商名称',width: 250,align: 'center',formatter: function (value) {if (value != null) return "<span title='" + value + "'>" + value + "</span>";}},
						 ]],
						 onDblClickRow: function(index,row){ 
							 
				         }
					}
				initEditorDataGridView(reqDataA, gridLists);
				$('#'+tabName).datagrid('loadData', jsonData);
			}	            
		}
		//--------------------------------------		
		savaStation1 = function(text){
			var dataS ;
			if(text != '' && text != null){//修改
				selectD(text);
				dataS = {
                	list:ArrayD,
                    IFS:'WMS_QC0005'
                }
			}else {
				$("#tabAddPro tbody tr").remove();
				var checkedItems =  $('#tabAddPro1').datagrid('getSelections');
	            if (checkedItems.length==0) {
	                $.messager.alert('提示', '请选择一条数据进行删除');
	                return;
	            }
	            var arrUpdate = [];
	            $.each(checkedItems, function (index, item) {
	            	//alert(item.INSPECTION_SEQ);
	            	InspId.push({INSPLEID:item.INSPECTION_SEQ});
	            });
			    dataS = {
                	list:InspId,
                    IFS:'WMS_QC0005'
                }
			}
			var ajaxSelect = {
					url: '/iPlant_ajax',
                    async:false,
                    data: dataS,
                    successCallBack: function (data) {
                    	//alert(data.RESPONSE[0].RESPONSE_DATA[0].INSPECTION_SEQ);
                    	var dataS = data.RESPONSE[0].RESPONSE_DATA;
                    	var htmls = '';
                    	for (var i=0;i<dataS.length;i++) {
                    		htmls += '<tr><td style="display:none">'+dataS[i].INSPECTION_SEQ+'</td>'+
                    					'<td class="Label4"  style="width: 50%">'+dataS[i].INSPECTION_NM+'</td>'+
                    					'<td class="Label4" style="width: 30%">'+
                    					'<img onclick="imgOnclick($(this))" class="easyui-linkbutton"  src="../../../../common/IplantCompent/themes/default/images/Folder.png"/></td>'+
                    					'<td class="Label4" style="width: 20%"><a style="color: blue;" onclick="deleP($(this).parent().parent().remove())" href="#" class="easyui-linkbutton" data-options="plain:true" >删除</a></td></tr>';
                    		
                    	}
                    	$("#tabAddPro tbody").append(htmls);
                    	//InspId = [];
                    }	
			}
			iplantAjaxRequest(ajaxSelect);
			$('#enditTab1').dialog('close')
			
		}
		
		imgOnclick = function (imgQ) {
			$("#enditTab2 tbody tr").remove();
			var INSPECTION_CD = imgQ.parent().parent().children("td").eq(0).text();
			$("#enditTab2").dialog("open").dialog('setTitle', '检查项明细');
			var ajaxSelect = {
					url:'/iPlant_ajax',
					async:false,
					data:{
						INSPECTION_CD:INSPECTION_CD,
                        IFS:'WMS_QC0014'
                    },
					successCallBack: function (data) {
						//alert(data.RESPONSE[0].RESPONSE_DATA[0].INSPECTION_NM+"——"+data.RESPONSE[0].RESPONSE_DATA[0].MO);
						var dataS = data.RESPONSE[0].RESPONSE_DATA;
						if (dataS.length == '0'){
							var html1 = '<tr style="background: #FFEC8B;height:26px"><td style="width: 10%"></td>'+
							'<td style="width: 45%;text-align:right;">暂无数据</td>'+
							'<td style="width: 45%"></td></tr>';
							$("#enditTab2 tbody").append(html1);
							return;
						}
						var html2 = '';
						for (var i=0;i<dataS.length;i++) {
							html2 += '<tr><td class="Label4" style="width: 10%">'+(i+1)+'</td>'+
							'<td class="Label4" style="width: 45%">'+(dataS[i].INSPECTION_NM==null?'':dataS[i].INSPECTION_NM)+'</td>'+
							'<td class="Label4" style="width: 45%">'+(dataS[i].MO==null?'':dataS[i].MO)+'</td></tr>';
						}
						$("#enditTab2 tbody").append(html2);
					}
			}
			iplantAjaxRequest(ajaxSelect);
			
		}
		
		deleP = function(){}
		
		insertZ = function (lis) {
			var ajaxInsert = {
					url:'/iPlant_ajax',
					data:{
                    	list:lis,
                        IFS:'WMS_AQL000091'
                    },
					successCallBack: function (data) {
					}
			}
			iplantAjaxRequest(ajaxInsert);
		}
		
		selectD = function (text) {
			var ajaxSelectD = {
					url:'/iPlant_ajax',
					async:false,
					data:{
						INSPECTIONTEMPLATEID:text,
                        IFS:'WMS_AQL000072'
                    },
					successCallBack: function (data) {
						var dataSo = data.RESPONSE[0].RESPONSE_DATA;
						//alert(data.RESPONSE[0].RESPONSE_DATA[0].INSPECTION_SEQ);
						for (var i=0;i<dataSo.length;i++) {
							ArrayD.push({INSPLEID:dataSo[i].INSPECTION_SEQ});
							InspId.push({INSPLEID:dataSo[i].INSPECTION_SEQ});
						}
					}
			}
			iplantAjaxRequest(ajaxSelectD);
		}
		
	};
	kanbanType.prototype = {
		init: function() {
			$(function() {
				ArrayD = [];
				InspId =[];
				var CompanyOpttype; //0：新增   1:编辑  
				var isid ='';
				var cong_id;
				var checkedRow;
				initGridData();	
				getSelectedMaintain('');   
		          
				
				$('#btnResets').click(function(){
		            setQueryNull();
		        });
				$('#bttSearch').click(function() {
					getDataBySearch();
				});				
				$('.add').click(function() {
					addStation();
				});
				$('#bttUpdate').click(function() {										
					updateStation();
				});
				$('.save').click(function() {
					savaStation();
				});
				$('#bttDelete').click(function(){
	                deleteStation();
	            });
				$('.close').click(function() {
					$('#enditTab').dialog('close');
				});
				$('.panel-tool-close').click(function() {
					setDataNull();
				});
				$('#AddPro').click(function() {
					AddPro();
				});
			});
		}
	}
	var fcfo = new kanbanType();
	fcfo.init();
})();