
(function() {
	function RankList() {	
		//初始化表格
		initGridData = function() {
			    var dgrid = $('#RFID_tab').datagrid('options');
				if(!dgrid) return;
				var reqData = {
					IFS: 'DMS_R0005',
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
						[{
								field: 'CONTAINER_NAME',
								title: '容器名称',
								width: 110,
								align: 'center',formatter: function (value) {
					           	if(value != null)
                                return "<span title='" + value + "'>" + value + "</span>";}
							},{
								field : 'CONTAINER_CODE',
								title : '容器编码',
								width : 80,
								align : 'center',formatter : function(value) {
								if(value != null)
		                        return "<span title='" + value + "'>" + value + "</span>";}	
							},{
								field : 'CONTAINER_TYPE',
								title : '容器类型',
								width : 80,
								align : 'center',formatter : function(value) {
									if(value == '1'){
										return "<span title='烘烤箱'>烘烤箱</span>";
									}else {
										return "<span title='保干箱'>保干箱</span>";
									}
								}
							},{
								field : 'MAXNUM',
								title : '最大装载数量',
								width : 80,
								align : 'center',formatter : function(value) {
								return "<span title='" + value + "'>" + value + "</span>";}
							},{
								field : 'ALREADYNUM',
								title : '已装载数量',
								width : 80,
								align : 'center',formatter : function(value) {
								return "<span title='" + value + "'>" + value + "</span>";}
							},{
								field : 'MAXLIMIT',
								title : '上限温度(℃)',
								width : 80,
								align : 'center',formatter : function(value) {
								var valu = returnFloat(value)
									if(valu == 'NaN.00'){
										return "<span title='0.00'>0.00</span>";
									}else{
										return "<span title='" + valu + "'>" + valu + "</span>";
									}
								}
							},{
								field : 'MINLIMIT',
								title : '下限温度(℃)',
								width : 80,
								align : 'center',formatter : function(value) {
								var valu = returnFloat(value)
									if(valu == 'NaN.00'){
										return "<span title='0.00'>0.00</span>";
									}else{
										return "<span title='" + valu + "'>" + valu + "</span>";
									}
								}
							},{
								field : 'REMARK',
								title : '描述',
								width : 120,
								align : 'center',formatter : function(value) {
								if(value != null)	
								return "<span title='" + value + "'>" + value + "</span>";}
							},{
								field: 'CRT_ID',
								title: '创建人',
								width: 100,
								align: 'center',formatter: function (value) {
					           	if(value != null)
                                return "<span title='" + value + "'>" + value + "</span>";}
							},{
								field: 'CRT_DT',
								title: '创建日期',
								width: 170,
								align: 'center',formatter: function (value) {
					           	if(value != null)
                                return "<span title='" + value + "'>" + value + "</span>";}
							},{
								field: 'UPT_ID',
								title: '修改人',
								width: 100,
								align: 'center',formatter: function (value) {
					           	if(value != null)
                                return "<span title='" + value + "'>" + value + "</span>";}
							},{
								field: 'UPT_DT',
								title: '修改日期',
								width: 170,
								align: 'center',formatter: function (value) {
					           	if(value != null)
                                return "<span title='" + value + "'>" + value + "</span>";}
							}
						]
					]
				}
				initGridView(reqData, gridList);
				$('#RFID_tab').datagrid('loadData', jsonData);
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
			
			/* 添加商品移动信息 */
			addStation = function() {
	        	CompanyOpttype = 0;
				$("#enditTab").dialog("open").dialog('setTitle', '新增容器列表');
				$("#fmStation").form("clear");
				$('#CONTAINER_TYPE').combobox('setValue', '1');
			}	
			
			
			setDataNull = function () {           
	             // $('#txtID').textbox('setValue','');              
	          }	

		getDataBySearch = function(){
				var dgrid = $('#RFID_tab').datagrid('options');
				if(!dgrid) return;
				var CONTAINER_CODE = $('#CONTAINER_CODE1').textbox('getValue');
				var CONTAINER_TYPE = $('#CONTAINER_TYPE1').combobox('getValue');
				var reqData = {
					CONTAINER_CODE: CONTAINER_CODE,
					CONTAINER_TYPE: CONTAINER_TYPE,
					IFS: 'DMS_R0005',
					pageIndex: 1,
					pageSize: dgrid.pageSize
				}
				reqGridData('/iPlant_ajax', 'RFID_tab',reqData);
			}
		/* 修改成品入库配置信息 */			
		updateStation = function() {
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
				$("#searchCondition").dialog("close");
				$("#enditTab").dialog("open").dialog('setTitle', '编辑MSD等级列表');
				$('#hid').val(row.CONTAINERLIST_ID);
				$('#CONTAINER_TYPE').combobox('setValue', row.CONTAINER_TYPE==null?'':row.CONTAINER_TYPE);
				$('#CONTAINER_NAME').textbox('setValue', row.CONTAINER_NAME==null?'':row.CONTAINER_NAME);
				$('#CONTAINER_CODE').textbox('setValue', row.CONTAINER_CODE==null?'':row.CONTAINER_CODE);
				$('#MAXNUM').textbox('setValue', row.MAXNUM==null?'':row.MAXNUM);
				$('#MAXLIMIT').textbox('setValue', row.MAXLIMIT==null?'':row.MAXLIMIT);
				$('#MINLIMIT').textbox('setValue', row.MINLIMIT==null?'':row.MINLIMIT);
				$('#REMARK').textbox('setValue', row.REMARK==null?'':row.REMARK);
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
           				arrUpdate.push({CONTAINERLIST_ID:item.CONTAINERLIST_ID});
                     });
               		 if(arrUpdate.length>0){
         	          /*批量删除*/
                         var ajaxUpdate = {
                             url: '/iPlant_ajax',
                             dataType: 'JSON',
                             data: {
                                 list: arrUpdate,
                                 IFS: 'DMS_R0008'
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
               			showmessage.html('<font color=red>删除失败，此工单不是创建状态！</font>');
               		 }
               	}
            });      
    	},
        
        dataArr={},
        
		//置空查询输入框
		setQueryNull=function() {
			$('#CONTAINER_CODE1').textbox('setValue',"");
		},

		/*验证修改内容是否重复*/
        saveUpdateValidate = function() {
			var checkedItems = $('#RFID_tab').datagrid('getSelections');
			row = checkedItems[0];
			if (row.CONTAINERLIST_ID) {
				if ($('#CONTAINER_TYPE').combobox('getValue') != (row.CONTAINER_TYPE==null?'':row.CONTAINER_TYPE)
						|| $('#CONTAINER_NAME').textbox('getValue') != (row.CONTAINER_NAME==null?'':row.CONTAINER_NAME)
						|| $('#CONTAINER_CODE').textbox('getValue') != (row.CONTAINER_CODE==null?'':row.CONTAINER_CODE)
						|| $('#MAXNUM').textbox('getValue') != (row.MAXNUM==null?'':row.MAXNUM)
						|| $('#MAXLIMIT').textbox('getValue') != (row.MAXLIMIT==null?'':row.MAXLIMIT)
						|| $('#MINLIMIT').textbox('getValue') != (row.MINLIMIT==null?'':row.MINLIMIT)
						|| $('#REMARK').textbox('getValue') != (row.REMARK==null?'':row.REMARK)) {
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
				//var hid = $(this).is(":hidden");
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
			var IFServerNo = '';
			var IFSValue = '';
			var reqData = [];
			var CONTAINERLIST_ID;
		    if(CompanyOpttype == 0) {
				IFServerNo = 'DMS_R0006';
			} else if(CompanyOpttype == 1) {
				if (!saveUpdateValidate()) {
					$.messager.alert("提示", '内容没有更新，请修改')
					return false;
				}
				CONTAINERLIST_ID= $("#hid").val();
				IFServerNo = 'DMS_R0007';
			} else {
				IFServerNo = 'DMS_R0005'
			}
		    
		    var CONTAINER_TYPE=$('#CONTAINER_TYPE').combobox("getValue");
		    var CONTAINER_NAME=$('#CONTAINER_NAME').textbox("getValue");
		    var CONTAINER_CODE=$('#CONTAINER_CODE').textbox("getValue");
		    var MAXNUM=$('#MAXNUM').textbox("getValue");
		    var MAXLIMIT=$('#MAXLIMIT').textbox("getValue");
		    var MINLIMIT=$('#MINLIMIT').textbox("getValue");
		    var REMARK=$('#REMARK').textbox("getValue");
		    
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
					CONTAINERLIST_ID:CONTAINERLIST_ID, 
					CONTAINER_TYPE: CONTAINER_TYPE,
					CONTAINER_NAME: CONTAINER_NAME,
					CONTAINER_CODE: CONTAINER_CODE,
					MAXNUM: MAXNUM,
					MAXLIMIT: MAXLIMIT,
					REMARK: REMARK,
					MINLIMIT: MINLIMIT,
					IFS: IFServerNo
				},
				successCallBack: function(data) {
					var susMsg=getReturnMsg(data);
                	$.messager.alert("提示",susMsg,"",function(){
            			reqGridData('/iPlant_ajax','RFID_tab',{IFS:'DMS_R0005'});
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
		
		returnFloat = function(value1){
			 var value=Math.round(parseFloat(value1)*100)/100;
			 var xsd=value.toString().split(".");
			 if(xsd.length==1){
				 value=value.toString()+".00";
				 return value;
			 }
			 if(xsd.length>1){
				 if(xsd[1].length<2){
					 value=value.toString()+"0";
				 }
			 	return value;
			 }
		}
	};
	RankList.prototype = {
		init: function() {
			$(function() {	
				var CompanyOpttype; //0：新增   1:编辑  
				var isid ='';
				var cong_id;
				var checkedRow;
		         
				initGridData();	
				
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
				
				$("#CONTAINER_TYPE").combobox({
					onChange: function (n,o) {
						if(n=='0'){
							$("#MAXLIMIT").prop("required", false);
							$("#MINLIMIT").prop("required", false);
							$("#tr1").hide();
							$("#tr2").hide();
						}else{
							$("#MAXLIMIT").prop("required", true);
							$("#MINLIMIT").prop("required", true);
							$("#tr1").show();
							$("#tr2").show();
						}
					}
				});
			});
		}
	}
	var fcfo = new RankList();
	fcfo.init();
})();