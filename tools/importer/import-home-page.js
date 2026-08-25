/* eslint-disable */
/* global WebImporter */

// PARSER IMPORTS
import columnsIntroParser from './parsers/columns-intro.js';
import columnsStoryParser from './parsers/columns-story.js';
import columnsGalleryParser from './parsers/columns-gallery.js';
import tabsTestimonialsParser from './parsers/tabs-testimonials.js';
import cardsArticlesParser from './parsers/cards-articles.js';
import accordionFaqParser from './parsers/accordion-faq.js';
import heroBannerParser from './parsers/hero-banner.js';

// TRANSFORMER IMPORTS
import cleanupTransformer from './transformers/wknd-trendsetters-cleanup.js';
import sectionsTransformer from './transformers/wknd-trendsetters-sections.js';

// PAGE TEMPLATE CONFIGURATION - Embedded from page-templates.json
const PAGE_TEMPLATE = {
  name: 'home-page',
  description: 'WKND Trendsetters home page: hero, featured story, image gallery, testimonials tabs, latest articles cards, FAQ accordion, and a closing call-to-action banner.',
  urls: [
    'https://www.wknd-trendsetters.site/'
  ],
  blocks: [
    {
      name: 'columns-intro',
      instances: ['#main-content > header.section.secondary-section > div.container > div.grid-layout']
    },
    {
      name: 'columns-story',
      instances: ['#main-content > section.section:nth-of-type(1) > div.container > div.grid-layout']
    },
    {
      name: 'columns-gallery',
      instances: ['#main-content > section.section.secondary-section:nth-of-type(2) > div.container > div.grid-layout.desktop-4-column']
    },
    {
      name: 'tabs-testimonials',
      instances: ['.tabs-wrapper']
    },
    {
      name: 'cards-articles',
      instances: ['#main-content > section.section.secondary-section:nth-of-type(4) > div.container > div.grid-layout.desktop-4-column']
    },
    {
      name: 'accordion-faq',
      instances: ['.faq-list']
    },
    {
      name: 'hero-banner',
      instances: ['#main-content > section.section.inverse-section > div.container > div.grid-layout.desktop-1-column']
    }
  ],
  sections: [
    {
      id: 'section-1',
      name: 'Intro',
      selector: '#main-content > header.section.secondary-section',
      style: 'secondary',
      blocks: ['columns-intro'],
      defaultContent: []
    },
    {
      id: 'section-2',
      name: 'Featured story',
      selector: '#main-content > section.section:nth-of-type(1)',
      style: null,
      blocks: ['columns-story'],
      defaultContent: []
    },
    {
      id: 'section-3',
      name: 'Style gallery',
      selector: '#main-content > section.section.secondary-section:nth-of-type(2)',
      style: 'secondary',
      blocks: ['columns-gallery'],
      defaultContent: ['#main-content > section.section.secondary-section:nth-of-type(2) > div.container > div.utility-text-align-center.utility-margin-bottom-8rem']
    },
    {
      id: 'section-4',
      name: 'Testimonials',
      selector: '#main-content > section.section:nth-of-type(3)',
      style: null,
      blocks: ['tabs-testimonials'],
      defaultContent: []
    },
    {
      id: 'section-5',
      name: 'Latest articles',
      selector: '#main-content > section.section.secondary-section:nth-of-type(4)',
      style: 'secondary',
      blocks: ['cards-articles'],
      defaultContent: ['#main-content > section.section.secondary-section:nth-of-type(4) > div.container > div.utility-text-align-center']
    },
    {
      id: 'section-6',
      name: 'FAQ',
      selector: '#main-content > section.section:nth-of-type(5)',
      style: null,
      blocks: ['accordion-faq'],
      defaultContent: ['#main-content > section.section:nth-of-type(5) > div.container > div.grid-layout > div:nth-of-type(1)']
    },
    {
      id: 'section-7',
      name: 'Closing CTA',
      selector: '#main-content > section.section.inverse-section',
      style: null,
      blocks: ['hero-banner'],
      defaultContent: []
    }
  ]
};

// PARSER REGISTRY
const parsers = {
  'columns-intro': columnsIntroParser,
  'columns-story': columnsStoryParser,
  'columns-gallery': columnsGalleryParser,
  'tabs-testimonials': tabsTestimonialsParser,
  'cards-articles': cardsArticlesParser,
  'accordion-faq': accordionFaqParser,
  'hero-banner': heroBannerParser,
};

// TRANSFORMER REGISTRY - cleanup first, sections after
const transformers = [
  cleanupTransformer,
  ...(PAGE_TEMPLATE.sections && PAGE_TEMPLATE.sections.length > 1 ? [sectionsTransformer] : []),
];

/**
 * Execute all page transformers for a specific hook
 */
function executeTransformers(hookName, element, payload) {
  const enhancedPayload = {
    ...payload,
    template: PAGE_TEMPLATE
  };

  transformers.forEach((transformerFn) => {
    try {
      transformerFn.call(null, hookName, element, enhancedPayload);
    } catch (e) {
      console.error(`Transformer failed at ${hookName}:`, e);
    }
  });
}

/**
 * Find all blocks on the page based on the embedded template configuration
 */
function findBlocksOnPage(document, template) {
  const pageBlocks = [];

  template.blocks.forEach(blockDef => {
    blockDef.instances.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      if (elements.length === 0) {
        console.warn(`Block "${blockDef.name}" selector not found: ${selector}`);
      }
      elements.forEach(element => {
        pageBlocks.push({
          name: blockDef.name,
          selector,
          element,
          section: blockDef.section || null
        });
      });
    });
  });

  console.log(`Found ${pageBlocks.length} block instances on page`);
  return pageBlocks;
}

// EXPORT DEFAULT CONFIGURATION
export default {
  transform: (payload) => {
    const { document, url, html, params } = payload;

    const main = document.body;

    // 1. beforeTransform transformers (initial cleanup)
    executeTransformers('beforeTransform', main, payload);

    // 2. Find blocks on page using embedded template
    const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);

    // 3. Parse each block using registered parsers
    pageBlocks.forEach(block => {
      if (!block.element.parentNode) return; // Already replaced by earlier parser
      const parser = parsers[block.name];
      if (parser) {
        try {
          parser(block.element, { document, url, params });
        } catch (e) {
          console.error(`Failed to parse ${block.name} (${block.selector}):`, e);
        }
      } else {
        console.warn(`No parser found for block: ${block.name}`);
      }
    });

    // 4. afterTransform transformers (final cleanup + section breaks/metadata)
    executeTransformers('afterTransform', main, payload);

    // 5. WebImporter built-in rules
    const hr = document.createElement('hr');
    main.appendChild(hr);
    WebImporter.rules.createMetadata(main, document);
    WebImporter.rules.transformBackgroundImages(main, document);
    WebImporter.rules.adjustImageUrls(main, url, params.originalURL);

    // 6. Generate sanitized path (map root/homepage URL to /index)
    const rawPath = new URL(params.originalURL).pathname
      .replace(/\/$/, '')
      .replace(/\.html?$/, '');
    const path = WebImporter.FileUtils.sanitizePath(rawPath === '' ? '/index' : rawPath);

    return [{
      element: main,
      path,
      report: {
        title: document.title,
        template: PAGE_TEMPLATE.name,
        blocks: pageBlocks.map(b => b.name),
      }
    }];
  }
};
