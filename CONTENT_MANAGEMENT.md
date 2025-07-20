# 网站内容统一管理系统

## 概述

这个系统允许你通过一个统一的配置文件来管理整个网站的所有文本内容，无需手动修改多个文件。

## 文件结构

```
_data/
├── site-content.yml          # 主配置文件（所有文本内容）
├── backups/                  # 配置备份目录
├── navigation.yml            # 导航菜单（自动生成）
├── authors.yml              # 作者信息（自动生成）
└── ui-text.yml              # UI文本（原有文件）

_plugins/
└── site_content.rb          # Jekyll插件（自动处理配置）

scripts/
└── manage-content.rb        # 内容管理脚本

_includes/
└── site-content-example.html # 使用示例模板
```

## 快速开始

### 1. 编辑配置文件

直接编辑 `_data/site-content.yml` 文件：

```yaml
# 基本信息
site_info:
  title: "你的网站标题"
  subtitle: "网站副标题"
  description: "网站描述"

# 作者信息
author:
  name: "你的姓名"
  bio: "个人简介"
  location: "位置"
  email: "邮箱"

# 导航菜单
navigation:
  main:
    - title: "首页"
      url: "/"
    - title: "关于"
      url: "/about/"
```

### 2. 使用管理脚本

运行交互式管理脚本：

```bash
ruby scripts/manage-content.rb
```

这个脚本提供以下功能：
- 编辑基本信息
- 编辑作者信息
- 编辑导航菜单
- 编辑界面文本
- 编辑社交媒体链接
- 备份/恢复配置
- 预览当前配置
- 重新构建网站

### 3. 在模板中使用

#### 方法一：直接访问配置

```liquid
{% assign site_title = site.site_content.site_info.title %}
{% assign author_name = site.site_content.author.name %}

<h1>{{ site_title }}</h1>
<p>作者：{{ author_name }}</p>
```

#### 方法二：使用过滤器

```liquid
<h1>{{ 'site_info.title' | get_site_content }}</h1>
<p>{{ 'common' | get_ui_text: 'more' }}</p>
```

## 配置项说明

### 基本信息 (site_info)
- `title`: 网站标题
- `subtitle`: 网站副标题
- `description`: 网站描述
- `url`: 网站URL
- `baseurl`: 网站基础路径

### 作者信息 (author)
- `name`: 作者姓名
- `pronouns`: 代词
- `bio`: 个人简介
- `location`: 位置
- `employer`: 雇主/机构
- `uri`: 个人网站
- `email`: 邮箱
- `avatar`: 头像文件名

### 导航菜单 (navigation)
```yaml
navigation:
  main:
    - title: "菜单标题"
      url: "/链接地址/"
```

### 界面文本 (ui_text)
按类别组织的所有UI文本：
- `common`: 通用文本
- `navigation`: 导航文本
- `content`: 内容标签
- `comments`: 评论系统
- `forms`: 表单标签
- `sharing`: 分享文本
- `related`: 相关文章
- `footer`: 页脚文本

### 社交媒体链接 (social_links)
```yaml
social_links:
  github: "用户名"
  linkedin: "用户名"
  twitter: "用户名"
```

### 学术链接 (academic_links)
```yaml
academic_links:
  arxiv: "链接"
  googlescholar: "链接"
  orcid: "链接"
```

## 高级功能

### 1. 自动备份

系统会自动创建配置备份：
- 位置：`_data/backups/`
- 格式：`site-content-YYYYMMDD_HHMMSS.yml`

### 2. 插件功能

Jekyll插件会自动：
- 读取 `site-content.yml` 配置
- 更新 `_config.yml` 中的相关设置
- 生成 `navigation.yml` 和 `authors.yml`
- 提供Liquid过滤器

### 3. 多语言支持

可以为不同语言创建配置：

```yaml
# 英文配置
en:
  site_info:
    title: "English Title"
    
# 中文配置
zh:
  site_info:
    title: "中文标题"
```

## 最佳实践

### 1. 备份策略
- 修改前先备份：`ruby scripts/manage-content.rb` → 选择6
- 定期备份重要配置
- 使用版本控制管理配置变更

### 2. 内容组织
- 按功能分类组织文本
- 使用描述性的键名
- 保持配置结构的一致性

### 3. 模板使用
- 优先使用过滤器方法（更简洁）
- 为复杂内容使用直接访问方法
- 添加适当的错误处理

## 故障排除

### 常见问题

1. **配置不生效**
   - 检查 `_plugins/site_content.rb` 是否存在
   - 确认YAML语法正确
   - 重新启动Jekyll服务器

2. **插件错误**
   - 检查Ruby语法
   - 确认文件权限正确
   - 查看Jekyll错误日志

3. **备份恢复失败**
   - 检查备份文件格式
   - 确认文件路径正确
   - 验证YAML语法

### 调试技巧

1. **启用调试模式**
   ```bash
   bundle exec jekyll serve --verbose
   ```

2. **检查配置加载**
   - 查看控制台输出的插件信息
   - 确认配置文件被正确读取

3. **验证模板语法**
   - 使用Jekyll的语法检查
   - 测试Liquid过滤器

## 扩展功能

### 1. 自定义过滤器

可以添加更多Liquid过滤器：

```ruby
def get_nested_content(path)
  keys = path.split('.')
  @context.registers[:site].config['site_content'].dig(*keys)
end
```

### 2. 多环境配置

为不同环境创建配置：

```yaml
# 开发环境
development:
  site_info:
    url: "http://localhost:4000"

# 生产环境
production:
  site_info:
    url: "https://yourdomain.com"
```

### 3. 内容验证

添加内容验证功能：

```ruby
def validate_content(content)
  required_fields = ['site_info', 'author', 'navigation']
  required_fields.each do |field|
    unless content[field]
      raise "Missing required field: #{field}"
    end
  end
end
```

## 总结

这个统一配置系统提供了：

✅ **集中管理**：所有文本内容在一个文件中
✅ **易于维护**：无需修改多个文件
✅ **交互式编辑**：提供友好的管理界面
✅ **自动备份**：防止配置丢失
✅ **模板支持**：多种方式在模板中使用
✅ **扩展性强**：支持自定义功能

通过这个系统，你可以轻松管理整个网站的内容，大大提高了维护效率！ 