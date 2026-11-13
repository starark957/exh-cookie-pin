# ExH Cookie Pin

exhentai.org 로그인 쿠키 세 개(`ipb_member_id`, `ipb_pass_hash`, `igneous`)를 미리 적어 둔 값으로 고정하는 유저스크립트입니다.

exhentai.org는 이 쿠키가 없거나 값이 어긋나면 빈 흰 페이지만 보여 줍니다. 이 스크립트는 페이지를 열 때마다 쿠키를 적어 둔 값으로 다시 써서, 쿠키가 만료되거나 다른 값으로 바뀌어도 접속이 유지되게 합니다.

> 배포되는 스크립트에는 쿠키 값이 들어 있지 않습니다. 본인 계정의 값을 직접 채워야 동작합니다.

## 동작 방식

`https://exhentai.org/*` 페이지가 열릴 때(`document-start`) 다음을 수행합니다.

- 쿠키 세 개를 `PIN`에 적은 값으로 다시 씁니다. 값이 이미 같아도 매번 다시 써서 만료일을 1년 뒤로 늘립니다.
- 기존 쿠키 값이 `PIN`과 달랐다면 페이지를 한 번 새로고침합니다. 새로고침이 반복되지 않도록 `sessionStorage`에 표시를 남깁니다.
- `PIN` 값이 하나라도 비어 있으면 아무것도 하지 않습니다. 빈 값으로 쿠키를 덮어쓰는 일을 막기 위해서입니다.

스크립트는 `@grant none`으로 실행되고 네트워크 요청을 보내지 않습니다. 쿠키 값은 사용자의 브라우저 밖으로 나가지 않습니다.

## 준비물

- exhentai.org에 정상 접속되는 계정의 쿠키 값 세 개
- 유저스크립트를 실행할 수 있는 환경

Windows용 AdGuard(HTTPS 필터링 켜짐)에서 동작을 확인했습니다. 표준 유저스크립트 헤더만 사용하므로 Tampermonkey나 Violentmonkey 같은 다른 매니저에서도 동작할 것으로 보이지만 확인하지는 않았습니다.

## 쿠키 값 확인

1. exhentai.org에 정상 접속되는 브라우저에서 사이트를 엽니다.
2. `F12`로 개발자 도구를 열고 쿠키 목록으로 갑니다.
   - Chrome, Edge: **Application → Cookies → `https://exhentai.org`**
   - Firefox: **Storage → Cookies → `https://exhentai.org`**
3. `ipb_member_id`, `ipb_pass_hash`, `igneous`의 값을 복사합니다.

`igneous` 값이 `mystery`라면 정상 값이 아닙니다. 정상 접속되는 상태에서 다시 확인하세요.

## 설치

1. `exh-cookie-pin.user.js`를 받습니다. [최신 릴리즈](https://github.com/starark957/exh-cookie-pin/releases/latest)의 첨부 파일과 아래 주소의 파일은 같습니다.

   ```
   https://cdn.jsdelivr.net/gh/starark957/exh-cookie-pin@latest/exh-cookie-pin.user.js
   ```

2. 텍스트 편집기로 열어 `PIN`에 값 세 개를 채웁니다.

   ```js
   var PIN = {
     ipb_member_id: "여기에 값",
     ipb_pass_hash: "여기에 값",
     igneous: "여기에 값",
   };
   ```

3. 값을 채운 파일을 유저스크립트 매니저에 설치합니다.
   - AdGuard: **확장 → 확장 프로그램 추가**에서 파일을 선택합니다. HTTPS 필터링이 켜져 있어야 합니다.

위 주소를 매니저에 그대로 넣어 설치하면 값이 비어 있는 스크립트가 설치되어 아무것도 하지 않습니다. 반드시 값을 채운 파일로 설치하세요.

## 사용

평소에는 `https://exhentai.org`로 접속하면 됩니다.

흰 빈 페이지가 뜨면 `https://exhentai.org/exh-pin`을 한 번 여세요. 이 주소는 404 페이지를 돌려주는데, 스크립트가 여기서 쿠키를 고친 뒤 메인으로 이동합니다. AdGuard는 내용이 없는 응답에 스크립트를 주입하지 못해서, 빈 페이지를 새로고침하는 것만으로는 복구되지 않습니다.

## 업데이트

스크립트 헤더의 `@updateURL`은 [jsDelivr](https://www.jsdelivr.com/)를 거쳐 이 저장소에서 가장 높은 버전 태그의 파일을 가리킵니다.

```
https://cdn.jsdelivr.net/gh/starark957/exh-cookie-pin@latest/exh-cookie-pin.user.js
```

- 새 버전이 나오면 매니저가 설치된 사본을 새 파일로 교체하고, 이때 채워 둔 값이 지워집니다. 업데이트된 뒤에는 새 파일에 값을 다시 채워 설치해야 합니다.
- jsDelivr가 파일을 캐시하므로 새 버전이 이 주소에 반영되기까지 시간이 걸릴 수 있습니다.

## 주의

- 값을 채운 파일은 계정 로그인 정보와 같습니다. 다른 사람에게 보내거나 공개된 곳에 올리지 마세요. 이슈를 등록할 때도 값을 지운 뒤 붙여 넣으세요.
- 비밀번호를 바꾸거나 다시 로그인해서 쿠키 값이 달라지면, 새 값을 채운 파일로 다시 설치해야 합니다.
- 비공식 스크립트이며 E-Hentai와 관련이 없습니다.

## 라이선스

[MIT](LICENSE)
