(function () {
    function cardDetail() {
        pageConfig={
            gridName: 'spare_tab',
            title:'备件管理',
        },
        initGridData=function(){
            var dgrid=$('#'+pageConfig.gridName).datagrid('options');
            if(!dgrid) return;
            var reqData = {
                    IFS: 'R000018',
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
                   { field: 'SP_CD', title: '备件编码', width: 200, align: 'center' },
                   { field: 'SP_NM', title: '备件名称', width: 200, align: 'center' },
                   { field: 'RT_NUM', title: '库存数量', width: 200, align: 'center' },
                   { field: 'DPT_NM', title: '领取部门', width: 200, align: 'center' },
                   { field: 'EMP_NM', title: '领取人', width: 200, align: 'center' },
                   { field: 'CRT_DT', title: '领取时间', width: 200, align: 'center' }
                ]]
            }
            initGridView(reqData,grid);
            $('#'+pageConfig.gridName).datagrid('loadData', jsonData);
        }
        getDataByCondition =function(){
        	var spareCD = $('#spareCD').val();
        	var spareNM = $('#spareNM').val();
            var reqData ={
            	SP_CD:spareCD,
            	SP_NM:spareNM,
                IFS:'R000018'
            };
            reqGridData('/iPlant_ajax',pageConfig.gridName,reqData);
        }
    }
    cardDetail.prototype = {
        init: function () {
            $(function () {
                initGridData();

                $('#btnSearch').click(function(){
                	getDataByCondition();
                })

                $('#save').click(function(){
                    getDataByCondition();
                	$('#queryTab').dialog('close'); 
                })

                $('.close').click(function(){
                    $('#queryTab').dialog('close');
                })
            });
        }
    }
    var card = new cardDetail();
    card.init();
})();