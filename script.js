'use strict';
const results = document.querySelector('#results');
const count = document.querySelector('#resultCount');
const status = document.querySelector('#status');
const search = document.querySelector('#searchInput');
const domain = document.querySelector('#domainSelect');
const form = document.querySelector('#filterForm');
let internships = [];

function el(tag, className, content) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (content !== undefined) node.textContent = String(content);
  return node;
}
function resetFilters() { form.reset(); render(); search.focus(); }
function stateBox(title, message, buttonText, callback) {
  const box = el('div', 'state-box');
  box.append(el('h3', '', title), el('p', '', message));
  if (buttonText) {
    const button = el('button', '', buttonText);
    button.type = 'button';
    button.addEventListener('click', callback);
    box.append(button);
  }
  results.replaceChildren(box);
}
function detail(label, value) {
  const row = el('div');
  row.append(el('dt', '', label), el('dd', '', value));
  return row;
}
function makeCard(item) {
  const article = el('article', 'card');
  const head = el('div', 'card-head');
  head.append(el('div', 'company-logo', item.company.slice(0, 2).toUpperCase()), el('span', 'domain-tag', item.domain));
  const title = el('h3', '', item.title);
  const company = el('p', 'company-name', item.company);
  const details = el('dl', 'card-details');
  details.append(detail('Location', item.location), detail('Stipend', item.stipend), detail('Duration', item.duration));
  const bottom = el('div', 'card-bottom');
  const mode = el('span', 'mode', item.mode);
  const link = el('a', 'card-link', 'View details →');
  link.href = `#internship-${item.id}`;
  link.setAttribute('aria-label', `View details for ${item.title} at ${item.company}`);
  link.addEventListener('click', event => {
    event.preventDefault();
    window.alert(`${item.title}\nCompany: ${item.company}\nDomain: ${item.domain}\nLocation: ${item.location}\nStipend: ${item.stipend}\nDuration: ${item.duration}\nMode: ${item.mode}\n\nDemo listing only — no application link available.`);
  });
  bottom.append(mode, link);
  article.id = `internship-${item.id}`;
  article.append(head, title, company, details, bottom);
  return article;
}
function render() {
  const query = search.value.trim().toLocaleLowerCase();
  const selected = domain.value;
  const filtered = internships.filter(item =>
    `${item.title} ${item.company} ${item.location}`.toLocaleLowerCase().includes(query) &&
    (selected === 'all' || item.domain === selected)
  );
  count.textContent = `${filtered.length} internship${filtered.length === 1 ? '' : 's'} found`;
  status.textContent = '';
  if (!filtered.length) {
    stateBox('No internships found', 'Try a different keyword or choose another domain.', 'Clear filters', resetFilters);
    return;
  }
  results.replaceChildren(...filtered.map(makeCard));
}
function validateRecord(item) {
  return item && ['id', 'title', 'company', 'domain', 'location', 'stipend', 'duration', 'mode'].every(key =>
    (typeof item[key] === 'string' && item[key].trim()) || (key === 'id' && Number.isInteger(item[key]))
  );
}
async function loadInternships() {
  count.textContent = 'Loading internships…';
  stateBox('Loading opportunities', 'Please wait while the listings load.');
  try {
    const response = await fetch('./internships.json');
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    if (!Array.isArray(data) || !data.every(validateRecord)) throw new Error('Invalid internship data');
    internships = data;
    const domains = [...new Set(data.map(item => item.domain))].sort();
    domain.replaceChildren(el('option', '', 'All domains'));
    domain.firstElementChild.value = 'all';
    for (const value of domains) {
      const option = el('option', '', value);
      option.value = value;
      domain.append(option);
    }
    render();
  } catch (error) {
    console.error('Failed to load internships:', error);
    count.textContent = 'Unable to load listings';
    stateBox('Something went wrong', 'We could not load the internship records. Check your connection or try again.', 'Try again', loadInternships);
  }
}
search.addEventListener('input', render);
domain.addEventListener('change', render);
form.addEventListener('submit', event => event.preventDefault());
form.addEventListener('reset', () => setTimeout(render, 0));
loadInternships();
