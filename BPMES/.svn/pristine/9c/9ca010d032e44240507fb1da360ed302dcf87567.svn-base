
(function(){
	function csbkbInfo(){
		ccfunc = function (){
				/*agv*/
//		       iplantAjaxRequest({
//		           url: '/iPlant_ajax',
//		           data: {
//		               IFS: 'ST00096',
//		               AGV_CD:'1',
//		               LINE_CD:lx,
//		               REQ_TIME:dtime,
//		               ET_CD:sbbm
//		           },
//		           successCallBack: function (data) {
//		        	   if(data.RESPONSE[0].length != 0){
//		        		   var rowCollection = createSourceObj(data);
//		        		   if(rowCollection.length>0){
//		        			   
//		        		   }
//		        	   }
//		           }
//		       });
			ccINdext++;
			if(ccINdext%10!=0){
				ccINdext =ccINdext%10;
			}
			
			ccHidden();
			$("#ccID"+ccINdext).show();
		      
		},
		ccHidden=function(){
			for(var i=1; i<11; i++){
				$("#ccID"+i).hide();
			}
		}
	}
		csbkbInfo.prototype={
				init: function () {
						$(function () {
//							dtime  = getBCtime();
//							lx = getQueryString("line");
//							sbbm = getQueryString("shebei");
							var height = document.getElementById("cctest").offsetHeight;
							var width = document.getElementById("cctest").offsetWidth;
							
							var wid = 3*height;
							var mdiv = document.createElement("div");
							mdiv.style.height=height+'px';
							mdiv.style.width=wid+'px';
						    mdiv.style.background="url(image/zmb.png)";
						    mdiv.style.backgroundSize = "100% 100%";
						    mdiv.style.marginLeft = (width-wid)/2+"px";
						    document.getElementById("cctest").appendChild(mdiv); 
						    
						    
						    var adiv = document.createElement("div");
						    adiv.style.height='60px';
						    adiv.style.width='60px';
						    adiv.style.background="url(image/yx.png)";
						    adiv.style.backgroundSize = "100% 100%";
						    adiv.style.position ="absolute";
						    adiv.style.right =height+"px";
						    adiv.style.top =(height/2-5)+"px";
						    mdiv.appendChild(adiv); 
						    
						    var bdiv = document.createElement("div");
						    bdiv.style.height='60px';
						    bdiv.style.width='60px';
						    bdiv.style.background="url(image/tz.png)";
						    bdiv.style.backgroundSize = "100% 100%";
						    bdiv.style.position ="absolute";
						    bdiv.style.left =height+"px";
						    bdiv.style.top =(height/2-5)+"px";
						    mdiv.appendChild(bdiv); 
						    
						    var cdiv = document.createElement("div");
						    cdiv.style.height='40px';
						    cdiv.style.width='60px';
						    cdiv.style.background="url(image/agvc.png)";
						    cdiv.style.backgroundSize = "100% 100%";
						    cdiv.style.position ="absolute";
						    cdiv.style.left =wid*0.18+"px";
						    cdiv.style.top =height*0.77+"px";
						    mdiv.appendChild(cdiv); 
						    
						    
						    //agv   1
						    var ddiv = document.createElement("div");
						    ddiv.id="ccID1";
						    //ddiv.style.display='none';
						    ddiv.style.height='40px';
						    ddiv.style.width='60px';
						    ddiv.style.background="url(image/agva.png)";
						    ddiv.style.backgroundSize = "100% 100%";
						    ddiv.style.position ="absolute";
						    ddiv.style.right =wid*0.095+"px";
						    ddiv.style.top =height*0.77+"px";
						    mdiv.appendChild(ddiv); 
						    //agv   1
						    var ediv = document.createElement("div");
						    ediv.id="ccID2";
						    ediv.style.height='40px';
						    ediv.style.width='60px';
						    ediv.style.background="url(image/agva.png)";
						    ediv.style.backgroundSize = "100% 100%";
						    ediv.style.position ="absolute";
						    ediv.style.right =wid*0.195+"px";
						    ediv.style.top =height*0.77+"px";
						    mdiv.appendChild(ediv); 
						    $("#ccID2").hide();
						    //agv  1
						    var fdiv = document.createElement("div");
						    fdiv.id="ccID3";
						    fdiv.style.height='40px';
						    fdiv.style.width='60px';
						    fdiv.style.background="url(image/agva.png)";
						    fdiv.style.backgroundSize = "100% 100%";
						    fdiv.style.position ="absolute";
						    fdiv.style.right =wid*0.285+"px";
						    fdiv.style.top =height*0.77+"px";
						    mdiv.appendChild(fdiv); 
						    $("#ccID3").hide();
						    //agv   1
						    var gdiv = document.createElement("div");
						    gdiv.id="ccID4";
						    gdiv.style.height='40px';
						    gdiv.style.width='60px';
						    gdiv.style.background="url(image/agva.png)";
						    gdiv.style.backgroundSize = "100% 100%";
						    gdiv.style.position ="absolute";
						    gdiv.style.right =wid*0.375+"px";
						    gdiv.style.top =height*0.77+"px";
						    mdiv.appendChild(gdiv); 
						    $("#ccID4").hide();
						    //agv   1
						    var hdiv = document.createElement("div");
						    hdiv.id="ccID5";
						    hdiv.style.height='40px';
						    hdiv.style.width='60px';
						    hdiv.style.background="url(image/agva.png)";
						    hdiv.style.backgroundSize = "100% 100%";
						    hdiv.style.position ="absolute";
						    hdiv.style.right =wid*0.46+"px";
						    hdiv.style.top =height*0.77+"px";
						    mdiv.appendChild(hdiv);
						    $("#ccID5").hide();
						    
						    //agv   2
						    var idiv = document.createElement("div");
						    idiv.id="ccID6";
						    idiv.style.height='60px';
						    idiv.style.width='40px';
						    idiv.style.background="url(image/agvb.png)";
						    idiv.style.backgroundSize = "100% 100%";
						    idiv.style.position ="absolute";
						    idiv.style.right =wid*0.465+"px";
						    idiv.style.top =height*0.58+"px";
						    mdiv.appendChild(idiv); 
						    $("#ccID6").hide();
						    //agv   2
						    var jdiv = document.createElement("div");
						    jdiv.id="ccID7";
						    jdiv.style.height='60px';
						    jdiv.style.width='40px';
						    jdiv.style.background="url(image/agvb.png)";
						    jdiv.style.backgroundSize = "100% 100%";
						    jdiv.style.position ="absolute";
						    jdiv.style.right =wid*0.465+"px";
						    jdiv.style.top =height*0.36+"px";
						    mdiv.appendChild(jdiv); 
						    $("#ccID7").hide();
						    
						    //agv   1
						    var kdiv = document.createElement("div");
						    kdiv.id="ccID8";
						    kdiv.style.height='40px';
						    kdiv.style.width='60px';
						    kdiv.style.background="url(image/agva.png)";
						    kdiv.style.backgroundSize = "100% 100%";
						    kdiv.style.position ="absolute";
						    kdiv.style.right =wid*0.46+"px";
						    kdiv.style.top =height*0.14+"px";
						    mdiv.appendChild(kdiv); 
						    $("#ccID8").hide();
						    //agv   1
						    var ldiv = document.createElement("div");
						    ldiv.id="ccID9";
						    ldiv.style.height='40px';
						    ldiv.style.width='60px';
						    ldiv.style.background="url(image/agva.png)";
						    ldiv.style.backgroundSize = "100% 100%";
						    ldiv.style.position ="absolute";
						    ldiv.style.right =wid*0.285+"px";
						    ldiv.style.top =height*0.14+"px";
						    mdiv.appendChild(ldiv); 
						    $("#ccID9").hide();
						    
						    
						    //agv   1
						    var ndiv = document.createElement("div");
						    ndiv.id="ccID10";
						    ndiv.style.height='40px';
						    ndiv.style.width='60px';
						    ndiv.style.background="url(image/agva.png)";
						    ndiv.style.backgroundSize = "100% 100%";
						    ndiv.style.position ="absolute";
						    ndiv.style.right =wid*0.095+"px";
						    ndiv.style.top =height*0.14+"px";
						    mdiv.appendChild(ndiv);
						    $("#ccID10").hide();
						    
							var t=setInterval(function  () {
								ccfunc();
							},5000);
							
						});						  							
					}
				}
				
		var csbkb = new csbkbInfo();
		var ccINdext = 1;
//		var agva = "url(image/agva.png)";
//		var agvb = "url(image/agvb.png)";
		var sbbm = "";
		var lx ="";
		var cctm  = {A:'08-10', B:'10-12', C:'12-14', D:'14-16', E:'16-18',F:'18-20'};
		var dtime  = "";
		csbkb.init();
})();
