https://ysh195.github.io/

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
추가한 사항

1. breadcrumbs
: 화면 상단에 Home/Works/.... 라고 표시되는 창이 왔다갔다 하니까
정리가 안 되고, 마음에 안 들어서 게시물 본문과 정렬하여 왼쪽에 고정시킴

2. pre, code
: "~~~"나 "```"  사이에 들어가는 코드들이 화면 밖으로 계속 나가서 화면 밖으로 나가면 자동 줄바꿈 되도록 수정.
그 외에도 배경색과 글자색 등 수정

3. page__related
: 화면 하단에 "참고"라고 뜨면서 다른 게시물들 추천하는데, 위치가 이상해서 게시물 본문과 정렬하여 왼쪽에 고정시킴
~~~
~~~
현재 추가한 내용


.breadcrumbs{
    display: flex !important;
    justify-content: flex-start !important;
}

// pre 내부에 있지 않은 code들의 색상은 따로 지정하는 곳이 있고,
// pre 내부에 있는 애들은 그냥 pre의 스타일을 따르게 됨
pre {
  overflow-x: auto;
  white-space: pre-wrap;
  word-wrap: break-word;
  width: 100%;
  padding: 10px;
}

code {
  width: auto;
  color: black;
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
  _sass/minimal-mistakes/_navigation.scss의 .nav_title(대략 516번째라고 함)
  
  .nav_title{
    ...
    background : $primary-color;
    ...
  }
  
  $primary-color 를 $toc-color로 수정

  이걸 활용해서 글자색도 수정 가능.

  현재 목차 요소 색깔을 바꿔놨음
  .active a {
      background-color: #55acee;
      // @include yiq-contrasted($active-color);
  }
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
배너의 배치는 _layouts/single.html 에서 함
~~~
14. 현재 _includes/footer.html (15~17줄)에서 footer - feed 숨김 처리 해둠.
15. 현재 _data/ui-text.yml (30줄, 621줄)에서 "follow" / "팔로우"라고 되어 있는 것들 "Contact"라고 수정해둠. 그리고 611줄에서 "분 소요"로 되어 있는 것을 "분 소요 예상(정독 시)" 로 수정해둠
16. 현재 _includes/page__meta.html (8줄)에서 날짜/시간 포맷 수정해둠
17. /_sass/minimal-mistakes/\_reset.scss 에서 각 폰트 사이즈 조절 가능
18. 이 리포지토리의 가장 바깥(최상위 디렉토리)에 robots.txt 파일을 추가하고 그 파일에 다음과 같이 입력하여서 게시물들을 검색에 노출시킴
~~~
User-agent: *
Disallow:
Sitemap: https://ysh195.github.io/sitemap.xml
~~~
19. 폰트 수정 _sass/minimal-mistakes.scss에서 import로 폰트 사용.   
그리고 같은 폴더 내의 variables.scss의 17줄 $sans-serif : 의 뒤 ""로 된 것들의 맨 앞에 새로운 폰트명을 입력.   
!! 폰트 함부러 바꾸면 구글 검색엔진이 크롤링하기에 적합하지 않은 사이트라고 판단해서 검색 대상에서 제외당하니까 주의   
20. _sass/minimal-mistakes/_page.scss의 .page__content - :not(pre) > code
pre 내부에 있지 않은 code의 색상을 일괄적으로 지정하는 css가 있어서 수정함
~~~
  :not(pre) > code {
    padding-top: 0.1rem;
    padding-bottom: 0.1rem;
    font-size: 0.8em;
    background: lightgray;
    // background: $code-background-color;
    border-radius: $border-radius;
~~~
