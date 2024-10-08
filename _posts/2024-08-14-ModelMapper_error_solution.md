---
layout: single
title: ModelMapper 오류 해결
categories: study
tag: [java, 공부, modelmapper, 오류 해결]
author_profile: false
---

<br>

웹 콘솔 오류 문구

```
org.modelmapper.ConfigurationException: ModelMapper configuration errors:\r\n\r\n1
```

# 1. 오류 원인

MatchingStrategies를 loose로 하면 맵핑 과정에서 객체 혼동 및 중복값이 다수 발생의 문제가 발생하게 됨.
<br>특히, 특별한 조건을 만족하면 더욱 오류의 위험이 늘어난다고 한다.

# 2. 오류 발생 조건

<br>다음을 모두 만족하면 오류가 발생합니다.

| 번호  | 조건                                                                         |
| ----- | ---------------------------------------------------------------------------- |
| **1** | ModelMapper - MatchingStrategies - MatchingStrategies.LOOSE 설정             |
| **2** | 맵핑 객체에 getter, setter가 구현되지 않음(둘 다 없거나 둘 중 하나만 있거나) |
| **3** | 그 상태에서 LocalDateTime 클래스의 필드를 맵핑.                              |

# 3. 오류 해결 방법

<br>다음 중 1개를 선택하여 수행하시면 해결됩니다.

| 번호  | 해결 방안                                                           |
| ----- | ------------------------------------------------------------------- |
| **1** | ModelMapper - MatchingStrategies - MatchingStrategies.STRICT로 설정 |
| **2** | 맵핑 객체에 getter, setter 모두 구현                                |
| **3** | 객체 내 필드값의 클래스에서 LocalDateTime 제거 및 교체              |
