
(function() {
	function kanbanType() {	
		getSelectedMaintain = function(){
			iplantAjaxRequest({
				url :'/iPlant_ajax',
				data :{
					IFS : 'WMS_K10001'
				},
				successCallBack : function(data){
					var array = new Array();
					array.push({
						"id" : "",
						"text" : "全部"
					});
					var rowCollection = createSourceObj(data);
					for (var i = 0; i< rowCollection.length;i++){
						array.push({
							"id" : rowCollection[i].TYPE_ID,
							"text" : rowCollection[i].TYPE_CHINA
						});
					}
					
					//绑定看板类型下拉框
					$('#kanbanType').combobox({
						data : array,
						valueField : 'id',
						textField : 'text'
					});
				}
			})
		}

					
		//初始化表格
		initGridData = function() {
			    var dgrid = $('#RFID_tab').datagrid('options');
				if(!dgrid) return;
				var reqData = {
					IFS: 'WMS_K20001',
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
								field: 'CHINA_NAME',
								title: '看板名称(中文)',
								width: 150,
								align: 'center',formatter: function (value) {
					           	if(value != null)
                                return "<span title='" + value + "'>" + value + "</span>";}
							},{
								field : 'ENGLISH_NAME',
								title : '看板名称(英文)',
								width : 150,
								align : 'center',formatter : function(value) {
								return "<span title='" + value + "'>" + value + "</span>";}
							},{
								field : 'TYPEID',
								title : '看板类型',
								width : 250,
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
								field: 'CREATE_DATE',
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
								field: 'UPDATE_DATE',
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
	        	CompanyOpttype = 0;
	        	getApplyOrder();
				$("#enditTab").dialog("open").dialog('setTitle', '成品入库配置信息添加');
				$("#fmStation").form("clear");			
			}	
			
			
			setDataNull = function () {           
	             // $('#txtID').textbox('setValue','');              
	          }	
			
			getApplyOrder =function(){
	            var workOrderData='';
	            var ajaxParam={
	                url:'/iPlant_ajax',
	                data:{
	                      IFS:'WMS_K20005',
	                },
	                successCallBack:function(data){
	                    var rowNum=0
	                    if(data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS){
	                        rowNum=parseInt(data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS);
	                        workOrderData=data.RESPONSE["0"].RESPONSE_DATA[0];
	                    }
	                    $('#numbe').textbox('setValue',workOrderData.NUMBE).textbox('readonly').textbox({ required: true });                                                                         
	                }
	            } 
	            iplantAjaxRequest(ajaxParam); 
	        }

		getDataBySearch = function(){
				var dgrid = $('#RFID_tab').datagrid('options');
				if(!dgrid) return;
				var configName = $('#configName').val();
				var checkeds = $('#fullMatching').prop('checked');
				var typeid = $('#kanbanType').combobox('getValue');
				var reqData = {
					CONFIGURATION_NAME: configName,
					kanbanType:typeid,
					CK:checkeds,
					IFS: 'WMS_K20001',
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
				$("#enditTab").dialog("open").dialog('setTitle', '编辑修改成品入库配置信息');
				$('#config_Desc').textbox('setValue', row.CHINA_NAME==null?'':row.CHINA_NAME);
				$('#remarks').textbox('setValue', row.ENGLISH_NAME==null?'':row.ENGLISH_NAME);
				$('#describe').textbox('setValue', row.DESCRIBE==null?'':row.DESCRIBE);
				$('#numbe').textbox('setValue', row.NUMBE==null?'':row.NUMBE).textbox('readonly').textbox({ required: true });
				$('#type_id').combobox('setValue', row.TYPE_ID==null?'':row.TYPE_ID);
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
            $.messager.confirm('确认框', '您确定要删除您所选择的'+checkedItems.length+'条数据吗?', function (r) {
               	if(r==true){
               		var tmp='';
               		 $.each(checkedItems, function (index, item) {
           				arrUpdate.push({MAINTAIN_ID:item.MAINTAIN_ID});
                     });
               		 if(arrUpdate.length>0){
         	          /*批量删除*/
                         var ajaxUpdate = {
                             url: '/iPlant_ajax',
                             dataType: 'JSON',
                             data: {
                                 list: arrUpdate,
                                 IFS: 'WMS_K20003'
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
			$('#configName').textbox('setValue',""),
			$('#fullMatching').prop('checked',false);
		},

		/*验证修改内容是否重复*/
        saveUpdateValidate = function() {
			var checkedItems = $('#RFID_tab').datagrid('getSelections');
			row = checkedItems[0];
			if (row.TYPE_ID) {
				if ($('#config_Desc').textbox('getValue') != (row.CHINA_NAME==null?'':row.CHINA_NAME)
						|| $('#remarks').textbox('getValue') != (row.ENGLISH_NAME==null?'':row.ENGLISH_NAME)
						|| $('#describe').textbox('getValue') != (row.DESCRIBE==null?'':row.DESCRIBE)
						|| $('#numbe').textbox('getValue') != (row.NUMBE==null?'':row.NUMBE)
						|| $('#type_id').combobox('getValue') != (row.TYPE_ID==null?'':row.TYPE_ID)) {
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
			var reqData = [];
		    if(CompanyOpttype == 0) {
				IFServerNo = 'WMS_K20002'
			} else if(CompanyOpttype == 1) {
				if (!saveUpdateValidate()) {
					$.messager.alert("提示", '内容没有更新，请修改')
					return false;
				}
				IFServerNo = 'WMS_K20004'
			} else {
				IFServerNo = 'WMS_K20001'
			}
		   var china=$('#config_Desc').textbox("getValue");
		   var english=$('#remarks').textbox("getValue");
		   var numbe=$('#numbe').textbox("getValue");
		   var describe=$('#describe').textbox("getValue");
		   var typeid=$('#type_id').combobox("getValue");
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
					ID:$('#numbe').val(), 
					CHINA_NAME: china,
					ENGLISH_NAME: english,
					NUMBE: numbe,
					DESCRIBE: describe,
					TYPE_ID: typeid,
					IFS: IFServerNo
				},
				successCallBack: function(data) {
					var susMsg=getReturnMsg(data);
                	$.messager.alert("提示",susMsg,"",function(){
            			reqGridData('/iPlant_ajax','RFID_tab',{IFS:'WMS_K20001'});
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
	kanbanType.prototype = {
		init: function() {
			$(function() {	
				
				//看板类型
				iplantAjaxRequest( {
	    			url: '/iPlant_ajax',
	    			data: {IFS:'WMS_K10001'},
	    			successCallBack: function (data) {
	    				var rowCollection = createSourceObj(data);
	    				for (var i = 0; i< rowCollection.length;i++){
	    					warhouseType.push({
								"id" : rowCollection[i].TYPE_ID,
								"text" : rowCollection[i].TYPE_CHINA
							});
						}
	    				
	    				$('#type_id').combobox({
							data : warhouseType,
							valueField : 'id',
							textField : 'text'
						});
	    			}
	    		});
				
				var CompanyOpttype; //0：新增   1:编辑  
				var isid ='';
				var cong_id;
				var checkedRow;
				initGridData();	
				getSelectedMaintain();  
		          
				
				$('#btnResets').click(function(){
		            setQueryNull();
		        });
				$('#bttSearch').click(function() {
					getDataBySearch();
				});				
				$('.add').click(function() {
					//insertDataGrid('RFID_tab',{CONFIG_ID:autoCreateCode('Cfg')});
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
	var fcfo = new kanbanType();
	var warhouseType=[];
	fcfo.init();
})();