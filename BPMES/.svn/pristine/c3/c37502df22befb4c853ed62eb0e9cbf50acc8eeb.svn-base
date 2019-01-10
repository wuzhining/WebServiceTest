
(function(){
	function csbkbInfo(){
		ccfunc = function (){
			/*工单*/
			screenAjaxFun('MES_R0107',lx,dtime,sbbm).then(function(rowCollection){
				if(rowCollection.length>0){
     			   $("#txtgdh").text(rowCollection[0].MO_NO); 						/*工单号*/
        		   $("#txtjhsl").text(rowCollection[0].PLAN_WO_QTY+"PCS"); 			/*计划数量*/
        		   $("#txtbzcn").text(rowCollection[0].CAPA+"PCS/H"); 				/*标准产能*/
        		   $("#txtsjcc").text(rowCollection[0].PROD_QTY+"PCS"); 			/*实际产出*/
        		   if(rowCollection[0].NOW_STATE == 'null'){
        			   $("#txtyxz").text('');										/*设备状态*/
        		   }
        		   $("#txtdqscsc").text(getZHsj(rowCollection[0].NOW_PRODUCTION));			/*当前生产时长*/
        		   $("#txtzcsc").text(getZHsj(rowCollection[0].CHENGX));					/*转产时长*/
        		   $("#txtdqtjsc").text(getZHsj(rowCollection[0].NOW_TINGJI));				/*当前停机时长*/
        		   $("#txtzscsc").text(getZHsj(rowCollection[0].TOT_PRODUCTION));			/*总生产时长*/
        		   $("#txtztjsc").text(getZHsj(rowCollection[0].TOT_TINGJI));				/*总停机时长*/
        		   $("#txtpjwgzsc").text(getZHsj(rowCollection[0].TOT_GUZHANG));			/*总故障时长*/
        		   
     		   }
			});
			
			/* 异常信息*/
	       iplantAjaxRequest({
	           url: '/iPlant_ajax',
	           data: {
	               IFS: 'MES_R0096',
	               ET_CD:sbbm
	           },
	           successCallBack: function (data) {
	        	   if(data.RESPONSE[0].RESPONSE_DATA.length >0){
	        		   $("#abnormalInfo_title").css('display','block');
	        		   var abnormalInfo = data.RESPONSE[0].RESPONSE_DATA[0].EXPCE_NM;
	        	   	   $('#abnormalInfo').html(abnormalInfo);
	        	   }else{
	        		   $("#abnormalInfo_title").css('display','none');
	        		   $('#abnormalInfo').html('');
	        	   };
	           	}
	        });
	       /* 异常信息		END*/
			
		       /*次品*/
		       iplantAjaxRequest({
		           url: '/iPlant_ajax',
		           data: {
		               IFS: 'MES_R0024',
		               TEST_EQ_ONE:'ZZD10',
		               TEST_EQ_TWO:'ZZD11',
		               REQ_TIME:dtime,
		               LINE_CD:lx,
		               ET_CD:sbbm
		           },
		           successCallBack: function (data) {
		        	   var tm = [];
		        	   var Aarr = [];
		        	   if(data.RESPONSE[0].RESPONSE_DATA.length>0){
		        		   var rowCollection = createSourceObj(data);
		        		   for(var i=0; i<rowCollection.length; i++){
		        			   tm.push(rowCollection[i].TEST_ITEMS);
		        			   Aarr.push(parseInt(rowCollection[i].NUM_QTY));
		        		   }
		        	   }else{
		        		   tm = ['CH1 FREQ MAX','Battery Failure','POSTUUT'];
			        	   Aarr = [0,0,0];
		        	   };
		        	   var badReasonData=[{name:'HDM to 1',y:22,sliced : true,selected : true},
							               {name:'功能不达标',y:38,sliced : true,selected : true},
							               {name:'规格不符',y:20,sliced : true,selected : true},
							               {name:'按键不良',y:20,sliced : true,selected : true},
							               ];
		        	   pieChart('container1','次品示意图',badReasonData);
		           }
		       });
		       
		       /*机器状态*/
		        screenAjaxFun('MES_R0106',lx,dtime,sbbm).then(function(rowCollection){
					var xData = ['08-10', '10-12', '12-14', '14-16', '16-18','18-20'];
				    var tm = [];
	        	    var keys = [];
	        	    var Aarr = new Array();
	        	    var Barr = new Array();
	        	    var Carr = new Array();
	    		    for(var o in cctm){
	    			   keys.push(o);
	    		    }
	    		    $.each(rowCollection,function(b,op){
	    			   tm.push(op.ET_SEQ);
	    		    });
	    		    $.each(keys,function(k,objs){
	    			   if($.inArray(objs,tm)<0){
						   Aarr.push('');
						   Barr.push('');
						   Carr.push('');
	    			   }else{
	    				   for(var i=0; i<rowCollection.length; i++){
	        				   if(objs == rowCollection[i].ET_SEQ){
	        					   if(rowCollection[i].DICT_IT=='RDI02.01'){
			        				   Aarr.push(parseInt(rowCollection[i].RATE.split('%')[0]));
			        			   }
			        			   if(rowCollection[i].DICT_IT=='RDI01.02'){
			        				   Barr.push(parseInt(rowCollection[i].RATE.split('%')[0]));
			        			   }
			        			   if(rowCollection[i].DICT_IT=='RDI01.03'){
			        				   Carr.push(parseInt(rowCollection[i].RATE.split('%')[0]));
			        			   }
	        				   }
	        			   };
	        			   var index = keys.indexOf(objs)+1;
	        			   if(Aarr.length < index){
	        				   var num_A = index - Aarr.length;
	        				   for(var a=0;a<num_A;a++){
	        					   Aarr.push('');
	        				   }
	        			   };
	        			   if(Barr.length < index){
	        				   var num_B = index - Barr.length;
	        				   for(var b=0;b<num_B;b++){
	        					   Barr.push('');
	        				   }
	        			   };
	        			   if(Carr.length < index){
	        				   var num_C = index - Carr.length;
	        				   for(var c=0;c<num_C;c++){
	        					   Carr.push('');
	        				   }
	        			   };
	 				    }
	        	    });
	    		    var barData = [{
	  			        name: '<span style="color:#1771B3">待机空闲</span>',
	  			        data: Barr,
	  			        stack: 'male',
	  			        color: '#2B908F'
	  			    },{
	  			    	name: '<span style="color:#1771B3">异常生产</span>',
	  			        data: Carr,
	  			        stack: 'male',
	  			        color: '#F45B5B'
	  			    }, {
	  			    	name: '<span style="color:#1771B3">正常生产</span>',
	  			        data: Aarr,
	  			        stack: 'male',
	  			        color: '#90EE7E'
	  			    }];
	        		layeredBarChart('container2','机器状态示意图（白班）',barData,xData);
				});
				
				
		        /*机械设备OEE综合状况*/
		        screenAjaxFun('MES_R0110',lx,dtime,sbbm).then(function(rowCollection){
		        	 var keys = [];
	        	     var tm = [];
	        	     var Aarr = [];
	        	     var Barr = [];
	        	     var Carr = [];
	        	     var Darr = [];
	        	     for(var o in cctm){
	      			    keys.push(o);
	      		     }
	      		     $.each(rowCollection,function(b,op){
	      			    tm.push(op.TM);
	      		     });
	      		     $.each(keys,function(k,objs){
	      			   for(var i=0; i<rowCollection.length; i++){
	      				   if($.inArray(objs,tm)<0){
	      					   Aarr.push('');
	      					   Barr.push('');
	      					   Carr.push('');
	      					   Darr.push('');
	      					   return
	      				   }
	      				   if(objs == rowCollection[i].TM){
	      					   Aarr.push(parseInt(rowCollection[i].DATE_RATE.split('%')[0]));
		        			   Barr.push(parseInt(rowCollection[i].XN_RATE.split('%')[0]));
		        			   Carr.push(parseInt(rowCollection[i].OK_RATE.split('%')[0]));
		        			   Darr.push(parseInt(rowCollection[i].OEE.split('%')[0]));
	      				   }
	      			    }
	      		     });
	      		     var barData = {'Aarr':Aarr,'Barr':Barr,'Carr':Carr,'Darr':Darr}
	      		     columnChart('container3','设备综合状况（白班）',barData)
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
		var ccINdext = 0;
		var sbbm = "";
		var lx ="";
		var cctm  = {A:'08-10', B:'10-12', C:'12-14', D:'14-16', E:'16-18',F:'18-20'};
		var dtime  = "";
		csbkb.init();
})();