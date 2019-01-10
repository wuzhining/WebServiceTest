/* 启动时加载 */
/*
 */
(function() {
	function EquipmentFile() {
		var fileName="",fileType="",filePath="",isExist = false;
		initGridData = function() {
			dataPi=[],dataSer=[{'value':'','text':'请选择'}],
			fileName="",
			fileType="",
			filePath="";
			
			var FileCode = {
	                url: "/iPlant_ajax",
	                dataType: "JSON",
	                data: {
	                    IFS: "T000048"
	                },
	                successCallBack: function(a) {
	                	var op = a.RESPONSE[0].RESPONSE_DATA;
	                    $.each(op,function(n,obj) {
	                    	dataPi.push({'value':obj.DM_SN,'text':obj.DM_NM});
	                    	dataSer.push({'value':obj.DM_SN,'text':obj.DM_NM});
					    });  
	                    $("#cxFileNum").combobox("loadData", dataSer);
	                    $("#cxFileNum").combobox('select', dataSer[0].value);
	                },
	                errorCallBack: function() {
	                    $.messager.alert("提示", e)
	                }
	            };
				iplantAjaxRequest(FileCode);
			
			var dgrid = $('#EquipmentFileinfo_tab').datagrid('options');
			if(!dgrid) return;
				
			var reqData = {
					IFS: 'T000061',
					DM_SN: $("#cxFileNum").textbox("getValue"),
					DM_NM: $("#cxEquipserise").textbox("getValue"),
					pageIndex: 1,
					pageSize: dgrid.pageSize
				}
				reqGridData('/iPlant_ajax', 'EquipmentFileinfo_tab', reqData);
			},
			bindGridData = function(reqData, jsonData) {
				var grid = {
					name: 'EquipmentFileinfo_tab',
					dataType: 'json',
					columns: [
						[
						 {field: 'DM_SN',title: '档案编号',width: 100,align: 'center'}, 
						 {field: 'DM_MM',title: '档案名称',width: 100,align: 'center'},
						 {field: 'FI_TP',title: '文件类型',width: 100,align: 'center'},
						 {field: 'DM_NM',title: '设备系列',width: 150,align: 'center'}, 
						 {field: 'DM_VN',title: '版本号',width: 150,align: 'center'}, 
						 {field: 'OD_FM',title: '旧文件名',width: 100,align: 'center'}, 
						 {field: 'FI_SZ',title: '文件大小',width: 100,align: 'center'}, 
						 {field: 'SF_NM',title: '保存文件名',width: 100,align: 'center'}, 
						 {field: 'FI_PH',title: '文件保存路径',width: 360,align: 'center'}, 
						 {field: 'FI_RM',title: '备注',width: 300,align: 'center'}, 
						 {field: 'CRT_ID',title: '创建人',width: 150,align: 'center'}, 
						 {field: 'CRT_DT',title: '创建时间',width: 260,align: 'center'}, 
						 {field: 'UPT_ID',title: '修改人',width: 150,align: 'center'}, 
						 {field: 'UPT_DT',title: '修改时间',width: 260,align: 'center'},
						 {field: 'CCXZ',title: '下载',width: 200,align: 'center',formatter:function(value,row,index){//使用formatter格式化刷子
			        		   if(row.SF_NM !=null && row.SF_NM !=""){
			        			   if(isIe){
			        				   return '<a href="#" onclick="downLoadImage(\''+fomateUrl(row.FI_PH)+'\')" >下载 </a>';
			        			   }else{
			        				   //console.log(getRootPath_dc()+row.FI_PH);
			        				   //console.log(fomateUrl(row.FI_PH));
			        				   return '<a href=\''+fomateUrl(row.FI_PH)+'\' download=\''+row.SF_NM+'\' >下载 </a>';
			        			   }
			        		   }else{
			        			   return "";
			        		   }
						 }}]
					],
					
					
					 /**单击进入编辑模式*/
			       /* onClickCell: function (index,field,value) {
			        	var rows = dataGrid.datagrid('getRows'),row = rows[index];
						    window.location.href=row.FI_PH;
					},*/
					
					onDblClickRow: function(index,row){
						if(row) {
							CompanyOpttype = 1;
							$("#editTab").dialog("open").dialog('setTitle', '修改文件档案信息');
							$('#txtEquipSeries').textbox('textbox').attr('readonly',true);
				            $('#txtEquipSeries').textbox('textbox').attr('disabled',true);
				            $('#txtVersionNum').textbox('textbox').attr('readonly',true);
				            $('#txtVersionNum').textbox('textbox').attr('disabled',true);
				            $('#txtFileNO').combobox('textbox').attr('readonly',true);
				            $('#txtFileNO').combobox('textbox').attr('disabled',true);
							$('#txtEquipSeries').textbox('setValue', row.DM_NM);
							$('#txtVersionNum').textbox('setValue', row.DM_VN);
							$('#txtFileNO').combobox('setValue', row.DM_SN);
							$('#txtFileType').combobox('setValue', row.FI_TP);
							$('#txtReMarkS').textbox('setValue', row.FI_RM);
							$('#showFileName').html(row.SF_NM);
							$("#showFileName").attr("title",row.SF_NM); 
//							console.log($("#showFileName").attr("title",row.SF_NM));
							var file = document.getElementById('txtFJ');
							var img = document.getElementById('imgPicture');
							img.src = filterUrlPath(row.FILE_SAVE_PATH);
//							var grid = $('#EquipmentFileinfo_tab');
//			            	grid.datagrid('clearSelections'),   
//							grid.datagrid('selectRow',index);
						}
					}
				}
				initGridView(reqData, grid);
				$('#EquipmentFileinfo_tab').datagrid('loadData', jsonData);
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
			
            $('#txtEquipSeries').textbox('setValue',''),
            $('#txtVersionNum').textbox('setValue',''),
            $("#txtFileNO").combobox('select', dataPi[0].value);
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
         existProduct=function(series,vn,sn){
// 			var rowNum;
// 			if(CompanyOpttype==0){
// 				if(product!=undefined && product!='' && product!=null){
// 					if(tpm.textbox('getValue')!=undefined && tpm.textbox('getValue')!='' && tpm.textbox('getValue')!=null){
 	 	    		var ajaxParam = {
 	 	    				url: '/iPlant_ajax',
 	 	    				dataType: 'JSON',
 	 	    				async: false,
 	 	    				data: {
 	 	                       	IFS: 'T000061',
 	 	                       	DM_NM: series,
 	 	                       	DM_VN:vn,
 	 	                       	DM_SN:sn,
 	 	  					 	pageIndex: 1,
 	 	  					 	pageSize: 10
 	 	    				},
 	 	    				successCallBack:function(data){
 	 	    					var rowNum = parseInt(data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS);
 	 	                   	 	if(rowNum>0){
 	 	                   			$.messager.alert('提示', '您的录入信息相同,请重新输入!');
 	 	                   			$('#txtEquipSeries').textbox('setValue','');
 	 	                   			$('#txtVersionNum').textbox('setValue','');
 	 	                   			$("#txtFileNO").combobox('select', dataPi[0].value);
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
			var a = $('#EquipmentFileinfo_tab'),
			b = $("#cxFileNum").combobox("getValue"),
            c = $("#cxEquipserise").textbox("getValue"),
            e = {
				DM_SN: b,
				DM_NM: c,
				IFS: "T000061",
                pageIndex: 1,
                pageSize: a.pageSize                
            };
            reqGridData("/iPlant_ajax", "EquipmentFileinfo_tab", e)
		},
		validSelectedData = function (gridName,type) {
            var checkedItems = $('#' + 'EquipmentFileinfo_tab').datagrid('getSelections');
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
            var isSelectedData = validSelectedData('EquipmentFileinfo_tab', 'Delete');
            if (!isSelectedData) {
                $.messager.alert('提示', '请选择一条数据进行删除');
                return;
            }
            var checkedItems = $('#EquipmentFileinfo_tab').datagrid('getSelections');
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
                                IFS: 'T000064',
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
    	   if(pic.files.length>0){
    		   file = pic.files[0],fileName = file.name,fileType=file.type,filePath=file.path;
    		   var temp = [];
    		   if(fileName.indexOf('.')>0){
    			   temp=fileName.split('.');
    			   strSrc = temp[temp.length-1];
    			   if(strSrc.localeCompare('jpg')===0 || strSrc.localeCompare('jpeg') === 0 || strSrc.localeCompare('gif') === 0 || strSrc.localeCompare('png') === 0 || strSrc.localeCompare('pdf') === 0 || strSrc.localeCompare('xlsx') === 0){
    				   $('#showFileName').html(fileName);
    			   }
    		   }
    	   }
       },
       /* 修改设备档案信息 */
       updateStation = function() {
			var checkedItems = $('#EquipmentFileinfo_tab').datagrid('getSelections');
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
			var row = $("#EquipmentFileinfo_tab").datagrid("getSelected");
			$("#txtFileNO").combobox("loadData", dataPi);
			if(row) {
				CompanyOpttype = 1;
				$("#editTab").dialog("open").dialog('setTitle', '修改设备档案信息');
				$('#txtEquipSeries').textbox('textbox').attr('readonly',true);
	            $('#txtEquipSeries').textbox('textbox').attr('disabled',true);
	            $('#txtVersionNum').textbox('textbox').attr('readonly',true);
	            $('#txtVersionNum').textbox('textbox').attr('disabled',true);
	            $('#txtFileNO').combobox('textbox').attr('readonly',true);
	            $('#txtFileNO').combobox('textbox').attr('disabled',true);
	            $('#txtEquipSeries').textbox('setValue', row.DM_NM);
				$('#txtVersionNum').textbox('setValue', row.DM_VN);
				$('#txtFileNO').combobox('setValue', row.DM_SN);
				$('#txtFileType').combobox('setValue', row.FI_TP);
				$('#txtOldFileNum').textbox('setValue', row.OD_FM);
				$('#txtFileSize').textbox('setValue', row.FI_SZ);
				$('#txtSaveFile').textbox('setValue', row.SF_NM);
				$('#txtFilePath').textbox('setValue', row.FI_PH);
				$('#txtReMarkS').textbox('setValue', row.FI_RM);
				$('#showFileName').html(row.SF_NM);
	    		$("#showFileName").attr("title",row.SF_NM);
//	    		var grid = $('#EquipmentFileinfo_tab');
	    		var file = document.getElementById('txtFJ');
				var img = document.getElementById('imgPicture');
				img.src = filterUrlPath(row.FILE_SAVE_PATH);
//				grid.datagrid('clearSelections');
//				grid.datagrid('selectRow',row);
			}
		},
		/*是否修改变更的验证*/
		saveUpdateValidate=function(){
			var checkedItems = $('#EquipmentFileinfo_tab').datagrid('getSelections'),row = checkedItems[0];
			//var FileName = document.getElementById('showFileName');
			//var file = document.getElementById('txtFJ');
			if(row.CD){
				if($('#txtEquipSeries').textbox('getValue')!=row.DM_NM ||
				$('#txtVersionNum').textbox('getValue')!=row.DM_VN ||
				$('#txtFileNO').combobox('getValue')!=row.DM_SN ||
	         	$('#txtReMarkS').textbox('getValue')!=row.SF_NM||
	         	$('#showFileName').html()!=row.FI_RM){
					return true;
				}else{
					return false;
				}
			}
		},
		/* 添加商品移动信息 */
		addStation = function() {
			$("#searchCondition").dialog("close"),
	    	$("#txtFileNO").combobox("loadData", dataPi),
			$("#editTab").dialog("open").dialog('setTitle', '添加设备档案信息');
			$("#fmEquipmentFile").form("clear");
			$('#txtEquipSeries').textbox('textbox').attr('readonly',false);
            $('#txtEquipSeries').textbox('textbox').attr('disabled',false);
            $('#txtVersionNum').textbox('textbox').attr('readonly',false);
            $('#txtVersionNum').textbox('textbox').attr('disabled',false);
            $('#txtFileNO').combobox('textbox').attr('readonly',false);
            $('#txtFileNO').combobox('textbox').attr('disabled',false);
			if(dataPi.length>0){
	    		   $("#txtFileNO").combobox('select', dataPi[0].value);
	    	   }
			CompanyOpttype = 0;
		},
		/*新增修改的保存操作*/
		savaStation = function() {
			
			if(!checkDataValid()){
				return false;
			}
			var IFServerNo = '',reqData = [],susMsg = '',errorMsg = '',ajaxParam;
			if(CompanyOpttype == 0) {
				existProduct($('#txtEquipSeries').textbox('getValue'),$('#txtVersionNum').textbox('getValue'),$('#txtFileNO').combobox('getValue'));
				if(!isExist){
					return;
				};
				var cd  = autoCreateCode('tpm');
				susMsg = '添加成功',errorMsg = '添加失败,请联系管理员';
				/*判断是否上传图片*/
				if(fileName!=undefined && fileName!='' && fileName!=null){
					$('#FILE_CLS').val($('#txtFileNO').combobox('getValue'));//标识字段
					$('#FILE_BELONG').val(cd);//图片表和引用表关联字段
					$('#FILE_NAME').val(fileName);//文件名称
					$('#FILE_TYPE').val(fileType);//文件类型
					$('#importType').val('0');//上传文件方式，0是一般文件，1是excel表格上传
					$('#fmEquipmentFile').submit();
				}
				IFServerNo = 'T000062';
				ajaxParam = {
	           				url: '/iPlant_ajax',
	           				dataType: 'JSON',
	           				data: {
	           					CD: cd,
	           					DM_NM: $('#txtEquipSeries').textbox('getValue'),
	           					DM_VN: $('#txtVersionNum').textbox('getValue'),
	           					DM_SN :$('#txtFileNO').combobox('getValue'),
	           					FI_RM:$('#txtReMarkS').textbox('getValue'),
	           					IFS: IFServerNo
	           				},
	           				 successCallBack: function(data) {
	           					 setTimeout(function(){
	           						$.messager.alert("提示", susMsg) && ($("#editTab").dialog("close"), setDataNull(), initGridData())
	           					 }, 1000);
	           				},
	           				errorCallBack: function() {
	           					$.messager.alert('提示', errorMsg);
	           				}
	           			};
	           			iplantAjaxRequest(ajaxParam);
	           			$("#editTab").dialog("close");
//				/*验证是否重复*/  
//	 			var rowNum,tpm = $('#txtEquipSeries');
//	 	    	if(tpm.textbox('getValue')!=undefined && tpm.textbox('getValue')!='' && tpm.textbox('getValue')!=null){
//	 	    		var ajaxParamExist = {
//	 	                   url: '/iPlant_ajax',
//	 	                   dataType: 'JSON',
//	 	                   data: {
//	 	                	   	IFS: 'T000061',
//	 	                	    EquipSeries: tpm.textbox('getValue'),	     							
//	 	  					 	pageIndex: 1,
//	 	  					 	pageSize: 10
//	 	                   },
//	 	                   successCallBack:function(data){
//	 	                   	 	rowNum = parseInt(data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS);
//	 	                   	 	if(rowNum>0){
//	 	                   	 		//chrome支持
//	 	                   	 		tpm.textbox().next('span').find('input').focus();
//	 	                   	 		tpm.textbox({ required: true });
//	 	//                       		$('#showInfo').html("<font color='red'>(已存在)</font>");
//	 	                   	 		$.messager.alert('提示', '您输入的设备系列['+tpm.textbox('getValue')+']已有相同,请重新输入!');
//	 	                   			return false;
//	 	                   	 	}else{
//		 	                   	 	if(fileName!=undefined && fileName!='' && fileName!=null){
//		 	                   	 	}else{
//		 	                   	 		fileName = $('#txtPICTURE').val();
//		 	                   	 	}
//			 	           			ajaxParam = {
//			 	           				url: '/iPlant_ajax',
//			 	           				dataType: 'JSON',
//			 	           				data: {
//			 	           					DM_NM: $('#txtEquipSeries').textbox('getValue'),
//			 	           					DM_VN: $('#txtVersionNum').textbox('getValue'),
//			 	           					DM_SN :$('#txtFileNO').combobox('getValue'),
//			 	           					//FI_TP: $('#txtFileType').combobox('getValue'),
//			 	           					//OD_FM: $('#txtOldFileNum').textbox('getValue'),
//			 	           					//FI_SZ: $('#txtFileSize').textbox('getValue'),
//			 	           					//SF_NM: $('#txtSaveFile').textbox('getValue'),
//			 	           					//FI_PH: $('#txtFilePath').textbox('getValue'),
//			 	           					//FI_PH: fileName,
//			 	           					FI_RM:$('#txtReMarkS').textbox('getValue'),
//			 	           					IFS: IFServerNo
//			 	           				},
//			 	           				 successCallBack: function(data) {
//			 	           					 $.messager.alert("提示", susMsg) && ($("#editTab").dialog("close"), setDataNull(), initGridData())
//			 	           				},
//			 	           				errorCallBack: function() {
//			 	           					$.messager.alert('提示', errorMsg);
//			 	           				}
//			 	           			};
//			 	           			iplantAjaxRequest(ajaxParam);
//			 	           			$("#editTab").dialog("close");
//	 	                   	 	}
//	 	                   	}
//	 	    			};
//	 	               	iplantAjaxRequest(ajaxParamExist);
//	 	    	 }
			} else if(CompanyOpttype == 1) {
				susMsg = '更新成功',errorMsg = '更新失败,请联系管理员';
				if(!saveUpdateValidate()){
            		$.messager.alert("提示", '内容没有更新，请修改') 
            		return false;
            	}
				//判断是否变更了文件信息
				var row = $("#EquipmentFileinfo_tab").datagrid("getSelected");
				//console.log("fileName="+fileName);
				if(row){
					if(fileName!=undefined && fileName!="" && fileName!=null && row.SAVE_FILE_NM!=fileName){
						$('#FILE_CLS').val($('#txtFileNO').combobox('getValue')),//标识字段
						$('#FILE_BELONG').val(row.CD),//图片表和引用表关联字段
						$('#FILE_NAME').val(fileName),//文件名称
						$('#FILE_TYPE').val(fileType),//文件类型
						$('#importType').val('0'),//上传文件方式，0是一般文件，1是excel表格上传
						$('#fmEquipmentFile').submit();
					}
				}
				IFServerNo = 'T000063';
				if(fileName!=undefined && fileName!='' && fileName!=null){
        	 	}else{
        	 		fileName = $('#textFJ').val();
        	 	}
				ajaxParam = {
					url: '/iPlant_ajax',
					dataType: 'JSON',
					data: {
							CD: row.CD,
							DM_NM: $('#txtEquipSeries').textbox('getValue'),
        					DM_VN: $('#txtVersionNum').textbox('getValue'),
        					DM_SN:$('#txtFileNO').combobox('getValue'),
        					FI_RM: $('#txtReMarkS').textbox('getValue'),
        					SF_NM:$('#showFileName').html(),
        					OD_FM: row.SF_NM,
        					IFS: IFServerNo
					},
					 successCallBack: function(data) {
						 setTimeout(function(){
							 $.messager.alert("提示", susMsg) && ($("#editTab").dialog("close"), setDataNull(), initGridData())
						 }, 2000);
					},
					errorCallBack: function() {
						$.messager.alert('提示', errorMsg);
					}
				};
				iplantAjaxRequest(ajaxParam);
				$("#editTab").dialog("close");
			} else {
				IFServerNo = 'T000064';
			}
		}
	};
	EquipmentFile.prototype = {
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
	var equipfile = new EquipmentFile();
	var isIe = true;
	equipfile.init();
})();