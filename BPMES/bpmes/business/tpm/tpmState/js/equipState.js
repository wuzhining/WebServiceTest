/* 启动时加载 */
/*
*/
(function(){
	function eqStateinfo(){
    	initGridData=function(){
    		var dgrid=$('#eqState_tab').datagrid('options');
    		if(!dgrid) return;
       	    var reqData = {
                    IFS: 'T000078',
                    pageIndex:1,
            		pageSize:dgrid.pageSize
            }
       	   reqGridData('/iPlant_ajax','eqState_tab', reqData);
        },
        initGridDatacc=function(sn){
       	 iplantAjaxRequest( {
 			url: '/iPlant_ajax',
 			data: 
 			{
 				IFS:'T000082',
 				CO_SN: sn,
                pageIndex:1,
        		pageSize:1000
 			},
 			successCallBack: function (data) {
 				var jsonData ={total:0,rows:[]};
 				if(data.RESPONSE[0].length != 0){
 					jsonData.rows=data.RESPONSE[0].RESPONSE_DATA;
 	 				jsonData.total=data.RESPONSE[0].RESPONSE_DATA.length;
 				}
 				$('#cc_tab').datagrid({       
 					name:'cc_tab',
					dataType: 'json', 
					columns: [[
						{ field: 'CO_SN',  title: '外借单号', width: 190 ,align:'center'},
						{ field: 'DICT_IT',  title: '设备类型', width: 150,align:'center'},
						{ field: 'ET_CD',  title: '设备编号', width: 100,align:'center'},
						{ field: 'CO_SU',  title: '设备状态', width: 100,align:'center',formatter:function(value,row,index){//使用formatter格式化刷子
							if(value==0){
								return "已创建";
							}else if(value ==1){
								return "已审核";
							}else if(value == 2){
								return "已外借";
							}else if(value == 3){
								return "已归还";
							}
						 }},		
		                { field: 'CRT_ID', title: '创建人', width: 100,align:'center'},
		                { field: 'CRT_DT', title: '创建时间', width: 200,align:'center'}
				    ]],
				    onClickRow: function(index,row){	
				     },
				     onBeforeEdit:function(index,row){
				    	//$("#showMessageInfo").html('');
				     },
				     /**编辑模式进入之后的操作*/
				     onAfterEdit:function(index,row){
				    	 /**判断是否进行数据变更*/
				    	//row.edited = true;
				     }    
 		       	}); 
 				
 				$('#cc_tab').datagrid('loadData',jsonData);
 			}
 		});
        },
        dataArr={};
		bindGridData=function(reqData,jsonData){
				var grid={
						name:'eqState_tab',
						dataType: 'json', 
						columns: [[
						    { field: 'CD',  title: '需求编号', hidden: 'true' ,align:'center'},
							 {field: 'CCXZ',title: '查看',width: 160,align: 'center',formatter:function(value,row,index){//使用formatter格式化刷子
								 return '<a href="#" onclick="fomateUrl(\''+row.CO_SN+'\')" >查看流程记录</a>';
							 }},
							{ field: 'CO_SN',  title: '外借单号', width: 200,align:'center'},
							{ field: 'DICT_IT',  title: '设备类型', width: 200,align:'center'},
							{ field: 'ET_CD',  title: '设备编号', width: 100,align:'center'},
							{ field: 'EQ_ST',  title: '所属车间', width: 200,align:'center'},	
							{ field: 'CO_ST',  title: '外借车间', width: 200,align:'center'},		
							{ field: 'PT_HR',  title: '计划借用天数', width: 200,align:'center'},		
			                { field: 'ACT_HR', title: '实际借用天数', width: 100,align:'center'},
			                { field: 'TC_ID', title: '负责人', width: 200,align:'center'},
			                { field: 'CO_ID', title: '外借责任人', width: 100,align:'center'},
			                { field: 'CO_SU', title: '外借状态', width: 200,align:'center',formatter:function(value,row,index){//使用formatter格式化刷子
								if(value==0){
									return "已创建";
								}else if(value ==1){
									return "已审核";
								}else if(value == 2){
									return "已外借";
								}else if(value == 3){
									return "已归还";
								}
							 }},
			                { field: 'CK_ID', title: '审核人', width: 100,align:'center'},
			                { field: 'CK_DT', title: '审核时间', width: 200,align:'center'},
			                { field: 'CRT_ID', title: '创建人', width: 100,align:'center'},
			                { field: 'CRT_DT', title: '创建时间', width: 200,align:'center'}
					    ]],
					    onClickRow: function(index,row){	
					    	//$('#eqState_tab').datagrid("beginEdit", index);
					     },
					     onBeforeEdit:function(index,row){
					    	//$("#showMessageInfo").html('');
					     },
					     /**编辑模式进入之后的操作*/
					     onAfterEdit:function(index,row){
					    	 /**判断是否进行数据变更*/
					    	// row.edited = true;
					     }
				}
				initGridView(reqData,grid);
				$('#eqState_tab').datagrid('loadData',jsonData);
		},
		getDataBySearch = function(){
			var dgrid=$('#eqState_tab').datagrid('options');
    		if(!dgrid) return;
					var reqData = {
						CO_SN: $('#wjCode').textbox('getValue'),
						IFS: 'T000078',
						pageIndex: 1,
						pageSize: dgrid.pageSize
					}
					reqGridData('/iPlant_ajax', 'eqState_tab',reqData);
		},
		delMouldInfo = function () {
             var row = $('#eqState_tab').datagrid('getSelected');
             if (row== null) {
                 $.messager.alert('提示', '请选择一条数据进行删除');
                 return;
             }
             $.messager.confirm('确认框', '您确定要删除您所选择的数据?', function (r) {
            	 if(r==true){
                    	 var ajaxParam = {
                                 url: '/iPlant_ajax',
                                 dataType: 'JSON',
                                 data: {
                                     IFS: 'T000081',
                                     CO_SN: row.CO_SN
                                 },
                                 successCallBack:function(data){
	                              	 	if(data.RESPONSE["0"].RESPONSE_HDR.MSG_CODE=='0'){
	                              	 		$.messager.alert('提示', '删除成功!','',function(){
	                                	      initGridData();
	                                	      //删除子数据
	                                	      iplantAjaxRequest( {
	                  	    	    			url: '/iPlant_ajax',
	                  	    	    			data: 
	                  	    	    			{
	                  	    	    				IFS:'T000085',
	                  	    	    				CO_SN: row.CO_SN
	                  	    	    			},
	                  	    	    			successCallBack: function (data) {
	                  	    	    			}
	                  	    	    		});
	                                     });	
	                              	 	}else{
	                              	 		$.messager.alert('提示','删除失败,此数据正在使用!')
	                              	 	}
                         		},
                         		errorCallBack:function(data){
                         				$.messager.alert('提示','删除失败,服务器无响应!');
                         		}
                    	 
                          };
                         iplantAjaxRequest(ajaxParam);
            	 }
             });      
        },
		/* 添加维修项目信息 */
        addMouldInfo=function() {
        	lczt=0;//1表示修改
    		$("#enditTab").dialog("open").dialog('setTitle', '设备外借申请');
    		$("#fmCustom").form("clear");
    		$("#txtWJDH").textbox('setValue',autoCreateCode('tpm'));
    	},
    	savaCustom = function(){
    		var ifs = "T000079";
    		if(lczt==1){
    			ifs = "T000080";
    		}
    		var id =  $("#txtWJDH").textbox('getValue');
    		var sblx = $("#txtSBLX").combobox('getValue');
    		if(sblx == "" || sblx ==null){
    			$.messager.alert('提示','请选择设备类型！');
    			return;
    		}    
    		var sbbh = $("#txtSBBH").combobox('getValue');
    		if(sbbh == "" || sbbh ==null){
    			$.messager.alert('提示','请选择设备编号！');
    			return;
    		}  
    		
    		var sscj = $("#txtSSCJ").combobox('getValue');
    		if(sscj == "" || sscj ==null){
    			$.messager.alert('提示','请选择所属车间！');
    			return;
    		}  
    		var wjcj = $("#txtWJCJ").combobox('getValue');
    		if(wjcj == "" || wjcj ==null){
    			$.messager.alert('提示','请选择外借车间！');
    			return;
    		}  
    		
    		var jhjyts = $("#txtJHJYTS").val();
    		var fzr = $("#txtFZR").val();
    		var wjfzr = $("#txtWJFZR").val();
    		if(jhjyts == "" || jhjyts ==null){
    			$.messager.alert('提示','请输入计划天数！');
    			return;
    		}
    		if(fzr == "" || fzr ==null){
    			$.messager.alert('提示','请输入负责人！');
    			return;
    		}
    		if(wjfzr == "" || wjfzr ==null){
    			$.messager.alert('提示','请输入外借负责人！');
    			return;
    		}
    		
    		iplantAjaxRequest( {
    			url: '/iPlant_ajax',
    			data: 
    			{
    				IFS:ifs,
    				CO_SN:id,
    				DICT_IT:sblx,
    				ET_CD:sbbh,
    				EQ_ST:sscj,
    				CO_ST:wjcj,
    				PT_HR:jhjyts,
    				TC_ID:fzr,
    				CO_ID:wjfzr,
    				CO_SU:'0'
    			},
    			successCallBack: function (data) {
    				if(lczt==0){
    				iplantAjaxRequest( {
    	    			url: '/iPlant_ajax',
    	    			data: 
    	    			{
    	    				IFS:'T000083',
    	    				CO_SN:id,
    	    				DICT_IT:sblx,
    	    				ET_CD:sbbh,
    	    				CO_SU:'0'
    	    			},
    	    			successCallBack: function (data) {
    	    				$.messager.alert('提示','保存成功！','',function (){
    	    					$('#enditTab').dialog('close');
    	    					initGridData();
    	    				});
    	    			}
    	    		});
    				}else{
    					$.messager.alert('提示','保存成功！','',function (){
	    					$('#enditTab').dialog('close');
	    					initGridData();
	    				});
    				}
    			}
    		});
    		
    	},
    	fomateUrl = function (c){
    		$("#quryTab").dialog("open").dialog('setTitle', '外借流程记录');
    		initGridDatacc(c);
    	},
    	updateMouldInfo = function (){
    		
    		lczt=1;//1表示修改
    		var row = $('#eqState_tab').datagrid('getSelected');
    		if(row ==null || row == 'undefine'){
    			$.messager.alert('提示','请选择一条数据进行修改！');
    			return;
    		}
    		if(row.CO_SU !=0){
				$.messager.alert('提示','数据已经流转，不能修改！');
    			return;
			}
    		
    		$("#enditTab").dialog("open").dialog('setTitle', '设备上线明细');
    		$("#txtWJDH").textbox('setValue',row.CO_SN);
    		$("#txtSBLX").combobox('setValue',row.DICT_IT);
    		$("#txtSBBH").combobox('setValue',row.ET_CD);
    		$("#txtSSCJ").combobox('setValue',row.EQ_ST);
    		$("#txtWJCJ").combobox('setValue',row.CO_ST);
    		$("#txtJHJYTS").numberbox('setValue',row.PT_HR);
    		$("#txtFZR").textbox('setValue',row.TC_ID);
    		$("#txtWJFZR").textbox('setValue',row.CO_ID);
    	},
    	check = function (num){
    		var row = $('#eqState_tab').datagrid('getSelected');
    		if(row ==null || row == 'undefine'){
    			$.messager.alert('提示','请选择一条数据进行修改！');
    			return;
    		}
    		if(row.CO_SU==1){
    			if(num !=2){
    				$.messager.alert('提示','不能操作此按钮！');
        			return;
    			}
    		}else if(row.CO_SU==2){
    			if(num !=3){
    				$.messager.alert('提示','不能操作此按钮！');
        			return;
    			}
    		}else if(row.CO_SU==3){
    			$.messager.alert('提示','设备已归还 ，不能操作此按钮！');
    			return;
    		}
    		
    		
    		
    		iplantAjaxRequest( {
    			url: '/iPlant_ajax',
    			data: 
    			{
    				IFS:'T000080',
    				CO_SN:row.CO_SN,
    				CK_ID: num==1? "ccc":"",
    				CK_DT: num==1? "ccc":"",
    				CO_SU:num
    			},
    			successCallBack: function (data) {
    				iplantAjaxRequest( {
    	    			url: '/iPlant_ajax',
    	    			data: 
    	    			{
    	    				IFS:'T000083',
    	    				CO_SN:row.CO_SN,
    	    				DICT_IT:row.DICT_IT,
    	    				ET_CD:row.ET_CD,
    	    				CO_SU:num
    	    			},
    	    			successCallBack: function (data) {
    	    				if(num==1){
    	    					msg = "审核成功";
    	    				}else if(num==2){
    	    					msg = "外借成功";
    	    				}else{
    	    					msg = "归还成功";
    	    				}
    	    				$.messager.alert('提示',msg,'',function (){
    	    					$('#enditTab').dialog('close');
    	    					initGridData();
    	    				});
    	    			}
    	    		});
    			}
    		});
    	}
}
				eqStateinfo.prototype={
							  init: function () {
								  $(function () {
									  //所属车间
									    iplantAjaxRequest( {
							    			url: '/iPlant_ajax',
							    			data: {IFS:'B000025'},
							    			successCallBack: function (data) {
							    				var cjArr=[];
							    				cjArr.push({"id":"","text":""});
							    				for(var i=0; i<data.RESPONSE[0].RESPONSE_DATA.length;i++){
							    					cjArr.push({"id":data.RESPONSE[0].RESPONSE_DATA[i].PL_NM,"text":data.RESPONSE[0].RESPONSE_DATA[i].PL_NM});
							    				}
							    				$('#txtSSCJ').combobox({
							    					data:cjArr,
							    					valueField:'id',
							    					textField:'text'
							    				});
							    				$('#txtWJCJ').combobox({
							    					data:cjArr,
							    					valueField:'id',
							    					textField:'text'
							    				});
							    			}
							    	  });
									    
									  //设备类型
									    iplantAjaxRequest( {
							    			url: '/iPlant_ajax',
							    			data: {IFS : 'D000008',
							    				DICT_CD : 'CEM01',
							    				pageIndex : 1,
							    				pageSize : 1000},
							    			successCallBack: function (data) {
							    				var cjArr=[];
							    				cjArr.push({"id":"","text":""});
							    				for(var i=0; i<data.RESPONSE[0].RESPONSE_DATA.length;i++){
							    					cjArr.push({"id":data.RESPONSE[0].RESPONSE_DATA[i].DICT_IT_NM,"text":data.RESPONSE[0].RESPONSE_DATA[i].DICT_IT_NM});
							    				}
							    				$('#txtSBLX').combobox({
							    					data:cjArr,
							    					valueField:'id',
							    					textField:'text'
							    				});
							    			}
							    	  });
									    //设备编号
									    iplantAjaxRequest({
					                        url:'/iPlant_ajax',
					                        data:{
					                            IFS:'B000029',
					                        	USE_YN:'Y' 
					                        },
					                        successCallBack:function(data){
					                        	var sbArr = [];
					                            sbArr.push({"id":"","text":""});
							    				for(var i=0; i<data.RESPONSE[0].RESPONSE_DATA.length;i++){
							    					sbArr.push({"id":data.RESPONSE[0].RESPONSE_DATA[i].ET_NM,"text":data.RESPONSE[0].RESPONSE_DATA[i].ET_NM});
							    				}
							    				$('#txtSBBH').combobox({
							    					data:sbArr,
							    					valueField:'id',
							    					textField:'text'
							    				});
					                      }
					                       });
									  initGridData();
									  $('#btnSearch').click(function() {
								        	getDataBySearch();
								    	});
								    	$('#btnAdd').click(function(){
								    		addMouldInfo();
								    	});
								    	$('#btnCheck').click(function(){
								    		check(1);
								    	});
								    	$('#btnCheckb').click(function(){
								    		check(2);
								    	});
								    	$('#btnCheckc').click(function(){
								    		check(3);
								    	});
								    	
								    	$('#btnDelDetail').click(function(){
								    		var row =  $('#moduleproduct_tab').datagrid('getSelected'); 
								    		if(row==null){
								    			$.messager.alert('提示','请选择一条数据进行删除！');
								    			return;
								    		}
								    		var index = $('#moduleproduct_tab').datagrid('getindex',row); 
								    		$('#moduleproduct_tab').datagrid('deleteRow',index); 
								    	});
								    	$('#btnUpdate').click(function(){
								    		updateMouldInfo();
								    	});
								    	$('#btnDelete').click(function(){
								    		delMouldInfo();
								    	});
									});						  							
						         }
					}
				
		var eqSta = new eqStateinfo();
		var cjArr=[];
		var sbArr=[];
		var cjSL = {};//获取项目需求数量
		var lczt = 0;//默认新增
		eqSta.init();
		})();
