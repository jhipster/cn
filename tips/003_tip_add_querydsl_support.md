---
layout: default
title: 添加Querydsl支持
sitemap:
priority: 0.5
lastmod: 2017-04-27T08:40:00-00:00
---

# 添加Querydsl支持

__提示由 [@omrzljak](https://github.com/omrzljak) 提交, [@arnaud-deprez](https://github.com/arnaud-deprez) 更新__

在某些情况下，Spring Data [query possibilities](http://docs.spring.io/spring-data/mongodb/docs/current/reference/html/#mongodb.repositories.queries) 不能满足查询需求。 您可以使用 `@Query` 注解和 [write your own](http://docs.spring.io/spring-data/mongodb/docs/current/reference/html/#mongodb.repositories.queries.json-based) 。有些人喜欢编写类型安全的查询，例如 [Querydsl](http://www.Querydsl.com/) 。

## 生成的Predicate类

Querydsl的重要部分是为查询生成的domain类，即Predicate。 对于spring-data-mongodb，它们是由Java注释后处理工具生成的。

## Gradle插件

还有Querydsl的Gradle插件，它支持spring-data-mongodb的配置。

## Maven插件

还有一个Maven插件。 在文档[Maven集成](http://www.querydsl.com/static/querydsl/latest/reference/html/ch02.html#d0e132) 一章中全面介绍了Maven配置。 您还需要执行以下步骤。

**注意**: 不要包含`org.slf4j`依赖，因为它已包含在Spring Boot中。

## 变化内容

### build.gradle

在 `build.gradle`中，将依赖项添加到`Querydsl plugin`

```groovy
buildscript {
    repositories {
        jcenter()
    }
    dependencies {
        classpath "gradle.plugin.com.ewerk.gradle.plugins:querydsl-plugin:1.0.9"
    }
}

apply from: 'gradle/querydsl.gradle'
```
定义 `Querydsl version` 在 `gradle.properties`中。

```properties
querydsl_version=4.1.4
```

然后创建一个文件 `gradle/querydsl.gradle` ，内容为：

```groovy
apply plugin: "com.ewerk.gradle.plugins.querydsl"

sourceSets {
    main {
        java {
            srcDir "$buildDir/generated/source/apt/main"
        }
    }
}

querydsl {
    // we use mongodb
    springDataMongo = true
    querydslSourcesDir = "$buildDir/generated/source/apt/main"
}

dependencies {
    compile "com.querydsl:querydsl-mongodb:${querydsl_version}"
    compileOnly "com.querydsl:querydsl-apt:${querydsl_version}"
}
```

__注意__ 我们使用MongoDB，但Querydsl插件还支持[更多选项](https://github.com/ewerk/gradle-plugins/tree/master/Querydsl-plugin) 。

如果您运行`gradle build`，您将看到这样的输出
`Note: Generating net.jogat.names.domain.QName for [net.jogat.names.domain.Name]`

对于使用@Document注释的每个域类，Querydsl插件将生成一个Predicate类。

## 修改Repository类

如果您有一个实体类，例如`Name`，那么您也有一个`NameRepository`类。 您必须更改每个Repository类以从`QueryDslPredicateExecutor`扩展。

    public interface NameRepository extends MongoRepository<Name, String>, QueryDslPredicateExecutor<Name> {

这将通过支持Querydsl的其他方法扩展您的Repository类（[参见](http://docs.spring.io/spring-data/mongodb/docs/current/reference/html/#mongodb.repositories.queries.type-safe) ）

## Web支持

要扩展剩余控制器以支持参数化请求，您必须在方法参数中添加以`org.springframework.data.querydsl.binding.QuerydslPredicate`注解的`com.mysema.query.types.Predicate`：

    @RestController
    @RequestMapping("/api")
    class NameResource {

        private final NameRepository nameRepository;
        
        public NameResource(NameRepository nameRepository) {
            this.nameRepository = nameRepository;
        }

        @RequestMapping(value = "/names",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
        @Timed
        public ResponseEntity<List<Name>> getAllNames(@QuerydslPredicate(root = Name.class) Predicate predicate,
                                                        Pageable pageable) {
            log.debug("REST request to get a page of Name");
            Page<Name> page = nameRepository.findAll(predicate, pageable);
            HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/names");
            return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
        }
        ...
    }

同样在 `NameResourceIntTest` 你必须支持 `QuerydslPredicateArgumentResolver`:

    public class NameResourceIntTest {
        ...
        @Autowired
        private NameRepository nameRepository;
        @Autowired
        private QuerydslPredicateArgumentResolver querydslPredicateArgumentResolver;

        @PostConstruct
        public void setup() {
            MockitoAnnotations.initMocks(this);
            NameResource nameResource = new nameResource(nameRepository);
            this.restNameMockMvc = MockMvcBuilders.standaloneSetup(nameResource)
                .setCustomArgumentResolvers(pageableArgumentResolver, querydslPredicateArgumentResolver)
                .setMessageConverters(jacksonMessageConverter).build();
        }
        ...
    }

可以在 [相关文档](http://docs.spring.io/spring-data/mongodb/docs/current/reference/html/#core.web.type-safe) 中找到更多详细信息。

## 编写类型安全的查询

Gradle或Maven插件生成了QName类，该类可用于编写Name.class的查询。 这是Java示例：

```java
QName name = QName.name;

// count all names whose list "categorie" contains string "TOP_EVER"
nameRepository.count(name.categories.contains("TOP_EVER"));
```
