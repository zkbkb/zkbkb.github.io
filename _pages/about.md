---
permalink: /
title: "About"
author_profile: true
redirect_from: 
  - /about/
  - /about.html
---

{% assign about = site.site_content.about_page %}

{{ about.introduction }}

{{ about.sections.data_driven.title }}
======
{{ about.sections.data_driven.content }}

{{ about.sections.getting_started.title }}
======
{{ about.sections.getting_started.content }}

{{ about.sections.site_configuration.title }}
------
{{ about.sections.site_configuration.content }}

{{ about.sections.create_content.title }}
------
{{ about.sections.create_content.content }}

{{ about.sections.edit_repository.title }}
------
{{ about.sections.edit_repository.content }}

Example: editing a markdown file for a talk
![Editing a markdown file for a talk](/images/editing-talk.png)

{{ about.sections.more_info.title }}
------
{{ about.sections.more_info.content }}
