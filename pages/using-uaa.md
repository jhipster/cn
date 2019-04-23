---
layout: default
title: 使用Jhipster UAA实现微服务安全
permalink: /using-uaa/
redirect_from:
  - /security.html
sitemap:
    priority: 0.7
    lastmod: 2016-08-25T00:00:00-00:00
---
# <i class="fa fa-lock"></i> 使用Jhipster UAA实现微服务安全

JHipster UAA是一种用户记帐和授权服务，用于使用OAuth2授权协议保护JHipster微服务。

为了清楚地将JHipster UAA与其他“UAA”区别开来，例如[CloudFoundry UAA](https://github.com/cloudfoundry/uaa)，JHipster UAA是一个完全配置的OAuth2授权服务器，其中包含用户和角色终结点，并封装到一个普通的Jhipster应用程序中。这允许开发人员深入配置其用户域的各个方面，而不受其他随时可用的UAA对策略的限制。

## 总结

1. [体系结构图](#architecture_diagram)
2. [微服务体系结构的安全声明](#claims)
3. [在此上下文中了解OAuth2](#oauth2)
4. [使用 JHipster UAA](#jhipster-uaa)
 * 基本设置
 * 了解组件
 * 刷新令牌
 * 常见错误
5. [使用外部客户端确保服务间通信安全](#inter-service-communication)
  * Using Eureka, Ribbon, Hystrix and Feign
  * Using `@AuthorizedFeignClients`
6. [测试UAA应用程序](#testing)
  * Stubbing feign clients
  * Emulating OAuth2 authentication

## <a name="architecture_diagram"></a> 体系结构图

<img src="{{ site.url }}/images/microservices_architecture_detail.002.png" alt="Diagram" style="width: 800; height: 600" class="img-responsive"/>

## <a name="claims"></a> 1. 微服务体系结构的安全声明

在深入研究OAuth2及其在JHipster微服务上的应用之前，必须澄清对可靠安全解决方案的声明。

### 1. 中央身份验证

由于微服务主要是构建独立和自主的应用程序，因此我们希望拥有一致的认证体验，这样用户就不会注意到他的请求是由不同的应用程序提供的，并且可能具有单独的安全配置。

### 2. 无状态

构建微服务的核心好处是可扩展性。所以选择的安全解决方案不应该影响这一点。在服务器上保持用户会话状态是一项棘手的任务，因此在这种情况下，无状态解决方案是非常首选的。

### 3. 用户/机器访问区别

需要对不同的用户以及不同的机器进行明确的区分。使用微服务架构可以构建一个具有不同域和资源的大型多用途数据中心，因此需要限制不同客户机的访问，如本地应用程序、多个SPA等。

### 4. 细粒度访问控制

在维护集中角色的同时，需要在每个微服务中配置详细的访问控制策略。微服务应该不知道识别用户的责任，必须只授权传入的请求。

### 5. 免受攻击

无论安全解决方案可以解决多少问题，它都应该尽可能强大地抵御漏洞。

### 6. 可扩展性

使用无状态协议不是安全解决方案可扩展性的保证。最后，不应该有任何单一的故障点。计数器示例是共享的身份验证数据库或单个身份验证服务器实例，每个请求点击一次。


## <a name="oauth2"></a> 2. 在此上下文中了解OAuth2

使用OAuth2协议（注意：它是一个 **协议** ，不是框架，不是应用程序）可以满足所有6个声明。它遵循严格的标准，是什么使得这个解决方案与其他微服务以及远程系统兼容。Jhipster基于以下安全设计提供了几种解决方案：

![JHipster UAA 架构]({{ site.url }}/images/jhipster_uaa.png)

* 对体系结构任何端点的每个请求都是通过“客户机”执行的。
* “client”是“angular$http client”、一些“rest client”、“curl”或任何能够执行请求的抽象词。
* “客户机”也可以与用户身份验证一起使用，例如前端客户机应用程序中的angular$http
* 为端点（包括UAA）上的资源提供服务的每个微服务都是资源服务器
* 蓝色箭头显示OAuth授权服务器上的客户端身份验证
* 绿色箭头显示客户端在资源服务器上执行的请求
* UAA服务器是授权服务器和资源服务器的组合
* UAA服务器是微服务应用程序中所有数据的所有者（它批准自动访问资源服务器）
* 使用用户身份验证访问资源的客户端使用“密码授予”进行身份验证，客户端ID和机密安全存储在网关配置文件中。
* 在没有用户的情况下访问资源的客户端使用“客户端凭据授予”进行身份验证
* 每个客户端都在UAA（Web应用程序、内部…）中定义。

这种设计可以应用于任何独立于语言或框架的微服务体系结构。

此外，以下规则可用于访问控制：

* 使用“角色”和[RBAC][]配置用户访问
* 使用“作用域”和[RBAC][]配置机器访问
* 复杂的访问配置使用[abac][]表示，在“角色”和“作用域”上使用布尔表达式。
* 示例：hasrole（“admin”）和hasscope（“shop manager.read”，“shop manager.write”）。

## <a name="jhipster-uaa"></a> 3. 使用JHipster UAA

搭建JHipster微服务时，可以选择UAA选项而不是JWT身份验证。

**注意**: UAA解决方案也在使用JWT，它可以使用默认的SpringCloud安全性进行定制配置和JWT。

### 基本设置

最基本的设置包括：

1. JHipster UAA服务器（作为应用程序类型）
2. 至少一个其他微服务（使用UAA身份验证）
3. JHipster网关（使用UAA身份验证）

这是生成它的顺序。

除了身份验证类型之外，还必须提供UAA的位置。

对于非常基本的用法，此设置的工作方式与JWT身份验证类型相同，但还有一个服务。

### 了解组件

JHipster UAA服务器可以完成三件事：

* 它服务于默认的jhipster用户域，包含用户和帐户资源（这是由jwt身份验证中的网关完成的）
* 它为OAuth2实现了`authorizationServerConfigurerAdapter`，并定义了基本客户端（“web_-app”和“internal”）。
* 它服务于`/oauth/token_key`上的JWT公钥，该公钥必须由所有其他微服务使用。

数据库、缓存解决方案、搜索引擎、构建工具和其他JHipster选项的选择对开发人员开放。

当一个微服务启动时，它通常期望UAA服务器已经开始共享它的公钥。服务首先调用`/oauth/token_key`获取公钥并将其配置为密钥签名（`jwtacesstokenconverter`）。

如果UAA没有启动，应用程序将在稍后继续启动并获取公钥。有两个属性-“uaa.signature verification.ttl”控制再次提取密钥之前密钥的生存时间，“uaa.signature verification.public key refresh rate limit”限制对UAA的请求以避免垃圾邮件。这些值通常保留为其默认值。在任何情况下，如果验证失败，那么微服务将检查是否有新的密钥。这样，UAA上的密钥就可以被替换，服务也会迎头赶上。

从这一点来看，在这个基本设置中可能会发生两个用例：用户调用和机器调用。

对于用户调用，将向网关的`/auth/login`端点发送登录请求。此终结点使用“oauth2tokenendpointclientadapter”向UAA发送请求，并使用“密码”授权进行身份验证。因为这个请求发生在网关上，所以客户机ID和秘密不存储在任何客户机端代码中，用户无法访问。网关返回一个包含令牌的新cookie，该cookie与从客户端执行的每个请求一起发送到JHipster后端。

对于机器调用，机器必须使用客户端凭据授权作为UAA进行身份验证。JHipster提供了一个标准的解决方案，如[secure inter-service-communication using feign clients](#inter-service-communication)

### 刷新令牌

刷新访问令牌的一般流程发生在网关上，如下所示：

- 身份验证通过`authresource`调用`oauth2authenticationservice`的authenticate完成，authenticate将设置cookie。
- 对于每个请求，`refreshtokenfilter`（由`refreshtokenfilterconfigurer`安装）检查访问令牌是否过期以及是否具有有效的刷新令牌。
- 如果是，那么它将通过`oauth2authenticationservice` refreshttoken触发刷新过程。
- 这将使用`oauth2tokenendpointclient`接口向所选的oauth2服务器发送刷新令牌授权，在我们的示例中是uaa（通过`uaatokenendpointclient`）。
- 刷新授权的结果将在下游作为新cookie使用，并将上游（对浏览器）设置为新cookie。

### 常见错误

以下是开发人员应该注意的主要事项的简要列表。

#### ***使用相同的签名密钥进行生产和转移***

严格建议尽可能使用不同的签名密钥。一旦签名密钥落入错误的手中，就可以在不知道任何用户的登录凭据的情况下生成完全访问授权密钥。

#### ***不使用TLS***

如果攻击者成功拦截了一个访问令牌，他将获得该令牌的所有授权，直到令牌到期。实现这一点有很多方法，特别是在没有TLS加密的情况下。在OAuth版本1的时代这不是问题，因为协议级加密是强制的。

#### ***在URL中使用访问令牌***

标准情况下，访问令牌可以通过URL、头文件或cookie传递。从TLS的角度来看，这三种方法都是安全的。实际上，通过URL传递令牌的安全性较低，因为有几种方法可以从记录中获取URL。

#### ***切换到对称签名密钥***

JWT签名不需要RSA，Spring Security也提供对称令牌签名。这也解决了一些问题，使开发更加困难。但这是不安全的，因为攻击者只需要进入一个微服务就可以生成自己的JWT令牌。

## <a name="inter-service-communication"></a> 4. 使用外部客户端确保服务间通信的安全

目前，只有JHipster UAA提供了一种可扩展的安全服务间通信方法。

使用JWT身份验证而不手动将JWT从请求转发到内部请求，会迫使微服务通过网关调用其他微服务，这涉及每个主请求的额外内部请求。但是，即使使用转发，也不可能完全分离用户和机器身份验证。

由于JHipster UAA是基于OAuth2的，所有这些问题都在协议定义上得到了解决。

本章介绍了如何轻松开始。

### 使用 Eureka, Ribbon, Hystrix 和 Feign

当一个服务想要从另一个服务请求数据时，最后这四个参与者都开始发挥作用。因此，重要的是，简要了解他们各自的责任：

* eureka：这是服务（un-）注册的地方，因此您可以请求“foo服务”，并获取在eureka中注册的foo服务实例的一组IP。

* Ribbon：当有人请求“foo服务”并且已经检索到一组IP时，Ribbon会在这些IP上进行负载平衡。

综上所述，当我们得到一个类似“http://uaa/oauth/token/”的URL，其中2个jhipster UAA服务器实例运行在10.10.10.1:9999和10.10.10.2:9999上时，我们可以使用eureka和功能区，使用循环算法将该URL快速转换为“http://10.10.10.1:9999/oauth/token”或“http://10.10.10.2:9999/oauth/token”。

* Hystrix：一个断路器系统，解决服务故障时的回退方案

* 装腔作势：以声明式使用所有这些内容

在现实中，所有要提供的服务的所有实例都没有保修。因此，Hystrix作为一个断路器，使用回退以一种定义明确的方式处理故障场景。

但是，手动地对所有这些东西进行布线和编码是一个很大的工作：FIGON提供了在 ***Eureka**** 中为端点注册的 ***Ribbon*** 负载平衡的REST客户端的选项，使用 ***Hystrix*** 来控制回退实现，不使用更多的Java接口和一些注释。

因此，对于跨业务的沟通，外来客户是非常有帮助的。当一个服务需要一个REST客户机来访问“其他服务”，为一些“其他资源”提供服务时，可以声明一个接口，如：

``` java
@FeignClient(name = "other-service")
interface OtherServiceClient {
  @RequestMapping(value = "/api/other-resources")
  List<OtherResource> getResourcesFromOtherService();
}
```

And then, using it via dependency injection, like:

``` java
@Service
class SomeService {
  private OtherServiceClient otherServiceClient;

  @Inject
  public SomeService(OtherServiceClient otherServiceClient) {
    this.otherServiceClient = otherServiceClient;
  }
}
```

与Spring Data JPA类似，不需要实现该接口。但是，如果你使用了Hystrix，你可以这样做。实现的虚客户端接口类充当回退实现。
一个悬而未决的问题是，要使用UAA确保此通信的安全性。为了实现这一点，应该有一些请求拦截器来执行来自OAuth的客户端凭证流，以授权当前服务请求其他服务。在Jhipster中，您只需使用`@authorizedFeignclients`。这是Jhipster提供的一个特殊注释，它确实做到了这一点。

### Using `@AuthorizedFeignClients`

考虑到上述Feign客户应被用于“其他服务”，即
服务于受保护的资源，接口必须按如下方式注释：

``` java
@AuthorizedFeignClient(name = "other-service")
interface OtherServiceClient {
  @RequestMapping(value = "/api/other-resources")
  List<OtherResource> getResourcesFromOtherService();
}
```

**注意**: 由于Spring Cloud中的一个bug，目前无法使用不同的
服务名称的符号，如

``` java

@AuthorizedFeignClient("other-service")
```

or

``` java

@AuthorizedFeignClient(value = "other-service")
```

当内存中没有有效的访问令牌时，REST客户机将自动获得UAA服务器的授权。

这种方法解决了当机器请求在不引用用户会话的单独OAuth客户机上运行时的场景。这一点很重要，特别是当实体审计用于由另一个服务中的另一个请求发出的请求时。作为替代方案，初始请求的访问令牌可以转发给其他调用。目前，Jhipster没有提供“默认解决方案”。

## <a name="testing"></a> 5. Testing UAA applications

### Mocking Feign clients

与外部客户机一起工作的组件应该是可测试的。以生产中使用的相同方式在测试中使用feign将强制jhipster注册表和UAA服务器启动并可访问运行测试的同一台计算机。但在大多数情况下，您不想测试假体本身是否正常工作（通常是这样），而是使用假体客户机测试组件。

为了测试组件，可以使用`@mockbean`，这是自1.4.0以来Spring引导的一部分。

下面是一个示例，测试“someservice”可以按预期工作，对客户机使用模拟值：

``` java

@RunWith(SpringRunner.class)
@SpringBootTest(App.class)
public class SomeServiceTest {

    @MockBean
    private OtherServiceClient otherServiceClient;

    @Inject
    private SomeService someService;

    @Test
    public void testSomeService() {
        given(otherServiceClient.getResourcesFromOtherService())
        .willReturn(Arrays.asList(new OtherResource(...));

        someService.performActionWhichInkvokesTheAboveMentionedMethod();

        //assert that your application is in the desired state
    }
}
```

因此，使用这项技术，您可以模拟其他服务的行为，并提供预期的资源实体，这些实体将来自于源站。
所有注入客户机的bean都将表现为模拟的，因此您可以关注这些bean的逻辑。

### Emulating OAuth2 认证

对其余控制器使用Spring的集成测试通常会绕过安全配置，因为这样做会使测试变得困难，而唯一的目的是证明控制器的功能是做它应该做的事情。但有时，测试控制器的安全行为也是测试的一部分。

对于这个用例，JHipster提供了一个名为“oauth2tokenmockUtil”的组件，该组件可以模拟有效的身份验证，而不必强制用户或客户端存在。

To use this feature, two things have to be done:

#### 1. Enabling security in the mock Spring MVC context and inject the mock util

``` java

    @Inject
    private OAuth2TokenMockUtil tokenUtil;

    @PostConstruct
    public void setup() {
        this.restMockMvc = MockMvcBuilders
            .webAppContextSetup(context)
            .apply(springSecurity())
            .build();

    }
```

***In this test no single instance of the controller has to be mocked, but the
application's `WebApplicationContext`***

#### 2. Using the `OAuth2TokenMockUtil`

The util offers a method "oaut2authentication", which is usable to MockMvc "with" notation. Currently it can be configured to mock a authentication with the following fields:

* username
* roles (Set<String>)
* scope (Set<String>)

Here is an example:

``` java

@Test
public void testInsufficientRoles() {
    restMockMvc.peform(
        get("url/requiring/ADMIN/role")
        .with(tokenUtil.oauth2Authentication("unpriveleged.user@example.com", Sets.newSet("some-scope"), Sets.newSet("ROLE_USER")))
    ).andExpect(status().isForbidden());
}
```

[RBAC]: https://de.wikipedia.org/wiki/Role_Based_Access_Control
[ABAC]: https://en.wikipedia.org/wiki/Attribute-Based_Access_Control
