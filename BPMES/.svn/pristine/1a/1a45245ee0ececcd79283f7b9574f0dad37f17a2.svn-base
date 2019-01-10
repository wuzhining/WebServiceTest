function checkJatoolsPrinterInstalled() {
    var g = false,
    h = null,
    c = ["MSIE", "Firefox", "Chrome"];
    for (var e = 0; e < c.length; e++) {
        if (navigator.userAgent.indexOf(c[e]) > -1) {
            g = true;
            break
        }
    }
    if (!g) {
        h = "打印控件不支持本浏览器!"
    } else {
        if (navigator.userAgent.indexOf("Chrome") > -1) {
            var b = navigator.plugins,
            d = false;
            for (var j = 0; j < b.length; j++) {
                if (b[j].name.indexOf("jatoolsPrinter") == 0) {
                    d = true;
                    break
                }
            }
            if (!d) {
                h = "打印控件未安装，请点击<a href='jatoolsPrinter.crx'>此处</a>安装."
            }
        }
    }
    if (h) {
        showError(h)
    }
}
function showError(d) {
    var c = document.getElementsByTagName("input");
    for (var b = 0; b < c.length; b++) {
        c[b].disabled = true
    }
    var a = document.getElementById("errs");
    a.innerHTML = d;
    a.style.display = "block"
}
function viewSource() {
    var a = document.URL.replace(/^http[s]?\:\/\/.*?\//i, "");
    window.showModalDialog("/sourceviewer/view.jsp?from=" + escape(a), null, "dialogWidth=1024px;dialogHeight=670px;status=no;help=no;scroll=no;resizable=yes")
}
function jpExit() {
    getJP().exit()
}
function JP(g) {
    function e(l, m) {
        return l.getElementById(m)
    }
    function a(r) {
        var l = "<style>";
        var q = r.styleSheets;
        for (var o = 0; o < q.length; o++) {
            var n = q[o];
            try {
                var s = n.cssRules;
                if (s) {
                    for (var m = 0; m < s.length; m++) {
                        l += s[m].cssText || ""
                    }
                } else {
                    if (n.cssText) {
                        l += n.cssText
                    }
                }
            } catch(p) {}
        }
        return l + "</style>"
    }
    function i(m, l) {
        if (m.doctype) {
            l.setAttribute("_strict", "true")
        }
        return l.outerHTML || (function(q) {
            var p = m.createElement("div"),
            o;
            p.appendChild(q.cloneNode(true));
            o = p.innerHTML;
            p = null;
            return o
        })(l)
    }
    function j(o, p) {
        if (typeof(o.getElementById) != "undefined") {
            var l = "NSAPI://" + a(o) + "--\n\n\n--";
            if (p.pages) {
                for (var m = 0; m < p.pages.length; m++) {
                    var n = p.pages[m];
                    if (typeof(n.substring) != "undefined") {
                        n = e(o, n)
                    }
                    l += ("<div id='page" + (m + 1) + "'>" + i(o, n) + "</div>")
                }
            } else {
                var m = 0;
                while (true) {
                    var n = e(o, (p.pagePrefix || "") + "page" + (m + 1));
                    if (!n) {
                        break
                    }
                    l += i(o, n);
                    m++
                }
            }
            return l
        } else {
            if (o.html && o.all) {
                return o
            } else {
                if (o.html) {
                    var l = "NSAPI:// --\n\n\n--";
                    if (!o.html.push) {
                        o.html = [o.html]
                    }
                    for (var m = 0; m < o.html.length; m++) {
                        l += ("<div id='page" + (m + 1) + "'>" + o.html[m] + "</div>")
                    }
                    return l
                } else {
                    return o
                }
            }
        }
    }
    function b(t) {
        var m = ["border", "border-radius", "box-shadow", "height", "margin", "padding", "width", "max-width", "min-width", "border-collapse", "border-spacing", "caption-side", "empty-cells", "table-layout", "direction", "font", "font-family", "font-style", "font-variant", "font-size", "font-weight", "letter-spacing", "line-height", "text-align", "text-decoration", "text-indent", "text-overflow", "text-shadow", "text-transform", "white-space", "word-spacing", "word-wrap", "vertical-align", "color", "background", "background-color", "background-image", "background-position", "background-repeat", "Opacity", "bottom", "clear", "clip", "cursor", "display", "float", "left", "opacity", "outline ", "overflow", "position", "resize ", "right", "top", "visibility", "z-index", "list-style-image", "list-style-position", "list-style-type"];
        var o = t.getElementsByTagName("*");
        for (var s = 0; s < o.length; s++) {
            var n = o.item(s);
            if (n.tagName == "IMG") {
                n.src = n.src
            }
            for (var r = 0; r < m.length; r++) {
                var q = m[r];
                var l = null;
                if (n.currentStyle) {
                    l = n.currentStyle[q]
                } else {
                    if (window.getComputedStyle) {
                        if (window.getComputedStyle.getPropertyValue) {
                            l = window.getComputedStyle(n, null).getPropertyValue(q)
                        } else {
                            l = window.getComputedStyle(n)[q]
                        }
                    }
                }
                if (l) {
                    n.style[q] = l
                }
            }
        }
    }
    function c(m, l) {
        if (!l) {
            m.documents = h(m)
        }
        if (m.footer && m.footer.html.innerHTML) {
            b(m.footer.html);
            m.footer.html = m.footer.html.innerHTML
        }
        if (m.header && m.header.html.innerHTML) {
            b(m.header.html);
            m.header.html = m.header.html.innerHTML
        }
        return m
    }
    function h(o) {
        var n = o.documents,
        l = null;
        if (typeof(n.push) != "undefined") {
            l = [];
            for (var m = 0; m < n.length; m++) {
                l.push(j(n[m], o))
            }
            return l
        } else {
            return j(n, o)
        }
    }
    function k(m) {
        var l = "<html><head><style>" + a(m.ownerDocument) + "</style></head><body>" + i(m.ownerDocument, m) + "</body></html>";
        return l
    }
    function d(m) {
        var l = "<html><head><base href='" + m.URL + "'/><style>" + a(m) + "</style></head><body>" + m.body.innerHTML + "</body></html>";
        return l
    }
    function f() {
        var l = document.getElementById("ojatoolsPrinter");
        if (l) {
            return l.getAttribute("license") || ""
        }
        return ""
    }
    return ({
        proxy: g || null,
        crx: !g,
        activex: g && g.tagName == "OBJECT",
        npapi: g && g.tagName == "EMBED",
        extension: "jpnmbckmknckdkijflpiigdmfedhglnl",
        callbacks: [],
        eventIndex: 0,
        initialize: function() {
            var l = this;
            if (!g) {
                this.sendMessage({
                    method: "new",
                    lic: f()
                });
                window.addEventListener("message",
                function(m) {
                    l.callbacks[m.data.event].apply(null, m.data.params || [m.data.data])
                })
            }
            return this
        },
        isInstalled: function(m) {
            var l = false;
            if (this.proxy) {
                m(typeof this.proxy.printPreview != "undefined")
            } else {
                this.sendMessage({
                    method: "isInstalled"
                },
                m)
            }
        },
        registerCallback: function(m) {
            if (m) {
                var l = "event-" + this.eventIndex++;
                this.callbacks[l] = m;
                return l
            } else {
                return ""
            }
        },
        emptyCallback: function() {},
        sendMessage: function(l, m) {
            chrome.runtime.sendMessage(this.extension, l, m || this.emptyCallback)
        },
        about: function() {
            this.proxy ? this.proxy.about() : this.sendMessage({
                method: "about"
            })
        },
        exit: function() {
            this.sendMessage({
                method: "exit"
            });
            alert("exit")
        },
        getPrinters: function(l) {
            if (this.proxy) { (l || this.nothing).call(this, this.proxy.getPrinters())
            } else {
                this.sendMessage({
                    method: "getPrinters",
                    event: this.registerCallback(l)
                })
            }
        },
        getPapers: function(l, m) {
            if (this.proxy) { (m || this.nothing).call(this, this.proxy.getPapers(l))
            } else {
                this.sendMessage({
                    method: "getPapers",
                    params: [l],
                    event: this.registerCallback(m)
                })
            }
        },
        isCustomPaperSupported: function(l, m) {
            if (this.proxy) { (m || this.nothing).call(this, this.proxy.isCustomPaperSupported(l))
            } else {
                this.sendMessage({
                    method: "isCustomPaperSupported",
                    params: [l],
                    event: this.registerCallback(m)
                })
            }
        },
        registerMyDocListeners: function(o) {
            var m = ["done", "onState", "listener", "onPagePrinted"];
            for (var l = 0; l < m.length; l++) {
                var n = m[l];
                if (o[n]) {
                    o[n] = this.registerCallback(o[n]);
                    o._hasCallback = true
                }
            }
            if (o.dragDesigner && o.dragDesigner.ok) {
                o.dragDesigner.ok = this.registerCallback(o.dragDesigner.ok);
                o._hasCallback = true
            }
        },
        printPreview: function(n, l) {
            if (this.proxy) {
                if (this.proxy.tagName == "OBJECT") {
                    this.proxy.printPreview(n, l ? true: false);
                    return;
                    var m = this;
                    ___loadDocuments(n,
                    function() {
                        m.proxy.printPreview(n, l ? true: false)
                    })
                } else {
                    this.proxy.printPreview(n, l ? true: false)
                }
            } else {
                n = c(n);
                this.registerMyDocListeners(n);
                this.sendMessage({
                    method: "printPreview",
                    params: [n, l ? true: false]
                })
            }
        },
        print: function(n, l) {
            n = c(n, this.activex);
            if (this.proxy) {
                if (this.proxy.tagName == "OBJECT") {
                    this.proxy.print(n, l ? true: false);
                    return;
                    var m = this;
                    ___loadDocuments(n,
                    function() {
                        m.proxy.print(n, l ? true: false)
                    })
                } else {
                    this.proxy.print(n, l ? true: false)
                }
            } else {
                this.registerMyDocListeners(n);
                this.sendMessage({
                    method: "print",
                    params: [n, l ? true: false]
                })
            }
        },
        isExcelInstalled: function(l) {
            if (this.proxy) { (l || this.nothing).call(this, this.proxy.isExcelInstalled())
            } else {
                this.sendMessage({
                    method: "isExcelInstalled",
                    event: this.registerCallback(l)
                })
            }
        },
        getDefaultPrinter: function(l) {
            if (this.proxy) { (l || this.nothing).call(this, this.proxy.getDefaultPrinter())
            } else {
                this.sendMessage({
                    method: "getDefaultPrinter",
                    event: this.registerCallback(l)
                })
            }
        },
        getVersion: function(l) {
            if (this.proxy) { (l || this.nothing).call(this, this.proxy.getVersion())
            } else {
                this.sendMessage({
                    method: "getVersion",
                    event: this.registerCallback(l)
                })
            }
        },
        isImplemented: function(m, l) {
            if (this.proxy) { (l || this.nothing).call(this, this.proxy.isImplemented(m))
            } else {
                this.sendMessage({
                    method: "isImplemented",
                    params: [m],
                    event: this.registerCallback(l)
                })
            }
        },
        getLocalMacAddress: function(l) {
            if (this.proxy) { (l || this.nothing).call(this, this.proxy.getLocalMacAddress())
            } else {
                this.sendMessage({
                    method: "getLocalMacAddress",
                    event: this.registerCallback(l)
                })
            }
        },
        getCPUSerialNo: function(l) {
            if (this.proxy) { (l || this.nothing).call(this, this.proxy.getCPUSerialNo())
            } else {
                this.sendMessage({
                    method: "getCPUSerialNo",
                    event: this.registerCallback(l)
                })
            }
        },
        setOffsetPage: function(l, m) {
            if (this.proxy) { (m || this.nothing).call(this, this.proxy.setOffsetPage(l))
            } else {
                this.sendMessage({
                    method: "setOffsetPage",
                    params: [l],
                    event: this.registerCallback(m)
                })
            }
        },
        isPrintableFileType: function(l, m) {
            if (this.proxy) { (m || this.nothing).call(this, this.proxy.isPrintableFileType(l))
            } else {
                this.sendMessage({
                    method: "isPrintableFileType",
                    params: [l],
                    event: this.registerCallback(m)
                })
            }
        },
        setDragCSS: function(m, l, n) {
            if (this.proxy) { (n || this.nothing).call(this, this.proxy.setDragCSS(m, l))
            } else {
                this.sendMessage({
                    method: "setDragCSS",
                    params: [m, l],
                    event: this.registerCallback(n)
                })
            }
        },
        clearLastSettings: function(l, m) {
            if (this.proxy) { (m || this.nothing).call(this, this.proxy.clearLastSettings(l))
            } else {
                this.sendMessage({
                    method: "clearLastSettings",
                    params: [l],
                    event: this.registerCallback(m)
                })
            }
        },
        printTIFF: function(l, n, m, o) {
            if (this.proxy) { (o || this.nothing).call(this, this.proxy.printTIFF(l, n, m))
            } else {
                this.sendMessage({
                    method: "printTIFF",
                    params: [l, n, m],
                    event: this.registerCallback(o)
                })
            }
        },
        printDocument: function(l, m, n) { ! m && (m = {});
            if (this.proxy) { (n || this.nothing).call(this, this.proxy.printDocument(l, m))
            } else {
                this.sendMessage({
                    method: "printDocument",
                    params: [l, m],
                    event: this.registerCallback(n)
                })
            }
        },
        exportAsImage: function(m, p, r) {
            if (this.proxy) { (r || this.nothing).call(this, this.proxy.exportAsImage(m, p))
            } else {
                var q = m.id;
                var n = m.ownerDocument;
                var o = m.id = "tmp" + new Date().getTime();
                var l = d(n);
                m.id = q;
                this.sendMessage({
                    method: "exportAsImage",
                    params: [{
                        html: l,
                        element: o
                    },
                    p],
                    event: this.registerCallback(r)
                })
            }
        },
        exportAsExcel: function(l, n, o, p) {
            if (this.proxy) { (p || this.nothing).call(this, this.proxy.exportAsExcel(l, n, o))
            } else {
                var m = k(l);
                this.sendMessage({
                    method: "exportAsExcel",
                    params: [m, n, o],
                    event: this.registerCallback(p)
                })
            }
        },
        setupNormalOffset: function(l, m) {
            if (this.proxy) { (m || this.nothing).call(this, this.proxy.setupNormalOffset(l))
            } else {
                this.sendMessage({
                    method: "setupNormalOffset",
                    params: [l],
                    event: this.registerCallback(m)
                })
            }
        },
        download: function(l, m, n) {
            if (this.proxy) { (n || this.nothing).call(this, this.proxy.download(l, m))
            } else {
                this.sendMessage({
                    method: "download",
                    params: [l, m],
                    event: this.registerCallback(n)
                })
            }
        },
        printToImage: function(m, l, n) {
            m = c(m, this.activex);
            if (this.proxy) { (n || this.nothing).call(this, this.proxy.printToImage(m, l))
            } else {
                this.registerMyDocListeners(m);
                this.sendMessage({
                    method: "printToImage",
                    params: [m, l],
                    event: this.registerCallback(n)
                })
            }
        },
        printToPDF: function(m, l, n) {
            m = c(m, this.activex);
            if (this.proxy) { (n || this.nothing).call(this, this.proxy.printToPDF(m, l))
            } else {
                this.registerMyDocListeners(m);
                this.sendMessage({
                    method: "printToPDF",
                    params: [m, l],
                    event: this.registerCallback(n)
                })
            }
        },
        liveUpdate: function(m, l, n) {
            if (this.proxy) { (n || this.nothing).call(this, this.proxy.liveUpdate(m, l))
            } else {
                this.sendMessage({
                    method: "liveUpdate",
                    params: [m, l],
                    event: this.registerCallback(n)
                })
            }
        },
        getFonts: function(l) {
            if (this.proxy) { (l || this.nothing).call(this, this.proxy.getFonts())
            } else {
                this.sendMessage({
                    method: "getFonts",
                    event: this.registerCallback(l)
                })
            }
        },
        copy: function(l, m, n) {
            if (this.proxy) { (n || this.nothing).call(this, this.proxy.copy(l, m))
            } else {
                this.sendMessage({
                    method: "copy",
                    params: [l, m],
                    event: this.registerCallback(n)
                })
            }
        },
        copied: function(l, m) {
            if (this.proxy) { (m || this.nothing).call(this, this.proxy.copied(l || ""))
            } else {
                this.sendMessage({
                    method: "copied",
                    params: [l],
                    event: this.registerCallback(m)
                })
            }
        },
        writeString: function(l, m, n, o) {
            if (this.proxy) { (o || this.nothing).call(this, this.proxy.writeString(l, m, n))
            } else {
                this.sendMessage({
                    method: "writeString",
                    params: [l, m, n],
                    event: this.registerCallback(o)
                })
            }
        },
        writeBase64: function(l, m, n) {
            if (this.proxy) { (n || this.nothing).call(this, this.proxy.writeBase64(l, m))
            } else {
                this.sendMessage({
                    method: "writeBase64",
                    params: [l, m],
                    event: this.registerCallback(n)
                })
            }
        },
        readString: function(l, m, n) {
            if (this.proxy) { (n || this.nothing).call(this, this.proxy.readString(l, m))
            } else {
                this.sendMessage({
                    method: "readString",
                    params: [l, m],
                    event: this.registerCallback(n)
                })
            }
        },
        readBase64: function(l, m) {
            if (this.proxy) { (m || this.nothing).call(this, this.proxy.readBase64(l))
            } else {
                this.sendMessage({
                    method: "readBase64",
                    params: [l],
                    event: this.registerCallback(m)
                })
            }
        },
        readHTML: function(m, l, n) {
            if (this.proxy) { (n || this.nothing).call(this, this.proxy.readHTML(m, l))
            } else {
                this.sendMessage({
                    method: "readHTML",
                    params: [m, l],
                    event: this.registerCallback(n)
                })
            }
        },
        chooseFile: function(m, n, l, o) {
            if (this.proxy) { (o || this.nothing).call(this, this.proxy.chooseFile(m, n, l))
            } else {
                this.sendMessage({
                    method: "chooseFile",
                    params: [m, n, l],
                    event: this.registerCallback(o)
                })
            }
        },
        showPageSetupDialog: function(l) {
            if (this.proxy) { (l || this.nothing).call(this, this.proxy.showPageSetupDialog())
            } else {
                this.sendMessage({
                    method: "showPageSetupDialog",
                    event: this.registerCallback(l)
                })
            }
        },
        getLastSettings: function(l, m) {
            if (this.proxy) { (m || this.nothing).call(this, this.proxy.getLastSettings(l))
            } else {
                this.sendMessage({
                    method: "getLastSettings",
                    params: [l],
                    event: this.registerCallback(m)
                })
            }
        },
        getAbsoluteURL: function(l, m, n) {
            if (this.proxy) { (n || this.nothing).call(this, this.proxy.getAbsoluteURL(l, m))
            } else {
                this.sendMessage({
                    method: "getAbsoluteURL",
                    params: [l, m],
                    event: this.registerCallback(n)
                })
            }
        },
        setLastSettings: function(l, m, n) {
            if (this.proxy) { (n || this.nothing).call(this, this.proxy.setLastSettings(l, m))
            } else {
                this.sendMessage({
                    method: "setLastSettings",
                    params: [l, m],
                    event: this.registerCallback(n)
                })
            }
        },
        setDefaultPrinter: function(l, m) {
            if (this.proxy) { (m || this.nothing).call(this, this.proxy.setDefaultPrinter(l))
            } else {
                this.sendMessage({
                    method: "setDefaultPrinter",
                    params: [l],
                    event: this.registerCallback(m)
                })
            }
        },
        openFile: function(l, m) {
            if (this.proxy) { (m || this.nothing).call(this, this.proxy.openFile(l))
            } else {
                this.sendMessage({
                    method: "openFile",
                    params: [l],
                    event: this.registerCallback(m)
                })
            }
        },
        getPrinterInfo: function(l, m) {
            if (this.proxy) { (m || this.nothing).call(this, this.proxy.getPrinterInfo(l))
            } else {
                this.sendMessage({
                    method: "getPrinterInfo",
                    params: [l],
                    event: this.registerCallback(m)
                })
            }
        },
        getPrinterStatus: function(l, m, n) {
            if (this.proxy) { (n || this.nothing).call(this, this.proxy.getPrinterStatus(l, m))
            } else {
                this.sendMessage({
                    method: "getPrinterStatus",
                    params: [l, m],
                    event: this.registerCallback(n)
                })
            }
        },
        setCodeImage: function(s, t) {
            if (this.proxy) {
                return
            }
            var q = null;
            if (!s) {
                var r = document.querySelectorAll("embed[type$=jatoolsCoder]");
                if (r && r.length) {
                    var p = r[0];
                    var v = p.getAttribute("_code");
                    var m = p.getAttribute("_codestyle");
                    var u = document.createElement("img");
                    u.setAttribute("_code", v);
                    u.setAttribute("_codestyle", m);
                    u.setAttribute("style", p.getAttribute("style"));
                    var l = window.getComputedStyle(p, null);
                    u.style.width = l.getPropertyValue("width");
                    u.style.height = l.getPropertyValue("height");
                    p.parentNode.replaceChild(u, p)
                }
                q = (t || document).querySelectorAll("img[_code]")
            } else {
                q = [s]
            }
            if (q.length) {
                var w = [];
                for (var o = 0; o < q.length; o++) {
                    var n = q[o];
                    w.push({
                        width: n.offsetWidth,
                        height: n.offsetHeight,
                        code: n.getAttribute("_code"),
                        codestyle: n.getAttribute("_codestyle")
                    })
                }
                this.sendMessage({
                    method: "getCodeData",
                    params: [w],
                    event: this.registerCallback(function(y) {
                        for (var x = 0; x < y.length; x++) {
                            q[x].style.width = "";
                            q[x].style.height = "";
                            q[x].src = y[x]
                        }
                    })
                })
            }
        },
        nothing: function() {},
        setPrintBackground: function(l, m) {
            if (this.proxy) { (m || this.nothing).call(this, this.proxy.setPrintBackground(l))
            } else {
                this.sendMessage({
                    method: "setPrintBackground",
                    params: [l],
                    event: this.registerCallback(m)
                })
            }
        }
    }).initialize()
}
var _jp = null;
function getJatoolsPrinter(b) {
    if (!_jp) {
        var b = b || document;
        var a = navigator.userAgent.match(/(msie\s|trident.*rv:)([\w.]+)/i) ? b.getElementById("ojatoolsPrinter") : b.getElementById("ejatoolsPrinter");
        _jp = new JP(a)
    }
    return _jp
}
function isChrome45() {
    var b = navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./);
    if (b) {
        var a = parseInt(b[2], 10);
        if (a >= 35) {
            return true
        }
    }
    return false
}
function declareJatoolsPrinter(b) {
    b = b || document;
    var a = '<object id="ojatoolsPrinter" codebase="jatoolsPrinter.cab#version=5,4,0,0" classid="clsid:B43D3361-D075-4BE2-87FE-057188254255" width="0" height="0">';
    if (!isChrome45()) {
        a += '<embed id="ejatoolsPrinter" type="application/x-vnd.jatoolsPrinter" width="0" height="0" />'
    }
    a += "</object>";
    b.writeln(a)
}
isChrome45() && window.addEventListener("load",
function() {
    _jp = new JP();
    _jp.isInstalled(function(a) {
        if (!a) {
            alert("未安装！")
        } else {
            _jp.setCodeImage()
        }
    })
},
false);