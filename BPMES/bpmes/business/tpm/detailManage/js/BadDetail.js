(function () {
    function cardDetail() {
        pageConfig={
            gridName: 'badDetail_tab',
            title:'不良记录',
        },
        initGridData=function(){
            //派工单号
            iplantAjaxRequest( {
                url: '/iPlant_ajax',
                data: {IFS:'P0000022',CK_STATUS:"1",},
                successCallBack: function (data) {
                    var array = new Array();
                    var rowCollection=createSourceObj(data);
                    for(var i=0; i<rowCollection.length;i++){
                        array.push({"id":rowCollection[i].DO_CD,"text":rowCollection[i].DO_CD});
                    }
            
                    //查询
                    $('#DO_CD').combobox({
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
                    $('#machineCode').combobox({
                        data:array,
                        valueField:'id',
                        textField:'text'
                    });
                }
            });
            
            //不良原因
            iplantAjaxRequest( {
                url: '/iPlant_ajax',
                data: {IFS:'B000037'},
                successCallBack: function (data) {
                    var array = new Array();
                    var rowCollection=createSourceObj(data);
                    var array = new Array();
                    array.push({ "id": "", "text": "全部"});
                    for (var i = 0; i < rowCollection.length; i++) {
                        array.push({ "id": rowCollection[i].BR_NM, "text": rowCollection[i].BR_NM });
                    }
                    //查询
                    $('#badReason').combobox({
                        data:array,
                        valueField:'id',
                        textField:'text'
                    });
                }
            });

            var dgrid=$('#'+pageConfig.gridName).datagrid('options');
            if(!dgrid) return;
            var reqData = {
                    IFS: 'M000003',
                    pageIndex:1,
                    pageSize:dgrid.pageSize
            }
         reqGridData('/iPlant_ajax',pageConfig.gridName, reqData);
        },
        bindGridData = function (reqData,jsonData) {
            var grid = {
                name: pageConfig.gridName,
                dataType: 'json',
                columns: [[ 
                   { field: 'ET_NM', title: '设备编号', width: 100, align: 'center' },
                   { field: 'DO_CD', title: '派工单号', width: 200, align: 'center' },
                   { field: 'DO_NUM', title: '计划生产数', width: 100, align: 'center' },
                   { field: 'PD_TT_NUM', title: '实际生产数', width: 100, align: 'center' },
                   { field: 'BR_NM', title: '次品原因', width: 200, align: 'center' },
                   { field: 'BR_NUM', title: '次品数', width: 100, align: 'center' },
                   { field: 'CL_DT', title: '创建时间', width: 160, align: 'center' }
                   
                ]]
            }
            initGridView(reqData,grid);
            $('#'+pageConfig.gridName).datagrid('loadData', jsonData);
        }
        getRightDate =function(){
            var ds='';
            $('#startDate').datebox().datebox('calendar').calendar({
                validator: function(date){
                    var now = new Date();
                    var d1 = new Date(now.getFullYear(), now.getMonth(), now.getDate());
                    return date<=d1;
                }
            });
            $('#endDate').datebox().datebox('calendar').calendar({
                validator: function(date){
                    var now = new Date();
                    var de =new Date(now.getFullYear(), now.getMonth(), now.getDate());
                    return  date<=de;
                }
            });
        }
        checkDate =function(){
            var startDate = $('#startDate').datetimebox('getValue');
             if(startDate!=""){
                 startDate.substring(0,21);
             }          
             var endDate = $('#endDate').datetimebox('getValue');
             if(endDate!=""){
                endDate.substring(0,21);
             }
             if(startDate !=''&& endDate !=''){
                var strA= startDate.replace(/\-/g, "").replace(/\:/g, "").replace(/\s+/g,"");
                var strB= endDate.replace(/\-/g, "").replace(/\:/g, "").replace(/\s+/g,"");
                if(strA>strB){
                    $('#endDate').datetimebox('setValue', '').datetimebox('hidePanel');
                    $.messager.alert('提示', '开始时间小于结束时间！');
                    return;
                }
              }
             var newDate =new Date();
             newDate=newDate.getFullYear() + '-' + (newDate.getMonth() + 1) + '-' + newDate.getDate() + ' ' + newDate.getHours() + ':' + newDate.getMinutes() + ':' + newDate.getSeconds();
             if(startDate&&endDate==''){
                endDate =newDate;
                $('#endDate').datetimebox('setValue',newDate);
             }
             if(startDate==''&&endDate){
                $.messager.alert('提示', '请输入开始时间');
                return
             }
        }
        /*onSelect =function(d){
            var issd = this.id == 'startDate', startDate = issd ? d : new Date($('#startDate').datebox('getValue')), endDate = issd ? new Date($('#endDate').datebox('getValue')) : d;
                if (endDate < startDate) {
                    $('#endDate').datebox('setValue', '').datebox('hidePanel');
                    $.messager.alert('错误','结束日期小于开始日期');
                }
        }*/
        getDataByCondition =function(){
            var dgrid=$('#'+pageConfig.gridName).datagrid('options');
            var machineCode = $('#machineCode').textbox('getValue');
            var DO_CD = $('#DO_CD').textbox('getValue');
            var startDate = $('#startDate').datebox('getValue');
            var endDate =$('#endDate').datebox('getValue');
            var BR_CD = $('#badReason').combobox('getValue');
            var reqData ={
                ET_CD: machineCode,
                DO_CD: DO_CD,
                BR_NM:BR_CD,
                StartDate: startDate,
                EndDate: endDate,
                IFS:'M000003',
                pageIndex:1,
                pageSize:dgrid.pageSize
            };
            reqGridData('/iPlant_ajax','badDetail_tab',reqData);
        }
    }
    cardDetail.prototype = {
        init: function () {
            $(function () {
                initGridData();
                getRightDate();
                $('#btnSearch').click(function(){
                	getDataByCondition();
                })
                $('#btnExprt').click(function(){
                    var reqData = {
                        IFS: 'M000003'
                    }
                    createTable('tbBadDetail','次品报表','badDetail_tab',reqData); 
                });
                $('#save').click(function(){
                    getDataByCondition();
                })

                $('.close').click(function(){
                    $('#queryTab').dialog('close');
                    initGridData();
                })

                $('#btnSearch').mouseover(function(){
                    checkDate();
                });
            });
        }
    }
    var card = new cardDetail();
    card.init();
})();