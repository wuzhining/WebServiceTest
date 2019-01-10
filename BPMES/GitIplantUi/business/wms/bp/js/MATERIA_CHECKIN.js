(function (){
	function materiaCheckIn(){
		var myrowCollection =new Array();
		var myrowCollection1 =new Array();
		var myrowCollection2 =new Array();
		var myrowCollection3 =new Array();
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
		onClickRow =function(index, field){
			var listType2='';
			if(!dayinIndex){
				dayinIndex=index;
			}else if(dayinIndex!==index){
				dayinIndex=index;
			}
			var listType2= $('#dispatch_tab').datagrid('getRows')[dayinIndex].listType2;
            if (editIndex != index){
                if (endEditing()){
                	if(listType2==1){
                		$('#dispatch_tab').datagrid('selectRow', index)
                        .datagrid('beginEdit', index);
		                var ed = $('#dispatch_tab').datagrid('getEditor', {index:index,field:field});
		                if (ed){
		                    ($(ed.target).data('textbox') ? $(ed.target).textbox('textbox') : $(ed.target)).focus();
		                }
		                editIndex = index;
	                }
                } else {
                    setTimeout(function(){
                        $('#dispatch_tab').datagrid('selectRow', editIndex);
                    },0);
                }
            }
        }
		onClickRow3 =function(index, field){
			var listType2= $('#dispatch_tab').datagrid('getRows')[dayinIndex].listType2;
			var gridData3= $('#dispatch_tab4').datagrid('getData');
                if (endEditing3()){
                	if(listType2==1&&gridData3.total==0){
		                $('#dispatch_tab3').datagrid('selectRow', index)
		                .datagrid('beginEdit', index);
			            var ed = $('#dispatch_tab3').datagrid('getEditor', {index:index,field:field});
			            if (ed){
			                ($(ed.target).data('textbox') ? $(ed.target).textbox('textbox') : $(ed.target)).focus();
			            }
			            editIndex3 = index;
	                }
                } else {
                    setTimeout(function(){
                        $('#dispatch_tab3').datagrid('selectRow', editIndex3);
                    },0);
                }
        }
		endEditing3 =function(){
            if (editIndex3 == undefined){return true}
            if ($('#dispatch_tab3').datagrid('validateRow', editIndex3)){
                $('#dispatch_tab3').datagrid('endEdit', editIndex3);
                $('#dispatch_tab3').datagrid('acceptChanges');
                editIndex3 = undefined;
                return true;
            } else {
                return false;
            }
        }
        endEditing =function(){
            if (editIndex == undefined){return true}
            if ($('#dispatch_tab').datagrid('validateRow', editIndex)){
                $('#dispatch_tab').datagrid('endEdit', editIndex);
                $('#dispatch_tab').datagrid('acceptChanges');
                editIndex = undefined;
                return true;
            } else {
                return false;
            }
        }
        appendList = function(){
        	var myChecckInid;
        	if(dataType==0){
        		myChecckInid=newTime;
        	}else{
        		myChecckInid=UpdataNewId;
        	}
            if (endEditing()){
                $('#dispatch_tab').datagrid('appendRow',{listType:1,listType2:1,ChecckInid:myChecckInid});
                editIndex = $('#dispatch_tab').datagrid('getRows').length-1;
                $('#dispatch_tab').datagrid('selectRow', editIndex)
                    .datagrid('beginEdit', editIndex); 
            }else{
                editIndex = $('#dispatch_tab').datagrid('getRows').length-1;
                $('#dispatch_tab').datagrid('selectRow', editIndex)
                    .datagrid('beginEdit', editIndex);  
            }
        }
        acceptList =function(){
          if (endEditing()){
            $('#dispatch_tab').datagrid('acceptChanges');
          }else{
            editIndex = $('#dispatch_tab').datagrid('getRows').length-1;
            $('#dispatch_tab').datagrid('selectRow', editIndex)
            .datagrid('beginEdit', editIndex); 
            return false;
          }
          return true;
        }
        removeList =function(){
            if (editIndex == undefined){return}
            $('#dispatch_tab').datagrid('cancelEdit', editIndex)
                    .datagrid('deleteRow', editIndex);
            editIndex = undefined;
        }  
        rejectList =function(){
            var item = $('#dispatch_tab').datagrid('getRows'); 
            if (item) { 
                for (var i = item.length - 1; i >= 0; i--) { 
                    var index = $('#dispatch_tab').datagrid('getRowIndex', item[i]); 
                    $('#dispatch_tab').datagrid('deleteRow', index); 
                } 
            } 
        }
        checkListData =function(){	
            myrowCollection = [];
            myrowCollection1 = [];
            myrowCollection2 = [];
            myrowCollection3 = [];
            //获取物料信息
            var ajaxParam={
                url: '/iPlant_ajax',
                data: {IFS:'WMS_BP00008'},
                successCallBack: function (data) {
                    for(var i=0; i<data.RESPONSE[0].RESPONSE_DATA.length;i++){
                        myrowCollection.push({"text":data.RESPONSE[0].RESPONSE_DATA[i].ITEM_NM,"id":data.RESPONSE[0].RESPONSE_DATA[i].ITEM_CD});
                    }
                }
            }
            iplantAjaxRequest(ajaxParam);

            //获取计量单位
            var ajaxParam={	
                url: '/iPlant_ajax',
                data: {IFS:'WMS_B000010',
                	UNIT_TYPE:'单计量'},
                successCallBack: function (data) {
                    for(var i=0; i<data.RESPONSE[0].RESPONSE_DATA.length;i++){
                        myrowCollection1.push({"text":data.RESPONSE[0].RESPONSE_DATA[i].UNIT_NAME,"id":data.RESPONSE[0].RESPONSE_DATA[i].UNIT_ID});
                    }
                }
            }
            iplantAjaxRequest(ajaxParam);

            //获取仓库信息
            var ajaxParam={
            	async:false,
                url: '/iPlant_ajax',
                data: {IFS:'WMS_B000006'},
                successCallBack: function (data) {
                    for(var i=0; i<data.RESPONSE[0].RESPONSE_DATA.length;i++){
                    	if (data.RESPONSE[0].RESPONSE_DATA[i].WAREHOUSE_ID && data.RESPONSE[0].RESPONSE_DATA[i].WAREHOUSE_ID == "C0001")
                        myrowCollection2.push({"text":data.RESPONSE[0].RESPONSE_DATA[i].WAREHOUSE_NAME,"id":data.RESPONSE[0].RESPONSE_DATA[i].WAREHOUSE_ID});
                    }
                    $('#WAREHOUSE_ID').combobox({
                        data:myrowCollection2,
                        valueField:'id',
                        textField:'text'
                    });
                }
            }
            iplantAjaxRequest(ajaxParam);
            
            //获取供应商
            /*var ajaxParam={
            		async:false,
                    url: '/iPlant_ajax',
                    data: {IFS:'B000005'},
                    successCallBack: function (data) {
                        for(var i=0; i<data.RESPONSE[0].RESPONSE_DATA.length;i++){
                            myrowCollection3.push({"text":data.RESPONSE[0].RESPONSE_DATA[i].SUP_NM,"id":data.RESPONSE[0].RESPONSE_DATA[i].SUP_CD});
                        }
                        $('#SUPLIER_ID').combobox({
                            data:myrowCollection3,
                            valueField:'id',
                            textField:'text'
                        });
                    }
                }
                iplantAjaxRequest(ajaxParam);*/
        }
        setUpdata =function(getData,supData,warehouseData,checkData){
        	initListdata();
        	/*$('#SUPLIER_ID').combobox('setValue',supData[0].id);
        	$('#SUPLIER_ID').combobox('setText',supData[0].text);*/
        	$('#WAREHOUSE_ID').combobox('setValue',warehouseData[0].id);
        	$('#WAREHOUSE_ID').combobox('setText',warehouseData[0].text);
        	$('#CHECKIN_NAME').textbox('setValue',checkData);
        	$('#CHECKIN_NAME').textbox('readonly',true);
        	$('#dispatch_tab').datagrid({data:getData});
        }
        getUpdataTab =function(){
        	dataType=1;
        	var listnum='';
        	var getData=[];
        	var supData=[];
        	var warehouseData=[];
        	var checkData=[];
        	var selectData =$('#materiaIn_tab').datagrid('getSelected');
        	UpdataNewId=selectData.CHECKIN_ID;
        	reqData ={
        			IFS :'WMS_BP00005',
        			CHECKIN_ID:selectData.CHECKIN_ID,
            };
            var ajaxParam = {
                 url: '/iPlant_ajax',
                 dataType: 'JSON',
                 data: reqData,
                 successCallBack:function(data){
                	 var listType='';
                	 var listType2='';
            		 for(var i=0;i<data.RESPONSE[0].RESPONSE_DATA.length;i++){
            			 if(data.RESPONSE[0].RESPONSE_DATA[i].CHECKIN_STATUS =='CHK01.01'){
                    		 listType=1;
                    		 listType2=1;
                    	 }else {
                    		 listType=0;
                    		 listType2=0;
                    	 }
            			 getData.push({
                    		 'ChecckInid':data.RESPONSE[0].RESPONSE_DATA[i].CHECKIN_ID,
                    		 'listProdName':data.RESPONSE[0].RESPONSE_DATA[i].MATERIA_NAME,
                    		 'listProdCode':data.RESPONSE[0].RESPONSE_DATA[i].MATERIA_ID,
                    		 'listProdCode2':data.RESPONSE[0].RESPONSE_DATA[i].MATERIA_ID,
                    		 'listUnitName':data.RESPONSE[0].RESPONSE_DATA[i].UNIT_NAME,
                    		 'listUnit':data.RESPONSE[0].RESPONSE_DATA[i].UNIT_ID,
                    		 'listNum':data.RESPONSE[0].RESPONSE_DATA[i].CHECKIN_NUMBER,
                    		 'operate':'',
                    		 'listType':listType,
                    		 'listType2':listType2,
                    	 }); 
            		 }
                	 /*supData.push({'id':data.RESPONSE[0].RESPONSE_DATA[0].SUPLIER_ID,'text':data.RESPONSE[0].RESPONSE_DATA[0].SUPLIER_NAME});*/
                	 warehouseData.push({'id':data.RESPONSE[0].RESPONSE_DATA[0].WAREHOUSE_ID,'text':data.RESPONSE[0].RESPONSE_DATA[0].WAREHOUSE_NAME});
                	 checkData=data.RESPONSE[0].RESPONSE_DATA[0].CHECKIN_NAME;
                	 setUpdata(getData,supData,warehouseData,checkData);
                 },
                 errorCallBack:function(){
                	 
                 }   
            };
            iplantAjaxRequest(ajaxParam);
        }
        setNull =function(){
        	/*$('#SUPLIER_ID').combobox('setValue','');
        	$('#SUPLIER_ID').combobox('setText','');*/
        	$('#WAREHOUSE_ID').combobox('setValue','');
        	$('#WAREHOUSE_ID').combobox('setText','');
        	$('#CHECKIN_NAME').textbox('setValue','');
        	var item = $('#dispatch_tab').datagrid('getRows');
            if (item) {
                for (var i = item.length - 1; i >= 0; i--) {
                    var index = $('#dispatch_tab').datagrid('getRowIndex', item[i]);
                    $('#dispatch_tab').datagrid('deleteRow', index);
                }
            }
        }
        doSearch =function(q,data,searchList,ele){  
            ele.combogrid('grid').datagrid('loadData', []);  
            if(q == ""){  
                ele.combogrid('grid').datagrid('loadData', data);  
                return;  
            }  
            var rows = [];  
            $.each(data,function(i,obj){  
                for(var p in searchList){  
                    var v = obj[searchList[p]];  
                    if (!!v && v.toString().indexOf(q) >= 0){  
                        rows.push(obj);  
                        break;  
                    }  
                }  
            });  
            if(rows.length == 0){  
                ele.combogrid('grid').datagrid('loadData', []);  
                return;  
            }  
            ele.combogrid('grid').datagrid('loadData', rows);  
          }  
        initListdata =function(){
        	setNull();
        	$('#WAREHOUSE_ID').combobox('setValue','C0001');
        	$('#WAREHOUSE_ID').combobox('setText','仓库原料仓');
            $('#dispatch_tab').datagrid({
                columns: [[
                    {field:'ChecckInid', title: '来料编号', width:180,align:'center',hidden:true},        
                	{field:'listProdName', title: '传值的物料名称', width:80,align:'center',hidden:true,editor:{type:'textbox'}},
                   	{field:'listProdCode',title: '物料信息', width:280,align:'center',
                		formatter:function(value, row, index){
                			return row.listProdName;
                		},
                        editor:{  
                            type:'combogrid',
                            options:{
                            	idField:'id',
                            	textField:'text',
                            	panelWidth:280,
                                panelHeight:200,
                                required:true,
                                columns:[[
              						{field:'id',title:'物料编码',width:140},
              						{field:'text',title:'物料名称',width:140},
                  				]],
                  				data:myrowCollection,
                                missingMessage:'该选项为必填信息',
                                onChange :function(q){
                                	doSearch(q,myrowCollection,['id','text'],$(this));
                                },
                                onShowPanel:function () {  
                                    $(this).combogrid('grid').datagrid('loadData',myrowCollection);  
                                },
                                onHidePanel : function() {
                                    myprodValue = $(this).combogrid('getText');  
                                    myprodName=$(this).combogrid('getValue');
						            var row = $('#dispatch_tab').datagrid('getSelected');
							        if (row) {
							            var i=$('#dispatch_tab').datagrid('getRowIndex',row);
							            var td=$('.datagrid-body td[field="listProdName"]')[i];
							            var div = $(td).find('input')[0];
							            $(div).textbox('setValue',myprodValue);
							            var td=$('.datagrid-body td[field="listProdCode2"]')[i];
							            var div = $(td).find('input')[0];
							            $(div).textbox('setValue',myprodName);
							        }
                                },  
                            }    
                        },
                   },
                   {field:'listProdCode2', title: '物料编号', width:140,align:'center',editor:{type:'textbox'}},
                   { field:"listUnitName", title: '物料计量单位', width:100,align:'center',
                       editor:{type:'textbox'},hidden:'true'
                   },
                   { field:"listUnit", title: '物料计量单位', width:160,align:'center',
                	   formatter:function(value, row, index){
               				return row.listUnitName;
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
                                missingMessage:'该选项为必填信息',
                                onHidePanel : function() {
                                    myprodValue = $(this).combobox('getText');  
                                    myprodName=$(this).combobox('getValue');
						            var row = $('#dispatch_tab').datagrid('getSelected');
							        if (row) {
							            var i=$('#dispatch_tab').datagrid('getRowIndex',row);
							            var td=$('.datagrid-body td[field="listUnitName"]')[i];
							            var div = $(td).find('input')[0];
							            $(div).textbox('setValue',myprodValue);
							        }
                                    var options = $(this).combobox('options');  
                                    var data = $(this).combobox('getData');
                                    var value = $(this).combobox('getValue');
                                    var b = false;
                                    if(value==''){
                                      return
                                    }
                                    for (var i = 0; i < data.length; i++) {  
                                        if (data[i][options.valueField] == value) {  
                                            b=true;  
                                            break;  
                                        }  
                                    }  
                                    if(!b){  
                                        $(this).combobox('setValue', '');
                                        $.messager.alert('提示','你所输入的计量单位名称不在数据库表内,请重选计量单位');
                                        return
                                    }  
                                },  
                            }    
                        },
                   },
                   { field:"listNum", title: '来料数量', width:160,align:'center',editor:{  
                              type:'numberbox',
                              options:{
                                  required:true,
                                  missingMessage:'该选项为必填信息',
                              }    
                          }
                   },
                   {field:'operate',title:'操作条码',align:'center',width:140, 
               		formatter:function(value, row, index){
               			var str = '<a   href="#" name="opera" class="easyui-linkbutton mydayin" >打印</a>';
               			return str;
               		}
                   },
                   {field:'listType', title: '是否打印', width:50,align:'center',hidden:true},
                   {field:'listType2', title: '是否可编辑', width:50,align:'center',hidden:true},
                ]],
                onLoadSuccess:function(data){ 
                    /*$("a[name='opera']").linkbutton({text:'打印',iconCls:'icon-print'});*/  
                },
                onClickCell:function(rowIndex, field, value){
                	if(field=='operate'){
                		dayinIndex=rowIndex;
                		checkPackageNY(rowIndex);
                		//判断是否打印，1未打印，0已打印
                		var listType = $('#dispatch_tab').datagrid('getRows')[rowIndex].listType;
                		//判断是否可以编辑，1可编辑，0不可编辑
                		var listType2 = $('#dispatch_tab').datagrid('getRows')[rowIndex].listType2;
                		if(listType2==0){
                			getRelationdata(rowIndex);
                		}
                		if(listType==1){
                			endEditing();
                			singMateriaCheck(rowIndex);
                			
                		}else{
                			endEditing();
                			showPakage(rowIndex);
                		}
                	}
                }
            })
        },
        showPakage =function(index){
        	$('#dispatch_tab4').datagrid('loadData', { total: 0, rows: [] });
        	endEditing3();
        	var getSelectData=[];
        	var selectData = $('#dispatch_tab').datagrid('getRows')[index];
        	var listType2 = $('#dispatch_tab').datagrid('getRows')[index].listType2;
        	getSelectData.push({
        		ChecckInid:selectData.ChecckInid,
        		ProdCode:selectData.listProdCode,
        		ProdName:selectData.listProdName,
        		Unit:selectData.listUnit,
        		UnitName:selectData.listUnitName,
        		Num:selectData.listNum,
        	});
        	$('#enditTab2').dialog('open').dialog('setTitle','物料打印管理');
        	initPackageData(getSelectData,listType2);
        }
        initPackageData =function(mydata,listType2){
        	$('#dispatch_tab2').datagrid({
                columns: [[
                    {field:'ChecckInid', title: '来料编号', width:180,align:'center',hidden:'true'},      
                	{field:'ProdName', title: '物料名称', width:160,align:'center'},
                   	{field:'ProdCode',title: '物料编号', width:160,align:'center'},
                    { field:"UnitName", title: '物料计量单位名', width:160,align:'center'},
                    { field:"Unit", title: '物料计量单位', width:60,align:'center',hidden:'true'},
                    { field:"Num", title: '来料数量', width:160,align:'center'}
                ]],
                data:mydata,
            })
            if(listType2==1){
            	$('#dispatch_tab3').datagrid({
                    columns: [[
                        { field:"packageUnitName", title: '打包单位名称', width:100,align:'center', editor:{type:'numberbox'},hidden:'true'},
                       	{field:'packageUnit',title: '打包单位', width:160,align:'center',
                        	formatter:function(value, row, index){
                   				return row.packageUnitName;
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
    						            /*console.log(row);*/
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
	                            	   lastListData=parseFloat(mydata[0].Num)%parseFloat(newValue);
	                            	    if(lastListData==0){
	                            	    	lastListType=1;
	                            	    }
	                            	    if(parseFloat(newValue)>parseFloat(mydata[0].Num)){
	                            	    	$(this).numberbox('setValue','');
	                            	    	return
	                            	    }
	                            	    else if(newValue){
	                            	    	var myPackageNum=Math.ceil(mydata[0].Num/newValue);
								            var row = $('#dispatch_tab3').datagrid('getSelected');
									        if (row) {
									        	row.packageNum = myPackageNum;
									        	endEditing3();
									        	/*$('#dispatch_tab3').datagrid('acceptChanges');*/	
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
                    		if($('#dispatch_tab3').datagrid('getRows')[rowIndex].listType3==1){
                    			getPackageCode();
                    		}
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
                    	{ field:"saveUnitName", title: '物料计量单位名', width:78,align:'center'},
                        { field:"saveUnit", title: '物料计量单位', width:60,align:'center',hidden:'true'},
                        { field:"saveNum", title: '来料数量', width:78,align:'center'},
                        { field:"savePackageUnitName", title: '物料打包单位名', width:78,align:'center'},
                        { field:"savePackageUnit", title: '物料计量单位', width:100,align:'center',hidden:'true'},
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
					TOTALNUMBER:selectData2.rows[0].Num,
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
                		saveChecckInid:selectData2.rows[0].ChecckInid,
                		saveProdCode:selectData2.rows[0].ProdCode,
                		saveProdName:selectData2.rows[0].ProdName,
                		saveUnit:selectData2.rows[0].Unit,
                		saveUnitName:selectData2.rows[0].UnitName,
                		saveNum:selectData2.rows[0].Num,
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
                		saveChecckInid:selectData2.rows[0].ChecckInid,
                		saveProdCode:selectData2.rows[0].ProdCode,
                		saveProdName:selectData2.rows[0].ProdName,
                		saveUnit:selectData2.rows[0].Unit,
                		saveUnitName:selectData2.rows[0].UnitName,
                		saveNum:selectData2.rows[0].Num,
                		savePackageUnit:selectData3.rows[0].packageUnit,
                		savePackageUnitName:selectData3.rows[0].packageUnitName,
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
            		saveUnitName:selectData2.rows[0].UnitName,
            		saveNum:selectData2.rows[0].Num,
            		savePackageUnit:selectData3.rows[0].packageUnit,
            		savePackageUnitName:selectData3.rows[0].packageUnitName,
            		savePackagePnum:lastListData,
            		savePackageNum:selectData3.rows[0].packageNum,
            		savePackageCode:packageCode[i],
            	});
    		}
        	
        	$('#dispatch_tab4').datagrid({
                columns: [[
                    {field:'saveChecckInid', title: '来料编号', width:100,align:'center',hidden:'true'},
                    {field:'saveProdCode',title: '物料编号', width:140,align:'center'},
                	{field:'saveProdName', title: '物料名称', width:150,align:'center'},
                	{ field:"saveUnitName", title: '物料计量单位名', width:78,align:'center'},
                    { field:"saveUnit", title: '物料计量单位', width:60,align:'center',hidden:'true'},
                    { field:"saveNum", title: '来料数量', width:78,align:'center'},
                    { field:"savePackageUnitName", title: '物料计量单位名', width:78,align:'center'},
                    { field:"savePackageUnit", title: '物料计量单位', width:100,align:'center',hidden:'true'},
                    { field:"savePackagePnum", title: '每单位物料数量', width:78,align:'center'},
                    { field:"savePackageNum", title: '打包数量', width:78,align:'center'},
                    { field:"savePackageCode", title: '包装条码值', width:140,align:'center'}
                ]],
                data:getSelectData,
            })
        }
        checkInName =function(){
        	if($('#CHECKIN_NAME').textbox('getValue')==''){
        		$.messager.alert('提示','ERP单号不能为空');
        		return false;
        	}/*else{
        		reqData ={
	        			IFS :'WMS_BP00001',
	        			CHECKIN_NAME:$('#CHECKIN_NAME').textbox('getValue'),
	            };
	            var ajaxParam = {
	                 url: '/iPlant_ajax',
	                 dataType: 'JSON',
	                 async:false,
	                 data: reqData,
	                 successCallBack:function(data){
	                	 if(data.RESPONSE[0].RESPONSE_HDR.DATA_ROWS!=0){
	                		 $.messager.alert('提示','来料录入单名称不能重复');
	                 		return false;
                       	 }else{
                       		return true
                       	 }
	                 },
	                 errorCallBack:function(){
	                	 
	                 }   
	            };
	            iplantAjaxRequest(ajaxParam);
        	}*/
        	return true;
        }
       //保存来料录入与物料关联存储过程
        singMateriaCheck = function(index){
        	if(!checkInName()){
        		return 
        	}
        	var selectData =$('#dispatch_tab').datagrid('getData').rows[index];
        	var reqData={
        			IFS :'WMS_BP00015',
        			CHECKIN_ID:selectData.ChecckInid,
        			MATERIA_ID:selectData.listProdCode,
        			MATERIA_NAME:selectData.listProdName,
        			CHECKIN_NUMBER:selectData.listNum,
        			UNIT_ID:selectData.listUnit,
        			UNIT_NAME: selectData.listUnitName,
        			/*SUPLIER_ID:$('#SUPLIER_ID').combobox('getValue'),
        			SUPLIER_NAME:$('#SUPLIER_ID').combobox('getText'),*/
        			WAREHOUSE_ID:$('#WAREHOUSE_ID').combobox('getValue'),
        			WAREHOUSE_NAME:$('#WAREHOUSE_ID').combobox('getText'),
        			CHECKIN_NAME:$('#CHECKIN_NAME').textbox('getValue'),
        			CREATOR_ID:$.cookie('UserName'),
        	}
        	var ajaxParam = {
                    url: '/iPlant_ajax',
                    dataType: 'JSON',
                    async:false,
                    data: reqData,
                    successCallBack:function(data){
                    	 $('#dispatch_tab').datagrid('updateRow',{
               				index: dayinIndex,
               				row: {
               					listType: 0,
               				}
               			});
                    	 showPakage(index);
                    },
                    errorCallBack:function(){
                        /*$.messager.alert('提示', errorMsg);*/
                    }   
           };
           iplantAjaxRequest(ajaxParam);
        }
       //查询是否打包
        checkPackageNY =function(index){
        	var selectData =$('#dispatch_tab').datagrid('getData').rows[index];
        	reqData ={
        			IFS :'WMS_BP00009',
        			CHECKIN_ID:selectData.ChecckInid,
        			MATERIA_ID:selectData.listProdCode,
            };
            var ajaxParam = {
                 url: '/iPlant_ajax',
                 dataType: 'JSON',
                 async:false,
                 data: reqData,
                 successCallBack:function(data){
                	 if(data.RESPONSE[0].RESPONSE_DATA==''){
                		 $('#dispatch_tab').datagrid('updateRow',{
                				index: dayinIndex,
                				row: {
                					listType: 1,
                					/*listType2: 1,*/
                				}
                			});
                	 }else{
                		 if(data.RESPONSE[0].RESPONSE_DATA[0].CHECKIN_STATUS=='CHK01.01'){
                    		 $('#dispatch_tab').datagrid('updateRow',{
                   				index: dayinIndex,
                   				row: {
                   					listType: 1,
                   					/*listType2: 1,*/
                   				}
                   			});
                    	 }else{
                    		 $('#dispatch_tab').datagrid('updateRow',{
                 				index: dayinIndex,
                 				row: {
                 					listType: 0,
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
        //保存打包信息
        savePackageMes =function(){
        	var listType2 = $('#dispatch_tab').datagrid('getRows')[dayinIndex].listType2;
        	if(listType2==1){
        		var selectData =$('#dispatch_tab4').datagrid('getData').rows;
    			reqData ={
    					CHECKIN_ID:selectData[0].saveChecckInid,
        				MATERIA_ID:selectData[0].saveProdCode,
        				MATERIA_NAME:selectData[0].saveProdName,
        				UNIT_ID:selectData[0].savePackageUnit,
        				UNIT_NAME: selectData[0].savePackageUnitName,
        				CHECKIN_NUMBER: selectData[0].saveNum,
        				PACKAGECAPACITY: selectData[0].savePackagePnum,
        				BARCODE:packageCodeString,
                        IFS :'WMS_BP00016',
                };
    			var susMsg='添加打包信息成功';
    			var errorMsg='添加打包信息失败,请联系管理员';
                var ajaxParam = {
                     url: '/iPlant_ajax',
                     dataType: 'JSON',
                     data: reqData,
                     successCallBack:function(data){
                    	 if($.messager.alert('提示', susMsg)){
                             $('#dispatch_tab').datagrid('updateRow',{
                  				index: dayinIndex,
                  				row: {
                  					listType2: 0,
                  				}
                  			});
                         }
                     },
                     errorCallBack:function(){
                         $.messager.alert('提示', errorMsg);
                     }   
                };
                iplantAjaxRequest(ajaxParam);
        	}else{
        		 $('#enditTab2').dialog('close');
        	}
        	
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
        		selectData=$('#materiaIn_tab').datagrid('getSelected').CHECKIN_ID;
        	}
        	reqData ={
        			IFS :'WMS_BP00005',
        			CHECKIN_ID:selectData,
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
                	 listnum=data.RESPONSE[0].RESPONSE_DATA[index].CHECKIN_NUMBER,
                	 checkinId=data.RESPONSE[0].RESPONSE_DATA[index].CHECKIN_ID,
                	 getUpdataPackage(index,checkinId,MATERIA_ID,unitid,unitname,listnum);
                 },
                 errorCallBack:function(){
                	 
                 }   
            };
            iplantAjaxRequest(ajaxParam);
        }
        //修改时点击打印获取打包信息
        getUpdataPackage =function(index,selectData,MATERIA_ID,unitid,unitname,listnum){
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
                    		 'saveChecckInid':data.RESPONSE[0].RESPONSE_DATA[i].CHECKIN_ID,
                    		 'saveProdCode':data.RESPONSE[0].RESPONSE_DATA[i].MATERIA_ID,
                    		 'saveProdName':data.RESPONSE[0].RESPONSE_DATA[i].MATERIA_NAME,
                    		 'saveUnitName':unitname,
                    		 'saveUnit':unitid,
                    		 'saveNum':listnum,
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
        //删除功能
        deleteMes =function(){
        	 var isSelectedData = validSelectedData('materiaIn_tab', 'Delete');
             if (!isSelectedData) {
                 $.messager.alert('提示', '请选择一条数据进行删除');
                 return;
             }
        	var selectData =$('#materiaIn_tab').datagrid('getSelected');
        	 $.messager.confirm('确认框', '您确定要删除您所选择的数据?', function (r) {
                 if(r==true){
		        	reqData ={
		        			IFS :'WMS_BP00020',
		        			CHECKIN_ID:selectData.CHECKIN_ID,
		        			MATERIA_ID:'',
		        			DELETE_TABLE:1,
		            };
		            var ajaxParam = {
		                 url: '/iPlant_ajax',
		                 dataType: 'JSON',
		                 data: reqData,
		                 successCallBack:function(data){
		                	 if($.messager.alert('提示', '删除成功')){
                     	        initGridData();
                           	 }
		                 },
		                 errorCallBack:function(){
		                	 
		                 }   
		            };
		            iplantAjaxRequest(ajaxParam);
                 }
        	 })    
        }
        //查询来料录入表
        getDataByCondition =function(){
        	var dgrid=$('#materiaIn_tab').datagrid('options');
			var queryORDER_ID = $('#queryORDER_ID').textbox('getValue');
			var reqData ={
				CHECKIN_NAME: queryORDER_ID,
				IFS:'WMS_BP00001',
                pageIndex:1,
                pageSize:dgrid.pageSize
			};
			reqGridData('/iPlant_ajax','materiaIn_tab',reqData)
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
        //打印条码
        barCodePrinter=function(barCode,tilte,content,num){
     	   var pi = {
                    url: "/iPlant_ajax",
                    dataType: "JSON",
                    data: {
                        IFS: "B000141",
                        barCode:barCode,
                        title:tilte,
                        content:content,
                        num:num
                    },
                    successCallBack: function(data) {
                    },
                    errorCallBack: function() {
                        $.messager.alert("提示", e)
                    }
                };
    			iplantAjaxRequest(pi)
        },
        printConfig = function () {
            var printData =$('#dispatch_tab4').datagrid('getData');
            console.log(printData);
            for(var i=0;i<printData.rows.length;i++){
            	barCodePrinter(printData.rows[i].savePackageCode,'物料',printData.rows[i].savePackageUnitName,printData.rows[i].savePackagePnum);
            }
       },
		initGridData=function(){
            var dgrid=$('#materiaIn_tab').datagrid('options');
            if(!dgrid) return;
            var reqData={
                    IFS: 'WMS_BP00001',
                    pageIndex:1,
                    pageSize:dgrid.pageSize
            }
         reqGridData('/iPlant_ajax','materiaIn_tab', reqData);
        },
        bindGridData = function (reqData,jsonData) {
            var grid = {
                name: 'materiaIn_tab',
                dataType: 'json',
                columns: [[
                   {field : "CZ",width : 10,checkbox : true},
                   { field: 'CHECKIN_ID', title: '来料录入编码', width: 200, align: 'center' },
                   { field: 'CHECKIN_NAME', title: 'ERP单号', width: 200, align: 'center' },
                   { field: 'CREATER_ID', title: '制单人', width: 200, align: 'center' },
                   { field: 'CREATER_NAME', title: '制单人名称', width: 200, align: 'center',hidden:true },
                   { field: 'CREATE_DATE', title: '制单时间', width: 200, align: 'center' },
                   { field: 'CHECKIN_STATUS', title: '来料录入单据状态', width: 200, align: 'center',hidden:true
                	   /*formatter:function(value,data,index){
                		   if(value=='1'){
                			   return "是";
                		   }else{
                			   return "否"
                		   }
                	   }*/
                   },
                ]],
                onDblClickRow: function (index, rowData) {
                	$('#tb1').css('display','none');
                	$('#enditTab').dialog('open').dialog('setTitle','来料录入管理');
                	checkListData();
                	getUpdataTab();
                } 
            }               
            initGridView(reqData,grid);
            $('#materiaIn_tab').datagrid('loadData', jsonData);
        }
        beginAdd =function(){
        	dataType=0;
        	$('#enditTab').dialog('open').dialog('setTitle','来料录入管理');
        	$('#CHECKIN_NAME').textbox('readonly',false);
        	newTime = new Date().getTime();
        }
	}
	materiaCheckIn.prototype ={
		init:function(){
			$(function(){
				initGridData();
				$('#btnAdd').click(function(){
					beginAdd();
					checkListData();
					initListdata();
                })
                $('#btnDelete').click(function(){
                	deleteMes();
                });
                $('#btnUpdate').click(function(){
                	var checkedItems = $('#materiaIn_tab').datagrid('getSelections');
                    if (checkedItems.length==0) {
                        $.messager.alert('提示', '请选择一条数据修改');
                        return;
                    }
                	$('#enditTab').dialog('open').dialog('setTitle','来料录入管理');
                	checkListData();
                	getUpdataTab();
                });
				$('#btnSearch').click(function(){
					getDataByCondition();
				});
                
                $('#addList').click(function(){
                	appendList();
                })
                $('#removeList').click(function(){
                    removeList();
                })
                $('#acceptList').click(function(){
                    acceptList();
                })
                $('#save1').click(function(){
                	acceptList();
                });
			})
		}
	}
	var cIn =new materiaCheckIn();
	cIn.init();
})()