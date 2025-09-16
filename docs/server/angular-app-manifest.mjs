
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/"
  },
  {
    "renderMode": 2,
    "route": "/about"
  },
  {
    "renderMode": 2,
    "route": "/portfolio"
  },
  {
    "renderMode": 2,
    "route": "/contact"
  },
  {
    "renderMode": 2,
    "redirectTo": "/",
    "route": "/**"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 14510, hash: 'e47a99eb5207674f6d20bfe9bfb99b81f9ec01d97183e5809334fd5150d94584', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 12944, hash: '607f57adf4fe999b8fde8c5437aaa8238ecdf0b471338091f9734aea4f0d5e1d', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'portfolio/index.html': {size: 43824, hash: '2946c629b1723469b0811309a4410f7f2a62fa5c224254f1f5cf4e7826709c5a', text: () => import('./assets-chunks/portfolio_index_html.mjs').then(m => m.default)},
    'index.html': {size: 41646, hash: '3081c10d33ce640fda761172757212c80693df80dba287c4103df385b5a2154c', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'contact/index.html': {size: 40523, hash: '9dcd5a0d1fe38d32b01994be3dd25bf100393324e223c6fa9826786f76a02650', text: () => import('./assets-chunks/contact_index_html.mjs').then(m => m.default)},
    'about/index.html': {size: 42366, hash: 'a1b2c5f9963ca507466b6478f3474c17916276d0c29cd32588071083571b59b0', text: () => import('./assets-chunks/about_index_html.mjs').then(m => m.default)},
    'styles-DWDWIRMW.css': {size: 31420, hash: 'AtHEAdhvTAk', text: () => import('./assets-chunks/styles-DWDWIRMW_css.mjs').then(m => m.default)}
  },
};
