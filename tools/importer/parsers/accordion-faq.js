/* eslint-disable */
/* global WebImporter */
/**
 * Parser for accordion-faq. Base: accordion.
 * Source: https://www.wknd-trendsetters.site/
 * Selector target: .faq-list (direct children are <details class="faq-item">)
 * Generated: 2026-08-25
 *
 * Accordion block: 2 columns, one row per item.
 *   Cell 1: title (the FAQ question text).
 *   Cell 2: content (the FAQ answer body).
 * Each item is <details class="faq-item"> with a <summary class="faq-question"> (question
 * text in a span + a toggle icon) and a <div class="faq-answer"> body.
 */
export default function parse(element, { document }) {
  // Each accordion item.
  const items = Array.from(
    element.querySelectorAll(':scope > details.faq-item, :scope > details, :scope > .faq-item'),
  );

  const cells = [];

  items.forEach((item) => {
    // Title: question text lives in the summary span (exclude the decorative icon img).
    const summary = item.querySelector('summary.faq-question, summary, .faq-question');
    const questionSpan = summary ? summary.querySelector('span') : null;
    const title = questionSpan || summary;

    // Content: the answer body.
    const answer = item.querySelector('.faq-answer, :scope > div:not(summary)');

    // Skip items missing both title and content.
    if (!title && !answer) return;

    cells.push([title || '', answer || '']);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'accordion-faq', cells });
  element.replaceWith(block);
}
