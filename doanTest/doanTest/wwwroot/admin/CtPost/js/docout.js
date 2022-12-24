function reCalWidthDocOut() {
    $("#document-outline-desktop").width($("#content-post").width() / 3 - 3);
    $("#document-outline-desktop").height($(window).height() - 66);
    $("#content-post").css("min-height", $("#document-outline-desktop").height() + "px")
}! function(n, t, i, r) {
    "use strict";

    function f(t, i) {
        this.element = t;
        this.$element = n(t);
        this.settings = n.extend({}, e, i);
        this._defaults = e;
        this._name = u;
        this.$target = n(this.settings.target);
        this.init()
    }
    var u = "docout",
        e = { target: "body", immediate: !0, rootClass: "docout-root-wrap", childClass: "docout-child-wrap", elements: ["h1", "h2", "h3", "h4", "h5", "h6", "h7", "h8"], replace: !1, gntLink: function(t) { return n('<a href="#' + t.attr("id") + '">' + t.text() + "<\/a>") }, gntLinkWrap: function() { return n("<li><\/li>") }, gntRootWrap: function(t) { return n('<ul class="' + t + '"><\/ul>') }, gntChildWrap: function(t, i) { return n('<ul class="' + t + " " + t + "-" + i + '"><\/ul>') }, gntId: function(n, t) { return "docout-" + t } };
    n.extend(f.prototype, {
        init: function() { this.settings.immediate && this.generate() },
        generate: function() {
            var t, e, o, i = this,
                r = i.settings,
                h = i.$element.find(r.elements.join(",")),
                s = r.gntRootWrap(r.rootClass),
                f = -1,
                u = s,
                c = n.each(h, function(s, h) {
                    var c, l;
                    (e = n(h), t = r.elements.findIndex(function(n) { return e.is(n) }), -1 === f || t === f) || (t > f ? (c = r.gntChildWrap(r.childClass, t), o.append(c), u = c) : u.parents("ul").length > 0 && (l = u.parents("ul").length - t, u = u.parents().eq(l)));
                    o = i._gntEntryFor(e, s);
                    u.append(o);
                    f = t
                });
            return i.settings.replace ? i.$target.html(s) : i.$target.prepend(s), c
        },
        _gntEntryFor: function(n, t) { var i = this.settings; return n.attr("id") === r && n.attr("id", this.settings.gntId(n, t)), i.gntLinkWrap(n).append(i.gntLink(n)) }
    });
    n.fn[u] = function(t) {
        var e = arguments,
            i;
        return t === r || "object" == typeof t ? this.each(function() { n.data(this, "plugin_" + u) || n.data(this, "plugin_" + u, new f(this, t)) }) : "string" == typeof t && "_" !== t[0] && "init" !== t ? (this.each(function() {
            var r = n.data(this, "plugin_" + u);
            r instanceof f && "function" == typeof r[t] && (i = r[t].apply(r, Array.prototype.slice.call(e, 1)));
            "destroy" === t && n.data(this, "plugin_" + u, null)
        }), i !== r ? i : this) : void 0
    }
}(jQuery, window, document);
$(window).scroll(function() {
    var u = $("#content-post").offset().top,
        n = $("#document-outline-desktop"),
        t = $(window).scrollTop(),
        i, r;
    t >= u - 90 ? (i = n.offset().top + n.height(), r = $("#content-post").offset().top + $("#content-post").height(), i >= r ? n.offset().top >= t + 110 ? (n.removeClass("doc-out-fixed-bot"), n.addClass("doc-out-fixed-top")) : (n.removeClass("doc-out-fixed-top"), n.addClass("doc-out-fixed-bot")) : (n.removeClass("doc-out-fixed-bot"), n.addClass("doc-out-fixed-top"))) : n.removeClass("doc-out-fixed-top")
});
$(".auto-resizable-iframe").on("widthChanged", function() { reCalWidthDocOut() });
$(window).on("resize", function() { reCalWidthDocOut() });
$(function() {
    $("#content-post").docout({ target: ".document-outline", elements: ["h2", "h3"] });
    reCalWidthDocOut();
    $(".docout-root-wrap").html().trim() || $(".docout-root-wrap").parent().prepend('<div class="text-muted">Không có mục lục.<\/div>');
    scrollItems = $("#document-outline-desktop a").map(function() { var n = $($(this).attr("href")); if (n.length) return n })
});
var lastId, topMenu = $(".document-outline"),
    scrollItems;
topMenu.on("click", "a", function(n) {
    n.preventDefault();
    var t = $(this).attr("href"),
        i = $(t).offset().top - 90;
    $("html, body").animate({ scrollTop: i }, "fast")
});
$(window).scroll(function() {
    var i = $(this).scrollTop() + 110,
        n = scrollItems.map(function() { if ($(this).offset().top < i) return this }),
        t;
    n = n[n.length - 1];
    t = n && n.length ? n[0].id : "";
    lastId !== t && (lastId = t, $(".document-outline a").removeClass("active").filter("[href='#" + t + "']").addClass("active"))
})