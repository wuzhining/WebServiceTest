(function() {
	function InventoryPlan() {
		initGridData = function() {
			var dgrid = dataGrid.datagrid('options');
			if(!dgrid) return;
			searchDataGrid(dgrid);
		},
		bindGridData = function(reqData, jsonData) {
			var gridList = {
				name: 'InventoryPlan_tab',
				dataType: 'json',
				singleSelect:true,
				columns: [[
					{field: 'INVENTORY_ID',title: '盘点计划ID',width: 200,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" +  value + "'>" +  value + "</span>";}},      
					{field: 'INVENTORY_TYPE_NM',title: '盘点类型',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
				    {field: 'INVENTORY_STORE_NAME',title: '盘点仓库',width: 120,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
				    {field: 'BEGIN_DATE',title: '开始日期',width: 250,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
				    {field: 'END_DATE',title: '计划结束日期',width: 250,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},	   
				    //{field: 'INVENTORY_CYCLE',title: '盘点周期',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
					{field: 'CRT_NM',title: '创建人',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
					{field: 'CRT_DT',title: '创建时间',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}
				]],
				onClickRow: function (index,row) {
		        },
			}
			initGridView(reqData, gridList);
			dataGrid.datagrid({"onLoadSuccess":function(data){
			    $(this).datagrid('selectRow',0);
			}}).datagrid('loadData', jsonData);
		},
		setQueryNull=function() {//置空查询输入框
			$('#InventoryPlanNo').textbox('setValue',""),
	    	$('#qStore').combobox('setValue',""),
	    	$('#qProDtBegin').datebox('setValue',""),
	    	$('#qProDtEnd').datebox('setValue',"");
	    },
		searchDataGrid=function(dgrid){/*查询*/
	    	var InventoryPlanNo = $('#InventoryPlanNo').textbox('getValue'),qStore = $('#qStore').combobox('getValue'),qProDtBegin =$('#qProDtBegin').datebox('getValue'),qProDtEnd =$('#qProDtEnd').datebox('getValue');
	    	if(InventoryPlanNo=="N/A"){
	    		InventoryPlanNo = "";
		    }
	    	var reqData = {
	    		InventoryPlanNo: InventoryPlanNo,
		    	qStore: qStore,
		    	qProDtBegin: qProDtBegin,
		        qProDtEnd: qProDtEnd,
		        pageIndex:dgrid.pageNumber,
                pageSize:dgrid.pageSize,
		        IFS:'WMS_ITD00008'
			}
			reqGridData('/iPlant_ajax', 'InventoryPlan_tab', reqData);
		},
		selectStore = function(){//初始化仓库信息
	    	var reqStore = {
	            url: "/iPlant_ajax",
	            dataType: "JSON",
	            data: {IFS: "WMS_B00030",storeType:'WSTORE-01'},
	            successCallBack: function(a) {
	            	dataStore = [];
	            	dataStore.push({"value":"","text":"全部"});
	            	var op = a.RESPONSE[0].RESPONSE_DATA;
	                $.each(op,function(n,obj) {
	                	dataStore.push({'value':obj.STORE_ID,'text':obj.STORE_NAME});
				    }); 
	                var qStore = $("#qStore");
	                qStore.combobox('loadData',dataStore);
	                if(dataStore.length>7){
	                	qStore.combobox({panelHeight:200});;
					}else{
						qStore.combobox({panelHeight:'auto'});;
					}
	                if(dataStore.length>0){
	                	qStore.combobox('select',dataStore[0].value);
	                }
	            },
	            errorCallBack: function() {
	            	commonShowMessage("提示：请联系管理员，查询失败！");
	            }
	        };
		    iplantAjaxRequest(reqStore);
		}
	    //查询盘点任务编号
		getInventoryPlanId =function(){
	        var workOrderData='';
	        var ajaxParam={
	            url:'/iPlant_ajax',
	            data:{
	                  IFS:'WMS_ITD00010',
	            },
	            successCallBack:function(data){
	                var rowNum=0;
	                if(data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS){
	                    rowNum=parseInt(data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS);
	                    workOrderData=data.RESPONSE["0"].RESPONSE_DATA[0];
	                }
	                $('#INVENTORY_ID').textbox('setValue',workOrderData.INVPLAN_NO).textbox('readonly'); 
	            }
	        } 
	        iplantAjaxRequest(ajaxParam); 
	    }
		
		
	    //清空新增弹出框表格
		setDataNull = function () {
			$('#enditTab').dialog('close');
			$('#INVENTORY_TYPE').combobox('setValue','');   
	        $('#INVENTORY_STORE').combobox('setValue','');     
	        $('#StartDATE').datebox('setValue','');
	        $('#EndDATE').datebox('setValue','');
	    }
		
	    //清空外部表格
		setNull = function () {           
	        $('#InventoryPlanNo').textbox('setValue','');     
	        $('#qProDtBegin').datebox('setValue','');
	        $('#qProDtEnd').datebox('setValue','');
	        $('#qStore').combobox('setValue',"");
	    }
	    deleteInvPlan = function(){//删除
       		var isSelectedData = validSelectedData('InventoryPlan_tab', 'Delete');
            if (!isSelectedData) {
            	commonShowMessage('提示', '请选择一条数据进行删除');
                return;
            }
            var selectData =$('#InventoryPlan_tab').datagrid('getSelected');
       	 	$.messager.confirm('确认框', '您确定要删除您所选择的数据?', function (r) {
                if(r==true){
		        	reqData ={ IFS :'WMS_ITD00015',InvPlanId:selectData.INVENTORY_ID};
		            var ajaxParam = {
		                 url: '/iPlant_ajax',
		                 dataType: 'JSON',
		                 data: reqData,
		                 successCallBack:function(data){
		                	 var susMsg=getReturnMsg(data);
							 commonShowMessage(data.RESPONSE["0"].RESPONSE_DATA["0"].MESSAGE );
		                	 initGridData();
		                	 
		                	/* $.messager.alert('提示', '删除成功!','',function(){
                         	      initGridData();
                              });*/
		                 },
		                 errorCallBack:function(){
		                	 commonShowMessage('删除失败，请联系管理员');
		                 }   
		            };
		            iplantAjaxRequest(ajaxParam);
                }
       	 	})    
	    },
	    
		
		/*deleteInvPlan = function () {
	    		var checkedItems =  $('#InventoryPlan_tab').datagrid('getSelections');
	            if (checkedItems.length==0) {
	                $.messager.alert('提示', '请选择一条数据进行删除');
	                return;
	            }
	            确认提示框
	            var delCnt=0,arrUpdate = new Array();;
	            $.messager.confirm('确认框', '您确定要删除您所选择的数据吗?', function (r) {
	               	if(r==true){
	               		var tmp='';
	               		 $.each(checkedItems, function (index, item) {
	               				arrUpdate.push({InvPlanId:selectData.INVENTORY_ID});
	                     });
	               		 
	               		 if(arrUpdate.length>0){
	         	          批量删除
	                         var ajaxUpdate = {
	                             url: '/iPlant_ajax',
	                             dataType: 'JSON',
	                             data: {
	                                 list: arrUpdate,
	                                 IFS: 'WMS_ITD00015'
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
	               			showmessage.html('<font color=red>删除失败,此工单不Y创建状态！</font>');
	               		 }
	               	}
	            });      
	    	},*/
	    
	    
	    
	    
	    
	    
	    
	    validSelectedData = function (gridName,type) {
            var checkedItems = $('#' + gridName).datagrid('getSelections'),num = 0;
            $.each(checkedItems, function (index, item) { num++;});
            if (type == 'modify') {
                if (num != 1) { return false;}
            } else {
                if (num <= 0) { return false;}
            }
            return true;
        },
		//新增盘点计划
		saveInventoryPlan = function(){
			if(!checkForm()) return;
			var ajaxParam = {
					url: '/iPlant_ajax',
					dataType: 'JSON',
					data: {
						INVENTORY_ID: $('#INVENTORY_ID').textbox('getText'),
						INVENTORY_TYPE: $('#INVENTORY_TYPE').combobox('getValue'),
						START_DATE: $('#StartDATE').combobox('getValue'),
						END_DATE: $('#EndDATE').combobox('getValue'),
						INVENTORY_STORE: $('#INVENTORY_STORE').combobox('getValue'),
						IFS: 'WMS_ITD00009'
					},
					
					successCallBack: function(data) {
						var susMsg=getReturnMsg(data);
						commonShowMessage('新增成功');
						$('#enditTab').dialog('close');
            			initGridData();
	                
					},
					errorCallBack: function() {
						commonShowMessage('新增失败');
					}
						
				};
				iplantAjaxRequest(ajaxParam);
				
		}
	};
	InventoryPlan.prototype = {
		init: function() {
			$(function() {
				/*初始化全局变量对象*/
			    dataGrid = $('#InventoryPlan_tab');
				initGridData();
			    selectStore();
			    dateValid("qProDtBegin","qProDtEnd","2");
				//限制输入英文单引号
		        $("input",$("#InventoryPlanNo").next("span")).keydown(function(e){
		   		   if(e.keyCode==222){
		 				if(e.preventDefault){ e.preventDefault(); }else{ e.returnValue = false;}      
		 			}
		   	   });
		       $('#btnResetss').click(function(){ setNull();});
		       $('#btnSearch').click(function() {	
					var dgrid = dataGrid.datagrid('options');
					searchDataGrid(dgrid);
		       });
			});
		}
	};
	var mp = new InventoryPlan();
	mp.init();
})();

//打开弹出看 弹出框的操作为修改和新增
function closeOpen(param) {			//param用于判断是修改还是新增操作
	setDataNull();
	$("#InsertUpdate").val(param);
	getInventoryPlanId();
	$('#INVENTORY_ID').textbox('textbox').attr('readonly',false);
	$('#INVENTORY_ID').textbox('textbox').attr('disabled',false);
	
	// 打开弹出框时加载下拉框的数据，级联操作，可使用循环遍历json数据绑定下拉框
	var arr=ajaxquery("WMS_C000007","");	//查询出所有仓库的信息
	//给仓库下拉赋值
	$('#INVENTORY_STORE').combobox({    
	    valueField:'STORE_ID',    
	    textField:'STORE_NAME' ,
	    editable:false
	}); 
	$('#INVENTORY_STORE').combobox("loadData", arr);
	
	var type=ajaxquery("WMS_ITD00011","");	//查询出所有盘点类型
	//给盘点类型下拉赋值
	$('#INVENTORY_TYPE').combobox({    
	    valueField:'INVENTORY_TYPE',    
	    textField:'INVENTORY_TYPE_NAME' ,
	    editable:false
	}); 
	$('#INVENTORY_TYPE').combobox("loadData", type);
	

		if(param==1){	//==1为新增   ==2为修改
			$('#enditTab').dialog('open');
			$('#INVENTORY_TYPE').combobox('select',type[0].INVENTORY_TYPE);
			$('#INVENTORY_STORE').combobox('select',arr[0].STORE_ID);
			var curr_time=new Date();     
		    var strDate=curr_time.getFullYear()+"-";     
		    strDate +=curr_time.getMonth()+1+"-";     
		    strDate +=curr_time.getDate()+"-";     
		    strDate +=" "+curr_time.getHours()+":";     
		    strDate +=curr_time.getMinutes()+":";     
		    strDate +=curr_time.getSeconds();    
		    dateValid("StartDATE","EndDATE","3");
		    $("#StartDATE").datetimebox("setValue",strDate);  
		    
		    
		    
		    //$("#EndDATE").datetimebox("setValue",strDate);  
		}else if(param==2){
			//updateLoad();
		}
}

function ajaxquery(id, b) {
	var arr = new Array();
	var d = {
		IFS : id,
		reqType : "WEB"
	};
	reqParam = b.split(",");
	if ("" != reqParam) for (var e = 0; e < reqParam.length; e++) {			//当无输入参数时，此判断不会进入循环将不会进入
    var f = reqParam[e].toString().replace('"', ""),
    g = f.substring(0, f.indexOf(":")).toString(),
    h = f.indexOf(":") + 1,								
    i = f.substring(h).toString();
    d[g] = i
} 
	var c = "";
	null != d && (c = '{"REQ":[{"REQ_DATA":' + JSON.stringify(d) + "}]}");
	var w = 1;
	$.ajax({
		async : false,
		type : "POST",
		url : "../../../iPlant_ajax",
		dataType : "json",
		data : {
			reqStr : c
		},
		success : function(data) {
			arr = data.RESPONSE[0].RESPONSE_DATA;
		}
	});
	return arr;
}