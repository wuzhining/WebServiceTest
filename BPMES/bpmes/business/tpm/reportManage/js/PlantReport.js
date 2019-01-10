(function () {
    function cardDetail() {
        pageConfig={
            gridName: 'plantReport_tab',
            title:'次品报表',
        },
        initGridData=function(){
            var dgrid=$('#'+pageConfig.gridName).datagrid('options');
            if(!dgrid) return;
            var reqData = {
                    IFS: 'R000006',
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
                   { field: 'MO_CD', title: '制令单号', width: 200, align: 'center' },
                   { field: 'ET_NM', title: '设备编号', width: 200, align: 'center' },
                   { field: 'PT_CD', title: '物料编码', width: 200, align: 'center' },
                   { field: 'PT_NM', title: '物料名称', width: 200, align: 'center' },
                   { field: 'DO_NUM', title: '计划生产数', width: 100, align: 'center' },
                   { field: 'PD_TT_NUM', title: '实际生产数', width: 100, align: 'center' },
                   { field: 'FINISHRATE', title: '达成率', width: 100, align: 'center' },
                ]]
            }
            initGridView(reqData,grid);
            $('#'+pageConfig.gridName).datagrid('loadData', jsonData);
        }
        getDataByCondition =function(){
            var startDate = $('#startDate').datetimebox('getValue');
            var endDate = $('#endDate').datetimebox('getValue');
            var reqData ={
                BGN_DATE: startDate,
                END_DATE: endDate,
                IFS:'R000006'
            }
            /*if(startDate==''&&endDate==''){
                $.messager.alert('提示','请输入选择条件');
            }else{
                reqGridData('/iPlant_ajax',pageConfig.gridName,reqData)
                $('#queryTab').dialog('close'); 
            }*/
            reqGridData('/iPlant_ajax',pageConfig.gridName,reqData)
        },
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
                    return date<=de;
                }
            });
        }
      
    }
    cardDetail.prototype = {
        init: function () {
            $(function () {
                initGridData();
                getRightDate();
                $('#btnExprt').click(function(){
                	var reqData = {
                	    IFS: 'R000006'
                	}
                	createTable('tbPlantReport','计划达成率','plantReport_tab',reqData);
                	
                });

                $('#btnSearch1').click(function(){
                    getDataByCondition();
                })
            });
        }
    }
    var card = new cardDetail();
    card.init();
})();