$(function () {
	
	var headerData={
			total_machine_cnt:10,
			green_cnt:1,             //	#008000  
			green_rate:10,
			abnormal_cnt:2,          //	#DAA520
			abnormal_rate:20,
			red_cnt:3,                //#FF0000
			red_rate:30,
			blue_cnt:2,              //	#00BFFF
			blue_rate:20, 
			plan_stop_cnt:2,         //#FF00FF
			plan_stop_rate:20
		    	
	}

	var headerTemplate = Handlebars.compile($("#tpl-header").html());
	var strHeaderHtml = headerTemplate(headerData);
    $('#divHeader').html(headerTemplate(headerData));
	/*机器监视部分*/
	var data = {
	           "machine": [
	                        {
	                        	machine_no:'A01',
	                        		image_name:'image/AOI_6.jpg',
	                        		machine_name:'贴标机',
	                        		bg_color:'#FF0000',    //red
	                        		stop_total_hours:'1天5小时30分',
	                        		prod_hours:'10天5小时30分',
	                        		repairtime_hours:'1天5小时30分',
	                        		equipcheck_hours:'1天5小时30分',
	                        		workorder_no:'M110136985',
	                        		workorder_num:'2天2小时30分',
	                        		good_qty:'1000',
	                        		equip_status:'停机',
	                        		stop_reason:'待人停机',
	                        		exception_time:'2天2小时30分',
	                        		stop_hours:'2天2小时30分'
	                        },
	                        {
	                        	machine_no:'A02',
	                        		machine_name:'印刷机',
	                        		bg_color:'#008000',                 //Green
	                        		image_name:'image/AOI_6.jpg',
	                        		stop_total_hours:'2天2小时30分',
	                        		prod_hours:'20天2小时30分',
	                        		repairtime_hours:'2天2小时30分',
	                        		equipcheck_hours:'2天2小时30分',
	                        		workorder_no:'2天2小时30分',
	                        		workorder_num:'2天2小时30分',
	                        		good_qty:'2500',
	                        		equip_status:'正常生产',
	                        		stop_reason:'',
	                        		exception_time:'2天2小时30分',
	                        		stop_hours:'2天2小时30分'
	                        },
	                        {
	                        	machine_no:'A03',
	                        		machine_name:'印刷机',
	                        		bg_color:'	#DAA520',                 //异常
	                        		image_name:'image/cjj_8.jpg',
	                        		stop_total_hours:'2天2小时30分',
	                        		prod_hours:'20天2小时30分',
	                        		repairtime_hours:'2天2小时30分',
	                        		equipcheck_hours:'2天2小时30分',
	                        		workorder_no:'2天2小时30分',
	                        		workorder_num:'2天2小时30分',
	                        		good_qty:'2500',
	                        		equip_status:'异常生产',
	                        		stop_reason:'超重生产',
	                        		exception_time:'2天2小时30分',
	                        		stop_hours:'2天2小时30分'
	                        },
	                        {
	                        	machine_no:'A04',
	                        		machine_name:'印刷机',
	                        		bg_color:'#FF0000',  //red
	                        		image_name:'image/fbj_7.jpg',
	                        		stop_total_hours:'2天2小时30分',
	                        		prod_hours:'20天2小时30分',
	                        		repairtime_hours:'2天2小时30分',
	                        		equipcheck_hours:'2天2小时30分',
	                        		workorder_no:'2天2小时30分',
	                        		workorder_num:'2天2小时30分',
	                        		good_qty:'2500',
	                        		equip_status:'停机',
	                        		stop_reason:'待人',
	                        		exception_time:'2天2小时30分',
	                        		stop_hours:'2天2小时30分'
	                        },
	                        {
	                        	machine_no:'A05',
	                        		machine_name:'印刷机',
	                        		bg_color:'#00BFFF',   //未派工在生产
	                        		image_name:'image/hll_5.jpg',
	                        		stop_total_hours:'2天2小时30分',
	                        		prod_hours:'20天2小时30分',
	                        		repairtime_hours:'2天2小时30分',
	                        		equipcheck_hours:'2天2小时30分',
	                        		workorder_no:'2天2小时30分',
	                        		workorder_num:'2天2小时30分',
	                        		good_qty:'2500',
	                        		equip_status:'未派工生产',
	                        		stop_reason:'',
	                        		exception_time:'2天2小时30分',
	                        		stop_hours:'2天2小时30分'
	                        }
	                        /*,
	                        {
	                        	machine_no:'A06',
	                        		machine_name:'印刷机',
	                        		bg_color:'#DAA520',          //异常
	                        		image_name:'image/tpj_4.jpg',
	                        		stop_total_hours:'2天2小时30分',
	                        		prod_hours:'20天2小时30分',
	                        		repairtime_hours:'2天2小时30分',
	                        		equipcheck_hours:'2天2小时30分',
	                        		workorder_no:'2天2小时30分',
	                        		workorder_num:'2天2小时30分',
	                        		good_qty:'2500',
	                        		equip_status:'异常生产',
	                        		stop_reason:'',
	                        		exception_time:'2天2小时30分',
	                        		stop_hours:'2天2小时30分'
	                        },
	                        {
	                        	machine_no:'A07',
	                        		machine_name:'印刷机',
	                        		bg_color:'#FF0000',   //red
	                        		image_name:'image/spi.jpg',
	                        		stop_total_hours:'2天2小时30分',
	                        		prod_hours:'20天2小时30分',
	                        		repairtime_hours:'2天2小时30分',
	                        		equipcheck_hours:'2天2小时30分',
	                        		workorder_no:'2天2小时30分',
	                        		workorder_num:'2天2小时30分',
	                        		good_qty:'2500',
	                        		equip_status:'停机',
	                        		stop_reason:'',
	                        		exception_time:'2天2小时30分',
	                        		stop_hours:'2天2小时30分'
	                        },
	                        {
	                        	machine_no:'A08',
	                        		machine_name:'印刷机',
	                        		bg_color:'#00BFFF',   //未派工在生产
	                        		image_name:'image/SPI_3.jpg',
	                        		stop_total_hours:'2天2小时30分',
	                        		prod_hours:'20天2小时30分',
	                        		repairtime_hours:'2天2小时30分',
	                        		equipcheck_hours:'2天2小时30分',
	                        		workorder_no:'2天2小时30分',
	                        		workorder_num:'2天2小时30分',
	                        		good_qty:'2500',
	                        		equip_status:'未派工在生产',
	                        		stop_reason:'2天2小时30分',
	                        		exception_time:'2天2小时30分',
	                        		stop_hours:'2天2小时30分'
	                        },
	                        {
	                        	machine_no:'A09',
	                        		machine_name:'印刷机',
	                        		bg_color:'#FF00FF',    //计划停机
	                        		image_name:'image/tbj_1.jpg',
	                        		stop_total_hours:'2天2小时30分',
	                        		prod_hours:'20天2小时30分',
	                        		repairtime_hours:'2天2小时30分',
	                        		equipcheck_hours:'2天2小时30分',
	                        		workorder_no:'2天2小时30分',
	                        		workorder_num:'2天2小时30分',
	                        		good_qty:'2500',
	                        		equip_status:'计划停机',
	                        		stop_reason:'',
	                        		exception_time:'2天2小时30分',
	                        		stop_hours:'2天2小时30分'
	                        },
	                        {
	                        	machine_no:'A10',
	                        		machine_name:'印刷机',
	                        		bg_color:'#FF00FF',   //计划停机
	                        		image_name:'image/tpj_4.jpg',
	                        		stop_total_hours:'2天2小时30分',
	                        		prod_hours:'20天2小时30分',
	                        		repairtime_hours:'2天2小时30分',
	                        		equipcheck_hours:'2天2小时30分',
	                        		workorder_no:'2天2小时30分',
	                        		workorder_num:'2天2小时30分',
	                        		good_qty:'2500',
	                        		equip_status:'计划停机',
	                        		stop_reason:'',
	                        		exception_time:'2天2小时30分',
	                        		stop_hours:'2天2小时30分'
	                        }*/
	                       
	                    ]
	                };
	        
	var myTemplate = Handlebars.compile($("#tpl-list").html());
	var strHtml = myTemplate(data);
    $('#divTableList').html(myTemplate(data));
    
    var empdata = {
	    "emp": [{
	        	 emp_name:'王涛',
	        	 emp_no:'32135464522',
	        	 emp_tel:'18880222529',
	        	 emp_image:'image/emp1.jpg'
	         },
	         {
	        	 emp_name:'赵小三',
	        	 emp_no:'56467875451',
	        	 emp_tel:'5152151',
	        	 emp_image:'image/emp2.jpg'
	         },
	         {
	        	 emp_name:'刘智智',
	        	 emp_no:'F1053230',
	        	 emp_tel:'18820222524',
	        	 emp_image:'image/emp3.jpg'
	         },
	         {
	        	 emp_name:'刘智智',
	        	 emp_no:'F1053230',
	        	 emp_tel:'18820222524',
	        	 emp_image:'image/emp4.png'
	         }
	         
	     ]
    }
	var empTemplate = Handlebars.compile($("#emp-list").html());
	var strEmpHtml = empTemplate(empdata);
    $('#divEmpList').html(empTemplate(empdata));
    
	
    /*机器稼动率*/
    $('#machineRate').highcharts({
        chart: {
            type: 'gauge',
            plotBackgroundColor: null,
            plotBackgroundImage: null,
            plotBorderWidth: 0,
            plotShadow: false
        },
        credits:{
        	enabled:false
        },
        title: {
            text: '机器稼动率',
            y:180,
            style:{
            	"color": "#333333", 
            	"fontSize": "16px" ,
            	"font-weight":"900"
            }
        },
        pane: {
            startAngle: -150,
            endAngle: 150,
            center:["50%","20%"],
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
            }, 
            {
                backgroundColor: '#DDD',
                borderWidth: 0,
                outerRadius: '105%',
                innerRadius: '103%'
            }]
        },
        yAxis: {
            min: 0,
            max: 100,
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
                text: ''
            },
            plotBands: [{
                from: 0,
                to: 30,
                color: '#DF5353' // red 
            }, {
                from: 30,
                to: 70,
                color: '#DDDF0D' // yellow
            }, {
                from: 70,
                to: 100,
                color: '#55BF3B' // green
            }]
        },
        series: [{
            name: 'OEE',
            data: [80],
            tooltip: {
                valueSuffix: ''
            }
        }]
    },
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
    $('#machineOEE').highcharts({
        chart: {
            type: 'gauge',
            plotBackgroundColor: null,
            plotBackgroundImage: null,
            plotBorderWidth: 0,
            plotShadow: false
        },
        credits:{
        	enabled:false
        },
        title: {
            text: '机器OEE',
            y:180,
            style:{
            	"color": "#333333", 
            	"fontSize": "16px" ,
            	"font-weight":"900"
            }
        },
        pane: {
            startAngle: -150,
            endAngle: 150,
            center:["50%","20%"],
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
            }, 
            {
            	
            }, 
            {
                backgroundColor: '#DDD',
                borderWidth: 0,
                outerRadius: '105%',
                innerRadius: '103%'
            }]
        },
        yAxis: {
            min: 0,
            max: 100,
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
                text: ''
            },
            plotBands: [{
                from: 0,
                to: 30,
                color: '#DF5353' // red 
            }, {
                from: 30,
                to: 70,
                color: '#DDDF0D' // yellow
            }, {
                from: 70,
                to: 100,
                color: '#55BF3B' // green
            }]
        },
        series: [{
            name: 'OEE',
            data: [80],
            tooltip: {
                valueSuffix: ''
            }
        }]
    },
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
    $('#groupOEE').highcharts({
        chart: {
            type: 'gauge',
            plotBackgroundColor: null,
            plotBackgroundImage: null,
            plotBorderWidth: 0,
            plotShadow: false
        },
        credits:{
        	enabled:false
        },
        title: {
            text: '班组OEE',
            y:180,
            style:{
            	"color": "#333333", 
            	"fontSize": "16px" ,
            	"font-weight":"900"
            }
        },
        pane: {
            startAngle: -150,
            endAngle: 150,
            center:["50%","20%"],
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
            }, 
            {
            	
            }, 
            {
                backgroundColor: '#DDD',
                borderWidth: 0,
                outerRadius: '105%',
                innerRadius: '103%'
            }]
        },
        yAxis: {
            min: 0,
            max: 100,
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
                text: ''
            },
            plotBands: [{
                from: 0,
                to: 30,
                color: '#DF5353' // red 
            }, {
                from: 30,
                to: 70,
                color: '#DDDF0D' // yellow
            }, {
                from: 70,
                to: 100,
                color: '#55BF3B' // green
            }]
        },
        series: [{
            name: 'OEE',
            data: [80],
            tooltip: {
                valueSuffix: ''
            }
        }]
    },
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
    $('#capacity').highcharts({
        chart: {
            type: 'gauge',
            plotBackgroundColor: null,
            plotBackgroundImage: null,
            plotBorderWidth: 0,
            plotShadow: false
        },
        credits:{
        	enabled:false
        },
        title: {
            text: '产能',
            y:180,
            style:{
            	"color": "#333333", 
            	"fontSize": "16px" ,
            	"font-weight":"900"
            }
            
            	
        },
        pane: 
        {
            startAngle: -150,
            endAngle: 150,
            center:["50%","20%"],
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
            }, 
            {
                backgroundColor: 
                {
                    linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                    stops: [
                        [0, '#333'],
                        [1, '#FFF']
                    ]
                },
                borderWidth: 1,
                outerRadius: '107%'
            }, 
            {
            	
            }, 
            {
                backgroundColor: '#DDD',
                borderWidth: 0,
                outerRadius: '105%',
                innerRadius: '103%'
            }]
        },
        yAxis: {
            min: 0,
            max: 100,
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
                text: ''
            },
            plotBands: [{
                from: 0,
                to: 30,
                color: '#DF5353' // red 
            }, {
                from: 30,
                to: 70,
                color: '#DDDF0D' // yellow
            }, 
            {
                from: 70,
                to: 100,
                color: '#55BF3B' // green
            }]
        },
        series: [{
            name: 'Speed',
            data: [80],
            tooltip: {
                valueSuffix: ''
            }
        }]
    },
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


