define(function(require,exports,module){
	var opttype=0;//操作类型：0表示新增，1表示更新
	/*引用所使用的类*/
	var webUtilityService=require('../../../../common/IplantCommon/WebUtility.js'); 
	var dataService=require('../../../../common/IplantCommon/DataUtility.js');
	 // 选中的物料分组编码
	var selectTreeNodeId='ALL',treeNodeId='',groupsid="",isminUpdate=false,ismaxUpdate=false,issafeUpdate=false,islifeUpdate=false,isgroupUpdate=false,isdefaultPackage=false;
	var controlTypes=[],comboData=[],minUnitNames=[],treeNodes=[],existParent=[],hasDataParent=[],comboDataLeft=[],stores=[],groups=[];
	
	$("#materialCodeAdd").textbox('textbox').attr('maxlength', 50);
	$("#materialNameAdd").textbox('textbox').attr('maxlength', 100);
	$("#defaultPackage").numberbox('textbox').attr('max', 99999);
	$("#defaultPackage").numberbox('textbox').attr('size', 8);
	$("#defaultPackage").numberbox('textbox').attr('precision', 0);
	$("#specificationModelAdd").textbox('textbox').attr('maxlength', 50);
	$("#sheefLifeAdd").numberbox('textbox').attr('max', 99999);
	$("#sheefLifeAdd").numberbox('textbox').attr('size', 8);
	$("#sheefLifeAdd").numberbox('textbox').attr('precision', 0);
	$("#maxStockAdd").numberbox('textbox').attr('max', 99999);
	$("#maxStockAdd").numberbox('textbox').attr('size', 8);
	$("#maxStockAdd").numberbox('textbox').attr('precision', 0);
	$("#minStockAdd").numberbox('textbox').attr('max', 99999);
	$("#minStockAdd").numberbox('textbox').attr('size', 8);
	$("#minStockAdd").numberbox('textbox').attr('precision', 0);
	$("#safeStockAdd").numberbox('textbox').attr('max', 99999);
	$("#safeStockAdd").numberbox('textbox').attr('size', 8);
	$("#safeStockAdd").numberbox('textbox').attr('precision', 0);
	$("#colorAdd").textbox('textbox').attr('maxlength', 50);
	$("#remark").textbox('textbox').attr('maxlength', 200);
	
	function initValue(){
		
		iplantAjaxRequest( {
			url: '/iPlant_ajax',
			data: {IFS:'WMS_B00124',STORE_TYPE_ID:'WSTORE-01'},
			successCallBack: function (data) {
				var rowCollection = createSourceObj(data);
				stores=[];
				stores.push({"id":'',"text":'全部'});
				for(var i=0; i<rowCollection.length;i++){
					stores.push({"id":rowCollection[i].STORE_ID,"text":rowCollection[i].STORE_NAME});
				};
				$("#recommendedWarehouseAdd").combobox({
		            data:stores,
		            valueField:"id",
		            textField: "text"
		        })	
			}
		});
		iplantAjaxRequest( {
			url: '/iPlant_ajax',
			data: {IFS:'WMS_B00134'},
			successCallBack: function (data) {
				var rowCollection = createSourceObj(data);
				existParent=[];
				var isSame=false;
				for(var i=0; i<rowCollection.length;i++){
					existParent.push(rowCollection[i].ST_P_CD);
				}
			}
		});
		iplantAjaxRequest( {
			url: '/iPlant_ajax',
			data: {IFS:'WMS_B00137'},
			successCallBack: function (data) {
				var rowCollection = createSourceObj(data);
				hasDataParent=[];
				var isSame=false;
				for(var i=0; i<rowCollection.length;i++){
					hasDataParent.push(rowCollection[i].ST_P_CD);
				}
			}
		});
		iplantAjaxRequest( {
			url: '/iPlant_ajax',
			data: {IFS:'WMS_B00094',DICT_CD:'WMLABEL'},
			successCallBack: function (data) {
				var rowCollection = createSourceObj(data);
				controlTypes=[];
				for(var i=0; i<rowCollection.length;i++){
					controlTypes.push({"id":rowCollection[i].DICT_IT,"text":rowCollection[i].DICT_IT_NM});
				};
				$("#controlTypeAdd").combobox({
		            data:controlTypes,
		            valueField:"id",
		            textField: "text"
		        })	
			}
		});
		iplantAjaxRequest( {
			url: '/iPlant_ajax',
			data: {IFS:'WMS_B000010',UNIT_TYPE:'WUNIT-01'},
			successCallBack: function (data) {
				var rowCollection = createSourceObj(data);
				minUnitNames=[];
				for(var i=0; i<rowCollection.length;i++){
					minUnitNames.push({"id":rowCollection[i].UNIT_ID,"text":rowCollection[i].UNIT_NAME});
				};
				$("#minUnitNameAdd").combobox({
		            data:minUnitNames,
		            valueField:"id",
		            textField: "text"
		        })	
			}
		});
		iplantAjaxRequest( {
			url: '/iPlant_ajax',
			data: {IFS:'WMS_B00135'},
			successCallBack: function (data) {
				var rowCollection = createSourceObj(data);
				treeNodes=[];
				for(var i=0; i<rowCollection.length;i++){
					treeNodes.push({"id":rowCollection[i].ST_C_CD,"text":rowCollection[i].ST_C_NM});
				}
				initMaterialGroupMenu();
			}
		});
		$('#halogen').combobox({
            data:[{"id":"","text":"不含卤"},{"id":"含卤","text":"含卤"}],
            valueField:"id",
            textField: "text"
        });
	}
	/**
	 * 查询节点下是否有物料信息
	 */
	function queryExistMaterial(selectID){
		iplantAjaxRequest( {
			url: '/iPlant_ajax',
			data: {IFS:'WMS_B00116',GRP_ID:selectID},
			successCallBack: function (data) {
				var rowCollection = createSourceObj(data);
				if(rowCollection.length==0){ return false; } else { return true;}
			}
		});
	}
	
	function initComboData(){
		comboData=[];
		var hasSame=false;
		for(var c=0;c<treeNodes.length;c++){
			hasSame=false;
			for(var d=0;d<existParent.length;d++){
				if(treeNodes[c].id==existParent[d]){ hasSame=true;}
			}
			if(!hasSame){
				comboData.push(treeNodes[c]);
			}
		};
	}
	
	function initComboDataLeft(){
		comboDataLeft=[];
		var hasSame=false;
		for(var e=0;e<treeNodes.length;e++){
			hasSame=false;
			for(var f=0;f<hasDataParent.length;f++){
				if(treeNodes[e].id==hasDataParent[f]){
					hasSame=true;
				}
			}
			if(!hasSame){
				comboDataLeft.push(treeNodes[e]);
			}
		};
		console.log(comboDataLeft);
	}
	
	 /**
  	 * ImportStation  SMT导入提交
  	 * importFile 验证文件是否为空
  	 * @param tabName
  	 */
      /*导入*/
//	OpenImprotFramedr= function(){
//  		$("#enditTabupload").dialog("open").dialog('setTitle', '物料信息导入');
//  	}
  	ImportStation=function(){
  		 document.getElementById("importUplod").submit();
  	}
  	/* 同步物料信息	 */
  	SavesynchroMaterial = function() {
		var factory=$('#factory').combobox('getValue');
		syncMaterial("MATERIAL",factory);
		$("#synchroMaterialDialog").dialog("close");
		getMaterialDataBySearch();
	}
  	importFile=function(){
  		var customParams={
  			fileID:'txtPHOTO',
  			msgID:'showFileName',
  			importType:'Material'
  		}
  		CheckImportFile(customParams);    
     }
	
	/* 左边物料分组树形结构*/
	function initLeftMenu(){
		var reqData = {
			IFS : 'WMS_B00112'
		}
		dataService.reqTreeData(reqData,bindTreeData);
	}
	/* 新增物料时，物料分组树形结构*/
	function initMaterialGroupMenu(){
		initComboData();
		bindMaterialCombotree(comboData);
		$('#parentGroup').combotree('setValue', comboData[0].id);
		/*var reqData = {
			IFS : 'WMS_B00112'
		}
		dataService.reqComboTreeData(reqData,bindMaterialCombotree);*/
	}
	/* 新增物料分组树形选择框*/
	function initSelectMenu() {
		initComboDataLeft();
		bindCombotree(comboDataLeft);
		/*var reqData = {
			IFS : 'WMS_B00135'
		}
		dataService.reqComboTreeData(reqData,bindCombotree);*/
	}
	/*树形节点*/
	function bindTreeData(jsonData) { 
		groups=jsonData["children"];
		console.log(jsonData);
		var treeConfig = {
			name : 'materialGrouptree',
			method : 'get',
			parentField : "sT_P_CD	",
			textFiled : "sT_C_NM",
			idFiled : "sT_C_CD",
			data : jsonData,
			onClick : function(node) {
				selectTreeNodeId = node.id;
				//获得当前选中节点
				var nodes = $('#materialGrouptree').tree('getSelected'); 
				//获得当前选中子节点
				 var children = $('#materialGrouptree').tree('getChildren', nodes.target);
				 //如果没有子节点  赋值
				 if (children.length == 0){
					 treeNodeId = node.id;
				 }
				$('#materialList').datagrid('options').pageNumber = 1;
				getMaterialDataBySearch();
			},
			onDblClick:function(node) {
				selectTreeNodeId = node.id;
				$('#materialList').datagrid('options').pageNumber = 1;
				$("#addMaterialGroupDialog").dialog("open").dialog('setTitle', '物料分组信息');
				$('#groupCODE').textbox("setValue",node.sT_C_CD);
				$('#groupCODE').textbox('textbox').attr('disabled', true);
				$('#groupName').textbox("setValue",node.sT_C_NM);
				$('#groupName').textbox('textbox').attr('disabled', true);
				$('#parentGroup').combotree({disabled:true});
				$('#parentGroup').combotree("setValue",node.sT_P_CD);
			}
		}
		dataService.initTree(treeConfig);
		$('#materialGrouptree').tree(treeConfig);
	}
	/*上级分组树形选择框*/
	function bindCombotree(jsonData) { 
		/*$('#materialGroupAdd').combotree({
            data: jsonData
        });*/
		$('#parentGroup').combotree({ disabled:false });
		$('#parentGroup').combotree({ data: jsonData });
		//$('#parentGroup').combotree('setValue', { id: 'N/A', text: '无' });  
	}
	/*上级分组树形选择框*/
	function bindMaterialCombotree(jsonData) { 
		$('#materialGroupAdd').combotree({ data: jsonData });
	}
	/*清除物料分组弹出框表单数据*/
	function setMaterialGroupDataNull() {
          $('#groupCODE').textbox('setValue','');
          $('#groupName').textbox('setValue','');
	}
	/*清除物料分组弹出框表单数据*/
	function setMaterialGroupDataNullother() {
          $('#groupCODE').textbox('setValue','');
          $('#groupName').textbox('setValue','');
          $('#addMaterialGroupDialog').dialog('close');
	}
	/*	清除物料信息弹出框表单数据	*/
	function setMaterialDataNull() {
		$('#materialCodeAdd').textbox('setValue','');
        $('#materialNameAdd').textbox('setValue','');
        $('#materialGroupAdd').combotree('setValue',treeNodes[0].id);  
        $('#minUnitNameAdd').combobox('setValue',minUnitNames[0].id);  
//        $(this).combobox("select", val[0][item]); 
        $('#controlTypeAdd').combobox('setValue','WMLABEL-02');  
        $('#sheefLifeAdd').textbox('setValue','');  
        $('#maxStockAdd').textbox('setValue','');  
        $('#minStockAdd').textbox('setValue','');  
        $('#safeStockAdd').textbox('setValue','');  
        $('#recommendedWarehouseAdd').combobox('setValue',stores[0].id);  
        $('#specificationModelAdd').textbox('setValue','');  
        $('#colorAdd').textbox('setValue','');  
        $('#remark').textbox('setValue','');  
	}
	/*新增物料分组时，必填项空值验证*/
   function checkMaterialGroupForm() {
	   var pass = true; 
	   var groupCODE =$('#groupCODE').textbox('getValue');
	   var groupName =$('#groupName').textbox('getValue');
	   if(groupCODE== ''){
		   $('#messageInfo').html("<font color=red>提示:必填项不能为空</font>");
		   pass = false; 
		   return pass;
	   }
	   if(groupName== ''){
		   $('#messageInfo').html("<font color=red>提示:必填项不能为空</font>");
		   pass = false; 
		   return pass;
	   }
	   return pass;
 	}
   /*新增物料时，必填项空值验证*/
   function checkMaterialForm() {
	   var pass = true; 
	   var materialCode =$('#materialCodeAdd').textbox('getValue');
	   var materialName =$('#materialNameAdd').textbox('getValue');
	   if(materialCode== ''){
		   $('#messageInfo').html("<font color=red>提示:必填项不能为空</font>");
		   pass = false; 
		   return pass;
	   }
	   if(materialName== ''){
		   $('#messageInfo').html("<font color=red>提示:必填项不能为空</font>");
		   pass = false; 
		   return pass;
	   }
	   return pass;
   }
   function testGroupTrue(isUpdate,testName,testData,msg){
		if(isUpdate){
			return false;
		}else if(testData!=""){
			 if(/^[A-Za-z0-9_]{0,20}$/.test(testData)){
				$("#messageInfo").html("<font color='red'>提示:  "+msg+"不能输入中文和非法字符!");
	      		$('#'+testName).textbox('setValue',"");
	      		return false;
			}
		}
		return true;
	}
	/*	保存方法，保存新增的物料分组	*/
	function saveMaterialGroup() {
        if (!checkMaterialGroupForm())
			return;
	    var groupCODE =$('#groupCODE').textbox('getValue');
	    var groupName =$('#groupName').textbox('getValue');
	    if(!testDataTrue(isgroupUpdate,"groupCODE",groupCODE,"物料分组编码"))return;
	    var parentGroup =$('#parentGroup').combobox('getValue')==null||$('#parentGroup').combobox('getValue')==""?"N/A":$('#parentGroup').combobox('getValue');
	    IFServerNo = 'WMS_B00114';
	    var reqData={GROUP_CODE: groupCODE,GROUP_NAME: groupName,PARENT_CODE: parentGroup,IFS:IFServerNo};
	    var susMsg='',errorMsg='';
    	susMsg='新增成功';
    	errorMsg='新增失败,请联系管理员';
	    var ajaxParam = {
           dataType: 'JSON',
           data: reqData
	    };
	    dataService.sendAjaxRequest(ajaxParam,function(data) {
			var susMsg=dataService.getReturnMsg(data);
        	$('#addMaterialGroupDialog').dialog('close');
        	commonShowMessage(susMsg);
			initLeftMenu();
			initValue();
		},
		function() {
			commonShowMessage(errorMsg);
		});
	    initValue();
		$("#addMaterialGroupDialog").dialog("close");
    }
	/**更新前检查物料信息中基础信息内容是否有修改*/
	function saveUpdateValidateBasicChange() {
		var checkedItems = $('#materialList').datagrid('getSelections');
		row = checkedItems[0];
		if (row.MATERIAL_ID){
			if($('#materialNameAdd').textbox('getValue') != (row.MATERIAL_NAME==null?'':row.MATERIAL_NAME)){
				return true;
			}
			if($('#materialGroupAdd').combotree('getValue') != (row.GRP_ID==null?'':row.GRP_ID)){
				return true;
			}
			if($('#minUnitNameAdd').combobox('getValue') != (row.UNIT_ID==null?'':row.UNIT_ID)){
				return true;
			}
			if($('#controlTypeAdd').combobox('getValue') != (row.LABEL_TYPE==null?'':row.LABEL_TYPE)){
				return true;
			}
			if($('#sheefLifeAdd').textbox('getValue') != (row.EXPIRATION_DT==null?'':row.EXPIRATION_DT)){
				return true;
			}
			if($('#maxStockAdd').textbox('getValue') != (row.MAX_STOCK==null?'':row.MAX_STOCK)){
				return true;
			}
			if($('#minStockAdd').textbox('getValue') != (row.MIN_STOCK==null?'':row.MIN_STOCK)){
				return true;
			}
			if($('#safeStockAdd').textbox('getValue') != (row.SAFTY_STOCK==null?'':row.SAFTY_STOCK)){
				return true;
			}
			if($('#recommendedWarehouseAdd').textbox('getValue') != (row.STORE_ID==null?'':row.STORE_ID)){
				return true;
			}
			if($('#specificationModelAdd').textbox('getValue') != (row.SPEC_MODEL==null?'':row.SPEC_MODEL)){
				return true;
			}
			if($('#colorAdd').textbox('getValue') != (row.COLOR==null?'':row.COLOR)){
				return true;
			}
			if($('#remark').textbox('getValue') != (row.MEMO==null?'':row.MEMO)){
				return true;
			}
			return false;
		}
	}
	/**更新前检查物料信息中扩展信息内容是否有修改*/
	function saveUpdateValidateExtendChange() {
		var checkedItems = $('#materialList').datagrid('getSelections');
		row = checkedItems[0];
	}
	
	function testDataTrue(isUpdate,testName,testData,msg){
		if(isUpdate){
			return false;
		}else if(testData!=""){
			 if(/[\u4E00-\u9FA5]/i.test(testData)){
				$("#messageInfo").html("<font color='red'>提示:  "+msg+"只能输入数字!");
	      		$('#'+testName).textbox('setValue',"");
	      		return false;
			}
		}
		return true;
	}
	/* 初始化工厂信息  */
	selectFactory = function(){
    	var refactory = {
            url: "/iPlant_ajax",
            dataType: "JSON",
            data: {IFS: "B000021"},
            successCallBack: function(a) {
            	datafactory = [];
            	//datafactory.push({"value":"","text":"全部"});
            	var op = a.RESPONSE[0].RESPONSE_DATA;
                $.each(op,function(n,obj) {
                	datafactory.push({'value':obj.FT_CD,'text':obj.FT_NM});
			    }); 
                var factory = $("#factory");
                factory.combobox('loadData',datafactory);
                if(datafactory.length>7){
                	factory.combobox({panelHeight:200});;
				}else{
					factory.combobox({panelHeight:'auto'});;
				}
                if(datafactory.length>0){
                	factory.combobox('select',datafactory[0].value);
                }
            },
            errorCallBack: function() {
            	commonShowMessage("提示：请联系管理员，查询失败！");
            }
        };
	    iplantAjaxRequest(refactory);
	}
	/* 保存方法，保存新增的物料信息  */
	function saveMaterial() {
		if (!checkMaterialForm())
			return;
		var materialCode =$('#materialCodeAdd').textbox('getValue');
		var materialName =$('#materialNameAdd').textbox('getValue');
		var defaultPackage =$('#defaultPackage').textbox('getValue');
	    var halogen=$("#halogen").combobox("getValue");
	    var materialGroup=$("#materialGroupAdd").combobox("getValue");
	    var minUnitName =$("#minUnitNameAdd").combobox("getValue");
	    var controlType =$("#controlTypeAdd").combobox("getValue");
	    var sheefLife =$('#sheefLifeAdd').textbox('getValue');
	    var maxStock =$('#maxStockAdd').textbox('getValue');		
	    var minStock =$('#minStockAdd').textbox('getValue');
	    var safeStock =$('#safeStockAdd').textbox('getValue');
	    var recommendedWarehouse =$('#recommendedWarehouseAdd').textbox('getValue');
	    var specificationModel =$('#specificationModelAdd').textbox('getValue');
	    var color =$('#colorAdd').textbox('getValue');
	    var remark =$('#remark').textbox('getValue');
	    if(!testDataTrue(islifeUpdate,"sheefLifeAdd",sheefLife,"保质期"))return;
	    if(!testDataTrue(ismaxUpdate,"maxStockAdd",maxStock,"最大库存"))return;
	    if(!testDataTrue(isminUpdate,"minStockAdd",minStock,"最小库存"))return;
	    if(!testDataTrue(issafeUpdate,"safeStockAdd",safeStock,"安全库存"))return;
		
	    if (opttype == 0) {		//	新增物料信息
			IFServerNo = 'WMS_B00117';
		}else{					//	修改物料信息
			if (!saveUpdateValidateBasicChange()) {
				$('#messageInfo').html("<font color=red>提示:内容没有更新，请修改</font>");
				return false;
			}
			IFServerNo = 'WMS_B00119';
		} 
	    var reqData={MATERIAL_ID: materialCode,MATERIAL_NAME: materialName,GRP_ID: materialGroup,UNIT_ID: minUnitName,
	    		LABEL_TYPE: controlType,MAX_STOCK: maxStock,MIN_STOCK:minStock,SAFTY_STOCK: safeStock,STORE_ID: recommendedWarehouse,
	    		EXPIRATION_DT: sheefLife,SPEC_MODEL: specificationModel,COLOR: color,MEMO: remark,DEFAULT_PACKAGE:defaultPackage,HALOGEN:halogen,IFS:IFServerNo};
	    var susMsg='',errorMsg='';
	    if (opttype == 0) {
			susMsg = '新增成功';
			errorMsg = '新增失败,请联系管理员';
		} else {
			susMsg = '更新成功';
			errorMsg = '更新失败,请联系管理员';
		}
	    var ajaxParam = {
           dataType: 'JSON',
           data: reqData
	    };
    	dataService.sendAjaxRequest(ajaxParam,function(data) {
    		initMaterialGridData();
    		commonShowMessage(susMsg);
    	},function() {
    		commonShowMessage(errorMsg);
    	    return false;
    		});
		$("#addMaterialDialog").dialog("close");
	}
    /* 新增物料分组信息弹出框 */
	function addMaterialGroup() {
		$('#messageInfo').html("");
		$("#addMaterialGroupDialog").dialog("open").dialog('setTitle', '物料分组新增');
		$('#groupCODE').textbox('textbox').attr('disabled', false);
		$('#groupName').textbox('textbox').attr('disabled', false);
		$('#parentGroup').combotree({disabled:false});
		$('#parentGroup').combotree("setValue",selectTreeNodeId);
	}
	 /* 新增物料信息弹出框	 */
	function addMaterial() {
		$("#addMaterialDialog").dialog("open").dialog('setTitle', '物料信息新增'),
		$('#materialCodeAdd').textbox('textbox').attr('disabled', false),
		$('#messageInfo').html("");
		if(treeNodeId!=''){
			var materialGroupAdd = $("#materialGroupAdd");
			$('#materialGroupAdd').combotree('setValue', treeNodeId);
		}
		opttype=0;
	}
	/* 同步物料信息弹出框	 */
	function synchroMaterial() {
		$("#synchroMaterialDialog").dialog("open").dialog('setTitle', '同步物料信息');
		selectFactory();
	}
	
	/* 物料信息列表 */
	function bindMaterialGridData(reqData, jsonData) {
		var grid = {
			name : 'materialList',
			dataType : 'json',
			columns : [[
			    {field:'GRP_NAME',title:'物料分组',width:100,align:'center',formatter:function(value) {if (value != null) return "<span title='" + value+ "'>" + value + "</span>";}}, 
			    {field:'MATERIAL_ID',title:'物料编码',width:250,align:'center',formatter:function(value) {if (value != null) return "<span title='" + value+ "'>" + value + "</span>";}},
			    {field:'MATERIAL_NAME',title:'物料名称',width:200,align:'center',formatter:function(value) {if (value != null) return "<span title='" + value+ "'>" + value + "</span>";}},
			    {field:'DEFAULT_PACKAGE',title:'默认包装',width:80,align:'center',formatter:function(value) {if (value != null) return "<span title='" + value+ "'>" + value + "</span>";}},
			    {field:'HALOGEN',title:'含卤',width:80,align:'center',formatter:function(value) {if (value != null) return "<span title='" + value+ "'>" + value + "</span>";}},
			    {field:'UNIT_NAME',title:'单位',width:80,align:'center',formatter:function(value) {if (value != null) return "<span title='" + value+ "'>" + value + "</span>";}},
			    {field:'DICT_IT_NM',title:'管控类型',width:100,align:'center',formatter:function(value) {if (value != null) return "<span title='" + value+ "'>" + value + "</span>";}},
			    {field:'MAX_STOCK',title:'最大库存',width:100,align:'center',formatter:function(value) {if (value != null) return "<span title='" + value+ "'>" + value + "</span>";}},
			    {field:'MIN_STOCK',title:'最低库存',width:100,align:'center',formatter:function(value) {if (value != null) return "<span title='" + value+ "'>" + value + "</span>";}},
			    {field:'SAFTY_STOCK',title:'安全库存',width:100,align:'center',formatter:function(value) {if (value != null) return "<span title='" + value+ "'>" + value + "</span>";}},
			    {field:'CHANGE_ID',title:'转换编码',width:200,align:'center',formatter:function(value) {if (value != null) return "<span title='" + value+ "'>" + value + "</span>";}},
			    {field:'CHANGE_NAME',title:'转换简称',width:100,align:'center',formatter:function(value) {if (value != null) return "<span title='" + value+ "'>" + value + "</span>";}},
			    {field:'STORE_ID',title:'推荐仓库',width:100,align:'center',formatter:function(value) {if (value != null) return "<span title='" + value+ "'>" + value + "</span>";}},
			    {field:'EXPIRATION_DT',title:'保质期',width:100,align:'center',formatter:function(value) {if (value != null) return "<span title='" + value+ "'>" + value + "</span>";}},
			    {field:'SPEC_MODEL',title:'规格型号',width:140,align:'center',formatter:function(value) {if (value != null) return "<span title='" + value+ "'>" + value + "</span>";}},
			    {field:'COLOR',title:'颜色',width:130,align:'center',formatter:function(value) {if (value != null) return "<span title='" + value+ "'>" + value + "</span>";}},
			    {field:'MEMO',title:'备注',width:200,align:'center',formatter:function(value) {if (value != null) return "<span title='" + value+ "'>" + value + "</span>";}},
			    {field:'CRT_ID',title:'创建人',width:130,align:'center',formatter:function(value) {if (value != null) return "<span title='" + value+ "'>" + value + "</span>";}},
			    {field:'CRT_DT',title:'创建时间',width:210,align:'center',formatter:function(value) {if (value != null) return "<span title='" + value+ "'>" + value + "</span>";}},
			    {field:'UPT_ID',title:'修改人',width:130,align:'center',formatter:function(value) {if (value != null) return "<span title='" + value+ "'>" + value + "</span>";}},
			    {field:'UPT_DT',title:'修改时间',width:210,align:'center',formatter:function(value) {if (value != null) return "<span title='" + value+ "'>" + value + "</span>";}}
			]],
            onDblClickRow: function(index, row) {
            	isminUpdate=false;
        		ismaxUpdate=false;
        		issafeUpdate=false;
        		islifeUpdate=false;
        		$("#messageInfo").html("");
        		updateMaterial();
            },
		}
		dataService.initGridView(reqData, grid);
		$('#materialList').datagrid('loadData', jsonData);
	}
	function initMaterialGridData() {
		getMaterialDataBySearch();
	}
	/**置空查询输入框**/
	function setQueryNull() {
		selectTreeNodeId="",
    	$('#materialCode').textbox('setValue',""),
	    $('#materialName').textbox('setValue',"");
    }
	function setDataNull() {
		$('#materialCodeAdd').textbox('setValue',""),
		$('#materialNameAdd').textbox('setValue',""),
		$('#defaultPackage').textbox('setValue',""),
		$('#sheefLifeAdd').textbox('setValue',""),
		$('#maxStockAdd').textbox('setValue',""),
		$('#minStockAdd').textbox('setValue',""),
		$('#safeStockAdd').textbox('setValue',""),
		$('#specificationModelAdd').textbox('setValue',""),
		$('#colorAdd').textbox('setValue',""),
		$('#remark').textbox('setValue',"");
		$("#addMaterialDialog").dialog("close");
    }
	/**根据条件查询物料信息**/
	function getMaterialDataBySearch(){
		/*查询子节点*/
		var dgrid = $('#materialList').datagrid('options');
		if(!dgrid) return;
		var reqData={};
		var materialCode = $('#materialCode').val();
		var materialName = $('#materialName').val();
		reqData = {
			MATERIAL_ID: materialCode,
			MATERIAL_NAME: materialName,
			GRP_ID:selectTreeNodeId,
			IFS: 'WMS_B00116',
			pageIndex: dgrid.pageNumber,
			pageSize: dgrid.pageSize
		}
		dataService.reqGridData('materialList', reqData,bindMaterialGridData);
	}
	/* 更新物料信息 */
	function updateMaterial() {
		var checkedItems = $('#materialList').datagrid('getSelections');
		$('#messageInfo').html("");
		var moveIds = [];
		var num = 0;
		$.each(checkedItems, function(index, item) {
			moveIds.push(item.moveid);
			num++;
		});
		if (num != 1) {
			commonShowMessage("请选择一条数据进行修改!");
			return false;
		}
		var row = $("#materialList").datagrid("getSelected");
		if (row) {
			$("#addMaterialDialog").dialog("open").dialog('setTitle', '物料信息修改');
			opttype = 1;
			$('#materialCodeAdd').textbox('textbox').attr('disabled', true);
			$('#materialCodeAdd').textbox('setValue', row.MATERIAL_ID==null?'':row.MATERIAL_ID);
			$('#materialNameAdd').textbox('setValue', row.MATERIAL_NAME==null?'':row.MATERIAL_NAME);
			$('#defaultPackage').textbox('setValue', row.DEFAULT_PACKAGE==null?'':row.DEFAULT_PACKAGE);
			$('#materialGroupAdd').combotree('setValue', { id: row.GRP_ID==null?'N/A':row.GRP_ID, text: row.GRP_NAME==null?'无':row.GRP_NAME });
			$('#minUnitNameAdd').combobox('setValue',row.UNIT_ID==null?'':row.UNIT_ID);
			$('#halogen').combobox('setValue',row.HALOGEN==null?'':row.HALOGEN);
			$('#controlTypeAdd').combobox('setValue',row.LABEL_TYPE==null?'':row.LABEL_TYPE);
			$('#sheefLifeAdd').textbox('setValue',row.EXPIRATION_DT==null?'':row.EXPIRATION_DT);
			$('#maxStockAdd').textbox('setValue',row.MAX_STOCK==null?'':row.MAX_STOCK);
			$('#minStockAdd').textbox('setValue',row.MIN_STOCK==null?'':row.MIN_STOCK);
			$('#safeStockAdd').textbox('setValue', row.SAFTY_STOCK==null?'':row.SAFTY_STOCK);
			$('#recommendedWarehouseAdd').combobox('setValue', row.STORE_ID==null?'':row.STORE_ID);
			$('#specificationModelAdd').textbox('setValue', row.SPEC_MODEL==null?'':row.SPEC_MODEL);
			$('#colorAdd').textbox('setValue', row.COLOR==null?'':row.COLOR);
			$('#remark').textbox('setValue', row.MEMO==null?'':row.MEMO);
		}
	}
	/**
	 * 判断节点下是否有数据
	 */
	function hasTreeNodeData(){
		var ajaxParamExist = {
			dataType : 'JSON',
			data : {IFS : 'WMS_B00121',GRP_ID : selectTreeNodeId}
		};
		dataService.sendAjaxRequest(ajaxParamExist,function(data) {
			if (data.RESPONSE["0"].RESPONSE_DATA.length >0) {
				commonShowMessage('该节点下有数据关联，不能作为父节点！');
				return; 
			}else{
				initSelectMenu();
				addMaterialGroup();
				setMaterialGroupDataNull(); 
			}
		});
	}
	/**
	 * FUN 插入一个新的空白行
	 * @param tabName 要插入的dataGrid对象的id
	 * @param data json对象，如果没有初始化的数据可以直接放空{}
	 * */
	function insertDataGrid(tabName,data){
		var editorDataGrid = $('#'+tabName), row = editorDataGrid.datagrid('getSelected');
		if (row){
			var index = editorDataGrid.datagrid('getRowIndex', row);
		} else {
			index = 0,editIndex = 0;
		}
		editorDataGrid.datagrid('insertRow', {
			index: index,row:data
		});
	}
	/**
	 * FUN 批量新增和修改的保存
	 * @param tabName dataGrid的名字
	 * @param insertIfs 新增的ifs
	 * @param updateIfs 更新的ifs
	 * @param messageId 提示信息的对象的id
	 */
	function saveDataGrid(tabName,insertIfs,updateIfs,messageId){
    	var edDataGrid = $('#'+tabName);
    	//判断后变更数据
    	if (edDataGrid.datagrid('getChanges').length) {
            var inserted = edDataGrid.datagrid('getChanges', "inserted");  
            var updated = edDataGrid.datagrid('getChanges', "updated");
            var deleted = edDataGrid.datagrid('getChanges', "deleted");
            /**装载数据*/
            var arrInsert = new Array(),arrUpdate = new Array(),arrDeleted = new Array();
            if(inserted.length>0){
            	for(var m=0;m<inserted.length;m++){
            		if(inserted[m].IC_CODE=='' || inserted[m].IC_CODE==undefined){
            			inserted[m].IC_CODE=$('#materialCodeAdd').val();
            		}
            		arrInsert.push($.extend(inserted[m],{MATERIAL_CODE:$('#materialCodeAdd').val()}));
            	}
            	//批量先增
                var ajaxInsert = {
                    dataType: 'JSON',
                    data: {list: arrInsert,IFS: insertIfs},
                    successCallBack: function (data) {return 1;},
                    errorCallBack: function (data) {return 0;}
                };
                dataService.sendAjaxRequest(ajaxInsert,ajaxInsert.successCallBack,ajaxInsert.errorCallBack);
            }
            if(updated.length>0){
            	for(var m=0;m<updated.length;m++){
            		if(updated[m].edited){
            			arrUpdate.push(updated[m]);
            		}
            	}
            	//批量修改
                var ajaxUpdate = {
                    dataType: 'JSON',
                    data: {list: arrUpdate,IFS: updateIfs},
                    successCallBack: function (data) { return 1; },
                    errorCallBack: function (data) { return 0; }
                };
                dataService.sendAjaxRequest(ajaxUpdate,ajaxUpdate.successCallBack,ajaxUpdate.errorCallBack);
            }
            if(deleted.length>0){
            	for(var m=0;m<deleted.length;m++){
            		//批量删除
                    var ajaxUpdate = {
                        dataType: 'JSON',
                        data: { MATERIAL_CODE: $('#materialCodeAdd').val(),IC_CODE: deleted[m].IC_CODE,STENCIL_CODE: deleted[m].STENCIL_CODE,IFS: 'WMS_B00123' },
                        successCallBack: function (data) {},
                        errorCallBack: function (data) { return 0;}
                    };
                    dataService.sendAjaxRequest(ajaxUpdate,ajaxUpdate.successCallBack,ajaxUpdate.errorCallBack);
            	}
            	return 1;
            }
        }else{
        	return 2;
        }
	}
	/**
	 * 库存数据比较
	 */
	function dataCompare(max,min,safe,kucunName){
		if(max==""&& min==""||min==""&&safe==""||max==""&&safe==""){
			$("#messageInfo").html("");
			return false;
		}else if(max==""){
			if (parseInt(safe)<parseInt(min)) {
				$("#messageInfo").html("<font color='red'>提示:  安全库存不能小于最小库存!"),$('#'+kucunName).textbox('setValue',"");
				return false;
			}else {
				$("#messageInfo").html("");
				return true;
			}
		}else if (min=="") {
			if(parseInt(max)<parseInt(safe)){
				$("#messageInfo").html("<font color='red'>提示:  最大库存不能小于安全库存!"),$('#'+kucunName).textbox('setValue',"");
				return false;
			}else {
				$("#messageInfo").html("");
				return true;
			}
		}else if (safe=="") {
			if(parseInt(max)<parseInt(min)){
				$("#messageInfo").html("<font color='red'>提示:  最大库存不能小于最小库存!"),$('#'+kucunName).textbox('setValue',"");
	      		return false;
			}else {
				$("#messageInfo").html("");
				return true;
			}
		}else {
			if(parseInt(max)<parseInt(min)){
				$("#messageInfo").html("<font color='red'>提示:  最大库存不能小于最小库存!"),$('#'+kucunName).textbox('setValue',"");
				return false;
			}else if(parseInt(max)<parseInt(safe)){
				$("#messageInfo").html("<font color='red'>提示:  最大库存不能小于安全库存!"),$('#'+kucunName).textbox('setValue',"");
				return false;
			}else if (parseInt(safe)<parseInt(min)) {
				$("#messageInfo").html("<font color='red'>提示:  安全库存不能小于最小库存!"),$('#'+kucunName).textbox('setValue',"");
				return false;
			}else {
				$("#messageInfo").html("");
				return true;
			}
		}
	}
	/**
	 * 功能： 表格中数据是否进行了变更
	 * @param tabName dataGrid的名字
	 * 返回结果：0表示未变更，1表示变更
	 */
	function getDataGridChange(tabName){
    	var edDataGrid = $('#'+tabName);
    	if (edDataGrid.datagrid('getChanges').length) { return 1; }else{ return 0; }
	}
	/*新增物料分组弹出框*/
	$('#btnAddMaterialGroup').click(function() {
		if(selectTreeNodeId==""){
			initSelectMenu();
			addMaterialGroup();
			setMaterialGroupDataNull(); 
		}else {
			hasTreeNodeData();
		}
	})
	/*新增物料弹出框*/
	$('#btnAdd').click(function() {
		setMaterialDataNull();
		isminUpdate = false,ismaxUpdate = false,issafeUpdate = false,islifeUpdate = false,$("#messageInfo").html("");
		addMaterial();
	}),
	/*修改物料弹出框*/
	$('#btnUpdate').click(function() {
		isminUpdate = false,ismaxUpdate = false,issafeUpdate = false,islifeUpdate = false,$("#messageInfo").html("");
		updateMaterial();
	}),
	/*删除物料信息*/
	$('#btnDelete').click(function(){
		var isSelectedData = webUtilityService.validSelectedData('#materialList','Delete');
		if (!isSelectedData) {
			commonShowMessage('请选择一条数据进行删除!');
			return false;
		}
		var checkedItems = $('#materialList').datagrid('getSelections');
		// 确认提示框
		$.messager.confirm('确认框','您确定要删除您所选择的数据?',function(r){
			if (r == true) {
				$.each(checkedItems,function(index,item) {//删除物料信息
		    		dd={
		    			dataType : 'JSON',
						data:{MATERIAL_ID: item.MATERIAL_ID,IFS : 'WMS_B00120' }
		    		};
		    		dataService.sendAjaxRequest(dd,function(data){
		    			$('#materialList').datagrid('options').pageNumber = 1;
		    			initMaterialGridData();
			    		if (data.RESPONSE["0"].RESPONSE_HDR.MSG_CODE != '0'){
			    			commonShowMessage('删除成功');
			    			return false;
						}
		    		});
				});
				commonShowMessage('删除成功');//	删除成功
	         }
	   });
    }),
    $('#btnSync').click(function() {
    	synchroMaterial();
		//syncMaterial("MATERIAL");
	}),
	/*删除分组类别*/
	$('#btnDeleteMaterialGroup').click(function() {
		if (!selectTreeNodeId) {
			commonShowMessage('请选择一个物料分组进行删除!');
			return false;
		}
		iplantAjaxRequest( {
			url: '/iPlant_ajax',
			data: {IFS:'WMS_B00116',GRP_ID:selectTreeNodeId},
			successCallBack: function (data) {
				var rowCollection = createSourceObj(data);
				if(rowCollection.length!=0){
					commonShowMessage('此节点下存在物料信息，不能删除！');
					return false;
				} else {
					$.messager.confirm('确认框','您确定要删除您所选择的物料分组?',function(r){
						if (r == true) {
							var ajaxParamExist = {
								dataType : 'JSON',
								data : {IFS : 'WMS_B00113',PARENT_CODE : selectTreeNodeId}
							};
							dataService.sendAjaxRequest(ajaxParamExist,function(data) {
								if (data.RESPONSE["0"].RESPONSE_DATA.length >0) {
									commonShowMessage('该组有下级分组，请先删除下级分组!');
									return false; 
								}else{
									var ajaxParam = {
										dataType : 'JSON',
										data : {IFS : 'WMS_B00115',GROUP_CODE : selectTreeNodeId}
									};
									dataService.sendAjaxRequest(ajaxParam,function(data) {
										if (data.RESPONSE["0"].RESPONSE_HDR.MSG_CODE == '0') {
											commonShowMessage('删除成功!');
										}else{
											commonShowMessage("删除失败!");
										}
										initLeftMenu();
									});
								}
							});
				         }
				   });
				}
			}
		});
	})
	/*物料重复性校验*/
	$("input",$("#materialCodeAdd").next("span")).blur(function(){
		var inputData={title:"物料编码",ifs:'WMS_B00116',MATERIAL_P_ID:$('#materialCodeAdd').val(),inputCodeId:'materialCodeAdd',showcode:'messageInfo',acceptMsgId:'editMessageInfo',optType:opttype};
		webUtilityService.checkDataIdentity(inputData);
	});
	$("input",$("#defaultPackage").next("span")).blur(function(){
		var defaultPackage = $("#defaultPackage");
	    if(defaultPackage.textbox('getValue') != ""){
	    	if(/[\u4E00-\u9FA5]/i.test(defaultPackage.textbox('getValue'))){
				isdefaultPackage=true,defaultPackage.textbox('setValue',"");
				$("#messageInfo").html("<font color='red'>提示: 默认包装只能输入数字!");
	            return false;
			}else{
				isdefaultPackage=false,$("#messageInfo").html("");
				return true;
			}
	    }	
	});
	//对保质期进行验证
	$("input",$("#sheefLifeAdd").next("span")).blur(function(){
		var sheefLifeAdd=$("#sheefLifeAdd").textbox('getValue');
	    if(sheefLifeAdd != ""){
	    	if(/[\u4E00-\u9FA5]/i.test(sheefLifeAdd)){
	    		islifeUpdate = true,$('#sheefLifeAdd').textbox('setValue',"");
	    		$("#messageInfo").html("<font color='red'>提示:  保质期只能输入数字!");
              	return false;
			}else{
				islifeUpdate = false,$("#messageInfo").html("");
				return true;
			}
		 }	
    });
	$("input",$("#maxStockAdd").next("span")).blur(function(){
		var maxStockAdd=$("#maxStockAdd").textbox('getValue'),max=$("#maxStockAdd").textbox("getValue"),min=$("#minStockAdd").textbox("getValue"),safe=$("#safeStockAdd").textbox("getValue");;
	    if(maxStockAdd != ""){
	    	if(/[\u4E00-\u9FA5]/i.test(maxStockAdd)){
				ismaxUpdate=true,$('#maxStockAdd').textbox('setValue',"");
				$("#messageInfo").html("<font color='red'>提示: 最大库存只能输入数字!");
	            return false;
			}else{
				if(dataCompare(max,min,safe,"maxStockAdd")){
					ismaxUpdate = false,$("#messageInfo").html("");
					return true;
				}else{
					return false;
				}
			}
	    }	
	});
	$("input",$("#minStockAdd").next("span")).blur(function(){
		var minStockAdd=$("#minStockAdd").textbox('getValue'),max=$("#maxStockAdd").textbox("getValue"),min=$("#minStockAdd").textbox("getValue"),safe=$("#safeStockAdd").textbox("getValue");;
	    if(minStockAdd != ""){
	    	if(/[\u4E00-\u9FA5]/i.test(minStockAdd)){
	    		isminUpdate=true,$('#minStockAdd').textbox('setValue',"");
				$("#messageInfo").html("<font color='red'>提示: 最小库存只能输入数字!");
           		return false;
	    	}else{
	    		if(dataCompare(max,min,safe,"minStockAdd")){
	    			isminUpdate = false,$("#messageInfo").html("");
					return true;
	    		}else{
	    			return false;
	    		}
			}
	    }	
	});
	$("input",$("#safeStockAdd").next("span")).blur(function(){
		var safeStockAdd=$("#safeStockAdd").textbox('getValue');
		var max=$("#maxStockAdd").textbox("getValue"), min=$("#minStockAdd").textbox("getValue"),safe=$("#safeStockAdd").textbox("getValue");
	    if(safeStockAdd != ""){
			if(/[\u4E00-\u9FA5]/i.test(safeStockAdd)){
				issafeUpdate=true,$('#safeStockAdd').textbox('setValue',"");
				$("#messageInfo").html("<font color='red'>提示: 安全库存只能输入数字!");
	        	return false;
			}else{
				if(dataCompare(max,min,safe,"safeStockAdd")){
					issafeUpdate=false,$("#messageInfo").html("");
					return true;
				}else{
					return false;
				}
			}
		}	
	});
    $("input", $("#groupCODE").next("span")).blur(function() {//验证编码不能输入中文
        var companyCode = $('#txtSUP_ID').val(),url = $("#groupCODE").textbox('getText');
        if (url != "") {
            var RegUrl  =  new RegExp();  
            RegUrl.compile(/^[A-Za-z0-9_]{0,20}$/);   
            if (!RegUrl.test(url)) {
            	isgroupUpdate=true,$('#groupCODE').textbox('setValue', '');
                $("#showMessage").html("<font color=red>提示:分组编码不能是中文和非法字符，请重新输入。</font>");
                return false; 
            }else{
            	isgroupUpdate=false,$("#messageInfo").html("");
				return true;
			}
        }
    });
	/*查询物料信息*/
	$('#btnSearch').click(function() { getMaterialDataBySearch(); });
	$('#btnReset').click(function(){ setQueryNull(); });
	$('#btnImport').click(function() {$("#importMaterialDialog").dialog("open").dialog('setTitle', '物料信息导入'); });
	initValue();
	initLeftMenu();/* 页面数据初始化--初始化左边的物料分组树 */
	initMaterialGridData();/* 页面数据初始化--初始化右边的物料列表 */

	window.saveMaterialGroup=saveMaterialGroup;
	window.setDataNull=setDataNull;
	window.saveMaterial=saveMaterial;
	window.setMaterialGroupDataNull=setMaterialGroupDataNull;
	window.setMaterialDataNull=setMaterialDataNull;
	window.setMaterialGroupDataNullother=setMaterialGroupDataNullother;
});