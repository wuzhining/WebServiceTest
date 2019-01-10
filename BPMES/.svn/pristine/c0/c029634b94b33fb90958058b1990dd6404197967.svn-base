/* 启动时加载 */
/*
 */
(function() {
	function factoryInfo() {
		initGridData = function() {
			var dgrid = dataGrid.datagrid('options');
			if(!dgrid) return;
			/*工厂下拉框查询*/
			var tmp = {
	                url: "/iPlant_ajax",
	                dataType: "JSON",
	                data: {IFS: "B000021"},
	                successCallBack: function(a) {
	                	dataTmp = [];
	                	var op = a.RESPONSE[0].RESPONSE_DATA;
	                    $.each(op,function(n,obj) {
	                    	dataTmp.push({'value':obj.FT_CD,'text':obj.FT_NM});
					    });  
	                },
	                errorCallBack: function() {
	                    $.messager.alert("提示", '请联系管理员，查询失败！')
	                }
	            };
			iplantAjaxRequest(tmp);
			
			var BOM = {
		            url: "/iPlant_ajax",
		            dataType: "JSON",
		            data: {IFS:'Z000051'},
		            successCallBack: function(a) {
		            	dataBOM = [];
		            	var op = a.RESPONSE[0].RESPONSE_DATA;
		                $.each(op,function(n,obj) {
		                	dataBOM.push({'text':obj.BOM_CD,'value':obj.BOM_NM});
					    });  
		            },
		            errorCallBack: function() {
		                $.messager.alert("提示", '请联系管理员，查询失败！')
		            }
		        };
				iplantAjaxRequest(BOM);
			
			var reqData = {
				IFS: 'GW00005',
				pageIndex: 1,
				pageSize: dgrid.pageSize
			}
			reqGridData('/iPlant_ajax', 'PackingStation_tab', reqData);
			
		},
		
		bindGridData = function(reqData, jsonData) {
			var gridList = {
				name: 'PackingStation_tab',
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
				{field: 'BAR_CODE',title: 'SN号',width: 150, align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
					   options:{required:true, validType:['length[1,30]','specialTextCharacter']}}},
				{field: 'WO_NO',title: '作业指示编号',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
						   options:{validType:['length[1,100]','specialTextCharacter']}}}, 
				{field: 'FCT_NM',title: '工厂名称',width: 100,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" +  value + "'>" + value+ "</span>";}},
				{field: 'FCT_CD',title: '工厂编码',width: 100,hidden:true,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" +  value + "'>" + value+ "</span>";}},
				{field: 'MO_NO',title: '工单号',width: 120,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
					   options:{required:true, validType:['length[1,30]','specialTextCharacter']}}},
			    {field: 'PCS_IN_BOX',title: '包装数容量',width: 80,align: 'right',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'numberbox', options:{precision:0,min:0}}, 
    	               formatter:function(value,row,index){ return formatNumber(value,0); }},
                {field: 'ITEM_CD',title: '物料编码',width: 200,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" +  value + "'>" +  value+ "</span>";}},
                {field: 'ITEM_NM',title: '物料名称',width: 200,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" +  value + "'>" +  value+ "</span>";}},
				{field: 'PRF_NM',title: '工艺流程名称',width: 120,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
						 options:{validType:['length[1,50]','specialTextCharacter']}}},
				{field: 'LINE_CD',title: '产线编码',width: 120,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
					   options:{validType:['length[1,25]','specialTextCharacter']}}},
				{field: 'PROD_TYPE',title: '生产类型',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
				           options:{validType:['length[1,20]','specialTextCharacter']}}},
				{field: 'WC_CD',title: '车间编码',width: 80,hidden:true,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
				        options:{validType:['length[0,50]','specialTextCharacter']}}},
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
		var search_MaterialWO_NO = $('#search_ENTERSN').textbox('getValue');
		if(search_MaterialWO_NO==null || search_MaterialWO_NO==''){
			$.messager.alert("提示", '请输入SN！')
			$("#fmStation").form("clear");
			return;
		}
		var ajaxParam = {
			data: {
				url: '/iPlant_ajax',
				IFS: 'GW00006',
				BAR_CODE: search_MaterialWO_NO
			},
			successCallBack:function(data){
				var rowCollection=createSourceObj(data); 
				if(rowCollection.length <= 0){
					$.messager.alert("提示", '该SN不存在，请重新输入！')
					$("#fmStation").form("clear");
					return;
				}else{
					var upperLimit = parseInt(rowCollection[0].PCS_IN_BOX);																										    																								
					var	initData={BAR_CODE:rowCollection[0].BAR_CODE,FCT_CD:rowCollection[0].FCT_CD,FCT_NM:rowCollection[0].FCT_NM,MO_NO:rowCollection[0].MO_NO,BOX_ID:rowCollection[0].BOX_ID,WO_NO:rowCollection[0].WO_NO,ITEM_CD:rowCollection[0].ITEM_CD,ITEM_NM:rowCollection[0].ITEM_NM,PRF_CD:rowCollection[0].PRF_CD,LINE_CD:rowCollection[0].LINE_CD,PROD_TYPE:rowCollection[0].PROD_TYPE,WC_CD:rowCollection[0].WC_CD,PCS_IN_BOX:rowCollection[0].PCS_IN_BOX,}
					
					$("#workOrder").textbox('setValue',rowCollection[0].MO_NO);							/*工单编码*/
					$("#MaterialCode").textbox('setValue',rowCollection[0].ITEM_CD);					/*物料编码*/
					$("#PlanProductCount").textbox('setValue',rowCollection[0].PLAN_WO_QTY);			/*计划量*/
					$("#Line_NM").textbox('setValue',rowCollection[0].LINE_NM);							/*产线名称*/
					$("#Output").textbox('setValue',rowCollection[0].WO_STATE);							/*产出数*/
					$("#Unqualifiednumber").textbox('setValue',rowCollection[0].ITEM_TYPE);				/*不合格数*/
					$("#boxnumber").textbox('setValue',rowCollection[0].LINE_CD);						/*箱号*/
					$("#packnumber").textbox('setValue',rowCollection[0].WO_STATE);						/*包装数*/
					$("#packagingnumber").textbox('setValue',rowCollection[0].PCS_IN_BOX);				/*包装数上限	查询已包装数*/
					$("#WO_NO").textbox('setValue',rowCollection[0].WO_NO);         					/*作业指示编码*/
					
					/*验证当前SN工序路线是否匹配*/
					if(rowCollection[0].NEXT_ROUT_CD ==null || rowCollection[0].NEXT_ROUT_CD ==""){
						$('#showMessageInfo').html('<font color=red>此SN当前应进行投入工位操作!!</font>');
						return
					}else if(rowCollection[0].NEXT_ROUT_CD != ROUTCD){
						$('#showMessageInfo').html('<font color=red>此SN当前应进行'+rowCollection[0].CURR_ROUT_NM+'操作!</font>');
						return
					}
					if(rowCollection[0].WO_STATE != '5'){
						$.messager.alert('提示','此SN不属于生产状态');
						return
					}
					/*验证SN是否有重复*/
					if(rows.length == 0){
						insertDataGrid('Scanned_tab',initData);
						$("#search_ENTERSN").textbox('setValue','');
					}else{
						for (var i = 0; i < rows.length; i++) {  
					        if(rows[i]['BAR_CODE'] == search_MaterialWO_NO ){
					        	$('#showMessageInfo').html('<font color=red>此SN已存在</font>');
					        	$("#search_ENTERSN").textbox('setValue','');
					        	return;	
					        }else if(rowCollection[0].WO_NO != rows[i]['WO_NO']){
					        	$('#showMessageInfo').html('<font color=red>此SN不属于同一作业指示!</font>');
					        	$("#search_ENTERSN").textbox('setValue','');
					        	return;
					        }
					    } 
						insertDataGrid('Scanned_tab',initData);
			        	$("#search_ENTERSN").textbox('setValue','');
					}
				}
				
				/*当扫描SN达到箱子的最大容量后自动关箱*/
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
	
	/*手动关箱*/
	loadingBox = function(){
		var check = $('#checkOne').prop('checked');
		if(check == true){
			var edDataGrid = $('#Scanned_tab');
        	if (edDataGrid.datagrid('getChanges').length) {
                var inserted = edDataGrid.datagrid('getChanges', "inserted");  
                /**装载数据*/
                var arrInsert = new Array()
                var rowNum = 0;
                if(inserted.length>0){
                	for(var m=0;m<inserted.length;m++){
                		arrInsert.push(inserted[m]);
                	}
                	rowNum = inserted.length;
                	ManualAutomaticPackingFun(arrInsert,rowNum,edDataGrid);
                }
            }else{
            	$('#showMessageInfo').html('<font color=red>请先输入SN号！</font>');
            }
		}else{
			$('#showMessageInfo').html('<font color=red>请勾选确认关箱按钮！</font>');
		}
	};
	
	
	
	/*手动自动装箱统一调用 START*/
	ManualAutomaticPackingFun= function(arrInsert,rowNum,edDataGrid){
		var BOX_ID;
		var ajaxParamBox={
            url:'/iPlant_ajax',
            async: false,
            data:{
                IFS:'S0000014',
                NAME_RULES:'BOX',
            }, 
            successCallBack:function(data){
        	    var rowCollection=createSourceObj(data);
            	BOX_ID =rowCollection[0].C_RESULT;
            },
        };
        iplantAjaxRequest(ajaxParamBox);
    	
        console.log("返回的BOX="+BOX_ID);
        
		/*批量新增*/
        var ajaxInsert = {
            url: '/iPlant_ajax',
            dataType: 'JSON',
            data: {
            	FCT_CD: arrInsert[0].FCT_CD,
            	WC_CD: arrInsert[0].WC_CD,
            	BOX_QTY: arrInsert[0].PCS_IN_BOX,
            	BOX_ID:BOX_ID,
            	ITEM_CD :arrInsert[0].ITEM_CD,
            	ITEM_NM :arrInsert[0].ITEM_NM,
                IFS: 'GW00021'   /*增加到箱子主表  生成箱号*/
            },
            successCallBack: function (data) {
            	
            	
        		var WOSN =arrInsert[0].MO_NO;
        		var JOBINS =arrInsert[0].WO_NO;
        		var MERSN =arrInsert[0].ITEM_CD;
        		var MERNM =arrInsert[0].ITEM_NM;
        		var LINE =arrInsert[0].LINE_CD;
        		var data1=new Array();
        		var barCodeList="";
        		data1.push({"TITLE":"BOX标签","SN":BOX_ID,"WOSN":WOSN,"JOBINS":JOBINS,"MERSN":MERSN,"MERNM":MERNM,"LINE":LINE,"NUM":rowNum});
        		barCodeStr = {"type":"03","barCodeList":data1};
        		zbSocketPrinter(barCodeStr);
        		console.log("barCodeStr------"+barCodeStr)
        		
        		edDataGrid.datagrid('acceptChanges');
        		
            	/*插入箱号到list中*/
            	for(var n=0;n<arrInsert.length;n++){
            	   arrInsert[n].BOX_ID = BOX_ID;
        		   var reqData = {
						ROUT_CD: ROUTCD,	
					    BAR_CODE:arrInsert[n].BAR_CODE,
					    TEMP_CODE: 'GW00000',  
						IFS: 'MF99999'
				   }
				   universalAccess('/iPlant_ajax',reqData);
            	}
            	var ajaxSchedule = {
        			url: '/iPlant_ajax',
                     dataType: 'JSON',
                     data:{
                     	FUN: 'Closethebox',   /*相应表的接口名称*/
                     	list: arrInsert,
                     	IFS: 'GW00066'        /*增加到箱子明细表  统一接口*/
                     },
                     successCallBack : function (data){
                     	OpenFrameAttribute();
                     	$('#showMessageInfo').html('<font color=red>装箱成功！</font>');
                     	var PROD_QTY = arrInsert.length;
                     	var reqDataD = {
                     			PROD_QTY:PROD_QTY,
        					    WO_NO:arrInsert[n].WO_NO,
        						IFS: 'GW00004'
        				   }
        				   universalAccess('/iPlant_ajax',reqDataD);
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
	/*手动自动装箱统一调用 END*/
	
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
				dataGrid = $('#PackingStation_tab'),dataTmp=[],dataBOM=[];
				initGridData();
				OpenFrameAttribute();
				
				$('#search_ENTERSN').textbox('textbox').keydown(function (e) {
			         if (e.keyCode == 13) {
			        	 checkLoginName();
			         }
			     });
				
				$('#closeBox').click(function() {	
					loadingBox();
				});
			});
		}
	}
	var fcfo = new factoryInfo();
	fcfo.init();
})();