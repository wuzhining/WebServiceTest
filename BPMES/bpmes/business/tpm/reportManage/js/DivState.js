(function () {
    function cardDetail() {
//        pageConfig={
//            gridName: 'DstateReport_tab'
//        },
        initGridData=function(){
            var dgrid=$('#DstateReport_tab').datagrid('options');
            if(!dgrid) return;
            var now = new Date();
            var year =now.getFullYear();
            var reqData = {
            		IFS:'T000092',
                    pageIndex:1,
                    pageSize:10
            }
         reqGridData('/iPlant_ajax','DstateReport_tab', reqData);
        
        },
        bindGridData = function (reqData,jsonData) {
        	var ccArray = [];
          	var cc = initHeight();
          	ccArray.push(cc);
          	
        	$('#DstateReport_tab').datagrid({
    	        dataType: "json",
    	        pagination:  true,
    	        columns: [[
    	                   { field: 'MD_SN', title: '模具编号', width: 200, align: 'center' },
    	                   { field: 'MD_ST', title: '模具状态', width: 200, align: 'center' },
    	                   { field: 'CRT_ID', title: '创建人', width: 200, align: 'center' },
    	                   { field: 'CRT_DT', title: '创建时间', width: 200, align: 'center' },
    	                   { field: 'UPT_ID', title: '修改人', width: 200, align: 'center' },
    	                   { field: 'UPT_DT', title: '修改时间', width: 200, align: 'center' }
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
    	        onExpandRow: function(index, row){
    	        	var ajaxParam={
    	     			      url:'/iPlant_ajax',
    	     			      dataType:'JSON',
    	     		  	      data:{
    	     		  	    	IFS:'T000091',
    	     		  	    	MD_SN:row.MD_SN,
    	                        pageIndex:1,
    	                        pageSize:100
    	     		          },
    	     	              successCallBack:function(data){
    	     	            	 var gnCollect=createSourceObj(data);
    	     	            	 if(gnCollect.length>0){
    	     	            		 var ccArr = new Array();
    	    	         	         var col= [
    	    	         	                   { field: 'DO_CD', title: '工单编号', width: 200, align: 'center' },
    										   { field: 'MD_SN', title: '模具编号', width: 200, align: 'center' },
					    	                   { field: 'MD_ST', title: '模具状态', width: 200, align: 'center' },
					    	                   { field: 'CRT_ID', title: '创建人', width: 200, align: 'center' },
					    	                   { field: 'CRT_DT', title: '创建时间', width: 200, align: 'center' }
//					    	                   ,
//					    	                   { field: 'UPT_ID', title: '修改人', width: 200, align: 'center' },
//					    	                   { field: 'UPT_DT', title: '修改时间', width: 200, align: 'center' }
    	    	         					];
//    	    	         	         		//过滤详细信息
//    	    	         	        		for(var i=0; i<gnCollect.length; i++){
//    	    	         	        				var row ={};
//    	    	         	        				row.DO_NUM = gnCollect[i].DO_NUM;
//    	    	         	        				row.MO_NUM = gnCollect[i].MO_NUM;
//    	    	         	        				row.BR_NUM = gnCollect[i].BR_NUM;
//    	    	         	        				row.PD_TT_NUM = gnCollect[i].PD_TT_NUM;
//    	    	         	        				row.PCT = gnCollect[i].PCT;
//    	    	         	        				row.CS_NM = gnCollect[i].CS_NM;
//    	    	         	        				row.CS_BGN = gnCollect[i].CS_BGN;
//    	    	         	        				row.CS_END = gnCollect[i].CS_END;
//    	    	         	        				
//    	    	         	        				if(gnCollect[i].DT !="" && gnCollect[i].DT !=null){
//    	    	         	        					var cc = gnCollect[i].DT.split(";");
//    	    	         	        					for(var j=0; j<cc.length-1; j++){
//    	    	         	        						var bb = cc[j].split(",");
//    	    	         	        						var str = bb[0].split(":");
//    	    	         	        						var str1 = bb[1].split(":");
//    	    	         	        						var str2 = bb[2].split(":");
//    	    	         	        						row[str[1]]=str2[1];
//    	    	         	        						col.push({ field: str[1] , title:str1[1] , width: 100, align: 'center' });
//    	    	         	        					}
//    	    	         	        				}
//    	    	         	        				ccArr.push(row);
//    	    	         	        		}
    	    	         	        		//1.加载明细DataGrid
    	        	         				$('#dgMxxx'+index).datagrid({
    	        	         					singleSelect : true,
    	        	         					checkOnSelect : true,
    	        	         					selectOnCheck : true,
    	        	         					nowrap : false,
    	        	         					rownumbers : true,
    	        	         					border : true,
    	        	         					height:'150',
    	        	         					title:'详细信息',
    	        	         					fitColumns : true,
    	        	         					loadMsg : "正在加载，请稍后......",
    	        	         					pagination : false,
    	        	         					columns:[col],
    	        	         					data: gnCollect
    	        	         				});
    	        	         				
    	        	         				$('#DstateReport_tab').datagrid('fixDetailRowHeight',index);
    	        	         				
    	        	         				//2.打开明细
    	        	         				var ddv = $(this).datagrid('getRowDetail',index).find('div.ddv');
    	        	         				ddv.panel({
    	        	         					border:false,
    	        	         					cache:false,
    	        	         					onLoad:function(){
    	        	         						$('#DstateReport_tab').datagrid('fixDetailRowHeight',index);
    	        	         					},
    	        	         					onResize:function(){
    	        	         						$('#DstateReport_tab').datagrid('fixDetailRowHeight',index);
    	        	         					}
    	        	         				});
    	        	         				$('#DstateReport_tab').datagrid('fixDetailRowHeight',index);
    	    	         	        	
    	     	            	 }	
    	     	              }
    	     		    }
    	     			iplantAjaxRequest(ajaxParam);		
    			}
    	     });
        	$('#DstateReport_tab').datagrid({loadFilter:pagerFilter});
            $('#DstateReport_tab').datagrid('loadData', jsonData);
        },
        getDataByCondition =function(){
        	var bc=$('#txtBC').textbox('getValue');
//            var startDate = $('#startDate').datetimebox('getValue');
//            var endDate = $('#endDate').datetimebox('getValue');
//            if(startDate !=''&& endDate !=''){
//  	        	var strA= startDate.replace(/\-/g, "").replace(/\:/g, "").replace(/\s+/g,"");
//  	        	var strB= endDate.replace(/\-/g, "").replace(/\:/g, "").replace(/\s+/g,"");
//  	        	if(strA>strB){
//  	        		$.messager.alert('提示', '开始时间不能大于结束时间！');
//          			return;
//  	        	}
//  	         }
            var reqData = {
            		IFS:'T000092',
            		MD_SN:bc,
                    pageIndex:1,
                    pageSize:10
            }
         reqGridData('/iPlant_ajax','DstateReport_tab', reqData);
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
                    var now = new Date();
                    var de =new Date(now.getFullYear(), now.getMonth(), now.getDate());
                    return date<=de;
                }
            });
        }
    }
    cardDetail.prototype = {
        init: function () {
            $(function () {
                initGridData();
                $('#btnSearch1').click(function(){
                    getDataByCondition();
                });
            });
        }
    }
    var card = new cardDetail();
    card.init();
})();