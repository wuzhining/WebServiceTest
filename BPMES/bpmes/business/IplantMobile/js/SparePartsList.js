(function() {
	function DayReportImpro() {
		initGridData = function() {
			var dgrid = $('#dg').datagrid('options');
//			var pageSize = 6;
			if(!dgrid) return;
			var reqData = {
				IFS: 'H000043',
				pageIndex: 1,
				pageSize: dgrid.pageSize
			}
			reqGridData('/iPlant_ajax', 'dg', reqData);
		}
		bindGridData = function(reqData, jsonData,pageSize) {
			$('#dg').datagrid({
//				name: 'dg',
				dataType: 'json',
				pagination:true,
		        pageSize:pageSize,
           		pageList:[ 6, 10, 20, 30, 40],
				autoRowHeight: false,
				columns: [
					[{
						field: 'SP_CD',
						title: '备件编号',
						align: 'center'
					}, {
						field: 'SP_NM',
						title: '备件名称',
						align: 'center'
					}, {
						field: 'RT_NUM',
						title: '库存数量',
						align: 'center'
					}, {
						field: 'RH_NM',
						title: '库存储位',
						align: 'center'
					}, {
						field: 'L_RI_QT',
						title: '领用数量',
						align: 'center'
					}, {
						field: 'B_RI_QT',
						title: '报损数量',
						align: 'center'
					}]
				],
				onBeforeLoad:function(jsonData){
//					alert('ss');
					$("#dg").datagrid("loading"); 
				},
				onLoadSuccess: function(jsonData) {
					var tableWidth = $('.datagrid-btable').width();
					var width = document.documentElement.clientWidth;
					if(tableWidth<width){
						$('.datagrid-view2 .datagrid-htable').css('background','gainsboro').width(width);
						$('.datagrid-view2 .datagrid-btable').width(width);
//						$('.datagrid-htable').css("text-align", "center")
					}else{
					//datagrid头部 table 的第一个tr 的td们，即columns的集合
					var headerTds = $(".datagrid-header-inner table tr:first-child").children();
					//datagrid主体 table 的第一个tr 的td们，即第一个数据行
					var bodyTds = $(".datagrid-body table tr:first-child").children();
					var totalWidth = 0; //合计宽度，用来为datagrid头部和主体设置宽度
					//循环设置宽度
					bodyTds.each(function(i, obj) {
						var headerTd = $(headerTds.get(i));
						var bodyTd = $(bodyTds.get(i));
						$("div:first-child", headerTds.get(i)).css("text-align", "center");
						var headerTdWidth = headerTd.width(); //获取第i个头部td的宽度
						//这里加5个像素 是因为数据主体我们取的是第一行数据，不能确保第一行数据宽度最宽，预留5个像素。有兴趣的朋友可以先判断最大的td宽度都在进行设置
						var bodyTdWidth = bodyTd.width() + 5;
						var width = 0;
						//如果头部列名宽度比主体数据宽度宽，则它们的宽度都设为头部的宽度。反之亦然
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
					//循环完毕即能得到总得宽度设置到头部table和数据主体table中
					headerTable.width(totalWidth);
					bodyTable.width(totalWidth);
					bodyTds.each(function(i, obj) {
						var headerTd = $(headerTds.get(i));
						var bodyTd = $(bodyTds.get(i));
						var headerTdWidth = headerTd.width();
						bodyTd.width(headerTdWidth);
					});
					}
					$('#dg').datagrid('loaded');
				},
//				loadFilter:function(){
//					$('#dg').datagrid('loading');
//				}
			})
//			initGridView(reqData, grid);
			$('#dg').datagrid({ loadFilter: pagerFilter });
//			setTimeout($("#dg").datagrid("loadData",(function (){ 
//					$("#dg").datagrid("loading"); 
//					return jsonData;
//				})()),1000);

			$("#dg").datagrid("loadData",jsonData);
			

		}
		setData = function(jsonData){
			$('#dg').datagrid('loading');
			$('#dg').datagrid('loadData',jsonData)
		}
		ajaxParam2 = function() {
				var listData = [];
				var listData1 = [];
				var listData2 = [];
				var ajaxParam2 = {
					url: '/iPlant_ajax',
					data: {
						IFS: 'H000043'
					},
					successCallBack: function(data) {
						for(var i = 0; i < data.RESPONSE[0].RESPONSE_DATA.length; i++) {
							listData.push({
								"id": data.RESPONSE[0].RESPONSE_DATA[i].SP_CD,
								"text": data.RESPONSE[0].RESPONSE_DATA[i].SP_NM
							});
						}
						for(var i = 0; i < data.RESPONSE[0].RESPONSE_DATA.length; i++) {
							listData1.push({
								"id1": data.RESPONSE[0].RESPONSE_DATA[i].SP_CD,
								"text1": data.RESPONSE[0].RESPONSE_DATA[i].SP_CD
							});
						}
						for(var i = 0; i < data.RESPONSE[0].RESPONSE_DATA.length; i++) {
							listData2.push({
								"id2": data.RESPONSE[0].RESPONSE_DATA[i].RT_NUM,
								"text2": data.RESPONSE[0].RESPONSE_DATA[i].RH_NM
							});
						}
						var hash = {};
						listData = listData.reduce(function(item, next) {
							hash[next.id] ? '' : hash[next.id] = true && item.push(next);
							return item
						}, [])
						var hash1 = {};
						listData1 = listData1.reduce(function(item, next) {
							hash1[next.id1] ? '' : hash1[next.id1] = true && item.push(next);
							return item
						}, [])
						var hash2 = {};
						listData2 = listData2.reduce(function(item, next) {
							hash2[next.text2] ? '' : hash2[next.text2] = true && item.push(next);
							return item
						}, [])
						$('#spareNM').combobox({

							data: listData,
							valueField: 'id',
							textField: 'text'
						});
						$('#spareCD').combobox({
							panelWidth: 100,
							data: listData1,
							valueField: 'id1',
							textField: 'text1'
						});
						$('#storageNM').combobox({
							panelWidth: 100,
							data: listData2,
							valueField: 'id2',
							textField: 'text2'
						});
					}
				}
				iplantAjaxRequest(ajaxParam2);
			}
			//查询
		getDataByCondition = function() {
			var userMesCode = $('#spareCD').combobox('getText');
			var userMesNum = $('#spareNM').combobox('getText');
			var userMesDate = $('#storageNM').combobox('getText');
			var reqData = {
				SP_CD: userMesCode,
				SP_NM: userMesNum,
				RH_NM: userMesDate,
				IFS: 'H000043'
			}
			if(userMesCode == '' && userMesNum == '' && userMesDate == '') {
				$.messager.alert('提示', '请输入选择条件');
			} else {
				reqGridData('/iPlant_ajax', 'dg', reqData)
			}
		}

		//屏幕自适应
		screenCondation = function() {
			var evt = "onorientationchange" in window ? "orientationchange" : "resize";

			window.addEventListener(evt, function() {

				var width = document.documentElement.clientWidth;
				var height = document.documentElement.clientHeight;
				$print = $('#print');
				if(width >= height) {
					$print.width(width);
					$print.height(height);
					$print.css('top', 0);
					$print.css('left', 0);
					$print.css('transform', 'none');
					$print.css('transform-origin', '50% 50%');
				} else {
					$print.width(height);
					$print.height(width);
					$print.css('top', (height - width) / 2);
					$print.css('left', 0 - (height - width) / 2);
					$print.css('transform', 'rotate(90deg)');
					$print.css('transform-origin', '50% 50%');
				}

			}, false);

		}
	}
	DayReportImpro.prototype = {
		init: function() {
			$(function() {
				initGridData();
				screenCondation();
				ajaxParam2();
				slideScreen();
				$('#spareCD').combobox({  
			         onChange:function(){  
			            $('#spareNM').combobox('setText','');
						$('#storageNM').combobox('setText','');
						}
			    })  
				$('#linkbtn').click(function() {
					getDataByCondition();
				})
			});
		}
	}
	var DayReport = new DayReportImpro();
	DayReport.init();
})();