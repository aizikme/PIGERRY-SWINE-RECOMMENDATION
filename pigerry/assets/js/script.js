/* Swine Farmer Service Recommender System: vanilla JavaScript */

(function () {
    'use strict';

    /* ------------------------------------------------------------------
     * Mobile menu
     * ---------------------------------------------------------------- */
    var toggle = document.getElementById('menuToggle');
    var backdrop = document.getElementById('navBackdrop');

    function setNav(open) {
        document.body.classList.toggle('nav-open', open);
        if (toggle) toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    }

    if (toggle) {
        toggle.addEventListener('click', function () {
            setNav(!document.body.classList.contains('nav-open'));
        });
    }
    if (backdrop) backdrop.addEventListener('click', function () { setNav(false); });
    document.addEventListener('keydown', function (ev) {
        if (ev.key === 'Escape') setNav(false);
    });

    /* ------------------------------------------------------------------
     * Assessment wizard
     * ---------------------------------------------------------------- */
    var form = document.getElementById('assessmentForm');
    if (!form) return;

    var sections = Array.prototype.slice.call(form.querySelectorAll('.form-step'));
    var total = sections.length;               // question sections + review
    var stepperItems = Array.prototype.slice.call(document.querySelectorAll('.stepper-item'));
    var btnBack = document.getElementById('btnBack');
    var btnNext = document.getElementById('btnNext');
    var btnSubmit = document.getElementById('btnSubmit');
    var status = document.getElementById('stepStatus');
    var current = parseInt(form.getAttribute('data-start-step'), 10) || 1;

    function visibleFields(section) {
        return Array.prototype.slice.call(section.querySelectorAll('.field')).filter(function (f) {
            return !f.hidden;
        });
    }

    /* ---- Conditional fields (e.g. ASF outbreak year) ---- */
    function applyConditions() {
        form.querySelectorAll('[data-show-if]').forEach(function (field) {
            var rule = field.getAttribute('data-show-if').split(':');
            var controller = form.querySelector('input[name="' + rule[0] + '"]:checked');
            var show = !!controller && controller.value === rule[1];
            field.hidden = !show;
            field.querySelectorAll('input, select').forEach(function (el) {
                el.disabled = !show;
                if (!show) el.value = '';
            });
            if (!show) field.classList.remove('has-error');
        });
    }

    /* ---- "None" options are exclusive within a checkbox group ---- */
    form.addEventListener('change', function (ev) {
        var el = ev.target;
        if (el.type === 'checkbox' && el.name.slice(-2) === '[]') {
            var group = form.querySelectorAll('input[type="checkbox"][name="' + el.name + '"]');
            if (el.hasAttribute('data-exclusive') && el.checked) {
                group.forEach(function (c) { if (c !== el) c.checked = false; });
            } else if (el.checked) {
                group.forEach(function (c) { if (c.hasAttribute('data-exclusive')) c.checked = false; });
            }
        }
        if (el.name === 'asf_status') applyConditions();

        var field = el.closest('.field');
        if (field) field.classList.remove('has-error');
    });
    form.addEventListener('input', function (ev) {
        var field = ev.target.closest('.field');
        if (field) field.classList.remove('has-error');
    });

    /* ---- Validation ---- */
    function fieldIsValid(field) {
        var type = field.getAttribute('data-type');
        if (type === 'radio' || type === 'checkbox') {
            return !!field.querySelector('input:checked');
        }
        var input = field.querySelector('input, select');
        if (!input) return true;
        var value = input.value.trim();
        if (value === '') return false;
        if (type === 'number') {
            var n = Number(value);
            if (isNaN(n) || Math.floor(n) !== n) return false;
            if (input.min !== '' && n < Number(input.min)) return false;
            if (input.max !== '' && n > Number(input.max)) return false;
        }
        return true;
    }

    function validateSection(section) {
        var firstInvalid = null;
        visibleFields(section).forEach(function (field) {
            if (field.getAttribute('data-required') !== '1') return;
            var ok = fieldIsValid(field);
            field.classList.toggle('has-error', !ok);
            if (!ok && !firstInvalid) firstInvalid = field;
        });
        if (firstInvalid) {
            firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return !firstInvalid;
    }

    /* ---- Navigation ---- */
    function show(n, scroll) {
        current = Math.max(1, Math.min(total, n));

        sections.forEach(function (s) {
            s.hidden = parseInt(s.getAttribute('data-step'), 10) !== current;
        });

        stepperItems.forEach(function (item, i) {
            var step = i + 1;
            item.classList.toggle('is-active', step === current);
            item.classList.toggle('is-done', step < current);
            if (step === current) item.setAttribute('aria-current', 'step');
            else item.removeAttribute('aria-current');
        });

        btnBack.style.visibility = current === 1 ? 'hidden' : 'visible';
        btnNext.hidden = current === total;
        btnSubmit.hidden = current !== total;

        var title = sections[current - 1].getAttribute('data-title');
        status.textContent = 'Step ' + current + ' of ' + total + ': ' + title;

        if (current === total) buildReview();
        if (scroll !== false) {
            var top = form.getBoundingClientRect().top + window.pageYOffset - 140;
            window.scrollTo({ top: Math.max(0, top - 40), behavior: 'smooth' });
        }
    }

    btnNext.addEventListener('click', function () {
        if (validateSection(sections[current - 1])) show(current + 1);
    });
    btnBack.addEventListener('click', function () { show(current - 1); });

    stepperItems.forEach(function (item) {
        item.addEventListener('click', function () {
            var target = parseInt(item.getAttribute('data-goto'), 10);
            if (target < current) show(target);
        });
    });

    // Enter should move forward, not submit early.
    form.addEventListener('keydown', function (ev) {
        if (ev.key === 'Enter' && ev.target.tagName === 'INPUT' && ev.target.type !== 'checkbox' && current < total) {
            ev.preventDefault();
            btnNext.click();
        }
    });

    // Final guard: validate every section before sending.
    form.addEventListener('submit', function (ev) {
        for (var i = 0; i < total; i++) {
            if (!validateSection(sections[i])) {
                ev.preventDefault();
                show(i + 1, false);
                validateSection(sections[i]);
                return;
            }
        }
    });

    /* ---- Review summary ---- */
    function fieldValue(field) {
        var type = field.getAttribute('data-type');
        if (type === 'radio' || type === 'checkbox') {
            var picked = Array.prototype.slice.call(field.querySelectorAll('input:checked')).map(function (i) {
                return i.parentNode.querySelector('span').textContent.trim();
            });
            return picked.join(', ');
        }
        var input = field.querySelector('input, select');
        if (!input || input.value === '') return '';
        if (input.tagName === 'SELECT') return input.options[input.selectedIndex].text;
        var unit = field.querySelector('.unit');
        return input.value + (unit ? ' ' + unit.textContent : '');
    }

    function buildReview() {
        var wrap = document.getElementById('reviewSummary');
        wrap.textContent = '';

        sections.slice(0, total - 1).forEach(function (section) {
            var stepNo = section.getAttribute('data-step');

            var block = document.createElement('div');
            block.className = 'review-block';

            var head = document.createElement('div');
            head.className = 'review-head';
            var h3 = document.createElement('h3');
            h3.textContent = section.getAttribute('data-title');
            var edit = document.createElement('button');
            edit.type = 'button';
            edit.className = 'link-btn';
            edit.textContent = 'Edit';
            edit.addEventListener('click', function () { show(parseInt(stepNo, 10)); });
            head.appendChild(h3);
            head.appendChild(edit);
            block.appendChild(head);

            var dl = document.createElement('dl');
            dl.style.margin = '0';
            visibleFields(section).forEach(function (field) {
                var row = document.createElement('div');
                row.className = 'review-row';
                var dt = document.createElement('dt');
                dt.textContent = field.querySelector('.lbl').textContent;
                var dd = document.createElement('dd');
                dd.textContent = fieldValue(field) || 'Not answered';
                row.appendChild(dt);
                row.appendChild(dd);
                dl.appendChild(row);
            });
            block.appendChild(dl);
            wrap.appendChild(block);
        });
    }

    /* ---- Init ---- */
    applyConditions();
    show(current, false);
})();
