# Jekyll插件：统一网站内容管理
# 这个插件会自动读取_data/site-content.yml文件并将其内容应用到整个网站

module Jekyll
  class SiteContentGenerator < Generator
    safe true
    priority :high

    def generate(site)
      # 读取site-content.yml文件
      content_file = File.join(site.source, '_data', 'site-content.yml')
      
      if File.exist?(content_file)
        site_content = YAML.load_file(content_file)
        
        # 将内容添加到site.config中，使其在整个网站中可用
        site.config['site_content'] = site_content
        
        # 更新_config.yml中的相关设置
        update_config_from_content(site, site_content)
        
        puts "✅ 网站内容配置已加载: #{content_file}"
      else
        puts "⚠️  警告: 未找到site-content.yml文件"
      end
    end

    private

    def update_config_from_content(site, content)
      # 更新基本站点信息
      if content['site_info']
        site.config['title'] = content['site_info']['title']
        site.config['description'] = content['site_info']['description']
        site.config['url'] = content['site_info']['url']
        site.config['baseurl'] = content['site_info']['baseurl']
      end

      # 更新作者信息
      if content['author']
        site.config['author'] = content['author']
      end

      # 更新社交媒体链接
      if content['social_links']
        content['social_links'].each do |platform, value|
          site.config["#{platform}"] = value unless value.empty?
        end
      end

      # 更新学术链接
      if content['academic_links']
        content['academic_links'].each do |platform, value|
          site.config["#{platform}"] = value unless value.empty?
        end
      end
    end
  end

  # 添加Liquid过滤器来访问配置内容
  module SiteContentFilters
    def get_site_content(key)
      @context.registers[:site].config['site_content']&.dig(*key.split('.')) || key
    end

    def get_ui_text(section, key)
      content = @context.registers[:site].config['site_content']
      content&.dig('ui_text', section, key) || key
    end

    def get_page_info(page_name, field)
      content = @context.registers[:site].config['site_content']
      content&.dig('pages', page_name, field) || field
    end
  end
end

# 注册过滤器
Liquid::Template.register_filter(Jekyll::SiteContentFilters) 