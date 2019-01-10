
(function () {
    function DayReportImpro() {
    	initGridData=function(){
    		var dgrid=$('#dg').datagrid('options');
    		if(!dgrid) return;
       	    var reqData = {
                    IFS: 'H000025',
                    pageIndex:1,
            		pageSize:dgrid.pageSize
            }
       	 reqGridData('/iPlant_ajax','dg', reqData);
       },			
		bindGridData = function(reqData,jsonData){
			var grid={
				name:'dg',
				dataType: 'json', 
				columns: [[
				           { field: 'MO_CD', title: '工单号', align:'center'},
			               { field: 'CUS_NM', title: '客户名称',align:'center'},
			               { field: 'DO_NUM', title: '计划生产数',align:'center'},
			               { field: 'DR_NUM', title: '实际生产数',align:'center'},
			               { field: 'DR_BN', title: '良品数',align:'center'},
			               { field: 'DR_GQ', title: '次品数', align:'center'},
			               { field: 'FINISHRATE', title: '达成率',align:'center'},
			               { field: 'DR_DM', title: '停机时间',align:'center'}
			              ]],
			    onLoadSuccess: function(jsonData) {
			    	var tableWidth = $('.datagrid-btable').width();
						var width = document.documentElement.clientWidth;
						if(tableWidth<width){
							$('.datagrid-view2 .datagrid-htable').css('background','gainsboro').width(width);
							$('.datagrid-view2 .datagrid-btable').width(width);
							/*$('.datagrid-htable').css("text-align", "center")*/
						}else{
						/*datagrid头部 table 的第一个tr 的td们，即columns的集合*/
						var headerTds = $(".datagrid-header-inner table tr:first-child").children();
						/*datagrid主体 table 的第一个tr 的td们，即第一个数据行*/
						var bodyTds = $(".datagrid-body table tr:first-child").children();
						var totalWidth = 0; /*合计宽度，用来为datagrid头部和主体设置宽度*/
						/*循环设置宽度*/
						bodyTds.each(function(i, obj) {
							var headerTd = $(headerTds.get(i));
							var bodyTd = $(bodyTds.get(i));
							$("div:first-child", headerTds.get(i)).css("text-align", "center");
							var headerTdWidth = headerTd.width(); //获取第i个头部td的宽度
							/*这里加5个像素 是因为数据主体我们取的是第一行数据，不能确保第一行数据宽度最宽，预留5个像素。有兴趣的朋友可以先判断最大的td宽度都在进行设置*/
							var bodyTdWidth = bodyTd.width() + 5;
							var width = 0;
							/*如果头部列名宽度比主体数据宽度宽，则它们的宽度都设为头部的宽度。反之亦然*/
							if(headerTdWidth > bodyTdWidth) {
								width = headerTdWidth;
								bodyTd.width(width);
								headerTd.width(width);
								totalWidth += width;
							} else {
								width = bodyTdWidth;
								headerTd.width(width);
								bodyTd.width(width);
								totalWidth += width;
							}
						});
						var headerTable = $(".datagrid-header-inner table:first-child");
						var bodyTable = $(".datagrid-body table:first-child");
						/*循环完毕即能得到总得宽度设置到头部table和数据主体table中*/
						headerTable.width(totalWidth);
						bodyTable.width(totalWidth);
						bodyTds.each(function(i, obj) {
							var headerTd = $(headerTds.get(i));
							var bodyTd = $(bodyTds.get(i));
							var headerTdWidth = headerTd.width();
							bodyTd.width(headerTdWidth);
						});
					}
						}
			}
			initGridView(reqData,grid);
			$('#dg').datagrid('loadData',jsonData);
		},
		/*查询*/
		getDataByCondition = function (){
			var imgCD = $.cookie('imgCD');
			var imgNM = $.cookie('imgNM');
			var imgdt = $.cookie('imgDT');
			if(imgNM == null){
				imgNM == '';
			}
			var userMesCode = $('#proCD').textbox('setValue',imgCD);
			var userMesNum = $('#proNM').textbox('setValue',imgNM);
			var userMesDate = $('#proDT').datebox('setValue',imgdt);
			var reqData ={
				PT_CD: imgCD,
				DR_DT:imgdt,
				IFS:'H000025'
			}
			if(userMesCode==''&&userMesNum==''&&userMesDate==''){
				$.messager.alert('提示','请输入选择条件');
			}else{
				reqGridData('/iPlant_ajax','dg',reqData)	
			}
		},
		
		/*屏幕自适应*/
		screenCondation =function(){
			var evt = "onorientationchange" in window ? "orientationchange" : "resize";
			
		    window.addEventListener(evt, function() {
		    
		        var width = document.documentElement.clientWidth;
		        var height =  document.documentElement.clientHeight;
		        $print =  $('#print');
		         if( width >= height ){
		            $print.width(width);
		            $print.height(height);
		            $print.css('top',  0 );
		            $print.css('left',  0 );
		            $print.css('transform' , 'none');
		            $print.css('transform-origin' , '50% 50%');
		         }
		         else{
		            $print.width(height);
		            $print.height(width);
		            $print.css('top',  (height-width)/2 );
		            $print.css('left',  0-(height-width)/2 );
		            $print.css('transform' , 'rotate(90deg)');
		            $print.css('transform-origin' , '50% 50%');
		         }
		
		    },false);	
		}
    }
	DayReportImpro.prototype={
		init: function () {
				$(function () {
						slideScreen();
						getDataByCondition();
/*						initGridData();*/
						screenCondation();
				});
		}
	}
    
	var DayReportImpo = new DayReportImpro();
	DayReportImpo.init();
})();
   
	
	
	
	
	
	
	
	
	
	
	
