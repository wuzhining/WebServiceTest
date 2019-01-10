(function () {
    function cardDetail() {
        pageConfig={
            gridName: 'prodReport_tab',
            listName: 'optional',
            title:'生产日报',
        },
        optional=0,
        fieldSet = [{ID:'DR_DT',NAME:'日期',ZT:true},            
                    {ID:'CS_CD',NAME:'班次代码',ZT:false},        
                    {ID:'CS_NM',NAME:'班次名称',ZT:true},        
                    {ID:'DO_CD',NAME:'派工单',ZT:true},          
                    {ID:'DICT_IT',NAME:'派工单类别',ZT:true}, 
                    {ID:'MO_CD',NAME:'制令单',ZT:true},          
                    {ID:'ET_CD',NAME:'设备唯一码',ZT:false},        
                    {ID:'ET_NM',NAME:'设备编号',ZT:true},        
                    {ID:'PT_CD',NAME:'物料编码',ZT:true},        
                    {ID:'PT_NM',NAME:'物料名称',ZT:true},        
                    {ID:'DO_NUM',NAME:'派工数量',ZT:true},       
                    {ID:'PT_NUM',NAME:'产品出数',ZT:true},       
                    {ID:'DR_NUM',NAME:'生产数',ZT:true},         
                    {ID:'DR_GQ',NAME:'良品数',ZT:true},          
                    {ID:'DR_BN',NAME:'不良数',ZT:true},          
                    {ID:'DR_AT',NAME:'稼动时间',ZT:false},       
                    {ID:'DR_TC',NAME:'理论产量',ZT:false},       
                    {ID:'DR_DM',NAME:'停机时间',ZT:false},       
                    {ID:'DR_ST',NAME:'计划停机时间',ZT:false},   
                    {ID:'MD_CL',NAME:'标准周期',ZT:false},       
                    {ID:'DR_EE',NAME:'设备效率效率',ZT:false},   
                    {ID:'DR_ER',NAME:'有效开机率',ZT:false},     
                    {ID:'DR_BR',NAME:'不良率',ZT:false},         
                    {ID:'OEE',NAME:'OEE',ZT:false},           
                    {ID:'DICT_IT_NM',NAME:'派工单类别名称',ZT:false}
                    ],//设置
        type=false;
        getListValue=function(){
            return this.optional;
        },
        setListValue=function(value){
            this.optional=value;
        },
        initGridData=function(){
            var dgrid=$('#'+pageConfig.gridName).datagrid('options');
            if(!dgrid) return;
            var now = new Date();
            var year =now.getFullYear();
            var reqData = {
                    IFS: 'R000001',
                    START_TIME:year+'-01-01',
                    END_TIME:year+'-12-30',
                    LVL: "2",//1. 派工单 2.机器编码 3.车间
                    pageIndex:1,
                    pageSize:dgrid.pageSize
            }
         reqGridData('/iPlant_ajax',pageConfig.gridName, reqData);
        },
        bindGridData = function (reqData,jsonData) {
            var grid = {
                name: pageConfig.gridName,
                dataType: 'json',
                columns: [[
						{field:'DR_DT',title:'日期',width:100,align:'center',formatter:function (value ,row ,index){
							if(value != undefined){
								return value.substring(0,10);
							}else{
								return value;
							}
						}},
						{field:'CS_CD',title:'班次代码',width:100,align:'center'},
						{field:'CS_NM',title:'班次名称',width:200,align:'center'},
						{field:'DO_CD',title:'派工单',width:100,align:'center'},
						{field:'DICT_IT',title:'派工单类别',width:100,align:'center'},
						{field:'MO_CD',title:'制令单',width:100,align:'center'},
						{field:'ET_CD',title:'设备唯一码',width:100,align:'center'},
						{field:'ET_NM',title:'设备编号',width:200,align:'center'},
						{field:'PT_CD',title:'物料编码',width:100,align:'center'},
						{field:'PT_NM',title:'物料名称',width:200,align:'center'},
						{field:'DO_NUM',title:'派工数量',width:100,align:'center'},
						{field:'PT_NUM',title:'产品出数',width:100,align:'center'},
						{field:'DR_NUM',title:'生产数',width:100,align:'center'},
						{field:'DR_GQ',title:'良品数',width:100,align:'center'},
						{field:'DR_BN',title:'不良数',width:100,align:'center'},
						{field:'DR_AT',title:'稼动时间',width:200,align:'center'},
						{field:'DR_TC',title:'理论产量',width:200,align:'center'},
						{field:'DR_DM',title:'停机时间',width:200,align:'center'},
						{field:'DR_ST',title:'计划停机时间',width:200,align:'center'},
						{field:'MD_CL',title:'标准周期',width:200,align:'center'},
						{field:'DR_EE',title:'设备效率效率',width:200,align:'center'},
						{field:'DR_ER',title:'有效开机率',width:200,align:'center'},
						{field:'DR_BR',title:'不良率',width:200,align:'center'},
						{field:'OEE',title:'OEE',width:200,align:'center'},
						{field:'DICT_IT_NM',title:'派工单类别名称',width:200,align:'center'}
                ]]
            }
            
            initGridView(reqData,grid);
            $('#'+pageConfig.gridName).datagrid('loadData', jsonData);
            
            //隐藏列
    		for(var j=0; j<fieldSet.length; j++){
    			if(fieldSet[j].ZT){
    				$('#prodReport_tab').datagrid('showColumn',fieldSet[j].ID);
    			}else{
    				$('#prodReport_tab').datagrid('hideColumn',fieldSet[j].ID);
    			}
    		}
        },
		searchByCondition = function(){
			var workOrder = $('#workOrders').textbox('getValue');
			var dispatchOrder = $('#dispatchOrders').textbox('getValue');
			var startDate = $('#startDates').datetimebox('getValue');
            var endDate = $('#endDates').datetimebox('getValue');
            if(startDate !=''&& endDate !=''){
  	        	var strA= startDate.replace(/\-/g, "");
  	        	var strB= endDate.replace(/\-/g, "");
  	        	if(strA>strB){
  	        		$.messager.alert('提示', '开始时间不能大于结束时间！');
          			return;
  	        	}
  	         }
            if(endDate=="" && startDate==""){
            	var now = new Date();
                var year =now.getFullYear();
                startDate=year+'-01-01';
            	endDate=year+'-12-30';
            }
            var reqData ={
                IFS: 'R000001',
                START_TIME:startDate,
                END_TIME:endDate,
                MO_CD:workOrder,
                DO_CD:dispatchOrder,
                LVL: "2",
                pageIndex:1,
                pageSize:10
            };
            reqGridData('/iPlant_ajax',pageConfig.gridName,reqData)
		}
        getDataByCondition =function(){
        	var workOrder = $('#workOrder').textbox('getValue');
			var dispatchOrder = $('#dispatchOrder').textbox('getValue');
            var startDate = $('#startDate').datetimebox('getValue');
            var endDate = $('#endDate').datetimebox('getValue');
            var equipCode = $('#equipCode').combobox('getValue');
			var productName = $('#productName').textbox('getValue');
			var clientReq = $('#clientReq').textbox('getValue');
			var levlNum = $('#levlNum').textbox('getValue');
            if(startDate !=''&& endDate !=''){
  	        	var strA= startDate.replace(/\-/g, "");
  	        	var strB= endDate.replace(/\-/g, "");
  	        	if(strA>strB){
  	        		$.messager.alert('提示', '开始时间不能大于结束时间！');
          			return;
  	        	}
  	         }
            if(endDate=="" && startDate==""){
            	var now = new Date();
                var year =now.getFullYear();
                startDate=year+'-01-01';
            	endDate=year+'-12-30';
            }
            var reqData ={
                IFS: 'R000001',
                DO_CD:dispatchOrder,
                MO_CD:workOrder,
                START_TIME:startDate,
                END_TIME:endDate,
                LVL: "2",
                pageIndex:1,
                pageSize:10
            };
            reqGridData('/iPlant_ajax',pageConfig.gridName,reqData)
            $('#queryTab').dialog('close'); 
        },
        getDataByConditiononce =function(){
        	var workOrder = $('#workOrders').textbox('getValue');
			var dispatchOrder = $('#dispatchOrders').textbox('getValue');
            var startDate = $('#startDates').datetimebox('getValue');
            var endDate = $('#endDates').datetimebox('getValue');
            if(startDate !=''&& endDate !=''){
  	        	var strA= startDate.replace(/\-/g, "");
  	        	var strB= endDate.replace(/\-/g, "");
  	        	if(strA>strB){
  	        		$.messager.alert('提示', '开始时间不能大于结束时间！');
          			return;
  	        	}
  	         }
            if(endDate=="" && startDate==""){
            	var now = new Date();
                var year =now.getFullYear();
                startDate=year+'-01-01';
            	endDate=year+'-12-30';
            }
            var reqData ={
                IFS: 'R000001',
                DO_CD:dispatchOrder,
                MO_CD:workOrder,
                START_TIME:startDate,
                END_TIME:endDate,
                LVL: "2",
                pageIndex:1,
                pageSize:10
            };
            reqGridData('/iPlant_ajax',pageConfig.gridName,reqData)
            $('#queryTab').dialog('close'); 
        },
        getDataList =function(){
        	//初始化
            $("#optional").datagrid({ 
    				columns : [ [
    				        {
    							field : "ID",
    							title : "序号",
    							width : 10,
    							hidden:true
    						},
    						{
    							field : "NAME",
    							title : "隐藏",
    							width : 180,
    							align : "center"
    						} ] ],
    				onDblClickRow: function(rowIndex, rowData){
                                $('#selected').datagrid('appendRow',{
                                    ID: rowData.ID ,NAME:  rowData.NAME       
                                });
                                $('#optional').datagrid('clearChecked');
                                $('#optional').datagrid('deleteRow',rowIndex);
                    }
            });
            $("#selected").datagrid({
            	columns : [ [
     				        {
     							field : "ID",
     							title : "序号",
     							width : 10,
     							hidden:true
     						},
     						{
     							field : "NAME",
     							title : "已选",
     							width : 180,
     							align : "center"
     						} ] ],
     			onDblClickRow: function(rowIndex, rowData) {                                        
                                $('#selected').datagrid('deleteRow',rowIndex);
                                 $('#optional').datagrid('appendRow',{
                                	 ID: rowData.ID ,NAME:  rowData.NAME          
                                });
                                $('#selected').datagrid('clearChecked'); 
                   }
            });

            //初始值
            if(fieldSet.length>0){
            	for(var i=0; i<fieldSet.length; i++){
            		if(fieldSet[i].ZT){
            			$('#selected').datagrid('appendRow',{ID:fieldSet[i].ID,NAME:fieldSet[i].NAME});
            		}else{
            			$('#optional').datagrid('appendRow',{ID:fieldSet[i].ID,NAME:fieldSet[i].NAME});
            		}
            	}
            }
        },
        getRightDate =function(){
            var ds='';
            $('#startDate').datebox().datebox('calendar').calendar({
                validator: function(date){
                    var now = new Date();
                    var d1 = new Date(now.getFullYear(), now.getMonth(), now.getDate());
                    return date<=d1;
                }
            });
            $('#endDate').datebox().datebox('calendar').calendar({
                validator: function(date){
                    ds =$('#startDate').datebox('getValue');
                    var now = new Date();
                    var de =new Date(now.getFullYear(), now.getMonth(), now.getDate());
                    return ds<=date  &&  date<=de;
                    consele.log(de);
                    consele.log(ds);
                }
            });
        }
//        ,
//        createTable=function() {
//        	//获取body标签
//        	var mybody = document.getElementsByTagName("body")[0];
//        	 
//        	// 创建一个<table>元素和一个<tbody>元素
//        	mytable= document.createElement("table");
//        	mytable.id='tbExportData';
//        	mytablebody = document.createElement("tbody");
//        	//创建所有的单元格
//        	for(var j = 0; j < 2; j++) {
//        	    // 创建一个<tr>元素
//        	    mycurrent_row = document.createElement("tr");
//        	    for(var i = 0; i < 2; i++) {
//        	    // 创建一个<td>元素
//        	    mycurrent_cell = document.createElement("td");
//        	    //创建一个文本节点
//        	    currenttext = document.createTextNode("大家好");
//        	    // 将创建的文本节点添加到<td>里
//        	    mycurrent_cell.appendChild(currenttext);
//        	    // 将列<td>添加到行<tr>
//        	    mycurrent_row.appendChild(mycurrent_cell);
//        	    }
//        	    // 将行<tr>添加到<tbody>
//        	    mytablebody.appendChild(mycurrent_row);
//        	}
//        	// 将<tbody>添加到<table>
//        	mytable.appendChild(mytablebody);
//        	//将<table>添加到<body>
//        	mybody.appendChild(mytable);
//        	// 将表格mytable的border属性设置为2
//        	
//        	mytablebody.setAttribute("border", "1");
//        	mytablebody.setAttribute("width", "100%");
//        	mytablebody.setAttribute("cellspacing", "0");
//        	mytablebody.setAttribute("cellpadding", "0");
//        	
//        	mytable.setAttribute("border", "1");
//        	mytable.setAttribute("width", "100%");
//        	mytable.setAttribute("cellspacing", "0");
//        	mytable.setAttribute("cellpadding", "0");
//        }
    }
    cardDetail.prototype = {
        init: function () {
            $(function () {
                initGridData();
                getRightDate();
                
              //设备编号
                var ajaxParam={
                        url:'/iPlant_ajax',
                        data:{
                            IFS:'B000029'
                            },
                        successCallBack:function(data){
                            var rowCollection=createSourceObj(data);
                            var array = new Array();
                            array.push({ "id": "", "text": "全部"});
                            for (var i = 0; i < rowCollection.length; i++) {
                                array.push({ "id": rowCollection[i].ET_CD, "text": rowCollection[i].ET_NM });
                            }
                            $('#equipCode').combobox({
                                data:array,
                                valueField:'id',
                                textField:'text',
                                panelWidth:150
                            });
                        }
                };
                iplantAjaxRequest(ajaxParam);
                $('#btnGaoSearch').click(function(){
                	$("#querywlMes").form("clear");
                    $('#queryTab').dialog('open').dialog('setTitle', pageConfig.title);
                });
                $('#btnSearch').click(function(){
                	getDataByConditiononce();
                });

                $('#save').click(function(){
                    getDataByCondition();
                });
                
                $('.close').click(function(){
                    $('#queryTab').dialog('close');
                    
                });
                $('#btnExprt').click(function(){
                	/*var strHtml='<table id="exportData"><tr><td>列标题1</td><td>列标题2</td><td>类标题3</td><td>列标题4</td><td>列标题5</td></tr>';
                	strHtml+='<tr><td>aaa</td><td>bbb</td><td>ccc</td><td>ddd</td><td>eee</td></tr>  ';
                	strHtml+='</table>';*/
                	//createTable();
                	//$(".datagrid-htable").attr("id","exportTable");
                	//exportData('tbExportData');
                	//exportData('datagrid-btable');
                	var reqData = {
                    	    	IFS: 'R000001',
                    	    	START_TIME:'2016-01-01',
                                END_TIME:'2016-12-30',
                                LVL: "2",
                                pageIndex:1,
                                pageSize:10
                    	};
                    createTable('tbPlantReport','生产日报','prodReport_tab',reqData);
                });
                $('#set').click(function(){
                    $('#queryCondition').dialog('open');
                    getDataList();
                });

                $('#closeCondition').click(function(){
                	 //隐藏列
                    var ops = $("#optional").datagrid('getRows');
                    
                    //显示咧 
                    var sls = $("#selected").datagrid('getRows');
                    
                    //删除所有数据
                    if(ops.length>0){
                    	for(var i=ops.length-1; i>=0;i--){
                    		$('#optional').datagrid('deleteRow',i);
                    	}
                    }
                    if(sls.length>0){
                    	for(var i=sls.length-1; i>=0;i--){
                    		$('#selected').datagrid('deleteRow',i);
                    	}
                    }
                    $('#queryCondition').dialog('close');
                });

                $('#saveCondition').click(function(){
                    //initGridData();
                    
                    //隐藏列
                    var ops = $("#optional").datagrid('getRows');
                    if(ops.length>0){
                    	for(var i=0; i<ops.length;i++){
                    		$('#prodReport_tab').datagrid('hideColumn',ops[i].ID);
                    		for(var j=0; j<fieldSet.length; j++){
                    			if(ops[i].ID==fieldSet[j].ID){
                    				fieldSet[j].ZT=false;
                    			}
                    		}
                    	}
                    }
                    
                    //显示咧 
                    var sls = $("#selected").datagrid('getRows');
                    if(sls.length>0){
                    	for(var i=0; i<sls.length;i++){
                    		$('#prodReport_tab').datagrid('showColumn',sls[i].ID);
                    		for(var j=0; j<fieldSet.length; j++){
                    			if(sls[i].ID==fieldSet[j].ID){
                    				fieldSet[j].ZT=true;
                    			}
                    		}
                    	}
                    }
                    
                    //删除所有数据
                    if(ops.length>0){
                    	for(var i=ops.length-1; i>=0;i--){
                    		$('#optional').datagrid('deleteRow',i);
                    	}
                    }
                    if(sls.length>0){
                    	for(var i=sls.length-1; i>=0;i--){
                    		$('#selected').datagrid('deleteRow',i);
                    	}
                    }
                    
                    $('#queryCondition').dialog('close');
                });
                
               $('#send').click(function(){
                  var options =$("#optional").datagrid('getSelections');
                  for(var i=0;i<options.length;i++){
                      $('#selected').datagrid('appendRow',{ ID: options[i].ID,NAME:options[i].NAME});
                      var index = $('#optional').datagrid('getRowIndex', options[i]);
                      $('#optional').datagrid('clearChecked');
                      $('#optional').datagrid('deleteRow',index);
                  };
                  
              });
              $('#back').click(function(){
                  var options =$("#selected").datagrid('getSelections');
                  var index =$("#selected").datagrid('getRowIndex','options');
                  for(var i=0;i<options.length;i++){
                      $('#optional').datagrid('appendRow',{ ID:options[i].ID,NAME:options[i].NAME});
                      var index = $('#selected').datagrid('getRowIndex', options[i]);
                      $('#selected').datagrid('deleteRow',index);
                      $('#selected').datagrid('clearChecked'); 
                  };
                  
              });
            });
        }
    }
    var card = new cardDetail();
    card.init();
})();

  