
(function(){
	function csbkbInfo(){
		var equipmentWidth = document.documentElement.clientWidth; 
		var equipmentHeight = document.documentElement.clientHeight;
		var tdWidth = equipmentWidth/12;
		var topTableHeight = (equipmentHeight-60)*0.6*0.95;
		var oneRowHeight = topTableHeight * 0.09 * 0.8;
		var chartsWidth = tdWidth * 0.68;
		$(document.body).css({'width':equipmentWidth,'height':equipmentHeight});
		$('#topTable tr td').css('width',tdWidth).css('border-color','');
		$('#stationsImg td img').css('width',tdWidth);
		
		
		ccfunc = function (){
			/*产品加工状态表*/
			iplantAjaxRequest({
		           url: '/iPlant_ajax',
		           data: {
		               IFS: 'MES_R0097',
		           },
		           successCallBack: function (data) {
		        	   /*清除所有克隆元素*/
		        	   var data_imgs = $('#prod_imgs').find('img');
		        	   $.each(data_imgs,function(o,op){
		        		   if($(op).css('display') == 'block'){
		        			   $(op).remove();
		        		   }
		        	   });
		        	   /*清除所有克隆元素		END*/
		        	   /*$('#processingState tbody tr').hide("slow",function(){
		        		   $('#processingState tbody tr').remove();
		        	   });*/
		        	   $('#processingState tbody tr').remove();
		        	   $('#time_Consuming td').remove();
		        	   var datas = data.RESPONSE[0].RESPONSE_DATA;
		        	   
		        	   animate_time = [];
		        	   for(var t=0;t<12;t++){
		        		   animate_time.push(getRandomNum(30000));
		        	   }
		        	   animate_time.sort(function(a,b){
		        		   return b - a
		        	   });
		        	   if(datas.length > 0){
		        		   $.each(datas,function(n,obj){
			        		   $('#processingState tbody').append('<tr></tr>');
			        		   var new_tr = $('#processingState tbody tr').last();
			        		   $(new_tr).append('<td>'+obj.BAR_CODE+'</td>')
			        		   			.append('<td>'+obj.ROUT_NM.replace('投入','')+'</td>')
			        		   			.append('<td>'+obj.START_DT+'</td>')
			        		   			.append('<td>'+obj.DEF_TIME+'s'+'</td>');
			        		   /*耗时赋值*/
			        		   $('#time_Consuming').append('<td>'+'耗时 '+obj.DEF_TIME+'s'+'</td>');
			        		   /*耗时赋值	END*/
			        		   
			        		   /*产品图片动画*/
			        		   var img_ID = obj.ROUT_CD,animate_left = (datas.length - n) * 50;
			        		   var new_img = $("img[name="+img_ID+"]").clone();
			        		   $(new_img).css('display','block');
			        		   $("img[name="+img_ID+"]").parent().append(new_img);
			        		   
			        		   $(new_img).animate({
			        						    left:animate_left+'%',
			        					  },animate_time[n],function(){
			        						  $(new_img).remove();
			        					  });
			        		   /*产品图片动画	END*/
			        	   });
		        		   $('#processingState tbody tr').last().css('color','#11C342');
		        	   };
		           }
		       });
			/*产品加工状态表       END*/
			
			/*产品加工历史记录*/
			iplantAjaxRequest({
		           url: '/iPlant_ajax',
		           data: {
		               IFS: 'MES_R0098',
		           },
		           successCallBack: function (data) {
		        	   $('#processingHistory tbody tr').remove();
		        	   var datas = data.RESPONSE[0].RESPONSE_DATA;
		        	   if(datas.length > 0){
		        		   $('#barCode').html(datas[0].BAR_CODE)
		        		   $.each(datas,function(n,obj){
			        		   $('#processingHistory tbody').append('<tr></tr>');
			        		   var new_tr = $('#processingHistory tbody tr').last();
			        		   $(new_tr).append('<td>'+obj.ROUT_NM.replace('投入','')+'</td>')
			        		   			.append('<td>'+obj.START_DT+'</td>')
			        		   			.append('<td>'+obj.STOP_DT+'s'+'</td>')
			        		   			.append('<td>'+obj.END_DT+'s'+'</td>')
			        		   			.append('<td>'+obj.RESULT+'</td>');
			        	   });
		        	   };
		           },
			});
			/*产品加工历史记录 END*/
			
			
			/*UPH*/
			iplantAjaxRequest({
		           url: '/iPlant_ajax',
		           data: {
		        	    IFS : 'MES_R0041',
						LINE_CD : 'LINE01',
						REQ_TIME : dtime
		           },
		           successCallBack: function (data) {
		        	   if(data.RESPONSE[0].RESPONSE_DATA.length>0){
		        		   var tms = [];
			        	   var UPHSObj = [];
			        	   var dataUPH = [];
			        	   var datas = data.RESPONSE[0].RESPONSE_DATA;
			        	   $.each(datas,function(n,obj) {
			        		   tms.push(obj.TM);									/*时间段CD集合*/
			        		   UPHSObj.push({'value':obj.TM,'text':obj.WC_QTY1});	/*时间段CD对应UPH值集合*/			
						   }); 
			        	   tms.sort();												/*时间段CD集合排序*/		
			        	   $.each(UPHSObj,function(m,objs) {
			        		  dataUPH.push(parseFloat(objs.text));								/*排序后UPH值集合*/
						   });
			        	   var lastTM = dataUPH.length - 1;
			        	   $('#UPH').html(dataUPH[lastTM]);							/*最后一个UPH值赋值*/
			        	   
			        	   /*UPH走势图*/
			        	   $('#UPHChart').highcharts({
			       			chart: { 
			       	            margin:[0, 0, 0, 0],
			       	            backgroundColor : '#393A4C',
			       	            borderWidth : 0,
			       	            type: 'spline',
			       	            width : chartsWidth,
			       	            height : oneRowHeight
			       	        }, 
			       			title: {
			       		        text: '',
			       		    },
			       		    subtitle: {
			       		        text: '',
			       		    },
			       		    xAxis: {
			       		    	labels: {
			                           enabled: false
			                       },
			                       title: {
			                           text: null
			                       },
			                       startOnTick: false,
			                       endOnTick: false,
			                       tickPositions: [1,2,3,4,5,6],
			                       min: 0,
			                       max : 6,
			                       gridLineColor: '#FFFFFF',
			                       gridLineWidth: 1,
			       		    },
			       		    yAxis: {
			       		        title: {
			       		            text: ''
			       		        },
			       		        plotLines: [
			       		        {
			       		            value: 90,
			       		            width: 1,
			       		            color: '#5EC349'
			       		        }],
			       		        gridLineColor : '#FFFFFF',
			       		       // tickPositions: [100,200,300]
			       		    },
			       		    tooltip: {
			       		    	enabled:false
			       		    },
			       		    legend: {
			       		    	enabled:false
			       		    },
			       		    credits: {
			                       enabled: false
			                   },
			                   exporting: {
			           	    	enabled:false
			           	    },
			           	    plotOptions: {
			                       spline: {  
			                       	color: '#CA3528',
			                           lineWidth: 3,  
			                           fillOpacity: 0.1,  
			                            marker: {  
			                               enabled: false,  
			                           },  
			                           shadow: false  
			                       }  
			                   },
			       		    series: [{
			       		    	data: dataUPH,
			       		    	type: 'spline',
			       		    }]
			       		});
		        	   }else{
		        		   $('#UPH').html(0);							/*最后一个UPH值赋值*/
		        	   }
		           },
			});
			/*UPH   END*/
			
			/*每台机器的生产数量*/
			/*iplantAjaxRequest({
		           url: '/iPlant_ajax',
		           data: {
		               IFS: 'MES_R0082',
		               LINE_CD:lx
		           },
		           successCallBack: function (data) {
		        	   if(data.RESPONSE[0].RESPONSE_DATA.length>0){
		        		   var dataObj = [];
		        		   var datas = data.RESPONSE[0].RESPONSE_DATA;
		        		   $.each(datas,function(n,obj){
		        			   dataObj.push({'value':obj.ROUT_CD,'text':obj.ET_SUM_QTY});
		        		   });
		        		   $.each(dataObj,function(m,objs){
		        			   $('span[name='+objs.value+']').html(objs.text);
		        		   });
		        	   }
		           },
			});*/         /*取消待定*/
			/*每台机器的生产数量 END*/
			
			
			/*每台机器的生产状态*/
			iplantAjaxRequest({
		           url: '/iPlant_ajax',
		           data: {
		               IFS: 'MES_R0083',
		               LINE_CD:lx,
		           },
		           successCallBack: function (data) {
		        	   if(data.RESPONSE[0].RESPONSE_DATA.length>0){
		        		   var dataObj = [];
		        		   var datas = data.RESPONSE[0].RESPONSE_DATA;
		        		   $.each(datas,function(n,obj){
		        			   dataObj.push({'value':obj.ET_CD,'text':obj.DICT_IT_NM});
		        		   });
		        		   $.each(dataObj,function(m,objs){
		        			   $('div[name='+objs.value+']').html(objs.text);
		        		   });
		        	   }else{
		        		   $('#stationsState td div div').html('正在生产');
		        	   }
		           },
			});
			/*每台机器的生产状态 END*/
			
			
			/*总装配数*/
			iplantAjaxRequest({
		           url: '/iPlant_ajax',
		           data: {
		               IFS: 'MES_R0080',
		           },
		           successCallBack: function (data) {
		        	   if(data.RESPONSE[0].RESPONSE_DATA.length>0){
			        	   var assembleNum = data.RESPONSE[0].RESPONSE_DATA[0].PROD_QTY;
			        	   var productionSchedule = data.RESPONSE[0].RESPONSE_DATA[0].PRO_JIN_DU;
			        	   
			        	   if(assembleNum==''||assembleNum==null){
			        		   $('#assembleNum').html(0);				/*总装配数*/
			        	   }else{
			        		   $('#assembleNum').html(assembleNum);			/*总装配数*/
			        	   };
			        	   
			        	   if(productionSchedule==''||productionSchedule==null){
			        		   $('#productionSchedule').html(0);			/*生产进度*/
				        	   $('#productionScheduleWidth').css('width','0%');	/*生产进度条*/
			        	   }else{
			        		   $('#productionSchedule').html(productionSchedule);			/*生产进度*/
				        	   $('#productionScheduleWidth').css('width',productionSchedule);	/*生产进度条*/
			        	   }
		        	   }else{
		        		   $('#assembleNum').html(0);			/*总装配数*/
			        	   $('#productionSchedule').html(0);			/*生产进度*/
			        	   $('#productionScheduleWidth').css('width','0%');	/*生产进度条*/
		        	   }
		           },
			});
			/*总装配数END*/
			
			/*加工中个数   		取不到*/
			iplantAjaxRequest({
		           url: '/iPlant_ajax',
		           data: {
		               IFS: 'MES_R0081',
		           },
		           successCallBack: function (data) {
		        	   if(data.RESPONSE[0].RESPONSE_DATA.length>0){
			        	   var assembleNum = data.RESPONSE[0].RESPONSE_DATA[0].MAC_QTY;
			        	   $('#processingNum').html(assembleNum);			/*加工中个数*/
		        	   }else{
		        		   $('#processingNum').html(47);			/*加工中个数*/
		        	   }
		           },
			});
			/*加工中个数END*/
			
			/*总良品率*/
			iplantAjaxRequest({
		           url: '/iPlant_ajax',
		           data: {
		               IFS: 'MES_R0086',
		               LINE_CD:lx,
		               REQ_TIME:dtime,
		           },
		           successCallBack: function (data) {
		        	   if(data.RESPONSE[0].RESPONSE_DATA.length > 0){
		        		   var rowCollection = createSourceObj(data);
		        		   var GOODQTY = rowCollection[0].GOOD_QTY;				/*良品数*/
		        		   var GoodYield = rowCollection[0].GOOD_RATE;			/*良品率*/
		        		   var badNum = rowCollection[0].NOT_RATE;   /*次品率*/
		        		   $('#badNum').html(badNum);			    /*次品率赋值*/
		        		   if(dataYield.length >=7){
		        			   dataYield.splice(0,1);
		        		   }
		        		   dataYield.push(parseFloat(GoodYield));			
		        		   $('#yield').html(GoodYield);				/*良品率*/
		        		   $('#goodNum').html(GOODQTY);				/*良品数*/
		        		   /*总良品率走势图*/
		        		   $('#yieldChart').highcharts({
				       			chart: { 
				       	            margin:[0, 0, 0, 0],
				       	            backgroundColor : '#393A4C',
				       	            borderWidth : 0,
				       	            type: 'spline',
				       	            width : chartsWidth,
				       	            height : oneRowHeight
				       	        }, 
				       			title: {
				       		        text: '',
				       		    },
				       		    subtitle: {
				       		        text: '',
				       		    },
				       		    xAxis: {
				       		    	labels: {
				                           enabled: false
				                       },
				                       title: {
				                           text: null
				                       },
				                       startOnTick: false,
				                       endOnTick: false,
				                       tickPositions: [1,2,3,4,5,6],
				                       min: 0,
				                       max : 6,
				                       gridLineColor: '#FFFFFF',
				                       gridLineWidth: 1,
				       		    },
				       		    yAxis: {
				       		        title: {
				       		            text: ''
				       		        },
				       		        plotLines: [
				       		        {
				       		            value: 90,
				       		            width: 1,
				       		            color: '#5EC349'
				       		        }],
				       		        gridLineColor : '#FFFFFF',
				       		        tickPositions: [70,80,110]
				       		        
				       		    },
				       		    tooltip: {
				       		    	enabled:false
				       		    },
				       		    legend: {
				       		    	enabled:false
				       		    },
				       		    credits: {
				                       enabled: false
				                   },
				                   exporting: {
				           	    	enabled:false
				           	    },
				           	    plotOptions: {
				                       spline: {  
				                       	color: '#CA3528',
				                           lineWidth: 3,  
				                           fillOpacity: 0.1,  
				                            marker: {  
				                               enabled: false,  
				                           },  
				                           shadow: false  
				                       }  
				                   },
				       		    series: [{
				       		    	data: dataYield,
				       		    	type: 'spline',
				       		    }]
				       		});
		        	   }else{
		        		   $('#badNum').html(0);			    /*次品率赋值*/
		        		   $('#yield').html(0);				/*良品率*/
		        		   $('#goodNum').html(0);			/*良品数*/
		        	   }
		           },
			});
			/*总良品率END*/
			
			/*机器OEE*/
			iplantAjaxRequest({
		           url: '/iPlant_ajax',
		           data: {
		               IFS: 'MES_R0087',
		           },
		           successCallBack: function (data) {
		        	   if(data.RESPONSE[0].RESPONSE_DATA.length>0){
		        		   var dataOEE = [];
			        	   dataOEE.push(parseFloat(data.RESPONSE[0].RESPONSE_DATA[0].OEE)); 
			        	   $('#OEEValue').html(data.RESPONSE[0].RESPONSE_DATA[0].OEE + '%');
		              }else{
		            	  var dataOEE = [0];
		              };
		              
		              $('#machineOEE').highcharts({
			   		        chart: {
			   		            type: 'gauge',
			   		            plotBackgroundColor: '#393A4C',
			   		            margin:[0, 0, 0, 0],
			   		        },
			   		        title: {
			   		            text: null,
			   		        },
			   		        pane: [{
			   		            startAngle: -90,
			   		            endAngle: 90,
			   		            background: {
			   		            	backgroundColor: '#393A4C',
			   		            	innerRadius: '100%',
			   		                outerRadius: '100%',
			   		                shape: 'arc'
			   		            },
			   		            center: ['50%', '90%'],
			   		            size: '130%'
			   		        }],
			   		        tooltip : {
			   		        	enabled: false
			           	    },
			   		        yAxis: [{
			   		            min: 0,
			   		            max: 100,
			   		            minorTickPosition: 'outside',
			   		            tickPosition: 'outside',
			   		            tickInterval : 25,
			   		            labels: {
			   		                rotation: 'auto',
			   		                distance: 15
			   		            },
			   		            plotBands: [{
			   		                from: 0,
			   		                to: 25,
			   		                color: '#CD3526',
			   		            },
			   		            {
			   		                from: 25,
			   		                to: 50,
			   		                color: '#2749CA',
			   		            },
			   		            {
			   		                from: 50,
			   		                to: 75,
			   		                color: '#DFC12A',
			   		            },
			   		            {
			   		                from: 75,
			   		                to: 100,
			   		                color: '#61C54B',
			   		            }],
			   		            pane: 0,
			   		            title: {
			   		            	style : {color:'#BEA430'},
			   		                text: 'OEE',
			   		                y: 10
			   		            }
			   		        }],
			   		        plotOptions: {
			   		            gauge: {
			   		                dataLabels: {
			   		                    enabled: false
			   		                },
			   		                dial: {
			   		                	backgroundColor : '#CD3527',
			   		                    radius: '70%'
			   		                }
			   		            }
			   		        },
			   		        series: [{
			   		            data: dataOEE,
			   		            yAxis: 0
			   		        }],
			   		        credits: {
			   		  	        enabled:false
			   		    	},
			   		    	exporting: {
			   	    	    	enabled:false
			   	    	    }
			   		    });
		         },
		});
			/*机器OEE  END*/
		
			/*批量加载   耗时     highcharts走势图*/
			doTimeConsuming = function(){
				var yields = $('[name=time-consuming]');
				var len = yields.length;
				for(var i=0;i<len;i++){
					$(yields[i]).highcharts({
						chart: { 
		       	            margin:[0, 0, 0, 0],
		       	            backgroundColor : '#393A4C',
		       	            borderWidth : 0,
		       	            type: 'spline',
		       	            width : chartsWidth,
		       	            height : oneRowHeight
		       	        }, 
		       			title: {
		       		        text: '',
		       		    },
		       		    subtitle: {
		       		        text: '',
		       		    },
		       		    xAxis: {
		       		    	labels: {
		                           enabled: false
		                       },
		                       title: {
		                           text: null
		                       },
		                       startOnTick: false,
		                       endOnTick: false,
		                       tickPositions: [1,2,3,4,5,6],
		                       min: 0,
		                       max : 6,
		                       gridLineColor: '#FFFFFF',
		                       gridLineWidth: 1,
		       		    },
		       		    yAxis: {
		       		        title: {
		       		            text: ''
		       		        },
		       		        plotLines: [
		       		        {
		       		            value: 90,
		       		            width: 1,
		       		            color: '#5EC349'
		       		        }],
		       		        gridLineColor : '#FFFFFF',
		       		        tickPositions: [70,80,100]
		       		    },
		       		    tooltip: {
		       		    	enabled:false
		       		    },
		       		    legend: {
		       		    	enabled:false
		       		    },
		       		    credits: {
		                       enabled: false
		                   },
		                   exporting: {
		           	    	enabled:false
		           	    },
		           	    plotOptions: {
		                       spline: {  
		                       	color: '#CA3528',
		                           lineWidth: 3,  
		                           fillOpacity: 0.1,  
		                            marker: {  
		                               enabled: false,  
		                           },  
		                           shadow: false  
		                       }  
		                   },
					    series: [{
					    	data: [ 92, 90, 98, 95, 93,96] 
					    }]
					});
				}
			};
			/*批量加载   耗时     highcharts走势图END*/
			
			colorFun = function(){
					$('#stationsState td div').animate({"background-color": '#0099FF'}, 'slow',function(){
						$('#stationsState td div').css("background-color", '#393A4C'); 
					}); 
					$('#stationsState td div div').animate({"color": '#FFFFFF',"color": '#0A86DC'}, 300); 
					
			};
		},
		
		animatFunc = function(){
    		/*var imgs = $('#prod_imgs').find('img');
    		$.each(imgs,function(n,obj){
    			var animate_left = (imgs.length - n) * 50,animate_time = getRandomNum(30000)
    			var newImgs = $(obj).clone();
    			$(newImgs).css('display','block');
    			$(obj).parent().append(newImgs);
    			
    			$(newImgs).animate({
				    left : animate_left+'%'
    			},animate_time,function(){
    				$(newImgs).remove();
    			});
    		});*/
			var imgs = $('#prod_imgs').find('img').first();
			var newImgs = $(imgs).clone();
			$(newImgs).css('display','block');
			$(imgs).parent().append(newImgs);
			
			$(newImgs).animate({
			    left : '1150%'
			},animate_time[0],function(){
				$(newImgs).remove();
			});
		};
	};
		csbkbInfo.prototype={
				init: function () {
					
						$(function () {
							dtime  = getBCtime();
							lx = getQueryString("line");
							ccfunc();
							doTimeConsuming();
							animatFunc();
							var t=setInterval(function  () {
								ccfunc();
								colorFun();
								doTimeConsuming();
								animatFunc();
							},15000);
						});						  							
					}
				}
				
		var csbkb = new csbkbInfo();
		var sbbm = "";
		var lx ="";
		var cctm  = {A:'08:00-09:00', B:'09:00-10:00', C:'10:00-11:00', D:'11:00-12:00', E:'12:00-13:00', F:'13:00-14:00',
			G:'14:00-15:00', H:'15:00-16:00', I:'16:00-17:00', J:'17:00-18:00', K:'18:00-19:00', L:'19:00-20:00'};
				
		var dtime  = "";var all=0;var dataYield = [];var animate_time=[];
		csbkb.init();
})();
