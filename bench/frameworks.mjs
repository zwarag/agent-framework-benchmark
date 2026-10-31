export const FRAMEWORKS = {
  next: { label: 'Next.js', modes: ['ssr', 'csr'], tooling: true },
  nuxt: { label: 'Nuxt', modes: ['ssr', 'csr'], tooling: true },
  'tanstack-start': { label: 'TanStack Start with React', modes: ['ssr', 'csr'], tooling: false },
  'react-router': { label: 'React Router in framework mode', modes: ['ssr', 'csr'], tooling: true },
  solidstart: { label: 'SolidStart', modes: ['ssr', 'csr'], tooling: false },
  sveltekit: { label: 'SvelteKit', modes: ['ssr', 'csr'], tooling: true },
  angular: { label: 'Angular', modes: ['ssr', 'csr'], tooling: true },
  astro: { label: 'Astro', modes: ['ssr'], tooling: true },
  qwik: { label: 'Qwik with Qwik City', modes: ['ssr'], tooling: false },
  gracile: { label: 'Gracile with Lit', modes: ['ssr'], tooling: false },
  lit: { label: 'Lit with Vite, without a meta-framework', modes: ['csr'], tooling: false },
  'hono-htmx': { label: 'Hono and htmx', modes: ['ssr'], tooling: true },
  vanilla: { label: 'vanilla JavaScript or TypeScript with Vite, without a UI framework', modes: ['ssr', 'csr'], tooling: false },
};

export const RENDER_MODES = {
  ssr: 'server-side rendering',
  csr: 'client-side rendering',
};

export const TOOLING = ['on', 'off'];

export const cellKey = (framework, mode, tooling) => `${framework}.${mode}.tools-${tooling}`;

export function parseCell(key) {
  const m = key.match(/^(.+)\.(ssr|csr)\.tools-(on|off)$/);
  return m ? { framework: m[1], mode: m[2], tooling: m[3] } : null;
}

export function cells(frameworks, modes, tooling) {
  const out = [];
  for (const framework of frameworks) {
    const fw = FRAMEWORKS[framework];
    for (const mode of modes) {
      if (!fw.modes.includes(mode)) continue;
      for (const t of tooling) {
        if (t === 'off' && !fw.tooling && tooling.includes('on')) continue;
        out.push({ key: cellKey(framework, mode, fw.tooling ? t : 'off'), framework, mode, tooling: fw.tooling ? t : 'off' });
      }
    }
  }
  return [...new Map(out.map((c) => [c.key, c])).values()];
}

export const prompt = (label, mode) =>
  `Implement the app described in SPEC.md using ${label}, with ${RENDER_MODES[mode]} ` +
  `(rendering mode \`${mode}\`, see "Rendering mode" in SPEC.md). Use the latest stable version. ` +
  'Work autonomously until `npm test` passes.';
