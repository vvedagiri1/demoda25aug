import { createOptimizedPicture } from '../../scripts/aem.js';

const MONTHS = 'Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec';
const DATE_RE = new RegExp(`\\s*((?:${MONTHS})[a-z]*\\.?\\s+\\d{1,2}(?:,?\\s+\\d{4})?)\\s*$`, 'i');

/* Split a "Category Month Day" meta line into a category pill + date. */
function decorateMeta(body) {
  const meta = body.querySelector(':scope > p');
  if (!meta) return;
  const text = meta.textContent.trim();
  const match = text.match(DATE_RE);
  const category = match ? text.slice(0, match.index).trim() : text;
  const date = match ? match[1].trim() : '';

  meta.className = 'cards-articles-card-meta';
  meta.textContent = '';
  if (category) {
    const tag = document.createElement('span');
    tag.className = 'cards-articles-card-tag';
    tag.textContent = category;
    meta.append(tag);
  }
  if (date) {
    const dateEl = document.createElement('span');
    dateEl.className = 'cards-articles-card-date';
    dateEl.textContent = date;
    meta.append(dateEl);
  }
}

export default function decorate(block) {
  /* change to ul, li */
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) div.className = 'cards-articles-card-image';
      else div.className = 'cards-articles-card-body';
    });
    const body = li.querySelector('.cards-articles-card-body');
    if (body) decorateMeta(body);
    ul.append(li);
  });
  ul.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    img.closest('picture').replaceWith(optimizedPic);
  });
  block.textContent = '';
  block.append(ul);
}
