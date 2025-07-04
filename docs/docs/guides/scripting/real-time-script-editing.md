# 实时脚本编辑

如果您过去尝试在插件中使用Lua脚本，可能已经注意到每次修改脚本后都需要重启游戏，这非常耗时。如果能实时编辑脚本并让游戏自动应用更改，岂不是更好且更高效？这正是名为#LuaWrapper的辅助脚本可以实现的功能。

当前您包含脚本的json可能如下：
```json
"script":"myscript.lua"
```

要实现实时脚本编辑，请使用以下形式：
```json
"script": "#LuaWrapper",        // 使用包装器作为主脚本
"meta": {
  "luawrapper": {
    "script": "myscript.lua",   // 这是您的脚本文件
    "dev": true                 // 实际启用实时编辑
  }
}
```

这看起来有些复杂，它是如何工作的？预定义的#LuaWrapper脚本会检测到更改后加载并重新加载给定的"myscript.lua"脚本文件。"dev":true是一个简单开关，可用于禁用实时脚本功能，例如发布插件时。

## 注意事项
当然，由于一些注意事项，实时脚本功能默认不启用。特别是在发布的插件中不应使用：

* **性能**

    游戏对脚本执行时机有静态假设。例如，如果脚本没有实现script:update函数，则在更新事件触发时甚至不会考虑它。可能随时更改的脚本无法在这方面进行优化，因为它们必须一直被考虑。另一个方面是#LuaWrapper重定向对实时脚本的调用会增加一些开销。

* **Lua生命周期**

    Lua脚本的生命周期提供了脚本函数调用顺序的明确定义。
    详见[文档](https://doc.theotown.com/topics/00-intro.md.html)。
    实时脚本通过在稍后时间点(通常在所有其他脚本初始化后)加载来打破这个生命周期。尽管#LuaWrapper确保会调用实时脚本的init函数，但与其他脚本的依赖关系可能不如预期。

* **隐藏的脚本对象**

    对于普通脚本，您可以使用`Draft:getScripts()`访问附加到draft的脚本对象。但由于实时脚本被#LuaWrapper包装，您只能访问包装器。实时脚本不作为常规脚本对象存在，而是使用以#LuaWrapper为原型的表。这样做是为了从实时脚本的角度看，它是一个完整的脚本对象。

观看实时编辑效果视频：
<iframe width="560" height="315" src="https://www.youtube.com/embed/EE9qoKTCbZ0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

示例可从此处下载：<br/>
[:material-file-download: realtimelua.zip](../../assets/guides/realtimelua.zip)

<sub>
本页面改编自
TheoTown官方论坛的
[这个主题](https://forum.theotown.com/viewtopic.php?t=10834)
</sub>
