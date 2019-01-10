
(function(){
	function csbkbInfo(){
		ccfunc = function (){
			iplantAjaxRequest({
		           url: '/iPlant_ajax',
		           data: {
		               IFS: 'MES_R0045',
		               LINE_CD:lx,
		               REQ_TIME:dtime,
		               ET_CD:sbbm,
		               SHIFT_CD:'A'
		           },
		           successCallBack: function (data) {
		        	   $('#topTB tbody tr').remove();
		        	   var datas = data.RESPONSE[0].RESPONSE_DATA;
		        	   if(datas.length > 0){
		        		   $.each(datas,function(n,obj){
			        		   $('#topTB tbody').append('<tr></tr>');
			        		   var new_tr = $('#topTB tbody tr').last();
			        		   $(new_tr).append('<td>'+obj.WC_NM+'</td>')
			        		   			.append('<td>'+obj.LINE_NM+'</td>')
			        		   			.append('<td>'+obj.MO_NO+'</td>')
			        		   			.append('<td>'+obj.ITEM_NM+'</td>')
			        		   			.append('<td>'+obj.PLAN_PO_QTY+'</td>')
			        		   			.append('<td>'+obj.PROD_QTY+'</td>')
			        		   			.append('<td>'+obj.PLAN_WO_QTY+'</td>')
			        		   			.append('<td>'+obj.PLAN_RATE+'</td>')
			        		   			.append('<td>'+obj.CAPA+'PCS/H'+'</td>')
			        	   });
		        	   }else{
		        		   $('#topTB tbody').append('<tr></tr>');
		        		   var new_tr = $('#topTB tbody tr').last();
		        		   $(new_tr).append('<td>'+''+'</td>')
		        		   			.append('<td>'+''+'</td>')
		        		   			.append('<td>'+''+'</td>')
		        		   			.append('<td>'+''+'</td>')
		        		   			.append('<td>'+''+'</td>')
		        		   			.append('<td>'+''+'</td>')
		        		   			.append('<td>'+''+'</td>')
		        		   			.append('<td>'+''+'</td>')
		        		   			.append('<td>'+''+'</td>')
		        	   };
		        	   /*原料利用率报表数据*/
			   			   material_Num = [];
			   	           quantityCompletion = Number($('#topTB tbody tr td').eq(5).html());
			   	           dataQuantityCompletion = [parseInt(quantityCompletion*0.58),parseInt(quantityCompletion*0.89),parseInt(quantityCompletion*1.25),parseInt(quantityCompletion*0.95),
				   			                       parseInt(quantityCompletion*1.56)];
		   	        	   material_Num = [
        	                             	parseInt((quantityCompletion + quantityCompletion*(100-95.2)*0.01)*0.58),
        	                             	parseInt((quantityCompletion + quantityCompletion*(100-95.9)*0.01)*0.89),
        	                             	parseInt((quantityCompletion + quantityCompletion*(100-96)*0.01)*1.25),
        	                             	parseInt((quantityCompletion + quantityCompletion*(100-97)*0.01)*0.95),
        	                             	parseInt((quantityCompletion + quantityCompletion*(100-93.1)*0.01)*1.56),
        	                             ]
			   	        /*原料利用率报表数据 END*/	
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
			   			        text: '<span style="color:#1771B3;font-weight: bold;font-size:14px;">原料利用率</span>'
			   			    },
			   			    plotOptions: {
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
			   			    xAxis: {
			   			    	categories: ['1162-01', '5170-01', '5380-02', '5402-01', '5578-01'],
			   			    	labels : {
			   			            style : {
			   			                'fontSize' : '8px',
			   						    fontWeight:  'bold'
			   			            }
			   			        }
			   			    },
			   			    yAxis:[{  //这里注意了  配置双Y轴的这里要看好了  这里的值是一个数组
			   		            title:{  //左边y轴的标题
			   		                text :'数量'
			   		            },
			   		        },{
			   		        	max:100,
			   		            title:{  //这是第二天Y轴在右边
			   		                text :'利用率'
			   		            },
			   		            opposite:true//这个属性的作用是说 是否与第一条y轴相反 当然是true咯
			   		            ,
			   		            labels:{
			   		                formatter:function() {//在labels里可以配置formatter属性可以对y轴设置单位之类的个性化东西
			   		                    return this.value+'%';//可以对照上面图表 +"L"
			   		                }
			   		            }
			   		        }],
			   			    series: [{
			   			        name: '<span style="color:#1771B3;font-weight: bold;">原料总数</span>',
			   			        data: material_Num
			   			    	}
			   			    	,{
			   				        name: '<span style="color:#1771B3">产品使用数量</span>',
			   				        data: dataQuantityCompletion
			   			    	}
			   			        ,{
			   			        	yAxis: 1,
			   			            type: 'spline',
			   			            name: '原材料利用率',
			   			            data: [95.2,95.9,96,97,93.1],
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
			   			}
			   			});	
		           }
		       });
			
			
			
			iplantAjaxRequest({
		           url: '/iPlant_ajax',
		           data: {
		               IFS: 'MES_R0046',
		               LINE_CD:lx,
		               REQ_TIME:dtime,
		               ET_CD:sbbm,
		               SHIFT_CD:'A'
		           },
		           successCallBack: function (data) {
		        	   	var Aarr=[],Barr=[];
		        	   	var channengData = data.RESPONSE["0"].RESPONSE_DATA;
						var keys = [];
			        	var tm = [];
			        	if(data.RESPONSE[0].RESPONSE_DATA.length>0){
			        		for(var o in cctm){
			        			   keys.push(o);
			        		   }
			        		   $.each(channengData,function(b,op){
			        			   tm.push(op.TM);
			        		   });
			        		   $.each(keys,function(k,objs){
			        			   for(var i=0; i<channengData.length; i++){
			        				   if($.inArray(objs,tm)<0){
			        					   Aarr.push('');
			        					   Barr.push('');
			        					   return
			        				   }
			        				   if(objs == channengData[i].TM){
			        					   Aarr.push(parseInt(channengData[i].MUBIAO_QTY));
			        					   Barr.push(parseInt(channengData[i].ZHITONG_RATE));
			        				   }
			        			   }
			        		   });
			        	}else{
			        		Aarr = [0,0,0,0,0,0,0,0,0,0,0,0];
			        		Barr = [0,0,0,0,0,0,0,0,0,0,0,0];
			        	}
						
		        	   Highcharts.chart('cccj', {
		        		   chart: {
					             type: 'spline'
					         },
					         credits:{
					         	enabled:false
					         },
					         title: {
					             text: ''
					         },
					         colors: ['#0099FF', '#00CC99', '#FFFF33', '#f7a35c', '#8085e9','#f15c80', '#e4d354', '#8085e8', '#8d4653', '#91e8e1'],
		       		    xAxis: {
		       		    	min : 0,
		       		    	max : 11,
		       		    	categories: ['08:00-09:00', '09:00-10:00', '10:00-11:00', '11:00-12:00', '12:00-13:00', '13:00-14:00',
		       					'14:00-15:00', '15:00-16:00', '16:00-17:00', '17:00-18:00', '18:00-19:00', '19:00-20:00']
		       		    },
		       		    yAxis:[{  //这里注意了  配置双Y轴的这里要看好了  这里的值是一个数组
		       		    	min:1,
		       		    	tickPixelInterval:10,
		       	            title:{  //左边y轴的标题
		       	                text :'单位/个'
		       	            }
		       	        },{
		       	        	max:100,
		       	        	min:10,
		       	            title:{  //这是第二天Y轴在右边
		       	                text :'直通率'
		       	            },
		       	            opposite:true//这个属性的作用是说 是否与第一条y轴相反 当然是true咯
		       	            ,
		       	            labels:{
		       	                formatter:function() {//在labels里可以配置formatter属性可以对y轴设置单位之类的个性化东西
		       	                    return this.value+'%';//可以对照上面图表 +"L"
		       	                }
		       	            }
		       	        }],
			       	     plotOptions: {
		       			     series: {
			       		            animation: {
			       		                duration: 5000,
			       		                easing: 'easeOutBounce' 
			       		            }
			       			     }
		       			    },
		       		    series: [{
		       		        	yAxis:0,
		       			        name: '<span style="color:#1771B3">目标值</span>',
		       			        data: Aarr},{
		       			        yAxis:1,
		       		            type: 'spline',
		       		            name: '<span style="color:#1771B3">直通率</span>',
		       		            data: Barr,
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
		       		}
		       		});	
		           }
		       });
		
		
		var ajaxFinishParam={
				url: '/iPlant_ajax',
				data:{
					   IFS: 'MES_R0048',
		               REQ_TIME:dtime,
		               LINE_CD:lx
				},
				successCallBack:function(data){
					var timeCategory=[];
					var prodCnt=[];
					var colorArray=['#F6BD0F','#AFD8F8','#8BBA00','#FF8E46','#008E8E','#D64646','#8E468E','#0099FF', '#00CC99', '#FFFF33', '#f7a35c', '#8085e9','#f15c80', '#e4d354', '#8085e8', '#8d4653', '#91e8e1'];
					
					if(data.RESPONSE[0].RESPONSE_DATA.length>0){
						var prodData=data.RESPONSE["0"].RESPONSE_DATA;
						for(var i=0;i<prodData.length;i++){
							timeCategory.push(prodData[i].QC_DFCT_CD);//名称
							prodCnt.push({color:colorArray[i],y:parseInt(prodData[i].DFCT_QTY)});//数量
						}
					}else{
						timeCategory = ['WX001','WX002','WX003','WX004'];
						prodCnt = [0,0,0,0];
					};
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
					        text: '<span style="color:#1771B3;font-weight: bold;font-size:12px;">缺陷变化</span>'
					    },
					    plotOptions: {
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
					    xAxis: {
					    	categories: timeCategory
					    },
					    yAxis: {
					        title: {
					            text: null
					        },
					        min:0,
					        minRange:1
					    },
					    series: [{
					        name: '<span style="color:#1771B3;font-weight: bold;">缺陷</span>',
					        data: prodCnt}],
					    credits: {
					          enabled:false
					},exporting: {
				        enabled:false
					}
					});	
					
		     },
		     errorCallBack:function(e){
					var a=e;
		     }
		}
		iplantAjaxRequest(ajaxFinishParam);
		
		
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
	            text: '<span style="color:#1771B3;font-weight: bold;font-size:14px;">停机异常</span>'
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
	        series: [{
	            type: 'pie',
	            name: '原因占比',
	            data: [
	                ['<span>机器故障 ,5.0%</span>',   5.0],						                
	                {
	                    name: '<span>换线,67.0%</span>',
	                    y: 67.0,
	                    sliced: true,
	                    selected: true
	                },
	                ['<span >来料异常,10.0%</span>',    10.0],
	                ['<span >软件问题,8.0%</span>',     8.0],
	                ['<span >视觉不良,10.0%</span>',   10.0]
	            ]
	        }],
	        credits: {
		          enabled:false
		},exporting: {
	        enabled:false
		}
		});
	} 
	}
		csbkbInfo.prototype={
				init: function () {
					
						$(function () {
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
							lx = getQueryString("line");
							sbbm = getQueryString("shebei");
							ccfunc();
							var t=setInterval(function  () {
								ccfunc();
							},30000);
						});						  							
					}
				}
				
		var csbkb = new csbkbInfo();
		var sbbm = "";
		var lx ="";
		var cctm  = {A:'08:00-09:00', B:'09:00-10:00', C:'10:00-11:00', D:'11:00-12:00', E:'12:00-13:00', F:'13:00-14:00',
			G:'14:00-15:00', H:'15:00-16:00', I:'16:00-17:00', J:'17:00-18:00', K:'18:00-19:00', L:'19:00-20:00'};
		var quantityCompletion,material_Num;
		var dataQuantityCompletion = [];
		var dtime  = "";
		csbkb.init();
})();
