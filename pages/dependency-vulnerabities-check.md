---
layout: default
title: 依赖漏洞检查
permalink: /dependency-vulnerabities-check/
sitemap:
    priority: 0.7
    lastmod: 2018-09-15T19:00:00-00:00
---

# <i class="fa fa-check-circle-o"></i> 依赖漏洞检查

## 为什么要检查项目依赖项

JHipster使用了许多技术，该项目在选择它们时非常谨慎。但是，也许项目错过了这么多依赖项中的一个漏洞，或者您添加或更新了一个触发新漏洞的依赖项。

根据[OWASP十大最关键的Web应用程序安全风险](https://www.owasp.org/index.php/Category:OWASP_Top_Ten_Project)，使用具有已知漏洞的组件（即，依赖项）排名第9，并且（由恶意的或不由第三方的）依赖项提供了许多已知的安全漏洞。

## 为什么JHipster默认不提供依赖项检查

在JHipster构建中提出默认情况下的依赖项检查已经讨论了几次（[#6329](https://github.com/jhipster/generator-jhipster/issues/6329), [#8191](https://github.com/jhipster/generator-jhipster/issues/8191)）。总而言之，拥有一份现实的报告（消除误报）和上下文相关依赖（确保安全始终是在实际风险/批评与努力预防之间的权衡）是很复杂的。

但是，如果您在生产中使用JHipster，我们强烈建议使用诸如[Dependabot](https://dependabot.com/)或[Snyk](https://snyk.io/)之类的依赖分析工具。

## 如果在JHipster的一个依赖项中检测到漏洞，该怎么办

如果您在JHipster的一个依赖项中发现了漏洞，请检查该漏洞是否在[issue](https://github.com/jhipster/generator-jhipster/issues)存在。

如果未提及任何漏洞相关内容，请私下向我们发送安全漏洞报告。请阅读有关如何漏洞的[安全政策](https://github.com/jhipster/generator-jhipster/security/policy)。包括重现漏洞利用，安全报告，博客文章等等步骤。

确保JHipster团队致力于提供高质量，企业级且安全的开发架构，并且此问题将是我们的重中之重。

# 如何检查JHipster项目的依赖关系

## 在服务器端检查

要检查Java依赖项是否具有已知的常见漏洞和披露（aka. CVE），请访问[NIST国家漏洞数据库](https://nvd.nist.gov/)，该数据库维护了最新列表。

OWASP项目提供了Maven和Gradle插件来自动检查整个依赖链，生成报告甚至阻止构建（不建议这样做，在进行持续集成时会非常激进）。

[如何阅读依赖性检查报告文档](https://jeremylong.github.io/DependencyCheck/general/thereport.html).

### 使用Maven

请参阅[OWASP Maven Dependency Check插件文档](https://jeremylong.github.io/DependencyCheck/dependency-check-maven/index.html)

添加owasp依赖项检查插件：
```
<build>
...
  <plugins>
  ...
  <plugin>
      <groupId>org.owasp</groupId>
      <artifactId>dependency-check-maven</artifactId>
      <version>5.2.4</version>
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

运行`./mvnw verify`将在`target`目录下生成一个依赖项检查报告。

### 使用Gradle

请参阅[OWASP Gradle依赖检查插件文档](https://jeremylong.github.io/DependencyCheck/dependency-check-gradle/index.html)

更新`build.gradle`文件以应用[OWASP依赖项检查插件](https://plugins.gradle.org/plugin/org.owasp.dependencycheck)。

```
plugins {
  // 添加插件在现有插件模块
  id "org.owasp.dependencycheck" version "5.2.4"

}

if(project.hasProperty('strict-security')) {
  check.dependsOn dependencyCheckAnalyze
}
```

运行`./gradlew dependencyCheckAnalyze`在`build/report`目录中生成一个依赖项检查报告。

通过运行`./gradlew check -Pstrict-security`，可以通过依赖性检查来更新持续集成构建。

## 在前端检查

从版本6开始，默认情况下，NPM包括针对每个依赖项安装的安全审核。查看[关于安全审核](https://docs.npmjs.com/getting-started/running-a-security-audit)页面以获取更多信息。
