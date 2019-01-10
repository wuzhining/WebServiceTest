/* 启动时加载 */
/*
 */
//最后更新时间2018-9-3	datagrid字段后台传值不足，没有对完。highchart图表数据没有对接。
(function() {
	function factoryInfo() {
		initGridData = function(mono,finished,line,classType,startDate,endDate) {
			var dgrid = dataGrid.datagrid('options');
			if(!dgrid) return;
			var reqData = {
				IFS: 'MES_R0103',
				DATE_TIME_A: startDate,
				DATE_TIME_B: endDate,
				LINE_CD: line,
				MO_NO: mono,
				SHIFT_CD: classType,
				ITEM_CD: finished,
				pageIndex: 1,
				pageSize: dgrid.pageSize
			}
			reqGridData('/iPlant_ajax', 'QualificationRateReport_tab', reqData);
		},
		
		bindGridData = function(reqData, jsonData) {
			var gridList = {
				name: 'QualificationRateReport_tab',
				dataType: 'json',
				columns: [[
					{field: 'PD_LN_NM',title: '工单号',width: 160, align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
					{field: 'ITEM_CD',title: '成品编码',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
					{field: 'ITEM_NM',title: '成品名称',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
					{field: 'WO_NO',title: '派工单号',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span style='color:#FF0000' title='" + value + "'>" + value + "</span>";}}, 
					{field: 'PLAN_PO_QTY',title: '工单数量',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
					{field: '3',title: '实际生产数',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
					{field: 'GOOD_QTY',title: '完成率',width: 60,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
					{field: 'DFCT_QTY',title: '良品数',width: 60,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
				    {field: 'COM_RATE',title: '不良品数',width: 60,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
				    {field: '6',title: '良品率',width: 60,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span style='color:#FF0000' title='" + value + "'>" + value + "</span>";}},
				]],
			}
			initGridView(reqData, gridList);
			dataGrid.datagrid('loadData', jsonData);
		},
		/*显示datagrid*/
		showDataGrid = function(mono,startDate,endDate){
			$('div[region="center"]').css('display','block');	/*显示布局的中间区域：datagrid部分和title部分*/
			initGridData(mono,startDate,endDate);		/*加载datagrid数据列*/
		},
		
		/*显示hightCharts*/
		showHightCharts = function(){
			/*柱状图*/
			Highcharts.chart('columnarChart', {
   			    chart: {
   			        type: 'column',
   			        options3d: {
   			            enabled: true,
   			            alpha: 2,
   			            beta: 3,
   			            depth: 45
   			        },
   			        backgroundColor: '#FFFFFF'
   			    },
   			    title: {
   			        text: '<span style="color:#1771B3;font-size:14px;">合格率</span>'
   			    },
   			 plotOptions: {
   			        column: {
   			            depth: 25,
   			            dataLabels:{
                          enabled:true, // dataLabels设为true
                          style:{
                              color:'#D7DEE9'
                          }
   			            }
   			        },
       			     series: {
	       		            animation: {
	       		                duration: 500,
	       		                easing: 'easeOutBounce'
	       		            }
	       			     }
   			    },
   			    xAxis: {
   			    	categories: ['1区', '2区', '3区', '4区', '5区','6区','1区', '2区', '3区', '4区', '5区','6区'],
   			    	min : 0,
   			    	max : 12,
   			    	labels:{
   			    		style:{
   			    			color:'#000000',
   			    			fontSize:'16px'
   			    		}
   			    	}
   			    },
   			    yAxis: {
   			    	labels:{
   			    		style:{
   			    			color:'#000000',
   			    			fontSize:'16px'
   			    		}
   			    	}
   			    },
	   			legend: {
	                 itemStyle: {
	                     color: '#000000'
	                 },
	                 itemHoverStyle: {
	                     color: '#1771B3'
	                 },
	                 itemHiddenStyle: {
	                     color: '#606063'
	                 }
	            },
   			    series: [{
   			    	
   		            name: '计划产量',
   		            data: [160,168,200,160,168,200,160,168,200,160,168,200],
   		            color:'#4F81BD'
   			    },{
   				    name: '<span style="color:#1771B3;font-weight: bold;">实际产量</span>',
   				    data: [170,175,158,160,168,200,160,168,200,160,168,200],
   				    color:'#C0504D'
   			    }],
   			    credits: {
   			          enabled:false
   			    },exporting: {
   			    	enabled:false
   			    }
   			});	
			/*柱状图	END*/
		},
		
		loadComboboxData = function(){
			/*绑定车间下拉框数据*/
			var WorkShop = {
		            url: "/iPlant_ajax",
		            dataType: "JSON",
		            data: {IFS:'B000025'},
		            successCallBack: function(a) {
		            	var op = a.RESPONSE[0].RESPONSE_DATA;	
		            	var workShopData = [];
		                $.each(op,function(n,obj) {
		                	workShopData.push({'id':obj.PL_CD,'text':obj.PL_NM});
					    }); 
		                $("#WorkShop").combobox({
	                		valueField:'id',
	                	    textField:'text',
	                	    data:workShopData,
	                	    panelWidth:'200px'
	                	})
		            },
		            errorCallBack: function() {
		                $.messager.alert("提示", '请联系管理员，查询失败！')
		            }
		        };
			iplantAjaxRequest(WorkShop);
			/*绑定车间下拉框数据	END*/
			
			/*绑定工单号码下拉框数据*/
			var MoNo = {
		            url: "/iPlant_ajax",
		            dataType: "JSON",
		            data: {IFS:'W0000013',WO_STATE:'8'},		/*查询主单单号*/
		            successCallBack: function(a) {
		            	var op = a.RESPONSE[0].RESPONSE_DATA;	
		            	var MonoData = [];
		                $.each(op,function(n,obj) {
		                	MonoData.push({'id':obj.MO_NO,'text':obj.MO_NO});
					    });
		                var MoNo2 = {
		    		            url: "/iPlant_ajax",
		    		            dataType: "JSON",
		    		            data: {IFS:'W0000013',WO_STATE:'7'},		/*查询主单单号*/
		    		            successCallBack: function(a) {
		    		            	var op2 = a.RESPONSE[0].RESPONSE_DATA;	
		    		                $.each(op2,function(o,obj2) {
		    		                	MonoData.push({'id':obj2.MO_NO,'text':obj2.MO_NO});
		    					    });
		    		                $("#Mono").combobox({
		    	                		valueField:'id',
		    	                	    textField:'text',
		    	                	    data:MonoData,
		    	                	    panelWidth:'200px'
		    	                	})
		    		            },
		    		            errorCallBack: function() {
		    		                $.messager.alert("提示", '请联系管理员，查询失败！')
		    		            }
		    		        };
		    			iplantAjaxRequest(MoNo2);
		            },
		            errorCallBack: function() {
		                $.messager.alert("提示", '请联系管理员，查询失败！')
		            }
		        };
			iplantAjaxRequest(MoNo);
			/*绑定工单号码下拉框数据	END*/
			
			/*绑定线别下拉框数据*/
			var Line = {
		            url: "/iPlant_ajax",
		            dataType: "JSON",
		            data: {IFS:'B000109'},
		            successCallBack: function(a) {
		            	var op = a.RESPONSE[0].RESPONSE_DATA;	
		            	var lineData = [];
		                $.each(op,function(n,obj) {
		                	lineData.push({'id':obj.PD_LN_CD,'text':obj.PD_LN_NM});
					    }); 
		                $("#Line").combobox({
	                		valueField:'id',
	                	    textField:'text',
	                	    data:lineData,
	                	    panelWidth:'200px'
	                	})
		            },
		            errorCallBack: function() {
		                $.messager.alert("提示", '请联系管理员，查询失败！')
		            }
		        };
			iplantAjaxRequest(Line);
			/*绑定线别下拉框数据	END*/
			
			/*绑定班组下拉框数据*/
			var Class = {
		            url: "/iPlant_ajax",
		            dataType: "JSON",
		            data: {IFS:'B000113'},
		            successCallBack: function(a) {
		            	var op = a.RESPONSE[0].RESPONSE_DATA;	
		            	var classData = [];
		                $.each(op,function(n,obj) {
		                	classData.push({'id':obj.TG_CD,'text':obj.TG_NM});
					    }); 
		                $("#ClassType").combobox({
	                		valueField:'id',
	                	    textField:'text',
	                	    data:classData,
	                	    panelWidth:'200px'
	                	})
		            },
		            errorCallBack: function() {
		                $.messager.alert("提示", '请联系管理员，查询失败！')
		            }
		        };
			iplantAjaxRequest(Class);
			/*绑定班组下拉框数据	END*/
			
			/*绑定成品名称下拉框数据*/
			var Finished = {
		            url: "/iPlant_ajax",
		            dataType: "JSON",
		            data: {
		            	IFS:'Z000007',			/*物料维护中物料类别为成品的数据*/
		            	ITEM_TYPE:"FGD"
		            },
		            successCallBack: function(a) {
		            	var op = a.RESPONSE[0].RESPONSE_DATA;	
		            	var finishedData = [];
		            	var finishedObj = {};
		                $.each(op,function(n,obj) {
		                	finishedData.push({'id':obj.ITEM_CD,'text':obj.ITEM_NM});
		                	finishedObj[obj.ITEM_CD] = obj.ITEM_NM;
					    }); 
		                $("#Finished").combobox({
	                		valueField:'id',
	                	    textField:'text',
	                	    data:finishedData,
	                	    panelWidth:'200px',
	                	    onSelect: function(data){
	                	    	$("#FinishedName").textbox('setValue',finishedObj[data.id]);
	                	    }
	                	})
		            },
		            errorCallBack: function() {
		                $.messager.alert("提示", '请联系管理员，查询失败！')
		            }
		        };
			iplantAjaxRequest(Finished);
			/*绑定成品名称下拉框数据	END*/
		}
		
	}
	
	factoryInfo.prototype = {
		init: function() {
			$(function() {
				/*初始化全局变量对象*/
				dataGrid = $('#QualificationRateReport_tab');
				loadComboboxData();									/*绑定搜索下拉框数据*/
				$('div[region="center"]').css('display','none');	/*隐藏布局的中间区域：datagrid部分和title部分*/
				
				$("#btnSearch").click(function(){
					var mono = $("#Mono").combobox('getValue');					/*获取工单输入的数据*/
					var startDate = $("#StartDate").datetimebox('getValue');	/*获取开始日期*/
					var endDate = $("#EndDate").datetimebox('getValue');		/*获取结束日期*/
					
					showDataGrid(mono,startDate,endDate);
					showHightCharts();
				});
				
				$("#btnReset").click(function(){
					$("#northForm").form('clear');
				});
			});
		}
	}
	var fcfo = new factoryInfo();
	fcfo.init();
})();