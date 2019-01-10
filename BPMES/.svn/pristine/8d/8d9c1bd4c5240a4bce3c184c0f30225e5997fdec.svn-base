
(function(){
	var curLocation=0;
	var curAgvLocation=0;
	var curRunLocation=0;
	var curRunLoc1=0;
	var agvLocation1=[2,7,8,9];
	var agvLocation2=[1,2,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44];
	function locationHidden(){
		for(var i=0; i<28; i++){
			$("#Location"+agvLocation2[i]).hide();
		}
	}
	function locationShow(){
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
					if(agvLocation2.indexOf(Number(obj[0].TO_POINT))>=0){
						curLocation=obj[0].TO_POINT;
					}
					
					/*agv当前状态*/
					if(Number(obj[0].RUN_FLAG)==0){
						$('#divStop2').show();
						$('#divRun2').hide();
					}
					else
					{
						$('#divStop2').hide();
						$('#divRun2').show();
					}
					locationHidden();
					$("#Location"+curLocation).show();
					if(agvLocation2.indexOf(curLocation)>-1){
						curRunLocation=curLocation;	
					}
					else
					{
					    $('#Location'+curRunLocation).show();	
					}
				}
		    }
		}
		iplantAjaxRequest(ajaxParam);
	}
	function wareHouse_state(){
		var ajaxParam={
			    url: '/iPlant_ajax',
			    data:{
			    	IFS: 'WMS_M00021',
			    	WAREHOUSE_ID:'C0002'
				},
				successCallBack:function(data){
					var obj=data.RESPONSE[0].RESPONSE_DATA;
					if(obj!=null){
						$.each(obj,function(n,objs){
							var result = objs.SHELF_NAME.replace(/[^a-z]+/ig,"");
							var rowNum = parseInt(objs.ROW_ID),
							columnNum = parseInt(objs.COLUMN_ID);
							if(objs.BARCODE ==null){
								$('tr[name='+result+']').eq(rowNum - 1).find('div').eq(columnNum - 1).css('background','#FFFFFF');
							}else{
								$('tr[name='+result+']').eq(rowNum - 1).find('div').eq(columnNum - 1).css('background','#DD5044');
							}
						});
					}
			    }
			}
			iplantAjaxRequest(ajaxParam);
	}
	$(function(){
		
		var height = document.getElementById("myImg").offsetHeight;
		var width = document.getElementById("myImg").offsetWidth;
		
		/*创建主容器div层*/
		var wid = 3*height;
		//var wid=width-180;
		var mdiv = document.createElement("div");
		mdiv.style.height=height+'px';
		mdiv.style.width=wid+'px';
	    mdiv.style.background="url(image/new_left.png)";
	    mdiv.style.backgroundSize = "100% 100%";
	    mdiv.style.marginLeft = (width-wid)/2+"px";
	    document.getElementById("myImg").appendChild(mdiv); 
	    
	    /*创建agv设备状态层--运行*/
	    var adiv2 = document.createElement("div");
	    adiv2.id='divRun2';
	    adiv2.style.height='20px';
	    adiv2.style.width='20px';
	    adiv2.style.background="url(image/yx.png)";
	    adiv2.style.backgroundSize = "100% 100%";
	    adiv2.style.position ="absolute";
	    adiv2.style.left =(height+100)+"px";
	    adiv2.style.top =(height/2)+"px";
	    adiv2.style.display='none';
	    mdiv.appendChild(adiv2); 
	    
	    /*创建agv设备状态层--停止*/
	    var bdiv = document.createElement("div");
	    bdiv.id='divStop2';
	    bdiv.style.height='20px';
	    bdiv.style.width='20px';
	    bdiv.style.background="url(image/tz.png)";
	    bdiv.style.backgroundSize = "100% 100%";
	    bdiv.style.position ="absolute";
	    bdiv.style.left =(height+100)+"px";
	    bdiv.style.top =(height/2)+"px";
	    mdiv.appendChild(bdiv);
	    
	    var locationX=80,locationY=0,tmpLocationX=0;
	    /*初始化AGV2小车*/
	    for(var i=0;i<26;i++){
	    	
	    	var locationID='Location'+agvLocation2[i];
	        var ediv=document.createElement("div");
	    	ediv.id=locationID;
	    	ediv.style.height='15px';
	    	ediv.style.width='20px';
	    	ediv.style.background="url(image/agvc_new.png)";
	    	ediv.style.backgroundSize = "100% 100%";
	    	ediv.style.position ="absolute";
	    	if(i==0){
            	locationX=locationX+5;
            	locationY=(height/2);
            	tmpLocationX=locationX;
            }else if(i<3 && i>0){
            	locationX=locationX+30;
            	locationY=(height/2);
            	tmpLocationX=locationX;
            	
            	if(i==2){
            		locationX=locationX+30;
                	locationY=(height/2);
                	tmpLocationX=locationX;
            	}
            }
	    	else if(i>=3 &&i<14)
	    	{
	    		if(i==3)
	    		{
	    			locationX=locationX+19;
	    		}
	    		else
	    		{
	    	    	locationX=locationX+42;
	    		}
	    		locationY=(height-35);
	    	}
    		else if(i>=14 && i<26){
    			if(i==14)
	    		{
	    			locationX=tmpLocationX;
	    		}
	    		else
	    		{
	    	    	locationX=locationX+38;
	    		}
    			locationY=(height/4-21);
    		}
	    	ediv.style.left =locationX+"px";
	    	ediv.style.top =locationY+"px";
	 	    mdiv.appendChild(ediv); 
	 	    $("#Location"+agvLocation2[i]).hide();
	 	}
	    
	    wareHouse_state();
	    var t=setInterval(function() {
	    	wareHouse_state();
			locationShow();
		},2000);
   });
})();
