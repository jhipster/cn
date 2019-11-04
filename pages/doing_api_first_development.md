---
layout: default
title: API优先开发
permalink: /doing-api-first-development/
redirect_from:
  - /doing-api-first-development.html
sitemap:
    priority: 0.7
    lastmod: 2018-06-11T00:00:00-00:00
---

# <i class="fa fa-search"></i> API优先开发

生成JHipster应用程序时，在提示您选择其他技术时, 可以选择`使用OpenAPI-generator进行API优先开发`。此选项将配置您的构建工具以使用[OpenAPI-generator](https://github.com/OpenAPITools/openapi-generator)从OpenAPI（Swagger）定义文件生成API代码。
Swagger v2和OpenAPI v3格式均受支持。

### API优先开发的理由

在API优先开发中，您需要先编写规范，然后再从中生成代码，而不是从代码中生成文档。
这具有以下优点：

- 您可以为使用者设计API，而不必考虑其实现。
- 您可以使用规范文件在新服务器端点发布之前模拟它们，以便更轻松地分离前端和后端开发。
- 您不需要在线服务器即可使用OpenAPI文档。

### 使用OpenAPI生成器插件

OpenAPI规范文件位于src/main/resources/swagger/api.yml，用于生成可以实现的端点接口。这些接口具有默认方法，这些方法会返回`501 Not implemented`HTTP状态和空消息体。使用诸如[swagger-editor](http://editor.swagger.io)之类的工具编写您的规范，将其放在`src/main/resources/swagger/api.yml`中，然后运行：
```bash
./mvnw generate-sources
```
或用于gradle：
```bash
./gradlew openApiGenerate
```
然后使用`@Service`类实现在`${buildDirectory}/generated-sources/openapi/src/main/java/${package}/web/api/`中生成的"Delegate"接口。

为著名的[petstore](http://petstore.swagger.io)编写代码的示例：

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
如果将`NativeWebRequest` bean提供给delegate接口，则将为尚未重写的方法（仍然带有501 HTTP状态代码）返回基本示例主体。

在提供实际实现之前，这对模拟端点很有用。
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
然后你可以得到例子
```sh
$ curl -X GET --header 'Accept: application/json' 'http://localhost:8080/v2/pet/findByStatus?status=pending'
{  "photoUrls" : [ "photoUrls", "photoUrls" ],  "name" : "doggie",  "id" : 0,  "category" : {    "name" : "name",    "id" : 6  },  "tags" : [ {    "name" : "name",    "id" : 1  }, {    "name" : "name",    "id" : 1  } ],  "status" : "available"}%
$ curl -X GET --header 'Accept: application/xml' 'http://localhost:8080/v2/pet/findByStatus?status=pending'
<Pet>  <id>123456789</id>  <name>doggie</name>  <photoUrls>    <photoUrls>aeiou</photoUrls>  </photoUrls>  <tags>  </tags>  <status>aeiou</status></Pet>%
```
    