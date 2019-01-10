/* 启动时加载 */
/*
 */
(function() {
    
	var newTime='';
//	var myrowCollection =new Array();
//	var myrowCollection1 =new Array();
	var packageCodeString='';
	var dayinIndex='';
	var editIndex = undefined;
	var editIndex3 = undefined;
	var newTime='';
	var dataType=0;
	var lastListType=0;
	var lastListData='';
	var relationData=[];
	var packageData=[];
	var UpdataNewId='';
	var flage='';
	
	function TrayInfo2() {
		appendList = function(){
        	var myChecckInid=$('#ORDER_ID2').textbox('getValue');
        	ccIndex= 0;
        	eeEndEdit('TaryInfo_tab');
            $('#TaryInfo_tab').datagrid('insertRow',{index:0,row:{ORDER_ID:myChecckInid,PURCHASE_NUMBER:'1',DELIVE_NUMBER:'0'}});
            $('#TaryInfo_tab').datagrid('selectRow', 0).datagrid('beginEdit', 0); 
        },
        removeList =function(){
//        	eeEndEdit('TaryInfo_tab');
        	var checkedItems = $('#TaryInfo_tab').datagrid('getSelections');
            if(checkedItems.length != 1){
            	$.messager.alert('提示', '请选择一条数据进行删除');
                return;
            }
            //确认提示框
            $.messager.confirm("确认框", "您确定要删除您所选择的数据?", function (r) {
           	 if(r==true){
                   	 var ajaxParam = {
                                url: '/iPlant_ajax',
                                dataType: 'JSON',
                                data: {
                                	ORDERID: checkedItems[0].ORDER_ID,
                                	MATERIAID:checkedItems[0].MATERIA_ID,
//                                	BARCODE:'cc9958',
						            IFS:'WMS_C000037',
						            DELETETYPE:'2'
                                },
                                successCallBack:function(data){
                                	var index = $('#TaryInfo_tab').datagrid('getRowIndex', checkedItems[0]); 
                                    $('#TaryInfo_tab').datagrid('deleteRow', index); 
                                	$.messager.alert('提示', "删除成功","",function(){
//                                		initGridData();
                                	});
                        			return;
                                }
                         };
                        iplantAjaxRequest(ajaxParam);
           	 }
            });   
        },
		/**初始化公司combobox内容*/
		initGridData = function() {
			var reqData = {
				IFS: 'WMS_C000001',
				pageIndex: 1,
				pageSize: 10
			}
			reqGridData('/iPlant_ajax', 'TaryInfo_tab2', reqData);
		},
		
		bindGridData = function(reqData, jsonData) {
			var gridList = {
				name: 'TaryInfo_tab2',
				dataType: 'json',
				columns: [[
					{field: 'ORDER_ID',title: '采购订单编号',width: 200,align: 'center'}, 
					{field: 'SN_NUMBER',title: '批次号',width: 120,align: 'center'},
//					{field: 'MATERIA_ID',title: '物料编码',width: 150,align: 'center'},
//					{field: 'ITEM_NM',title: '物料名称',width: 150,align: 'center'}, 
//					{field: 'PURCHASE_NUMBER',title: '采购数量',width: 100,align:'center'},
					{field: 'SUPPLIER_ID',title: '供应商编码',width: 150,align: 'center'},
					{field: 'SUPPLIER_NAME',title: '供应商名称',width: 150,align: 'center'}, 
					{field: 'CT_MN',title: '联系人',width: 150,align: 'center'},
					{field: 'PN_NB',title: '联系电话',width: 150,align: 'center'},					
//					{field: 'UNIT_ID',title: '计量单位',width: 100,align: 'center'},
//					{field: 'UNIT_NAME',title: '计量单位名称',width: 100,align: 'center'},
//					{field: 'EMP_NM',title: '制单人',width: 100,align: 'center'},
//					{field: 'DELIVE_NUMBER',title: '到货数量',width: 100,align: 'center'},
					{field: 'P_DELIVE_DATE',title: '预计到账日期',width: 150,align: 'center'}, 
					{field: 'CREATE_DATE',title: '单据日期',width: 150,align: 'center'}
				]],
				onDblClickRow: function (index, rowData) {
					zt=1;
                	$('#enditTab').dialog('open').dialog('setTitle','采购订单详情');
                	$("#ORDER_ID2").textbox('setValue',rowData.ORDER_ID);
                	$("#txtPCH").textbox('setValue',rowData.SN_NUMBER);
                	$("#SUPPLIER_ID").combobox('setValue',rowData.SUPPLIER_ID);
                	$("#predicateDeliveDate").datebox('setValue',rowData.P_DELIVE_DATE);
                	initListdata(rowData.ORDER_ID);
                }
			}
            initGridView(reqData,gridList);
            $('#TaryInfo_tab2').datagrid('loadData', jsonData);
			
		},
		 beginAdd =function(){
        	dataType=0;
        	$("#SUPPLIER_ID").combobox('setValue',"");
        	$("#predicateDeliveDate").datebox('setValue',"");
        	$('#enditTab').dialog('open').dialog('setTitle','新增采购订单');  
        	initListdata('testcc9958');
        },
        eeEndEdit = function(str){
    		var rows = $('#'+str).datagrid('getRows');
    		if(rows.length>0){
    			for(var i=0; i<rows.length; i++){
    				$('#'+str).datagrid('endEdit',i);
    			}
    		}
    	},
		initListdata =function(sn){
			iplantAjaxRequest( {
	 			url: '/iPlant_ajax',
	 			data: 
	 			{
	 				IFS:'WMS_C000002',
	 				ORDER_ID: sn,
	                pageIndex:1,
	        		pageSize:1000
	 			},
	 			successCallBack: function (data) {
	 				var jsonData ={total:0,rows:[]};
	 				if(data.RESPONSE[0].length != 0){
	 					jsonData.rows=data.RESPONSE[0].RESPONSE_DATA;
	 	 				jsonData.total=data.RESPONSE[0].RESPONSE_DATA.length;
	 				}
	 				$('#TaryInfo_tab').datagrid({
	 					dataType: 'json', 
	 	                columns: [[
	 	                   	{field:'ORDER_ID', title: 'orderid', width:80,align:'center',hidden:true},
	 	                    {field:'DETAIL_ID', title: 'DETAIL_ID', width:80,align:'center',hidden:true},
	 	                   	{field:'ITEM_NM',title: '物料信息<span style="color:red">*</span>', width:180,align:'center',
	 	                		formatter:function(value, row, index){
	 	                			return wl[value];
	 	                		},
	 	                        editor:{  
	 	                            type:'combobox',
	 	                            options:{
	 	                            	valueField:'id',
	 	                                textField:'text',
	 	                                panelWidth:200,
	 	                                panelHeight:200,
	 	                                editable:false,
	 	                                data:dataWL,
	 	                                onSelect:function(data){	
//	 	                                	var rows = $('#TaryInfo_tab').datagrid('getRows');
//	 	                                	if(rows.length>0){
//	 	                                		for(var i=0; i<rows.length; i++){
//	 	                                			if(i!=ccIndex){
//	 	                                			if(rows[i].MATERIA_ID==data.id){
//	 	                                				$.messager.alert('提示', '您输入的选择的物料【'+wl[data.id]+'】已存在','',function(){
//	 	                                					$('#TaryInfo_tab').datagrid('getEditor', {'index':ccIndex,'field':'ITEM_NM'}).target.combobox('setValue', '');
//	 	                                				});
//	 	                                				return false;
//	 	                                			}
//	 	                                			}
//	 	                                		}
//	 	                                	}
	 										var target = $('#TaryInfo_tab').datagrid('getEditor', {'index':ccIndex,'field':'MATERIA_ID'}).target;
	 										target.textbox('setValue', data.id);
	 									}
	 	                            }    
	 	                        }
	 	                   },
	 	                   {field:'MATERIA_ID', title: '物料编号<span style="color:red">*</span>', width:150,align:'center',editor:{type:'textbox',options:{editable:false}}},               
	 	                   { field:"UNIT_NAME", title: '计量单位<span style="color:red">*</span>', width:100,align:'center',
	 	                       editor:{type:'textbox'},hidden:'true'
	 	                   },
	 	                   { field:"UNIT_ID", title: '计量单位<span style="color:red">*</span>', width:100,align:'center',
	 	                      editor:{  
	 	                            type:'combobox',
	 	                            options:{
	 	                                valueField:'id',
	 	                                textField:'text',
	 	                                panelWidth:160,
	 	                                editable:false,
	 	                                panelHeight:200,
	 	                                data:dataUnit
	 	                            }    
	 	                        },formatter:function(value, row, index){
	 	                			return ccunit[value];
	 	                		}
	 	                   },
	 	                  { field:"PRODUCT_DATE", title: '生产日期<span style="color:red">*</span>', width:200,align:'center',
	 	                       editor:{type:'datetimebox'}
	 	                   },
	 	                   { field:"PURCHASE_NUMBER", title: '采购数量<span style="color:red">*</span>', width:100,align:'center',editor:{  
	 	                              type:'numberbox',
	 	                              options:{
	 	                            	  min:0,
	 	                           	   	  precision:0
	 	                              }    
	 	                          }
	 	                   },
	 	                   { field:"DELIVE_NUMBER", title: '到货数量<span style="color:red">*</span>', width:100,align:'center',editor:{  
	 	                       type:'numberbox',
	 	                       options:{
	 	                    	   min:0,
	 	                    	   precision:0
	 	                       }    
	 	                   }
	 	                   },
	 	                   { field:"printNum", title: '条码操作', width:100,align:'center',
	 	                	   formatter:function(value, row, index){
	 	                  			var str = '<a   href="#" name="opera" class="easyui-linkbutton" >打印</a>';
	 	                  			return str;
	 	                  		}
	 	                   }
	 	                ]],
	 	                onLoadSuccess:function(data){ 
	 	                    /*$("a[name='opera']").linkbutton({text:'打印',iconCls:'icon-print'});*/  
	 	                },onClickRow: function(index,row){
	 	                	eeEndEdit('TaryInfo_tab');
	 	                	if(row.MATERIA_ID !=null && row.MATERIA_ID !=""){
	 	                		var ccParame = {
	 	 	                           url: "/iPlant_ajax",
	 	 	                           dataType: "JSON",
	 	 	                           data: {IFS: "WMS_C000038",ORDER_ID:$('#ORDER_ID2').textbox('getValue'),MATERIA_ID:row.MATERIA_ID},
	 	 	                           successCallBack: function (data) {
	 	 	                           	if(data.RESPONSE[0].RESPONSE_DATA.length<1){
	 	 	                           		ccIndex=index;
	 	 	                           		$('#TaryInfo_tab').datagrid('selectRow', index).datagrid('beginEdit', index);
	 	 	                           	}
	 	 	                           },
	 	 	                           errorCallBack: function() {
	 	 	                               $.messager.alert("提示", '请联系管理员，查询失败！')
	 	 	                           }
	 	 	                       };
	 	 	           			iplantAjaxRequest(ccParame);
	 	                	}else{
	 	                		ccIndex=index;
	                           	$('#TaryInfo_tab').datagrid('selectRow', index).datagrid('beginEdit', index);
	 	                	}
	 	                	
	 	                },
	 	                onClickCell:function(rowIndex, field, value){
	 	                	if(field=='printNum'){
	 	                		eeEndEdit('TaryInfo_tab');
	 	                		showPakage(rowIndex);
	 	                	}
	 	                }
	 	            }); 
	 				
	 				$('#TaryInfo_tab').datagrid('loadData',jsonData);
	 			}
	 		});
            
        },
        showPakage =function(index){
        	
        	$('#dispatch_tab4').datagrid('loadData', { total: 0, rows: [] });
        	var getSelectData=[];
        	var selectData = $('#TaryInfo_tab').datagrid('getRows')[index];
        	if(parseInt(selectData.DELIVE_NUMBER)<1){
        		$.messager.alert('提示', '到货数量位0，不能打印');
                return;
        	}
        	var listType2 = $('#TaryInfo_tab').datagrid('getRows')[index].listType2;
        	getSelectData.push({
        		DETAIL_ID:selectData.DETAIL_ID,
        		ChecckInid:selectData.ORDER_ID,
        		ProdCode:selectData.MATERIA_ID,
        		ProdName:wl[selectData.MATERIA_ID],
        		Unit:selectData.UNIT_ID,
        		UnitName:ccunit[selectData.UNIT_ID],
        		Num:selectData.PURCHASE_NUMBER,
        		Num2:selectData.DELIVE_NUMBER,
        		PRODUCT_DATE:selectData.PRODUCT_DATE
        	});
        	$('#enditTab2').dialog('open').dialog('setTitle','物料打印管理');
        	initPackageData(getSelectData);
        }
        initPackageData =function(mydata){
        	var ccArr = [];
        	for(var i=1; i<parseInt(mydata[0].Num2)+1; i++){
        		ccArr.push({"text":i,"id":i});
        	}
        	$('#dispatch_tab2').datagrid({
                columns: [[ 
                    {field:'ChecckInid', title: '订单编号', width:180,align:'center',hidden:'true'},
                    {field:'DETAIL_ID', title: '订单详情号', width:180,align:'center',hidden:'true'}, 
                	{field:'ProdName', title: '物料名称', width:150,align:'center'},
                   	{field:'ProdCode',title: '物料编号', width:150,align:'center'},
                    { field:"UnitName", title: '物料计量单位名', width:148,align:'center'},
                    { field:"Unit", title: '物料计量单位', width:60,align:'center',hidden:'true'},
                    { field:"Num", title: '采购数量', width:165,align:'center',hidden:'true'},
                    { field:"Num2", title: '到货数量', width:100,align:'center'},
                    { field:"PRODUCT_DATE", title: '生产日期', width:150,align:'center'}
                ]],
                data:mydata
            });
            	$('#dispatch_tab3').datagrid({
                    columns: [[
                        { field:"packageUnitName", title: '打包单位名称', width:100,align:'center', editor:{type:'numberbox'},hidden:'true'},
                       	{field:'packageUnit',title: '打包单位', width:178,align:'center',
                        	formatter:function(value, row, index){
                   				return ccunit[value];
                   		   },
                        	editor:{  
                                type:'combobox',
                                options:{
                                    valueField:'id',
                                    textField:'text',
                                    panelWidth:160,
                                    panelHeight:200,
                                    required:true,
                                    data:dataUnit
                                },    
                            }
                       },
                       { field:"packagePnum", title: '每单位数量', width:160,align:'center', 
                    	 editor:{  
                            type:'combobox',
                            options:{
                                valueField:'id',
                                textField:'text',
                                panelWidth:160,
                                panelHeight:200,
                                required:true,
                                data:ccArr,
                                onSelect:function(data){
	                                	lastListData=parseFloat(mydata[0].Num2)%parseFloat(parseInt(data.id));
	                            	    if(lastListData==0){
	                            	    	lastListType=1;
	                            	    }else{
	                            	    	lastListType=0;
	                            	    }
										var target = $('#dispatch_tab3').datagrid('getEditor', {'index':0,'field':'packageNum'}).target;
										target.textbox('setValue', Math.ceil(mydata[0].Num2/parseInt(data.id)));
								}
                            },    
                        }
                       },
                       { field:"packageNum", title: '打包数量', width:160,align:'center',editor:{type:'textbox',options:{editable:false}}},
                       {field:'operate2',title:'打包操作',align:'center',width:200, 
                   		formatter:function(value, row, index){
                   			var str = '<a   href="#" name="opera2" class="easyui-linkbutton mydayin2" >打包</a>';
                   			return str;
                   		}
                       }
                    ]],
                    data:[{
                    	packageUnit:'',packagePnum:'',packageNum:'',printNum:'',listType3:'1'
                    }],
                    onClickRow:function(index, field){
                        eeEndEdit('dispatch_tab3');
                        var data  = $('#dispatch_tab4').datagrid('getRows');
                 		if(data.length<1){
                 			$('#dispatch_tab3').datagrid('beginEdit', index);
                 		}
         			           
                 },
                 onClickCell:function(rowIndex, field, value){
                 	if(field=='operate2'){
                 		eeEndEdit('dispatch_tab3');
                 		var data  = $('#dispatch_tab4').datagrid('getRows');
                 		if(data.length<1){
                 			var data  = $('#dispatch_tab3').datagrid('getRows');
                 			if(data[0].packageUnit==""){
                 				$.messager.alert('提示', '请输入单位');
                                return;
                 			}
                 			if(data[0].packageUnit==""){
                 				$.messager.alert('提示', '请输入没报');
                                return;
                 			}
                 			getPackageCode();
                 		}
                 	}	
                 }
                });
            	$('#dispatch_tab4').datagrid({
                    columns: [[
                        {field:'saveChecckInid', title: '订单编号', width:140,align:'center',hidden:'true'},
                        {field:'saveProdCode',title: '物料编号', width:120,align:'center',hidden:'true'},
                    	{field:'saveProdName', title: '物料名称', width:180,align:'center'},
                    	{ field:"saveUnitName", title: '物料计量单位', width:120,align:'center'},
                        { field:"saveUnit", title: '物料计量单位', width:120,align:'center',hidden:'true'},
                        { field:"saveNum", title: '来料数量', width:80,align:'center'},
                        { field:"savePackageUnitName", title: '物料打包单位', width:120,align:'center'},
                        { field:"savePackageUnit", title: '物料计量单位', width:120,align:'center',hidden:'true'},
                        { field:"savePackagePnum", title: '每单位打包数', width:110,align:'center'},
                        { field:"savePackageNum", title: '打包数量', width:80,align:'center'},
                        { field:"savePackageCode", title: '包装条码值', width:176,align:'center'}
                    ]],
                    data:packageData
                })
                
                
                //设置值
                var ccParame = {
                    url: "/iPlant_ajax",
                    dataType: "JSON",
                    data: {IFS: "WMS_C000038",ORDER_ID:$('#ORDER_ID2').textbox('getValue'),MATERIA_ID:mydata[0].ProdCode},
                    successCallBack: function (data) {
                    	if(data.RESPONSE[0].RESPONSE_DATA.length>0){
                    		var relationData=[];
                    		var packageData=[];
	                    		relationData.push({
	                       		 'packageUnitName':data.RESPONSE[0].RESPONSE_DATA[0].UNIT_NAME,
	                       		 'packageUnit':data.RESPONSE[0].RESPONSE_DATA[0].UNIT_ID,
	                       		 'packagePnum':data.RESPONSE[0].RESPONSE_DATA[0].PACKAGE_CAPACITY,
	                       		 'packageNum':data.RESPONSE[0].RESPONSE_DATA[0].PACKAGE_NUMBER,
	                       		 'operate2':'',
	                       		 'listType':'0'
	                       	 	});
	                       	 	for(var i=0;i<data.RESPONSE[0].RESPONSE_DATA.length;i++){
	                       	 		packageData.push({
	                           		 'saveChecckInid':data.RESPONSE[0].RESPONSE_DATA[i].ORDER_ID,
	                           		 'saveProdCode':data.RESPONSE[0].RESPONSE_DATA[i].MATERIA_ID,
	                           		 'saveProdName':data.RESPONSE[0].RESPONSE_DATA[i].MATERIA_NAME,
	                           		 'saveUnitName':mydata[0].UnitName,
	                           		 'saveUnit':mydata[0].Unit,
	                           		 'saveNum':mydata[0].Num2,
	                           		 'savePackageUnitName':data.RESPONSE[0].RESPONSE_DATA[i].UNIT_NAME,
	                           		 'savePackageUnit':data.RESPONSE[0].RESPONSE_DATA[i].UNIT_ID,
	                           		 'savePackagePnum':data.RESPONSE[0].RESPONSE_DATA[i].PACKAGE_CAPACITY,
	                           		 'savePackageNum':data.RESPONSE[0].RESPONSE_DATA[i].PACKAGE_NUMBER,
	                           		 'savePackageCode':data.RESPONSE[0].RESPONSE_DATA[i].BARCODE,
	                           	 }); 
	                       	 	}
	                       	 	$('#dispatch_tab3').datagrid('loadData', { total: 0, rows: relationData });
	                    		$('#dispatch_tab4').datagrid('loadData', { total: packageData.length, rows: packageData });
	                    		$('#save2').hide();
                    	}else{
                    		$('#dispatch_tab3').datagrid('loadData', { total: 0, rows: [{packageUnit:'',packagePnum:'',packageNum:'',printNum:'',listType3:'1'}] });
                    		$('#dispatch_tab4').datagrid('loadData', { total: 0, rows: [] });
                    		$('#save2').show();
                    	}
                    },
                    errorCallBack: function() {
                        $.messager.alert("提示", '请联系管理员，查询失败！')
                    }
                };
    			iplantAjaxRequest(ccParame);
            
        }
          
        
        getPackageCode =function(){
        	var getSelectData=[];
        	var packageCode=[];
        	var selectData2 =$('#dispatch_tab2').datagrid('getData');
        	var selectData3 =$('#dispatch_tab3').datagrid('getData');
        	reqData = {
					IFS: 'WMS_BP00013',
					TOTALNUMBER:selectData2.rows[0].Num,
					CAPACITY:selectData3.rows[0].packagePnum
				}
    		var ajaxParam = {
                url: '/iPlant_ajax',
                dataType: 'JSON',
                data: reqData,
                async: false,
                successCallBack:function(data){
                	packageCodeString=data.RESPONSE[0].RESPONSE_DATA[0].BARCODE;
                	packageCode=data.RESPONSE[0].RESPONSE_DATA[0].BARCODE.split(",");
                	$('#dispatch_tab3').datagrid('updateRow',{
        				index: 0,
        				row: {
        					listType3: 0
        				}
        			});
                	
                },
                errorCallBack:function(){
                	
                }   
            }; 
    		iplantAjaxRequest(ajaxParam);
    		if(lastListType==1){
    			for(var i=0;i<selectData3.rows[0].packageNum;i++){
            		getSelectData.push({
                		saveChecckInid:selectData2.rows[0].ChecckInid,
                		saveProdCode:selectData2.rows[0].ProdCode,
                		saveProdName:selectData2.rows[0].ProdName,
                		saveUnit:selectData2.rows[0].Unit,
                		saveUnitName:ccunit[selectData2.rows[0].Unit],
                		saveNum:selectData2.rows[0].Num2,
                		savePackageUnit:selectData3.rows[0].packageUnit,
                		savePackageUnitName:ccunit[selectData3.rows[0].packageUnit],
                		savePackagePnum:selectData3.rows[0].packagePnum,
                		savePackageNum:selectData3.rows[0].packageNum,
                		savePackageCode:packageCode[i],
                	});
            	}
    		}else{
    			for(var i=0;i<selectData3.rows[0].packageNum-1;i++){
            		getSelectData.push({
                		saveChecckInid:selectData2.rows[0].ChecckInid,
                		saveProdCode:selectData2.rows[0].ProdCode,
                		saveProdName:selectData2.rows[0].ProdName,
                		saveUnit:selectData2.rows[0].Unit,
                		saveUnitName:ccunit[selectData2.rows[0].Unit],
                		saveNum:selectData2.rows[0].Num2,
                		savePackageUnit:selectData3.rows[0].packageUnit,
                		savePackageUnitName:ccunit[selectData3.rows[0].packageUnit],
                		savePackagePnum:selectData3.rows[0].packagePnum,
                		savePackageNum:selectData3.rows[0].packageNum,
                		savePackageCode:packageCode[i],
                	});
            	}
    			getSelectData.push({
            		saveChecckInid:selectData2.rows[0].ChecckInid,
            		saveProdCode:selectData2.rows[0].ProdCode,
            		saveProdName:selectData2.rows[0].ProdName,
            		saveUnit:selectData2.rows[0].Unit,
            		saveUnitName:ccunit[selectData2.rows[0].Unit],
            		saveNum:selectData2.rows[0].Num2,
            		savePackageUnit:selectData3.rows[0].packageUnit,
            		savePackageUnitName:ccunit[selectData3.rows[0].packageUnit],
            		savePackagePnum:lastListData,
            		savePackageNum:selectData3.rows[0].packageNum,
            		savePackageCode:packageCode[i],
            	});
    		}
        	
        	$('#dispatch_tab4').datagrid({
                columns: [[
                    {field:'saveChecckInid', title: '订单编号', width:140,align:'center',hidden:'true'},
                        {field:'saveProdCode',title: '物料编号', width:120,align:'center',hidden:'true'},
                    	{field:'saveProdName', title: '物料名称', width:180,align:'center'},
                    	{ field:"saveUnitName", title: '物料计量单位', width:120,align:'center'},
                        { field:"saveUnit", title: '物料计量单位', width:120,align:'center',hidden:'true'},
                        { field:"saveNum", title: '来料数量', width:80,align:'center'},
                        { field:"savePackageUnitName", title: '物料打包单位', width:120,align:'center'},
                        { field:"savePackageUnit", title: '物料计量单位', width:120,align:'center',hidden:'true'},
                        { field:"savePackagePnum", title: '每单位打包数', width:110,align:'center'},
                        { field:"savePackageNum", title: '打包数量', width:80,align:'center'},
                        { field:"savePackageCode", title: '包装条码值', width:176,align:'center'}
                ]],
                data:getSelectData,
            })
        }
        //保存打包信息
        savePackageMes =function(){
        		var selectData =$('#dispatch_tab4').datagrid('getData').rows;
    			reqData ={
    					ORDERID:selectData[0].saveChecckInid,
    					DETAILID:selectData[0].DETAIL_ID,
    					MATERIAID:selectData[0].saveProdCode,
    					MATERIANAME:selectData[0].saveProdName,
    					UNITID:selectData[0].savePackageUnit,
    					UNITNAME: selectData[0].savePackageUnitName,
    					DELIVERYNUMBER: selectData[0].saveNum,
        				PACKAGECAPACITY: selectData[0].savePackagePnum,
        				BARCODE:packageCodeString,
        				SN:$('#txtPCH').textbox('getValue'),
                        IFS :'WMS_C000036',
                };
    			var susMsg='添加打包信息成功';
    			var errorMsg='添加打包信息失败,请联系管理员';
                var ajaxParam = {
                     url: '/iPlant_ajax',
                     dataType: 'JSON',
                     data: reqData,
                     successCallBack:function(data){
                    	 $.messager.alert('提示', susMsg);
                    	 $('#enditTab2').dialog('close');
                     },
                     errorCallBack:function(){
                         $.messager.alert('提示', errorMsg);
                     }   
                };
                iplantAjaxRequest(ajaxParam);
        }
        //修改时点击打印获取关联信息
        getRelationdata =function(index){
        	var MATERIA_ID='';
        	var unitid='';
        	var unitname='';
        	var selectData=''; 
        	var checkinId='';
        	if(dataType==0){
        		selectData=newTime;
        	}else{
         		selectData=$('#TaryInfo_tab').datagrid('selectRow',index).datagrid('getSelected').ORDER_ID;
        	}
        	reqData ={
        			IFS :'WMS_C000002',
        			ORDER_ID:'1',
            };
            var ajaxParam = {
                 url: '/iPlant_ajax',
                 dataType: 'JSON',
                 async:false,
                 data: reqData,
                 successCallBack:function(data){
                	 MATERIA_ID=data.RESPONSE[0].RESPONSE_DATA[index].MATERIA_ID;
                	 unitid=data.RESPONSE[0].RESPONSE_DATA[index].UNIT_ID;
                	 unitname=data.RESPONSE[0].RESPONSE_DATA[index].UNIT_NAME,
                	 listCgNum=data.RESPONSE[0].RESPONSE_DATA[index].CHECKIN_NUMBER,
                	 checkinId=data.RESPONSE[0].RESPONSE_DATA[index].ORDER_ID,
                	 getUpdataPackage(index,checkinId,MATERIA_ID,unitid,unitname,listCgNum);
                 },
                 errorCallBack:function(){
                	 
                 }   
            };
            iplantAjaxRequest(ajaxParam);
        }
        //修改时点击打印获取打包信息
        getUpdataPackage =function(index,selectData,MATERIA_ID,unitid,unitname,listCgNum){
        	packageData=[];
        	relationData=[];
        	reqData ={
        			IFS :'WMS_BP00009',
        			CHECKIN_ID:selectData,
        			MATERIA_ID:MATERIA_ID,
            };
            var ajaxParam = {
                 url: '/iPlant_ajax',
                 dataType: 'JSON',
                 async:false,
                 data: reqData,
                 successCallBack:function(data){
                	 relationData.push({
                		 'packageUnitName':data.RESPONSE[0].RESPONSE_DATA[0].UNIT_NAME,
                		 'packageUnit':data.RESPONSE[0].RESPONSE_DATA[0].UNIT_ID,
                		 'packagePnum':data.RESPONSE[0].RESPONSE_DATA[0].PACKAGE_CAPACITY,
                		 'packageNum':data.RESPONSE[0].RESPONSE_DATA[0].PACKAGE_NUMBER,
                		 'operate2':'',
                		 'listType':'0',
                	 });
                	 for(var i=0;i<data.RESPONSE[0].RESPONSE_DATA.length;i++){
                		 packageData.push({
                    		 'saveChecckInid':data.RESPONSE[0].RESPONSE_DATA[i].ORDER_ID,
                    		 'saveProdCode':data.RESPONSE[0].RESPONSE_DATA[i].MATERIA_ID,
                    		 'saveProdName':data.RESPONSE[0].RESPONSE_DATA[i].MATERIA_NAME,
                    		 'saveUnitName':unitname,
                    		 'saveUnit':unitid,
                    		 'saveNum':listCgNum,
                    		 'savePackageUnitName':data.RESPONSE[0].RESPONSE_DATA[i].UNIT_NAME,
                    		 'savePackageUnit':data.RESPONSE[0].RESPONSE_DATA[i].UNIT_ID,
                    		 'savePackagePnum':data.RESPONSE[0].RESPONSE_DATA[i].PACKAGE_CAPACITY,
                    		 'savePackageNum':data.RESPONSE[0].RESPONSE_DATA[i].PACKAGE_NUMBER,
                    		 'savePackageCode':data.RESPONSE[0].RESPONSE_DATA[i].BARCODE,
                    	 }); 
                	 }
                 },
                 errorCallBack:function(){
                	 
                 }   
            };
            iplantAjaxRequest(ajaxParam);
        }
        
		validSelectedData = function (gridName,type) {
            var checkedItems = $('#' + gridName).datagrid('getSelections');
            var num = 0;
            $.each(checkedItems, function (index, item) {
               num++;
            });
            if (type == 'Update') {
                if (num != 1) {
                    return false;
                }
            }
            else {
                if (num <= 0) {
                    return false;
                }
            }
            return true;
        },
		
        //刪除采购订单
		deleteWareNotice = function () {
            
            var checkedItems = $('#TaryInfo_tab2').datagrid('getSelections');
            if(checkedItems.length != 1){
            	$.messager.alert('提示', '请选择一条数据进行删除');
                return;
            }
            //确认提示框
            $.messager.confirm("确认框", "您确定要删除您所选择的数据?", function (r) {
           	 if(r==true){
                   	 var ajaxParam = {
                                url: '/iPlant_ajax',
                                dataType: 'JSON',
                                data: {
                                	ORDERID: checkedItems[0].ORDER_ID,
                                	MATERIAID:'cc9958',
                                	BARCODE:'cc9958',
						            IFS:'WMS_C000037',
						            DELETETYPE:'1'
                                },
                                successCallBack:function(data){
                                	$.messager.alert('提示', "删除成功","",function(){
                                		initGridData();
                                	});
                        			return;
                                }
                         };
                        iplantAjaxRequest(ajaxParam);
           	 }
            });     
       }
	}
    getWorkOrder =function(){
        var workOrderData='';
        var ajaxParam={
            url:'/iPlant_ajax',
            data:{
                  IFS:'WMS_C000026',
            },
            successCallBack:function(data){
                var rowNum=0
                if(data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS){
                    rowNum=parseInt(data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS);
                    workOrderData=data.RESPONSE["0"].RESPONSE_DATA[0];
                }
                $('#ORDER_ID2').textbox('setValue',autoCreateCode('wms'));
                $('#txtPCH').textbox('setValue', workOrderData.ORDER_ID);
            }
        } 
        iplantAjaxRequest(ajaxParam); 
    }
	var unitList=[];
	
    //来料录入
    singMateria =function(){
    	var ifs = "WMS_C000029";
//    	if(zt==1){
//    		ifs = "WMS_C000030";
//    	}
    	eeEndEdit('TaryInfo_tab');//结束编辑器
    	var sendData =$('#TaryInfo_tab').datagrid('getRows');
    	var orderId=$('#ORDER_ID2').textbox("getValue");//订单号 
    	var txtPCH=$('#txtPCH').textbox("getValue");//批次号
    	var supplierId=$('#SUPPLIER_ID').combobox("getValue");//供应商
    	var plandate=$('#predicateDeliveDate').datebox("getValue");//时间
    	if(supplierId== null || supplierId == ""){
    		$.messager.alert('提示', "请选择供应商");
			return;
    	}
    	if(plandate== null || plandate == ""){
    		$.messager.alert('提示', "请选择预计到货日期");
			return;
    	}
    	if(sendData.length<1){
    		$.messager.alert('提示', "请输入订单详细信息");
			return;
    	}
    	
    	var ccDta = {};
    	for(var i=0;i<sendData.length;i++){
    		if(sendData[i].MATERIA_ID == "" || sendData[i].MATERIA_ID == null){
    			$.messager.alert('提示', "请添加必选信息");
    			ccIndex=i;
    			$('#TaryInfo_tab').datagrid('beginEdit',i);
				return;
    		}
    		if(sendData[i].UNIT_ID == "" || sendData[i].UNIT_ID == null){
    			$.messager.alert('提示', "请添加必选信息");
    			ccIndex=i;
    			$('#TaryInfo_tab').datagrid('beginEdit',i);
				return;
    		}
    		if(sendData[i].PURCHASE_NUMBER == "" || sendData[i].PURCHASE_NUMBER == null){
    			$.messager.alert('提示', "请添加必选信息");
    			ccIndex=i;
    			$('#TaryInfo_tab').datagrid('beginEdit',i);
				return;
    		}
    		if(sendData[i].DELIVE_NUMBER == "" || sendData[i].DELIVE_NUMBER == null){
    			$.messager.alert('提示', "请添加必选信息");
    			ccIndex=i;
    			$('#TaryInfo_tab').datagrid('beginEdit',i);
				return;
    		}  		
    		if(sendData[i].PRODUCT_DATE == "" || sendData[i].PRODUCT_DATE == null){
    			$.messager.alert('提示', "请添加必选信息");
    			ccIndex=i;
    			$('#TaryInfo_tab').datagrid('beginEdit',i);
				return;
    		} 
    		if(sendData[i].MATERIA_ID  in ccDta){
    			$.messager.alert('提示', "存在相同的物料编号");
    			ccIndex=i;
    			$('#TaryInfo_tab').datagrid('beginEdit',i);
				return;
    		}else{
    			ccDta[sendData[i].MATERIA_ID]=sendData[i].PURCHASE_NUMBER;
    		}
    		unitList[i]={
    				  ORDER_ID:orderId,
    				  DETAIL_ID: sendData[i].DETAIL_ID,
    				  SUPPLIER_ID:supplierId,
    				  P_DELIVE_DATE:plandate,
	    			  MATERIA_ID:sendData[i].MATERIA_ID,
	    			  MATERIA_NAME:sendData[i].MATERIA_ID,
	    			  UNIT_ID:sendData[i].UNIT_ID,
	    			  UNIT_NAME: sendData[i].UNIT_NAME,
	    			  PURCHASE_NUMBER:sendData[i].PURCHASE_NUMBER,
	    			  DELIVE_NUMBER:sendData[i].DELIVE_NUMBER,
	    			  PRODUCT_DATE:sendData[i].PRODUCT_DATE,
	    			  SN_NUMBER:txtPCH
    	   }
    	}
		
				var susMsg='';
				var errorMsg='';
		
				susMsg='添加成功';
				errorMsg='添加失败,请联系管理员';
	            iplantAjaxRequest( {
	    			url: '/iPlant_ajax',
	    			data: 
	    			{
	    				IFS:ifs,
	    				ORDER_ID:orderId,
	    				ORDER_TYPE:"cc",
	    				P_DELIVE_DATE:plandate,
	    				SN_NUMBER:txtPCH,
	    				SUPPLIER_ID:supplierId,
	    				SUPPLIER_NAME:$('#SUPPLIER_ID').combobox("getText")
	    			},
	    			successCallBack: function (data) {
	    	    				iplantAjaxRequest( {
	    	    	    			url: '/iPlant_ajax',
	    	    	    			data: 
	    	    	    			{
	    	    	    				IFS:'WMS_C000003',
	    	    	    				ORDER_ID:orderId,
	    	    	    				list:unitList
	    	    	    			},
	    	    	    			successCallBack:function(data){
	    	    	                    if($.messager.alert('提示', susMsg)){
	    	    	                         $('#enditTab').dialog('close');
	    	    	                         initGridData();     
	    	    	                    }
	    	    	                 },
	    	    	                 errorCallBack:function(){
	    	    	                     $.messager.alert('提示', errorMsg);
	    	    	                 } 
	    	    	    		});
	    				}
	    		});
		}	
//条件查询
conditionQuery =function(){
		var queryORDER_ID = $("#queryORDER_ID").textbox('getValue');
		var invoicesDate = $("#invoicesDate").datebox('getValue');
		var querySUPPLIER_ID = $("#querySUPPLIER_ID").textbox('getValue');
		var reqData = {
			IFS: 'WMS_C000001',
			pageIndex: 1,
			pageSize: 10,
			ORDER_ID:queryORDER_ID,
			CREATE_DATE:invoicesDate,
			SUPPLIER_ID:querySUPPLIER_ID
			
		}
			reqGridData('/iPlant_ajax', 'TaryInfo_tab', reqData);
	}	
	
	
//高级查询
serchInfomation  =function(){
	  var ORDER_ID = $("#ORDER_ID").textbox('getValue');	
	  var MATERIA_ID = $("#MATERIA_ID").combobox('getValue');
	  var START_DATE = $('#START_DATE').datetimebox('getValue');		
      var END_DATE = $('#END_DATE').datetimebox('getValue');
      var ITEM_NM=$('#ITEM_NM').textbox('getValue');
      var SUP_NM=$('#SUP_NM').textbox('getValue');
	  var CT_MN=$('#CT_MN').textbox('getValue');
	  var PN_NB=$('#PN_NB').textbox('getValue');
	  var P_DELIVE_DATE=$('#P_DELIVE_DATE').datebox('getValue');

      var reqData ={
		IFS:'',
		ORDER_ID:ORDER_ID,
		MATERIA_ID:MATERIA_ID,
		START_DATE:START_DATE,
		END_DATE :END_DATE,
		ITEM_NM :ITEM_NM,
		SUP_NM :SUP_NM,
		CT_MN:CT_MN,
		PN_NB:PN_NB,
        P_DELIVE_DATE:P_DELIVE_DATE,       
        pageIndex:1,
        pageSize:$('#TaryInfo_tab').datagrid('options').pageSize
      };
      reqGridData('../iPlant_ajax',"TaryInfo_tab",reqData);
      $('#queryTab').dialog('close'); 
}



//关闭弹出框	
closeDialog =function(){

    $('#ORDER_ID').textbox('getValue','');
    $('#MATERIA_ID').combobox('getValue','');
    $('#START_DATE').datetimebox('setValue','');
    $('#END_DATE').datetimebox('setValue','');
 	$('#ITEM_NM').textbox('getValue','');
 	$('#SUP_NM').textbox('getValue','');
 	$('#CT_MN').textbox('getValue','');
	$('#PN_NB').textbox('getValue','');
    $('#P_DELIVE_DATE').datebox('setValue','');
    $('#queryTab').dialog('close');	
	},
	
onschalarmInfo=function(){
 		$('#queryTab').dialog('open').dialog('setTitle', "查询条件");
 		
 	}
	
//初始化下拉
initSearchMateriaId=function(){
	//物料
	var ajaxParam={
        url: '/iPlant_ajax',
        data: { IFS: 'Z000007' },
        successCallBack: function (data) {
//            array.push({ "id": "", "text": "全部"});
            for (var i = 0; i < data.RESPONSE[0].RESPONSE_DATA.length; i++) {
            	dataWL.push({ "id": data.RESPONSE[0].RESPONSE_DATA[i].ITEM_CD, "text": data.RESPONSE[0].RESPONSE_DATA[i].ITEM_NM });
                wl[data.RESPONSE[0].RESPONSE_DATA[i].ITEM_CD]=data.RESPONSE[0].RESPONSE_DATA[i].ITEM_NM;
            }
            $('#MATERIA_ID').combobox({
                data: dataWL,
                valueField: 'id',
                textField: 'text'
            });          
        }
    };
	
       iplantAjaxRequest(ajaxParam);
       //供应商
       var ajaxParam1={
    	        url: '/iPlant_ajax',
    	        data: { IFS: 'B000005' },
    	        successCallBack: function (data) {
    	            var array = new Array();
    	            array.push({ "id": "", "text": "请选择"});
    	            for (var i = 0; i < data.RESPONSE[0].RESPONSE_DATA.length; i++) {
    	                array.push({ "id": data.RESPONSE[0].RESPONSE_DATA[i].SUP_CD, "text": data.RESPONSE[0].RESPONSE_DATA[i].SUP_NM });
    	            }
    	            $('#SUPPLIER_ID').combobox({
    	                data: array,
    	                valueField: 'id',
    	                textField: 'text'
    	            });          
    	        }
    	    };
    		
    	    iplantAjaxRequest(ajaxParam1);
    	    //计量单位
    	    var unit= {
    	               url: "/iPlant_ajax",
    	               dataType: "JSON",
    	               data: {IFS: "WMS_B000010"},
    	            	   successCallBack: function(data) {
    	                  	 for(var i=0; i<data.RESPONSE[0].RESPONSE_DATA.length;i++){
    	                  		 dataUnit.push({"text":data.RESPONSE[0].RESPONSE_DATA[i].UNIT_NAME,"id":data.RESPONSE[0].RESPONSE_DATA[i].UNIT_ID});
    	                  		 ccunit[data.RESPONSE[0].RESPONSE_DATA[i].UNIT_ID]=data.RESPONSE[0].RESPONSE_DATA[i].UNIT_NAME;
    					    } 
    	               },
    	               errorCallBack: function() {
    	                   $.messager.alert("提示", '请联系管理员，查询失败！')
    	               }
    	           };
    				iplantAjaxRequest(unit);
    				
    				var company = {
    		                url: "/iPlant_ajax",
    		                dataType: "JSON",
    		                data: {IFS: "Z000007"},
    		                successCallBack: function (data) {
    		                	 for(var i=0; i<data.RESPONSE[0].RESPONSE_DATA.length;i++){
    		                         dataCompany.push({"text":data.RESPONSE[0].RESPONSE_DATA[i].ITEM_NM,"id":data.RESPONSE[0].RESPONSE_DATA[i].ITEM_CD});
    		                     }
    		                },
    		                errorCallBack: function() {
    		                    $.messager.alert("提示", '请联系管理员，查询失败！')
    		                }
    		            };
    					iplantAjaxRequest(company)
    					/**初始化工厂类型combobox内容*/
    					
    					var supplier = {
    		                url: "/iPlant_ajax",
    		                dataType: "JSON",
    		                data: {IFS: "B000005"},
    		                successCallBack: function(data) {
    		                	 for(var i=0; i<data.RESPONSE[0].RESPONSE_DATA.length;i++){
    		                    	dataSupplier.push({"text":data.RESPONSE[0].RESPONSE_DATA[i].SUP_NM,"id":data.RESPONSE[0].RESPONSE_DATA[i].SUP_CD});
    						    } 
    		                },
    		                errorCallBack: function() {
    		                    $.messager.alert("提示", '请联系管理员，查询失败！')
    		                }
    		            };
    					iplantAjaxRequest(supplier)
}

//打印
printConfig = function () {
	var mydata = $('#dispatch_tab2').datagrid('getData');
	var productDate = mydata.rows[0].PRODUCT_DATE;//生产日期
	var sn = $('#txtPCH').textbox("getValue");//批次号
	var supplierId = $('#SUPPLIER_ID').combobox("getValue");//供应商编号
    var printData = $('#dispatch_tab4').datagrid('getData');
    data = [];
    console.log(printData);
    for(var i=0;i<printData.rows.length;i++){
    	data.push({"SN":printData.rows[i].savePackageCode,"ProductNo":printData.rows[i].saveProdCode,"SUPNO":supplierId,"RN":i+1,"PTime":productDate,"LOTNO":sn,"NUM":printData.rows[i].savePackagePnum});
    }
    var url = getRootPath_web()+"/iPlant_printer",barCodeStr="";
	barCodeStr = {"labName":"mes01.lab","barCodeList":data};
    //提交打印信息给socketservice，socketsevice服务下发给socketclient客户端调用打印机打印
	if(data.length>0){
		$.ajax({
            type: "POST",
            url: url,
            //dataType: "json",
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            async: true,
            data: {"dataList":JSON.stringify(barCodeStr)},
            success: function (data) {
            	console.log(data);
            },
            error:function(e){
            }
        });
	}else{
		 $.messager.alert("提示", "请选择打印数据！")
	}
}

	TrayInfo2.prototype = {
		init: function() {
			$(function() {
				initGridData();
				initSearchMateriaId();//初始化
				//获取工厂类别下拉
				$('#btnAdd').click(function() {	
					zt=0;
					ccIndex=0;
					getWorkOrder();//设置订单好  批次号
					beginAdd();
				});
				
				$('#btnDelete').click(function(){
					deleteWareNotice();
	            });
				
				$('#addList').click(function() {
					appendList();
				});
				$('#removeList').click(function() {
					removeList();
				});
				
			});
		}
	}
	var fcfo = new TrayInfo2();
	var dataUnit = [];//计件单位
	var ccunit={};//数据
	var dataSupplier=[];//供应商
	var dataCompany=[];//公司
	var dataWL=[];//物料
	var ccIndex= 0;//全局索引
	var zt = 0;// 0 新增 1修改
	var wl ={};
	fcfo.init();
})();

