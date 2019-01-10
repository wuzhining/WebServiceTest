(function() {
	function OeeInfo() {
		GetQueryString = function(name) {
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
			var r = window.location.search.substr(1).match(reg);
			if(r != null) return unescape(r[2]);
			return null;
		}
		initMachineList = function() {
			var listData = [];
			var ajaxParam = {
				url: '/iPlant_app',
				data: {
					IFS: 'B000029'
				},
				successCallBack: function(data) {
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
					}, [])
					$('#machineCode').combobox({
						panelWidth: 100,	
						data: listData,
						valueField: 'id',
						textField: 'text'
					});
				}
			}
			iplantAjaxRequest(ajaxParam);
		}
		initType = function() {
			$('#fwName').combobox({
				data: [{
					"id": "X",
					"text": "产品"
				}, {
					"id": "Y",
					"text": "设备"
				}],
				valueField: "id",
				textField: "text"
			})
		}
		initValue = function() {
			if(shift == 'A') {
				BCname = '白班';
			} else if(shift == 'B') {
				BCname = '夜班';
			} else {
				BCname = '';
			}
			$('#bcName').combobox('setText', BCname);
			
		}
		bindGridData = function(reqData, jsonData, pageSize) {
			var grid = {
				name: 'dg',
				pageSize: pageSize,
				dataType: 'json',
				autoRowHeight: false,
				columns: [
					[{
						field: 'ET_NM',
						title: '设备编号',
						align: 'center'
					},
					{
						field: 'PT_CD',
						title: '产品编号',
						align: 'center'
					},
					{
						field: 'PT_NM',
						title: '产品名',
						align: 'center'
					}, {
						field: 'DR_NUM',
						title: '生产数',
						align: 'center'
					}, {
						field: 'DR_AT',
						title: '稼动时间',
						align: 'center',
						formatter: function (value, row, index) {
                            if (value == 'N/A') {
                                return '0';
                            }
                            else{
                         	   return value;
                            }
                    }
					}, {
						field: 'DR_DM',
						title: '停机时间',
						align: 'center',
						formatter: function (value, row, index) {
                            if (value == 'N/A') {
                                return '0';
                            }
                            else{
                         	   return value;
                            }
                    }
					}, {
						field: 'DR_ST',
						title: '计划停机时间',
						align: 'center',
						formatter: function (value, row, index) {
                            if (value == 'N/A') {
                                return '0';
                            }
                            else{
                         	   return value;
                            }
                    }
					}, {
						field: 'DR_TC',
						title: '理论产量',
						align: 'center'
					}, {
						field: 'DR_GQ',
						title: '良品数',
						align: 'center'
					}, {
						field: 'DR_EE',
						title: '机台效率',
						align: 'center',
						formatter: function (value, row, index) {
							if (value != '0' && !value==false) {
                                return value+'%';
                           }
                           else
                           {
                              return '0';
                           }
                        }
					}, {
						field: 'DR_ER',
						title: '有效开机率',
						align: 'center',
						formatter: function (value, row, index) {
							if (value != '0' && !value==false) {
                                 return value+'%';
                            }
                            else
                            {
                               return '0';
                            }

                        }
					}, {
						field: 'DR_BN',
						title: '不良数',
						align: 'center',
						formatter: function (value, row, index) {
                            if (value != '0') {
                                 return value+'%';
                            }
                            else{
                              return '0';
                            }

                        }
					}, {
						field: 'DR_BR',
						title: '不良率',
						align: 'center',
						formatter: function (value, row, index) {
							if (value != '0' && !value==false) {
                                return value+'%';
                           }
                           else
                           {
                              return '0';
                           }

                        }
					}, {
						field: 'OEE',
						title: 'OEE',
						align: 'center',
						formatter: function (value, row, index) {
							if (value != '0' && !value==false) {
                                return value+'%';
                           }
                           else
                           {
                              return '0';
                           }

                        }
					}]
				],
				onLoadSuccess: function(jsonData) {
					$('.datagrid-view2 .datagrid-htable').css('background', 'gainsboro');
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
					setTimeout("$('#dg').datagrid('loaded')", 500);
					$('#dg').datagrid('loaded')
				}
			}
			initGridView(reqData, grid);
			$('#dg').datagrid({
				loadFilter: pagerFilter
			});
			//				pagerFilter(reqData,jsonData);
			$('#dg').datagrid('loadData', (function() {
				$('#dg').datagrid('loading');
				return jsonData;
			})());
			var hdType = $('#fwName').combobox('getValue');
            if(hdType=='1'){
            	$('#dg').datagrid('showColumn','ET_NM');
            	$('#dg').datagrid('hideColumn','PT_NM');
            	$('#dg').datagrid('hideColumn','PT_CD');
            }
            else{
            	$('#dg').datagrid('hideColumn','ET_NM');
            	$('#dg').datagrid('showColumn','PT_NM');
            	$('#dg').datagrid('showColumn','PT_CD');
            }
		}
		getData = function() {
				var machineCode = $('#machineCode').combobox('getValue');
				var bcName = $('#bcName').combobox('getValue');
				var Date = GetQueryString("date");
				var shift = GetQueryString("shift");
				var Are = GetQueryString("are");
				if(shift == 'A') {
					BCname = '白班';
				} 
				else if(shift == 'B') {
					BCname = '夜班';
				} 
				else{
					BCname = '';
				}
				if(bcName==''){
				  $('#bcName').combobox('setText', BCname);
				}
				var IServceNo='H000131';
				var hdType = $('#fwName').combobox('getValue');
				var reqData = {
					ET_CD: machineCode,
					CS_NM: bcName,
					IFS: IServceNo,
					DR_DT: Date,
					CS_CD: shift,
					xy:hdType,
					ARE: Are,
					pageIndex: 1,
					pageSize: 10
				}
				reqGridData('/iPlant_app', 'dg', reqData);
			}
			//屏幕自适应
		screenContion = function() {
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
	OeeInfo.prototype = {
		init: function() {
			$(function() {
				initMachineList();
				getData();
				//initGridData();
				screenContion();
				slideScreen();
				$('#linkbtn').click(function() {
					//getDataByCondition();
					getData();
				})
				$('#fixed').click(function() {
					//					$('#hh').css('transform','1s')
					$('#hh').toggle();
				})
			});
		}
	}
	var oee = new OeeInfo();
	oee.init();
})();