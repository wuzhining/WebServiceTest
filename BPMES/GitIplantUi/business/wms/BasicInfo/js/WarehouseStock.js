(function () {
    function equipCheckDetail() {
        pageConfig={
            gridName: 'WarehouseStock_tab',
            title:'仓库物料库存报表',
        },
        toBindType=0;
        setToBindType =function(value){
            this.toBindType=value;   
        }
        getToBindType =function(){
            return this.toBindType;
        }
        initGridData=function(){
            var dgrid= dataGrid.datagrid('options');
            if(!dgrid) return;
            var reqData = {
                    IFS: 'WMS_B00069',
                    pageIndex:1,
                    pageSize:dgrid.pageSize
            }
         reqGridData('/iPlant_ajax',pageConfig.gridName, reqData);
        },
        bindGridData = function (reqData,jsonData) {
            var grid = {
                name: 'WarehouseStock_tab',
                rownumbers:true,
                dataType: 'json',
                border : 2,  
                nowrap : false, 
                fit : true,  
//                frozenColumns: [[    
//                                 { title: '唯一码', field: 'regionname', width: 100},
//                                 { title: '物料编码', field: 'regionname', width: 150},
//                                 { title: '物料名称', field: 'regionname', width: 150}
//                             ]], 
                columns: [ 
							 [
                             {"title":"","colspan":3}, 
							 {"title":"WMS","colspan":10}, 
							 {"title":"MES","colspan":12}
							 ],
	                          [
                               {"title":"","colspan":3},
	                           {"title":"来料录入","colspan":2},  
	                           {"title":"物料入库","colspan":4},
	                           {"title":"物料出库","colspan":4},
	                           {"title":"工单领料","colspan":2},
	                           {"title":"生产","colspan":6},
	                           {"title":"退料","colspan":4}
	                           ],  
	                          [
							   {"field":"BARCODE","title":"唯一码","width": "200",align: 'center',"rowspan":1},  
							   {"field":"MATERIA_ID","title":"物料编码","width": "200",align: 'center',"rowspan":1},  
							   {"field":"MATERIA_NAME","title":"物料名称","width": "200",align: 'center',"rowspan":1},
	                           {"field":"SUPPLIER_NAME","title":"供应商","width": "200",align: 'center',"rowspan":1},  
	                           {"field":"LAILIAOSUM","title":"来料数","width": "200",align: 'center',"rowspan":1},  
	                           {"field":"WAREHOUSE_NAME","title":"仓库名称","width": "200",align: 'center',"rowspan":1},  
	                           {"field":"RUKUNUM","title":"入库数量","width": "200",align: 'center',"rowspan":1},  
	                           {"field":"RUKUMEM","title":"入库人","width": "200",align: 'center',"rowspan":1},  
	                           {"field":"INTIME","title":"入库时间","width": "200",align: 'center',"rowspan":1},
	                           {"field":"FALIAOMO","title":"发料工单","width": "200",align: 'center',"rowspan":1},  
	                           {"field":"CHUKUNUM","title":"出库数量","width": "200",align: 'center',"rowspan":1},  
	                           {"field":"CHUKUMEM","title":"出库人","width": "200",align: 'center',"rowspan":1},  
	                           {"field":"OUTTIME","title":"出库时间","width": "200",align: 'center',"rowspan":1},
	                           {"field":"LINGLIAOMO","title":"领料工单","width": "200",align: 'center',"rowspan":1},  
	                           {"field":"LINGLIAOSUM","title":"领料数","width": "200",align: 'center',"rowspan":1},
	                           {"field":"MO","title":"工单号","width": "200",align: 'center',"rowspan":1},  
	                           {"field":"FDNO","title":"飞达号","width": "200",align: 'center',"rowspan":1},
	                           {"field":"ZWNO","title":"栈位","width": "200",align: 'center',"rowspan":1},  
	                           {"field":"SHANGLIAOSUM","title":"上料数","width": "200",align: 'center',"rowspan":1},
	                           {"field":"SHANGLIAOMEM","title":"上料人","width": "200",align: 'center',"rowspan":1},  
	                           {"field":"SHANGLIAOTIME","title":"上料时间","width": "200",align: 'center',"rowspan":1},
	                           {"field":"TUILIAOMO","title":"退料工单","width": "200",align: 'center',"rowspan":1},  
	                           {"field":"TUILIAOSUM","title":"退料数","width": "200",align: 'center',"rowspan":1},
	                           {"field":"TUILIAOMEM","title":"退料人","width": "200",align: 'center',"rowspan":1},  
	                           {"field":"TUILIAOTIME","title":"退料时间","width": "200",align: 'center',"rowspan":1}]
							  ],
                
                    
                }            
            initGridView(reqData,grid);
           // $('#'+pageConfig.gridName).datagrid('loadData', jsonData);
            dataGrid.datagrid({
				onLoadSuccess: function(data) {
			        //所有列进行合并操作
			        //$(this).datagrid("autoMergeCells");
			       //指定列进行合并操作
			        $(this).datagrid("autoMergeCells", ['groupId', 'BARCODE','MATERIA_ID','FALIAOMO','CHUKUNUM','CHUKUMEM','OUTTIME','LINGLIAOMO','LINGLIAOSUM','MO','FDNO','ZWNO',
			                                            'SHANGLIAOSUM','SHANGLIAOMEM','SHANGLIAOTIME','TUILIAOMO','TUILIAOSUM','TUILIAOMEM','TUILIAOTIME']);
			    }
			}).datagrid('loadData', jsonData);
        } 
        getDataByCondition =function(){
            var querybarcode =$('#querybarcode').textbox('getValue');
            var reqData ={
                BARCODE:querybarcode,
                IFS:'WMS_B00069'
            }            
                reqGridData('/iPlant_ajax',pageConfig.gridName,reqData)

            
        }
          
    }
    equipCheckDetail.prototype ={
        init: function () {
            $(function () {
            	dataGrid = $('#WarehouseStock_tab');
            	
                initGridData();
                $('#btnSearch').click(function(){
                    getDataByCondition();
                });
                $('#btnExprt').click(function(){
                	var now = new Date();
                    var year =now.getFullYear();
                	var reqData = {
                		IFS:'WMS_B00069'
                	}
                	createTable('tbWMSReport','仓库唯一码追溯报表','WarehouseStock_tab',reqData);
//              	saveAsExcel('WarehouseStock_tab');
                });
        })
    }
       }
    var card = new equipCheckDetail();
    card.init();
})();