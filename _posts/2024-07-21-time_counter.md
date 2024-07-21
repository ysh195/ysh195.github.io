---
layout : single
title : 디지털 시계 만들기
categories : works
tag: [java, 공부, 연습용]
author_profile : false
---

# <br><br>디지털 시계 만들기

## <br>1. 완성 이미지

번호|이미지
---|---|
**1**|![ysh195]({{site.url}}/assets/images/tc/tc1.png)
**2**|![ysh195]({{site.url}}/assets/images/tc/tc2.png)
**3**|![ysh195]({{site.url}/assets/images/tc/tc3.png)

## <br>2. 코드

## main : TimeCounter
~~~java
package timeCounter;

import java.text.SimpleDateFormat;
import java.util.Date;

public class TimeCounter {

	public static void main(String[] args) {

		Screen sc = new Screen();
		
		while(true) {
			Date now = new Date();
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy.MM.dd HH:mm:ss");
			String strNow = sdf.format(now);
			sc.setT(strNow);
		}
	}

}
~~~

## Screen
~~~java
package timeCounter;

import java.awt.*;
import java.awt.event.*;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.swing.*;

public class Screen{
		
	public static JLabel textLabel = new JLabel("");
	
	Screen(){
		Dimension dim = new Dimension(800,400);
		Font font = new Font("Serif",Font.BOLD,50);
		JFrame frame = new JFrame("디지털 시계");
		frame.setLocation(200, 400);
		frame.setPreferredSize(dim);
		
		textLabel.setFont(font);

		frame.add(textLabel,BorderLayout.CENTER);		
		
		frame.pack();
		frame.setVisible(true);

	}
	
	void setT(String str) {
		textLabel.setText("             " + str);
	}
		
}
~~~
