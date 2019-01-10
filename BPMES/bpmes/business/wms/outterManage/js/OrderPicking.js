function view() {
	var PICKUP_ID = $("PICKUP_IDO").val();
	var CREATE_DATE = $("#date").val();
	var dgrid = $("#OrderPicking_tab").datagrid('options');
	if (!dgrid)
		return;
	var reqData = {
		IFS : 'WMS_C0000020',
		pageIndex : 1,
		pageSize : dgrid.pageSize,
		PICKUP_ID:PICKUP_ID,
		CREATE_DATE:CREATE_DATE
	}
	reqGridData('../iPlant_ajax', 'OrderPicking_tab', reqData);
	$('#OrderPicking_tab').datagrid({
		view: detailview,
		fitColumns: true,  
	    singleSelect:true,
	    detailFormatter:function(index,row){ 
	    	
            return '<div><table id="ddv-' + index + '"></table></div>';  
        },  
        onExpandRow:function(index,row){
        	var arr = ajaxquery("WMS_C000027","PICKUP_ID:"+row.PICKUP_ID+"");
        	var splits="";
        	for(var i = 0;i<arr.length;i++){
        		if(arr[i].DETAIL_ID==row.DETAIL_ID){
        			
        		}else{
        			splits+="<tr onclick='alterColor(this)'>"+
        			"<td class='PICKUP_ID' style='width:118px'>"+arr[i].PICKUP_ID+"</td><td class='MATERIA_ID' style='width:120px'>"+arr[i].MATERIA_ID+"</td>"+
    				"<td class='MATERIA_NAME' style='width:120px'>"+arr[i].MATERIA_NAME+"</td><td class='PICKUP_NUMBER' style='width:120px'>"+arr[i].PICKUP_NUMBER+"</td>"+
    				"<td class='WAREHOUSE_ID' style='width:120px'>"+arr[i].WAREHOUSE_ID+"</td><td class='WAREHOUSE_NAME' style='width:120px'>"+arr[i].WAREHOUSE_NAME+"</td>"+
    				"<td class='SHELF_ID' style='width:120px'>"+arr[i].SHELF_ID+"</td><td class='SHELF_NAME' style='width:157px'>"+arr[i].SHELF_NAME+"</td>"+
    				"<td class='STORE_ID' style='width:122px'>"+arr[i].STORE_ID+"</td><td class='STORE_NAME' style='width:140px'>"+arr[i].STORE_NAME+"</td>"+
    				"<td class='UNIT_NAME' style='width:126px'>"+arr[i].UNIT_NAME+"</td><td class='CREATE_DATE' style='width:180px'>"+arr[i].CREATE_DATE+"</td>"+
    				"<td class='PICKUPER_NAME' style='width:120px'>"+arr[i].PICKUPER_NAME+"</td><td class='CREATE_NAME' style='width:100px'>"+arr[i].CREATE_NAME+"</td>"+
    				"<td class='DETAIL_ID' style='display:none;'>"+arr[i].DETAIL_ID+"</td>"
    				"</tr>";
        		}
        	}
        	$("#ddv-"+index).append(splits);
            $('#OrderPicking_tab').datagrid('fixDetailRowHeight',index);  
        },onCollapseRow:function(index,row){  
        	$("#ddv-"+index).empty();r
        },onSelect: function(index,row){
        	$("#Checked").css("backgroundColor","transparent");
        	$("#Checked").removeAttr("id");
        }
     });
	  $("#addload_tab").datagrid({
		  onDblClickCell: function(index,field,value){		//开始编辑
  			$(this).datagrid('beginEdit', index);
  			ind=index;
  			/* var obj = $('#addload_tab').datagrid('getData').rows[ind];
  			Loadcombobox("STORE_NAME","WMS_C000008","WAREHOUSE_ID:"+obj.WAREHOUSE_ID+""); */		//当不选择前面下拉框时，加载后面下拉框的数据
  			var ed = $(this).datagrid('getEditor', {index:index,field:field});
  			$(ed.target).focus();
  		},onEndEdit : function(index,row){		//编辑结束后下拉框值问题    解决
  			var ed = $('#addload_tab').datagrid('getData').rows[index];
  			if(objJson.UNIT_NAME!=undefined){
  				ed["UNIT_NAME"]=objJson.UNIT_NAME;
  			}
  			if(objJson.WAREHOUSE_NAME!=undefined){
  				ed["WAREHOUSE_NAME"]=objJson.WAREHOUSE_NAME;
  			}
  			if(objJson.STORE_NAME!=undefined){
  				ed["STORE_NAME"]=objJson.STORE_NAME;
  			}
  			if(objJson.SHELF_NAME!=undefined){
  				ed["SHELF_NAME"]=objJson.SHELF_NAME;
  			}
  			if(objJson.POSITION_NAME!=undefined){
  				ed["POSITION_NAME"]=objJson.POSITION_NAME;
  			}
  			/*objJson={};	//编辑结束后清除值
*/  		}
	  });
	           
	    
};

function bindGridData(reqData, jsonData) {
	var gridList = {
		name : 'OrderPicking_tab',
		dataType : 'json',
		columns : [ [ {
			field : 'PICKUP_ID',
			title : '拣货单号',
			width : 100
		},{
			field : 'DETAIL_ID',
			title : '详情编号',
			hidden:true,
			width : 100
		}, {
			field : 'MATERIA_ID',
			title : '物料编码',
			width : 100
		}, {
			field : 'MATERIA_NAME',
			title : '物料名称',
			width : 100
		},{
			field : 'PICKUP_NUMBER',
			title : '拣货数量',
			width : 100
		}, {
			field : 'WAREHOUSE_ID',
			title : '仓库编码',
			width : 100
		}, {
			field : 'WAREHOUSE_NAME',
			title : '仓库名称',
			width : 100
		}, {
			field : 'SHELF_ID',
			title : '货架编码',
			width : 100
		}, {
			field : 'SHELF_NAME',
			title : '货架名称',
			width : 130
		}, {
			field : 'STORE_ID',
			title : '货位编码',
			width : 100
		}, {
			field : 'STORE_NAME',
			title : '货位名称',
			width : 120
		},{
			field : 'UNIT_NAME',
			title : '计量单位',
			width : 100
		},{
			field : 'CREATE_DATE',
			title : '单据日期',
			width : 150
		},{
			field : 'PICKUPER_NAME',
			title : '拣货人',
			width : 100
		},{
			field : 'CREATE_NAME',
			title : '制单人',
			width : 100
		} ] ] 
	}
	initGridView(reqData, gridList);
	$("#OrderPicking_tab").datagrid('loadData', jsonData);
}




function ajaxquery(id, b) {
	var arr = new Array();
	var d = {
		IFS : id,
		reqType : "WEB"
	};
	reqParam = b.split(",");
	if ("" != reqParam) for (var e = 0; e < reqParam.length; e++) {			//当无输入参数时，此判断不会进入循环将不会进入
    var f = reqParam[e].toString().replace('"', ""),
    g = f.substring(0, f.indexOf(":")).toString(),
    h = f.indexOf(":") + 1,								
    i = f.substring(h).toString();
    d[g] = i
} 
	var c = "";
	null != d && (c = '{"REQ":[{"REQ_DATA":' + JSON.stringify(d) + "}]}");
	var w = 1;
	$.ajax({
		async : false,
		type : "POST",
		url : "../../../iPlant_ajax",
		dataType : "json",
		data : {
			reqStr : c
		},
		success : function(data) {
			arr = data.RESPONSE[0].RESPONSE_DATA;
		}
	});
	return arr;
}

function closeOpen() {			//打开窗口	加载符合的数据
	var fal=$("#OrderPicking_tab").datagrid('getSelected');
	var idPick="";
	if(fal){	//判断是否存在选中的行	父节点
		idPick=fal.PICKUP_ID;
	}else{		//选中子节点进行操作
		idPick=gainChecked().PICKUP_ID;
	}
	var objarrWAREHOUSE=ajaxquery("WMS_C000007","");
	var objarrPOSITION;
	var objarrSHELF;
	var objarrSTORE;
	var objarrMATERIA;
	var objarrUNIT=ajaxquery("WMS_C0000016","");
	$('#addload_tab').datagrid({
		fitColumns:true,
		singleSelect:true,
	    columns:[[
			{field:'DETAIL_ID',title:'详情编号',width:100,
				editor:{type:'validatebox',
			   options:{validType:['length[1,10]','specialTextCharacter']}
			}},		
	        {field:'WAREHOUSE_NAME',title:'仓库名称',width:100,
	        	editor:{  
                    type: 'combobox',  
                    options: {  
                       data: objarrWAREHOUSE,  
                       valueField: "WAREHOUSE_ID",  
                       textField: "WAREHOUSE_NAME",  
                       required: true,
                       onSelect :function(row){
                    	 objarrSTORE = ajaxquery("WMS_C000008","WAREHOUSE_ID:"+row.WAREHOUSE_ID+"");		//没次选择时进入
                    	  if(ind!=undefined){
                    		var ed=$("#addload_tab").datagrid('getEditor',{
                 				index:ind,
                 				field:'STORE_NAME',
                 			});
                          	$(ed.target).combobox('clear');
                     		$(ed.target).combobox('loadData',objarrSTORE);
                     		objJson.WAREHOUSE_ID=row.WAREHOUSE_ID;	//修改后的数据
                     		objJson.WAREHOUSE_NAME=row.WAREHOUSE_NAME;
                    	  }
                     }
                   }  
                }},
            {field:'STORE_NAME',title:'储区名称',width:100,
    	        	editor:{  
                        type: 'combobox',  
                        options: {  
                           valueField: "STORE_ID",  
                           textField: "STORE_NAME",  
                           required: true,
                           onSelect:function(row){
                        	   objarrSHELF =  ajaxquery("WMS_C000009","STORE_ID:"+row.STORE_ID+"");
                        	   if(ind!=undefined){
                         		  var ed=$("#addload_tab").datagrid('getEditor',{
                          				index:ind,
                          				field:'SHELF_NAME',
                          			});
                               	$(ed.target).combobox('clear');
                          		$(ed.target).combobox('loadData',objarrSHELF);
                          		objJson.STORE_ID=row.STORE_ID;	//修改后的数据
                          		objJson.STORE_NAME=row.STORE_NAME;
                         	  }
                         }
                       }  
               }},
	        {field:'SHELF_NAME',title:'货架名称',width:100,
	        	editor:{  
                    type: 'combobox',  
                    options: {  
                       data: objarrSHELF,  
                       valueField: "SHELF_ID",  
                       textField: "SHELF_NAME",  
                       required: true,
                       onSelect:function(row){
                    	   objarrSTORE =  ajaxquery("WMS_C0000010","SHELF_ID:"+row.SHELF_ID+"");
                    	   if(ind!=undefined){
                     		  var ed=$("#addload_tab").datagrid('getEditor',{
                      				index:ind,
                      				field:'POSITION_NAME',
                      			});
                           	$(ed.target).combobox('clear');
                      		$(ed.target).combobox('loadData',objarrSTORE);
                      		objJson.SHELF_ID=row.SHELF_ID;	//修改后的数据
                      		objJson.SHELF_NAME=row.SHELF_NAME
                     	  }
                     }
                   }  
                }},
	        {field:'POSITION_NAME',title:'货位名称',width:100,
	        	editor:{  
                    type: 'combobox',  
                    options: {  
                       data: objarrPOSITION,  
                       valueField: "POSITION_ID",  
                       textField: "POSITION_NAME",  
                       required: true,
                       onSelect:function(row){
                    	   objarrMATERIA = ajaxquery("WMS_C000039","POSITION_ID:"+row.POSITION_ID+"");
                    	   if(ind!=undefined){
                    		   var ed=$("#addload_tab").datagrid('getEditor',{
                     				index:ind,
                     				field:'MATERIA_NAME',
                     			});
                    		   $(ed.target).combobox('clear');
                         		$(ed.target).combobox('loadData',objarrMATERIA);
                    		   objJson.POSITION_ID=row.POSITION_ID;	//修改后的数据
                        	   objJson.POSITION_NAME=row.POSITION_NAME;
                    	   }
                    	   
                     }
                   }  
                }},
              {field:'MATERIA_NAME',title:'物料名称',width:100,
    	        	editor:{  
                        type: 'combobox',  
                        options: {  
                           data: objarrPOSITION,  
                           valueField: "MATERIA_ID",  
                           textField: "MATERIA_NAME",  
                           required: true, 
                           onSelect:function(row){
                        	   objJson.MATERIA_ID=row.MATERIA_ID;	//修改后的数据
                        	   objJson.MATERIA_NAME=row.MATERIA_NAME;
                         }
                       }  
                 }},{
         			field : 'PICKUP_NUMBER',
        			title : '拣货数量',
        			width : 100,
        			editor:{type:'validatebox',
        		           options:{validType:['length[1,10]','specialTextCharacter']}
        		}},
	        {field:'UNIT_NAME',title:'计量单位',width:100,
	        	editor:{  
                    type: 'combobox',  
                    options: {  
                       data: objarrUNIT,  
                       valueField: "UNIT_ID",  
                       textField: "UNIT_NAME",  
                       required: true,
                       onSelect:function(row){
                    	   objJson.UNIT_ID=row.UNIT_ID;	//修改后的数据
                    	   objJson.UNIT_NAME=row.UNIT_NAME;
                     }
                   }  
                }},
	        {field:'PICKUPER_NAME',title:'拣货人',width:100,
        			editor:{type:'validatebox',
     		           options:{validType:['length[1,10]','specialTextCharacter']}
     		}},
	        {field:'CREATE_NAME',title:'制单人',width:100,
    			editor:{type:'validatebox',
 		           options:{validType:['length[1,10]','specialTextCharacter']}
 		}},
	    ]]    
	}); 
	var arr = ajaxquery("WMS_C000027","PICKUP_ID:"+idPick+"");	//查询出符合单号的数据
	$("#ADDPICKUP_IDO").textbox('setValue',idPick);	//设置拣货单ID
	$('#ADDPICKUP_IDO').textbox('textbox').attr('readonly',true);	//拣货单ID不可编辑
	$('#addload_tab').datagrid("loadData",arr);	//加载数据
	$('#enditTab').dialog('open');	//打开窗口
	
}

function del(){
	/**/
	var fal=$("#OrderPicking_tab").datagrid('getSelected');
	var idPick="";
	if(fal){	//选中父节点进行操作
		idPick=fal.PICKUP_ID;
		ajaxquery("WMS_C000033","DETAIL_ID:"+idPick+"");
	}else{		//选中子节点进行操作
		idPick=gainChecked().DETAIL_ID;
		ajaxquery("WMS_C0000023","DETAIL_ID:"+idPick+"");
		$("#Checked").remove();
	}
	
}

//保存数据
function Saveload(){
	var objfal = $('#addload_tab').datagrid('getData').rows[ind].DETAIL_ID;	//用于判断是操作的新增的行还是修改行、
	$("#addload_tab").datagrid('endEdit', ind);
	var obj = $('#addload_tab').datagrid('getData').rows[ind];
	objJson.PICKUP_ID = $("#ADDPICKUP_IDO").textbox("getText");
	objJson.PICKUP_NUMBER = obj.PICKUP_NUMBER;
	objJson.PICKUPER_NAME = obj.PICKUPER_NAME;
	objJson.CREATE_NAME = obj.CREATE_NAME;	
	objJson.DETAIL_ID=obj.DETAIL_ID;
	var splits="PICKUP_ID:"+objJson.PICKUP_ID+",DETAIL_ID:"+objJson.DETAIL_ID+",PICKUP_NUMBER:"+objJson.PICKUP_NUMBER+",PICKUPER_NAME:"+objJson.PICKUPER_NAME+",CREATE_NAME:"+objJson.CREATE_NAME+
	",WAREHOUSE_ID:"+objJson.WAREHOUSE_ID+",WAREHOUSE_NAME:"+objJson.WAREHOUSE_NAME+",STORE_ID:"+objJson.STORE_ID+",STORE_NAME:"+objJson.STORE_NAME+",SHELF_ID:"+objJson.SHELF_ID+",SHELF_NAME:"+objJson.SHELF_NAME+
	",POSITION_ID:"+objJson.POSITION_ID+",POSITION_NAME:"+objJson.POSITION_NAME+",MATERIA_ID:"+objJson.MATERIA_ID+",MATERIA_NAME:"+objJson.MATERIA_NAME+",UNIT_ID:"+objJson.UNIT_ID+",UNIT_NAME:"+objJson.UNIT_NAME+"";
	
	if(objfal!=undefined){
		ajaxquery("WMS_C0000024",splits);
	}else{
		ajaxquery("WMS_C0000021",splits);
	}
}

//获取选中的数据（table子节点）
function gainChecked(){
	var id = $("#Checked");
	var obJson={"PICKUP_ID":id.find(".PICKUP_ID").text(),"DETAIL_ID":id.find(".DETAIL_ID").text()};
	return obJson;
}

//开始编辑加载下拉框数据
function Loadcombobox(name,url,val){
	var obj=ajaxquery(url,val);
	var ed=$("#addload_tab").datagrid('getEditor',{
			index:ind,
			field:name,
		});
	$(ed.target).combobox('loadData',obj);
}

/**
 * 变换背景颜色
 * @param c
 */
function alterColor(c){
	$("#Checked").css("backgroundColor","transparent");
	$("#OrderPicking_tab").datagrid("uncheckAll");
	$(c).attr('id','Checked');
	$(c).css("backgroundColor","#FFE4B5");
	gainChecked();
}

/**
 * 获取选中下拉框的值
 */
function getcheckedVal(name){
	var ed=$("#addload_tab").datagrid('getEditor',{
		index:ind,
		field:name,
	});
	return $(ed.target).combobox('getValue');
}

/**
 * 获取选中下拉框的文本值
 * @param name
 * @returns
 */
function getcheckedText(name){
	var ed=$("#addload_tab").datagrid('getEditor',{
		index:ind,
		field:name,
	});
	return $(ed.target).combobox('getText');
}

/**
 * 追加新的行
 */
function Addrow(){
	var row = $("#addload_tab").datagrid('getSelected');
	if (row){
		var index = $("#addload_tab").datagrid('getRowIndex', row);
	} else {
		index = 0;
		editIndex = 0;
	}
	$("#addload_tab").datagrid('insertRow', {
		index: index,
		row:{}
	});
}
