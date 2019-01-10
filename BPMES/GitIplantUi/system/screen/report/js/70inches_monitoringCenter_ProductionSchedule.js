
(function(){
	var dtime  = getBCtime();
	var lx = getQueryString("line");
	var sbbm = getQueryString("shebei");
	var cctm  = {A:'08-09', B:'09-10',C:'10-11', D:'11-12', E:'12-13', F:'13-14', G:'14-15', H:'15-16', I:'16-17', J:'17-18',K:'18-19', L:'19-20'};
	
	function myFunc(){
		/*产能达成状况*/
		var data_time = [];
		var data_finish = [];
		var data_mubiao = [];
		var data_plan = [];
		var data_cipin = [];
		var ajaxchannengParam={
				url : '/iPlant_ajax',
				data : {
					IFS : 'MES_R0041',
					LINE_CD : lx,
					REQ_TIME : dtime
				},
				successCallBack : function(data) {
					if(data.RESPONSE[0].RESPONSE_DATA.length>0){
						var channengData = data.RESPONSE["0"].RESPONSE_DATA;
						var keys = [];
			        	var tm = [];
						for(var o in cctm){
		        			   keys.push(o);
		        		   }
		        		   $.each(channengData,function(b,op){
		        			   tm.push(op.TM);
		        		   });
		        		   $.each(keys,function(k,objs){
		        			   for(var i=0; i<channengData.length; i++){
		        				   if($.inArray(objs,tm)<0){
		        					   data_finish.push('');
		        					   data_plan.push('');
		        					   data_cipin.push('');
		        					   return
		        				   }
		        				   if(objs == channengData[i].TM){
		        					   data_finish.push(parseInt(channengData[i].WC_QTY1));
									   data_plan.push(parseInt(channengData[i].CAPA));
									   data_cipin.push(parseInt(channengData[i].CIPIN_QTY));
		        				   }
		        			   }
		        		   });
		        		   for(var i=0;i<12;i++){
		        			   data_mubiao.push(parseInt(channengData[0].CAPA));
		        		   }
					}else{
						data_finish=[0,0,0,0,0,0,0,0,0,0,0,0];
						data_mubiao=[360,360,360,360,360,360,360,360,360,360,360,360];
						data_plan=[0,0,0,0,0,0,0,0,0,0,0,0];
						data_cipin=[0,0,0,0,0,0,0,0,0,0,0,0];
					}
					Highcharts
					.chart(
							'container',
							{
								chart : {
									type : 'column',
									backgroundColor: '#BFC8D1'
								},
								title : {
									/*text : '<span style="color:#1771B3;font-size:14px;">产能达成状况</span>'*/
									text : ''
								},
								xAxis : {
									min : 0,
				       		    	max : 11,
				       		    	categories: ['08-09', '09-10', '10-11', '11-12', '12-13', '13-14',
				 		       					'14-15', '15-16', '16-17', '17-18', '18-19', '19-20'],
									crosshair : true
								},
								yAxis : {
									min : 0,
									title : {
										text : null
									},
									minRange: 1,
									tickPixelInterval:10,
								},
								tooltip : {
									headerFormat : '<span style="font-size:10px">{point.key}</span><table>',
									pointFormat : '<tr><td style="color:{series.color};padding:0">{series.name}: </td>'
											+ '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
									footerFormat : '</table>',
									shared : true,
									useHTML : true
								},
								plotOptions : {
									series: {
				       		            animation: {
				       		                duration: 5000,
				       		                easing: 'easeOutBounce'
				       		            }
				       			     },
				       			     column:{
				                        dataLabels:{
				                            enabled:true, // dataLabels设为true
				                            style:{
				                                color:'#FFFFFF',
				                                fontSize : '4px'
				                            },
				                            formatter : function(){
				                            	if(this.y=='undefined'){
				                            		this.y = '';
				                            	}
				                            	return this.y
				                            }
				                        },
				                      },
				                      spline:{
				                    	  marker : {
				                    		  radius:1
				                    	  }
				                      }
								},
								legend : {
										itemStyle: {
							                fontWeight: 'bold',
							                fontSize: "6px"
							            }
								},
								series : [
										{
											name : '<span style="color:#1771B3">计划数量</span>',
											data :data_plan
										},
										{
											color:'#90EE7E',
											name : '<span style="color:#1771B3">完成数量</span>',
											data :data_finish
										},
										{
											color:'#91E8E1',
											type : 'line',
											name : '完成数',
											data :data_finish,
											marker : {
												lineWidth : 2,
												lineColor : 'yellow',
												fillColor : 'red'
											}
										},
										{
											name : '<span style="color:#1771B3">次品</span>',
											data :data_cipin
										},
										{
											type : 'line',
											dashStyle : 'Dash',
											name : '目标数',
											data :data_mubiao,
											marker : {
												lineWidth : 3,
												lineColor : 'blue',
												fillColor : 'black'
											}
										} ],
								credits : {
									enabled : false
								},
								exporting : {
									enabled : false
								}
							});
				}
		}
		iplantAjaxRequest(ajaxchannengParam);
		
		/*Wip状态*/
		var colorArray = [ '#F6BD0F', '#AFD8F8', '#8BBA00', '#FF8E46',
				'#008E8E', '#D64646', '#8E468E', '#0099FF', '#00CC99',
				'#FFFF33', '#f7a35c', '#8085e9', '#f15c80', '#e4d354',
				'#8085e8', '#8d4653', '#91e8e1' ];
		var ajaxWipParam = {
			url : '/iPlant_ajax',
			data : {
				IFS : 'MES_R0070',
				LINE_CD : lx,
				SHIFT_CD:'A',
				CURR_DATE : dtime
			},
			successCallBack : function(data) {
				var nameArray = [];
				var dataArray = [];
				var wipData = data.RESPONSE["0"].RESPONSE_DATA;
				for (var i = 0; i < wipData.length; i++) {
					nameArray.push(wipData[i].ROUT_NM);
					dataArray.push({
						'color' : colorArray[i],
						'y' : parseInt(wipData[i].QTY)
					});
				}
				var chart = new Highcharts.Chart({
					chart : {
						renderTo : 'container2',
						type : 'column',
						backgroundColor: '#BFC8D1',
						options3d : {
							enabled : true,
							alpha : 10,
							beta : 10,
							depth : 50,
							viewDistance : 25
						}
					},
					credits : {
						enabled : false
					},
					title : {
						/*text : '<span style="color:#1771B3;font-size:14px;">wip状态</span>'*/
						text : ''
					},
					plotOptions : {
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
	       		                duration: 5000,
	       		                easing: 'easeOutBounce'
	       		            }
	       			     }
					},
					legend : {
						enabled : false
					},
					xAxis : {
						//categories : nameArray,
						categories :['SPI','送板机','印刷机','贴标机'],
						crosshair : true
					},
					yAxis : {
						title : {
							text : ''
						}
					},
					series : [ {
						name : 'wip',
						//data : dataArray
						data : [{
							'color':'#F45B5B',
							y:9
						},{
							'color':'#90EE7E',
							y:6
						},{
							'color':'#e4d354',
							y:6
						},{
							'color':'#91e8e1',
							y:9
						},]
					} ],
					credits : {
						enabled : false
					},
					exporting : {
						enabled : false
					}
				});

			}
		}
		iplantAjaxRequest(ajaxWipParam);
		
		Highcharts.chart('container3', {
			chart: {
	            type: 'pie',
	            backgroundColor: '#BFC8D1',
	            options3d: {
	                enabled: true,
	                alpha: 60,
	                beta: 0
	            }
	        },
	        title: {
	            /*text: '<span style="color:#1771B3;font-size:14px;">停机异常</span>'*/
	        	text: ''
	        },
	        tooltip: {
	            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
	        },
	        plotOptions: {
	            pie: {
	                allowPointSelect: true,
	                cursor: 'pointer',
	                depth: 35,
	                dataLabels: {
	                    enabled: true,
	                    distance:1,
	                    format: '{point.name}',
	                    style: {     fontSize:"4px",    color :'#19a0f5'  } 
	                },
	                series: {
       		            animation: {
       		                duration: 5000,
       		                easing: 'easeOutBounce'
       		            }
       			     }
	            }
	        },
	        series: [{
	            type: 'pie',
	            name: '原因占比',
	            data: [
	                ['<span style="color:#19a0f5;font-size: 4px">机器坏 ,41.0%</span>',   41.0],						                
	                {
	                    name: '<span style="color:#19a0f5;font-size: 4px">换线,31.0%</span>',
	                    y: 31.0,
	                    sliced: true,
	                    selected: true
	                },
	                ['<span style="color:#19a0f5;font-size: 4px">来料异常,10.0%</span>',    10.0],
	                ['<span style="color:#19a0f5;font-size: 4px">软件问题,8.0%</span>',     8.0],
	                ['<span style="color:#19a0f5;font-size: 4px">视觉不良,10.0%</span>',   10.0]
	            ]
	        }],
	        credits: {
		          enabled:false
		},exporting: {
	        enabled:false
		}
		});
		
	}
	
	$(function(){
		myFunc();
	    var t=setInterval(function() {
	    	myFunc();
		},20000);
   });
})();
