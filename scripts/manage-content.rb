#!/usr/bin/env ruby
# 网站内容管理脚本
# 使用方法: ruby scripts/manage-content.rb

require 'yaml'
require 'fileutils'

class SiteContentManager
  def initialize
    @content_file = '_data/site-content.yml'
    @backup_dir = '_data/backups'
    load_content
  end

  def run
    puts "🎯 网站内容管理系统"
    puts "=" * 50
    
    loop do
      show_menu
      choice = gets.chomp.downcase
      
      case choice
      when '1'
        edit_basic_info
      when '2'
        edit_author_info
      when '3'
        edit_navigation
      when '4'
        edit_ui_text
      when '5'
        edit_social_links
      when '6'
        edit_about_page
      when '7'
        backup_content
      when '8'
        restore_content
      when '9'
        preview_content
      when '10'
        rebuild_site
      when '0', 'q', 'quit'
        puts "👋 再见！"
        break
      else
        puts "❌ 无效选择，请重试"
      end
      
      puts "\n" + "=" * 50
    end
  end

  private

  def load_content
    if File.exist?(@content_file)
      @content = YAML.load_file(@content_file)
    else
      puts "❌ 未找到 #{@content_file} 文件"
      exit 1
    end
  end

  def save_content
    File.write(@content_file, @content.to_yaml)
    puts "✅ 内容已保存到 #{@content_file}"
  end

  def show_menu
    puts "\n📋 请选择操作："
    puts "1. 编辑基本信息"
    puts "2. 编辑作者信息"
    puts "3. 编辑导航菜单"
    puts "4. 编辑界面文本"
    puts "5. 编辑社交媒体链接"
    puts "6. 编辑About页面内容"
    puts "7. 备份当前配置"
    puts "8. 恢复配置"
    puts "9. 预览当前配置"
    puts "10. 重新构建网站"
    puts "0. 退出"
    print "\n请输入选择 (0-10): "
  end

  def edit_basic_info
    puts "\n📝 编辑基本信息"
    puts "-" * 30
    
    @content['site_info']['title'] = get_input("网站标题", @content['site_info']['title'])
    @content['site_info']['subtitle'] = get_input("网站副标题", @content['site_info']['subtitle'])
    @content['site_info']['description'] = get_input("网站描述", @content['site_info']['description'])
    @content['site_info']['url'] = get_input("网站URL", @content['site_info']['url'])
    
    save_content
  end

  def edit_author_info
    puts "\n👤 编辑作者信息"
    puts "-" * 30
    
    @content['author']['name'] = get_input("作者姓名", @content['author']['name'])
    @content['author']['pronouns'] = get_input("代词", @content['author']['pronouns'])
    @content['author']['bio'] = get_input("个人简介", @content['author']['bio'])
    @content['author']['location'] = get_input("位置", @content['author']['location'])
    @content['author']['employer'] = get_input("雇主/机构", @content['author']['employer'])
    @content['author']['email'] = get_input("邮箱", @content['author']['email'])
    
    save_content
  end

  def edit_navigation
    puts "\n🧭 编辑导航菜单"
    puts "-" * 30
    
    puts "当前导航菜单："
    @content['navigation']['main'].each_with_index do |item, index|
      puts "#{index + 1}. #{item['title']} -> #{item['url']}"
    end
    
    puts "\n操作选项："
    puts "a. 添加新菜单项"
    puts "d. 删除菜单项"
    puts "e. 编辑菜单项"
    puts "b. 返回主菜单"
    
    choice = gets.chomp.downcase
    
    case choice
    when 'a'
      add_navigation_item
    when 'd'
      delete_navigation_item
    when 'e'
      edit_navigation_item
    when 'b'
      return
    end
  end

  def add_navigation_item
    title = get_input("菜单标题")
    url = get_input("菜单链接")
    
    @content['navigation']['main'] << {
      'title' => title,
      'url' => url
    }
    
    save_content
  end

  def delete_navigation_item
    puts "请输入要删除的菜单项编号 (1-#{@content['navigation']['main'].length}): "
    index = gets.chomp.to_i - 1
    
    if index >= 0 && index < @content['navigation']['main'].length
      @content['navigation']['main'].delete_at(index)
      save_content
    else
      puts "❌ 无效的编号"
    end
  end

  def edit_navigation_item
    puts "请输入要编辑的菜单项编号 (1-#{@content['navigation']['main'].length}): "
    index = gets.chomp.to_i - 1
    
    if index >= 0 && index < @content['navigation']['main'].length
      item = @content['navigation']['main'][index]
      item['title'] = get_input("菜单标题", item['title'])
      item['url'] = get_input("菜单链接", item['url'])
      save_content
    else
      puts "❌ 无效的编号"
    end
  end

  def edit_ui_text
    puts "\n🎨 编辑界面文本"
    puts "-" * 30
    
    puts "选择要编辑的文本类别："
    puts "1. 通用文本"
    puts "2. 导航文本"
    puts "3. 内容标签"
    puts "4. 评论系统"
    puts "5. 表单标签"
    puts "6. 分享文本"
    puts "7. 相关文章"
    puts "8. 页脚文本"
    
    choice = gets.chomp
    
    case choice
    when '1'
      edit_text_section('common')
    when '2'
      edit_text_section('navigation')
    when '3'
      edit_text_section('content')
    when '4'
      edit_text_section('comments')
    when '5'
      edit_text_section('forms')
    when '6'
      edit_text_section('sharing')
    when '7'
      edit_text_section('related')
    when '8'
      edit_text_section('footer')
    else
      puts "❌ 无效选择"
    end
  end

  def edit_text_section(section)
    puts "\n编辑 #{section} 文本："
    @content['ui_text'][section].each do |key, value|
      new_value = get_input(key, value)
      @content['ui_text'][section][key] = new_value
    end
    
    save_content
  end

  def edit_social_links
    puts "\n🔗 编辑社交媒体链接"
    puts "-" * 30
    
    @content['social_links'].each do |platform, value|
      new_value = get_input("#{platform} 用户名", value)
      @content['social_links'][platform] = new_value
    end
    
    save_content
  end

  def edit_about_page
    puts "\n📄 编辑About页面内容"
    puts "-" * 30
    
    puts "选择要编辑的内容："
    puts "1. 页面标题"
    puts "2. 介绍文本"
    puts "3. 数据驱动网站部分"
    puts "4. 开始使用部分"
    puts "5. 站点配置部分"
    puts "6. 创建内容部分"
    puts "7. 编辑仓库部分"
    puts "8. 更多信息部分"
    
    choice = gets.chomp
    
    case choice
    when '1'
      @content['about_page']['title'] = get_input("页面标题", @content['about_page']['title'])
      save_content
    when '2'
      @content['about_page']['introduction'] = get_multiline_input("介绍文本", @content['about_page']['introduction'])
      save_content
    when '3'
      edit_about_section('data_driven')
    when '4'
      edit_about_section('getting_started')
    when '5'
      edit_about_section('site_configuration')
    when '6'
      edit_about_section('create_content')
    when '7'
      edit_about_section('edit_repository')
    when '8'
      edit_about_section('more_info')
    else
      puts "❌ 无效选择"
    end
  end

  def edit_about_section(section_key)
    section = @content['about_page']['sections'][section_key]
    puts "\n编辑 #{section['title']} 部分："
    
    section['title'] = get_input("标题", section['title'])
    section['content'] = get_multiline_input("内容", section['content'])
    
    save_content
  end

  def get_multiline_input(prompt, default = "")
    puts "#{prompt} (输入 'END' 结束多行输入):"
    puts "当前内容:"
    puts default
    puts "\n请输入新内容 (输入 'END' 结束):"
    
    lines = []
    while true
      line = gets.chomp
      break if line == 'END'
      lines << line
    end
    
    lines.empty? ? default : lines.join("\n")
  end

  def backup_content
    FileUtils.mkdir_p(@backup_dir) unless Dir.exist?(@backup_dir)
    
    timestamp = Time.now.strftime("%Y%m%d_%H%M%S")
    backup_file = File.join(@backup_dir, "site-content-#{timestamp}.yml")
    
    File.write(backup_file, @content.to_yaml)
    puts "✅ 配置已备份到: #{backup_file}"
  end

  def restore_content
    backups = Dir.glob(File.join(@backup_dir, "site-content-*.yml"))
    
    if backups.empty?
      puts "❌ 没有找到备份文件"
      return
    end
    
    puts "可用的备份文件："
    backups.each_with_index do |backup, index|
      puts "#{index + 1}. #{File.basename(backup)}"
    end
    
    puts "请选择要恢复的备份 (1-#{backups.length}): "
    choice = gets.chomp.to_i - 1
    
    if choice >= 0 && choice < backups.length
      backup_content = YAML.load_file(backups[choice])
      @content = backup_content
      save_content
      puts "✅ 配置已恢复"
    else
      puts "❌ 无效选择"
    end
  end

  def preview_content
    puts "\n📋 当前配置预览"
    puts "=" * 50
    puts YAML.dump(@content)
  end

  def rebuild_site
    puts "🔄 重新构建网站..."
    system("bundle exec jekyll build")
    puts "✅ 网站构建完成"
  end

  def get_input(prompt, default = "")
    print "#{prompt}"
    print " [#{default}]" unless default.empty?
    print ": "
    
    input = gets.chomp
    input.empty? ? default : input
  end
end

# 运行管理器
if __FILE__ == $0
  manager = SiteContentManager.new
  manager.run
end 