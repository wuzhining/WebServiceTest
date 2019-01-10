(function () {
    function invAssignment() {
        pageConfig={
            orderName: 'workOrder_tab',
            dispatchName:'dispatch_tab',
            WorkOrderCode:'INVENTORYID',
            dispatchOrder:'dispatchOrder',
            orderTitle:'盘点信息',
        }
        getSelectedCondtion =function(){
            //盘点任务单
            iplantAjaxRequest( {
                url: '/iPlant_ajax',
                data: {IFS:'WMS_D000011',},
                successCallBack: function (data) {
                    var array = new Array();
                    array.push({ "id": "", "text": "全部"});
                    var rowCollection=createSourceObj(data);
                    for(var i=0; i<rowCollection.length;i++){
                        array.push({"id":rowCollection[i].INVENTORY_ID,"text":rowCollection[i].INVENTORY_ID});
                    }
            
                    //查询
                    $('#cdINVENTORYID').combobox({
                        data:array,
                        valueField:'id',
                        textField:'text'
                    });
                    //高级查询
                    $('#INVENTORYID').combobox({
                        data:array,
                        valueField:'id',
                        textField:'text'
                    });
                }
            });
            
          //盘点人
            iplantAjaxRequest( {
                url: '/iPlant_ajax',
                data: {IFS:'WMS_D000011'},
                successCallBack: function (data) {
                    var array = new Array();
                    var rowCollection=createSourceObj(data);
                    var array = new Array();
                    array.push({ "id": "", "text": "全部"});
                    for (var i = 0; i < rowCollection.length; i++) {
                        array.push({ "id": rowCollection[i].INVENTOR, "text": rowCollection[i].INVENTOR_NAME });
                    }
            
                    //查询
                    $('#cdINVENTOR').combobox({
                        data:array,
                        valueField:'id',
                        textField:'text'
                    });

                    //高级查询
                    $('#INVENTOR').combobox({
                        data:array,
                        valueField:'id',
                        textField:'text',
                        panelWidth:150
                    });
                }
            });
            
            //盘点仓库
            iplantAjaxRequest( {
                url: '/iPlant_ajax',
                data: {IFS:'WMS_B000006',},
                successCallBack: function (data) {
                    var array = new Array();
                    array.push({ "id": "", "text": "全部"});
                    var rowCollection=createSourceObj(data);
                    for(var i=0; i<rowCollection.length;i++){
                        array.push({"id":rowCollection[i].WAREHOUSE_ID,"text":rowCollection[i].WAREHOUSE_NAME});
                    }
            
                    //查询
                    $('#cxWAREHOUSEID').combobox({
                        data:array,
                        valueField:'id',
                        textField:'text'
                    });
                    //高级查询
                    $('#WAREHOUSEID').combobox({
                        data:array,
                        valueField:'id',
                        textField:'text',
                        onChange:function(newValue, oldValue){
                        	ajaxParam={
	                            url:'/iPlant_ajax',
	                            data:{
	                                IFS:'WMS_B00020',
	                                WAREHOUSE_ID:newValue,
	                            },
	                            successCallBack:function(data){
	                            	 var rowCollection=createSourceObj(data);
	                               //初始化储区关联数据
                                   $("#STOREID").combobox({
                                	   data:rowCollection,
                                       valueField:'STORE_ID',  
                                       textField:'STORE_NAME',
                                   });                                                                                  
	                            }
                           }
                           iplantAjaxRequest(ajaxParam);
                       }
                   });
                }
            });
            
            //储区
            iplantAjaxRequest( {
                url: '/iPlant_ajax',
                data: {IFS:'WMS_B00020',},
                successCallBack: function (data) {
                    var array = new Array();
                    array.push({ "id": "", "text": "全部"});
                    var rowCollection=createSourceObj(data);
                    for(var i=0; i<rowCollection.length;i++){
                        array.push({"id":rowCollection[i].STORE_ID,"text":rowCollection[i].STORE_NAME});
                    }
            
                    //高级查询
                    $('#STOREID').combobox({
                        data:array,
                        valueField:'id',
                        textField:'text',
                        onChange:function(newValue, oldValue){
                        	iplantAjaxRequest( {
                                url: '/iPlant_ajax',
                                data: {
                                	IFS:'WMS_B000018',
                                	STORE_ID:newValue,
                                },
                                successCallBack: function (data) {
                                    var array = new Array();
                                    array.push({ "id": "", "text": "全部"});
                                    var rowCollection=createSourceObj(data);
                                    for(var i=0; i<rowCollection.length;i++){
                                        array.push({"id":rowCollection[i].SHELF_ID,"text":rowCollection[i].SHELF_NAME});
                                    }
                            
                                    //高级查询
                                    $('#SHELFID').combobox({
                                        data:array,
                                        valueField:'id',
                                        textField:'text'
                                    });
                                }
                            });
                        	ajaxParam={
	                            url:'/iPlant_ajax',
	                            data:{
	                                IFS:'WMS_B000018',
	                                STORE_ID:newValue,
	                            },
	                            successCallBack:function(data){
	                            	var rowCollection=createSourceObj(data);
	                            	console.log(data.RESPONSE[0].RESPONSE_DATA);
	                               //初始化货架关联数据
                                   $("#SHELFID").combobox({
                                	   data:rowCollection,
                                       valueField:'SHELF_ID',  
                                       textField:'SHELF_NAME',
                                   });                                                                                   
	                            }
                           }
                           iplantAjaxRequest(ajaxParam);
                       }
                    });
                }
            });
            
            //货架
            iplantAjaxRequest( {
                url: '/iPlant_ajax',
                data: {IFS:'WMS_B000018'},
                successCallBack: function (data) {
                    var array = new Array();
                    array.push({ "id": "", "text": "全部"});
                    var rowCollection=createSourceObj(data);
                    for(var i=0; i<rowCollection.length;i++){
                        array.push({"id":rowCollection[i].SHELF_ID,"text":rowCollection[i].SHELF_NAME});
                    }
            
                    //高级查询
                    $('#SHELFID').combobox({
                        data:array,
                        valueField:'id',
                        textField:'text'
                    });
                }
            });
        }
       /* bindCombogrid =function (jsonData){
			var listData = [];
	        var ajaxParam2={
	          url:'/iPlant_ajax',
	          data:{
	          	DPT_CD:$('#SHELFID').textbox('getValue'),
	            IFS:'WMS_B00027'},
	          successCallBack:function(data){
	          	for(var i = 0; i < data.RESPONSE[0].RESPONSE_DATA.length; i++) {
				listData.push({
					"id": data.RESPONSE[0].RESPONSE_DATA[i].PS_CD,
					"text": data.RESPONSE[0].RESPONSE_DATA[i].PS_NM
				});
	           }
				$('#employeeJob').combobox({
				data: listData,
				valueField: 'id',
				textField: 'text'
				});
	            
	            }
	        }
	        iplantAjaxRequest(ajaxParam2);
		}*/
        initGridData=function(){
            var dgrid=$('#'+pageConfig.orderName).datagrid('options');
            if(!dgrid) return;
            var reqData = {
                    IFS: 'WMS_D000011',
                    pageIndex:1,
                    pageSize:dgrid.pageSize
            }
         reqGridData('/iPlant_ajax',pageConfig.orderName, reqData);
        },
        bindGridData = function (reqData,jsonData) {
            var grid = {
                name: pageConfig.orderName,
                dataType: 'json',
                columns: [[
                   {field : "CZ",width : 10,checkbox : true},
                   { field: 'INVENTORY_ID', title: '盘点任务单', width: 100, align: 'center' },
                   { field: 'WAREHOUSE_ID', title: '仓库编码', width: 100, align: 'center' },
                   { field: 'WAREHOUSE_NAME', title: '仓库名称', width: 200, align: 'center' },
                   { field: 'STORE_NAME', title: '储区', width: 200, align: 'center' },
                   { field: 'SHELF_NAME', title: '货架', width: 200, align: 'center' },
                   { field: 'INVENTORY_DATE', title: '盘点日期', width: 100, align: 'center' },
                   { field: 'STATUS', title: '审核状态', width: 100, align: 'center',
                	   formatter:function(value,data,index){
                		   if(value=='1'){
                			   return "是";
                		   }else{
                			   return "否"
                		   }
                	   }
                   },
                   { field: 'INVENTOR_NAME', title: '盘点人', width: 100, align: 'center' },
                ]],
            }               
            initGridView(reqData,grid);
            $('#'+pageConfig.orderName).datagrid('loadData', jsonData);
        }
        getRightDate =function(){
            var ds='';
            $('#queryStartDate').datebox().datebox('calendar').calendar({
                validator: function(date){
                    var now = new Date();
                    var d1 = new Date(now.getFullYear(), now.getMonth(), now.getDate());
                    return date<=d1;
                }
            });
            $('#queryEndDate').datebox().datebox('calendar').calendar({
                validator: function(date){
                    var now = new Date();
                    var de =new Date(now.getFullYear(), now.getMonth(), now.getDate());
                    return date<=de;
                }
            });
        },
        onSelect =function(d){
            var issd = this.id == 'queryStartDate', queryStartDate = issd ? d : new Date($('#queryStartDate').datebox('getValue')), queryEndDate = issd ? new Date($('#queryEndDate').datebox('getValue')) : d;
                if (queryEndDate < queryStartDate) {
                    $('#queryEndDate').datebox('setValue', '').datebox('hidePanel');
                    $.messager.alert('错误','结束日期小于开始日期');
                }
        },
        getDataByCondition =function(){
        	var datagridList=[];
            var dgrid=$('#'+pageConfig.orderName).datagrid('options');
            var queryWAREHOUSEID = $('#WAREHOUSEID').combobox('getValue');
            var queryINVENTORYID = $('#INVENTORYID').combobox('getValue');
            var queryINVENTOR = $('#INVENTOR').combobox('getValue');
            var INVENTORYDATE =$('#INVENTORYDATE').datebox('getValue');
            var ajaxParam = {
                url: '/iPlant_ajax',
                dataType: 'JSON',
                data: {
                	WAREHOUSE_ID: queryWAREHOUSEID,
                	INVENTORY_ID: queryINVENTORYID,
                	INVENTOR: queryINVENTOR,
                	INVENTORY_DATE: INVENTORYDATE,
                    IFS:'WMS_D000011',
                },
                successCallBack:function(data){
                	for(var i=0;i<data.RESPONSE[0].RESPONSE_DATA.length;i++){
                		datagridList.push({
                			listWAREHOUSENAME:data.RESPONSE[0].RESPONSE_DATA[i].WAREHOUSE_NAME,
                			listSTORENAME:data.RESPONSE[0].RESPONSE_DATA[i].STORE_NAME,
                			listSHELFNAME:data.RESPONSE[0].RESPONSE_DATA[i].SHELF_NAME,
                			listPOSITIONNAME:data.RESPONSE[0].RESPONSE_DATA[i].POSITION_NAME,
                			MATERIA_ID:data.RESPONSE[0].RESPONSE_DATA[i].ITEM_CD,
                			MATERIA_NAME:data.RESPONSE[0].RESPONSE_DATA[i].ITEM_NM,
                			//以下未定义数据库字段
                			/*listNUM:data.RESPONSE[0].RESPONSE_DATA[i].NUM,
                			listCHECKNum:data.RESPONSE[0].RESPONSE_DATA[i].CHECK_NUM,*/
                			});	
                	}
                	$('#dispatch_tab').datagrid({
                		data:datagridList
                	});
                 }
            }
            iplantAjaxRequest(ajaxParam);
            $('#queryTab').dialog('close'); 
        },
        setDataNUll =function(){
        	$('#INVENTORYID').combobox('setValue','');
        	$('#WAREHOUSEID').combobox('setValue','');
        	$('#STOREID').combobox('setValue','');
        	$('#SHELFID').combobox('setValue','');
        	$('#INVENTORYDATE').datebox('setValue','');
        	$('#INVENTOR').textbox('setValue','');
        	var item = $('#dispatch_tab').datagrid('getRows');
            if (item) {
                for (var i = item.length - 1; i >= 0; i--) {
                    var index = $('#dispatch_tab').datagrid('getRowIndex', item[i]);
                    $('#dispatch_tab').datagrid('deleteRow', index);
                }
            }
        }
        getDataByConditiononce =function(){
            var dgrid=$('#'+pageConfig.orderName).datagrid('options');    
            var cxWAREHOUSEID = $('#cxWAREHOUSEID').combobox('getValue');
            var cdINVENTORYID = $('#cdINVENTORYID').combobox('getValue');
            var cdINVENTOR =$('#cdINVENTOR').combobox('getValue');
            var reqData ={
            	WAREHOUSE_ID: cxWAREHOUSEID,
            	INVENTORY_ID: cdINVENTORYID,
            	INVENTOR: cdINVENTOR,
                IFS:'WMS_D000011',
                pageIndex:1,
                pageSize:dgrid.pageSize
            };
            reqGridData('/iPlant_ajax','workOrder_tab',reqData);
        },
        /*deleteWorkOrder = function () {
             var isSelectedData = validSelectedData(pageConfig.orderName, 'Delete');
             if (!isSelectedData) {
                 $.messager.alert('提示', '请选择一条数据进行删除');
                 return;
             }
             var checkedItems = $('#' + pageConfig.orderName).datagrid('getSelections');
             var delCnt=0;
             var exceptionCode='';
             $.messager.confirm('确认框', '您确定要删除您所选择的数据?', function (r) {
                 if(r==true){
                     var DO_CDList=[];
                     $.each(checkedItems, function (index, item) {
                       delCnt++;
                       if(DO_CDList.indexOf(item.DO_CD)==-1){
                            DO_CDList.push(item.DO_CD);
                        }
                     });
                     for(var i=0;i<DO_CDList.length;i++){
                        exceptionCode = DO_CDList[i];
                        var ajaxParam = {
                           url: '/iPlant_ajax',
                           dataType: 'JSON',
                           data: {
                               IFS: '',
                               DO_CD: DO_CDList[i],
                           },
                           async:false,
                           successCallBack:function(data){
                              if(data.RESPONSE["0"].RESPONSE_HDR.MSG_TEXT.indexOf('派工单已生产')>-1){
                                    $.messager.alert('提示','派工单'+exceptionCode+'已审核或已开始生产，不能删除！')
                                    return 
                              }else{
                                if(delCnt==checkedItems.length){
                                    initGridData();
                                 }
                              }
                           }
                        };
                        iplantAjaxRequest(ajaxParam);
                        continue
                     }
                 }
             });      
        }*/
        initListdata =function(){
            $('#dispatch_tab').datagrid({
                columns: [[
                	{field:'MATERIA_ID', title: '物料编号', width:110,align:'center'},
                   	{field:'MATERIA_NAME',title: '物料名称', width:110,align:'center'},
                    { field:"listNUM", title: '现存量', width:60,align:'center'},
                    { field:"listCHECKNum", title: '盘点量', width:60,align:'center',editor:'numberbox'},
                    { field:"listWAREHOUSENAME", title: '仓库', width:110,align:'center'},
                    { field:"listSTORENAME", title: '储区', width:110,align:'center'},
                    { field:"listSHELFNAME", title: '货架', width:110,align:'center'},
                    { field:"listPOSITIONNAME", title: '货位', width:110,align:'center'},
                ]],
                onDblClickRow:function(){
                	
                }
            })
        }
    }    
    invAssignment.prototype = {
        init: function () {
            $(function () {
                getSelectedCondtion();
                initGridData();
                $('#btnDelete').click(function(){
                  deleteWorkOrder();  
                })
                
                $('#btnSearch').click(function(){
                	
                    getDataByConditiononce();
                })
                
                $('#btn').click(function(){
                	getDataByCondition();
                });
                
                $('#btnGaoSearch').click(function(){
                    $('#enditTab').dialog('open').dialog('setTitle', pageConfig.orderTitle+'维护');
                    setDataNUll();
                    initListdata();
                })

                $('.close').click(function(){
                  $('#queryTab').dialog('close');
                  $('#enditTab').dialog('close');
                  $('#enditTab2').dialog('close');
                  initGridData();
                })
                
               /* $('#confirm').click(function(){
                    getDataByCondition();
                })*/

            });
        }
    }
    var nMo = new invAssignment();
    nMo.init();
})();