---
layout : single
title : 자바 컬렉션 종류
categories : study
tag: [java, 공부, 컬렉션]
author_profile : false
---

# 자바 컬렉션 종류
- - -
<br>


## <br>1. 컬렉션 구분표
<br>

분류|리스트(list)|셋(set)|맵(map)|
---|---|---|---|
유형|ArrayList, Vector, LinkedList|HashSet, TreeSet|HashMap, HashTable, TreeMap|
특징|순서 O, 중복 O|순서 X, 중복 X|순서 X, 키중복 X, 밸류중복O|
메서드|add, remove, get, contain, isEmpty, toArray, equals, hashcode, set, indexof, iterator, sublist, spliterator, ofcopy|isempty, size, contain, iterator, toarray, add, remove, equal, hashcode, spliiterator|size, isempty, containsKey, containsValue, get, put, remove, Entry(interface. 일종의 iterator 같은 것)|
파이썬 비유|리스트|셋|딕셔너리|

<br>

분류|비유|
---|---|
리스트|리스트는 정말 말 그대로 순서와 내용이 정리된 리스트를 연상하면 됩니다.|
셋|셋은 거대한 인파(군중, 사람들)을 연상하면 됩니다. 수많은 사람들이 뒤섞여 있기 때문에, 그 사이에서 "김철수"를 찾는 것만으로는 누구를 지칭하는지 명확하지 않습니다. 그러니 "경기도 부천시...에 살고, 나이 25살, 김철수"라고 불러야만 찾을 수 있습니다. 아니면 거기에 모인 사람들을 하나하나 내보내면서 검사하거나요. 이처럼 아주 정확하게 그 값을 알고 있거나, 향상된 for문/iterator으로 전체를 하나하나 빼오지 않는 이상, 그 안에 있는 값을 빼올 수 없습니다.|
맵|표를 연상하시면 됩니다. 표에서도 하나의 분류 기준을 설정하고, 그 값에 따라 여러 내용을 나열하는 것과 같습니다.<br>key1 : x1, key2 : x2, key3 : x3, ....|


