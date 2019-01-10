
(function(){
	function csbkbInfo(){}
		csbkbInfo.prototype={
				init: function () {
						$(function () {													
							Highcharts.chart('container', {
							    chart: {
							        type: 'column',
							        options3d: {
							            enabled: true,
							            alpha: 0,
							            beta: 0,
							            depth: 0
							        }
							    },
							    title: {
							        text: '<span style="color:#1771B3">WIP状态</span>'
							    },
							    plotOptions: {
							        column: {
							           
//							            pointPadding: 0,
							            groupPadding: 0,//分组之间的距离值
//						                borderWidth: 40,						                
//						                pointWidth:0 //柱子之间的距离值
							        }
							    },
							    xAxis: {							    
							        categories:['A','B','C','D','E','F','G','H','I','J']
							    },
							    yAxis: {
							        title: {
							            text: null
							        }
							    },
							    series: [
							             
							             
                              {
							        name: '<span style="color:#1771B3">完成率</span>',
							        data: [1, 3, 5, 8, 9, 1, 2, 4, 6, 3]
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
