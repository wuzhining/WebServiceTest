(function () {
    function equipCheckDetail() {
        pageConfig={
            gridName: 'EquipCheckReport_tab',
            title:'设备检点报表',
        },
        toBindType=0;
        setToBindType =function(value){
            this.toBindType=value;   
        }
        getToBindType =function(){
            return this.toBindType;
        }
        initGridData=function(){
            var dgrid=$('#'+pageConfig.gridName).datagrid('options');
            if(!dgrid) return;
            var reqData = {
                    IFS: 'R000020',
                    pageIndex:1,
                    pageSize:dgrid.pageSize
            }
         reqGridData('/iPlant_ajax',pageConfig.gridName, reqData);
        },
        bindGridData = function (reqData,jsonData) {
            var grid = {
                name: pageConfig.gridName,
                rownumbers:false,
                dataType: 'json',
                columns: [[
                    { field: 'TT_CD', title: '单据编号', width: 200, align: 'center' },
                    { field: 'PL_NM', title: '车间名称', width: 200, align: 'center' },
                    { field: 'ET_NM', title: '设备编号', width: 200, align: 'center' },
                    { field: 'TT_DETE', title: '点检时间', width: 200, align:'center'},
                    { field: 'EMP_NM', title: '点检人', width: 200, align: 'center' },
                    { field: 'TT_RT', title: '开机状态', width: 200, align: 'center' }
                     
                ]],
                
                    
                }  
            initGridView(reqData,grid);
            $('#'+pageConfig.gridName).datagrid('loadData', jsonData);
        }
        expanddata = function(){
            $('#'+pageConfig.gridName).datagrid({
              //  view: detailview,
                detailFormatter:function(index,row){
                    return '<div style="padding:2px"><table class="ddv"></table></div>';
                },
                onExpandRow: function(index,row){
                    var ddv = $(this).datagrid('getRowDetail',index).find('table.ddv');
                    
                    var ajaxParam = {
                        url: '/iPlant_ajax',
                        data: {
                            TT_CD:row.TT_CD,
                            IFS: 'R000021'
                        },
                        successCallBack: function(data) {
                            var rowNum = 0
                            if(data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS) {
                                rowNum = parseInt(data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS);
                            }
                            var rowCollection = createSourceObj(data);
                            var jsonData = {
                                total: rowNum,
                                rows: rowCollection
                            }
                            ddv.datagrid({
                                data:rowCollection,
                                fitColumns:true,
                                singleSelect:true,
                                rownumbers:true,
                                loadMsg:'',
                                height:'auto',
                                columns:[[
                                    {field:'CK_CD',title:'项目编号',width:200,align: 'center'},
                                    {field:'CK_NM',title:'项目名称',width:200,align: 'center'},
                                    {field:'CL_RT',title:'点检结果',width:200,align: 'center'},
                                    {field:'CL_MT',title:'是否生成维修单',width:200,align: 'center',formatter:function(value,row,index) {
                                        if(row.CL_MT=='Y'){
                                            return"是";
                                        }else{
                                            return"否";
                                        }
                                   }},
                                    {field:'CL_MR',title:'维修原因',width:200,align: 'center'}
                                ]],
                                onResize:function(){
                                    $('#'+pageConfig.gridName).datagrid('fixDetailRowHeight',index);
                                },
                                onLoadSuccess:function(){
                                    setTimeout(function(){
                                        $('#'+pageConfig.gridName).datagrid('fixDetailRowHeight',index);
                                    },0);
                                }
                            });
                            $('#'+pageConfig.gridName).datagrid('fixDetailRowHeight',index);
                            /*$('#'+pageConfig.gridName).datagrid('loadData', jsonData);*/
                            
                        }
                    }
                    iplantAjaxRequest(ajaxParam);
                    }
            })
        }
        getDataByCondition =function(){
            var queryStationName = $('#queryStationName').combobox('getValue');
            var queryEquipName = $('#queryEquipName').combobox('getValue');
            var startDate = $('#startDate').datebox('getValue');
            var endDate =$('#endDate').datebox('getValue');
            var reqData ={
            	PL_CD:queryStationName,
                ET_CD:queryEquipName,
                CL_BGN_DATE:startDate,
                CL_END_DATE:endDate,
                IFS:'R000020'
            }
            /*if(queryStationName==''&&queryEquipName==''&&startDate==''&&endDate==''){
                $.messager.alert('提示','请输入选择条件');
            }else */if((startDate==''&&endDate)||(startDate&&endDate=='')){
                $.messager.alert('提示','请输入你需要查询的查询时间');
            }else{
                reqGridData('/iPlant_ajax',pageConfig.gridName,reqData)

            }
        }
        toEquipName =function(){
            var ajaxParam ={
                url:'iPlant_ajax',
                data:{
                    IFS:'B000025',
                },
                successCallBack:function(data){
                    var rowNum=0;
                    if(data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS){
                      rowNum=parseInt(data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS);
                    }
                    var rowCollection=createSourceObj(data);
                    $("#queryStationName").combobox({
                        panelHeight:200,
                        data:rowCollection,
                        valueField:'PL_CD',  
                        textField:'PL_NM',
                        onSelect:function(record){
                            setToBindType(1);
                            var toStation =record.PL_CD;
                            bindEquipName(toStation);
                        },
                    });
                }
            }
            iplantAjaxRequest(ajaxParam);
        }
        bindEquipName =function(myData){
            var ajaxParam={
                url:'/iPlant_ajax',
                data:{
                    IFS:'R000022',
                    PL_CD:myData,
                },
                successCallBack:function(data){
                    var rowNum=0
                    if(data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS){
                        rowNum=parseInt(data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS);
                    }
                    var rowCollection=createSourceObj(data);
                    $('#queryEquipName').combobox({
                        data:rowCollection,
                        valueField:'ET_CD',
                        textField:'ET_NM',
                        panelWidth:200,
                        panelHeight:225,
                    });
                  }
            }
            iplantAjaxRequest(ajaxParam);
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
                    return date<=de;
                }
            });
        }
        onSelect =function(d){
            var issd = this.id == 'startDate', startDate = issd ? d : new Date($('#startDate').datebox('getValue')), endDate = issd ? new Date($('#endDate').datebox('getValue')) : d;
                if (endDate < startDate) {
                    $('#endDate').datebox('setValue', '').datebox('hidePanel');
                    $.messager.alert('错误','结束日期小于开始日期');
                }
        }
    }
    equipCheckDetail.prototype ={
        init: function () {
            $(function () {
                initGridData();
                toEquipName();
                expanddata();
                getRightDate();
                $('#queryEquipName').combo({onShowPanel:function(){
                    var toBindType=getToBindType();
                    if(toBindType=='0'){
                        $('#queryEquipName').combo('hidePanel');
                        $.messager.alert('提示','请先选择车间名称');
                        return
                    }
                }});

                $('#btnSearch').click(function(){
                    getDataByCondition();
                })

               /* $('#save').click(function(){
                    getDataByCondition();
                    $('#queryTab').dialog('close'); 
                })

                $('.close').click(function(){
                    $('#queryTab').dialog('close');
                })  */
        })
    }
       }
    var card = new equipCheckDetail();
    card.init();
})();