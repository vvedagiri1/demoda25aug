// eslint-disable-next-line import/no-unresolved
import { toClassName } from '../../scripts/aem.js';

/**
 * tabs-testimonials
 * Authored rows: [ tab cell (avatar + name + role) | panel cell (image + name + role + quote) ]
 * Decorated output:
 *   .tabs-testimonials (block)
 *     .tabs-testimonials-panel[role=tabpanel]  (one per person, active shown)
 *       .tabs-testimonials-panel-inner
 *         .tabs-testimonials-panel-media  (large portrait)
 *         .tabs-testimonials-panel-body   (name / role / quote)
 *     .tabs-testimonials-list[role=tablist]   (rendered below the panel)
 *       button.tabs-testimonials-tab[role=tab]
 *         .tabs-testimonials-avatar
 *         .tabs-testimonials-tab-text  (name / role)
 */
export default async function decorate(block) {
  const tablist = document.createElement('div');
  tablist.className = 'tabs-testimonials-list';
  tablist.setAttribute('role', 'tablist');

  const rows = [...block.children];

  rows.forEach((row, i) => {
    const cells = [...row.children];
    const tabCell = cells[0];
    const panelCell = cells[1];
    const id = toClassName(tabCell.textContent);

    // --- panel (reuse the authored row) ---
    row.className = 'tabs-testimonials-panel';
    row.id = `tabpanel-${id}`;
    row.setAttribute('aria-hidden', !!i);
    row.setAttribute('aria-labelledby', `tab-${id}`);
    row.setAttribute('role', 'tabpanel');

    if (panelCell) {
      panelCell.className = 'tabs-testimonials-panel-inner';
      const parts = [...panelCell.children];
      const media = parts.shift(); // first <p> holds the portrait image
      if (media) media.className = 'tabs-testimonials-panel-media';
      const body = document.createElement('div');
      body.className = 'tabs-testimonials-panel-body';
      parts.forEach((p) => body.append(p));
      panelCell.append(body);
    }

    // --- tab button (avatar + name/role) ---
    const button = document.createElement('button');
    button.className = 'tabs-testimonials-tab';
    button.id = `tab-${id}`;
    button.setAttribute('aria-controls', `tabpanel-${id}`);
    button.setAttribute('aria-selected', !i);
    button.setAttribute('role', 'tab');
    button.setAttribute('type', 'button');

    const tabParts = [...tabCell.children];
    const avatar = tabParts.shift(); // first <p> holds the avatar image
    if (avatar) {
      avatar.className = 'tabs-testimonials-avatar';
      button.append(avatar);
    }
    const tabText = document.createElement('span');
    tabText.className = 'tabs-testimonials-tab-text';
    tabParts.forEach((p) => tabText.append(p));
    button.append(tabText);

    button.addEventListener('click', () => {
      block.querySelectorAll('[role=tabpanel]').forEach((panel) => {
        panel.setAttribute('aria-hidden', true);
      });
      tablist.querySelectorAll('button').forEach((btn) => {
        btn.setAttribute('aria-selected', false);
      });
      row.setAttribute('aria-hidden', false);
      button.setAttribute('aria-selected', true);
    });

    tablist.append(button);
    tabCell.remove();
  });

  // tab strip renders below the panels (matches source)
  block.append(tablist);
}
