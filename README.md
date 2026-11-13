# ExH Cookie Pin

[![jsDelivr Stats](https://data.jsdelivr.com/v1/package/gh/starark957/exh-cookie-pin/badge)](https://www.jsdelivr.com/package/gh/starark957/exh-cookie-pin)

ExH Cookie Pin 유저 스크립트는 ExHentai 로그인 쿠키 세 개(`ipb_member_id`, `ipb_pass_hash`, `igneous`)를 미리 적어 둔 값으로 고정합니다.

ExHentai는 이 쿠키가 없거나 값이 어긋나면 빈 흰 페이지만 보여 줍니다.\
또한 유효한 igneous 쿠키를 가지고 있어도 주기적으로 쿠키가 만료되어 다시 로그인을 해야 하는 불편함이 있었습니다.

이 스크립트는 페이지를 열 때마다 쿠키를 다시 써서, 쿠키가 만료되거나 다른 값으로 바뀌어도 접속이 유지되게 합니다.

> [!IMPORTANT]
> 배포되는 스크립트에는 쿠키 값이 들어 있지 않습니다. 본인 계정의 값을 직접 채워야 동작합니다.
>

## 설치

### 빠른 시작

아래 URL의 스크립트를 받아 `PIN`에 쿠키 값 세 개를 채운 뒤 설치합니다.

https://cdn.jsdelivr.net/gh/starark957/exh-cookie-pin@latest/exh-cookie-pin.user.js

```js
var PIN = {
  ipb_member_id: "여기에 값",
  ipb_pass_hash: "여기에 값",
  igneous: "여기에 값",
};
```

값을 찾는 방법은 [쿠키 값 확인](#쿠키-값-확인)을 참고하세요. 값이 하나라도 비어 있으면 스크립트는 아무것도 하지 않습니다.

### 설치하는 법

Windows용 AdGuard에서 동작을 확인했습니다. 표준 유저스크립트 헤더만 사용하므로 다른 매니저에서도 동작할 것으로 보이지만 확인하지는 않았습니다.

- AdGuard for Windows (확인됨)
  1. 빠른 시작의 URL을 마우스 오른쪽 버튼으로 눌러 **다른 이름으로 링크 저장**으로 파일을 받습니다. [최신 릴리즈](https://github.com/starark957/exh-cookie-pin/releases/latest)의 첨부 파일도 같은 파일입니다.
  2. 받은 파일을 텍스트 편집기로 열어 `PIN`에 값 세 개를 채우고 저장합니다.
  3. AdGuard의 **확장 → 확장 프로그램 추가**에서 저장한 파일을 선택합니다.
  4. exhentai.org를 열어 둔 탭으로 돌아가 새로고침합니다.

  HTTPS 필터링이 켜져 있어야 합니다. URL을 눌러 바로 설치하면 값이 비어 있는 스크립트가 설치되므로 반드시 값을 채운 파일로 설치하세요.

- Violentmonkey, Tampermonkey (확인하지 않음)

  <details>
  <summary>브라우저 확장 매니저에 설치하기</summary>

  1. 빠른 시작의 URL을 눌러 매니저의 설치 화면에서 설치합니다.
  2. 매니저의 대시보드에서 ExH Cookie Pin의 편집 화면을 엽니다.
  3. `PIN`에 값 세 개를 채우고 저장합니다.
  4. exhentai.org를 열어 둔 탭으로 돌아가 새로고침합니다.

  </details>

## 쿠키 값 확인

1. exhentai.org에 정상 접속되는 브라우저에서 사이트를 엽니다.
2. `F12`로 개발자 도구를 열고 쿠키 목록으로 갑니다.
   - Chrome, Edge: `Application` > `Cookies` > `https://exhentai.org`
   - Firefox: `Storage` > `Cookies` > `https://exhentai.org`
3. `ipb_member_id`, `ipb_pass_hash`, `igneous`의 값을 복사합니다.

> [!NOTE]
> `igneous` 값이 `mystery`라면 정상 값이 아닙니다. 정상 접속되는 상태에서 다시 확인하세요.

## 사용

평소에는 `https://exhentai.org`로 접속하면 됩니다.

흰 빈 페이지가 뜨면 `https://exhentai.org/exh-pin`을 한 번 여세요. 이 주소는 404 페이지를 돌려주는데, 스크립트가 여기서 쿠키를 고친 뒤 메인으로 이동합니다.

## 업데이트

스크립트 헤더의 `@updateURL`은 [jsDelivr](https://www.jsdelivr.com/)를 거쳐 이 저장소에서 가장 높은 버전 태그의 파일을 가리킵니다. 빠른 시작의 URL과 같은 주소입니다.

> [!WARNING]
> 새 버전이 나오면 매니저가 설치된 사본을 새 파일로 교체하고, 이때 채워 둔 값이 지워집니다. 업데이트된 뒤에는 새 파일에 값을 다시 채워 설치해야 합니다.

jsDelivr가 파일을 캐시하므로 새 버전이 이 주소에 반영되기까지 시간이 걸릴 수 있습니다.

## 동작 방식

`https://exhentai.org/*` 페이지가 열릴 때(`document-start`) 다음을 수행합니다.

- 쿠키 세 개를 `PIN`에 적은 값으로 다시 씁니다. 값이 이미 같아도 매번 다시 써서 만료일을 1년 뒤로 늘립니다.
- 기존 쿠키 값이 `PIN`과 달랐다면 페이지를 한 번 새로고침합니다. 새로고침이 반복되지 않도록 `sessionStorage`에 표시를 남깁니다.
- `PIN` 값이 하나라도 비어 있으면 아무것도 하지 않습니다. 빈 값으로 쿠키를 덮어쓰는 일을 막기 위해서입니다.

스크립트는 `@grant none`으로 실행되고 네트워크 요청을 보내지 않습니다. 쿠키 값은 사용자의 브라우저 밖으로 나가지 않습니다.

## 주의

- 비밀번호를 바꾸거나 다시 로그인해서 쿠키 값이 달라지면, 새 값을 채운 파일로 다시 설치해야 합니다.
- 비공식 스크립트이며 E-Hentai와 관련이 없습니다.

## 라이선스

[MIT](LICENSE)
