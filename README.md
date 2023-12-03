JHipster官方网站 ([jhipster.tech/cn](https://www.jhipster.tech/cn))
=======

这是JHipster的官方中文网站，为JHipster团队和JHipster中国社区的合作而服务。

请注意：更改样式时，请更新css/scss下的.scss文件，并运行npm run sass生成CSS。请勿直接更新CSS。

本地运行
* [Fork](https://github.com/jhipster/jhipster.github.io/fork)仓库并且克隆到本地文件系统
* [安装Jekyll](https://help.github.com/articles/setting-up-your-github-pages-site-locally-with-jekyll/)
* 第一次运行，执行: `npm install && bundle install`
* 如果您想避免安装到系统目录，请改为安装到供应商目录：`bundle install --path vendor/bundle`
* 在MacOS上，如果您安装nokogiri时遇到问题，请尝试：`bundle config build.nokogiri --use-system-libraries=true --with-xml2-include="$(xcrun --show-sdk-path)"/usr/include/libxml2`
* 在克隆的存储库文件夹中运行`bundle exec jekyll serve 或 npm start`。
* 浏览器打开`http://localhost:4000`访问该网站。

或者使用Docker与Docker-Compose (Windows系统推荐)

* [Fork](https://github.com/jhipster/jhipster.github.io/fork) 仓库并且克隆到本地文件系统
* 运行`docker-compose up`
* 打开`http://0.0.0.0:4000` 可以访问站点
