
(function(){
	function csbkbInfo(){}
		csbkbInfo.prototype={
				init: function () {
					
						$(function () {
						
							
							Highcharts.chart('container1', {
							    chart: {
							        type: 'column'
//							        	,
//							        options3d: {
//							            enabled: true,
//							            alpha: 2,
//							            beta: 3,
//							            depth: 45
//							        }
							    },
							    title: {
							        text: '<span style="color:#1771B3;font-weight: bold;">产线人均效率（2017.04.28~2017.05.08）'
							    },
//							    subtitle: {
//							        text: 'Notice the difference between a 0 value and a null point'
//							    },
//							    plotOptions: {
//							        column: {
//							            depth: 25
//							        }
//							    },
							    xAxis: {
							    	categories: ['line1', 'line2', 'line3', 'line4', 'line5','line6','line7','line8','line9','line10','line11']
							    },
							    yAxis:[{  //这里注意了  配置双Y轴的这里要看好了  这里的值是一个数组
						            title:{  //左边y轴的标题
						                text :'人均产出比'
						            }
						        },{
						        	min:10, // 定义最小值 
						            title:{  //这是第二天Y轴在右边
						                text :'人均效率'
						            },
						            opposite:true//这个属性的作用是说 是否与第一条y轴相反 当然是true咯
						           
						        }],
							    series: [{
							    	yAxis:0,
							        name: '<span style="color:#1771B3;font-weight: bold;">总产出</span>',
							        data: [1000, 803, 905, 908, 954, 1001,852, 886,999,945,960]},{
							        	yAxis:1,
							        	type: 'spline',
								        name: '<span style="color:#1771B3">人均效率</span>',
								        data: [54, 55, 56, 52, 53, 51,56, 51,55,57,52]},
								        {
							            name: '总人工时',
							            data: [43,44,56,69,76,32,89,66,55,22,44]
							    }],
							    credits: {
							          enabled:false
							},exporting: {
						        enabled:false
							}
							});			
							
						
							
						});						  							
					}
				}
				
		var csbkb = new csbkbInfo();
		csbkb.init();
})();
