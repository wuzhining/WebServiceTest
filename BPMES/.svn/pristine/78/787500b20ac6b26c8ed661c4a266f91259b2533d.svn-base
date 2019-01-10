/* 启动时加载 */
/*
*/
(function(){
	function screen(){
    	initGridData=function(){
    		initSmtInfo();
    		initscreen();
        },
        initscreen = function(){
        	var dataMap=[8,75,86,8800];
        	option1 = {
    			title: {
    				x:"center",
    				y:"bottom",
                    text: '机器嫁动数', //标题文本内容
                },
	        	tooltip : { 
	        		formatter: "{a} <br/>{b} - {c}"
	        	}, 
	        	series : [{ 
		        	name:'机器嫁动数', 
		        	type:'gauge', 
		        	detail : {formatter:'{value}'}, //仪表盘显示数据
		        	min:0,
		            max:10,
			        axisLine: { //仪表盘轴线样式 
			        	lineStyle: {
			        		color:[[0.2, '#c23531'], [0.8, '#63869e'], [1, '#91c7ae']],
			        		width: 20 
			        	} 
			        }, 
			        splitLine: { //分割线样式 
			        	length: 20 
			        }, 
			        data:[{value: dataMap[0], name: '嫁动数'}] 
	        	}] 
        	};
        	myMechine1.setOption(option1);
        	
        	option2 = {
    			title: {
    				x:"center",
    				y:"bottom",
                    text: '机器OEE', //标题文本内容
                },
	        	tooltip : { 
	        		formatter: "{a} <br/>{b} : {c}%"
	        	}, 
	        	series : [{ 
		        	name:'机器OEE', 
		        	type:'gauge', 
		        	detail : {formatter:'{value}%'}, //仪表盘显示数据 
			        axisLine: { //仪表盘轴线样式 
			        	lineStyle: { 
			        		color:[[0.2, '#c23531'], [0.8, '#63869e'], [1, '#91c7ae']],
			        		width: 20 
			        	} 
			        }, 
			        splitLine: { //分割线样式 
			        	length: 20 
			        }, 
			        data:[{value: dataMap[1], name: 'OEE'}] 
	        	}] 
        	};
        	myMechine2.setOption(option2);
        	
        	option3 = {
    			title: {
    				x:"center",
    				y:"bottom",
                    text: '班组OEE', //标题文本内容
                },
	        	tooltip : { 
	        		formatter: "{a} <br/>{b} : {c}%"
	        	}, 
	        	series : [{ 
		        	name:'班组OEE', 
		        	type:'gauge', 
		        	detail : {formatter:'{value}%'}, //仪表盘显示数据 
			        axisLine: { //仪表盘轴线样式 
			        	lineStyle: { 
			        		color:[[0.2, '#c23531'], [0.8, '#63869e'], [1, '#91c7ae']],
			        		width: 20 
			        	} 
			        }, 
			        splitLine: { //分割线样式 
			        	length: 20 
			        }, 
			        data:[{value: dataMap[2], name: 'OEE'}] 
	        	}] 
        	};
        	myMechine3.setOption(option3);
        	
        	option4 = {
    			title: {
    				x:"center",
    				y:"bottom",
                    text: '产能', //标题文本内容
                },
	        	tooltip : { 
	        		formatter: "{a} <br/>{b} - {c}"
	        	}, 
	        	series : [{ 
		        	name:'产能', 
		        	type:'gauge', 
		        	detail : {formatter:'{value}'}, //仪表盘显示数据
		        	min:0,
		            max:10000,
			        axisLine: { //仪表盘轴线样式 
			        	lineStyle: { 
			        		color:[[0.2, '#c23531'], [0.8, '#63869e'], [1, '#91c7ae']],
			        		width: 20 
			        	} 
			        }, 
			        splitLine: { //分割线样式 
			        	length: 20 
			        }, 
			        data:[{value: dataMap[3], name: '产能'}] 
	        	}] 
        	};
        	myMechine4.setOption(option4);
		},
		initSmtInfo = function(){
			//头数据
			var headData =["8","8","100","0","0","0","0","0","0","0","0"];
			for(var j=0;j<11;j++){
				document.getElementById("smtEquipment"+j).innerHTML=headData[j];
			}
			
			//设备数据
			var dataStopTime = ["1天5小时30分","2天2小时30分","9小时30分","3天1小时5分","55分","2小时43分","无","11小时5分"],
			dataProductTime = ["10天5小时30分","20天2小时30分","19天9小时30分","13天1小时5分","9天55分","16天2小时43分","15天11小时5分","12天11小时5分"],
			dataRepairTime = ["1天5小时30分","2天2小时30分","9小时30分","3天1小时5分","55分","2小时43分","无","11小时5分"],
			dataEquipCheck = ["1天5小时30分","2天2小时30分","9小时30分","3天1小时5分","55分","2小时43分","无","11小时5分"],
			dataProductWorkOrder = ["1天5小时30分","2天2小时30分","9小时30分","3天1小时5分","55分","2小时43分","无","11小时5分"],
			dataWorkOrderNum = ["1天5小时30分","2天2小时30分","9小时30分","3天1小时5分","55分","2小时43分","无","11小时5分"],
			dataGoodProductNum = ["1天5小时30分","2天2小时30分","9小时30分","3天1小时5分","55分","2小时43分","无","11小时5分"],
			dataEquipStatus = ["1天5小时30分","2天2小时30分","9小时30分","3天1小时5分","55分","2小时43分","无","11小时5分"],
			dataStopReason = ["1天5小时30分","2天2小时30分","9小时30分","3天1小时5分","55分","2小时43分","无","11小时5分"],
			dataExceptionTime = ["1天5小时30分","2天2小时30分","9小时30分","3天1小时5分","55分","2小时43分","无","11小时5分"],
			dataStopDateTime = ["1天5小时30分","2天2小时30分","9小时30分","3天1小时5分","55分","2小时43分","无","11小时5分"];
			for(var i=1;i<9;i++){
				document.getElementById("A0"+i+"_stoptime").innerHTML=dataStopTime[i-1];
				document.getElementById("A0"+i+"_producttime").innerHTML=dataProductTime[i-1];
				document.getElementById("A0"+i+"_repairtime").innerHTML=dataRepairTime[i-1];
				document.getElementById("A0"+i+"_equipcheck").innerHTML=dataEquipCheck[i-1];
				document.getElementById("A0"+i+"_productWorkOrder").innerHTML=dataProductWorkOrder[i-1];
				document.getElementById("A0"+i+"_workOrderNum").innerHTML=dataWorkOrderNum[i-1];
				document.getElementById("A0"+i+"_goodProductNum").innerHTML=dataGoodProductNum[i-1];
				document.getElementById("A0"+i+"_equipStatus").innerHTML=dataEquipStatus[i-1];
				document.getElementById("A0"+i+"_stopReason").innerHTML=dataStopReason[i-1];
				document.getElementById("A0"+i+"_exceptionTime").innerHTML=dataExceptionTime[i-1];
				document.getElementById("A0"+i+"_stopDateTime").innerHTML=dataStopDateTime[i-1];
			}
			
			//员工数据
			var dataName = ["大白","小黑","老黄"],
			dataCode = ["bp001_01","bp001_02","bp001_03"],
			dataPhone = ["13051885166","13502010515","13905180041"],
			dataPosition = ["线长","质检员","生产员"];
			for(var n=0;n<3;n++){
				document.getElementById("person"+n+"_name").innerHTML=dataName[n];
				document.getElementById("person"+n+"_code").innerHTML=dataCode[n];
				document.getElementById("person"+n+"_phone").innerHTML=dataPhone[n];
				document.getElementById("person"+n+"_position").innerHTML=headData[n];
			}
		}
	}
	screen.prototype={
	  init: function () {
            $(function () {
			    myMechine1 = echarts.init(document.getElementById('myMechine1')); 
			    myMechine2 = echarts.init(document.getElementById('myMechine2')); 
			    myMechine3 = echarts.init(document.getElementById('myMechine3')); 
			    myMechine4 = echarts.init(document.getElementById('myMechine4')); 
			    initGridData();
			    var timeTicket = setInterval(function () { 
				    option1.series[0].data[0].value = (Math.random() * 100).toFixed(2) - 0; 
				    myMechine1.setOption(option1, true);
				    
				    option2.series[0].data[0].value = (Math.random() * 100).toFixed(2) - 0; 
				    myMechine2.setOption(option2, true); 
				    
				    option3.series[0].data[0].value = (Math.random() * 100).toFixed(2) - 0; 
				    myMechine3.setOption(option3, true); 
				    
				    option4.series[0].data[0].value = (Math.random() * 100).toFixed(2) - 0; 
				    myMechine4.setOption(option4, true); 
			    },2000);
			    clearInterval(timeTicket);
			});						  							
         }
	}
	var screen = new screen();
	screen.init();
})();
