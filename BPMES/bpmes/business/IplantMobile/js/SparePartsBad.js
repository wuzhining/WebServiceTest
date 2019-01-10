(function() {
	function DayReportImpro() {
		initGridData = function() {
			var dgrid = $('#dg').datagrid('options');
			var pageSize = 6;
			if(!dgrid) return;
			var reqData = {
				IFS: 'H000045',
				pageIndex: 1,
				pageSize: dgrid.pageSize
			}
			reqGridData('/iPlant_app', 'dg', reqData,pageSize);
		}
		bindGridData = function(reqData, jsonData,pageSize) {
			var grid = {
				name: 'dg',
				dataType: 'json',
				pageSize:pageSize,
				autoRowHeight: false,
				columns: [
					[{
						field: 'RI_CD',
						title: '报损单号',
						align: 'center'
					}, {
						field: 'SP_CD',
						title: '备件编号',
						align: 'center'
					}, {
						field: 'SP_NM',
						title: '备件名称',
						align: 'center'
					}, {
						field: 'RI_QT',
						title: '报损数量',
						align: 'center'
					}, {
						field: 'RI_IU',
						title: '报损原因',
						align: 'center'
					}, {
						field: 'EMP_NM',
						title: '报损人',
						align: 'center'
					}, {
						field: 'RI_RD',
						title: '报损日期',
						align: 'center'
					}, ]
				],
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
				}
			}
			initGridView(reqData, grid);
			$('#dg').datagrid({ loadFilter: pagerFilter });
			$('#dg').datagrid('loadData', jsonData);

		}
		ajaxParam1 = function() {
			var ajaxParam1 = {
				url: '/iPlant_ajax',
				data: {
					DICT_CD: 'CRI01',
					IFS: 'D000008'
				},
				successCallBack: function(data) {

					var rowNum = 0
					if(data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS) {
						rowNum = parseInt(data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS);
					}
					var rowCollection = createSourceObj(data);
					$('#spareYY').combobox({
						data: rowCollection,
						valueField: 'DICT_IT',
						textField: 'DICT_IT_NM'
					});

				}
			}
			iplantAjaxRequest(ajaxParam1);
		}
		ajaxParam2 = function() {
				var listData = [];
				var listData1 = [];
				var ajaxParam2 = {
					url: '/iPlant_ajax',
					data: {
						IFS: 'H000045'
					},
					successCallBack: function(data) {
						for(var i = 0; i < data.RESPONSE[0].RESPONSE_DATA.length; i++) {
							listData.push({
								"id": data.RESPONSE[0].RESPONSE_DATA[i].SP_NM,
								"text": data.RESPONSE[0].RESPONSE_DATA[i].SP_NM
							});
						}
						for(var i = 0; i < data.RESPONSE[0].RESPONSE_DATA.length; i++) {
							listData1.push({
								"id1": data.RESPONSE[0].RESPONSE_DATA[i].SP_CD,
								"text1": data.RESPONSE[0].RESPONSE_DATA[i].SP_CD
							});
						}

						var hash = {};
						listData = listData.reduce(function(item, next) {
							hash[next.text] ? '' : hash[next.text] = true && item.push(next);
							return item
						}, [])
						var hash1 = {};
						listData1 = listData1.reduce(function(item, next) {
							hash1[next.text1] ? '' : hash1[next.text1] = true && item.push(next);
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
					}
				}
				iplantAjaxRequest(ajaxParam2);
			}
			//查询
		getDataByCondition = function() {
			var userMesCode = $('#spareCD').combobox('getText');
			var userMesNum = $('#spareNM').combobox('getText');
			var userMesinfo = $('#spareYY').combobox('getText');
			var reqData = {
				SP_CD: userMesCode,
				SP_NM: userMesNum,
				RI_IU: userMesinfo,
				IFS: 'H000045'
			}
			if(userMesCode == '' && userMesNum == '' && userMesinfo == '') {
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
				slideScreen();
				initGridData();
				screenCondation();
				ajaxParam1();
				ajaxParam2();
				$('#spareCD').combobox({  
			         onChange:function(){  
			            $('#spareNM').combobox('setText','');
						$('#spareYY').combobox('setText','');
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