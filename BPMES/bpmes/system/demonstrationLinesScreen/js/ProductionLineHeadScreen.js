$(function(){
	/*获取url中的拉线编码参数*/
	var lineCd = getQueryString('line'),dtime,
	timePeriod  = {A:'08:00-9:00', B:'9:00-10:00', C:'10:00-11:00', D:'11:00-12:00', E:'12:00-13:00', F:'13:00-14:00', G:'14:00-15:00',
		H:'15:00-16:00', I:'16:00-17:00', J:'17:00-18:00', K:'18:00-19:00', L:'19:00-20:00'
	};
	/*加载产线信息主表信息并创建模板，写入HTML页面*/
	function lineInfoajaxResend(){
		var Defer = $.Deferred();          //声明一个Defer对象
		var lineInfo = {
	        url: "/iPlant_ajax",
	        dataType: "JSON",
	        async:false,
	        data: {
	        	IFS: "MES_R0039",
	        	LINE_CD:lineCd
	        },
	        successCallBack: function(a) {
	        	if(a.RESPONSE[0].RESPONSE_DATA.length>0){
	        		var mData = createSourceObj(a)[0];
					var myTemplate = Handlebars.compile($("#lineInfoTemplate").html());
					var strHtml = myTemplate(mData);
					$('#line-info-div').html(strHtml);
					Defer.resolve();               //在Defer对象的resolve状态中把combobox对象传出去
	        	}
	        },
	        errorCallBack: function() {
	        	
	        }
	    };
		iplantAjaxRequest(lineInfo);
		return Defer.promise();                                   //返回一个promise对象
	};
	
	/*加载人员信息并创建模板，写入HTML页面*/
	function employeesAjaxResend(){
		var Defer = $.Deferred();          //声明一个Defer对象
		var employeesInfo = {
	        url: "/iPlant_ajax",
	        dataType: "JSON",
	        async:false,
	        data: {
	        	IFS: "MES_R0074",
	        	LINE_CD:lineCd
	        },
	        successCallBack: function(a) {
	        	if(a.RESPONSE[0].RESPONSE_DATA.length>0){
	        		var mData = createSourceObj(a);
					var myTemplate = Handlebars.compile($("#employeesInfoTemplate").html());
					var strHtml = myTemplate({'employees':mData});
					$('#employees-info-div').html(strHtml);
					Defer.resolve();               //在Defer对象的resolve状态中把combobox对象传出去
	        	}
	        },
	        errorCallBack: function() {
	        	
	        }
	    };
		iplantAjaxRequest(employeesInfo);
		return Defer.promise();                                   //返回一个promise对象
	};
	
	/*加载产线生产状况，并改变相应td背景颜色*/
	function lineStautsAjaxResend(){
		var lineStauts = {
	        url: "/iPlant_ajax",
	        dataType: "JSON",
	        async:false,
	        data: {
	        	IFS: "MES_R0105",
	        	LINE_CD:lineCd
	        },
	        successCallBack: function(a) {
	        	if(a.RESPONSE[0].RESPONSE_DATA.length>0){
	        		var stauts = createSourceObj(a)[0].LINE_STAUTS,tdId;
		        	if(stauts == 'TJ'){
		        		tdId = $("#stauts-stop");
		        		$("#stauts-stop").css('background-color','red');
		        	}else if(stauts == 'ZZSC'){
		        		tdId = $("#stauts-normal");
		        		$("#stauts-normal").css('background-color','green');
		        	}else if(stauts == 'GZ'){
		        		tdId = $("#stauts-Abnormal");
		        		$("#stauts-Abnormal").css('background-color','yellow');
		        	}else{
		        		alert('产线生产状况为空，请联系管理员核实后台数据。');
		        		return;
		        	};
		        	tdId.css('color','#000000');
	        	}
	        },
	        errorCallBack: function() {
	            
	        }
	    };
		iplantAjaxRequest(lineStauts);
	};
	
	/*获取系统时间，改变时间格式，创建时间戳模板，写入html*/
	function show_cur_times() {
		var Defer = $.Deferred();          //声明一个Defer对象
		iplantAjaxRequest({
	       url: '/iPlant_ajax',
	       data: {
	           IFS: 'S0000021',
	       },
	       successCallBack: function (data) { 
	    	   if(data.RESPONSE[0].RESPONSE_DATA.length>0){
	    		   oldTime = data.RESPONSE[0].RESPONSE_DATA[0].SYS_TIME;
	    		   year = parseInt(oldTime.slice(0,4));
	    		   month = parseInt(oldTime.slice(5,7));
	    		   day = parseInt(oldTime.slice(8,10));
	    		   if(month<10){
						month = '0'+month;
				   };
	   			   if(day<10){
	   					day = '0'+day;
				   };
	    		   times = oldTime.slice(11);
	    		   time =  year+'年'+month+'月'+day+'日';
	    		   hour = parseInt(oldTime.slice(11,13));
	    		   minute = parseInt(oldTime.slice(14,16));
	    		   second = parseInt(oldTime.slice(17));
	    		   if(parseInt(hour)>=8 && parseInt(hour)<20){
	    				dtime = year + "-" + month + "-" + day + " " + "08" + ":" + "00" ;
	    		   }else if(parseInt(hour)<8){
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
	    		   
	    		   var timeObj = {
    				   time:time,
        			   times:times
	        	   };
	   			   /*给主表时间和日期栏赋值*/
	    		   $("#lineDate").html(time);
	    		   $("#lineTime").html(times);
	    		   Defer.resolve();               //在Defer对象的resolve状态中把combobox对象传出去
	    	   };
	       }
	   });
	   return Defer.promise();                                   //返回一个promise对象
	};
	/*产能达成状况*/
	function CapacityChart(){
		var ajaxCapacityParam={
			url : '/iPlant_ajax',
			data : {
				IFS : 'MES_R0040',
				LINE_CD : 'LINE01',
				REQ_TIME : dtime,
				ET_CD:'ECD031'
			},
			successCallBack : function(data) {
				if(data.RESPONSE[0].RESPONSE_DATA.length>0){
					var data_time = [];
					var data_finish = [];
					var data_capa = [];
					var capacityData = data.RESPONSE[0].RESPONSE_DATA;
					var keys = [];
		        	var tm = [];
					for(var o in timePeriod){
	        			   keys.push(o);
	        		   }
	        		   $.each(capacityData,function(b,op){
	        			   tm.push(op.TM);
	        		   });
	        		   $.each(keys,function(k,objs){
	        			   for(var i=0; i<capacityData.length; i++){
	        				   if($.inArray(objs,tm)<0){
	        					   data_finish.push('');
	        					   return
	        				   }
	        				   if(objs == capacityData[i].TM){
	        					   data_finish.push(parseInt(capacityData[i].QTY));
	        				   }
	        			   }
	        		   });
	        		   for(var i=0;i<12;i++){
	        			   data_capa.push(parseInt(capacityData[0].CAPA));
	        		   }
				}else{
					data_finish=[0,0,0,0,0,0,0,0,0,0,0,0];
					data_capa=[251,251,251,251,251,251,251,251,251,251,251,251];
				};
				capaChart('container',data_capa,data_finish);
			}
		}
		iplantAjaxRequest(ajaxCapacityParam);
	};
	function Refresh(){
		lineInfoajaxResend();
		employeesAjaxResend();
		lineStautsAjaxResend();
		show_cur_times().then(function(){CapacityChart()}).then(function(){
			clearInterval(intervalTimer);
			intervalTimer = setInterval(TimerFun, 1000);
		});
	};
	var interval,intervalTimer;
	Refresh();
	clearInterval(interval);
	interval = setInterval(Refresh, 30000);
});



