/* 启动时加载 */
/*
 */
(function() {
	function factoryInfo() {
		initGridData = function() {
			var dgrid = dataGrid.datagrid('options');
			if(!dgrid) return;
			var RFID = $('#searchRFID').textbox('getValue');
			var TP_CD = $('#searchTP_BM').textbox('getValue');
			var reqData = {
				IFS: 'S0000016',
				TP_CD:TP_CD,
				RFID:RFID,
				pageIndex: 1,
				pageSize: dgrid.pageSize
			}
			reqGridData('/iPlant_ajax', 'trayInformationMaintenance_tab', reqData);
		},
		bindGridData = function(reqData, jsonData) {
			var grid = {
					name : 'trayInformationMaintenance_tab',
					dataType : 'json',
					singleSelect:false,
					columns : [ [
					{
						field : "CZ",
						width : 10,
						checkbox : true
					},
					{
						field : 'RFID',
						title : 'RFID号<span style="color:red">*</span>',
						width : 100,
						align : 'center',
						editor : {
							type : 'text',
							options : {
								
							}
						}
					}, {
						field : 'TP_CD',
						title : '托盘编码<span style="color:red">*</span>',
						width : 150,
						align : 'center',
						editor : {
							type : 'text',
							options : {
								
							}
						}
					}, {
						field : 'TP_NM',
						title : '托盘名称<span style="color:red">*</span>',
						width : 150,
						align : 'center',
						editor : {
							type : 'text',
							options : {
								
							}
						}
					}, {
						field : 'TPTM',
						title : '托盘条码<span style="color:red">*</span>',
						width : 150,
						align : 'center',
						editor : {
							type : 'text',
							options : {
								
							}
						}
					},
					{
						field: 'SFQY',
						title: '是否启用',
						width: 80,
						align: 'center',
						fomatter: function(value){
							if(value=="Y"){
								return "是";
							}else{
								return "否";
							}
						},
						editor:{type:'checkbox',options:{on: 'Y',off: 'N'}}
					},  
					{
						field : 'BZ',
						title : '备注',
						width : 250,
						align : 'center',
						editor : {
							type : "text",
							options : {
								
							}
						}
					}, {
						field : 'CRT_ID',
						title : '创建人',
						width : 100,
						align : 'center'
					}, {
						field : 'CRT_DT',
						title : '创建时间',
						width : 200,
						align : 'center'
					}, {
						field : 'UPT_ID',
						title : '修改人',
						width : 100,
						align : 'center'
					}, {
						field : 'UPT_DT',
						title : '修改时间',
						width : 200,
						align : 'center'
					} ] ],
					onClickRow : function(index, row) {
						$('#trayInformationMaintenance_tab').datagrid("beginEdit", index);
						if(row.CRT_ID !="" && row.CRT_ID !=null){
							var target = $('#trayInformationMaintenance_tab').datagrid('getEditor', {'index':index,'field':'RFID'}).target;
							target.textbox({editable:false});
						}
					},
					onBeforeEdit : function(index, row) {
						$("#showMessageInfo").html('');
					},
					/** 编辑模式进入之后的操作 */
					onAfterEdit : function(index, row) {
						/** 判断是否进行数据变更 */
						row.edited = true;
					}
				}
				initGridView(reqData, grid);
				$('#trayInformationMaintenance_tab').datagrid('loadData', jsonData);
		},
		
		/*是否打印弹出打印预览页面*/
		openPrintPreview = function(FD_LB,FD_CD,FD_NM,FD_TY,FD_ST,CRT_DT,CRITE_NUM,USE_NUM){
			$("#PrintPreview_openDiv").dialog("open").dialog('setTitle', '打印预览页面');
	
			$("#FD_LB").textbox('setValue',FD_LB);
			$("#FD_CD").textbox('setValue',FD_CD);
			$("#FD_NM").textbox('setValue',FD_NM);
			$("#FD_TY").textbox('setValue',FD_TY);
			$("#FD_ST").textbox('setValue',FD_ST);
			$("#CRITE_NUM").textbox('setValue',CRITE_NUM);
			$("#USE_NUM").textbox('setValue',USE_NUM);
			$("#txtCRT_ID").textbox('setValue',CRT_ID);
			$("#txtCurrentCount").textbox('setValue',1);
			
			
		}
		
		/**
		 * 打印SN
		 * 
		 * @param dgrid
		 */
		saveMesSNcode = function(){
			
			var post = $("#trayInformationMaintenance_tab").datagrid('getSelections');
			var postLenght = post.length;
			
			var data1=new Array();
			var barCodeList="";
			for (var i=0;i<postLenght;i++){			
	        		data1.push({"SN":post[i].FD_LB,"FSNM":"飞达编码","FDSN":post[i].FD_CD,"FNNM":"飞达名称","FDNM":post[i].FD_NM,"TITLE":"飞达标签打印"});
            };
            barCodeStr = {labName:"common01.lab","barCodeList":data1};
    		zbSocketPrinter(barCodeStr);
    		console.log(barCodeStr)
			$('#PrintPreview_openDiv').dialog('close');
			$.messager.alert("提示", '条码打印完成！');
			initGridData();	
		}
		
		/*检索*/
	   searchDataGrid=function(dgrid){
			initGridData();
		},
		
		setDataNull=function(){
			 $('#showFileName').html('');
		},
		
		/*导入*/
		OpenImprotFramedr = function(){
			$("#enditTabupload").dialog("open").dialog('setTitle', '工序定义导入');
		}
		
		deleteDataGrid = function () {
			var checkedItems = $('#trayInformationMaintenance_tab').datagrid('getSelections');
	        if (checkedItems.length==0) {
	            $.messager.alert('提示', '请选择一条数据进行删除');
	            return;
	        }
	        /*确认提示框*/
	        var delCnt=0,arrUpdate = new Array();;
	        $.messager.confirm('确认框', '您确定要删除您所选择的数据吗?', function (r) {
	           	if(r==true){
	           		 $.each(checkedItems, function (index, item) {
	           			 arrUpdate.push({RFID:item.RFID,RFID:item.RFID});
	                 });
	           		 
	           		 if(arrUpdate.length>0){
	     	           	/*批量删除*/
	                     var ajaxUpdate = {
	                         url: '/iPlant_ajax',
	                         dataType: 'JSON',
	                         data: {
	                             list: arrUpdate,
	                             IFS: 'S0000019'
	                         },
	                         successCallBack: function (data) {
	                         	showmessage.html('<font color=red>删除成功！</font>');
	                         	initGridData();
	                             return;
	                         },
	                         errorCallBack: function (data) {
	                         	showmessage.html('<font color=red>删除失败！</font>');
	                             return;
	                         }
	                     };
	                     iplantAjaxRequest(ajaxUpdate);

	           		 }
	           	}
	        });      
		},
		eeEndEdit = function(str){
			var rows = $('#'+str).datagrid('getRows');
			if(rows.length>0){
				for(var i=0; i<rows.length; i++){
					$('#'+str).datagrid('endEdit',i);
				}
			}
		}
	}
	factoryInfo.prototype = {
		init: function() {
			$(function() {
				/*初始化全局变量对象*/
				dataGrid = $('#trayInformationMaintenance_tab'),
				dataMaterielType=[],
				dataWorkshop=[],
				dataBOM=[],
				dataCompany=[],
				dataMaterielType=[],
				dataTmp=[],
				dataFactory=[],
				showmessage=$('#showMessageInfo'),
				editIndex = undefined,
				oldRow=undefined, 
				reg=new RegExp("null","g");
				initGridData();
				$('#btnSearch').click(function() {	
					var dgrid = dataGrid.datagrid('options');
					searchDataGrid(dgrid);
				});
				
				$('#btnAdd').click(function() {
//					eeEndEdit('trayInformationMaintenance_tab');
					$('#trayInformationMaintenance_tab').datagrid('insertRow',{
						index: 0,	// 索引从0开始
						row: { }
					});
					$('#trayInformationMaintenance_tab').datagrid("beginEdit", 0);
				});
				
				$('#btnDelete').click(function(){
					deleteDataGrid();
	            });
				
				$('#btnSave').click(function() {
					saveDataGrid('trayInformationMaintenance_tab','S0000017','S0000018','showMessageInfo');
				});
				
				$('#btnImport').click(function() {						/*导入*/
					OpenImprotFramedr();
				});
				 $('#btnExprt').click(function(){						/*导出*/
					 	var now = new Date();
	                    var year =now.getFullYear();
	                	var reqData = {
	                			IFS:'ST00021'
	                	}
	                	createTable('tbIMESReport','飞达信息维护导出','trayInformationMaintenance_tab',reqData);
	                });
				
				 $('#btnPrint').click(function(){
						var post = $("#trayInformationMaintenance_tab").datagrid('getSelections');
						if(post == null || post == ''){
							$.messager.alert('提示', '请选择一条数据进行打印');
						}else{
							var FD_LB,FD_CD,FD_NM,FD_TY,FD_ST,CRT_DT,CRITE_NUM,USE_NUM;
							FD_LB = post[0].FD_LB;
							FD_CD = post[0].FD_CD;
							FD_NM = post[0].FD_NM;
							FD_TY = post[0].FD_TY;
							FD_ST = post[0].FD_ST;
							CRT_ID = post[0].CRT_ID;
							CRITE_NUM = post[0].CRITE_NUM;USE_NUM = post[0].USE_NUM;
							openPrintPreview(FD_LB,FD_CD,FD_NM,FD_TY,FD_ST,CRT_DT,CRITE_NUM,USE_NUM);
						}
					})
			});
		}
	}
	var fcfo = new factoryInfo();
	fcfo.init();
})();