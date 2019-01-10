$(function () {
	var dtime  = getBCtime();
	var lx = getQueryString("line");
	var sbbm = getQueryString("shebei");
	var cctm  = {A:'08:00-10:00', B:'10:00-12:00', C:'12:00-14:00', D:'14:00-16:00', E:'16:00-18:00', F:'18:00-20:00', G:'20:00-22:00', H:'22:00-24:00'};
    
	/*产能完成情况*/
	var timeCategory=[];
	var prodCnt=[],finishedCnt=[],targetCnt=[];
	var ajaxFinishParam={
			url: '/iPlant_ajax',
			data:{
				   IFS: 'MES_R0007',
	               REQ_TIME:dtime,
	               LINE_CD:lx,
	               ET_CD:sbbm,
	               SHIFT_CD:'A'
			},
			successCallBack:function(data){
				if(data.RESPONSE.length != 0){
				var prodData=data.RESPONSE["0"].RESPONSE_DATA;
				for(var i=0;i<prodData.length;i++){
					timeCategory.push(cctm[prodData[i].TM]);
					prodCnt.push(parseInt(prodData[i].WC_QTY1));
					finishedCnt.push(parseInt(prodData[i].WC_QTY2));
					targetCnt.push(parseInt(prodData[i].WC_QTY1));
				}
				}
				var seriesData= [{name: '<span style="font-size:6px;">完成数<span>',data: finishedCnt},{
		            type: 'spline',
		            name: '<span style="font-size:6px;">目标数<span>',
		            data: targetCnt,
		            marker: {
		                lineWidth: 2,
		                lineColor: 'yellow',
		                fillColor: 'red'
		            }},{
					    type: 'spline',
					    name: '<span style="font-size:6px;">完成数量<span>',
					    data: prodCnt,
					    marker: {
					        lineWidth: 2,
					        lineColor: 'red',
					        fillColor: 'red'
				}}];
				$('#divProdFinished').highcharts({
			    	 chart: {
			             type: 'column'
			         },
			         credits:{
			         	enabled:false
			         },
			         title: {
			             text: ''
			         },
			         colors: ['#0099FF', '#00CC99', '#FFFF33', '#f7a35c', '#8085e9','#f15c80', '#e4d354', '#8085e8', '#8d4653', '#91e8e1'], 
			         xAxis: 
			         {
		                labels: {
		                        style: {
		                            color: '#19a0f5',//颜色
		                            fontSize:'4px'  //字体
		                        }
		                 },
			             categories: timeCategory,
			             crosshair: true
			         },
			         yAxis: 
			         {
			        	 labels: {
		                        style: {
		                            color: '#19a0f5',//颜色
		                            fontSize:'4px'  //字体
		                        }
		                 },
			             min: 0,
			             title: {
			                 text: ''
			             }
			         },
			         tooltip: {
			             headerFormat: '<span style="font-size:6px">{point.key}</span><table>',
			             pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
			             '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
			             footerFormat: '</table>',
			             shared: true,
			             useHTML: true
			         },
			         plotOptions: {
			             column: {
			                 pointPadding: 0.2,
			                 borderWidth: 0
			             }
			         },
			         series: seriesData,
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
});


