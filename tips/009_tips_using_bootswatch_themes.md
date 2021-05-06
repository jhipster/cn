---
layout: default
title: 使用Bootswatch主题
sitemap:
priority: 0.5
lastmod: 2015-08-01T22:28:00-00:00
---

# 将Bootswatch主题与主题切换器一起使用

__提交者 [@deepu105](https://github.com/deepu105)__

现在可以使用[JHipster模块](https://github.com/deepu105/generator-jhipster-bootswatch) 要求JHipster版本大于2.26.2的版本。

要具有[Bootswatch]（https://bootswatch.com/）主题而不是默认主题，您只需要用bootswatch主题中的css覆盖bootstrap css。 但是，如果您想让酷炫的主题切换器在Bootswatch主题之间动态切换，请遵循此提示。

在生成的应用中进行以下更改。

**注意:** 用您的应用程序生成的名称替换'yourApp'。

## 添加文件

在`webapp/app/components/bootswatch`下，将以下服务添加为`bootswatch.service.js`。
    'use strict';

    angular.module('yourApp')
        .factory('BootSwatchService', function ($http) {
            return {
                get: function() {
                    return $http.get('http://bootswatch.com/api/3.json').then(function (response) {
                        return response.data.themes;
                    });
                }
            };
        });

在`webapp/app/components/bootswatch`下的`bootswatch.directive.js`中添加以下指令

    'use strict';

    angular.module('yourApp')
        .directive('jhSwitchTheme', function() {
            /*Directive binds to anchor to update the bootswatch theme selected*/
            return {
                restrict: 'A',
                scope: {
                    theme : '=jhSwitchTheme'
                },
                link: function (scope, element, attrs) {
                    var currentTheme = $("#bootswatch-css").attr('title');
                    if(scope.theme.name === currentTheme){
                        element.parent().addClass("active");
                    }

                    element.on('click',function(){
                        $("#bootswatch-css").attr("href", scope.theme.css);
                        $(".theme-link").removeClass("active");
                        element.parent().addClass("active");
                    });
                }
            };
        });

在`webapp/app/components/bootswatch`下的`bootswatch.controller.js`中添加以下控制器

    'use strict';

    angular.module('yourApp')
        .controller('BootswatchController', function ($scope, BootSwatchService) {
            /*Get the list of availabel bootswatch themes*/
            BootSwatchService.get().then(function(themes) {
                $scope.themes = themes;
                $scope.themes.unshift({name:'Default',css:''});
            });
        });

## index.html

在CSS vendor.css构建任务之后，将以下内容添加到`index.html`文件中，以便构建任务不会压缩这些内容

    <!-- build:css content/css/vendor.css -->

    ...

    <!-- endbuild -->
    <!-- placeholder link to load bootswatch themes, title holds the current applied theme name-->
    <link rel="stylesheet" href="" id="bootswatch-css" title="Default">
    <!-- build:css assets/styles/main.css -->

    ...

    <!-- endbuild -->


在页脚中添加以下内容

    <div class="footer">
        <p translate="footer" class="pull-left">This is your footer</p>
        <div ng-controller="BootswatchController" class="dropup pull-right">
            <a class="btn btn-default dropdown-toggle" data-toggle="dropdown">
                <span class="glyphicon glyphicon-adjust"></span>
                <span class="hidden-tablet" translate="global.menu.theme">Theme</span>
                <b class="caret"></b>
            </a>
            <ul class="dropdown-menu" role="menu">
                <li class="theme-link" ng-repeat="theme in themes">
                    {% raw %}
                    <a href="" jh-switch-theme="theme">{{theme.name}}</a>
                    {% endraw %}
                </li>
            </ul>
        </div>
    </div>

如果'gulp inject'失败并且收到angular错误，请在index.html文件中手动添加脚本标签

    <!-- build:js({.tmp,src/main/webapp}) scripts/app.js -->

    ...

    <script src="scripts/components/util/bootswatch.controller.js"></script>
    <script src="scripts/components/util/bootswatch.directive.js"></script>
    <script src="scripts/components/util/bootswatch.service.js"></script>

# app.js (仅用于oAuth/xAuth)

如果您使用的是OAuth或XAuth，则将排除项添加到`app/blocks/interceptor/auth.interceptor.js`中authauthceptor中的引导网址中

    .factory('authInterceptor', function ($rootScope, $q, $location, localStorageService) {
        return {
            // Add authorization token to headers
            request: function (config) {
                config.headers = config.headers || {};
                // exclude bootswatch url
                if(config.url.indexOf('api.bootswatch.com') === -1){
                    var token = localStorageService.get('token');
                    ....
                }
                return config;
            }
        };

# 屏幕截图

![Screenshot 1](../images/009_tips_using_bootswatch_themes_01.png)

![Screenshot 2](../images/009_tips_using_bootswatch_themes_02.png)

![Screenshot 3](../images/009_tips_using_bootswatch_themes_03.png)

![Screenshot 4](../images/009_tips_using_bootswatch_themes_04.png)

![Screenshot 5](../images/009_tips_using_bootswatch_themes_05.png)

![Screenshot 6](../images/009_tips_using_bootswatch_themes_06.png)
