
(function() {
	function RankList() {	
		//初始化表格
		initGridData = function() {
			    var dgrid = $('#RFID_tab').datagrid('options');
				if(!dgrid) return;
				var reqData = {
					IFS: 'DMS_R0001',
					pageIndex: 1,
					pageSize: dgrid.pageSize
				}
				reqGridData('/iPlant_ajax', 'RFID_tab', reqData);
			},
			bindGridData = function(reqData, jsonData) {
				var gridList = {
					name: 'RFID_tab',
					dataType: 'json',
					singleSelect:false,
					columns: [
						[{
								field: 'HUM_GRADE',
								title: '湿度等级',
								width: 110,
								align: 'center',formatter: function (value) {
					           	if(value != null)
                                return "<span title='" + value + "'>" + value + "</span>";}
							},{
								field : 'ISENCAP',
								title : '系统内置',
								width : 80,
								align : 'center',formatter : function(value) {
									if(value == '1'){
										return "<span title='是'>是</span>";
									}else {
										return "<span title='否'>否</span>";
									}
								}
							},{
								field : 'TOTALEXPOSEMINUTE',
								title : '暴露时长(小时)',
								width : 110,
								align : 'center',formatter : function(value) {
								return "<span title='" + value + "'>" + value + "</span>";}
							},{
								field : 'ENCAPSTAUTS',
								title : '烘烤次数',
								width : 110,
								align : 'center',formatter : function(value) {
								return "<span title='" + value + "'>" + value + "</span>";}
							},{
								field : 'STORAGE_TIME',
								title : '存储期限(月)',
								width : 120,
								align : 'center',formatter : function(value) {
								return "<span title='" + value + "'>" + value + "</span>";}
							},{
								field: 'CRT_ID',
								title: '创建人',
								width: 100,
								align: 'center',formatter: function (value) {
					           	if(value != null)
                                return "<span title='" + value + "'>" + value + "</span>";}
							},{
								field: 'CRT_DT',
								title: '创建日期',
								width: 200,
								align: 'center',formatter: function (value) {
					           	if(value != null)
                                return "<span title='" + value + "'>" + value + "</span>";}
							},{
								field: 'UPT_ID',
								title: '修改人',
								width: 100,
								align: 'center',formatter: function (value) {
					           	if(value != null)
                                return "<span title='" + value + "'>" + value + "</span>";}
							},{
								field: 'UPT_DT',
								title: '修改日期',
								width: 200,
								align: 'center',formatter: function (value) {
					           	if(value != null)
                                return "<span title='" + value + "'>" + value + "</span>";}
							}
						]
					]
				}
				initGridView(reqData, gridList);
				$('#RFID_tab').datagrid('loadData', jsonData);
			}
		
		setDataNull = function () {           
             // $('#txtID').textbox('setValue','');              
          }	

        dataArr={},
        
		//置空查询输入框
		setQueryNull=function() {
			$('#HUM_GRADE1').textbox('setValue',""),
			$('#fullMatching').prop('checked',false);
		}
        
        getDataBySearch = function(){
			var dgrid = $('#RFID_tab').datagrid('options');
			if(!dgrid) return;
			var HUM_GRADE = $('#HUM_GRADE1').val();
			var reqData = {
				HUM_GRADE: HUM_GRADE,
				IFS: 'DMS_R0001',
				pageIndex: 1,
				pageSize: dgrid.pageSize
			}
			reqGridData('/iPlant_ajax', 'RFID_tab',reqData);
		}
		
	};
	RankList.prototype = {
		init: function() {
			$(function() {	
				var CompanyOpttype; //0：新增   1:编辑  
				var isid ='';
				var cong_id;
				var checkedRow;
		         
				initGridData();	
				
				$('#btnResets').click(function(){
		            setQueryNull();
		        });
				$('#bttSearch').click(function() {
					getDataBySearch();
				});				
				$('.save').click(function() {
					savaStation();
				});
				$('.close').click(function() {
					$('#enditTab').dialog('close');
				});
				$('.panel-tool-close').click(function() {
					setDataNull();
				});
			});
		}
	}
	var fcfo = new RankList();
	fcfo.init();
})();