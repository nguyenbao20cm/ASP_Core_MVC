var Codebase, hljs;
(function(n) {
    n.fn.extend({
        slimScroll: function(i) {
            var r = n.extend({ width: "auto", height: "250px", size: "7px", color: "#000", position: "right", distance: "1px", start: "top", opacity: .4, alwaysVisible: !1, disableFadeOut: !1, railVisible: !1, railColor: "#333", railOpacity: .2, railDraggable: !0, railClass: "slimScrollRail", barClass: "slimScrollBar", wrapperClass: "slimScrollDiv", allowPageScroll: !1, wheelStep: 20, touchScrollStep: 200, borderRadius: "7px", railBorderRadius: "7px" }, i);
            return this.each(function() {
                function p(t) {
                    if (v) {
                        t = t || window.event;
                        var i = 0;
                        t.wheelDelta && (i = -t.wheelDelta / 120);
                        t.detail && (i = t.detail / 3);
                        n(t.target || t.srcTarget || t.srcElement).closest("." + r.wrapperClass).is(u.parent()) && h(i, !0);
                        t.preventDefault && !s && t.preventDefault();
                        s || (t.returnValue = !1)
                    }
                }

                function h(n, t, i) {
                    s = !1;
                    var e = u.outerHeight() - f.outerHeight();
                    t && (t = parseInt(f.css("top")) + n * parseInt(r.wheelStep) / 100 * f.outerHeight(), t = Math.min(Math.max(t, 0), e), t = 0 < n ? Math.ceil(t) : Math.floor(t), f.css({ top: t + "px" }));
                    o = parseInt(f.css("top")) / (u.outerHeight() - f.outerHeight());
                    t = o * (u[0].scrollHeight - u.outerHeight());
                    i && (t = n, n = t / u[0].scrollHeight * u.outerHeight(), n = Math.min(Math.max(n, 0), e), f.css({ top: n + "px" }));
                    u.scrollTop(t);
                    u.trigger("slimscrolling", ~~t);
                    b();
                    l()
                }

                function w() {
                    y = Math.max(u.outerHeight() / u[0].scrollHeight * u.outerHeight(), 30);
                    f.css({ height: y + "px" });
                    var n = y == u.outerHeight() ? "none" : "block";
                    f.css({ display: n })
                }

                function b() {
                    w();
                    clearTimeout(nt);
                    o == ~~o ? (s = r.allowPageScroll, tt != o && u.trigger("slimscroll", 0 == ~~o ? "top" : "bottom")) : s = !1;
                    tt = o;
                    y >= u.outerHeight() ? s = !0 : (f.stop(!0, !0).fadeIn("fast"), r.railVisible && c.stop(!0, !0).fadeIn("fast"))
                }

                function l() { r.alwaysVisible || (nt = setTimeout(function() { r.disableFadeOut && v || k || d || (f.fadeOut("slow"), c.fadeOut("slow")) }, 1e3)) }
                var v, k, d, nt, g, y, o, tt, s = !1,
                    u = n(this),
                    e;
                if (u.parent().hasClass(r.wrapperClass)) {
                    var a = u.scrollTop(),
                        f = u.siblings("." + r.barClass),
                        c = u.siblings("." + r.railClass);
                    if (w(), n.isPlainObject(i)) {
                        if ("height" in i && "auto" == i.height ? (u.parent().css("height", "auto"), u.css("height", "auto"), e = u.parent().parent().height(), u.parent().css("height", e), u.css("height", e)) : "height" in i && (e = i.height, u.parent().css("height", e), u.css("height", e)), "scrollTo" in i) a = parseInt(r.scrollTo);
                        else if ("scrollBy" in i) a += parseInt(r.scrollBy);
                        else if ("destroy" in i) {
                            f.remove();
                            c.remove();
                            u.unwrap();
                            return
                        }
                        h(a, !1, !0)
                    }
                } else if (!(n.isPlainObject(i) && "destroy" in i)) {
                    r.height = "auto" == r.height ? u.parent().height() : r.height;
                    a = n("<div><\/div>").addClass(r.wrapperClass).css({ position: "relative", overflow: "hidden", width: r.width, height: r.height });
                    u.css({ overflow: "hidden", width: r.width, height: r.height });
                    var c = n("<div><\/div>").addClass(r.railClass).css({ width: r.size, height: "100%", position: "absolute", top: 0, display: r.alwaysVisible && r.railVisible ? "block" : "none", "border-radius": r.railBorderRadius, background: r.railColor, opacity: r.railOpacity, zIndex: 90 }),
                        f = n("<div><\/div>").addClass(r.barClass).css({ background: r.color, width: r.size, position: "absolute", top: 0, opacity: r.opacity, display: r.alwaysVisible ? "block" : "none", "border-radius": r.borderRadius, BorderRadius: r.borderRadius, MozBorderRadius: r.borderRadius, WebkitBorderRadius: r.borderRadius, zIndex: 99 }),
                        e = "right" == r.position ? { right: r.distance } : { left: r.distance };
                    c.css(e);
                    f.css(e);
                    u.wrap(a);
                    u.parent().append(f);
                    u.parent().append(c);
                    r.railDraggable && f.bind("mousedown", function(i) {
                        var r = n(document);
                        return d = !0, t = parseFloat(f.css("top")), pageY = i.pageY, r.bind("mousemove.slimscroll", function(n) {
                            currTop = t + n.pageY - pageY;
                            f.css("top", currTop);
                            h(0, f.position().top, !1)
                        }), r.bind("mouseup.slimscroll", function() {
                            d = !1;
                            l();
                            r.unbind(".slimscroll")
                        }), !1
                    }).bind("selectstart.slimscroll", function(n) { return n.stopPropagation(), n.preventDefault(), !1 });
                    c.hover(function() { b() }, function() { l() });
                    f.hover(function() { k = !0 }, function() { k = !1 });
                    u.hover(function() {
                        v = !0;
                        b();
                        l()
                    }, function() {
                        v = !1;
                        l()
                    });
                    u.bind("touchstart", function(n) { n.originalEvent.touches.length && (g = n.originalEvent.touches[0].pageY) });
                    u.bind("touchmove", function(n) {
                        s || n.originalEvent.preventDefault();
                        n.originalEvent.touches.length && (h((g - n.originalEvent.touches[0].pageY) / r.touchScrollStep, !0), g = n.originalEvent.touches[0].pageY)
                    });
                    w();
                    "bottom" === r.start ? (f.css({ top: u.outerHeight() - f.outerHeight() }), h(0, !0)) : "top" !== r.start && (h(n(r.start).position().top, null, !0), r.alwaysVisible || f.hide());
                    window.addEventListener ? (this.addEventListener("DOMMouseScroll", p, !1), this.addEventListener("mousewheel", p, !1)) : document.attachEvent("onmousewheel", p)
                }
            }), this
        }
    });
    n.fn.extend({ slimscroll: n.fn.slimScroll })
})(jQuery),
function(n) { typeof define == "function" && define.amd ? define(["jquery"], n) : n(jQuery) }(function(n) {
    "use strict";
    var i = { space: 32, pageup: 33, pagedown: 34, end: 35, home: 36, up: 38, down: 40 },
        r = function(t, i) {
            var u = i.scrollTop(),
                h = i.prop("scrollHeight"),
                c = i.prop("clientHeight"),
                f = t.originalEvent.wheelDelta || -1 * t.originalEvent.detail || -1 * t.originalEvent.deltaY,
                r = 0,
                e, o, s;
            return t.type === "wheel" ? (e = i.height() / n(window).height(), r = t.originalEvent.deltaY * e) : this.options.touch && t.type === "touchmove" && (f = t.originalEvent.changedTouches[0].clientY - this.startClientY), s = (o = f > 0 && u + r <= 0) || f < 0 && u + r >= h - c, { prevent: s, top: o, scrollTop: u, deltaY: r }
        },
        u = function(n, t) {
            var u = t.scrollTop(),
                r = { top: !1, bottom: !1 },
                f, e;
            return r.top = u === 0 && (n.keyCode === i.pageup || n.keyCode === i.home || n.keyCode === i.up), r.top || (f = t.prop("scrollHeight"), e = t.prop("clientHeight"), r.bottom = f === u + e && (n.keyCode === i.space || n.keyCode === i.pagedown || n.keyCode === i.end || n.keyCode === i.down)), r
        },
        t = function(i, r) {
            if (this.$element = i, this.options = n.extend({}, t.DEFAULTS, this.$element.data(), r), this.enabled = !0, this.startClientY = 0, this.options.unblock) this.$element.on(t.CORE.wheelEventName + t.NAMESPACE, this.options.unblock, n.proxy(t.CORE.unblockHandler, this));
            this.$element.on(t.CORE.wheelEventName + t.NAMESPACE, this.options.selector, n.proxy(t.CORE.handler, this));
            if (this.options.touch) {
                this.$element.on("touchstart" + t.NAMESPACE, this.options.selector, n.proxy(t.CORE.touchHandler, this));
                this.$element.on("touchmove" + t.NAMESPACE, this.options.selector, n.proxy(t.CORE.handler, this));
                if (this.options.unblock) this.$element.on("touchmove" + t.NAMESPACE, this.options.unblock, n.proxy(t.CORE.unblockHandler, this))
            }
            if (this.options.keyboard) {
                this.$element.attr("tabindex", this.options.keyboard.tabindex || 0);
                this.$element.on("keydown" + t.NAMESPACE, this.options.selector, n.proxy(t.CORE.keyboardHandler, this));
                if (this.options.unblock) this.$element.on("keydown" + t.NAMESPACE, this.options.unblock, n.proxy(t.CORE.unblockHandler, this))
            }
        },
        f;
    t.NAME = "ScrollLock";
    t.VERSION = "3.1.2";
    t.NAMESPACE = ".scrollLock";
    t.ANIMATION_NAMESPACE = t.NAMESPACE + ".effect";
    t.DEFAULTS = { strict: !1, strictFn: function(n) { return n.prop("scrollHeight") > n.prop("clientHeight") }, selector: !1, animation: !1, touch: "ontouchstart" in window, keyboard: !1, unblock: !1 };
    t.CORE = {
        wheelEventName: "onwheel" in document.createElement("div") ? "wheel" : document.onmousewheel !== undefined ? "mousewheel" : "DOMMouseScroll",
        animationEventName: ["webkitAnimationEnd", "mozAnimationEnd", "MSAnimationEnd", "oanimationend", "animationend"].join(t.ANIMATION_NAMESPACE + " ") + t.ANIMATION_NAMESPACE,
        unblockHandler: function(n) { n.__currentTarget = n.currentTarget },
        handler: function(i) {
            var f, u, e;
            this.enabled && !i.ctrlKey && (f = n(i.currentTarget), (this.options.strict !== !0 || this.options.strictFn(f)) && (i.stopPropagation(), u = n.proxy(r, this)(i, f), i.__currentTarget && (u.prevent &= n.proxy(r, this)(i, n(i.__currentTarget)).prevent), u.prevent && (i.preventDefault(), u.deltaY && f.scrollTop(u.scrollTop + u.deltaY), e = u.top ? "top" : "bottom", this.options.animation && setTimeout(t.CORE.animationHandler.bind(this, f, e), 0), f.trigger(n.Event(e + t.NAMESPACE)))))
        },
        touchHandler: function(n) { this.startClientY = n.originalEvent.touches[0].clientY },
        animationHandler: function(n, i) {
            var r = this.options.animation[i],
                u = this.options.animation.top + " " + this.options.animation.bottom;
            n.off(t.ANIMATION_NAMESPACE).removeClass(u).addClass(r).one(t.CORE.animationEventName, function() { n.removeClass(r) })
        },
        keyboardHandler: function(i) {
            var r = n(i.currentTarget),
                o = r.scrollTop(),
                f = u(i, r),
                e;
            return (i.__currentTarget && (e = u(i, n(i.__currentTarget)), f.top &= e.top, f.bottom &= e.bottom), f.top) ? (r.trigger(n.Event("top" + t.NAMESPACE)), this.options.animation && setTimeout(t.CORE.animationHandler.bind(this, r, "top"), 0), !1) : f.bottom ? (r.trigger(n.Event("bottom" + t.NAMESPACE)), this.options.animation && setTimeout(t.CORE.animationHandler.bind(this, r, "bottom"), 0), !1) : void 0
        }
    };
    t.prototype.toggleStrict = function() { this.options.strict = !this.options.strict };
    t.prototype.enable = function() { this.enabled = !0 };
    t.prototype.disable = function() { this.enabled = !1 };
    t.prototype.destroy = function() {
        this.disable();
        this.$element.off(t.NAMESPACE);
        this.$element = null;
        this.options = null
    };
    f = n.fn.scrollLock;
    n.fn.scrollLock = function(i) {
        return this.each(function() {
            var u = n(this),
                f = typeof i == "object" && i,
                r = u.data(t.NAME);
            (r || "destroy" !== i) && (r || u.data(t.NAME, r = new t(u, f)), typeof i == "string" && r[i]())
        })
    };
    n.fn.scrollLock.defaults = t.DEFAULTS;
    n.fn.scrollLock.noConflict = function() { return n.fn.scrollLock = f, this }
});
Codebase = function() {
    var s, p, n, h, t, c, u, l, w, b, k, a, d, i, tt = function() {
            s = jQuery("html");
            p = jQuery("body");
            n = jQuery("#page-container");
            h = jQuery("#sidebar");
            t = jQuery("#sidebar-scroll");
            c = jQuery("#side-overlay");
            u = jQuery("#side-overlay-scroll");
            l = jQuery("#page-header");
            w = jQuery("#page-header-search");
            b = jQuery("#page-header-search-input");
            k = jQuery("#page-header-loader");
            a = jQuery("#main-container");
            d = jQuery("#page-footer")
        },
        o = function(r) {
            if (i = y(), r === "init") {
                var f;
                jQuery(window).off("resize.cb.scroll orientationchange.cb.scroll");
                jQuery(window).on("resize.cb.scroll orientationchange.cb.scroll", function() {
                    clearTimeout(f);
                    f = setTimeout(function() { o() }, 150)
                }).triggerHandler("resize.cb.scroll")
            } else i > 991 && n.hasClass("side-scroll") ? (jQuery(h).add(c).scrollLock("disable"), t.length && !t.parent(".slimScrollDiv").length ? (t.slimScroll({ height: h.outerHeight(), color: "#cdcdcd", size: "4px", opacity: .9, wheelStep: 15, distance: "0", railVisible: !1, railOpacity: 1 }), t.mouseover()) : (t.add(t.parent()).css("height", h.outerHeight()), t.mouseover()), u.length && !u.parent(".slimScrollDiv").length ? u.slimScroll({ height: c.outerHeight(), color: "#cdcdcd", size: "4px", opacity: .9, wheelStep: 15, distance: "0", railVisible: !1, railOpacity: 1 }) : u.add(u.parent()).css("height", c.outerHeight())) : (jQuery(h).add(c).scrollLock("enable"), t.length && t.parent(".slimScrollDiv").length && (t.slimScroll({ destroy: !0 }), t.attr("style", "")), u.length && u.parent(".slimScrollDiv").length && (u.slimScroll({ destroy: !0 }), u.attr("style", "")))
        },
        f = function() {
            var t;
            jQuery(window).off("resize.cb.main orientationchange.cb.main");
            a.length && jQuery(window).on("resize.cb.main orientationchange.cb.main", function() {
                clearTimeout(t);
                t = setTimeout(function() {
                    var t = jQuery(window).height(),
                        r = l.outerHeight() || 0,
                        i = d.outerHeight() || 0;
                    n.hasClass("page-header-fixed") || n.hasClass("page-header-glass") ? a.css("min-height", t - i) : a.css("min-height", t - r - i);
                    d.fadeTo(1e3, 1)
                }, 150)
            }).triggerHandler("resize.cb.main");
            n.addClass("side-trans-enabled")
        },
        e = function() {
            jQuery(window).off("scroll.cb.header");
            n.hasClass("page-header-glass") && n.hasClass("page-header-fixed") && jQuery(window).on("scroll.cb.header", function() { jQuery(this).scrollTop() > 60 ? n.addClass("page-header-scroll") : n.removeClass("page-header-scroll") }).trigger("scroll.cb.header")
        },
        it = function() {
            n.off("click.cb.menu");
            n.on("click.cb.menu", '[data-toggle="nav-submenu"]', function() {
                var n = jQuery(this),
                    t = n.parent("li");
                return t.hasClass("open") ? t.removeClass("open") : (n.closest("ul").children("li").removeClass("open"), t.addClass("open")), s.hasClass("no-focus") && n.blur(), !1
            })
        },
        rt = function() {
            jQuery(".form-material.floating > .form-control").each(function() {
                var n = jQuery(this),
                    t = n.parent(".form-material");
                setTimeout(function() { n.val() && t.addClass("open") }, 150);
                n.off("change.cb.inputs").on("change.cb.inputs", function() { n.val() ? t.addClass("open") : t.removeClass("open") })
            })
        },
        ut = function() {
            var t = jQuery("#css-theme"),
                r = n.hasClass("enable-cookies") ? !0 : !1,
                i;
            r && (i = Cookies.get("cbThemeName") || !1, i && ft(t, i), t = jQuery("#css-theme"));
            jQuery('[data-toggle="theme"][data-theme="' + (t.length ? t.attr("href") : "default") + '"]').parent("li").addClass("active");
            n.off("click.cb.themes");
            n.on("click.cb.themes", '[data-toggle="theme"]', function() {
                var n = jQuery(this).data("theme");
                jQuery('[data-toggle="theme"]').parent("li").removeClass("active");
                jQuery('[data-toggle="theme"][data-theme="' + n + '"]').parent("li").addClass("active");
                ft(t, n);
                t = jQuery("#css-theme");
                r && Cookies.set("cbThemeName", n, { expires: 7 })
            })
        },
        ft = function(n, t) { t === "default" ? n.length && n.remove() : n.length ? n.attr("href", t) : jQuery("#css-main").after('<link rel="stylesheet" id="css-theme" href="' + t + '">') },
        r = function(t) {
            i = y();
            switch (t) {
                case "init":
                    n.off("click.cb.layout");
                    n.on("click.cb.layout", '[data-toggle="layout"]', function() {
                        var n = jQuery(this);
                        r(n.data("action"));
                        s.hasClass("no-focus") && n.blur()
                    });
                    break;
                case "sidebar_pos_toggle":
                    n.toggleClass("sidebar-r");
                    break;
                case "sidebar_pos_left":
                    n.removeClass("sidebar-r");
                    break;
                case "sidebar_pos_right":
                    n.addClass("sidebar-r");
                    break;
                case "sidebar_toggle":
                    i > 991 ? n.toggleClass("sidebar-o") : n.toggleClass("sidebar-o-xs");
                    break;
                case "sidebar_open":
                    i > 991 ? n.addClass("sidebar-o") : n.addClass("sidebar-o-xs");
                    break;
                case "sidebar_close":
                    i > 991 ? n.removeClass("sidebar-o") : n.removeClass("sidebar-o-xs");
                    break;
                case "sidebar_mini_toggle":
                    i > 991 && n.toggleClass("sidebar-mini");
                    break;
                case "sidebar_mini_on":
                    i > 991 && n.addClass("sidebar-mini");
                    break;
                case "sidebar_mini_off":
                    i > 991 && n.removeClass("sidebar-mini");
                    break;
                case "sidebar_style_inverse_toggle":
                    n.toggleClass("sidebar-inverse");
                    break;
                case "sidebar_style_inverse_on":
                    n.addClass("sidebar-inverse");
                    break;
                case "sidebar_style_inverse_off":
                    n.removeClass("sidebar-inverse");
                    break;
                case "side_overlay_toggle":
                    n.hasClass("side-overlay-o") ? r("side_overlay_close") : r("side_overlay_open");
                    break;
                case "side_overlay_open":
                    jQuery(document).on("keydown.cb.sideOverlay", function(n) { n.which === 27 && (n.preventDefault(), r("side_overlay_close")) });
                    n.addClass("side-overlay-o");
                    break;
                case "side_overlay_close":
                    jQuery(document).off("keydown.cb.sideOverlay");
                    n.removeClass("side-overlay-o");
                    break;
                case "side_overlay_hoverable_toggle":
                    n.toggleClass("side-overlay-hover");
                    break;
                case "side_overlay_hoverable_on":
                    n.addClass("side-overlay-hover");
                    break;
                case "side_overlay_hoverable_off":
                    n.removeClass("side-overlay-hover");
                    break;
                case "header_fixed_toggle":
                    n.toggleClass("page-header-fixed");
                    e();
                    f();
                    break;
                case "header_fixed_on":
                    n.addClass("page-header-fixed");
                    e();
                    f();
                    break;
                case "header_fixed_off":
                    n.removeClass("page-header-fixed");
                    e();
                    f();
                    break;
                case "header_style_modern":
                    n.removeClass("page-header-glass page-header-inverse").addClass("page-header-modern");
                    e();
                    f();
                    break;
                case "header_style_classic":
                    n.removeClass("page-header-glass page-header-modern");
                    e();
                    f();
                    break;
                case "header_style_glass":
                    n.removeClass("page-header-modern").addClass("page-header-glass");
                    e();
                    f();
                    break;
                case "header_style_inverse_toggle":
                    n.hasClass("page-header-modern") || n.toggleClass("page-header-inverse");
                    break;
                case "header_style_inverse_on":
                    n.hasClass("page-header-modern") || n.addClass("page-header-inverse");
                    break;
                case "header_style_inverse_off":
                    n.hasClass("page-header-modern") || n.removeClass("page-header-inverse");
                    break;
                case "header_search_on":
                    w.addClass("show");
                    b.focus();
                    jQuery(document).on("keydown.cb.header.search", function(n) { n.which === 27 && (n.preventDefault(), console.log("test"), r("header_search_off")) });
                    break;
                case "header_search_off":
                    w.removeClass("show");
                    b.blur();
                    jQuery(document).off("keydown.cb.header.search");
                    break;
                case "header_loader_on":
                    k.addClass("show");
                    break;
                case "header_loader_off":
                    k.removeClass("show");
                    break;
                case "side_scroll_toggle":
                    n.toggleClass("side-scroll");
                    o();
                    break;
                case "side_scroll_on":
                    n.addClass("side-scroll");
                    o();
                    break;
                case "side_scroll_off":
                    n.removeClass("side-scroll");
                    o();
                    break;
                case "content_layout_toggle":
                    n.hasClass("main-content-boxed") ? r("content_layout_narrow") : n.hasClass("main-content-narrow") ? r("content_layout_full_width") : r("content_layout_boxed");
                    break;
                case "content_layout_boxed":
                    n.removeClass("main-content-narrow").addClass("main-content-boxed");
                    break;
                case "content_layout_narrow":
                    n.removeClass("main-content-boxed").addClass("main-content-narrow");
                    break;
                case "content_layout_full_width":
                    n.removeClass("main-content-boxed main-content-narrow");
                default:
                    return !1
            }
        },
        v = function(t, i) {
            var e = "si si-size-fullscreen",
                o = "si si-size-actual",
                s = "si si-arrow-up",
                h = "si si-arrow-down",
                r, u, f;
            if (i === "init") {
                jQuery('[data-toggle="block-option"][data-action="fullscreen_toggle"]').each(function() {
                    var n = jQuery(this);
                    n.html('<i class="' + (jQuery(n).closest(".block").hasClass("block-mode-fullscreen") ? o : e) + '"><\/i>')
                });
                jQuery('[data-toggle="block-option"][data-action="content_toggle"]').each(function() {
                    var n = jQuery(this);
                    n.html('<i class="' + (n.closest(".block").hasClass("block-mode-hidden") ? h : s) + '"><\/i>')
                });
                n.off("click.cb.blocks");
                n.on("click.cb.blocks", '[data-toggle="block-option"]', function() { v(jQuery(this).closest(".block"), jQuery(this).data("action")) })
            } else if (r = t instanceof jQuery ? t : jQuery(t), r.length) {
                u = jQuery('[data-toggle="block-option"][data-action="fullscreen_toggle"]', r);
                f = jQuery('[data-toggle="block-option"][data-action="content_toggle"]', r);
                switch (i) {
                    case "fullscreen_toggle":
                        r.removeClass("block-mode-pinned").toggleClass("block-mode-fullscreen");
                        r.hasClass("block-mode-fullscreen") ? jQuery(r).scrollLock("enable") : jQuery(r).scrollLock("disable");
                        u.length && (r.hasClass("block-mode-fullscreen") ? jQuery("i", u).removeClass(e).addClass(o) : jQuery("i", u).removeClass(o).addClass(e));
                        break;
                    case "fullscreen_on":
                        r.removeClass("block-mode-pinned").addClass("block-mode-fullscreen");
                        jQuery(r).scrollLock("enable");
                        u.length && jQuery("i", u).removeClass(e).addClass(o);
                        break;
                    case "fullscreen_off":
                        r.removeClass("block-mode-fullscreen");
                        jQuery(r).scrollLock("disable");
                        u.length && jQuery("i", u).removeClass(o).addClass(e);
                        break;
                    case "content_toggle":
                        r.toggleClass("block-mode-hidden");
                        f.length && (r.hasClass("block-mode-hidden") ? jQuery("i", f).removeClass(s).addClass(h) : jQuery("i", f).removeClass(h).addClass(s));
                        break;
                    case "content_hide":
                        r.addClass("block-mode-hidden");
                        f.length && jQuery("i", f).removeClass(s).addClass(h);
                        break;
                    case "content_show":
                        r.removeClass("block-mode-hidden");
                        f.length && jQuery("i", f).removeClass(h).addClass(s);
                        break;
                    case "state_toggle":
                        r.toggleClass("block-mode-loading");
                        jQuery('[data-toggle="block-option"][data-action="state_toggle"][data-action-mode="demo"]', r).length && setTimeout(function() { r.removeClass("block-mode-loading") }, 2e3);
                        break;
                    case "state_loading":
                        r.addClass("block-mode-loading");
                        break;
                    case "state_normal":
                        r.removeClass("block-mode-loading");
                        break;
                    case "pinned_toggle":
                        r.removeClass("block-mode-fullscreen").toggleClass("block-mode-pinned");
                        break;
                    case "pinned_on":
                        r.removeClass("block-mode-fullscreen").addClass("block-mode-pinned");
                        break;
                    case "pinned_off":
                        r.removeClass("block-mode-pinned");
                        break;
                    case "close":
                        r.hide();
                        break;
                    case "open":
                        r.show();
                        break;
                    default:
                        return !1
                }
            }
        },
        y = function() { return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth },
        et = function() {
            jQuery('[data-toggle="class-toggle"]:not(.js-class-toggle-enabled)').on("click.cb.helpers.core", function() {
                var n = jQuery(this);
                n.addClass("js-class-toggle-enabled");
                jQuery(n.data("target").toString()).toggleClass(n.data("class").toString());
                s.hasClass("no-focus") && n.blur()
            })
        },
        ot = function() {
            jQuery('[data-toggle="scroll-to"]:not(.js-scroll-to-enabled)').on("click.cb.helpers.core", function(t) {
                t.stopPropagation();
                var i = jQuery(this),
                    r = i.data("target") || i.attr("href"),
                    u = i.data("speed") || 1e3,
                    f = l.length && n.hasClass("page-header-fixed") ? l.outerHeight() : 0;
                i.addClass("js-scroll-to-enabled");
                jQuery("html, body").animate({ scrollTop: jQuery(r).offset().top - f }, u)
            })
        },
        st = function() {
            var n = jQuery(".js-year-copy");
            if (n.length > 0) {
                var r = new Date,
                    t = r.getFullYear(),
                    i = n.html().length > 0 ? n.html() : t;
                parseInt(i) >= t ? n.html(t) : n.html(i + "-" + t.toString().substr(2, 2))
            }
        },
        ht = function() {
            jQuery('[data-toggle="tooltip"]:not(.js-tooltip-enabled)').add(".js-tooltip:not(.js-tooltip-enabled)").each(function() {
                var n = jQuery(this);
                n.addClass("js-tooltip-enabled");
                n.tooltip({ container: n.data("container") || "body", animation: n.data("animation") || !1 })
            })
        },
        ct = function() {
            jQuery('[data-toggle="popover"]:not(.js-popover-enabled)').add(".js-popover:not(.js-popover-enabled)").each(function() {
                var n = jQuery(this);
                n.addClass("js-popover-enabled");
                n.popover({ container: n.data("container") || "body", animation: n.data("animation") || !1, trigger: n.data("trigger") || "hover focus" })
            })
        },
        lt = function() {
            jQuery('[data-toggle="tabs"]:not(.js-tabs-enabled)').add(".js-tabs:not(.js-tabs-enabled)").each(function() {
                var n = jQuery(this);
                n.addClass("js-tabs-enabled");
                n.find("a").on("click.cb.helpers.core", function(n) {
                    n.preventDefault();
                    jQuery(this).tab("show")
                })
            })
        },
        at = function() {
            jQuery('[data-toggle="appear"]:not(.js-appear-enabled)').each(function() {
                i = y();
                var n = jQuery(this),
                    t = n.data("class") || "animated fadeIn",
                    r = n.data("offset") || 0,
                    u = s.hasClass("ie9") || i < 992 ? 0 : n.data("timeout") ? n.data("timeout") : 0;
                n.addClass("js-appear-enabled");
                n.appear(function() { setTimeout(function() { n.removeClass("invisible").addClass(t) }, u) }, { accY: r })
            })
        },
        vt = function() {
            jQuery('[data-toggle="countTo"]:not(.js-count-to-enabled)').each(function() {
                var n = jQuery(this),
                    t = n.data("after"),
                    i = n.data("before");
                n.addClass("js-count-to-enabled");
                n.appear(function() { n.countTo({ speed: n.data("speed") || 1500, refreshInterval: n.data("refresh-interval") || 15, onComplete: function() { t ? n.html(n.html() + t) : i && n.html(i + n.html()) } }) })
            })
        },
        yt = function() {
            jQuery('[data-toggle="slimscroll"]:not(.js-slimscroll-enabled)').each(function() {
                var n = jQuery(this);
                n.addClass("js-slimscroll-enabled");
                n.slimScroll({ height: n.data("height") || "200px", size: n.data("size") || "5px", position: n.data("position") || "right", color: n.data("color") || "#000", opacity: n.data("opacity") || ".25", distance: n.data("distance") || "0", alwaysVisible: n.data("always-visible") ? !0 : !1, railVisible: n.data("rail-visible") ? !0 : !1, railColor: n.data("rail-color") || "#999", railOpacity: n.data("rail-opacity") || .3 })
            })
        },
        g = function(n, t) { var i = jQuery("#page-loader"); return n === "show" ? i.length ? (t && i.removeClass().addClass(t), i.addClass("show")) : t ? p.prepend('<div id="page-loader" class="show ' + t + '"><\/div>') : p.prepend('<div id="page-loader" class="show"><\/div>') : n === "hide" && i.length && i.removeClass("show"), !1 },
        pt = function() {
            jQuery('[data-toggle="click-ripple"]:not(.js-click-ripple-enabled)').each(function() {
                var n = jQuery(this);
                n.addClass("js-click-ripple-enabled");
                n.css({ overflow: "hidden", position: "relative", "z-index": 1 });
                n.on("click.cb.helpers.core", function(t) {
                    var r = "click-ripple",
                        u, f, e, i;
                    n.children("." + r).length === 0 ? n.prepend('<span class="' + r + '"><\/span>') : n.children("." + r).removeClass("animate");
                    i = n.children("." + r);
                    i.height() || i.width() || (u = Math.max(n.outerWidth(), n.outerHeight()), i.css({ height: u, width: u }));
                    f = t.pageX - n.offset().left - i.width() / 2;
                    e = t.pageY - n.offset().top - i.height() / 2;
                    i.css({ top: e + "px", left: f + "px" }).addClass("animate")
                })
            })
        },
        wt = function() {
            var t = n.prop("class");
            n.prop("class", "");
            window.print();
            n.prop("class", t)
        },
        bt = function() {
            jQuery(".js-table-sections:not(.js-table-sections-enabled)").each(function() {
                var n = jQuery(this);
                n.addClass("js-table-sections-enabled");
                jQuery(".js-table-sections-header > tr", n).on("click.cb.helpers", function(t) {
                    if (t.target.type !== "checkbox" && t.target.type !== "button" && t.target.tagName.toLowerCase() !== "a" && !jQuery(t.target).parent("label").length) {
                        var r = jQuery(this),
                            i = r.parent("tbody");
                        i.hasClass("show") || jQuery("tbody", n).removeClass("show table-active");
                        i.toggleClass("show table-active")
                    }
                })
            })
        },
        kt = function() {
            jQuery(".js-table-checkable:not(.js-table-checkable-enabled)").each(function() {
                var n = jQuery(this);
                n.addClass("js-table-checkable-enabled");
                jQuery("thead input:checkbox", n).on("click.cb.helpers", function() {
                    var t = jQuery(this).prop("checked");
                    jQuery("tbody input:checkbox", n).each(function() {
                        var n = jQuery(this);
                        n.prop("checked", t);
                        nt(n, t)
                    })
                });
                jQuery("tbody input:checkbox", n).on("click.cb.helpers", function() {
                    var n = jQuery(this);
                    nt(n, n.prop("checked"))
                });
                jQuery("tbody > tr", n).on("click.cb.helpers", function(n) {
                    if (n.target.type !== "checkbox" && n.target.type !== "button" && n.target.tagName.toLowerCase() !== "a" && !jQuery(n.target).parent("label").length) {
                        var t = jQuery("input:checkbox", this),
                            i = t.prop("checked");
                        t.prop("checked", !i);
                        nt(t, !i)
                    }
                })
            })
        },
        nt = function(n, t) { t ? n.closest("tr").addClass("table-active") : n.closest("tr").removeClass("table-active") },
        dt = function() {
            jQuery(".js-filter:not(.js-filter-enabled)").each(function() {
                var t = jQuery(this),
                    r = jQuery(".nav-pills", t),
                    u = jQuery("a[data-category-link]", t),
                    n = jQuery("[data-category]", t),
                    i = t.data("speed") || 200,
                    f, e;
                t.addClass("js-filter-enabled");
                r.length && jQuery(window).on("resize.cb.helpers", function() {
                    clearTimeout(f);
                    f = setTimeout(function() {
                        e = y();
                        e < 768 ? r.addClass("flex-column") : r.removeClass("flex-column")
                    }, 150)
                }).trigger("resize.cb.helpers");
                t.data("numbers") && u.each(function() {
                    var t = jQuery(this),
                        i = t.data("category-link");
                    i === "all" ? t.append(" (" + n.length + ")") : t.append(" (" + n.filter('[data-category="' + i + '"]').length + ")")
                });
                u.on("click.cb.helpers", function() {
                    var r = jQuery(this),
                        t;
                    return r.hasClass("active") || (u.removeClass("active"), r.addClass("active"), t = r.data("category-link"), t === "all" ? n.filter(":visible").length ? n.filter(":visible").fadeOut(i, function() { n.fadeIn(i) }) : n.fadeIn(i) : n.filter(":visible").length ? n.filter(":visible").fadeOut(i, function() { n.filter('[data-category="' + t + '"]').fadeIn(i) }) : n.filter('[data-category="' + t + '"]').fadeIn(i)), !1
                })
            })
        },
        gt = function() {
            jQuery(".js-gallery:not(.js-gallery-enabled)").each(function() {
                var n = jQuery(this);
                n.addClass("js-gallery-enabled");
                n.magnificPopup({ delegate: "a.img-lightbox", type: "image", gallery: { enabled: !0 } })
            })
        },
        ni = function() {
            jQuery("#js-ckeditor-inline:not(.js-ckeditor-inline-enabled)").length && (jQuery("#js-ckeditor-inline").attr("contenteditable", "true"), CKEDITOR.inline("js-ckeditor-inline"), jQuery("#js-ckeditor-inline").addClass("js-ckeditor-inline-enabled"));
            jQuery("#js-ckeditor:not(.js-ckeditor-enabled)").length && (CKEDITOR.replace("js-ckeditor"), jQuery("#js-ckeditor").addClass("js-ckeditor-enabled"))
        },
        ti = function() {
            jQuery(".js-simplemde:not(.js-simplemde-enabled)").each(function() {
                var n = jQuery(this);
                n.addClass("js-simplemde-enabled");
                new SimpleMDE({ element: n[0] })
            })
        },
        ii = function() {
            jQuery(".js-slider:not(.js-slider-enabled)").each(function() {
                var n = jQuery(this);
                n.addClass("js-slider-enabled");
                n.slick({ arrows: n.data("arrows") || !1, dots: n.data("dots") || !1, slidesToShow: n.data("slides-to-show") || 1, slidesToScroll: n.data("slides-to-scroll") || 1, centerMode: n.data("center-mode") || !1, autoplay: n.data("autoplay") || !1, autoplaySpeed: n.data("autoplay-speed") || 3e3 })
            })
        },
        ri = function() {
            jQuery(".js-datepicker:not(.js-datepicker-enabled)").add(".input-daterange:not(.js-datepicker-enabled)").each(function() {
                var n = jQuery(this);
                n.addClass("js-datepicker-enabled");
                n.datepicker({ weekStart: n.data("week-start") || 0, autoclose: n.data("autoclose") || !1, todayHighlight: n.data("today-highlight") || !1, orientation: "bottom" })
            })
        },
        ui = function() {
            jQuery(".js-colorpicker:not(.js-colorpicker-enabled)").each(function() {
                var n = jQuery(this);
                n.addClass("js-colorpicker-enabled");
                n.colorpicker()
            })
        },
        fi = function() {
            jQuery(".js-masked-date:not(.js-masked-enabled)").mask("99/99/9999");
            jQuery(".js-masked-date-dash:not(.js-masked-enabled)").mask("99-99-9999");
            jQuery(".js-masked-phone:not(.js-masked-enabled)").mask("(999) 999-9999");
            jQuery(".js-masked-phone-ext:not(.js-masked-enabled)").mask("(999) 999-9999? x99999");
            jQuery(".js-masked-taxid:not(.js-masked-enabled)").mask("99-9999999");
            jQuery(".js-masked-ssn:not(.js-masked-enabled)").mask("999-99-9999");
            jQuery(".js-masked-pkey:not(.js-masked-enabled)").mask("a*-999-a999");
            jQuery(".js-masked-time:not(.js-masked-enabled)").mask("99:99");
            jQuery(".js-masked-date").add(".js-masked-date-dash").add(".js-masked-phone").add(".js-masked-phone-ext").add(".js-masked-taxid").add(".js-masked-ssn").add(".js-masked-pkey").add(".js-masked-time").addClass("js-masked-enabled")
        },
        ei = function() {
            jQuery(".js-tags-input:not(.js-tags-input-enabled)").each(function() {
                var n = jQuery(this);
                n.addClass("js-tags-input-enabled");
                n.tagsInput({ height: n.data("height") || !1, width: n.data("width") || "100%", defaultText: n.data("default-text") || "Add tag", removeWithBackspace: n.data("remove-with-backspace") || !0, delimiter: [","] })
            })
        },
        oi = function() {
            jQuery(".js-select2:not(.js-select2-enabled)").each(function() {
                var n = jQuery(this);
                n.addClass("js-select2-enabled");
                n.select2()
            })
        },
        si = function() { hljs.isHighlighted || hljs.initHighlighting() },
        hi = function() {
            jQuery(".js-notify:not(.js-notify-enabled)").each(function() {
                var n = jQuery(this);
                n.addClass("js-notify-enabled");
                n.on("click.cb.helpers", function() {
                    var n = jQuery(this);
                    jQuery.notify({ icon: n.data("icon") || "", message: n.data("message"), url: n.data("url") || "" }, { element: "body", type: n.data("type") || "info", allow_dismiss: !0, newest_on_top: !0, showProgressbar: !1, placement: { from: n.data("from") || "top", align: n.data("align") || "right" }, offset: 20, spacing: 10, z_index: 1033, delay: 5e3, timer: 1e3, template: '<div data-notify="container" class="col-11 col-sm-3 alert alert-{0}" role="alert"><button type="button" aria-hidden="true" class="close" data-notify="dismiss">×<\/button><span data-notify="icon"><\/span> <span data-notify="title">{1}<\/span> <span data-notify="message">{2}<\/span><div class="progress" data-notify="progressbar"><div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"><\/div><\/div><a href="{3}" target="{4}" data-notify="url"><\/a><\/div>', animate: { enter: "animated fadeIn", exit: "animated fadeOutDown" } })
                })
            })
        },
        ci = function() {
            jQuery(".js-draggable-items:not(.js-draggable-items-enabled)").each(function() {
                var n = jQuery(this);
                n.addClass("js-draggable-items-enabled");
                n.children(".draggable-column").sortable({ connectWith: ".draggable-column", items: ".draggable-item", dropOnEmpty: !0, opacity: .75, handle: ".draggable-handler", placeholder: "draggable-placeholder", tolerance: "pointer", start: function(n, t) { t.placeholder.css({ height: t.item.outerHeight(), "margin-bottom": t.item.css("margin-bottom") }) } })
            })
        },
        li = function() {
            jQuery(".js-pie-chart:not(.js-pie-chart-enabled)").each(function() {
                var n = jQuery(this);
                n.addClass("js-pie-chart-enabled");
                n.easyPieChart({ barColor: n.data("bar-color") || "#777777", trackColor: n.data("track-color") || "#eeeeee", lineWidth: n.data("line-width") || 3, size: n.data("size") || "80", animate: n.data("animate") || 750, scaleColor: n.data("scale-color") || !1 })
            })
        },
        ai = function() {
            jQuery(".js-maxlength:not(.js-maxlength-enabled)").each(function() {
                var n = jQuery(this);
                n.addClass("js-maxlength-enabled");
                n.maxlength({ alwaysShow: n.data("always-show") ? !0 : !1, threshold: n.data("threshold") || 10, warningClass: n.data("warning-class") || "badge badge-warning", limitReachedClass: n.data("limit-reached-class") || "badge badge-danger", placement: n.data("placement") || "bottom", preText: n.data("pre-text") || "", separator: n.data("separator") || "/", postText: n.data("post-text") || "" })
            })
        },
        vi = function() {
            jQuery(".js-rangeslider:not(.js-rangeslider-enabled)").each(function() {
                var n = jQuery(this);
                n.addClass("js-rangeslider-enabled");
                n.ionRangeSlider({ input_values_separator: ";" })
            })
        },
        yi = function() {
            jQuery(".js-summernote-air:not(.js-summernote-air-enabled)").each(function() {
                var n = jQuery(this);
                n.addClass("js-summernote-air-enabled");
                n.summernote({ airMode: !0, tooltip: !1 })
            });
            jQuery(".js-summernote:not(.js-summernote-enabled)").each(function() {
                var n = jQuery(this);
                n.addClass("js-summernote-enabled");
                n.summernote({ height: 350, minHeight: null, maxHeight: null })
            })
        };
    return {
        init: function() {
            tt();
            o("init");
            f();
            e();
            it();
            rt();
            ut();
            r("init");
            v(!1, "init");
            et();
            ot();
            st();
            ht();
            ct();
            lt();
            at();
            vt();
            yt();
            g("hide");
            pt()
        },
        layout: function(n) { r(n) },
        blocks: function(n, t) { v(n, t) },
        loader: function(n, t) { g(n, t) },
        helper: function(n) {
            switch (n) {
                case "core-fn-uiInit":
                    tt();
                    break;
                case "core-fn-uiHandleScrollInit":
                    o("init");
                    break;
                case "core-fn-uiHandleScroll":
                    o();
                    break;
                case "core-fn-uiHandleMain":
                    f();
                    break;
                case "core-fn-uiHandleHeader":
                    e();
                    break;
                case "core-fn-uiHandleNav":
                    it();
                    break;
                case "core-fn-uiHandleForms":
                    rt();
                    break;
                case "core-fn-uiHandleTheme":
                    ut();
                    break;
                case "core-fn-uiApiLayout":
                    r("init");
                    break;
                case "core-fn-uiApiBlocks":
                    v(!1, "init");
                    break;
                case "core-tooltip":
                    ht();
                    break;
                case "core-popover":
                    ct();
                    break;
                case "core-tab":
                    lt();
                    break;
                case "core-scrollTo":
                    ot();
                    break;
                case "core-toggle-class":
                    et();
                    break;
                case "core-year-copy":
                    st();
                    break;
                case "core-appear":
                    at();
                    break;
                case "core-appear-countTo":
                    vt();
                    break;
                case "core-slimscroll":
                    yt();
                    break;
                case "core-ripple":
                    pt();
                    break;
                case "core-page-loader":
                    g("hide");
                    break;
                case "print-page":
                    wt();
                    break;
                case "table-tools":
                    bt();
                    kt();
                    break;
                case "content-filter":
                    dt();
                    break;
                case "slimscroll":
                    uiHelperSlimscroll();
                    break;
                case "magnific-popup":
                    gt();
                    break;
                case "ckeditor":
                    ni();
                    break;
                case "simplemde":
                    ti();
                    break;
                case "slick":
                    ii();
                    break;
                case "datepicker":
                    ri();
                    break;
                case "colorpicker":
                    ui();
                    break;
                case "tags-inputs":
                    ei();
                    break;
                case "masked-inputs":
                    fi();
                    break;
                case "select2":
                    oi();
                    break;
                case "highlightjs":
                    si();
                    break;
                case "notify":
                    hi();
                    break;
                case "draggable-items":
                    ci();
                    break;
                case "easy-pie-chart":
                    li();
                    break;
                case "maxlength":
                    ai();
                    break;
                case "rangeslider":
                    vi();
                    break;
                case "summernote":
                    yi();
                    break;
                default:
                    return !1
            }
        },
        helpers: function(n) {
            if (n instanceof Array)
                for (var t in n) Codebase.helper(n[t]);
            else Codebase.helper(n)
        }
    }
}();
jQuery(function() { typeof angular == "undefined" && Codebase.init() });
hljs = new function() {
    function n(n) { return n.replace(/&/gm, "&amp;").replace(/</gm, "&lt;").replace(/>/gm, "&gt;") }

    function u(n) { return n.nodeName.toLowerCase() }

    function o(n, t) { var i = n && n.exec(t); return i && i.index == 0 }

    function c(n) { return Array.prototype.map.call(n.childNodes, function(n) { return n.nodeType == 3 ? t.useBR ? n.nodeValue.replace(/\n/g, "") : n.nodeValue : u(n) == "br" ? "\n" : c(n) }).join("") }

    function p(n) { var t = (n.className + " " + (n.parentNode ? n.parentNode.className : "")).split(/\s+/); return t = t.map(function(n) { return n.replace(/^language-/, "") }), t.filter(function(n) { return e(n) || n == "no-highlight" })[0] }

    function s(n, t) {
        var r = {};
        for (var i in n) r[i] = n[i];
        if (t)
            for (i in t) r[i] = t[i];
        return r
    }

    function l(n) { var t = []; return function i(n, r) { for (var f = n.firstChild; f; f = f.nextSibling) f.nodeType == 3 ? r += f.nodeValue.length : u(f) == "br" ? r += 1 : f.nodeType == 1 && (t.push({ event: "start", offset: r, node: f }), r = i(f, r), t.push({ event: "stop", offset: r, node: f })); return r }(n, 0), t }

    function w(t, i, r) {
        function h() { return !t.length || !i.length ? t.length ? t : i : t[0].offset != i[0].offset ? t[0].offset < i[0].offset ? t : i : i[0].event == "start" ? t : i }

        function c(t) {
            function i(t) { return " " + t.nodeName + '="' + n(t.value) + '"' }
            o += "<" + u(t) + Array.prototype.map.call(t.attributes, i).join("") + ">"
        }

        function l(n) { o += "<\/" + u(n) + ">" }

        function a(n) {
            (n.event == "start" ? c : l)(n.node)
        }
        for (var e = 0, o = "", s = [], f; t.length || i.length;)
            if (f = h(), o += n(r.substr(e, f[0].offset - e)), e = f[0].offset, f == t) {
                s.reverse().forEach(l);
                do a(f.splice(0, 1)[0]), f = h(); while (f == t && f.length && f[0].offset == e);
                s.reverse().forEach(c)
            } else f[0].event == "start" ? s.push(f[0].node) : s.pop(), a(f.splice(0, 1)[0]);
        return o + n(r.substr(e))
    }

    function b(n) {
        function i(n) { return n && n.source || n }

        function t(t, r) { return RegExp(i(t), "m" + (n.cI ? "i" : "") + (r ? "g" : "")) }

        function r(u, f) {
            var o, e, h;
            if (!u.compiled) {
                if (u.compiled = !0, u.k = u.k || u.bK, u.k) {
                    o = {};

                    function c(t, i) {
                        n.cI && (i = i.toLowerCase());
                        i.split(" ").forEach(function(n) {
                            var i = n.split("|");
                            o[i[0]] = [t, i[1] ? Number(i[1]) : 1]
                        })
                    }
                    typeof u.k == "string" ? c("keyword", u.k) : Object.keys(u.k).forEach(function(n) { c(n, u.k[n]) });
                    u.k = o
                }
                u.lR = t(u.l || /\b[A-Za-z0-9_]+\b/, !0);
                f && (u.bK && (u.b = u.bK.split(" ").join("|")), u.b || (u.b = /\B|\b/), u.bR = t(u.b), u.e || u.eW || (u.e = /\B|\b/), u.e && (u.eR = t(u.e)), u.tE = i(u.e) || "", u.eW && f.tE && (u.tE += (u.e ? "|" : "") + f.tE));
                u.i && (u.iR = t(u.i));
                u.r === undefined && (u.r = 1);
                u.c || (u.c = []);
                e = [];
                u.c.forEach(function(n) { n.v ? n.v.forEach(function(t) { e.push(s(n, t)) }) : e.push(n == "self" ? u : n) });
                u.c = e;
                u.c.forEach(function(n) { r(n, u) });
                u.starts && r(u.starts, f);
                h = u.c.map(function(n) { return n.bK ? "\\.?\\b(" + n.b + ")\\b\\.?" : n.b }).concat([u.tE]).concat([u.i]).map(i).filter(Boolean);
                u.t = h.length ? t(h.join("|"), !0) : { exec: function() { return null } };
                u.continuation = {}
            }
        }
        r(n)
    }

    function f(i, u, s, c) {
        function et(n, t) {
            for (var i = 0; i < t.c.length; i++)
                if (o(t.c[i].bR, n)) return t.c[i]
        }

        function tt(n, t) { return o(n.eR, t) ? n : n.eW ? tt(n.parent, t) : void 0 }

        function ot(n, t) { return !s && o(t.iR, n) }

        function st(n, t) { var i = w.cI ? t[0].toLowerCase() : t[0]; return n.k.hasOwnProperty(i) && n.k[i] }

        function g(n, i, r, u) {
            var e = u ? "" : t.classPrefix,
                f = '<span class="' + e,
                o = r ? "" : "<\/span>";
            return f += n + '">', f + i + o
        }

        function ht() {
            var i = n(v),
                r, u, t, f;
            if (!l.k) return i;
            for (r = "", u = 0, l.lR.lastIndex = 0, t = l.lR.exec(i); t;) r += i.substr(u, t.index - u), f = st(l, t), f ? (k += f[1], r += g(f[0], t[0])) : r += t[0], u = l.lR.lastIndex, t = l.lR.exec(i);
            return r + i.substr(u)
        }

        function ct() { if (l.sL && !r[l.sL]) return n(v); var t = l.sL ? f(l.sL, v, !0, l.continuation.top) : h(v); return l.r > 0 && (k += t.r), l.subLanguageMode == "continuous" && (l.continuation.top = t.top), g(t.language, t.value, !1, !0) }

        function nt() { return l.sL !== undefined ? ct() : ht() }

        function it(t, i) {
            var r = t.cN ? g(t.cN, "", !0) : "";
            t.rB ? (a += r, v = "") : t.eB ? (a += n(i) + r, v = "") : (a += r, v = i);
            l = Object.create(t, { parent: { value: l } })
        }

        function rt(t, i) {
            var f, r, u;
            if (v += t, i === undefined) return a += nt(), 0;
            if (f = et(i, l), f) return a += nt(), it(f, i), f.rB ? 0 : i.length;
            if (r = tt(l, i), r) {
                u = l;
                u.rE || u.eE || (v += i);
                a += nt();
                do l.cN && (a += "<\/span>"), k += l.r, l = l.parent; while (l != r.parent);
                return u.eE && (a += n(i)), v = "", r.starts && it(r.starts, ""), u.rE ? 0 : i.length
            }
            if (ot(i, l)) throw new Error('Illegal lexeme "' + i + '" for mode "' + (l.cN || "<unnamed>") + '"');
            return v += i, i.length || 1
        }
        var w = e(i),
            l, a, v, k, d, ut, p, y;
        if (!w) throw new Error('Unknown language: "' + i + '"');
        for (b(w), l = c || w, a = "", y = l; y != w; y = y.parent) y.cN && (a = g(y.cN, a, !0));
        v = "";
        k = 0;
        try {
            for (p = 0;;) {
                if (l.t.lastIndex = p, d = l.t.exec(u), !d) break;
                ut = rt(u.substr(p, d.index - p), d[0]);
                p = d.index + ut
            }
            for (rt(u.substr(p)), y = l; y.parent; y = y.parent) y.cN && (a += "<\/span>");
            return { r: k, value: a, language: i, top: l }
        } catch (ft) { if (ft.message.indexOf("Illegal") != -1) return { r: 0, value: n(u) }; throw ft; }
    }

    function h(i, u) {
        u = u || t.languages || Object.keys(r);
        var o = { r: 0, value: n(i) },
            s = o;
        return u.forEach(function(n) {
            if (e(n)) {
                var t = f(n, i, !1);
                t.language = n;
                t.r > s.r && (s = t);
                t.r > o.r && (s = o, o = t)
            }
        }), s.language && (o.second_best = s), o
    }

    function a(n) { return t.tabReplace && (n = n.replace(/^((<[^>]+>|\t)+)/gm, function(n, i) { return i.replace(/\t/g, t.tabReplace) })), t.useBR && (n = n.replace(/\n/g, "<br>")), n }

    function v(n) {
        var r = c(n),
            i = p(n),
            t, u, e;
        i != "no-highlight" && (t = i ? f(i, r, !0) : h(r), u = l(n), u.length && (e = document.createElementNS("http://www.w3.org/1999/xhtml", "pre"), e.innerHTML = t.value, t.value = w(u, l(e), r)), t.value = a(t.value), n.innerHTML = t.value, n.className += " hljs " + (!i && t.language || ""), n.result = { language: t.language, re: t.r }, t.second_best && (n.second_best = { language: t.second_best.language, re: t.second_best.r }))
    }

    function k(n) { t = s(t, n) }

    function i() {
        if (!i.called) {
            i.called = !0;
            var n = document.querySelectorAll("pre code");
            Array.prototype.forEach.call(n, v)
        }
    }

    function d() {
        addEventListener("DOMContentLoaded", i, !1);
        addEventListener("load", i, !1)
    }

    function g(n, t) {
        var i = r[n] = t(this);
        i.aliases && i.aliases.forEach(function(t) { y[t] = n })
    }

    function e(n) { return r[n] || r[y[n]] }
    var t = { classPrefix: "hljs-", tabReplace: null, useBR: !1, languages: undefined },
        r = {},
        y = {};
    this.highlight = f;
    this.highlightAuto = h;
    this.fixMarkup = a;
    this.highlightBlock = v;
    this.configure = k;
    this.initHighlighting = i;
    this.initHighlightingOnLoad = d;
    this.registerLanguage = g;
    this.getLanguage = e;
    this.inherit = s;
    this.IR = "[a-zA-Z][a-zA-Z0-9_]*";
    this.UIR = "[a-zA-Z_][a-zA-Z0-9_]*";
    this.NR = "\\b\\d+(\\.\\d+)?";
    this.CNR = "(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)";
    this.BNR = "\\b(0b[01]+)";
    this.RSR = "!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~";
    this.BE = { b: "\\\\[\\s\\S]", r: 0 };
    this.ASM = { cN: "string", b: "'", e: "'", i: "\\n", c: [this.BE] };
    this.QSM = { cN: "string", b: '"', e: '"', i: "\\n", c: [this.BE] };
    this.CLCM = { cN: "comment", b: "//", e: "$" };
    this.CBLCLM = { cN: "comment", b: "/\\*", e: "\\*/" };
    this.HCM = { cN: "comment", b: "#", e: "$" };
    this.NM = { cN: "number", b: this.NR, r: 0 };
    this.CNM = { cN: "number", b: this.CNR, r: 0 };
    this.BNM = { cN: "number", b: this.BNR, r: 0 };
    this.REGEXP_MODE = { cN: "regexp", b: /\//, e: /\/[gim]*/, i: /\n/, c: [this.BE, { b: /\[/, e: /\]/, r: 0, c: [this.BE] }] };
    this.TM = { cN: "title", b: this.IR, r: 0 };
    this.UTM = { cN: "title", b: this.UIR, r: 0 }
};
hljs.registerLanguage("bash", function(n) {
    var t = { cN: "variable", v: [{ b: /\$[\w\d#@][\w\d_]*/ }, { b: /\$\{(.*?)\}/ }] },
        i = { cN: "string", b: /"/, e: /"/, c: [n.BE, t, { cN: "variable", b: /\$\(/, e: /\)/, c: [n.BE] }] };
    return { l: /-?[a-z\.]+/, k: { keyword: "if then else elif fi for break continue while in do done exit return set declare case esac export exec", literal: "true false", built_in: "printf echo read cd pwd pushd popd dirs let eval unset typeset readonly getopts source shopt caller type hash bind help sudo", operator: "-ne -eq -lt -gt -f -d -e -s -l -a" }, c: [{ cN: "shebang", b: /^#![^\n]+sh\s*$/, r: 10 }, { cN: "function", b: /\w[\w\d_]*\s*\(\s*\)\s*\{/, rB: !0, c: [n.inherit(n.TM, { b: /\w[\w\d_]*/ })], r: 0 }, n.HCM, n.NM, i, { cN: "string", b: /'/, e: /'/ }, t] }
});
hljs.registerLanguage("cs", function(n) { var t = "abstract as base bool break byte case catch char checked const continue decimal default delegate do double else enum event explicit extern false finally fixed float for foreach goto if implicit in int interface internal is lock long new null object operator out override params private protected public readonly ref return sbyte sealed short sizeof stackalloc static string struct switch this throw true try typeof uint ulong unchecked unsafe ushort using virtual volatile void while async await ascending descending from get group into join let orderby partial select set value var where yield"; return { k: t, c: [{ cN: "comment", b: "///", e: "$", rB: !0, c: [{ cN: "xmlDocTag", b: "///|<!--|-->" }, { cN: "xmlDocTag", b: "<\/?", e: ">" }] }, n.CLCM, n.CBLCLM, { cN: "preprocessor", b: "#", e: "$", k: "if else elif endif define undef warning error line region endregion pragma checksum" }, { cN: "string", b: '@"', e: '"', c: [{ b: '""' }] }, n.ASM, n.QSM, n.CNM, { bK: "protected public private internal", e: /[{;=]/, k: t, c: [{ bK: "class namespace interface", starts: { c: [n.TM] } }, { b: n.IR + "\\s*\\(", rB: !0, c: [n.TM] }] }] } });
hljs.registerLanguage("ruby", function(n) {
    var f = "[a-zA-Z_]\\w*[!?=]?|[-+~]\\@|<<|>>|=~|===?|<=>|[<>]=?|\\*\\*|[-/+%^&*~`|]|\\[\\]=?",
        i = "and false then defined module in return redo if BEGIN retry end for true self when next until do begin unless END rescue nil else break undef not super class case require yield alias while ensure elsif or include attr_reader attr_writer attr_accessor",
        e = { cN: "yardoctag", b: "@[A-Za-z]+" },
        t = { cN: "comment", v: [{ b: "#", e: "$", c: [e] }, { b: "^\\=begin", e: "^\\=end", c: [e], r: 10 }, { b: "^__END__", e: "\\n$" }] },
        r = { cN: "subst", b: "#\\{", e: "}", k: i },
        o = { cN: "string", c: [n.BE, r], v: [{ b: /'/, e: /'/ }, { b: /"/, e: /"/ }, { b: "%[qw]?\\(", e: "\\)" }, { b: "%[qw]?\\[", e: "\\]" }, { b: "%[qw]?{", e: "}" }, { b: "%[qw]?<", e: ">", r: 10 }, { b: "%[qw]?/", e: "/", r: 10 }, { b: "%[qw]?%", e: "%", r: 10 }, { b: "%[qw]?-", e: "-", r: 10 }, { b: "%[qw]?\\|", e: "\\|", r: 10 }, { b: /\B\?(\\\d{1,3}|\\x[A-Fa-f0-9]{1,2}|\\u[A-Fa-f0-9]{4}|\\?\S)\b/ }] },
        s = { cN: "params", b: "\\(", e: "\\)", k: i },
        u = [o, t, { cN: "class", bK: "class module", e: "$|;", i: /=/, c: [n.inherit(n.TM, { b: "[A-Za-z_]\\w*(::\\w+)*(\\?|\\!)?" }), { cN: "inheritance", b: "<\\s*", c: [{ cN: "parent", b: "(" + n.IR + "::)?" + n.IR }] }, t] }, { cN: "function", bK: "def", e: " |$|;", r: 0, c: [n.inherit(n.TM, { b: f }), s, t] }, { cN: "constant", b: "(::)?(\\b[A-Z]\\w*(::)?)+", r: 0 }, { cN: "symbol", b: ":", c: [o, { b: f }], r: 0 }, { cN: "symbol", b: n.UIR + "(\\!|\\?)?:", r: 0 }, { cN: "number", b: "(\\b0[0-7_]+)|(\\b0x[0-9a-fA-F_]+)|(\\b[1-9][0-9_]*(\\.[0-9_]+)?)|[0_]\\b", r: 0 }, { cN: "variable", b: "(\\$\\W)|((\\$|\\@\\@?)(\\w+))" }, { b: "(" + n.RSR + ")\\s*", c: [t, { cN: "regexp", c: [n.BE, r], i: /\n/, v: [{ b: "/", e: "/[a-z]*" }, { b: "%r{", e: "}[a-z]*" }, { b: "%r\\(", e: "\\)[a-z]*" }, { b: "%r!", e: "![a-z]*" }, { b: "%r\\[", e: "\\][a-z]*" }] }], r: 0 }];
    return r.c = u, s.c = u, { k: i, c: u }
});
hljs.registerLanguage("diff", function() { return { c: [{ cN: "chunk", r: 10, v: [{ b: /^\@\@ +\-\d+,\d+ +\+\d+,\d+ +\@\@$/ }, { b: /^\*\*\* +\d+,\d+ +\*\*\*\*$/ }, { b: /^\-\-\- +\d+,\d+ +\-\-\-\-$/ }] }, { cN: "header", v: [{ b: /Index: /, e: /$/ }, { b: /=====/, e: /=====$/ }, { b: /^\-\-\-/, e: /$/ }, { b: /^\*{3} /, e: /$/ }, { b: /^\+\+\+/, e: /$/ }, { b: /\*{5}/, e: /\*{5}$/ }] }, { cN: "addition", b: "^\\+", e: "$" }, { cN: "deletion", b: "^\\-", e: "$" }, { cN: "change", b: "^\\!", e: "$" }] } });
hljs.registerLanguage("javascript", function(n) { return { aliases: ["js"], k: { keyword: "in if for while finally var new function do return void else break catch instanceof with throw case default try this switch continue typeof delete let yield const class", literal: "true false null undefined NaN Infinity", built_in: "eval isFinite isNaN parseFloat parseInt decodeURI decodeURIComponent encodeURI encodeURIComponent escape unescape Object Function Boolean Error EvalError InternalError RangeError ReferenceError StopIteration SyntaxError TypeError URIError Number Math Date String RegExp Array Float32Array Float64Array Int16Array Int32Array Int8Array Uint16Array Uint32Array Uint8Array Uint8ClampedArray ArrayBuffer DataView JSON Intl arguments require" }, c: [{ cN: "pi", b: /^\s*('|")use strict('|")/, r: 10 }, n.ASM, n.QSM, n.CLCM, n.CBLCLM, n.CNM, { b: "(" + n.RSR + "|\\b(case|return|throw)\\b)\\s*", k: "return throw case", c: [n.CLCM, n.CBLCLM, n.REGEXP_MODE, { b: /</, e: />;/, r: 0, sL: "xml" }], r: 0 }, { cN: "function", bK: "function", e: /\{/, c: [n.inherit(n.TM, { b: /[A-Za-z$_][0-9A-Za-z$_]*/ }), { cN: "params", b: /\(/, e: /\)/, c: [n.CLCM, n.CBLCLM], i: /["'\(]/ }], i: /\[|%/ }, { b: /\$[(.]/ }, { b: "\\." + n.IR, r: 0 }] } });
hljs.registerLanguage("xml", function() {
    var t = { b: /<\?(php)?(?!\w)/, e: /\?>/, sL: "php", subLanguageMode: "continuous" },
        n = { eW: !0, i: /</, r: 0, c: [t, { cN: "attribute", b: "[A-Za-z0-9\\._:-]+", r: 0 }, { b: "=", r: 0, c: [{ cN: "value", v: [{ b: /"/, e: /"/ }, { b: /'/, e: /'/ }, { b: /[^\s\/>]+/ }] }] }] };
    return { aliases: ["html"], cI: !0, c: [{ cN: "doctype", b: "<!DOCTYPE", e: ">", r: 10, c: [{ b: "\\[", e: "\\]" }] }, { cN: "comment", b: "<!--", e: "-->", r: 10 }, { cN: "cdata", b: "<\\!\\[CDATA\\[", e: "\\]\\]>", r: 10 }, { cN: "tag", b: "<style(?=\\s|>|$)", e: ">", k: { title: "style" }, c: [n], starts: { e: "<\/style>", rE: !0, sL: "css" } }, { cN: "tag", b: "<script(?=\\s|>|$)", e: ">", k: { title: "script" }, c: [n], starts: { e: "<\/script>", rE: !0, sL: "javascript" } }, { b: "<%", e: "%>", sL: "vbscript" }, t, { cN: "pi", b: /<\?\w+/, e: /\?>/, r: 10 }, { cN: "tag", b: "<\/?", e: "/?>", c: [{ cN: "title", b: "[^ /><]+", r: 0 }, n] }] }
});
hljs.registerLanguage("markdown", function() { return { c: [{ cN: "header", v: [{ b: "^#{1,6}", e: "$" }, { b: "^.+?\\n[=-]{2,}$" }] }, { b: "<", e: ">", sL: "xml", r: 0 }, { cN: "bullet", b: "^([*+-]|(\\d+\\.))\\s+" }, { cN: "strong", b: "[*_]{2}.+?[*_]{2}" }, { cN: "emphasis", v: [{ b: "\\*.+?\\*" }, { b: "_.+?_", r: 0 }] }, { cN: "blockquote", b: "^>\\s+", e: "$" }, { cN: "code", v: [{ b: "`.+?`" }, { b: "^( {4}|\t)", e: "$", r: 0 }] }, { cN: "horizontal_rule", b: "^[-\\*]{3,}", e: "$" }, { b: "\\[.+?\\][\\(\\[].+?[\\)\\]]", rB: !0, c: [{ cN: "link_label", b: "\\[", e: "\\]", eB: !0, rE: !0, r: 0 }, { cN: "link_url", b: "\\]\\(", e: "\\)", eB: !0, eE: !0 }, { cN: "link_reference", b: "\\]\\[", e: "\\]", eB: !0, eE: !0 }], r: 10 }, { b: "^\\[.+\\]:", e: "$", rB: !0, c: [{ cN: "link_reference", b: "\\[", e: "\\]", eB: !0, eE: !0 }, { cN: "link_url", b: "\\s", e: "$" }] }] } });
hljs.registerLanguage("css", function(n) {
    var t = "[a-zA-Z-][a-zA-Z0-9_-]*",
        i = { cN: "function", b: t + "\\(", e: "\\)", c: ["self", n.NM, n.ASM, n.QSM] };
    return { cI: !0, i: "[=/|']", c: [n.CBLCLM, { cN: "id", b: "\\#[A-Za-z0-9_-]+" }, { cN: "class", b: "\\.[A-Za-z0-9_-]+", r: 0 }, { cN: "attr_selector", b: "\\[", e: "\\]", i: "$" }, { cN: "pseudo", b: ":(:)?[a-zA-Z0-9\\_\\-\\+\\(\\)\\\"\\']+" }, { cN: "at_rule", b: "@(font-face|page)", l: "[a-z-]+", k: "font-face page" }, { cN: "at_rule", b: "@", e: "[{;]", c: [{ cN: "keyword", b: /\S+/ }, { b: /\s/, eW: !0, eE: !0, r: 0, c: [i, n.ASM, n.QSM, n.NM] }] }, { cN: "tag", b: t, r: 0 }, { cN: "rules", b: "{", e: "}", i: "[^\\s]", r: 0, c: [n.CBLCLM, { cN: "rule", b: "[^\\s]", rB: !0, e: ";", eW: !0, c: [{ cN: "attribute", b: "[A-Z\\_\\.\\-]+", e: ":", eE: !0, i: "[^\\s]", starts: { cN: "value", eW: !0, eE: !0, c: [i, n.NM, n.QSM, n.ASM, n.CBLCLM, { cN: "hexcolor", b: "#[0-9A-Fa-f]+" }, { cN: "important", b: "!important" }] } }] }] }] }
});
hljs.registerLanguage("http", function() { return { i: "\\S", c: [{ cN: "status", b: "^HTTP/[0-9\\.]+", e: "$", c: [{ cN: "number", b: "\\b\\d{3}\\b" }] }, { cN: "request", b: "^[A-Z]+ (.*?) HTTP/[0-9\\.]+$", rB: !0, e: "$", c: [{ cN: "string", b: " ", e: " ", eB: !0, eE: !0 }] }, { cN: "attribute", b: "^\\w", e: ": ", eE: !0, i: "\\n|\\s|=", starts: { cN: "string", e: "$" } }, { b: "\\n\\n", starts: { sL: "", eW: !0 } }] } });
hljs.registerLanguage("java", function(n) { var t = "false synchronized int abstract float private char boolean static null if const for true while long throw strictfp finally protected import native final return void enum else break transient new catch instanceof byte super volatile case assert short package default double public try this switch continue throws"; return { k: t, i: /<\//, c: [{ cN: "javadoc", b: "/\\*\\*", e: "\\*/", c: [{ cN: "javadoctag", b: "(^|\\s)@[A-Za-z]+" }], r: 10 }, n.CLCM, n.CBLCLM, n.ASM, n.QSM, { bK: "protected public private", e: /[{;=]/, k: t, c: [{ cN: "class", bK: "class interface", eW: !0, i: /[:"<>]/, c: [{ bK: "extends implements", r: 10 }, n.UTM] }, { b: n.UIR + "\\s*\\(", rB: !0, c: [n.UTM] }] }, n.CNM, { cN: "annotation", b: "@[A-Za-z]+" }] } });
hljs.registerLanguage("php", function(n) {
    var i = { cN: "variable", b: "\\$+[a-zA-Z_-ÿ][a-zA-Z0-9_-ÿ]*" },
        t = { cN: "preprocessor", b: /<\?(php)?|\?>/ },
        r = { cN: "string", c: [n.BE, t], v: [{ b: 'b"', e: '"' }, { b: "b'", e: "'" }, n.inherit(n.ASM, { i: null }), n.inherit(n.QSM, { i: null })] },
        u = { v: [n.BNM, n.CNM] };
    return { cI: !0, k: "and include_once list abstract global private echo interface as static endswitch array null if endwhile or const for endforeach self var while isset public protected exit foreach throw elseif include __FILE__ empty require_once do xor return parent clone use __CLASS__ __LINE__ else break print eval new catch __METHOD__ case exception default die require __FUNCTION__ enddeclare final try switch continue endfor endif declare unset true false trait goto instanceof insteadof __DIR__ __NAMESPACE__ yield finally", c: [n.CLCM, n.HCM, { cN: "comment", b: "/\\*", e: "\\*/", c: [{ cN: "phpdoc", b: "\\s@[A-Za-z]+" }, t] }, { cN: "comment", b: "__halt_compiler.+?;", eW: !0, k: "__halt_compiler", l: n.UIR }, { cN: "string", b: "<<<['\"]?\\w+['\"]?$", e: "^\\w+;", c: [n.BE] }, t, i, { cN: "function", bK: "function", e: /[;{]/, i: "\\$|\\[|%", c: [n.UTM, { cN: "params", b: "\\(", e: "\\)", c: ["self", i, n.CBLCLM, r, u] }] }, { cN: "class", bK: "class interface", e: "{", i: /[:\(\$"]/, c: [{ bK: "extends implements", r: 10 }, n.UTM] }, { bK: "namespace", e: ";", i: /[\.']/, c: [n.UTM] }, { bK: "use", e: ";", c: [n.UTM] }, { b: "=>" }, r, u] }
});
hljs.registerLanguage("python", function(n) {
    var t = { cN: "prompt", b: /^(>>>|\.\.\.) / },
        i = { cN: "string", c: [n.BE], v: [{ b: /(u|b)?r?'''/, e: /'''/, c: [t], r: 10 }, { b: /(u|b)?r?"""/, e: /"""/, c: [t], r: 10 }, { b: /(u|r|ur)'/, e: /'/, r: 10 }, { b: /(u|r|ur)"/, e: /"/, r: 10 }, { b: /(b|br)'/, e: /'/ }, { b: /(b|br)"/, e: /"/ }, n.ASM, n.QSM] },
        r = { cN: "number", r: 0, v: [{ b: n.BNR + "[lLjJ]?" }, { b: "\\b(0o[0-7]+)[lLjJ]?" }, { b: n.CNR + "[lLjJ]?" }] },
        f = { cN: "params", b: /\(/, e: /\)/, c: ["self", t, r, i] },
        u = { e: /:/, i: /[${=;\n]/, c: [n.UTM, f] };
    return { k: { keyword: "and elif is global as in if from raise for except finally print import pass return exec else break not with class assert yield try while continue del or def lambda nonlocal|10 None True False", built_in: "Ellipsis NotImplemented" }, i: /(<\/|->|\?)/, c: [t, r, i, n.HCM, n.inherit(u, { cN: "function", bK: "def", r: 10 }), n.inherit(u, { cN: "class", bK: "class" }), { cN: "decorator", b: /@/, e: /$/ }, { b: /\b(print|exec)\(/ }] }
});
hljs.registerLanguage("sql", function(n) { return { cI: !0, i: /[<>]/, c: [{ cN: "operator", b: "\\b(begin|end|start|commit|rollback|savepoint|lock|alter|create|drop|rename|call|delete|do|handler|insert|load|replace|select|truncate|update|set|show|pragma|grant|merge)\\b(?!:)", e: ";", eW: !0, k: { keyword: "all partial global month current_timestamp using go revoke smallint indicator end-exec disconnect zone with character assertion to add current_user usage input local alter match collate real then rollback get read timestamp session_user not integer bit unique day minute desc insert execute like ilike|2 level decimal drop continue isolation found where constraints domain right national some module transaction relative second connect escape close system_user for deferred section cast current sqlstate allocate intersect deallocate numeric public preserve full goto initially asc no key output collation group by union session both last language constraint column of space foreign deferrable prior connection unknown action commit view or first into float year primary cascaded except restrict set references names table outer open select size are rows from prepare distinct leading create only next inner authorization schema corresponding option declare precision immediate else timezone_minute external varying translation true case exception join hour default double scroll value cursor descriptor values dec fetch procedure delete and false int is describe char as at in varchar null trailing any absolute current_time end grant privileges when cross check write current_date pad begin temporary exec time update catalog user sql date on identity timezone_hour natural whenever interval work order cascade diagnostics nchar having left call do handler load replace truncate start lock show pragma exists number trigger if before after each row merge matched database", aggregate: "count sum min max avg" }, c: [{ cN: "string", b: "'", e: "'", c: [n.BE, { b: "''" }] }, { cN: "string", b: '"', e: '"', c: [n.BE, { b: '""' }] }, { cN: "string", b: "`", e: "`", c: [n.BE] }, n.CNM] }, n.CBLCLM, { cN: "comment", b: "--", e: "$" }] } });
hljs.registerLanguage("ini", function(n) { return { cI: !0, i: /\S/, c: [{ cN: "comment", b: ";", e: "$" }, { cN: "title", b: "^\\[", e: "\\]" }, { cN: "setting", b: "^[a-z0-9\\[\\]_-]+[ \\t]*=[ \\t]*", e: "$", c: [{ cN: "value", eW: !0, k: "on off true false yes no", c: [n.QSM, n.NM], r: 0 }] }] } });
hljs.registerLanguage("perl", function(n) {
    var i = "getpwent getservent quotemeta msgrcv scalar kill dbmclose undef lc ma syswrite tr send umask sysopen shmwrite vec qx utime local oct semctl localtime readpipe do return format read sprintf dbmopen pop getpgrp not getpwnam rewinddir qqfileno qw endprotoent wait sethostent bless s|0 opendir continue each sleep endgrent shutdown dump chomp connect getsockname die socketpair close flock exists index shmgetsub for endpwent redo lstat msgctl setpgrp abs exit select print ref gethostbyaddr unshift fcntl syscall goto getnetbyaddr join gmtime symlink semget splice x|0 getpeername recv log setsockopt cos last reverse gethostbyname getgrnam study formline endhostent times chop length gethostent getnetent pack getprotoent getservbyname rand mkdir pos chmod y|0 substr endnetent printf next open msgsnd readdir use unlink getsockopt getpriority rindex wantarray hex system getservbyport endservent int chr untie rmdir prototype tell listen fork shmread ucfirst setprotoent else sysseek link getgrgid shmctl waitpid unpack getnetbyname reset chdir grep split require caller lcfirst until warn while values shift telldir getpwuid my getprotobynumber delete and sort uc defined srand accept package seekdir getprotobyname semop our rename seek if q|0 chroot sysread setpwent no crypt getc chown sqrt write setnetent setpriority foreach tie sin msgget map stat getlogin unless elsif truncate exec keys glob tied closedirioctl socket readlink eval xor readline binmode setservent eof ord bind alarm pipe atan2 getgrent exp time push setgrent gt lt or ne m|0 break given say state when",
        r = { cN: "subst", b: "[$@]\\{", e: "\\}", k: i },
        u = { b: "->{", e: "}" },
        f = { cN: "variable", v: [{ b: /\$\d/ }, { b: /[\$\%\@\*](\^\w\b|#\w+(\:\:\w+)*|{\w+}|\w+(\:\:\w*)*)/ }, { b: /[\$\%\@\*][^\s\w{]/, r: 0 }] },
        e = { cN: "comment", b: "^(__END__|__DATA__)", e: "\\n$", r: 5 },
        o = [n.BE, r, f],
        t = [f, n.HCM, e, { cN: "comment", b: "^\\=\\w", e: "\\=cut", eW: !0 }, u, { cN: "string", c: o, v: [{ b: "q[qwxr]?\\s*\\(", e: "\\)", r: 5 }, { b: "q[qwxr]?\\s*\\[", e: "\\]", r: 5 }, { b: "q[qwxr]?\\s*\\{", e: "\\}", r: 5 }, { b: "q[qwxr]?\\s*\\|", e: "\\|", r: 5 }, { b: "q[qwxr]?\\s*\\<", e: "\\>", r: 5 }, { b: "qw\\s+q", e: "q", r: 5 }, { b: "'", e: "'", c: [n.BE] }, { b: '"', e: '"' }, { b: "`", e: "`", c: [n.BE] }, { b: "{\\w+}", c: [], r: 0 }, { b: "-?\\w+\\s*\\=\\>", c: [], r: 0 }] }, { cN: "number", b: "(\\b0[0-7_]+)|(\\b0x[0-9a-fA-F_]+)|(\\b[1-9][0-9_]*(\\.[0-9_]+)?)|[0_]\\b", r: 0 }, { b: "(\\/\\/|" + n.RSR + "|\\b(split|return|print|reverse|grep)\\b)\\s*", k: "split return print reverse grep", r: 0, c: [n.HCM, e, { cN: "regexp", b: "(s|tr|y)/(\\\\.|[^/])*/(\\\\.|[^/])*/[a-z]*", r: 10 }, { cN: "regexp", b: "(m|qr)?/", e: "/[a-z]*", c: [n.BE], r: 0 }] }, { cN: "sub", bK: "sub", e: "(\\s*\\(.*?\\))?[;{]", r: 5 }, { cN: "operator", b: "-\\w\\b", r: 0 }];
    return r.c = t, u.c = t, { k: i, c: t }
});
hljs.registerLanguage("objectivec", function(n) {
    var t = /[a-zA-Z@][a-zA-Z0-9_]*/,
        i = "@interface @class @protocol @implementation";
    return { k: { keyword: "int float while char export sizeof typedef const struct for union unsigned long volatile static bool mutable if do return goto void enum else break extern asm case short default double register explicit signed typename this switch continue wchar_t inline readonly assign self synchronized id nonatomic super unichar IBOutlet IBAction strong weak @private @protected @public @try @property @end @throw @catch @finally @synthesize @dynamic @selector @optional @required", literal: "false true FALSE TRUE nil YES NO NULL", built_in: "NSString NSDictionary CGRect CGPoint UIButton UILabel UITextView UIWebView MKMapView UISegmentedControl NSObject UITableViewDelegate UITableViewDataSource NSThread UIActivityIndicator UITabbar UIToolBar UIBarButtonItem UIImageView NSAutoreleasePool UITableView BOOL NSInteger CGFloat NSException NSLog NSMutableString NSMutableArray NSMutableDictionary NSURL NSIndexPath CGSize UITableViewCell UIView UIViewController UINavigationBar UINavigationController UITabBarController UIPopoverController UIPopoverControllerDelegate UIImage NSNumber UISearchBar NSFetchedResultsController NSFetchedResultsChangeType UIScrollView UIScrollViewDelegate UIEdgeInsets UIColor UIFont UIApplication NSNotFound NSNotificationCenter NSNotification UILocalNotification NSBundle NSFileManager NSTimeInterval NSDate NSCalendar NSUserDefaults UIWindow NSRange NSArray NSError NSURLRequest NSURLConnection UIInterfaceOrientation MPMoviePlayerController dispatch_once_t dispatch_queue_t dispatch_sync dispatch_async dispatch_once" }, l: t, i: "<\/", c: [n.CLCM, n.CBLCLM, n.CNM, n.QSM, { cN: "string", b: "'", e: "[^\\\\]'", i: "[^\\\\][^']" }, { cN: "preprocessor", b: "#import", e: "$", c: [{ cN: "title", b: '"', e: '"' }, { cN: "title", b: "<", e: ">" }] }, { cN: "preprocessor", b: "#", e: "$" }, { cN: "class", b: "(" + i.split(" ").join("|") + ")\\b", e: "({|$)", k: i, l: t, c: [n.UTM] }, { cN: "variable", b: "\\." + n.UIR, r: 0 }] }
});
hljs.registerLanguage("coffeescript", function(n) {
    var r = { keyword: "in if for while finally new do return else break catch instanceof throw try this switch continue typeof delete debugger super then unless until loop of by when and or is isnt not", literal: "true false null undefined yes no on off", reserved: "case default function var void with const let enum export import native __hasProp __extends __slice __bind __indexOf", built_in: "npm require console print module exports global window document" },
        t = "[A-Za-z$_][0-9A-Za-z$_]*",
        u = n.inherit(n.TM, { b: t }),
        i = { cN: "subst", b: /#\{/, e: /}/, k: r },
        f = [n.BNM, n.inherit(n.CNM, { starts: { e: "(\\s*/)?", r: 0 } }), { cN: "string", v: [{ b: /'''/, e: /'''/, c: [n.BE] }, { b: /'/, e: /'/, c: [n.BE] }, { b: /"""/, e: /"""/, c: [n.BE, i] }, { b: /"/, e: /"/, c: [n.BE, i] }] }, { cN: "regexp", v: [{ b: "///", e: "///", c: [i, n.HCM] }, { b: "//[gim]*", r: 0 }, { b: "/\\S(\\\\.|[^\\n])*?/[gim]*(?=\\s|\\W|$)" }] }, { cN: "property", b: "@" + t }, { b: "`", e: "`", eB: !0, eE: !0, sL: "javascript" }];
    return i.c = f, { k: r, c: f.concat([{ cN: "comment", b: "###", e: "###" }, n.HCM, { cN: "function", b: "(" + t + "\\s*=\\s*)?(\\(.*\\))?\\s*\\B[-=]>", e: "[-=]>", rB: !0, c: [u, { cN: "params", b: "\\(", rB: !0, c: [{ b: /\(/, e: /\)/, k: r, c: ["self"].concat(f) }] }] }, { cN: "class", bK: "class", e: "$", i: /[:="\[\]]/, c: [{ bK: "extends", eW: !0, i: /[:="\[\]]/, c: [u] }, u] }, { cN: "attribute", b: t + ":", e: ":", rB: !0, eE: !0, r: 0 }]) }
});
hljs.registerLanguage("nginx", function(n) {
    var t = { cN: "variable", v: [{ b: /\$\d+/ }, { b: /\$\{/, e: /}/ }, { b: "[\\$\\@]" + n.UIR }] },
        i = { eW: !0, l: "[a-z/_]+", k: { built_in: "on off yes no true false none blocked debug info notice warn error crit select break last permanent redirect kqueue rtsig epoll poll /dev/poll" }, r: 0, i: "=>", c: [n.HCM, { cN: "string", c: [n.BE, t], v: [{ b: /"/, e: /"/ }, { b: /'/, e: /'/ }] }, { cN: "url", b: "([a-z]+):/", e: "\\s", eW: !0, eE: !0 }, { cN: "regexp", c: [n.BE, t], v: [{ b: "\\s\\^", e: "\\s|{|;", rE: !0 }, { b: "~\\*?\\s+", e: "\\s|{|;", rE: !0 }, { b: "\\*(\\.[a-z\\-]+)+" }, { b: "([a-z\\-]+\\.)+\\*" }] }, { cN: "number", b: "\\b\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}(:\\d{1,5})?\\b" }, { cN: "number", b: "\\b\\d+[kKmMgGdshdwy]*\\b", r: 0 }, t] };
    return { c: [n.HCM, { b: n.UIR + "\\s", e: ";|{", rB: !0, c: [n.inherit(n.UTM, { starts: i })], r: 0 }], i: "[^\\s\\}]" }
});
hljs.registerLanguage("json", function(n) {
    var i = { literal: "true false null" },
        t = [n.QSM, n.CNM],
        r = { cN: "value", e: ",", eW: !0, eE: !0, c: t, k: i },
        u = { b: "{", e: "}", c: [{ cN: "attribute", b: '\\s*"', e: '"\\s*:\\s*', eB: !0, eE: !0, c: [n.BE], i: "\\n", starts: r }], i: "\\S" },
        f = { b: "\\[", e: "\\]", c: [n.inherit(r, { cN: null })], i: "\\S" };
    return t.splice(t.length, 0, u, f), { c: t, k: i, i: "\\S" }
});
hljs.registerLanguage("apache", function(n) { var t = { cN: "number", b: "[\\$%]\\d+" }; return { cI: !0, c: [n.HCM, { cN: "tag", b: "<\/?", e: ">" }, { cN: "keyword", b: /\w+/, r: 0, k: { common: "order deny allow setenv rewriterule rewriteengine rewritecond documentroot sethandler errordocument loadmodule options header listen serverroot servername" }, starts: { e: /$/, r: 0, k: { literal: "on off all" }, c: [{ cN: "sqbracket", b: "\\s\\[", e: "\\]$" }, { cN: "cbracket", b: "[\\$%]\\{", e: "\\}", c: ["self", t] }, t, n.QSM] } }], i: /\S/ } });
hljs.registerLanguage("cpp", function(n) { var t = { keyword: "false int float while private char catch export virtual operator sizeof dynamic_cast|10 typedef const_cast|10 const struct for static_cast|10 union namespace unsigned long throw volatile static protected bool template mutable if public friend do return goto auto void enum else break new extern using true class asm case typeid short reinterpret_cast|10 default double register explicit signed typename try this switch continue wchar_t inline delete alignof char16_t char32_t constexpr decltype noexcept nullptr static_assert thread_local restrict _Bool complex _Complex _Imaginary", built_in: "std string cin cout cerr clog stringstream istringstream ostringstream auto_ptr deque list queue stack vector map set bitset multiset multimap unordered_set unordered_map unordered_multiset unordered_multimap array shared_ptr abort abs acos asin atan2 atan calloc ceil cosh cos exit exp fabs floor fmod fprintf fputs free frexp fscanf isalnum isalpha iscntrl isdigit isgraph islower isprint ispunct isspace isupper isxdigit tolower toupper labs ldexp log10 log malloc memchr memcmp memcpy memset modf pow printf putchar puts scanf sinh sin snprintf sprintf sqrt sscanf strcat strchr strcmp strcpy strcspn strlen strncat strncmp strncpy strpbrk strrchr strspn strstr tanh tan vfprintf vprintf vsprintf" }; return { aliases: ["c"], k: t, i: "<\/", c: [n.CLCM, n.CBLCLM, n.QSM, { cN: "string", b: "'\\\\?.", e: "'", i: "." }, { cN: "number", b: "\\b(\\d+(\\.\\d*)?|\\.\\d+)(u|U|l|L|ul|UL|f|F)" }, n.CNM, { cN: "preprocessor", b: "#", e: "$", c: [{ b: "include\\s*<", e: ">", i: "\\n" }, n.CLCM] }, { cN: "stl_container", b: "\\b(deque|list|queue|stack|vector|map|set|bitset|multiset|multimap|unordered_map|unordered_set|unordered_multiset|unordered_multimap|array)\\s*<", e: ">", k: t, r: 10, c: ["self"] }] } });
hljs.registerLanguage("makefile", function(n) { var t = { cN: "variable", b: /\$\(/, e: /\)/, c: [n.BE] }; return { c: [n.HCM, { b: /^\w+\s*\W*=/, rB: !0, r: 0, starts: { cN: "constant", e: /\s*\W*=/, eE: !0, starts: { e: /$/, r: 0, c: [t] } } }, { cN: "title", b: /^[\w]+:\s*$/ }, { cN: "phony", b: /^\.PHONY:/, e: /$/, k: ".PHONY", l: /[\.\w]+/ }, { b: /^\t+/, e: /$/, c: [n.QSM, t] }] } })