(function() {
	function DayReportInfo() {
		initGridData = function() {
				var dgrid = $('#dg').datagrid('options');
				var pageSize = 6;
				if(!dgrid) return;
				var reqData = {
					IFS: 'H000024',
					pageIndex: 1,
					pageSize: dgrid.pageSize
				}
				reqGridData('/iPlant_app', 'dg', reqData, pageSize);
			},
			bindGridData = function(reqData, jsonData, pageSize) {
				var grid = {
					name: 'dg',
					dataType: 'json',
					autoRowHeight: false,
					columns: [
						[{
							field: 'PT_CD',
							title: '产品编号',
							align: 'center'
						}, {
							field: 'PT_NM',
							title: '产品名',
							align: 'center'
						}, {
							field: 'DR_BN',
							title: '良品数',
							align: 'center'
						}, {
							field: 'DR_GQ',
							title: '次品数',
							align: 'center'
						}, {
							field: 'DO_NUM',
							title: '日目标生产数',
							align: 'center'
						}, {
							field: 'DR_NUM',
							title: '日实际生产数',
							align: 'center'
						}, {
							field: 'FINISHRATE',
							title: '日达成率',
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
					},
					
					onClickRow: function(rowIndex, rowData) {
						$.cookie('imgCD', rowData.PT_CD);
						$.cookie('imgNM', rowData.PT_NM);
						$.cookie('imgDT', $('#date').datebox('getValue'));

						window.location.href = "ProDayReportImportant.html";
						//						HttpSession imgCD = request.getSession();
						//						HttpSession imgNM = request.getSession();
						//						sessionName.setAttribute("imgCD", rowData.PT_CD);
						// 						sessionName.setAttribute("imgNM", rowData.PT_NM);

					}
				}
				initGridView(reqData, grid);
				$('#dg').datagrid({ loadFilter: pagerFilter });
				$('#dg').datagrid('loadData', jsonData);

			}
		ajaxParam1 = function() {
			var ajaxParam1 = {
				url: '/iPlant_app',
				reqAddress:'App',
				data: {
					IFS: 'B000025'
				},
				successCallBack: function(data) {
					var rowNum = 0
					if(data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS) {
						rowNum = parseInt(data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS);
					}
					var rowCollection = createSourceObj(data);
					$('#stationName').combobox({
						panelWidth: 100,
						data: rowCollection,
						valueField: 'PL_CD',
						textField: 'PL_NM',
						onSelect:function(rec){
							ajaxParam2(rec.PL_CD);
						}
					});
				}
				
			}
			iplantAjaxRequest(ajaxParam1);
		}
		ajaxParam2 = function(plCD) {
				var ajaxParam = {
					url: '/iPlant_app',
					data: {
						IFS: 'B000029',
						PL_CD:plCD
					},
					successCallBack: function(data) {
						var rowNum = 0
						var listData = [];
						for(var i = 0; i < data.RESPONSE[0].RESPONSE_DATA.length; i++) {
							listData.push({
								"id": data.RESPONSE[0].RESPONSE_DATA[i].ET_CD,
								"text": data.RESPONSE[0].RESPONSE_DATA[i].ET_NM
							});
						}
						var hash = {};
						listData = listData.reduce(function(item, next) {
							hash[next.text] ? '' : hash[next.text] = true && item.push(next);
							return item
						}, []);
						$('#machineCode').combobox({
							data: listData,
							valueField: 'id',
							textField: 'text'
						});
					}
				}
				iplantAjaxRequest(ajaxParam);
			}
			//查询
		getDataByCondition = function() {
			var userMesCode = $('#stationName').combobox('getValue');
			var userMesNum = $('#machineCode').combobox('getValue');
			var userMesDate = $('#date').datebox('getValue');
			//			$.cookie('imgDT',userMesDate);
			var reqData = {
				PL_CD: userMesCode,
				ET_CD: userMesNum,
				DR_DT: userMesDate,
				IFS: 'H000024'
			}
			if(userMesCode == '' && userMesNum == '' && userMesDate == '') {
				$.messager.alert('提示', '请输入选择条件');
			} else {
				reqGridData('/iPlant_app', 'dg', reqData)

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
	DayReportInfo.prototype = {
		init: function() {
			$(function() {
				initGridData();
				slideScreen();
				screenCondation();
				ajaxParam1();
				//ajaxParam2();
				$("#linkbtn").click(function() {
					getDataByCondition();
				})
			});
		}
	}
	var DayReport = new DayReportInfo();
	DayReport.init();
})();