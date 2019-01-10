/* 启动时加载 */
/*
 */
(function() {
    
	/*全局变量*/
	var prodNumList=[];
	var finishFlag=0;  /*标志本次操作是否完成*/
	var selectedMouldNo='';
	var curPoRemainQty=0;
	var curFouceMO='';
	var finishOpt=1;
	var materialDetailArray=[];
	var materialNoArray=[];
	
	/*方法*/
	/*初始化料号信息*/
	function initMaterialData(){
		var ajaxParam = {
			url:'/iPlant_ajax',
			data:{
				IFS : 'T000069'
			},
			successCallBack:function(data){
				var rowCollection = createSourceObj(data);
				var materialArray=[];
				for(var i=0; i<rowCollection.length;i++){
			    	materialArray.push({"id":rowCollection[i].PT_CD,"text":rowCollection[i].PT_NM});
			    }
				$('#cmbMaterialData').combobox({
		    		valueField:'id',
  					textField:'text',
  					data:materialArray
  				});
			 }
		}
		iplantAjaxRequest(ajaxParam);
	}
	
	/*绑定车间类别下拉列表*/
	function initWorkShopType(defaultValue){
		var ajaxParam = {
			url:'/iPlant_ajax',
			data:{
				IFS : 'D000008',
				DICT_CD:'CPL01',
				USE_YN:'Y'
			},
			successCallBack:function(data){
				var rowCollection = createSourceObj(data);
				var workShopTypeArray=[];
				for(var i=0; i<rowCollection.length;i++){
					workShopTypeArray.push({"id":rowCollection[i].DICT_IT,"text":rowCollection[i].DICT_IT_NM});
				}
				$('#workShopType').combobox({
			    	valueField:'id',
	  				textField:'text',
	  				data:workShopTypeArray,
	  				onSelect:function(record){
	  					dynamicShowTableTr(record.text);
	  				    initWorkShop(record.id,'');
  					}
	  			});
				$('#workShopType').combobox('setValue',defaultValue);
			 }
		}
		iplantAjaxRequest(ajaxParam);
	}
	
	/*动态显示tabler的行*/
	function dynamicShowTableTr(judgeValue){
		var tableTrColletcion=$('#formTable tbody tr');
			if(tableTrColletcion!=null && tableTrColletcion.length>0){
				for (var i=0;i<tableTrColletcion.length;i++) {
					var trInstact=tableTrColletcion[i];
					if(judgeValue.indexOf("注塑")>-1){
						trInstact.style.width="330px";
						trInstact.style.display="block";
					}
					else
					{
						if(trInstact.id=='trMould'){
						   trInstact.style.display="none";	
						}
					}
			    }
			}
	}
	
	/*绑定车间下拉列表*/
	function initWorkShop(workShopType,defaultValue){
		var ajaxParam = {
			url:'/iPlant_ajax',
			data:{
				IFS : 'B000025',
				DICT_IT:workShopType
			},
			successCallBack:function(data){
				var rowCollection = createSourceObj(data);
				var workShopArray=[];
				for(var i=0; i<rowCollection.length;i++){
					workShopArray.push({"id":rowCollection[i].PL_CD,"text":rowCollection[i].PL_NM});
				}
				$('#workShop').combobox({
		    		valueField:'id',
  					textField:'text',
  					data:workShopArray
  				});
				$('#workShop').combobox('setValue',defaultValue);
				getDataBySearch('');
		    }
		}
		iplantAjaxRequest(ajaxParam);
	}
	
	String.prototype.format=function()  
	{  
	  if(arguments.length==0) return this;  
	  for(var s=this, i=0; i<arguments.length; i++)  
	    s=s.replace(new RegExp("\\{"+i+"\\}","g"), arguments[i]);  
	  return s;  
	}; 
	
	/* 对Date的扩展，将 Date 转化为指定格式的String*/
	/* 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，*/ 
	/* 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)*/ 
	/* 例子：*/ 
	/* (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423*/ 
	/* (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18*/ 
	Date.prototype.Format = function (fmt) { /*author: meizz*/ 
	    var o = {
	        "M+": this.getMonth() + 1, 		/*月份*/ 
	        "d+": this.getDate(), 			/*日*/ 
	        "h+": this.getHours(), 			/*小时*/ 
	        "m+": this.getMinutes(), 		/*分*/ 
	        "s+": this.getSeconds(), 		/*秒*/ 
	        "q+": Math.floor((this.getMonth() + 3) / 3), /*季度*/ 
	        "S": this.getMilliseconds() 	/*毫秒*/ 
	    };
	    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	    for (var k in o)
	    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	    return fmt;
	}
	
	Date.prototype.DateAdd = function(strInterval, Number) {  
	    var dtTmp = this; 
	    switch (strInterval) {  
	        case 's' :return new Date(Date.parse(dtTmp) + (1000 * Number)); 
	        case 'n' :return new Date(Date.parse(dtTmp) + (60000 * Number)); 
	        case 'h' :return new Date(Date.parse(dtTmp) + (3600000 * Number)); 
	        case 'd' :return new Date(Date.parse(dtTmp) + (86400000 * Number)); 
	        case 'w' :return new Date(Date.parse(dtTmp) + ((86400000 * 7) * Number)); 
	        case 'q' :return new Date(dtTmp.getFullYear(), (dtTmp.getMonth()) + Number*3, dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds()); 
	        case 'm' :return new Date(dtTmp.getFullYear(), (dtTmp.getMonth()) + Number, dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds()); 
	        case 'y' :return new Date((dtTmp.getFullYear() + Number), dtTmp.getMonth(), dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds()); 
	    } 
	} 
	
	/*初始化模具编号*/
	function initMouldData(materialNo,defaultValue){
		var ajaxParam = {
			url:'/iPlant_ajax',
			data:
			{
				IFS : 'T000090',
				PT_CD:materialNo
			},
			successCallBack:function(data){
				var rowCollection = createSourceObj(data);
				var mouldDataArray=[];
				for(var i=0; i<rowCollection.length;i++){
					mouldDataArray.push({"id":rowCollection[i].MD_SN,"text":rowCollection[i].MD_SN});
				}
				$('#cmbMould').combobox({
					valueField:'id',
					textField:'text',
					data:mouldDataArray,
					onSelect:function(record){
						if(selectedMouldNo!='') return;
						selectedMouldNo=record.id;
						/*根据模具编号产生产品编号*/
						var ajaxProductParam={
							url:'/iPlant_ajax',
							data:
							{
								IFS:'T000070',
								MD_SN:record.id
							},
							successCallBack: function(data) {
								curPoRemainQty=$('#txtRemainCnt').textbox('getValue');
								curFouceMO=$('#txtWorkOrder').textbox('getValue');
								$("#formItemTable tbody tr").empty();
								prodNumList=[];
						        var strTrHtml="<tr style='width: 330px; display: block;'><td class='tdStyle'>物料编号{0}/产品数:</td><td style='width:140px;'>";
								strTrHtml+=	"<span class='textbox' style='width: 130px;'>" +
										    "<input id='_easyui_textbox_input'{1} type='text' class='textbox-text validatebox-text' autocomplete='off' tabindex='' placeholder='' readonly='readonly' disabled='disabled' style='text-align: left; width: 130px; margin: 0px; padding-top: 0px; padding-bottom: 0px; height: 22px; line-height: 22px;' value='{2}'>" +
										    "<input type='hidden' class='textbox-value' name='postingdate' value='{2}'></span>"
								strTrHtml+=	"</td>";
								strTrHtml+="<td style='width:60px;'><span class='textbox' style='width: 50px;'>" +
										    "<input id='_easyui_textbox_input'{3} type='text' class='textbox-text validatebox-text' autocomplete='off' tabindex='' placeholder='' readonly='readonly' disabled='disabled' style='text-align: left; width: 50px; margin: 0px; padding-top: 0px; padding-bottom: 0px; height: 22px; line-height: 22px;' value='{4}'>" +
										    "<input type='hidden' class='textbox-value' name='postingdate' value='{4}'></span></td></tr>";
							    var rowCollection = createSourceObj(data);
							    var materialNoList='(';
								for(var i=0; i<rowCollection.length;i++){
									materialDetailArray.push({
										PT_CD:rowCollection[i].PT_CD,
										EM_PCN:rowCollection[i].EM_PCN
										
									});
									var materialNo="'{0}'";
									prodNumList.push(rowCollection[i].EM_PCN);
									materialNoList+=materialNo.format(rowCollection[i].PT_CD)+',';
									materialNoArray.push(rowCollection[i].PT_CD);
									var index=(i+1).toString();
									var genIndex=(i+1)*20;
									var genIndex2=(i+1)*200;
									var trHtml=strTrHtml.format(index,genIndex,rowCollection[i].PT_NM,genIndex2,rowCollection[i].EM_PCN);
								    $('#formItemTable tbody').append(trHtml);
							    }
								materialNoList=materialNoList.substring(0,materialNoList.length-1)+')';
								getDataBySearch(materialNoList);
								
							}
							
						}
						iplantAjaxRequest(ajaxProductParam);
						$('#cmbMould').combobox('disable');
						finishOpt=2;
						
					}
			    });
				$('#cmbMould').combobox('setValue',defaultValue);
			 }
		}
		iplantAjaxRequest(ajaxParam);
	}
	
	/*绑定产线下拉列表*/
	function initLineData(){
		var ajaxParam = {
				url:'/iPlant_ajax',
				data:{
					IFS : 'B000109'
				},
				successCallBack:function(data){
					var rowCollection = createSourceObj(data);
					var prodLineArray=[];
					for(var i=0; i<rowCollection.length;i++){
						prodLineArray.push({"id":rowCollection[i].PD_LN_CD,"text":rowCollection[i].PD_LN_NM});
					}
					$('#cmbLine').combobox({
			    		valueField:'id',
	  					textField:'text',
	  					data:prodLineArray,
	  					onSelect:function(record){
	  						$('#hdLineName').val(record.text);
	  					}
	  					
	  				});
			    }
			}
			iplantAjaxRequest(ajaxParam);
	}
	/*初始化班次下拉列表*/
	function initBCData(){
		var ajaxParam = {
				url:'/iPlant_ajax',
				data:{
					IFS : 'B000017'
				},
				successCallBack:function(data){
					var rowCollection = createSourceObj(data);
					var bcArray=[];
					for(var i=0; i<rowCollection.length;i++){
						bcArray.push({"id":rowCollection[i].CS_CD,"text":rowCollection[i].CS_NM});
					}
					$('#cmbBC').combobox({
			    		valueField:'id',
	  					textField:'text',
	  					data:bcArray
	  				});
			    }
			}
			iplantAjaxRequest(ajaxParam);
	}
    function bindFormData(row){
		if(row==null) return;
		$('#txtWorkOrder').textbox('setValue',row.MO_NO);
		$('#txtMaterialCode').textbox('setValue',row.ITEM_CD);
		$('#txtMaterialName').textbox('setValue',row.ITEM_NM);
		$('#datePlanBeginTime').datebox('setValue',row.MO_NO);
		$('#datePlanBeginTime').textbox('setValue',row.PLAN_STRT_DT);
		$('#txtPlantCnt').textbox('setValue',row.PLAN_PO_QTY);
		$('#txtRemainCnt').textbox('setValue',row.REM_PO_QTY);
		
		/*var spanTime=new Date(row.PLAN_END_DT)-new Date(row.PLAN_STRT_DT);
		var spanHrs=Math.floor(spanTime/3600000);
		$('#txtPlanWorkHours').textbox('setValue',spanHrs);*/
		
		dynamicShowTableTr(row.WC_NM);
		
		$('#hdStationNo').val(row.WC_NM);
		
		/*var ajaxWorkShopType = {
			url:'/iPlant_ajax',
			data:
			{
				IFS:'B000025',
				PL_CD:row.WC_CD
			},
			successCallBack:function(data){
				var rowCollection = createSourceObj(data);
				initWorkShopType(rowCollection[0].DICT_IT);
				initWorkShop(rowCollection[0].DICT_IT,row.WC_CD);
			}
		}
		iplantAjaxRequest(ajaxWorkShopType);*/
		
		/*绑定模具资料信息*/
		initMouldData(row.ITEM_CD,selectedMouldNo);
		
		/*点击行时根据所选行的车间查询数据*/
		/*$("#formItemTable tbody tr").empty();*/
    }
	function bindGridData(reqData,jsonData){
		var grid={
				name:'workorder_tab',
				dataType: 'json', 
				singleSelect:false,
				columns: [[
				    { field : "CZ",width : 10,checkbox : true},
				    { field: 'FCT_CD',title: '工厂',width: 120,hidden:true},
				    { field: 'PROD_TYPE',title: '工单类型',width: 120,hidden:true},
				    { field: 'PRF_CD',title: '工序',width: 120,hidden:true},
				    { field: 'ITEM_TYPE',title: '物料类型',width: 120,hidden:true},
				    { field: 'UGT_TYPE',title: '紧急等级',width: 100,hidden:true},
					{ field: 'MO_NO',  title: '工单号', width: 130 ,align:'center'},
					{ field: 'WO_NO',  title: '作业指示号', width: 150,align:'center'},
					{ field: 'WC_CD',  title: '车间', width: 110,align:'center',
						formatter: function (value,row) 
						{
							if(checkNotEmpty(value)) 
								return "<span title='" +  value + "'>" +  (row.WC_NM || value)+ "</span>";
						}
					},
					{ field: 'ITEM_CD',  title: '物料编号', width: 120,align:'center'},
					{ field: 'ITEM_NM',  title: '物料名称', width: 150,align:'center'},
					{ field: 'PLAN_PO_QTY',  title: 'PO计划数', width: 80,align:'center'},
					{ field: 'REM_PO_QTY',  title: 'PO剩余数', width: 80,align:'center'},
					{ field: 'LINE_CD',  title: '产线编码', width: 80,align:'center',hidden:true},
					{ field: 'LINE_NM',  title: '产线', width: 80,align:'center'},
					{ field: 'MU_CD',  title: '模具编号', width: 80,align:'center'},
					{ field: 'PLAN_WO_QTY',  title: '排产数量', width: 80,align:'center'},
					{field: 'PLAN_STRT_DT',title: '计划开始日期',width: 180,align: 'center',
						formatter:function(value,row,index)
						{
							if(row.PLAN_STRT_DT)
						    {
							    return row.PLAN_STRT_DT;
							}
						}
				    },
				    {field: 'PLAN_END_DT',title: '计划结束日期',width: 180,align: 'center',
						formatter:function(value,row,index)
						{
							if(row.PLAN_STRT_DT)
						    {
							    return row.PLAN_END_DT;
							}
						}
				    }
				    
			    ]],
			    onClickRow:function(index, row){
			    	  $('#hdIndex').val(index);
				      bindFormData(row);
				}
		}
		initGridView(reqData,grid);
		$('#workorder_tab').datagrid('loadData',jsonData);
	}
	function getDataBySearch(materialNoArray){
	    var moWorkShop=$('#workShop').combobox('getValue');
	    var planStartDate=$('#planProdDate').datebox('getValue');
	    var materialNo='';
	    if(materialNoArray==''){materialNo=$('#cmbMaterialData').combobox('getValue');}
	    else
	    {
	    	materialNo=materialNoArray;
	    }
		var dgrid=$('#workorder_tab').datagrid('options');
		var reqData = {
			IFS:'W0000032',
			WC_CD:moWorkShop,
			PLAN_STRT_DT:planStartDate,
			ITEM_CD:materialNo,
			pageIndex: 1,
			pageSize: dgrid.pageSize
		}
		reqGridData('/iPlant_ajax', 'workorder_tab',reqData);
	}
	function addDate(date,days){ 
		var d=new Date(date); 
		d.setDate(d.getDate()+days); 
		var month=d.getMonth()+1; 
		var day = d.getDate(); 
		if(month<10){ 
			month = "0"+month; 
		} 
		if(day<10){
			day = "0"+day; 
		} 
		var val = d.getFullYear()+""+month+""+day; 
		return val; 
	}
	
	window.bindGridData=bindGridData;
    $(function(){
    	
    	/*计划日期默认为当天的*/
    	var curDate=formatterDate(new Date(),'yyyy-MM-dd');
    	$('#planProdDate').datebox('setValue',curDate);
    	
    	$('#cmbMould').combobox('enable');
    	
    	initBCData();
    	initMaterialData();
    	initWorkShopType('');
    	initLineData();
    	getDataBySearch('');
    	/*搜索*/
    	$('#btnSearch1').click(function() {
        	getDataBySearch('');
    	});
    	
    	/*保存*/
    	$('#btnSetWorkOrder').click(function(){
    		 var curSourceCode=$('#txtSourceCode').textbox('getValue');
    		 var curBC=$('#cmbBC').combobox('getValue');
    		 var curLine=$('#cmbLine').combobox('getValue'); 
    		 var curLineName=$('#hdLineName').val();
    		 var curMouldNo=$('#cmbMould').combobox('getValue');
    		 var curInputQty=$('#txtProdCnt').textbox('getValue');
    		 var curPlantQty=$('#txtPlantCnt').textbox('getValue');
    		 var curRemainQty=$('#txtRemainCnt').textbox('getValue');
    		 var curPlanBeigTime=$('#datePlanBeginTime').datebox('getValue');
    		 var curplanWorkHours=$('#txtPlanWorkHours').textbox('getValue');
    		 var curIndex=$('#hdIndex').val();
    		 
    		 if(curInputQty!=''){
    			 curInputQty=parseInt(curInputQty);
    		 }
    		 else
    		 {
    			 $.messager.alert('提示', '请输入排产数量');
    			 return;	 
    		 }
    		 if(curPlantQty!=''){
    			 curPlantQty=parseInt(curPlantQty);
    		 }
    		 if(curRemainQty!=''){
    			 curRemainQty=parseInt(curRemainQty);
    		 }
    		 var remainQty=curRemainQty-curInputQty;
    		 
    		 /*计划工时检查*/
    		 if(curplanWorkHours=='' || curplanWorkHours=='0'){
    			 $.messager.alert('提示', '请输入计划工时');
    			 return;
    		 }
    		 if(curPlanBeigTime==''){
    			 $.messager.alert('提示', '请输入计划开始时间');
    			 return;
    		 }
    		 /*根据计划工时、计划开始时间  计算计划结束时间*/
    		 
    		 
    		 var curPlanEndTime='';
    		 var curPlanEndTime=new Date(curPlanBeigTime); 
    		 curPlanEndTime=curPlanEndTime.DateAdd('h',curplanWorkHours);
    		 curPlanEndTime=curPlanEndTime.Format("yyyy-MM-dd hh:mm:ss");
    		 
    		 
    		 /*拉线检查*/
    		 if(curLine==''){
    			 $.messager.alert('提示', '请选择拉线');
    			 return;
    		 }
    		 
    		 /*班次检查*/
    		 if(curBC==''){
    			 $.messager.alert('提示', '请选择班次');
    			 return;
    		 }
    		 
    		 /*请选择所要排配的工单*/
    		 var checkedItems = $('#workorder_tab').datagrid('getSelections');
             if(checkedItems.length==0){
            	 $.messager.alert('提示', '请选择所要排配的工单');
    			 return;
             }
        	 var selectedMaterialNo="";
    		 var materialNoForamt="'{0}'";
    		 var selectedMoRemainQty=[];   /*所选择工单的剩余数量*/
    		 var selectedMoData=[];
    		 var isContainsFouceMo=false;
    		 $.each(checkedItems, function (index, item) {
    			 
    			 var inputProdQty=curInputQty;
    			 for(var i=0;i<materialDetailArray.length;i++){
    				 if(item.ITEM_CD==materialDetailArray[i].PT_CD && curFouceMO!=item.MO_NO){
    					 inputProdQty=curPoRemainQty/materialDetailArray[i].EM_PCN;
    				 }
    			 }
    			 if(item.MO_NO==curFouceMO){
    				 isContainsFouceMo=true;
    			 }
    			 
               	 var materialNoForamt="'{0}',";
               	 materialNoForamt=materialNoForamt.format(item.PL_CD);
               	 if(selectedMaterialNo.indexOf("'"+materialNoForamt+"'")==-1){
               		 selectedMaterialNo+=materialNoForamt;
               	 }
               	 selectedMoRemainQty.push(item.REM_PO_QTY);
               	 selectedMoData.push({
               		 FCT_CD:item.FCT_CD,           		/*工厂编码*/
               		 MO_NO:item.MO_NO,             		/*工单*/
               		 PROD_TYPE:item.PROD_TYPE,          /*工单类型*/
               		 LINE_CD:curLine,                   /*拉线*/	
               		 SHIFT_CD:curBC,                 	/*班次*/	
               		 PRF_CD:item.PRF_CD,                /*工序*/
               		 WC_CD:item.WC_CD,                  /*车间*/
               		 ITEM_CD:item.ITEM_CD,              /*物料编码*/
               		 ITEM_NM:item.ITEM_NM,              /*物料名称*/
               		 ITEM_TYPE:item.ITEM_TYPE,          /*物料类型*/
               		 MODEL_CD:'',                		/*机型代码*/
               		 MODEL_NM:'',                		/*机型名称*/
               		 TOP_ITEM_CD:'',             		/*成品物料编码*/
               		 UOM:'',                            /*单位*/
               		 UGT_TYPE:item.UGT_TYPE,            /*紧急程度*/    
               		 PLAN_STRT_DT:curPlanBeigTime,      /*作业指示计划开始日期*/
               		 PLAN_END_DT:curPlanEndTime,        /*作业指示计划结束日期*/
               		 PLAN_WRK_TIME:curplanWorkHours,    /*计划工时*/
               		 PLAN_PO_QTY:item.PLAN_PO_QTY,      /*工单计划数*/
               		 PLAN_WO_QTY:inputProdQty,          /*作业指示计划数*/
               		 MU_CD:selectedMouldNo              /*模具编号*/
                 });
               	 
             });
    		 selectedMaterialNo=selectedMaterialNo.substring(0,selectedMaterialNo.length-1);
    		 
    		 /*注塑检查*/
    		 var stationName=$('#hdStationNo').val();
    		 if(stationName.indexOf('注塑')>-1 )
    		 {
    			 /*所选工单必须包含焦点工单*/
    			 if(!isContainsFouceMo){
    				 $.messager.alert('提示', '所选工单中必须包含工单'+curFouceMO);
        			 return;
    			 }
    			 /*注塑车间的工单必须选择模具编号*/
    			 if(curMouldNo==''){
    				 $.messager.alert('提示', '请选择模具');
        			 return;
    			 }
    			 
    			 /*所选择的工单产品与模具所做的产品不对应，请重新选择*/
                 if(checkedItems.length!=materialNoArray.length){
                	 $.messager.alert('提示', '所选择的工单产品与模具所做的产品不对应，请重新选择');
        			 return;
                 }
                 
                 /*入库数量必须小于所选工单的最小剩余数量
                 var validFlag=1;
                 for(var j=0;j<selectedMoRemainQty.length;j++){
                	 if(curInputQty>selectedMoRemainQty[j]){
                		 validFlag=0;
                		 break;
                	 }
                 }
                 if(validFlag==0){
                	 $.messager.alert('提示', '入库数量必须小于所选工单的最小剩余数量');
        			 return;
                 }
                 
                 	请输入正确的入库数量,入库数量必须是模具所做所有产品产品数的倍数关系
    			 var rightInputQty=true;
        		 if(prodNumList!=null && prodNumList.length>0){
        			 for(var i=0;i<prodNumList.length;i++){
        				 var num=prodNumList[i];
        				 if(curInputQty%num>0){
        					 rightInputQty=false;
        					 break;
        				 } 
        			 }
        		 }
        		 if(!rightInputQty){
        			 $.messager.alert('提示', '请输入正确的入库数量,入库数量必须是模具所做所有产品产品数的倍数关系');
        			 return;
        		 }*/
        		 
        		 /*所选择的工单产品重复*/
                 var selectedMaterialNoArray=selectedMaterialNo.split(',');
                 if(materialNoArray.length!=selectedMaterialNoArray.length){
                	 $.messager.alert('提示', '所选择的工单产品重复，请重新选择');
        			 return;
                 }
                 /*排产数量的校验*/
        		 if(curInputQty>curPoRemainQty){
        			 $.messager.alert('提示', '入库数量应该小于剩余数量,工单:'+curFouceMO+'剩余数量为:'+curPoRemainQty);
        			 return;
        		 }
             }
    		 
    		 /*排产数量的校验*/
    		 if(curInputQty>curRemainQty){
    			 $.messager.alert('提示', '入库数量应该小于剩余数量');
    			 return;
    		 }
    		 
    		 /*保存操作*/
    		 var ajaxParam={
    			 url:'/iPlant_ajax',
    			 data:{
    				 IFS:'W0000031',
    				 list:selectedMoData
    			 },
    			 successCallBack:function(data){
    				 if($.messager.alert('提示', '保存成功')) {
    					 /*清空全局变量*/
    					 prodNumList=[];
    				     selectedMouldNo='';
    					 materialNoArray=[];
    					 curFouceMO='';
    					 finishOpt=1;
    					 /*重绑定数据*/
    					 getDataBySearch('');
    					 
    					 $("#cmbMould").combobox("enable");
    					
    				  }
    			 }
    		 }
    		 iplantAjaxRequest(ajaxParam);
        });
    	
    	/*清空表单数据*/
    	$('#btnClear').click(function(){
    		$('#txtWorkOrder').textbox('setValue','');
    		$('#txtMaterialCode').textbox('setValue','');
    		$('#txtMaterialName').textbox('setValue','');
    		$('#datePlanBeginTime').datebox('setValue','');
    		$('#datePlanBeginTime').textbox('setValue','');
    		$('#txtPlantCnt').textbox('setValue','');
    		$('#txtRemainCnt').textbox('setValue','');
    		$('#txtPlanWorkHours').textbox('setValue','');
    		$('#txtSourceCode').textbox('setValue','');
    		$('#txtProdCnt').textbox('setValue','');
    		$('#cmbLine').combobox('setValue','');
    		
    		$("#formItemTable tbody tr").empty();
    	})
    })
})();