---
layout: default
title: 依赖性漏洞检查
permalink: /dependency-vulnerabities-check/
sitemap:
    priority: 0.7
    lastmod: 2018-09-15T19:00:00-00:00
---

# <i class="fa fa-check-circle-o"></i> 依赖性漏洞检查

## 为什么要检查项目依赖项

JHipster使用了许多技术，并且项目在选择它们时非常小心。但是，也许项目在这些依赖关系中遗漏了一个漏洞，或者您添加或更新了一个引发新漏洞的依赖关系。

根据 [OWASP Top 10 Most Critical Web Application Security Risks](https://www.owasp.org/index.php/Category:OWASP_Top_Ten_Project), 使用具有已知漏洞的组件（即依赖项）排名第9，并且有许多已知的第三方依赖项（恶意或非恶意）提供的安全漏洞故事。

## JHipster默认不提供依赖项检查的原因

提出JHipster构建中默认的依赖性检查已经讨论了几次 ([#6329](https://github.com/jhipster/generator-jhipster/issues/6329), [#8191](https://github.com/jhipster/generator-jhipster/issues/8191)). 综上所述，有一个现实的报告（消除误报）和上下文相关的报告（安全性总是实际风险/关键性和防止风险/关键性之间的权衡）是很复杂的。

## 如果检测到JHipster的某个依赖项中存在漏洞，该怎么办？

如果在JHipster的某个依赖项中发现漏洞，请检查该漏洞上是否已打开现有的  [issue](https://github.com/jhipster/generator-jhipster/issues)。

如果没有提到任何问题，请创建一个 [issue](https://github.com/jhipster/generator-jhipster/issues/new/choose) 并遵循模板（包括复制漏洞、安全报告、博客帖子等步骤）。

确保JHipster团队致力于提供高质量、企业就绪和安全的开发堆栈，并且这个问题将是我们的首要任务。

# 如何检查JHipster项目的依赖关系

## 在服务器端检查

检查Java依赖项是否具有已知的常见漏洞和暴露 (aka. CVE), 访问 [NIST National Vulnerability Database](https://nvd.nist.gov/) 该数据库维护最新列表。

OWASP项目提供Maven和Gradle插件来自动检查整个依赖链，生成一个报告，甚至阻止一个构建（不推荐，在进行持续集成时，它可能非常具有攻击性）。

[这是解释如何阅读依赖项检查报告的文档](https://jeremylong.github.io/DependencyCheck/general/thereport.html).

### 使用 Maven

参见 [OWASP Maven Dependency Check plugin documentation](https://jeremylong.github.io/DependencyCheck/dependency-check-maven/index.html)

添加 owasp dependency-check plugin:
```
<build>
...
  <plugins>
  ...
  <plugin>
      <groupId>org.owasp</groupId>
      <artifactId>dependency-check-maven</artifactId>
      <version>3.3.1</version>
      <executions>
        <execution>
          <goals>
            <goal>check</goal>
          </goals>
        </execution>
      </executions>
    </plugin>
  ..
  </plugins>
  ...
</build>
```
运行 `./mvnw verify` 将在`target` 目录下生成依赖项检查报告。

### 使用 Gradle
参加 [OWASP Gradle Dependency Check plugin documentation](https://jeremylong.github.io/DependencyCheck/dependency-check-gradle/index.html)

更新 `build.gradle` 文件来应用 [OWASP dependency-check-gradle plugin](https://plugins.gradle.org/plugin/org.owasp.dependencycheck).

```
buildscript {
    repositories {
        mavenCentral()
    }
    dependencies {
        classpath 'org.owasp:dependency-check-gradle:3.3.1'
    }
}

apply plugin: 'org.owasp.dependencycheck'

if(project.hasProperty('strict-security')) {
  check.dependsOn dependencyCheckAnalyze
}
```

运行 `./gradlew dependencyCheckAnalyze` 将在 `build/report` 目录下生成依赖项检查报告。

通过运行依赖项检查来更新持续集成构建`./gradlew check -Pstrict-security`

## 客户端检查

自版本6以来，默认情况下，NPM为每个依赖项安装都包含一个安全审计。检查 [关于安全审计
](https://docs.npmjs.com/getting-started/running-a-security-audit)页面了解更多信息。
