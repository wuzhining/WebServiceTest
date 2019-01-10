(function () {
    function MoManage() {
        pageConfig={
            orderName: 'workOrder_tab',
            dispatchName:'dispatch_tab',
            WorkOrderCode:'sendWork',
            dispatchOrder:'dispatchOrder',
            orderTitle:'工单信息',
        }
        var editIndex = undefined;
        var EquipName ='';
        var EquipName2 ='';
        var CK_STATUS ='';
        var myWorkCode ='';
        var myWorkCode2 ='';
        var sendWorkTypeName='';
        var myprodName;
        var myprodValue;
        var ChangeType;
        var checkListNum=true;
        var myrowCollection =new Array();
        var arrLCY ={};
        /*var listData2 =new Array();*/
        getChangeType=function(){
          return this.ChangeType;
        },
        setChangeType=function(value){
          this.ChangeType=value;
        },
        onClickRow =function(index, field){
            if (editIndex != index){
                if (endEditing()){
                    $('#dispatch_tab').datagrid('selectRow', index)
                            .datagrid('beginEdit', index);
                    var ed = $('#dispatch_tab').datagrid('getEditor', {index:index,field:field});
                    if (ed){
                        ($(ed.target).data('textbox') ? $(ed.target).textbox('textbox') : $(ed.target)).focus();
                    }
                    editIndex = index;
                } else {
                    setTimeout(function(){
                        $('#dispatch_tab').datagrid('selectRow', editIndex);
                    },0);
                }
            }
        }
        endEditing =function(){
            if (editIndex == undefined){return true}
            if ($('#dispatch_tab').datagrid('validateRow', editIndex)){
                $('#dispatch_tab').datagrid('endEdit', editIndex);
                $('#dispatch_tab').datagrid('acceptChanges');
                editIndex = undefined;
                if(!checkListInput()){
                  return false;
                }
                return true;
            } else {
                return false;
            }
        }
        appendList = function(){
            if (endEditing()){
                $('#dispatch_tab').datagrid('appendRow',{sendWork:''});
                editIndex = $('#dispatch_tab').datagrid('getRows').length-1;
                $('#dispatch_tab').datagrid('selectRow', editIndex)
                    .datagrid('beginEdit', editIndex);  
            }else{
                editIndex = $('#dispatch_tab').datagrid('getRows').length-1;
                $('#dispatch_tab').datagrid('selectRow', editIndex)
                    .datagrid('beginEdit', editIndex);  
            }
        }
        checkListInput =function(){
          var sendList =$('#dispatch_tab').datagrid('getRows');//[][]数据
          var a=[];
          if(!checkListNum){
            return false;
          }
          for(var i=0;i<sendList.length;i++){
            if(sendList[i].listWorkNum==null||sendList[i].listWorkNum==0){
                $.messager.alert('提示','请输入派工单数量');
                return false; 
            }
            if(sendList[i].listWorkNum){
              if(sendList[i].listWorkOrderNum){
                if(parseInt(sendList[i].listWorkOrderNum)<parseInt(sendList[i].listWorkNum)){
                  $.messager.alert('错误','派工单数量不能大于工单数量');
                  return false; 
                }
              }
              if(sendList[i].listNum){
                a[i]=sendList[i].listWorkNum/sendList[i].listNum;
                var rep = /^[0-9]*[1-9][0-9]*$/;
                if(!rep.test(a[i])){
                  $.messager.alert('提示','派工单数必须是产品出数的整数倍');
                  return false; 
                }
              }
            }
          }
          if(a.length>1){
            for(var j=1;j<a.length;j++){
              if(a[j]!=a[0]){
                $.messager.alert('提示','派工单数量与产品出数不对应');
                return false; 
              }
            }
          }
          if(sendList.length>1){
            for(var k=0;k<sendList.length;k++){
              for(j=k+1; j<sendList.length;j++){
              if(sendList[k].listProdCode==sendList[j].listProdCode){
                $.messager.alert('提示','一个物料不能多次派配');
                return false; 
              }
            }
            }
          }
          return true;
        }
        acceptList =function(){
          if (endEditing()){
            $('#dispatch_tab').datagrid('acceptChanges');
          }else{
            editIndex = $('#dispatch_tab').datagrid('getRows').length-1;
            $('#dispatch_tab').datagrid('selectRow', editIndex)
            .datagrid('beginEdit', editIndex); 
            return false;
          }
          return true;
        }
        removeList =function(){
            if (editIndex == undefined){return}
            $('#dispatch_tab').datagrid('cancelEdit', editIndex)
                    .datagrid('deleteRow', editIndex);
            editIndex = undefined;
        }  
        rejectList =function(){
            var item = $('#dispatch_tab').datagrid('getRows'); 
            if (item) { 
                for (var i = item.length - 1; i >= 0; i--) { 
                    var index = $('#dispatch_tab').datagrid('getRowIndex', item[i]); 
                    $('#dispatch_tab').datagrid('deleteRow', index); 
                } 
            } 
        }
        setDataNull = function () {
            $('#'+pageConfig.WorkOrderCode).textbox({ required: false });
            $('#fmWorkOrder').form('clear');     
        }
        getSelectedCondtion =function(){
             //派工单号
            iplantAjaxRequest( {
                url: '/iPlant_ajax',
                data: {IFS:'P000002',},
                successCallBack: function (data) {
                    var array = new Array();
                    array.push({ "id": "", "text": "全部"});
                    var rowCollection=createSourceObj(data);
                    for(var i=0; i<rowCollection.length;i++){
                        array.push({"id":rowCollection[i].DO_CD,"text":rowCollection[i].DO_CD});
                    }
            
                    //查询
                    $('#cxDispatchOrder').combobox({
                        data:array,
                        valueField:'id',
                        textField:'text'
                    });
                    //高级查询
                    $('#queryDispatchOrder').combobox({
                        data:array,
                        valueField:'id',
                        textField:'text'
                    });
                }
            });

            //制令单号
            iplantAjaxRequest( {
                url: '/iPlant_ajax',
                data: {IFS:'P000002',
                	   },
                successCallBack: function (data) {
                    var array = new Array();
                    array.push({ "id": "", "text": "全部"});
                    var rowCollection=createSourceObj(data);
                    for(var i=0; i<rowCollection.length;i++){
                        array.push({"id":rowCollection[i].MO_CD,"text":rowCollection[i].MO_CD});
                    }
            
                    //查询
                    $('#cxWorkOrder').combobox({
                        data:array,
                        valueField:'id',
                        textField:'text'
                    });
                    //高级查询
                    $('#queryWorkOrder').combobox({
                        data:array,
                        valueField:'id',
                        textField:'text'
                    });
                }
            });

            //设备编号
            iplantAjaxRequest( {
                url: '/iPlant_ajax',
                data: {IFS:'B000029'},
                successCallBack: function (data) {
                    var array = new Array();
                    var rowCollection=createSourceObj(data);
                    var array = new Array();
                    array.push({ "id": "", "text": "全部"});
                    for (var i = 0; i < rowCollection.length; i++) {
                        array.push({ "id": rowCollection[i].ET_CD, "text": rowCollection[i].ET_NM });
                    }
            
                    //查询
                    $('#cxEquipCode').combobox({
                        data:array,
                        valueField:'id',
                        textField:'text'
                    });

                    //高级查询
                    $('#queryEquipCode').combobox({
                        data:array,
                        valueField:'id',
                        textField:'text',
                        panelWidth:150
                    });
                }
            });

            //派工单类别
            iplantAjaxRequest( {
                url: '/iPlant_ajax',
                data: {IFS:'D000008',
                      DICT_CD: 'RDP01',
                      USE_YN:'Y' },
                successCallBack: function (data) {
                    var array = new Array();
                    array.push({ "id": "", "text": "全部"});
                    var rowCollection=createSourceObj(data);
                    for(var i=0; i<rowCollection.length;i++){
                        array.push({"id":rowCollection[i].DICT_IT,"text":rowCollection[i].DICT_IT_NM});
                    }
            
                    //高级查询
                    $('#queryDispatchOrderType').combobox({
                        data:array,
                        valueField:'id',
                        textField:'text'
                    });
                }
            });

        }
        initGridData=function(){
            var dgrid=$('#'+pageConfig.orderName).datagrid('options');
            if(!dgrid) return;
            var reqData = {
                    IFS: 'P000002',
                    pageIndex:1,
                    pageSize:dgrid.pageSize
            }
         reqGridData('/iPlant_ajax',pageConfig.orderName, reqData);
         ChangeColor();
        },
        bindGridData = function (reqData,jsonData) {
            var grid = {
                name: pageConfig.orderName,
                dataType: 'json',
                columns: [[
                   {field : "CZ",width : 10,checkbox : true},
                   { field: 'DO_CD', title: '派工单号', width: 100, align: 'center' },
                   { field: 'MO_CD', title: '制令单号', width: 200, align: 'center' },
//                 { field: 'DICT_IT_NM', title: '派工单类别', width: 100, align: 'center'},
                   { field: 'ET_NM', title: '设备编号', width: 100, align: 'center' },
                   { field: 'PT_CD', title: '物料编码', width: 200, align: 'center' },
                   { field: 'PT_NM', title: '物料名称', width: 200, align: 'center' },
                   { field: 'MO_NUM', title: '制令数量', width: 100, align: 'center' },
                   { field: 'DO_NUM', title: '派工数量', width: 100, align: 'center' },
                   { field: 'PD_TT_NUM', title: '生产总数', width: 100, align: 'center' },
                   { field: 'BR_NUM', title: '不良总数', width: 100, align: 'center' },
                   { field: 'GD_NUM', title: '良品数', width: 100, align: 'center' },
                   { field: 'GD_RATE', title: '完成率', width: 100, align: 'center' ,
                        formatter: function (value, row, index) {
                               if (value == '%') {
                                   return '0%';
                               }
                               else {
                                   return value;
                               }
                           }},
                   { field: 'PT_NUM', title: '产品出数', width: 100, align: 'center' },
                   { field: 'DO_STATUS', title: '派工单状态', width: 100, align: 'center' },
                   { field: 'CK_STATUS', title: '审核状态', width: 100, align: 'center',
                        formatter: function (value, row, index) {
                               if (value == '1') {
                                   return '已审核';
                               }
                               else {
                                   return '未审核';
                               }
                           }},
                   { field: 'P_BGN_DATE', title: '计划开始时间', width: 200, align: 'center'},
                   { field: 'P_END_DATE', title: '计划结束时间', width: 200, align: 'center'},
                   { field: 'A_BGN_DATE', title: '实际开始时间', width: 200, align: 'center' },
                   { field: 'A_END_DATE', title: '实际结束时间', width: 200, align: 'center'},
                ]],
                onDblClickRow: function(index,row){	
//                	ChangeType=1;
//   		    	 $("#enditTab2").dialog("open").dialog('setTitle', '工单信息维护');
//   		    	 checkFun();
//   		    	$('#sendWork2').textbox('setValue',row.DO_CD==null?'':row.DO_CD);
//   	            $('#sendWorkNum2').textbox('setValue',row.DO_NUM==null?'':row.DO_NUM);
//   	            $('#unitNum2').textbox('setValue',row.RT_SF==null?'':row.RT_SF);
//   	            $('#prodNum2').textbox('setValue',row.PT_NUM==null?'':row.PT_NUM);
//   	            $('#ProdCode2').combobox('setValue',row.PT_CD==null?'':row.PT_CD);
//   	            $('#equipCode2').combobox('setValue',row.ET_CD==null?'':row.ET_CD);
//   	            $('#WorkCodeNum2').textbox('setValue',row.MO_NUM==null?'':row.MO_NUM);
//   	            $('#WorkCode2').textbox('setValue',row.MO_CD==null?'':row.MO_CD);
   	            
   	            
   	         setChangeType(0);
             var row =$('#workOrder_tab').datagrid('getSelected');
             if(row){
               if(row.CK_STATUS=='0'){
                 $('#sendWork2').textbox('readonly',true);
                 $('#ProdCode2').textbox('readonly',false);
                 $('#equipCode2').textbox('readonly',false);
                 $('#WorkCode2').textbox('readonly',false);
                 $('#unitNum2').textbox('readonly',false);
                 
                 $('#sendWork2').textbox('disable');
                 $('#ProdCode2').textbox('enable');
                 $('#equipCode2').textbox('enable');
                 $('#WorkCode2').textbox('enable');
                 $('#unitNum2').textbox('enable');
                 $('#WorkCode2').textbox({onChange:function(data){
                   myWorkCode2 =$('#WorkCode2').textbox('getValue');
                   setChangeType(1);}
                 });      
               }else{
                 $('#sendWork2').textbox('readonly',true);
                 $('#ProdCode2').textbox('readonly',true);
                 $('#equipCode2').textbox('readonly',true);
                 $('#WorkCode2').textbox('readonly',true);
                 $('#unitNum2').textbox('readonly',true);
                 
                 $('#sendWork2').textbox('disable');
                 $('#ProdCode2').textbox('disable');
                 $('#equipCode2').textbox('disable');
                 $('#WorkCode2').textbox('disable');
                 $('#unitNum2').textbox('disable');
               }  
              
               myWorkCode =row.MO_CD;
               $('#queryTab').dialog('close');
               $('#enditTab').dialog('close');
               $("#enditTab2").dialog("open").dialog('setTitle', '工单信息维护');
               $('#sendWork2').textbox('setValue',row.DO_CD==null?'':row.DO_CD);
               $('#sendWorkNum2').textbox('setValue',row.DO_NUM==null?'':row.DO_NUM);
               $('#unitNum2').textbox('setValue',row.RT_SF==null?'':row.RT_SF);
               $('#prodNum2').textbox('setValue',row.PT_NUM==null?'':row.PT_NUM);
               $('#ProdCode2').combobox('setValue',row.PT_CD==null?'':row.PT_CD);
               $('#equipCode2').combobox('setValue',row.ET_CD==null?'':row.ET_CD);
               $('#WorkCodeNum2').textbox('setValue',row.MO_NUM==null?'':row.MO_NUM);
               $('#WorkCode2').textbox('setValue',row.MO_CD==null?'':row.MO_CD);
               CK_STATUS =row.CK_STATUS;
             }
             
             updateBindCombogrid();
   	            
   	            
   		     }
            }               
            initGridView(reqData,grid);
            $('#'+pageConfig.orderName).datagrid('loadData', jsonData);
        },
        checkFun = function (){
        	console.log(ChangeType);
        	var qx = getUpdateRight();
			if(qx=="Y"){
				$('#sendWork2').textbox('textbox').attr('disabled', true);
		    	 $('#sendWorkNum2').textbox('textbox').attr('disabled', false);
		    	 $('#unitNum2').textbox('textbox').attr('disabled', false);
		    	 $('#prodNum2').textbox('textbox').attr('disabled', false);
		    	 $('#WorkCodeNum2').textbox('textbox').attr('disabled', false);
		    	 $('#WorkCode2').textbox('textbox').attr('disabled', false);
		    	 $('#ProdCode2').combobox('textbox').attr('disabled', false);
		    	 $('#equipCode2').combobox('textbox').attr('disabled', false);
		    	 $('#saveID').show();
		    	 $('#cancleID').show();
			}else{
				ChangeType=2;
				$('#sendWork2').textbox('textbox').attr('disabled', true);
		    	 $('#sendWorkNum2').textbox('textbox').attr('disabled', true);
		    	 $('#unitNum2').textbox('textbox').attr('disabled', true);
		    	 $('#prodNum2').textbox('textbox').attr('disabled', true);
		    	 $('#WorkCodeNum2').textbox('textbox').attr('disabled', true);
		    	 $('#WorkCode2').textbox('textbox').attr('disabled', true);
		    	 $('#ProdCode2').combobox('textbox').attr('disabled', true);
		    	 $('#equipCode2').combobox('textbox').attr('disabled', true);
		    	 $('#saveID').hide();
//		    	 $('#cancleID').hide();
			}
			 
		}
        /*checkDataValid = function () {
            var dictCode = $('#'+pageConfig.WorkOrderCode).val();
            var sendWorkType =$('#sendWorkType').textbox('getValue');
            var masterCode =$('#masterCode').combobox('getValue');
            var equipCode =$('#equipCode').combobox('getValue');
            var standardCycle =$('#standardCycle').textbox('getValue');
            if(dictCode==''||sendWorkType==''||masterCode==''||equipCode==''||standardCycle=='') {
                $('#'+pageConfig.WorkOrderCode).textbox({ required: true });
                return false;
            }
            return true;
        },*/
        validSelectedData = function (gridName,type) {
            var checkedItems = $('#' + gridName).datagrid('getSelections');
            var num = 0;
            $.each(checkedItems, function (index, item) {
               num++;
            });
            if (type == 'Update') {
                if (num != 1) {
                    return false;
                }
            }else if(type == 'check'){
                if (num != 1) {
                    return false;
                }
            }
            else {
                if (num <= 0) {
                    return false;
                }
            }
            return true;
        },
        getWorkOrder =function(){
            var workOrderData='';
            var ajaxParam={
                url:'/iPlant_ajax',
                data:{
                      IFS:'P000017',
                },
                successCallBack:function(data){
                    var rowNum=0
                    if(data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS){
                        rowNum=parseInt(data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS);
                        workOrderData=data.RESPONSE["0"].RESPONSE_DATA[0];
                    }
                    $('#sendWork').textbox('setValue',workOrderData.DO_CD).textbox('readonly').textbox({ required: true });                                                                         
                }
            } 
            iplantAjaxRequest(ajaxParam); 
        }
        addWorkOrder = function () {
        	ChangeType=0;
        	checkFun();
            $("#enditTab").dialog("open").dialog('setTitle', pageConfig.orderTitle+'维护');
            $("#fmWorkOrder").form("clear");
            rejectList();
            getWorkOrder();
            checkListData();
            bindCombogrid();
            checkListNum=true;
        },
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
            var dgrid=$('#'+pageConfig.orderName).datagrid('options');
            var workOrder = $('#queryWorkOrder').combobox('getValue');
            var dispatchOrder = $('#queryDispatchOrder').combobox('getValue');
            var StationUse =$('#StationUse').combobox('getValue');
            var startDate = $('#queryStartDate').datebox('getValue');
            var EndDate = $('#queryEndDate').datebox('getValue');
            var EquipCode = $('#queryEquipCode').textbox('getValue');
            var queryDispatchOrderType =$('#queryDispatchOrderType').combobox('getValue');
            var reqData ={
                MO_CD: workOrder,
                DO_CD: dispatchOrder,
                ET_CD: EquipCode,
                CK_STATUS:StationUse,
                StartDate: startDate,
                EndDate: EndDate,
                DICT_IT: queryDispatchOrderType,
                IFS:'P000002',
                pageIndex:1,
                pageSize:dgrid.pageSize,
            }
            if((startDate&&EndDate=='')||(startDate==''&&EndDate)){
              $.messager.alert('提示','请输入你需要查询的开始与结束日期');  
              return
            }
            reqGridData('/iPlant_ajax','workOrder_tab',reqData)
            $('#queryTab').dialog('close'); 
        },
        getDataByConditiononce =function(){
            var dgrid=$('#'+pageConfig.orderName).datagrid('options');
            var workOrder = $('#cxWorkOrder').combobox('getValue');
            var dispatchOrder = $('#cxDispatchOrder').combobox('getValue');
            var StationUse =$('#cxStationUse').combobox('getValue');
            var EquipCode =$('#cxEquipCode').combobox('getValue');
            var reqData ={
                MO_CD: workOrder,
                DO_CD: dispatchOrder,
                ET_CD: EquipCode,
                CK_STATUS:StationUse,
                IFS:'P000002',
                pageIndex:1,
                pageSize:dgrid.pageSize
            };
            reqGridData('/iPlant_ajax','workOrder_tab',reqData);
        },
        deleteWorkOrder = function () {
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
                               IFS: 'P000004',
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
        }
        UpdateMoManageOne =function(elm,updateWord){
          var row =$('#workOrder_tab').datagrid('getSelected');
          if(row){
            $('#'+elm).combobox('setValue',row.updateWord);
          }
        }
        UpdateMoManage = function(){
          var isSelectedData = validSelectedData(pageConfig.orderName, 'Update');
            if (!isSelectedData) {
                 $.messager.alert('提示', '请选择一条数据进行修改');
                 return;
            }
          setChangeType(0);
          var row =$('#workOrder_tab').datagrid('getSelected');
          if(row){
            if(row.CK_STATUS=='0'){
              $('#sendWork2').textbox('readonly',true);
              $('#ProdCode2').textbox('readonly',false);
              $('#equipCode2').textbox('readonly',false);
              $('#WorkCode2').textbox('readonly',false);
              $('#unitNum2').textbox('readonly',false);
              $('#WorkCode2').textbox({onChange:function(data){
                myWorkCode2 =$('#WorkCode2').textbox('getValue');
                setChangeType(1);}
              });      
            }else{
              $('#sendWork2').textbox('readonly',true);
              $('#ProdCode2').textbox('readonly',true);
              $('#equipCode2').textbox('readonly',true);
              $('#WorkCode2').textbox('readonly',true);
              $('#unitNum2').textbox('readonly',true);
            }
           
            myWorkCode =row.MO_CD;
            $('#queryTab').dialog('close');
            $('#enditTab').dialog('close');
            $("#enditTab2").dialog("open").dialog('setTitle', '工单信息维护');
            $('#sendWork2').textbox('setValue',row.DO_CD==null?'':row.DO_CD);
            $('#sendWorkNum2').textbox('setValue',row.DO_NUM==null?'':row.DO_NUM);
            $('#unitNum2').textbox('setValue',row.RT_SF==null?'':row.RT_SF);
            $('#prodNum2').textbox('setValue',row.PT_NUM==null?'':row.PT_NUM);
            $('#ProdCode2').combobox('setValue',row.PT_CD==null?'':row.PT_CD);
            $('#equipCode2').combobox('setValue',row.ET_CD==null?'':row.ET_CD);
            $('#WorkCodeNum2').textbox('setValue',row.MO_NUM==null?'':row.MO_NUM);
            $('#WorkCode2').textbox('setValue',row.MO_CD==null?'':row.MO_CD);
            CK_STATUS =row.CK_STATUS;
          }
          
          updateBindCombogrid();
        }
        saveWorkOrder2 =function(){
          var sendWork2 =$('#sendWork2').textbox('getValue');
          var sendWorkNum2 =$('#sendWorkNum2').textbox('getValue');
          var WorkCodeNum2 =$('#WorkCodeNum2').textbox('getValue');
          var unitNum2 =$('#unitNum2').textbox('getValue');
          var prodNum2 =$('#prodNum2').textbox('getValue');  
          var ProdCode2 =$('#ProdCode2').combobox('getValue');
          var ProdName2 =$('#ProdCode2').combobox('getText');
          var equipCode2 =$('#equipCode2').combobox('getValue');
          /*var WorkCode2 =$('#WorkCode2').textbox('getValue');*/
          if(parseInt(WorkCodeNum2)<parseInt(sendWorkNum2)){
            $.messager.alert('提示','工单数量不能大于派工单数量');
            return
          }
          var mya =WorkCodeNum2/prodNum2;
          var rep = /^[0-9]*[1-9][0-9]*$/;
          if(!rep.test(mya)){
            $.messager.alert('提示','派工单数必须是产品出数的整数倍');
            return 
          }
          var reqData='';
          var ChangeType=getChangeType();
          if(ChangeType=='1'){
            reqData ={
              MO_CD2:myWorkCode2,
              MO_CD :myWorkCode,
              DO_CD :sendWork2,
              DO_NUM :sendWorkNum2,
              MO_NUM :WorkCodeNum2,
              PT_CD :ProdCode2,
              PT_NM :ProdName2,
              ET_CD :equipCode2,
              ET_NM :EquipName2,
              RT_SF :unitNum2,
              PT_NUM:prodNum2,
              CK_STATUS:CK_STATUS,
              IFS :'P000005',
            };
          }else{
        	  
            reqData ={
              MO_CD :myWorkCode,
              DO_CD :sendWork2,
              DO_NUM :sendWorkNum2,
              MO_NUM :WorkCodeNum2,
              PT_CD :ProdCode2,
              PT_NM :ProdName2,
              ET_CD :equipCode2,
              ET_NM :EquipName2,
              RT_SF :unitNum2,
              PT_NUM:prodNum2,
              CK_STATUS:CK_STATUS,
              IFS :'P000005',
            }  
          }   
          var susMsg='保存成功',errorMsg='保存失败,请联系管理员';
          var ajaxParam = {
               url: '/iPlant_ajax',
               dataType: 'JSON',
               data: reqData,
               successCallBack:function(data){
                  if($.messager.alert('提示', susMsg)){
                       $('#enditTab2').dialog('close');
                       $('#fmWorkOrder2').form('clear'); 
                       initGridData();     
                  }
               },
               errorCallBack:function(){
                   $.messager.alert('提示', errorMsg);
               }   
          };
          iplantAjaxRequest(ajaxParam);
        }
        saveWorkOrder = function(){
            if(!checkForm()) return;
            if($('#dispatch_tab').datagrid('getRows').length==null||$('#dispatch_tab').datagrid('getRows').length=='0'){
                $.messager.alert('提示','请对该派工单派配工单！');
                return
            }
            if(!acceptList())return;
            var sendWork =$('#sendWork').textbox('getValue');
            var equipCode =$('#equipCode').combobox('getValue');
            var unitNum =$('#unitNum').textbox('getValue');
            var masterCode =$('#masterCode').combobox('getValue');
            var marsterOrder =$('#marsterOrder').textbox('getValue');
            var sendWorkType =$('#sendWorkType').combobox('getValue');
            var standardCycle =$('#standardCycle').textbox('getValue');
            var sendOrderList =[];
            var sendList =$('#dispatch_tab').datagrid('getRows');//[][]数据
            for(var i=0;i<sendList.length;i++){
                sendOrderList[i]={
                    PT_CD: sendList[i].listProdCode,         //物料
                    PT_NM: sendList[i].listProdName,
                    MO_CD: sendList[i].listWorkOrder,          //工单号
                    MO_NUM:sendList[i].listWorkOrderNum,           //工单数量
                    PT_NUM:sendList[i].listNum,         //产品出数
                    DO_NUM:sendList[i].listWorkNum,         //派工单数量
                };
                sendOrderList[i] =$.extend(sendOrderList[i],{ CRT_ID: '',CRT_IP: ''});
            }
            var reqData ={
                    DO_CD :sendWork,
                    ET_CD :equipCode,
                    ET_NM :EquipName,
                    RT_SF :unitNum,
                    CUS_CD :masterCode,
                    PO_CD :marsterOrder,
                    DICT_IT :sendWorkType,
//                  DICT_IT_NM :sendWorkTypeName,
                    MD_CL :standardCycle,
                    IFS :'P000003',
                    list :sendOrderList,
            };
            var susMsg='添加成功',errorMsg='添加失败,请联系管理员';
            var ajaxParam = {
                 url: '/iPlant_ajax',
                 dataType: 'JSON',
                 data: reqData,
                 successCallBack:function(data){
                    if($.messager.alert('提示', susMsg)){
                         $('#enditTab').dialog('close');
                         setDataNull();
                         initGridData();     
                    }
                 },
                 errorCallBack:function(){
                     $.messager.alert('提示', errorMsg);
                 }   
            };
            iplantAjaxRequest(ajaxParam);
        }
        checkWorkOrder = function(date){
            var row = $("#"+pageConfig.orderName).datagrid("getSelected");
            var ajaxParam = {
                url: '/iPlant_ajax',
                dataType: 'JSON',
                data: {
                     IFS: 'P000020',
                     DO_CD: row.DO_CD,
                     ET_CD:row.ET_CD,
                     CK_STATUS: 1,
                     P_BGN_DATE: date.APPROVE_START_TIME,
                     P_END_DATE: date.APPROVE_END_TIME,
                },
                successCallBack:function(){
                    if($.messager.alert('提示',"审核成功")){
                        initGridData();
                    }
                },
                errorCallBack:function(){
                    $.messager.alert('提示','审核失败，请联系管理员');
                }   
            };
            iplantAjaxRequest(ajaxParam);
        }
        getCheckDate =function(){
            var isSelectedData = validSelectedData(pageConfig.orderName, 'check');
             if (!isSelectedData) {
                 $.messager.alert('提示', '请选择一条数据进行审核操作');
                 return;
             }
             var row = $("#"+pageConfig.orderName).datagrid("getSelected");
             if(row){
                var CheckType =row.CK_STATUS;
                if(CheckType=='1'){
                    $.messager.alert('提示','该单已审核通过');
                    return
                }else{
                    var ajaxParam = {
                        url: '/iPlant_ajax',
                        dataType: 'JSON',
                        data: {
                             IFS: 'P000016',
                             DO_CD:row.DO_CD,
                             DO_NUM: row.DO_NUM,
                             ET_CD: row.ET_CD,
                        },
                        successCallBack:function(data){
                            date=data.RESPONSE["0"].RESPONSE_DATA[0];
                            checkWorkOrder(date);
                        },
                        errorCallBack:function(){
                            $.messager.alert('提示','未获得派工单审核时间');
                        }   
                    };
                    iplantAjaxRequest(ajaxParam);
                }
             }
        }
        checkListData =function(){
            myrowCollection = [];
            arrLCY={};
            var ajaxParam={
                url: '/iPlant_ajax',
                data: {IFS:'T000073'},
                successCallBack: function (data) {
                    for(var i=0; i<data.RESPONSE[0].RESPONSE_DATA.length;i++){
                        myrowCollection.push({"text":data.RESPONSE[0].RESPONSE_DATA[i].ITEM_NM,"id":data.RESPONSE[0].RESPONSE_DATA[i].ITEM_CD});
                        arrLCY[data.RESPONSE[0].RESPONSE_DATA[i].ITEM_CD]=data.RESPONSE[0].RESPONSE_DATA[i].ITEM_NM;
                    }
                    /*var rowNum=0
                    if(data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS){
                       rowNum=parseInt(data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS);
                    }
                    myrowCollection=createSourceObj(data);*/
                }
            }
            iplantAjaxRequest(ajaxParam);
            /*var ajaxParam={
                url: '/iPlant_ajax',
                data: {IFS:'P000002'},
                successCallBack: function (data) {
                    for(var i=0; i<data.RESPONSE[0].RESPONSE_DATA.length;i++){
                        listData2.push({"id":data.RESPONSE[0].RESPONSE_DATA[i].MO_CD,"text":data.RESPONSE[0].RESPONSE_DATA[i].MO_CD});
                    }
                }
            }
            iplantAjaxRequest(ajaxParam);*/
        }
        initListdata =function(){
    
            $('#dispatch_tab').datagrid({
                columns: [[
                	{field:'listProdName', title: '物料编号', width:113,align:'center', editor:{type:'textbox'},hidden:'true'},
                   	{field:'listProdCode',title: '物料名称', width:180,align:'center',
                        editor:{  
                            type:'combobox',
                            options:{
                                valueField:'id',
                                textField:'text',
                                panelWidth:180,
                                panelHeight:200,
                                required:true,
                                data:myrowCollection,
                                missingMessage:'该选项为必填信息',
                                onHidePanel : function() {
                                    myprodValue = $(this).combobox('getText');  
                                    myprodName=$(this).combobox('getValue');
						            var row = $('#dispatch_tab').datagrid('getSelected');
							        if (row) {
							            var i=$('#dispatch_tab').datagrid('getRowIndex',row);
							            var td=$('.datagrid-body td[field="listProdName"]')[i];
							            var div = $(td).find('input')[0];
							            $(div).textbox('setValue',myprodValue);
							        }
                                    var options = $(this).combobox('options');  
                                    var data = $(this).combobox('getData');/* 下拉框所有选项 */  
                                    var value = $(this).combobox('getValue');/* 用户输入的值 */  
                                    var b = false;/* 标识是否在下拉列表中找到了用户输入的字符 */  
                                    if(value==''){
                                      return
                                    }
                                    for (var i = 0; i < data.length; i++) {  
                                        if (data[i][options.valueField] == value) {  
                                            b=true;  
                                            break;  
                                        }  
                                    }  
                                    if(!b){  
                                        $(this).combobox('setValue', '');
                                        $.messager.alert('提示','你所输入的物料名称不在物料表内,请重选物料');
                                        return
                                    }  
                                },  
                            }    
                        },formatter: function (value, row, index) {
                               if (value != null ) {
                                   return arrLCY[value];
                               }
                               else {
                                   return "";
                               }
                           }
                   },
                   
                   { field:"listWorkOrder", title: '制令单号', width:113,align:'center',
                     editor:{  
                              type:'textbox',
                              options:{ 
                                required:true,
                                missingMessage:'该选项为必填信息',
                                onChange: function (data){ 
                                  var rep =/[a-zA-Z]{1}[0-9a-zA-Z\-]{3,11}/;
                                  if(rep.test(data)==false){
                                    $.messager.alert('提示','制令单号应由字母开头并与数字组成');
                                    return
                                  }
                                },  
                              }    
                          }
                    },
                   { field:"listWorkOrderNum", title: '工单数量', width:75,align:'center',editor:'numberbox'},
                   { field:"listWorkNum", title: '派工单数量', width:75,align:'center',
                      editor:{  
                              type:'numberbox',
                          }
                   },
                   { field:"listNum", title: '产品出数', width:75,align:'center',editor:{
                      type:'textbox',
                      options:{
                        precision:0,
                        onChange:function(q){
                          checkListNum=true;
                          var rep = /^[0-9]*[1-9][0-9]*$/;
                          if(!rep.test(q)&&q!= null){
                            $(this).textbox('setValue','');
                            checkListNum=false;
                            return
                          }
                        }
                      }
                    }
                  },
                ]]
            })
        }
        doSearch =function(q,data,searchList,ele){  
          ele.combogrid('grid').datagrid('loadData', []);  
          if(q == ""){  
              ele.combogrid('grid').datagrid('loadData', data);  
              return;  
          }  
          var rows = [];  
          $.each(data,function(i,obj){  
              for(var p in searchList){  
                  var v = obj[searchList[p]];  
                  if (!!v && v.toString().indexOf(q) >= 0){  
                      rows.push(obj);  
                      break;  
                  }  
              }  
          });  
          if(rows.length == 0){  
              ele.combogrid('grid').datagrid('loadData', []);  
              return;  
          }  
          ele.combogrid('grid').datagrid('loadData', rows);  
        }  
        bindCombogrid =function (jsonData){
          var ajaxParam={
                  url:'/iPlant_ajax',
                  data:{
                      IFS:'B000029',
                  	  USE_YN:'Y'    
                  },
                  successCallBack:function(data){
                      var rowNum=0
                      if(data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS){
                         rowNum=parseInt(data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS);
                      }
                      var rowCollection=createSourceObj(data);
                      var jsonData={
                            total:rowNum,
                            rows:rowCollection
                      }
                      $('#equipCode').combobox({
                          data:rowCollection,
                          valueField:'ET_CD',
                          textField:'ET_NM',
                          panelWidth:150,
                          /*columns: [[
                             { field: 'ET_CD', title: '设备唯一码', width: 150 ,align:'center'},
                             { field: 'ET_NM', title: '设备编号', width: 100,align:'center'},
                          ]],
                          onChange: function (q){  
                            doSearch(q,rowCollection,['ET_CD','ET_NM'],$(this));  
                          },
                          onShowPanel:function () {  
                            $(this).combogrid('grid').datagrid('loadData',rowCollection);  
                          }    */
                      });
                      $('#equipCode').combobox({
                        onSelect:function(rowData){
                          EquipName =rowData.ET_NM;
                        }
                      });
                  }
          }
          iplantAjaxRequest(ajaxParam);
          var ajaxParam1={
                  url:'/iPlant_ajax',
                  data:{
                      IFS:'B000001',
                      USE_YN:'Y' 
                  },
                  successCallBack:function(data){
                      var rowNum=0
                      if(data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS){
                         rowNum=parseInt(data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS);
                      }
                      var rowCollection=createSourceObj(data);
                      var jsonData={
                            total:rowNum,
                            rows:rowCollection
                      }
                      $('#masterCode').combobox({
                          data:rowCollection,
                          valueField:'CUS_CD',
                          textField:'CUS_NM',
                          panelWidth:150,
                          panelHeight:200,
                          /*columns: [[
                              { field: 'CUS_CD', title: '客户编号', width: 100 ,align:'center'},
                              { field: 'CUS_NM', title: '客户名称', width: 200,align:'center'},
                          ]],
                          onChange: function (q){  
                            doSearch(q,rowCollection,['CUS_CD','CUS_NM'],$(this));  
                          },
                          onShowPanel:function () {  
                            $(this).combogrid('grid').datagrid('loadData',rowCollection);  
                          }    */
                      });
                  }
          }
          iplantAjaxRequest(ajaxParam1);
          var ajaxParam2={
                  url:'/iPlant_ajax',
                  data:{
                      IFS:'D000008',
                      DICT_CD: 'RDP01',
                      USE_YN:'Y' 
                   },
                  successCallBack:function(data){
                      var rowNum=0
                      if(data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS){
                         rowNum=parseInt(data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS);
                      }
                      var rowCollection=createSourceObj(data);
                      var jsonData={
                            total:rowNum,
                            rows:rowCollection
                      }
                      $('#sendWorkType').combobox({
                          data:rowCollection,
                          valueField:'DICT_IT',
                          textField:'DICT_IT_NM',
                          panelWidth:150,
                          /*columns: [[
                             { field: 'DICT_IT_NM',title:'字典项名称',width:100,align:'center'},
                             { field: 'DICT_CD',title: '字典代码',width:100,align:'center'},
                             { field: 'DICT_IT', title: '字典项', width: 100, align: 'center' },
                          ]],*/
                          onHidePanel:function(){
                            sendWorkTypeName =$('#sendWorkType').combobox('getText');
                          }
                      });
                     /* $('#sendWorkType').combogrid("grid").datagrid("loadData", jsonData);*/
                  }
          }
          iplantAjaxRequest(ajaxParam2);
        }
        updateBindCombogrid =function(){
          var ajaxParam={
            url:'/iPlant_ajax',
            data:{
                IFS:'B000029',
            	USE_YN:'Y' 
            },
            successCallBack:function(data){
                var rowNum=0
                if(data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS){
                   rowNum=parseInt(data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS);
                }
                var rowCollection=createSourceObj(data);
                var jsonData={
                      total:rowNum,
                      rows:rowCollection
                }
                $('#equipCode2').combobox({
                    data:rowCollection,
                    valueField:'ET_CD',
                    textField:'ET_NM',
                    panelWidth:150,
                });
                $('#equipCode2').combobox({
                  onSelect:function(record){
                    EquipName2 =record.ET_NM;
                  }
                });
                var row =$('#workOrder_tab').datagrid('getSelected');
                $('#equipCode2').combobox('setValue',row.ET_CD);
                  }
          }
          iplantAjaxRequest(ajaxParam);
          var ajaxParam1={
            url:'/iPlant_ajax',
            data:{
                IFS:'B000009',
            	USE_YN:'Y' 
            },
            successCallBack:function(data){
                var rowNum=0
                if(data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS){
                   rowNum=parseInt(data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS);
                }
                var rowCollection1=createSourceObj(data);
                var jsonData={
                      total:rowNum,
                      rows:rowCollection1
                }
                $('#ProdCode2').combobox({
                    data:rowCollection1,
                    valueField:'PT_CD',
                    textField:'PT_NM',
                    panelWidth:150,
                });
                var row =$('#workOrder_tab').datagrid('getSelected');
                $('#ProdCode2').combobox('setValue',row.PT_CD);
            }
          }
          iplantAjaxRequest(ajaxParam1);
        }
        ChangeColor =function(){
          $('#'+pageConfig.orderName).datagrid({
              rowStyler:function(index,row){
                if (row.CK_STATUS==1){
                  return 'background-color:#e2edda;';
                }    
              }
          });
        }
    }    
    MoManage.prototype = {
        init: function () {
            $(function () {
            	$("body")[0].onkeydown = keyPress;
                $("body")[0].onkeyup = keyRelease;
                getSelectedCondtion();
                initGridData();
                getRightDate();
                $('#btnGaoSearch').click(function(){
                    $('#queryTab').dialog('open').dialog('setTitle', pageConfig.orderTitle+'维护');
                    $("#queryUserMes").form("clear");
                })
                 $('#btnSearch').click(function(){
                	 getDataByConditiononce();
                })
                $('#btnFreshen').click(function() {
                	getDataByConditiononce();
				});
                $('#btnAdd').click(function(){
                    $('#sendWork').textbox('readonly',false);
                    addWorkOrder();
                    initListdata();
                })
                $('#btnUpdate').click(function(){
                  UpdateMoManage();
                });
                $('.close').click(function(){
                  $('#queryTab').dialog('close');
                  $('#enditTab').dialog('close');
                  $('#enditTab2').dialog('close');
                  initGridData();
                })
                $('#btnDelete').click(function(){
                  deleteWorkOrder();  
                })
                $('#btnCheck').click(function(){       
                  getCheckDate();
                });
                $('#btnExprt').click(function(){
                  var reqData = {
                      IFS: 'P000002'
                  }
                  createTable('tbWorkOrder','工单日报','workOrder_tab',reqData);
                });
                $('#confirm').click(function(){
                    getDataByCondition();
                })
                $('#addList').click(function(){
                    appendList();  
                })
                $('#removeList').click(function(){
                    removeList();
                })
                $('#acceptList').click(function(){
                    acceptList();
                })
                $('#save').click(function(){
                    saveWorkOrder();
                })
                $('#saveID').click(function(){
                   saveWorkOrder2();
                });
            });
        }
    }
    var nMo = new MoManage();
    nMo.init();
})();