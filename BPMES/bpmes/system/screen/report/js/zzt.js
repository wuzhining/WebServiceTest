
(function(){
	function csbkbInfo(){}
		csbkbInfo.prototype={
				init: function () {
						$(function () {													
							Highcharts.chart('container', {
							    chart: {
							        type: 'column'
							    },
							    title: {
							        text: '<span style="color:#1771B3">产能达成状况</span>'
							    },
							    xAxis: {
							        categories: [
							            '8:00-9:00',
							            '9:00-10:00',
							            '10:00-11:00',
							            '11:00-12:00',
							            '12:00-13:00',
							            '13:00-14:00',
							            '14:00-15:00',
							            '16:00-17:00',
							            '17:00-18:00'
							        ],
							        crosshair: true
							    },
							    yAxis: {
							        min: 0,
							        title: {
							            text: null
							        },
							    },
							    tooltip: {
							        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
							        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
							            '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
							        footerFormat: '</table>',
							        shared: true,
							        useHTML: true
							    },							    
							    plotOptions: {
							        column: {
							            pointPadding: 0,
							            borderWidth: 0
							        }
							    },
							    series: [
							    {
							        name: '<span style="color:#1771B3">完成数量</span>',
							        data: [100, 300, 300, 200, 400, 500, 700, 800, 700]},
							          {
							            type: 'line',
							            name: '完成数',
							            data: [100, 300, 300, 200, 400, 500, 700, 800, 700],
							            marker: {
							                lineWidth: 2,
							                lineColor: 'yellow',
							                fillColor: 'red'
							            }							       
							    },{
						            type: 'line',
						            dashStyle: 'Dash',
						            name: '目标数',
						            data: [600, 600, 600, 600, 600, 600, 600, 600, 600],
						            marker: {
						                lineWidth: 3,
						                lineColor: 'blue',
						                fillColor: 'black'
						            }
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
