(function() {
	function csbkbInfo() {
		myfun = function(){
			/*列表*/
			iplantAjaxRequest({
				url : '/iPlant_ajax',
				data : {
					IFS : 'MES_R0042',
					LINE_CD : line,
					SHIFT_CD:'A',
					REQ_TIME : dtime
				},
				successCallBack : function(data) {
					if (data.RESPONSE[0].RESPONSE_DATA.length != 0) {
						var rowCollection = createSourceObj(data);
						$("#paigongdan").text("派工单："+rowCollection[0].WO_NO);
						$("#plannum").text("计划数量："+rowCollection[0].PLAN_WO_QTY+"PCS");
						//$("#renwuling").text("任务令："+rowCollection[0].MO_NO);
						
						$("#planchanchu").text("计划产出："+rowCollection[0].PLAN_WO_QTY);
						$("#gongdan").text("工单号："+rowCollection[0].MO_NO);
						$("#planrate").text("计划达成率："+rowCollection[0].PLAN_RATE);
						if(rowCollection[0].ITEM_CD == ''|| rowCollection[0].ITEM_CD==null){
							$("#liaohao").text("料号：");
						}else{
							$("#liaohao").text("料号："+rowCollection[0].ITEM_CD);
						}
						$("#biaozhunshichanneng").text("标准时产能："+rowCollection[0].CAPA+"PCS/H");
						$("#num").text("数量："+rowCollection[0].PLAN_PO_QTY+"PCS");
						if(rowCollection[0].TOT_TINGJI == ''|| rowCollection[0].TOT_TINGJI==null){
							$("#avgshichanneng").text("平均时产能："+'197'+"PCS/H");
						}else{
							$("#avgshichanneng").text("平均时产能："+rowCollection[0].TOT_TINGJI+"PCS/H");
						}
						$("#finishnum").text("完成数："+rowCollection[0].PROD_QTY);
						//$("#shichannengrate").text("时产能达成率："+rowCollection[0].WC_CD+"%");
					}
				}
			});

			/*Wip状态*/
			
			var colorArray = [ '#F6BD0F', '#AFD8F8', '#8BBA00', '#FF8E46',
					'#008E8E', '#D64646', '#8E468E', '#0099FF', '#00CC99',
					'#FFFF33', '#f7a35c', '#8085e9', '#f15c80', '#e4d354',
					'#8085e8', '#8d4653', '#91e8e1' ];
			var ajaxWipParam = {
				url : '/iPlant_ajax',
				data : {
					IFS : 'MES_R0070',
					LINE_CD : 'LINE01',
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
							text : '<span style="color:#1771B3;font-size:14px;">wip状态</span>'
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

			/*异常种类*/
			var ajaxYichangParam = {
					url : '/iPlant_ajax',
					data : {
						IFS : 'MES_R0044',
						LINE_CD : 'LINE01',
//						SHIFT_CD:'A',
						REQ_TIME : dtime
					},
				successCallBack : function(data) {
					var YichangData = [];
					var badReasonData=[];
					var woData = data.RESPONSE["0"].RESPONSE_DATA;
					
					if(data.RESPONSE[0].RESPONSE_DATA.length>0){
						/*for (var i = 0; i < woData.length; i++) {
							if (i == 0) {
								badReasonData.push({
									name : woData[i].MT_DEF_NM,
									y : parseInt(woData[i].CIPIN_RATE),
									sliced : true,
									selected : true
								});
							} else {
								badReasonData.push([ woData[i].MT_DEF_NM,
										parseInt(woData[i].CIPIN_RATE )]);
							}
						}*/
						badReasonData=[{name:'HDM to 1',y:22,sliced : true,selected : true},
						               {name:'功能不达标',y:38,sliced : true,selected : true},
						               {name:'规格不符',y:20,sliced : true,selected : true},
						               {name:'按键不良',y:20,sliced : true,selected : true},
						               ];
					}else{
						badReasonData=[{name:'HDM to 1',y:22,sliced : true,selected : true},
						               {name:'功能不达标',y:38,sliced : true,selected : true},
						               {name:'规格不符',y:20,sliced : true,selected : true},
						               {name:'按键不良',y:20,sliced : true,selected : true},
						               ];
					}
					Highcharts.chart('container3', {
						chart: {
				            type: 'pie',
				            options3d: {
				                enabled: true,
				                alpha: 60,
				                beta: 0
				            }
				        },
				        title: {
				            text: '<span style="color:#1771B3;font-weight: bold;font-size:14px;">异常种类</span>'
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
				                    format: '{point.name}'
				                }
				            },
				            series: {
		       		            animation: {
		       		                duration: 5000,
		       		                easing: 'easeOutBounce'
		       		            }
		       			     }
				        },
				        series: //badReasonData
				        	[{
				            type: 'pie',
				            name: '异常种类',
				            data: badReasonData
				        }]
				        ,
				        credits: {
					          enabled:false
					},exporting: {
				        enabled:false
					}
					});
				},
				errorCallBack : function(e) {
					var a = e;
				}
			}
			iplantAjaxRequest(ajaxYichangParam);

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
						LINE_CD : 'LINE01',
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
								'container1',
								{
									chart : {
										type : 'column'
									},
									title : {
										text : '<span style="color:#1771B3;font-size:14px;">产能达成状况</span>'
									},
									xAxis : {
										min : 0,
					       		    	max : 11,
					       		    	categories: ['08:00-09:00', '09:00-10:00', '10:00-11:00', '11:00-12:00', '12:00-13:00', '13:00-14:00',
					 		       					'14:00-15:00', '15:00-16:00', '16:00-17:00', '17:00-18:00', '18:00-19:00', '19:00-20:00'],
										crosshair : true
									},
									yAxis : {
										min : 0,
										title : {
											text : null
										},
										minRange: 1
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
						                                color:'#D7DEE9'
						                            },
						                            formatter : function(){
						                            	if(this.y=='undefined'){
						                            		this.y = '';
						                            	}
						                            	return this.y
						                            }
						                        }
						                    }
									},
									series : [
											{
												name : '<span style="color:#1771B3">计划数量</span>',
												data :data_plan
											},
											{
												name : '<span style="color:#1771B3">完成数量</span>',
												data :data_finish
											},
											{
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
		}
	}
	csbkbInfo.prototype = {
		init : function() {
			$(function() {
				iplantAjaxRequest({
			           url: '/iPlant_ajax',
			           data: {
			               IFS: 'S0000021',
			           },
			           async: false,
			           successCallBack: function (data) {
			        	   if(data.RESPONSE[0].RESPONSE_DATA.length>0){
			        		   oldTime = data.RESPONSE[0].RESPONSE_DATA[0].SYS_TIME;
			        		   var year = parseInt(oldTime.slice(0,4));
				        		 //判断小于10，前面补0
				       			if (year < 10) {
				       				year = "0" + year;
				       			}
				       			
			        		   var month = parseInt(oldTime.slice(5,7));
				        		 //判断小于10，前面补0
				       			if (month < 10) {
				       				month = "0" + month;
				       			}
				       			
			        		   var day = parseInt(oldTime.slice(8,10));
				        		 //判断小于10，前面补0
				       			if (day < 10) {
				       				day = "0" + day;
				       			}
			        		   
			        		   var hours = parseInt(oldTime.slice(11,13));
				        		if (hours < 10) {
				       				hours = "0" + hours;
				       			}
				        		
			        		  var minutes = parseInt(oldTime.slice(14,16));
				        		//判断小于10，前面补0
				      			if (minutes < 10) {
				      				minutes = "0" + minutes;
				      			}
				      			
			        		   var seconds = parseInt(oldTime.slice(17));
				        		 //判断小于10，前面补0
				       			if (seconds < 10) {
				       				seconds = "0" + seconds;
				       			}
				       			
				       			var date_str ="";
				    			if(parseInt(hours)>=8 && parseInt(hours)<20){
				    				dtime = year + "-" + month + "-" + day + " " + "08" + ":" + "00" ;
				    			}else{
				    				if(parseInt(hours)<8){
				    					var year1 = parseInt(oldTime.slice(0,4));
				    					//判断小于10，前面补0
				    					if (year1 < 10) {
				    						year1 = "0" + year;
				    					}
				    			
				    					//月
				    					var month1 = parseInt(oldTime.slice(5,7));
				    					//判断小于10，前面补0
				    					if (month1 < 10) {
				    						month1 = "0" + month1;
				    					}
				    			
				    					//日
				    					var day1 = parseInt(oldTime.slice(8,10))-1;
				    					//判断小于10，前面补0
				    					if (day1 < 10) {
				    						day1 = "0" + day1;
				    					}
				    					//拼接年月日时分秒
				    					dtime = year1 + "-" + month1 + "-" + day1 + " " + "20" + ":" + "00" ;
				    				}else{
				    					//拼接年月日时分秒
				    					dtime = year + "-" + month + "-" + day + " " + "20" + ":" + "00" ;
				    				}
				    			}
			        	   }
			           }
			       });
				line = getQueryString("line");
				shebei = getQueryString("shebei");
				myfun();
				var t=setInterval(function  () {
					myfun();
				},30000);
			});

		}
	}

	var csbkb = new csbkbInfo();
	var ccINdext = 0;
	var line = "";
	var shebei = "";
	var cctm  = {A:'08:00-9:00', B:'9:00-10:00', C:'10:00-11:00', D:'11:00-12:00', E:'12:00-13:00', F:'13:00-14:00', G:'14:00-15:00'
		, H:'15:00-16:00', I:'16:00-17:00', J:'17:00-18:00', K:'18:00-19:00', L:'19:00-20:00'
	};
	csbkb.init();
})();
