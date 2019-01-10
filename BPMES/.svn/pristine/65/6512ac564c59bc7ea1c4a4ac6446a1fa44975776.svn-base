/* 启动时加载 
*/
(function(){
	/*全局变量*/
	var operationType = 0;//操作类别(0:新增;1:修改) 默认新增
	var materialArray=[];     //物料编号
	/*方法*/
	function initMaterialData(mouldCode){
		var ajaxParam = {
			url:'/iPlant_ajax',
			data:{
				IFS : 'T000069',
				MD_SN:mouldCode
			},
			successCallBack:function(data){
				var rowCollection = createSourceObj(data);
				for(var i=0; i<rowCollection.length;i++){
			    	materialArray.push({"id":rowCollection[i].PT_CD,"text":rowCollection[i].PT_NM});
			    }
			 }
		}
		iplantAjaxRequest(ajaxParam);
	}
	function initMouldStatusData(){
		var ajaxParam = {
			url:'/iPlant_ajax',
			data:{
			  IFS : 'D000008',
			  DICT_CD :'MDS01',
			  USE_YN:'Y'
		    },
		    successCallBack:function(data){
		    	var mouldStatus=[];
		    	mouldStatus.push({"id":"","text":""});
		    	var rowCollection = createSourceObj(data);
		    	for(var i=0; i<rowCollection.length;i++){
		    		mouldStatus.push({"id":rowCollection[i].DICT_IT,"text":rowCollection[i].DICT_IT_NM});
		        }
		    	$('#cbMouldStatus').combobox({
		    		valueField:'id',
  					textField:'text',
  					data:mouldStatus
  				});
		    }
		 }
		iplantAjaxRequest(ajaxParam);
	}
	
	function getDataBySearch(){
		var mouldCode=$('#txtMouldCode').textbox('getValue');
	    var mouldStatus=$('#cbMouldStatus').combobox('getValue');
		var dgrid=$('#mouldinfo_tab').datagrid('options');
		var reqData = {
			IFS: 'T000065',
			MD_SN:mouldCode,
			MD_SU:mouldStatus,
			pageIndex: 1,
			pageSize: dgrid.pageSize
		}
		reqGridData('/iPlant_ajax', 'mouldinfo_tab',reqData);
	}
	
	function bindGridData(reqData,jsonData){
		var grid={
				name:'mouldinfo_tab',
				dataType: 'json', 
				columns: [[
					{ field: 'MD_SN',  title: '模具编号', width: 100 ,align:'center'},
					{ field: 'MC_CN',  title: '模穴数', width: 80,align:'center'},
					{ field: 'MU_CN',  title: '可用模穴数', width: 80,align:'center'},
					{ field: 'MG_PC',  title: '产品种类数', width: 80,align:'center'},
					{ field: 'MG_PC',  title: '保养周期', width: 80,align:'center'},
					{ field: 'SD_PC',  title: '标准周期', width: 80,align:'center'},
					{ field: 'IN_PC',  title: '最小周期', width: 80,align:'center'},
					{ field: 'AX_PC',  title: '最大周期', width: 80,align:'center'},
					{ field: 'IM_PU',  title: '注塑压力', width: 80,align:'center'},
					{ field: 'IM_TP',  title: '注塑温度', width: 80,align:'center'},
					{ field: 'CRT_ID', title: '创建人', width: 100,align:'center'},
	                { field: 'CRT_DT', title: '创建时间', width: 220,align:'center'},
	                { field: 'UPT_ID', title: '修改人', width: 100,align:'center'},
	                { field: 'UPT_DT', title: '修改时间', width: 220,align:'center'}
			    ]]
		}
		initGridView(reqData,grid);
		$('#mouldinfo_tab').datagrid('loadData',jsonData);
	}
	
	initDetailGridData=function (mouldCode){
		 var ajaxParam={
			 url:'/iPlant_ajax',
			 data:{
				 IFS:'T000070',
				 MD_SN:mouldCode,
				 pageIndex:1,
				 pageSize:1000
			 },
			 successCallBack: function (data) {
				 var jsonData ={total:0,rows:[]};
				 var rowCollection = createSourceObj(data);
				 if(rowCollection.length != 0){
					 jsonData.rows=rowCollection;
					 jsonData.total=rowCollection.length;
				 }
				 $('#moduleproduct_tab').datagrid({       
						name:'moduleproduct_tab',
						dataType: 'json', 
						columns: [[
							{ field: 'MD_SN',  title: '模具编号',align:'center'},
							{ field: 'PT_CD',  width: 200,align:'center',hidden:true},
							{ field: 'PT_NM',  title: '物料编号', width: 280,align:'center',editor : {
								type : "combobox",
								options : {
									valueField:'id',
									textField:'text',
									data:materialArray,
									editable:true
								}
							}},
							{ field: 'EM_PCN',  title: '每模产品数', width: 150,align:'center',editor : {
								type : "numberbox",
								value: 0,
								options : {
									precision:0,
									min:0
								}
							}}
						]],
					    onClickRow: function(index,row){	
					    	$('#moduleproduct_tab').datagrid("beginEdit", index);
					     },
					     onBeforeEdit:function(index,row){
						    },
					     onAfterEdit:function(index,row){
					    	row.edited = true;				   
					     }    
			     }); 
				 $('#moduleproduct_tab').datagrid('loadData',jsonData);
			 }
			 
		 }
		 iplantAjaxRequest(ajaxParam);
	}
	
    function checkForm(){
    	var isPass=true;
    	var mouldCode=$('#txtMouldNo').textbox('getValue');
    	if(mouldCode==''){
    	    isPass=false;
    	}
    	return isPass;
    }
	
	function addMouldInfo() {
    	operationType=0;
		$("#enditTab").dialog("open").dialog('setTitle', '模具维护');
		$("#txtMouldNo").combobox('readonly',false);
		$("#fmMould").form("clear");
		initMaterialData('');
		initDetailGridData('c');
	}
    
	function delMouldInfo(){
    	var row = $('#mouldinfo_tab').datagrid('getSelected');
        if (row== null) {
            $.messager.alert('提示', '请选择一条数据进行删除');
            return;
        }
        console.log(row.CD);
        $.messager.confirm('确认框', '您确定要删除您所选择的数据?', function (r) {
        	if(r==true){
        		var ajaxParam = {
        			url: '/iPlant_ajax',
        			dataType: 'JSON',
        			data: {
        				IFS: 'T000068',
        				MD_SN: row.MD_SN
        			},
        			successCallBack:function(data){
        				if(data.RESPONSE["0"].RESPONSE_HDR.MSG_CODE=='0'){
        					$.messager.alert('提示', '删除成功!','',function(){
        						getDataBySearch();
        					});
        				}
        				else
        				{
        					$.messager.alert('提示','删除失败,此数据正在使用!')
        				}
        			 },
        			 errorCallBack:function(data){
        				 $.messager.alert('提示','删除失败,服务器无响应!');
                     }
               };
        	iplantAjaxRequest(ajaxParam);
         }
       });   
    }
    
	updateMouldInfo=function (){
    	operationType=1;//1表示修改
		var row = $('#mouldinfo_tab').datagrid('getSelected');
		if(row ==null || row == 'undefine'){
			$.messager.alert('提示','请选择一条数据进行修改！');
			return;
		}
		
		$("#enditTab").dialog("open").dialog('setTitle', '模具资料维护');
		$("#txtMouldNo").textbox('setValue',row.MD_SN);
		$("#txtMouldNo").textbox('readonly',true);
		$("#txtStockCnt").textbox('setValue',row.MC_CN);
		$("#txtGoodStockCnt").textbox('setValue',row.MU_CN);
		$("#txtProductCnt").textbox('setValue',row.IM_CN);
		$("#txtMaintionCycle").textbox('setValue',row.MG_PC);
		$("#txtStandCycle").textbox('setValue',row.SD_PC);
		$("#txtMinCycle").textbox('setValue',row.IN_PC);
		$("#txtMaxCycle").textbox('setValue',row.AX_PC);
		$("#txtInjectionPress").textbox('setValue',row.IM_PU);
		$("#txtInjectionTemp").textbox('setValue',row.IM_TP);
		
		initDetailGridData(row.MD_SN);
    }
    
    saveMouldInfo=function (){
    	
    	var mouldNo=$('#txtMouldNo').textbox('getValue');
    	var stockCnt=$("#txtStockCnt").textbox('getValue');
		var goodStockCnt=$("#txtGoodStockCnt").textbox('getValue');
		var productCnt=$("#txtProductCnt").textbox('getValue');
		var maintionCycle=$("#txtMaintionCycle").textbox('getValue');
		var standCycle=$("#txtStandCycle").textbox('getValue');
		var minCycle=$("#txtMinCycle").textbox('getValue');
		var maxCycle=$("#txtMaxCycle").textbox('getValue');
		var injectionPress=$("#txtInjectionPress").textbox('getValue');
		var injectionTemp=$("#txtInjectionTemp").textbox('getValue');
		
		var Rows=$('#moduleproduct_tab').datagrid('getRows');
		var cLength  = 0;
		for(i=0 ; i<Rows.length; i++){
			cLength +=parseInt(Rows[i].EM_PCN);
		}
		
		if(mouldNo==''){
    		$.messager.alert('提示','请输入模具编号');
    		return;
    	}
		if(cLength > parseInt(goodStockCnt) ){
			$.messager.alert('提示','您所输入的每模产品总数大于可用模具数,请重新输入');
    		return;
		}
    	var ifsNo='T000066',msg='新增模具资料成功',errMsg='新增模具资料失败，请联系管理员';
    	if(operationType==1){
    		ifsNo='T000067',
    		msg='更新模具资料成功',
    		errMsg='更新模具资料失败，请联系管理员';
    	}
		
		var ajaxParam={
			url:'/iPlant_ajax',
    		dataType: 'JSON',
    		data:{
    			IFS:ifsNo,
    			MD_SN:mouldNo,
        		MC_CN:stockCnt,
        		MU_CN:goodStockCnt,
        		MG_PC:maintionCycle,
        		IM_CN:productCnt,
        		SD_PC:standCycle,
        		IN_PC:minCycle,
        		AX_PC:maxCycle,
        		IM_PU:injectionPress,
        		IM_TP:injectionTemp
    		},
			successCallBack:function(data){
				var detailGridRows=$('#moduleproduct_tab').datagrid('getRows');
				for(var i=0; i<detailGridRows.length; i++){
					$('#moduleproduct_tab').datagrid('endEdit',i);
				}
	    		var isobj ={};
	    		var isSame;
	    		for(var i=0; i< detailGridRows.length; i++){
	    			if(!detailGridRows[i].edited){
							isSame=	detailGridRows[i].PT_CD
						}else{
							isSame=detailGridRows[i].PT_NM
						}
	    			if(isSame in isobj){
	    				$.messager.alert('提示','该物料编号'+isSame+'已存在，请确认！');
	        			return;
	    			}
	    			else
	    			{	    				isobj[isSame]= i;
	    			}
	    		}
				var mouldProductMap=new Array();
				if(detailGridRows!=null && detailGridRows.length>0){
					for(var i=0;i<detailGridRows.length;i++){
						if(!detailGridRows[i].edited){
							mouldProductMap.push({MD_SN:detailGridRows[i].MD_SN,PT_CD:detailGridRows[i].PT_CD,EM_PCN:detailGridRows[i].EM_PCN});	
						}
						else
						{
							mouldProductMap.push({MD_SN:detailGridRows[i].MD_SN,PT_CD:detailGridRows[i].PT_NM,EM_PCN:detailGridRows[i].EM_PCN});	
						}
						
					}
					var ajaxDetailParam = {//批量删除 设备编号
		                	async: false,
		                    url: '/iPlant_ajax',
		                    dataType: 'JSON',
		                    data:{
		                    	MD_SN: mouldNo,
		                    	IFS: 'T000071'
		                    },
		                    successCallBack: function(data) {
		                    	if(mouldProductMap.length > 0){
		                    		var ajaxParam1 = {
			        	                	async: false,
			        	                    url: '/iPlant_ajax',
			        	                    dataType: 'JSON',
			        	                    data:{
			        	                    list:mouldProductMap,
			        	                    IFS: 'T000072'
			        	                    },successCallBack: function(data) {
			        	                    	$.messager.alert('提示','保存成功！','',function (){
			    	    	    					$('#enditTab').dialog('close');
			    	    	    					initDetailGridData('');
			    	    	    				});
			        	                    }
			        	                };
			        	                iplantAjaxRequest(ajaxParam1);
		                    	}
		                    }
		                };
		                iplantAjaxRequest(ajaxDetailParam);
					}
			}
    	}
		iplantAjaxRequest(ajaxParam);
	}
    
     function addMouldProductMapInfo(){
    	var isPassValid=checkForm();
    	if(!isPassValid){
    		$.messager.alert('提示', '模具编号不能为空');
    		return;
    	}
    	var mouldCode=$('#txtMouldNo').textbox('getValue');
		$('#moduleproduct_tab').datagrid('insertRow',{index:0,row:{MD_SN:mouldCode,PT_CD:'',EM_PCN:'0',PT_NM:''}}); 
		$('#moduleproduct_tab').datagrid('beginEdit',0); 
    }
    window.bindGridData=bindGridData;
    $(function(){
    	initMouldStatusData();
    	initMaterialData()
    	getDataBySearch();
    	$('#btnSearch1').click(function() {
        	getDataBySearch();
    	});
    	$('#btnAdd').click(function(){
    		addMouldInfo();
    	});
    	$('#btnAddDetail').click(function(){
    		addMouldProductMapInfo();
    	});
    	$('#btnDelDetail').click(function(){
    		var row =  $('#moduleproduct_tab').datagrid('getSelected'); 
    		if(row==null){
    			$.messager.alert('提示','请选择一条数据进行删除！');
    			return;
    		}
    		var index = $('#moduleproduct_tab').datagrid('getRowIndex',row); 
    		$('#moduleproduct_tab').datagrid('deleteRow',index); 
    	});
    	$('#btnUpdate').click(function(){
    		updateMouldInfo();
    	});
    	$('#btnDelete').click(function(){
    		delMouldInfo();
    	});
    })
})()
   