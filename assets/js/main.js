'use strict';

(() => {
  document.documentElement.classList.add('has-js');
  const header = document.querySelector('[data-site-header]');
  const toggle = document.querySelector('[data-menu-toggle]');
  const menu = document.querySelector('[data-mobile-menu]');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let lastFocused = null;

  const setHeaderState = () => header?.classList.toggle('is-scrolled', window.scrollY > 12);
  const closeMenu = ({ restoreFocus = true } = {}) => {
    if (!toggle || !menu) return;
    toggle.setAttribute('aria-expanded', 'false');
    menu.classList.remove('is-open');
    document.body.classList.remove('menu-open');
    if (restoreFocus && lastFocused) lastFocused.focus();
  };
  const openMenu = () => {
    if (!toggle || !menu) return;
    lastFocused = document.activeElement;
    toggle.setAttribute('aria-expanded', 'true');
    menu.classList.add('is-open');
    document.body.classList.add('menu-open');
    menu.querySelector('a')?.focus();
  };

  setHeaderState();
  window.addEventListener('scroll', setHeaderState, { passive: true });
  toggle?.addEventListener('click', () => toggle.getAttribute('aria-expanded') === 'true' ? closeMenu() : openMenu());
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menu?.classList.contains('is-open')) closeMenu();
    if (event.key === 'Tab' && menu?.classList.contains('is-open')) {
      const items = [toggle, ...menu.querySelectorAll('a, button')];
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
  });
  document.addEventListener('click', (event) => {
    if (menu?.classList.contains('is-open') && !menu.contains(event.target) && !toggle?.contains(event.target)) closeMenu({ restoreFocus: false });
  });
  menu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => closeMenu({ restoreFocus: false })));

  document.querySelectorAll('[data-current-year]').forEach((node) => { node.textContent = new Date().getFullYear(); });

  const contactForm = document.querySelector('[data-contact-form]');
  const contactStatus = document.querySelector('[data-form-status]');
  const updateContactField = (field, isInvalid) => {
    const describedBy = field.getAttribute('aria-describedby')?.split(' ') || [];
    const error = describedBy.map((id) => document.getElementById(id)).find((node) => node?.classList.contains('field-error'));
    field.setAttribute('aria-invalid', String(isInvalid));
    if (error) error.hidden = !isInvalid;
  };

  contactForm?.addEventListener('invalid', (event) => {
    updateContactField(event.target, true);
  }, true);
  contactForm?.addEventListener('input', (event) => {
    updateContactField(event.target, !event.target.validity.valid);
    if (contactStatus) contactStatus.hidden = true;
  });
  contactForm?.addEventListener('change', (event) => {
    updateContactField(event.target, !event.target.validity.valid);
  });
  contactForm?.addEventListener('submit', (event) => {
    if (contactForm.getAttribute('action') !== '#') return;
    event.preventDefault();
    if (!contactStatus) return;
    contactStatus.hidden = false;
    contactStatus.focus();
  });

  if (!reduceMotion && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
    }), { threshold: 0.12 });
    document.querySelectorAll('[data-reveal]').forEach((element) => observer.observe(element));
  }

  document.querySelectorAll('details.faq').forEach((item) => item.addEventListener('toggle', () => {
    if (!item.open) return;
    document.querySelectorAll('details.faq[open]').forEach((other) => { if (other !== item) other.removeAttribute('open'); });
  }));
})();
