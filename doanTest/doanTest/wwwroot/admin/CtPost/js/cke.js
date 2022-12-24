if (window.CKEDITOR || (window.CKEDITOR = function() {
        var t = /(^|.*[\\\/])ckeditor\.js(?:\?.*|;.*)?$/i,
            n = {
                timestamp: "",
                version: "%VERSION%",
                revision: "%REV%",
                rnd: Math.floor(900 * Math.random()) + 100,
                _: { pending: [], basePathSrcPattern: t },
                status: "unloaded",
                basePath: function() {
                    var n = window.CKEDITOR_BASEPATH || "",
                        r, i, u;
                    if (!n)
                        for (r = document.getElementsByTagName("script"), i = 0; i < r.length; i++)
                            if (u = r[i].src.match(t), u) { n = u[1]; break }
                    if (-1 == n.indexOf(":/") && "//" != n.slice(0, 2) && (n = 0 === n.indexOf("/") ? location.href.match(/^.*?:\/\/[^\/]*/)[0] + n : location.href.match(/^[^\?]*\/(?:)/)[0] + n), !n) throw 'The CKEditor installation path could not be automatically detected. Please set the global variable "CKEDITOR_BASEPATH" before creating editor instances.';
                    return n
                }(),
                getUrl: function(n) { return -1 == n.indexOf(":/") && 0 !== n.indexOf("/") && (n = this.basePath + n), this.timestamp && "/" != n.charAt(n.length - 1) && !/[&?]t=/.test(n) && (n += (0 <= n.indexOf("?") ? "&" : "?") + "t=" + this.timestamp), n },
                domReady: function() {
                    function n() { try { document.addEventListener ? (document.removeEventListener("DOMContentLoaded", n, !1), i()) : document.attachEvent && "complete" === document.readyState && (document.detachEvent("onreadystatechange", n), i()) } catch (t) {} }

                    function i() { for (var n; n = t.shift();) n() }
                    var t = [];
                    return function(i) {
                        if (t.push(i), "complete" === document.readyState && setTimeout(n, 1), 1 == t.length)
                            if (document.addEventListener) document.addEventListener("DOMContentLoaded", n, !1), window.addEventListener("load", n, !1);
                            else if (document.attachEvent) {
                            document.attachEvent("onreadystatechange", n);
                            window.attachEvent("onload", n);
                            i = !1;
                            try { i = !window.frameElement } catch (u) {}
                            if (document.documentElement.doScroll && i) {
                                var r = function() {
                                    try { document.documentElement.doScroll("left") } catch (t) { setTimeout(r, 1); return }
                                    n()
                                };
                                r()
                            }
                        }
                    }
                }()
            },
            i = window.CKEDITOR_GETURL,
            r;
        return i && (r = n.getUrl, n.getUrl = function(t) { return i.call(n, t) || r.call(n, t) }), n
    }()), CKEDITOR.loader) CKEDITOR.loader.load("ckeditor");
else if (CKEDITOR._autoLoad = "ckeditor", document.body && (!document.readyState || document.readyState == "complete")) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = CKEDITOR.getUrl("core/loader.js");
    document.body.appendChild(script)
} else document.write('<script type="text/javascript" src="' + CKEDITOR.getUrl("core/loader.js") + '"><\/script>');
CKEDITOR.skinName = "moono-lisa"