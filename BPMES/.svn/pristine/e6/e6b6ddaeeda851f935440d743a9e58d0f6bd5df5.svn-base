/*
 */
(function () {
    //预定义模块
    //将所有的插件，和插件资源和依赖文件放进modules对象中。  
    var modules = {
        draggable: { js: "jquery.draggable.js" },
        droppable: { js: "jquery.droppable.js" },
        resizable: { js: "jquery.resizable.js" },
        linkbutton: { js: "jquery.linkbutton.js", css: "linkbutton.css" },
        progressbar: { js: "jquery.progressbar.js", css: "progressbar.css" },
        pagination: { js: "jquery.pagination.js", css: "pagination.css", dependencies: ["linkbutton"] },
        datagrid: {
            js: "jquery.datagrid.js", css: "datagrid.css",
            dependencies: ["panel", "resizable", "linkbutton", "pagination"]
        },
        treegrid: { js: "jquery.treegrid.js", css: "tree.css", dependencies: ["datagrid"] },
        propertygrid: { js: "jquery.propertygrid.js", css: "propertygrid.css", dependencies: ["datagrid"] },
        panel: { js: "jquery.panel.js", css: "panel.css" },
        window: {
            js: "jquery.window.js", css: "window.css",
            dependencies: ["resizable", "draggable", "panel"]
        },
        dialog: { js: "jquery.dialog.js", css: "dialog.css", dependencies: ["linkbutton", "window"] },
        messager: {
            js: "jquery.messager.js", css: "messager.css",
            dependencies: ["linkbutton", "window", "progressbar"]
        },
        layout: {
            js: "jquery.layout.js", css: "layout.css",
            dependencies: ["resizable", "panel"]
        },
        form: { js: "jquery.form.js" },
        menu: { js: "jquery.menu.js", css: "menu.css" },
        tabs: { js: "jquery.tabs.js", css: "tabs.css", dependencies: ["panel", "linkbutton"] },
        splitbutton: { js: "jquery.splitbutton.js", css: "splitbutton.css", dependencies: ["linkbutton", "menu"] },
        menubutton: { js: "jquery.menubutton.js", css: "menubutton.css", dependencies: ["linkbutton", "menu"] },
        accordion: { js: "jquery.accordion.js", css: "accordion.css", dependencies: ["panel"] },
        calendar: { js: "jquery.calendar.js", css: "calendar.css" },
        combo: {
            js: "jquery.combo.js", css: "combo.css",
            dependencies: ["panel", "validatebox"]
        },
        combobox: { js: "jquery.combobox.js", css: "combobox.css", dependencies: ["combo"] },
        combotree: { js: "jquery.combotree.js", dependencies: ["combo", "tree"] },
        combogrid: { js: "jquery.combogrid.js", dependencies: ["combo", "datagrid"] },
        validatebox: { js: "jquery.validatebox.js", css: "validatebox.css" },
        numberbox: { js: "jquery.numberbox.js", dependencies: ["validatebox"] },
        searchbox: { js: "jquery.searchbox.js", css: "searchbox.css", dependencies: ["menubutton"] },
        spinner: { js: "jquery.spinner.js", css: "spinner.css", dependencies: ["validatebox"] },
        numberspinner: { js: "jquery.numberspinner.js", dependencies: ["spinner", "numberbox"] },
        timespinner: { js: "jquery.timespinner.js", dependencies: ["spinner"] },
        tree: {
            js: "jquery.tree.js", css: "tree.css",
            dependencies: ["draggable", "droppable"]
        },
        datebox: {
            js: "jquery.datebox.js", css: "datebox.css",
            dependencies: ["calendar", "combo"]
        },
        datetimebox: {
            js: "jquery.datetimebox.js",
            dependencies: ["datebox", "timespinner"]
        },
        slider: {
            js: "jquery.slider.js",
            dependencies: ["draggable"]
        },
        parser: { js: "jquery.parser.js" }
    };
    //预定义区域 //将国际化文件放入一个locales对象中  
    var locales = {
        "af": "easyui-lang-af.js",
        "bg": "easyui-lang-bg.js",
        "ca": "easyui-lang-ca.js",
        "cs": "easyui-lang-cs.js",
        "cz": "easyui-lang-cz.js",
        "da": "easyui-lang-da.js",
        "de": "easyui-lang-de.js",
        "en": "easyui-lang-en.js",
        "es": "easyui-lang-es.js",
        "fr": "easyui-lang-fr.js",
        "it": "easyui-lang-it.js",
        "nl": "easyui-lang-nl.js",
        "ptcallbackR": "easyui-lang-ptcallbackR.js",
        "ru": "easyui-lang-ru.js",
        "tr": "easyui-lang-tr.js",
        "zh_CN": "easyui-lang-zh_CN.js",
        "zh_TW": "easyui-lang-zh_TW.js"
    };

    //定义一个局部变量，做循环遍历时候，存放状态  
    var queues = {};
    //加载js
    function loadjs(module, callback) {
        //标志变量，js是否加载并执行  
        var state = false;     
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.language = "javascript";
        script.src = module;
        //onload是firefox 浏览器事件，onreadystatechange,是ie的，为了兼容，两个都写上，这样写会导致内存泄露  
        //script.readyState只是ie下有这个属性，如果这个值为undefined，说明是在firefox,就直接可以执行下面的代码了。反之为ie，需要对script.readyState  
        //状态具体值进行判别，loaded和complete状态表示，脚本加载了并执行了。 
        script.onload = script.onreadystatechange = function () {
            if (!state && (!script.readyState || script.readyState == "loaded" || script.readyState == "complete")) {
                state = true;
                ////释放内存，还会泄露
                script.onload = script.onreadystatechange = null;
                if (callback) {//加载后执行回调  
                    callback.call(script);
                }
            }
        };
        //具体加载动作，上面的onload是注册事件，  
        document.getElementsByTagName("head")[0].appendChild(script);
    };
    //运行js ,看代码逻辑可知，运行js,只是在js执行后，将这个script删除而已，主要用来加载国际化文件
    function runJs(module, callback) {
        loadjs(module, function () {
            document.getElementsByTagName("head")[0].removeChild(this);
            if (callback) {
                callback();
            }
        });
    };
    //加载css方法
    function loadcss(module, callback) {       
        var link = document.createElement("link");
        link.rel = "stylesheet";
        link.type = "text/css";
        link.media = "screen";
        link.href = module;
        document.getElementsByTagName("head")[0].appendChild(link);
        if (callback) {
            callback.call(link);
        }
    };
    //加载单一一个plugin,仔细研究module ,可以发现，pingin之间通过dependence,构造成了一颗依赖树，  
    //这个方法，就是加载具体树中的一个节点
    function loadSinglejs(name, callback) {
        //把整个plugin的状态设置为loading  
        queues[name] = "loading";
        var module = modules[name];
        //把js状态设置为loading  
        var jsStatus = "loading";
        //如果允许css,并且plugin有css,则加载css,否则设置加载过了，其实是不加载
        var state = (easyloader.css && module["css"]) ? "loading" : "loaded";
        //加载css,plugin 的css，如果是全称，就用全称，否则把简写换成全称，所以简写的css文件要放入到themes/type./文件下  
        if (easyloader.css && module["css"]) {
            if (/^http/i.test(module["css"])) {
                var url = module["css"];
            } else {
                var url = easyloader.base + "themes/" + easyloader.theme + "/" + module["css"];
            }
            loadcss(url, function () {
                state = "loaded";
                //js， css加载完，才调用回调  
                if (jsStatus  == "loaded" && state == "loaded") {
                    finish();
                }
            });
        }
        //加载js,全称用全称，简写补全。 
        if (/^http/i.test(module["js"])) {
            var url = module["js"];
        } else {
            var url = easyloader.base + "plugins/" + module["js"];
        }
        loadjs(url, function () {
            jsStatus  = "loaded";
            if (jsStatus  == "loaded" && state == "loaded") {
                finish();
            }
        });
        //加载完调用的方法，改plugin状态  
        function finish() {
            queues[name] = "loaded";
            //调用正在加载的方法，其实已经加载完了
            easyloader.onProgress(name);
            if (callback) {
                callback();
            }
        };
    };
    ////加载主模块入口，  
    function loadModule(module, callback) {
        //定义数组，最后是形成的是依赖插件列表，最独立的插件放在首位，name是末尾  
        var mm = [];
        var doLoad = false;
        //name有两种，一种是string ,一种是string array,这样一次可以加载多个plugin,都是调用add方法进行添加  
        if (typeof module == "string") {
            add(module);
        } else {
            for (var i = 0; i < module.length; i++) {
                add(module[i]);
            }
        }
        function add(moduleN) {
            //如果modules中没有这个plugin那退出  
            if (!modules[moduleN]) {
                return;
            }
            //如果有，查看它是否依赖其他plugin  
            var d = modules[moduleN]["dependencies"];
            //如果依赖，就加载依赖的plugin.同时在加载依赖的plugin的依赖。注意循环中调用了add,是递归
            if (d) {
                for (var i = 0; i < d.length; i++) {
                    add(d[i]);
                }
            }
            mm.push(moduleN);
        };

        function finish() {
            if (callback) {
                callback();
            }
            //调用onLoad，传递name 为参数 
            //easyloader.onLoad(options);
        };
        //形成依赖树，不行还没有做实质性工作呢，那就是加载。打起精神来，最核心的代码就是以下的了  
        //超时用  
        var time = 0;
        //定义一个加载方法，定义后直接调用  
        function loadMm() {
            //如果mm有长度，长度！=0,加载plugin,为0，即加载完毕，开始加载国际化文件。
            if (mm.length) {
                var m = mm[0];
                if (!queues[m]) {//状态序列中没有这个plugin的信息，说明没有加载这个plug,调用laodSingle进行加载  s
                    doLoad  = true;
                    loadSinglejs(m, function () {
                        mm.shift();//加载完成后，将这个元素从数组去除，在继续加载，直到数组  
                        loadMm();
                    });
                } else {
                    if (queues[m] == "loaded") {//如果这个plugin已经加载，就不用加载，以为mm中可能有重复项  
                        mm.shift();
                        loadMm();
                    } else {
                        //超时时候，10秒钟调用一次loadMn().注意arguments.callee代表函数本身  
                        if (time  < easyloader.timeout) {
                            time  += 10;
                            setTimeout(arguments.callee, 10);
                        }
                    }
                }
            } else {
                if (easyloader.locale && doLoad  == true && locales[easyloader.locale]) {
                    var url = easyloader.base + "locale/" + locales[easyloader.locale];
                    runJs(url, function () {
                        finish();
                    });
                } else {
                    finish();
                }
            }
        };
        loadMm();
    };
    //  定义一个加载器，注意，是全局变量，没有var,  
    easyloader = {
        modules: modules,//预定义模块
        locales: locales,//预定义区域
        base: ".",//easyui 基础目录，必须用'/'结束
        theme: "default",//主题的名称预定义在themes目录下
        css: true,//定义在加载模块的时候加载 CSS 文件
        locale: null,//区域名称
        timeout: 2000,//超时的值以毫秒为单位，载入如果超时则重载
        //加载指定模块。当加载成功的回调函数被调用。
        //模块参数有效的类型包括：
        //● 一个单一的模块名称
        //● 模块数组
        //● ".css"后缀结尾的CSS文件
        //● ".js"后缀结尾的JS文件
        load: function (module, callback) {
           
            if (/\.css$/i.test(module)) {
                if (/^http/i.test(module)) {
                    loadcss(module, callback);
                } else {
                    loadcss(easyloader.base + module, callback);
                }
            } else {
                if (/\.js$/i.test(module)) {
                    if (/^http/i.test(module)) {
                        loadjs(module, callback);
                    } else {
                        loadjs(easyloader.base + module, callback);
                    }
                } else {
                    loadModule(module, callback);
                }
            }
        },
        //当一个模块加载成功的时候触发
        onProgress: function (name) {
        },
        //当一个模块以及他的依赖加载成功的时候触发
        onLoad: function (name) {
        }
    };
    //以上一直在定义函数，和变量，此处为真正执行处  
    //获取页面的所有的script,主要是为了获取我们现在解释的easyloader.js文件路径，来设置base属性  
    var init = document.getElementsByTagName("script");
  
    for (var i = 0; i < init.length; i++) {
        var src = init[i].src;
        if (!src) {
            continue;
        }
        var m = src.match(/easyloader\.js(\W|$)/i);
        if (m) {
            //如果有，base为easyloadr.js 的相同前缀  
            easyloader.base = src.substring(0, m.index);//http://localhost:28046/jquery-easyui-1.3.2/plugins2/
          
        }
    }
    //定义一个简化调用接口  
    window.using = easyloader.load;
    if (window.jQuery) {
        jQuery(function () {
            //系统数据加载完后，加载parser.js插件，该插件是渲染界面的  
            easyloader.load("parser", function () {
                jQuery.parser.parse();
            });
        });
    }
})();


