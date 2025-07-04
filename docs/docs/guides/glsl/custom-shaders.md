# 自定义着色器

什么是着色器？在插件中我们可以用它们做什么？本指南将为您提供一些见解。
讨论可以使用[这个主题](https://forum.theotown.com/viewtopic.php?f=42&t=16849)。

由于主题的复杂性，我将逐步完善各个部分。
现在我很高兴能提供一些您可以尝试的内容。要充分利用着色器插件，需要更多关于GLSL着色语言、UV坐标、其他uniform变量等的知识。插件商店中的插件创建工具也包含一些可用于测试的着色器。

## 1. 概述
在开始介绍如何编写着色器插件之前，我想先说明以下几点：编写着色器很难。特别是当您需要编写兼容不同平台、驱动程序和操作系统的着色器代码，同时还要保证性能时。用于编写着色器的OpenGL着色语言(GLSL)对语法错误毫不宽容，在出现问题时也不提供易于使用的调试工具。错误信息有时可能很晦涩。

话虽如此，让我们开始深入了解。

什么是着色器？在渲染游戏时，我们实际上是告诉GPU绘制大量(带纹理的)三角形。这也适用于像TheoTown这样的像素游戏，因为这就是GPU优化的方向。您可能会问："这些三角形在哪里？我只看到像素。"实际上，为了绘制带纹理的矩形，游戏会绘制两个相邻的三角形，即所谓的四边形。在这种情况下，带纹理的矩形只是一个可能包含透明度的矩形图像。
 
![](../../assets/guides/custom-shaders/image1.png)

在GPU硬件的早期，绘制(带纹理的)三角形的功能是硬编码在硬件中的，这导致了所谓的固定功能管线。然而，人们注意到这种方法相当有限，因为它不允许实现没有集成到芯片中的"things"(如特效)。因此，诞生了一个更通用的方法：可编程渲染管线。在这种方法中，渲染管线的特定步骤可以由用户提供的小程序(称为着色器)来处理。这些着色器将直接在GPU上执行，并可以利用GPU高度并行的架构。

So, in the specific case of TheoTown, what part of rendering is programmable?

* Vertex shader

    The vertex shader maps vertex points (here these are the points of the triangles, see v0, …, v3 in the image above) to the target position on the screen. It can furthermore pass attributes like texture coordinates and colors to the fragment shader that will be interpolated for the screen pixels (fragments) automatically.

* Fragment shader

    The fragment shader will be executed for each screen pixel (fragment) that a triangle covers. Its task is to determine the target color of that pixel e.g., by looking into a texture. Transparency in the resulting color will be blended with the existing color of the fragment.

So far, the explanations are quite abstract so let's make it a bit more concrete by having a look into the default shaders that do not modify the graphics in any way.

Vertex shader:
```glsl
// Attributes is the data that is associated to each vertex that will be process by the vertex shader
attribute vec2 vVertex;
attribute vec4 vColor;
attribute highp vec2 vTexCoord;

// Uniforms are general (environment) values provided by the runtime
uniform vec2 viewport;
uniform vec2 offset;

// Varyings are the outgoing values for each processed vertex
varying highp vec2 texCoord;
varying lowp vec4 vertexColor;

// The main function does the processing of attributs + uniforms to varyings + gl_Position
void main() {
	texCoord = vTexCoord;
	vertexColor = vColor;
	gl_Position = vec4((vVertex.x + offset.x) * viewport.x - 1.0,
	                   (vVertex.y + offset.y) * viewport.y + 1.0, 0.0, 1.0);
}
```

Fragment shader:
```glsl
precision lowp float;
// ^ On some platforms we have to tell the GPU what precision to use for floating point operations for the fragment shader
// Don't modify this line and don't write something before it as the game has to remove it for some platforms

// Uniforms are runtime provided values, here the world texture that contains all graphics as well as the saturation setting
uniform sampler2D texture;
uniform float saturation;

// Varyings should match the varyings of the vertex shader. Here these are used as input values.
varying highp vec2 texCoord;
varying lowp vec4 vertexColor;

// The main function does the target color calculation and stores it in gl_FragColor
void main() {
	vec4 col = texture2D(texture, texCoord);
	col *= vertexColor;

	float light = (col.x + col.y + col.z) * 0.333333;
	col = vec4(saturation * (col.xyz - vec3(light)) + vec3(light), col.a);

	gl_FragColor = col;
}
```

The json get these shades into the game looks like the following (the file names of the shader code files don't matter):
```json
[{
    "id":"$shader_myownshader00",
    "type":"shader",
    "title":"Test shader",
    "vertex":"vertex.src",
    "fragment":"fragment.src"
}]
```

After (re-)starting the game there should now be a "Test shader" option available in Settings->Graphics->Shader. After selecting it the game should look and run like before. After all, we just re-defined the default shader.

Here you'll find the shader to use as a template:</br>
[:material-file-download: sample_shader.zip](../../assets/guides/custom-shaders/sample_shader.zip)


Due to the complexity of the topic I will write follow-up tutorials about shaders as I find time to. For now I am happy to finally preset _something_ you can play with. To fully take advantage of shader plugins more knowledge about the GLSL shader language, UV-Coordinates, other uniform variables etc. will be required. The Plugin Creator Tools in the plugin store also contains some shaders that can be used for testing purposes.

## 2. General Concepts

To understand GLSl shader code we have to have a closer look into some conceptional features of the language first.

### main() function
Both, vertex and fragment shaders have to define a main() function that will be called by the GPU on a per vertex / per fragment basis respectively. In both cases the functions have to "output" data by writing to gl_Position / gl_FragColor native variables.

### uniforms
Uniform variables are variables that are provided by the outer program (TheoTown in this case). They have to be defined in the shader code in order to be used. The game will identify and fill them by name. They can be accessed in both, vertex and fragment shaders. A list of available uniform variables will be provided later.

### attributes
Attributes are values that are provided per vertex. These will be filled in by the game and must match the expected names. The most common vertex attributes are vertex position (2D in case of TheoTown), color and texture coordinates.

### varyings
Vertex shader can output data that can then later be used in the fragment shader. For that, both codes must define the same varying variables. The vertex shader can then write values into them (per vertex). The fragment shader will later be called for every fragment. Since fragments are usually "in between" vertices the varying data that is presented to each fragment gets interpolated between the given values of the corresponding vertices. Common varying variables are texture coordinates and color.

### Numbers
You write numbers just like this:
```glsl
float x = 42.0;
```
You **have** to write floating point numbers or numbers that are used in a floating point context with the dot notion. Failing to do so will make your shader incompatible with some hardware.

### Vector data types
GLSL makes it easy to do vector arithmetic by providing vector datatypes called vec2, vec3, ... These can be constructed in code like that:

```glsl
vec3 color = vec3(1.0, 0.0, 0.0); // This would be red
```

Given two vec3s a and b we can do simple math with them:
```glsl
vec3 c = a + b; // Same as vec3 c = vec3(a.x + b.x, a.y + b.y, a.z + b.z)
```

### Colors
In GLSL colors are usually represented as vec3 or vec4 (order: r,g,b; vec4 featuers a transparency value a) whose entriey range from 0.0 to 1.0.

### Premultiplied Alpha
Normally, given a background color background and a foreground color foreground with transparency alpha the formula to blend them looks like this:
```glsl
blended_color = (1 - alpha) * background + alpha * foreground
```
However, since foreground and alpha are usually sampled from a texture we can "premultiply" the colors in the texture to save the alpha * foreground multiplication during runtime. In this case, the formula looks like this:
```glsl
blended_color = (1 - alpha) * background + premultiplied_foreground
```
In TheoTown all textures are premultiplied which means that your fragment shader will have to output premultiplied colors, too.

### Precision modifiers
In the given code you will see keywords like highp and lowp. These are precision hints for the GPU on what precision to use for these datatypes and computations with them. highp can be slower but is needed for example for texture coordinates on the world texture to avoid artifacts. However, these hints are not guaranteed to have any effect at all. Furthermore, they are not even supported on all platforms and may therefore removed from your code by the game.
For compatibility reasons your fragment shader code **must** begin with this line:
```glsl
precision lowp float;
```

### Built-in functions
GLSL has some standard built-in functions. </br>
Trigonometry: sin, cos, tan, asin, acos, atan </br>
General: pow, log2, sqrt, abs, max, min </br>
Geometrical (work on vector datatypes): length, distance, normalize, reflect

## 3. 默认顶点着色器的工作原理详解

虽然上面展示的默认着色器代码在视觉效果上"什么都没做"，但它仍然包含大量必要的代码来确保功能正常。为了更好地理解它的工作原理，让我们深入分析代码的各个部分。

![](../../assets/guides/custom-shaders/image2.png)

顶点着色器负责将顶点位置(将要绘制的三角形/四边形的顶点)映射到视口位置。这一步通常是必要的，因为我们的顶点位置使用的坐标系与表示屏幕位置的坐标系不同(简单例子：在3D世界中，我们会将3D顶点映射到屏幕上的2D位置)。在TheoTown中，顶点只是2D点，映射可以表示为应用偏移和缩放因子的组合。这些作为所谓的uniform变量由运行时提供(它会通过名称来填充):

```glsl
uniform vec2 viewport;
uniform vec2 offset;
```

位置并不是顶点唯一的属性。其他属性包括颜色(可用于为四边形着色)和纹理坐标(用于绘制"图像")。我们必须定义它们以便运行时可以提供这些值(命名很重要):

```glsl
attribute vec2 vVertex;
attribute vec4 vColor;
attribute highp vec2 vTexCoord;
```

为了后续使用这些属性，顶点着色器需要声明占位符来"导出"它们，这就是以下代码的作用:

```glsl
varying highp vec2 texCoord;
varying lowp vec4 vertexColor;
```

映射逻辑和导出(varying)变量的填充发生在main()函数中:

```glsl
void main() {
  texCoord = vTexCoord;
  vertexColor = vColor;
  gl_Position = vec4((vVertex.x + offset.x) * viewport.x - 1.0,
    (vVertex.y + offset.y) * viewport.y + 1.0, 0.0, 1.0);
}
```

这个函数会为每个顶点调用(届时属性值会自动填充)。它必须设置所有导出变量，并通过设置gl_Position来计算和输出顶点在视口中的位置。

## 4. How the default fragment shader works in detail

The default vertex shader presented above does calculate the coordinate transformation from pixel to viewport space. Additionally, it feeds some "varying" vertex data like texture coordinates and colors for the following shader stage: the fragment shader. The fragment shader is the shader code that will actually determine [b]what[/b] will be drawn (instead of [b]where[/b]). You can think of the fragment shader as a piece of code that will be called for all pixels ("fragments") that are part of a triangle.

![](../../assets/guides/custom-shaders/image3.png)

由于一些兼容性原因，片段着色器代码必须以一个precision语句开头，该语句声明默认应使用的浮点数精度。我建议直接保留这行代码不变：

```glsl
precision lowp float;
```

与顶点着色器类似，可以定义uniform变量(这些变量由环境提供，通常每帧/每个绘制单元保持不变)供后续在主函数中使用。这里我们定义了一个float类型的saturation值，它将包含游戏的色彩饱和度设置。此外，我们还定义了将包含"世界纹理"的texture，我们将从中采样像素颜色。世界纹理包含游戏中[i]所有[/i]图形。因此，只要知道纹理坐标，就可以绘制世界纹理中的每个"图像"。

```glsl
uniform sampler2D texture;
uniform float saturation;
```

要使用顶点着色器中定义的varying变量，我们必须在片段着色器中重新定义它们。数据类型和名称必须与顶点着色器中的定义匹配。由于varying变量最初只为顶点定义，而片段位于这些顶点之间，因此这些值将为每个片段进行插值。这对于纹理坐标尤其重要，这样绘制它们将导致从世界纹理中绘制完整的图像。
```glsl
varying highp vec2 texCoord;
varying lowp vec4 vertexColor;
```

与顶点着色器类似，片段着色器也有一个作为入口点的main()函数。它会被三角形的每个像素/片段调用，并通过写入_gl_FragColor_来输出颜色。计算过程需要完成以下步骤：

1. 从世界纹理中采样存储在varying变量texCoord指定位置的颜色
2. 应用存储在varying变量vertexColor中的颜色
3. 应用存储在uniform变量saturation中的饱和度值
4. 将最终颜色存储在gl_FragColor中

换句话说：
```glsl
void main() {
	vec4 col = texture2D(texture, texCoord);
	col *= vertexColor;

	float light = (col.x + col.y + col.z) * 0.333333;
	col = vec4(saturation * (col.xyz - vec3(light)) + vec3(light), col.a);

	gl_FragColor = col;
}
```

Blending with the existing color at the given pixel will be done automatically using premultiplied alpha blending as defined in the concepts overview.

## 5. Writing a more fancy shader

Here we basically want to see how a cartoon shader can be implemented. It works similar to the one that can be found in the Plugin Store.

![](../../assets/guides/custom-shaders/image4.png)

As you know TheoTown is a pixel graphics game and we don't want nor can modify graphics manually to look cartoonish. Here's where the shader comes into play: We can use it to get a cartoony look by applying an algorithm to the graphics in realtime during redendering.

Some ingredients for a cartoon shader:

* Edge detection to highlight edges - This is the most important thing for a cartoony look
* Smoothing - In most cases we want to smooth the non edge parts a bit
* Frame type detection - So we can apply the shader to specific _things_ (i.e. we don't want to apply it to UI or text)

All of these steps must be implemented in the fragment shader as we want to apply these to individual fragments / pixels. The following steps will build up from the default shader codes.

### 边缘检测
你可能听说过所谓的[Sobel算子](https://de.wikipedia.org/wiki/Sobel-Operator)，它可以基于图像中每个像素周围8个相邻像素的颜色来计算边缘。这是一种选择，但我们肯定不希望采样所有8个相邻像素，因为这样相当耗费资源(事实上，纹理查找可能是片段着色器中最耗费计算资源的操作，你应该尽可能减少它们)。相反，我们可以只使用左侧和上方的相邻像素颜色与中心像素进行比较。

代码实现可能如下所示：

```glsl
vec4 col = texture2D(texture, texCoord);
vec4 leftCol = texture2D(texture, texCoord + vec2(-dUnit, 0.0));
vec4 upCol = texture2D(texture, texCoord + vec2(0.0, -dUnit));
vec4 diff = abs(col - leftCol) + abs(col - upCol);
float edge = length(diff);
```

The dUnit variable is a uniform float value that contains the distance between two pixels in the world texture in UV-Coordinates. It's effectively 1 / size of the world texture. We can use it to calculate the locations of the neighbouring pixels for the lookups. When we visualize these edges it looks like this:

![](../../assets/guides/custom-shaders/image5.png)

As you can see this filter also detect edges in regions with noise like on the trees. Furthermore, since we only compare the center pixel to the left and upper neighbouring pixels, we cannot show edges to transparency on the right or bottom side of buildings (as these pixels will be transparent as well).

So we _may_ need to sample two more neighbors after all:
```glsl
vec4 center = texture2D(texture, texCoord);
vec4 leftCol = texture2D(texture, texCoord + vec2(-dUnit, 0.0));
vec4 upCol = texture2D(texture, texCoord + vec2(0.0, -dUnit));
vec4 rightCol = texture2D(texture, texCoord + vec2(dUnit, 0.0));
vec4 downCol = texture2D(texture, texCoord + vec2(0.0, dUnit));

vec4 diff = abs(rightCol - leftCol) + abs(downCol - upCol);
diff.a *= 2.0;
float edge = pow(0.4 * length(diff), 2.0);
```

Here I also did some math on the edge value for better results. I consider this quite usable:

![](../../assets/guides/custom-shaders/image6.png)

Let's slab that edge onto the pixel color using:

```
glsl
vec4 col = vec4(center.rgb - vec3(edge * center.a), center.a);
```

and watch this beauty:

![](../../assets/guides/custom-shaders/image7.png)

You may notice that some edges like the ones on the ground are way too prominent. We'll fix this later.

### Smoothing
TheoTown uses a lot of _noise_ to convey details in its pixels. This is intended but does not fit with a cartoony look. The easiest way to get a smoothed pixel color is to take the average color of all 5 previously sampled pixels:

```glsl
vec4 col = 0.2 * (leftCol + upCol + rightCol + downCol + center);
```

This way we get this:

![](../../assets/guides/custom-shaders/image8.png)

There's definitely some smoothing involved here. However, look at these strange lines above the buildings. Since our shader does not care about frame boundaries (i.e. the boundaries of the drawn images) surrounding non transparent areas of the world texture can _bleed_ in.

So how do we fix this? One approach is to multiply the color of neighbouring pixels by the center alpha value and to ensure that the center alpha will also be the overall resulting transparency of the fragment:

```glsl
vec4 col = ((leftCol + upCol + rightCol + downCol) * center.a + 2.0 * center) / 6.0;
col = vec4(col.rgb * center.a, center.a);
```

So now we have some nice smoothing without strange lines:

![](../../assets/guides/custom-shaders/image9.png)

Now the edges to transparency are especially pronounced. This would even be the case if we'd set the edge value to 0.0. The reason for this is pre-multiplied alpha which we have to consider to smooth somewhat correctly. Although not especially important in this context, as we want to draw edges anyway, a more correct code looks like this:

```glsl
col = ((leftCol + upCol + rightCol + downCol) + 2.0 * center) / (2.0 * center.a + leftCol.a + upCol.a + rightCol.a + downCol.a);
col = vec4(col.rgb * center.a, center.a);
```

### Frame type detection

It's time to fix the way too prominent lines on the ground. Not only that, look what the shader in its current form does to our UI.

![](../../assets/guides/custom-shaders/image10.png)

A bit of a background story: Normally, games are rendered using multiple shaders for different parts of the game. As switching between shaders is usually expensive a depth (or z-)buffer is used to be able to draw things out of order without sorting issues. However, for simplicity only one shader is used in TheoTown to draw everything. Furthermore, there's no depth buffer as it's not needed when being able to just "draw things from back to front". As a result. our shader will not only be used for rendering the city but also for rendering UI, text, overlays etc. This is sufficient for the game's built-in shaders, but as shown above we need a way to detect which type of frame we are rendering right now.

For that, we can ask the game to provide us with a frame type identifier that will be associated with each vertex (so it's a vertex attribute). In the vertex shader we have to define it as:

```glsl
attribute float vType;
```

To tell the fragment shader the frame type we have to introduce a varying variable that we fill with the content of vType in the vertex shader's main function:

```glsl
...
varying lowp float type;
...
void main() {
  ...
  type = vType;
}
```

The vType attribute will contain the same integer value for all vertices of a quad. We still have to use the float datatype for it for compatibility reasons.

The next step is to "receive" the frame type in the fragment shader. For that we have to define the same varying variable in the fragment shader:

```glsl
varying lowp float type;
```

Now as we have the type variable we can start using it in the main function of the fragment shader. We don't want to apply the cartoony look to UI, text, weather, overlay and background frames. For that we can use a if condition and some built-in constants:
```glsl
vec4 center = texture2D(texture, texCoord);
vec4 col = center;

if (type != TYPE_UI
        && type != TYPE_TEXT
        && type != TYPE_WEATHER
        && type != TYPE_OVERLAY
        && type != TYPE_GROUND_BACKGROUND) {
    vec4 leftCol = texture2D(texture, texCoord + vec2(-dUnit, 0.0));
    vec4 upCol = texture2D(texture, texCoord + vec2(0.0, -dUnit));
    vec4 rightCol = texture2D(texture, texCoord + vec2(dUnit, 0.0));
    vec4 downCol = texture2D(texture, texCoord + vec2(0.0, dUnit));

    vec4 diff = abs(rightCol - leftCol) + abs(downCol - upCol);
    diff.a *= 2.0;
    float edge = pow(0.4 * length(diff), 2.0);

    col = 0.2 * ((leftCol + upCol + rightCol + downCol) * center.a + center);
    col = vec4(col.rgb * center.a, center.a);
    col = vec4(col.rgb - vec3(edge * col.a), col.a);
}
...
```

This already fixes most issues:

![](../../assets/guides/custom-shaders/image11.png)

Let's tweak the edges dependent on frame type:
```glsl
if (type >= TYPE_GROUND_LAND && type <= TYPE_REGION_EDGE || type == TYPE_ROAD) {
	edge *= 0.01;
}
```
We can use <= and >= to check the frame type against ranges as they are guaranteed to be defined in the order they'll be listed in the next post. Some more tweaking and we get this:

![](../../assets/guides/custom-shaders/image12.png)

On a side-note: Branching (i.e. if conditions) in shader code should usually be avoided. In contrast to code running on a CPU all GPU threads within a thread pool share a program counter. This means that even if only a single thread will branch into some extra code, the execution time will behave as if all threads entered that code section. In the context of type dependent shader effects I don't think there's a viable alternative. Just so you know.

I'll call it a day from here. Feel free to tweak the shader yourself. I'd be glad to see your modifications
[here in the showcase](https://forum.theotown.com/viewforum.php?f=125) or in the store. </br>
[:material-file-download: tutorial_cartoon_shader.zip](../../assets/guides/custom-shaders/tutorial_cartoon_shader.zip)

## 6. Other useful uniforms and vertex attributes

### Uniforms
Uniforms are global values that can be provided by the environment. The following built-in uniform values can be used:


```glsl
uniform vec2 viewport;  // 视口大小(2,2)除以目标渲染分辨率
uniform vec2 offset;    // 像素屏幕空间中的渲染偏移量
uniform sampler2D texture;  // 用于采样颜色的纹理
uniform float saturation;   // 饱和度，0表示灰度，1表示正常
uniform float units;    // 已弃用：绑定到采样器的纹理数量；在最新版本中结果始终为1

uniform float unit;   // 纹理的像素大小；已弃用，因为它仅适用于方形纹理
uniform float dUnit;  // 1除以纹理的像素大小；可用于从纹理中以像素精度采样；已弃用，因为它仅适用于方形纹理
uniform vec2 unit2;   // 纹理的像素宽度和高度(1.11.27新增)
uniform vec2 dUnit2;  // 1除以纹理的像素宽度和高度；可用于从纹理中以像素精度采样(1.11.27新增)

uniform float time;       // 时间(秒)，始终为正，一段时间后会重置，可用于动画效果
uniform float cityScale;  // 当前绘制城市的缩放比例
uniform float cityTime;   // 依赖于城市速度的动画时间
```

You can define your own uniform values using the
[`Drawing.setUniform`](https://doc.theotown.com/modules/Drawing.html#setUniform)
function in Lua.



### Vertex attributes
These attributes describe the type of information that is available per vertex. The defined attributes in the vertex shader will be filled with the respective values automatically. You cannot access vertex attributes in the fragment shader directly but will have to use varyings to pass them from the vertex shader to the fragment shader as shown in the example above.

```glsl
attribute vec2 vVertex;    // Pixel screen space position of the vertex
attribute vec4 vColor;     // Color of the vertex using (r,g,b,a) format and normalized values
attribute highp vec2 vTexCoord;     // Tex coord of the vertex (u,v)
attribute float vType;     // Type of the frame that belongs to the vertex; will be the same for all vertices of a quad
attribute vec2 vQuadCoord; // The local coordinates of the vertex within the quad top left=(0,0), top right=(1,0), bottom left=(1,1), bottom right=(0,1)
```

### Constants

Constants are fixed values that will be injected into your shader code by the game before it gets compiled. Right now all constants are frame type related and can be used to detect the type of the currently drawn image / quad / triangle / fragment. Frame types are represented by integer float numbers that ascend in the order of this listing.

- TYPE_NULL
- TYPE_UI
- TYPE_TEXT
- TYPE_GROUND_LAND
- TYPE_GROUND_WATER
- TYPE_GROUND_BACKGROUND
- TYPE_GROUND_EDGE
- TYPE_REGION
- TYPE_REGION_EDGE
- TYPE_TOOL
- TYPE_ZONE
- TYPE_TREE
- TYPE_BUILDING
- TYPE_ROAD
- TYPE_ROAD_DECO
- TYPE_ROAD_OCCUPATION
- TYPE_BUS_STOP
- TYPE_WIRE
- TYPE_PIPE
- TYPE_RAIL
- TYPE_CAR
- TYPE_TRAIN
- TYPE_FLYING_OBJECT
- TYPE_PEDESTRIAN
- TYPE_WEATHER
- TYPE_OVERLAY
- TYPE_FENCE (new in 1.10.95)

## 7. 树木摇曳着色器示例

这是一个利用顶点属性vQuadCoord实现树木摇曳效果的着色器示例。

**vertex.src**顶点着色器代码:
```glsl
attribute vec2 vVertex;
attribute vec4 vColor;
attribute highp vec2 vTexCoord;
attribute float vType;
attribute vec2 vQuadCoord;

uniform vec2 viewport;
uniform vec2 offset;

uniform float cityTime;
uniform float cityScale;

varying highp vec2 texCoord;
varying lowp vec4 vertexColor;

void main() {
	vec2 myOffset = vec2(0.0);
	if (vType == TYPE_TREE && vQuadCoord.y == 0.0) {
		float pseudoRandom = vTexCoord.x * 1337.0 + vTexCoord.y * 2487.0;
		myOffset.x = 4.0 * cityScale * cos(cityTime + pseudoRandom);
	}

	texCoord = vTexCoord;
	vertexColor = vColor;
	gl_Position = vec4((vVertex + offset + myOffset) * viewport + vec2(-1.0, 1.0), 0.0, 1.0);
}
```

**fragment.src**:
```glsl
precision lowp float;

uniform sampler2D texture;
uniform float saturation;

varying highp vec2 texCoord;
varying lowp vec4 vertexColor;

void main() {
	vec4 col = texture2D(texture, texCoord);
	col *= vertexColor;

	float light = (col.x + col.y + col.z) * 0.333333;
	col = vec4(saturation * (col.xyz - vec3(light)) + vec3(light), col.a);

	gl_FragColor = col;
}
```

<sub>
本页面改编自TheoTown官方论坛的
[这个主题](https://forum.theotown.com/viewtopic.php?t=16838)
</sub>
