/* 启动时加载 */
/*
 */
(function() {
	function factoryInfo() {
		var tablename='listType_tab';
		var url='/iPlant_ajax';
		initGridData = function() {
			var dgrid = $('#listType_tab').datagrid('options');
			if(!dgrid) return;
			var reqData = {
				IFS: 'D00000111',
				pageIndex: 1,
				pageSize: dgrid.pageSize
			}
			reqGridData('/iPlant_ajax', 'listType_tab', reqData);
		},
		
		bindGridData = function(reqData, jsonData) {
			var gridList = {
				name: 'listType_tab',
				dataType: 'json',
				columns: [[
				           { field : "check",width : 10,checkbox : true},  
				           { field : 'ET_CD',title : '设备编码',width : 290,align : 'center'}, 
				           { field : 'ET_NM',title : '设备名称',width : 290,align : 'center'}, 
				           { field : 'EQ_IP',title : '设备IP',width : 250,align : 'center'} 
			    ]],
			    /**单击进入编辑模式*/
		        onClickRow: function (index, row) {
		        	OpenFrameAttribute(row.ET_CD);
	            },
			}
			initGridViewmy(reqData, gridList);
			$('#listType_tab').datagrid('loadData', jsonData);
		}
	}
	
	
	OpenFrameAttribute = function (et_cd){
		 var ajaxParam = {
				 url : '/iPlant_ajax',
    			 dataType : 'JSON',
    			 data:{
    				 prm_cd : et_cd,
    				 IFS : 'O1001'
    			 },successCallBack : function(data){
    				 var p1,p2,p3,p4,p5,p6,p7,p8,p9,p10,p11,p12,p13,p14,p15,p16,p17,p18,p19;
    				 var op = data.RESPONSE[0].RESPONSE_DATA;
    				 $("#p").empty();
    				 var a1=$("<marquee  height='240' scrollamount='1' direction='up'>");
    				 var br;
    				 var count=0;
						$.each(op,function(n,obj) {
							 p1=$("<span>"); p2=$("<span>"); p3=$("<span>"); p4=$("<span>"); p5=$("<span>");
							 p6=$("<span>");p7=$("<span>");p8=$("<span>");p9=$("<span>");p10=$("<span>");
							 p11=$("<span>");p12=$("<span>");p13=$("<span>");p14=$("<span>");p15=$("<span>");
							 p16=$("<span>");p17=$("<span>");p18=$("<span>");p19=$("<span>");
							p1.html('id: ' +obj.PRM_ID+',&nbsp;');
							if(obj.PRM_TIME != null){
								p19.html('inspecttime: ' +obj.PRM_TIME+',&nbsp;' );
							}
							if(obj.PRM_CD != null){
								p2.html('设备ip: '+obj.PRM_CD+',&nbsp;' );
							}
							if(obj.PRM_NO != null){
								p3.html('机器状态编码: '+obj.PRM_NO+',&nbsp;' );
							}
							if(obj.PRM_DESC != null){
								p4.html('机器状态描述: '+obj.PRM_DESC+',&nbsp;');
							}
							if(obj.PRM_GOODQTY != null){
								p5.html('良品数量: '+obj.PRM_GOODQTY+',&nbsp;');
							}
							if(obj.PRM_BADQTY != null){
								p6.html('不良数量: '+obj.PRM_BADQTY+',&nbsp;');
							}
							if(obj.PRM_PRODQTY != null){
								p7.html('生产数量: '+obj.PRM_PRODQTY+',&nbsp;');
							}
							if(obj.PRM_PRODDURA != null){
								p8.html('生产时长: '+obj.PRM_PRODDURA+',&nbsp;');
							}
							if(obj.PRM_CONVDURA != null){
								p9.html('转产时长: '+obj.PRM_CONVDURA+',&nbsp;');
							}
							if(obj.PRM_TPRODDURA != null){
								p10.html('总生产时长: '+obj.PRM_TPRODDURA+',&nbsp;');
							}
							if(obj.PRM_DOWNTIME != null){
								p11.html('停机时长: '+obj.PRM_DOWNTIME+',&nbsp;');
							}
							if(obj.PRM_TDOWNTIME != null){
								p12.html('总停机时长: '+obj.PRM_TDOWNTIME+',&nbsp;');
							}
							if(obj.PRM_TIMEUNIT != null){
								p13.html('时长: '+obj.PRM_TIMEUNIT+',&nbsp;');
							}
							if(obj.PRM_STDCAP != null){
								p14.html('标准产能: '+obj.PRM_STDCAP+',&nbsp;');
							}
							if(obj.PRM_TAKT != null){
								p15.html('生产节拍: '+obj.PRM_TAKT+',&nbsp;');
							}
							if(obj.PRM_TEMPER != null){
								p16.html('温度: '+obj.PRM_TEMPER+',&nbsp;');
							}
							if(obj.PRM_PRESS != null){
								p17.html('压力: '+obj.PRM_PRESS+',&nbsp;');
							}
							if(obj.PRM_SN != null){
								p18.html('产品编码: '+obj.PRM_SN+'&nbsp;');
							}
							 br=$("<p>");
							 a1.append(p1 ,p19 ,p2 ,p3 ,p4,p5,p6,p7,p8,p9,p10,p11,p12,p13,p14,p15,p16,p17,p18,br);
						}); 
						$("#p").append(a1);
    			 }
		 	}
		 iplantAjaxRequest(ajaxParam);
	}
	
	
	checks = function (checkedItems){
		$("#enditTab").dialog("open").dialog('setTitle', '<font color=\"white\">查看设备列表</font>');
		$('#txtListCode').textbox('setValue',checkedItems[0].ET_CD);//设备编号
		$('#txtListName').textbox('setValue',checkedItems[0].ET_NM);//设备名称
		$('#assetCode').textbox('setValue',checkedItems[0].EQ_IP);//IP
	}
	
	//查看功能
	checkDictItem = function() {
		var checkedItems = $('#listType_tab').datagrid('getChecked');//获取选中行信息
		 if(checkedItems.length==0){
        	 $.messager.alert('提示', '请选择一行设备数据进行查看！');
	            return;
        }else{
        	if(checkedItems.length==1){
        		checks(checkedItems);
        	}else if(checkedItems.length>1){
        		
    			$.messager.confirm('提示', '您已选择多行记录，程序将只查看您选择的第一条记录！是否继续？',function(r){
    				if(r){
    					checks(checkedItems);
    				}
    			})
    			}
        }
	}
	
	
	/*初始化列表控件*/
    initGridViewmy = function (reqData, grid) {
    	var ccArray = [];
      	var cc = initHeight();
      	if(grid.name=='Product_tab'){
      		cc = '10';
      	}
      	ccArray.push(cc);
        if (!grid) return
        var isSingleSelect=true;
        if(!grid.singleSelect && grid.singleSelect==false){isSingleSelect=false;}
        $('#' + grid.name).datagrid({
            title: grid.title,
            dataType: grid.dataType,
            pagination: grid.pagination || true,
            pageSize: cc,
            pageList: ccArray,
            fit:true,
            striped:true,
            singleSelect:isSingleSelect,
            columns: grid.columns,
            rownumbers: grid.rownumbers,
            loadMsg: '数据加载中...',
            onClickRow: grid.onClickRow || function (index, row) { //单击行事件  
	             //---------for TEST 结合SHIFT,CTRL,ALT键实现单选或多选------------  
	             if(index != selectIndexs.firstSelectRowIndex && !inputFlags.isShiftDown ){    
	                 selectIndexs.firstSelectRowIndex = index; //alert('firstSelectRowIndex, sfhit = ' + index);  
	             }             
	             if(inputFlags.isShiftDown ) {  
	                 $('#'+tbId).datagrid('clearSelections');  
	                 selectIndexs.lastSelectRowIndex = index;  
	                 var tempIndex = 0;  
	                 if(selectIndexs.firstSelectRowIndex > selectIndexs.lastSelectRowIndex ){  
	                     tempIndex = selectIndexs.firstSelectRowIndex;  
	                     selectIndexs.firstSelectRowIndex = selectIndexs.lastSelectRowIndex;  
	                     selectIndexs.lastSelectRowIndex = tempIndex;  
	                 }  
	                 for(var i = selectIndexs.firstSelectRowIndex ; i <= selectIndexs.lastSelectRowIndex ; i++){  
	                     $('#'+tbId).datagrid('selectRow', i);     
	                 }     
	             } 
            },
            onClickCell: grid.onClickCell || function (index, row) {

            },
            onDblClickRow: grid.onDblClickRow || function (index, row) {

            },
            onLoadSuccess:function(data){  
            	var rows=$("#listType_tab").datagrid('selectRow',0);
            	var row=$("#listType_tab").datagrid('getSelections');
            	OpenFrameAttribute(row[0].ET_CD);
            },
        });
        $('#' + grid.name).datagrid({ loadFilter: pagerFilter });
    };
	
	factoryInfo.prototype = {
		init: function() {
			$(function() {
				initGridData();
				$('#btncheck').click(function(){//查看
					checkDictItem();
				});
			});
			
		}
	}
	var fcfo = new factoryInfo();
	fcfo.init();
})();