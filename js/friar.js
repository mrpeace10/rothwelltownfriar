// Rothwell Town Friar — live "open now" status and today's hours.
// Hours in minutes after midnight, UK time. Index 0 = Sunday.
(function () {
  var HOURS = [
    [16 * 60, 21 * 60],      // Sunday    4pm – 9pm
    [15 * 60, 21 * 60],      // Monday    3pm – 9pm
    [15 * 60, 21 * 60],      // Tuesday
    [15 * 60, 21 * 60],      // Wednesday
    [15 * 60, 21 * 60],      // Thursday
    [11 * 60 + 30, 21 * 60], // Friday    11:30am – 9pm
    [11 * 60 + 30, 21 * 60]  // Saturday
  ];
  var DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  function fmt(mins) {
    var h = Math.floor(mins / 60), m = mins % 60;
    var suffix = h >= 12 ? 'pm' : 'am';
    var h12 = h % 12 || 12;
    return h12 + (m ? ':' + String(m).padStart(2, '0') : '') + suffix;
  }

  // Current day and time in the UK, whatever the visitor's timezone.
  function ukNow() {
    try {
      var parts = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Europe/London', weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23'
      }).formatToParts(new Date());
      var get = function (t) { return parts.find(function (p) { return p.type === t; }).value; };
      var day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(get('weekday'));
      return { day: day, mins: parseInt(get('hour'), 10) * 60 + parseInt(get('minute'), 10) };
    } catch (e) {
      var d = new Date();
      return { day: d.getDay(), mins: d.getHours() * 60 + d.getMinutes() };
    }
  }

  function update() {
    var now = ukNow();
    var today = HOURS[now.day];
    var status = document.querySelector('[data-open-status]');
    var text = document.querySelector('[data-open-text]');
    var todayEl = document.querySelector('[data-today-hours]');

    if (todayEl) todayEl.textContent = DAYS[now.day] + ', ' + fmt(today[0]) + ' – ' + fmt(today[1]);

    document.querySelectorAll('.rf-hours-table tr').forEach(function (tr) {
      tr.classList.toggle('is-today', Number(tr.getAttribute('data-day')) === now.day);
    });

    if (!status || !text) return;
    var msg, open = false;
    if (now.mins >= today[0] && now.mins < today[1]) {
      open = true;
      msg = 'Open now · until ' + fmt(today[1]);
    } else if (now.mins < today[0]) {
      msg = 'Closed · opens today at ' + fmt(today[0]);
    } else {
      var next = (now.day + 1) % 7;
      msg = 'Closed · opens tomorrow at ' + fmt(HOURS[next][0]);
    }
    status.classList.toggle('is-open', open);
    status.classList.toggle('is-closed', !open);
    text.textContent = msg;
  }

  update();
  setInterval(update, 60 * 1000);
})();

// Mobile menu toggle
(function () {
  var btn = document.querySelector('.rf-menu-toggle');
  var links = document.getElementById('rf-links');
  if (!btn || !links) return;
  function set(open) {
    links.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', String(open));
    btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }
  btn.addEventListener('click', function () { set(!links.classList.contains('open')); });
  links.addEventListener('click', function (e) { if (e.target.tagName === 'A') set(false); });
})();

// Floating "Call to order" bar: only show once the hero buttons have scrolled away
(function () {
  var bar = document.querySelector('.rf-float-call');
  var hero = document.querySelector('.rf-hero-actions');
  if (!bar || !hero || !('IntersectionObserver' in window)) return;
  bar.classList.add('is-hidden');
  new IntersectionObserver(function (entries) {
    bar.classList.toggle('is-hidden', entries[0].isIntersecting);
  }).observe(hero);
})();
