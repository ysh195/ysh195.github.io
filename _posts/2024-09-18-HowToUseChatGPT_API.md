---
layout : single
title : chatGPT API 사용법
categories : study
tag: [java, 공부, chatGPT, API]
author_profile : false
---

# chatGPT API 사용법

api 키는 openai 홈페이지에서 간단히 발급 받으실 수 있으니 생략합니다.
<br>

chaptGPT API 사용을 위한 전체 코드.
<br/><br/>
저는 api에서 정보를 받아오는 클래스로 restTemplate을 사용했지만, 다른 것을 사용해도 무방하며,
<br/>스프링부트 공식 문서에서 restTemplate이 deprecated 될 예정이라고 하니,
<br/>restClient 등의 다른 클래스를 사용하는 것을 권장합니다.
<br/>
~~~
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
        \"""
        {
          "model": "%s",
          "messages": [
            {"role": "system", "content": "You are %s"},
            {"role": "user", "content": "%s"},
            {"role": "assistant", "content": "You are %s assistant"}
          ]
        }
        \""",
        chatGptModel,
        systemInitialSetting,
        yourQuestion,
        answerSetting
    );

    HttpHeaders headers = new HttpHeaders();
    headers.setContentType(MediaType.APPLICATION_JSON);
    headers.setBearerAuth(openAiKey); // add [token : bearer token] on [header : authorization]

    // create http request and set my settings on it
    HttpEntity<String> request = new HttpEntity<>(jsonPayload, headers);

    RestTemplate restTemplate = new RestTemplate();

    try{

      URI uri = new URI(openAiUrl);

      // if uri doesn't work well, use jsonPayload(url) directly
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

## <br/>1. api에 보낼 요청 내용 구성하기
<br/>
~~~
String openAiKey = "your_Key";

String openAiUrl = "https://api.openai.com/v1/chat/completions"; // it's fixed

String chatGptModel = "gpt-4";
String systemInitialSetting = "helpful assistant"; // character of chatGpt
String yourQuestion = "Hello, how are you?";
String answerSetting = ""; // format of answer. ex) user : "puppy" / answer : "bowbow"
~~~

<br/>
이해를 돕기 위해 한 가지 예시를 들겠습니다.
<br/>chapGPT api를 사용하지 않고, 그냥 웹에서 사용했다면 당신은 아래와 같은 명령을 하고, 그에 대한 답변을 받았습니다.
<br/>
구분|내용
---|---|
질문|1. 네가 회계사라고 가정하자.<br/>2. 이 회사의 재무제표를 분석한 뒤 이 회사의 경영 상황에 알맞는 조언을 해 줘<br/>3. \[재무제표 내용\]|
답변|분석 결과에 따라 해당 회사의 경영 상황에 맞는 조언을 드리겠습니다.<br/>1. ...을 통한 경영 효율화<br/>2. ...을 통한 시장 점유율 확보<br/>3. ......|

변수명|설명
---|---|
openAiKey|openai에서 발급 받은 시크릿키(scret key)입니다. 이는 타인에게 공개해서는 안 됩니다.|
openAiUrl|openai에 api 사용 요청을 보내기 위한 url 경로입니다. 어느 url을 사용해야 할 지는 openai에서 알려줍니다. 고정된 것이니 그대로 사용해도 좋습니다.|
chatGptModel|사용하고자 하는 chatGPT의 모델을 설정할 수 있습니다. 각자 사용 목적에 알맞는 모델이 무엇인지 조사하는 것이 좋습니다.|
systemInitialSetting|chatGPT의 역할 및 상황설정 등을 의미합니다. 위의 예시 중 "네가 회계사라고 가정하자." 부분에 해당합니다.|
yourQuestion|사용자의 질문 내용입니다.<br/>위의 예시 중 "이 회사의 재무제표를 분석한 뒤 이 회사의 경영 상황에 알맞는 조언을 해 줘"와 "제무제표 내용"에 해당합니다.|
answerSetting|답변의 형식을 지정할 수 있습니다. 사용하지 않아도 무방합니다. |

