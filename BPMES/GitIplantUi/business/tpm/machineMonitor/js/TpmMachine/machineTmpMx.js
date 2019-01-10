(function(){
	function machineMx(){
		trim=function(str){   
		    return str.replace(/^(\s|\u00A0)+/,'').replace(/(\s|\u00A0)+$/,'');   
		}
		var prodTime='',isStopedMachine=0,totTime=0;//totTime 一级保养时间  小时
		convertTime=function(type,formatChar,machineNo){
			var retContent='';
			if(type=='0'){
			    if(formatChar!='' && formatChar!= null){
			    		var day=0,startIndex=0;
				        if(formatChar.indexOf('天')>0){
				    		day=formatChar.substring(startIndex,formatChar.indexOf('天'));
				    		startIndex=formatChar.indexOf('天')+1;
				    	}
				    	var hour=0;
				    	if(formatChar.indexOf('时')>0){
				    		hour=formatChar.substring(startIndex,formatChar.indexOf('时'));
				    		startIndex=formatChar.indexOf('时')+1;
				    	}
				    	var mintuine=0;
				    	if(formatChar.indexOf('分')>0){
				    		mintuine=formatChar.substring(startIndex,formatChar.indexOf('分'));
				    		startIndex=formatChar.indexOf('分')+1;
				    	}
				    	var second=0;
				    	if(formatChar.indexOf('秒')>0){
				    		second=formatChar.substring(startIndex,formatChar.indexOf('秒'));
				    	}
				    	var totalDaySec=parseInt(day)*24*3600;
				    	var totalHourSec=parseInt(hour)*3600;
				    	var totalMintuineSec=parseInt(mintuine)*60;
				    	var totalSecond=parseInt(totalDaySec)+parseInt(totalHourSec)+parseInt(totalMintuineSec)+parseInt(second);
				    	retContent=(parseInt(totTime)*3600)-totalSecond;
				    	
				  }
				    	/*var totalHours=parseInt(day)*24+parseInt(hour)+parseInt(mintuine)/60;
				    	  retContent=600-totalHours;
				    	}*/
			    	
			}
			else
			{
				if(parseInt(formatChar)<0) {
					retContent='立即保养';
			    }
				else
				{
					
					   /*var hours=0,day=0,mintuine=0;
						var seond=parseInt(formatChar)%60;
						var s=parseInt(parseInt(formatChar)/60);
						if(s > 60)
							{
							    mintuine=parseInt(s)%60;
								s=parseInt(parseInt(s)/60); 
								if(s>24)
									{
										 hours=parseInt(s)%24.0;
										 day=parseInt(parseInt(s)/24);
									}
							}*/
						
						
						    /*var day=parseInt(parseInt(formatChar)/24);
							var hours=parseInt(parseInt(formatChar)%24.0);
						    var hoursChar=formatChar.toString();
							var mintuineChar='0.'+hoursChar.substring(hoursChar.indexOf('.')+1,hoursChar.indexOf('.')+2);
							if(mintuineChar=='0.'){mintuineChar='0';}
							var mintuine=parseFloat(mintuineChar)*60;
						retContent='';
						if(day>0){retContent+=day.toString()+'天';}
						if(hours>0){ retContent+=hours+'时';}
						if(mintuine>0){ retContent+=mintuine+'分'; }*/
					var time = parseInt(formatChar) + "秒";  
					if( parseInt(formatChar )> 60){  
						var second = parseInt(formatChar) % 60;  
					    var min = parseInt(formatChar / 60);  
					    retContent = min + "分" 
					    //+ second + "秒";  
					      
					    if( min > 60 ){  
					        min = parseInt(formatChar / 60) % 60;  
					        var hour = parseInt( parseInt(formatChar / 60) /60 );  
					        retContent = hour + "时" + min + "分" 
					        //+ second + "秒";  
					  
					        if( hour > 24 ){  
					            hour = parseInt( parseInt(formatChar / 60) /60 ) % 24;  
					            var day = parseInt( parseInt( parseInt(formatChar / 60) /60 ) / 24 );  
					            retContent = day + "天" + hour + "时" + min + "分" 
					            //+ second + "秒";  
					        }  
					    }  
					      
					  
					} 
			    }
		    }
			return retContent;
		}
//		createObj = function (data) {
//			 var runHours=new Array();
//			 runHours.push('1天6时23分');
//			 runHours.push('10天15时27分');
//			 runHours.push('5天17时45分');
//			 runHours.push('9天18时38分');
//			 runHours.push('6天21时17分');
//			 runHours.push('8天3时38分');
//			 runHours.push('26天2时32分');
//			 runHours.push('17天1时27分');
//			 runHours.push('2天10时29分');
//			 runHours.push('9天11时26分');
//			 runHours.push('7天12时26分');
//			 runHours.push('8天18时39分');
//			 runHours.push('16天10时48分');
//			 runHours.push('27天8时10分');
//			 runHours.push('27天6时10分');
//			 runHours.push('17天20时34分');
//			 runHours.push('8天19时25分');
//			 runHours.push('9天12时36分');
//			 runHours.push('7天18时45分');
//			 runHours.push('3天12时17分');
//			 var empConfig=new Array();
//	           empConfig.push("汤仁根");
//	           empConfig.push("黄维平");
//	           empConfig.push("王小明");
//	           empConfig.push("罗新村");
//	           empConfig.push("郑英波");
//	           empConfig.push("谢杵林");
//	           empConfig.push("曹阳虎");
//	           empConfig.push("张平勇");
//	           empConfig.push("谢福生");
//	           empConfig.push("段小兰");
//	           empConfig.push("吴学芬");
//	           empConfig.push("徐丙凤");
//	           empConfig.push("谢俊祥");
//	           empConfig.push("韦文加");
//	           empConfig.push("钟桂香");
//	           empConfig.push("彭愉");
//	           empConfig.push("张婉敏");
//	           empConfig.push("谢杵华");
//	           empConfig.push("徐来弟");
//	           empConfig.push("董怀权");
//        	 var rowArray = new Array();
//        	 if(data.RESPONSE.length>0){
//		        if (!data.RESPONSE["0"].RESPONSE_DATA) return rowArray;
//		          var mIndex=0;
//		          for (var i = 0; i < data.RESPONSE["0"].RESPONSE_DATA.length; i++) {
//		              if (data.RESPONSE["0"].RESPONSE_DATA[i]) {
//		            	  mIndex=i;
//		            	  if(i>runHours.length-1){mIndex=(i-runHours.length)%8;}
//		            	  if(data.RESPONSE["0"].RESPONSE_DATA[i].ET_NM=='F1'){
//		            		  if(prodTime==''){
//	            				  data.RESPONSE["0"].RESPONSE_DATA[i].LASTTIME=data.RESPONSE["0"].RESPONSE_DATA[i].PD_AT;
//	            				  prodTime=data.RESPONSE["0"].RESPONSE_DATA[i].LASTTIME;
//	            			  }
//	            			  else
//	            			  {
//	            				  if(data.RESPONSE["0"].RESPONSE_DATA[i].DICT_IT=='RDI01.01'){
//	            					  data.RESPONSE["0"].RESPONSE_DATA[i].LASTTIME=data.RESPONSE["0"].RESPONSE_DATA[i].PD_AT;
//		            				  prodTime=data.RESPONSE["0"].RESPONSE_DATA[i].LASTTIME;
//	            				  }
//	            				  else
//	            				  {
//	            					  data.RESPONSE["0"].RESPONSE_DATA[i].LASTTIME=prodTime;  
//	            				  }
//	            				  
//	            			  }
//		            	  }
//		            	  else
//		            	  {
//		            		  if(data.RESPONSE["0"].RESPONSE_DATA[i].DICT_IT!='RDI01.01'){
//		            			  data.RESPONSE["0"].RESPONSE_DATA[i].LASTTIME=runHours[mIndex]; 
//		            		  }
//		            		  else
//		            		  {
//		            			  data.RESPONSE["0"].RESPONSE_DATA[i].LASTTIME=data.RESPONSE["0"].RESPONSE_DATA[i].PD_AT;
//		            		  }
//		            		  
//		            	  }
//		            	  if(data.RESPONSE["0"].RESPONSE_DATA[i].DICT_IT!='RDI01.01' && data.RESPONSE["0"].RESPONSE_DATA[i].ET_NM!='F1'){
//		            		 data.RESPONSE["0"].RESPONSE_DATA[i].LASTTIME=runHours[mIndex]; 
//		            	  }
//		            	  /*else
//		            	  {
//		            		  if(data.RESPONSE["0"].RESPONSE_DATA[i].ET_NM=='F1'){
//		            			  if(prodTime==''){
//		            				  data.RESPONSE["0"].RESPONSE_DATA[i].LASTTIME=data.RESPONSE["0"].RESPONSE_DATA[i].PD_AT;
//		            			  }
//		            			  else
//		            			  {
//		            				  data.RESPONSE["0"].RESPONSE_DATA[i].LASTTIME=prodTime;
//		            			  }
//		            			  
//		            		  }
//		            		  else
//		            		  {
//		            			  data.RESPONSE["0"].RESPONSE_DATA[i].LASTTIME=data.RESPONSE["0"].RESPONSE_DATA[i].PD_AT;  
//		            		  }
//		            	  }*/
//		                  rowArray.push($.extend(data.RESPONSE["0"].RESPONSE_DATA[i],{machineEmp:empConfig[mIndex]}));
//		              }
//		          }
//		     }
//        	 return rowArray;
//		};
		initData = function(zt){
			 var ajaxParam={
	     				url:'/iPlant_app',
	     				dataType:'JSON',
	     				data:{
	     					DICT_IT:zt,
	     					IFS:"J000008"
	     				},
	                    successCallBack:function(data){
	                    	//赋值
	                     	 arrRow = createSourceObj(data);
	                     	//获取 页面  高度  和 宽度
		        	    	 var widthCount = parseInt((document.body.clientWidth)/190);
		        	    	 var heightCount = parseInt((document.body.clientHeight)/230);
	                     	 //初始化 table
	                     	 var _row;   
		       	    		 var _cell;   
		       	    		//var ccId = getQueryString("ccId");
		       	    		 var ccId = parseInt((document.body.clientWidth)/190);
		       	    		 //获取展示行
		       	    		 rowCount = parseInt((arrRow.length)/parseInt(ccId));
		       	    		 //获取多余列
		       	    		 var yCount=(arrRow.length)%parseInt(ccId);
		       	    		 if(yCount>0){
		       	    			rowCount++;
		       	    		 }
		       	    		var sjCount = rowCount;//实际行数
		       	    		 if(rowCount%heightCount>0){
		       	    			rowCount = heightCount*(parseInt(rowCount/heightCount)+1);
		       	    		 }
		       	    		 
		       	    		 //设置大屏 鼠标选中事件 
			       	    	document.getElementById("ccSet").onmouseover=function() {
			       	    			//鼠标选中  删除定时任务
			       	    			if(cCurrPage>1){
		       	    					if(cTimer){
		       	    						clearInterval(cTimer);
		       	    					}
				       	    		}
	    	    				 };
	    	    			document.getElementById("ccSet").onmouseout=function(){
	    	    					 if(cCurrPage>1){
	 			       	    			setCCTime(heightCount,rowCount);
	 			       	    		}
	        	    		};
		       	    		 if(arrRow.length>0){
		       	    			 
		       	    			 //设置 最下方的数字条
			        	    	 if(parseInt(arrRow.length)/(widthCount*heightCount) >0 ){
			        	    		 var a =0;
			        	    		 if(parseInt(arrRow.length)%(widthCount*heightCount)==0){
			        	    			 a  = parseInt(parseInt(arrRow.length)/(widthCount*heightCount));
			        	    		 }else{
			        	    			 a  = parseInt(parseInt(arrRow.length)/(widthCount*heightCount))+1;
			        	    		 }
			        	    		  
			        	    		 for(var i=1; i<=a; i++){
			        	    			 var _input = document.createElement("input");
			        	    			 _input.id="c_button"+i;
			        	    			 if(i==1){
			        	    				 _input.className = "c_down";
			        	    			 }else{
			        	    				 _input.className = "c_up";
			        	    			 }
			        	    			 
			        	    			 _input.type="submit";
			        	    			 _input.value=i;
			        	    			 _input.onmouseover=function() {
			        	    				 for(j=1; j<=a;j++){
			        	    						 document.getElementById("c_button"+j).className="c_up";
			        	    				 }
			        	    				 this.className = "c_down";
			        	    				 //鼠标选中  删除定时任务
			        	    				 if(cCurrPage>1){
			 	       	    					if(cTimer){
			 	       	    						clearInterval(cTimer);
			 	       	    					}
			 			       	    		}
			        	    				//设置所有行为空
					   	    				 for(var i=0; i<rowCount; i++){
					   	    					document.getElementById("ccRowID"+i).style.display='none';
					   	    				 }
					   	    				 //显示当前页所有行
					   	    				 cCurr=parseInt(this.value);
					   	    				 for(var i=0; i<heightCount; i++){
					   	    					 if((heightCount*(cCurr-1)+i)<rowCount)
					   	    						 document.getElementById("ccRowID"+(heightCount*(cCurr-1)+i)).style.display='table-row';
					   	    				 }
			        	    			 };
			        	    			 _input.onmouseout=function(){
			        	    					 if(cCurrPage>1){
			     			       	    			setCCTime(heightCount,rowCount);
			     			       	    		}
			        	    			 }
			        	    			 document.getElementById("ccLight").appendChild(_input);
			        	    		 }
			        	    	 }
			        	    	 
			       	    		 for(var i = 0; i < rowCount; i++) {   
			       	    		     _row = document.createElement("tr");
		       	    		 	 	_row.id="ccRowID"+i;
		       	    		 	 	_row.align="left";
			       	    		     document.getElementById("zfaxxGrid").appendChild(_row);
			       	    		 	if(i>heightCount-1){
			       	    		 		document.getElementById("ccRowID"+i).style.display='none';
			       	    		 	}   
			       	    		     for(var j = 0; j < ccId; j++) {   
			       	    			if(i==sjCount-1 && j>=yCount && yCount!=0){
		       	    		 			_cell = document.createElement("td");
		       	    		 			_cell.style.width=100/parseInt(ccId)+"%"; 
				       	    		    _row.appendChild(_cell);
		       	    		 		}else if(i>sjCount-1){
		       	    		 			_cell = document.createElement("td");
		       	    		 			_cell.style.width=100/parseInt(ccId)+"%"; 
		       	    		 			_cell.style.height="220px"; 
			       	    		   	    _row.appendChild(_cell);
		       	    		 		}else{
			       	    		 		_cell = document.createElement("td");  
			       	    		 		_cell.style.width=100/parseInt(ccId)+"%"; 
			       	    		 		_row.appendChild(_cell);
			       	    		 		var rowD ={};
			       	    		 		rowD = arrRow[i*ccId+j];	
			       	    		 		//加载div
			       	    		 		var _maindiv = document.createElement("div"); 
			       	    		 		var bg = "bg1New";
			       	    		 		
				       	    		 	if(rowD.DICT_IT=="RDI01.01"){
		                    				bg="bg1New";
		                    			}else if(rowD.DICT_IT=="RDI01.02"){
		                    				bg="bg4New";
		                    			}
		                    			else if(rowD.DICT_IT=="RDI01.04" || rowD.DICT_IT=="RDI01.09" || rowD.DICT_IT=="RDI01.10"){
		                    				bg="bg2New";
		                    			}
		                    			else if(rowD.DICT_IT=="RDI01.05"){
		                    				bg="bg5New";
		                    			}
		                    			else if(rowD.DICT_IT=="RDI01.07"){
		                    				bg="bg6New";
		                    			}
		                    			else{
		                    				bg="bg3New";
		                    			}
				       	    		 	//_maindiv.style="width:120;height:190px;background:url(js/"+bg+".jpg);background-size:100% 190px;text-align:left;";
				       	    		 	_maindiv.style.width="180px";
				       	    		 	_maindiv.style.height="220px";
				       	    		 	_maindiv.style.background="url(../../../common/RootImages/"+bg+".jpg)";
				       	    		 	_maindiv.style.backgroundSize = "100% 220px";
				       	    		 	_maindiv.style.textAlign = "left";
				       	    		 	_maindiv.id = "ccFlag"+parseInt(i*ccId+j);
				       	    		 	
				       	    		 	_maindiv.ondblclick = function clickImg(){};
				       	    		 	_cell.appendChild(_maindiv);
			       	    		 		//添加div 下子内容
			       	    		 			var _div = document.createElement("div"); 
			       			 				_div.align= "left";
			       			 				//_div.style="width:100%;height:10%;text-align:left;line-height:25px;";
			       			 				_div.style.width="100%";
			       			 				_div.style.height="10%";
			       			 				_div.style.textAlign="left";
			       			 				_div.style.lineHeight="25px";
			       			 				_div.style.padding="0 0 0 5px";
			       			 				_div.innerText = " 设备名称："+rowD.ET_NM;
			       			 				_maindiv.appendChild(_div);
			       			 				//添加图片 div子内容
			       			 				_img =  document.createElement("img");
			       			 				if(rowD.ET_PL != null && rowD.ET_PL !=""){
			       			 					var imageUrl=rowD.ET_PL;
			       			 					if(trim(rowD.ET_PL)=='ZSJ.png'){
			       			 					   rowD.ET_PL=imageUrl.substring(0,imageUrl.indexOf('.png'))+'New.png';	
			       			 					}
			       			 					_img.src = "../../../common/RootImages/"+rowD.ET_PL;
			       			 				}else{
			       			 					_img.src = "../../../common/RootImages/ZSJNew.png";
			       			 				}
//			       			 				if(rowD.E_DICT_IT=="CEM01.007"){
//			       			 					_img.src = "../RootImages/CYJ.png";
//			       			 				}else if(rowD.E_DICT_IT=="CEM01.001"){
//			       			 					_img.src = "../RootImages/ZSJNew.png";
//			       			 				}else if(rowD.E_DICT_IT=="CEM01.002"){
//			       			 					_img.src = "../RootImages/CNC.png";
//			       			 				}else{
//			       			 					_img.src = "../RootImages/ZSJNew.png";
//			       			 				}
			       			 			    _img.style.padding = "15px 0 0 20px";
			       			 				_img.style.width = "75%";
			       			 				_img.style.height = "30%";
			       			 				_maindiv.appendChild(_img);
			       	    		 		
			       	    		 			//第一行
			       			 				var _diva = document.createElement("div"); 
			       			 				//_diva.style="width:100%;height:10%;text-align:left";
			       			 				_diva.style.width="100%";
			       			 				_diva.style.height="10%";
			       			 				_diva.id = "accFlag"+parseInt(i*ccId+j);
			       			 				_diva.style.textAlign="left";
			       			 				_diva.style.padding="6px 0 0 5px";
				       			 		    _diva.innerText='机器负责人：'+rowD.EMP_NM;
			       			 				_maindiv.appendChild(_diva);
			       			 				
			       			 				//第二行
			       			 				var _divb = document.createElement("div"); 
			       			 				_divb.style.width="100%";
			       			 				_divb.style.height="10%";
			       			 				_divb.id = "bccFlag"+parseInt(i*ccId+j);
			       			 				_divb.style.textAlign="left";
			       			 			    _divb.innerText = "机器状态："+rowD.DICT_IT_NM;
			       			 			    _divb.style.padding="6px 0 0 5px";
			       			 				_maindiv.appendChild(_divb);
			       			 				
			       			 				//第三行
			       			 				var _divc = document.createElement("div"); 
			       			 				_divc.style.width="100%";
			       			 				_divc.style.height="10%";
			       			 				_divc.id = "cccFlag"+parseInt(i*ccId+j);
			       			 				_divc.style.textAlign="left";
			       			 				_divc.style.padding="6px 0 0 5px";
			       			 				if(rowD.LASTTIME==null || rowD.LASTTIME=="N/A"){
			       			 					_divc.innerText = "累计工时： 0";
			       			 				}else{
			       			 					_divc.innerText = "累计工时："+rowD.LASTTIME;
			       			 				}
			       			 			    
			       			 			    _maindiv.appendChild(_divc);
			       			 			    
			       			 			   //第四行
			       			 				var _divd = document.createElement("div"); 
			       			 				_divd.style.width="100%";
			       			 				_divd.style.height="10%";
			       			 				_divd.id = "dccFlag"+parseInt(i*ccId+j);
			       			 				_divd.style.textAlign="left";
			       			 				_divd.style.padding="6px 0 0 5px";
			       			 			    //_divd.innerText = '测试:'+rowD.LASTTIME+"距保养工时："+convertTime('1',convertTime('0',rowD.LASTTIME,rowD.ET_NM),rowD.ET_NM);
			       			 			    var totalSeconds=0,timeCharFormat=0;
			       			 			    if(rowD.ET_ST == null || rowD.ET_ST ==""){
			       			 			    	totTime="0";
			       			 			    }else{
			       			 			    	totTime=rowD.ET_ST;
			       			 			    }
			       			 				if(rowD.ET_NM=='F1'){
			       			 				    totalSeconds=convertTime('0',rowD.LASTTIME,rowD.ET_NM);
			       			 				    timeCharFormat=convertTime('1',totalSeconds,rowD.ET_NM);
			       			 			    }
			       			 				else
			       			 				{
			       			 				    totalSeconds=convertTime('0',rowD.LASTTIME,rowD.ET_NM);
		       			 				        timeCharFormat=convertTime('1',totalSeconds,rowD.ET_NM);
			       			 				}
			       			 			   
		       			 			        _divd.innerText='距保养工时：'+timeCharFormat;
			       			 			    _maindiv.appendChild(_divd);
			       	    		 		}
			       	    		 		 
			       	    		     }   
			       	    		 }
		       	    		 
		       	    		 }
		       	    		 	//定时任务
			       	    		//当前页数
			       	    		var intFlag  = parseInt(parseInt(arrRow.length)/(widthCount*heightCount));
			       	    		if(parseInt(arrRow.length)%(widthCount*heightCount)==0){
			       	    			cCurrPage=intFlag;
			       	    		}else{
			       	    			cCurrPage=intFlag+1;
			       	    		}
			       	    		
			       	    		if(cCurrPage>1){
			       	    			setCCTime(heightCount,rowCount);
			       	    		}else{
			       	    			document.getElementById("c_button1").style.display='none';
			       	    		}
	                     }
	     		};
	     		iplantAjaxRequest(ajaxParam); 
		},
		addTab = function (subtitle,sbid) {
		    if (!$('#cctabs').tabs('exists', subtitle)) {
		        $('#cctabs').tabs('add', {
		            title: subtitle,
		            content: createFrame(subtitle,sbid),
		            //closable: true,
		            width: $('#mainPanle').width(),
		            height: $('#mainPanle').height()
		        });
		        $('#cctabs').tabs({
		            border: false,
		            onSelect: function (title) {
		                var pp = $("#cctabs").tabs("getSelected");
		                var tabObj = pp.panel("options").tab;    // 相应的 tab 对象
		                var iframe = $(pp.panel('options').content);
		                var src = iframe.attr('src');
//		                if (src != undefined) {
//		                    $('#tabs').tabs('update', { tab: pp, options: { content: createFrame(src) } });
//		                }
		            }
		        });
		    }
		    $('#cctabs').tabs('select', subtitle);
		},
	    createFrame = function (subtitle,sbid) {
			var s = '<iframe name="mainFrame" scrolling="no" frameborder="0" allowTransparency="true"  src="' + 'marimx.html?wlbm='+subtitle+'&sbid='+sbid + '" style="width:100%;height:99%;background-color: transparent;"></iframe>';
	        return s;
	    },
		initMachi  = function (zt){
			var ajaxParam={
     				url:'/iPlant_app',
     				dataType:'JSON',
     				data:{
     					DICT_IT:zt,
     					IFS:"J000008"
     				},
                    successCallBack:function(data){
                    	var ccList = createSourceObj(data);
                    	if(arrRow.length>0){
                    		for(var i=0; i<arrRow.length; i++){
                    			if(ccList.length>0){
                    				for(var j=0; j<ccList.length; j++){
                    					if(ccList[j].ET_CD==arrRow[i].ET_CD){
                    						//校验状态 是否不相等
//                    						if(ccList[j].DICT_IT != arrRow[i].DICT_IT){
                    							var bg="";
        				       	    		 	if(ccList[j].DICT_IT=="RDI01.01"){
        		                    				bg="bg1New";
        		                    			}else if(ccList[j].DICT_IT=="RDI01.02"){
        		                    				bg="bg4New";
        		                    			}
        		                    			else if(ccList[j].DICT_IT=="RDI01.04" || ccList[j].DICT_IT=="RDI01.09" || ccList[j].DICT_IT=="RDI01.10"){
        		                    				bg="bg2New";
        		                    			}
        		                    			else if(ccList[j].DICT_IT=="RDI01.06"){
        		                    				bg="bg5New";
        		                    			}
        		                    			else if(ccList[j].DICT_IT=="RDI01.07"){
        		                    				bg="bg6New";
        		                    			}
        		                    			else{
        		                    				bg="bg3New";
        		                    			}
        				       	    		 	
        				       	    		 	//背景状态
                    						    var mdiv = document.getElementById("ccFlag"+i);
                    						    mdiv.style.background="url(../../../common/RootImages/"+bg+".jpg)";
                    						    mdiv.style.backgroundSize = "100% 220px";
                    						    
                    						  //第一行
    			       			 				var _diva = document.getElementById("accFlag"+i); 
    			       			 				//_diva.style="width:100%;height:10%;text-align:left";
    			       			 				
    				       			 		    _diva.innerText='机器负责人：'+ccList[j].EMP_NM;
    			       			 				
    			       			 				//第二行
    			       			 				var _divb = document.getElementById("bccFlag"+i); 
    			       			 				_divb.innerText = "机器状态："+ccList[j].DICT_IT_NM;
    			       			 				
    			       			 				//第三行
    			       			 				var _divc = document.getElementById("cccFlag"+i); 
    			       			 				if(ccList[j].LASTTIME==null || ccList[j].LASTTIME=="N/A"){
    			       			 					_divc.innerText = "累计工时：0";
    			       			 				}else{
    			       			 					_divc.innerText = "累计工时："+ccList[j].LASTTIME;
    			       			 				}
    			       			 			 //第四行
    			       			 			  var _divd = document.getElementById("dccFlag"+i); 
    			       			 			  var totalSeconds=0,timeCharFormat=0;
    			       			 			  //为一级保养时间    赋值
    			       			 			  if(ccList[j].ET_ST == null || ccList[j].ET_ST ==""){
    			       			 				  totTime="0";
			       			 			      }else{
			       			 			    	  totTime=ccList[j].ET_ST;
			       			 			      }
  			       			 				  if(ccList[j].ET_NM=='F1'){
  			       			 				    totalSeconds=convertTime('0',ccList[j].LASTTIME,ccList[j].ET_NM);
  			       			 				    timeCharFormat=convertTime('1',totalSeconds,ccList[j].ET_NM);
  			       			 			      }
  			       			 				  else
  			       			 				  {
  			       			 				    totalSeconds=convertTime('0',ccList[j].LASTTIME,ccList[j].ET_NM);
			       			 				    timeCharFormat=convertTime('1',totalSeconds,ccList[j].ET_NM);
  			       			 				  }
  			       			 				  _divd.innerText='距保养工时：'+timeCharFormat;
    			       			 				//_divd.innerText='距保养工时：'+convertTime('1',convertTime('0',ccList[j].LASTTIME));
    			       			 				//_divd.innerText = "距保养工时："+convertTime('1',convertTime('0',ccList[j].LASTTIME));
    			       			 				//_divd.innerText='距保养工时：'+convertTime('1',convertTime('0',ccList[j].LASTTIME,ccList[j].ET_NM),ccList[j].ET_NM);
                    						break;
                    					}
                    				}
                    			}
                    		}
                    	}
                     }
     		};
     		iplantAjaxRequest(ajaxParam); 
		},
		setCCTime = function (heightCount,rowCount){//启动一个定时任务
			cTimer=setInterval(function  () {
  	    		 var pCount = cCurr+1;
  	    		 if(pCount%cCurrPage==0){
  	    			cCurr=parseInt(cCurrPage);
  	    		 }else{
  	    			cCurr=parseInt(pCount%cCurrPage);
  	    		 }
  	    		 //清空所有选中项
  				 for(var i=1; i<=cCurrPage; i++){
  					document.getElementById("c_button"+i).className = "c_up";
  				 }
  				 // 定时选中页
  				 document.getElementById("c_button"+cCurr).className = "c_down";
  				 //设置所有行为空
  				 for(var i=0; i<rowCount; i++){
  					document.getElementById("ccRowID"+i).style.display='none';
  				 }
  				 //显示当前页所有行
  				 for(var i=0; i<heightCount; i++){
  					 if((heightCount*(cCurr-1)+i)<rowCount)
  						 document.getElementById("ccRowID"+(heightCount*(cCurr-1)+i)).style.display='table-row';
  				 }
  				 
	   		     },10000);
		}
    }
	machineMx.prototype={
	    init:function(){
	    	 $(function(){
	    		 var zt = getQueryString("zt");
	    		 initData(zt);
	    		 var arrRow=[];
	    		 var t=setInterval(function  () {
	    			 initMachi(zt);
	   		     },10000); 
	    	  
	         });
        }
   }
	var cCurr=1;//当前页
	var cCurrPage = 0;//总共页数
	var rowCount=0;//总行数
	var cTimer;//定时器
	var bc = new machineMx();
    bc.init();
})();