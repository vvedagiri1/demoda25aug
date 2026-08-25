/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: WKND Trendsetters site-wide cleanup.
 * All selectors verified against migration-work/cleaned.html.
 *
 * NOTE: `<header class="section secondary-section">` inside #main-content is the
 * authorable Intro section (section-1) and MUST NOT be removed. Only the global
 * site chrome (navbar, footer), skip link, breadcrumbs, and astro build
 * attributes are non-authorable.
 */

const TransformHook = {
  beforeTransform: 'beforeTransform',
  afterTransform: 'afterTransform',
};

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.beforeTransform) {
    // Breadcrumbs live inside the story block grid-layout and would otherwise be
    // captured into block cells by the parser (which runs between the hooks).
    // Verified in cleaned.html: <div class="breadcrumbs"> inside section-2.
    WebImporter.DOMUtils.remove(element, [
      '.skip-link',      // <a href="#main-content" class="skip-link">
      '.breadcrumbs',    // non-authorable breadcrumb trail in the story block
    ]);
  }

  if (hookName === TransformHook.afterTransform) {
    // Global site chrome, non-authorable. Verified in cleaned.html:
    //   <div class="navbar"> ... </div>  (header/nav + mega-menu + mobile toggle)
    //   <footer class="footer inverse-footer"> ... </footer>
    WebImporter.DOMUtils.remove(element, [
      '.navbar',
      'footer.footer',
    ]);

    // Strip astro build attributes present throughout the captured DOM
    // (e.g. data-astro-cid-37fxchfa). Non-authorable framework markers.
    element.querySelectorAll('[data-astro-cid-37fxchfa]').forEach((el) => {
      el.removeAttribute('data-astro-cid-37fxchfa');
    });
    element.querySelectorAll('[data-astro-cid-rbygaycu]').forEach((el) => {
      el.removeAttribute('data-astro-cid-rbygaycu');
    });
  }
}
