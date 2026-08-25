/* eslint-disable */
/* global WebImporter */
/**
 * Parser for hero-banner. Base: hero.
 * Source: https://www.wknd-trendsetters.site/
 * Selector target: div.grid-layout.desktop-1-column
 * Generated: 2026-08-25
 *
 * Hero block: 1 column, up to 3 rows (block name / background image / content).
 *   Row 2 (optional): background image
 *   Row 3: title (heading), subheading, CTA button(s)
 */
export default function parse(element, { document }) {
  // Background image: the cover/overlay image behind the content.
  const bgImage = element.querySelector('img.cover-image, img[class*="overlay"], img');

  // Content: heading, subheading, CTA links.
  const heading = element.querySelector('h1, h2, h3, [class*="heading"]');
  const subheading = element.querySelector('p, .subheading, [class*="subheading"]');
  const ctaLinks = Array.from(element.querySelectorAll('.button-group a, a.button'));

  // Empty-block guard: bail if no meaningful content.
  if (!heading && !subheading && !ctaLinks.length && !bgImage) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const cells = [];

  // Row: background image (optional, 1 cell).
  if (bgImage) cells.push([bgImage]);

  // Row: content (1 cell holding heading + subheading + CTAs).
  const contentCell = [];
  if (heading) contentCell.push(heading);
  if (subheading) contentCell.push(subheading);
  contentCell.push(...ctaLinks);
  cells.push([contentCell]);

  const block = WebImporter.Blocks.createBlock(document, { name: 'hero-banner', cells });
  element.replaceWith(block);
}
