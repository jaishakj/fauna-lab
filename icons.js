/* ============================================================
   FAUNA LAB — ICON SET
   Minimal line icons, 24x24, stroke=currentColor.
   ============================================================ */
const ICONS = {
  home: `<path d="M3 11.5 12 4l9 7.5"/><path d="M5.5 10v9a1 1 0 0 0 1 1H9a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h2.5a1 1 0 0 0 1-1v-9"/>`,
  explore: `<circle cx="12" cy="12" r="9"/><path d="m15 9-2 5-5 2 2-5 5-2Z"/>`,
  notes: `<path d="M6 3h9l4 4v14a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z"/><path d="M14 3v4a1 1 0 0 0 1 1h4"/><path d="M9 12h6M9 16h4"/>`,
  habitat: `<path d="M4 20V10l8-6 8 6v10"/><path d="M9 20v-6h6v6"/><path d="M4 10h16" opacity=".0"/>`,
  learn: `<path d="M3 5.5A2.5 2.5 0 0 1 5.5 3H12v18H5.5A2.5 2.5 0 0 1 3 18.5v-13Z"/><path d="M21 5.5A2.5 2.5 0 0 0 18.5 3H12v18h6.5a2.5 2.5 0 0 0 2.5-2.5v-13Z"/>`,
  more: `<circle cx="5" cy="12" r="1.4"/><circle cx="12" cy="12" r="1.4"/><circle cx="19" cy="12" r="1.4"/>`,
  chevron: `<path d="m9 6 6 6-6 6"/>`,
  chevronDown: `<path d="m6 9 6 6 6-6"/>`,
  search: `<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>`,
  sort: `<path d="M6 4v16M6 4l-3 3M6 4l3 3"/><path d="M18 20V4M18 20l-3-3M18 20l3-3"/>`,
  notebook: `<path d="M5 3h11l3 3v15a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z"/><path d="M8 8h6M8 12h8M8 16h5"/>`,
  compare: `<path d="M9 3v18M15 3v18"/><path d="M4 8h5M4 16h5M15 8h5M15 16h5"/>`,
  share: `<circle cx="18" cy="5" r="2.4"/><circle cx="6" cy="12" r="2.4"/><circle cx="18" cy="19" r="2.4"/><path d="m8.2 10.8 7.6-4.6M8.2 13.2l7.6 4.6"/>`,
  pin: `<path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21Z"/><circle cx="12" cy="9.5" r="2.3"/>`,
  reset: `<path d="M4 4v6h6"/><path d="M4.6 14a8 8 0 1 0 2-8.6L4 10"/>`,
  fullscreen: `<path d="M8 4H4v4M20 8V4h-4M4 16v4h4M16 20h4v-4"/>`,
  cube: `<path d="M12 3 4 7v10l8 4 8-4V7l-8-4Z"/><path d="M4 7l8 4 8-4M12 11v10"/>`,
  ruler: `<rect x="3" y="9" width="18" height="6" rx="1"/><path d="M7 9v2M11 9v3M15 9v2M19 9v3"/>`,
  crosshair: `<circle cx="12" cy="12" r="7"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3"/>`,
  camera: `<path d="M4 8h3l1.5-2h7L17 8h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z"/><circle cx="12" cy="13" r="3.2"/>`,
  close: `<path d="m5 5 14 14M19 5 5 19"/>`,
  info: `<circle cx="12" cy="12" r="9"/><path d="M12 8h.01M11 11.5h1v5h1"/>`,
  leaf: `<path d="M5 19c8 1 14-5 14-14C10 5 4 11 5 19Z"/><path d="M5 19c3-4 6-7 9-10"/>`,
  map: `<circle cx="12" cy="10" r="3"/><path d="M12 21s6.5-5.7 6.5-11A6.5 6.5 0 0 0 5.5 10c0 5.3 6.5 11 6.5 11Z"/>`,
  bird: `<path d="M4 15c3-6 8-9 15-9-1.5 2-2 3-2 3s2 .5 3 2c-3 0-4 .5-4 .5C15 16 11 19 5 18c1.5-.8 2.3-1.6 2.6-2.4C6 16.2 4.8 16 4 15Z"/><circle cx="15.5" cy="9.3" r=".6" fill="currentColor" stroke="none"/>`,
  shuffle: `<path d="m3 6 4 0 8 12h4M3 18l4 0 3.5-5.2M17 6h4v4"/><path d="m18 3 3 3-3 3"/><path d="m18 15 3 3-3 3"/>`,
  check: `<path d="m5 12 5 5L20 7"/>`,
  plus: `<path d="M12 5v14M5 12h14"/>`,
  download: `<path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M5 19h14"/>`,
  link: `<path d="M10 14a4 4 0 0 0 5.7.3l2-2a4 4 0 1 0-5.6-5.6l-1 1"/><path d="M14 10a4 4 0 0 0-5.7-.3l-2 2a4 4 0 1 0 5.6 5.6l1-1"/>`,
  x: `<path d="m6 6 12 12M18 6 6 18"/>`,
  bee:`<ellipse cx="12" cy="13" rx="5" ry="6"/><path d="M8 10h8M7.5 13h9M8 16h8"/><path d="M12 7c-1-2-3-3-4-2M12 7c1-2 3-3 4-2"/><path d="M17 9c2-1 3 0 3 1M7 9C5 8 4 9 4 10"/>`,
  butterfly:`<path d="M12 5v14"/><path d="M12 8c0-3 3-5 6-4 1 3-1 6-6 5Z"/><path d="M12 8c0-3-3-5-6-4-1 3 1 6 6 5Z"/><path d="M12 13c0-2.5 2.5-4 5-3 .8 2.5-.7 5-5 4Z"/><path d="M12 13c0-2.5-2.5-4-5-3-.8 2.5.7 5 5 4Z"/>`,
  moth:`<path d="M12 6v13"/><path d="M12 9c0-3.5 3.5-6 7-4.5 1 3.5-2 6.5-7 5.5Z"/><path d="M12 9c0-3.5-3.5-6-7-4.5-1 3.5 2 6.5 7 5.5Z"/><path d="M8 4c1 0 2 1 2 2M16 4c-1 0-2 1-2 2"/>`,
  beetle:`<ellipse cx="12" cy="14" rx="5.5" ry="6.5"/><path d="M12 7.5V4M9.5 5.5 8 3.5M14.5 5.5 16 3.5"/><path d="M12 9v11"/><path d="M6.7 11H3M6.7 15H3M6.7 19H3M17.3 11h3.7M17.3 15h3.7M17.3 19h3.7"/>`,
  dragonfly:`<ellipse cx="12" cy="12" rx="1.6" ry="2.4"/><path d="M12 6v13"/><path d="M12 8c2-3 7-4 9-2-1 3-6 4-9 3Z"/><path d="M12 8c-2-3-7-4-9-2 1 3 6 4 9 3Z"/><path d="M12 13c2-2 6-2.5 7.5-.8-1 2.3-5 3-7.5 1.8Z"/><path d="M12 13c-2-2-6-2.5-7.5-.8 1 2.3 5 3 7.5 1.8Z"/>`,
  wasp:`<ellipse cx="12" cy="13" rx="4.4" ry="6"/><path d="M7.8 10.5h8.4M7.8 13h8.4M7.8 15.5h8.4"/><path d="M12 7c-1-2-3-2.6-4-1.8M12 7c1-2 3-2.6 4-1.8"/><path d="M8 8c-2-.6-3.4.3-3.4 1.4M16 8c2-.6 3.4.3 3.4 1.4"/>`,
  ant:`<circle cx="12" cy="6.5" r="1.8"/><circle cx="12" cy="12" r="2.6"/><ellipse cx="12" cy="18" rx="3.4" ry="4"/><path d="M12 8.3v1.4M12 14.6v1.6"/><path d="M9 10l-3-1M15 10l3-1M9 16l-3.5 1M15 16l3.5 1"/><path d="M10.5 5 9 3.5M13.5 5 15 3.5"/>`,
  hummingbird:`<path d="M4 13c3-1 5-.5 6.5 1"/><path d="M10.5 14c.5-3 3-5 6-5.2C19 12 16 15 12 15.5"/><circle cx="14.5" cy="9.3" r=".6" fill="currentColor" stroke="none"/><path d="M12 15.5c1 2 .5 4-1 5.5"/><path d="M9 15c-1.5 0-3 1-3.5 2.5"/>`,
  songbird:`<path d="M5 15c0-4 3-7 8-7 3 0 5.5 1.6 6.5 3.6-1 .4-2 .3-2.6-.2.3 1.6-.6 3-2.4 3.1"/><circle cx="15.3" cy="10" r=".6" fill="currentColor" stroke="none"/><path d="M13.5 14.5C12 17 9 18 6 17.3"/><path d="M9 14.8 6.5 13"/>`,
  raptor:`<path d="M12 5c-3.5 3-8 4-10 3.5 1 2 4 2.6 6 2C6 12 5 14.5 5.5 17c2-2 4-2.6 5-2 0 1.7-.6 3-2 4 2.8.3 4.5-1 5.5-3 1 2 2.7 3.3 5.5 3-1.4-1-2-2.3-2-4 1 0 3 .6 5 2 .5-2.5-.5-5-2.5-6.5 2 .6 5 0 6-2-2-.5-6.5-1.5-10-4.5"/>`,
  owl:`<path d="M6 10a6 6 0 0 1 12 0v3a6 6 0 0 1-12 0v-3Z"/><circle cx="9.3" cy="10.5" r="1.8"/><circle cx="14.7" cy="10.5" r="1.8"/><circle cx="9.3" cy="10.5" r=".5" fill="currentColor" stroke="none"/><circle cx="14.7" cy="10.5" r=".5" fill="currentColor" stroke="none"/><path d="M12 12.5 11 14h2l-1 1.5"/><path d="M4 8l2.5 1M20 8l-2.5 1"/>`,
  waterfowl:`<path d="M4 17c1.5-5 5-8 9-8 3 0 5 2 5 4.2 0 2-1.6 3.3-3.6 3-1-2.5-3-3.7-5-3.4.6 1 .6 2.3-.4 3.2-1.4 1.3-3.7 1.3-5-1Z"/><path d="M17 10.5c1.3-1 1.3-2.7.3-3.6" /><circle cx="17.6" cy="9.6" r=".5" fill="currentColor" stroke="none"/><path d="M4 20h16"/>`,
};

function icon(name, size=20, cls='') {
  const body = ICONS[name] || '';
  return `<svg class="icon ${cls}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${body}</svg>`;
}
