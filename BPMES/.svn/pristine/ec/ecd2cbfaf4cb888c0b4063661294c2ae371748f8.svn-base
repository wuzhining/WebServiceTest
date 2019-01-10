
(function(){
	var curLocation=0;
	var curAgvLocation=0;
	var curRunLocation=0;
	var curRunLoc1=0;
	var agvLocation1=[2,7,8,9];
	function wareHouse_state(){
		var ajaxParam={
			    url: '/iPlant_ajax',
			    data:{
			    	IFS: 'WMS_M00021',
			    	WAREHOUSE_ID:'C0001'
				},
				successCallBack:function(data){
					var obj=data.RESPONSE[0].RESPONSE_DATA;
					if(obj!=null){
						$.each(obj,function(n,objs){
							var result = objs.SHELF_NAME.replace(/[^0-9]/ig,""); 
							var rowNum = parseInt(objs.ROW_ID),
							columnNum = parseInt(objs.COLUMN_ID);
							if(objs.BARCODE ==null){
								$('tr[name='+result+']').eq(rowNum - 1).find('div').eq(columnNum - 1).css('background','#FFFFFF');
							}else if(objs.BARCODE == 'N'){
								$('tr[name='+result+']').eq(rowNum - 1).find('div').eq(columnNum - 1).css('background','#49CB5F');
							}else{
								$('tr[name='+result+']').eq(rowNum - 1).find('div').eq(columnNum - 1).css('background','#DD5044');
							}
						});
					}
			    }
			}
			iplantAjaxRequest(ajaxParam);
	}
	function agvRunLocation1Hide(){
		for(var j=0; j<4; j++){
			$("#Location"+agvLocation1[j]).hide();
		}
	}
	function agvRunLocation1Show(){
		var ajaxAgvParam={
			    url: '/iPlant_ajax',
			    data:{
			    	IFS: 'ST00117',
			    	AGV_CD:1
				},
				successCallBack:function(data){
					var obj=data.RESPONSE[0].RESPONSE_DATA;
					if(obj!=null){
						/*agv当前位置*/
						if(agvLocation1.indexOf(Number(obj[0].TO_POINT))>=0){
							curAgvLocation=obj[0].TO_POINT;
						}
						
						/*agv当前状态*/
						if(Number(obj[0].RUN_FLAG)==0){
							$('#divStop1').show();
							$('#divRun1').hide();
						}
						else
						{
							$('#divStop1').hide();
							$('#divRun1').show();
						}
						agvRunLocation1Hide();
						$("#Location"+curAgvLocation).show();
						if(agvLocation1.indexOf(curAgvLocation)>-1){
							curRunLoc1=curAgvLocation;	
						}
						else
						{
							$("#Location"+curRunLoc1).show();
						}
						
				    }
				}
			}
			iplantAjaxRequest(ajaxAgvParam);
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
	    mdiv.style.background="url(image/new_right.png)";
	    mdiv.style.backgroundSize = "100% 100%";
	    mdiv.style.marginLeft = (width-wid)/1.15+"px";
	    document.getElementById("myImg").appendChild(mdiv); 
	    
	    /*创建agv设备状态层--运行*/
	    var adiv2 = document.createElement("div");
	    adiv2.id='divRun1';
	    adiv2.style.height='20px';
	    adiv2.style.width='20px';
	    adiv2.style.background="url(image/yx.png)";
	    adiv2.style.backgroundSize = "100% 100%";
	    adiv2.style.position ="absolute";
	    adiv2.style.left =(height+220)+"px";
	    adiv2.style.top =(height/2+8)+"px";
	    adiv2.style.display='none';
	    mdiv.appendChild(adiv2); 
	    
	    /*创建agv设备状态层--停止*/
	    var bdiv = document.createElement("div");
	    bdiv.id='divStop1';
	    bdiv.style.height='20px';
	    bdiv.style.width='20px';
	    bdiv.style.background="url(image/tz.png)";
	    bdiv.style.backgroundSize = "100% 100%";
	    bdiv.style.position ="absolute";
	    bdiv.style.left =(height+220)+"px";
	    bdiv.style.top =(height/2+8)+"px";
	    mdiv.appendChild(bdiv);
	    
	    var locationX=5,locationY=0,tmpLocationX=0;
	    /*初始化AGV1小车*/
	    for(var i=0;i<4;i++){
	    	
	    	var locationID='Location'+agvLocation1[i];
	        var ediv=document.createElement("div");
	    	ediv.id=locationID;
	    	ediv.style.height='8px';
	    	ediv.style.width='10px';
	    	ediv.style.background="url(image/agva_new.png)";
	    	ediv.style.backgroundSize = "100% 100%";
	    	ediv.style.position ="absolute";
	    	if(i==0){
            	locationX=locationX+205;	
            	locationY=(height/2+38);	
            	tmpLocationX=locationX;
            }
	    	else if(i==1)
	    	{
	    		locationX=locationX-10;
            	locationY=(height/2+7);
            	tmpLocationX=locationX;
	    	}
    		else if(i==2){	
    			locationX=tmpLocationX;
            	locationY=(height/4-4);
    		}
    		else if(i==3){	
    			locationX=tmpLocationX+40;
            	locationY=(height/4-4);
    		}
	    	ediv.style.left =locationX+"px";
	    	ediv.style.top =locationY+"px";
	 	    mdiv.appendChild(ediv); 
	 	    //$("#Location"+agvLocation1[i]).hide();
	 	}
	    
	    wareHouse_state();
	    var t=setInterval(function() {
	    	wareHouse_state();
	    	//agvRunLocation1Show();
		},2000);
   });
})();
