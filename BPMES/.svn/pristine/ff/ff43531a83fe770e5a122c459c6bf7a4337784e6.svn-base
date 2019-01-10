(function() {
	function DayReportInfo() {
		initGridData = function() {
				var dgrid = $('#dg').datagrid('options');
				var pageSize = 6;
				if(!dgrid) return;
				var reqData = {
					IFS: 'H000014',
					pageIndex: 1,
					pageSize: dgrid.pageSize
				}
				reqGridData('/iPlant_ajax', 'dg', reqData, pageSize);
			},
			bindGridData = function(reqData, jsonData,pageSize) {
				var grid = {
					name: 'dg',
					dataType: 'json',
					rownumbers: false,
					pageSize:6,
					pageList: [6,10, 20, 30, 40],
					autoRowHeight: true,
					columns: [
						[{
							field: 'RP_CD',
							title: '维修单号',
							align: 'center'
						}, {
							field: 'ET_NM',
							title: '设备编号',
							align: 'center'
						}, {
							field: 'KB_NM',
							title: '维修名称',
							align: 'center'
						}, {
							field: 'KB_IU',
							title: '问题原因',
							align: 'center'
						},{
							field: 'KB_SC',
							title: '维修方法',
							align: 'center'
						},{
							field: 'EMP_NM',
							title: '维修人员',
							align: 'center'
						}, {
							field: 'BGN_DT',
							title: '开始时间',
							align: 'center'
						}, {
							field: 'END_DT',
							title: '结束时间',
							align: 'center'
						}]
					],
					onLoadSuccess: function(jsonData) {
						$('.datagrid-view2 .datagrid-htable').css('background','gainsboro');	 
					}
				}
				initGridView(reqData, grid);
				$('#dg').datagrid({ loadFilter: pagerFilter });
				$("#dg").datagrid("loadData",jsonData);				
			}
	getData = function(){
		var ajaxParam1 = {
			url: '/iPlant_ajax',
			data: {
				IFS: 'H000014'
			},
			successCallBack: function(data) {
				var listData = [];
				var rowNum = 0;
					for(var i = 0; i < data.RESPONSE[0].RESPONSE_DATA.length; i++) {
							listData.push({
								"id": data.RESPONSE[0].RESPONSE_DATA[i].RP_CD,
								"text": data.RESPONSE[0].RESPONSE_DATA[i].RP_CD
							});
						}
						var hash = {};
						listData = listData.reduce(function(item, next) {
							hash[next.text] ? '' : hash[next.text] = true && item.push(next);
							return item
						}, [])
						$('#maintenanceOrder').combobox({
							data: listData,
							valueField: 'id',
							textField: 'text'
						});
				
			}
		}
		iplantAjaxRequest(ajaxParam1);
		var ajaxParam2 = {
			url: '/iPlant_ajax',
			data: {
				IFS: 'B000029'
			},
			successCallBack: function(data) {
				var listData1 = [];
				var rowNum = 0;
					for(var i = 0; i < data.RESPONSE[0].RESPONSE_DATA.length; i++) {
							listData1.push({
								"id1": data.RESPONSE[0].RESPONSE_DATA[i].RP_CD,
								"text1": data.RESPONSE[0].RESPONSE_DATA[i].ET_NM
							});
					}
						var hash1 = {};
						listData1 = listData1.reduce(function(item, next) {
							hash1[next.text1] ? '' : hash1[next.text1] = true && item.push(next);
							return item
						}, [])
						$('#equipCode').combobox({
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
		getDataByCondition = function(){
	
			var userMesCode = $('#maintenanceOrder').combobox('getValue');
			var userMesNum = $('#equipCode').combobox('getValue');
			var userMesDates =$('.dateStart').datebox('getValue');
			var userMesDate =$('.dateEnd').datebox('getValue');
			var reqData ={
				MT_CD: userMesCode,
				ET_CD: userMesNum,
				BGN_DT: userMesDates,
				END_DT:userMesDate,
				IFS:'H000014',  
				pageIndex:1,
		     	pageSize:7
			}
			if(userMesCode==''&&userMesNum==''&&userMesDate==''&userMesDates == ''){
				$.messager.alert('提示','请输入选择条件');
			}else{
				reqGridData('/iPlant_ajax','dg',reqData)
					
			}
		}

		//屏幕自适应
		screenDondation = function() {
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
		loadFilter = function (data){  
		    var value = {  
		            total:data.total,  
		            rows:[]  
		    };  
		    for (var i = 0; i < data.rows.length; i++) {  
		        var o = {};  
		        _loadArray(data.rows[i],o,"");  
		    value.rows.push(o);  
		    }  
		    return value;  
		}  
		_loadArray = function (data,o,pre){  
		    if(pre)  
		            pre = pre+".";  
		     for (var att in data) {  
		           var row = data[att];  
		           if(typeof(row) == "object"){  
		               _loadArray(row,o,pre+att);  
		           }else{  
		                        o[pre+att] = row;                    
		                    }  
		          
		       }  
		}  
	}
	DayReportInfo.prototype = {
		init: function() {
			$(function() {
				screenDondation();
				slideScreen();
				initGridData();
				getData();
				screenDondation();
				var btn = document.getElementById('linkbtn');
				btn.onmousedown = function() {
					getDataByCondition();
				}
			});
		}
	}
	var DayReport = new DayReportInfo();
	DayReport.init();
})();