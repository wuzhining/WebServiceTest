$(function () {
	var dtime  = getBCtime();
	var lx = getQueryString("line");
	var sbbm = getQueryString("shebei");
	var cctm  = {A:'08:00-10:00', B:'10:00-12:00', C:'12:00-14:00', D:'14:00-16:00', E:'16:00-18:00', F:'18:00-20:00', G:'20:00-22:00', H:'22:00-24:00'};
    
//	var ajaxFinishParam={
//			url: '/iPlant_ajax',
//			data:{
//				   IFS: 'MES_R0010',
//	               REQ_TIME:dtime,
//	               LINE_CD:lx,
//	               ET_CD:sbbm,
//	               SHIFT_CD:'A'
//			},
//			successCallBack:function(data){
//				if(data.RESPONSE.length != 0){
//				var prodData=data.RESPONSE["0"].RESPONSE_DATA;
//				for(var i=0;i<prodData.length;i++){
//					timeCategory.push(cctm[prodData[i].TM]);
//					prodCnt.push(parseInt(prodData[i].WC_QTY1));
//					finishedCnt.push(parseInt(prodData[i].WC_QTY2));
//					targetCnt.push(parseInt(prodData[i].WC_QTY1));
//				}
//			}
//	     },
//	     errorCallBack:function(e){
//				var a=e;
//	     }
//	}
//	iplantAjaxRequest(ajaxFinishParam);
	var con_obj = document.getElementById("ccTable");
	var tableHeihgt = con_obj.clientHeight;
	var ccStr = '<span style="font-size:4px;">总共</span>'
	+'<span id="cToal"style="font-size:4px;color:red">0</span>'
	+'<span style="font-size:4px;">台</span>'
	+'<img width="3px" height="3px" style="vertical-align:middle;" src="../../../common/RootImages/js01.gif"/>'
	+'<span style="font-size:4px;">正常生产</span>'
	+'<span id="zctol"style="font-size:4px;color:red">0</span>'
	+'<span style="font-size:4px;">台(占</span>'
	+'<span id="scbl" style="font-size:4px;">0%</span>'
	+'<span style="font-size:4px;">)</span>'
	+'<img width="3px" height="3px" style="vertical-align:middle;" src="../../../common/RootImages/js02.gif"/>'
	+'<span style="font-size:4px;">异常</span>'
	+'<span id="cToalsc"style="font-size:4px;color:red">0</span>'
	+'<span style="font-size:4px;">台(占</span>'
	+'<span id="ycbl" style="font-size:4px;">0%</span>'
	+'<span style="font-size:4px;">)</span>'
	+'<img width="3px" height="3px" style="vertical-align:middle;"src="../../../common/RootImages/js03.gif"/>'
	+'<span style="font-size:4px;">长期停机</span>'
	+'<span id="tjts"style="font-size:4px;color:red">0</span>'
	+'<span style="font-size:4px;">台(占</span>'
	+'<span id="tjbl" style="font-size:4px;">0%</span>'
	+'<span style="font-size:4px;">)</span>'
	+'<img width="3px" height="3px" style="vertical-align:middle;"src="../../../common/RootImages/js04.gif"/>'
	+'<span style="font-size:4px;">未派工生产</span>'
	+'<span id="djts"style="font-size:4px;color:red">0</span>'
	+'<span style="font-size:4px;">台(占</span>'
	+'<span id="djbl" style="font-size:4px;">0%</span>'
	+'<span style="font-size:4px;">)</span>'
	+'<img width="3px" height="3px" style="vertical-align:middle;"src="../../../common/RootImages/js05.gif"/>'
	+'<span style="font-size:4px;">计划停机</span>'
	+'<span id="jhts"style="font-size:4px;color:red">0</span>'
	+'<span style="font-size:4px;">台(占</span>'
	+'<span id="jhbl" style="font-size:4px;">0%</span>'
	+'<span style="font-size:4px;">)</span>';
	$('#ccgird').panel({title: ccStr});
	
	var width=document.getElementById("ccgird").style.width;
	var height=document.getElementById("ccgird").style.height;
	width=width.substr(0,width.length-2);
	height = height.substr(0,height.length-2);
	var widthCount = 4;//每行个数
	var heightCount = 1;//每列个数
	var wid = (parseInt(width)-20)/4; //每个货位的宽度
	var hit = (wid*2)/3; //没个货位的高度
	
	for(var i = 0; i < heightCount; i++) {   
  		     _row = document.createElement("tr");
  		 	 _row.align="left";
//  		 	 if(height<400 && i==1){
//  		 		_row.style.display = "none";  
//  		 	 }
  		     document.getElementById("zfaxxGrid").appendChild(_row); 
  		 	var arrMC = ["AOI","SPI","贴标机","贴片机"];
  		 	var arrSC = ["10","20","30","40"];
  		 	var arrGSL = ["1111","2012","2042","2530"];
  		 	var arrLSL = ["1000","2000","1999","1525"]; 
  		 	var arrZT = ["待机空闲","待机空闲","待机空闲","待机空闲"];
  		 	var arrGD = ["WO12345645411","WO12345645422","WO12345645433","WO12345645444"];
  		 	var arrSRC = ["image/AOI_6.jpg","image/SPI_3.jpg","image/tbj_1.jpg","image/tpj_4.jpg"];
  		     for(var j = 0; j < widthCount; j++) {	
  			 	_cell = document.createElement("td"); 
//  			 	_cell.nowrap="nowrap";
  			 	_row.appendChild(_cell);
  		 		//加载div
  		 		var table = document.createElement("table"); 
  		 			table.style.width=wid+"px";
  		 			table.style.height=50+"px";
  		 			table.style.textAlign = "left";
  		 			table.style.cellspacing = "1px";
  		 			table.style.cellpadding = "1px";
  		 			table.style.borderCollapse='collapse';
  		 			
  		 			table.id = "cctest"+(i*widthCount+j);
	    		 	_cell.appendChild(table); 
	    		 	
	    		 var str1  = "<tr style='background-color:#E5C012'><td colspan='2' style='height:6px;width:50%;text-align: center;border-left: 1px solid #95B8E7;border-right: 1px solid #95B8E7; border-top: 1px solid #95B8E7;vertical-align: middle;color:#1771B3;white-space: nowrap;text-overflow: ellipsis;overflow: hidden;'>机器编号A0"+parseInt(j+1)+"&nbsp;&nbsp;"+arrMC[j]+"</td></tr>";
	    		 $("#"+"cctest"+(i*widthCount+j)).append(str1);
	    		 var str2  = "<tr><td rowspan='3' style='height:6px;width:30%;text-align: center;border-left: 1px solid #95B8E7; border-top: 1px solid #95B8E7;vertical-align: middle;color:#1771B3;white-space: nowrap;text-overflow: ellipsis;overflow: hidden;'><img width='20px' height='26px' src='"+arrSRC[j]+"'></td><td style='height:6px;width:90%;text-align: left;border-left: 1px solid #95B8E7;border-right: 1px solid #95B8E7; border-top: 1px solid #95B8E7;vertical-align: middle;color:#1771B3;white-space: nowrap;text-overflow: ellipsis;overflow: hidden;'>生产时长："+arrSC[j]+"</td></tr>";
	    		 $("#"+"cctest"+(i*widthCount+j)).append(str2);
	    		 var str3  = "<tr><td style='height:6px;width:50%;text-align: left;border-left: 1px solid #95B8E7;border-right: 1px solid #95B8E7; border-top: 1px solid #95B8E7;vertical-align: middle;color:#1771B3;white-space: nowrap;text-overflow: ellipsis;overflow: hidden;'>工单数："+arrGSL[j]+"</td></tr>";
	    		 $("#"+"cctest"+(i*widthCount+j)).append(str3);
	    		 var str4  = "<tr><td style='height:6px;width:50%;text-align: left;border-left: 1px solid #95B8E7;border-right: 1px solid #95B8E7; border-top: 1px solid #95B8E7;vertical-align: middle;color:#1771B3;white-space: nowrap;text-overflow: ellipsis;overflow: hidden;'>良品数："+arrLSL[j]+"</td></tr>";
	    		 $("#"+"cctest"+(i*widthCount+j)).append(str4);
	    		 var str10  = "<tr><td colspan='2' style='height:6px;width:50%;text-align: left;border-left: 1px solid #95B8E7; border-right: 1px solid #95B8E7; border-top: 1px solid #95B8E7; vertical-align: middle;color:#1771B3;white-space: nowrap;text-overflow: ellipsis;overflow: hidden;'>生产工单："+arrGD[j]+" </td></tr>";
	    		 $("#"+"cctest"+(i*widthCount+j)).append(str10);
	    		 var str11  = "<tr><td colspan='2' style='height:6px;width:50%;text-align: left;border-left: 1px solid #95B8E7; border-right: 1px solid #95B8E7; border-top: 1px solid #95B8E7; border-bottom: 1px solid #95B8E7;vertical-align: middle;color:#1771B3;white-space: nowrap;text-overflow: ellipsis;overflow: hidden;'>设备状态："+arrZT[j]+" </td></tr>";
	    		 $("#"+"cctest"+(i*widthCount+j)).append(str11);
  		 	} 
  	} 
	
    /*机器稼动率*/
    	Highcharts.chart('machineRate', {

    	    chart: {
    	        type: 'gauge',
    	        plotBackgroundColor: null,
    	        plotBackgroundImage: null,
    	        plotBorderWidth: 0,
    	        plotShadow: false
    	    },

    	    title: {
    	        text: '<span style="font-size:6px;">机器稼动率<span>',
    	        y:tableHeihgt*0.9
    	    },

    	    pane: {
    	        startAngle: -150,
    	        endAngle: 150,
    	        background: [{
    	            backgroundColor: {
    	                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
    	                stops: [
    	                    [0, '#FFF'],
    	                    [1, '#333']
    	                ]
    	            },
    	            borderWidth: 0,
    	            outerRadius: '109%'
    	        }, {
    	            backgroundColor: {
    	                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
    	                stops: [
    	                    [0, '#333'],
    	                    [1, '#FFF']
    	                ]
    	            },
    	            borderWidth: 1,
    	            outerRadius: '107%'
    	        }, {
    	            // default background
    	        }, {
    	            backgroundColor: '#DDD',
    	            borderWidth: 0,
    	            outerRadius: '105%',
    	            innerRadius: '103%'
    	        }]
    	    },

    	    // the value axis
    	    yAxis: {
    	        min: 0,
    	        max: 200,

    	        minorTickInterval: 'auto',
    	        minorTickWidth: 1,
    	        minorTickLength: 10,
    	        minorTickPosition: 'inside',
    	        minorTickColor: '#666',

    	        tickPixelInterval: 30,
    	        tickWidth: 2,
    	        tickPosition: 'inside',
    	        tickLength: 10,
    	        tickColor: '#666',
    	        labels: {
    	            step: 2,
    	            rotation: 'auto'
    	        },
    	        title: {
//    	            text: 'km/h'
    	        },
    	        plotBands: [{
    	            from: 0,
    	            to: 120,
    	            color: '#55BF3B' // green
    	        }, {
    	            from: 120,
    	            to: 160,
    	            color: '#DDDF0D' // yellow
    	        }, {
    	            from: 160,
    	            to: 200,
    	            color: '#DF5353' // red
    	        }]
    	    },

    	    series: [{
    	        name: '机器稼动率',
    	        data: [80],
    	        tooltip: {
//    	            valueSuffix: ' km/h'
    	        }
    	    }],
    	    credits: {
  	          enabled:false
    	    },exporting: {
    	    	enabled:false
    	    }

    	},
    	// Add some life
    	function (chart) {
    	    if (!chart.renderer.forExport) {
    	        setInterval(function () {
    	            var point = chart.series[0].points[0],
    	                newVal,
    	                inc = Math.round((Math.random() - 0.5) * 20);

    	            newVal = point.y + inc;
    	            if (newVal < 0 || newVal > 200) {
    	                newVal = point.y - inc;
    	            }

    	            point.update(newVal);

    	        }, 3000);
    	    }
    	});
    
    /*机器OEE*/
    	Highcharts.chart('machineOEE', {

    	    chart: {
    	        type: 'gauge',
    	        plotBackgroundColor: null,
    	        plotBackgroundImage: null,
    	        plotBorderWidth: 0,
    	        plotShadow: false
    	    },

    	    title: {
    	        text: '<span style="font-size:6px;">OEE<span>',
    	        y:tableHeihgt*0.9
    	    },

    	    pane: {
    	        startAngle: -150,
    	        endAngle: 150,
    	        background: [{
    	            backgroundColor: {
    	                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
    	                stops: [
    	                    [0, '#FFF'],
    	                    [1, '#333']
    	                ]
    	            },
    	            borderWidth: 0,
    	            outerRadius: '109%'
    	        }, {
    	            backgroundColor: {
    	                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
    	                stops: [
    	                    [0, '#333'],
    	                    [1, '#FFF']
    	                ]
    	            },
    	            borderWidth: 1,
    	            outerRadius: '107%'
    	        }, {
    	            // default background
    	        }, {
    	            backgroundColor: '#DDD',
    	            borderWidth: 0,
    	            outerRadius: '105%',
    	            innerRadius: '103%'
    	        }]
    	    },

    	    // the value axis
    	    yAxis: {
    	        min: 0,
    	        max: 200,

    	        minorTickInterval: 'auto',
    	        minorTickWidth: 1,
    	        minorTickLength: 10,
    	        minorTickPosition: 'inside',
    	        minorTickColor: '#666',

    	        tickPixelInterval: 30,
    	        tickWidth: 2,
    	        tickPosition: 'inside',
    	        tickLength: 10,
    	        tickColor: '#666',
    	        labels: {
    	            step: 2,
    	            rotation: 'auto'
    	        },
    	        title: {
//    	            text: 'km/h'
    	        },
    	        plotBands: [{
    	            from: 0,
    	            to: 120,
    	            color: '#55BF3B' // green
    	        }, {
    	            from: 120,
    	            to: 160,
    	            color: '#DDDF0D' // yellow
    	        }, {
    	            from: 160,
    	            to: 200,
    	            color: '#DF5353' // red
    	        }]
    	    },

    	    series: [{
    	        name: 'OEE',
    	        data: [80],
    	        tooltip: {
//    	            valueSuffix: ' km/h'
    	        }
    	    }],
    	    credits: {
  	          enabled:false
    	    },exporting: {
    	    	enabled:false
    	    }

    	},
    	// Add some life
    	function (chart) {
    	    if (!chart.renderer.forExport) {
    	        setInterval(function () {
    	            var point = chart.series[0].points[0],
    	                newVal,
    	                inc = Math.round((Math.random() - 0.5) * 20);

    	            newVal = point.y + inc;
    	            if (newVal < 0 || newVal > 200) {
    	                newVal = point.y - inc;
    	            }

    	            point.update(newVal);

    	        }, 3000);
    	    }
    	});
    
    /*班组OEE*/
    	Highcharts.chart('groupOEE', {

    	    chart: {
    	        type: 'gauge',
    	        plotBackgroundColor: null,
    	        plotBackgroundImage: null,
    	        plotBorderWidth: 0,
    	        plotShadow: false
    	    },

    	    title: {
    	        text: '<span style="font-size:6px;">班组OEE<span>',
    	        y:tableHeihgt*0.9
    	    },

    	    pane: {
    	        startAngle: -150,
    	        endAngle: 150,
    	        background: [{
    	            backgroundColor: {
    	                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
    	                stops: [
    	                    [0, '#FFF'],
    	                    [1, '#333']
    	                ]
    	            },
    	            borderWidth: 0,
    	            outerRadius: '109%'
    	        }, {
    	            backgroundColor: {
    	                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
    	                stops: [
    	                    [0, '#333'],
    	                    [1, '#FFF']
    	                ]
    	            },
    	            borderWidth: 1,
    	            outerRadius: '107%'
    	        }, {
    	            // default background
    	        }, {
    	            backgroundColor: '#DDD',
    	            borderWidth: 0,
    	            outerRadius: '105%',
    	            innerRadius: '103%'
    	        }]
    	    },

    	    // the value axis
    	    yAxis: {
    	        min: 0,
    	        max: 200,

    	        minorTickInterval: 'auto',
    	        minorTickWidth: 1,
    	        minorTickLength: 10,
    	        minorTickPosition: 'inside',
    	        minorTickColor: '#666',

    	        tickPixelInterval: 30,
    	        tickWidth: 2,
    	        tickPosition: 'inside',
    	        tickLength: 10,
    	        tickColor: '#666',
    	        labels: {
    	            step: 2,
    	            rotation: 'auto'
    	        },
    	        title: {
//    	            text: 'km/h'
    	        },
    	        plotBands: [{
    	            from: 0,
    	            to: 120,
    	            color: '#55BF3B' // green
    	        }, {
    	            from: 120,
    	            to: 160,
    	            color: '#DDDF0D' // yellow
    	        }, {
    	            from: 160,
    	            to: 200,
    	            color: '#DF5353' // red
    	        }]
    	    },

    	    series: [{
    	        name: '班组OEE',
    	        data: [80],
    	        tooltip: {
//    	            valueSuffix: ' km/h'
    	        }
    	    }],
    	    credits: {
  	          enabled:false
    	    },exporting: {
    	    	enabled:false
    	    }

    	},
    	// Add some life
    	function (chart) {
    	    if (!chart.renderer.forExport) {
    	        setInterval(function () {
    	            var point = chart.series[0].points[0],
    	                newVal,
    	                inc = Math.round((Math.random() - 0.5) * 20);

    	            newVal = point.y + inc;
    	            if (newVal < 0 || newVal > 200) {
    	                newVal = point.y - inc;
    	            }

    	            point.update(newVal);

    	        }, 3000);
    	    }
    	});
    
    /*产能*/
    	Highcharts.chart('capacity', {

    	    chart: {
    	        type: 'gauge',
    	        plotBackgroundColor: null,
    	        plotBackgroundImage: null,
    	        plotBorderWidth: 0,
    	        plotShadow: false
    	    },

    	    title: {
    	        text: '<span style="font-size:6px;">产能<span>',
    	        y:tableHeihgt*0.9
    	    },

    	    pane: {
    	        startAngle: -150,
    	        endAngle: 150,
    	        background: [{
    	            backgroundColor: {
    	                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
    	                stops: [
    	                    [0, '#FFF'],
    	                    [1, '#333']
    	                ]
    	            },
    	            borderWidth: 0,
    	            outerRadius: '109%'
    	        }, {
    	            backgroundColor: {
    	                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
    	                stops: [
    	                    [0, '#333'],
    	                    [1, '#FFF']
    	                ]
    	            },
    	            borderWidth: 1,
    	            outerRadius: '107%'
    	        }, {
    	            // default background
    	        }, {
    	            backgroundColor: '#DDD',
    	            borderWidth: 0,
    	            outerRadius: '105%',
    	            innerRadius: '103%'
    	        }]
    	    },

    	    // the value axis
    	    yAxis: {
    	        min: 0,
    	        max: 200,

    	        minorTickInterval: 'auto',
    	        minorTickWidth: 1,
    	        minorTickLength: 10,
    	        minorTickPosition: 'inside',
    	        minorTickColor: '#666',

    	        tickPixelInterval: 30,
    	        tickWidth: 2,
    	        tickPosition: 'inside',
    	        tickLength: 10,
    	        tickColor: '#666',
    	        labels: {
    	            step: 2,
    	            rotation: 'auto'
    	        },
    	        title: {
//    	            text: 'km/h'
    	        },
    	        plotBands: [{
    	            from: 0,
    	            to: 120,
    	            color: '#55BF3B' // green
    	        }, {
    	            from: 120,
    	            to: 160,
    	            color: '#DDDF0D' // yellow
    	        }, {
    	            from: 160,
    	            to: 200,
    	            color: '#DF5353' // red
    	        }]
    	    },

    	    series: [{
    	        name: '产能',
    	        data: [80],
    	        tooltip: {
//    	            valueSuffix: ' km/h'
    	        }
    	    }],
    	    credits: {
  	          enabled:false
    	    },exporting: {
    	    	enabled:false
    	    }

    	},
    	// Add some life
    	function (chart) {
    	    if (!chart.renderer.forExport) {
    	        setInterval(function () {
    	            var point = chart.series[0].points[0],
    	                newVal,
    	                inc = Math.round((Math.random() - 0.5) * 20);

    	            newVal = point.y + inc;
    	            if (newVal < 0 || newVal > 200) {
    	                newVal = point.y - inc;
    	            }

    	            point.update(newVal);

    	        }, 3000);
    	    }
    	});
});


