/* 启动时加载 */
/*订单查询
 */
(function() {
	function factoryInfo() {
		/**初始化公司combobox内容*/
		initGridData = function() {
			var company = {
                url: "/iPlant_ajax",
                dataType: "JSON",
                data: {IFS: "W000001"},
                successCallBack: function(a) {
                	dataCompany = [];
                	var op = a.RESPONSE[0].RESPONSE_DATA;
                    $.each(op,function(n,obj) {
                    	dataCompany.push({'value':obj.CP_CD,'text':obj.CP_NM});
				    });  
                },
                errorCallBack: function() {
                    $.messager.alert("提示", '请联系管理员，查询失败！')
                }
            };
			iplantAjaxRequest(company),
			/**初始化工厂类型combobox内容*/
			factory = {
                url: "/iPlant_ajax",
                dataType: "JSON",
                data: {IFS:'W000001',DICT_CD:"CFT01",USE_YN:'Y'},
                successCallBack: function(a) {
                	dataFactory = [];
                	var op = a.RESPONSE[0].RESPONSE_DATA;
                    $.each(op,function(n,obj) {
                    	dataFactory.push({'value':obj.DICT_IT,'text':obj.DICT_IT_NM});
				    });  
                },
                errorCallBack: function() {
                    $.messager.alert("提示", '请联系管理员，查询失败！')
                }
            };
			iplantAjaxRequest(factory);
			var dgrid = dataGrid.datagrid('options');
			if(!dgrid) return;
			var reqData = {
				IFS: 'W000001',
				pageIndex: 1,
				pageSize: dgrid.pageSize
			}
			reqGridData('/iPlant_ajax', 'OrderInquiry_tab', reqData);
		},
		
		bindGridData = function(reqData, jsonData) {
			var gridList = {
				name: 'OrderInquiry_tab',
				dataType: 'json',
				columns: [[
					{field: 'FCT_NM',title: '工厂名称',width: 100,align: 'center',
						editor:{type:'validatebox',options:{valueField:'value',textField:'text',data:dataFactory,required:true}}},
					{field: 'MO_NO',title: '工单号',width: 150,align: 'center',
						editor:{type:'validatebox',
			        	   options:{required:true, validType:['length[1,30]','specialTextCharacter']}}},
					{field: 'ITEM_CD',title: '物料号',width: 150,align: 'center',
			        		  editor:{type:'validatebox',options:{validType:['length[1,25]','specialTextCharacter']}}}, 
			        {field: 'MO_STATE_NM',title: '订单状态',width: 80,align: 'center'},
					{field: 'PLAN_PO_QTY',title: '工单计划产量',width: 85,align: 'right',
						editor:{type:'validatebox',options:{valueField:'value',textField:'text',data:dataCompany,required:true}}}, 
					{field: 'MODEL_NM',title: '机型',width: 80,align: 'center',
								editor:{type:'validatebox',options:{validType:['length[1,100]','specialTextCharacter']}}},
					{field: 'PLAN_STRT_DT',title: '计划开始时间',width: 200,align: 'center',
							editor:{type:'validatebox',options:{valueField:'value',textField:'text',data:dataFactory,required:true}}}, 
					{field: 'PLAN_END_DT',title: '计划完成时间',width: 200,align: 'center',
								editor:{type:'validatebox',
			        	   options:{validType:['length[1,100]','specialTextCharacter']}}}, 
					{field: 'CRT_ID',title: '创建用户',width: 100,align: 'center'}, 
					{field: 'CRT_DT',title: '创建时间',width: 200,align: 'center',
						editor:{type:'validatebox',
	        	   options:{validType:['length[1,100]','specialTextCharacter']}}}, 
				]],
			}
			initGridView(reqData, gridList);
			dataGrid.datagrid('loadData', jsonData);
		},
		
	      /*获取输入框里面的内容然后查询 */
	  	openSearchLayer = function() {
	  		    var dgrid=$('#OrderInquiry_tab').datagrid('options');
	  		    var searchMO_NO = $('#searchMO_NO').textbox('getValue');		/*工单号*/
	  		    var searchITEM_CD = $('#searchITEM_CD').textbox('getValue');	
		  		var searchPLAN_STRT_DT = $('#searchPLAN_STRT_DT').textbox('getValue');	
		  		var searchPLAN_END_DT = $('#searchPLAN_END_DT').textbox('getValue');	
		  		var searchMODEL_NM = $('#searchMODEL_NM').textbox('getValue');	
		        var searchMO_STATE =$('#searchMO_STATE').combobox('getValue');			/*工单状态*/
	  			var reqData ={
	  				  MO_NO: searchMO_NO,
	  		          ITEM_CD: searchITEM_CD,
	  		          PLAN_STRT_DT: searchPLAN_STRT_DT,
	  		          PLAN_END_DT: searchPLAN_END_DT,
	  		          MO_STATE: searchMO_STATE,
	  		          MODEL_NM : searchMODEL_NM,
	  				  IFS:'W000001',
	                  pageIndex:1,
	                  pageSize:dgrid.pageSize
	  			}
	  			reqGridData('/iPlant_ajax','OrderInquiry_tab',reqData);
	  	}
	  	
	}
		
     
     
     
	factoryInfo.prototype = {
		init: function() {
			$(function() {
				var ajaxParam2={
	                    url:'/iPlant_ajax',
	                    data:{
	                        IFS:'W0000025',
	                    },
	                    successCallBack:function(data){
	                    	$('#searchMO_STATE').combobox('clear');
	                        var rowCollection=createSourceObj(data); 
	                        var arr = [];
	                        arr.push({"value":"", "text":"全部"});
	                        for(var i=0; i< rowCollection.length; i++){
	                        	arr.push({"value":rowCollection[i].DICT_IT, "text":rowCollection[i].DICT_IT_NM});
	                        }
	                        $('#searchMO_STATE').combobox({
	                            data:arr,
	                            valueField:'value',
	                            textField:'text',
	                            panelWidth:150
	                        });
	                    }
	                }
	                iplantAjaxRequest(ajaxParam2);
				
				
				/*初始化全局变量对象*/
				dataGrid = $('#OrderInquiry_tab'),dataCompany=[],dataFactory=[],showmessage=$('#showMessageInfo'),editIndex = undefined,oldRow=undefined, reg=new RegExp("null","g");
				initGridData();
				/*获取工厂类别下拉*/
				$('.add').click(function() {					
					insertDataGrid();
				});
				
				$('.delete').click(function(){
					deleteDataGrid();
	            });

				$('.save').click(function() {
					saveDataGrid();
				});
				$('#btnSearch').click(function() {
					openSearchLayer();					/*调用查询*/
				
				});
				/*调用下载任务弹窗*/ 
				$('#btnExprt2').click(function() {				
					$("#DownloadTask").dialog("open").dialog('setTitle', '下载任务');
				});
			});
		}
	}
	var fcfo = new factoryInfo();
	fcfo.init();
})();