# 更完善的着色、阴影和细节视觉指南

!!! info
    这是关于着色、阴影、深度和噪点的更新版视觉指南。
    要查看旧版本，请点击[这里](https://forum.theotown.com/viewtopic.php?t=13798)。

本视觉指南以直观方式涵盖了
^^着色、阴影、深度(窗户、女儿墙)、噪点、屋顶和环境遮挡^^等内容。
虽然指南包含一些文字说明，但您通过查看图片应该就能理解大部分内容。
本教程底部提供了指南的汇总版本(单张图片，无文字)。


## 第一部分：着色

TheoTown中的光线来自^^左侧^^。这意味着左侧会更亮，而右侧会更暗。

![](../../assets/guides/better-shading-guide/image1.png)

制作建筑时必须应用这一规则。为墙壁添加轮廓线会降低插件质量。

![](../../assets/guides/better-shading-guide/image2.png)

然而，质量最重要的因素之一是您对^^对比度^^的实现。
通常，可以通过使较暗(降低明度V)的颜色更亮
(增加饱和度S)并接近
<span style="color:#0000FF">蓝色</span>(<span style="color:#0000FF">#0000FF; 色相H=240</span>，
为什么深色更接近蓝色将在第二部分解释)来获得更高的对比度。

![](../../assets/guides/better-shading-guide/image3.png)

通过调整HSV值，可以获得更高的对比度，使建筑看起来不那么单调。

![](../../assets/guides/better-shading-guide/image4.png)

应用HSV规则后，我们的建筑现在看起来是这样的。

![](../../assets/guides/better-shading-guide/image5.png)

## 第二部分：阴影

如第一部分所述，光线来自左侧。因此，所有阴影都将向^^右侧^^对角线延伸。

![](../../assets/guides/better-shading-guide/image6.png)

阴影长度通常等于从建筑顶部到底部绘制45度线。

![](../../assets/guides/better-shading-guide/image7.png)

需要注意的是阴影也会影响墙壁。但重要的是不要使它们过长。

![](../../assets/guides/better-shading-guide/image8.png)

另一个重要事项：阴影略带蓝色，这就是为什么较暗区域(见第一部分HSV)颜色更接近蓝色。

![](../../assets/guides/better-shading-guide/image9.png)

最后一点：阴影逐渐淡出比突然消失看起来更好。这是我们现在建筑的样子。

![](../../assets/guides/better-shading-guide/image10.png)

## 第三部分：窗户和深度

添加窗户时，建议添加窗台，这能为建筑创造更多深度感，使其看起来更好。

![](../../assets/guides/better-shading-guide/image11.png)

应避免使用亮蓝色窗户。建议使用更暗的窗户颜色，纯黑色(#000000)也可以接受。

![](../../assets/guides/better-shading-guide/image12.png)

制作窗台时，垂直面可以使用另一侧的颜色，而水平面可以使用平屋顶的颜色。务必注意阴影。这是(左侧)我们现在建筑的样子。

![](../../assets/guides/better-shading-guide/image13.png)

额外提示：如果想保持屋顶平坦，可以添加**女儿墙**使建筑更真实。注意阴影。

![](../../assets/guides/better-shading-guide/image14.png)

## 第四部分：噪点

为建筑添加噪点可以产生质感，缓解建筑看起来过于平面和塑料感的问题。噪点可以通过使随机像素变亮或变暗来实现。

可以使用工具添加噪点。但注意不要过度使用。

![](../../assets/guides/better-shading-guide/image15.png)

也可以手动添加噪点，比如我通过以"裂纹"形式使像素变暗。手动创建噪点的优势在于可以更好地控制使用的算法和想要表现的纹理。但这样做速度较慢且需要更多精力。这是我们建筑现在的样子。

![](../../assets/guides/better-shading-guide/image16.png)

## 第五部分：屋顶

屋顶有各种形状和大小，但您最可能使用以下几种屋顶形状之一。数字表示每个水平像素应该提升多少像素(垂直方向上绘制更高)。如第三部分所述，完全平坦的屋顶也是一种选择；这种情况下建议添加女儿墙。

![](../../assets/guides/better-shading-guide/image17.png)

将1/2屋顶应用到建筑上得到：

![](../../assets/guides/better-shading-guide/image18.png)

为屋顶添加阴影和噪点后，这是我们建筑现在的样子。

![](../../assets/guides/better-shading-guide/image19.png)

## 第六部分：环境遮挡

环境遮挡有助于使墙壁更加突出。通过在角落和边缘添加深色透明像素(我使用与阴影相同的颜色)来实现。

![](../../assets/guides/better-shading-guide/image20.png)

添加环境遮挡后，这是我们最终建筑的样子。

![](../../assets/guides/better-shading-guide/image21.png)

## 总结

将所有这些技巧应用到您的插件中，可以使它们看起来更加美观，如果您选择了更好的颜色，还能提高插件上传到插件商店时获得批准的几率。请注意，您应该先完成建筑结构，然后再添加噪点、环境遮挡和阴影。

![](../../assets/guides/better-shading-guide/dbasics.png)

<sub>
本页面改编自
TheoTown官方论坛的
[这个主题](https://forum.theotown.com/viewtopic.php?t=25943)
</sub>
