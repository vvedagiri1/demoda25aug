/* eslint-disable */
/* global WebImporter */
/**
 * Parser for columns-gallery. Base: columns.
 * Source: https://www.wknd-trendsetters.site/
 * Selector target: div.grid-layout.desktop-4-column (direct children are image cells)
 * Generated: 2026-08-25
 *
 * Columns block: flexible column count. Source is an image gallery — each direct
 * child div wraps one cover image. Each becomes its own column cell in a single row.
 * (The intro heading/subheading above the grid live in section default content, not here.)
 */
export default function parse(element, { document }) {
  // Direct children of the grid-layout are the gallery cells (each holds one image).
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // Fallback: if no direct-child divs, collect images directly.
  const columnCells = columns.length
    ? columns
    : Array.from(element.querySelectorAll('img'));

  const cells = [];
  // Single content row, one cell per gallery item.
  cells.push(columnCells.length ? columnCells : [element]);

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-gallery', cells });
  element.replaceWith(block);
}
