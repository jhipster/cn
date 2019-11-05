JHipster官方网站 ([jhipster.tech/cn](https://www.jhipster.tech/cn))
=======

这是JHipster的官方中文网站，为JHipster团队和JHipster中国社区的合作而服务。
本地运行
* [派生](https://github.com/jhipster/jhipster.github.io/fork)仓库并且克隆到本地文件系统
* [安装Jekyll](https://help.github.com/articles/setting-up-your-github-pages-site-locally-with-jekyll/)
* 第一次运行，执行`bundle install` 
* 不想安装到系统路径中, 安装到指定路径: `bundle install --path vendor/bundle`
* 在MacOS系统, 如果安装`nokogiri`遇到了问题, 尝试: `bundle config build.nokogiri --use-system-libraries=true --with-xml2-include="$(xcrun --show-sdk-path)"/usr/include/libxml2`
* 在克隆仓库的文件夹运行`bundle exec jekyll serve`
* 你打开http://0.0.0.0:4000可以访问站点

或者使用Docker与Docker-Compose (Windows系统推荐)

* [派生](https://github.com/jhipster/jhipster.github.io/fork) 仓库并且克隆到本地文件系统
* 运行`docker-compose up`
* 打开http://0.0.0.0:4000可以访问站点
