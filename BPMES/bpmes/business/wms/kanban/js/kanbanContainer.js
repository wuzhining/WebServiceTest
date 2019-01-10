
(function() {
	function kanbanContainer() {		
		//初始化表格
		initGridData = function() {
			    var dgrid = $('#RFID_tab').datagrid('options');
				if(!dgrid) return;
				var reqData = {
					IFS: 'WMS_K40001',
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
								field: 'CONTAINER_NAME',
								title: '容器名称',
								width: 150,
								align: 'center',formatter: function (value) {
					           	if(value != null)
                                return "<span title='" + value + "'>" + value + "</span>";}
							},{
								field : 'LAYOUTTYPE',
								title : '类型信息',
								width : 150,
								align : 'center',formatter : function(value) {
								return "<span title='" + value + "'>" + value + "</span>";}
							},{
								field: 'REMARK',
								title: '描述/备注信息',
								width: 150,
								align: 'center',formatter: function (value) {
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
			
			//子页面在父页面中打开tab
			iframe = function(title,content){
				parent.$("#tabs").tabs('add',{
			        title:title,
			        content:content,
			        closable:true
			    });	
			}
			
			/* 添加商品移动信息 */
			addStation = function() {
				var content = '<iframe scrolling="auto" frameborder="0"  src="business/wms/kanban/kanbanContainerEdit.html" style="width:100%;height:100%;"></iframe>';
				iframe('新增容器',content);	
			}	
			
			
			setDataNull = function () {           
	             // $('#txtID').textbox('setValue','');              
	          }	

		getDataBySearch = function(){
				var dgrid = $('#RFID_tab').datagrid('options');
				if(!dgrid) return;
				var configName = $('#configName').val();
				var checkeds = $('#fullMatching').prop('checked');
				var reqData = {
					CONTAINER_NAME: configName,
					CK:checkeds,
					IFS: 'WMS_K40001',
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
				$('#numbe').textbox('setValue', row.NUMBE==null?'':row.NUMBE);
				$('#config_Desc').textbox('setValue', row.TYPE_CHINA==null?'':row.TYPE_CHINA);
				$('#remarks').textbox('setValue', row.TYPE_ENGLISH==null?'':row.TYPE_ENGLISH);
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
           				arrUpdate.push({TYPE_ID:item.TYPE_ID});
                     });
               		 if(arrUpdate.length>0){
         	          /*批量删除*/
                         var ajaxUpdate = {
                             url: '/iPlant_ajax',
                             dataType: 'JSON',
                             data: {
                                 list: arrUpdate,
                                 IFS: 'WMS_K40003'
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
				if ($('#config_Desc').textbox('getValue') != (row.TYPE_CHINA==null?'':row.TYPE_CHINA)
						|| $('#numbe').textbox('getValue') != (row.NUMBE==null?'':row.NUMBE)
						|| $('#remarks').textbox('getValue') != (row.TYPE_ENGLISH==null?'':row.TYPE_ENGLISH)) {
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
				IFServerNo = 'WMS_K40002'
				isid = 'CONFIG_ID_SEQ.NextVal';
			} else if(CompanyOpttype == 1) {
				if (!saveUpdateValidate()) {
					$.messager.alert("提示", '内容没有更新，请修改')
					return false;
				}
				IFServerNo = 'WMS_K40004'
				var checkedItems = $('#RFID_tab').datagrid('getSelections');
				row = checkedItems[0];
				isid = row.TYPE_ID;
			} else {
				IFServerNo = 'WMS_K40001'
			}
		   var typeChina=$('#config_Desc').textbox("getValue");
		   var typeEnglish=$('#remarks').textbox("getValue");
		   var numbe=$('#numbe').textbox("getValue");
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
					ID:isid, 
					CONFIGURATION_NAME: typeChina,
					CONFIGURATION_DESC: typeEnglish,
					NUMBE: numbe,
					IFS: IFServerNo
				},
				successCallBack: function(data) {
					var susMsg=getReturnMsg(data);
                	$.messager.alert("提示",susMsg,"",function(){
            			reqGridData('/iPlant_ajax','RFID_tab',{IFS:'WMS_K40001'});
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
	kanbanContainer.prototype = {
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
	var fcfo = new kanbanContainer();
	fcfo.init();
})();