---
layout: single
title: express 시작하기
categories: study
tag: [자바스크립트, 공부, nodejs, express]
author_profile: false
---

**[Node.js 백엔드 개발자 되기](https://www.11st.co.kr/products/6340005911?NaPm=ct%3Dm1lipe68%7Cci%3D2ea6c965c33fc8d1865382ef7e6bee49f1a2ae58%7Ctr%3Dboknx%7Csn%3D17703%7Chk%3Dcb54bdf037e34581a7c34e7186e697a44033ac6d&utm_term=&utm_campaign=%B3%D7%C0%CC%B9%F6pc_%B0%A1%B0%DD%BA%F1%B1%B3%B1%E2%BA%BB&utm_source=%B3%D7%C0%CC%B9%F6_PC_PCS&utm_medium=%B0%A1%B0%DD%BA%F1%B1%B3 "nodejs_book")** 라는 책을 직접 구입하여 공부한 내용입니다.

<br>

**이전 글**

- [nodejs 시작하기](https://ysh195.github.io/study/whatsThenodejs/ "nodejs 시작하기")
- [nodejs로 라우터 만들기](https://ysh195.github.io/study/makeRouterWithNodejs/ "nodejs로 라우터 만들기")

---

<br>

# 1. express란?

<br>

<p>nodejs로도 기본적인 웹 서버는 구현할 수 있지만 우리가 평소 보는 웹 서버에 비하면 너무 허전합니다.<br>그리고 그런 웹 서버를 만들기에는 nodejs가 기본적으로 제공하는 기능 자체가 부족한 것이 사실입니다.</p>
<p>추가적인 기능들을 모두 직접 구현할 수도 있지만, 그것은 매우 비효율적입니다.<br>우리가 그림을 그릴 때 대부분은 도화지를 사서 쓰지, 그 도화지까지 직접 만들겠다는 생각은 하지 않는 것처럼요. 웹 관련 기능을 더욱 풍성하게 제공하는 프레임워크를 사용하는 것이 효율적입니다.</p>

<p>nodejs 기반의 프레임워크로는 express와 nestjs가 있습니다.</p>

<table>

<thead>
  <tr>
    <th style="width:30px">구분</th>
    <th>express</th>
    <th>nestjs</th>
  </tr>
</thead>

<tbody>

  <tr>
    <td>
      장점
    </td>
    <td>
      자유롭고 간결하다. 
    </td>
    <td>
      기본적으로 제공하는 기능이 많아 구현할 것이 적다.
    </td>
  </tr>

  <tr>
    <td>
      단점
    </td>
    <td>
      직접 구현해야 할 것이 많다.
    </td>
    <td>
      형식이 정해져 있어 자유도가 낮다. 
    </td>
  </tr>

</tbody>

</table>

<p>이번 글에서는 express에 대해서 알아보겠습니다.</p>

<br>

# 2. express 설치하기

> 1. 프로젝트를 저장할 폴더를 생성합니다.<br>※ 이미 있다면 생략합니다.
> 2. vscode 화면 좌측 상단 - 파일 폴더 열기 - 해당 폴더 선택<br>※ 이미 선택되어 있다면 생략합니다.
> 3. `` ctrl + `  `` 버튼을 눌러 터미널을 열어줍니다.
> 4. 그리고 터미널에 `npm i express`를 입력하여 express 프로젝트 폴더를 생성합니다.

<br>

| 생성된 express 프로젝트 폴더 안에 이런 파일들이 있으면 성공입니다.<br>저는 프로젝트 이름을 "exTest"라고 했습니다. |
| ----------------------------------------------------------------------------------------------------------------- |
| ![created_express](https://ysh195.github.io/images/24-09-29_post/created_express.PNG)                             |

<br>

# 3. express 웹 서버 만들기

<br>

<p>만들어진 express 프로젝트 폴더 안에 hello.js라는 파일을 만들고 아래의 내용을 입력합니다.</p>

```java
const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.set({ "Content-Type": "text/html; charset=utf-8" });
  res.end("헬로 Express");
});

app.listen(port, () => {
  console.log(`START SERVER : use ${port}`);
});
```

<br>

<p>이것으로 express 웹 서버 만들기 성공입니다.</p>

<br>

# 4. 코드 설명

<br>

<p>내용이 이전의 것과 거의 다르지 않습니다.</p>

**[이전 글 - nodejs 시작하기](https://ysh195.github.io/study/whatsThenodejs/ "nodejs 시작하기")**

```java
const http = require("http");

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "text/plain");
  res.write("hello\n");
  res.end("Nice to meet you");
});

server.listen(8000, () => console.log("Hello Node.js"));
```

<p>포트 번호와 res.write()는 별 상관 없는 요소이기 때문에<br>달라진 부분은 express와 get의 사용밖에 없다고 할 수 있습니다.</p>

- `require("express")` 는 말 그대로 express라는 라이브러리 안에 들어 있는 웹 서버 기능을 사용하기 위한 것입니다.
- `app.get("/", (req, res) => {...});`는 "https://example.com/"과 같이 "example.com" 뒤에 "/" 이외에는 아무것도 없는 get 요청이 들어왔을 때 처리할 내용을 정하는 것입니다.

<br>

<p>get 요청이 무엇인지 궁금하실 수도 있을 테니, 간단하게 설명하겠습니다.</p>
<p>get 요청은 웹 서버에 요청입니다. 가장 흔히 쓰이는 요청인 get과 post 중 하나입니다. 이 둘은 각각 들어갈 때와 나갈 때로 생각하면 됩니다.</p>
<p>이해를 위해 택배 배송 차량과 HUB(중간 물류 센터)에 비유하겠습니다.</p>

<br>

| 그림 예시                                                                           |
| ----------------------------------------------------------------------------------- |
| ![deliverPackage](https://ysh195.github.io/images/24-09-29_post/deliverPackage.PNG) |
| ![deliverData](https://ysh195.github.io/images/24-09-29_post/deliverData.PNG)       |

<br>

| 그림 번호 | 설명                                                                                                                                                                                                                                                |
| --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1         | 택배 차량이 화물 A를 가지고 HUB로 들어갑니다.<br>그리고 자신이 가져온 화물 A를 HUB에 전달하겠죠.<br>나갈 때는 HUB 있던 화물 B를 차에 싣어 또 다시 다른 HUB 또는 배송지로 이동합니다.                                                                |
| 2         | GET과 POST 요청 또한 마찬가지입니다.<br>클라이언트가 GET 요청으로 데이터 A를 웹에 보내면, 웹은 데이터 A를 바탕으로 정해진 페이지를 보여줍니다.<br>그리고 클라이언트가 POST 요청을 보내면 해당 웹에 있는 데이터 B를 가지고 다른 페이지로 이동합니다. |

<br>

<p>위의 비유에 이어서 설명하자면, 위의 코드에서는 택배 배송 차량의 목적지인 HUB의 이름이 "/"인 것입니다.</p>

<p>이번에는 난이도를 높여서 한 걸음 더 나아가 보겠습니다.</p>

<br>

# 5. 한 걸음 더 나아가기

<br>

**[nodejs로 라우터 만들기](https://ysh195.github.io/study/makeRouterWithNodejs/ "nodejs로 라우터 만들기")** 에서 만들었던 것을 express로 구현해보겠습니다.

<br>

## 5-1. 코드

<br>

```java
const express = require("express");
const app = express();
let posts = []; // (1)

app.use(express.json()); // (2)
app.use(express.urlencoded({ extended: true })); // (3)

app.get("/", (req, res) => {
  res.json(posts); // (4)
});

app.post("/posts", (req, res) => {
  const { title, name, text } = req.body; // (5)
  posts.push({ id: posts.length + 1, title, name, text, createdDt: Date() }); // (6)
  res.json({ title, name, text });
});

app.delete("/posts/:id", (req, res) => {
  const id = req.params.id; // (7)
  const filteredPosts = posts.filter((post) => post.id !== +id); // (8)
  const isLengthChanged = posts.length !== filteredPosts.length; // (9)

  posts = filteredPosts; // (10)

  // (11)
  if (isLengthChanged) {
    res.json("OK");
    return;
  }
  res.json("NOT CHANGED"); // (12)
});

app.listen(3000, () => {
  console.log("welcome board START!");
});
```

<br>

## 5-2. 코드 설명

<br>

| 번호 | 설명                                                                                                                                                                                                                                      |
| ---- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| (1)  | 게시글 리스트 역할을 할 변수입니다. 컬렉션 형태로 정의하여, 여러 가지 정보를 한 번에 담을 수 있습니다.                                                                                                                                    |
| (2)  | 미들웨어를 활성화합니다. 미들웨어란, http 요청과 응답 사이에 함수를 추가하여 새로운 기능을 추가하는 것을 말합니다.<br><br>req.body를 사용하려면 json 미들웨어를 사용해야 하고, 사용하지 않으면 undefined라는 에러 메시지가 나옵니다.      |
| (3)  | post요청이 `application/x-www-form-urlencoded` 형식 인 경우, 내용을 해석하기 위해 사용하는 기능입니다. application/`x-www-form-urlencoded`이란, `키1=값1&키2=값2` 패턴의 데이터를 말합니다.<br><br>※ 이것은 json 미들웨어와 세트입니다.   |
| (4)  | "/"로 get 요청이 오면 위에서 정의한 게시글 리스트(posts)를 json타입으로 보여줍니다.<br><br>json은 data가 저장되는 형식입니다. 비유하자면, 택배상자의 규격 같은 겁니다.                                                                    |
| (5)  | `req.body`에서 값을 받아옵니다. `{ title, name, text }` 와 같이 받을 수 있는 것은 req.body 값이 json 타입이기 때문입니다.                                                                                                                 |
| (6)  | posts라는 [ ] 컬렉션에 새로운 내용을 추가합니다. 듯                                                                                                                                                                                       |
| (7)  | req의 파라미터(params)에서 id값을 가져옵니다.                                                                                                                                                                                             |
| (8)  | 특정 게시글을 필터링합니다.<br><br>여기서 +id는 id가 숫자 타입임을 명확히 하기 위한 표현 방식입니다.<br>자바 형식으로 표현하면 (int)id,<br>파이썬 형식으로 표현하면 id: int,<br>타입스크립트 형식으로 표현하면 id: number<br>와 같습니다. |
| (9)  | 필터링을 통해 반환된 목록 안에 정말 특정 게시글이 존재하지 않는지 확인합니다.                                                                                                                                                             |
| (10) | (8)과 이어지는, 특정 게시글을 삭제하는 로직입니다. 삭제할 게시글의 아이디와 일치하지 않는 것만 필터링해서 나온 목록을, 현재 값에 덮어씌우면 삭제나 다름이 없습니다.                                                                       |
| (11) | 그리고 제대로 삭제가 되었다면 `res.json("OK");` 응답을 보내면서 `return;` 으로 로직을 중간에 종료합니다.                                                                                                                                  |
| (12) | 제대로 삭제가 되지 않았다면 (11) 의 if문이 실행되지 않아 여기까지 왔을 것입니다. if문이 실행되었다면 그 안에서 `return;` 으로 중간에 종료되기 때문에 여기까지 올 수도 없습니다. `res.json("NOT CHANGED");` 응답을 보냅니다.               |
