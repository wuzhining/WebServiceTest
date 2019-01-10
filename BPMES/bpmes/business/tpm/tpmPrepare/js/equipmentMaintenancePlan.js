(function(){
	var addOrUpdate;//addOrUpdate=0新增，addOrUpdate=1修改,addOrUpdate=2查看
	var searchParams={
			IFS: 'TPM_EMP00001',
	};
	function application() {
		//查看
		onBtnCheckClick=function(){
			addOrUpdate=2;
			showRowSelectInfo('see');
		}
		//新增
		onBtnAddClick=function(){
			addOrUpdate=0;
			$("#enditTab").dialog("open").dialog('setTitle', '<font color=\"white\">新增设备保养计划</font>');
		}
		
		//修改
		onBtnUpdateClick=function(){
			addOrUpdate=1;
			showRowSelectInfo('update');
		}
		
		showRowSelectInfo=function(method){
			
			var msg=method=='update'?'修改':'查看'
//			var row = $('#dgEqmMtcPlan').datagrid('getSelected');
//	        if (row == null || row == 'undefine') {
//	            $.messager.alert('提示', '请选择一条数据进行'+msg+'！');
//	            return;
//	        }
			var checkedItems = $('#dgEqmMtcPlan').datagrid('getChecked');
	        if(checkedItems.length==0){
	        	 $.messager.alert('提示', '请选择一行数据进行'+msg+'！');
		            return;
	        }else{
	        	
	        	if(checkedItems.length==1){
	        		
	        		$("#enditTab").dialog("open").dialog('setTitle', '<font color=\"white\">'+msg+'设备保养计划</font>');
	        		
	        		$('#tbEqmMtcPlanName').textbox('setValue',checkedItems[0].PLAN_NAME);
	        		$('#cbEqmMtcWay').combobox('setValue',checkedItems[0].PM_WAY);
	        		$('#cbCycleType').combobox('setValue',checkedItems[0].CYCLE_TYPE);
	        		$('#tbCycleInterval').numberbox('setValue',checkedItems[0].CYCLE_INTERVAL);
	        		$('#tbSupervisor').textbox('setValue',checkedItems[0].SUPERVISOR);
	        		$('#cbWarningWay').combobox('setValue',checkedItems[0].WARNING_WAY);
	        		$('#tbWarningInterval').numberbox('setValue',checkedItems[0].WARNING_INTERVAL);
	        		$('#tbAlarmAdvance').numberbox('setValue',checkedItems[0].ALARM_ADVANCE);
	        		$('#tbEqmMtcDetail').textbox('setValue',checkedItems[0].PM_DETAIL);
	        		$('#cbIsUse').prop('checked',checkedItems[0].ISUSE=='Y'?true:false);
	        		
	        	}else if(checkedItems.length>1){
	        		
        			$.messager.confirm('提示', '您已选择多行记录，程序将只'+msg+'您选择的第一条记录！是否继续？',function(r){
        				if(r){
        					$("#enditTab").dialog("open").dialog('setTitle', '<font color=\"white\">'+msg+'设备保养计划</font>');
        					
        					$('#tbEqmMtcPlanName').textbox('setValue',checkedItems[0].PLAN_NAME);
        					$('#cbEqmMtcWay').combobox('setValue',checkedItems[0].PM_WAY);
        					$('#cbCycleType').combobox('setValue',checkedItems[0].CYCLE_TYPE);
        					$('#tbCycleInterval').numberbox('setValue',checkedItems[0].CYCLE_INTERVAL);
        					$('#tbSupervisor').textbox('setValue',checkedItems[0].SUPERVISOR);
        					$('#cbWarningWay').combobox('setValue',checkedItems[0].WARNING_WAY);
        					$('#tbWarningInterval').numberbox('setValue',checkedItems[0].WARNING_INTERVAL);
        					$('#tbAlarmAdvance').numberbox('setValue',checkedItems[0].ALARM_ADVANCE);
        					$('#tbEqmMtcDetail').textbox('setValue',checkedItems[0].PM_DETAIL);
        					$('#cbIsUse').prop('checked',checkedItems[0].ISUSE=='Y'?true:false);
        				}
        			});
        		}
	        	
	        }
	        
		}
		
		//删除
		onBtnDeleteClick=function(){
	        var checkedItems = $('#dgEqmMtcPlan').datagrid('getChecked');
	        var planNoList = [];           
	        if(checkedItems.length==0){
	        	$.messager.alert('提示', '请至少选择一条数据进行删除！','warning');
	        }else{
	        	var msg=checkedItems.length==1?'您确定删除该设备保养计划吗？':'已选择多条数据，是否删除？';
	        	$.messager.confirm('提示', msg,function(resp){
	        		if(resp){
	        			$.messager.progress({
							title:'提示信息' ,
							msg:'正在删除数据，请稍候...'
						});
	        			
	        			$.each(checkedItems, function(index, item){
	        				planNoList.push(item.PLAN_NO);
	        			});   
	        			
	        			iplantAjaxRequest({
	       				   url: '/iPlant_ajax',
	       		           data: {
	       		        	   IFS: 'TPM_EMP00004',
	       		        	   paramList:planNoList
	       		           },
	       		           successCallBack: function (data) {
	       		        	  $.messager.progress('close');
				        	   if(data.RESPONSE[0].RESPONSE_HDR.MSG_CODE=='0'){
				        		   $.messager.alert('提示信息','删除成功!','info',function(){
				        			   searchParams.planName='';
				        			   searchParams.planNo='';
				        			   onBtnSearchClick(searchParams);
				        		   });
				        		   $("#enditTab").dialog("close");
				        	   }else{
				        		   $.messager.alert('提示信息','删除失败','error');
				        	   }
	       		           }
	        			})
	        		}
	        	});
	        }
	        
		}
		//帮助
		onBtnHelpClick=function(){
			
			$.messager.show({
				title:'<font color=\"white\">帮助信息</font>',
				msg:'勾选多选框即可选择多条记录进行删除',
				showType:'show',
				width:'300px',
				height:'150px',
				style:{
				}
			});
		}
		//查询
		onBtnSearchClick=function(params){  
			
			iplantAjaxRequest({
				   url: '/iPlant_ajax',
		           data: params,
		           successCallBack: function (data) {
		        	    if(data.RESPONSE[0].length != 0){
		        		   $('#dgEqmMtcPlan').datagrid({  
		        			   data:data.RESPONSE[0].RESPONSE_DATA
		        		   })
		        	   }
		           }
			})
		}
		//清空按钮
		onBtnClearClick = function() {
			$('#cbFullChar').prop('checked',false);
			$('#cbMultiSelect').prop('checked',false);
			$('#tbPlanName').textbox('reset');
			$('#dgEqmMtcPlan').datagrid({ 
				singleSelect:true
			})
		}
		//修改或新增的保存方法
		savePlanInfo=function(){
			
			//查看状态下点击保存按钮的提示信息
			if(addOrUpdate==2){
				$.messager.show({
					title:'提示信息',
					msg:'查看状态下无法编辑设备保养计划信息！',
					showType:'show',
					timeout:2000,
					style:{}
				});
				return;
			}
			
			if($('#tbEqmMtcPlanName').textbox('getValue')==''||$('#cbEqmMtcWay').combobox('getValue')==''||$('#cbCycleType').combobox('getValue')==''||
					$('#tbCycleInterval').numberbox('getValue')==''||$('#tbSupervisor').textbox('getValue')==''||$('#cbWarningWay').combobox('getValue')==''||
					$('#tbWarningInterval').numberbox('getValue')==''||$('#tbAlarmAdvance').numberbox('getValue')==''){
				$.messager.alert('提示','请输入必选添加信息');
                return
			}
			
			var params={
			        planName:$('#tbEqmMtcPlanName').textbox('getValue'),
			        pmWay:$('#cbEqmMtcWay').combobox('getValue'),
			        cycleType:$('#cbCycleType').combobox('getValue'),
			        cycleInterval:$('#tbCycleInterval').numberbox('getValue'),
			        supervisor:$('#tbSupervisor').textbox('getValue'),
			        warningWay:$('#cbWarningWay').combobox('getValue'),
			        warningInterval:$('#tbWarningInterval').numberbox('getValue'),
			        alarmAdvance:$('#tbAlarmAdvance').numberbox('getValue'),
			        isUse:$('#cbIsUse').is(':checked')?'Y':'N',
			        pmDetail:$('#tbEqmMtcDetail').textbox('getValue'),
			        warningSendee:$('#tbSupervisor').textbox('getValue')
			}
			//新增
			if(addOrUpdate==0){
				params.IFS= 'TPM_EMP00002',
				$('#cbFullChar').prop('checked',true);
				$.messager.confirm('确认对话框', '您确定新增设备保养计划吗？', function(r){
					if (r){
						$.messager.progress({
							title:'提示信息' ,
							msg:'正在提交，请稍候...'
						});
						iplantAjaxRequest({
							 url: '/iPlant_ajax',
					           data: params,
					           successCallBack: function (data) {
					        	   $.messager.progress('close');
					        	   if(data.RESPONSE[0].RESPONSE_HDR.MSG_CODE=='0'){
					        		   $.messager.alert('提示信息','保存成功!','info',function(){
					        			   
					        			   searchParams.planName=params.planName;
					        			   searchParams.planNo='';
					        			   
					        			   $("#enditTab").dialog("close");
					        			   onBtnSearchClick(searchParams);
					        		   });
					        	   }else{
					        		   $.messager.alert('提示信息','保存失败','error');
					        	   }
					           }
						})
					}
				});
				//修改
			}else if(addOrUpdate==1){
				params.IFS= 'TPM_EMP00003',
				params.planNo=$('#dgEqmMtcPlan').datagrid('getSelected').PLAN_NO,
				$.messager.confirm('确认对话框', '您确定修改设备保养计划吗？', function(r){
					if (r){
						$.messager.progress({
							title:'提示信息' ,
							msg:'正在提交，请稍候...'
						});
						iplantAjaxRequest({
							   url: '/iPlant_ajax',
					           data: params,
					           successCallBack: function (data) {
					        	   $.messager.progress('close');
//					        	   var msg=data.RESPONSE[0].RESPONSE_HDR.MSG_CODE=='0'?'保存成功!':data.RESPONSE[0].RESPONSE_HDR.MSG_TEXT.split('###')[0];
					        	   if(data.RESPONSE[0].RESPONSE_HDR.MSG_CODE=='0'){
					        		   $.messager.alert('提示信息','保存成功!','info',function(){
						        		   searchParams.planName='';
						        		   searchParams.planNo=params.planNo;
						        		   onBtnSearchClick(searchParams);
						        		   searchParams.planNo='';
						        	   });
					        		   $("#enditTab").dialog("close");
//					        		   $('#dgEqmMtcPlan').datagrid('selectRow',0)
					        	   }else{
					        		   $.messager.alert('提示信息','保存失败','error');
					        	   }
					           }
						})
					}
				});	
			}
		}
		//设置组件
		setupComponents=function(){
			//设备保养计划数据表格
			$('#dgEqmMtcPlan').datagrid({   
				singleSelect:true,
				ctrlSelect:true,
				checkOnSelect:true,	
//				pageIndex:1,
//				pageSize:25,
//				pagination:true,
//				rownumbers:true,
			    columns:[[    
			        {field:'check',checkbox:true},    
			        {field:'PLAN_NAME',title:'保养计划名称',width:100},    
			        {field:'PLAN_NO',title:'保养计划编码',width:120},    
			        {field:'PM_WAY',title:'保养方式',width:100},    
			        {field:'CYCLE_TYPE',title:'周期类型',width:100},
			        {field:'CYCLE_INTERVAL',title:'周期间隔',width:80},    
			        {field:'SUPERVISOR',title:'保养人',width:100},    
			        {field:'WARNING_WAY',title:'预警方式',width:100},    
			        {field:'WARNING_INTERVAL',title:'预警间隔',width:80},    
			        {field:'ALARM_ADVANCE',title:'警报提前',width:80},    
			        {field:'ISUSE',title:'是否启用',width:80},    
			        {field:'PM_DETAIL',title:'保养明细',width:120},    
			        {field:'PERCENT_OF_USE',title:'使用次数预警百分比',width:100},    
			        {field:'WARNING_SENDEE',title:'预警接收人',width:100},    
			        {field:'CREATE_USER',title:'创建人',width:100},    
			        {field:'CREATE_DATE',title:'创建日期',width:160}
			    ]]
			}); 
			//预警方式
			$('#cbWarningWay').combobox({    
				valueField: 'value',
				textField: 'label',
				panelHeight:'auto',
				editable:false,
				data: [{
					label: 'Email',
					value: 'Email'
				},{
					label: 'WeChat',
					value: 'WeChat'
				}]
			});
			//保养方式
			$('#cbEqmMtcWay').combobox({    
				valueField: 'value',
				textField: 'label',
				panelHeight:'auto',
				editable:false,
				data: [{
					label: '--By Cycle--',
					value: 'By Cycle'
				},{
					label: '--By UserDefined--',
					value: 'By UserDefined'
				}] 
			});
			//周期类型
			$('#cbCycleType').combobox({    
				valueField: 'value',
				textField: 'label',
				panelHeight:'auto',
				editable:false,
				data: [{
					label: '--By Year--',
					value: 'By Year'
				},{
					label: '--By Month--',
					value: 'By Month'
				},{
					label: '--By Week--',
					value: 'By Week'
				},{
					label: '--By Day--',
					value: 'By Day'
				},{
					label: '--By Hours--',
					value: 'By Hours'
				}] 
			});
			//多选框
			$('#cbMultiSelect').change(function(){
				if(this.checked){
					$('#dgEqmMtcPlan').datagrid({ 
						singleSelect:false
					})
				}else{
					$('#dgEqmMtcPlan').datagrid({ 
						singleSelect:true
					})
				}
			})
			//查看、新增、修改功能打开的对话窗口
			$("#enditTab").dialog({
				modal:true,
				toolbar:[{
					text:'保存',
					iconCls:'icon-save',
					handler:function(){
						savePlanInfo()
					}
				},{
					text:'帮助',
					iconCls:'icon-help',
					handler:function(){
						$.messager.show({
							title:'<font color=\"white\">帮助信息</font>',
							msg:'带星号的为必填信息',
							showType:'show',
							style:{
//								right:'',
//								top:document.body.scrollTop+document.documentElement.scrollTop,
//								bottom:''
							}
						});

					}
				}],
				onClose: function () {
					$('#tbEqmMtcPlanName').textbox('clear');
			        $('#cbEqmMtcWay').combobox('setValue','');
			        $('#cbCycleType').combobox('setValue','');
			        $('#tbCycleInterval').numberbox('clear');
			        $('#tbSupervisor').textbox('clear');
			        $('#cbWarningWay').combobox('setValue','');
			        $('#tbWarningInterval').numberbox('clear');
			        $('#tbAlarmAdvance').numberbox('clear');
			        $('#tbEqmMtcDetail').textbox('clear');
			        $('#cbIsUse').prop('checked',false);
				},
				buttons: [{
					text:'取消',
					iconCls:'icon-no',
					handler:function(){
						$('#enditTab').dialog('close');	
					}
				}]
			});

		}
		//加载设备保养计划信息
		loadEqmPMPlanInfo=function(){
//			searchParams.pageIndex=1;
//			searchParams.pageSize=29;
			onBtnSearchClick(searchParams);	
		}
		
	}
	
	application.prototype = {
		init : function() {
			$(function() {
				//设置组件
				setupComponents();
				
				//加载设备保养计划信息
				loadEqmPMPlanInfo();
				//查看
				$('#btncheck').click(function(){
					onBtnCheckClick();
				});
				//新增
				$('#btnAdd').click(function(){
					onBtnAddClick();
				});
				//编辑
				$('#btnUpdate').click(function(){
					onBtnUpdateClick();
				});
				//删除
				$('#btnDelete').click(function(){
					onBtnDeleteClick();
				});
				//帮助
				$('#btnHelp').click(function(){
					onBtnHelpClick();
				});
				//查询
				$('#btnSearch').click(function(){
						
					searchParams.planName=$('#tbPlanName').textbox('getValue');
					searchParams.isFullChar=$('#cbFullChar').is(':checked')?true:false;
					
					onBtnSearchClick(searchParams);
				});
				//清空
				$('#btnClear').click(function() {
					onBtnClearClick();
				});
				
			});
		}
	}
	new application().init();
})()