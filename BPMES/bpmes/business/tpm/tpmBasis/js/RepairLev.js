/* 启动时加载 */
/*
*/
(function(){
	function repairInfo(){
    	initGridData=function(){
    		var dgrid=$('#repair_tab').datagrid('options');
    		if(!dgrid) return;
       	    var reqData = {
                    IFS: 'T000029',
                    pageIndex:1,
            		pageSize:dgrid.pageSize
            }
       	   reqGridData('/iPlant_ajax','repair_tab', reqData);
        },
        dataArr={};
		bindGridData=function(reqData,jsonData){
			var grid={
					name:'repair_tab',
					dataType: 'json', 
					columns: [[
//					    {field : "CZ",width : 10,checkbox : true},
						{ field: 'RT_CD',  title: '维修项目编码', width: 100 ,align:'center'},
						{ field: 'RT_NM',  title: '维修项目名称<span style="color:red">*</span>', width: 200,align:'center',editor : {
							type : "text",
							options : {
								required : false
							}
						}},
						{ field: 'RT_SE',  title: '分值<span style="color:red">*</span>', width: 100,align:'center',editor : {type:'numberbox', options:{precision:0}}},
						{ field: 'RE_CN',  title: '备注', width: 200,align:'center',editor : {
							type : "text",
							options : {
								required : false
							}
						}},						
		                { field: 'CRT_ID', title: '创建人', width: 100,align:'center'},
		                { field: 'CRT_DT', title: '创建时间', width: 200,align:'center'},
		                { field: 'UPT_ID', title: '修改人', width: 100,align:'center'},
		                { field: 'UPT_DT', title: '修改时间', width: 200,align:'center'}
				    ]],
				    onClickRow: function(index,row){	
				    	$('#repair_tab').datagrid("beginEdit", index);
				     },
				     onBeforeEdit:function(index,row){
				    	 $("#showMessageInfo").html('');
				     },
				     /**编辑模式进入之后的操作*/
				     onAfterEdit:function(index,row){
				    	 /**判断是否进行数据变更*/
				    	 row.edited = true;
				     }
			}
			initGridView(reqData,grid);
			$('#repair_tab').datagrid('loadData',jsonData);
		},
		getDataBySearch = function(){
			var dgrid = $('#repair_tab').datagrid('options');
				if(!dgrid) return;
					var repairCode = $('#WxxmCode').textbox('getValue');
					var repairName = $('#WxxmName').textbox('getValue');
					var score = $('#wxxmLev').textbox('getValue');
					var reqData = {
						RT_CD: repairCode,
						RT_NM: repairName,
						RT_SE: score,
						IFS: 'T000029',
						pageIndex: 1,
						pageSize: dgrid.pageSize
					}
					reqGridData('/iPlant_ajax', 'repair_tab',reqData);
			}	
		deleterepair = function () {
             var checkedItems = $('#repair_tab').datagrid('getSelections');
             if (checkedItems.length<1) {
                 $.messager.alert('提示', '请选择一条数据进行删除');
                 return;
             }
             //确认提示框
             var delCnt=0;
             $.messager.confirm('确认框', '您确定要删除您所选择的数据?', function (r) {
            	 if(r==true){
            		 $.each(checkedItems, function (index, item) {
            			 delCnt++;
                    	 var ajaxParam = {
                                 url: '/iPlant_ajax',
                                 dataType: 'JSON',
                                 data: {
                                     IFS: 'T000032',
                                     RT_CD: item.RT_CD
                                 },
                                 successCallBack:function(data){
	                              	 if(delCnt==checkedItems.length){
	                              	 	if(data.RESPONSE["0"].RESPONSE_HDR.MSG_CODE=='0'){
	                              	 		$.messager.alert('提示', '删除成功!','',function(){
	                                	      initGridData();
	                                     });	
	                              	 	}else{
	                              	 		$.messager.alert('提示','删除失败,此数据正在使用!')
	                              	 	}
	                                     
	                            	 }
                         		},
                         		errorCallBack:function(data){
                         			if(delCnt==checkedItems.length){
                         				$.messager.alert('提示','删除失败,服务器无响应!');
                         			}
                         		}
                    	 
                          };
                         iplantAjaxRequest(ajaxParam);
                     });
            	 }
             });      
        },
		/* 添加维修项目信息 */
		addrepair=function() {
        	var ajaxParam = {
                    url: '/iPlant_ajax',
                    data: {
                        IFS: 'T000034'
                    },
                    successCallBack: function (data) {
                        var needata = data.RESPONSE[0].RESPONSE_DATA[0].RT_CD;
                        var row = {"RT_CD":needata,
                				"RT_NM":"",
                				"RT_SE":"",
                				"RE_CN":""
                				};
                        $('#repair_tab').datagrid('insertRow',{index:0,row:row}); 
                        $('#repair_tab').datagrid("beginEdit", 0);
                    }
                }
                iplantAjaxRequest(ajaxParam);
		},
		saverepairInfo=function(){ 
			saveDataGrid('repair_tab','T000030','T000031','showMessageInfo');
		}
}
				repairInfo.prototype={
							  init: function () {
						            $(function () {
										    initGridData();
										    var CompanyOpttype;
										    $('#btnSearch').click(function() {
										    	getDataBySearch();
											});
											$('.add').click(function(){
												addrepair();
											})
											$('.delete').click(function(){
												deleterepair();
											});
											
											$('#btnSaves').click(function(){
												saverepairInfo(); 
											})
											
									});						  							
						         }
					}
 var repair = new repairInfo();
 repair.init();
})();
