(function () {
    function cardDetail() {
        pageConfig={
            gridName: 'prodDetail_tab',
            title:'生产记录',
        }
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

            var dgrid=$('#'+pageConfig.gridName).datagrid('options');
            if(!dgrid) return;
            var reqData = {
                    IFS: 'M000002',
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
                   { field: 'DO_CD', title: '派工单号', width: 200, align: 'center' },
                   { field: 'MO_CD', title: '工单号', width: 200, align: 'center' },
                   { field: 'ET_NM', title: '设备编号', width: 100, align: 'center' },
                   { field: 'PT_CD', title: '产品编码', width: 100, align: 'center' },
                   { field: 'PT_NM', title: '产品名称', width: 200, align: 'center' },
                   { field: 'PD_NT', title: '生产次数', width: 200, align: 'center' },
                   { field: 'PD_TT_NUM', title: '实际生产数', width: 100, align: 'center' },
                   { field: 'PD_CL', title: '周期', width: 200, align: 'center' },
                   { field: 'TP1', title: '温度一', width: 200, align: 'center' },
                   { field: 'TP2', title: '温度二', width: 200, align: 'center' },
                   { field: 'PD_BGN_CL', title: '开始时间', width: 200, align: 'center' },
                   { field: 'PD_END_CL', title: '结束时间', width: 200, align: 'center' },
                   { field: 'CRT_DT', title: '上传时间', width: 150, align: 'center' },
                ]]
            }
            initGridView(reqData,grid);
            $('#'+pageConfig.gridName).datagrid('loadData', jsonData);
        }
        getRightDate =function(){
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
                    return date<=de;
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
        getDataByCondition =function(){
            var dgrid=$('#'+pageConfig.gridName).datagrid('options');
            var machineCode = $('#machineCode').textbox('getValue');
            var DO_CD = $('#DO_CD').textbox('getValue');
            var startDate = $('#startDate').datebox('getValue');
            var endDate = $('#endDate').datebox('getValue');
            var reqData ={
                ET_CD: machineCode,
                DO_CD: DO_CD,
                PD_BGN_CL: startDate,
                PD_END_CL: endDate,
                IFS:'M000002',
                pageIndex:1,
                pageSize:dgrid.pageSize
            }
             reqGridData('/iPlant_ajax','prodDetail_tab',reqData);
        }
    }
    cardDetail.prototype = {
        init: function () {
            $(function () {
                initGridData();
                getRightDate();
                $('#btnSearch').click(function(){
                	getDataByCondition();
//                    $('#queryTab').dialog('open').dialog('setTitle', '查询生产记录');
//                    $('#queryProdDetail').form('clear');
                })
                $('#btnExprt').click(function(){
                    var reqData = {
                        IFS: 'M000002'
                    }
                    createTable('tbProdDetail','生产报表','prodDetail_tab',reqData); 
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