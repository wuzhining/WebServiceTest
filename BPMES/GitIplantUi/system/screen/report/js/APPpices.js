
(function(){
	function csbkbInfo(){}
		csbkbInfo.prototype={
				init: function () {
						$(function () {													
							Highcharts.chart('container', {
								chart: {
						            type: 'pie',
						            options3d: {
						                enabled: true,						              
						                alpha:60,
						                beta:0
						            }
						        },
						        title: {
						            text: '<span style="color:#1771B3">异常种类</span>'
						        },
						        tooltip: {
						            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
						        },
						        plotOptions: {
						            pie: {
						                allowPointSelect: true,						               
						                cursor: 'pointer',
						                slicedOffset:100,
						                depth: 100,
						                dataLabels: {
						                    enabled: true,
						                    format: '{point.name}'+'{point.percentage:.1f}%'
						                }
						            }
						        }, 
						        series: [{
						            type: 'pie',
						            name: '原因占比',
						            data: [						                					                
						                {
						                    name: '<span style="color:#1771B3">规格不符</span>',
						                    y: 55.0,
						                    sliced: true,
						                    selected: true
						                },	
						                { name: '<span style="color:#1771B3">功能不达标</span>',
						                    y: 28.0,
						                    sliced: true,
						                    selected: true
						                },
						                { name: '<span style="color:#1771B3">来料数量不符</span>',
						                    y: 12.0,
						                    sliced: true,
						                    selected: true
						                },
						                { name: '<span style="color:#1771B3">型号与实物不匹配</span>',
						                    y: 5.0,
						                    sliced: true,
						                    selected: true
						                }
						            ]
						        }],

						      credits: {
							          enabled:false
							      },
							  exporting: {
					                  enabled:false
							      }
							});		
						});						  							
					}
				}
				
		var csbkb = new csbkbInfo();
		csbkb.init();
})();
