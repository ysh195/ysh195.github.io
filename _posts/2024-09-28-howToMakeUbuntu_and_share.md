---
layout: single
title: 우분투 웹서버 생성 및 공유
categories: study
tag: [공부, ubuntu, 웹서버 공유]
author_profile: false
---

**[도커 공유 글](https://ysh195.github.io/study/docker_db_share/ "도커로 DB 공유하기")** 과 이어지는 내용입니다.

**이전 글 요약**

> - 함께 프로젝트를 진행하는 팀원들이 대량의 데이터가 담긴 DB를 공유해야 하는 상황입니다.<br><br>
> - 도커로 공유하고자 하였으나, mysql 프로그램과 DB 데이터를 별도로 관리하기엔 번거롭고 부담이 커서 도커를 통한 공유는 포기하였습니다.

<br>

그래서 이번에는 우분투 웹서버를 만들고, 그 안에 DB를 만들어서 팀원들이 우분투 웹서버를 통해 DB를 공유할 수 있도록 하고자 합니다.

<br>

우분투 생성 및 설정, 그리고 DB 공유까지 하기엔 글이 너무 길어지기 때문에 여기서는 생성 및 설정까지만 다루고, DB 연결은 다음 포스트에서 다루겠습니다.

<br>

그냥 보고 10분 안에 끝내실 수 있도록 간략하게만 설명합니다.

<br>

# 1. 호스트가 할 일

<br>

## 1-1. 우분투 생성 및 기본 세팅

<br>

① 우분투 생성

② 우분투 - 네트워킹 - ipv4 방화역 - 규칙 추가

- 443
  > > 웹 서비스용. 프로젝트를 내부에서 실행시키고 웹으로 공개할 거 아니면 불필요
- 3306
  > > mysql용. 다른 DB를 쓴다면 다른 걸로
- 8080
  > > 스프링부트 내장 웹서버용. 다른 프레임워크 쓴다면 그거에 맞춰서
- 모든 ICMP

<br>

③ 우분투 - 고정 ip 생성

> 금방 찾긴 하지만 귀찮으니 복사해서 어디 남겨두는 게 좋음

④ AWS Management Console 사이트 접속 - 콘솔에 로그인 - EC2

⑤ 화면 상단의 "리소스"라고 적힌 박스 안에서 "보안 그룹" 클릭

⑥ 이름 이상한 게 하나 있을 거임. 거기 들어가서 "인바운드 규칙 편집" 클릭

⑦ 규칙 추가 -> "소스" 항목에 "0.0.0.0/0" 입력 -> 규칙 저장

⑧ C:/Users/[사용자명]/.ssh 폴더에 config 파일 생성하고 아래의 내용을 입력

폴더도 없으면 만들어야 합니다.
<br>
config.text로 일단 만들어서 내용 입력하고, 그 다음에 확장자 부분을 지우면 됨
<br><br>
호스트면 사용할 username을 "ubuntu"로 입력해주는 게 편하고, 게스트면 알아서 설정

```java
Host ubuntu_server
    HostName [우분투의 고정 IP]
    User [사용할 username]
    IdentityFile ~/.ssh/id_rsa
```

<br>

⑨ C:\ProgramData\ssh 폴더에 ssh_config 파일 생성하고 아래의 내용을 입력

> 폴더도 없으면 만들어야 함. ssh_config.text로 일단 만들어서 내용 입력하고, 그 다음에 확장자 부분을 지우면 됨

```java
Host *
    ServerAliveInterval 60
    ServerAliveCountMax 3
```

<br>

⑩ 윈도우 파워셸 사용을 추천함. 파워셸 열고 아래의 내용을 입력

```java
ssh-keygen -t rsa -b 4096
cat ~/.ssh/id_rsa.pub
```

<br>

경로 지정은 그냥 엔터 치고, 비번 입력하라고 하는데 안 하고 싶으면 그냥 엔터치면 됩니다.
<br><br>

"cat ~/.ssh/id_rsa.pub"을 입력하면 엄청 긴 문자열(publickey)이 나오는데 그거 다 복사해서 남겨놔야 합니다.

<br>

⑪ 우분투 - "ssh를 사용하여 연결"을 눌러서 우분투 서버 터미널 열고 아래의 내용을 입력

```java
sudo apt update
sudo apt install openssh-server
sudo ufw allow OpenSSH
sudo ufw enable
sudo ufw allow 22/tcp
sudo nano /etc/ssh/sshd_config
```

<br>

이제 sshd_config 파일에 들어가서 아래의 내용을 입력합니다.

```java
AllowUsers ubuntu(접속이 허용된 유저네임. 띄어쓰기로 구분)
PubkeyAuthentication yes
AuthorizedKeysFile .ssh/authorized_keys
```

<br>

ctrl+o 눌러서 저장하고, 바로 엔터 눌러서 경로 확정. 그리고 crtl+x 눌러서 나옴. 그리고 아래의 내용을 이어서 입력

```java
sudo systemctl restart ssh

mkdir -p ~/.ssh
echo [복사한공개키] >> ~/.ssh/authorized_keys // publickey
// 예시 : echo "ssh-rsa AAAAB3... user@example.com" >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
chmod 700 ~/.ssh
```

<br>

⑫ 이제 파워셸에 아래의 명령어를 입력하면 연결됨

```java
ssh [user]@[웹서버의 고정 ip]
```

> 참고로 user는 그냥 우분투 - "ssh를 사용하여 연결"을 눌러서 들어갔을 때 명령어 입력하는 곳에 "ubuntu@ip-172-26-14-216:~$" 이런 식으로 쓰여 있음.<br>여기서 @ 앞이 [user]에 해당함

<br>

## 1-2. 다른 사람에게 우분투 입장권 발급해주기

<br>

> 이걸 하기 전에 호스트는 접속하고자 하는 게스트(외부인)으로부터 그가 원하는 [username]과, 그가 직접 생성한 공개키를 전달 받아야 합니다.

우분투 터미널에 아래의 내용을 입력합니다.

```java
sudo su -
useradd [전달받은username]

su - [전달받은username]
mkdir .ssh
chmod 700 .ssh
touch .ssh/authorized*keys
echo "[전달받은공개키]" >> ~/.ssh/authorized_keys
chmod 600 .ssh/authorized_keys
```

<br>

# 2. 게스트(외부인)이 할 일

<br>

게스트(외부인)는 위의 8번 ~ 10번까지의 절차를 진행하고, 생성된 공개키를 호스트에게 전달해야 합니다.

<br>

# 3. 우분투 내부에 DB 생성 및 연결

<br>

내용이 너무 길어지기 때문에 DB 생성 및 연결은 **[다음 글](https://ysh195.github.io/study/howToShareDB_withUbuntu/ "도커로 DB 공유하기")** 에서 다루겠습니다.
