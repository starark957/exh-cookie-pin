// ==UserScript==
// @name         ExH Cookie Pin
// @namespace    https://github.com/starark957/exh-cookie-pin
// @version      1.0.0
// @description  exhentai.org 쿠키를 저장해 둔 값으로 고정
// @author       starark957
// @license      MIT
// @homepageURL  https://github.com/starark957/exh-cookie-pin
// @supportURL   https://github.com/starark957/exh-cookie-pin/issues
// @updateURL    https://cdn.jsdelivr.net/gh/starark957/exh-cookie-pin@latest/exh-cookie-pin.user.js
// @downloadURL  https://cdn.jsdelivr.net/gh/starark957/exh-cookie-pin@latest/exh-cookie-pin.user.js
// @match        https://exhentai.org/*
// @run-at       document-start
// @grant        none
// ==/UserScript==
(function () {
  "use strict";

  // 본인 계정의 쿠키 값을 채운다. 확인 방법은 README 참고.
  // 값을 채운 파일은 로그인 정보와 같으므로 공유하지 않는다.
  var PIN = {
    ipb_member_id: "",
    ipb_pass_hash: "",
    igneous: "",
    // sk: "값", // 필요하면 주석을 풀고 값을 채운다
  };

  function get(name) {
    var parts = document.cookie.split("; ");
    for (var i = 0; i < parts.length; i++) {
      if (parts[i].indexOf(name + "=") === 0) return parts[i].slice(name.length + 1);
    }
    return undefined;
  }

  // 값이 비어 있으면 아무것도 하지 않음(빈 값으로 쿠키를 덮어쓰는 사고 방지)
  for (var key in PIN) {
    if (!PIN[key]) return;
  }

  var changed = false;
  for (var name in PIN) {
    if (get(name) !== PIN[name]) changed = true;
    // 값이 같아도 매번 다시 써서 만료일을 1년 뒤로 갱신
    document.cookie = name + "=" + PIN[name] + "; domain=.exhentai.org; path=/; max-age=31536000; secure";
  }

  // 복구용 주소(404 페이지): 쿠키를 고친 뒤 메인으로 이동
  if (location.pathname === "/exh-pin") {
    location.replace("/");
    return;
  }

  if (changed && !sessionStorage.getItem("exhPin")) {
    // 무한 새로고침 방지
    sessionStorage.setItem("exhPin", "1");
    location.reload();
  } else if (!changed) {
    sessionStorage.removeItem("exhPin");
  }
})();
