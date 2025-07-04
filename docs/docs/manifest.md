# 插件清单(Plugin manifest)

清单文件`plugin.manifest`在1.8.15版本中引入，用于支持在线模式下使用本地插件。

该文件必须放在插件的根目录下，且必须命名为`plugin.manifest`才能被游戏识别。

如果你想创建加密的`.ttplugin`文件并使用特权功能，这个文件是必需的。

## 最小示例

一个清单文件的示例如下：

**plugin.manifest:**
```json
{
  "id": "$justanyone_dsa_manifest00",
  "version": 42,
  "title": "DSA Integration",
  "text": "This integration adds better supply systems, few new service cars, a new road which is faster and cheaper, a new disaster, DSA flags, new buildings, a lot of events, a space dimension to explore, new methods to earn money and much more.",
  "author": "JustAnyone",
  "thumbnail": "iap.png"
}
```

`iap.png`是与清单文件一起包含的图片。

## 属性

清单文件支持以下属性：

### id
::: type: string
::: required: true

唯一标识插件的字符串ID。

### version
::: type: integer

指定插件版本的正整数。

### title
::: type: string
::: required: true

插件的标题。

### text
::: type: string

插件的描述文本。

### author
::: type: string

插件作者的名字。

### thumbnail
::: type: string

插件缩略图的路径。

### url
::: type: string
::: version-added: 1.8.16

指向插件下载地址的URL。

### min version
::: type: integer

指定插件运行所需的最低游戏版本。

### permanent
::: type: boolean
::: default: false

是否将插件视为本地插件。

### multiplayer
::: type: boolean
::: default: true
::: version-added: 1.8.33

插件是否可以在在线模式中使用。

### once
::: type: boolean
::: default: false

插件清单是否只应加载一次。

这意味着如果遇到相同ID的其他清单，游戏将忽略加载它而不是报错。

### platforms
::: type: string[]

插件可以运行的平台数组。通常这应该只用于Lua或着色器插件，因为常规插件应该兼容所有平台。

内部使用libgdx提供的`ApplicationType`枚举确定平台。

支持的值: `android`, `desktop`, `ios`.

#### 示例

在这个示例中，我们将插件限制在iOS和PC平台:

```json
{
    "id": "$my_amazing_plugin_manifest00",
    "title": "My amazing plugin",
    "platforms": ["desktop", "ios"]
}
```

### category
::: type: boolean
::: default: true
::: version-added: 1.11.72

插件是否应该显示在插件分类中。
