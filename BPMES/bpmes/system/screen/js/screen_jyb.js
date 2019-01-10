/* 启动时加载 */
/*
*/
(function(){
	function screen_jyb(){
    	initGridData=function(){
    		initSmtInfo();
    		initscreen();
        },
        initscreen = function(){
        	option1 = {
    		    "title": {
    		        "text": "产能达成状况",
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
    		            "data": [42.25,42.02,46.66,41.85,42.65,43.88,43.27,43.04,41.96,42.95,42.69,39.65],
    		        },{
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
    		            "data": [15.50,14.29,17.97,14.11,15.44,16.46,16.41,14.02,15.76,13.08,14.58,10.41]
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
    		            "data": [57.75,56.31,64.63,55.96,58.09,60.32,59.68,57.07,57.07,56.02,57.27,50.06]
    		        },
    		    ]
    		}
        	container.setOption(option1);
        },
		initSmtInfo = function(){
			//头数据
			var dataJyb =["8","8","100","0","0","0","0","0","0","0","0","0","0"];
			for(var j=0;j<13;j++){
				document.getElementById("dataJyb"+j).innerHTML=dataJyb[j];
			}
			
			
			//员工数据
			var dataName = ["大白","小黑","老黄","小虎"],
			dataCode = ["bp001_01","bp001_02","bp001_03","bp001_04"],
			dataPhone = ["13051885166","13502010515","13905180041","13905180041"];
			for(var n=0;n<4;n++){
				document.getElementById("person"+n+"_name").innerHTML=dataName[n];
				document.getElementById("person"+n+"_code").innerHTML=dataCode[n];
				document.getElementById("person"+n+"_phone").innerHTML=dataPhone[n];
			}
		}
	}
	screen_jyb.prototype={
	  init: function () {
            $(function () {
            	container = echarts.init(document.getElementById('container')); 
			    initGridData();
			});						  							
         }
	}
	var screen = new screen_jyb();
	screen.init();
})();
var xData = function() {
	var data = [];
    for (var i =1; i < 15; i++) {
        data.push(i + "");
    }
    return data;
}();
