(function() {
	function factoryInfo() {
		initGridData = function() {
			    var dgrid = $('#FLB_tab').datagrid('options');
				if(!dgrid) return;
				var reqData = {
					IFS: 'ST00128',
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
								field: 'B_CODE_NUM',
								title: '条码编号',
								width: 150,
								align: 'center',formatter: function (value) {
					           	if(value != null)
                                return "<span title='" + value + "'>" + value + "</span>";}
							},{
								field : 'F_NAME',
								title : '辅料类别名称',
								width : 100,
								align : 'center',formatter : function(value) {
								if(value != null)
								return "<span title='" + value + "'>" + value + "</span>";}
							},{
								field : 'PN',
								title : 'P/N',
								width : 100,
								align : 'center',formatter : function(value) {
									if(value != null)
									return "<span title='" + value + "'>" + value + "</span>";
								}
							},{
								field : 'STATE',
								title : '状态',
								width : 50,
								align : 'center',formatter : function(value) {
								if(value != null)
								return "<span title='" + value + "'>" + value + "</span>";}
							},{
								field: 'D_DATE',
								title: '登记时间',
								width: 150,
								align: 'center',formatter: function (value) {
					           	if(value != null)
                                return "<span title='" + value + "'>" + value + "</span>";}
							},{
								field: 'GQ_DATE',
								title: '过期时间',
								width: 150,
								align: 'center',formatter: function (value) {
					           	if(value != null)
                                return "<span title='" + value + "'>" + value + "</span>";}
							},{
								field: 'KS_DATE',
								title: '开始解冻时间',
								width: 150,
								align: 'center',formatter: function (value) {
					           	if(value != null)
                                return "<span title='" + value + "'>" + value + "</span>";}
							},{
								field: 'FL_DATE',
								title: '发料时间',
								width: 150,
								align: 'center',formatter: function (value) {
					           	if(value != null)
                                return "<span title='" + value + "'>" + value + "</span>";}
							},{
								field: 'SX_DATE',
								title: '上线使用时间',
								width: 150,
								align: 'center',formatter: function (value) {
					           	if(value != null)
                                return "<span title='" + value + "'>" + value + "</span>";}
							},{
								field: 'XX_DATE',
								title: '下线使用时间',
								width: 150,
								align: 'center',formatter: function (value) {
					           	if(value != null)
                                return "<span title='" + value + "'>" + value + "</span>";}
							},{
								field: 'TH_DATE',
								title: '退回时间',
								width: 150,
								align: 'center',formatter: function (value) {
					           	if(value != null)
                                return "<span title='" + value + "'>" + value + "</span>";}
							},{
								field: 'SUPPLIER',
								title: '供应商',
								width: 200,
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
				var B_CODE_NUM = $('#B_CODE_NUM1').textbox('getValue');
				var PN = $("#PN1").textbox('getValue');
				var reqData = {
						B_CODE_NUM: B_CODE_NUM,
						PN: PN,
					IFS: 'ST00128',
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
				$("#enditTab").dialog("open").dialog('setTitle', '<font color=\"#FFF\">新增物料信息</font>');
				$('#B_CODE_NUM2').textbox({disabled:false});
				$('#PN2').textbox({disabled:false});
				$('#Factory').textbox({disabled:false});
				setQueryNull();
				state ='登记';
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
	           				arrUpdate.push({B_CODE_NUM:item.B_CODE_NUM});
	                     });	               		 
	                         var ajaxUpdate = {
	                             url: '/iPlant_ajax',
	                             dataType: 'JSON',
	                             data: {
	                                 list: arrUpdate,
	                                 IFS: 'ST00129'
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
			UpdateStation = function(){	
				changeType=1;
				var checkedItems = $('#FLB_tab').datagrid('getSelections');
				var moveIds = [];
				var num = 0;
				$.each(checkedItems, function(index, item) {
					moveIds.push(item.moveid);
					num++;
				});
				if(num != 1) {
					$.messager.alert('提示', '请选择一条数据进行修改');
					return;
				}
				var row = $("#FLB_tab").datagrid("getSelected");
				state =row.STATE;
				if(row) {
					$("#enditTab").dialog("open").dialog('setTitle', '<font color=\"#FFF\">修改辅料类别信息</font>');
					$('#B_CODE_NUM2').textbox({disabled:true});
					$('#PN2').textbox({disabled:true});
					$('#Factory').textbox({disabled:true});
					$('#B_CODE_NUM2').textbox('setValue', row.B_CODE_NUM==null?'':row.B_CODE_NUM);
					$('#PN2').textbox('setValue', row.PN==null?'':row.PN);
					$('#UnitName').combobox('setValue', row.F_NAME==null?'':row.F_NAME);
				    $('#Factory').textbox('setValue', row.SUPPLIER==null?'':row.SUPPLIER);		   
				    $('#GQ_DATE').datetimebox('setValue', row.GQ_DATE==null?'':row.GQ_DATE);
				    $('#D_DATE').datetimebox('setValue', row.D_DATE==null?'':row.D_DATE);
				   
				}
			},			
			SavaUnit=function(){
				var B_CODE_NUM = $("#B_CODE_NUM2").textbox('getValue');
				var PN = $("#PN2").textbox('getValue');
				var UnitName = $("#UnitName").textbox('getValue');
				var Factory = $("#Factory").textbox('getValue');
				var D_DATE = $("#D_DATE").datetimebox('getValue');
				var GQ_DATE = $("#GQ_DATE").datetimebox('getValue');
				if(B_CODE_NUM==''||PN=='' ||UnitName=='' ||Factory=='' ||D_DATE==null ||GQ_DATE==null ){
					$.messager.alert('提示','请将数据填充完毕！');
					return;
				}
				if(changeType==0){
				//保存查重
				var Inquire = {
						url:'iPlant_ajax',
						dataType: 'JSON',
                         data: {
                             IFS: 'ST00128',
                             B_CODE_NUM:B_CODE_NUM
                         },
                         successCallBack:function(a){
                        	 if(a.RESPONSE[0].RESPONSE_DATA.length==0){
                        		 saveMessage();
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
				saveMessage();
			}
			},	
			//保存新增/修改信息
			 saveMessage = function(){					
				var IFServerNo = '';
				if (changeType == 0) {					
					IFServerNo = 'ST00130'//新增
				} else {			
				    IFServerNo = 'ST00131'//修改
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
				
				var starttime = $('#D_DATE').datetimebox('getValue');
			    var endtime = $('#GQ_DATE').datetimebox('getValue');
			    var oDate1 = new Date(starttime);
			    var oDate2 = new Date(endtime);
				if(oDate1.getTime()>oDate2.getTime()){
					$.messager.alert('提示','登记时间不能大于过期时间');
					return;
				}
				var ajaxParam = {
					url : '/iPlant_ajax',
					dataType : 'JSON',
					data : {
					    B_CODE_NUM :  $('#B_CODE_NUM2').textbox('getValue'),
					    PN : $('#PN2').textbox('getValue'),
					    F_NAME : $('#UnitName').combobox('getValue'),
					    SUPPLIER : $('#Factory').textbox('getValue'),
					    D_DATE : $('#D_DATE').datetimebox('getValue'),
					    GQ_DATE : $('#GQ_DATE').datetimebox('getValue'),
					    STATE :state,
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
			//关闭窗口
			clearUnit = function(){
				$('#enditTab').dialog('close');
				setQueryNull();
			},
			//辅料解冻
			btnThaw = function(){	
				var time = new Date().Format("yyyy-MM-dd HH:mm:ss");
				var checkedItems = $('#FLB_tab').datagrid('getSelections');
				if(checkedItems.length==0) {
					$.messager.alert('提示', '请选择一条数据进行解冻');
					return;
				}
				var row = $("#FLB_tab").datagrid("getSelected");								
				if(row.KS_DATE!=null){
					$.messager.alert('提示', '已经进行解冻操作');
					return;
				}
				if(row) {
				var ajaxParam = {
						url : '/iPlant_ajax',
						dataType : 'JSON',
						data : {
							B_CODE_NUM :  row.B_CODE_NUM ,
						    KS_DATE :time,
						    STATE : '解冻中',
							IFS:'ST00131'
						},
						successCallBack : function(data) {
							$.messager.alert('提示','解冻开始');	
							initGridData();
						}	
			}
				iplantAjaxRequest(ajaxParam);
				}
			},
			//获取当前时间'YYYY HH24 MI SS'
			Date.prototype.Format = function (fmt) {
			    var o = {
			        "M+": this.getMonth() + 1, //月份 
			        "d+": this.getDate(), //日 
			        "H+": this.getHours(), //小时 
			        "m+": this.getMinutes(), //分 
			        "s+": this.getSeconds(), //秒 
			        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
			        "S": this.getMilliseconds() //毫秒 
			    };
			    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
			    for (var k in o)
			    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
			    return fmt;
			},
			//发料
			btnSend = function(){
				var checkedItems = $('#FLB_tab').datagrid('getSelections');	
				var row = $("#FLB_tab").datagrid("getSelected");
				var time = new Date().Format("yyyy-MM-dd HH:mm:ss");
				if(checkedItems.length==0) {
					$.messager.alert('提示', '请选择一条数据进行发料');
					return;
				}
				if(row.KS_DATE==null){
						$.messager.alert('提示', '请先进行辅料解冻操作');
						return;
					}
				if(row.FL_DATE!=null){
						$.messager.alert('提示', '已经进行发料操作');
						return;					
				}	
				if(row){
				var dateti=new Date(row.KS_DATE);
				var T = dateti.setSeconds(dateti.getSeconds()+row.M1*60);
				var t =new Date();
				var TI = t.getTime();
					if (T < TI)
					{
						var ajaxParam = {
								url : '/iPlant_ajax',
								dataType : 'JSON',
								data : {
									B_CODE_NUM :  row.B_CODE_NUM ,
								    FL_DATE :time,
								    STATE : '待用',
									IFS:'ST00131'
								},
								successCallBack : function(data) {
									$.messager.alert('提示','发料成功');	
									initGridData();
								}	
					}
						iplantAjaxRequest(ajaxParam);
					}else{
						$.messager.alert('提示', '解冻时间未达到最低时间要求！');
					}	
				}
			},
			//物料上线
			btnOLine = function(){
				var checkedItems = $('#FLB_tab').datagrid('getSelections');	
				var row = $("#FLB_tab").datagrid("getSelected");
				var time = new Date().Format("yyyy-MM-dd HH:mm:ss");
				if(checkedItems.length==0) {
					$.messager.alert('提示', '请选择一条数据进行上线操作');
					return;
				}
				if(row.FL_DATE==null){
						$.messager.alert('提示', '请先进行物料发料操作');
						return;
					}
				if(row.SX_DATE!=null){
						$.messager.alert('提示', '已经进行上线操作');
						return;
					}
				//判断辅料是否超过最长闲置时间
				var date=new Date(row.FL_DATE);
				var T = date.setSeconds(date.getSeconds()+row.M2*60);
				var t =new Date();
				var time1 = t.getTime();
				if(row){
				if(T < time1){						
					var ajaxParam = {
							url : '/iPlant_ajax',
							dataType : 'JSON',
							data : {
								B_CODE_NUM :  row.B_CODE_NUM ,							    
							    STATE : '回温中',
							    FL_DATE :time,
								IFS:'ST00131'
							},
							successCallBack : function(data) {
								$.messager.alert('提示','辅料闲置时间过长,请回温再进行下一步操作');	
								initGridData();
							}	
				}
					iplantAjaxRequest(ajaxParam);					
				}else{
					var ajaxParam1 = {
							url : '/iPlant_ajax',
							dataType : 'JSON',
							data : {
								B_CODE_NUM :  row.B_CODE_NUM ,
							    SX_DATE :time,
							    STATE : '使用中',
								IFS:'ST00131'
							},
							successCallBack : function(data) {
								$.messager.alert('提示','辅料上线成功');	
								initGridData();
							}	
				}
					iplantAjaxRequest(ajaxParam1);
				}										
				}				
			},
			//判断辅料是否使用超时以及检查辅料是否过期				
			setInterval("timeout()",3000);
			timeout = function(){
				var datet ='';
				var DATET;
				var k;
				var t =new Date();
				var time2 = t.getTime();
				var TMed;
				var Tmed;
				var k1;
				var Inquire = {
						url:'iPlant_ajax',
						dataType: 'JSON',
                         data: {
                             IFS: 'ST00128'
                         },
                         successCallBack:function(a){
                        	 if(a.RESPONSE[0].RESPONSE_DATA.length>0){
                        		 for (var i =0;i<a.RESPONSE[0].RESPONSE_DATA.length;i++){
                        			 if(a.RESPONSE[0].RESPONSE_DATA[i].SX_DATE!=null && a.RESPONSE[0].RESPONSE_DATA[i].XX_DATE==null ){
                        			 TMed=new Date(a.RESPONSE[0].RESPONSE_DATA[i].SX_DATE);	
                        			 k=TMed.setSeconds(TMed.getSeconds()+a.RESPONSE[0].RESPONSE_DATA[i].M3*60);
                        			 if(k>time2){                        				 
                            			 continue;
                        				 }else{
                        					 //获取使用超时的辅料编码
                        					 if(i==a.RESPONSE[0].RESPONSE_DATA.length-1){
                        						 datet+=a.RESPONSE[0].RESPONSE_DATA[i].B_CODE_NUM;
                        						 }else{
                        							 datet+=a.RESPONSE[0].RESPONSE_DATA[i].B_CODE_NUM;
                        					         datet+='、';
                        					 }
                        				 }
                        			 } 
                        			 //判断退回物料等待是否超时
                        			 if(a.RESPONSE[0].RESPONSE_DATA[i].TH_DATE!=null){
                        				    var DATE =new Date(a.RESPONSE[0].RESPONSE_DATA[i].TH_DATE);
                        					var T3 = DATE.setSeconds(DATE.getSeconds()+a.RESPONSE[0].RESPONSE_DATA[i].M4*60);
                        					var time3 =new Date();
                        					var TIME = t.getTime();
                        					if(T3>TIME){
                        						return;
                        					}else{
                        						var D =a.RESPONSE[0].RESPONSE_DATA[i].B_CODE_NUM;
                               				    var ajaxParam3 = {
                            							url : '/iPlant_ajax',
                            							dataType : 'JSON',
                            							data : {
                            								B_CODE_NUM :  a.RESPONSE[0].RESPONSE_DATA[i].B_CODE_NUM ,							    
                            							    STATE : '回温中',
                            							    TH_DATE : time,
                            								IFS:'ST00131'
                            							},
                            							successCallBack : function() { 
                            								$.messager.alert('提示','编号：'+D+'退回等待时间过长，请回温再使用!');
                            								initGridData();                            								
                            							}	
                            				}
                            					iplantAjaxRequest(ajaxParam3);
                               			 
                        					}
                        			 }                        			 
                        			//判断是否达到过期时间并修改过期辅料状态
                    				 Tmed=new Date(a.RESPONSE[0].RESPONSE_DATA[i].GQ_DATE);	
                        			 k1=Tmed.setSeconds(Tmed.getSeconds());
                        			 if(k1>time2){
                        				 continue;
                        			 }else{ 
                        				 var d=a.RESPONSE[0].RESPONSE_DATA[i].B_CODE_NUM;
                        				 var ajaxParam2 = {
                     							url : '/iPlant_ajax',
                     							dataType : 'JSON',
                     							data : {
                     								B_CODE_NUM :  a.RESPONSE[0].RESPONSE_DATA[i].B_CODE_NUM ,							    
                     							    STATE : '已过期',
                     								IFS:'ST00131'
                     							},
                     							successCallBack : function() { 
                     								$.messager.alert('提示','编号：'+d+'已过期!');
                     								initGridData();
                     							}	
                     				}
                     					iplantAjaxRequest(ajaxParam2);
                        			 }
	                        	 }
                        		 if(datet!=''){
                        		 $.messager.alert('提示','编号：'+datet+'辅料使用超时!');
                        		 }
                        	 }
                         }
				}
				iplantAjaxRequest(Inquire);				
			},			
			//辅料下线
			offLine = function(stu){
				var checkedItems = $('#FLB_tab').datagrid('getSelections');	
				var row = $("#FLB_tab").datagrid("getSelected");
				var time = new Date().Format("yyyy-MM-dd HH:mm:ss");
				if(checkedItems.length==0) {
					$.messager.alert('提示', '请选择一条数据进行下线操作');
					return;
				}
				if(row.SX_DATE==null){
						$.messager.alert('提示', '该辅料未上线使用');
						return;
					}
				if(row.XX_DATE!=null){
						$.messager.alert('提示', '已经进行下线操作');
						return;
					}				
				if(stu==1){
					state='已用完';
				}else{
					state='待用';
				}
				if(row){
				var ajaxParam = {
						url : '/iPlant_ajax',
						dataType : 'JSON',
						data : {
							B_CODE_NUM :  row.B_CODE_NUM ,
						    XX_DATE :time,
						    STATE : state,
							IFS:'ST00131'
						},
						successCallBack : function(data) {
							$.messager.alert('提示','辅料下线成功');	
							initGridData();
						}	
			}
				iplantAjaxRequest(ajaxParam);
				}
			},
			//辅料退回
			btnBack =function(){
				var checkedItems = $('#FLB_tab').datagrid('getSelections');	
				var row = $("#FLB_tab").datagrid("getSelected");
				var time = new Date().Format("yyyy-MM-dd HH:mm:ss");
				if(checkedItems.length==0) {
					$.messager.alert('提示', '请选择一条数据进行退回操作');
					return;
				}
				if(row.XX_DATE==null){
						$.messager.alert('提示', '该辅料未下线使用');
						return;
					}
				if(row.TH_DATE!=null){
						$.messager.alert('提示', '已经进行退回操作');
						return;
					}
				if(row){
					var ajaxParam = {
							url : '/iPlant_ajax',
							dataType : 'JSON',
							data : {
								B_CODE_NUM :  row.B_CODE_NUM ,
							    TH_DATE :time,
							    STATE : '回温中',
								IFS:'ST00131'
							},
							successCallBack : function(data) {
								$.messager.alert('提示','辅料退回');	
								initGridData();
							}	
				}
					iplantAjaxRequest(ajaxParam);
					}
			},
          //绑定辅料类别下拉框
			getSelectedMaintain = function(){
				iplantAjaxRequest({
					url :'/iPlant_ajax',
					data :{
						IFS : 'ST00200'
					},
					successCallBack : function(data){
						var array = new Array();
						var rowCollection = createSourceObj(data);
						for (var i = 0; i< rowCollection.length;i++){
							array.push({
								"id" : rowCollection[i].F_L_NAME,
								"text" : rowCollection[i].F_L_NAME
							});
						}						
						$('#UnitName').combobox({
							data : array,
							valueField : 'id',
							textField : 'text'
						});
					}
				})
			}
	}
	factoryInfo.prototype = {
		init: function() {
			$(function() {
				/*初始化全局变量对象*/
				var changeType;
				var state;
				var stu;				
				dataGrid = $('#FLB_tab');//,dataCompany=[],dataFactory=[],showmessage=$('#showMessageInfo'),editIndex = undefined,oldRow=undefined, reg=new RegExp("null","g");
				initGridData();

				$('#btnSearch').click(function() { getDataBySearch(); });					
				$('#btnAdd').click(function() {
					getSelectedMaintain();
					addStation();
					});
				$('#btnDelete').click(function() { deleteStation(); });
				$('#btnUpdate').click(function() {UpdateStation();});				
				$('#btnThaw').click(function() { btnThaw(); });
				$('#btnSend').click(function() { btnSend(); });
				$('#btnOLine').click(function() { btnOLine(); });
				$('#btnNEmpty').click(function() { 
					stu=0;
				    offLine(stu); });
				$('#btnEmpty').click(function() { 
					stu=1;
					offLine(stu); });
				$('#btnBack').click(function() { btnBack(); });
				
			});
		}
	}
	var fcfo = new factoryInfo();
	fcfo.init();
})();