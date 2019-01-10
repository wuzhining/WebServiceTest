/**
 * 
 */
(function(){
  iplantloader={
		modules:sysmodules,
		locales:syslocales,
		base: '../WebContent/IplantCompent/',
		theme:'default',
		css:true,
		locale:'zh_CN',
		load:function(name,callback){
			 if (/\.css$/i.test(name)) {
	                if (/^http/i.test(name)) {
	                    loadCss(name, callback);
	                } 
	                else {								
	                    loadCss(iplantloader.base + 'themes/' + iplantloader.theme + '/' + name, callback);
	                }
	            }
	            else if (/\.js$/i.test(name)) {
	                if (/^http/i.test(name)) {  /*动态加载外部js文件*/
	                    loadJs(name, callback);
	                } 
	                else {   /*加载本地js文件*/				
	                    loadJs(name, callback);
	                }
	            }
	            else {
	                loadModule(name, callback , flag, param);
	            }
		},
		onProgress: function(name) {},
	    onLoad: function(name) {},
		onReady:function(){}
	};
	var sysmodules={};
	var syslocales={
			'af': 'iplant-lang-af.js',
		    'bg': 'iplant-lang-bg.js',
		    'ca': 'iplant-lang-ca.js',
		    'cs': 'iplant-lang-cs.js',
		    'cz': 'iplant-lang-cz.js',
		    'da': 'iplant-lang-da.js',
		    'de': 'iplant-lang-de.js',
		    'en': 'iplant-lang-en.js',
		    'fr': 'iplant-lang-fr.js',
		    'nl': 'iplant-lang-nl.js',
		    'zh_CN': 'iplant-lang-zh_CN.js',
		    'zh_TW': 'iplant-lang-zh_TW.js'
	};
	var systheme={};
	
	function loadJs(){
		var done = false;
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.language = 'javascript';
        script.src = url;
        script.onload = script.onreadystatechange = function() {
            if (!done && (!script.readyState || script.readyState == 'loaded' || script.readyState == 'complete')) {
                done = true;
                script.onload = script.onreadystatechange = null;
                if (callback) {					
                    callback.call(script);
                }
            }
        };
        document.getElementsByTagName("head")[0].appendChild(script);
	}
	function loadModule(curMouldName,callback){
		    var mm = [];
	        var doLoad = false;
	        var currMm = curMouldName;
	        if (typeof curMouldName == 'string') {
	            add(curMouldName);
	        } else {
	            for (var i = 0; i < curMouldName.length; i++) {
	                add(curMouldName[i]);
	            }
	        }
	        function add(name) {
	            if (!modules[name]) return;
	            var d = modules[name]['dependencies'];
	            if (d) {
	                for (var i = 0; i < d.length; i++) {
	                    if (currMm != d[i]) add(d[i]);
	                }
	            }
	            mm.push(name);
	        }

	        function finish() {
	            if (callback) {
	                callback(param);
	            }
	            iplantloader.onLoad(name);
	        }

	        var time = 0;
	        function loadMm() {
	            if (mm.length) {
	                var m = mm[0];
	                if($.fn[m] || queues[m] == 'loaded') { 
	                	mm.shift();
	                    loadMm();
	                } else if (!queues[m]||flag) {
	                    doLoad = true;
	                    loadSingle(m,
	                    function() {
	                        mm.shift();
	                        loadMm();
	                    });
	                } else {
	                    if (time < iplantloader.timeout) {
	                        time += 10;
	                        setTimeout(arguments.callee, 10);
	                    }
	                }
	            } else {
	                if (iplantloader.locale && doLoad == true && locales[iplantloader.locale]) {
	                    var url = iplantloader.base + 'js/locale/' + locales[iplantloader.locale];
	                    runJs(url,
	                    function() {
	                        finish();
	                    });
	                }
	                else {
	                    finish();
	                }
	            }
	        }
	        loadMm();
	}
	function runJs(url, callback) {
        loadJs(url,
        function() {
            document.getElementsByTagName("head")[0].removeChild(this);
            if (callback) {
                callback();
            }
        });
    }
	
})();