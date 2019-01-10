/* 启动时加载 */
/*
 */
(function() {
	function factoryInfo() {
		initGridData = function() {
			var dgrid = dataGrid.datagrid('options');
			if(!dgrid) return;
			var reqData = {
				IFS: 'XK00001',
				LINE_CD: linecd,
				WO_NO: wc,
				ITEM_CD: ctn_no,
				MODER_CD: moder,
				CRT_DT: version,
				pageIndex: 1,
				pageSize: dgrid.pageSize
			}
			reqGridData('/iPlant_ajax', 'SNRetrospectiveReport_tab', reqData);
		},		
		bindGridData = function(reqData, jsonData) {
			var gridList = {
				name: 'SNRetrospectiveReport_tab',
				dataType: 'json',
				rownumbers:true,
                border : 2,  
                nowrap : false, 
                fit : true,  
				columns: [[
					{field: 'WO_NO',title: '工单号',width: 150,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" +value+ "</span>";}},
					{field: 'ITEM_CD',title: '产品编码',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value))return "<span title='" + value + "'>" + value + "</span>";}},
					{field: 'SEQ',title: '工位编号',width: 100,align: 'center',hidden:'true',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
			        {field: 'ASMBLY_PROCS',title: '工位',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
			        {field: 'SHIFT_NM',title: '操作',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
					{field: 'CRT_DT',title: '进入时间',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
					{field: 'CRT_DT',title: '离开时间',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
					{field: 'CRT_ID',title: '员工',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
					{field: 'ASMBLY_PROCS',title: '资源',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
					{field: 'SHIFT_NM',title: '客户序列号',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
					{field: 'SHIFT_NM',title: '包装箱号',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
					{field: 'SHIFT_NM',title: '栈板号',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
					{field: 'SHIFT_NM',title: '批次',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
				]],
				  /**单击进入编辑模式*/
				onClickRow: function (index,row) {
					WO_NO=row.WO_NO;
					PROD_CODE=row.ITEM_CD;
					ASMBLY_PROCS=row.ASMBLY_PROCS;
					COUNT_PROCDE=row.COUNT_PROCDE;
					$("#header-bottom").html(row.PROD_CODE);
					procdeinfo();
					
		        },
			}
			
			initGridView(reqData, gridList);
			dataGrid.datagrid('loadData', jsonData);
		}
	}

	procdeinfo=function(){
		var ajaxParam={//查询物料信息
				url:'/iPlant_ajax',
				dataType:'JSON',
				data:{
					WO_NO: WO_NO,
					PROD_CODE:PROD_CODE,
					ASMBLY_PROCS:ASMBLY_PROCS,
					IFS:"XK00002"
				},
                successCallBack:function(data){
                	var rowCollection = createSourceObj(data);
                	 arrys=rowCollection;
                	if(arrys.length>0){
                		for(var i=0; i<arrys.length; i++){
                			 $('#proced_no').html(arrys[i].ITEM_CD);
                			 $('#proced_nm').html(arrys[i].ITEM_NM);
                			 $('#proced_type').html(arrys[i].ITEM_TYPE);
                			 $('#asmbly_procs').html(ASMBLY_PROCS);
                			 $('#prod_qty').html(COUNT_PROCDE);
                			 $('#wo_no').html(arrys[i].WO_NO);
                			 $('#crt_dt').html(arrys[i].CRT_DT);
                		}
                		bominfo();
                	}
                	
                }
   		}
   		iplantAjaxRequest(ajaxParam);
	}
	procde_mo=function(){
		var ajaxParam={//查询工单信息
				url:'/iPlant_ajax',
				dataType:'JSON',
				data:{
					WO_NO: WO_NO,
					IFS:"XK00003"
				},
				successCallBack:function(data){
					var rowCollection = createSourceObj(data);
					if(rowCollection.length>0){
						for(var i=0; i<rowCollection.length; i++){
							$('#wo_no2').html(rowCollection[i].WO_NO);
							$('#proced_no2').html(rowCollection[i].ITEM_CD);
							$('#proced_nm2').html(rowCollection[i].ITEM_NM);
							$('#asmbly_procs2').html(rowCollection[i].ROUTE_NAME);
							$('#plan_strt_dt').html(rowCollection[i].BEGINDAT);
							$('#plan_end_dt').html(rowCollection[i].PLAN_END_DT);
						}
					}
				}
		}
		iplantAjaxRequest(ajaxParam);
	}
	
	
	bominfo=function(){
		var tables=$("#bomtable");
   		var tr1="<tr><td>工序编码</td><td>工序名称</td><td>物料编码</td><td>物料名称</td><td>物料数量</td><td>物料版本号</td></tr>"
   			tables.append(tr1);
   		var html="";
   		//console.log(arrys);
   		if(arrys.length>0){
    		  for (var i = 0; i < arrys.length; i++) {
					html +="<tr><td>"+arrys[i].SEQ+"</td>"+//工序编码 
					"<td>"+arrys[i].ASMBLY_PROCS+"</td>"+//工序名
					"<td>"+arrys[i].BOM_CD+"</td>"+//物料编码
					"<td>"+arrys[i].BOM_NM+"</td>"+//物料名称
					"<td>"+arrys[i].UNIT_QTY+"</td>"+ //物料数量
					"<td>"+arrys[i].VERSION+"</td></tr>"; //物料版本号
      	    }
    		   $("#bomtable tr:not(:first)").remove(); //删除table（除了第一行以外）
    		  tables.append(html);
    	}
	}
factoryInfo.prototype = {
		init: function() {
			$(function() {
				dataGrid = $('#SNRetrospectiveReport_tab');
				
				
				 $('#tabs1').tabs({ 
					  onSelect : function (title) {
						   	if(title=='产品基础信息'){
						   		
						   		
						   	}else if(title=='物料信息'){
						   		
						   	}else if(title=='组装信息'){
						   		
						   		
						   	}else if(title=='包装信息'){
						   		
						   		
						   	}else if(title=='工单信息'){
						   		
						   		
						   	}else if(title=='维修信息'){
						   		
						   		
						   	}else if(title=='出货信息'){
						   		
						   		
						   		
						   	}
						   },
				  });
				
				//查询
				$('#btnSearch1').click(function() {	
					 linecd="";//客户序列号
					 wc="";//工单号
					 ctn_no="";//箱号
					 moder="";//型号
					 version="";//版本号
					var radios = $("#table1 input[type='radio']:checked").attr('inputid');
					var checkVal = $("#"+radios).textbox('getValue');
					if(radios.length>0){
						if(radios == 'Search_LineCd'){
							linecd=checkVal;
						}else if(radios == 'Search_WC'){
							wc=checkVal;
						}else if(radios == 'Search_Item'){
							moder=checkVal;
						}else if(radios == 'Search_Moder'){
							moder=$("#Search_Moder").textbox('getValue');
							version = $("#Search_Moder2").textbox('getValue');
						}
						WO_NO=wc;
						initGridData();
						procdeinfo();
						procde_mo();
						
					}
				});
				//导出
				$('#btnExprt').click(function(){						
				 	var now = new Date();
                    var year =now.getFullYear();
                	var reqData = {
                	   IFS:''
                	}
                	createTable('tbIMESReport','SN追溯报表','SNRetrospectiveReport_tab',reqData);
                });
			});
		}
	}
	var fcfo = new factoryInfo(),arrys,ASMBLY_PROCS,COUNT_PROCDE,linecd,wc,ctn_no,moder,version,item_cd,WO_NO,PROD_CODE,SEQ;//全局变量
	fcfo.init();
})();