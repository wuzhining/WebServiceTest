/* 启动时加载 */
/*
*/
(function(){
	function screen_map(){
    	initGridData=function(){
    		initscreen();
        },
        initscreen = function(){
        	/*option1 = {
        		backgroundColor: "#BBBBBB",
                //标题，每个图表最多仅有一个标题控件，每个标题控件可设主副标题  
                title: {  
                    //主标题文本，'\n'指定换行  
                    text: '原材料利用率',  
                    //主标题文本超链接  
                    //link: 'http://www.tqyb.com.cn/weatherLive/climateForecast/2014-01-26/157.html',  
                    //副标题文本，'\n'指定换行  
                    //subtext: 'www.stepday.com',  
                    //副标题文本超链接  
                    //sublink: 'http://www.stepday.com/myblog/?Echarts',  
                    //水平安放位置，默认为左侧，可选为：'center' | 'left' | 'right' | {number}（x坐标，单位px）  
                    x: 'center',  
                    //垂直安放位置，默认为全图顶端，可选为：'top' | 'bottom' | 'center' | {number}（y坐标，单位px）  
                    y: 'top'  
                },  
                //提示框，鼠标悬浮交互时的信息提示  
                tooltip: {  
                    //触发类型，默认（'item'）数据触发，可选为：'item' | 'axis'  
                    trigger: 'axis'  
                },  
                //图例，每个图表最多仅有一个图例  
                legend: {  
                    //显示策略，可选为：true（显示） | false（隐藏），默认值为true  
                    show: true,  
                    //水平安放位置，默认为全图居中，可选为：'center' | 'left' | 'right' | {number}（x坐标，单位px）  
                    x: 'center',  
                    //垂直安放位置，默认为全图顶端，可选为：'top' | 'bottom' | 'center' | {number}（y坐标，单位px）  
                    y: 'bottom',  
                    //legend的data: 用于设置图例，data内的字符串数组需要与sereis数组内每一个series的name值对应  
                    data: ['蒸发量','降水量']  
                },  
                //工具箱，每个图表最多仅有一个工具箱  
                toolbox: {  
                    //显示策略，可选为：true（显示） | false（隐藏），默认值为false  
                    show: true,  
                    //启用功能，目前支持feature，工具箱自定义功能回调处理  
                    feature: {  
                        //辅助线标志  
                        mark: {show: true},  
                        //dataZoom，框选区域缩放，自动与存在的dataZoom控件同步，分别是启用，缩放后退  
                        dataZoom: {  
                            show: true,  
                             title: {  
                                dataZoom: '区域缩放',  
                                dataZoomReset: '区域缩放后退'  
                            }  
                        },  
                        //数据视图，打开数据视图，可设置更多属性,readOnly 默认数据视图为只读(即值为true)，可指定readOnly为false打开编辑功能  
                        dataView: {show: true, readOnly: true},  
                        //magicType，动态类型切换，支持直角系下的折线图、柱状图、堆积、平铺转换  
                        magicType: {show: true, type: ['line', 'bar']},  
                        //restore，还原，复位原始图表  
                        restore: {show: true},  
                        //saveAsImage，保存图片（IE8-不支持）,图片类型默认为'png'  
                        saveAsImage: {show: true}  
                    }  
                },  
                //是否启用拖拽重计算特性，默认关闭(即值为false)  
                calculable: true,  
                //直角坐标系中横轴数组，数组中每一项代表一条横轴坐标轴，仅有一条时可省略数值  
                //横轴通常为类目型，但条形图时则横轴为数值型，散点图时则横纵均为数值型  
                xAxis: [  
                    {  
                        //显示策略，可选为：true（显示） | false（隐藏），默认值为true  
                        show: true,  
                        //坐标轴类型，横轴默认为类目型'category'  
                        type: 'category',  
                        //类目型坐标轴文本标签数组，指定label内容。 数组项通常为文本，'\n'指定换行  
                        data: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']  
                    }  
                ],  
                //直角坐标系中纵轴数组，数组中每一项代表一条纵轴坐标轴，仅有一条时可省略数值  
                //纵轴通常为数值型，但条形图时则纵轴为类目型  
                yAxis: [  
                    {  
                        //显示策略，可选为：true（显示） | false（隐藏），默认值为true  
                        show: true,  
                        //坐标轴类型，纵轴默认为数值型'value'  
                        type: 'value',  
                        //分隔区域，默认不显示  
                        splitArea: {show: true}  
                    }  
                ],  
                  
                //sereis的数据: 用于设置图表数据之用。series是一个对象嵌套的结构；对象内包含对象  
                series: [  
                    {  
                        //系列名称，如果启用legend，该值将被legend.data索引相关  
                        name: '蒸发量',  
                        //图表类型，必要参数！如为空或不支持类型，则该系列数据不被显示。  
                        type: 'bar',  
                        //系列中的数据内容数组，折线图以及柱状图时数组长度等于所使用类目轴文本标签数组axis.data的长度，并且他们间是一一对应的。数组项通常为数值  
                        data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],  
                        //系列中的数据标注内容  
                        markPoint: {  
                            data: [  
                                {type: 'max', name: '最大值'},  
                                {type: 'min', name: '最小值'}  
                            ]  
                        },  
                        //系列中的数据标线内容  
                        markLine: {  
                            data: [  
                                {type: 'average', name: '平均值'}  
                            ]  
                        }  
                    },  
                    {  
                        //系列名称，如果启用legend，该值将被legend.data索引相关  
                        name: '降水量',  
                        //图表类型，必要参数！如为空或不支持类型，则该系列数据不被显示。  
                        type: 'bar',  
                        //系列中的数据内容数组，折线图以及柱状图时数组长度等于所使用类目轴文本标签数组axis.data的长度，并且他们间是一一对应的。数组项通常为数值  
                        data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],  
                        //系列中的数据标注内容  
                        markPoint: {  
                            data: [  
                                {type: 'max', name: '最大值'},  
                                {type: 'min', name: '最小值'}  
                            ]  
                        },  
                        //系列中的数据标线内容  
                        markLine: {  
                            data: [  
                                {type: 'average', name: '平均值'}  
                            ]  
                        }  
                    }  
                ]  
            };*/
        	
        	option1 = {
    		    backgroundColor: "#BBBBBB",
    		    "title": {
    		        "text": "物料利用率",
    		        "subtext": "USE RATE",
    		        x:"center",
    		        y:"top",
    		        textStyle: {
    		            color: '#fff',
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
    		    backgroundColor: "#BBBBBB",
    		    "title": {
    		        "text": "计划达成率",
    		        "subtext": "PLAN RATE",
    		        x:"center",
    		        y:"top",
    		        textStyle: {
    		            color: '#fff',
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
        	
        	option3 = {
    		    //backgroundColor: "#BBBBBB",
    		    "title": {
    		        "text": "缺陷排名",
    		        "subtext": "USE RATE",
    		        x:"center",
    		        y:"top",
    		        textStyle: {
    		            //color: '#fff',
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
    		    /*"dataZoom": [{
    		        "show": true,
    		        "height": 30,
    		        "xAxisIndex": [
    		            0
    		        ],
    		        bottom: 30,
    		        "start": 10,
    		        "end": 80,
    		        handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
    		        //handleSize: '110%',
    		        handleStyle:{
    		            color:"#d3dee5",
    		            
    		        },
    		        textStyle:{
    		            color:"#fff"
    		        },
    		        borderColor:"#90979c"
    		    }, {
    		        "type": "inside",
    		        "show": true,
    		        "height": 15,
    		        "start": 1,
    		        "end": 35
    		    }],*/
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
    	
			option4 = {  
				title : {
					x:"center",
					y:"top",
					text: '生产异常'  
				},  
				//工具箱  
				toolbox: {  
					show: true,  
					feature: {  
						//保存图片  
						saveAsImage: {  
							show: true  
						}  
					}  
				},  
				//图例  
				legend: {  
					orient: 'vertical',  
					left: 'left',
					data: ['AAA','BBB','FFF','GGG']  
				},  
				xAxis: {  
					data: ["AAA","BBB","CCC"]  
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
        	
        	option5 = {  
    				title : {
    					x:"center",
    					y:"top",
    					text: '停机异常'  
    				},  
    				//工具箱  
    				toolbox: {  
    					show: true,  
    					feature: {  
    						//保存图片  
    						saveAsImage: {  
    							show: true  
    						}  
    					}  
    				},  
    				//图例  
    				legend: {  
    					orient: 'vertical',  
    					left: 'left',
    					data: ['AAA','BBB','FFF','GGG']  
    				},  
    				xAxis: {  
    					data: ["AAA","BBB","CCC"]  
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
        	mapMerRateMap.setOption(option1);  
        	mapPlanRateMap.setOption(option2);  
        	mapDefectSort.setOption(option3);  
        	mapProductExc.setOption(option4);  
        	mapStopExc.setOption(option5);  
		}	
	}
	screen_map.prototype={
	  init: function () {
            $(function () {
            	mapMerRateMap = echarts.init(document.getElementById("mapMerRateMap"));
            	mapMerRatetab = echarts.init(document.getElementById("mapMerRatetab"));
            	mapPlanRateMap = echarts.init(document.getElementById("mapPlanRateMap"));
            	mapPlanRatetab = echarts.init(document.getElementById("mapPlanRatetab"));
            	mapDefectSort = echarts.init(document.getElementById("mapDefectSort"));
            	mapProductExc = echarts.init(document.getElementById("mapProductExc"));
            	mapStopExc = echarts.init(document.getElementById("mapStopExc"));
			    initGridData();
			});						  							
         }
	}
	var sm = new screen_map();
	sm.init();
})();
var xData = function() {
	var data = [];
    for (var i =1; i < 15; i++) {
        data.push(i + "");
    }
    return data;
}();
