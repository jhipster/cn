---
layout: default
title: 使用JHipster UAA提供微服务安全
permalink: /using-uaa/
redirect_from:
  - /security.html
sitemap:
    priority: 0.7
    lastmod: 2016-08-25T00:00:00-00:00
---
# <i class="fa fa-lock"></i>使用JHipster UAA提供微服务安全

JHipster UAA是使用OAuth2授权协议的保护JHipster微服务安全的用户审计和授权服务。

JHipster UAA与其他"UAA"（例如[Cloudfoundry UAA](https://github.com/cloudfoundry/uaa)）的区别在于，JHipster UAA是一个完全可配置的OAuth2授权服务器，其中包含用户和角色端点，并包装在普通的JHipster应用程序中。这使开发人员可以深度配置其用户域的各个方面，而不会限制其他即用型UAA的策略。

## 概要

1. [架构图](#architecture_diagram)
2. [微服务架构的安全性要求](#claims)
3. [在这种情况下了解OAuth2](#oauth2)
4. [使用JHipster UAA](#jhipster-uaa)
  * 基本设定
  * 了解组件
  * 刷新令牌
  * 常见错误
5. [使用Feign客户端保护服务间通信](#inter-service-communication)
  * 使用Eureka, Ribbon, Hystrix和Feign
  * 使用`@AuthorizedFeignClients`
6. [测试UAA应用程序](#testing)
  * 模拟Feign客户端
  * 模拟OAuth2身份验证

## <a name="architecture_diagram"></a> 架构图

<img src="{{ site.url }}/images/microservices_architecture_detail.002.png" alt="Diagram" style="width: 800; height: 600" class="img-responsive"/>

## <a name="claims"></a> 1. 微服务架构的安全性要求

在深入研究OAuth2及其在JHipster微服务上的应用之前，重要的是要弄清楚可靠的安全解决方案的要求。

### 1. 中央认证

由于微服务主要用于构建独立的自主应用程序，因此我们希望获得一致的身份认证体验，因此用户不会注意到自己的请求由具有单独安全配置的其他应用程序来处理。

### 2. 无状态

构建微服务的核心好处是可伸缩性。因此，所选的安全解决方案不应对此产生影响。在服务器上保持用户会话状态变得很棘手，因此在这种情况下，高度首选无状态解决方案。

### 3. 用户/机器访问权限的区别

需要清楚地区分不同的用户以及不同的机器。使用微服务架构会导致构建具有不同域和资源的大型多功能数据中心，因此需要限制不同客户端（例如本机应用程序，多个SPA等）的访问权限。

### 4. 细粒度的访问控制

在维护集中角色的同时，需要在每个微服务中配置详细的访问控制策略。微服务不应该担任识别用户的责任，而必须仅授权传入的请求。

### 5. 免受攻击

无论安全解决方案可以解决多少问题，它都应尽可能抵御漏洞。

### 6. 可扩展

使用无状态协议并不保证该安全解决方案可扩展。最后，不应有任何单点故障。一个反例是共享的身份验证数据库或单个auth-server-instance，每个请求都会命中一次。

## <a name="oauth2"></a> 2. 在这种情况下了解OAuth2

使用OAuth2协议（请注意：这是一个**协议**，不是框架，不是应用程序）可以满足所有6项声明。它遵循严格的标准，这使得该解决方案也与其他微服务以及远程系统兼容。JHipster基于以下安全设计提供了两种解决方案：

![JHipster UAA architecture]({{ site.url }}/images/jhipster_uaa.png)

* 对架构任何端点的每个请求都是通过"client"执行的
* "client"是"Angular $http client"，"REST-Client"， "curl"或任何能够执行请求的东西的抽象词。
* "client"也可以与用户身份验证结合使用，例如前端客户端应用程序中的Angular $http
* 端点（包括UAA）上服务资源的每个微服务都是资源服务器
* 蓝色箭头显示客户端在Oauth授权服务器上进行身份验证
* 绿色箭头显示客户端在资源服务器上执行的请求
* UAA服务器是授权服务器和资源服务器的组合
* UAA服务器是微服务应用程序内所有数据的所有者（它会自动批准对资源服务器的访问）
* 通过用户身份验证访问资源的客户端，使用带有客户端ID的"password grant"进行身份验证，并安全存储在网关配置文件中
* 在没有用户的情况下访问资源的客户端使用"client credentials grant"进行身份验证
* 每个客户端都在UAA中定义（Web应用，内部，…）

该设计可以应用于独立于语言或框架的任何微服务体系结构。

另外，可以将以下规则应用于访问控制：

* 使用 "roles"和[RBAC][]配置用户访问
* 使用"scopes"和[RBAC][]配置计算机访问
* 使用[ABAC][]，在"roles"和"scopes"上都使用布尔表达式来表示复杂的访问配置

  * 示例: hasRole("ADMIN")与hasScope("shop-manager.read", "shop-manager.write")

## <a name="jhipster-uaa"></a> 3. 使用JHipster UAA

搭建JHipster微服务时，您可以选择UAA选项替代JWT身份验证。

**注意**：UAA解决方案也使用了JWT，使用默认的Spring Cloud Security, JWT可自定义配置。

### 基本设定

最基本的设置包括：

1. JHipster UAA服务器（作为应用程序类型）
2. 至少一个其他微服务（使用UAA身份验证）
3. JHipster网关（使用UAA身份验证）

这是生成它的顺序。

除身份验证类型外，还必须提供UAA的路径。

对于非常基本的用法，此设置的工作方式与JWT身份验证类型的工作方式相同，但是具有一项额外的服务。

### 了解组件

JHipster UAA服务器可以立即完成三件事：

* 它服务于默认的JHipster用户域，其中包含用户和帐户资源（由JWT身份验证中的网关完成）
* 它为OAuth2实现`AuthorizationServerConfigurerAdapter`，并定义了基本客户端（"web_app"和"internal"）
* 它在`/oauth/token_key`上提供JWT公钥，所有其他微服务都必须使用它

开发人员可以选择数据库，缓存解决方案，搜索引擎，构建工具以及其他JHipster选项。

微服务启动时，通常期望UAA服务器已经启动以共享其公钥。该服务首先调`/oauth/token_key`来获取公用密钥并对其进行配置以进行密钥签名（`JwtAccessTokenConverter`）。

如果UAA没有启动，则应用程序将继续启动并在以后获取公共密钥。有两个属性-`uaa.signature-verification.ttl`控制密钥在再次获取之前的生存时间，`uaa.signature-verification.public-key-refresh-rate-limit`限制了对UAA的请求以避免发送无用请求。这些值通常保留为其默认值。无论如何，如果验证失败，则微服务将检查是否有新密钥。这样，可以在UAA上更换密钥，并且服务将会同步。

至此，在此基本设置中可能会发生两种用例：用户调用和机器调用。

对于用户请求，登录请求将发送到网关的`/auth/login`端点。该端点使用`OAuth2TokenEndpointClientAdapter`将请求发送给UAA，并使用"password"授权进行身份验证。由于此请求发生在网关上，因此客户端ID和密码不会存储在任何客户端代码中，并且用户无法访问。网关返回一个包含token的新Cookie，该Cookie与客户端执行的每个请求一起发送到JHipster后端。

对于机器调用，机器必须使用客户端凭据授予作为UAA进行身份验证。JHipster提供了一种标准解决方案，在[secure inter-service-communication using feign clients](#inter-service-communication)中有详细描述

### 刷新令牌

刷新访问令牌的一般流程在网关上进行，如下所示：

- 身份验证是通过`AuthResource`调用`OAuth2AuthenticationService`的身份验证来完成的，该身份验证将设置Cookie。
- 对于每个请求，`RefreshTokenFilter`（由`RefreshTokenFilterConfigurer`生成）检查访问令牌是否已过期以及它是否具有有效的刷新令牌。
- 如果是这样，则它将通过`OAuth2AuthenticationService` refreshToken触发刷新过程。
- 这使用`OAuth2TokenEndpointClient`接口将刷新令牌授权发送到所选的OAuth2服务器，在我们的示例中为UAA（通过`UaaTokenEndpointClient`）。
- 然后，刷新授予的结果将在下游用作新cookie，并在上游（对于浏览器）将其设置为新cookie。

### 常见错误

这是开发人员应注意的重要事项的简要列表。

#### ***生产环境和脚手架中在使用相同的签名密钥***

强烈建议尽可能使用不同的签名密钥。一旦签名密钥被人使用，就有可能在不知道任何用户登录凭据的情况下生成完全访问授权密钥。

#### ***不使用TLS***

如果攻击者设法拦截访问令牌，则他将获得对该令牌授权的所有权限，直到令牌过期。有很多方法可以实现这一点，尤其是在没有TLS加密的情况下。在OAuth版本1的时代，这不是问题，因为强制进行协议级加密。

#### ***在URL中使用访问令牌***

按照标准，访问令牌可以通过URL，HTTP头部或cookie传递。从TLS的角度来看，所有三种方式都是安全的。实际上，通过URL传递令牌的安全性较差，因为存在几种从记录中获取URL的方法。

#### ***切换到对称签名密钥***

JWT签名不需要RSA，Spring Security确实也提供对称令牌签名。这也解决了一些使开发更加困难的问题。但这是不安全的，因为攻击者只需要进入一个微服务就可以生成自己的JWT令牌。

## <a name="inter-service-communication"></a> 4. 使用Feign客户端进行安全的服务间通信

当前，只有JHipster UAA提供了一种可扩展的安全服务间通信方法。

在不手动将JWT从请求转发到内部请求的情况下, 使用JWT身份验证会迫使微服务通过网关调用其他微服务，这涉及到每个主请求中的其他内部请求。但是即使进行转发，也无法完全区分用户身份验证和计算机身份验证。

由于JHipster UAA基于OAuth2，因此所有这些问题都可以通过协议定义解决。

本章介绍如何轻松地开始使用它。

### 使用 Eureka, Ribbon, Hystrix和Feign

当一个服务要向另一个服务请求数据时，最终这四个组件都开始起作用。因此，重要的是要简短地了解，每个组件具体负责了什么：

* Eureka: 这是服务（取消）注册的地方，因此您可以询问"foo-service"，并获取在Eureka中注册的foo-service实例的一组IP。
* Ribbon: 当有人要"foo-service"并已经检索到一组IP时，Ribbon会在这些IP上进行负载均衡。

综上所述，当我们获得一个URL，例如"http://uaa/oauth/token/"，其中有两个运行在10.10.10.1:9999和10.10.10.2:9999上的JHipster UAA服务器实例时，我们可以使用Eureka和Ribbon使用Round Robin算法将该网址快速转换为"http://10.10.10.1:9999/oauth/token"或"http://10.10.10.2:9999/oauth/token"。

* Hystrix: 解决服务故障的断路器系统
* Feign: 以声明式使用所有这些组件

在现实世界中，不保证所有服务的所有实例都可用。因此，Hystrix充当断路器，使用后备以明确定义的方式处理故障情况。

但是，手动实现所有这些逻辑并进行编码将会带来很多工作：***Feign***提供了为在***Eureka***中注册的端点负载均衡REST客户端的选项，其后备实现由***Hystrix***控制，仅使用带有一些注解的Java接口即可。

因此，对于服务间通信，Feign客户非常有帮助。当一项服务需要REST客户端访问提供某些"其他资源"的"其他服务"时，可以声明如下接口：

``` java
@FeignClient(name = "other-service")
interface OtherServiceClient {
  @RequestMapping(value = "/api/other-resources")
  List<OtherResource> getResourcesFromOtherService();
}
```

然后，通过依赖项注入使用它，例如：

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

与Spring Data JPA相似，不需要实现该接口。但是，如果使用Hystrix，则可以这样做。Feign客户端接口的已实现类并充当后备实现。

一个未解决的问题是，使用UAA确保这种通信的安全性。为此，应该有一些Feign的请求拦截器，该拦截器实现了来自OAuth的客户端凭据流，以授权当前服务请求其他服务。在JHipster中，您只使用`@AuthorizedFeignClients`。这是JHipster提供的特殊注解，它也确实实现了这一点。

### 使用`@AuthorizedFeignClients`

考虑到上述Feign客户端应用于提供受保护资源的"other-service"，因此必须对接口进行如下注解：

``` java
@AuthorizedFeignClient(name = "other-service")
interface OtherServiceClient {
  @RequestMapping(value = "/api/other-resources")
  List<OtherResource> getResourcesFromOtherService();
}
```

**注意**：由于Spring Cloud中的Bug，目前无法使用其他名称作为服务名称，因为

``` java
@AuthorizedFeignClient("other-service")
```

或者

``` java
@AuthorizedFeignClient(value = "other-service")
```

当内存中没有有效的访问令牌时，REST客户端会自动获得您的UAA服务器的授权。

此方法解决了以下情况：机器请求在单独的OAuth客户端上运行而不引用用户会话。这一点很重要，尤其是当对另一个服务中另一个请求发出的请求使用实体审核时。或者，可以将初始请求的访问令牌转发到其他呼叫。当前，JHipster没有提供"default solution"。

## <a name="testing"></a> 5. 测试UAA应用程序s

### 模拟Feign客户端

与Feign客户一起使用的组件应该是可测试的。在测试中使用Feign的方式与在生产环境中使用方式相同，将迫使JHipster Registry和UAA服务器启动并可以在运行测试的同一台计算机上访问。但是在大多数情况下，您不需要测试Feign本身是否正常工作（通常可以），而是要使用Feign客户端来测试您的组件。

使用`@MockBean`可以测试内部使用伪客户端的组件，该组件是1.4.0版本以来的Spring Boot的一部分。

下面是一个示例，使用客户端的模拟值测试`SomeService`可以正常工作：

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

因此，使用此技术，您将模拟其他服务的行为，并提供预期的资源实体，该资源实体将来自源代码。所有注入客户端的Bean的行为都将被模拟，因此您可以专注于这些Bean的逻辑。

### 模拟OAuth2身份验证

使用Spring针对REST控制器的集成测试通常会绕过安全配置，因为这样做会使测试变得困难，而这仅是为了证明控制器可以正常工作。但是有时候，测试控制器的安全行为也是测试的一部分。

对于此用例，JHipster提供了一个名为`OAuth2TokenMockUtil`的组件，该组件可以模拟有效的身份验证，而不必强制用户或客户端存在。

要使用此功能，必须完成两件事：s

#### 1. .在模拟Spring MVC上下文中启用安全性并注入模拟util

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

***在此测试中，无需模拟控制器的单个实例，除了应用程序的`WebApplicationContext`***

#### 2. 使用`OAuth2TokenMockUtil`

该实用程序提供了一种 "oaut2authentication"方法，该方法可用于"with"表示法的MockMvc。当前，可以将其配置为使用以下字段来模拟身份验证：

* username
* roles (Set<String>)
* scope (Set<String>)

这是一个例子：

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
