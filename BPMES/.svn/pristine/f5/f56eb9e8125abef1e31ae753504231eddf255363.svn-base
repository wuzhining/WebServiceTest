/* 启动时加载 */
/*
 */
(function() {
	function MatterFile() {
		getSelectedCondtion = function() {
			// 维修单号
			iplantAjaxRequest({
				url : '/iPlant_ajax',
				data : {
					IFS : 'T000073'
				},
				successCallBack : function(data) {
					var array = new Array();
					array.push({
						"id" : "",
						"text" : "全部"
					});
					var rowCollection = createSourceObj(data);
					for (var i = 0; i < rowCollection.length; i++) {
						array.push({
							"id" : rowCollection[i].ITEM_CD,
							"text" : rowCollection[i].ITEM_NM
						});
						dataPi.push({
							"id" : rowCollection[i].ITEM_CD,
							"text" : rowCollection[i].ITEM_NM
						});
					}

					// 查询
					$('#cxMatterNO').combobox({
						data : array,
						valueField : 'id',
						textField : 'text'
					});
				}
			});
		}
		var fileName="",fileType="",filePath="",isExist = false,fileNameArray='';
		initGridData = function() {
			fileName="",
			fileType="",
			filePath="";
			var dgrid = $('#MatterFileinfo_tab').datagrid('options');
			if(!dgrid) return;
				
			var reqData = {
					IFS: 'T000074',
					MT_SN: $("#cxMatterNO").combobox("getValue"),
					MT_VM: $("#cxVersionNum").textbox("getValue"),
					pageIndex: 1,
					pageSize: dgrid.pageSize
				}
				reqGridData('/iPlant_ajax', 'MatterFileinfo_tab', reqData);
			},
			bindGridData = function(reqData, jsonData) {
				var grid = {
					name: 'MatterFileinfo_tab',
					dataType: 'json',
					columns: [
						[
						 {field: 'MT_SN',title: '物料编号',width: 100,align: 'center'}, 
						 {field: 'MT_NM',title: '物料名称',width: 160,align: 'center'}, 
						 {field: 'MT_VN',title: '版本号',width: 100,align: 'center'}, 
						 {field: 'FI_TP',title: '文件类型',width: 100,align: 'center'},
						 {field: 'OD_FM',title: '旧文件名',width: 300,align: 'center'}, 
						 {field: 'FI_SZ',title: '文件大小',width: 100,align: 'center'}, 
						 {field: 'SF_NM',title: '保存文件名',width: 300,align: 'center'}, 
						 {field: 'FI_PH',title: '文件保存路径',width: 400,align: 'center'}, 
						 {field: 'FI_RM',title: '备注',width: 300,align: 'center'}
				      ]],
					onDblClickRow: function(index,row){
						if(row) {
							CompanyOpttype = 1;
							$("#editTab").dialog("open").dialog('setTitle', '修改物料档案信息');
				            $('#txtVersionNum').textbox('textbox').attr('readonly',true);
				            $('#txtVersionNum').textbox('textbox').attr('disabled',true);
				            $('#txtMatterNO').combobox('textbox').attr('readonly',true);
				            $('#txtMatterNO').combobox('textbox').attr('disabled',true);
							$('#txtVersionNum').textbox('setValue', row.MT_VN);
							$('#txtMatterNO').combobox('setValue', row.MT_SN);
							$('#txtFileType').combobox('setValue', row.FI_TP);
							$('#txtReMarkS').textbox('setValue', row.FI_RM);
							$('#showFileName').html(row.SF_NM);
							$("#showFileName").attr("title",row.SF_NM); 
//							console.log($("#showFileName").attr("title",row.SF_NM));
							var file = document.getElementById('txtFJ');
							var img = document.getElementById('imgPicture');
							img.src = filterUrlPath(row.FILE_SAVE_PATH);
							var grid = $('#MatterFileinfo_tab');
			            	grid.datagrid('clearSelections');   
							grid.datagrid('selectRow',index);
						}
					}
				}
				initGridView(reqData, grid);
				$('#MatterFileinfo_tab').datagrid('loadData', jsonData);
		},
		getRootPath_dc = function() {
            var pathName = window.location.pathname.substring(1);
            var webName = pathName == '' ? '' : pathName.substring(0, pathName.indexOf('/'));
            if (webName == "") {
                return window.location.protocol + '//' + window.location.host;
            }
            else {
                return window.location.protocol + '//' + window.location.host + '/' + webName;
            }
        },
        fomateUrl = function (url){
        	var str = url.replace(/\\/g,"\/");
        	var strArr  = str.split('upload');
        	var imagePathURL= getRootPath_dc()+ "/upload"+strArr[1] ;
        	return imagePathURL;
        }
        downLoadImage =function(url){
        	var oPop = window.open(url,"","width=1, height=1, top=5000, left=5000"); 
        	for(; oPop.document.readyState != "complete"; ) 
        	{ 
        	if (oPop.document.readyState == "complete")break; 
        	} 
        	oPop.document.execCommand("saveAs"); 
        	oPop.close(); 
        },
		/*清空表单*/
		setDataNull = function () {
            $('#txtVersionNum').textbox('setValue','');
            $("#txtMatterNO").combobox('select', '');
            $('#txtReMarkS').textbox('setValue','');
            $('#showFileName').html('');
		},
          /*保存前的验证操作*/
        checkDataValid = function() {
         	 var target = true,
         	 a = $("#txtPRODUCTMODEL").val(),
         	 b = $("#txtPRODUCTSERIES").val(),
         	 c = $("input[name='PRODUCTATTRIBUTES']:checked").val(),
         	 d = $("input[name='FOREXPORT']:checked").val(),
         	 //e = $('#txtPICTURE').val();
         	 e = $('#showFileName').text();
         	 if ("" == a || "" == b ) {
         		$.messager.alert("提示", "请添加必选信息")
             	target=false;
         	 }else{
	         	 if("" == c ){
	         		$.messager.alert('提示', '请选择产品属性');
	         		target=false;
	         	 }
	         	 if("" == d ){
	         		$.messager.alert('提示', '请选择外销');
	         		target=false;
	         	 }
	         	if("" == e ){
	         		$.messager.alert('提示', '请选择图片文件');
	         		target=false;
	         	 }
         	}
         	return target;
        },
         /*验证是否重复*/
         existProduct=function(sn,vn){
// 			var rowNum;
// 			if(CompanyOpttype==0){
// 				if(product!=undefined && product!='' && product!=null){
// 					if(tpm.textbox('getValue')!=undefined && tpm.textbox('getValue')!='' && tpm.textbox('getValue')!=null){
 	 	    		var ajaxParam = {
 	 	    				url: '/iPlant_ajax',
 	 	    				dataType: 'JSON',
 	 	    				async: false,
 	 	    				data: {
 	 	                       	IFS: 'T000074',
 	 	                       	MT_VN:vn,
 	 	                       	MT_SN:sn,
 	 	  					 	pageIndex: 1,
 	 	  					 	pageSize: $('#MatterFileinfo_tab').pageSize
 	 	    				},
 	 	    				successCallBack:function(data){
 	 	    					var rowNum = parseInt(data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS);
 	 	                   	 	if(rowNum>0){
 	 	                   			$.messager.alert('提示', '您的录入信息相同,请重新输入!');
 	 	                   			$('#txtVersionNum').textbox('setValue','');
 	 	                   			$("#txtMatterNO").combobox('select', '');
 	 	                   			isExist=false;
 	 	                   	 	}else{
 	 	                   	 		isExist=true;
 	 	                   	 	}
 	 	                   	}
 	 	    			};
 	 	               	iplantAjaxRequest(ajaxParam);
// 	 	    	 }
// 			}
         },
		/* 查询信息 */
		searchProductInformation=function() {
			var a = $('#MatterFileinfo_tab'),
			b = $("#cxMatterNO").combobox("getValue"),
            c = $("#cxVersionNum").textbox("getValue"),
            e = {
				MT_SN: b,
				MT_VN: c,
				IFS: "T000074",
                pageIndex: 1,
                pageSize: a.pageSize                
            };
            reqGridData("/iPlant_ajax", "MatterFileinfo_tab", e)
		},
		validSelectedData = function (gridName,type) {
            var checkedItems = $('#' + 'MatterFileinfo_tab').datagrid('getSelections');
            var num = 0;
            $.each(checkedItems, function (index, item) {
               num++;
            });
            if (type == 'Update') {
                if (num != 1) {
                    return false;
                }
            }
            else {
                if (num <= 0) {
                    return false;
                }
            }
            return true;
        },
        /*删除操作*/
		deleteConfig = function () {
            var isSelectedData = validSelectedData('MatterFileinfo_tab', 'Delete');
            if (!isSelectedData) {
                $.messager.alert('提示', '请选择一条数据进行删除');
                return;
            }
            var checkedItems = $('#MatterFileinfo_tab').datagrid('getSelections');
            //确认提示框
            var delCnt=0;
            $.messager.confirm('确认框', '您确定要删除您所选择的数据?', function (r) {
           	 if(r==true){
           		 $.each(checkedItems, function (index, item) {
           			 delCnt++;
                   	 var ajaxParam = {
                            url: '/iPlant_ajax',
                            dataType: 'JSON',
                            data: {
                                IFS: 'T000077',
                                CD: item.CD,
                            },
                            successCallBack:function(){
                           	 if(delCnt==checkedItems.length){
                           	    initGridData();
                           	 }
                           }
                        };
                        iplantAjaxRequest(ajaxParam);
                    });
           	 	}
            });      
       },
       /*显示图片*/
       showPic = function (){
    	   var img = document.getElementById('imgPicture'),pic = document.getElementById('txtFJ'),file,strSrc;
    	   var pic = $('input[type="file"]')[0];
    	   getPicPath(img,pic,img);
    	   var trHTML = "<tr><td>文件名:</td>";
    	   var tdHtml='';
    	   var m=pic.files.length;
    	   var index=0;
    	   if(m>0){
    		   for(var i=0;i<m;i++){
    			   file = pic.files[index],fileName = file.name,fileType=file.type,filePath=file.path;
        		   var temp = [];
        		   if(fileName.indexOf('.')>0){
        			   temp=fileName.split('.');
        			   strSrc = temp[temp.length-1];
        			   if(strSrc.localeCompare('jpg')===0 || strSrc.localeCompare('jpeg') === 0 || strSrc.localeCompare('gif') === 0 
        					   || strSrc.localeCompare('png') === 0 || strSrc.localeCompare('pdf') === 0 || strSrc.localeCompare('xlsx') === 0)
        			   {
        				   fileNameArray+=';'+fileName;
        				   if(m<6){
        					   if(i==pic.files.length-1 && i<5){
            					   tdHtml+="<td colspan='"+(5-m+1)+"'>"+fileName+";</td></tr>"
            				   }
            				   else
            				   {
            					   tdHtml+="<td>"+fileName+";</td>";   
            				   }   
        				   }
        				   else
        				   {
        					      tdHtml+="<tr>";
        					      i=0;
        					      m=5;
        				   }
        				   
        			   }
        		   }
        		   index++;
    		   }
    		   trHTML+=tdHtml+"";
    		   $("#txtFileTable").append(trHTML);
    		   fileNameArray=fileNameArray.substring(1);
    		   $('#showFileName').html(fileNameArray);
    	   }
       },
       /* 修改设备档案信息 */
       updateStation = function() {
			var checkedItems = $('#MatterFileinfo_tab').datagrid('getSelections');
			var moveIds = [];
			var num = 0;
			$.each(checkedItems, function(index, item) {
				moveIds.push(item.moveid);
				num++;
			});
			if(num != 1) {
				$.messager.alert('提示', '请选择一条数据进行修改');
				return false;
			}
			var row = $("#MatterFileinfo_tab").datagrid("getSelected");
			$("#txtMatterNO").combobox("loadData", dataPi);
			if(row) {
				CompanyOpttype = 1;
				$("#editTab").dialog("open").dialog('setTitle', '修改设备档案信息');
	            $('#txtVersionNum').textbox('textbox').attr('readonly',true);
	            $('#txtVersionNum').textbox('textbox').attr('disabled',true);
	            $('#txtMatterNO').combobox('textbox').attr('readonly',true);
	            $('#txtMatterNO').combobox('textbox').attr('disabled',true);
				$('#txtVersionNum').textbox('setValue', row.MT_VN);
				$('#txtMatterNO').combobox('setValue', row.MT_SN);
				$('#txtFileType').combobox('setValue', row.FI_TP);
				$('#txtOldFileNum').textbox('setValue', row.OD_FM);
				$('#txtFileSize').textbox('setValue', row.FI_SZ);
				$('#txtSaveFile').textbox('setValue', row.SF_NM);
				$('#txtFilePath').textbox('setValue', row.FI_PH);
				$('#txtReMarkS').textbox('setValue', row.FI_RM);
				$('#showFileName').html(row.SF_NM);
	    		$("#showFileName").attr("title",row.SF_NM);			    							
	    		var file = document.getElementById('txtFJ');
				var img = document.getElementById('imgPicture');
				img.src = filterUrlPath(row.FILE_SAVE_PATH);
				grid.datagrid('clearSelections'), 
				grid.datagrid('selectRow',index);
			}
		},
		/*是否修改变更的验证*/
		saveUpdateValidate=function(){
			var checkedItems = $('#MatterFileinfo_tab').datagrid('getSelections'),row = checkedItems[0];
			//var FileName = document.getElementById('showFileName');
			//var file = document.getElementById('txtFJ');
			if(row.CD){
				if(
				$('#txtVersionNum').textbox('getValue')!=row.MT_VN ||
				$('#txtMatterNO').combobox('getValue')!=row.MT_SN ||
	         	$('#txtReMarkS').textbox('getValue')!=row.SF_NM ||
	         	$('#showFileName').html()!=row.FI_RM){
					return true;
				}else{
					return false;
				}
			}
		},
		/* 添加商品移动信息 */
		addStation = function() {
			$("#searchCondition").dialog("close");
			$("#editTab").dialog("open").dialog('setTitle', '添加设备档案信息');
			$("#fmMatterFile").form("clear");
            $('#txtVersionNum').textbox('textbox').attr('readonly',false);
            $('#txtVersionNum').textbox('textbox').attr('disabled',false);
            $('#txtMatterNO').combobox('textbox').attr('readonly',false);
            $('#txtMatterNO').combobox('textbox').attr('disabled',false);
			$('#txtMatterNO').combobox({
				data : dataPi,
				valueField : 'id',
				textField : 'text'
			});
			CompanyOpttype = 0;
		},
		/*新增修改的保存操作*/
		savaStation = function() {
			if(!checkDataValid()){
				return false;
			}
			var IFServerNo = '',reqData = [],susMsg = '',errorMsg = '',ajaxParam;
			if(CompanyOpttype == 0) {
				existProduct($('#txtMatterNO').combobox('getValue'),$('#txtVersionNum').textbox('getValue'));
				if(!isExist){
					return;
				};
				var cd  = autoCreateCode('tpm');
				susMsg = '添加成功',errorMsg = '添加失败,请联系管理员';
				 
				 var fileObj=$('input[type="file"]');
				 if(fileObj!=null){
					 var fileCnt=fileObj[0].files.length;
					 //动态给表单添加文件input框
					 for(var i=0;i<fileCnt;i++){
						 var fileInput=document.createElement("input");
						 fileInput=fileObj;
						 fileInput[0].style.display="none";
						 fileInput[0].id="fileInput"+i.toString();
						 fileInput[0].name="fileInput"+i.toString();
						 fileInput[0].files=fileObj[0].files;
						 fileInput[0].files[i+1]=null;
						 $("#fmMatterFile").append(fileInput);
					 }
					 var clValue=$('#txtMatterNO').combobox('getValue');
					 $('#FILE_CLS').val(clValue);//标识字段
					 $('#FILE_BELONG').val(cd);//图片表和引用表关联字段
					 $('#FILE_NAME').val(fileName);//文件名称
					 $('#FILE_TYPE').val(fileType);//文件类型
					 $('#importType').val('0');//上传文件方式，0是一般文件，1是excel表格上传
					 $('#fmMatterFile').submit();
				 }
				
				
				
				
				/*判断是否上传图片*/
				 /*var clValue=$('#txtMatterNO').combobox('getValue');
			    if(fileName!=undefined && fileName!='' && fileName!=null){
					$('#FILE_CLS').val(clValue);//标识字段
					$('#FILE_BELONG').val(cd);//图片表和引用表关联字段
					$('#FILE_NAME').val(fileName);//文件名称
					$('#FILE_TYPE').val(fileType);//文件类型
					$('#importType').val('0');//上传文件方式，0是一般文件，1是excel表格上传
					$('#fmMatterFile').submit();
				}
				if(fileNameArray!=undefined && fileNameArray!='' && fileNameArray!=null){
					var fileList=fileNameArray.split(';');
					var form = document.getElementById("fmMatterFile");
					var node = form.children[0];
					var str = node.outerHTML;
					
					if(fileList.length>0){
						for(var i=0;i<fileList.length;i++){
							 form.innerHTML += str + "<br />";
							/*fileName=fileList[i];
							var clValue=$('#txtMatterNO').combobox('getValue')+'_'+i.toString();
							
							var frmUp = document.createElement("form");
							frmUp.id="frmUp";
							document.body.appendChild(frmUp);
							
							var img = document.createElement("img");
							img.src = filterUrlPath(fileName);
							frmUp.appendChild(img);
							
							var fCls = document.createElement("input");
							fCls.type = "hidden";
							frmUp.appendChild(fCls);
							fCls.id="FILE_CLS";
							fCls.value = clValue;
							fCls.name = "FILE_CLS";
							
							var fBelong = document.createElement("input");
							fBelong.type = "hidden";
							frmUp.appendChild(fBelong);
							fBelong.id="FILE_BELONG";
							fBelong.value = cd;
							fBelong.name = "FILE_BELONG";
							
							var fName = document.createElement("input");
							fName.type = "hidden";
							frmUp.appendChild(fName);
							fName.id="FILE_NAME";
							fName.value = fileName;
							fName.name = "FILE_NAME";
							
							var fType = document.createElement("input");
							fType.type = "hidden";
							frmUp.appendChild(fType);
							fType.id="FILE_TYPE";
							fType.value = 'image/png';
							fType.name = "FILE_TYPE";
							
							var importType = document.createElement("input");
							importType.type = "hidden";
							frmUp.appendChild(importType);
							importType.id="importType";
							importType.value = '0';
							importType.name = "importType";
							
							frmUp.method="post"
							frmUp.action = "/iTaurus/iPlant_ImgUpload";
							frmUp.submit();
					    }
							
					}
				}*/
				$('#fmMatterFile').submit();
				IFServerNo = 'T000075';
				ajaxParam = {
	           				url: '/iPlant_ajax',
	           				dataType: 'JSON',
	           				data: {
	           					CD: cd,
	           					MT_VN: $('#txtVersionNum').textbox('getValue'),
	           					MT_SN :$('#txtMatterNO').combobox('getValue'),
	           					FI_RM:$('#txtReMarkS').textbox('getValue'),
	           					IFS: 'T000075'
	           				},
	           				 successCallBack: function(data) {
	           					 setTimeout("countSecond()", 1000);
	           					 $.messager.alert("提示", susMsg) && ($("#editTab").dialog("close"), setDataNull(), initGridData())
	           				},
	           				errorCallBack: function() {
	           					$.messager.alert('提示', errorMsg);
	           				}
	           			};
	           			iplantAjaxRequest(ajaxParam);
	           			$("#editTab").dialog("close");
			} else if(CompanyOpttype == 1) {
				susMsg = '更新成功',errorMsg = '更新失败,请联系管理员';
				if(!saveUpdateValidate()){
            		$.messager.alert("提示", '内容没有更新，请修改') 
            		return false;
            	}
				//判断是否变更了文件信息
				var row = $("#MatterFileinfo_tab").datagrid("getSelected");
				//console.log("fileName="+fileName);
				if(row){
					if(fileName!=undefined && fileName!="" && fileName!=null && row.SAVE_FILE_NM!=fileName){
						$('#FILE_CLS').val($('#txtMatterNO').combobox('getValue')),//标识字段
						$('#FILE_BELONG').val(row.CD),//图片表和引用表关联字段
						$('#FILE_NAME').val(fileName),//文件名称
						$('#FILE_TYPE').val(fileType),//文件类型
						$('#importType').val('0'),//上传文件方式，0是一般文件，1是excel表格上传
						$('#fmMatterFile').submit();
					}
				}
				IFServerNo = 'T000076';
				if(fileName!=undefined && fileName!='' && fileName!=null){
        	 	}else{
        	 		fileName = $('#textFJ').val();
        	 	}
				ajaxParam = {
					url: '/iPlant_ajax',
					dataType: 'JSON',
					data: {
							CD: row.CD,
        					MT_VN: $('#txtVersionNum').textbox('getValue'),
        					MT_SN:$('#txtMatterNO').combobox('getValue'),
        					FI_RM: $('#txtReMarkS').textbox('getValue'),
        					SF_NM:$('#showFileName').html(),
        					OD_FM: row.SF_NM,
        					IFS: 'T000076'
					},
					 successCallBack: function(data) {
						 setTimeout("countSecond()", 2000);
						 $.messager.alert("提示", susMsg) && ($("#editTab").dialog("close"), setDataNull(), initGridData())
					},
					errorCallBack: function() {
						$.messager.alert('提示', errorMsg);
					}
				};
				iplantAjaxRequest(ajaxParam);
				$("#editTab").dialog("close");
			} else {
				IFServerNo = 'T000077';
			}
			 
		}
	};
	MatterFile.prototype = {
		init: function() {
			$(function() {
				 
				   if (!!window.ActiveXObject || "ActiveXObject" in window){
					  //$("#ccID").attr("onclick","downLoadImage();");
				    	isIe = true;
				  }
				  else{
				    	isIe = false;
				  		//var str = getRootPath_dc()+ "/upload/2017-03-13/image/21489387143272.png";
				  		//$("#ccID").attr("href",str);
				  		//$("#ccID").attr("download",'ccccc');
				  }
				var CompanyOpttype; //0：新增   1:编辑
				getSelectedCondtion();
				initGridData();
				
				$('#btnSearch').click(function() {
					searchProductInformation();
				});
				$('.add').click(function() {
					addStation();
				});

				$('.update').click(function() {
					updateStation();
				});

				$('.save').click(function() {
					savaStation();
				});
				
				$('.delete').click(function() {
					deleteConfig();
				});
				
				$('.close').click(function() {
					setDataNull();
					$('#editTab').dialog('close');
				});
			});
		}
	}
	var matterfile = new MatterFile();
	var dataGrid = $('#MatterFileinfo_tab');
	var dataPi=[];
	var isIe = true;
	matterfile.init();
})();