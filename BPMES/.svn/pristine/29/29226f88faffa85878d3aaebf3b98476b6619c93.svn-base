(function() {
	function factoryInfo() {
		initGridData = function() {
			    var dgrid = $('#FLB_tab').datagrid('options');
				if(!dgrid) return;
				var reqData = {
					IFS: 'ST00200',
					pageIndex: 1,
					pageSize: dgrid.pageSize
				}
				reqGridData('/iPlant_ajax', 'FLB_tab', reqData);
				
			},
			bindGridData = function(reqData, jsonData) {
				var gridList = {
					name: 'FLB_tab',
					dataType: 'json',
					//singleSelect:false,
					columns: [
						[
//							{
//							field : 'ck',
//							checkbox : true
//						},
						{
								field: 'F_L_NAME',
								title: '辅料类别名',
								width: 150,
								align: 'center',formatter: function (value) {
					           	if(value != null)
                                return "<span title='" + value + "'>" + value + "</span>";}
							},{
								field : 'MIN_TIME',
								title : '最少解冻时间',
								width : 150,
								align : 'center',formatter : function(value) {
								if(value != null)
								return "<span title='" + value + "'>" + value + "</span>";}
							},{
								field : 'MAX_TIME',
								title : '最长闲置时间',
								width : 150,
								align : 'center',formatter : function(value) {
									if(value != null)
									return "<span title='" + value + "'>" + value + "</span>";
								}
							},{
								field : 'MAX_USE_TIME',
								title : '最长使用时间',
								width : 150,
								align : 'center',formatter : function(value) {
								if(value != null)
								return "<span title='" + value + "'>" + value + "</span>";}
							},{
								field: 'X_T_TIME',
								title: '下线退回时间',
								width: 150,
								align: 'center',formatter: function (value) {
					           	if(value != null)
                                return "<span title='" + value + "'>" + value + "</span>";}
							}
						]
					]
				}
				initGridView(reqData, gridList);
				$('#FLB_tab').datagrid('loadData', jsonData);
			},
			//查询
			getDataBySearch=function(){
				var dgrid = $('#FLB_tab').datagrid('options');
				if(!dgrid) return;
				var F_L_NAME = $('#F_L_NAME1').textbox('getValue');
				var reqData = {
					F_L_NAME: F_L_NAME,
					IFS: 'ST00200',
					pageIndex: 1,
					pageSize: dgrid.pageSize
				}
				reqGridData('/iPlant_ajax', 'FLB_tab',reqData);
			},
			//置空输入框
			setQueryNull=function() {
				$('#ff').form('clear');
				
			},
			//新增
			addStation = function(){
				$("#enditTab").dialog("open").dialog('setTitle', '<font color=\"#FFF\">新增辅料类别信息</font>');
				$('#F_L_NAME').textbox({disabled:false});				
				setQueryNull();
				changeType=0;
			},
			//删除
			deleteStation =function(){
				var checkedItems =  $('#FLB_tab').datagrid('getSelections');	
				if (checkedItems.length==0) {
	                $.messager.alert('提示', '请选择一条数据进行删除');
	                return;
	            }
				var delCnt=0,arrUpdate = new Array();
				$.messager.confirm('确认框', '您确定要删除您所选择的数据吗?', function (r) {
	               	if(r==true){
	               		var tmp='';
	               		 $.each(checkedItems, function (index, item) {
	           				arrUpdate.push({F_L_NAME:item.F_L_NAME});
	                     });	               		 
	                         var ajaxUpdate = {
	                             url: '/iPlant_ajax',
	                             dataType: 'JSON',
	                             data: {
	                                 list: arrUpdate,
	                                 IFS: 'ST00201'
	                             },
	                             successCallBack: function (data) {	                            	
		                       	 	 $.messager.alert('提示', '删除成功!','',function(){
		                          	     initGridData();
		                             });
	                             },
	                             errorCallBack: function (data) {
	                                 $.messager.alert('提示', '删除失败!');
	                                 return;
	                             }
	                         };
	                         iplantAjaxRequest(ajaxUpdate);	               		 
	               	}
	            });
			},
			//修改
			UpdateStation = function(){				
				changeType=1;
				var checkedItems = $('#FLB_tab').datagrid('getSelections');
				if(checkedItems.length==0) {
					$.messager.alert('提示', '请选择一条数据进行修改');
					return;
				}
				var row = $("#FLB_tab").datagrid("getSelected");
				if(row) {
						$("#enditTab").dialog("open").dialog('setTitle', '<font color=\"#FFF\">修改辅料类别信息</font>');
						$('#F_L_NAME').textbox({disabled:true});
						$('#F_L_NAME').textbox('setValue', row.F_L_NAME==null?'':row.F_L_NAME);
						$('#MIN_TIME').numberbox('setValue', row.MIN_TIME==null?'':row.MIN_TIME);
						$('#MAX_TIME').numberbox('setValue', row.MAX_TIME==null?'':row.MAX_TIME);
					    $('#MAX_USE_TIME').numberbox('setValue', row.MAX_USE_TIME==null?'':row.MAX_USE_TIME);		   
					    $('#X_T_TIME').numberbox('setValue', row.X_T_TIME==null?'':row.X_T_TIME);
				}	
			},			
			SavaUnit=function(){
				if(changeType==0){
				var F_L_NAME = $("#F_L_NAME").textbox('getValue');
				//保存查重
				var Inquire = {
						url:'iPlant_ajax',
						dataType: 'JSON',
                         data: {
                             IFS: 'ST00200',
                             F_L_NAME:F_L_NAME
                         },
                         successCallBack:function(a){
                        	 if(a.RESPONSE[0].RESPONSE_DATA.length==0){
                        		 save1();
                        	 }else{
                        		 $.messager.alert('提示','添加失败！此数据已存在');
                        		 initGridData();
                        		 return;
                        	 }
                         },
                         errorCallBack:function(){
                        	 $.messager.alert('提示','查询失败');
                         }
				}
				iplantAjaxRequest(Inquire);
			}else{
				save1();
			}
			},	
			//保存新增/修改信息
			 save1 = function(){					
				var IFServerNo = '';			
				if (changeType == 0) {

					IFServerNo = 'ST00202'//新增
				} else {			
				    IFServerNo = 'ST00203'//修改
				}
				var susMsg = '';
				var errorMsg = '';
				if (changeType == 0) {
					susMsg = '新增成功';
					errorMsg = '新增失败,请联系管理员';
				} else {
					susMsg = '修改成功';
					errorMsg = '修改失败,请联系管理员';
				}
				var ajaxParam = {
					url : '/iPlant_ajax',
					dataType : 'JSON',
					data : {
						F_L_NAME :  $('#F_L_NAME').textbox('getValue'),
						MIN_TIME : $('#MIN_TIME').numberbox('getValue'),
						MAX_TIME : $('#MAX_TIME').numberbox('getValue'),
						MAX_USE_TIME : $('#MAX_USE_TIME').numberbox('getValue'),
						X_T_TIME : $('#X_T_TIME').numberbox('getValue'),
						IFS:IFServerNo
					},
					successCallBack : function(data) {
						$.messager.alert('提示',susMsg);	
						$('#enditTab').dialog('close');
						setQueryNull();
						initGridData();
					},
					errorCallBack : function() {
						commonShowMessage(errorMsg);
						return false;
						$.messager.show({
							title : '提示',
							msg : errorMsg,
							//showType:'show',
							showType : 'slide',
							showSpeed : '8600',
							style : {
								left : document.body.clientWidth - 250, // 与左边界的距离
								top : document.body.clientHeight - 100	// 与顶部的距离
							}
						});
					}
				};
				iplantAjaxRequest(ajaxParam);
			},
			clearUnit = function(){
				$('#enditTab').dialog('close');
				setQueryNull();
			}
	}
		     
	factoryInfo.prototype = {
		init: function() {
			$(function() {
				/*初始化全局变量对象*/
				dataGrid = $('#FLB_tab');//,dataCompany=[],dataFactory=[],showmessage=$('#showMessageInfo'),editIndex = undefined,oldRow=undefined, reg=new RegExp("null","g");
				initGridData();
				var changeType;
				$('#btnSearch').click(function() { getDataBySearch(); });					
				$('#btnAdd').click(function() {	addStation(); });
				$('#btnDelete').click(function() {	deleteStation(); });
				$('#btnUpdate').click(function() {	UpdateStation(); });				
			});
		}
	}
	var fcfo = new factoryInfo();
	fcfo.init();
})();