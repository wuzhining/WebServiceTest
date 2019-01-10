
(function() {
	function RankList() {	
		//初始化表格
		initGridData = function() {
			    var dgrid = $('#RFID_tab').datagrid('options');
				if(!dgrid) return;
				var reqData = {
					IFS: 'DMS_R0001',
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
								field: 'HUM_GRADE',
								title: '湿度等级',
								width: 110,
								align: 'center',formatter: function (value) {
					           	if(value != null)
                                return "<span title='" + value + "'>" + value + "</span>";}
							},{
								field : 'ISENCAP',
								title : '系统内置',
								width : 80,
								align : 'center',formatter : function(value) {
									if(value == '1'){
										return "<span title='是'>是</span>";
									}else {
										return "<span title='否'>否</span>";
									}
								}
							},{
								field : 'TOTALEXPOSEMINUTE',
								title : '暴露时长(小时)',
								width : 110,
								align : 'center',formatter : function(value) {
								return "<span title='" + value + "'>" + value + "</span>";}
							},{
								field : 'ENCAPSTAUTS',
								title : '烘烤次数',
								width : 110,
								align : 'center',formatter : function(value) {
								return "<span title='" + value + "'>" + value + "</span>";}
							},{
								field : 'STORAGE_TIME',
								title : '存储期限(月)',
								width : 120,
								align : 'center',formatter : function(value) {
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
								width: 200,
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
								width: 200,
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
				$("#enditTab").dialog("open").dialog('setTitle', '新增等级列表');
				$("#fmStation").form("clear");
				$('#TOTALEXPOSEMINUTE').textbox('setValue','0');
				$('#ENCAPSTAUTS').textbox('setValue','0');
				$('#STORAGE_TIME').textbox('setValue','0');
			}	
			
			
			setDataNull = function () {           
	             // $('#txtID').textbox('setValue','');              
	          }	

		getDataBySearch = function(){
				var dgrid = $('#RFID_tab').datagrid('options');
				if(!dgrid) return;
				var HUM_GRADE = $('#HUM_GRADE1').val();
				var reqData = {
					HUM_GRADE: HUM_GRADE,
					IFS: 'DMS_R0001',
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
				$('#hid').val(row.EID);
				$('#HUM_GRADE').textbox('setValue', row.HUM_GRADE==null?'':row.HUM_GRADE);
				$('#TOTALEXPOSEMINUTE').textbox('setValue', row.TOTALEXPOSEMINUTE==null?'':row.TOTALEXPOSEMINUTE);
				$('#ENCAPSTAUTS').textbox('setValue', row.ENCAPSTAUTS==null?'':row.ENCAPSTAUTS);
				$('#STORAGE_TIME').textbox('setValue', row.STORAGE_TIME==null?'':row.STORAGE_TIME);
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
           				arrUpdate.push({EID:item.EID});
                     });
               		 if(arrUpdate.length>0){
         	          /*批量删除*/
                         var ajaxUpdate = {
                             url: '/iPlant_ajax',
                             dataType: 'JSON',
                             data: {
                                 list: arrUpdate,
                                 IFS: 'DMS_R0004'
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
			$('#HUM_GRADE1').textbox('setValue',""),
			$('#fullMatching').prop('checked',false);
		},

		/*验证修改内容是否重复*/
        saveUpdateValidate = function() {
			var checkedItems = $('#RFID_tab').datagrid('getSelections');
			row = checkedItems[0];
			if (row.EID) {
				if ($('#HUM_GRADE').textbox('getValue') != (row.HUM_GRADE==null?'':row.HUM_GRADE)
						|| $('#TOTALEXPOSEMINUTE').textbox('getValue') != (row.TOTALEXPOSEMINUTE==null?'':row.TOTALEXPOSEMINUTE)
						|| $('#ENCAPSTAUTS').textbox('getValue') != (row.ENCAPSTAUTS==null?'':row.ENCAPSTAUTS)
						|| $('#STORAGE_TIME').textbox('getValue') != (row.STORAGE_TIME==null?'':row.STORAGE_TIME)) {
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
			var IFServerNo = '';
			var IFSValue = '';
			var reqData = [];
			var EID;
		    if(CompanyOpttype == 0) {
				IFServerNo = 'DMS_R0002';
			} else if(CompanyOpttype == 1) {
				if (!saveUpdateValidate()) {
					$.messager.alert("提示", '内容没有更新，请修改')
					return false;
				}
				EID= $("#hid").val();
				IFServerNo = 'DMS_R0003';
			} else {
				IFServerNo = 'DMS_R0001'
			}
		    
		    var HUM_GRADE=$('#HUM_GRADE').textbox("getValue");
		    var TOTALEXPOSEMINUTE=$('#TOTALEXPOSEMINUTE').textbox("getValue");
		    var ENCAPSTAUTS=$('#ENCAPSTAUTS').textbox("getValue");
		    var STORAGE_TIME=$('#STORAGE_TIME').textbox("getValue");
		    
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
					EID:EID, 
					HUM_GRADE: HUM_GRADE,
					TOTALEXPOSEMINUTE: TOTALEXPOSEMINUTE,
					ENCAPSTAUTS: ENCAPSTAUTS,
					STORAGE_TIME: STORAGE_TIME,
					IFS: IFServerNo
				},
				successCallBack: function(data) {
					var susMsg=getReturnMsg(data);
                	$.messager.alert("提示",susMsg,"",function(){
            			reqGridData('/iPlant_ajax','RFID_tab',{IFS:'DMS_R0001'});
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
			});
		}
	}
	var fcfo = new RankList();
	fcfo.init();
})();