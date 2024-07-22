## google analitics로 블로그 방문객 통계 집계 중.
### https://analytics.google.com/analytics/web/?authuser=0#/p450888864/reports/reportinghub?params=_u..nav%3Dmaui
----
## disqus로 게시글에 대한 댓글 기능 구현 중
### https://ysh195.disqus.com/admin/settings/recommendations/
----
## Google Search Console로 내 블로그를 검색에 노출 중
### https://search.google.com/search-console
----
## 네이버 Search Advisor로 내 블로그를 검색에 노출 중
### https://searchadvisor.naver.com/
----
### 기타
1. 게시물 본문 사이즈를 바꾸고 싶으면 _sass/minimal-mistakes/_page.scss 내부의 .page의 width를 만지면 됨.
2. assets/css/main.scss에서 스타일 수정됨.
~~~
현재 추가한 내용

.breadcrumbs{
    display: flex !important;
    justify-content: flex-start !important;
}

pre, code {
  display: block;
  word-wrap: break-word !important;
  white-space: pre-wrap !important;
  text-align: justify !important;
  max-width: 100% !important;
  overflow: auto !important;
  padding: 5px;
}
~~~
3. 사이드바 쓰려면 아래의 내용을 위쪽 포스트 설정에 입력
 ~~~
  sidebar:
    nav:
      "docs"
  ~~~
4. 이 블로그에 대한 원 저작자의 업데이트를 반영하고 싶으면 아래의 영상 참고.
 ~~~
   https://www.youtube.com/watch?v=zoZ4LF-8j2E&list=PLIMb_GuNnFwfMm3alTSOmDK4AnpdG7USY&index=3
  ~~~
5. 블로그 내 키워드 검색에서 제외하고 싶으면 해당 게시물의 머릿말 속성에서 search : false 쓰면 됨. 중간에 뭔가 확 강조하고 싶거나 공지해야 할 때 그냥 문장 끝에 달아주면 됨. 이런 식으로{: .notice}. 그리고 여러 문장을 한 번에 묶어서 강조하려면 div로 묶어야 함. 아래의 내용 참고.
 ~~~
  https://mmistakes.github.io/minimal-mistakes/docs/utility-classes/#notices
  ~~~
6. 버튼은 [텍스트 내용](url){버튼 양식}으로 써주면 됨.
~~~
버튼 사용법 링크
https://www.youtube.com/redirect?event=video_description&redir_token=QUFFLUhqbGxzQ0dMNjhsVUVzR0J0Z2lsbk1OWktDNzdtZ3xBQ3Jtc0trSU9DLXE5aHlwaERUaGY2WF9fdkk2ekhRbjlkUjVPRHhMcmdHQVp6cGtEWjVBTlppbFkyNk5teWFfYnN3ZUc2WjN2SEJDNTBrNmgtdHlGM05rMnUtQTViMHY2MGtXdS1XZUIxMnUwN0lUc0VYblJPQQ&q=https%3A%2F%2Fmmistakes.github.io%2Fminimal-mistakes%2Fdocs%2Futility-classes%2F%23buttons&v=q0P3TSoVNDM
~~~
7. 유튜브 영상 및 기타 미디어 연결하는 방법.
 ~~~
  {% include video id="XsxDH4HcOWA" provider="youtube" %}
  여기서 말하는 video id는 유튜브 영상 주소의 https://www.youtube.com/watch?v= 뒤에 영어하고 숫자 조합으로 나오는 걸 말함. 주소표시줄에 없으면 공유 - 퍼가기에서 확인 가능.
  
  유튜브 영상 및 기타 미디어 사용법 링크
  https://www.youtube.com/redirect?event=video_description&redir_token=QUFFLUhqa1N1TWpqQzB3OGsxVE9vc3pkdndtakRmNlJnZ3xBQ3Jtc0tuVDdqUjgybUJrZEg2QTc4WGhXcDZ0Sy1kUmJraDhwMl9VcTRDbHVRUWJHV1l3a0pENkNMRThuQnQtNlNIZ3h2WGVFZkFiZU0xU0hqV01pNUJFNlJVYjI0YURzbjBEak1FNWlhaVhkNHlGbTFtY2gzVQ&q=https%3A%2F%2Fmmistakes.github.io%2Fminimal-mistakes%2Fdocs%2Fhelpers%2F%23responsive-video-embed&v=q0P3TSoVNDM
  ~~~
8. 목차 색깔 바꾸기
~~~
  _sass - _valuable.scss 내부 어딘가(되도록 찾기 쉬운 맨 앞이나 맨 뒤에)
  
  $toc-color : 원하는 색깔코드 !default;
  
  를 선언
  
  _sass - _navigation.scss의 .nav_title(대략 516번째라고 함)
  
  .nav_title{
    ...
    background : $primary-color;
    ...
  }
  
  $primary-color 를 $toc-color로 수정

  이걸 활용해서 글자색도 수정 가능.
  ~~~
9. 포스트 내에 이미지 추가하려면 무조건 permalink로 절대참조할 것.
10. 게시물의 카테고리나 게시물 제목을 바꿔서 주소가 변경될 경우, 이전 주소로도 연결되게 하는 방법. 근데 이거 설치하는 데에 엄청 애먹었는데 생각보다 별 거 없어서 괜히 했나 싶음. 오히려 삭제하거나 하면 오류 생길까 걱정됨.
~~~
상단의 게시물 속성에 다음과 같은 내용을 추가한다.

redirect_profile: false
redirect_from:
 - /이전 카테고리명/이전 게시물 제목
~~~
11. 사용자지정 서식 간단 적용
~~~
적용할 대상 앞 혹은 뒤에 {: .서식명}을 입력하고 엔터로 분리해주면 됨. 띄어쓰기로 구분해서 .서식명 여러 개 쓰는 것도 가능

현재 지정된 사용자 지정 서식 ( _sass/minimal-mistakes/_utilities.scss )
 - img-limit-width : 이미지가 너무 커서 안 보이는 일을 막아줌.
~~~
12. 게시물 기본 설정
~~~
_config.yml 의 맨 아래 default 부분에 원하는 내용 추가
~~~
13. banner 사용
~~~
배너 구성은 _includes/top-banner.html 에서 하고
배너의 배치는 _layouts - single.html 에서 함
~~~
14. 현재 _includes/footer.html (15~17줄)에서 footer - feed 숨김 처리 해둠.
15. 현재 _data/ui-text.yml (30줄, 621줄)에서 "follow" / "팔로우"라고 되어 있는 것들 "Contact"라고 수정해둠.
16. 현재 _includes/page__meta.html (8~9줄)에서 날짜 포맷과 시간 포맷 수정해둠
