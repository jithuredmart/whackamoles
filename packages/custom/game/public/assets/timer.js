/**
 * angular-timer - v1.3.3 - 2015-06-15 3:07 PM
 * https://github.com/siddii/angular-timer
 *
 * Copyright (c) 2015 Siddique Hameed
 * Licensed MIT <https://github.com/siddii/angular-timer/blob/master/LICENSE.txt>
 */
var timerModule = angular.module("timer", []).directive("timer", ["$compile",
    function(a) {
        return {
            restrict: "EA",
            replace: !1,
            scope: {
                interval: "=interval",
                startTimeAttr: "=startTime",
                endTimeAttr: "=endTime",
                countdownattr: "=countdown",
                finishCallback: "&finishCallback",
                autoStart: "&autoStart",
                language: "@?",
                fallback: "@?",
                maxTimeUnit: "="
            },
            controller: ["$scope", "$element", "$attrs", "$timeout", "I18nService", "$interpolate", "progressBarService",
                function(b, c, d, e, f, g, h) {
                    function i() {
                        b.timeoutId && clearTimeout(b.timeoutId)
                    }

                    function j() {
                        var a = {};
                        void 0 !== d.startTime && (b.millis = moment().diff(moment(b.startTimeAttr))), a = k.getTimeUnits(b.millis), b.maxTimeUnit && "day" !== b.maxTimeUnit ? "second" === b.maxTimeUnit ? (b.seconds = Math.floor(b.millis / 1e3), b.minutes = 0, b.hours = 0, b.days = 0, b.months = 0, b.years = 0) : "minute" === b.maxTimeUnit ? (b.seconds = Math.floor(b.millis / 1e3 % 60), b.minutes = Math.floor(b.millis / 6e4), b.hours = 0, b.days = 0, b.months = 0, b.years = 0) : "hour" === b.maxTimeUnit ? (b.seconds = Math.floor(b.millis / 1e3 % 60), b.minutes = Math.floor(b.millis / 6e4 % 60), b.hours = Math.floor(b.millis / 36e5), b.days = 0, b.months = 0, b.years = 0) : "month" === b.maxTimeUnit ? (b.seconds = Math.floor(b.millis / 1e3 % 60), b.minutes = Math.floor(b.millis / 6e4 % 60), b.hours = Math.floor(b.millis / 36e5 % 24), b.days = Math.floor(b.millis / 36e5 / 24 % 30), b.months = Math.floor(b.millis / 36e5 / 24 / 30), b.years = 0) : "year" === b.maxTimeUnit && (b.seconds = Math.floor(b.millis / 1e3 % 60), b.minutes = Math.floor(b.millis / 6e4 % 60), b.hours = Math.floor(b.millis / 36e5 % 24), b.days = Math.floor(b.millis / 36e5 / 24 % 30), b.months = Math.floor(b.millis / 36e5 / 24 / 30 % 12), b.years = Math.floor(b.millis / 36e5 / 24 / 365)) : (b.seconds = Math.floor(b.millis / 1e3 % 60), b.minutes = Math.floor(b.millis / 6e4 % 60), b.hours = Math.floor(b.millis / 36e5 % 24), b.days = Math.floor(b.millis / 36e5 / 24), b.months = 0, b.years = 0), b.secondsS = 1 === b.seconds ? "" : "s", b.minutesS = 1 === b.minutes ? "" : "s", b.hoursS = 1 === b.hours ? "" : "s", b.daysS = 1 === b.days ? "" : "s", b.monthsS = 1 === b.months ? "" : "s", b.yearsS = 1 === b.years ? "" : "s", b.secondUnit = a.seconds, b.minuteUnit = a.minutes, b.hourUnit = a.hours, b.dayUnit = a.days, b.monthUnit = a.months, b.yearUnit = a.years, b.sseconds = b.seconds < 10 ? "0" + b.seconds : b.seconds, b.mminutes = b.minutes < 10 ? "0" + b.minutes : b.minutes, b.hhours = b.hours < 10 ? "0" + b.hours : b.hours, b.ddays = b.days < 10 ? "0" + b.days : b.days, b.mmonths = b.months < 10 ? "0" + b.months : b.months, b.yyears = b.years < 10 ? "0" + b.years : b.years
                    }
                    "function" != typeof String.prototype.trim && (String.prototype.trim = function() {
                        return this.replace(/^\s+|\s+$/g, "")
                    }), b.autoStart = d.autoStart || d.autostart, b.language = b.language || "en", b.fallback = b.fallback || "en", b.$watch("language", function(a) {
                        void 0 !== a && k.init(a, b.fallback)
                    });
                    var k = new f;
                    k.init(b.language, b.fallback), b.displayProgressBar = 0, b.displayProgressActive = "active", c.append(0 === c.html().trim().length ? a("<span>" + g.startSymbol() + "millis" + g.endSymbol() + "</span>")(b) : a(c.contents())(b)), b.startTime = null, b.endTime = null, b.timeoutId = null, b.countdown = b.countdownattr && parseInt(b.countdownattr, 10) >= 0 ? parseInt(b.countdownattr, 10) : void 0, b.isRunning = !1, b.$on("timer-start", function() {
                        b.start()
                    }), b.$on("timer-resume", function() {
                        b.resume()
                    }), b.$on("timer-stop", function() {
                        b.stop()
                    }), b.$on("timer-clear", function() {
                        b.clear()
                    }), b.$on("timer-reset", function() {
                        b.reset()
                    }), b.$on("timer-set-countdown", function(a, c) {
                        b.countdown = c
                    }), b.$watch("startTimeAttr", function(a, c) {
                        a !== c && b.isRunning && b.start()
                    }), b.$watch("endTimeAttr", function(a, c) {
                        a !== c && b.isRunning && b.start()
                    }), b.start = c[0].start = function() {
                        b.startTime = b.startTimeAttr ? moment(b.startTimeAttr) : moment(), b.endTime = b.endTimeAttr ? moment(b.endTimeAttr) : null, b.countdown || (b.countdown = b.countdownattr && parseInt(b.countdownattr, 10) > 0 ? parseInt(b.countdownattr, 10) : void 0), i(), l(), b.isRunning = !0
                    }, b.resume = c[0].resume = function() {
                        i(), b.countdownattr && (b.countdown += 1), b.startTime = moment().diff(moment(b.stoppedTime).diff(moment(b.startTime))), l(), b.isRunning = !0
                    }, b.stop = b.pause = c[0].stop = c[0].pause = function() {
                        var a = b.timeoutId;
                        b.clear(), b.$emit("timer-stopped", {
                            timeoutId: a,
                            millis: b.millis,
                            seconds: b.seconds,
                            minutes: b.minutes,
                            hours: b.hours,
                            days: b.days
                        })
                    }, b.clear = c[0].clear = function() {
                        b.stoppedTime = moment(), i(), b.timeoutId = null, b.isRunning = !1
                    }, b.reset = c[0].reset = function() {
                        b.startTime = b.startTimeAttr ? moment(b.startTimeAttr) : moment(), b.endTime = b.endTimeAttr ? moment(b.endTimeAttr) : null, b.countdown = b.countdownattr && parseInt(b.countdownattr, 10) > 0 ? parseInt(b.countdownattr, 10) : void 0, i(), l(), b.isRunning = !1, b.clear()
                    }, c.bind("$destroy", function() {
                        i(), b.isRunning = !1
                    }), b.countdownattr ? (b.millis = 1e3 * b.countdownattr, b.addCDSeconds = c[0].addCDSeconds = function(a) {
                        b.countdown += a, b.$digest(), b.isRunning || b.start()
                    }, b.$on("timer-add-cd-seconds", function(a, c) {
                        e(function() {
                            b.addCDSeconds(c)
                        })
                    }), b.$on("timer-set-countdown-seconds", function(a, c) {
                        b.isRunning || b.clear(), b.countdown = c, b.millis = 1e3 * c, j()
                    })) : b.millis = 0, j();
                    var l = function m() {
                        var a = null;
                        b.millis = moment().diff(b.startTime);
                        var c = b.millis % 1e3;
                        return b.endTimeAttr && (a = b.endTimeAttr, b.millis = moment(b.endTime).diff(moment()), c = b.interval - b.millis % 1e3), b.countdownattr && (a = b.countdownattr, b.millis = 1e3 * b.countdown), b.millis < 0 ? (b.stop(), b.millis = 0, j(), void(b.finishCallback && b.$eval(b.finishCallback))) : (j(), b.timeoutId = setTimeout(function() {
                            m(), b.$digest()
                        }, b.interval - c), b.$emit("timer-tick", {
                            timeoutId: b.timeoutId,
                            millis: b.millis
                        }), b.countdown > 0 ? b.countdown-- : b.countdown <= 0 && (b.stop(), b.finishCallback && b.$eval(b.finishCallback)), void(null !== a && (b.progressBar = h.calculateProgressBar(b.startTime, b.millis, b.endTime, b.countdownattr), 100 === b.progressBar && (b.displayProgressActive = ""))))
                    };
                    (void 0 === b.autoStart || b.autoStart === !0) && b.start()
                }
            ]
        }
    }
]);
"undefined" != typeof module && "undefined" != typeof exports && module.exports === exports && (module.exports = timerModule);
var app = angular.module("timer");
app.factory("I18nService", function() {
    var a = function() {};
    return a.prototype.language = "en", a.prototype.fallback = "en", a.prototype.timeHumanizer = {}, a.prototype.init = function(a, b) {
        var c = humanizeDuration.getSupportedLanguages();
        this.fallback = void 0 !== b ? b : "en", -1 === c.indexOf(b) && (this.fallback = "en"), this.language = a, -1 === c.indexOf(a) && (this.language = this.fallback), moment.locale(this.language), this.timeHumanizer = humanizeDuration.humanizer({
            language: this.language,
            halfUnit: !1
        })
    }, a.prototype.getTimeUnits = function(a) {
        var b = 1e3 * Math.round(a / 1e3),
            c = {};
        return "undefined" != typeof this.timeHumanizer ? c = {
            millis: this.timeHumanizer(b, {
                units: ["milliseconds"]
            }),
            seconds: this.timeHumanizer(b, {
                units: ["seconds"]
            }),
            minutes: this.timeHumanizer(b, {
                units: ["minutes", "seconds"]
            }),
            hours: this.timeHumanizer(b, {
                units: ["hours", "minutes", "seconds"]
            }),
            days: this.timeHumanizer(b, {
                units: ["days", "hours", "minutes", "seconds"]
            }),
            months: this.timeHumanizer(b, {
                units: ["months", "days", "hours", "minutes", "seconds"]
            }),
            years: this.timeHumanizer(b, {
                units: ["years", "months", "days", "hours", "minutes", "seconds"]
            })
        } : console.error('i18nService has not been initialized. You must call i18nService.init("en") for example'), c
    }, a
});
var app = angular.module("timer");
app.factory("progressBarService", function() {
    var a = function() {};
    return a.prototype.calculateProgressBar = function(a, b, c, d) {
        var e, f, g = 0;
        return b /= 1e3, null !== c ? (e = moment(c), f = e.diff(a, "seconds"), g = 100 * b / f) : g = 100 * b / d, g = 100 - g, g = Math.round(10 * g) / 10, g > 100 && (g = 100), g
    }, new a
});