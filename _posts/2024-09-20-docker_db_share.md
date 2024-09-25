---
layout: single
title: 도커로 DB 공유하기
categories: study
tag: [공부, java, docker, DB, springboot]
author_profile: false
---

# 도커로 DB 공유하기

---

프로젝트 등을 위해 다수의 인원이 하나의 DB를 공유해야 하는 상황이 발생할 수 있습니다.<br><br>

이때, 해결 방법은 2가지입니다.<br>

1. 클라우드 DB를 사용한다.
2. 도커로 DB를 공유한다.

<br>

1번이 가장 깔끔하지만, 비용의 문제가 있고, 새로운 DB의 사용법을 익혀야 한다는 부담이 있습니다. 그것이 프로젝트의 참여자 모두에게 적용된다면 프로젝트의 진행 측면에서도 손실일 수 있습니다.

<br>

2번을 사용한다면, 기존의 DB를 도커를 통해 사용할 뿐이기 때문에 그러한 부담이 크게 줄어들고, 도커를 실행시킬 호스트가 항상 컴퓨터를 켜놔야 한다는 점만 빼면 비용도 발생하지 않습니다.

<br>

여기서는 도커를 사용해서 DB를 공유하는 2번 방법을 알아보겠습니다.

## <br>1단계 - 도커에 DB 컨테이너 세팅하기

<br>
도커 터미널에 아래와 같이 입력합니다.

```java
docker pull mysql --(1)
docker image ls
docker run --name mysql -d -p 3306:3306 -e MYSQL_ROOT_PASSWORD=1111 mysql --(2)
docker ps
docker exec -it mysql /bin/bash --(3)
mysql -u root -p --(4)
password: 1111 --(5)
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%'; --(6)
FLUSH PRIVILEGES; --(7)
CREATE DATABASE [DB이름]; --(8)
```

<br>

| 구분 | 설명                                                                                                                                                                                                                                                                                                                               |
| ---- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| (1)  | 도커에 mysql을 이미지로 다운 받습니다. mysql 이미지 다운 기능은 도커에서 공식적으로 지원하는 것이며, mysql 이외의 다른 DB도 가능합니다.                                                                                                                                                                                            |
| (2)  | mysql이라는 이름의 이름을 mysql이라는 이름의 컨테이너로 만들어서 실행합니다.(다른 DB를 다운 받았다면 그것에 맞춰야 합니다.).<br>mysql은 포트 3306:3306이 보편적이기 때문에 이렇게 설정했지만, 포트 설정을 다르게 해도 무방합니다.<br>동시에, root 계정의 비밀번호를 설정합니다. 비밀번호는 보다 복잡하게 설정하는 것을 추천합니다. |
| (3)  | 실행중인 mysql 컨테이너 내부의 터미널에 접속합니다.                                                                                                                                                                                                                                                                                |
| (4)  | mysql에 root 계정으로 접속합니다.                                                                                                                                                                                                                                                                                                  |
| (5)  | 아까 root 계정을 만들 때 입력했던 비밀번호를 입력합니다.                                                                                                                                                                                                                                                                           |
| (6)  | root 계정 사용자에게 모든 DB에 대한 모든 권한을 주면서, 다양한 환경에서 이용할 수 있도록 접근 방식을 %로 설정합니다.<br>권한 설정과 접근 방식은 각자의 상황에 맞게 설정하는 게 좋습니다.<br>만약 다른 팀원들이 다른 DB 사용자계정을 사용한다면, 해당 계정 생성 및 권한 부여, 접근방식 설정도 같이 진행해야 합니다.                 |
| (7)  | 방금 진행한 권한 설정들이 즉시 DB에 반영되도록 합니다.                                                                                                                                                                                                                                                                             |
| (8)  | 사용할 DB를 생성합니다.                                                                                                                                                                                                                                                                                                            |

## <br>2단계 - 도커 내 DB의 외부 접근 허용하기

도커 터미널에서 mysql 컨테이너 내부의 터미널에 접속하고, 아래와 같이 입력합니다.

```java
docker exec -it mysql /bin/bash --(1)
nano /etc/mysql/mysql.conf.d/mysqld.cnf --(2)
bind-address = 0.0.0.0 --(2)
docker restart mysql --(3)
```

<br>

| 구분 | 설명                                                                               |
| ---- | ---------------------------------------------------------------------------------- |
| (1)  | mysql 컨테이너 내부의 터미널에 접속합니다. 이미 접속되어 있다면 입력하지 않습니다. |
| (2)  | 외부에서 도커 내부의 mysql 컨테이너에 접근할 수 있도로 허용합니다.                 |
| (3)  | 도커 내 mysql 컨테이너를 재시작합니다.                                             |

## <br>3단계 - 프로젝트 내부 세팅하기

여기서는 스프링부트를 기준으로 진행합니다.<br>
application.properties 또는 application.yml 파일을 프로젝트 폴더 안에 생성해야 합니다.<br>스프링부트 스타터나 인텔리제이 등으로 프로젝트를 생성했다면 이미 만들어져 있을 겁니다.<br>이미 있다면 다시 만들 필요 없습니다.

<br>

application.properties과 application.yml의 역할 및 기능은 동일하고, 둘 다 있으면 충돌이 발생할 수 있으므로, 둘 중 하나만 있으면 됩니다.<br>그냥 입력 방식의 차이니까 각자 선호하는 쪽을 선택하면 됩니다.

<br>

application.yml로 한다면

```java
>> application.yml
spring:
  datasource:
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql://[호스트IP]:3306/[DB이름]?serverTimezone=Asia/Seoul&useUnicode=true
    username: root
    password: 1111
```

<br>

application.properties로 한다면

```java
>> application.properties
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.datasource.url=jdbc:mysql://[호스트IP]:3306/[DB이름]?serverTimezone=Asia/Seoul&useUnicode=true
spring.datasource.username=root
spring.datasource.password=1111
```

## <br>4단계 - docker-compose 만들기

프로젝트 폴더의 디렉터리 루트(가장 밖. 프로젝트 폴더 들어오면 바로 보이는 곳)에 docker-compose.yml 파일을 생성합니다.

```java
>> docker-compose.yml
version: '3.8'

services:
  db:
    image: mysql:latest
    container_name: [컨테이너 이름]
    environment:
      MYSQL_ROOT_PASSWORD: 1111
      MYSQL_DATABASE: [DB이름]
      MYSQL_USER: user
      MYSQL_PASSWORD: password
    ports:
      - "3306:3306"
    volumes:
      - db_data:/var/lib/mysql
    networks:
      - mynetwork

volumes:
  db_data:

networks:
  mynetwork:
    driver: bridge
```

| 구분                        | 설명                                                                                                                                    |
| --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| services                    | db라는 서비스(MySQL)를 정의합니다.                                                                                                      |
| image                       | MySQL의 최신 버전 이미지를 사용하도록 지정합니다. 다른 버전으로 고정해도 좋습니다.                                                      |
| container_name              | 아까 만들었던 컨테이너 이름을 입력합니다.                                                                                               |
| environment                 | MySQL의 초기 설정을 환경 변수로 지정합니다.                                                                                             |
| MYSQL_ROOT_PASSWORD         | 아까 입력했던 root 계정의 비밀번호를 입력합니다.                                                                                        |
| MYSQL_DATABASE              | 아까 생성했던 DB 이름을 입력합니다.                                                                                                     |
| MYSQL_USER / MYSQL_PASSWORD | root 계정 이외의 다른 DB 사용자를 이용한다면 그 이름과 비밀번호를 입력합니다.                                                           |
| ports                       | 호스트의 3306 포트를 컨테이너의 3306 포트에 매핑하여 외부에서 접근할 수 있도록 설정합니다. 아까 다른 포트로 설정했다면 그것으로 합니다. |
| volumes                     | MySQL 데이터를 호스트의 볼륨에 저장하여 컨테이너가 삭제되더라도 데이터가 유지되도록 합니다.                                             |
| networks                    | MySQL 컨테이너가 다른 서비스와 네트워크를 통해 연결될 수 있도록 설정합니다.                                                             |
