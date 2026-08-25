/* eslint-disable */
/* global WebImporter */
/**
 * Parser for columns-intro. Base: columns.
 * Source: https://www.wknd-trendsetters.site/
 * Selector target: div.grid-layout (2 direct children: text column + image column)
 * Generated: 2026-08-25
 *
 * Columns block: flexible column count. Source has 2 side-by-side columns:
 *   Column 1: heading + subheading + CTA buttons
 *   Column 2: stacked cover images
 */
export default function parse(element, { document }) {
  // Direct children of the grid-layout are the visual columns.
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // Fallback: if no direct-child divs found, treat the element itself as one column.
  const columnCells = columns.length ? columns : [element];

  const cells = [];
  // Single content row, one cell per visual column.
  cells.push(columnCells);

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-intro', cells });
  element.replaceWith(block);
}
