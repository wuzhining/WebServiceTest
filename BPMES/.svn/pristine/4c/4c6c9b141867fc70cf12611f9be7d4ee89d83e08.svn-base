$(function () {
	  /*原料料利率率*/
	var nameArray=[], inputDataArray=[],actUsedQty=[],usedRate=[];
	var colorArray=['#F6BD0F','#AFD8F8','#8BBA00','#FF8E46','#008E8E','#D64646','#8E468E','#0099FF', '#00CC99', '#FFFF33', '#f7a35c', '#8085e9','#f15c80', '#e4d354', '#8085e8', '#8d4653', '#91e8e1'];
	var dataArray=[];
	var ajaxWipParam={
		url:'data/MaterialUsedRate.json',
		data:{
			staticFlag:1
		},
		successCallBack:function(data){
			var materialData=data.RESPONSE["0"].RESPONSE_DATA;
			for(var i=0;i<materialData.length;i++){
				nameArray.push(materialData[i].material_name);
				inputDataArray.push(materialData[i].input_qty);
				actUsedQty.push(materialData[i].act_used_qty);
				usedRate.push(materialData[i].used_rate);
			}
			dataArray.push({name:'原料总量',data:inputDataArray},{name:'产品使用数量',data:actUsedQty},{
	            type: 'spline',
	            name: '原料利用率',
	            data: usedRate,
	            marker: {
	                lineWidth: 2,
	                lineColor: 'yellow',
	                fillColor: 'red'
	            }})
			 var chart = new Highcharts.Chart({
			        chart: {
			            renderTo: 'divMaterialUsedRate',
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
			            text: '原材料利用率'
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
			             categories: nameArray,
			             crosshair: true
			         },
			         yAxis: 
			         {
			        	 title:{
			        		 text:''
			        	 }
			         },
			         series: dataArray
			    });
			   
		}
	}
	iplantAjaxRequest(ajaxWipParam);
	
	/*原材料利用率表格部分*/
	var ajaxProdParam={
		    url:'data/MaterialUsedRate.json',
			data:{
				staticFlag:1
			},
			successCallBack:function(data){
				var myMaterialTemplate = Handlebars.compile($("#material-used-rate").html());
				var strHtml = myMaterialTemplate(data.RESPONSE["0"].RESPONSE_DATA[0]);
			    $('#tabMaterialUsedRate').html(strHtml);
			},
			errorCallBack:function(e){
				var a=e;
			}
	}
	iplantAjaxRequest(ajaxProdParam);
	
	/*计划达成率*/
	var nameArray=[], plantQtyArray=[],finishedQtyArray=[],finishedRate=[];
	var colorArray=['#F6BD0F','#AFD8F8','#8BBA00','#FF8E46','#008E8E','#D64646','#8E468E','#0099FF', '#00CC99', '#FFFF33', '#f7a35c', '#8085e9','#f15c80', '#e4d354', '#8085e8', '#8d4653', '#91e8e1'];
	var dataArray=[];
	var ajaxWipParam={
		url:'data/PlanFinishRate.json',
		data:{
			staticFlag:1
		},
		successCallBack:function(data){
			var planFinishedData=data.RESPONSE["0"].RESPONSE_DATA;
			for(var i=0;i<planFinishedData.length;i++){
				nameArray.push(planFinishedData[i].machine_no);
				plantQtyArray.push(planFinishedData[i].plan_qty);
				finishedQtyArray.push(planFinishedData[i].finished_qty);
				finishedRate.push(planFinishedData[i].finished_rate);
			}
			dataArray.push({name:'计划量',data:plantQtyArray},{name:'完成量',data:finishedQtyArray},{
	            type: 'spline',
	            name: '达成率',
	            data: finishedRate,
	            marker: {
	                lineWidth: 2,
	                lineColor: 'yellow',
	                fillColor: 'red'
	            }})
			 var chart = new Highcharts.Chart({
			        chart: {
			            renderTo: 'divPlanFinishRate',
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
			            text: '计划达成率'
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
			             categories: nameArray,
			             crosshair: true
			         },
			         yAxis: 
			         {
			        	 title:{
			        		 text:''
			        	 }
			         },
			         series: dataArray
			    });
			   
		}
	}
	iplantAjaxRequest(ajaxWipParam);
	
	/*原材料利用率表格部分*/
	var ajaxParam={
		    url:'data/PlanFinishRate.json',
			data:{
				staticFlag:1
			},
			successCallBack:function(data){
				var myTemplate = Handlebars.compile($("#plan-finished-rate").html());
				var strHtml = myTemplate(data.RESPONSE["0"].RESPONSE_DATA[0]);
			    $('#tabPlanFinishRate').html(strHtml);
			},
			errorCallBack:function(e){
				var a=e;
			}
	}
	iplantAjaxRequest(ajaxParam);
	
	 /*缺陷*/
	var nameArray=[], defectQtyArray=[]
	var colorArray=['#F6BD0F','#AFD8F8','#8BBA00','#FF8E46','#008E8E','#D64646','#8E468E','#0099FF', '#00CC99', '#FFFF33', '#f7a35c', '#8085e9','#f15c80', '#e4d354', '#8085e8', '#8d4653', '#91e8e1'];
	var dataArray=[];
	var ajaxWipParam={
		url:'data/Defect.json',
		data:{
			staticFlag:1
		},
		successCallBack:function(data){
			var defectData=data.RESPONSE["0"].RESPONSE_DATA;
			for(var i=0;i<defectData.length;i++){
				nameArray.push(defectData[i].defect_reason);
				dataArray.push({'color':colorArray[i],'y':defectData[i].defect_qty});
			}
			var chart = new Highcharts.Chart({
			        chart: {
			            renderTo: 'divPlanFinishRate',
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
			            text: '计划达成率'
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
			             categories: nameArray,
			             crosshair: true
			         },
			         yAxis: 
			         {
			        	 title:{
			        		 text:''
			        	 }
			         },
			         series: dataArray
			    });
			   
		}
	}
	iplantAjaxRequest(ajaxWipParam);
	
	/*生产异常原因*/
	var abnormalData=[];
	var ajaxParam={
		url:'data/ProdAbnormal.json',
		data:{
			staticFlag:1
		},
		successCallBack:function(data){
			var reqData=data.RESPONSE["0"].RESPONSE_DATA;
			for(var i=0;i<reqData.length;i++){
				if(i==0){
					abnormalData.push({name:reqData[i].abnormal_reason,y:reqData[i].abnormal_rate,sliced:true,selected:true});
				}
				else
				{
					abnormalData.push([reqData[i].abnormal_reason,reqData[i].abnormal_rate]);	
				}
			}
			Highcharts.getOptions().colors = Highcharts.map(Highcharts.getOptions().colors, function (color) {
		        return {
		            radialGradient: { cx: 0.5, cy: 0.3, r: 0.7 },
		            stops: [
		                [0, color],
		                [1, Highcharts.Color(color).brighten(-0.3).get('rgb')] // darken
		            ]
		        };
		    });
		    $('#divProdAbnormal').highcharts({
		        chart: {
		            plotBackgroundColor: null,
		            plotBorderWidth: null,
		            plotShadow: false
		        },
		        credits:{
		         	enabled:false
		        },
		        title: {
		            text: '生产异常'
		        },
		        tooltip: {
		            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
		        },
		        plotOptions: {
		            pie: {
		                allowPointSelect: true,
		                cursor: 'pointer',
		                dataLabels: {
		                    enabled: true,
		                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
		                    style: {
		                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
		                    },
		                    connectorColor: 'silver'
		                }
		            }
		        },
		        series: [{
		            type: 'pie',
		            name: '生产异常',
		            data: abnormalData
		        }]
		    });
		},
		errorCallBack:function(e){
			var a=e;
		}
	}
	iplantAjaxRequest(ajaxParam);
	
	/*停机异常原因*/
	var stopData=[];
	var ajaxParam={
		url:'data/ProdAbnormal.json',
		data:{
			staticFlag:1
		},
		successCallBack:function(data){
			var reqData=data.RESPONSE["0"].RESPONSE_DATA;
			for(var i=0;i<reqData.length;i++){
				if(i==0){
					stopData.push({name:reqData[i].abnormal_reason,y:reqData[i].abnormal_rate,sliced:true,selected:true});
				}
				else
				{
					stopData.push([reqData[i].abnormal_reason,reqData[i].abnormal_rate]);	
				}
			}
			Highcharts.getOptions().colors = Highcharts.map(Highcharts.getOptions().colors, function (color) {
		        return {
		            radialGradient: { cx: 0.5, cy: 0.3, r: 0.7 },
		            stops: [
		                [0, color],
		                [1, Highcharts.Color(color).brighten(-0.3).get('rgb')] // darken
		            ]
		        };
		    });
		    $('#divStopAbnormal').highcharts({
		        chart: {
		            plotBackgroundColor: null,
		            plotBorderWidth: null,
		            plotShadow: false
		        },
		        credits:{
		         	enabled:false
		        },
		        title: {
		            text: '停机异常'
		        },
		        tooltip: {
		            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
		        },
		        plotOptions: {
		            pie: {
		                allowPointSelect: true,
		                cursor: 'pointer',
		                dataLabels: {
		                    enabled: true,
		                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
		                    style: {
		                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
		                    },
		                    connectorColor: 'silver'
		                }
		            }
		        },
		        series: [{
		            type: 'pie',
		            name: '停机异常',
		            data: stopData
		        }]
		    });
		},
		errorCallBack:function(e){
			var a=e;
		}
	}
	iplantAjaxRequest(ajaxParam);
	
	
	
});


