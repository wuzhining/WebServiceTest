(function() {
	var et;
	var arr=[];
	var flags=true;
	function dictItem() {
		pageConfig = {
			dictCD : windowPageConfig.dictCode || 'CCT01',
			gridName : windowPageConfig.gridName || 'dict_tab',
			txtDictCode : windowPageConfig.txtDictCode || 'txtDictCode',
			txtDictName : windowPageConfig.txtDictName || 'txtDictName',
			txtMethod	: windowPageConfig.txtMethod   || 'txtMethod',
			cbUsed : windowPageConfig.cbUsed || 'cbUsed',
			dictRemark : windowPageConfig.dictRemark || 'txtDictRemrk',
			title : windowPageConfig.title || '客户类别',
			gcDictCD : windowPageConfig.gcDictCD || '字典编号',
			gcDictName : windowPageConfig.gcDictName || '字典名称'
		}
		
		textbobom=function(){
			//类别下拉框
			 var ajaxParam = {
   				 url : '/iPlant_ajax',
	    			 dataType : 'JSON',
	    			 data:{
	    				 IFS : 'T0000201',
	    			 },
	    			 successCallBack : function(data){
	    				 var rowCollection=createSourceObj(data);
	    				 
	    				 var arr=[];
	    				 arr.push({"value":"","text":"全部"});
	    				 for(var i=0;i< rowCollection.length;i++){
	    					 arr.push({"value":rowCollection[i].TYPENAME,"text":rowCollection[i].TYPENAME});
	    				 }
	    				 $('#type').combobox({
	    					 	data:arr,
	    		                valueField:'value',
	    		                textField:'text',
	    		                panelWidth:200,
	    		                panelHeight:200
	    		            });
	    				 $('#fixtureType').combobox({
	    					 	data:arr,
	    		                valueField:'value',
	    		                textField:'text',
	    		                panelWidth:200,
	    		                panelHeight:200
	    		            });
	    			 }
	    			}
			 iplantAjaxRequest(ajaxParam);
			 //供应商
			 var ajaxParam1 = {
	   				 url : '/iPlant_ajax',
		    			 dataType : 'JSON',
		    			 data:{
		    				 IFS : 'T0000212',
		    			 },successCallBack : function(data){
		    				 var rowCollection=createSourceObj(data);
		    				 
		    				 var arr1=[];
		    				 arr1.push({"value":"","text":"全部"});
		    				 for(var i=0;i< rowCollection.length;i++){
		    					 arr1.push({"value":rowCollection[i].SUP_NM,"text":rowCollection[i].SUP_NM});
		    				 }
		    				 $('#supplier').combobox({
		    					 	data:arr1,
		    		                valueField:'value',
		    		                textField:'text',
		    		                panelWidth:200,
		    		                panelHeight:200
		    		            });
		    			 }
			 }
			 iplantAjaxRequest(ajaxParam1);
		}
		var count=0;
		checkMany= function(){//多选
			if(count%2==0){
				count++;
				flags=false;
			}else{
				count--;
				flags=true;
			}
			bindGridData();
		}
		
		initGridData = function(et,a,cl,fx,sl,st,ty,cm1,cm2) {
			var dgrid = $('#' + pageConfig.gridName).datagrid('options');
			if (!dgrid) return;
			var reqData = {
				IFS : 'R0000101',
				FT_CD : fx,
				CL_NM: cl,
				flag: a,
				FT_MD:et,//工装治具机型名
				DS_LS:sl,
				C_ST:st,
				FT_TYPE:ty,
				CM_DT1:cm1,
				CM_DT2:cm2,
				pageIndex : 1,
				pageSize : dgrid.pageSize
			}
			reqGridData('/iPlant_ajax', pageConfig.gridName, reqData);
		}
		
		test1 = function(){//调用模糊查询
			var et=$("#workFlyName").val();//工装治具机型名
			var cl=$("#clientName1").val();//客户名
			var fx=$("#fixtureCode").val();//夹具编号
			var sl=$("#saveLocation1").val();//存放位置
			var st=$("#state").combobox('getValue');//状态
			var ty=$("#type").combobox('getValue');//类别
			var cm1=$("#comeDate1").datebox('getValue');//入库日期
			var cm2=$("#comeDate2").datebox('getValue');//入库日期
			var a=$("input[type='checkbox']").is(':checked');
			initGridData(et,a,cl,fx,sl,st,ty,cm1,cm2);
		}
		
		clean = function(){//清空
			$("#workFlyName").textbox('setValue');
			$("#clientName1").textbox('setValue');
			$("#fixtureCode").textbox('setValue');
			$("#workFlyName").textbox('setValue');
			$("#saveLocation1").textbox('setValue');
			$("#state").combobox('setValue');
			$("#type").combobox('setValue');
			$("#comeDate1").datebox('setValue');
			$("#comeDate2").datebox('setValue');
			$('#cb').prop('checked', '');
		}
		bindGridData = function(reqData, jsonData) {
			
			
			
			var grid = {
				name : 'listType_tab',
				dataType : 'json',
				singleSelect:flags,
				columns : [[ 
				           { field : "CZ",width : 10,checkbox : true}, 
				           { field : 'CL_NM',title : '客户名称',width : 200,align : 'center'},
				           { field : 'FT_TYPE',title : '夹具类型',width : 200,align : 'center'},
				           { field : 'FT_CD',title : pageConfig.gcDictCD,width : 200,align : 'center'}, 
				           { field : 'FT_MD',title : '夹具机型',width : 200,align : 'center'},
				           {field : 'V_SN',title : '版本号',width : 200,align : 'center'},
				           {field : 'NU_B',title : '数量',width : 200,align : 'center'},
				           { field : 'DS_LS',title : '存放位置',width : 200,align : 'center', }, 
				           {field : 'C_ST',title : '当前最新状态',width : 200,align : 'center'},
				           {field : 'OR_NU',title : '订单号',width : 200,align : 'center'},
				           {field : 'ITEM_CD',title : '物料编码',width : 200,align : 'center'},
				           {field : 'SUPPLIER',title : '供应商',width : 200,align : 'center'},
				           {field : 'CM_DT',title : '入库日期',width : 200,align : 'center'},
				           {field : 'USE_NU',title : '已使用次数',width : 200,align : 'center'},
				           {field : 'SD_LF',title : '标准寿命',width : 200,align : 'center'},
				           {field : 'CK_DT',title : '校验日期',width : 200,align : 'center'},
				           {field : 'CK_P',title : '校验人',width : 200,align : 'center'},
				           {field : 'EP_DT',title : '到期日期',width : 200,align : 'center'},
				           {field : 'CK_RS',title : '校验结果',width : 200,align : 'center'},
				         ]]
			}
			initGridView(reqData, grid);
			$('#' + pageConfig.gridName).datagrid('loadData', jsonData);
		}
		OptType = 0, 
		getOptType = function() {
			return this.OptType;
		} 
		setOptType = function(value) {
			this.OptType = value;
		}
		/* 数据有效性验证 */
		checkDataValid = function() {
			/* 数据不能为空验证 */
			var dictCode = $('#' + pageConfig.txtDictCode).val();
			if (dictCode == '') {
		     	return false;
			}
			var dictName = $('#' + pageConfig.txtDictName).val();
			if (dictName == '') {
				//$('#' + pageConfig.txtDictName).textbox({required : true});
				return false;
			}
			return true;
		}
		
		/*是否存在输入的字典项*/
		existDictItem = function(dictCode) {
			var rowNum, tpm = $('#' + pageConfig.txtDictCode);
			if (OptType == 0) {
				if(/[　，。、！？：“”［］——（）…！＠＃￥＆＊＋＞＜；：‘\u4e00-\u9fa5\s\n\r\t]+/.test($('#' + pageConfig.txtDictCode).textbox('getText'))){
		        	$.messager.alert('提示', pageConfig.gcDictCD+"不能是中文和非法字符，请重新输入。","",function(){
		        		$('#' + pageConfig.txtDictCode).textbox('setValue', '');
		        	});
		        	return;
		        }
				if (tpm.val() != undefined && tpm.val() != ''&& tpm.val() != null) {
					if (dictCode != undefined && dictCode != ''&& dictCode != null) {
						if (tpm.textbox('getValue') != undefined && tpm.textbox('getValue') != '' && tpm.textbox('getValue') != null){
							var ajaxParam = {
								url : '/iPlant_ajax',
								dataType : 'JSON',
								data : {
									IFS : 'R0000101',
									FT_CD:dictCode,
									flag:true,
									pageIndex : 1,
									pageSize : 10
								},
								successCallBack : function(data) {
									rowNum = parseInt(data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS);
									if (rowNum > 0) {
										$.messager.alert('提示','您输入的'+pageConfig.gcDictCD+'['+ dictCode+ ']已有相同,请重新输入!');
										tpm.textbox('setValue', '');
										return false;
									} 
									else {
										return 1;
									}
								}
							};
							iplantAjaxRequest(ajaxParam);
						}
					}
				}
			}
		}
		/*修改时,验证是否修改任何内容*/
		saveUpdateValidate = function() {
			var checkedItems = $('#'+windowPageConfig.gridName).datagrid('getSelections');
			row = checkedItems[0];
			if (row.MT_CD) {
				var isUserYn = 'N';
				if ($('#'+pageConfig.cbUsed).is(':checked')) {
					isUserYn = "Y";
				} 
				else {
					isUserYn = "N";
				} 
				if($('#'+pageConfig.txtDictName).val() == row.KB_NM
				   && $('#'+pageConfig.dictRemark).val() ==row.KB_PD
				   && $("#groupName").val() ==row.DICT_IT_NM_01
				   && $("#tool").val()== row.KB_CS 
				   && $("#desc").val()==row.KB_SC
				   && $('#equipmentValue').combobox('getValue')==row.DICT_IT_NM_02 
				   && $("#remark").val()==row.KB_CD
				   && isUserYn == row.USE_YN
				){
					return true;	
				}
				else {
					return false;
				}
			}
		}
		setDataNull = function() {
			$('#' + pageConfig.txtDictCode).textbox('setValue', '');
			$('#' + pageConfig.txtDictName).textbox('setValue', '');
			$('#' + pageConfig.dictRemark).textbox('setValue', '');
		}
		validSelectedData = function(gridName, type){
			var checkedItems = $('#' + gridName).datagrid('getSelections');
			var num = 0;
			$.each(checkedItems, function(index, item) {
				num++;
			});
			if (type == 'Update') {
				if (num != 1) {
					return false;
				}
			} 
			else{
				if (num <= 0){
					return false;
			    }
			}
			return true;
		}
		
		checks = function (checkedItems){
			$("#enditTab").dialog("open").dialog('setTitle', '<font color=\"white\">查看工装设备列表</font>');
    		$('#txtListCode').textbox('setValue',checkedItems[0].FT_CD);
    		$('#fixtureFiyType').textbox('setValue',checkedItems[0].FT_MD);//夹具机型
			$('#fixtureType').combobox('setValue',checkedItems[0].FT_TYPE);//夹具类型
			$("#clientName").textbox('setValue',checkedItems[0].CL_NM);//客户名称
			$('#supplier').combobox('setValue',checkedItems[0].SUPPLIER);//供应商名称
			$('#saveLocation').textbox('setValue',checkedItems[0].DS_LS);//存放位置
			$('#standardLifetime').textbox('setValue',checkedItems[0].SD_LF);//标准寿命
			$('#number').textbox('setValue',checkedItems[0].NU_B);//数量
			$('#useNumber').textbox('setValue',checkedItems[0].USE_NU);//已使用次数 
			$('#materialCode').textbox('setValue',checkedItems[0].ITEM_CD);//物料编码 
			$('#checkDate').textbox('setValue',checkedItems[0].CK_DT);//校验日期 
			$('#checkPerson').textbox('setValue',checkedItems[0].CK_P);//校验人 
			$('#expireDate').textbox('setValue',checkedItems[0].EP_DT);//到期日期 
			$('#checkResult').textbox('setValue',checkedItems[0].CK_RS);//校验结果 
			$('#orderCode').textbox('setValue',checkedItems[0].OR_NU);//订单号
			$('#versoinCode').textbox('setValue',checkedItems[0].V_SN);//版本号 
			$('#remark').textbox('setValue',checkedItems[0].FT_RM);//备注
		}
		//保养
		keep = function(){
			var isSelectedData = validSelectedData(pageConfig.gridName,'Delete');
			if (!isSelectedData) {
				 $.messager.alert('提示', '请选择一条数据');
				 return;
			}
			var row = $("#" + pageConfig.gridName).datagrid("getSelected");
	
			
							$.messager.alert('提示','保养成功');
							 initGridData();
		
		
			iplantAjaxRequest(ajaxParam);
		}
		checkGive = function (e){//工装治具归还和借出
			var arr=[];
			arr.push({"value":"","text":"全部"});
			var isSelectedData = validSelectedData(pageConfig.gridName,'Delete');
			if (!isSelectedData) {
				 $.messager.alert('提示', '请选择一条数据');
				 return;
			}
			var row = $("#" + pageConfig.gridName).datagrid("getSelected");
			
			var ft;
			if(e=='btnGive'){
				ft='夹具归还';
				$("#sur").val('确认归还');
				$('#comes').html('归还类型');
				 arr.push({"value":"产线归还","text":"产线归还"});
				 arr.push({"value":"借用归还","text":"借用归还"});
				
			}else if(e=='btnLoan'){
				ft='夹具借出';
				$("#sur").val('确认借出');
				$('#comes').html('借用类型');
				 arr.push({"value":"产线领用","text":"产线领用"});
				 arr.push({"value":"维修领用","text":"维修领用"});
				 arr.push({"value":"保养领用","text":"保养领用"});
				 arr.push({"value":"借用出库","text":"借用出库"});
			}else{
				ft='报废';
				$("#sur").val('确认报废');
				$('#comes').html('报废类型');
				 arr.push({"value":"到期报废","text":"到期报废"});
			}
			 $('#saveType').combobox({
				 	data:arr,
	                valueField:'value',
	                textField:'text',
	            });
			
			$("#enditTab1").dialog("open").dialog('setTitle', '<font color=\"white\">'+ft+'</font>');
    		$('#flyType').html(row.FT_MD);
    		$('#cliName').html(row.CL_NM);
    		$('#type1').html(row.FT_TYPE);
    		$('#supplierName1').html(row.SUPPLIER);
    		$('#saveLocation2').html(row.DS_LS);
    		$('#currentLocation').html(row.DS_LS);
    		$('#standardLifetime1').html(row.SD_LF);
    		$('#useNumber1').html(row.USE_NU);
    		$('#remark1').html(row.FT_RM);
    		$('#number1').html(row.NU_B);
		}
		
		//共用状态方法
		ajaxAll = function (row,state,count){
			 var ajaxParam = {
    				 url : '/iPlant_ajax',
	    			 dataType : 'JSON',
	    			 data:{
	    				 count:count,
	    				 USE_NU:row.USE_NU,
	    				 NU_B :row.NU_B,
	    				 FT_CD:row.FT_CD,
	    				 C_ST : state,
	    				 IFS : 'R0000104'
	    			 },successCallBack : function(data) {
							rowNum = parseInt(data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS);
							if (rowNum > 0) {
								if(state=='正常'){
									state='归还';
								}
								$.messager.alert('提示',state+'成功');
								 $('#enditTab1').dialog('close');
								 //成功后，加入到历史记录
								 var ajaxParam = {
										 url : '/iPlant_ajax',
						    			 dataType : 'JSON',
						    			 data:{
										 FT_CD:row.FT_CD,
										 FT_MD:row.FT_MD,
										 FT_TYPE:row.FT_TYPE,
										 PL_NM:$("#wire").val(),
										 FT_ST:state,
										 FT_EP:$("#saveType").combobox('getValue'),
										 FT_AL:$("#proposer").val(),
										 CL_NM:row.CL_NM,
										 DS_LS:row.DS_LS,
										 CM_DT:row.CM_DT,
										 IFS : 'F0001011'
						    			 }
								 }
								 iplantAjaxRequest(ajaxParam);
								 initGridData();
							} 
	    			 	}
			 		}
			 iplantAjaxRequest(ajaxParam);
		}
		
		yes = function(value){//确认借出或归还/报废
			var isSelectedData = validSelectedData(pageConfig.gridName,'Delete');
			if (!isSelectedData) {
				 $.messager.alert('提示', '请选择一条数据');
				 return;
			}
			var result= $("#sur").val();
			var state;
			var count;
			var row = $("#" + pageConfig.gridName).datagrid("getSelected");
	
			if(result=='确认借出'){
				state="借出";
				count=1;
			}else if(result=='确认归还'){
				state="正常";
				count=2;
			}else if(result=='确认报废'){
				state="报废";
				count=3;
			}
			
			if(result=='确认借出'){
				if(row.C_ST=='报废'){
					$.messager.alert('提示','已报废,不能操作');
					$('#enditTab1').dialog('close');
					return;
				}
				if(row.NU_B>0){
				}	else{
					 $.messager.alert('提示', '数量不足！');
					 $('#enditTab1').dialog('close');
					 return;
				}
			}
			
		if(row.C_ST!='报废'){
		  if(result=='确认归还'){
			if(row.C_ST=='借出' ){
			}else{
				 $.messager.alert('提示', '只有借出状态下才能归还！');
				 $('#enditTab1').dialog('close');
				 return;
			}
			}
		  if(row.NU_B>0 || result=='确认归还'){
			  
			  ajaxAll(row,state,count);	
		  }else{
			  $.messager.alert('提示', '数量不足！');
			  $('#enditTab1').dialog('close');
		  }
			  
			}else{
				$.messager.alert('提示','已报废');
				$('#enditTab1').dialog('close');
			}
		}
		//查看功能
		checkDictItem = function() {
			setOptType(2);
			var checkedItems = $('#listType_tab').datagrid('getChecked');//获取选中行信息
			 if(checkedItems.length==0){
	        	 $.messager.alert('提示', '请选择一行数据进行查看！');
		            return;
	        }else{
	        	if(checkedItems.length==1){
	        		checks(checkedItems);
	        	}else if(checkedItems.length>1){
	        		
        			$.messager.confirm('提示', '您已选择多行记录，程序将只查看您选择的第一条记录！是否继续？',function(r){
        				if(r){
        					checks(checkedItems);
        				}
        			})
        			}
	        }
		}
		
		updateDictItem = function() {
			var isSelectedData = validSelectedData(pageConfig.gridName,'Update');
			if (!isSelectedData) {
				   $.messager.alert('提示', '请选择一条数据进行修改');
				   return;
			}
			var row = $("#" + pageConfig.gridName).datagrid("getSelected");
			setOptType(1);
			if (row){
				$("#enditTab").dialog("open").dialog('setTitle','编辑' + pageConfig.title + '维护');
				$('#' + pageConfig.txtDictCode).textbox('textbox').attr('readonly', true);//只读
				$('#' + pageConfig.txtDictCode).textbox('textbox').attr('disabled', true);//变灰
				$('#' + pageConfig.txtDictCode).textbox('setValue',row.FT_CD);//工装治具编号
				$('#fixtureFiyType').textbox('setValue',row.FT_MD);//夹具机型
				$('#fixtureType').combobox('setValue',row.FT_TYPE);//夹具类型
				$("#clientName").textbox('setValue',row.CL_NM);//客户名称
				$('#supplier').combobox('setValue',row.SUPPLIER);//供应商名称
				$('#saveLocation').textbox('setValue',row.DS_LS);//存放位置
				$('#standardLifetime').textbox('setValue',row.SD_LF);//标准寿命
				$('#number').textbox('setValue',row.NU_B);//数量
				$('#useNumber').textbox('setValue',row.USE_NU);//已使用次数 
				$('#materialCode').textbox('setValue',row.ITEM_CD);//物料编码 
				$('#checkDate').textbox('setValue',row.CK_DT);//校验日期 
				$('#checkPerson').textbox('setValue',row.CK_P);//校验人 
				$('#expireDate').textbox('setValue',row.EP_DT);//到期日期 
				$('#checkResult').textbox('setValue',row.CK_RS);//校验结果 
				$('#orderCode').textbox('setValue',row.OR_NU);//订单号
				$('#versoinCode').textbox('setValue',row.V_SN);//版本号 
				$('#remark').textbox('setValue',row.FT_RM);//备注
			}
		}
		deleteDictItem=function(){
			var isSelectedData = validSelectedData(pageConfig.gridName,'Delete');
			if (!isSelectedData) {
				 $.messager.alert('提示', '请选择一条数据进行删除');
				 return;
			}
			var checkedItems = $('#' + pageConfig.gridName).datagrid('getSelections');
			// 确认提示框
		    var delCnt = 0;
		    var exceptionCode = '';
		   var arrUpdate = new Array();
		    $.messager.confirm('确认框','您确定要删除您所选择的数据?',
		      function(r){
		    	  if(r==true){
		    		 $.each(checkedItems,function(index,item){
		    			 delCnt++;
		    			 arrUpdate.push({FT_CD:item.FT_CD});
		    			 var ajaxParam = {
		    				 url : '/iPlant_ajax',
			    			 dataType : 'JSON',
			    			 data:{
			    				 list : arrUpdate,
			    				 IFS : 'R0000103'
			    			 },
			    			 successCallBack : function(data){
			    				/* if(data.RESPONSE["0"].RESPONSE_DATA[0].STATUS == '1') { 
			    					exceptionCode += ','+ item.XH;
			    					exceptionCode = exceptionCode.substring(1);
			    					if (exceptionCode) {
		    						      susMsg = pageConfig.gcDictCD+ exceptionCode + '被使用，不能删除，请联系管理员';
								    }
			    					if ($.messager.alert('提示',susMsg)){
		    						      initGridData();
		    					    }
			    				 }
			    				 else
			    				 {
			    					 var ajaxParam = {
			    					     url: '/iPlant_ajax',
			    					     dataType: 'JSON',
			    					     data:{
			    						   IFS:'A1000071',
			    						   MT_CD:item.MT_CD
			    					     },
			    					     async:false,*/
	    					        	    if (delCnt == checkedItems.length) {
	    							            var susMsg = '删除成功';
	    							            if ($.messager.alert('提示',susMsg)){
	    								           initGridData();
	    								        }
	    					             }
			    				 }
			    			 }
			    			 
			    			 
		    			 
		    			 iplantAjaxRequest(ajaxParam);
		    			
		    		 });
		    	  }
		      });
		    
		}
		
		//帮助
		onBtnHelpClick=function(){
			
			$.messager.show({
				title:'<font color=\"white\">帮助信息</font>',
				msg:'按住shift勾选多选框即可选择多条记录进行删除',
				showType:'show',
				width:'300px',
				height:'150px',
				style:{
				}
			});
		}
		
		
		
		addDictItem = function() {
			$('#' + pageConfig.txtDictCode).textbox('textbox').attr('readonly',false);
			$('#' + pageConfig.txtDictCode).textbox('textbox').attr('disabled',false);
			$("#enditTab").dialog("open").dialog('setTitle',pageConfig.title + '维护');
			$("#fmcustomtype").form("clear");
			setOptType(0);
			textbobom();//调用下拉框
			/*
			 * $('#' +pageConfig.txtDictCode).textbox('setValue', ccCount); 
			 * $('#' +pageConfig.txtDictCode).textbox('readonly', true);
		    */
		
		}
		saveDictItem = function() {
			if
			(($("#" + pageConfig.txtDictCode).val() == null || $("#" + pageConfig.txtDictCode).val() == "")){
			 $.messager.alert('提示', "请输入 "+pageConfig.gcDictCD+"。");
			 return;
			}
			if(!checkForm()){
				return;
			}
			var count=0;
			var reqData = {
				count:count,
				FT_CD : $("#" + pageConfig.txtDictCode).val(), // 字典代码
				FT_MD:$("#fixtureFiyType").val(), // 夹具机型
				FT_TYPE :$("#fixtureType").combobox('getValue'),//夹具类型
				CL_NM : $("#clientName").val(), // 客户名称  
				SUPPLIER :$("#supplier").textbox('getValue'),//供应商名称	
				DS_LS: $("#saveLocation").val(),//存放位置
				SD_LF : $("#standardLifetime").val() ,//标准寿命
				NU_B : $("#number").val() ,//数量
				USE_NU : $("#useNumber").val() ,//已使用次数
				ITEM_CD : $("#materialCode").val() ,//物料编码
				CK_P : $("#checkPerson").val() ,//校验人
				CK_RS : $("#checkResult").val() ,//校验结果
				OR_NU : $("#orderCode").val() ,//订单号
				V_SN : $("#versoinCode").val() ,//版本号
				FT_RM : $("#remark").val() ,//备注
				CK_DT : $("#checkDate").datebox('getValue') ,//校验日期
				EP_DT : $("#expireDate").datebox('getValue') ,//到期日期
			}
			
			var optType = getOptType();
			if(optType==2){//查看状态
				$.messager.show({
					title:'提示信息',
					msg:'查看状态下无法编辑设备保养项目！',
					showType:'show',
					timeout:2000,
					style:{}
				});
				return;
			}
			// 新增
			if (optType == 0) {
				IFServerNo = 'R0000102', 
				$.extend(reqData, {
					CRT_ID : '',
					CRT_IP : '',
					IFS : IFServerNo
				});
			}
			// 修改
			else if (optType == 1) {
				/*if (saveUpdateValidate()) {
					$.messager.alert("提示", '内容没有更新，请修改')
					return false;
				}*/
				reqData = $.extend(reqData, {
					CRT_ID : '',
					CRT_IP : '',
					IFS : 'R0000104'
				});
				initEditorDataGridView(reqData);
			}
			var susMsg = '', errorMsg = '';
			if (optType == 0) {
				susMsg = '添加成功';
				errorMsg = '添加失败,请联系管理员';
			} 
			else{
				susMsg = '更新成功';
				errorMsg = '更新失败,请联系管理员';
			}
			var ajaxParam = {
				url : '/iPlant_ajax',
				dataType : 'JSON',
				data : reqData,
				successCallBack : function(data) {
					if (data.RESPONSE[0].RESPONSE_HDR.MSG_CODE == '-1007') {
						susMsg = data.RESPONSE[0].RESPONSE_HDR.MSG_TEXT;
					}
					if ($.messager.alert('提示', susMsg)) {
						  $('#enditTab').dialog('close');
						  setDataNull();
						  initGridData();
					}
				},
				errorCallBack : function() {
					$.messager.alert('提示', errorMsg);
				}
			};
			iplantAjaxRequest(ajaxParam);
		}
		addID = function(data) {
			var arr = data.split(".");
			var i = parseInt(arr[1]) + 1;
			if (i < 10) {
				return pageConfig.dictCD + ".00" + i;
			} 
			else if (i < 100) {
				return pageConfig.dictCD + ".0" + i;
			} 
			else {
				return pageConfig.dictCD + "." + i;
			}
		}
		addCCID = function(data) {
			var arr = data.split(".");
			var i = parseInt(arr[1]) + 1;
			if (i < 10) {
				return pageConfig.dictCD + ".0" + i;
			} 
			else{
				return pageConfig.dictCD + "." + i;
			}
		}
	 }
	
	exports = function (w){//导出
		 var reqData = {
                    IFS: 'R0000101'
                }
		 if(w==1){
			 createTableOne('Type_tab','工装设备列表导出','listType_tab',reqData); 
		 }else{
			 createTable('Type_tab','工装设备列表导出','listType_tab',reqData); 
		 }
	}
	
	
	/*导入*/
	OpenImprotFramedr = function(){
		$("#enditTabupload").dialog("open").dialog('setTitle', '工装设备列表导入');
	},
	/*显示图片*/
	importFile = function (c){
		
 	   /*以下即为完整客户端路径*/
 	   var pic = document.getElementById('txtPHOTO'),file,fileName,fileType,temp = [],strSrc;
 	   if(pic.files.length>0){
 		   file = pic.files[0],fileName = file.name,fileType=file.type;
 		   if(fileName.indexOf('.')>0){
 			   temp=fileName.split('.');
 			   strSrc = temp[temp.length-1];
 			   if(strSrc.toLowerCase().localeCompare('xlsx') === 0 || strSrc.toLowerCase().localeCompare('xls') === 0 ){
 				   $('#showFileName').html(fileName);
 			   }else{
 				   $('#showFileName').html('<font color=red>请输入excel文件！</font>');
 				   return false;
 			   }
 		   }
 	   }
 	   if(c==2){
 		   importXLS(pic);
 	   }
    }
	
	var ar;
	var wb;//读取完成的数据
    var rABS = false; //是否将文件读取为二进制字符串

     importXLS = function (obj) {//导入
        if(!obj.files) {
            return;
        }
        var f = obj.files[0];
        var reader = new FileReader();
        reader.onload = function(e) {
            var data = e.target.result;
            if(rABS) {
                wb = XLSX.read(btoa(fixdata(data)), {//手动转化
                    type: 'base64'
                });
            } else {
                wb = XLSX.read(data, {
                    type: 'binary'
                });
            }
            //wb.SheetNames[0]是获取Sheets中第一个Sheet的名字
            //wb.Sheets[Sheet名]获取第一个Sheet的数据
            ar= document.getElementById("demo").innerHTML= JSON.stringify( XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]) );
           
            var arrInsert = new Array();
            var array=new Array();
           var jsonObj2 = eval('(' + ar + ')');
           var temp=0;
           if(jsonObj2 != ''){
        	   if( jsonObj2[0].供应商 == undefined  ){
           	temp="导入文件不正确,请与模版对应";
           	$("#enditTabupload").dialog("close");
            $.messager.confirm('提示',temp,function(r){
            		window.location.reload();
            })
           }else{
        
            for (var i = 0; i < jsonObj2.length; i++) {
            	
            	var a = new Date( 1900,0,jsonObj2[i].入库日期-1);
            	var a1=format(a);
            	var b= new Date( 1900,0,jsonObj2[i].校验日期-1);
            	var b1=format(b);
            	var c= new Date( 1900,0,jsonObj2[i].到期日期-1);
            	var c1=format(b);
           
            	arrInsert.push({SUPPLIER:jsonObj2[i].供应商,CL_NM:jsonObj2[i].客户名称,FT_TYPE:jsonObj2[i].夹具类型,
            		FT_CD:jsonObj2[i].工装设备列表编号,FT_MD:jsonObj2[i].夹具机型,V_SN:jsonObj2[i].版本号,
            		NU_B:jsonObj2[i].数量,DS_LS:jsonObj2[i].存放位置,C_ST:jsonObj2[i].当前最新状态,
            		OR_NU:jsonObj2[i].订单号,ITEM_CD:jsonObj2[i].物料编码,CM_DT:a1,
            		USE_NU:jsonObj2[i].已使用次数,SD_LF:jsonObj2[i].标准寿命,CK_DT:b1,
            		CK_P:jsonObj2[i].校验人,EP_DT:c1,CK_RS:jsonObj2[i].校验结果
            	});
            	array.push({FT_CD:arrInsert[i].FT_CD});
            	
			}
           }
           }else{
        	   $.messager.alert('提示','文件为空');
           }
            if(temp==0){
            var ajaxParam = {
   				 url : '/iPlant_ajax',
	    			 dataType : 'JSON',
	    			 data:{
	    				 list : array,
	    				 IFS : 'R00001011'
	    			 },successCallBack : function(data) {
	    				 rowNum = parseInt(data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS);
							if (rowNum < 1) {
								 var ajaxParam = {
						   				 url : '/iPlant_ajax',
							    			 dataType : 'JSON',
							    			 data:{
							    				 list : arrInsert,
							    				 IFS : 'R00001022'
							    			 },successCallBack : function(data) {
							    				var rowNums = parseInt(data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS);
							    				 if(rowNums>0){
							    					 $.messager.alert('提示','导入成功');
							    					 $("#enditTabupload").dialog("close");
							    					 initGridData();
							    				 }
							    			 }
									 
								 }
								 iplantAjaxRequest(ajaxParam);
							}else{
								$.messager.alert('提示','导入失败,数据已存在');
								 $("#enditTabupload").dialog("close");
							}
	    			 }
            }
            iplantAjaxRequest(ajaxParam);
         }
        };
        if(rABS) {
            reader.readAsArrayBuffer(f);
        } else {
            reader.readAsBinaryString(f);
            
        }
        
    }

    function format(data){
    	 var date = new Date(data);
         var year = date.getFullYear(),
             month = date.getMonth() + 1,//月份是从0开始的
             day = date.getDate(),
             hour = date.getHours(),
             min = date.getMinutes(),
             sec = date.getSeconds();
         var newTime = year + '-' +
                     month + '-' +
                     day + ' ' +
                     hour + ':' +
                     min + ':' +
                     sec;
         return newTime;
    }
    
    function fixdata(data) { //文件流转BinaryString
    	 
        var o = "",
            l = 0,
            w = 10240;
        for(; l < data.byteLength / w; ++l) o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)));
        o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));
        return o;
        
    }

    
	 dictItem.prototype = {
		init:function() {
			$(function() {
				$("body")[0].onkeydown = keyPress;
                $("body")[0].onkeyup = keyRelease;
				initGridData();
				$('#btnFreshen').click(function() {
					initGridData();
				});
				$('.add').click(function() {
					addDictItem();
				});
				$('#btnExport').click(function(){//导出
					exports();
	            });
				$('#test').click(function(){//导入
					OpenImprotFramedr();
				});
				$('.update').click(function() {
					updateDictItem();
				});
				$('.save').click(function() {
					saveDictItem();
				});
				$('.close').click(function() {
					setDataNull();
					$('#enditTab').dialog('close');
				});
				$('.panel-tool-close').click(function() {
					setDataNull();
				});
				$('.delete').click(function() {
					deleteDictItem();
				});
				$('#btnGive').click(function(){//工装治具归还
					var value=$(this).attr("id");
					checkGive(value);
				});
				$('#btnLoan').click(function(){//工装治具借出
					var value=$(this).attr("id");
					checkGive(value);
				});
				$('#btnReport').click(function(){//报废
					checkGive();
				});
				$('#btnKeep').click(function(){//保养
					keep();
				});
				$('#btncheck').click(function(){//查看
					checkDictItem();
				});
				//帮助
				$('#btnHelp').click(function(){
					onBtnHelpClick();
				});
				$("input",$("#"+pageConfig.txtDictCode).next("span")).blur(function(){
				    var dictCode = $("#"+pageConfig.txtDictCode).val();
				    existDictItem(dictCode);
			    });
				textbobom();
			});
		}
	}
	var dict = new dictItem();
	dict.init();
})();