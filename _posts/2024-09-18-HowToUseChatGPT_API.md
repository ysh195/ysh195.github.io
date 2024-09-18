---
layout : single
title : chatGPT API 사용법
categories : study
tag: [java, 공부, chatGPT, API]
author_profile : false
---

# chatGPT API 사용법
- - -
api 키는 openai 홈페이지에서 간단히 발급 받으실 수 있으니 생략합니다.
<br>

chaptGPT API 사용을 위한 전체 코드.
<br><br>
저는 api에서 정보를 받아오는 클래스로 `restTemplate`을 사용했지만, 다른 것을 사용해도 무방하며,
<br>스프링부트 공식 문서에서 `restTemplate`이 deprecated 될 예정이라고 하니,
<br>`restClient` 등의 다른 클래스를 사용하는 것을 권장합니다.
<br>
~~~java
import java.net.URI;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

public class ChatGpt {

  public void chatGptTest(){

    String openAiKey = "your_Key";

    String openAiUrl = "https://api.openai.com/v1/chat/completions";

    String chatGptModel = "gpt-4";
    String systemInitialSetting = "helpful assistant";
    String yourQuestion = "Hello, how are you?";
    String answerSetting = "";

    String jsonPayload = String.format(
        """
        {
          "model": "%s",
          "messages": [
            {"role": "system", "content": "You are %s"},
            {"role": "user", "content": "%s"},
            {"role": "assistant", "content": "%s"}
          ]
        }
        """,
        chatGptModel,
        systemInitialSetting,
        yourQuestion,
        answerSetting
    );

    HttpHeaders headers = new HttpHeaders();
    headers.setContentType(MediaType.APPLICATION_JSON);
    headers.setBearerAuth(openAiKey);

    HttpEntity<String> request = new HttpEntity<>(jsonPayload, headers);

    RestTemplate restTemplate = new RestTemplate();

    try{

      URI uri = new URI(openAiUrl);

      ResponseEntity<String> responseEntity = restTemplate.exchange(uri, HttpMethod.POST, request, String.class);

      if (responseEntity.getStatusCode().is2xxSuccessful()) { // request and response successfully
        System.out.println(responseEntity.getBody()); // show that body
      }
      else{ // request fail
        System.err.println("request fail");
        System.err.println("error code : " + responseEntity.getStatusCode());
        System.err.println("content : " + responseEntity.getBody());
      }
    }
    catch(Exception e){
      e.printStackTrace();
    }

  }
}
~~~

## <br>1. api에 보낼 요청 내용 구성하기
<br>

~~~java
String openAiKey = "your_Key";

String openAiUrl = "https://api.openai.com/v1/chat/completions"; // it's fixed

String chatGptModel = "gpt-4";
String systemInitialSetting = "helpful assistant"; // character of chatGpt
String yourQuestion = "Hello, how are you?";
String answerSetting = ""; // format of answer. ex) user : "puppy" / answer : "bowbow"
~~~

<br>
이해를 돕기 위해 한 가지 예시를 들겠습니다.
<br>chapGPT api를 사용하지 않고, 그냥 웹에서 사용했다면 당신은 아래와 같은 질문을 하고 그에 대한 답변을 받았을 것입니다.
<br><br>

구분|내용
---|---|
질문|1. 네가 회계사라고 가정하자.<br>2. 이 회사의 재무제표를 분석한 뒤 이 회사의 재무 상황에 알맞는 조언을 해 줘<br>3. \[재무제표 내용\]|
답변|분석 결과에 따라 해당 회사의 재무 상황에 맞는 조언을 드리겠습니다.<br>1. ...을 통한 경영 효율화<br>2. ...을 통한 시장 점유율 확보<br>3. ......|

변수명|설명
---|---|
openAiKey|openai에서 발급 받은 시크릿키(scret key)입니다. 이는 타인에게 공개해서는 안 됩니다.|
openAiUrl|openai에 api 사용 요청을 보내기 위한 url 경로입니다. 어느 url을 사용해야 할 지는 openai에서 알려줍니다. 고정된 것이니 그대로 사용해도 좋습니다.|
chatGptModel|사용하고자 하는 chatGPT의 모델을 설정할 수 있습니다. 각자 사용 목적에 알맞는 모델이 무엇인지 조사하는 것이 좋습니다.|
systemInitialSetting|chatGPT의 역할 및 상황설정 등을 의미합니다. 위의 예시 중 "네가 회계사라고 가정하자." 부분에 해당합니다.|
yourQuestion|사용자의 질문 내용입니다.<br>위의 예시 중 "이 회사의 재무제표를 분석한 뒤 이 회사의 경영 상황에 알맞는 조언을 해 줘"와 "\[제무제표 내용\]"에 해당합니다.|
answerSetting|답변의 형식을 지정할 수 있습니다. 사용하지 않아도 무방합니다. 위의 예시 중 답변 내용의 형식(1. ...을 통한 경영 효율화, 2. ...을 통한 시장 점유율 확보)에 해당합니다. 답변의 형식을 이와 다르게 지정할 수 있습니다.|

## <br>2. 요청 헤더 구성하기
<br>

~~~java
String jsonPayload = String.format(
    """
    {
      "model": "%s",
      "messages": [
        {"role": "system", "content": "You are %s"},
        {"role": "user", "content": "%s"},
        {"role": "assistant", "content": "%s"}
      ]
    }
    """,
    chatGptModel,
    systemInitialSetting,
    yourQuestion,
    answerSetting
);

HttpHeaders headers = new HttpHeaders();
headers.setContentType(MediaType.APPLICATION_JSON);
headers.setBearerAuth(openAiKey);

HttpEntity<String> request = new HttpEntity<>(jsonPayload, headers);
~~~

`jsonPayload`는 `request`의 구체적인 내용을 설정하기 위한 변수입니다.<br>
유지 보수를 용이하게 하고, 가독성을 향상시키고자
`String.format()`
을 사용했습니다.<br>
`request`에 사용할 `headers`를 생성하고, `request`의 형식은 json으로 설정합니다. 그리고 발급 받은 `openAiKey`를 보안 인증에 사용합니다.<br>
이렇게 만든 `jsonPayload`와 `headers`를 사용하여 `request`를 구성합니다.<br>

## <br>3. api에 요청 보내기 
<br>

~~~java
RestTemplate restTemplate = new RestTemplate();

try{

  URI uri = new URI(openAiUrl);

  ResponseEntity<String> responseEntity = restTemplate.exchange(uri, HttpMethod.POST, request, String.class);

  if (responseEntity.getStatusCode().is2xxSuccessful()) { // request and response successfully
    System.out.println(responseEntity.getBody()); // show that body
  }
  else{ // request fail
    System.err.println("request fail");
    System.err.println("error code : " + responseEntity.getStatusCode());
    System.err.println("content : " + responseEntity.getBody());
  }
}
catch(Exception e){
  e.printStackTrace();
}
~~~

<br>

api 요청을 전달하고 그 결과값을 받아올 `restTemplate`을 생성합니다.<br>
`restTemplate.exchange(api 요청을 보낼 uri, 요청 방식, 요청 내용, 받아올 결과의 클래스 타입)`
과 같이 구성합니다.<br>

* uri는 고정된 것입니다.
* 요청 방식이 HttpMethod.POST인 것도 아마 정해진 것으로 알고 있습니다.
* 앞에서 구성한 request를 요청 내용으로 사용합니다.
* chatGPT의 답변은 항상 String타입의 문자열이니, String.class로 합니다.

그리고 `restTemplate`을 통한 api 요청 및 수신은 항상 실패할 가능성이 존재하므로, `try-catch`를 하거나 클래스/메서드에 `throws Exception` 처리가 필요합니다.<br>
이거 안 해주면 빨간줄이 떠서 실행이 불가능합니다. 저는 간단하게 `try-catch`로 해결했습니다.
