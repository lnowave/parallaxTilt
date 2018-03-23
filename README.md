# parallaxTilt
一个使html元素呈视觉差倾斜的jQuery插件</br>
A jQuery plug-in, tilt the picture with parallax.</br></br>
[demo](https://lnowave.github.io/parallaxTilt/demo.html)

使用parallaxTilt需要引入jQuery和parallaxTilt.js。
```javascript
<script src="js/jquery-3.0.0.min.js"></script>
<script src="js/parallaxTilt.js"></script>
```

Javascript初始化
```javascript
$('.tilter_image').parallaxTilt({
  //options
})
```

Options设置及默认值
```javascript
{
  parallaxMultiple: 0.1,//视觉差系数
  tiltMultiple: 0.05,//倾斜程度
  duration: 500,//运动过程时间
  easing:'easeOutExpo'//动画类型
}
```

为了更流畅的动画效果，建议给需要运动的元素加上一下css
```css
.tilter_image{
  transition: .5s ease-out;
  transform: translate3d(0,0,0);
}
```
