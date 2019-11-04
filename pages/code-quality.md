---
layout: default
title: 代码质量
permalink: /code-quality/
sitemap:
    priority: 0.7
    lastmod: 2018-08-18T12:40:00-00:00
---

# <i class="fa fa-diamond"></i> 代码质量

使用[SonarCloud](https://sonarcloud.io)（由JHipster自动配置）可以轻松分析代码质量。

## 将Sonar与JHipster结合使用

JHipster为Sonar提供了特定的Docker Compose配置（[这是JHipster Docker Compose文档]({{ site.url }}/docker-compose/))），提供了现成的Sonar实例。在项目的根目录下，请运行：

    docker-compose -f src/main/docker/sonar.yml up -d

如果您使用的是Maven，则会自动对其进行配置：

    ./mvnw -Pprod clean verify sonar:sonar -Dsonar.host.url=http://localhost:9001

如果您需要重新运行Sonar阶段，请确保至少指定`initialize`阶段，因为Sonar属性是从sonar-project.properties文件加载的。

    ./mvnw initialize sonar:sonar -Dsonar.host.url=http://localhost:9001

如果您使用Gradle，也会自动对其进行配置：

    ./gradlew -Pprod clean check jacocoTestReport sonarqube -Dsonar.host.url=http://localhost:9001

现在，在每种情况下，如果已经安装了[sonar-scanner](https://docs.sonarqube.org/display/SCAN/Analyzing+with+SonarQube+Scanner)，则都可以运行分析。

    sonar-scanner

分析完成后，它将在Sonar仪表板上可用，默认情况下在 [http://127.0.0.1:9001/](http://127.0.0.1:9001/)上可用。

## 从Jacoco Analysis中排除文件

如果您希望从覆盖率分析中排除某些类（例如，生成的类或应用程序类），并且想要在默认的jacoco html报告中具有正确的覆盖率，则必须从分析和报告中排除这些类。

### Maven

您需要将排除项添加到`prepare-agent`和`report`单元测试和集成测试的目标中：

```xml
<plugin>
    <groupId>org.jacoco</groupId>
    <artifactId>jacoco-maven-plugin</artifactId>
    <version>${jacoco-maven-plugin.version}</version>
    <executions>
        <execution>
            <id>pre-unit-tests</id>
            <goals>
                <goal>prepare-agent</goal>
            </goals>
            <configuration>
                <!-- Exclude any class named Application from instrumentation -->
                <excludes>**/Application.*</excludes>
                <destFile>${jacoco.utReportFile}</destFile>
            </configuration>
        </execution>
        <execution>
            <id>post-unit-test</id>
            <phase>test</phase>
            <goals>
                <goal>report</goal>
            </goals>
            <configuration>
                <!-- Exclude any class named Application from reporting-->
                <excludes>**/Application.*</excludes>
                <dataFile>${jacoco.utReportFile}</dataFile>
                <outputDirectory>${jacoco.reportFolder}</outputDirectory>
            </configuration>
        </execution>
        <execution>
            <id>pre-integration-tests</id>
            <goals>
                <goal>prepare-agent-integration</goal>
            </goals>
            <configuration>
                <!-- Exclude any class named Application from instrumentation -->
                <excludes>**/Application.*</excludes>
                <destFile>${jacoco.itReportFile}</destFile>
            </configuration>
        </execution>
        <execution>
            <id>post-integration-tests</id>
            <phase>post-integration-test</phase>
            <goals>
                <goal>report-integration</goal>
            </goals>
            <configuration>
                <!-- Exclude any class named Application from reporting-->
                <excludes>**/Application.*</excludes>
                <dataFile>${jacoco.itReportFile}</dataFile>
                <outputDirectory>${jacoco.reportFolder}</outputDirectory>
            </configuration>
        </execution>
    </executions>
</plugin>
```

### Gradle

您可以将以下内容添加到`sonar.gradle`文件中：

```gradle
test {
    jacoco {
        excludes += ['build/generated/**']
    }
}

jacocoTestReport {
    afterEvaluate {
        classDirectories = files(classDirectories.files.collect {
            fileTree(dir: it, exclude: [
                    '**/*_.class'
            ])
        })
    }
}
```

## 自动分析默认生成的项目

JHipster生成器项目发布一个示例项目，每次在“master”分支中合并新提交时都会对其进行分析：

[Analysis of the sample JHipster project](https://sonarcloud.io/dashboard?id=io.github.jhipster.sample%3Ajhipster-sample-application)

这使JHipster团队可以确保您将开始使用尽可能最干净的代码来开发项目。

[SonarCloud](https://sonarcloud.io)免费提供此分析。