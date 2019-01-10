/* 启动时加载 */
/*
 */
(function() {
	function factoryInfo() {
		initGridData = function() {
			var dgrid = dataGrid.datagrid('options');
			if(!dgrid) return;
			var reqData = {
				IFS: 'GW00005',
				pageIndex: 1,
				pageSize: dgrid.pageSize
			}
			reqGridData('/iPlant_ajax', 'IntoTheProcess_tab', reqData);
		},
		
		bindGridData = function(reqData, jsonData) {
			var gridList = {
				name: 'IntoTheProcess_tab',
				dataType: 'json',
				columns: [[
					{field: 'MO_NO',title: '工单编码',width: 120, align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
						   options:{required:true, validType:['length[1,30]','specialTextCharacter']}}},
				    {field: 'WO_NO',title: '作业指示编码',width: 150, align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
					       options:{required:true, validType:['length[1,30]','specialTextCharacter']}}},
					{field: 'ITEM_CD',title: '物料编码',width: 120,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
						   options:{required:true, validType:['length[1,30]','specialTextCharacter']}}},
					{field: 'LINE_NM',title: '产线名称',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
						   options:{validType:['length[1,100]','specialTextCharacter']}}}, 
				    {field: 'PLAN_WO_QTY',title: '计划数',width: 60,align: 'right',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
						   options:{validType:['length[1,25]','specialTextCharacter']}}},
					{field: 'INPUT_NUM',title: '投入数',width: 60,align: 'right',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
						   options:{validType:['length[1,25]','specialTextCharacter']}}}, 
					{field: 'AO_COUNT',title: '完成数',width: 60,align: 'right',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
						   options:{validType:['length[1,100]','specialTextCharacter']}}}, 
				    {field: 'NO_PASS',title: '不良数',width: 60,align: 'right',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
						   options:{validType:['length[1,25]','specialTextCharacter']}}},
					{field: 'WO_STATE_NM',title: '作业状态',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
						   options:{validType:['length[1,25]','specialTextCharacter']}}},
					{field: 'COMPLATE_RATE',title: '完成率',width: 60,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
						   options:{validType:['length[1,25]','specialTextCharacter']}}}
				]],
			}
			initGridView(reqData, gridList);
			dataGrid.datagrid('loadData', jsonData);
		}
		
	}
	
	/*顶部的关联表格   已扫描明细表*/
	OpenFrameAttribute = function(){
		var tabName = 'Scanned_tab';
		var dgridOp = $('#'+tabName).datagrid('options');
		if(!dgridOp) return;
		var reqDataA = {
			pageIndex: 1,
			pageSize: dgridOp.pageSize	
		}
		dialogDataGrid('/iPlant_ajax', tabName, reqDataA);
		dialogEditorDataGrid = function(tabName,reqDataA, jsonData) {
			var columnsTab,edDataGrid,messageInfo;
			columnsTab=[			
				{field: 'BOX_ID',title: '当前箱号',width: 150, align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
				{field: 'WO_NO',title: '作业指示编号',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
				{field: 'FCT_CD',title: '工厂名称',width: 100,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" +  value + "'>" +  (row.FCT_NM || value)+ "</span>";}},
				{field: 'MO_NO',title: '工单号',width: 120,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
			    {field: 'PCS_IN_BOX',title: '包装数容量',width: 80,align: 'right',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
				{field: 'ITEM_CD',title: '物料编码',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
				{field: 'ITEM_NM',title: '物料名称',width: 200,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" +  value + "'>" +  value+ "</span>";}},
				{field: 'PRF_CD',title: '工艺流程名称',width: 120,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
				{field: 'LINE_CD',title: '产线名称',width: 120,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
				{field: 'PROD_TYPE',title: '生产类型',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
				{field: 'WC_CD',title: '现工程',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
			];
			var gridLists = {
				name: tabName,
				dataType: 'json',
				columns: [columnsTab]
			}
			initEditorDataGridView(reqDataA, gridLists);
			$('#'+tabName).datagrid('loadData', jsonData);
		}
	};
	
	/*失去焦点事件*/
	checkLoginName = function(dgrid){
		var rows = $('#Scanned_tab').datagrid('getRows');
		var rowNum = rows.length +1 ;
		verifyPalletFUN();
		var search_MaterialWO_NO = $('#boxnumber').textbox('getValue');
		if(search_MaterialWO_NO==null || search_MaterialWO_NO==''){
			$.messager.alert("提示", '请输入箱号！')
			$("#fmStation").form("clear");
			return;
		}
		var ajaxParam = {
			data: {
				url: '/iPlant_ajax',
				IFS: 'GW00046',
				BOX_ID: search_MaterialWO_NO
			},
			successCallBack:function(data){
				var rowCollection=createSourceObj(data); 
				if(rowCollection.length <= 0){
					$.messager.alert("提示", '该箱号不存在，请重新输入！')
					$("#fmStation").form("clear");
					return;
				}else{		
					var upperLimit = parseInt(rowCollection[0].PLT_QTY);	
					var	initData={BAR_CODE:rowCollection[0].BAR_CODE,FCT_CD:rowCollection[0].FCT_CD,MO_NO:rowCollection[0].MO_NO,BOX_ID:rowCollection[0].BOX_ID,WO_NO:rowCollection[0].WO_NO,ITEM_CD:rowCollection[0].ITEM_CD,PRF_CD:rowCollection[0].PRF_CD,LINE_CD:rowCollection[0].LINE_CD,PROD_TYPE:rowCollection[0].PROD_TYPE,WC_CD:rowCollection[0].WC_CD}
					
					$("#WO_NO").textbox('setValue',rowCollection[0].WO_NO);						/*作业指示编号*/
					$("#workOrder").textbox('setValue',rowCollection[0].MO_NO);					/*工单编码*/
					$("#MaterialCode").textbox('setValue',rowCollection[0].ITEM_CD);			/*物料编码*/
					$("#FCT_CD").textbox('setValue',rowCollection[0].FCT_CD);					/*工厂编码*/       
					$("#LINE_CD").textbox('setValue',rowCollection[0].LINE_CD);					/*产线名称*/
					$("#PROD_TYPE").textbox('setValue',rowCollection[0].PROD_TYPE);				/*生产类型*/
					$("#BOX_ID").textbox('setValue',rowCollection[0].BOX_ID);					/*箱号*/
					$("#PLT_QTY").textbox('setValue',rowCollection[0].PLT_QTY);       			/*箱子容量*/
					$("#txtItemnm").textbox('setValue',rowCollection[0].ITEM_NM);      			/*物料名称*/
					
					if(rowCollection[0].WO_STATE != '5'){
						$.messager.alert('提示','此SN不属于生产状态');
						return
					}
					
					/*验证箱号是否有重复*/
					if(rows.length == 0){
						console.log("IsExistence==="+IsExistence);
						if(IsExistence == "E000B"){
							insertDataGrid('Scanned_tab',initData);
							$("#boxnumber").textbox('setValue','');
						}else{
							return
						}
						
					}else{
						for (var i = 0; i < rows.length; i++) {  
					        if(rows[i]['BOX_ID'] == search_MaterialWO_NO ){
					        	$('#showMessageInfo').html('<font color=red>此箱号已存在</font>');
					        	$("#boxnumber").textbox('setValue','');
					        	return;	
					        }else if(rowCollection[0].WO_NO != rows[i]['WO_NO']){
					        	$('#showMessageInfo').html('<font color=red>此箱号不属于同一作业指示!</font>');
					        	$("#boxnumber").textbox('setValue','');
					        }
					    } 
						console.log("IsExistence2==="+IsExistence);
						if(IsExistence == "E000B"){
							insertDataGrid('Scanned_tab',initData);
							$("#boxnumber").textbox('setValue','');
						}else{
							return
						}
					}
				}
				if(rowNum == upperLimit){
					var edDataGrid = $('#Scanned_tab');
		        	if (edDataGrid.datagrid('getChanges').length) {
		                var inserted = edDataGrid.datagrid('getChanges', "inserted");  
		                /**装载数据*/
		                var arrInsert = new Array()
		                if(inserted.length>0){
		                	for(var m=0;m<inserted.length;m++){
		                		arrInsert.push(inserted[m]);
		                	}
		                	ManualAutomaticPackingFun(arrInsert,rowNum,edDataGrid);
		                }
		            }
				}
            }
		};
		iplantAjaxRequest(ajaxParam);
	}
	
	/*装箱*/
	loadingBox = function(){
		var check = $('#checkOne').prop('checked');
		if(check == true){
			var edDataGrid = $('#Scanned_tab');
        	if (edDataGrid.datagrid('getChanges').length) {
                var inserted = edDataGrid.datagrid('getChanges', "inserted");  
                /**装载数据*/
                var arrInsert = new Array()
                if(inserted.length>0){
                	for(var m=0;m<inserted.length;m++){
                		arrInsert.push(inserted[m]);
                	}
                	var rowNum=inserted.length;
                	ManualAutomaticPackingFun(arrInsert,rowNum,edDataGrid);
                }
            }else{
            	$('#showMessageInfo').html('<font color=red>请先扫描有效箱号！</font>');
            }
		}else{
			$('#showMessageInfo').html('<font color=red>请勾选确认关箱按钮！</font>');
		}
	};
	
	/*手动自动装栈统一调用 START*/
	ManualAutomaticPackingFun = function(arrInsert,rowNum,edDataGrid){
		var PLT_ID;
    	var ajaxParamPLT={
            url:'/iPlant_ajax',
            async: false,
            data:{
                IFS:'S0000015',
                NAME_RULES:'PLT',
            }, 
            successCallBack:function(data){
            	  var rowCollection=createSourceObj(data);
            	  PLT_ID =rowCollection[0].C_RESULT;	                                		
            },
        };
        iplantAjaxRequest(ajaxParamPLT);
        
    	console.log("生成的PLT_ID---"+PLT_ID);
    	
        var ajaxInsert = {
            url: '/iPlant_ajax',
            dataType: 'JSON',
            data: {         
            	FCT_CD: arrInsert[0].FCT_CD,
            	PLT_ID: PLT_ID,
            	WC_CD: arrInsert[0].WC_CD,
            	ITEM_CD :arrInsert[0].ITEM_CD,
            	ITEM_NM :arrInsert[0].ITEM_NM,
            	PLT_QTY: rowNum,
                IFS: 'GW00041'   /*增加到栈板主表  生成栈板号*/
            },
            successCallBack: function (data) {
        		var WOSN =$("#workOrder").val();
        		var JOBINS =$("#WO_NO").val();
        		var MERSN =$("#MaterialCode").val();
        		var MERNM =$("#txtItemnm").val();
        		var LINE =$("#LINE_CD").val();
        		var data1=new Array();
        		var barCodeList="";
        		data1.push({"TITLE":"栈板标签","SN":PLT_ID,"WOSN":WOSN,"JOBINS":JOBINS,"MERSN":MERSN,"MERNM":MERNM,"LINE":LINE,"NUM":rowNum});
        		barCodeStr = {"type":"03","barCodeList":data1};
        		zbSocketPrinter(barCodeStr);
        		edDataGrid.datagrid('acceptChanges');
        		var listSn = new Array();
        		var arr = [];
        		for(var n=0;n<arrInsert.length;n++){
            		var ajaxScheduleBOX = {
            			url: '/iPlant_ajax',
	                        dataType: 'JSON',
	                        data:{
	                        	BOX_ID: arrInsert[n].BOX_ID,
	                        	IFS: 'GW00043'        /*增加到箱子明细表  统一接口*/
	                        },
	                        successCallBack : function (data){
	                        	var rowCollection=createSourceObj(data); 
	                            for(var i=0; i< rowCollection.length; i++){
	                            	var reqData = {
	                						ROUT_CD: ROUTCD,	
	                					    BAR_CODE:rowCollection[i].BAR_CODE,
	                					    TEMP_CODE: 'GW00000',  
	                						IFS: 'MF99999'
	                				   }
	                				universalAccess('/iPlant_ajax',reqData);
	                            }
	                        }
                	};
                	iplantAjaxRequest(ajaxScheduleBOX);
            	}
            	/*插入栈板号到list中*/
            	for(var n=0;n<arrInsert.length;n++){
            		arrInsert[n].PLT_ID = PLT_ID;
            	}
            	var ajaxSchedule = {
        			url: '/iPlant_ajax',
                     dataType: 'JSON',
                     data:{
                     	FUN: 'insertBatchPalletInformation',   /*相应表的接口名称*/
                     	list: arrInsert,
                     	IFS: 'GW00066'        /*增加到箱子明细表  统一接口*/
                     },
                     successCallBack : function (data){
                     	OpenFrameAttribute();
                     	$('#showMessageInfo').html('<font color=red>装栈成功！</font>');
                     }
            	};
            	iplantAjaxRequest(ajaxSchedule);
                return;
            },
            errorCallBack: function (data) {
            	$('#showMessageInfo').html('<font color=red>保存失败！</font>');
                return;
            }
        };
        iplantAjaxRequest(ajaxInsert);
	}
	/*手动自动装栈统一调用 END*/
	
	/*查询栈板信息验证BOX_ID是否已经存在*/
	 var IsExistence;
	 verifyPalletFUN = function(){
		 var BOX_ID = $('#boxnumber').textbox('getValue');
		 var ajaxVerifyPallet={
            url:'/iPlant_ajax',
            data:{
                IFS:'GW00040',
                BOX_ID : BOX_ID
            }, 
            successCallBack:function(data){
            	if(data.RESPONSE[0].RESPONSE_DATA.length >0){
            		IsExistence = "E000A";
            		$('#showMessageInfo').html('<font color=red>此箱号已装栈! 栈板号：'+data.RESPONSE[0].RESPONSE_DATA[0].PLT_ID+'</font>');
            	}else{
            		IsExistence = "E000B";
            	}                          		
            },
        };
        iplantAjaxRequest(ajaxVerifyPallet);
	 }
	 
	var MAC,IP,ROUTCD;
	GetFromMacAddress = function(cdId){
		var ip = getIP();
		if(cdId!=null && cdId!=''){
			var ajaxParam = {
				data: {
					url: '/iPlant_ajax',
					IFS: 'GX00075',
					//BUSI_CODE: cdId
					IP_ADDRESS : ip
				},
				successCallBack:function(data){
					var rowCollection = createSourceObj(data); 
					MAC = rowCollection[0].MAC_ADDRESS;
					IP = rowCollection[0].IP_ADDRESS;
					ROUTCD = rowCollection[0].ROUT_CD;
	            }
		   };
		 iplantAjaxRequest(ajaxParam);
		}
	}
	
	factoryInfo.prototype = {
		init: function() {
			$(function() {
				
				var cdId = getQueryString("cdId");
				GetFromMacAddress(cdId);
				
				/*初始化全局变量对象*/
				dataGrid = $('#IntoTheProcess_tab'),dataCompany=[],dataFactory=[],showmessage=$('#showMessageInfo'),editIndex = undefined,oldRow=undefined, reg=new RegExp("null","g");
				initGridData();
				OpenFrameAttribute();
				$('#closebox').click(function() {		
					loadingBox();
				});
				
				$('#boxnumber').textbox('textbox').keydown(function (e) {
			         if (e.keyCode == 13) {
			        	 checkLoginName();
			         }
			     });
			});
		}
	}
	var fcfo = new factoryInfo();
	fcfo.init();
})();