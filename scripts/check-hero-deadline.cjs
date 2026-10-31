// Run after `next build`:  npm run check:hero-deadline
// Reads the built home page and fails if the "Critical deadline" banner text
// names a calendar date that is already past (America/Chicago today), or no
// longer states the annual November 1 benchmarking deadline.
// Source for November 1: Colorado Energy Office, Building Performance Colorado,
// "Key Dates and Deadlines": "November 1, annually: Benchmarking report and fee
// payment due." https://energyoffice.colorado.gov/bpc
const fs = require("fs");
const path = require("path");

const file = path.join(__dirname, "..", ".next", "server", "app", "index.html");
const html = fs.readFileSync(file, "utf8");
const text = html
  .replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, "")
  .replace(/<[^>]+>/g, "")
  .replace(/&amp;/g, "&");

const m = text.match(/Critical deadline:([\s\S]*?)Choose from/);
if (!m) {
  console.error("FAIL: no 'Critical deadline: ... Choose from' sentence in the built home page");
  process.exit(1);
}
const banner = m[1].trim();
console.log("banner:", banner);

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const today = new Intl.DateTimeFormat("en-CA", { timeZone: "America/Chicago" }).format(new Date());
const past = [];
for (const d of banner.matchAll(/\b([A-Z][a-z]+) (\d{1,2}), (\d{4})\b/g)) {
  const mi = MONTHS.indexOf(d[1]);
  if (mi < 0) continue;
  const iso = `${d[3]}-${String(mi + 1).padStart(2, "0")}-${String(d[2]).padStart(2, "0")}`;
  if (iso < today) past.push(`${d[0]} (${iso} < ${today})`);
}
if (past.length) {
  console.error("FAIL: banner names a past date: " + past.join("; "));
  process.exit(1);
}
if (!/November 1\b/.test(banner)) {
  console.error("FAIL: banner no longer states the November 1 annual benchmarking deadline");
  process.exit(1);
}
console.log("PASS: no past date in the banner; November 1 annual deadline stated");
