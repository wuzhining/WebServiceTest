(function() {
	var otype;
	function dictItem() {
		pageConfig = {
			dictCD : windowPageConfig.dictCode || 'CCT01',
			gridName : windowPageConfig.gridName || 'dict_tab',
			txtDictCode : windowPageConfig.txtDictCode || 'txtDictCode',
			txtDictName : windowPageConfig.txtDictName || 'txtDictName',
			cbUsed : windowPageConfig.cbUsed || 'coll',
			dictRemark : windowPageConfig.dictRemark || 'txtDictRemrk',
			title : windowPageConfig.title || '客户类别',
			gcDictCD : windowPageConfig.gcDictCD || '字典编号',
			gcDictName : windowPageConfig.gcDictName || '字典名称'
		}
		var q1=0;
		initGridData = function(eqType,eqCode,eqName,a,eqIp) {
			var dgrid = $('#' + pageConfig.gridName).datagrid('options');
			if (!dgrid) return;
			var reqData = {
				IFS : 'D00000111',
				type: eqType,
				code: eqCode,
				name: eqName,
				eqip:eqIp,
				q:q1,
				flag: a,
				DICT_CD : pageConfig.dictCD,
				pageIndex : 1,
				pageSize : dgrid.pageSize
			}
			reqGridData('/iPlant_ajax', pageConfig.gridName, reqData);
		}
		eqList=function (){//模糊查询
			var eqType=$("#eqType").val();//设备类型
			var eqCode=$("#eqCode").val();//设备编码
			var eqName=$("#eqName").val();//按设备名称查
			var eqIp=$("#eqIp").val();//按设备IP查
			var a=$("input[type='checkbox']").is(':checked');
			initGridData(eqType,eqCode,eqName,a,eqIp);
		}
		
		clean = function(){//清空
			$("#eqType").textbox('setValue');
			$("#eqCode").textbox('setValue');
			$("#eqName").textbox('setValue');
			$("#eqIp").textbox('setValue');
			$('#cb').prop('checked', '');
		}
		
		bindGridData = function(reqData, jsonData) {
			var grid = {
				name : pageConfig.gridName,
				//singleSelect:false, 设置多选，false为多选
				dataType : 'json',
				columns : [[ 
					           { field : "check",width : 10,checkbox : true},  
					           { field : 'ET_CD',title : pageConfig.gcDictCD,width : 200,align : 'center'}, 
					           { field : 'ET_NM',title : pageConfig.gcDictName,width : 200,align : 'center'}, 
					           { field : 'ET_PL',title : '设备图片',width : 200,align : 'center',
					        	   formatter:function(value,row,index){
					        		   if(value == null){
					        			   value = "ZSJ.png";
					        		   }
					        		   return "<img src='../../../common/RootImages/"+value+"' width='60' height='40'>";
					        	   }
					           },
					           { field : 'EQ_IP',title : '设备IP',width : 200,align : 'center'},
					           { field : 'ET_UT',title : '设备型号',width : 200,align : 'center'}, 
					           { field : 'DICT_IT',title : '设备类型名称',width : 200,align : 'center'}, 
					           { field : 'ET_TT',title : '产线名称',width : 200,align : 'center'}, 
					           { field : 'ROUT_CD',title : '工位名称',width : 200,align : 'center'}, 
					           { field : 'ET_ST',title : '设备状态',width : 200,align : 'center'}, 
					           { field : 'CRT_DT',title : '生产日期',width : 200,align : 'center'},
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
									IFS : 'D000008',
									DICT_CD : pageConfig.dictCD,
									DICT_IT:dictCode,
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
		/*saveUpdateValidate = function() {
			var checkedItems = $('#'+windowPageConfig.gridName).datagrid('getSelections');
			row = checkedItems[0];
			if (row.DICT_IT) {
				var isUserYn = 'N';
				if ($('#'+pageConfig.cbUsed).is(':checked')) {
					isUserYn = "Y";
				} 
				else {
					isUserYn = "N";
				}
				if ($('#'+pageConfig.txtDictName).val() != (row.DICT_IT_NM==null?'':row.DICT_IT_NM)
					|| $('#'+pageConfig.dictRemark).val() !=(row.DICT_RM==null?'':row.DICT_RM)
					|| isUserYn != (row.USE_YN==null?'N':row.USE_YN)) {
					return true;
				} 
				else {
					return false;
				}
			}
		}*/
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
		
		checks = function(checkedItems){//公用的查看方法
			$("#enditTab").dialog("open").dialog('setTitle', '<font color=\"white\">查看设备列表</font>');
    		$('#txtListCode').textbox('setValue',checkedItems[0].ET_CD);
    		$('#txtListName').textbox('setValue',checkedItems[0].ET_NM);
    		$('#equipmentType').textbox('setValue',checkedItems[0].DICT_IT);
    		$('#equipmentModel').textbox('setValue',checkedItems[0].ET_UT);
    		$('#equipmentState').combobox('setValue',checkedItems[0].ET_ST);
    		$('#makeDate').textbox('setValue',checkedItems[0].CRT_DT);
    		$('#buyDate').textbox('setValue',checkedItems[0].EQ_BUY);//设备购买日期
			$('#productionName').combobox('setValue',checkedItems[0].ET_TT);//产线名称
			$('#stationNames').combobox('setValue',checkedItems[0].ROUT_CD);//工位名称
			$('#equipmentState').combobox('setValue',checkedItems[0].ET_ST);//设备状态
			$('#stationName').combobox('setValue',checkedItems[0].ET_QT);//保养项目
			$('#IP').textbox('setValue',checkedItems[0].AOI_IP);//接口IP
			$('#dataName').textbox('setValue',checkedItems[0].DBA_NAME);//数据库名
			$('#loginName').textbox('setValue',checkedItems[0].LOGIN_NAME);//登录名
			$('#pwd').textbox('setValue',checkedItems[0].PW);//密码
			$('#remark').textbox('setValue',checkedItems[0].REMARKS);//备注
			$('#assetCode').textbox('setValue',checkedItems[0].ASSET_NUMBER);//资产编号
			$('#EquipmentFacCode').textbox('setValue',checkedItems[0].FACTORY_ID);//设备厂商编码
			$('#supplier').textbox('setValue',checkedItems[0].SUPPLIER);//供应商
			$('#manufacturer').textbox('setValue',checkedItems[0].MANUFACTURER);//制造商
			$('#equipmentip').textbox('setValue',checkedItems[0].EQ_IP);//设备IP
			$('#eqpicture').textbox('setValue',checkedItems[0].ET_PL);//设备图片
			if (checkedItems[0].USE_YN == "Y") {
				$('#' + pageConfig.cbUsed).prop('checked','checked');
			} 
			else{
				$('#' + pageConfig.cbUsed).prop('checked', '');
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
	        		checks(checkedItems);//调用查看方法
	        	}else{
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
			textbobom();//调用下拉框
			if (!isSelectedData) {
				   $.messager.alert('提示', '请选择一条数据进行修改');
				   return;
			}
			var row = $("#" + pageConfig.gridName).datagrid("getSelected");
			
			
			setOptType(1);
			if (row){
				$("#enditTab").dialog("open").dialog('setTitle','编辑' + pageConfig.title + '维护');
				$('#' + pageConfig.txtDictCode).textbox('textbox').attr('readonly', true);
				$('#' + pageConfig.txtDictCode).textbox('textbox').attr('disabled', true);
				$('#' + pageConfig.txtDictCode).textbox('setValue',row.ET_CD);
				$('#' + pageConfig.txtDictName).textbox('setValue',row.ET_NM);
				$('#assetCode').textbox('setValue',row.ASSET_NUMBER);//资产编号
				$('#EquipmentFacCode').textbox('setValue',row.FACTORY_ID);//设备厂商编码
				$('#supplier').textbox('setValue',row.SUPPLIER);//供应商
				$('#manufacturer').textbox('setValue',row.MANUFACTURER);//制造商
				$('#equipmentType').combobox('setValue',row.DICT_IT);//设备类型
				$('#equipmentModel').textbox('setValue',row.ET_UT);//设备型号
				$('#makeDate').textbox('setValue',row.CRT_DT);//设备制造日期
				$('#buyDate').textbox('setValue',row.EQ_BUY);//设备购买日期
				$('#productionName').combobox('setValue',row.ET_TT);//产线名称
				$('#stationNames').combobox('setValue',row.ROUT_CD);//工位名称
				$('#equipmentState').combobox('setValue',row.ET_ST);//设备状态
				$('#stationName').combobox('setValue',row.ET_QT);//保养项目
				$('#IP').textbox('setValue',row.AOI_IP);//接口IP
				$('#dataName').textbox('setValue',row.DBA_NAME);//数据库名
				$('#loginName').textbox('setValue',row.LOGIN_NAME);//登录名
				$('#pwd').textbox('setValue',row.PW);//密码
				$('#remark').textbox('setValue',row.REMARKS);//备注
				$('#equipmentip').textbox('setValue',row.EQ_IP);//设备IP
				$('#eqpicture').textbox('setValue',row.ET_PL);//设备图片
					if (row.USE_YN == "Y") {
					$('#' + pageConfig.cbUsed).prop('checked','checked');
				} 
				else{
					$('#' + pageConfig.cbUsed).prop('checked', '');
				}
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
		    			 arrUpdate.push({ET_CD:item.ET_CD});
		    			 var ajaxParam = {
		    				 url : '/iPlant_ajax',
			    			 dataType : 'JSON',
			    			 data:{
			    				 IFS : 'C00001',
			    				 list : arrUpdate
			    			 },
			    			 successCallBack : function(data){
			    				 /*if(data.RESPONSE["0"].RESPONSE_DATA[0].STATUS == '1') { 
			    					exceptionCode += ','+ item.DICT_IT;
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
			    						   IFS:'D000006',
			    						   ET_CD:item.ET_CD
			    					     },
			    					     async:false,
			    					     successCallBack:function(data){
	    					        	    if (delCnt == checkedItems.length) {
	    							            var susMsg = '删除成功';
	    							            if ($.messager.alert('提示',susMsg)){
	    								           initGridData();
	    								        }
	    							        }
	    					             }
			    					 }
			    					 iplantAjaxRequest(ajaxParam);
			    				 }*/
			    				 if (delCnt == checkedItems.length) {
							            var susMsg = '删除成功';
							            if ($.messager.alert('提示',susMsg)){
								           initGridData();
								           otype=3;//删除
								           allSun(arrUpdate,otype);
								        }
							        }
			    			 }
		    			 }
		    			 iplantAjaxRequest(ajaxParam);
		    		 });
		    	  }
		      });
		}
		
		//获取下拉框
		textbobom=function(){
			//设备类型下拉框
			 var ajaxParam = {
   				 url : '/iPlant_ajax',
	    			 dataType : 'JSON',
	    			 data:{
	    				 IFS : 'Y00011',
	    			 },
	    			 successCallBack : function(data){
	    				 var rowCollection=createSourceObj(data);
	    				 
	    				 var arr=[];
	    				 arr.push({"value":"","text":"全部"});
	    				 for(var i=0;i< rowCollection.length;i++){
	    					 arr.push({"value":rowCollection[i].DICT_NM,"text":rowCollection[i].DICT_NM});
	    				 }
	    				 $('#equipmentType').combobox({
	    					 	data:arr,
	    		                valueField:'value',
	    		                textField:'text',
	    		                panelWidth:200,
	    		                panelHeight:200
	    		            });
	    			 }
	    			}
			 iplantAjaxRequest(ajaxParam);
			 
			//产线名称下拉框
			 var ajaxParam = {
   				 url : '/iPlant_ajax',
	    			 dataType : 'JSON',
	    			 data:{
	    				 IFS : 'U00011',
	    			 },
	    			 successCallBack : function(data){
	    				 var rowCollection=createSourceObj(data);
	    				 
	    				 var arr=[];
	    				 arr.push({"value":"","text":"全部"});
	    				 for(var i=0;i< rowCollection.length;i++){
	    					 arr.push({"value":rowCollection[i].ET_TT,"text":rowCollection[i].ET_TT});
	    				 }
	    				 $('#productionName').combobox({
	    					 	data:arr,
	    		                valueField:'value',
	    		                textField:'text',
	    		                panelWidth:200,
	    		                panelHeight:200
	    		            });
	    			 }
	    			}
			 iplantAjaxRequest(ajaxParam);
			 
			 
			//保养项目下拉框
			 var ajaxParam = {
   				 url : '/iPlant_ajax',
	    			 dataType : 'JSON',
	    			 data:{
	    				 IFS : 'U00013',
	    			 },
	    			 successCallBack : function(data){
	    				 var rowCollection=createSourceObj(data);
	    				 
	    				 var arr=[];
	    				 arr.push({"value":"","text":"全部"});
	    				 for(var i=0;i< rowCollection.length;i++){
	    					 arr.push({"value":rowCollection[i].KB_NM,"text":rowCollection[i].KB_NM});
	    				 }
	    				 $('#stationName').combobox({
	    					 	data:arr,
	    		                valueField:'value',
	    		                textField:'text',
	    		                panelWidth:200,
	    		                panelHeight:200
	    		            });
	    			 }
	    			}
			 iplantAjaxRequest(ajaxParam);
			 
			//工位名称下拉框
			 var ajaxParam = {
   				 url : '/iPlant_ajax',
	    			 dataType : 'JSON',
	    			 data:{
	    				 IFS : 'U00014',
	    			 },
	    			 successCallBack : function(data){
	    				 var rowCollection=createSourceObj(data);
	    				 
	    				 var arr=[];
	    				 arr.push({"value":"","text":"全部"});
	    				 for(var i=0;i< rowCollection.length;i++){
	    					 arr.push({"value":rowCollection[i].ROUT_CD,"text":rowCollection[i].ROUT_CD});
	    				 }
	    				 $('#stationNames').combobox({
	    					 	data:arr,
	    		                valueField:'value',
	    		                textField:'text',
	    		                panelWidth:200,
	    		                panelHeight:200
	    		            });
	    			 }
	    			}
			 iplantAjaxRequest(ajaxParam);
		}
		
		
		addDictItem = function() {
			
			
			$('#' + pageConfig.txtDictCode).textbox('textbox').attr('readonly',false);
			$('#' + pageConfig.txtDictCode).textbox('textbox').attr('disabled',false);
			$("#enditTab").dialog("open").dialog('setTitle',pageConfig.title + '维护');
			$("#fmcustomtype").form("clear");
			$('#' + pageConfig.cbUsed).prop('checked','checked');
			setOptType(0);
			textbobom();//调用下拉框
			
			
			/*
			 * $('#' +pageConfig.txtDictCode).textbox('setValue', ccCount); 
			 * $('#' +pageConfig.txtDictCode).textbox('readonly', true);
		    */
			
		}
		
		allSun=function(reqData1,otype){ //关联增删改
			var req;
			var ifsnow;
			if(otype==1){//增加
				req=reqData1.ET_CD;
				ifsnow='T0000012';
			}else if(otype==2){//修改
				req=reqData1.ET_CD;
				ifsnow='T0000013';
			}else{//删除
				ifsnow='T0000014';
				req=reqData1;
			}
			 var ajaxParam = {
	   				 url : '/iPlant_ajax',
		    			 dataType : 'JSON',
		    			 data:{
		    				 FACTORY_ID:reqData1.FACTORY_ID,
		    				 MANUFACTURER:reqData1.MANUFACTURER,
		    				 SUPPLIER :reqData1.SUPPLIER,
		    				 ASSET_NUMBER :reqData1.ASSETCODE,
		    				 AOI_IP :reqData1.AOI_IP,
		    				 DBA_NAME:reqData1.DBA_NAME,
		    				 LOGIN_NAME:reqData1.LOGINNAME,
		    				 PW:reqData1.PWD,
		    				 EQ_IP:reqData1.EQ_IP,
		    				 USE_YN:reqData1.USE_YN,
		    				 list:req,
		    				 ET_CD:req,
		    				 EQ_CR_DT:reqData1.MAKEDATE,
		    				 EQ_BUY:reqData1.BUYDATE,
		    				 IFS : ifsnow
		    			 }
		}
			 iplantAjaxRequest(ajaxParam);
		}
		
		saveDictItem = function() {
			// 校验
			if (($("#" + pageConfig.txtDictName).val() == null || $("#" + pageConfig.txtDictName).val() == "")) {
				$.messager.alert('提示', "请输入"+pageConfig.gcDictName+"。");
				return;
			}
			else if
				(($("#" + pageConfig.txtDictCode).val() == null || $("#" + pageConfig.txtDictCode).val() == "")){
				$.messager.alert('提示', "请输入"+pageConfig.gcDictCD+"。");
				return;
			}
			else if
				($("#makeDate").datebox('getValue') == null ||$("#makeDate").datebox('getValue') == ""){
				$.messager.alert('提示', "请输入设备制造日期。");
				return;
			}
			else if
				($("#buyDate").datebox('getValue') == null ||$("#buyDate").datebox('getValue') == ""){
				$.messager.alert('提示', "请输入购买日期。");
				return;
			}
			else if
			($("#IP").val() == null ||$("#IP").val() == ""){
				$.messager.alert('提示', "请输入接口 IP。");
				return;
			}
			else if
			($("#dataName").val() == null ||$("#dataName").val() == ""){
				$.messager.alert('提示', "请输入数据库名。");
				return;
			}
			else if
			($("#loginName").val() == null ||$("#loginName").val() == ""){
				$.messager.alert('提示', "请输入登录名。");
				return;
			}
			else if
			($("#pwd").val() == null ||$("#pwd").val() == ""){
				$.messager.alert('提示', "请输入密码。");
				return;
			}
			var cmbCheckType=$('#equipmentType').combobox('getValue');//获取设备类型下拉框选中的值
			var produName=$('#productionName').combobox('getValue');//获取产线名称下拉框选中的值
			var eqState=$('#equipmentState').combobox('getValue');//获取设备状态下拉框选中的值
			var station=$('#stationName').combobox('getValue');//获取保养项目下拉框选中的值
			var rout=$('#stationNames').combobox('getValue');//获取工位名称下拉框选中的值
			var IFServerNo = '', isUsed = '';
			if ($("input[name='postingdate']").is(':checked'))
				 isUsed = 'Y';
			else
				 isUsed = 'N';
			
			var reqData1={//设备厂商C_IPLANT_E5_T 
				FACTORY_ID:	$("#EquipmentFacCode").val(),//设备厂商编码
				MANUFACTURER: $("#manufacturer").val(),//制造商
				SUPPLIER: $("#supplier").val(),//供应商
				MAKEDATE: $("#makeDate").datebox('getValue'),//设备制造日期
				BUYDATE: $("#buyDate").datebox('getValue'),//购买日期
				ASSETCODE: $("#assetCode").val(),//资产编号
				AOI_IP: $("#IP").val(),//aoi ip
				DBA_NAME: $("#dataName").val(),//数据库名
				LOGINNAME: $("#loginName").val(),//登录名
				ET_CD : $("#txtListCode").val(),//外键
				PWD : $("#pwd").val(),// 密码
				REMARKS:$('#remark').val(),//备注
				EQ_IP:$('#equipmentip').val(), //设备IP
				USE_YN:isUsed //是否采集
			}
			var reqData = {//设备列表iplant1.C_IPLANT_E2_T
				ET_CD : $("#txtListCode").val(), // 设备编码
				ET_NM : $("#txtListName").val(), // 设备名称
				ET_UT : $('#equipmentModel').val(), // 设备型号
				DICT_IT : cmbCheckType, // 设备类型
				ET_TT : produName,//产线名称
				ET_ST : eqState,//设备状态
				CRT_DT: $("#makeDate").datebox('getValue'),//设备制造日期
				ET_QT : station,//保养项目
				ROUT_CD: rout,//工位名称
				ET_PL:$('#eqpicture').val(), //设备图片
				USE_YN : isUsed
			}
			var optType = getOptType();
			if(optType==2){//查看状态
				$.messager.show({
					title:'提示信息',
					msg:'查看状态下无法编辑设备列表！',
					showType:'show',
					timeout:2000,
					style:{}
				});
				return;
			}
			// 新增
			if (optType == 0) {
				IFServerNo = 'T0000011', 
				$.extend(reqData, {
					CRT_ID : '',
					CRT_IP : '',
					IFS : IFServerNo
				});
			}
			// 修改
			else if (optType == 1) {
				/*if (!saveUpdateValidate()) {
					$.messager.alert("提示", '内容没有更新，请修改')
					return false;
				}*/
				IFServerNo = 'M000077', 
				reqData = $.extend(reqData, {
					CRT_ID : '',
					CRT_IP : '',
					IFS : IFServerNo
				});
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
						if(susMsg=='添加成功'){
							otype=1;
							allSun(reqData1,otype);
						}else if(susMsg=='更新成功'){
							otype=2;
							allSun(reqData1,otype);
						}
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
				$('#btncheck').click(function(){//查看
					checkDictItem();
				});
				$("input",$("#"+pageConfig.txtDictCode).next("span")).blur(function(){
				    var dictCode = $("#"+pageConfig.txtDictCode).val();
				    existDictItem(dictCode);
			    });
				//判断输入文字的长度
//				$("input", $("#" + pageConfig.txtDictCode).next("span")).keyup(function() {
//					checkInputLength('#' + pageConfig.txtDictCode, 20);
//				})
//
//				$("input", $("#" + pageConfig.txtDictName).next("span")).keyup(function() {
//					checkInputLength('#' + pageConfig.txtDictName, 50);
//				})
//
//                $("#" + pageConfig.dictRemark).textbox('textbox').bind("keyup", function() {
//					checkInputLength('#' + pageConfig.dictRemark, 200);
//				})
			});
		}
	}
	var dict = new dictItem();
	dict.init();

})();
