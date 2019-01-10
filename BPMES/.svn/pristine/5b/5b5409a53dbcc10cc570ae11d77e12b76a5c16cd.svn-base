/* 启动时加载 */
/*
 */
(function() {
	function factoryInfo() {
		initGridData = function() {
			var dgrid = dataGrid.datagrid('options');
			if(!dgrid) return;
			var searchSC_CD = $('#searchSC_CD').textbox('getValue');
			var searchSC_NM = $('#searchSC_NM').textbox('getValue');
			var searchSC_TY =$("#searchSC_TY").combobox("getValue");
			var searchSC_ST =$("#searchSC_ST").combobox("getValue");
			var reqData = {
				IFS: 'ST00029',
				SC_CD:searchSC_CD,
				SC_NM:searchSC_NM,
				SC_TY:searchSC_TY,
				SC_ST:searchSC_ST,
				pageIndex: 1,
				pageSize: dgrid.pageSize
			}
			reqGridData('/iPlant_ajax', 'stencilTagsMaintenance_tab', reqData);
		}		
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
		iplantAjaxRequest(tmp),
		
		/*feeder状态下拉框查询*/
			materiel = {
		        url: "/iPlant_ajax",
		        dataType: "JSON",
		        data: {IFS:'ST00038'},
		        successCallBack: function(a) {
		        	dataMaterielType = [];
		        	var op = a.RESPONSE[0].RESPONSE_DATA;
		            $.each(op,function(n,obj) {
		            	dataMaterielType.push({'value':obj.DICT_IT,'text':obj.DICT_IT_NM});
				    });  
		        },
		        errorCallBack: function() {
		            $.messager.alert("提示", '请联系管理员，查询失败！')
		        }
		    };
		iplantAjaxRequest(materiel);
		
		var checkDate=0;
		bindGridData = function(reqData, jsonData) {
			var gridList = {
				name: 'stencilTagsMaintenance_tab',
				dataType: 'json',
				columns: [[
                                    
				           	{field : "CZ",width : 10,checkbox : true},
			        	    {field: 'FCT_CD',title: '工厂名称',width: 100,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + ( row.FCT_NM  || value)+ "</span>";},
				           		   editor:{type:'combobox',options:{valueField:'value',textField:'text',data:dataTmp,required:true,editable:false}}},
						    {field: 'SC_LB',title: '钢网标签',width: 120,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
						           options:{required:true, validType:['length[1,50]','specialCharacterTextArea']}}},
				            {field: 'SC_CD',title: '钢网编码',width: 120,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
					               options:{required:true, validType:['length[1,50]','specialCharacterTextArea']}}},
				            {field: 'SC_NM',title: '钢网名称',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
					               options:{required:true, validType:['length[1,50]','specialCharacterTextArea']}}},
			                {field:   'SC_TY',title: '钢网类型',width: 80,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + ( row.SC_ST_NM  || value)+ "</span>";},
		           		       editor:{type:'combobox',options:{valueField:'value',textField:'text',data:dataMaterielType,required:true,editable:false}}},
		           		    {field: 'SC_ST',title: '钢网状态',width: 80,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + ( row.SC_ST_NM  || value)+ "</span>";},
			           		       editor:{type:'combobox',options:{valueField:'value',textField:'text',data:dataMaterielType,required:true,editable:false}}},   
		           		    {field: 'USE_NUM',title: '使用次数',width: 60,align: 'right',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
		           		    {field: 'CRITE_NUM',title: '标准次数',width: 60,align: 'right',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'numberbox', options:{required:true,precision:0,min:0}}, 
				            	   formatter:function(value,row,index){ return formatNumber(value,0); }},
				            {field: 'WARNING_DT',title: '预警时间',width: 120,align: 'center',formatter: function (value) {
				            	if(checkNotEmpty(value)) {
				            		var myDate = new Date();
				            		var mytime=myDate.toLocaleDateString();    //获取当前时间
				            		function CompareDate(d1,d2)
				            		{
				            		  return ((new Date(d1.replace(/-/g,"\/"))) > (new Date(d2.replace(/-/g,"\/"))));
				            		}
				            		var flag=CompareDate(mytime,value);
				            		if(flag){
				            			checkDate=1;
				            			return "<span  style='color:red' title='" + value + "'>" + value + "</span>";
				            		}else{
				            			checkDate=0;
				            			return "<span  style='color:green' title='" + value + "'>" + value + "</span>";
				            		}
				            		
				            		}
				            	},editor:{type:'datebox',options:{required:true,onSelect: 
				            		function(date){
				            		var nowDate = new Date();
				            		if (date<nowDate){
				            			$(this).datebox("setValue","");
				            			$.messager.alert('提示','预警时间不能小于当前时间');
				            		}
			            		}
				            	}}}, 
				            	{field: 'TENSION',title: '张力',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'numberbox',
							           options:{precision:'2'}}},
				            {field: 'LAST_MT_DT',title: '上次保养时间',width: 180,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
						    {field: 'USE_YN',title: '是否启用',width: 80,align: 'center',formatter: function(value, row, index) {if(checkDate == 1) { return '否';}else if(value == 'Y') { return '是';} else { return '否';}},editor:{type:'checkbox',options:{on: 'Y',off: 'N'}}}, 
					        {field: 'MO',title: '备注',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
						           options:{validType:['length[0,50]','specialTextCharacter']}}},
					        {field: 'CRT_ID',title: '创建人',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
							{field: 'CRT_DT',title: '创建时间',width: 180,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
							{field: 'UPT_ID',title: '修改人',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
							{field: 'UPT_DT',title: '修改时间',width: 180,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}
							]],
				/**结束编辑模式的操作*/
			     onEndEdit:function(index,row){
			    	 var edditmp = $(this).datagrid('getEditor', {index: index,field: 'FCT_CD'});
			    	 row.FCT_CD = $(edditmp.target).combobox('getValue');
			    	 row.FCT_NM = $(edditmp.target).combobox('getText');

			     },
			     /**进入编辑模式的操作*/
				onBeforeEdit:function(index,row){
			    	 showmessage.html('');
			    	 row.editing = true;
			    	 row.edited = false;
			    	 oldRow = JSON.stringify(row).replace(reg,'\"\"');
			    	 $(this).datagrid('refreshRow', index);
			     },
			     /**编辑模式进入之后的操作*/
			    onAfterEdit:function(index,row){
			    	 /**判断是否进行数据变更*/
			    	 var temp = JSON.stringify(row).replace(reg,'\"\"');
			    	 if(temp!=oldRow){
			    		 row.edited = true;
			    	 }
			    	 row.editing = false;
			    	 $(this).datagrid('refreshRow', index);
			     },
		        onCancelEdit:function(index,row){
		            row.editing = false;
		            $(this).datagrid('refreshRow', index);
		        },
		        /**单击进入编辑模式*/
		        onClickCell: function (index,field,value) {
		        	var tabName,dialogName,titleName,rowEdit,editem,editorFt,itemCd,reqData,dgrid;
		        	var rows = dataGrid.datagrid('getRows'),row = rows[index];
		        	/**判断是否为可编辑字段*/
		        	addDatagridEditor(dataGrid,index);
		        	if(!checkNotEmpty(row.editType)){/*如果是修改的情况，ft_cd字段为只读模式*/
			    		ed = $(this).datagrid('getEditor', {index: index,field: 'SC_LB'});
			    		fc = ed.target;
			    		fc.prop('readonly',true);
		    		}
		        },
		        /**单击进入编辑模式*/
			}
			initGridMultiView(reqData, gridList);
			dataGrid.datagrid('loadData', jsonData);
		},
		
     
			
			
		
		
		
		/**
		 * 打印SN
		 * 
		 * @param dgrid
		 */
		saveMesSNcode = function(){
			
			var post = $("#stencilTagsMaintenance_tab").datagrid('getSelections');
			var postLenght = post.length;
			
			var data1=new Array();
			var barCodeList="";
			for (var i=0;i<postLenght;i++){			
	        		data1.push({"SN":post[i].SC_LB,"FSNM":"钢网编码","FDSN":post[i].SC_CD,"FNNM":"钢网名称","FDNM":post[i].SC_NM,"TITLE":"钢网标签打印"});
            };
            barCodeStr = {labName:"common01.lab","barCodeList":data1};
    		zbSocketPrinter(barCodeStr);
			$('#PrintPreview_openDiv').dialog('close');
			$.messager.alert("提示", '条码打印完成！');
			initGridData();	
		}
		
		/*检索*/
	   searchDataGrid=function(dgrid){
			initGridData();
		},
		
		setDataNull=function(){
			 $('#showFileName').html('');
		},
		
		/*导入*/
		OpenImprotFramedr = function(){
			$("#enditTabupload").dialog("open").dialog('setTitle', '钢网标签维护导入');
		}

		deleteDataGrid = function () {
			var checkedItems = $('#stencilTagsMaintenance_tab').datagrid('getSelections');
	        if (checkedItems.length==0) {
	            $.messager.alert('提示', '请选择一条数据进行删除');
	            return;
	        }
	        /*确认提示框*/
	        var delCnt=0,arrUpdate = new Array();;
	        $.messager.confirm('确认框', '您确定要删除您所选择的数据吗?', function (r) {
	           	if(r==true){
	           		 $.each(checkedItems, function (index, item) {
	           			 arrUpdate.push({FCT_CD:item.FCT_CD,SC_CD:item.SC_CD});
	                 });
	           		 
	           		 if(arrUpdate.length>0){
	     	           	/*批量删除*/
	                     var ajaxUpdate = {
	                         url: '/iPlant_ajax',
	                         dataType: 'JSON',
	                         data: {
	                             list: arrUpdate,
	                             IFS: 'ST00032'
	                         },
	                         successCallBack: function (data) {
	                         	showmessage.html('<font color=red>删除成功！</font>');
	                         	initGridData();
	                             return;
	                         },
	                         errorCallBack: function (data) {
	                         	showmessage.html('<font color=red>删除失败！</font>');
	                             return;
	                         }
	                     };
	                     iplantAjaxRequest(ajaxUpdate);

	           		 }
	           	}
	        });      
		}
	}
	factoryInfo.prototype = {
		init: function() {
			$(function() {
				/*钢网状态下拉搜索框*/
				var ajaxParam2={
	                    url:'/iPlant_ajax',
	                    data:{
	                        IFS:'ST00038',
	                    },
	                    successCallBack:function(data){
	                    	$('#searchSC_ST').combobox('clear');
	                        var rowCollection=createSourceObj(data); 
	                        var arr = [];
	                        arr.push({"value":"", "text":"全部"});
	                        for(var i=0; i< rowCollection.length; i++){
	                        	arr.push({"value":rowCollection[i].DICT_IT, "text":rowCollection[i].DICT_IT_NM});
	                        }
	                        $('#searchSC_ST').combobox({
	                            data:arr,
	                            valueField:'value',
	                            textField:'text',
	                            panelWidth:150
	                        });
	                    }
	                }
				
	            iplantAjaxRequest(ajaxParam2);
				
				/*初始化全局变量对象*/
				dataGrid = $('#stencilTagsMaintenance_tab'),dataMaterielType=[],dataWorkshop=[],dataBOM=[],dataCompany=[],dataMaterielType=[],dataTmp=[],dataFactory=[],showmessage=$('#showMessageInfo'),editIndex = undefined,oldRow=undefined, reg=new RegExp("null","g");
				initGridData();
				$('#btnSearch').click(function() {	
					var dgrid = dataGrid.datagrid('options');
					searchDataGrid(dgrid);
				});
				
				$('#btnAdd').click(function() {
					var initData = {};
					if(dataMaterielType.length>0 && dataTmp.length>0){
						initData={FCT_CD:dataTmp[0].value,USE_YN:'Y',USE_NUM:'0',SC_ST:dataMaterielType[0].value}
					}
					insertDataGrid('stencilTagsMaintenance_tab',initData);
				});
				
				$('#btnDelete').click(function(){
					deleteDataGrid();
	            });
				
				$('#btnSave').click(function() {
					saveDataGrid('stencilTagsMaintenance_tab','ST00030','ST00031','showMessageInfo');
				});
				
				$('#btnImport').click(function() {						/*导入*/
					OpenImprotFramedr();
				});
				
				 $('#btnExprt').click(function(){						/*导出*/
					 	var now = new Date();
	                    var year =now.getFullYear();
	                	var reqData = {
	                			IFS:'ST00029'
	                	}
	                	createTable('tbIMESReport','钢网标签维护导出','stencilTagsMaintenance_tab',reqData);
	                });
				
				$('#btnPrint').click(function(){
					var post = $("#stencilTagsMaintenance_tab").datagrid('getSelections');
					if(post == null || post == ''){
						$.messager.alert('提示', '请选择一条数据进行打印');
					}else{
						var SC_LB,SC_CD,SC_NM,SC_TY,SC_ST,CRT_DT,CRITE_NUM,USE_NUM;
						SC_LB = post[0].SC_LB;SC_CD = post[0].SC_CD;SC_NM = post[0].SC_NM;SC_TY = post[0].SC_TY;
						SC_ST = post[0].SC_ST;CRT_ID = post[0].CRT_ID;CRITE_NUM = post[0].CRITE_NUM;USE_NUM = post[0].USE_NUM;
						openPrintPreview(SC_LB,SC_CD,SC_NM,SC_TY,SC_ST,CRT_DT,CRITE_NUM,USE_NUM);
					}
				})
			});
		}
	}
	var fcfo = new factoryInfo();
	fcfo.init();
})();