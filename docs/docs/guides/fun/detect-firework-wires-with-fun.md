# 使用FUN检测烟花导线

本教程将帮助那些想要使用烟花导线功能而无需自己制作导线的用户。

在条件中使用导线非常简单：
```json
"condition":{"type":"building","id":"$on"}
```

您只需要像这样检查ID `"$on"`。非常简单但非常有用。
如果您想检测导线关闭的状态，则需要使用ID `"$off"`。
无需担心检测帧的问题，检查ID就足够了。

以下是一个使用示例：
```json
[{
	"frames":[{"steal":"$res00"}],
	"height":1,
	"id":"wire_sensor.kt101",
	"needs road":false,
	"power":0,
	"price":0,
	"text":"Wire sensor",
	"title":"Wire sensor",
	"type":"terrain",
	"water":0,
	"width":1,
	"fun":[
		{
			"condition":{"type":"building","id":"$on","x":1},
			"actions":[{"type":"remove"}]
		},
		{
			"condition":{"type":"building","id":"$on","x":-1},
			"actions":[{"type":"remove"}]
		},
		{
			"condition":{"type":"building","id":"$on","y":1},
			"actions":[{"type":"remove"}]
		},
		{
			"condition":{"type":"building","id":"$on","y":-1},
			"actions":[{"type":"remove"}]
		}
	]
}]
```

这段代码会检查附近是否有激活的导线，并在条件满足时移除建筑。

<sub>
本页面改编自
TheoTown官方论坛的
[这个主题](https://forum.theotown.com/viewtopic.php?t=10492)
</sub>
