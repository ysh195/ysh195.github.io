---
layout: single
title: 우분투 웹서버 생성 및 공유
categories: study
tag: [공부, ubuntu, 웹서버 공유]
author_profile: false
---

**[도커 공유 글](https://ysh195.github.io/study/docker_db_share/ "도커로 DB 공유하기")**, **[우분투 생성 및 공유 글](https://ysh195.github.io/study/howToMakeUbuntu_and_share/ "도커로 DB 공유하기")** 과 이어지는 내용입니다.

**이전 글 요약**

> - 함께 프로젝트를 진행하는 팀원들이 대량의 데이터가 담긴 DB를 공유해야 하는 상황입니다.<br><br>
> - 도커로 공유하고자 하였으나, mysql 프로그램과 DB 데이터를 별도로 관리하기엔 번거롭고 부담이 커서 도커를 통한 공유는 포기하였습니다.<br><br>
> - 우분트 웹서버를 생성하고, 다른 사용자가 접속할 수 있도록 했습니다.

<br>

이번 포스트에서 나오는 내용은 모두 호스트가 할 일입니다.

<br>

# 1. 우분투 생성 및 기본 세팅

<br>

우분투 내부에 생성된 DB는 특이한 점이 있습니다.

> - root 계정이 존재하지 않으며, 생성할 수도 없습니다.<br><br>
> - 초기 사용자 이름은 dbmasteruser로 고정입니다.<br><br>
> - GRANT ALL PRIVILEGES 같은 포괄적인 권한 부여가 아예 막혀 있습니다.

<br>

그러니 평소 DB를 사용할 때와 다른 점이 느껴지더라도 당황할 필요 없습니다.

---

<br>

우분투는 공식적으로 우분투 내부의 DB 생성을 지원하고 있습니다. DB 프로그램 설치에 부담을 느낄 것 없이 딸깍으로 가능합니다.

| ① 우분투 관리 항목 중 "데이터베이스" 클릭                                 |
| ------------------------------------------------------------------------- |
| ![우분투DB1](https://ysh195.github.io/images/24-09-28_post/ubuntudb1.PNG) |

<br>

| ② DB 프로그램은 원하는 것으로 선택                                        |
| ------------------------------------------------------------------------- |
| ![우분투DB2](https://ysh195.github.io/images/24-09-28_post/ubuntudb2.PNG) |

<br>

**③ 요금제 및 리소스 이름 적당히 선택하고 "데이터베이스 생성" 클릭.**

> 생성이 완료되기까지 10분 정도 걸립니다.

<br>

**④ 생성이 완료되면, 만들어진 데이터베이스 눌러서 들어감**

<br>

| ⑤ 사용자 이름 및 암호 - 암호 - 암호 변경 클릭 후 원하는 비밀번호 입력(최소 8자리) |
| --------------------------------------------------------------------------------- |
| ![우분투DB3](https://ysh195.github.io/images/24-09-28_post/ubuntudb3.PNG)         |

> 수정이 완료되기까지 5분 정도 걸립니다.

<br>

| ⑥ "엔드포인트"라는 엄청 긴 문자열이 있을 텐데, 이거 어디 기록해놔야 함    |
| ------------------------------------------------------------------------- |
| ![우분투DB4](https://ysh195.github.io/images/24-09-28_post/ubuntudb4.PNG) |

> 엔드포인트와 사용자 아이디, 비번이 있으면 누구나 DB에 들어올 수 있으니 유출되지 않게 잘 보관해야 함

<br>

| ⑦ 데이터베이스 관리 항목 중 "네트워킹" 클릭 - 퍼블릭 모드 활성화          |
| ------------------------------------------------------------------------- |
| ![우분투DB5](https://ysh195.github.io/images/24-09-28_post/ubuntudb5.PNG) |

> 수정이 완료되기까지 5분 정도 걸립니다.

<br>

**⑧ 이번에는 우분투 터미널로 접속해서 아래의 명령어 입력**

여기서부터는 mysql을 설치했느냐, postgres를 설치했느냐에 따라 명령어가 조금 다릅니다.

접속 루트는 우분투 내부에서 서로 연결시킬 게 아니라면 %이 좋습니다.

- postgres의 경우

```java
sudo ufw allow 5432
sudo apt install postgresql-client
psql -h [엔드포인트] -U dbmasteruser -d postgres
create database [DB이름]
CREATE USER '[사용자이름]'@'[접속루트]' IDENTIFIED BY '[비밀번호]';
GRANT SELECT, INSERT, UPDATE, DELETE ON [DB이름 또는 *].[테이블 이름 또는 *] TO '[사용자이름]'@'[접속루트]';
```

<br>

- mysql의 경우

```java
sudo ufw allow 3306
sudo apt install mysql-client
mysql -u dbmasteruser -p -h [엔드포인트]
create database [DB이름]
CREATE USER '[사용자이름]'@'[접속루트]' IDENTIFIED BY '[비밀번호]';
GRANT SELECT, INSERT, UPDATE, DELETE ON [DB이름 또는 *].[테이블 이름 또는 *] TO '[사용자이름]'@'[접속루트]';
```

<br>

# 2. 프로젝트와 연결

<br>

| vscode - mysql 플러그인 사용 예시                                         |
| ------------------------------------------------------------------------- |
| ![우분투DB6](https://ysh195.github.io/images/24-09-28_post/ubuntudb6.PNG) |

<br>

예시를 참고하여 각 프레임워크 별 세팅 파일에 맞춰서 설정하시면 됩니다.
