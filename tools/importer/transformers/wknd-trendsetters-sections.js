/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: WKND Trendsetters section breaks + section metadata.
 * Template home-page has 7 sections (from tools/importer/page-templates.json).
 * Section selectors are DOM-verified boundaries from page analysis and are used
 * directly. Styled sections (style !== null): section-1, section-3, section-5.
 *
 * Uses BOTH hooks by design: block parsers run between the hooks and may
 * replaceWith() the exact section boundary element, so breaks are inserted in
 * beforeTransform (while every section element still exists) using a marker
 * <hr>, and Section Metadata is anchored to that marker in afterTransform.
 * Sections are processed in reverse so inserts never shift not-yet-processed
 * elements.
 */

const SECTION_MARKER_ATTR = 'data-excat-section-id';

export default function transform(hookName, element, payload) {
  const sections = payload.template.sections || [];

  if (hookName === 'beforeTransform') {
    for (let i = sections.length - 1; i >= 0; i -= 1) {
      const section = sections[i];
      if (i === 0 && !section.style) continue; // first section: no leading break, no metadata
      const sectionEl = element.querySelector(section.selector);
      if (!sectionEl) continue; // selector didn't match — skip, never guess

      const hr = document.createElement('hr');
      if (section.style) hr.setAttribute(SECTION_MARKER_ATTR, section.id);
      sectionEl.before(hr);
    }
  }

  if (hookName === 'afterTransform') {
    for (let i = sections.length - 1; i >= 0; i -= 1) {
      const section = sections[i];
      if (!section.style) continue;

      const marker = element.querySelector(`[${SECTION_MARKER_ATTR}="${section.id}"]`);
      const anchor = marker || element.querySelector(section.selector);
      if (!anchor) continue; // neither survived — skip, never guess

      const metadataBlock = WebImporter.Blocks.createBlock(document, {
        name: 'Section Metadata',
        cells: { style: section.style },
      });
      anchor.after(metadataBlock);

      if (marker) {
        marker.removeAttribute(SECTION_MARKER_ATTR);
        if (i === 0) marker.remove(); // section 0 never gets a real leading break
      }
    }
  }
}
