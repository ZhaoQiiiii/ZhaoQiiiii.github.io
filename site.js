/* Zhaoqi Wang — homepage interactions */
(function () {
    'use strict';

    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ---------- smooth anchor scrolling ---------- */
    document.querySelectorAll('a[href^="#"]:not(.skip-link)').forEach(function (anchor) {
        anchor.addEventListener('click', function (event) {
            var href = anchor.getAttribute('href');
            if (!href || href.length < 2) {
                event.preventDefault();
                return;
            }
            var target = document.querySelector(href);
            if (!target) return;
            event.preventDefault();
            target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
            if (history.replaceState) history.replaceState(null, '', href);
        });
    });

    /* ---------- reading progress & back to top ---------- */
    var progress = document.getElementById('progressBar');
    var backToTop = document.getElementById('backToTop');

    function onScroll() {
        var doc = document.documentElement;
        var max = doc.scrollHeight - doc.clientHeight;
        if (progress) {
            progress.style.width = (max > 0 ? Math.min(1, doc.scrollTop / max) : 0) * 100 + '%';
        }
        if (backToTop) {
            backToTop.classList.toggle('visible', window.scrollY > 500);
        }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    if (backToTop) {
        backToTop.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
        });
    }

    /* ---------- reveal on scroll ---------- */
    var reveals = document.querySelectorAll('.reveal');
    if (reduced || !('IntersectionObserver' in window)) {
        reveals.forEach(function (el) { el.classList.add('visible'); });
    } else {
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
        reveals.forEach(function (el) { observer.observe(el); });
    }

    /* ---------- theme toggle ---------- */
    var themeToggle = document.getElementById('themeToggle');
    var themeIcon = themeToggle ? themeToggle.querySelector('.theme-icon') : null;

    function syncTheme() {
        var dark = document.documentElement.classList.contains('dark');
        if (themeIcon) themeIcon.textContent = dark ? '☀' : '☾';
        if (themeToggle) {
            themeToggle.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
            themeToggle.setAttribute('aria-pressed', String(dark));
        }
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', function () {
            var dark = document.documentElement.classList.toggle('dark');
            try { localStorage.setItem('theme', dark ? 'dark' : 'light'); } catch (e) {}
            syncTheme();
        });
        syncTheme();
    }

    /* ---------- WeChat: click to copy ID ---------- */
    var wechatBtn = document.getElementById('wechatBtn');
    if (wechatBtn) {
        var wechatTip = wechatBtn.querySelector('.wechat-tip');
        var wechatTimer = null;
        var wechatFlash = function (text) {
            if (!wechatTip) return;
            wechatTip.textContent = text;
            wechatBtn.classList.add('copied');
            clearTimeout(wechatTimer);
            wechatTimer = setTimeout(function () {
                wechatBtn.classList.remove('copied');
            }, 1500);
        };
        wechatBtn.addEventListener('click', function () {
            var id = wechatBtn.getAttribute('data-wechat') || '';
            function legacyCopy() {
                var field = document.createElement('textarea');
                field.value = id;
                field.setAttribute('readonly', '');
                field.style.position = 'fixed';
                field.style.opacity = '0';
                document.body.appendChild(field);
                field.select();
                var copied = false;
                try { copied = document.execCommand('copy'); } catch (e) {}
                document.body.removeChild(field);
                return copied;
            }
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(id).then(function () {
                    wechatFlash('Copied!');
                }, function () {
                    wechatFlash(legacyCopy() ? 'Copied!' : (id || 'No ID'));
                });
            } else {
                wechatFlash(legacyCopy() ? 'Copied!' : (id || 'No ID'));
            }
        });
    }

    /* ---------- footer metadata ---------- */
    var year = document.getElementById('year');
    if (year) year.textContent = String(new Date().getFullYear());

    var updated = document.getElementById('last-updated');
    if (updated) {
        var date = new Date(document.lastModified);
        if (!isNaN(date.getTime())) {
            var month = String(date.getMonth() + 1).padStart(2, '0');
            var day = String(date.getDate()).padStart(2, '0');
            updated.textContent = date.getFullYear() + '-' + month + '-' + day;
        }
    }

    /* Only hide reveal elements once this script has initialized successfully.
       If this file 404s or throws early, the page keeps its visible no-js state. */
    document.documentElement.classList.replace('no-js', 'js');
})();
