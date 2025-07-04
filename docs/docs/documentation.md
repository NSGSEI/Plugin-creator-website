# 编写文档

本文档包含编写文档页面的通用指南。

## 写作风格

写作风格应遵循以下要求：

- 文章应使用[**编辑性我们**](https://en.wikipedia.org/wiki/We#Editorial_we)的写作风格。

### 格式规范
- 文档内容应缩进4个空格。
- JSON内容应缩进2个空格，包括`key: value`对之间的空格。

### RCI规范
- RCI应展开为`Residential`(住宅)、`Commercial`(商业)和`Industrial`(工业)。
- 不同RCI等级应称为`poor`(贫穷)、`middle`(中等)和`rich`(富裕)阶级的居民或工人，在工业建筑或相关上下文中使用。


## 预处理器声明

本文档实现了自定义的预处理器声明。

### inherit-h<n>

```md
::: inherit-h<n> <header name> <file to inherit from> <flags>
```

包含从指定文件继承的标题的所有内容。
