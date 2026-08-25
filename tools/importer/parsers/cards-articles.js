/* eslint-disable */
/* global WebImporter */
/**
 * Parser for cards-articles. Base: cards.
 * Source: https://www.wknd-trendsetters.site/
 * Selector target: div.grid-layout.desktop-4-column (direct children are article cards)
 * Generated: 2026-08-25
 *
 * Cards block (with images): 2 columns, one row per card.
 *   Cell 1: card image.
 *   Cell 2: text content (tag/date meta + heading).
 * Each card is an <a class="article-card"> wrapping an image div and a body div.
 * The card's destination link is preserved by turning the card heading into a link.
 * (The "Latest articles" intro heading above the grid lives in section default content.)
 */
export default function parse(element, { document }) {
  // Each direct-child card. Cards may be <a> links or plain divs.
  const cards = Array.from(
    element.querySelectorAll(':scope > a.article-card, :scope > .article-card, :scope > a, :scope > div'),
  );

  const cells = [];

  cards.forEach((card) => {
    // Image cell: prefer the dedicated image wrapper's img, fall back to any img.
    const img = card.querySelector('.article-card-image img, img');

    // Text cell: the card body (meta + heading). Fall back to the card itself.
    const body = card.querySelector('.article-card-body');
    const contentCell = [];

    if (body) {
      // Preserve the card destination by wrapping the heading text in the card's link.
      const href = card.tagName === 'A' ? card.getAttribute('href') : null;
      const heading = body.querySelector('h2, h3, h4, [class*="heading"]');
      if (href && heading) {
        const link = document.createElement('a');
        link.href = href;
        while (heading.firstChild) link.appendChild(heading.firstChild);
        heading.appendChild(link);
      }
      contentCell.push(body);
    } else {
      const heading = card.querySelector('h2, h3, h4, [class*="heading"]');
      if (heading) contentCell.push(heading);
    }

    // Only add a row if the card has content.
    if (img || contentCell.length) {
      cells.push([img || '', contentCell]);
    }
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-articles', cells });
  element.replaceWith(block);
}
