---
layout: single
title: nodejs로 라우터 만들기
categories: study
tag: [자바스크립트, 공부, nodejs]
author_profile: false
---

**[Node.js 백엔드 개발자 되기](https://www.11st.co.kr/products/6340005911?NaPm=ct%3Dm1lipe68%7Cci%3D2ea6c965c33fc8d1865382ef7e6bee49f1a2ae58%7Ctr%3Dboknx%7Csn%3D17703%7Chk%3Dcb54bdf037e34581a7c34e7186e697a44033ac6d&utm_term=&utm_campaign=%B3%D7%C0%CC%B9%F6pc_%B0%A1%B0%DD%BA%F1%B1%B3%B1%E2%BA%BB&utm_source=%B3%D7%C0%CC%B9%F6_PC_PCS&utm_medium=%B0%A1%B0%DD%BA%F1%B1%B3 "nodejs_book")** 라는 책을 직접 구입하여 공부한 내용입니다.

---

<br>

# 1. 라우터란?

<br>

우리가 흔히 사용하는 웹 서버는 URL 경로에 따라서 다른 페이지를 보여줍니다. 이것을 "라우팅"이라고 합니다.<br><br>라우팅을 위해 웹 서버가 URL 경로를 읽고 구분해서 각각 다른 응답을 하도록 설정하는 것이 라우터입니다.

<br>

# 2. 코드

<br>

```java
const http = require("http");
const url = require("url"); // (1)

http
  .createServer((req, res) => {
    const path = url.parse(req.url, true).pathname; // (2)

    res.setHeader("Content-Type", "text/html");

    if (path in urlMap) {
      // (3)
      urlMap[path](req, res); // (4)
    } else {
      notFound(req, res); // (5)
    }
  })
  .listen("3000", () => console.log("라우터 리팩토링!"));

const user = (req, res) => {
  // (6)
  const user = url.parse(req.url, true).query; // (7)
  res.end(`[user] name : ${user.name}, age: ${user.age}`); // (8)
};

const feed = (req, res) => {
  // (9)
  res.end(
    `<p>
         p 태그는 html의 요소로 취급되고, p 태그 안에 문구가 들어갑니다.
    </p>`
  ); // (10)
};

const notFound = (req, res) => {
  // (5)
  res.statusCode = 404;
  res.end("404 page not found");
};

const urlMap = {
  // (3)
  "/": (req, res) => res.end("HOME"),
  "/user": user, // (6)
  "/feed": feed, // (9)
};
```

<br>

# 3. 해설

| 번호 | 내용                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| (1)  | `require("url")`로 \[url 모듈\]을 사용하면 req(request)에 입력된 url 경로를 사용할 수 있습니다.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| (2)  | `url.parse().pathname`을 사용하면 url 경로 중 "?"의 앞 부분을 읽어올 수 있습니다.<br><br>(예시)<br>`url = https://www.example.com/a/b?c=3&d=5` <br>`url.parse().pathname = /a/b`                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| (3)  | 코드의 하단에 urlMap이 정의되어 있습니다. 이름 그대로 map 형태(키 : 값)입니다.<br><br>`A in B`는 파이썬에서 사용되는 문법으로, B라는 컬렉션(여러 가지 공통점이 있는 것들끼리 묶어 놓은 그룹) 안에 A라는 요소가 포함되어 있는지 조사하여 `True/False`로 값을 반환해줍니다. 따라서 이것은 미리 정해둔 url 유형 중 현재 path와 일치하는 것이 있는지 확인하는 내용입니다.                                                                                                                                                                                                                                                                |
| (4)  | `urlMap[path]`는 컬렉션 내에 "path"와 일치하는 키가 있다면, 그 키와 짝을 이루는 값을 반환해줍니다.<br><br>그리고 urlMap 안에 들어 있는 요소는 모두 (req, res)를 매개변수로 받는 함수이기 때문에 반환된 `urlMap[path]` 값에 (req, res)를 붙여서 함수가 정상적으로 실행될 수 있도록 합니다.<br><br>아래에서는 미리 정의해 둔 함수를 urlMap의 값으로 넣었기 때문에 함수처럼 보이지 않을 수 있지만, 따져 보면 이런 형식입니다<br><br>const urlMap = {<br> &nbsp; &nbsp; "/" : (req, res) => res.end("HOME"),<br> &nbsp; &nbsp; "/user" : (req, res) => res.end("USER"),<br> &nbsp; &nbsp; "/feed" : (req, res) => res.end("FEED"),<br>}; |
| (5)  | `notFound` 함수는 코드 아래쪽에 정의되어 있습니다. 응답코드를 404로 설정하고, "404 page not found" 메시지를 전달합니다.<br><br>이 코드는 `notFound`를 사용해서 현재의 path값이 urlMap에 저장된 것들과 일치하지 않으면 에러 페이지로 보내는 기능입니다.                                                                                                                                                                                                                                                                                                                                                                               |
| (6)  | user 함수에 대한 정의입니다. urlMap에 값으로 들어가 있습니다.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| (7)  | `url.parse().query`를 사용하면 `url.parse().pathname`와는 반대로 url 경로 중 "?"의 뒷 부분을 읽어올 수 있습니다. 그리고 읽어온 값을 map 형태로 반환해줍니다.<br><br>(예시)<br>`url = https://www.example.com/user?name=amy&age=20` <br>`url.parse().query = { name: amy, age: 20 }`                                                                                                                                                                                                                                                                                                                                                  |
| (8)  | `user = { name: ?, age: ? }`의 형식으로 구성되어 있으니, (7)번의 예시를 그대로 사용한다면 `user.name = amy` , `user.age = 20`이 반환됩니다.<br><br> \`문자열\`을 사용하면 \`\` 사이에 ${변수명}을 집어 넣는 것으로 변수의 값을 간단하게 끼워 넣을 수 있습니다. <br><br>이 함수를 실행한다면 query에 입력되어 있는 정보를 사용하여 응답으로 보내줄 수 있습니다.                                                                                                                                                                                                                                                                       |
| (9)  | feed 함수에 대한 정의입니다. urlMap에 값으로 들어가 있습니다.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| (10) | `` res.end(` `) `` 을 사용하면 html 문법을 사용한 응답을 보낼 수 있습니다. \` \` 사이에 입력한 html 문법 그대로 출력됩니다.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
