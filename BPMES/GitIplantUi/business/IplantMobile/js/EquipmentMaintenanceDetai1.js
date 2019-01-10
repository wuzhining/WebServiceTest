 var reqData={
			IFS:'B000049',
		     pageIndex:1,
     		pageSize:10
 }
 reqGridData('/iPlant_ajax','dg',reqData);
 function bindGridData(reqData,jsonData){
		var grid={
			name:'dg',
			dataType: 'json', 
			autoRowHeight:false,
			columns: [[
			           { field: 'CP_CD', title: '公司编号', width: 100 ,align:'center'},
		               { field: 'CP_NM', title: '公司名称', width: 200,align:'center'},
		               { field: 'ST_NM', title: '公司简称', width: 100,align:'center'},
		               { field: 'CP_ST', title: '公司状态', width: 100,align:'center'},
		               { field: 'USE_YN', title: '是否启用', width: 100,align:'center'},
		               { field: 'CP_ADR', title: '公司地址', width: 200,align:'center'},
		               { field: 'CP_WEB', title: '公司主页', width: 200,align:'center'},
		              ]]
		}
	initGridView(reqData,grid);
	$('#dg').datagrid('loadData',jsonData);

}
//查询
function getDataByCondition(){
	var userMesCode = $('.combobox').val();
	var userMesNum = $('.textbox').val();
	var userMesDate =$('.datebox').val();
	var reqData ={
		USE_CD: userMesCode,
		EMP_NO: userMesNum,
		GR_CD: userMesDate,
		IFS:'D000049'
	}
	if(userMesCode==''&&userMesNum==''&&userMesDate==''){
		$.messager.alert('提示','请输入选择条件');
	}else{
		reqGridData('/iPlant_ajax',reqData)
		$('.linkbtn').dialog('close');	
	}
}
//屏幕自适应
var evt = "onorientationchange" in window ? "orientationchange" : "resize";
window.addEventListener(evt, function() {
    
        var width = document.documentElement.clientWidth;
        var height =  document.documentElement.clientHeight;
	$print =  $('#print');
         if( width >= height ){
            $print.width(width);
            $print.height(height);
            $print.css('top',  0 );
            $print.css('left',  0 );
            $print.css('transform' , 'none');
            $print.css('transform-origin' , '50% 50%');
         }
         else{
            $print.width(height);
            $print.height(width);
            $print.css('top',  (height-width)/2 );
            $print.css('left',  0-(height-width)/2 );
            $print.css('transform' , 'rotate(90deg)');
            $print.css('transform-origin' , '50% 50%');
         }
    },false);	
	
	
	
	
	
	
	
	
	
	
	
	
	
