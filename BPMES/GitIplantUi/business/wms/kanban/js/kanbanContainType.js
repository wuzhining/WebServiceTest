
(function() {
	function kanbanContainType() {	
				
		design = function(){
			var unitNum = $("#txtUnitNum").val() * 1;
            if (unitNum < 1) { alert("控件个数有误"); return false; }
            $("#divConM").html('');//清空内容
            for (var i = 0; i < unitNum; i++) {
                $("#divConM").append('<div class="col-sm-6 contUnit ui-widget-content" style="background: #eeeeee;">' +
                    '<label></label>' +
                    '<p>拖动并设计布局</p>' +
                    '<p>Card:' + (i + 1) + '</p>' +
//                    '<p><button type="button" onclick="setMaxHeight(this)">MaxHeight</button></p>' +
                    '</div>');
            }
            $(".contUnit").css("position", "absolute");
            UiAction();
		}
		
		UiAction = function() {
            var dragging = false;
            var inx;
            var unit = $(".contUnit");
            unit.bind('mousedown',
                function () {
                    inx = $(this).index();
                });
			var momHeigth = $("#divConM").height();   //母体高度
	        var momWidth = $("#divConM").width();   //母体宽度
            document.onmousemove = function (e) {
                unit.eq(inx)
                    .find('label')
                    .html(
                        'width:' + unit.eq(inx).width() + '</br>' +
                        'height:' + unit.eq(inx).height() + '</br>' +
                        '宽度：' + (unit.eq(inx).width() * 1 / (unit.eq(inx).parent().width()) * 100).toFixed(3) + '%' + '</br>' +
                        '高度：' + (unit.eq(inx).height() * 1 / momHeigth * 100).toFixed(3) + '%'
                    );
            }

            //缩放
            $(".contUnit")
                .resizable({
                    minHeight: 100
                    , minWidth: 150
                    //                    , grid: 2
                    //                    , containment: "#divConM" //限制缩放区域（母体）
                });

            //拖动
            $(".contUnit")
                .draggable({
                    //                    containment: "#divConM" //不能超过母体
                    //                    , scroll: false //不自动滚动背景div
                    //                    , grid: [2, 2]
                });
        }
		
		getFitCode = function() {
			var momHeigth = $("#divConM").height();   //母体高度
	        var momWidth = $("#divConM").width();   //母体宽度
            var unitNum = $(".contUnit").length;
            if (unitNum < 1) return false;
            var code1 = '<div class="containerbody" style="position: relative;clear:both;height: 85%">';
            var codeUnits = '';
            $('.contUnit').each(function (k) {
                var uLeft = $(this).css("left").slice(0, -2) * 100;
                var uTop = $(this).css("top").slice(0, -2) * 100;
                var uHeight = $(this).css("height").slice(0, -2) * 100;
                var uWidth = $(this).css("width").slice(0, -2) * 100;
                //console.log({momWidth,momHeigth,uLeft,uTop,uHeight,uWidth})
                codeUnits += '<div class="contUnit ui-widget-content" style="position: absolute;' +
                    'left:' + uLeft / momWidth + '%;' +
                    'top:' + uTop / momHeigth + '%;' +
                    'width:' + uWidth / momWidth + '%;' +
                    'height:' + uHeight / momHeigth + '%"></div>';

            });
            //console.log(codeUnits)
            return code1 + codeUnits + '</div>';
        }
		
		save = function() {
            var cName = $("#txtConTypeName").val();
            var hCode = getFitCode();
            var cRemark = $("#configName").val();
            if (!(cName !== '' && $("#divConM").html() !== '')) {
                alert("缺少必要信息");
                return false;
            }
            var ajaxParam = {
    				url: '/iPlant_ajax',
    				dataType: 'JSON',
    				data: {
    					ID:'CONFIG_ID_SEQ.NextVal',
    					CNAME: cName,
    					HCODE: hCode,
    					CREMARK: cRemark,
    					IFS: 'WMS_K30002'
    				},
    				successCallBack: function(data) {
    					alert("good")
    				},
    			    errorCallBack: function() {
    					$.messager.alert("no");
    				}
    					
    			};
    			iplantAjaxRequest(ajaxParam);  
        }
	};
	kanbanContainType.prototype = {
		init: function() {
			$(function() {			
		        var user = "admin";
				$('#Design').click(function(){
					design();
				});
				$('#bttAdd').click(function(){
					save();
				});
			});
		}
	}
	var fcfo = new kanbanContainType();
	fcfo.init();
})();