$(function () {
	var dtime  = getBCtime();
	var lx = getQueryString("line");
	var sbbm = getQueryString("shebei");
	 
	$('#cccd').datagrid({       
		name:'edit_tab',
		dataType: 'json', 
		columns: [[
		{ field: 'LINE_CD',  title: '产线',width: document.body.clientWidth*0.1, align:'center'},
		{ field: 'WC_CD',  title: '车间', width: document.body.clientWidth*0.1,align:'center'},
		{ field: 'MO_NO',  title: '工单', width: document.body.clientWidth*0.1,align:'center'},
		{ field: 'ITEM_CD',  title: '物料编码',width: document.body.clientWidth*0.1, align:'center'},
		{ field: 'ITEM_NM',  title: '物料名称', width: document.body.clientWidth*0.1,align:'center'},
		{ field: 'PLAN_WO_QTY',  title: '排程数量', width: document.body.clientWidth*0.1,align:'center'},
		{ field: 'PROD_QTY',  title: '已完工数量',width: document.body.clientWidth*0.09, align:'center'},
//		{ field: 'bad_cnt',  title: '次品数量', width: document.body.clientWidth*0.1,align:'center'},
		{ field: 'PLAN_STRT_DT',  title: '计划开始时间', width: document.body.clientWidth*0.1,align:'center'},
		{ field: 'PLAN_END_DT',  title: '计划结束时间',width: document.body.clientWidth*0.1, align:'center'},
		{ field: 'WO_STATE_NM',  title: '工单状态', width: document.body.clientWidth*0.1,align:'center'}
    ]]   
	});
	
	
	/*工单部分*/
	var ajaxWoParam={
	    url:'/iPlant_ajax',
		data:{
			IFS: 'MES_R0073',
	        LINE_CD:lx
		},
		successCallBack:function(data){
			if(data.RESPONSE.length !=0){
			if(data.RESPONSE["0"].RESPONSE_DATA.length>0){
				$('#cccd').datagrid('loadData',{total:data.RESPONSE["0"].RESPONSE_DATA.length,rows:data.RESPONSE["0"].RESPONSE_DATA});
			}else{
				$('#cccd').datagrid('loadData',{total:0,rows:[]});
			}
			}
		},
		errorCallBack:function(e){
			var a=e;
		}
	}        
	iplantAjaxRequest(ajaxWoParam);
    
    /*工单完成情况*/
	var woCategory=[];
	var createCnt=[],dispatchCnt=[],finishedCnt=[];
	var ajaxFinishParam={
			url: '/iPlant_ajax',
		    data: {
		        IFS: 'MES_R0071',
		        LINE_CD:lx
		    },
			successCallBack:function(data){
				if(data.RESPONSE.length != 0){
				var woData=data.RESPONSE["0"].RESPONSE_DATA;
				for(var i=0;i<woData.length;i++){
					woCategory.push(woData[i].MO_NO);
					createCnt.push(parseInt(woData[i].PLAN_PO_QTY));
					dispatchCnt.push(parseInt(woData[i].PAI_QTY));
					finishedCnt.push(parseInt(woData[i].TOTAL_QTY));
				}
				}	
				var seriesData= [{name: '<span style="font-size:4px;">构建数量<span>',data: createCnt},{name: '<span style="font-size:4px;">下达数量<span>',data: dispatchCnt},{name: '<span style="font-size:4px;">完成数量<span>',data:finishedCnt}];
				$('#workOrderFinished').highcharts({
			    	 chart: {
			             type: 'column'
			         },
			         credits:{
			         	enabled:false
			         },
			         title: {
			             text: '<span style="color:#1771B3;font-weight: bold;font-size:6px;">工单完成情况</span>'
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
			             categories: woCategory,
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
			             headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
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
	
	/*前五不良原因*/
	var badReasonData=[];
	var ajaxTop5BadReasonParam={
			url: '/iPlant_ajax',
		    data: {
		        IFS: 'MES_R0075',
		        REQ_TIME:dtime,
		        LINE_CD:lx
		    },
		successCallBack:function(data){
			if(data.RESPONSE.length != 0){
			var woData=data.RESPONSE["0"].RESPONSE_DATA;
			for(var i=0;i<woData.length;i++){
				if(i==1){
					badReasonData.push({name:woData[i].QC_DFCT_NM,y:parseInt(woData[i].DFCT_QTY),sliced:true,selected:true});
				}
				else
				{
					badReasonData.push([woData[i].QC_DFCT_NM,parseInt(woData[i].DFCT_QTY)]);	
				}
			}
			}
			Highcharts.chart('top5BadReason', {
				chart: {
		            type: 'pie',
		            options3d: {
		                enabled: true,
		                alpha: 60,
		                beta: 0
		            }
		        },
		        title: {
		            text: '<span style="color:#1771B3;font-weight: bold;font-size:6px;">前五不良原因</span>'
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
		                    distance:1,
		                    format: '{point.name}',
		                    style: {     fontSize:'4px',    color :'#19a0f5'  } 
		                }
		            }
		        },
		        series: //badReasonData
		        	[{
		            type: 'pie',
		            name: '<span style="font-size:6px;">原因占比<span>',
		            data: badReasonData
//		            	[
//		                ['<span style="color:#1771B3">机器坏 ,41.0%</span>',   41.0],						                
//		                {
//		                    name: '<span style="color:#1771B3">换线,31.0%</span>',
//		                    y: 31.0,
//		                    sliced: true,
//		                    selected: true
//		                },
//		                ['<span style="color:#1771B3">来料异常,10.0%</span>',    10.0],
//		                ['<span style="color:#1771B3">软件问题,8.0%</span>',     8.0],
//		                ['<span style="color:#1771B3">视觉不良,10.0%</span>',   10.0]
//		            ]
		        }]
		        ,
		        credits: {
			          enabled:false
			},exporting: {
		        enabled:false
			}
			});
//			Highcharts.getOptions().colors = Highcharts.map(Highcharts.getOptions().colors, function (color) {
//		        return {
//		            radialGradient: { cx: 0.5, cy: 0.3, r: 0.7 },
//		            stops: [
//		                [0, color],
//		                [1, Highcharts.Color(color).brighten(-0.3).get('rgb')] // darken
//		            ]
//		        };
//		    });
//		    $('#top5BadReason').highcharts({
//		        chart: {
//		            plotBackgroundColor: null,
//		            plotBorderWidth: null,
//		            plotShadow: false
//		        },
//		        credits:{
//		         	enabled:false
//		        },
//		        title: {
//		            text: '<span style="color:#1771B3;font-weight: bold;font-size:12px;">前五不良原因</span>'
//		        },
//		        tooltip: {
//		            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
//		        },
//		        plotOptions: {
//		            pie: {
//		                allowPointSelect: true,
//		                cursor: 'pointer',
//		                dataLabels: {
//		                    enabled: true,
//		                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
//		                    style: {
//		                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
//		                    },
//		                    connectorColor: 'silver'
//		                }
//		            }
//		        },
//		        series: [{
//		            type: 'pie',
//		            name: '不良原因占比',
//		            data: badReasonData
//		        }],
//   			    credits: {
// 			          enabled:false
// 			},exporting: {
// 	            enabled:false
// 			}
//		    });
			
		},
		errorCallBack:function(e){
			var a=e;
		}
	}
	iplantAjaxRequest(ajaxTop5BadReasonParam);
    
    
    /*Wip状态*/
	var nameArray=[], dataArray=[];
	var colorArray=['#F6BD0F','#AFD8F8','#8BBA00','#FF8E46','#008E8E','#D64646','#8E468E','#0099FF', '#00CC99', '#FFFF33', '#f7a35c', '#8085e9','#f15c80', '#e4d354', '#8085e8', '#8d4653', '#91e8e1'];
	var ajaxWipParam={
			url: '/iPlant_ajax',
		    data: {
		        IFS: 'MES_R0070',
		        CURR_DATE:dtime,
		        SHIFT_CD:'A',
		        LINE_CD:lx
		    },
		successCallBack:function(data){
			if(data.RESPONSE.length != 0){
			var wipData=data.RESPONSE["0"].RESPONSE_DATA;
			for(var i=0;i<wipData.length;i++){
				nameArray.push(wipData[i].ROUT_NM);
				dataArray.push({'color':colorArray[i],'y':parseInt(wipData[i].QTY)});
			}
			} 
			 var chart = new Highcharts.Chart({
			        chart: {
			            renderTo: 'wipStatus',
			            type: 'column',
			            options3d: {
			                enabled: true,
			                alpha: 10,
			                beta: 10,
			                depth: 50,
			                viewDistance: 25
			            }
			        },
			        credits:{
			         	enabled:false
			        },
			        title: {
			            text: '<span style="color:#1771B3;font-weight: bold;font-size:6px;">WIP状态</span>'
			        },
			        plotOptions: {
			            column: {
			                depth: 25
			            }
			        },
			        legend: {
						enabled: false
					},
			        xAxis: 
			         {
			        	labels: {
	                        y: 20, //x轴刻度往下移动20px
	                        style: {
	                            color: '#19a0f5',//颜色
	                            fontSize:'4px'  //字体
	                        }
			        	},
			             categories: nameArray,
			             crosshair: true
			         },
			         yAxis: 
			         {
			        	 title:{
			        		 text:''
			        	 }
			         },
			         series: [{name:'<span style="font-size:4px;">wip<span>',data:dataArray}],
	       			    credits: {
	       			          enabled:false
	       			},exporting: {
	       	            enabled:false
	       			}
			    });
			
		}
	}
	iplantAjaxRequest(ajaxWipParam);
});


