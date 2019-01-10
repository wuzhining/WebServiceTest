(function() {
	function package(){
		var $_getGridId='';
		var editIndex3 = undefined;
		var dayinIndex = "";
		var lineIndex = "";
		var lastListType=0;
		var lastListData=0;
		var relationData=[];
		var packageData=[];
		var myrowCollection1 = [];
		//获取打包单位
		getUnitData = function(){
			myrowCollection1 =[];
			var ajaxParam={	
	                url: '/iPlant_ajax',
	                data: {IFS:'WMS_B000010',
	                	UNIT_TYPE:'单计量'},
	                successCallBack: function (data) {
	                	if(data.RESPONSE[0].RESPONSE_DATA.length>=1){
	                		for(var i=0; i<data.RESPONSE[0].RESPONSE_DATA.length;i++){
		                        myrowCollection1.push({"text":data.RESPONSE[0].RESPONSE_DATA[i].UNIT_NAME,"id":data.RESPONSE[0].RESPONSE_DATA[i].UNIT_ID});
		                    }
	                	}
	                }
	            }
	            iplantAjaxRequest(ajaxParam);
		}
		//点击打包信息表格获取编辑器
		onClickRow3 =function(index, field){
			//主表展开的明细表各条数据是否已打包的判断条件（0已打包，1未打包）
			var packageType= $('#dgMxxx'+dayinIndex).datagrid('getRows')[lineIndex].packageType;
			var gridData3= $('#dispatch_tab4').datagrid('getData');
			if(field !=='operate2'){
				if (editIndex3 != index){
					if (endEditing3()){
						if(packageType==1&&gridData3.total==0){
							$('#dispatch_tab3').datagrid('selectRow', index).datagrid('beginEdit', index);
							editIndex3 = index;
						}
					} else {
						$('#dispatch_tab3').datagrid('selectRow', editIndex3);
					}
				}
			}
        }
        //结束打包信息表格的编辑器
		endEditing3 =function(){
            if (editIndex3 == undefined){return true}
            if ($('#dispatch_tab3').datagrid('validateRow', editIndex3)){
	            	var ed = $('#dispatch_tab3').datagrid('getEditor', {index:editIndex3,field:'packageUnit'});
					var text = $(ed.target).combobox('getText');
					$('#dispatch_tab3').datagrid('getRows')[editIndex3]['text'] = text;
	                $('#dispatch_tab3').datagrid('endEdit', editIndex3);
	                $('#dispatch_tab3').datagrid('acceptChanges');
	                editIndex3 = undefined;
	                return true;
            } else {
                return false;
            }
        }
        //初始化主表数据
		initGridData = function(){
			var dgrid=$('#Package_tab').datagrid('options');
			if(!dgrid){
				return
			}
			var reqData = {
				IFS:'WMS_C000011',
				pageIndex:1,
				pageSize:dgrid.pageSize
			}
			reqGridData('/iPlant_ajax','Package_tab',reqData);
		}
		//加载主表数据
        bindGridData = function (reqData,jsonData) {
        	var ccArray = [];
          	var cc = initHeight();
          	ccArray.push(cc);
          	
        	$('#Package_tab').datagrid({
    	        dataType: "json",
    	        pagination:  true,
    	        columns:[[
					{field: 'CHECKIN_ID',title: '入库单号',width: 100,align: 'center'}, 
						{field: 'ORDER_ID',title: '采购单号',width: 100,align: 'center'},
						{field: 'PURCHASE_NUMBER',title: '采购数量',width: 80,align: 'center'},
						{field: 'MATERIA_ID',title: '物料编码',width: 100,align: 'center'},
						{field: 'ITEM_NM',title: '物料名称',width: 100,align: 'center'},
						{field: 'WAREHOUSE_NAME',title: '仓库',width: 100,align: 'center'},
						{field: 'STORE_NAME',title: '储区',width: 100,align: 'center'},
						{field: 'SHELF_NAME',title: '货架',width: 100,align: 'center'},
						{field: 'POSITION_NAME',title: '货位',width: 100,align: 'center'},
						{field: 'UNIT_NAME',title: '计量单位',width: 100,align: 'center'},
						{field: 'EMP_NM',title: '制单人',width: 100,align: 'center'},
						{field: 'SUP_NM',title: '供应商',width: 100,align: 'center'}, 
						{field: 'CT_MN',title: '联系人',width: 100,align: 'center'},
						{field: 'PN_NB',title: '联系电话',width: 100,align: 'center'},
						{field: 'P_DELIVE_DATE',title: '预计到账日期',width: 100,align: 'center'},
						{field: 'CHECK_IN_DATE',title: '入库通知日期',width: 100,align: 'center'},
						{field: 'CREATE_DATE',title: '单据日期',width: 100,align: 'center'},
				]],
    	        fit:true,
    	        striped:true,
    	        pageSize: cc,
    	        pageList: ccArray,
    	        rownumbers:true,
    	        singleSelect:true,
    	        loadMsg:'数据加载中...',
    	        onClickRow: function(index,row){ },
    	        view: detailview,
    			detailFormatter:function(index,row){
    				return '<div><table id="dgMxxx'+index+'"></table></div>';
    			},
    			//获取展开主表下的明细
    	        onExpandRow: function(index, row){
    	        	dayinIndex = index;
    	        	var ajaxParam={
	     			    url:'/iPlant_ajax',
	     			    dataType:'JSON',
	     		  	    data: {
	     		  	    	ORDER_ID:row.ORDER_ID,
                            IFS: 'WMS_C000011'
                        },
                        successCallBack: function(data) {
                            var rowNum = 0;
                            $_getGridId = $('#dgMxxx'+index);
                            var rowCollection =new Array();
                            for(var i=0;i<data.RESPONSE["0"].RESPONSE_DATA.length;i++){
                            	rowCollection.push({
                            		packageType:1,
                            		CHECKIN_ID:data.RESPONSE["0"].RESPONSE_DATA[i].CHECKIN_ID,
                            		Ztd:data.RESPONSE["0"].RESPONSE_DATA[i].ORDER_ID,
                            		Atd:data.RESPONSE["0"].RESPONSE_DATA[i].MATERIA_ID,
                            		Btd:data.RESPONSE["0"].RESPONSE_DATA[i].ITEM_NM,
                            		Ctd:data.RESPONSE["0"].RESPONSE_DATA[i].PURCHASE_NUMBER,
                            		Dtd:data.RESPONSE["0"].RESPONSE_DATA[i].DELIVE_NUMBER,
                            		Etd:data.RESPONSE["0"].RESPONSE_DATA[i].UNIT_ID,
                            		Ftd:data.RESPONSE["0"].RESPONSE_DATA[i].UNIT_NAME,
                            	});
                            }
                            var jsonData = {
                                total: rowNum,
                                rows: rowCollection
                            }                           
                            $('#dgMxxx'+index).datagrid({
                            	title:'订单明细',
                            	singleSelect:true,
                                data:rowCollection,
                                fitColumns:true,
                                rownumbers:true,
                                loadMsg:'',
                                columns:[[  
                                        {field:'CHECKIN_ID',title:'入库通知单号',width:100,align:'center',}, 
                                        {field:'Ztd',title:'采购单号',width:100,align:'center',editor:'text'},  
										{field:'Atd',title:'物料编号',width:100,align:'center',editor:'text'},
										{field:'Btd',title:'物料名称',width:100,align:'center',editor:'text'},
										{field:'Ctd',title:'采购数量',width:100,align:'center',editor:'numberbox'},
										{field:'Dtd',title:'到货数量',width:100,align:'center',editor:'numberbox'},
										{field:'Etd',title:'单位编码',width:100,align:'center',editor:'text'},
										{field:'Ftd',title:'单位名称',width:100,align:'center',editor:'text'},
										{field:'packageType',title:'是否已打包',width:100,align:'center'},
										{field:'operate', title:'操作',width:100,align:'center',
											formatter:function(){
												var str = '<a href="#" name="opera" class="easyui-linkbutton myOperate"> 打包 </a>';
												return str;
											}
										}
                                ]],
                                onClickCell:function(index,field,value){
                                	if(field=='operate'){
                                		lineIndex =  index;
                                		checkPackageNY(index);
                                		var listType = $('#dgMxxx'+dayinIndex).datagrid('getRows')[index].packageType;
                                		if(listType==1){
                                			getPackageData(index);
                                		}else{
                                			alert('已打包');
                                		}
                
                                	}
                                },
                                data:rowCollection,
                                onResize:function(){
                                    $('#Package_tab').datagrid('fixDetailRowHeight',index);
                                },
                                onLoadSuccess:function(){
                                    setTimeout(function(){
                                        $('#Package_tab').datagrid('fixDetailRowHeight',index);
                                    },0);
                                }
                            });
                            $('#Package_tab').datagrid('fixDetailRowHeight',index);                           
                        }
    	     		}
    	     		iplantAjaxRequest(ajaxParam);		
    			}
    	     });
        	$('#Package_tab').datagrid({loadFilter:pagerFilter});
            $('#Package_tab').datagrid('loadData', jsonData);
        }
        //查询是否打包
        checkPackageNY =function(index){
        	var expanData =$('#Package_tab').datagrid('getData').rows[dayinIndex];
        	var selectData =$('#dgMxxx'+dayinIndex).datagrid('getData').rows[index];
        	reqData ={
        			IFS :'WMS_C000035',
        			CHECKIN_ID:selectData.CHECKIN_ID,
        			MATERIA_ID:selectData.Atd,
            };
            var ajaxParam = {
                 url: '/iPlant_ajax',
                 dataType: 'JSON',
                 async:false,
                 data: reqData,
                 successCallBack:function(data){
                	 if(data.RESPONSE[0].RESPONSE_DATA==''){
                		 $('#dgMxxx'+dayinIndex).datagrid('updateRow',{
                				index: lineIndex,
                				row: {
                					packageType: 1,
                					/*listType2: 1,*/
                				}
                			});
                	 }else{
                		 if(data.RESPONSE[0].RESPONSE_DATA[0].CHECKIN_STATUS=='ENT01.01'){
                			 $('#dgMxxx'+dayinIndex).datagrid('updateRow',{
                   				index: lineIndex,
                   				row: {
                   					packageType: 1,
                   					/*listType2: 1,*/
                   				}
                   			});
                    	 }else{
                    		 $('#dgMxxx'+dayinIndex).datagrid('updateRow',{
                 				index: lineIndex,
                 				row: {
                 					packageType: 0,
                 					/*listType2: 0,*/
                 				}
                 			});
                    	 } 
                	 }
                 },
                 errorCallBack:function(){
                	 
                 }   
            };
            iplantAjaxRequest(ajaxParam);
        }
        //获取需要打包的数据的请求条件
        getPackageData = function(index){
        	var gridData=[];
        	var inputOder = $_getGridId.datagrid('getData').rows[index].Atd;
        	var reqData = {
        			MATERIA_ID:inputOder,
                    IFS: 'WMS_C000011'
        	}
        	var ajaxParam =  {
        			url: '/iPlant_ajax',
        			dataType: 'json',
        			async: false,
        			data: reqData,
        			successCallBack:function(data){
        				//获取打包数据
        				if(data.RESPONSE[0].RESPONSE_DATA[0]){
        					gridData.push({
        						'CHECKIN_ID':data.RESPONSE[0].RESPONSE_DATA[0].CHECKIN_ID,
								'MATERIA_ID':data.RESPONSE[0].RESPONSE_DATA[0].MATERIA_ID,
								'ITEM_NM':data.RESPONSE[0].RESPONSE_DATA[0].ITEM_NM,
								'PURCHASE_NUMBER':data.RESPONSE[0].RESPONSE_DATA[0].PURCHASE_NUMBER,
								'DELIVE_NUMBER':data.RESPONSE[0].RESPONSE_DATA[0].DELIVE_NUMBER,
								'UNIT_ID':data.RESPONSE[0].RESPONSE_DATA[0].UNIT_ID,
								'UNIT_NAME':data.RESPONSE[0].RESPONSE_DATA[0].UNIT_NAME,
        					})
        				}
        				//显示打包数据到表格
        				setPackageData(gridData);
        				initPackageData(gridData);
        			},
        			errorCallBack:function(){
        				
        			}
        	
        	};
        	iplantAjaxRequest(ajaxParam);
        }
	
		initPackageData =function(mydata){
			var listType2= $('#dgMxxx'+dayinIndex).datagrid('getRows')[lineIndex].packageType;
	        if(listType2==1){
	        	$('#dispatch_tab3').datagrid({
	                columns: [[
	                    { field:"packageUnitName", title: '打包单位名称', width:100,align:'center', editor:{type:'numberbox'},hidden:'true'},
	                   	{field:'packageUnit',title: '打包单位', width:160,align:'center',
	                    	formatter:function(value, row, index){
	               				return row.text;
	               		   },
	                    	editor:{  
	                            type:'combobox',
	                            options:{
	                                valueField:'id',
	                                textField:'text',
	                                panelWidth:160,
	                                panelHeight:200,
	                                required:true,
	                                data:myrowCollection1,
	                                onHidePanel : function() {
	                                    myprodValue = $(this).combobox('getText');  
	                                    myprodName=$(this).combobox('getValue');
							            var row = $('#dispatch_tab3').datagrid('getSelected');
								        if (row) {
								            var i=$('#dispatch_tab3').datagrid('getRowIndex',row);
								            var td=$('.datagrid-body td[field="packageUnitName"]')[i];
								            var div = $(td).find('input')[0];
								            $(div).textbox('setValue',myprodValue);
								        }
	                                },  
	                            },    
	                        },
	                   },
	                   { field:"packagePnum", title: '每单位数量', width:160,align:'center', 
	                	   editor:{  
	                           type:'numberbox',
	                           options:{
	                               onChange : function(newValue,oldValue) {
	                            	   lastListData=parseFloat(mydata[0].DELIVE_NUMBER)%parseFloat(newValue);
	                            	    if(lastListData==0){
	                            	    	lastListType=1;
	                            	    }
	                            	    if(parseFloat(newValue)>parseFloat(mydata[0].DELIVE_NUMBER)){
	                            	    	$(this).numberbox('setValue','');
	                            	    	return
	                            	    }
	                            	    else if(newValue){
	                            	    	var myPackageNum=Math.ceil(mydata[0].DELIVE_NUMBER/newValue);
								            var row = $('#dispatch_tab3').datagrid('getSelected');
									        if (row) {
									        	row.packageNum = myPackageNum;
									        	endEditing3();
									        }
	                            	    }
	                               },  
	                           },    
	                	   },
	                   },
	                   { field:"packageNum", title: '打包数量', width:160,align:'center'},
	                   {field:'operate2',title:'打包操作',align:'center',width:160, 
	               		formatter:function(value, row, index){
	               			var str = '<a   href="#" name="opera2" class="easyui-linkbutton mydayin2" >打包</a>';
	               			return str;
	               		}
	                   },
	                   {field:'listType3', title: '打印是否获取新条码', width:50,align:'center',hidden:true},
	                ]],
	                onClickCell:function(rowIndex, field, value){
	                	if(field=='operate2'){
	                		endEditing3();
                			//打包条码
                			getPackageCode();
	                	}	
	                },
	                onAfterEdit:function(rowIndex, rowData, changes){
	                	
	                },
	                onLoadSuccess:function(data){ 
	                	endEditing3();
	                },
	                data:[{
	                	packageUnit:'',packagePnum:'',packageNum:'',operate:'',listType3:'1'
	                }]
	            })
	        }else if(listType2==0){
	        	$('#dispatch_tab3').datagrid({
	                columns: [[
	                    { field:"packageUnitName", title: '打包单位名称', width:100,align:'center',hidden:'true'},
	                   	{field:'packageUnit',title: '打包单位', width:160,align:'center',
	                    	formatter:function(value, row, index){
	               				return row.packageUnitName;
	               		   },},
	                   { field:"packagePnum", title: '每单位数量', width:160,align:'center'},
	                   { field:"packageNum", title: '打包数量', width:160,align:'center'},
	                   {field:'operate2',title:'打包操作',align:'center',width:160, 
	               		formatter:function(value, row, index){
	               			var str = '<a  href="#" name="opera2" class="easyui-linkbutton mydayin2" >打包</a>';
	               			return str;
	               		}
	                   },
	                   {field:'listType3', title: '打印是否获取新条码', width:50,align:'center',hidden:true},
	                ]],
	                data:relationData
	            });
	        	$('#dispatch_tab4').datagrid({
	                columns: [[
	                    {field:'saveChecckInid', title: '来料编号', width:100,align:'center',hidden:'true'},
	                    {field:'saveProdCode',title: '物料编号', width:140,align:'center'},
	                	{field:'saveProdName', title: '物料名称', width:150,align:'center'},
	                	{ field:"saveUnitName", title: '计量单位', width:78,align:'center'},
	                    { field:"saveUnit", title: '物料计量单位id', width:60,align:'center',hidden:'true'},
	                    { field:"savePackageUnitName", title: '打包单位', width:78,align:'center'},
	                    { field:"savePackageUnit", title: '物料打包单位id', width:100,align:'center',hidden:'true'},
	                    { field:"saveNum", title: '到货数量', width:78,align:'center'},
	                    { field:"savePackagePnum", title: '每单位打包数量', width:78,align:'center'},
	                    { field:"savePackageNum", title: '打包数量', width:78,align:'center'},
	                    { field:"savePackageCode", title: '包装条码值', width:140,align:'center'}
	                ]],
	                data:packageData,
	            })
	        }
	        
	    }
	    //获取打包条码
		getPackageCode =function(){
        	var getSelectData=[];
        	var packageCode=[];
        	var selectData2 =$('#dispatch_tab2').datagrid('getData');
        	var selectData3 =$('#dispatch_tab3').datagrid('getData');
        	reqData = {
					IFS: 'WMS_BP00013',
					TOTALNUMBER:selectData2.rows[0].PURCHASE_NUMBER,
					CAPACITY:selectData3.rows[0].packagePnum,
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
        					listType3: 0,
        					/*listType2: 1,*/
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
                		saveChecckInid:selectData2.rows[0].CHECKIN_ID,
                		saveProdCode:selectData2.rows[0].MATERIA_ID,
                		saveProdName:selectData2.rows[0].ITEM_NM,
                		saveUnit:selectData2.rows[0].UNIT_ID,
                		saveUnitName:selectData2.rows[0].UNIT_NAME,
                		saveNum:selectData2.rows[0].DELIVE_NUMBER,
                		savePackageUnit:selectData3.rows[0].packageUnit,
                		savePackageUnitName:selectData3.rows[0].packageUnitName,
                		savePackagePnum:selectData3.rows[0].packagePnum,
                		savePackageNum:selectData3.rows[0].packageNum,
                		savePackageCode:packageCode[i],
                	});
            	}
    		}else{
    			for(var i=0;i<selectData3.rows[0].packageNum-1;i++){
            		getSelectData.push({
                		saveChecckInid:selectData2.rows[0].CHECKIN_ID,
                		saveProdCode:selectData2.rows[0].MATERIA_ID,
                		saveProdName:selectData2.rows[0].ITEM_NM,
                		saveUnit:selectData2.rows[0].UNIT_ID,
                		saveUnitName:selectData2.rows[0].UNIT_NAME,
                		saveNum:selectData2.rows[0].DELIVE_NUMBER,
                		savePackageUnit:selectData3.rows[0].packageUnit,
                		savePackageUnitName:selectData3.rows[0].packageUnitName,
                		savePackagePnum:selectData3.rows[0].packagePnum,
                		savePackageNum:selectData3.rows[0].packageNum,
                		savePackageCode:packageCode[i],
                	});
            	}
    			getSelectData.push({
            		saveChecckInid:selectData2.rows[0].CHECKIN_ID,
            		saveProdCode:selectData2.rows[0].MATERIA_ID,
            		saveProdName:selectData2.rows[0].ITEM_NM,
            		saveUnit:selectData2.rows[0].UNIT_ID,
            		saveUnitName:selectData2.rows[0].UNIT_NAME,
            		saveNum:selectData2.rows[0].DELIVE_NUMBER,
            		savePackageUnit:selectData3.rows[0].packageUnit,
            		savePackageUnitName:selectData3.rows[0].packageUnitName,
            		savePackagePnum:lastListData,
            		savePackageNum:selectData3.rows[0].packageNum,
            		savePackageCode:packageCode[i],
            	});
    		}
        	$('#dispatch_tab4').datagrid({
        		columns: [[
   	                    {field:'saveChecckInid', title: '入库通知编号', width:100,align:'center'},
   	                    {field:'saveProdCode',title: '物料编号', width:140,align:'center'},
   	                	{field:'saveProdName', title: '物料名称', width:150,align:'center'},
   	                	{ field:"saveUnitName", title: '计量单位', width:78,align:'center'},
   	                    { field:"saveUnit", title: '物料计量单位id', width:60,align:'center',hidden:'true'},
   	                    { field:"savePackageUnitName", title: '打包单位', width:78,align:'center'},
   	                    { field:"savePackageUnit", title: '物料打包单位id', width:100,align:'center',hidden:'true'},
   	                    { field:"saveNum", title: '到货数量', width:78,align:'center'},
   	                    { field:"savePackagePnum", title: '每单位打包数量', width:78,align:'center'},
   	                    { field:"savePackageNum", title: '打包数量', width:78,align:'center'},
   	                    { field:"savePackageCode", title: '包装条码值', width:140,align:'center'}
   	             ]],
                data:getSelectData,
            })
        }
		//显示打包信息
		setPackageData = function(gridData){
			$('#enditTab2').dialog('open',true);
			$('#dispatch_tab2').datagrid({
				dataType: "json",
		        pagination:  false,
		        columns:[[
		                {field: 'CHECKIN_ID',title: '入库编码',width: 100,align: 'center'},
						{field: 'MATERIA_ID',title: '物料编码',width: 100,align: 'center'},
						{field: 'ITEM_NM',title: '物料名称',width: 140,align: 'center'},
						{field: 'PURCHASE_NUMBER',title: '采购数量',width: 100,align: 'center'},
						{field: 'DELIVE_NUMBER',title: '到货数量',width: 100,align: 'center'},
						{field: 'UNIT_ID',title: '单位ID',width: 100,align: 'center'},
						{field: 'UNIT_NAME',title: '单位名称',width: 100,align: 'center'},
				]],
				data:gridData,
			});
		}
		//按条件查询
		conditionQuery = function(){
			var dgrid = $('#Package_tab').datagrid('options');
			var reqData = {
					ORDER_ID:$('#queryORDER_ID').textbox('getValue'),
					invoicesDATE:$('#invoicesDATE').datebox('getValue'),
					SUPPLIER_ID:$('#querySUPPLIER_ID').textbox('getValue'),		
					IFS: 'WMS_C000011',
					pageIndex: 1,
					pageSize: dgrid.pageSize
				
				};
				reqGridData('../iPlant_ajax', 'Package_tab', reqData);
		}
		//保存物料打包信息
		savePackageMes = function(){
			var reqDataList =[];
			var listType = $('#dgMxxx'+dayinIndex).datagrid('getRows')[lineIndex].packageType;
        	/*if(listType==1){*/
        		var selectData =$('#dispatch_tab4').datagrid('getData').rows;
        		for(var i=0;i<selectData.length;i++){
        			reqDataList.push({
    					CHECKIN_ID:selectData[i].saveChecckInid,
    					MATERIA_ID:selectData[i].saveProdCode,
    					MATERIA_NAME:selectData[i].saveProdName,
    					UNIT_ID:selectData[i].savePackageUnit,
    					UNIT_NAME: selectData[i].savePackageUnitName,
    					PACKAGE_NUMBER: selectData[i].savePackageNum,
    					PACKAGE_CAPACITY: selectData[i].savePackagePnum,
    					BARCODE:selectData[i].savePackageCode,
                    });
        		};
        		var reqData = {
        				list:reqDataList,
        				IFS :'WMS_C000034',
        		}
    			var susMsg='添加打包信息成功';
    			var errorMsg='添加打包信息失败,请联系管理员';
                var ajaxParam = {
                     url: '/iPlant_ajax',
                     dataType: 'JSON',
                     data: reqData,
                     successCallBack:function(data){
                    	 if($.messager.alert('提示', susMsg)){
                    		 $('#dgMxxx'+dayinIndex).datagrid('updateRow',{
                  				index: lineIndex,
                  				row: {
                  					packageType:0,
                  				}
                  			});
                         }
                     },
                     errorCallBack:function(){
                         $.messager.alert('提示', errorMsg);
                     }   
                };
                iplantAjaxRequest(ajaxParam);
        	/*}else{
        		 $('#enditTab2').dialog('close');
        	}*/
		}
		
	}
	package.prototype={
		init:function(){
			$(function(){
				initGridData();
				getUnitData();
			})
		}
	}
	var myp=new package();
	myp.init();
})()