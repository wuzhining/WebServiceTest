/**
 * 异型插件机看板
 */
(function(){	
	
	var times  = {A:'08-10', B:'10-12', C:'12-14', D:'14-16', E:'16-18',F:'18-20'};	// 设备状态、设备综合状况柱状图的时间段
	var flagList;
	var dateTime;
	var lineCD;// 产线编号
	var etCD;// 设备编号
	var isEmpty=false;//
	var capacity;
	
	function scadaDipInfo(){
		// 获取异常信息
		getAbnormalInfo=function(){
			iplantAjaxRequest({
		           url: '/iPlant_ajax',
		           data: {
		               IFS: 'MES_R0096',
		               ET_CD:etCD
		           },
		           successCallBack: function (data) {
		        	   if(data.RESPONSE[0].RESPONSE_DATA.length >0){
		        		   var abnormalInfo = data.RESPONSE[0].RESPONSE_DATA[0].EXPCE_NM;
		        	   		$('#abnormalInfo').html(abnormalInfo);
		        	   }else{
		        		    $('#abnormalInfo').html('');
		        	   };
		           	}
		        });
		}
		// 获取工单信息
		getWorkOrderInfo=function(){
			 iplantAjaxRequest({
		           url: '/iPlant_ajax',
		           data: {
		               IFS: 'MES_R0003',
		               LINE_CD:lineCD,
		               REQ_TIME:dateTime,
		               ET_CD:etCD
		           },
		           successCallBack: function (data) {
		        	   if(data.RESPONSE[0].length != 0){
		        		   var rowCollection = createSourceObj(data);
		        		   if(rowCollection.length>0){
		        			   $("#txtgdh").text(rowCollection[0].MO_NO); 						/* 工单号 */
			        		   $("#txtjhsl").text(rowCollection[0].PLAN_WO_QTY+"PCS"); 			/* 计划数量 */
			        		   $("#txtbzcn").text(rowCollection[0].CAPA+"PCS/H"); 				/* 标准产能 */
			        		   capacity=rowCollection[0].CAPA+"PCS/H";
			        		   
			        		   $("#txtsjcc").text(rowCollection[0].PROD_QTY+"PCS"); 			/* 实际产出 */
			        		   $("#txtyxz").text(rowCollection[0].DICT_IT_NM);					/* 设备状态 */
			        		   if(rowCollection[0].DICT_IT_NM=="正在生产" ){
			        			   $("#txtdqscsc").text(getZHsj(rowCollection[0].DEF_A));		/* 当前生产时长 */
			        			   $("#txtdqtjsc").text(0);										/* 当前停机时长 */
			        		   }else{
			        			   var str = getZHsj(rowCollection[0].DEF_A);
			        			   $("#txtdqscsc").text(0);										/* 当前生产时长 */
			        			   $("#txtdqtjsc").text(str);									/* 当前停机时长 */
			        		   }
			        		   $("#txtzcsc").text('0分钟');										/* 转产时长 */
		        			   for(var i=0; i<rowCollection.length; i++ ){
		        				   // 总 生产时长
		        				   if(rowCollection[i].DICT_IT_01=="RDI01.01"){
		        					   var str =getZHsj(rowCollection[i].TOT_TINGJI);
		        					   $("#txtzscsc").text(str);
		        				   }
		        				   // 总停机时长
		        				   if(rowCollection[i].DICT_IT_01=="RDI01.04"){
		        					   var str =getZHsj(rowCollection[i].TOT_TINGJI);
		        					   $("#txtztjsc").text(str);
		        				   }
		        				   // 总故障时长
		        				   if(rowCollection[i].DICT_IT_01=="RDI01.05"){
		        					   var str =getZHsj(rowCollection[i].TOT_TINGJI);
		        					   $("#txtpjwgzsc").text(str);
		        				   }
		        				   // 转产
		        				   if(rowCollection[i].DICT_IT_01=="E"){
		        					   var str =getZHsj(rowCollection[i].TOT_TINGJI);
		        					   $("#txtzcsc").text(str);
		        				   }
		        			   }
		        		   }
		        	   }
		           }
		       })
		},
		// 异型插件机生产状况
		proCdtion=function(){
			iplantAjaxRequest({
		           url: '/iPlant_ajax',
		           data: {
		               IFS: 'MES_SD000011',
		               USEMETHOD:'proCdtion'
		           },
		           successCallBack: function (data) {
		        	   var dataArray = new Array(4);
		        	   var list;
		        	   var value=0;
		        	   if(data.RESPONSE[0].RESPONSE_DATA.length>0){
		        		   var rowCollection = createSourceObj(data);
		        		   for(var i=0; i<rowCollection.length; i++){
		        			   if(rowCollection[i].PARAMVALUE!='null'||rowCollection[i].PARAMVALUE.length<10){
		        				   
		        				   flagList=rowCollection[i].PARAMVALUE.split(';')
		        				   for(var index=0; index<flagList.length; index++){
		        					   list=flagList[index].split(',');
		        					   value+=parseInt(list[1])
		        				   }
		        				   switch (rowCollection[i].PARAMNAME){
		        				   case 'InsertCell':
		        					   dataArray.splice(0,1,value);
		        					   break;
		        				   case 'TakeCell':
		        					   dataArray.splice(1,1,value);
		        					   break;
		        				   case 'ThrowCell':
		        					   dataArray.splice(2,1,value);
		        					   break;
		        				   case 'NullCell':
		        					   dataArray.splice(3,1,value);
		        					   break;
		        				   }
		        				   value=0;
		        			   };
		        		   };
		        	   }else{
		        		   dataArray = [0,0,0,0,0];
		        		   barCode = '';
		        	   };
		        	   
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
		       			        text: '<span style="color:#1771B3;font-size:14px;">异型插件机生产情况</span>'
		       			    },
		       			    plotOptions: {
		       			        column: {
		       			            depth: 40,
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
				       		            },
				       			     }
		       			    },
		       			    xAxis: {
		       			    	/* categories: ['插件数','抛料数','空抛数','抛料率','吸取率'], */
		       			    	categories: ['插料数','取料数','抛料数','空抛数'],
		       			    	min	: 0,
		       			    	max : 3
		       			    },
		       			    yAxis: {
		       			        title: {
		       			            text: '数量'
		       			        },
		       			        min:0,
		       			        minRange:1
		       			    },
		       			    series: [{
		       			        name: '<span style="color:#1771B3">生产数量</span>',
		       			        data: dataArray
		       			        }],
		       			    credits: {
		       			          enabled:false
		       			},exporting: {
		       	            enabled:false
		       			}
		       			});
		           }
		       });
		},
		// 设备状态
		eqmStatus=function(){
			iplantAjaxRequest({
		           url: '/iPlant_ajax',
		           data: {
		        	   IFS: 'MES_SD000011',
		               USEMETHOD:'eqmStatus'
//		            	   USEMETHOD:'proCdtion'
		           },
		           successCallBack: function (data) {
		        	   var Aarr = new Array(6);
		        	   var Barr = new Array(6);
		        	   var Carr = new Array();
		        	   var flagList;
		        	   var list;
		        	   var work;
		        	   var sleep;
		        	   if(data.RESPONSE[0].length != 0){
		        		   var rowCollection = createSourceObj(data);
		        		 //后台返回当天数据，共分为A、B、C、D、E、F六个时间段，每个时间段包含设备在该时间段内工作、待机状态的占比
		        		   $.each(rowCollection[0],function(key,val){
	        				   if(val=='null'||val==''){
	        					   sleep=0;
	        					   work=0;
	        				   }else{
	        					   flagList=val.split(',');
	        					   for(var i =0;i<flagList.length;i++){
	        						   
	    		        			   list=flagList[i].split(':');
	    		        			   switch (list[0]){
	    		        			   case 'WORK':
	    		        				   work=parseFloat(list[1].split('%')[0])*100;
	            						   break;
	            					   case 'SLEEP':
	            						   sleep=parseFloat(list[1].split('%')[0])*100;
	            						   break;
	    		        			   }
	        					   }
	        					   
	        					   switch(key){
			        			    case 'A':
			        			    	Aarr.splice(0,1,work);
			        			    	Barr.splice(0,1,sleep);
	        						   break;
			        			    case 'B':
			        			    	Aarr.splice(1,1,work);
			        			    	Barr.splice(1,1,sleep);
		        						break;
			        			    case 'C':
			        			    	Aarr.splice(2,1,work);
			        			    	Barr.splice(2,1,sleep);
		        						break;
			        			    case 'D':
			        			    	Aarr.splice(3,1,work);
			        			    	Barr.splice(3,1,sleep);
		        						break;
			        			    case 'E':
			        			    	Aarr.splice(4,1,work);
			        			    	Barr.splice(4,1,sleep);
		        						break;
			        			    case 'F':
			        			    	Aarr.splice(5,1,work);
			        			    	Barr.splice(5,1,sleep);
		        						break;
			        			   }
	        				   }
		        		   });
			        };
		        		   
		        		   // 设置设备状态柱状图
		        		   Highcharts.chart('container2', {
		       			    chart: {
		       			        type: 'column',
		       			        options3d: {
		       			            enabled: true,
		       			            alpha: 5,
		       			            beta: 5,
		       			            viewDistance: 25,
		       			            depth: 50
		       			        }
		       			    },

		       			    title: {
		       			        text: '<span style="color:#1771B3;font-size:14px;">机器状态示意图（'+'白班'+'）</span>'
		       			    },

		       			    xAxis: {
		       			    	categories: ['08-10', '10-12', '12-14', '14-16', '16-18','18-20'],
		       			        min : 0,
						    	max: 5
		       			    },

		       			    yAxis: {
		       			        allowDecimals: false,
		       			        min: 0,
		       			        max:100,
		       			        title: {
		       			            text: null
		       			        },
		       		            labels:{
		       		                formatter:function() {// 在labels里可以配置formatter属性可以对y轴设置单位之类的个性化东西
		       		                    return this.value+'%';// 可以对照上面图表 +"L"
		       		                }
		       		            }
		       			    },
		       			 plotOptions: {
		       			        column: {
		       			            stacking: 'normal',
		       			            depth: 40
		       			        },
			       			     series: {
				       		            animation: {
				       		                duration: 5000,
				       		                easing: 'easeOutBounce'
				       		            }
				       			     }
		       			    },

		       			 series: [{
		       			        name: '<span style="color:#1771B3">待机空闲</span>',
		       			        data: Barr,// [3, 4, 4, 2, 5],
		       			        stack: 'male',
		       			        color: '#2B908F'
//		       			    },{
//		       			    	name: '<span style="color:#1771B3">故障</span>',
//		       			        data: Carr,// [2, 5, 6, 2, 1],
//		       			        stack: 'male',
//		       			        color: '#F45B5B'
		       			    }, {
		       			    	name: '<span style="color:#1771B3">生产</span>',
		       			        data: Aarr,// [5, 3, 4, 7, 2],
		       			        stack: 'male',
		       			        color: '#90EE7E'
		       			    }],
		       			    credits: {
		       			          enabled:false
		       			},exporting: {
		       	            enabled:false
		       			}
		       			});
		        	   }
//		           }
		       });
		},
		// 设备综合状况
		eqmCpsCdtion=function(){
			iplantAjaxRequest({
		           url: '/iPlant_ajax',
		           data: {
		        	   IFS: 'MES_SD000011',
		               USEMETHOD:'eqmCpsCdtion'
//		            	IFS: 'MES_SD000013',
//		            	STARTDATE:'2018-12-01 10:00:00',
//		            	ENDDATE:'2018-12-01 12:00:00'
		           },
		           successCallBack: function (data) {
		        	   var Aarr = [];
		        	   var Barr = [];
		        	   var Carr = [];
		        	   var Darr = [];
		        	   var totalArr=[];//插件数
		        	   var insertValueArr=[];//插料数，六个时间段
		        	   var takeValueArr=[];//取料数，六个时间段
		        	   var throwValueArr=[];//空抛数，六个时间段
		        	   var nullValueArr=[];//空取数，六个时间段
		        	   var tempArr=new Array(6);
		        	   var list;
		        	   var value=0;
		        	   if(data.RESPONSE[0].length != 0){
		        		   
		        		   var rowCollection = createSourceObj(data);
		        		   for(var i=0; i<rowCollection.length; i++){
		        			   if(rowCollection[i].PARAMVALUE!='null'){
		        				   if(rowCollection[i].PARAMNAME=='TotalCount'){
		        					   //获取各时间段的插件生产总数
		        					   totalArr.push(rowCollection[i].ATOTAL);
		        					   totalArr.push(rowCollection[i].BTOTAL);
		        					   totalArr.push(rowCollection[i].CTOTAL);
		        					   totalArr.push(rowCollection[i].DTOTAL);
		        	                   totalArr.push(rowCollection[i].ETOTAL);
		        	                   totalArr.push(rowCollection[i].FTOTAL);
		        	                   
		        				   }else{
		        					   //获取各时间段的插料、抛料、空抛等总数
		        					   
		        					   $.each(rowCollection[i],function(key,val){
		        						   flagList=val.split(';');
		        						   for(var index=0; index<flagList.length; index++){
		        							   list=flagList[index].split(',');
		        							   value+=parseInt(list[1]);
		        						   }
		        						   switch (key){
			        					   case 'AVALUE':
			        						   tempArr.splice(0,1,value);
			        						   break;
			        					   case 'BVALUE':
			        						   tempArr.splice(1,1,value);
			        						   break;
			        					   case 'CVALUE':
			        						   tempArr.splice(2,1,value);
			        						   break;
			        					   case 'DVALUE':
			        						   tempArr.splice(3,1,value);
			        						   break;
			        					   case 'EVALUE':
			        						   tempArr.splice(4,1,value);
			        						   break;
			        					   case 'FVALUE':
			        						   tempArr.splice(5,1,value);
			        						   break;
			        					   }
		        						   value=0;
		        					   })
		        					   
//		        					   tempArr=[];
//		        					   flagList=rowCollection[i].AVALUE.split(';')
//	        						   for(var index=0; index<flagList.length; index++){
//	        							   list=flagList[index].split(',');
//	        							   value+=parseInt(list[1])
//	        						   }
//		        					   tempArr.push(value);
//	        						   value=0;
//	        						   
//	        						   flagList=rowCollection[i].BVALUE.split(';')
//	        						   for(var index=0; index<flagList.length; index++){
//	        							   list=flagList[index].split(',');
//	        							   value+=parseInt(list[1])
//	        						   }
//	        						   tempArr.push(value);
//	        						   value=0;
//	        						   
//	        						   flagList=rowCollection[i].CVALUE.split(';')
//	        						   for(var index=0; index<flagList.length; index++){
//	        							   list=flagList[index].split(',');
//	        							   value+=parseInt(list[1])
//	        						   }
//	        						   tempArr.push(value);
//	        						   value=0;
//	        						   
//	        						   flagList=rowCollection[i].DVALUE.split(';')
//	        						   for(var index=0; index<flagList.length; index++){
//	        							   list=flagList[index].split(',');
//	        							   value+=parseInt(list[1])
//	        						   }
//	        						   tempArr.push(value);
//	        						   value=0;
//	        						   
//	        						   flagList=rowCollection[i].EVALUE.split(';')
//	        						   for(var index=0; index<flagList.length; index++){
//	        							   list=flagList[index].split(',');
//	        							   value+=parseInt(list[1])
//	        						   }
//	        						   tempArr.push(value);
//	        						   value=0;
//	        						   
//	        						   flagList=rowCollection[i].FVALUE.split(';')
//	        						   for(var index=0; index<flagList.length; index++){
//	        							   list=flagList[index].split(',');
//	        							   value+=parseInt(list[1])
//	        						   }
//	        						   tempArr.push(value);
//	        						   value=0;
		        					   
		        					   switch (rowCollection[i].PARAMNAME){
		        					   case 'InsertCell':
		        						   insertValueArr=tempArr;
		        						   break;
		        					   case 'TakeCell':
		        						   takeValueArr=tempArr;
		        						   break;
		        					   case 'ThrowCell':
		        						   throwValueArr=tempArr;
		        						   break;
		        					   case 'NullCell':
		        						   nullValueArr=tempArr;
		        						   break;
		        					   }
		        				   }
		        			   }
		        		   }
		        		   //计算稼动率、直通率、OEE
		        		   //运动稼动率=实际产出/（标准产能*生产时间)
		        		for(var index=0;index<totalArr.length;index++){
		        			if(totalArr[index]==null||totalArr[index]=='null'){
		        				Aarr.push('');
		        			}else{
		        				Aarr.push( (parseInt(totalArr[index])/(parseInt(capacity.substring(0,capacity.length-5))*2))*100);//运动稼动率
		        			}
//		        		}
		        		   //	性能稼动率=取料数/插料数
		        			//	直通率=（取料数-（抛料数+空抛数））/取料数
//		        		for(var index=0;index<takeValueArr.length;index++){
		        			if(takeValueArr[index]=='0'||takeValueArr[index]=='null'||insertValueArr[index]=='0'){
		        				Barr.push('');
		        				Carr.push('');
		        			}else{
		        				Barr.push((parseInt(takeValueArr[index])/parseInt(insertValueArr[index]))*100);//性能稼动率
		        				Carr.push(((parseInt(takeValueArr[index])-parseInt(throwValueArr[index])-parseInt(nullValueArr[index]))/parseInt(takeValueArr[index]))*100);//直通率
		        			}
//		        		}
		        		   //	OEE=两稼动率相乘
		        		   Darr.push(Aarr[index]*Barr[index]);
		        		   
		        		}
		        		   
		       			Highcharts.chart('container3', {
		       			    chart: {
		       			        type: 'column'
		       			    },
		       			    title: {
		       			        text: '<span style="color:#1771B3;font-size:14px;">设备综合状况（'+'白班'+'）</span>'
		       			    },
		       			    xAxis: {
		       			    	categories: ['08-10', '10-12', '12-14', '14-16', '16-18', '18-20'],
		       			        min : 0,
						    	max: 5,
		       			        crosshair: true
		       			    },
		       			 yAxis: {
		       			        min: 0,
		       			        max:100,
		       			        title: {
		       			            text: null
		       			        },
			       			     labels:{
			       		                formatter:function() {// 在labels里可以配置formatter属性可以对y轴设置单位之类的个性化东西
			       		                    return this.value+'%';// 可以对照上面图表
																	// +"L"
			       		                }
			       		            }
		       			    },
		       			    tooltip: {
		       			        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
		       			        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
		       			            '<td style="padding:0"><b>{point.y:.1f} %</b></td></tr>',
		       			        footerFormat: '</table>',
		       			        shared: true,
		       			        useHTML: true
		       			    },
		       			 plotOptions: {
		       			        column: {
		       			            pointPadding: 0.2,
		       			            borderWidth: 0
		       			        },
		       			     series: {
			       		            animation: {
			       		                duration: 5000,
			       		                easing: 'easeOutBounce'
			       		            }
			       			     }
		       			    },
		       			    series: [{
		       			        name: '<span style="color:#1771B3">运动稼动率</span>',
		       			        data: Aarr

		       			    }, {
		       			        name: '<span style="color:#1771B3">性能稼动率</span>',
		       			        data:Barr

		       			    }, {
		       			        name: '<span style="color:#1771B3">直通率</span>',
		       			        data: Carr

		       			    }, {
		       			        name: '<span style="color:#1771B3">OEE</span>',
		       			        data:Darr

		       			    }],
		       			    credits: {
		       			          enabled:false
		       			},exporting: {
		       	            enabled:false
		       			}
		       			});
		        	   }
		           }
		       });
		},
		// 给全局变量设值
		setValue=function (){
			lineCD= getQueryString("line");
			etCD=getQueryString("shebei");
			
			iplantAjaxRequest({
	           url: '/iPlant_ajax',
	           data: {
	               IFS: 'S0000021',
	           },
	           async: false,
	           successCallBack: function (data) {
	        	   if(data.RESPONSE[0].RESPONSE_DATA.length>0){
	        		   oldTime = data.RESPONSE[0].RESPONSE_DATA[0].SYS_TIME;
	        		   
	        		   var formYearToDay = oldTime.slice(0,10);
	        		   
	        		   var hours = parseInt(oldTime.slice(11,13));
	        		   
		    			var condition=parseInt(hours)>=8 && parseInt(hours)<20
		    			dateTime = condition ? formYearToDay + " " + "08" + ":" + "00" : formYearToDay + " " + "20" + ":" + "00" ;
	        	   }
	           }
	       });
		}
	}
	
		autoRefresh=function(){
			// 异常信息
			getAbnormalInfo();
			
			// 工单
			getWorkOrderInfo();
		       
		     // 异型插件机生产情况productionCondition缩写为proCdtion
			proCdtion(); 
		       
		     // 设备状态
			eqmStatus();
		       
			// 设备综合状况 equipmentComprehensiveCondition 缩写为eqmCpsCdtion
			eqmCpsCdtion()
		       
		},

	scadaDipInfo.prototype={
			init: function () {
				$(function () {
					
					setValue();
					
					autoRefresh();
					// 设定autoRefresh()方法的启动间隔时间
					setInterval(function  () {
						autoRefresh();
					},30000);
				});
			}
	}	
	
	new scadaDipInfo().init();
})();

