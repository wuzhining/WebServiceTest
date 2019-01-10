(function () {
    function cardDetail() {
        pageConfig={
            gridName: 'equipment_tab',
            title:'设备维修',
        },
        ccObj={};
        initGridData=function(){
            var dgrid=$('#'+pageConfig.gridName).datagrid('options');
            if(!dgrid) return;
            var reqData = {
                    IFS: 'H000014',
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
                   { field: 'RP_CD', title: '维修单号', width: 200, align: 'center' },
                   { field: 'ET_CD', title: '设备编号', width: 200, align: 'center' },
                   { field: 'RP_ST', title: '维修内容', width: 200, align: 'center' },
                   { field: 'KB_IU', title: '维修原因', width: 200, align: 'center' },
                   { field: 'EMP_NM', title: '维修人员', width: 200, align: 'center'},
                   { field: 'BGN_DT', title: '开始时间', width: 200, align: 'center' },
                   { field: 'END_DT', title: '结束时间', width: 200, align: 'center' }
                ]]
            }
            initGridView(reqData,grid);
            $('#'+pageConfig.gridName).datagrid('loadData', jsonData);
        }
        getDataByCondition =function(){
        	var equipmentCode = $('#equipmentCode').val();
        	var equipmentNM = $('#equipmentNM').combobox('getValue');
            var startDate = $('#startDate').datetimebox('getValue');
            var endDate = $('#endDate').datetimebox('getValue');
            var reqData ={
            	RP_CD:equipmentCode,
            	ET_CD:equipmentNM,
                BGN_DT: startDate,
                END_DT: endDate,
                IFS:'H000014'
            };
            reqGridData('/iPlant_ajax',pageConfig.gridName,reqData);
        }
    }
    cardDetail.prototype = {
        init: function () {
            $(function () {
            	ajaxParam={
                        url:'/iPlant_ajax',
                        data:{
                            IFS:'B000029',
                        },
                        successCallBack:function(data){
                            var rowNum=0
                            if(data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS){
                              rowNum=parseInt(data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS);
                            }
                            var rowCollection=createSourceObj(data);
                            for(var i=0; i<rowCollection.length; i++){
                            	ccObj[rowCollection[i].ET_CD]=rowCollection[i].ET_NM;
                            }
                              $("#equipmentNM").combobox({
                                  panelHeight:200,
                                  data:rowCollection,
                                  valueField:'ET_CD',  
                                  textField:'ET_CD',
                              });                                                                                    
                        }
                    };
                   iplantAjaxRequest(ajaxParam);
                   
                   ajaxParam1={
                           url:'/iPlant_ajax',
                           data:{
                               IFS:'B000084',
                           },
                           successCallBack:function(data){
                               var rowCollection=createSourceObj(data);
                               for(var i=0; i<rowCollection.length; i++){
                               	ccObj[rowCollection[i].EMP_CD]=rowCollection[i].EMP_NM;
                               }                                                                                   
                           }
                       };
                   iplantAjaxRequest(ajaxParam1);
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