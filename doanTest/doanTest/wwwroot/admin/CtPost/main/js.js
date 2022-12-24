function addEventNotifyHub(n) {
    n.client.recievedNotification = function (n) {
        for (var t, r = $("#common-userId").html(), i = 0; i < n.length; i++)
            if (n[i] == r) {
                $("#notify-list").attr("data-page", -1);
                $("#totalnotify-badge").length ? $("#totalnotify-badge").html(+$("#totalnotify-badge").html() + 1) : $("#page-header-user-notify").append('<span class="badge badge-danger badge-pill" id="totalnotify-badge">1<\/span>');
                t = document.getElementById("notifyAudio").play();
                t !== undefined && t.then(() => { }).catch(() => { });
                break
            }
    }
}

function initialiseState() { "showNotification" in ServiceWorkerRegistration.prototype && "PushManager" in window && (loadSubscription(), navigator.serviceWorker.ready.then(function (n) { n.pushManager.getSubscription().then(function (n) { n && sendSubscriptionToServer(n) }).catch(function () { }) })) }

function sendSubscriptionToServer(n) {
    var t = base64Encode(n.getKey("p256dh")),
        i = base64Encode(n.getKey("auth"));
    $.ajax({ url: "/WebPush/SaveEndPoint", type: "post", dateType: "text", data: { endpoint: n.endpoint, p256dh: t, auth: i } })
}

function loadSubscription() { if (Notification.permission !== "denied" && Notification.permission !== "granted") { showFormSubscription(); return } }

function subscribe() {
    navigator.serviceWorker.ready.then(function (n) {
        var t = { userVisibleOnly: !0 },
            i = urlB64ToUint8Array("BAZiWHF2O8KEkfCjxjfyO6pc7sdJK1kY-83eSGNaU8WIzt2ELcMdG24VQ1hgaOmZPV3N6u-Q_smlXeNpvj19IUw");
        t.applicationServerKey = i;
        n.pushManager.subscribe(t).then(function (n) { return sendSubscriptionToServer(n) }).catch(function () { loadSubscription() })
    })
}

function showFormSubscription() { subscribe() }

function showFormBlocked() { }

function urlB64ToUint8Array(n) { for (var u = "=".repeat((4 - n.length % 4) % 4), f = (n + u).replace(/\-/g, "+").replace(/_/g, "/"), i = window.atob(f), r = new Uint8Array(i.length), t = 0; t < i.length; ++t) r[t] = i.charCodeAt(t); return r }

function base64Encode(n) { return btoa(String.fromCharCode.apply(null, new Uint8Array(n))) }
CKEDITOR_BASEPATH = "/Plugins/ckeditor/",
    function timeAgo() {
        var i = { prefix: "", suffix: " trước", seconds: "vài giây", minute: "khoảng 1 phút", minutes: "%d phút", hour: "khoảng 1 giờ", hours: "khoảng %d giờ", day: "1 ngày", days: "%d ngày", month: "khoảng 1 tháng", months: "%d tháng", year: "khoảng 1 năm", years: "%d năm" },
            n = function (n, t) { return i[n] && i[n].replace(/%d/i, Math.abs(Math.round(t))) },
            f = function (t) {
                if (t) {
                    t = t.replace(/\.\d+/, "");
                    t = t.replace(/-/, "/").replace(/-/, "/");
                    t = t.replace(/T/, " ").replace(/Z/, " UTC");
                    t = t.replace(/([\+\-]\d\d)\:?(\d\d)/, " $1$2");
                    t = new Date(t * 1e3 || t);
                    var s = new Date,
                        u = (s.getTime() - t) * .001 >> 0,
                        f = u / 60,
                        e = f / 60,
                        r = e / 24,
                        o = r / 365;
                    return i.prefix + (u < 45 && n("seconds", u) || u < 90 && n("minute", 1) || f < 45 && n("minutes", f) || f < 90 && n("hour", 1) || e < 24 && n("hours", e) || e < 42 && n("day", 1) || r < 30 && n("days", r) || r < 45 && n("month", 1) || r < 365 && n("months", r / 30) || o < 1.5 && n("year", 1) || n("years", o)) + i.suffix
                }
            },
            r = document.getElementsByClassName("format-time"),
            u, t;
        for (u in r) t = r[u], typeof t == "object" && (t.innerHTML = f(t.getAttribute("title") || t.getAttribute("datetime")));
        setTimeout(timeAgo, 3e4)
    }();
var Kteam = function () {
    function e(n) { $("html, body").animate({ scrollTop: n }, "fast") }

    function o(n) {
        var i = n.replace(/\D/g, ""),
            t = new Date(parseInt(i));
        return isNaN(t.getTime()) && (t = new Date(n)), t.toLocaleString()
    }

    function r() {
        $("pre > code:not(.hljs)").each(function (n, t) { hljs.highlightBlock(t) });
        s("pre > code")
    }

    function s(t) {
        $(t).parent().each(function () {
            var u, i, r, t;
            for (++n, u = $(this).text(), i = [], i = u.split("\n"), r = "", t = 1; t <= i.length; t++) r += "<div>" + t + "<\/div>";
            $(this).html('<div class="headcode"><div class="tabscode"><\/div><div class="formatright"><div class="collapse-expand" data-value="collapse-expand-' + n + '" title="Mở rộng - thu gọn code"><span><\/span><\/div><div class="copycode" data-value="copycodetagfor-' + n + '" title="Copy code"><span><\/span><\/div><\/div><\/div><div class="formatcodecontent" id="collapse-expand-' + n + '"><div id="copycodetagfor-' + n + '">' + $(this).html() + '<\/div><div class="formatnumber">' + r + "<\/div><\/div>")
        })
    }

    function h(n) { $(document).on("click", n, function () { $("#" + $(this).attr("data-value")).hasClass("expanded") ? ($("#" + $(this).attr("data-value")).removeClass("expanded"), $(this).children().css("background-position", "-40px 0")) : ($("#" + $(this).attr("data-value")).addClass("expanded"), $(this).children().css("background-position", "-80px 0")) }) }

    function c(n) {
        $(document).on("click", n, function () {
            var n = document.createElement("textarea"),
                t;
            n.id = "copycode_tmp";
            n.style.height = 0;
            document.body.appendChild(n);
            n.value = $("#" + $(this).attr("data-value")).text();
            t = document.querySelector("#copycode_tmp");
            t.select();
            document.execCommand("copy");
            document.body.removeChild(n)
        })
    }

    function l() {
        $("#page-header-user-notify").on("click", function () {
            var n = +$("#notify-list").attr("data-page");
            (n == -1 || $.trim($("#notify-list").html()) == "") && (n = 0, $.ajax({
                method: "GET",
                url: $("#notify-list").attr("data-action"),
                data: { page: n },
                success: function (t) {
                    $("#notify-list").html(t);
                    $("#notify-list").attr("data-page", n + 1);
                    $("#totalnotify-badge").remove();
                    $("#notify-list").parent().css("margin", "-1px -8px -8px -8px")
                }
            }))
        });
        $(".notify-wrapper").on("click", ".notify-item", function () { $(this).attr("data-isread") !== "true" && ($(this).attr("data-isread", !1), $.ajax({ type: "POST", data: { targetId: $(this).attr("data-target"), targetType: $(this).attr("data-type") }, url: $("#notify-list").attr("data-read"), success: function () { } })) });
        $("#notify-list").scroll(function () {
            var n = +$("#notify-list").attr("data-page");
            Math.round($(this).scrollTop() + $(this).innerHeight(), 10) + 10 >= $(this)[0].scrollHeight && $.ajax({ method: "GET", url: $("#notify-list").attr("data-action"), data: { page: n }, success: function (t) { t.includes("Không có thông báo.") || ($("#notify-list").append(t), $("#notify-list").attr("data-page", n + 1)) } })
        });
        $("#notify-wrapper").on("click", "#btnMoreNtify", function () {
            var n = +$(this).attr("data-page");
            $(this).attr("data-page", n + 1);
            $.ajax({
                method: "GET",
                url: $("#notify-list").attr("data-action"),
                data: { page: n, header: !1 },
                success: function (n) {
                    $("#btnMoreNtify").remove();
                    n.includes("Không có thông báo.") || $("#notify-wrapper").append(n)
                }
            })
        })
    }

    function a() {
        $(document).mouseup(function (n) {
            var t = $(".custom-menu-wrapper > div > div");
            t.is(n.target) || t.has(n.target).length !== 0 || $("#nav-item-learn").has(n.target).length || $(".custom-menu-wrapper:visible").length && ($(".custom-menu-wrapper").hide(), $("body").css("overflow", ""), $(".sidebar-backdrop").remove())
        });
        $("#nav-item-learn").click(function () { $(".custom-menu-wrapper").css("display") == "none" ? ($(".custom-menu-wrapper").show(), $("body").css("overflow", "hidden"), $("body").append('<div class="sidebar-backdrop fade show"><\/div>'), $("#sidebarInputSearchBranchMenu").focus()) : ($(".custom-menu-wrapper").hide(), $("body").css("overflow", ""), $(".sidebar-backdrop").remove()) })
    }

    function v(n) {
        $("#sidebarBranchList > .list-group > div.list-group-item").removeClass("active");
        $("#sidebarBranchList > .list-group > div.list-group-item.branch-menu-item-" + n).addClass("active");
        $("#sidebarCatList").html($("#sidebarCatMenuHidden-" + n).children().clone());
        $(".cat-menu-skeleton").hide();
        $("#sidebarCourseList").html("");
        $("#sidebarCourseMenuWrapperParent").hide();
        $(".course-menu-skeleton").show();
        $("#sidebarCatMenuWrapperParent").show();
        $("#sidebarCatMenuWrapper").slimScroll({ height: "100%" });
        Kteam.filterHtml("#sidebarInputSearchCatMenu", "#sidebarCatList > .list-group > div.list-group-item");
        $("#sidebarInputSearchCatMenu").focus()
    }

    function y(n) {
        $(".sidebar-courses-list-" + n).length == 0 ? $.ajax({
            type: "GET",
            url: "/Common/SideBarCoursesDesktop",
            data: { idCat: n },
            success: function (t) {
                $("#sidebarCourseMenuWrapperCache").append(t);
                $("#sidebarCatList > .list-group > div.list-group-item").removeClass("active");
                $("#sidebarCatList > .list-group > div.list-group-item.cat-menu-item-" + n).addClass("active");
                $("#sidebarCourseList").html(t);
                $(".course-menu-skeleton").hide();
                $("#sidebarCourseMenuWrapperParent").show();
                $("#sidebarCourseMenuWrapper").slimScroll({ height: "100%" });
                Kteam.filterHtml("#sidebarInputSearchCourseMenu", "#sidebarCourseList > .list-group > div.list-group-item");
                $("#sidebarInputSearchCourseMenu").focus()
            }
        }) : ($("#sidebarCatList > .list-group > div.list-group-item").removeClass("active"), $("#sidebarCatList > .list-group > div.list-group-item.cat-menu-item-" + n).addClass("active"), $("#sidebarCourseList").html(""), $("#sidebarCourseList").html($(".sidebar-courses-list-" + n).clone()), $(".course-menu-skeleton").hide(), $("#sidebarCourseMenuWrapperParent").show(), $("#sidebarCourseMenuWrapper").slimScroll({ height: "100%" }), Kteam.filterHtml("#sidebarInputSearchCourseMenu", "#sidebarCourseList > .list-group > div.list-group-item"), $("#sidebarInputSearchCourseMenu").focus())
    }

    function p() {
        $("#page-container").on("click", ".content-post h2", function () {
            var n = $(this).nextUntil("h2");
            $(n).is(":hidden") ? $(this).removeClass("un-expanded") : $(this).addClass("un-expanded");
            n.slideToggle()
        })
    }

    function w() {
        $("#HistoryAction").length && setTimeout(function () {
            if (t()) {
                var n = $('#__AjaxAntiForgeryForm input[name="__RequestVerificationToken"]').val();
                $.ajax({ method: "POST", url: $("input#HistoryAction").val(), data: { __RequestVerificationToken: n, targetId: $("input#HistoryTargetId").val(), targetType: $("input#HistoryTargetType").val() }, success: function () { } })
            }
        }, 5e3)
    }

    function b() { $("#page-container").on("click", 'a[data-toggle="confirm"]', function () { return confirm($(this).attr("data-confirm")) }) }

    function k(n, r, u) {
        if (event.stopPropagation(), t()) {
            var f = $('#__AjaxAntiForgeryForm input[name="__RequestVerificationToken"]').val();
            $.ajax({ method: "POST", url: u, data: { __RequestVerificationToken: f, targetId: n, targetType: r }, success: function (t) { t == !0 ? ($(".bookmark-" + n).removeClass("text-secondary").addClass("text-success"), $(".bookmark-" + n + " > i").removeClass("far").addClass("fas")) : ($(".bookmark-" + n).removeClass("text-success").addClass("text-secondary"), $(".bookmark-" + n + " > i").removeClass("fas").addClass("far")) } })
        } else i()
    }

    function d() { $(".btnShareFb").click(function () { FB.ui({ method: "share", href: $(this).attr("data-url"), picture: $(this).attr("data-image"), caption: $(this).attr("data-title"), description: $(this).attr("data-description") }, function (n) { n && !n.error_message }) }) }

    function g() {
        $(".bookmark-desktop").length && $(".bookmark-mobile").length && $(".bookmark-mobile").html($(".bookmark-desktop").html());
        $(".content-post").length && ($(".content-post a:not([target])").attr("target", "_blank"), $(".content-post table").addClass("table table-sm table-bordered table-responsive"), $(".content-post figure.table").addClass("table-responsive"))
    }

    function t() { return $("#common-authen").val() == "true" }

    function i() { $("#authen-modal").modal("show") }

    function nt() {
        if (t()) {
            $("#totalnotify-badge").length && $("title").html("(" + $("#totalnotify-badge").html() + ") " + $("title").attr("data-title"));
            $("#page-container").on("DOMSubtreeModified", "#page-header-user-notify", function () { $("#totalnotify-badge").length ? $("title").html("(" + $("#totalnotify-badge").html() + ") " + $("title").attr("data-title")) : $("title").html($("title").attr("data-title")) })
        }
    }

    function tt() {
        $(window).scroll(function () {
            var n = $(window).scrollTop();
            n >= 90 ? $(".btn-scrollTop").show() : $(".btn-scrollTop").hide()
        })
    }
    var n, it = function () {
        $(".common-fullname").html($("#common-fullname").html());
        $(".common-email").html($("#common-email").html());
        $(".common-avatar").attr("src", $("#common-avatar").attr("src"))
    },
        rt = function () {
            jQuery.fn.preventDoubleSubmission = function () {
                $(this).on("submit", function (n) {
                    var t = $(this);
                    t.data("submitted") === !0 ? n.preventDefault() : typeof t.valid != "undefined" && t.valid() && t.data("submitted", !0)
                });
                return this
            };
            $("form").preventDoubleSubmission()
        },
        u = function () { toastr.options = { closeButton: !0, debug: !1, newestOnTop: !1, progressBar: !1, positionClass: "toast-bottom-left", preventDuplicates: !1, onclick: null, showDuration: "300", hideDuration: "1000", timeOut: "5000", extendedTimeOut: "1000", showEasing: "swing", hideEasing: "linear", showMethod: "fadeIn", hideMethod: "fadeOut" } },
        ut = function (n, t) {
            $(n).on("keyup", function () {
                var n = $(this).val().toLowerCase();
                $(t).filter(function () { $(this).toggle($(this).text().toLowerCase().indexOf(n) > -1) })
            })
        },
        ft = function () {
            $.event.special.widthChanged = {
                remove: function () { $(this).children("iframe.width-changed").remove() },
                add: function () {
                    function f() {
                        var i = n.width();
                        t != i && (n.trigger("widthChanged", [i, t]), t = i)
                    }
                    var n = $(this),
                        i = n.children("iframe.width-changed"),
                        t, r, u;
                    i.length || (i = $("<iframe/>").addClass("width-changed").prependTo(this));
                    t = n.width();
                    r = 0;
                    u = i[0];
                    (u.contentWindow || u).onresize = function () {
                        clearTimeout(r);
                        r = setTimeout(f, 20)
                    }
                }
            }
        },
        et = function (n) { setTimeout(function () { $("html, body").animate({ scrollTop: $(n).offset().top - 200 }, "fast") }, 2e3) };
    n = 0;
    var f = function () {
        $(".asyncPartial").each(function (n, t) {
            var i = $(t).data("url");
            i && i.length > 0 && $(t).load(i)
        })
    },
        ot = function (n, r) { t() ? ($("#frm-report #ReportTargetId").val(n), $("#frm-report #ReportTargetType").val(r), $("#frm-report #Body").val(""), $("#frm-report span[data-valmsg-replace='true']").empty(), $("#report-modal").modal("show")) : i() },
        st = function () {
            var n = $("form#frm-report");
            n.submit(function (t) {
                t.preventDefault();
                $.ajax({
                    type: n.attr("method"),
                    url: n.attr("action"),
                    data: n.serialize(),
                    success: function (n) {
                        $("#frm-report span[data-valmsg-replace='true']").empty();
                        n.code == 1 ? ($("#report-modal").modal("hide"), $("#frm-report #BodyReport").val(""), toastr.info(n.err, "Thông báo")) : $("form#frm-report span[data-valmsg-for=BodyReport]").html(n.err)
                    }
                });
                return
            })
        };
    return {
        init: function () {
            it();
            f();
            l();
            st();
            w();
            r();
            c(".copycode");
            h(".collapse-expand");
            a();
            p();
            b();
            d();
            g();
            nt();
            tt();
            rt();
            ft();
            u()
        },
        filterHtml: function (n, t) { ut(n, t) },
        scrollToElementDelayed: function (n) { et(n) },
        scrollToPosition: function (n) { e(n) },
        createReport: function (n, t) { ot(n, t) },
        saveBookmark: function (n, t, i) { k(n, t, i) },
        renderDateTime: function (n) { return o(n) },
        renderSidebarMenuCat: function (n) { v(n) },
        renderSidebarMenuCourse: function (n) { y(n) },
        errorCode: { ErrorList: -1, ErrorMess: -2, Success: 1 },
        isAuthenticated: function () { return t() },
        showAuthenModal: function () { i() },
        helper: function (n) {
            switch (n) {
                case "loadDataAsync":
                    f();
                    break;
                case "toastr":
                    u();
                    break;
                case "highlightjs":
                    r();
                    break;
                default:
                    return !1
            }
        },
        helpers: function (n) {
            if (n instanceof Array)
                for (var t in n) Kteam.helper(n[t]);
            else Kteam.helper(n)
        }
    }
}();
$(function () {
    Kteam.init();
    setTimeout(function () {
        $.ajax({
            url: "/PageAd/Popup",
            type: "GET",
            success: function (n) {
                var i, t, r;
                if (n.code == 1 && typeof Storage != "undefined") {
                    if (localStorage.AdsPopupLastTime)
                        if (i = new Date(Date.now() + 108e5), localStorage.AdsPopupLastTime > i) localStorage.AdsPopupLastTime = i;
                        else return;
                    else localStorage.AdsPopupLastTime = new Date;
                    t = JSON.stringify(n.result);
                    localStorage.AdsPopup ? (r = localStorage.AdsPopup, t !== r && (localStorage.AdsPopup = t)) : localStorage.AdsPopup = t;
                    $("#adsPopupModal .block-content > a").attr("href", n.result.Url);
                    $("#adsPopupModal .block-content > a > img").attr("src", n.result.Image);
                    $("#adsPopupModal").modal("show")
                }
            }
        })
    }, 3e3)
});
$(function () {
    if (Kteam.isAuthenticated()) {
        var n = $.connection.notificationHub;
        addEventNotifyHub(n);
        $.connection.hub.start().done(function () { })
    }
});
$(window).on("load", function () { "serviceWorker" in navigator && navigator.serviceWorker.register("/service-worker.js").then(initialiseState) })