---
title : 자바 DB드라이버 사용법 쉽게 이해하기
categories : study
tag: [java, 공부]
---

# <br><br>자바 DB드라이버 사용법 간단 설명

<br>제가 공부하면서 스스로 이해한 내용을 바탕으로, 자바 DB드라이버의 sql, PreparedStatement, excute, ResultSet 등의 사용법을 최대한 쉽게 설명해보겠습니다.

## <br>1. DBDriver와 Connection

~~~java
import java.sql.Connection;
import java.sql.DriverManager;

public class StudyDBDriver {

	public static void main(String[] args) {
		
        try {			
			Class.forName("[DB드라이버 라이브러리 주소]"); ---(1)
			Connection connection = DriverManager.getConnection(
                url,
                DBUserName,
                password
                ); ---(2)
			System.out.println("DB연동에 성공하였습니다.");
		}
		catch(ClassNotFoundException e) {
			e.printStackTrace();
			System.out.println("드라이버 클래스 못 찾음");
		}
		catch(Exception e) {
			e.printStackTrace();
			System.out.println("DB와 연동 과정에서 기타 문제 발생");
		}
	}
}
~~~

위의 코드가 가장 기본적인 DBDriver와 Connection의 사용법입니다.

(1) Class.forName("[DB드라이버 라이브러리 주소]")

> DB연결에 필요한 DB드라이버 라이브러리가 존재하는지 확인하기 위한 코드입니다.
<br><br>드라이버가 존재하지 않을 경우 ClassNotFound 오류가 발생하므로, ClassNotFoundException 예외처리를 합니다.<br><br>자바 빌드패스에 등록하거나 maven, gradle 등으로 의존성 주입한 DB 드라이버가 있으실 겁니다. 현재 사용 중인 드라이버마다 그 내용이 달라집니다.<br><br>MySql의 경우, 현재 사용 중인 드라이버의 버전에 따라 중간에 "cj"가 들어갈 수도 있고 아닐 수도 있습니다.

<br>
(2) Connection connection = DriverManager.getConnection(url,DBUserName, password)<br><br>

> DriverManager(DB드라이버 내에 있는 클래스)에 내장된 getConnection 메서드를 사용하여 자바와 DB를 연결합니다.<br><br>그리고 연결을 위해서는 ① url, ② DBUserName, ③ password 이 모두 필요합니다.

<br>① url<br>
<br>url은 다음과 같이 구성됩니다.<br><br>"jdbc: [DB프로그램명] :// [호스트타입] : [포트번호] / [DB명] ?serverTimezone=UTC"<br><br>예시) "jdbc:mysql://localhost:3306/test?serverTimezone=UTC"<br><br>어느정도 형식은 정해져 있지만 사용하는 DB프로그램마다 약간씩 내용이 달라질 수 있습니다.

* DB프로그램명 : 사용하는 DB프로그램의 이름입니다. MySql, Oracle, MariaDB 등이 있습니다.
* 호스트타입 : localhost, %, 특정 아이피(예 : 192.168.255.255)가 있습니다.
* 포트번호 : 사용하시는 DB프로그램마다 기본적으로 설정되는 포트가 다릅니다. 오라클은 보통 1521, MySql과 MariaDB는 3306입니다.
* DB명 : DB프로그램의 이름(오라클, MySql 등)이 아니라, DB프로그램에 등록된 DB의 이름입니다.

<br>② DBUserName<br>
<br>DB에 등록된 유저네임입니다. 아마 DB를 생성하시면서 root를 생성하셨을 겁니다. root를 그대로 사용해도 좋고, 등록된 또다른 유저네임을 사용해도 좋습니다.<br>

<br>③ password<br>
<br>유저네임을 등록하면서 함께 지정한 비밀번호입니다.

## <br>2. sql과 PreparedStatement
