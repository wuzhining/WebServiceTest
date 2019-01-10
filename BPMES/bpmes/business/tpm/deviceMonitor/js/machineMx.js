(function(){
	function machineMx(){
		initData = function(zt){
			console.log(cCurr);
			 var ajaxParam={
	     				url:'/iPlant_ajax',
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
		        	    	 var heightCount = parseInt((document.body.clientHeight)/200);
		        	    	 var TCount = 0;
	                     	 //初始化 table
	                     	 var _row;   
		       	    		 var _cell;   
		       	    		//var ccId = getQueryString("ccId");
		       	    		 var ccId = parseInt((document.body.clientWidth)/190);
		       	    		 //获取展示行
		       	    		 rowCount = parseInt((arrRow.length)/parseInt(ccId));
		       	    		 TCount= rowCount;
		       	    		 //获取多余列
		       	    		 var yCount=(arrRow.length)%parseInt(ccId);
		       	    		 if(yCount>0){
		       	    			rowCount=rowCount+1;
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
        	    			 }
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
			        	    			 _input.className = "c_up";
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
			        	    		 //从第一个开始
			        	    		 document.getElementById("c_button1").className = "c_down";
			        	    	 }
			        	    	 document.getElementById("zfaxxGrid").style.height=190*heightCount+10*(parseInt(heightCount)+1)+"px";
//			        	    	 document.getElementById("zfaxxGrid").style.height="px";
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
			       	    		 			_cell.style.height="190px"; 
				       	    		   	    _row.appendChild(_cell);
			       	    		 		}else{
			       	    		 		_cell = document.createElement("td");  
			       	    		 		_cell.style.width=100/parseInt(ccId)+"%"; 
					       	    		_row.appendChild(_cell);
			       	    		 		var rowD ={};
			       	    		 		rowD = arrRow[i*ccId+j];	
			       	    		 		//加载div
			       	    		 		var _maindiv = document.createElement("div"); 
			       	    		 		var bg = "bg1";
			       	    		 		
				       	    		 	if(rowD.DICT_IT=="RDI01.01"){
		                    				bg="bg1";
		                    			}else if(rowD.DICT_IT=="RDI01.02"){
		                    				bg="bg4";
		                    			}
		                    			else if(rowD.DICT_IT=="RDI01.04"){
		                    				bg="bg2";
		                    			}
		                    			else if(rowD.DICT_IT=="RDI01.06"){
		                    				bg="bg5";
		                    			}
		                    			else if(rowD.DICT_IT=="RDI01.07"){
		                    				bg="bg6";
		                    			}
		                    			else{
		                    				bg="bg3";
		                    			}
				       	    		 	//_maindiv.style="width:120;height:190px;background:url(js/"+bg+".jpg);background-size:100% 190px;text-align:left;";
				       	    		 	_maindiv.style.width="180px";
				       	    		 	_maindiv.style.height="190px";
				       	    		 	_maindiv.style.background="url(../../../common/RootImages/"+bg+".jpg)";
				       	    		 	_maindiv.style.backgroundSize = "100% 190px";
				       	    		 	_maindiv.style.textAlign = "left";
				       	    		 	_maindiv.id = "ccFlag"+parseInt(i*ccId+j);
				       	    		 	
				       	    		 	_maindiv.ondblclick = function clickImg(){
					       	    		 	var allTabs = $("#cctabs").tabs('tabs');
						       	    		 for(var i = 0, len = allTabs.length; i < len; i++) {
						       	    			 //因为tabs删除之后会重新对其元素进行排序，所以在删除方法时候只需要进行删除1即可(因为我想保留第一个元素，如果不想保留就改成0即可)
						       	    			 $("#cctabs").tabs('close', 0);
						       	    		}
				       	    		 		var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
				       	    		 	$('#enditTab').dialog({    
			       	    		 			title: '详细信息',       
			       	    		 			closed: false,    
			       	    		 			cache: false,    
			       	    		 			top:scrollTop+50 
			       	    		 		});
				       	    		 	var mainId = this.id;
				       	    		 	var iTemp = mainId.split("ccFlag")[1];
				       	    		 	var ccRow = {};
				       	    		 	ccrow = arrRow[iTemp];
				       	    		 	$("#txtWLBM").text(ccrow.ET_NM);
				       	    		 	if(ccrow.DO_CD !=null){
				       	    		 		$("#txtJQBH").text(ccrow.DO_CD);
				       	    		 	}else{
				       	    		 		$("#txtJQBH").text("");
				       	    		 	}
	    		    					
	    		    					$("#txtSCCS").text("");
	    		    					$("#txtJQZT").text("");
	    		    					$("#txtSCKSSJ").text("");
	    		    					$("#txtJDSJ").text("");
	    		    					$("#txtYCKSSJ").text("");
				       	    		 	iplantAjaxRequest( {
				    		    			url: '/iPlant_ajax',
				    		    			data: {IFS:'J000001',
				    		    				ET_CD:ccrow.ET_CD,
				    		    				DICT_IT:ccrow.DICT_IT,
				    		    				pageIndex: 1,
				    		    				pageSize:9999
				    		    				},
				    		    			successCallBack: function (data) {
//				    		    				var ccArr = new Array();
				    		    				var ccArr = createSourceObj(data);
//				    		    				for(i=0; i<ccData.length;i++){
//				    		    					if(ccData[i].ET_CD==ccrow.ET_CD){
//				    		    						ccArr.push(ccData[i]);
//				    		    					}
//				    		    				}
				    		    				if(ccArr.length>0){
				    		    					//设置值
				    		    					
				    		    					$("#txtSCCS").text(ccArr[0].PD_TT);
				    		    					
				    		    					if(ccArr[0].DICT_IT_NM != null)
				    		    						$("#txtJQZT").text(ccArr[0].DICT_IT_NM);
				    		    					//设置背景色
				    		    					if(ccArr[0].DICT_IT=="RDI01.01"){//正常
				    		    						document.getElementById("txtJQZT").style.backgroundColor="#37B42A";
					                    			}else if(ccArr[0].DICT_IT=="RDI01.02"){//待机空闲
					                    				document.getElementById("txtJQZT").style.backgroundColor="#FF8416";
					                    			}
					                    			else if(ccArr[0].DICT_IT=="RDI01.04"){//挺急
					                    				document.getElementById("txtJQZT").style.backgroundColor="#E54E12";
					                    			}
					                    			else if(ccArr[0].DICT_IT=="RDI01.06"){//计划停机
					                    				document.getElementById("txtJQZT").style.backgroundColor="#0FAEE2";
					                    			}
					                    			else if(ccArr[0].DICT_IT=="RDI01.07"){//通讯失败
					                    				document.getElementById("txtJQZT").style.backgroundColor="#B3B3B3";
					                    			}else{//异常
					                    				document.getElementById("txtJQZT").style.backgroundColor="#E5C012";
					                    			}
				    		    					if(ccArr[0].P_BGN_DATE!=null)
				    		    						$("#txtSCKSSJ").text(ccArr[0].P_BGN_DATE);
				    		    					if(ccArr[0].PD_AT !=null && ccArr[0].PD_AT !=null)
				    		    						$("#txtJDSJ").text(ccArr[0].PD_AT);
				    		    					else
				    		    						$("#txtJDSJ").text("");
				    		    					var row = document.getElementById("ccycsj");
				    		    					if(ccArr[0].DICT_IT=="RDI01.01"){
				    		    						row.style.display = "none";  
					                    			}else{
					                    				row.style.display = "table-row" ;
					                    				if(ccArr[0].CL_BGN_DATE !=null)
					                    					$("#txtYCKSSJ").text(ccArr[0].CL_BGN_DATE);
					                    				else
					                    					$("#txtYCKSSJ").text("");
					                    			}
				    		    					
				    		    					for(var i=0; i<ccArr.length; i++){
				    		    						addTab(ccArr[i].PT_CD,ccArr[i].ET_CD);
				    		    					}
				    		    				}
				    		    			}
				    		    		});
				       	    		 		
//				       	    		 		var x=document.getElementById('cctable').createCaption();
//				       	    		 		x.innerHTML="My table caption";
//				       	    		 		x.align="left";
				       	    		 	};
				       	    		 	_cell.appendChild(_maindiv);
			       	    		 		//添加div 下子内容
			       	    		 			var _div = document.createElement("div"); 
			       			 				_div.align= "left";
			       			 				//_div.style="width:100%;height:15%;text-align:left;line-height:25px;";
			       			 				_div.style.width="100%";
			       			 				_div.style.height="15.5%";
			       			 				_div.style.textAlign="left";
			       			 				_div.style.lineHeight="25px";
			       			 				_div.style.padding="0 0 0 5px";
			       			 				_div.innerText = " 设备编号："+rowD.ET_NM;
			       			 				_maindiv.appendChild(_div);
			       			 				//添加图片 div子内容
			       			 				_img =  document.createElement("img");
			       			 				if(rowD.ET_PL != null && rowD.ET_PL !=""){
			       			 					_img.src = "../../../common/RootImages/"+rowD.ET_PL;
			       			 				}else{
			       			 					_img.src = "../../../common/RootImages/ZSJ.png";
			       			 				}
			       			 				_img.style.width = "100%";
			       			 				_img.style.height = "38%";
			       			 				_maindiv.appendChild(_img);
			       	    		 		
			       	    		 			//添加div 下子内容
			       			 				var _diva = document.createElement("div"); 
			       			 				//_diva.style="width:100%;height:15%;text-align:left";
			       			 				_diva.style.width="100%";
			       			 				_diva.style.height="15.5%";
			       			 				_diva.style.lineHeight="25px";
			       			 				_diva.id = "accFlag"+parseInt(i*ccId+j);
			       			 				_diva.style.textAlign="left";
			       			 				_diva.style.padding="0 0 0 5px";
			       			 				if(rowD.DO_CD !=null){
			       			 					_diva.innerText ="派工单号："+rowD.DO_CD;
			       			 				}else{
			       			 					_diva.innerText ="派工单号：";
			       			 				}
			       			 				
			       			 				_maindiv.appendChild(_diva);
			       			 				
			       			 				//添加div 下子内容  background:#89cff0;
			       			 				var _divb = document.createElement("div"); 
			       			 				//_divb.style="width:100%;height:15%;text-align:left";
			       			 				_divb.style.width="100%";
			       			 				_divb.style.height="15.5%";
			       			 				_divb.style.lineHeight="25px";
			       			 				_divb.id = "bccFlag"+parseInt(i*ccId+j);
			       			 				_divb.style.textAlign="left";
			       			 				//DICT_IT:"RDI01.01" 正常生产
			                    			if(rowD.DICT_IT=="RDI01.01"){
			                    				_divb.innerText = "生产数量："+rowD.PD_TT_NUM;
			                    			}
			                    			//待机空闲
			                    			else if(rowD.DICT_IT=="RDI01.02"){
			                    				_divb.innerText = "异常原因：待机空闲";
			                    			}
			                    			//停机在生产
			                    			else if(rowD.DICT_IT=="RDI01.03"){
//			                    				if(rowD.CL_NM !=null){
//			                    					_divb.innerText = "异常原因："+rowD.CL_NM;
//			                    				}else{
			                    					_divb.innerText = "异常原因：停机在生产";
//			                    				}
			                    				
			                    			}
			                    			//停机
			                    			else if(rowD.DICT_IT=="RDI01.04"){
			                    				if(rowD.CL_NM !=null){
			                    					_divb.innerText = "停机原因："+rowD.CL_NM;
			                    				}else{
			                    					_divb.innerText = "停机原因：";
			                    				}
			                    			}
			                    			//计划停机
			                    			else if(rowD.DICT_IT=="RDI01.06"){
			                    				if(rowD.CL_NM !=null){
			                    					_divb.innerText = "停机原因："+rowD.CL_NM;
			                    				}else{
			                    					_divb.innerText = "停机原因：";
			                    				}
			                    			}
			                    			// 异常生产
			                    			else if(rowD.DICT_IT=="RDI01.05"){
			                    				_divb.innerText = "异常原因：异常生产";
//			                    				if(rowD.CL_NM !=null){
//			                    					_divb.innerText = "异常原因："+rowD.CL_NM;
//			                    				}else{
//			                    					_divb.innerText = "异常原因：";
//			                    				}
			                    			}
			                    			//通信失败
			                    			else if(rowD.DICT_IT=="RDI01.07"){
			                    				_divb.innerText = "异常原因：通讯失败";
			                    			}
			                    			//无派单生产
			                    			else if(rowD.DICT_IT=="RDI01.08"){
			                    				_divb.innerText = "异常原因：无派单生产";
//			                    				if(rowD.CL_NM !=null){
//			                    					_divb.innerText = "异常原因："+rowD.CL_NM;
//			                    				}else{
//			                    					_divb.innerText = "异常原因：";
//			                    				}
			                    			}else{
			                    				_divb.innerText = "异常原因：待机空闲";
			                    			}
			       			 				_divb.style.padding="0 0 0 5px";
			       			 				_maindiv.appendChild(_divb);
			       			 				
			       			 				//添加div 下子内容
			       			 				var _divc = document.createElement("div"); 
			       			 				//_divc.style="width:100%;height:15%;text-align:left";
			       			 				_divc.style.width="100%";
			       			 				_divc.style.height="15.5%";
			       			 				_divc.style.lineHeight="25px";
			       			 				_divc.id = "cccFlag"+parseInt(i*ccId+j);
			       			 				_divc.style.textAlign="left";
			       			 				_divc.style.padding="0 0 0 5px";
			       			 				//正常生产
				       			 			if(rowD.DICT_IT=="RDI01.01"){
			                    				_divc.innerText = "稼动时长："+rowD.PD_AT;
			                    			}
			                    			//待机空闲
			                    			else if(rowD.DICT_IT=="RDI01.02"){
			                    				if(rowD.LASTTIME==null){
			                    					_divc.innerText = "异常时长：";
			                    				}else{
			                    					_divc.innerText = "异常时长："+rowD.LASTTIME;
			                    				}
			                    			}
			                    			//停机在生产
			                    			else if(rowD.DICT_IT=="RDI01.03"){
			                    				if(rowD.LASTTIME==null){
			                    					_divc.innerText = "异常时长：";
			                    				}else{
			                    					_divc.innerText = "异常时长："+rowD.LASTTIME;
			                    				}
			                    			}
			                    			//停机
			                    			else if(rowD.DICT_IT=="RDI01.04"){
			                    				if(rowD.LASTTIME==null){
			                    					_divc.innerText = "停机时长：";
			                    				}else{
			                    					_divc.innerText = "停机时长："+rowD.LASTTIME;
			                    				}
			                    			}
			                    			//计划停机
			                    			else if(rowD.DICT_IT=="RDI01.06"){
			                    				if(rowD.LASTTIME==null){
			                    					_divc.innerText = "停机时长：";
			                    				}else{
			                    					_divc.innerText = "停机时长："+rowD.LASTTIME;
			                    				}
			                    			}
			                    			//异常生产
			                    			else if(rowD.DICT_IT=="RDI01.05"){
			                    				if(rowD.LASTTIME==null){
			                    					_divc.innerText = "异常时长：";
			                    				}else{
			                    					_divc.innerText = "异常时长："+rowD.LASTTIME;
			                    				}
			                    			}
			                    			//通信失败
			                    			else if(rowD.DICT_IT=="RDI01.07"){
//			                    				if(rowD.CL_WT==null){
			                    					_divc.innerText = "";
//			                    				}else{
//			                    					_divc.innerText = "时长："+rowD.CL_WT;
//			                    				}
			                    			}
			                    			//无派单生产
			                    			else if(rowD.DICT_IT=="RDI01.08"){
			                    				if(rowD.LASTTIME==null){
			                    					_divc.innerText = "异常时长：";
			                    				}else{
			                    					_divc.innerText = "异常时长："+rowD.LASTTIME;
			                    				}
			                    			}else{
			                    				_divc.innerText = "异常时长：";
			                    			}
			       			 				_maindiv.appendChild(_divc);
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
//			       	    		cTimer=setInterval(function  () {
//			       	    		 var pCount = cCurr+1;
//			       	    		 if(pCount%cCurrPage==0){
//			       	    			cCurr=parseInt(cCurrPage);
//			       	    		 }else{
//			       	    			cCurr=parseInt(pCount%cCurrPage);
//			       	    		 }
//			       	    		 //清空所有选中项
//		   	    				 for(var i=1; i<=cCurrPage; i++){
//		   	    					document.getElementById("c_button"+i).className = "c_up";
//		   	    				 }
//		   	    				 // 定时选中页
//		   	    				 document.getElementById("c_button"+cCurr).className = "c_down";
//		   	    				 //设置所有行为空
//		   	    				 for(var i=0; i<rowCount; i++){
//		   	    					document.getElementById("ccRowID"+i).style.display='none';
//		   	    				 }
//		   	    				 //显示当前页所有行
//		   	    				 for(var i=0; i<heightCount; i++){
//		   	    					 if((heightCount*(cCurr-1)+i)<rowCount-1)
//		   	    						 document.getElementById("ccRowID"+(heightCount*(cCurr-1)+i)).style.display='table-row';
//		   	    				 }
//		   	    				 
//			   	   		     },5000);
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
     				url:'/iPlant_ajax',
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
        		                    				bg="bg1";
        		                    			}else if(ccList[j].DICT_IT=="RDI01.02"){
        		                    				bg="bg4";
        		                    			}
        		                    			else if(ccList[j].DICT_IT=="RDI01.04"){
        		                    				bg="bg2";
        		                    			}
        		                    			else if(ccList[j].DICT_IT=="RDI01.06"){
        		                    				bg="bg5";
        		                    			}
        		                    			else if(ccList[j].DICT_IT=="RDI01.07"){
        		                    				bg="bg6";
        		                    			}
        		                    			else{
        		                    				bg="bg3";
        		                    			}
        				       	    		 	
        				       	    		 	//背景状态
                    						    var mdiv = document.getElementById("ccFlag"+i);
                    						    if(mdiv){
                    						    	mdiv.style.background="url(../../../common/RootImages/"+bg+".jpg)";
                        						    mdiv.style.backgroundSize = "100% 190px";
                        					    }
                    						    //工单
                    						    var adiv = document.getElementById("accFlag"+i);
                    						    if(adiv){
                    						    	if(ccList[j].DO_CD !=null ){
                        						    	adiv.innerHTML = "派工单号："+ccList[j].DO_CD;
                        						    }else{
                        						    	adiv.innerHTML = "派工单号：";
                        						    }
                        						    	
                    						    }
                    						    /***********异常原因********************/
                    						    var bdiv = document.getElementById("bccFlag"+i);
                    						    if(bdiv){
                    						    	var str = "";
                        							//DICT_IT:"RDI01.01" 正常生产
        			                    			if(ccList[j].DICT_IT=="RDI01.01"){
        			                    				str = "生产数量："+ccList[j].PD_TT_NUM;
        			                    			}
        			                    			//待机空闲
        			                    			else if(ccList[j].DICT_IT=="RDI01.02"){
        			                    				str = "异常原因：待机空闲";
        			                    			}
        			                    			//停机在生产
        			                    			else if(ccList[j].DICT_IT=="RDI01.03"){
        			                    				str = "异常原因：停机在生产"
//        			                    				if(ccList[j].CL_NM !=null){
//        			                    					str = "异常原因："+ccList[j].CL_NM;
//        			                    				}
//        			                    				else{
//        			                    					str = "异常原因："
//        			                    				}
        			                    			}
        			                    			//停机
        			                    			else if(ccList[j].DICT_IT=="RDI01.04"){
        			                    				if(ccList[j].CL_NM !=null){
        			                    					str = "停机原因："+ccList[j].CL_NM;
        			                    				}
        			                    				else{
        			                    					str = "停机原因："
        			                    				}
        			                    			}
        			                    			//计划停机
        			                    			else if(ccList[j].DICT_IT=="RDI01.06"){
        			                    				if(ccList[j].CL_NM !=null){
        			                    					str = "停机原因："+ccList[j].CL_NM;
        			                    				}
        			                    				else{
        			                    					str = "停机原因："
        			                    				}
        			                    			}
        			                    			// 异常生产
        			                    			else if(ccList[j].DICT_IT=="RDI01.05"){
        			                    				str = "异常原因：异常生产"
        			                    				/*if(ccList[j].CL_NM !=null){
        			                    					str = "异常原因："+ccList[j].CL_NM;
        			                    				}
        			                    				else{
        			                    					str = "异常原因："
        			                    				}*/
        			                    			}
        			                    			//通信失败
        			                    			else if(ccList[j].DICT_IT=="RDI01.07"){
        			                    				str= "异常原因：通讯失败";
        			                    			}
        			                    			//无派单生产
        			                    			else if(ccList[j].DICT_IT=="RDI01.08"){
        			                    				str = "异常原因：无派单生产"
//        			                    				if(ccList[j].CL_NM !=null){
//        			                    					str = "异常原因："+ccList[j].CL_NM;
//        			                    				}
//        			                    				else{
//        			                    					str = "异常原因："
//        			                    				}
        			                    			}else{
        			                    				str = "异常原因：待机空闲";
        			                    			}
                        						    bdiv.innerHTML = str;
                    						    }
                    							
                    						    
                    						    /***************时长****************/
                    						    var cdiv = document.getElementById("cccFlag"+i);
    				       			 			//正常生产
                    						    if(cdiv){
                    						    	if(ccList[j].DICT_IT=="RDI01.01"){
        			                    				cdiv.innerText = "稼动时长："+ccList[j].PD_AT;
        			                    			}
        			                    			//待机空闲
        			                    			else if(ccList[j].DICT_IT=="RDI01.02"){
        			                    				if(ccList[j].LASTTIME==null){
        			                    					cdiv.innerText = "异常时长：";
        			                    				}else{
        			                    					cdiv.innerText = "异常时长："+ccList[j].LASTTIME;
        			                    				}
        			                    			}
        			                    			//停机在生产
        			                    			else if(ccList[j].DICT_IT=="RDI01.03"){
        			                    				if(ccList[j].LASTTIME==null){
        			                    					cdiv.innerText = "异常时长：";
        			                    				}else{
        			                    					cdiv.innerText = "异常时长："+ccList[j].LASTTIME;
        			                    				}
        			                    			}
        			                    			//停机
        			                    			else if(ccList[j].DICT_IT=="RDI01.04"){
        			                    				if(ccList[j].LASTTIME==null){
        			                    					cdiv.innerText = "停机时长：";
        			                    				}else{
        			                    					cdiv.innerText = "停机时长："+ccList[j].LASTTIME;
        			                    				}
        			                    			}
        			                    			//计划停机
        			                    			else if(ccList[j].DICT_IT=="RDI01.06"){
        			                    				if(ccList[j].LASTTIME==null){
        			                    					cdiv.innerText = "停机时长：";
        			                    				}else{
        			                    					cdiv.innerText = "停机时长："+ccList[j].LASTTIME;
        			                    				}
        			                    			}
        			                    			//异常生产
        			                    			else if(ccList[j].DICT_IT=="RDI01.05"){
        			                    				if(ccList[j].LASTTIME==null){
        			                    					cdiv.innerText = "异常时长：";
        			                    				}else{
        			                    					cdiv.innerText = "异常时长："+ccList[j].LASTTIME;
        			                    				}
        			                    			}
        			                    			//通信失败
        			                    			else if(ccList[j].DICT_IT=="RDI01.07"){
//        			                    				if(ccList[j].CL_WT==null){
        			                    					cdiv.innerText = "";
//        			                    				}else{
//        			                    					cdiv.innerText = "时长："+ccList[j].CL_WT;
//        			                    				}
        			                    			}
        			                    			//无派单生产
        			                    			else if(ccList[j].DICT_IT=="RDI01.08"){
        			                    				if(ccList[j].LASTTIME==null){
        			                    					cdiv.innerText = "异常时长：";
        			                    				}else{
        			                    					cdiv.innerText = "异常时长："+ccList[j].LASTTIME;
        			                    				}
        			                    			}else{
        			                    				cdiv.innerText = "异常时长：";
        			                    			}
                    						    }
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
  				 
	   		     },5000);
		}
    }
	machineMx.prototype={
	    init:function(){
	    	 $(function(){
	    		 var zt = "";//getQueryString("zt");
	    		 initData(zt);
	    		 var t=setInterval(function  () {
	    			 initMachi(zt);
	   		     },10000); 
	    	  
	         });
        }
   }
	var bc = new machineMx();
	var cCurr=1;//当前页
	var cCurrPage = 0;//总共页数
	var rowCount=0;//总行数
	var cTimer;//定时器
	var arrRow=[];//所有机器
    bc.init();
})();