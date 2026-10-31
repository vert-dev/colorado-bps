// Run after `next build`:  npm run check:hero-deadline
//
// Guards against past deadline text and the retired benchmarking date coming back.
//   1. Built home page and /pricing page text, the chat route source, and every
//      .tsx under app/ and components/: any calendar date earlier than today
//      (America/Chicago) that sits next to deadline words ("deadline", "due",
//      "critical", "by", "before", "until", "open(s)", "start(s)", "session") fails. History such as "began
//      January 1, 2024" is not next to those words and passes.
//   2. The same three artifacts, and every .tsx under app/ and components/,
//      must not contain the retired claims: a December 2025 audit/pathway
//      deadline, or "August 1" / "June 1" as the annual benchmarking date.
//      June 1, 2027 and June 1, 2031 are the penalty start dates and are allowed;
//      June 1, 2024 and 2025 are completed history entries in the timeline.
//   3. The hero still states the annual November 1 deadline.
//
// Source for November 1: Colorado Energy Office, Building Performance Colorado,
// "Key Dates and Deadlines": "November 1, annually: Benchmarking report and fee
// payment due." https://energyoffice.colorado.gov/bpc
// components/hero-masterclass.tsx is imported by nothing; it is skipped here.
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const MONTHS = ["january","february","march","april","may","june","july","august","september","october","november","december"];
const today = new Intl.DateTimeFormat("en-CA", { timeZone: "America/Chicago" }).format(new Date());
const failures = [];

function pageText(name) {
  const file = path.join(root, ".next", "server", "app", `${name}.html`);
  return fs.readFileSync(file, "utf8")
    .replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ");
}

const artifacts = [
  ["built home page", pageText("index")],
  ["built /pricing page", pageText("pricing")],
  ["chat route source", fs.readFileSync(path.join(root, "app", "api", "chat", "route.ts"), "utf8")],
];

const monthRe = "(Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|June?|July?|Aug(?:ust)?|Sep(?:t(?:ember)?)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)\\.?";
const dateRe = new RegExp(`\\b${monthRe}(?:\\s+(\\d{1,2})(?:st|nd|rd|th)?)?,?\\s+(20\\d{2})\\b`, "g");
const near = /(deadline|due|critical|\bby\b|before|until|next session|\bopens?\b|\bstarts?\b|session)/i;

function isoEnd(m, d, y) {
  const mi = MONTHS.findIndex((n) => n.startsWith(m.slice(0, 3).toLowerCase()));
  const last = new Date(Number(y), mi + 1, 0).getDate();
  const day = d ? Number(d) : last; // "December 2025" means the end of that month
  return `${y}-${String(mi + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (/\.tsx?$/.test(e.name) && !p.endsWith(path.join("components", "hero-masterclass.tsx"))) out.push(p);
  }
  return out;
}
const sources = [...walk(path.join(root, "app")), ...walk(path.join(root, "components"))].map((p) => [path.relative(root, p), fs.readFileSync(p, "utf8")]);
for (const [label, text] of [...artifacts, ...sources]) {
  for (const x of text.matchAll(dateRe)) {
    const iso = isoEnd(x[1], x[2], x[3]);
    if (iso >= today) continue;
    const ctx = text.slice(Math.max(0, x.index - 90), x.index + x[0].length + 20);
    const before = text.slice(Math.max(0, x.index - 30), x.index);
    if (/(began|since|started|passed|effective)\s*$/i.test(before)) continue; // history, not a deadline
    if (near.test(ctx.slice(0, 90 + x[0].length))) {
      failures.push(`${label}: past date next to deadline wording: "${x[0]}" in "...${ctx.replace(/\s+/g, " ").trim()}..."`);
    }
  }
}

const retired = [
  [/Dec(?:ember|\.)?\s+(?:31,?\s+)?2025/i, "December 2025 deadline"],
  [/Aug(?:ust|\.)?\s+1(?!\d)/i, "August 1 benchmarking date"],
  [/(?:benchmark\w*[^.]{0,80}|BEAM Portal[^.]{0,40})\bJune 1(?!\d|,\s*20(?:24|25|27|31))|\bJune 1(?!\d|,\s*20(?:24|25|27|31))[^.]{0,60}benchmark/i, "June 1 benchmarking date"],
];
for (const [label, text] of [...artifacts, ...sources]) {
  for (const [re, what] of retired) {
    const g = new RegExp(re.source, re.flags.includes("g") ? re.flags : re.flags + "g");
    for (const x of text.matchAll(g)) {
      failures.push(`${label}: ${what}: "${text.slice(Math.max(0, x.index - 40), x.index + x[0].length + 20).replace(/\s+/g, " ").trim()}"`);
    }
  }
}

const home = artifacts[0][1];
const m = home.match(/Critical deadline:([\s\S]*?)Choose from/);
if (!m || !/November 1\b/.test(m[1])) failures.push("hero no longer states the November 1 annual benchmarking deadline");
else console.log("hero banner:", m[1].trim());

if (failures.length) {
  console.error(`FAIL (${failures.length}):`);
  for (const f of failures) console.error(" - " + f);
  process.exit(1);
}
console.log("PASS: no past deadline date, no December 2025 / August 1 / June 1 benchmarking text; hero states November 1");
