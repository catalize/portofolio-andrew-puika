/*!
 * Item: Kitzu
 * Description: Personal Portfolio Template
 * Author/Developer: Exill
 * Author/Developer URL: https://themeforest.net/user/exill
 * Version: v2.0.0
 * License: Themeforest Standard Licenses: https://themeforest.net/licenses
 */

/*----------- CUSTOM JS SCRIPTS -----------*/

(function($) {
  'use strict';



  $(function() {
    // Code here executes When the DOM is loaded...
    // Load partials pages
    // Open a lightbox section from any in-page button (hero CTAs, cross-links)
    $(document).on('click', '[data-open-section]', function (e) {
      e.preventDefault();
      var id = $(this).attr('data-open-section');
      $('.navbar .navbar-nav .nav-link[href="#' + id + '"]').trigger('click');
    });
    $("div[data-includeHTML]").each(function () {                
        $(this).load($(this).attr("data-includeHTML"));
        console.log("loaded");
    });
  });
  $(window).on('load', function() {
    // Code here executes When the page is loaded
  });
}(jQuery));

/* ---------- Catalize: resume timeline + hero reticle ---------- */
(function ($) {
  'use strict';
  $(function () {
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* Timeline */
    var $tl = $('#timeline');
    if ($tl.length) {
      $tl.addClass('tl-js');
      var $items = $tl.find('.tl-item');
      var $detail = $tl.find('.tl-detail');
      var $body = $detail.find('.tl-body');
      var $prev = $tl.find('.tl-prev');
      var $next = $tl.find('.tl-next');

      var visible = function () { return $items.not('.is-dim'); };

      var select = function ($it, scroll) {
        var type = $it.attr('data-type');
        $items.removeClass('is-selected').find('.tl-node').removeAttr('aria-current');
        $it.addClass('is-selected').find('.tl-node').attr('aria-current', 'true');
        $detail.attr('data-type', type).attr('data-now', $it.is('[data-now]') ? 'true' : 'false');
        $detail.find('.tl-badge').text(type === 'edu' ? 'Education' : 'Experience');
        $detail.find('.tl-title').text($it.find('.tl-f-title').text());
        $detail.find('.tl-meta').text($it.find('.tl-f-meta').text());
        var $d = $detail.find('.tl-desc').empty();
        $it.find('.tl-f-desc').each(function () { $('<p>').text($(this).text()).appendTo($d); });
        $body.removeClass('is-swap');
        void $body[0].offsetWidth;
        $body.addClass('is-swap');
        var v = visible(), i = v.index($it);
        $prev.prop('disabled', i <= 0);
        $next.prop('disabled', i >= v.length - 1);
        if (scroll && $it[0].scrollIntoView) {
          $it[0].scrollIntoView({ inline: 'center', block: 'nearest', behavior: reduce ? 'auto' : 'smooth' });
        }
      };

      var step = function (d, focus) {
        var v = visible();
        var i = v.index($items.filter('.is-selected'));
        var $n = v.eq(Math.max(0, Math.min(v.length - 1, i + d)));
        select($n, true);
        if (focus) { $n.find('.tl-node').trigger('focus'); }
      };

      $tl.on('click', '.tl-node', function () { select($(this).closest('.tl-item'), false); });
      $prev.on('click', function () { step(-1, false); });
      $next.on('click', function () { step(1, false); });
      $tl.find('.tl-track').on('keydown', function (e) {
        if (e.key === 'ArrowRight') { e.preventDefault(); step(1, true); }
        if (e.key === 'ArrowLeft') { e.preventDefault(); step(-1, true); }
      });

      $tl.on('click', '.tl-filter', function () {
        var f = $(this).attr('data-tl-filter');
        $tl.find('.tl-filter').removeClass('is-active').attr('aria-pressed', 'false');
        $(this).addClass('is-active').attr('aria-pressed', 'true');
        $items.each(function () {
          var dim = f !== 'all' && $(this).attr('data-type') !== f;
          $(this).toggleClass('is-dim', dim).find('.tl-node').prop('disabled', dim);
        });
        var $sel = $items.filter('.is-selected');
        if ($sel.hasClass('is-dim')) { select(visible().last(), true); }
        else { select($sel, false); }
      });

      select($items.last(), false);

      // When the resume opens, bring the selected entry into view (matters on narrow screens)
      $(document).on('click', '.navbar .nav-link[href="#resume"]', function () {
        setTimeout(function () {
          var track = $tl.find('.tl-track')[0];
          var sel = $items.filter('.is-selected')[0];
          if (track && sel) { track.scrollLeft = sel.offsetLeft - (track.clientWidth - sel.offsetWidth) / 2; }
        }, 700);
      });
    }

    /* Hero gaze reticle: follows the pointer, locks onto links and buttons */
    var hero = document.getElementById('home');
    var fine = window.matchMedia && window.matchMedia('(pointer: fine)').matches;
    if (hero && fine && !reduce) {
      var r = document.createElement('div');
      r.className = 'reticle';
      r.setAttribute('aria-hidden', 'true');
      document.body.appendChild(r);
      var tx = 0, ty = 0, x = 0, y = 0, raf = 0;
      var loop = function () {
        x += (tx - x) * 0.2; y += (ty - y) * 0.2;
        r.style.transform = 'translate(' + x.toFixed(1) + 'px,' + y.toFixed(1) + 'px)';
        raf = (Math.abs(tx - x) > 0.4 || Math.abs(ty - y) > 0.4) ? requestAnimationFrame(loop) : 0;
      };
      hero.addEventListener('pointermove', function (e) {
        if (!r.classList.contains('is-on')) { x = tx = e.clientX; y = ty = e.clientY; }
        tx = e.clientX; ty = e.clientY;
        r.classList.add('is-on');
        r.classList.toggle('is-lock', !!(e.target.closest && e.target.closest('a, button')));
        if (!raf) { raf = requestAnimationFrame(loop); }
      });
      hero.addEventListener('pointerleave', function () { r.classList.remove('is-on', 'is-lock'); });
      $(document).on('click', '.navbar .nav-link, [data-open-section]', function () { r.classList.remove('is-on', 'is-lock'); });
    }
  });
}(jQuery));
