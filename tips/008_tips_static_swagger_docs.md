---
layout: default
title: 静态API文档
sitemap:
priority: 0.5
lastmod: 2015-07-31T18:40:00-00:00
---

# 带有Swagger2Markup的静态API文档

__提交者 [@atomfrede](https://github.com/atomfrede)__

> 您应该使用新的 [swagger2markup](https://github.com/atomfrede/generator-jhipster-swagger2markup) 模块，而不是遵循此提示！ 见 [JHipster Marketplace](https://www.jhipster.tech/modules/marketplace/) 有关模块系统的详细信息。

如果要生成静态API文档（并将其与手写文档结合在一起），则[Swagger2Markup](https://swagger2markup.readme.io/) 提供了一种简便的方法来组合由以下人员生成的自动生成的API文档：
将手写文档，翻译成HTML，PDF和EPUB格式的最新，易于阅读的在线和离线用户指南。

## 添加所需的依赖项，插件和测试类

### Maven

将以下内容添加到您的项目依赖项中：

    <dependency>
        <groupId>io.springfox</groupId>
        <artifactId>springfox-staticdocs</artifactId>
        <version>${springfox.version}</version>
        <scope>test</scope>
    </dependency>

将以下内容添加到插件部分：

    <plugin>
      <groupId>org.asciidoctor</groupId>
      <artifactId>asciidoctor-maven-plugin</artifactId>
      <version>1.5.2</version>
      <executions>
        <execution>
          <id>output-html</id>
          <phase>test</phase>
          <goals>
            <goal>process-asciidoc</goal>
          </goals>
          <configuration>
            <backend>html5</backend>
            <outputDirectory>${project.build.directory}/docs/html</outputDirectory>
          </configuration>
        </execution>
        <execution>
          <id>output-pdf</id>
          <phase>test</phase>
          <goals>
            <goal>process-asciidoc</goal>
          </goals>
          <configuration>
            <backend>pdf</backend>
            <outputDirectory>${project.build.directory}/docs/pdf</outputDirectory>
          </configuration>
        </execution>
      </executions>
      <dependencies>
        <dependency>
          <groupId>org.asciidoctor</groupId>
          <artifactId>asciidoctorj-pdf</artifactId>
          <version>1.5.0-alpha.8</version>
        </dependency>
      </dependencies>
      <configuration>
        <sourceDirectory>src/docs/asciidoc</sourceDirectory>
        <sourceDocumentName>index.adoc</sourceDocumentName>
        <attributes>
          <doctype>book</doctype>
          <toc>left</toc>
          <toclevels>2</toclevels>
          <generated>${project.build.directory}/docs/asciidoc/generated</generated>
        </attributes>
      </configuration>
    </plugin>

在 `src/test/rest`中创建一个名为 `Swagger2MarkupTest`的类：

    @RunWith(SpringJUnit4ClassRunner.class)
    @SpringApplicationConfiguration(classes = Application.class)
    @WebAppConfiguration
    @IntegrationTest
    public class Swagger2MarkupTest {

        private static final String API_URI = "/v2/api-docs";

        @Inject
        private WebApplicationContext context;

        private MockMvc mockMvc;

        private File projectDir;

        @Before
        public void setup() throws IOException {
            this.mockMvc = MockMvcBuilders.webAppContextSetup(this.context).build();

            ClassPathResource pathfileRes = new ClassPathResource("config/application.yml");
            projectDir = pathfileRes.getFile().getParentFile().getParentFile().getParentFile().getParentFile();
        }

        @Test
        public void convertSwaggerToAsciiDoc() throws Exception {
            Swagger2MarkupResultHandler.Builder builder = Swagger2MarkupResultHandler
                .outputDirectory(outputDirForFormat("asciidoc"));
            mockMvc.perform(get(API_URI).accept(APPLICATION_JSON))
                .andDo(builder.build())
                .andExpect(status().isOk());

        }

        private String outputDirForFormat(String format) throws IOException {
            return new File(projectDir, "target/docs/" + format + "/generated").getAbsolutePath();
        }
    }

### Gradle

将以下依赖项添加到您的项目依赖项中：

    testCompile group: 'io.springfox', name:'springfox-staticdocs', version: springfox_version

将以下内容添加到您的构建脚本依赖项中：

    classpath 'org.asciidoctor:asciidoctor-gradle-plugin:1.5.2'
    classpath 'org.asciidoctor:asciidoctorj-pdf:1.5.0-alpha.8'

应用`asciidoctor convert`插件：

    apply plugin: 'org.asciidoctor.convert'

添加以下内容以生成HTML和PDF：

    ext {
        generatedAsciidoc = file("${buildDir}/docs/asciidoc/generated")
    }

    asciidoctor {
        dependsOn test
        sources {
            include 'index.adoc'
        }
        backends = ['html5', 'pdf']
        attributes = [
            doctype: 'book',
            toc: 'left',
            toclevels: '2',
            numbered: '',
            sectlinks: '',
            sectanchors: '',
            hardbreaks: '',
            generated: generatedAsciidoc
        ]
    }

在`src/test/rest`中创建一个名为 `Swagger2MarkupTest`的测试类：

    @RunWith(SpringJUnit4ClassRunner.class)
    @SpringApplicationConfiguration(classes = Application.class)
    @WebAppConfiguration
    @IntegrationTest
    public class Swagger2MarkupTest {

        private static final String API_URI = "/v2/api-docs";

        @Inject
        private WebApplicationContext context;

        private MockMvc mockMvc;

        private File projectDir;

        @Before
        public void setup() throws IOException {
            this.mockMvc = MockMvcBuilders.webAppContextSetup(this.context).build();

            ClassPathResource pathfileRes = new ClassPathResource("config/application.yml");
            projectDir = pathfileRes.getFile().getParentFile().getParentFile().getParentFile().getParentFile();
        }

        @Test
        public void convertSwaggerToAsciiDoc() throws Exception {
            Swagger2MarkupResultHandler.Builder builder = Swagger2MarkupResultHandler
                .outputDirectory(outputDirForFormat("asciidoc"));
            mockMvc.perform(get(API_URI).accept(APPLICATION_JSON))
                .andDo(builder.build())
                .andExpect(status().isOk());

        }

        private String outputDirForFormat(String format) throws IOException {
            return new File(projectDir, "docs/" + format + "/generated").getAbsolutePath();
        }
    }

## 创建index.adoc文件

使用以下内容在`src/docs/asciidoc`中创建`index.adoc`：

    include::{generated}/overview.adoc[]
    include::{generated}/paths.adoc[]
    include::{generated}/definitions.adoc[]

## 生成静态文档

静态文档是在项目的测试阶段生成的。 您可以在`src/target/docs/html`或`build/asciidoc/html5`中找到它。

![Example documentation](../images/008_tips_static_swagger_docs_01.png)

## 更多

有关更多信息（例如，如何添加手写文档），请参见[官方参考文档](https://swagger2markup.readme.io/) 。
