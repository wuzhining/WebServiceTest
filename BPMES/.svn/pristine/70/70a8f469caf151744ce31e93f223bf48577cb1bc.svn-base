/* 启动时加载 */
/*
*/
(function(){
	function screen_wo(){
    	initGridData=function(){
    		searchDataByCondition();
    		initscreen();
        },
        bindGridData = function(reqData, jsonData) {
			var dataColumn=[
	            {field : 'LINE',title:'产线',width:200}, 
	    		{field : 'STATION',title : '车间 ',width : 200},
	    		{field : 'WORKORDER',title : '工单 ',width : 250},
	    		{field : 'MERCODE',title : '物料编码',width : 200},
	    		{field : 'MERNAME',title : '物料名称 ',width : 200},
	    		{field : 'PLANNUM',title : '排产数量 ',width : 120},
	    		{field : 'OVERNUM',title : '成数量',width : 100},
	    		{field : 'BADNUM',title : '次品数量',width : 100},
	    		{field : 'BEGTIME',title : '计划开始时间',width : 200},
	    		{field : 'ENDTIME',title : '计划完成时间',width : 200},
	    		{field : 'STATUS',title : '工单状态',width : 110}
		    ];
			var gridList = {
				name: 'screen_wo_tab',
				dataType: 'json',
				singleSelect:true,
				columns: [dataColumn]
			}
			initGridViewNoPage(reqData, gridList);
			dataGrid.datagrid('loadData', jsonData);
		},
		searchDataByCondition =function (){
			var url='screen_wo.json';
			var dgrid = $("#screen_wo_tab").datagrid('options');
			var reqData ={
	        	IFS:'resultList',
	        	pageIndex:1,
	        	pageSize:dgrid.pageSize
			};
			
			$.extend(reqData,{staticFlag:1});
			reqGridData(url,'screen_wo_tab',reqData);
	    },
        initscreen = function(){
	    	option1 = {
    		    "title": {
    		        "text": "完成工单情况",
    		        x:"center",
    		        y:"top",
    		        textStyle: {
    		            fontSize: '22'
    		        },
    		        subtextStyle: {
    		            color: '#90979c',
    		            fontSize: '16',

    		        },
    		    },
    		    "tooltip": {
    		        "trigger": "axis",
    		        "axisPointer": {
    		            "type": "shadow",
    		            textStyle: {
    		                color: "#fff"
    		            }

    		        },
    		    },
    		    "grid": {
    		        "borderWidth": 0,
    		        "top": 110,
    		        "bottom": 95,
    		        textStyle: {
    		            color: "#fff"
    		        }
    		    },
    		    "legend": {
    		        x: 'center',
    		        y: 'bottom',
    		        textStyle: {
    		            color: '#90979c',
    		        },
    		        "data": ['老用户', '新用户', '总']
    		    },
    		     

    		    "calculable": true,
    		    "xAxis": [{
    		        "type": "category",
    		        "axisLine": {
    		            lineStyle: {
    		                color: '#90979c'
    		            }
    		        },
    		        "splitLine": {
    		            "show": false
    		        },
    		        "axisTick": {
    		            "show": false
    		        },
    		        "splitArea": {
    		            "show": false
    		        },
    		        "axisLabel": {
    		            "interval": 0,

    		        },
    		        "data": xData,
    		    }],
    		    "yAxis": [{
    		        "type": "value",
    		        "splitLine": {
    		            "show": false
    		        },
    		        "axisLine": {
    		            lineStyle: {
    		                color: '#90979c'
    		            }
    		        },
    		        "axisTick": {
    		            "show": false
    		        },
    		        "axisLabel": {
    		            "interval": 0,

    		        },
    		        "splitArea": {
    		            "show": false
    		        },

    		    }],
    		    "series": [{
    		            "name": "老用户",
    		            "type": "bar",
    		            "stack": "总量",
    		            "barMaxWidth": 35,
    		            "barGap": "10%",
    		            "itemStyle": {
    		                "normal": {
    		                    //"color": "rgba(255,144,128,1)",
    		                    "label": {
    		                        "show": true,
    		                        "textStyle": {
    		                            "color": "#fff"
    		                        },
    		                        "position": "insideTop",
    		                        formatter: function(p) {
    		                            return p.value > 0 ? (p.value) : '';
    		                        }
    		                    }
    		                }
    		            },
    		            "data": [
    		                42.25,
    		                42.02,
    		                46.66,
    		                41.85,
    		                42.65,
    		                43.88,
    		                43.27,
    		                43.04,
    		                41.96,
    		                42.95,
    		                42.69,
    		                39.65
    		            ],
    		        },

    		        {
    		            "name": "新用户",
    		            "type": "bar",
    		            "stack": "总量",
    		            "itemStyle": {
    		                "normal": {
    		                    "color": "rgba(0,191,183,1)",
    		                    "barBorderRadius": 0,
    		                    "label": {
    		                        "show": true,
    		                        "position": "top",
    		                        formatter: function(p) {
    		                            return p.value > 0 ? (p.value) : '';
    		                        }
    		                    }
    		                }
    		            },
    		            "data": [
    		                15.50,
    		                14.29,
    		                17.97,
    		                14.11,
    		                15.44,
    		                16.46,
    		                16.41,
    		                14.02,
    		                15.76,
    		                13.08,
    		                14.58,
    		                10.41
    		            ]
    		        }, {
    		            "name": "总",
    		            "type": "line",
    		            "stack": "总量",
    		            symbolSize:20,
    		            symbol:'circle',
    		            "itemStyle": {
    		                "normal": {
    		                    "color": "rgba(252,230,48,1)",
    		                    "barBorderRadius": 0,
    		                    "label": {
    		                        "show": true,
    		                        "position": "top",
    		                        formatter: function(p) {
    		                            return p.value > 0 ? (p.value) : '';
    		                        }
    		                    }
    		                }
    		            },
    		            "data": [
    		                57.75,
    		                56.31,
    		                64.63,
    		                55.96,
    		                58.09,
    		                60.32,
    		                59.68,
    		                57.07,
    		                57.07,
    		                56.02,
    		                57.27,
    		                50.06
    		            ]
    		        },
    		    ]
    		}
	    	
			option2 = {  
				title : {
					x:"center",
					y:"top",
					text: "前五不良原因"  
				},  
				//工具箱  
				toolbox: {  
					show: true,  
					feature: {  
						//保存图片  
						saveAsImage: {  
							show: false  
						}  
					}  
				},  
				//图例  
				legend: {  
					x: 'center',
					y:"bottom",
					data: ['AAA','BBB','FFF','GGG']  
				},  
				xAxis: {  
					//data: ["AAA","BBB","CCC"]  
				},  
				yAxis: {},  
				series: [{  
				name: '销量',
				type: 'pie',  //饼图  
				radius: '55%',  
				center: ['50%', '60%'],  
				data: [
					{value:123, name: 'AAA'},  
					{value:153, name: 'GGG'},  
					{value:223, name: 'FFF'},  
					{value:14, name: 'BBB'}  
				]  
				}]  
			}; 
	    	
	    	option3 = {
    		    "title": {
    		        "text": "WIP状态",
    		        x:"center",
    		        y:"top",
    		        textStyle: {
    		            fontSize: '22'
    		        },
    		        subtextStyle: {
    		            color: '#90979c',
    		            fontSize: '16',

    		        },
    		    },
    		    "tooltip": {
    		        "trigger": "axis",
    		        "axisPointer": {
    		            "type": "shadow",
    		            textStyle: {
    		                color: "#fff"
    		            }

    		        },
    		    },
    		    "grid": {
    		        "borderWidth": 0,
    		        "top": 110,
    		        "bottom": 95,
    		        textStyle: {
    		            color: "#fff"
    		        }
    		    },
    		    "legend": {
    		        x: 'center',
    		        y: 'bottom',
    		        textStyle: {
    		            color: '#90979c',
    		        },
    		        "data": ['老用户', '新用户', '总']
    		    },
    		     

    		    "calculable": true,
    		    "xAxis": [{
    		        "type": "category",
    		        "axisLine": {
    		            lineStyle: {
    		                color: '#90979c'
    		            }
    		        },
    		        "splitLine": {
    		            "show": false
    		        },
    		        "axisTick": {
    		            "show": false
    		        },
    		        "splitArea": {
    		            "show": false
    		        },
    		        "axisLabel": {
    		            "interval": 0,

    		        },
    		        "data": xData,
    		    }],
    		    "yAxis": [{
    		        "type": "value",
    		        "splitLine": {
    		            "show": false
    		        },
    		        "axisLine": {
    		            lineStyle: {
    		                color: '#90979c'
    		            }
    		        },
    		        "axisTick": {
    		            "show": false
    		        },
    		        "axisLabel": {
    		            "interval": 0,

    		        },
    		        "splitArea": {
    		            "show": false
    		        },

    		    }],
    		    "series": [{
    		            "name": "老用户",
    		            "type": "bar",
    		            "stack": "总量",
    		            "barMaxWidth": 35,
    		            "barGap": "10%",
    		            "itemStyle": {
    		                "normal": {
    		                    //"color": "rgba(255,144,128,1)",
    		                    "label": {
    		                        "show": true,
    		                        "textStyle": {
    		                            "color": "#fff"
    		                        },
    		                        "position": "insideTop",
    		                        formatter: function(p) {
    		                            return p.value > 0 ? (p.value) : '';
    		                        }
    		                    }
    		                }
    		            },
    		            "data": [
    		                42.25,
    		                42.02,
    		                46.66,
    		                41.85,
    		                42.65,
    		                43.88,
    		                43.27,
    		                43.04,
    		                41.96,
    		                42.95,
    		                42.69,
    		                39.65
    		            ],
    		        },

    		        {
    		            "name": "新用户",
    		            "type": "bar",
    		            "stack": "总量",
    		            "itemStyle": {
    		                "normal": {
    		                    "color": "rgba(0,191,183,1)",
    		                    "barBorderRadius": 0,
    		                    "label": {
    		                        "show": true,
    		                        "position": "top",
    		                        formatter: function(p) {
    		                            return p.value > 0 ? (p.value) : '';
    		                        }
    		                    }
    		                }
    		            },
    		            "data": [
    		                15.50,
    		                14.29,
    		                17.97,
    		                14.11,
    		                15.44,
    		                16.46,
    		                16.41,
    		                14.02,
    		                15.76,
    		                13.08,
    		                14.58,
    		                10.41
    		            ]
    		        }, {
    		            "name": "总",
    		            "type": "line",
    		            "stack": "总量",
    		            symbolSize:20,
    		            symbol:'circle',
    		            "itemStyle": {
    		                "normal": {
    		                    "color": "rgba(252,230,48,1)",
    		                    "barBorderRadius": 0,
    		                    "label": {
    		                        "show": true,
    		                        "position": "top",
    		                        formatter: function(p) {
    		                            return p.value > 0 ? (p.value) : '';
    		                        }
    		                    }
    		                }
    		            },
    		            "data": [
    		                57.75,
    		                56.31,
    		                64.63,
    		                55.96,
    		                58.09,
    		                60.32,
    		                59.68,
    		                57.07,
    		                57.07,
    		                56.02,
    		                57.27,
    		                50.06
    		            ]
    		        },
    		    ]
    		}
    	
    	
			myWorkOrder.setOption(option1);  
	    	myReason.setOption(option2);  
	    	myWIP.setOption(option3);  
		}	
	}
	screen_wo.prototype={
	  init: function () {
            $(function () {
            	dataGrid = $('#screen_wo_tab'),
            	myWorkOrder = echarts.init(document.getElementById("myWorkOrder")),
            	myReason = echarts.init(document.getElementById("myReason")),
            	myWIP = echarts.init(document.getElementById("myWIP"));
			    initGridData();
			    
			});						  							
         }
	}
	var sw = new screen_wo();
	sw.init();
})();
var xData = function() {
	var data = [];
    for (var i =1; i < 15; i++) {
        data.push(i + "");
    }
    return data;
}();
