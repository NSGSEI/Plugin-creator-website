# 编写示例插件

要开始为TheoTown制作插件，我们首先需要了解几个方面。

!!! danger "版权声明(首次发布插件前请阅读)"
    版权是非常严肃的事情。请遵守版权规则，否则将受到惩罚！

    [官方论坛关于版权的文章](https://forum.theotown.com/viewtopic.php?t=4144)。

## 1. 目录结构
首先，插件存储在设备上可访问的目录中。具体位置取决于您使用的平台：

* **Android**设备上位于`Android/data/info.flowersoft.theotown.theotown/files`。从设备本身可能无法直接访问该位置。但是，当使用Android文件应用时，TheoTown应该会显示为某种虚拟文件存储(其他应用也可以调用该应用来选择输入或输出文件)。或者，您可以使用游戏内置的文件浏览器，在区域视图时可以从游戏菜单中访问。
* **iOS**设备上可以通过文件应用访问文件，或者当设备连接到Mac时，在Finder中的设备存储位置访问。
* **PC**上文件存储在`C:/Users/您的用户名/TheoTown`(Windows)或`~/TheoTown`(MacOS和Linux)。

开发时，每个插件必须放在自己的目录中。以我们的示例插件为例，假设目录名为**sample**。启动时，TheoTown会在这些目录中搜索要加载的***.json**文件。此类文件的图形必须位于同一目录中。

您可以在此处查看更多关于插件加载顺序的深入概述[这里](../reference/technical/loading-order.md)。

## 2. JSON文件
JSON文件用于描述TheoTown中的建筑。也就是说，它们(类似于XML文件)是一种可读的格式，用于存储结构化信息。
[更多关于JSON的信息可以在这里找到](https://en.wikipedia.org/wiki/JSON)。
我们决定使用JSON是因为它非常简单且易于阅读。这样的JSON文件可能如下所示：
```json
[{
  "id": "$sample.plugin.unique.id.res00",
  "type": "residential",
  "author": "Lobby & theotheoderich",
  "width": 1,
  "height": 1,
  "frames": [{"bmp": "sample_bmp.png"}],
  "smoke": [{"id": "$smoke07", "x": 15, "y": -17}],
  "level": 1
}]
```
插件中的每个JSON文件(我们称之为*sample_dsc.json*)可能包含多个建筑描述，因此文件以**[**开头并以**]**结尾，表示这是一个列表(在本例中是建筑对象的列表)。永远不要忘记这些括号，因为没有它们插件可能无法加载！

说到对象，列表包含多个对象，每个对象以**{**开头并以**}**结尾。多个对象必须用逗号分隔。

一个对象由多个`"key": "value"`对组成，用于定义对象的属性。逐步说明：

* **id** - 每个对象必须有一个唯一的id来标识它。因此您应该添加一些关于插件的特定信息，以确保其他人永远不会使用这个id。之后避免更改id，因为它用于标识已保存城市中的建筑。具有未知id的建筑无法加载。
* **type** - 指定插件的类型。查看[高级主题](https://www.theotown.com/forum/viewtopic.php?f=41&t=1355)获取更多类型。我们将具有类型的对象称为_drafts_。
* **author** - 在这里声明您作为插件作者的名称。
* **width** - 建筑基础的瓦片宽度。每个瓦片的像素大小为32x16。
* **height** - 必须与**width**相同。因此，只能创建方形建筑。
* **frames** - 这是我们定义中最重要的部分。与建筑相关联的帧(图形)。由于此属性需要一个帧列表(数组)，我们必须以**[**开头并以**]**结尾。在其中，我们可以使用属性**bmp**定义一个帧对象，它引用同一目录中的图像文件。这里是文件*sample_bmp.png*。提供多个帧的选项可用于动画或不同的建筑变体。
* **smoke** - 如果需要，您可以使用此属性定义建筑上的烟雾点列表。一些烟雾类型如**$smoke07**已经由TheoTown定义并可以重复使用。
查看[已定义的烟雾类型列表](https://forum.theotown.com/viewtopic.php?p=6653#6653)获取更多信息。
请注意，点的位置相对于建筑的绘制枢轴点(基础的左角)。
* **level** - 在这里您可以设置建筑的等级，对于T(贫穷)必须是**1**，TT(中等)是**2**，TTT(富裕)是**3**。

每个属性必须用逗号分隔。字符串值(如属性名称或字符串值)必须用**"**引号**"**括起来。
在此示例中，只有**smoke**属性是可选的[^1]。

[^1]: 这并不完全正确，因为游戏为`author`和`level`属性提供了默认值，但建议明确设置这些值。

为了便利，其他属性如建造时间、居民数量等会自动推断。因此示例建筑会立即工作(重启游戏后)并且可以在沙盒模式中手动建造。


## 3. 图形
在包含自己的建筑时，更困难的部分是创建建筑本身。您必须记住，我们的瓦片大小为32x16像素，因此一个2x2大小的建筑(必须是正方形)至少需要64x32像素的图形大小(实际使用此宽度很重要，这样TheoTown可以计算基础左角的枢轴点，用于绘制建筑)。
更多细节，请查看[theo的逐步指南](https://forum.theotown.com/viewtopic.php?p=5712#5712)。

<!--
这里是一个如何测量给定示例烟雾坐标的图示：

TODO: 图片已丢失
![image](images/...)

红色像素是我们建筑的枢轴点，而蓝色像素是我们想要放置烟雾的位置。

-->

在我们的示例中，我们使用这个大小为32x25像素的图形，名为*sample_bmp.png*: 

<figure markdown="block">
![示例插件](../images/sample-plugin.png){: style="width:256x;height:240px;image-rendering:crisp-edges;"}
</figure>

这里有一些不同大小的基础模板供您使用：

<!-- 不要将这些表格化，否则会破坏布局 -->
<div class="grid cards" markdown="block">
<figure markdown="block">
![1x1模板](../images/1x1_template.png){: style="width:256px;height:128px;image-rendering:crisp-edges;"}
<figcaption>1x1模板</figcaption>
</figure>

<figure markdown="block">
![2x2模板](../images/2x2_template.png){: style="width:256px;height:128px;image-rendering:crisp-edges;"}
<figcaption>2x2模板</figcaption>
</figure>

<figure markdown="block">
![3x3模板](../images/3x3_template.png){: style="width:256px;height:128px;image-rendering:crisp-edges;"}
<figcaption>3x3模板</figcaption>
</figure>

<figure markdown="block">
![4x4模板](../images/4x4_template.png){: style="width:256px;height:128px;image-rendering:crisp-edges;"}
<figcaption>4x4模板</figcaption>
</figure>
</div>

[这里](https://forum.theotown.com/viewtopic.php?f=41&t=3207)我们有一个基础模板列表，包含更大的尺寸。

**请仅为您的TheoTown插件使用自己创建的建筑！**

## 4. 插件清单
我们创建的插件将会工作，并且会有一个新的住宅建筑，但是玩家将无法通过UI界面管理插件，也无法在在线模式下工作。

为此，我们需要创建一个插件清单文件。该文件遵循我们上面使用的相同JSON格式，但这次它以对象开头，而不是对象数组：

```json title="plugin.manifest"
{
  "id": "5a06a291-980f-406e-9b77-b72814331e36",  // 插件的唯一ID，使用https://www.uuidgenerator.net/生成
  "version": 3,                                  // 数字版本号
  "title": "Sample plugin",                      // 插件的标题
  "text": "Just an example for a plugin.",       // 插件的描述(可选)
  "author": "Theo&Lobby",                        // 插件的作者
  "thumbnail": "sample_bmp.png",                 // 缩略图文件(可选)
  "category": false,                             // 指定是否为插件显示一个类别(可选)
  "url": "https://forum.theotown.com/viewtopic.php?p=5604#5604", // 获取插件的URL(可选)
  "once": true                                   // 是否忽略此插件的其他出现
}
```

它必须包含在我们**sample**插件目录的根目录中，并且必须命名为plugin.manifest才能被游戏识别。

虽然游戏在没有清单文件的情况下加载我们的插件，但这在未来可能不再适用。因此我们建议始终包含一个清单文件。

有关更多插件清单文件属性，请查看[这里](../manifest.md)。

## 5. 限制
JSON只是一种描述语言。因此不可能*编程*自己的建筑。功能由TheoTown本身添加，并取决于设置的属性。如果您有关于应该通过插件提供的新功能的好主意，请告诉我们。
但是，您可以通过使用[FUN](https://forum.theotown.com/viewtopic.php?f=81&t=4301)在JSON中添加某种功能。
对于更复杂的行为，您可以在插件中[包含Lua脚本](https://forum.theotown.com/viewtopic.php?f=115&t=9295)。

也许您现在想创建数百个自己的建筑，并从互联网下载大量建筑。然而，插件的空间不是无限的，因此您应该尽量避免无缘无故地创建巨大的建筑。特别是当涉及到大的透明部分时，通常可以优化掉它们。

说到巨型建筑，如果可能的话尽量避免。如果不可避免，请记住最大建筑尺寸为8x8，最大建筑高度为256像素。

## 6. 调试
目前，TheoTown不提供任何调试机制，因此如果某些功能不起作用，您可能需要进行一些测试来找到错误。很可能是JSON文件中的语法问题，所以[您可以先检查这一点](https://jsonlint.com/)。如果没有语法错误，可能是图像名称中有拼写错误。

如果插件出现问题，TheoTown会在启动后显示插件错误，其中包含有关问题的更多信息。
文本也会写入插件目录中的error.log文件以供参考。它应该能给您提示出了什么问题。
如果没有，您可以在[官方论坛](https://forum.theotown.com/viewforum.php?f=42)上发布您的问题。

<sub>本页面改编自TheoTown官方论坛。</sub>
