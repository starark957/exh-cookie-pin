# ExH Cookie Pin

exhentai.org 쿠키(`ipb_member_id`, `ipb_pass_hash`, `igneous`)를 저장해 둔 값으로 고정하는 유저스크립트. AdGuard PC 버전에서 검증(2026-11-10).

이 저장소의 스크립트에는 토큰 값이 없다. 값은 따로 보관한 곳에서 가져와 채운다.

## 설치

1. `exh-cookie-pin.user.js`의 `PIN`에 값 세 개를 채운다. 값이 하나라도 비어 있으면 스크립트는 아무것도 하지 않는다.
2. AdGuard → 확장 → 확장 프로그램 추가에서 파일을 선택한다. AdGuard의 HTTPS 필터링이 켜져 있어야 한다.
3. 값을 채운 파일은 이 저장소에 커밋하지 않는다.

## 업데이트 주소

스크립트 헤더의 `@updateURL`은 최신 릴리즈의 첨부 파일을 가리킨다.

```
https://github.com/starark957/exh-cookie-pin/releases/latest/download/exh-cookie-pin.user.js
```

- 릴리즈의 스크립트에는 값이 없다. 이 주소로 바로 설치한 사본은 아무것도 하지 않는다.
- 새 버전이 릴리즈되면 AdGuard가 설치된 사본을 릴리즈 파일로 교체하므로 채워 둔 값이 지워진다. 업데이트 뒤에는 값을 다시 채운 파일로 설치한다.

## 사용

- 평소에는 `https://exhentai.org`로 접속한다. 페이지를 열 때마다 쿠키 값과 만료일(1년)을 다시 쓴다.
- 흰 빈 페이지가 뜨면 `https://exhentai.org/exh-pin`을 한 번 연다. 404 페이지에서 스크립트가 쿠키를 고친 뒤 메인으로 이동한다. 빈 응답에는 스크립트가 주입되지 않아 메인 새로고침으로는 복구되지 않는다.
