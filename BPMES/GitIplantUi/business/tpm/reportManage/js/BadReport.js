(function () {
    function cardDetail() {
        pageConfig={
            gridName: 'badReport_tab'
        },
        initGridData=function(){
            var dgrid=$('#'+pageConfig.gridName).datagrid('options');
            if(!dgrid) return;
            var now = new Date();
            var year =now.getFullYear();
            var reqData = {
            		IFS:'R000023',
                    pageIndex:1,
                    pageSize:10
            }
         reqGridData('/iPlant_ajax',pageConfig.gridName, reqData);
        
        },
        bindGridData = function (reqData,jsonData) {
        	var ccArray = [];
          	var cc = initHeight();
          	ccArray.push(cc);
          	
        	$('#badReport_tab').datagrid({
    	        dataType: "json",
    	        pagination:  true,
    	        columns: [[
    	                   { field: 'MO_CD', title: '制令单号', width: 200, align: 'center' },
    	                   { field: 'DO_CD', title: '派工单号', width: 200, align: 'center' },
    	                   { field: 'PT_CD', title: '物料编号', width: 200, align: 'center' ,hidden:true},
    	                   { field: 'PT_NM', title: '物料名称', width: 200, align: 'center' },
    	                   { field: 'ET_CD', title: '机器编码', width: 200, align: 'center' },
    	                   { field: 'BR_NUM', title: '不良数', width: 200, align: 'center' },
    	                   { field: 'PD_TT_NUM', title: '生产数', width: 200, align: 'center' },
    	                   { field: 'PCT', title: '不良率（%）', width: 200, align: 'center' }
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
    	     		  	    	IFS:'R000024',
    	     		  	    	DO_CD:row.DO_CD,
    	     		  	    	MO_CD:row.MO_CD,
    	     		  	    	PT_CD:row.PT_CD,
    	                        pageIndex:1,
    	                        pageSize:100
    	     		          },
    	     	              successCallBack:function(data){
    	     	            	 var gnCollect=createSourceObj(data);
    	     	            	 if(gnCollect.length>0){
    	     	            		 var ccArr = new Array();
    	    	         	         var col= [
//    										   { field: 'DO_NUM', title: '派工数量', width: 100, align: 'center' },
//    										   { field: 'MO_NUM', title: '制令数量', width: 100, align: 'center' },
    										   { field: 'PD_TT_NUM', title: '生产总数', width: 150, align: 'center' },
    	    	         					   { field: 'BR_NUM', title: '不良数', width: 100, align: 'center' },
    	    	         	                   { field: 'PCT', title: '不良率(%)', width: 150, align: 'center' ,
    	    	         	                	  formatter : function(value, row, index) {
   	    											if (value.indexOf('.',0) == 0) {
   	    												   return '0'+value;
//											        			var value = 0+value;
//											        			console.log(value);

   	    											} else {
    	    												return value;   
    	    	         	                	          }
   	    										}
    	    	         					   },
    	    	         	                   { field: 'CS_NM', title: '班次', width: 100, align: 'center' },
    	    	         	                   { field: 'CS_BGN', title: '班次开始时间', width: 150, align: 'center' },
    	    	         	                   { field: 'CS_END', title: '班次结束时间', width: 150, align: 'center' }
    	    	         					];
    	    	         	         		//过滤详细信息
    	    	         	        		for(var i=0; i<gnCollect.length; i++){
    	    	         	        				var row ={};
    	    	         	        				row.DO_NUM = gnCollect[i].DO_NUM;
    	    	         	        				row.MO_NUM = gnCollect[i].MO_NUM;
    	    	         	        				row.BR_NUM = gnCollect[i].BR_NUM;
    	    	         	        				row.PD_TT_NUM = gnCollect[i].PD_TT_NUM;
    	    	         	        				row.PCT = gnCollect[i].PCT;
    	    	         	        				row.CS_NM = gnCollect[i].CS_NM;
    	    	         	        				row.CS_BGN = gnCollect[i].CS_BGN;
    	    	         	        				row.CS_END = gnCollect[i].CS_END;
    	    	         	        				
    	    	         	        				if(gnCollect[i].DT !="" && gnCollect[i].DT !=null){
    	    	         	        					var cc = gnCollect[i].DT.split(";");
    	    	         	        					for(var j=0; j<cc.length-1; j++){
    	    	         	        						var bb = cc[j].split(",");
    	    	         	        						var str = bb[0].split(":");
    	    	         	        						var str1 = bb[1].split(":");
    	    	         	        						var str2 = bb[2].split(":");
    	    	         	        						row[str[1]]=str2[1];
    	    	         	        						col.push({ field: str[1] , title:str1[1] , width: 100, align: 'center' });
    	    	         	        					}
    	    	         	        				}
    	    	         	        				ccArr.push(row);
    	    	         	        		}
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
    	        	         					data: ccArr
    	        	         				});
    	        	         				
    	        	         				$('#badReport_tab').datagrid('fixDetailRowHeight',index);
    	        	         				
    	        	         				//2.打开明细
    	        	         				var ddv = $(this).datagrid('getRowDetail',index).find('div.ddv');
    	        	         				ddv.panel({
    	        	         					border:false,
    	        	         					cache:false,
    	        	         					onLoad:function(){
    	        	         						$('#badReport_tab').datagrid('fixDetailRowHeight',index);
    	        	         					},
    	        	         					onResize:function(){
    	        	         						$('#badReport_tab').datagrid('fixDetailRowHeight',index);
    	        	         					}
    	        	         				});
    	        	         				$('#badReport_tab').datagrid('fixDetailRowHeight',index);
    	    	         	        	
    	     	            	 }	
    	     	              }
    	     		    }
    	     			iplantAjaxRequest(ajaxParam);		
    			}
    	     });
        	$('#badReport_tab').datagrid({loadFilter:pagerFilter});
            $('#badReport_tab').datagrid('loadData', jsonData);
        },
        getDataByCondition =function(){
        	var bc=$('#txtBC').textbox('getValue');
            var startDate = $('#startDate').datetimebox('getValue');
            var endDate = $('#endDate').datetimebox('getValue');
            if(startDate !=''&& endDate !=''){
  	        	var strA= startDate.replace(/\-/g, "").replace(/\:/g, "").replace(/\s+/g,"");
  	        	var strB= endDate.replace(/\-/g, "").replace(/\:/g, "").replace(/\s+/g,"");
  	        	if(strA>strB){
  	        		$.messager.alert('提示', '开始时间不能大于结束时间！');
          			return;
  	        	}
  	         }
            console.log(startDate+"-----"+endDate);
            var reqData = {
            		IFS:'R000023',
 		  	    	START_TIME:startDate,
                    END_TIME:endDate,
                    DO_CD:bc,
                    pageIndex:1,
                    pageSize:20
            };
         reqGridData('/iPlant_ajax',pageConfig.gridName, reqData);
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
                getRightDate();
                //初始化  combobox
//                iplantAjaxRequest( {
//        			url: '/iPlant_ajax',
//        			data: {IFS:'B000017'},
//        			successCallBack: function (data) {
//        				var rowCollection = createSourceObj(data);
//        				var array = new Array();
//        				array.push({"id":"","text":"全班"});
//        				if(rowCollection.length>0){
//        					for(var i=0; i<rowCollection.length;i++){
//            					array.push({"id":rowCollection[i].CS_CD,"text":rowCollection[i].CS_NM});
//            				}
//        				}
//            	
//        				$('#txtBC').combobox({
//        					data:array,
//        					valueField:'id',
//        					textField:'text'
//        				});
//        			}
//        		});

//                $('#btnSearch').click(function(){
//                	$('#txtBC').combobox('setValue','');
//                    $('#startDate').datetimebox('setValue','');
//                    $('#endDate').datetimebox('setValue','');
//                    $('#queryTab').dialog('open').dialog('setTitle', pageConfig.title);
//                });

                $('#btnSearch1').click(function(){
                    getDataByCondition();
                });
                
                $('#btnExprt').click(function(){
                	var bc=$('#txtBC').textbox('getValue');
                	var startDate = $('#startDate').datetimebox('getValue');
                    var endDate = $('#endDate').datetimebox('getValue');
                	var reqData = {
                			IFS:'R000023',
            				START_TIME:startDate,
                            END_TIME:endDate,
                            DO_CD:bc,
                            pageIndex:1,
                            pageSize:999999
                	}
                	createTable('tbPlantReport','次品报表','badReport_tab',reqData);
                });

                $('.close').click(function(){
                    $('#queryTab').dialog('close');
                });
            });
        }
    }
    var card = new cardDetail();
    card.init();
})();