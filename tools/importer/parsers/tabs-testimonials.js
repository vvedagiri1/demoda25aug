/* eslint-disable */
/* global WebImporter */
/**
 * Parser for tabs-testimonials. Base: tabs.
 * Source: https://www.wknd-trendsetters.site/
 * Selector target: .tabs-wrapper
 * Generated: 2026-08-25
 *
 * Tabs block: 2 columns, one row per tab.
 *   Cell 1: tab label (the menu button content — avatar + name + role).
 *   Cell 2: tab content (the matching .tab-pane — testimonial image + name/role + quote).
 * The source keeps content panes (.tabs-content > .tab-pane) and menu buttons
 * (.tab-menu > .tab-menu-link) as parallel lists, paired by index.
 */
export default function parse(element, { document }) {
  // Content panes (in document order).
  const panes = Array.from(
    element.querySelectorAll('.tabs-content > .tab-pane, .tab-pane'),
  );
  // Menu buttons act as the tab labels (in document order).
  const buttons = Array.from(
    element.querySelectorAll('.tab-menu .tab-menu-link, .tab-menu-link, .tab-menu button'),
  );

  const cells = [];
  const count = Math.max(panes.length, buttons.length);

  for (let i = 0; i < count; i += 1) {
    const label = buttons[i] || '';
    const content = panes[i] || '';
    // Skip only if both are missing.
    if (!label && !content) continue;
    cells.push([label, content]);
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'tabs-testimonials', cells });
  element.replaceWith(block);
}
