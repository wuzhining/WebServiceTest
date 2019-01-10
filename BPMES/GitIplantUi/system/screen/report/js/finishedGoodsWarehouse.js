(function(){
	var curLocation=0,curRunLocation=0;
	var agvLocation=[1,2,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44];
	/*agv小车呼叫状态列表*/
	function initGridData() {
	    var dgrid = $('#agv_callstatus_tab').datagrid('options');
		if (!dgrid)
			return;
		var reqData = {
			IFS : 'WMS_B00079',
			pageIndex : 1,
			pageSize : dgrid.pageSize
		}
		reqAGVData('/iPlant_ajax', 'agv_callstatus_tab', reqData);
	}
	function bindGridData(reqData, jsonData){
		var grid = {
			name : 'agv_callstatus_tab',
			pagination:false,
			dataType: 'json',
			columns:[[
			{  field:'AGV_ID',title:'车号',width:28,align:'center'}, 
			{  field:'SHELF_NAME',title:'区号',width:25,align:'center'}, 
			{  field:'COLUMN_ID',title:'位号',width:25,align:'center'},
			{  field:'ROW_ID',title:'层号',width:25,align:'center'}, 
			{  field:'DIRECT',title:'动作',width:28,align:'center'}, 
			{  field:'OPERATE_STATUS',title:'状态',width:50,align:'center'}
			]],
		}
		initGridView(reqData, grid);
		$(".datagrid-header-row td div span").each(function(i,th){
			var val = $(th).text();
			 $(th).html("<label style='font-weight: bolder;'>"+val+"</label>");
		});
		
		$('#agv_callstatus_tab').datagrid('loadData', jsonData);
		$('.datagrid-cell').css({'font-size':'3px','font-weight': 'bolder'});
		$('.datagrid-header .datagrid-cell span').css({'font-size':'3px','font-weight': 'bolder'});
		$('.panel-title').css({'font-size':'3px','font-weight': 'bolder'});
	}
	
	function bindWarehouseData(){
		  var ajaxParam={
				  url: '/iPlant_ajax',
				  data:{
					    	IFS: 'WMS_M00028'
						},
						successCallBack:function(data){
						    var mData=data.RESPONSE["0"].RESPONSE_DATA["0"].resultStr;
						    var dataSource=eval('('+mData+')');
							for(var i=0;i<dataSource.GoodShelf.length;i++){
								var tabWidth=dataSource.GoodShelf[i].GoodTrack.length*55;
								$.extend(dataSource.GoodShelf[i],{tbWidth:tabWidth+'px'});
							}
							var myTemplate = Handlebars.compile($("#warehuseInfo").html());
							var strHtml = myTemplate(dataSource);
						    
							$('#container').html(strHtml);
						},
						errorCallBack:function(e){
						}
						
				}
			    iplantAjaxRequest(ajaxParam);
		
	}
	function bindHistoryData(){
		var ajaxParam={
			url: '/iPlant_ajax',
			data:{
				  IFS: 'WMS_B00080'
			},
			successCallBack:function(data){
				var mData=data.RESPONSE["0"].RESPONSE_DATA;
				var dataSource={'ResponseData':mData};
				var myTemplate = Handlebars.compile($("#histroyInfo").html());
				var strHtml = myTemplate(dataSource);
				$('#divHistoryTab').html(strHtml);
			},
			errorCallBack:function(e){
			}
						
		}
	    iplantAjaxRequest(ajaxParam);
		
	}
	
	function locationHidden(){
		for(var i=0; i<27; i++){
			$("#Location"+agvLocation[i]).hide();
		}
	}
	
	function locationShow(divStop,divRun){
		var ajaxParam={
		    url: '/iPlant_ajax',
		    data:{
		    	IFS: 'ST00117',
		    	AGV_CD:2
			},
			successCallBack:function(data){
				var obj=data.RESPONSE[0].RESPONSE_DATA;
				if(obj!=null){
					/*agv当前位置*/
					if(agvLocation.indexOf(Number(obj[0].TO_POINT))>=0){
						curLocation=obj[0].TO_POINT;
					}
					
					/*agv当前状态*/
					if(Number(obj[0].RUN_FLAG)==0){
						$('#'+divStop).show();
						$('#'+divRun).hide();
					}
					else
					{
						$('#'+divStop).hide();
						$('#'+divRun).show();
					}
					locationHidden();
					$("#Location"+curLocation).show();
					if(agvLocation.indexOf(curLocation)>-1){
						curRunLocation=curLocation;	
					}
					else
					{
					    $('#Location'+curRunLocation).show();	
					}
				}
				bindWarehouseData();
				bindHistoryData();
				initGridData();
		    }
		}
		iplantAjaxRequest(ajaxParam);
    }
	window.bindGridData=bindGridData;
	
	$(function(){
		initGridData();
		bindHistoryData();
		bindWarehouseData();
		var equipmentWidth = document.documentElement.clientWidth; 			/*获取设备屏幕宽度*/
		var equipmentHeight = document.documentElement.clientHeight;		/*获取设备屏幕高度*/
		$(document.body).css({'width':equipmentWidth,'height':equipmentHeight});
		
		/*创建主容器div层*/
		var height = document.getElementById("topPathWay").offsetHeight;
		var width = document.getElementById("topPathWay").offsetWidth-90;
		
		var wid = width;
		var mdiv = document.createElement("div");
		height=width*236/1537;
		mdiv.style.height=height+'px';
		mdiv.style.width=wid+'px';
	    mdiv.style.background="url(image/zmb_cpck.png)";
	    mdiv.style.backgroundSize = "100% 100%";
	    mdiv.style.marginLeft = (width-wid)/2+50+"px";
	    mdiv.style.marginTop ="5px";
	    document.getElementById("topPathWay").appendChild(mdiv); 
	    
	    /*创建agv设备状态层--运行*/
	    var adiv = document.createElement("div");
	    adiv.id='divRun1';
	    adiv.style.height='50px';
	    adiv.style.width='50px';
	    adiv.style.background="url(image/yx.png)";
	    adiv.style.backgroundSize = "100% 100%";
	    adiv.style.position ="absolute";
	    adiv.style.right =(width/3+20)+"px";
	    adiv.style.top =(height/2-20)+"px";
	    //adiv.style.display="none";
	    mdiv.appendChild(adiv); 
	    
	    /*创建agv设备状态层--停止*/
	    var rdiv = document.createElement("div");
	    rdiv.id='divStop1'
	    rdiv.style.height='50px';
	    rdiv.style.width='50px';
	    rdiv.style.background="url(image/tz.png)";
	    rdiv.style.backgroundSize = "100% 100%";
	    rdiv.style.position ="absolute";
	    rdiv.style.right =(width/3+20)+"px";
	    rdiv.style.top =(height/2-20)+"px";
	    rdiv.style.display="none";
	    mdiv.appendChild(rdiv);
	    
	    var locationX=9,locationY=0,tmpLocationX=0;
	    
	    /*初始化AGV小车*/
	    for(var i=0;i<27;i++){
	    	var locationID='Location'+agvLocation[i];
	        var ediv=document.createElement("div");
	    	ediv.id=locationID;
	    	ediv.style.height='20px';
	    	ediv.style.width='30px';
	    	ediv.style.background="url(image/agvc_new.png)";
	    	ediv.style.backgroundSize = "100% 100%";
	    	ediv.style.position ="absolute";
	    	if(i<4){
            	locationX=locationX+36;
            	locationY=(height/2-8);
            	tmpLocationX=locationX;
            }
	    	else if(i>=4 &&i<15)
	    	{
	    		if(i==4)
	    		{
	    			locationX=locationX+33;
	    		}
	    		else
	    		{
	    	    	locationX=locationX+52;
	    		}
	    		locationY=5;
	    	}
    		else if(i>=15 && i<27){
    			if(i==15)
	    		{
	    			locationX=tmpLocationX+35;
	    		}
	    		else
	    		{
	    	    	locationX=locationX+46;
	    		}
    			locationY=(height-18);
    		}
	    	ediv.style.right =locationX+"px";
	    	ediv.style.top =locationY+"px";
	 	    mdiv.appendChild(ediv); 
	 	    $("#Location"+agvLocation[i]).hide();
	 	}	    
	    bindWarehouseData();
	    
	    var t=setInterval(function() {
			locationShow('divStop1','divRun1');
		},2000);
   });
})();
