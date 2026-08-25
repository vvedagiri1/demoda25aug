/* eslint-disable */
var CustomImportScript = (() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // tools/importer/import-home-page.js
  var import_home_page_exports = {};
  __export(import_home_page_exports, {
    default: () => import_home_page_default
  });

  // tools/importer/parsers/columns-intro.js
  function parse(element, { document: document2 }) {
    const columns = Array.from(element.querySelectorAll(":scope > div"));
    const columnCells = columns.length ? columns : [element];
    const cells = [];
    cells.push(columnCells);
    const block = WebImporter.Blocks.createBlock(document2, { name: "columns-intro", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/columns-story.js
  function parse2(element, { document: document2 }) {
    const columns = Array.from(element.querySelectorAll(":scope > div"));
    const columnCells = columns.length ? columns : [element];
    const cells = [];
    cells.push(columnCells);
    const block = WebImporter.Blocks.createBlock(document2, { name: "columns-story", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/columns-gallery.js
  function parse3(element, { document: document2 }) {
    const columns = Array.from(element.querySelectorAll(":scope > div"));
    const columnCells = columns.length ? columns : Array.from(element.querySelectorAll("img"));
    const cells = [];
    cells.push(columnCells.length ? columnCells : [element]);
    const block = WebImporter.Blocks.createBlock(document2, { name: "columns-gallery", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/tabs-testimonials.js
  function parse4(element, { document: document2 }) {
    const panes = Array.from(
      element.querySelectorAll(".tabs-content > .tab-pane, .tab-pane")
    );
    const buttons = Array.from(
      element.querySelectorAll(".tab-menu .tab-menu-link, .tab-menu-link, .tab-menu button")
    );
    const cells = [];
    const count = Math.max(panes.length, buttons.length);
    for (let i = 0; i < count; i += 1) {
      const label = buttons[i] || "";
      const content = panes[i] || "";
      if (!label && !content) continue;
      cells.push([label, content]);
    }
    const block = WebImporter.Blocks.createBlock(document2, { name: "tabs-testimonials", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-articles.js
  function parse5(element, { document: document2 }) {
    const cards = Array.from(
      element.querySelectorAll(":scope > a.article-card, :scope > .article-card, :scope > a, :scope > div")
    );
    const cells = [];
    cards.forEach((card) => {
      const img = card.querySelector(".article-card-image img, img");
      const body = card.querySelector(".article-card-body");
      const contentCell = [];
      if (body) {
        const href = card.tagName === "A" ? card.getAttribute("href") : null;
        const heading = body.querySelector('h2, h3, h4, [class*="heading"]');
        if (href && heading) {
          const link = document2.createElement("a");
          link.href = href;
          while (heading.firstChild) link.appendChild(heading.firstChild);
          heading.appendChild(link);
        }
        contentCell.push(body);
      } else {
        const heading = card.querySelector('h2, h3, h4, [class*="heading"]');
        if (heading) contentCell.push(heading);
      }
      if (img || contentCell.length) {
        cells.push([img || "", contentCell]);
      }
    });
    const block = WebImporter.Blocks.createBlock(document2, { name: "cards-articles", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/accordion-faq.js
  function parse6(element, { document: document2 }) {
    const items = Array.from(
      element.querySelectorAll(":scope > details.faq-item, :scope > details, :scope > .faq-item")
    );
    const cells = [];
    items.forEach((item) => {
      const summary = item.querySelector("summary.faq-question, summary, .faq-question");
      const questionSpan = summary ? summary.querySelector("span") : null;
      const title = questionSpan || summary;
      const answer = item.querySelector(".faq-answer, :scope > div:not(summary)");
      if (!title && !answer) return;
      cells.push([title || "", answer || ""]);
    });
    const block = WebImporter.Blocks.createBlock(document2, { name: "accordion-faq", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/hero-banner.js
  function parse7(element, { document: document2 }) {
    const bgImage = element.querySelector('img.cover-image, img[class*="overlay"], img');
    const heading = element.querySelector('h1, h2, h3, [class*="heading"]');
    const subheading = element.querySelector('p, .subheading, [class*="subheading"]');
    const ctaLinks = Array.from(element.querySelectorAll(".button-group a, a.button"));
    if (!heading && !subheading && !ctaLinks.length && !bgImage) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const cells = [];
    if (bgImage) cells.push([bgImage]);
    const contentCell = [];
    if (heading) contentCell.push(heading);
    if (subheading) contentCell.push(subheading);
    contentCell.push(...ctaLinks);
    cells.push([contentCell]);
    const block = WebImporter.Blocks.createBlock(document2, { name: "hero-banner", cells });
    element.replaceWith(block);
  }

  // tools/importer/transformers/wknd-trendsetters-cleanup.js
  var TransformHook = {
    beforeTransform: "beforeTransform",
    afterTransform: "afterTransform"
  };
  function transform(hookName, element, payload) {
    if (hookName === TransformHook.beforeTransform) {
      WebImporter.DOMUtils.remove(element, [
        ".skip-link",
        // <a href="#main-content" class="skip-link">
        ".breadcrumbs"
        // non-authorable breadcrumb trail in the story block
      ]);
    }
    if (hookName === TransformHook.afterTransform) {
      WebImporter.DOMUtils.remove(element, [
        ".navbar",
        "footer.footer"
      ]);
      element.querySelectorAll("[data-astro-cid-37fxchfa]").forEach((el) => {
        el.removeAttribute("data-astro-cid-37fxchfa");
      });
      element.querySelectorAll("[data-astro-cid-rbygaycu]").forEach((el) => {
        el.removeAttribute("data-astro-cid-rbygaycu");
      });
    }
  }

  // tools/importer/transformers/wknd-trendsetters-sections.js
  var SECTION_MARKER_ATTR = "data-excat-section-id";
  function transform2(hookName, element, payload) {
    const sections = payload.template.sections || [];
    if (hookName === "beforeTransform") {
      for (let i = sections.length - 1; i >= 0; i -= 1) {
        const section = sections[i];
        if (i === 0 && !section.style) continue;
        const sectionEl = element.querySelector(section.selector);
        if (!sectionEl) continue;
        const hr = document.createElement("hr");
        if (section.style) hr.setAttribute(SECTION_MARKER_ATTR, section.id);
        sectionEl.before(hr);
      }
    }
    if (hookName === "afterTransform") {
      for (let i = sections.length - 1; i >= 0; i -= 1) {
        const section = sections[i];
        if (!section.style) continue;
        const marker = element.querySelector(`[${SECTION_MARKER_ATTR}="${section.id}"]`);
        const anchor = marker || element.querySelector(section.selector);
        if (!anchor) continue;
        const metadataBlock = WebImporter.Blocks.createBlock(document, {
          name: "Section Metadata",
          cells: { style: section.style }
        });
        anchor.after(metadataBlock);
        if (marker) {
          marker.removeAttribute(SECTION_MARKER_ATTR);
          if (i === 0) marker.remove();
        }
      }
    }
  }

  // tools/importer/import-home-page.js
  var PAGE_TEMPLATE = {
    name: "home-page",
    description: "WKND Trendsetters home page: hero, featured story, image gallery, testimonials tabs, latest articles cards, FAQ accordion, and a closing call-to-action banner.",
    urls: [
      "https://www.wknd-trendsetters.site/"
    ],
    blocks: [
      {
        name: "columns-intro",
        instances: ["#main-content > header.section.secondary-section > div.container > div.grid-layout"]
      },
      {
        name: "columns-story",
        instances: ["#main-content > section.section:nth-of-type(1) > div.container > div.grid-layout"]
      },
      {
        name: "columns-gallery",
        instances: ["#main-content > section.section.secondary-section:nth-of-type(2) > div.container > div.grid-layout.desktop-4-column"]
      },
      {
        name: "tabs-testimonials",
        instances: [".tabs-wrapper"]
      },
      {
        name: "cards-articles",
        instances: ["#main-content > section.section.secondary-section:nth-of-type(4) > div.container > div.grid-layout.desktop-4-column"]
      },
      {
        name: "accordion-faq",
        instances: [".faq-list"]
      },
      {
        name: "hero-banner",
        instances: ["#main-content > section.section.inverse-section > div.container > div.grid-layout.desktop-1-column"]
      }
    ],
    sections: [
      {
        id: "section-1",
        name: "Intro",
        selector: "#main-content > header.section.secondary-section",
        style: "secondary",
        blocks: ["columns-intro"],
        defaultContent: []
      },
      {
        id: "section-2",
        name: "Featured story",
        selector: "#main-content > section.section:nth-of-type(1)",
        style: null,
        blocks: ["columns-story"],
        defaultContent: []
      },
      {
        id: "section-3",
        name: "Style gallery",
        selector: "#main-content > section.section.secondary-section:nth-of-type(2)",
        style: "secondary",
        blocks: ["columns-gallery"],
        defaultContent: ["#main-content > section.section.secondary-section:nth-of-type(2) > div.container > div.utility-text-align-center.utility-margin-bottom-8rem"]
      },
      {
        id: "section-4",
        name: "Testimonials",
        selector: "#main-content > section.section:nth-of-type(3)",
        style: null,
        blocks: ["tabs-testimonials"],
        defaultContent: []
      },
      {
        id: "section-5",
        name: "Latest articles",
        selector: "#main-content > section.section.secondary-section:nth-of-type(4)",
        style: "secondary",
        blocks: ["cards-articles"],
        defaultContent: ["#main-content > section.section.secondary-section:nth-of-type(4) > div.container > div.utility-text-align-center"]
      },
      {
        id: "section-6",
        name: "FAQ",
        selector: "#main-content > section.section:nth-of-type(5)",
        style: null,
        blocks: ["accordion-faq"],
        defaultContent: ["#main-content > section.section:nth-of-type(5) > div.container > div.grid-layout > div:nth-of-type(1)"]
      },
      {
        id: "section-7",
        name: "Closing CTA",
        selector: "#main-content > section.section.inverse-section",
        style: null,
        blocks: ["hero-banner"],
        defaultContent: []
      }
    ]
  };
  var parsers = {
    "columns-intro": parse,
    "columns-story": parse2,
    "columns-gallery": parse3,
    "tabs-testimonials": parse4,
    "cards-articles": parse5,
    "accordion-faq": parse6,
    "hero-banner": parse7
  };
  var transformers = [
    transform,
    ...PAGE_TEMPLATE.sections && PAGE_TEMPLATE.sections.length > 1 ? [transform2] : []
  ];
  function executeTransformers(hookName, element, payload) {
    const enhancedPayload = __spreadProps(__spreadValues({}, payload), {
      template: PAGE_TEMPLATE
    });
    transformers.forEach((transformerFn) => {
      try {
        transformerFn.call(null, hookName, element, enhancedPayload);
      } catch (e) {
        console.error(`Transformer failed at ${hookName}:`, e);
      }
    });
  }
  function findBlocksOnPage(document2, template) {
    const pageBlocks = [];
    template.blocks.forEach((blockDef) => {
      blockDef.instances.forEach((selector) => {
        const elements = document2.querySelectorAll(selector);
        if (elements.length === 0) {
          console.warn(`Block "${blockDef.name}" selector not found: ${selector}`);
        }
        elements.forEach((element) => {
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
  var import_home_page_default = {
    transform: (payload) => {
      const { document: document2, url, html, params } = payload;
      const main = document2.body;
      executeTransformers("beforeTransform", main, payload);
      const pageBlocks = findBlocksOnPage(document2, PAGE_TEMPLATE);
      pageBlocks.forEach((block) => {
        if (!block.element.parentNode) return;
        const parser = parsers[block.name];
        if (parser) {
          try {
            parser(block.element, { document: document2, url, params });
          } catch (e) {
            console.error(`Failed to parse ${block.name} (${block.selector}):`, e);
          }
        } else {
          console.warn(`No parser found for block: ${block.name}`);
        }
      });
      executeTransformers("afterTransform", main, payload);
      const hr = document2.createElement("hr");
      main.appendChild(hr);
      WebImporter.rules.createMetadata(main, document2);
      WebImporter.rules.transformBackgroundImages(main, document2);
      WebImporter.rules.adjustImageUrls(main, url, params.originalURL);
      const rawPath = new URL(params.originalURL).pathname.replace(/\/$/, "").replace(/\.html?$/, "");
      const path = WebImporter.FileUtils.sanitizePath(rawPath === "" ? "/index" : rawPath);
      return [{
        element: main,
        path,
        report: {
          title: document2.title,
          template: PAGE_TEMPLATE.name,
          blocks: pageBlocks.map((b) => b.name)
        }
      }];
    }
  };
  return __toCommonJS(import_home_page_exports);
})();
