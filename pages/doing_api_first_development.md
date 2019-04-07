---
layout: default
title: API优先的开发
permalink: /doing-api-first-development/
redirect_from:
  - /doing-api-first-development.html
sitemap:
    priority: 0.7
    lastmod: 2018-06-11T00:00:00-00:00
---

# <i class="fa fa-search"></i> 进行 API 优先的开发

在生成 JHipster 应用程序时，您可以在提示的其他技术里选择 `API first development using OpenAPI-generator` 选项。此选项将配置您的构建工具（build tool）以使用 [OpenAPI-generator](https://github.com/OpenAPITools/openapi-generator) 从 OpenAPI（Swagger）定义文件生成 API 代码。
Swagger v2 和 OpenAPI v3 的格式都支持。

### API 优先的理由

在 API 优先的开发中，您需要首先编写规范，然后从规范生成代码，而不是从代码生成文档。
这样做有以下好处：

- 您的 API 可以为消费者而设计，而不是将实施的结果施加于消费者。
- 您可以使用规范文件在发布之前模拟新的服务器端点，以便您可以更轻松地分离前端开发和后端开发。
- 您不需要实时服务器即可使用 OpenAPI 文档。

### 使用 OpenAPI 生成器插件

OpenAPI 的规范文件位于 src/main/resources/swagger/api.yml，用于生成可以被实现的端点接口。
这些接口的默认方法以 `501 Not implemented` HTTP 状态和空的报文主体来回答。
使用 [swagger-editor](http://editor.swagger.io) 等工具编写规范，将其放在 `src/main/resources/swagger/api.yml` 中，然后运行：
```bash
./mvnw generate-sources
```
或者使用 gradle 构建:
```bash
./gradlew openApiGenerate
```
然后使用 `@Service` 类去实现 `${buildDirectory}/generated-sources/openapi/src/main/java/${package}/web/api/` 中生成的 “Delegate” 接口。

这是一个实现著名的 [petstore](http://petstore.swagger.io) 的代码示例：
```java
@Service
public class PetApiDelegateImpl implements PetApiDelegate {

    @Override
    public ResponseEntity<List<Pet>> findPetsByStatus(List<String> status) {
        return ResponseEntity.ok(
            status.stream()
                .distinct()
                .map(Pet.StatusEnum::fromValue)
                .map(statusEnum -> new Pet().id(RandomUtils.nextLong()).status(statusEnum))
                .collect(Collectors.toList())
        );
    }
}
```
如果您提供 `NativeWebRequest` bean 给委托接口，那么尚未被覆盖的方法（仍具有 501 HTTP 状态码）也会返回一个报文体的例子。
在提供具体实现之前，这对于模拟您的 API 端点非常有用。
```java
@Service
public class PetApiDelegateImpl implements PetApiDelegate {

    private final NativeWebRequest request;

    public PetApiDelegateImpl(NativeWebRequest request) {
        this.request = request;
    }

    @Override
    public Optional<NativeWebRequest> getRequest() {
        return Optional.ofNullable(request);
    }
}
```
然后您可以观察报文体的例子
```sh
$ curl -X GET --header 'Accept: application/json' 'http://localhost:8080/v2/pet/findByStatus?status=pending'
{  "photoUrls" : [ "photoUrls", "photoUrls" ],  "name" : "doggie",  "id" : 0,  "category" : {    "name" : "name",    "id" : 6  },  "tags" : [ {    "name" : "name",    "id" : 1  }, {    "name" : "name",    "id" : 1  } ],  "status" : "available"}%
$ curl -X GET --header 'Accept: application/xml' 'http://localhost:8080/v2/pet/findByStatus?status=pending'
<Pet>  <id>123456789</id>  <name>doggie</name>  <photoUrls>    <photoUrls>aeiou</photoUrls>  </photoUrls>  <tags>  </tags>  <status>aeiou</status></Pet>%
```
