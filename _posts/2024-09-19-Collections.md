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
분류|리스트(list)|셋(set)|맵(map)|
---|---|---|---|
유형|ArrayList, Vector, LinkedList|HashSet, TreeSet|HashMap, HashTable, TreeMap|
특징|순서 O, 중복 O|순서 X, 중복 X|순서 X, 키중복 X, 밸류중복O|
메서드|add, remove, get, contain, isEmpty, toArray, equals, hashcode, set, indexof, iterator, sublist, spliterator, ofcopy|isempty, size, contain, iterator, toarray, add, remove, equal, hashcode, spliiterator|size, isempty, containsKey, containsValue, get, put, remove, Entry(interface. 일종의 iterator 같은 것)|
