! function() {
    var l = window,
        u = window.TapfiliateObject || "tap",
        a = l[u] && l[u].q || [];
    if (!l[u] || !l[u].loaded) {
        l[u] = function(t, n, e, o, i, r) {
            var a = l[u][t];
            if ("function" != typeof a) throw 'Function "' + t + '" not supported';
            a(n, e, o, i, r)
        }, l[u].q = a, l[u].loaded = !0, l[u].baseUrl = "//frstre.com", l[u].baseUrlDepr = "https://tapi.tapfiliate.com";
        var n, f;
        l[u].Tracking = l[u].Tracking || {}, l[u].options = l[u].options || {};
        var p = {},
            c = !1,
            s = function(t) {
                var n, e, o, i, r;
                if (e = [], r = /%20/g, o = function(t, n) {
                        n = "function" == typeof n ? n() : null === n ? "" : n, e[e.length] = encodeURIComponent(t) + "=" + encodeURIComponent(n)
                    }, t instanceof Array)
                    for (i in t) o(i, t[i]);
                else
                    for (n in t) m(n, t[n], o);
                return e.join("&").replace(r, "+")
            },
            d = new function() {
                var s = {},
                    l = 0,
                    u = [],
                    c = [],
                    f = !1,
                    o = this;
                return this.addMethod = function(t) {
                    if (t.supported()) return l++, s[t.key] = t, this
                }, this.init = function() {
                    var t = l;

                    function n() {
                        --t <= 0 && (f = !0, function() {
                            for (var t = u.length - 1; 0 <= t; t--) o.read.apply(o, u[t]);
                            for (var n = c.length - 1; 0 <= n; n--) o.write.apply(o, c[n])
                        }())
                    }
                    for (var e in s) "function" == typeof s[e].init ? s[e].init(n) : n()
                }, this.read = function(t, n, o) {
                    if (f) {
                        var i = l,
                            r = [],
                            a = {};
                        for (var e in s) {
                            a[e] = setTimeout(c, 2e3);
                            try {
                                s[e].read(t, c)
                            } catch (t) {}
                        }
                    } else u.push(arguments);

                    function c(t, n, e) {
                        clearTimeout(a[e]), n && n.constructor === Array ? r = r.concat(n) : r.push(n), 0 === --i && o(null, r)
                    }
                }, this.write = function(t, n, e, o) {
                    f || c.push(arguments);
                    var i = l;

                    function r(t, n) {
                        0 === --i && "function" == typeof o && o()
                    }
                    for (var a in s) s[a].write(t, n, e, r)
                }, this.hasMethod = function(t) {
                    return void 0 !== s[t]
                }, this
            };
        t.prototype.supported = function() {
            return !0
        };
        var o = new t("1pCookie");
        o.read = function(t, n) {
            for (var e = t + "=", o = document.cookie.split(";"), i = [], r = 0; r < o.length; r++) {
                var a = o[r].replace(/^\s+|\s+$/g, "");
                0 === a.indexOf(e) && i.push(a.substring(e.length, a.length))
            }
            return "function" == typeof n ? n(null, i, this.key) : i
        }, o.write = function(t, n, e, o) {
            e = e || {};
            var i = new Date;
            i.setTime(i.getTime() + 31536e6);
            var r, a = "expires=" + i.toGMTString();
            if (e.cookie_domain) r = "." + e.cookie_domain;
            else try {
                var c = window.location.href.match(/(?:https?:\/\/)?(?:www\.)?(.*?)\//);
                r = "." + c[c.length - 1]
            } catch (t) {}
            var s = t + "=" + n + "; " + a + "; SameSite=None; Secure; path=/";
            s += void 0 !== r ? "; domain=" + r : "", document.cookie = s, o()
        };
        var i = new t("localStorage");
        i.supported = function() {
            return "undefined" != typeof localStorage
        }, i.read = function(t, n) {
            n(null, localStorage.getItem(t), this.key)
        }, i.write = function(t, n, e, o) {
            o(null, localStorage.setItem(t, n))
        }, (_.prototype = new t).supported = function() {
            return "undefined" != typeof postMessage
        }, _.prototype.handleEvent = function(t) {
            if (t.origin === this.options.url) {
                var n;
                try {
                    n = JSON.parse(t.data)
                } catch (t) {}
                n && n.callback && this.callbacks[n.callback](n.value)
            }
        }, _.prototype.init = function(t) {
            var n = document.createElement("IFRAME");
            n.setAttribute("src", this.options.url + "/?" + this.options.beaconVersion), n.style.width = "1px", n.style.height = "1px", n.style.display = "none", h(window, "message", this);
            var e = this;
            h(n, "load", function() {
                e.beacon = n.contentWindow, t()
            }), setTimeout(function() {
                document.body.appendChild(n)
            }, 0)
        }, _.prototype.post = function(t) {
            this.beacon.postMessage(t, this.options.url)
        }, _.prototype.read = function(t, n) {
            var e = this;
            this.callbacks.get = function(t) {
                n(null, t, e.key)
            };
            var o = {
                action: "getAll",
                key: t
            };
            this.post(JSON.stringify(o))
        }, _.prototype.write = function(t, n, e, o) {
            this.callbacks.set = function(t) {
                o(null, t)
            };
            var i = {
                action: "set",
                key: t,
                value: n
            };
            this.post(JSON.stringify(i))
        }, l[u].Create = l[u].Create || {}, l[u].Create.calls = l[u].Create.calls || [], l[u].Click = l[u].Click || {}, l[u].Click.q = l[u].Click.q || [], l[u].Click.calls = l[u].Click.calls || [], l[u].Click.track = function(t, n, e, o) {
            if (window.self === window.top) {
                var i;
                if (null === (e = e || {}).referral_code_param && void 0 === e.referral_code || (i = function(t, n) {
                        return t || 0 === t ? t : (n = n || "ref", y()[n])
                    }(e.referral_code, e.referral_code_param)), l[u].Click.calls.push(e), !(t && n || i)) return q("No tracking parameters", e, o);
                var r = y(),
                    a = null;
                for (var c in r) "tm_" === c.slice(0, 3) && ((a = a || {})[c.slice(3, c.length)] = r[c]);
                var s = {
                    data: {
                        acc: f,
                        aid: t,
                        sid: n,
                        callback: o,
                        options: e,
                        pm: a,
                        ref: document.referrer || null,
                        cup: document.location.href || null,
                        int: p.integration || null
                    }
                };
                i && (s.data.refc = i), l[u].Click.q.push(s), g()
            }
        }, l[u].Click.flushQueue = function() {
            l[u].Click.q.reverse();
            for (var t = l[u].Click.q.length - 1; 0 <= t; t--) {
                var i = l[u].Click.q[t].data,
                    n = w();
                if (i.aid && i.sid || i.refc) {
                    var e = {
                        acc: i.acc,
                        aid: i.aid,
                        sid: i.sid,
                        pm: i.pm,
                        ref: i.ref,
                        cup: i.cup,
                        refc: i.refc,
                        int: i.int
                    };
                    n && d.hasMethod("3pCookie") && (e.vids = n), k(l[u].baseUrl + "/event/", e, null, function(t, n) {
                        var e = t.response || t.responseText;
                        if (n && e) {
                            var o = JSON.parse(e);
                            if (o.vid) return d.write("tap_vid", o.vid, i.options), b([o.vid]), void("function" == typeof i.callback && (1 == i.options.always_callback ? i.callback(null, o) : i.callback(o)))
                        }
                        return q("Tracking request failed", i.options, i.callback)
                    })
                }
                l[u].Click.q.splice(t, 1)
            }
        }, l[u].Conversion = l[u].Conversion || {}, l[u].Conversion.q = l[u].Conversion.q || [], l[u].Conversion.calls = l[u].Conversion.calls || [], l[u].Conversion.flushQueue = function() {
            l[u].Conversion.q.reverse();
            for (var t = l[u].Conversion.q.length - 1; 0 <= t; t--) {
                var o = l[u].Conversion.q[t].data,
                    n = l[u].Conversion.q[t].type,
                    e = void 0 !== l[u].Conversion.q[t].vid ? l[u].Conversion.q[t].vid : w();
                if (!(o.acc && e || o.options.attribution_id || o.options.coupons && o.options.coupons.length || o.options.customer_id)) return q("Non-tracked visitor", o.options, o.callback);
                var i, r = l[u].baseUrlDepr + "/conversions/";
                if ("single" == n) i = {
                    acc: o.acc,
                    vid: e,
                    tid: o.tid,
                    tam: o.tam,
                    options: o.options,
                    ct: o.ct,
                    int: o.int
                };
                else {
                    if ("multi" != n) return q("Missing request type", o.options, o.callback);
                    i = {
                        acc: o.acc,
                        vid: e,
                        tid: o.tid,
                        options: o.options,
                        com: o.com,
                        int: o.int
                    }
                }
                k(r, i, "POST", function(t, n) {
                    if (!n) return q("Conversion denied", o.options, o.callback);
                    var e;
                    try {
                        e = JSON.parse(t.response)
                    } catch (t) {
                        return q("Conversion denied", o.options, o.callback)
                    }
                    "function" == typeof o.callback && (1 == o.options.always_callback ? o.callback(null, e) : o.callback(e, "success"))
                }), e && e.length && l[u].Conversion.q.splice(t, 1)
            }
        }, l[u].Customer = l[u].Customer || {}, l[u].Customer.q = l[u].Customer.q || [], l[u].Customer.calls = l[u].Customer.calls || [], l[u].Customer.flushQueue = function() {
            l[u].Customer.q.reverse();
            for (var t = l[u].Customer.q.length - 1; 0 <= t; t--) {
                var o = l[u].Customer.q[t].data,
                    n = void 0 !== l[u].Customer.q[t].vid ? l[u].Customer.q[t].vid : w();
                if (!(o.acc && n || o.options.coupons && o.options.coupons.length)) return q("Non-tracked visitor", o.options, o.callback);
                k(l[u].baseUrlDepr + "/customers/", {
                    acc: o.acc,
                    vid: n,
                    tid: o.tid,
                    options: o.options,
                    sta: o.sta
                }, "POST", function(t, n) {
                    if (!n) return q("Customer denied", o.options, o.callback);
                    var e;
                    try {
                        e = JSON.parse(t.response)
                    } catch (t) {
                        return q("Customer denied", o.options, o.callback)
                    }
                    "function" == typeof o.callback && (1 == o.options.always_callback ? o.callback(null, e) : o.callback(e, "success"))
                }), n && n.length && l[u].Customer.q.splice(t, 1)
            }
        }, l[u].create = function(t, n, e) {
            f = t,
                function(t) {
                    d.hasMethod("1pcookie") || d.addMethod(o), d.hasMethod("localStorage") || d.addMethod(i), t.include_methods && -1 < t.include_methods.indexOf("3p") && !d.hasMethod("3pCookie") && d.addMethod(new _("3pCookie", {
                        url: "https://b.frstre.com",
                        beaconVersion: "v1.4"
                    })), d.init()
                }(p = function() {
                    for (var t = {}, n = 0; n < arguments.length; n += 1)
                        for (var e = arguments[n], o = Object.keys(e), i = 0; i < o.length; i += 1) t[o[i]] = e[o[i]];
                    return t
                }(p, n || {})), d.read("tap_vid", {}, function(t, n) {
                    b(n), g(), "function" == typeof e && e()
                }), l[u].Create.calls.push({
                    accountId: t,
                    options: n
                })
        }, l[u].detect = function(t, n) {
            t = t || {}, this.urlParams = y();
            var e = this.urlParams[t.asset_param || "tap_a"],
                o = this.urlParams[t.source_param || "tap_s"];
            l[u].Click.track(e, o, t, n)
        }, l[u].click = function(t, n, e) {
            var o = t || {};
            n = n || {};
            var i = o.tap_a || o.asset_id,
                r = o.tap_s || o.source_id;
            void 0 !== o.referral_code && (n.referral_code = o.referral_code), l[u].Click.track(i, r, n, e)
        }, l[u].conversion = function(t, n, e, o, i) {
            if (window.self === window.top) {
                var r = {
                    type: "single",
                    data: {
                        acc: f,
                        tid: t = t || null,
                        tam: n = void 0 !== n ? n : null,
                        options: e = e || {},
                        ct: o,
                        callback: i,
                        int: p.integration || null
                    }
                };
                l[u].Conversion.q.push(r), g(), l[u].Conversion.calls.push({
                    type: "single",
                    tid: t,
                    tam: n,
                    options: e,
                    ct: o
                })
            }
        };

        function r(t, n, e, o) {
            if (window.self === window.top) {
                var i = {
                    data: {
                        acc: f,
                        tid: t = t || null,
                        sta: o,
                        options: n = n || {},
                        callback: e,
                        int: p.integration || null
                    }
                };
                l[u].Customer.q.push(i), g(), l[u].Customer.calls.push({
                    tid: t,
                    options: n
                })
            }
        }
        l[u].customer = function(t, n, e) {
            r(t, n, e, "customer")
        }, l[u].trial = function(t, n, e) {
            r(t, n, e, "trial")
        }, l[u].lead = function(t, n, e) {
            r(t, n, e, "lead")
        }, l[u].transactionMulti = function(t, n, e, o) {
            l[u].conversionMulti(t, n, e, o)
        }, l[u].conversionMulti = function(t, n, e, o) {
            var i = {
                type: "multi",
                data: {
                    acc: f,
                    tid: t,
                    com: e,
                    options: n = n || {},
                    callback: o,
                    int: p.integration || null
                }
            };
            l[u].Conversion.q.push(i), g(), l[u].Conversion.calls.push({
                type: "multi",
                tid: t,
                options: n,
                com: e
            })
        }, l[u].getTrackingId = function(o, i) {
            if (d.hasMethod("3pCookie")) throw "getTrackingId not supported with 3rd party cookies enabled";
            o = o || {};
            var r = 0;
            ! function e() {
                setTimeout(function() {
                    if (r++, !C()) return e();
                    if (!(200 < r)) {
                        var t = w(),
                            n = null;
                        t && (n = t.join("__")), "function" == typeof i && (1 == o.always_callback ? i(null, n) : i(n))
                    }
                }, 100)
            }()
        }, l[u].detectClick = function(t) {
            l[u].detect({
                referral_code_param: null
            }, t)
        }, l[u].transaction = function(t, n, e, o, i) {
            l[u].conversion(t, n, e, o, i)
        };
        try {
            c = y().tap_test || o.read("tap_debug").length
        } catch (t) {
            c = !1
        }
        var v = function() {
            o.write("tap_debug", "true", {}, function() {});
            var t = document.createElement("script");
            t.setAttribute("src", "https://script.tapfiliate.com/tapfiliate-debug.js"), t.setAttribute("async", !0), document.body.appendChild(t)
        };
        ! function() {
            if (c) {
                var t = document.onreadystatechange,
                    n = !1;

                function e() {
                    "function" == typeof t && t(), n || -1 < ["interactive", "complete"].indexOf(document.readyState) && (n = !0, v())
                }
                return document.onreadystatechange = e, window.onload = e
            }
            var o;
            a.reverse();
            for (var i = a.length - 1; 0 <= i; i--) {
                var r = a[i][0];
                "create" === r && o || (l[u].apply(window, a[i]), a.splice(i, 1), "create" === r && (o = !0))
            }
        }()
    }

    function h(t, n, e) {
        t.addEventListener ? t.addEventListener(n, e, !1) : t.attachEvent && t.attachEvent("on" + n, e)
    }

    function m(t, n, e) {
        var o, i, r, a;
        if (a = /\[\]$/, n instanceof Array)
            for (i = 0, r = n.length; i < r; i++) a.test(t) ? e(t, n[i]) : m(t + "[" + ("object" == typeof n[i] ? i : "") + "]", n[i], e);
        else if ("object" == typeof n)
            for (o in n) m(t + "[" + o + "]", n[o], e);
        else e(t, n)
    }

    function k(t, n, e, o) {
        (n = function(t) {
            for (var n in t) void 0 === t[n] && delete t[n];
            return t
        }(n)).sv = "tap-v3" + (d.hasMethod("3pCookie") ? "-3p" : "");
        var i = t + "?" + s(n),
            r = "GET" === (e = e || (2083 < i.length ? "POST" : "GET")) ? i : t;
        n = "POST" === e ? JSON.stringify(n) : null;
        var a = new XMLHttpRequest;
        if ("withCredentials" in a) a.open(e, r, !0);
        else {
            if ("undefined" == typeof XDomainRequest) return;

            function c() {}(a = new XDomainRequest).onerror = c, a.ontimeout = c, a.onprogress = c, a.onload = function() {
                "function" == typeof o && o(a, !0)
            }, a.timeout = 9e3, a.open(e, r)
        }
        a.onreadystatechange = function() {
            if (a.readyState < 4) return;
            if (200 !== a.status) return void("function" == typeof o && o(a, !1));
            4 === a.readyState && "function" == typeof o && o(a, !0)
        }, a.send(n)
    }

    function y() {
        function t(t) {
            return decodeURIComponent(t.replace(/\+/g, " "))
        }
        var n = {},
            e = location.search.substring(1),
            o = location.hash.substring(1),
            i = e.split("&");
        for (var r in i = i.concat(o.split("&")))
            if (i.hasOwnProperty(r)) {
                var a = i[r].toString().split("=");
                1 < a.length && (n[t(a[0])] = t(a[1]))
            } return n
    }

    function C() {
        return n
    }

    function g() {
        C() && !c && (l[u].Click.flushQueue(), l[u].Conversion.flushQueue(), l[u].Customer.flushQueue())
    }

    function b(t) {
        l[u].vid = t.sort()[0], l[u].vids = t, n = !0
    }

    function w() {
        if (l[u].vids) {
            for (var t = [], n = l[u].vids.length - 1; 0 <= n; n--) {
                var e = l[u].vids[n];
                e && -1 === t.indexOf(e) && t.push(e)
            }
            if (t.length) return t
        }
    }

    function t(t, n) {
        return this.key = t, this.options = n || {}, this.setOption = function(t, n) {
            this.options[t] = n
        }, this
    }

    function _() {
        return this.constructor.apply(this, arguments), this.callbacks = {}, this
    }

    function q(t, n, e) {
        if ("function" == typeof e) return 1 == n.always_callback ? e(t) : !0 === n.alwaysFireCb ? e(null, "error", t) : void 0
    }
}();