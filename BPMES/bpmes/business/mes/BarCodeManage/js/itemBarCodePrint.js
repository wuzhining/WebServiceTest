/* 启动时加载 */
/*
 */
(function() {
	function factoryInfo() {
		/**初始化公司combobox内容*/
		initGridData = function() {
			var dgrid =$("#MaterialTypeMaintenance_tab").datagrid("options");
			if(!dgrid) return;
			var reqData = {
				IFS: 'S0000005',
				pageIndex: 1,
				pageSize: dgrid.pageSize
			}
			reqGridData('/iPlant_ajax', 'MaterialTypeMaintenance_tab', reqData);
		},
		bindGridData = function(reqData, jsonData) {
			var gridList = {
				name: 'MaterialTypeMaintenance_tab',
				dataType: 'json',
				columns: [[
			        /*{field: 'MODEL_NM',title: '机型',width: 100,align: 'center'},*/
					{field: 'FCT_NM',title: '工厂名称',width: 120,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
					{field: 'ITEM_CD',title: '物料编码',width: 180,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
					{field: 'ITEM_NM',title: '物料描述',width: 130,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
					{field: 'ITEM_TYPE_NAME',title: '物料类型',width: 130,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
					{field: 'FIRST_BAR_CODE',title: '起始条码流水',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
			        {field: 'LAST_BAR_CODE',title: '结束条码流水',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
				    {field: 'PTY_QTY',title: '打印数量',width: 80,align: 'right',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
				    {field: 'CRT_ID',title: '打印人',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
				    {field: 'LAST_PRINT_TIME',title: '打印时间',width: 180,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
				    {field: 'img',title: '是否打印',width: 80,align: 'center',formatter:function(){//使用formatter格式化刷子
					       return "<img href='javascript:void(0)' class='easyui-linkbutton' src='../../../common/IplantCompent/themes/default/images/Printer.png'/>"}}
				]],
				 /**单击进入编辑模式*/
		        onClickCell: function (index,field,value) {
		        	var rows = dataGrid.datagrid('getRows'),row = rows[index];
	        	/**判断是否为可编辑字段*/
	        	if(field=='img'){
	        		openPrintPreview(row.PTY_QTY,row.CRT_ID,row.LAST_BAR_CODE,row.LAST_PRINT_TIME);
	        	}
		        }
			}
			initGridView(reqData, gridList);
			dataGrid.datagrid('loadData', jsonData);
		}
	}
	
	/*是否打印弹出打印预览页面*/
	openPrintPreview = function(PTY_QTY,CRT_ID,LAST_BAR_CODE,LAST_PRINT_TIME){
		$("#itemBarCodePrint_open").dialog("open").dialog('setTitle', '打印预览页面');
		$("#txtPTY_QTY").textbox('setValue',PTY_QTY);
		$("#txtCRT_ID").textbox('setValue',CRT_ID);
		$("#txtCurrentCount").textbox('setValue',1);
		$("#txtLAST_PRINT_TIME").textbox('setValue',LAST_PRINT_TIME);
		$("#txtLAST_BAR_CODE").textbox('setValue',LAST_BAR_CODE);
	}
	openSearchLayer = function() {
		    var dgrid =$("#MaterialTypeMaintenance_tab").datagrid("options"),ITEM_CD=$('#ITEM_CD').textbox('getValue');
			var reqData ={
				IFS:'S0000005',
				ITEM_CD:ITEM_CD,
                pageIndex:1,
                pageSize:dgrid.pageSize
			}
			reqGridData('/iPlant_ajax','MaterialTypeMaintenance_tab',reqData);
	},
	
	saveDept=function(){
		$.messager.confirm('确认框', '是否从6开始打印?', function (row) {
           	if(row==true){
                   	 var ajaxParam = {
                            url: '/iPlant_ajax',
                            dataType: 'JSON',
                            data: {
                                IFS: '',
                                PRNT_CD: PRNT_CD,
                            },
                            successCallBack:function(){
                           	 	initGridData();
                            }
                      };
                      iplantAjaxRequest(ajaxParam);
           	}
        });
	}

	factoryInfo.prototype = {
		init: function() {
			$(function() {
				/*初始化全局变量对象*/
				dataGrid = $('#MaterialTypeMaintenance_tab'),dataCompany=[],dataFactory=[],showmessage=$('#showMessageInfo'),editIndex = undefined,oldRow=undefined, reg=new RegExp("null","g");
				initGridData();
				/*获取工厂类别下拉*/
				$('.add').click(function() {					
					insertDataGrid();
				});

	            $('#btnSearch').click(function(){
					openSearchLayer();
				});
	            
	            $('#btnExprt').click(function(){
                	var now = new Date();
                    var year =now.getFullYear();
                	var reqData = {
                		IFS:'S0000005'
                	}
                	createTable('tbIMESReport','产品料号条码导出','MaterialTypeMaintenance_tab',reqData);
                });
			});
		}
	}
	var fcfo = new factoryInfo();
	fcfo.init();
})();