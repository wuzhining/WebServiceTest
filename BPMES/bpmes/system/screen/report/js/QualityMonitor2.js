
(function(){
	function csbkbInfo(){
		test = function() 
		{ 
			var dtime  = getBCtime();
			var lx = getQueryString("line");
			console.log(lx);
			var sbbm = getQueryString("shebei");
			var cctm  = {A:'08:00-10:00', B:'10:00-12:00', C:'12:00-14:00', D:'14:00-16:00', E:'16:00-18:00', F:'18:00-20:00', G:'20:00-22:00', H:'22:00-24:00'};
			Highcharts.chart('container1', {
			    chart: {
			        type: 'column',
			        options3d: {
			            enabled: true,
			            alpha: 2,
			            beta: 3,
			            depth: 45
			        }
			    },
			    title: {
			        text: '<span style="font-weight: bold;font-size:6px;">原料利用率</span>'
			    },
//			    subtitle: {
//			        text: 'Notice the difference between a 0 value and a null point'
//			    },
			    plotOptions: {
			        column: {
			            depth: 25
			        }
			    },
			    xAxis: {
			    	tickInterval:1,
			    	categories: ['1162-01', '5170-01', '5380-02', '5402-01'],
			    	labels : {
			            style : {
			                fontSize:'4px',
			                color:'#19a0f5'
			            }
			        }
			    },
			    yAxis:[{  //这里注意了  配置双Y轴的这里要看好了  这里的值是一个数组
			    	labels : {
			            style : {
			                fontSize:'4px',
			                color:'#19a0f5',
						    fontWeight:  'bold'
			            }
			        },
		            title:{  //左边y轴的标题
		                text :'<span style="font-weight: bold;font-size:6px;">数量<span>'
		            }
		        },{
		        	labels : {
			            style : {
			                fontSize:'4px',
			                color:'#19a0f5',
						    fontWeight:  'bold'
			            }
			        },
		        	max:100,
		        	min:10,
		            title:{  //这是第二天Y轴在右边
		                text :'<span style="font-weight: bold;font-size:4px;">利用率<span>'
		            },
		            opposite:true//这个属性的作用是说 是否与第一条y轴相反 当然是true咯
		            ,
		            labels:{
		                formatter:function() {//在labels里可以配置formatter属性可以对y轴设置单位之类的个性化东西
		                    return this.value+'%';//可以对照上面图表 +"L"
		                },
		                style : {
			                fontSize:'4px',
			                color:'#19a0f5',
						    fontWeight:  'bold'
			            }
		               
		            }
		        }],
			    series: [{
			    	yAxis: 0,
			        name: '<span style="font-size:4px;">原料总数</span>',
			        data: [42, 323, 50, 80]
			    	}
			    	,{
			    		yAxis: 0,
				        name: '<span style="font-size:4px;">产品使用数量</span>',
				        data: [40, 310, 45, 78]
			    	}
			        ,{
			        	yAxis: 1,
			            type: 'spline',
			            name: '<span style="font-size:4px;">原材料利用率<span>',
			            data: [95.2,95.9,96,97],
			            marker: {
			                lineWidth: 2,
			                lineColor: 'yellow',
			                fillColor: 'red'
			            }
			    }],
			    credits: {
			          enabled:false
			},exporting: {
		        enabled:false
			},legend: {
				align: "center", //程度标的目标地位
				verticalAlign: "bottom", //垂直标的目标地位
				x: 0, //间隔x轴的间隔
				y: 0,//间隔Y轴的间隔
				itemStyle : {
			        'fontSize' : '4px'
			    }
			}
			});		
			
			$('#ccid').datagrid({       
				name:'edit_tab',
			dataType: 'json', 
			columns: [[
				{ field: 'ET_NM',  title: '机台编号', width: document.body.clientWidth*0.5*0.24,align:'center'},
				{ field: 'ET_QTY',  title: '计划数量', width: document.body.clientWidth*0.5*0.24,align:'center'},
				{ field: 'PRD_QTY',  title: '完成数量', width: document.body.clientWidth*0.5*0.24,align:'center'},
				{ field: 'ZHITONG_RATE',  title: '达成率', width: document.body.clientWidth*0.5*0.24,align:'center',formatter:function(value){
					return value;
				}}
		    ]]   
	    	});
			
			var ajaxFinishParam={
					url: '/iPlant_ajax',
					data:{
						   IFS: 'MES_R0072',
			               REQ_TIME:dtime,
			               LINE_CD:lx
					},
					successCallBack:function(data){
						var timeCategory=[];
						var prodCnt=[];
						var finishedCnt=[];
						var targetCnt=[];
						if(data.RESPONSE.length != 0){
						var prodData=data.RESPONSE["0"].RESPONSE_DATA;
						
						for(var i=0;i<5;i++){
							timeCategory.push(prodData[i].ET_NM);//设备
							prodCnt.push(parseInt(prodData[i].ET_QTY));//计划生产
							finishedCnt.push(parseInt(prodData[i].PRD_QTY));//总生产
							targetCnt.push(parseInt(prodData[i].ZHITONG_RATE));//达成率
						}
						if(prodData.length>0){
							if(prodData.length>2){
								var aa = [];
								aa.push(prodData[0]);
								aa.push(prodData[1]);
								$('#ccid').datagrid('loadData',{total:prodData.length,rows:aa});
							}else{
								$('#ccid').datagrid('loadData',{total:prodData.length,rows:prodData});
							}
							
						}else{
							$('#ccid').datagrid('loadData',{total:0,rows:[]});
						}
						}
						
						Highcharts.chart('container2', {
						    chart: {
						        type: 'column',
						        options3d: {
						            enabled: true,
						            alpha: 2,
						            beta: 3,
						            depth: 45
						        }
						    },
						    title: {
						        text: '<span style="font-size:6px;">计划达成率</span>'
						    },
						    plotOptions: {
						        column: {
						            depth: 25
						        }
						    },
						    xAxis: {
						    	tickInterval:1,
						    	categories:timeCategory,
						    	labels: {
			                        style: {
			                            color: '#19a0f5',//颜色
			                            fontSize:'4px'  //字体
			                        }
			                 },
						    },
						    yAxis: [{  //这里注意了  配置双Y轴的这里要看好了  这里的值是一个数组
					            title:{  //左边y轴的标题
					                text :'<span style="font-size:6px;">数量</span>'
					            },
					            labels: {
			                        style: {
			                            color: '#19a0f5',//颜色
			                            fontSize:'4px'  //字体
			                        }
			                 },
					        },{
					        	max:200,
					        	min:10,
					            title:{  //这是第二天Y轴在右边
					                text :'<span style="font-size:4px;">达成率</span>'
					            },
					            opposite:true//这个属性的作用是说 是否与第一条y轴相反 当然是true咯
					            ,
					            labels:{
					                formatter:function() {//在labels里可以配置formatter属性可以对y轴设置单位之类的个性化东西
					                    return this.value+'%';//可以对照上面图表 +"L"
					                },
					                style: {
			                            color: '#19a0f5',//颜色
			                            fontSize:'4px'  //字体
			                        }
					            }
					        }],
						    series: [{
						    	yAxis:0,
						        name: '<span style="font-size:4px;">计划量</span>',
						        data: prodCnt},{
						        	yAxis:0,
							        name: '<span style="font-size:4px;">完成量</span>',
							        data: finishedCnt},{
							        yAxis:1,
						            type: 'spline',
						            name: '<span style="font-size:4px;">达成率</span>',
						            data: targetCnt,
						            marker: {
						            	
						                lineWidth: 2,
						                lineColor: 'yellow',
						                fillColor: 'red'
						            }
						    }],
						    credits: {
						          enabled:false
						},exporting: {
					        enabled:false
						},legend: {
							align: "center", //程度标的目标地位
							verticalAlign: "bottom", //垂直标的目标地位
							x: 0, //间隔x轴的间隔
							y: 0,//间隔Y轴的间隔
							itemStyle : {
						        'fontSize' : '4px'
						    }
						}
						});
							
			     },
			     errorCallBack:function(e){
						var a=e;
			     }
			}
			iplantAjaxRequest(ajaxFinishParam);
			
			
			var ajaxFinishParam={
					url: '/iPlant_ajax',
					data:{
						   IFS: 'MES_R0048',
//						   SHIFT_CD:'A',
//						   WO_NO:'1',
			               REQ_TIME:dtime,
			               LINE_CD:lx
					},
					successCallBack:function(data){
						var timeCategory=[];
						var prodCnt=[];
						var colorArray=['#F6BD0F','#AFD8F8','#8BBA00','#FF8E46','#008E8E','#D64646','#8E468E','#0099FF', '#00CC99', '#FFFF33', '#f7a35c', '#8085e9','#f15c80', '#e4d354', '#8085e8', '#8d4653', '#91e8e1'];
						
						if(data.RESPONSE.length != 0){
						var prodData=data.RESPONSE["0"].RESPONSE_DATA;
						for(var i=0;i<prodData.length;i++){
							timeCategory.push(prodData[i].MT_DEF_NM);//名称
							prodCnt.push({color:colorArray[i],y:parseInt(prodData[i].DFCT_QTY)});//数量
						}
						}
						Highcharts.chart('container3', {
						    chart: {
						        type: 'column',
						        options3d: {
						            enabled: true,
						            alpha: 2,
						            beta: 3,
						            depth: 45
						        }
						    },
						    title: {
						        text: '<span style="font-size:6px;">缺陷排名</span>'
						    },
						    plotOptions: {
						        column: {
						            depth: 25
						        }
						    },
						    xAxis: {
						    	categories: timeCategory,
						    	labels: {
			                        style: {
			                            color: '#19a0f5',//颜色
			                            fontSize:'4px'  //字体
			                        }
			                 },
						    },
						    yAxis: {
						        title: {
						            text: null
						        },
						        labels: {
			                        style: {
			                            color: '#19a0f5',//颜色
			                            fontSize:'4px'  //字体
			                        }
			                 },
						    },
						    series: [{
						        name: '<span style="font-size: 4px;">缺陷</span>',
						        data: prodCnt}],
						    credits: {
						          enabled:false
						},exporting: {
					        enabled:false
						},legend: {
								align: "center", //程度标的目标地位
								verticalAlign: "bottom", //垂直标的目标地位
								x: 0, //间隔x轴的间隔
								y: 0,//间隔Y轴的间隔
								itemStyle : {
							        'fontSize' : '4px'
							    }
							}
						});	
						
			     },
			     errorCallBack:function(e){
						var a=e;
			     }
			}
			iplantAjaxRequest(ajaxFinishParam);
			
			
			/*Highcharts.chart('container4', {
			    chart: {
			        type: 'column',
			        options3d: {
			            enabled: true,
			            alpha: 2,
			            beta: 3,
			            depth: 45
			        }
			    },
			    title: {
			        text: '<span style="font-weight: bold;">次品示意图</span>'
			    },
//			    subtitle: {
//			        text: 'Notice the difference between a 0 value and a null point'
//			    },
			    plotOptions: {
			        column: {
			            depth: 25
			        }
			    },
			    xAxis: {
			    	categories: ['缺角', '气孔', '裂纹', '异物', '刮伤','脏粒','白点','变型']
			    },
			    yAxis: {
			        title: {
			            text: null
			        }
			    },
			    series: [{
			        name: '<span style="color:#1771B3">次品</span>',
			        data: [1, 3, 5, 8, 4, 1,2, 6]}],
			    credits: {
			          enabled:false
			},exporting: {
		        enabled:false
			}
			});	
			
			
			Highcharts.chart('container4', {
				chart: {
		            type: 'pie',
		            options3d: {
		                enabled: true,
		                alpha: 60,
		                beta: 0
		            }
		        },
		        title: {
		            text: '<span style="font-weight: bold;">生产异常</span>'
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
		            }
		        },
		        series: [{
		            type: 'pie',
		            name: '原因占比',
		            data: [
		                ['<span style="color:#1771B3">机器坏 ,41.0%</span>',   41.0],						                
		                {
		                    name: '<span style="color:#1771B3">换线,31.0%</span>',
		                    y: 31.0,
		                    sliced: true,
		                    selected: true
		                },
		                ['<span style="color:#1771B3">来料异常,10.0%</span>',    10.0],
		                ['<span style="color:#1771B3">软件问题,8.0%</span>',     8.0],
		                ['<span style="color:#1771B3">视觉不良,10.0%</span>',   10.0]
		            ]
		        }],
		        credits: {
			          enabled:false
			},exporting: {
		        enabled:false
			}
			});*/
			Highcharts.chart('container5', {
				chart: {
		            type: 'pie',
		            options3d: {
		                enabled: true,
		                alpha: 60,
		                beta: 0
		            }
		        },
		        title: {
		            text: '<span style="font-size:6px;">停机异常</span>'
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
		                    format: '{point.name}',
		                    style: {     fontSize:"4px",    color :'#19a0f5'  } 
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
			
			
			 
			$('#cccd').datagrid({       
				name:'edit_tab',
			dataType: 'json', 
			columns: [[
				{ field: 'RQ_SN',  title: '物料名称',width: document.body.clientWidth*0.5*0.25, align:'center'},
				{ field: 'EQ_NO',  title: '投入数量', width: document.body.clientWidth*0.5*0.24,align:'center'},
				{ field: 'EQ_ST',  title: '实际数量', width: document.body.clientWidth*0.5*0.25,align:'center'},
				{ field: 'EQ_LN',  title: '利用率', width: document.body.clientWidth*0.5*0.24,align:'center'}
		    ]]   
			});
			$('#cccd').datagrid('loadData',{total:0,rows:[{RQ_SN:"1162-01",EQ_NO:"42",EQ_ST:"40",EQ_LN:"95.2%"},{RQ_SN:"5170-01",EQ_NO:"323",EQ_ST:"310",EQ_LN:"95.9%"}]});
			
		} 
	}
		csbkbInfo.prototype={
				init: function () {
					
					}
				}
				
		var csbkb = new csbkbInfo();
		csbkb.init();
})();



