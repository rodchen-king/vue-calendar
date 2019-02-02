# 手写vue日历控件过程：

也是之前项目中有用到日历控件，当时由于时间问题，是在网上找到一个demo，然后二次开发的，从那时就想着自己写一个日历控件。

## 设计（以最常用的按月份的日历）
日历其实大家都很熟悉，一切的设计都是从功能出发，这是根本。日历的功能分为两大块。
日历头部：当前年份/月份。
日历主体：当前月份的具体的日期信息。
日历主体的行数：现在我们看到的日历基本上为6行，因为一个月最多为31天，假设当前月的第一天为上一月最后一周的最后一天。如果是五行数据的话则只显示了29天，这也是为什么显示6行数据的原因。

功能点：
日历初始渲染日期为当前月份
头部的左右滑动，日历数据需要显示对应月份的信息
点击日期本身可以进行相关数据操作，并且记录操作内容


## 首先思考日历的核心问题

当前vue的渲染为数据导向页面。日历本身体现的是数据。日历的根本是先将日历数据正确的显示。

### 第一个问题：如何获取当前日期的年份以及月份

`var date = new Date()`
`date.getFullYear() // 获取年份`
`date.getMonth() // 获取月份 （0 - 11，date本身将月份数组形式存储的）`

### 第二个问题：如何获取当前月份需要显示的42条数据（6*7），这42条数据是什么呢？
这个问题的核心是：当前月份显示的42条数据的第一天是哪一天？这个问题的解决思路还要从上面的设计说起，上面提到日历主题的行数时，说到“假设当前月的第一天为上一月最后一周的最后一天”，那么42条数据显示的内容的第一条数据还要根据当前月的第一天是第一天所在周的第几天。

以今天为例：2019-02-01
`new Date(date.getFullYear(), date.getMonth() + 1, 1)`
今天是2月的第一天，星期五，所以当前月日历的第一天为2019-02-01 - 5

`var date = new Date()`
`date.setDate(date.getDate() - date.getDay() + 1) // 获取当前月的第一天为2019-01-28`

这里有一问题是什么呢？date.getDate()的值为0 - 6（0为周日，如果你的日历也是将周日放在日历的第一天，没什么问题，可是在中国是将周日放在最后一天的），这也就意味着前面的想法还需要考虑日历的放置顺序，因为日历是按照普通的周一到周日，还是周日到周一，我们获取的当月日历的第一天是不同的。所以上面的代码还要依赖于日历的排放顺序。

这里的排放顺序将是日历组件的第一个可被调用者控制的参数。
这里我的设想是将该参数的传入值与date.getDay()匹配。 
0：周日  
1：周一  
.....  
5：周五  
6：周六  

所以上面的公式为
`date.setDate(date.getDate() - date.getDay() + x)`
但是这里的x值加了之后的日期如果大于当前月份的第一天，那就需要将当前得到的日期数值再减去7天，这个原因就不用说明了吧。


接下来就好做了，只需要在当前的日期加上加上1，每次得到下一天的日期。

### 左右切换月份如何设定
上面设计都是以今天为计算初始值，左右切换的初始值如何设计呢？第一反应是将当前的日期的月份进行加减1,这样是不行的，因为如果今天是31号，那么碰到下个月只有30的时候，这样就会碰到点击下月，直接切换了两个月。更别说2月这个月份天数不固定的月份。所以这里又是一个问题了。

我的解决思路是：月份点击切换的时候，初始计算值设计为当前月的第一天。

`new Date(date.getFullYear(), date.getMonth() + 1, 1) // 在当前计算值上进行月份切换的时候加1或者减1`

## 考虑初步实现

日历的实现还是样式绘画还是依赖于vue组件和css样式。绘画日历样式。


## 组件设计以及结构
```
VueCalendar
	Component
		Body.vue
		Header.vue
	Utiil.js
	VueCaledar.vue
```