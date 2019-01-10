 (function () {
    function DayReportInfo() {
    	initGridData=function(){
    		var dgrid=$('#dg').datagrid('options');
    		if(!dgrid) return;
       	    var reqData = {
                    IFS: 'H000016',
                    pageIndex:1,
            		pageSize:dgrid.pageSize
            }
       	 reqGridData('/iPlant_ajax','dg', reqData);
     }   
 bindGridData = function(reqData,jsonData,pageSize){
		var grid={
			name:'dg',
			dataType: 'json', 
			rownumbers:false,
			pageSize:pageSize,
			pageList: [6, 10, 20, 30, 40],
			autoRowHeight:true,
			columns: [[
			           { field: 'MT_CD', title: '保养单号',align:'center',halign:'center'},
		               { field: 'ET_NM', title: '设备编号',align:'center',halign:'center'},
		               { field: 'KB_NM', title: '保养名称',align:'center',halign:'center'},
		               { field: 'KB_IU', title: '保养原因',align:'center',halign:'center'},
		               { field: 'KB_PD', title: '保养描述',align:'center',halign:'center'},
		               { field: 'KB_SC', title: '保养方法',align:'center',halign:'center'},
		               { field: 'EMP_NM', title: '保养人员',align:'center',halign:'center'},
		               { field: 'BGN_DT', title: '开始时间',align:'center',halign:'center'},
		               { field: 'END_DT', title: '结束时间',align:'center',halign:'center'}
		              ]],
		onLoadSuccess: function (jsonData) {
			var tableWidth1 = $('.datagrid-view2 .datagrid-btable').width();
			var width = document.documentElement.clientWidth;
					if(tableWidth1<width){
						$('.datagrid-view2 .datagrid-htable').css('background','gainsboro').width(width);
						$('.datagrid-view2 .datagrid-btable').width(width);
					}else{
						$('.datagrid-view2 .datagrid-htable').css('background','gainsboro');
                }
            }
		}

	initGridView(reqData,grid);
	$('#dg').datagrid({ loadFilter: pagerFilter });
	$("#dg").datagrid("loadData",jsonData);
	}
 ajaxParam = function(){
	 var ajaxParam1 = {
		          url:'/iPlant_ajax',
		          data:{
		          	IFS:'H000016'
		          },
		          successCallBack:function(data){
		          	var listData = [];
		            var rowNum=0;
	            	for(var i = 0; i < data.RESPONSE[0].RESPONSE_DATA.length; i++) {
							listData.push({
								"id": data.RESPONSE[0].RESPONSE_DATA[i].MT_CD,
								"text": data.RESPONSE[0].RESPONSE_DATA[i].MT_CD
							});
						}
						var hash = {};
						listData = listData.reduce(function(item, next) {
							hash[next.text] ? '' : hash[next.text] = true && item.push(next);
							return item
						}, [])
						$('#comCode').combobox({
							data: listData,
							valueField: 'id',
							textField: 'text'
						});
	         }
	      }
	     iplantAjaxRequest(ajaxParam1);
	      var ajaxParam2 = {
		          url:'/iPlant_ajax',
		          data:{
		          	IFS:'B000029'
		          },
		          successCallBack:function(data){
					var listData1 = [];
		            var rowNum=0;
	            	for(var i = 0; i < data.RESPONSE[0].RESPONSE_DATA.length; i++) {
							listData1.push({
								"id1": data.RESPONSE[0].RESPONSE_DATA[i].ET_CD,
								"text1": data.RESPONSE[0].RESPONSE_DATA[i].ET_NM
							});
						}
						var hash1 = {};
						listData1 = listData1.reduce(function(item, next) {
							hash1[next.text1] ? '' : hash1[next.text1] = true && item.push(next);
							return item
						}, [])
						$('#equCode').combobox({
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
			var dgrid=$('#dg').datagrid('options');
    		if(!dgrid) return;
			var userMesCode = $('#comCode').combobox('getValue');
			var userMesNum = $('#equCode').combobox('getValue');
			var userMesDates =$('.dateStart').datebox('getValue');
			var userMesDate =$('.dateEnd').datebox('getValue');
			var reqData ={
				MT_CD: userMesCode,
				ET_CD: userMesNum,
				BGN_DT: userMesDates,
				END_DT:userMesDate,
				IFS:'H000016',  
				pageIndex:1,
            	pageSize:dgrid.pageSize
			}
			if(userMesCode==''&&userMesNum==''&&userMesDate==''&&userMesDates==''){
				$.messager.alert('提示','请输入选择条件');
			}else{
				reqGridData('/iPlant_ajax','dg',reqData)
					
			}
		}

//屏幕自适应
		screenDondation = function(){
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
		    },false)
		   }
		}
    DayReportInfo.prototype={
		init: function () {
				$(function () {
					screenDondation();
					ajaxParam();
					initGridData();
					slideScreen();
					var btn = document.getElementById('linkbtn');
							btn.onmousedown=function(){
								getDataByCondition();
		 				}
					});
					
					
		}
	}
	var DayReport = new DayReportInfo();
	DayReport.init();
})();

//	window.onload=function(){
//	
// }

	
	
	
	
	
	
	
	
	
	
	
