// Built-site check for the WA ad-account tags: LinkedIn Insight partner 6743762 and Google Ads AW-822042382.
// A headless Chrome loads the BUILT site (`next start` on localhost) while believing it is on the production host, so the
// production host rule in the site code really runs, and records every request the page makes.
//
//   Run:   <build>  &&  next start -H localhost -p 3100        (another shell; for vertenergygroup.com build and start with SITE_INDEXABLE=true)
//          node scripts/check-ad-tags.cjs --port 3100 [--host coloradobps.com] [--paths /,/about] [--gate-control]
//   Exit:  0 when every assertion held, 1 otherwise (so on a branch without the tags it prints FAIL lines and exits 1).
//   Needs: Node 22 (global fetch and WebSocket) and Chrome (E2E_CHROME, default /usr/bin/google-chrome). No dependencies.
//
// Traffic policy (nothing is counted by LinkedIn or Google): every request to the production host (and its www) is answered from
// the local server through the DevTools Fetch domain; a read-only GET of a script from snap.licdn.com or www.googletagmanager.com goes
// out for real (the tags run, so the pixel URLs below are the real ones); every other request, including the LinkedIn px.ads
// collect and Google collect/conversion calls, is answered with an empty 200 and only recorded.
const fs = require('node:fs'), os = require('node:os'), path = require('node:path')
const { spawn } = require('node:child_process')

const arg = (n, d) => { const i = process.argv.indexOf('--' + n); return i > 0 && process.argv[i + 1] && !process.argv[i + 1].startsWith('--') ? process.argv[i + 1] : d }
const PORT = Number(arg('port', process.env.E2E_PORT)), HOST = arg('host', 'coloradobps.com')
const PATHS = arg('paths', '/,/pricing').split(',').filter(Boolean)
const PARTNER = arg('partner', '6743762'), AW = arg('aw', 'AW-822042382'), GATE_CONTROL = process.argv.includes('--gate-control')
const CHROME = process.env.E2E_CHROME || '/usr/bin/google-chrome'
if (!PORT) { console.error('usage: node scripts/check-ad-tags.cjs --port <next start port> [--host h] [--paths /,/x] [--gate-control]'); process.exit(2) }
const sleep = ms => new Promise(r => setTimeout(r, ms))
const INSIGHT = 'https://snap.licdn.com/li.lms-analytics/insight.min.js', GTAG = 'https://www.googletagmanager.com/gtag/js?id='
const SITE = new Set([HOST, 'www.' + HOST, 'preview-check.vercel.app'])

async function main() {
  const dport = 9400 + Math.floor(Math.random() * 400), udd = fs.mkdtempSync(path.join(os.tmpdir(), 'adt-'))
  const chrome = spawn(CHROME, ['--headless=new', '--no-sandbox', '--disable-gpu', `--remote-debugging-port=${dport}`, `--user-data-dir=${udd}`, '--window-size=1280,2000',
    '--host-resolver-rules=MAP * ~NOTFOUND , EXCLUDE localhost , EXCLUDE 127.0.0.1 , EXCLUDE snap.licdn.com , EXCLUDE www.googletagmanager.com', 'about:blank'], { stdio: 'ignore' })
  let targets
  for (let i = 0; i < 60; i++) { try { targets = await (await fetch(`http://127.0.0.1:${dport}/json/list`)).json(); if (targets.length) break } catch {} await sleep(250) }
  const page = (targets || []).find(t => t.type === 'page'); if (!page) throw new Error('no page target')
  const ws = new WebSocket(page.webSocketDebuggerUrl); await new Promise((res, rej) => { ws.addEventListener('open', res); ws.addEventListener('error', rej) })
  let id = 0; const pending = new Map(), handlers = new Map()
  ws.addEventListener('message', ev => { const m = JSON.parse(ev.data); if (m.id && pending.has(m.id)) { const p = pending.get(m.id); pending.delete(m.id); m.error ? p.rej(new Error(m.error.message)) : p.res(m.result) } else if (m.method) (handlers.get(m.method) || []).forEach(h => h(m.params)) })
  const send = (method, params = {}) => new Promise((res, rej) => { const i = ++id; pending.set(i, { res, rej }); ws.send(JSON.stringify({ id: i, method, params })) })
  const on = (m, h) => { if (!handlers.has(m)) handlers.set(m, []); handlers.get(m).push(h) }
  const evalJs = async expression => { const r = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true }); if (r.exceptionDetails) throw new Error('eval: ' + (r.exceptionDetails.exception?.description || r.exceptionDetails.text)); return r.result.value }
  const hdrs = o => Object.entries(o).map(([name, value]) => ({ name, value }))
  const GIF = Buffer.from('R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==', 'base64')
  const log = []
  on('Fetch.requestPaused', async p => {
    const req = p.request, u = new URL(req.url), rec = { method: req.method, url: req.url, type: p.resourceType }
    const done = kind => { rec.kind = kind; log.push(rec) }
    try {
      if (SITE.has(u.hostname)) {
        if (u.pathname.startsWith('/api/')) { done('blocked-api'); return send('Fetch.fulfillRequest', { requestId: p.requestId, responseCode: 599, body: '' }) }
        const h = { 'accept-encoding': 'identity' }; for (const [k, v] of Object.entries(req.headers)) if (!['host', 'connection', 'content-length', 'accept-encoding', 'origin', 'referer'].includes(k.toLowerCase())) h[k] = v
        const r = await fetch(`http://localhost:${PORT}${u.pathname}${u.search}`, { method: req.method, headers: h, redirect: 'manual', body: req.postData && req.method !== 'GET' ? req.postData : undefined })
        const body = Buffer.from(await r.arrayBuffer()), out = []
        for (const [k, v] of r.headers) if (!['content-encoding', 'content-length', 'transfer-encoding', 'connection', 'keep-alive', 'set-cookie'].includes(k)) out.push({ name: k, value: k === 'location' ? v.replace(`http://localhost:${PORT}`, 'https://' + u.hostname) : v })
        done('local'); return send('Fetch.fulfillRequest', { requestId: p.requestId, responseCode: r.status, responseHeaders: out, body: body.toString('base64') })
      }
      if (['snap.licdn.com', 'www.googletagmanager.com'].includes(u.hostname) && req.method === 'GET' && p.resourceType === 'Script') { done('real-script'); return send('Fetch.continueRequest', { requestId: p.requestId }) }
      done('stub')
      if (p.resourceType === 'Image') return send('Fetch.fulfillRequest', { requestId: p.requestId, responseCode: 200, responseHeaders: hdrs({ 'content-type': 'image/gif' }), body: GIF.toString('base64') })
      if (p.resourceType === 'Script') return send('Fetch.fulfillRequest', { requestId: p.requestId, responseCode: 200, responseHeaders: hdrs({ 'content-type': 'application/javascript' }), body: '' })
      return send('Fetch.fulfillRequest', { requestId: p.requestId, responseCode: 200, responseHeaders: hdrs({ 'content-type': 'application/json', 'access-control-allow-origin': '*' }), body: Buffer.from('{}').toString('base64') })
    } catch (e) { rec.kind = 'error:' + String(e.message).slice(0, 80); log.push(rec); try { await send('Fetch.failRequest', { requestId: p.requestId, errorReason: 'Failed' }) } catch {} }
  })
  await send('Page.enable'); await send('Runtime.enable'); await send('Network.enable'); await send('Network.setCacheDisabled', { cacheDisabled: true }); await send('Fetch.enable', { patterns: [{ urlPattern: '*' }] })
  const goto = async url => { const loaded = new Promise(res => on('Page.loadEventFired', () => res())); await send('Page.navigate', { url }); await Promise.race([loaded, sleep(25000)]) }

  let fails = 0
  const check = (name, ok, detail = '') => { if (!ok) fails++; console.log(`${ok ? 'PASS' : 'FAIL'} ${name}${detail ? ' :: ' + detail : ''}`) }
  const visit = async (host, p) => {
    log.length = 0; await send('Network.clearBrowserCookies'); await goto(`https://${host}${p}`); await sleep(6000)
    const state = await evalJs(`JSON.stringify({host:location.hostname,proto:location.protocol,partnerIds:window._linkedin_data_partner_ids||null,partnerId:window._linkedin_partner_id||null,gtag:typeof window.gtag,
      awConfig:(window.dataLayer||[]).filter(function(e){return e&&e[0]==='config'&&e[1]==='${AW}'}).length,
      insightScripts:[...document.scripts].filter(function(s){return /snap\\.licdn\\.com\\/li\\.lms-analytics\\/insight\\.min\\.js/.test(s.src)}).length,
      awScripts:[...document.scripts].filter(function(s){return s.src.indexOf('gtag/js?id=${AW}')>-1}).length})`).then(JSON.parse)
    const real = log.filter(r => r.kind === 'real-script').map(r => r.url)
    // a collect request may carry several partners in one pid parameter ("6743762,1542444")
    const px = [...new Set(log.filter(r => new URL(r.url).hostname === 'px.ads.linkedin.com').flatMap(r => String(new URL(r.url).searchParams.get('pid') || '').split(',')).filter(Boolean))]
    const awAll = real.filter(u => u.startsWith(GTAG + AW)), awSite = awAll.filter(u => !/[?&]cx=/.test(u))
    return { state, real, px, insight: real.filter(u => u.startsWith(INSIGHT)).length, gtag: awSite.length, gtagViaGtm: awAll.length - awSite.length,
      otherTags: real.filter(u => !u.startsWith(INSIGHT) && !u.startsWith(GTAG + AW)).map(u => u.replace('https://www.googletagmanager.com/', '')) }
  }
  console.log(`site check: host=${HOST} port=${PORT} partner=${PARTNER} aw=${AW}`)
  for (const p of PATHS) {
    const v = await visit(HOST, p)
    console.log(`${p} -> page ran at ${v.state.proto}//${v.state.host}; requests seen: insight.min.js x${v.insight}, gtag/js?id=${AW} x${v.gtag} (plus x${v.gtagViaGtm} copy loaded by the site's own GTM container, cx=c), px.ads.linkedin.com pids=${JSON.stringify(v.px)}; window._linkedin_data_partner_ids=${JSON.stringify(v.state.partnerIds)}; other script tags loaded: ${JSON.stringify(v.otherTags)}`)
    check(`${p}: snap.licdn.com insight.min.js requested exactly once`, v.insight === 1, `x${v.insight}`)
    check(`${p}: LinkedIn partner ${PARTNER} registered and its pixel (pid=${PARTNER}) sent`, (v.state.partnerIds || []).includes(PARTNER) && v.px.includes(PARTNER), `ids=${JSON.stringify(v.state.partnerIds)} pids=${JSON.stringify(v.px)}`)
    check(`${p}: www.googletagmanager.com/gtag/js?id=${AW} added by the site exactly once`, v.gtag === 1, `x${v.gtag}`)
    check(`${p}: gtag('config','${AW}') queued`, v.state.awConfig >= 1, `x${v.state.awConfig}`)
  }
  if (GATE_CONTROL) {
    const v = await visit('preview-check.vercel.app', PATHS[0])
    console.log(`gate control (a non-production https host) ${PATHS[0]} -> insight x${v.insight}, gtag AW x${v.gtag + v.gtagViaGtm}, pids=${JSON.stringify(v.px)}, window._linkedin_data_partner_ids=${JSON.stringify(v.state.partnerIds)}`)
    check(`non-production host: partner ${PARTNER} is not registered or sent and the AW tag does not load (a tag the site already ran there is not judged)`, v.gtag === 0 && v.gtagViaGtm === 0 && !v.px.includes(PARTNER) && !(v.state.partnerIds || []).includes(PARTNER))
  }
  console.log(fails ? `RESULT: ${fails} FAIL` : 'RESULT: all PASS')
  try { ws.close() } catch {} ; chrome.kill('SIGTERM')
  process.exit(fails ? 1 : 0)
}
main().catch(e => { console.error('check crashed: ' + (e && e.stack || e)); process.exit(3) })
