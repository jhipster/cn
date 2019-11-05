---
layout: default
title: 使用缓存
permalink: /using-cache/
sitemap:
    priority: 0.7
    lastmod: 2017-02-10T18:40:00-00:00
---

# <i class="fa fa-line-chart"></i> 使用缓存

缓存可以在JHipster中用于两个级别：

- 使用Spring Cache抽象，这是生成应用程序时的一个特定问题，并且使用Spring Boot `@EnableCaching`注解。这需要根据您的特定业务需求进行调整，并且比Hibernate 2级缓存更高级。
- 作为Hibernate 2级缓存，缓存解决方案可以极大地提高应用程序的性能，这就是人们通常使用JHipster所做的。请注意，如果您选择使用Spring Cache，则此选项仅适用于SQL数据库。

Spring Cache和Hibernate 2级缓存将使用相同的缓存解决方案，但不能在同一级别上使用：我们不建议对同一对象同时使用这两个缓存，因为这会使缓存失效问题更加复杂。相反，我们建议您使用：

- Spring Cache用于更高级别或聚合的对象，就像您通常使用的DTO一样
- 用于映射到数据库的实体的Hibernate 2级缓存，以减少SQL请求的数量

JHipster支持5种缓存实现：Ehcache，Caffeine，Hazelcast，Infinispan和Memcached。它们都在下面详细说明。

## 通用配置

缓存是在`CacheConfiguration`类中配置的，也可以使用JHipster[通用应用程序属性]({{ site.url }}/common-application-properties/)进行调整。

## 使用Ehcache缓存

[Ehcache](http://www.ehcache.org/)是​​JHipster生成monoliths应用的默认缓存。Ehcache易于设置和配置，并且启动速度非常快，因此它是"常规"monoliths的完美解决方案。

使用JHipster，Ehcache无法作为分布式缓存使用，因为它没有允许以编程方式添加新节点的API

Ehcache是​​在`CacheConfiguration` Spring配置bean中配置的，该配置bean在JHipster[通用应用程序属性]({{ site.url }}/common-application-properties/)中定义了2个属性（`time-to-live-seconds`和`max-entries`）。可以在应用程序的特定`ApplicationProperties` Spring配置bean中添加更多属性。

默认情况下，在`dev`和`prod`模式下，`time-to-live-seconds`的默认值均为3600秒（1小时），在`dev`模式下`max-entries`的默认值为100项，在生产模式下的默认值为1000项。

这些值应根据您的特定业务需求进行调整，并且JHipster监视屏幕可以帮助您更好地了解应用程序中的缓存使用情况。另请参阅Ehcache文档以微调这些值。

## 使用Caffeine缓存

[Caffeine](https://github.com/ben-manes/caffeine)是一种[高性能](https://github.com/ben-manes/caffeine/wiki/Benchmarks)、[接近最佳](https://github.com/ben-manes/caffeine/wiki/Efficiency)的缓存库，是EHcache的替代品，可用于JHipster中的monoliths应用。

与Ehcache类似，Caffeine无法用作分布式缓存。

Jhipster会为Caffeine生成与Ehcache相同的默认配置。但是，您可能希望添加其他选项以根据需要进行微调。Caffeine缓存配置是在`CacheConfiguration` Spring配置bean中完成的，而您的应用程序特定的属性可以添加到`ApplicationProperties` bean中。您可能会发现以下三个文件对于定义自己的Caffeine配置很有用。

- 我们在`CacheConfiguration` bean中使用[`CaffeineConfiguration`](https://github.com/ben-manes/caffeine/blob/master/jcache/src/main/java/com/github/benmanes/caffeine/jcache/configuration/CaffeineConfiguration.java)类来添加Caffeine属性。
- 您可能会发现[`TypesafeConfigurator`](https://github.com/ben-manes/caffeine/blob/master/jcache/src/main/java/com/github/benmanes/caffeine/jcache/configuration/TypesafeConfigurator.java)以及 [`reference.conf`](https://github.com/ben-manes/caffeine/blob/master/jcache/src/main/resources/reference.conf)作为对所有受支持的Caffeine属性的引用。

## 使用Hazelcast缓存

[Hazelcast](https://hazelcast.com/)可以用作本地缓存（如Ehcache），但也可以用作分布式缓存。结果是：

- 这是微服务的默认选项，因为我们希望微服务能够扩展
- 这是网关的默认选项，因为我们希望它们能够扩展，并且因为Hazelcast可以用于分布[网关速率限制信息]({{ site.url }}/api-gateway/#rate_limiting)
- 当在monolith中使用时，Hazelcast需要具有[JHipster Registry]({{ site.url }}/jhipster-registry/)选项才能扩展

对于扩展应用程序，Hazelcast将使用配置的服务发现来查找新节点并水平扩展。对于微服务和网关，这将与JHipster Registry和Consul一起使用，而对于monolith，则仅与JHipster Registry一起使用。

添加新节点后，它将在服务发现中注册自己（例如，它将在JHipster Registry中可用），并寻找相同类型的其他节点。如果找到一个或多个相同类型的节点，它将使用它们创建一个集群缓存：您应该在每个节点的日志中看到一条消息，如以下示例所示：

    [172.18.0.10]:5701 [dev] [3.7]
    Members [4] {
    Member [172.18.0.10]:5701 - 3cbddfcd-0229-4cd5-be55-4611927a9071 this
    Member [172.18.0.5]:5701 - 204d457d-f6fe-43f2-8e8d-497e96b3f08e
    Member [172.18.0.14]:5701 - 7804d535-86fb-46be-b2a5-d7801dc6a4df
    Member [172.18.0.11]:5701 - 6114ae28-56cd-4840-a575-4d73a6003744
    }

为了更好地使用Hazelcast，JHipster包括对Hazelcast管理中心的支持：

- 请注意，您只能免费监控2个节点，因为这是商业产品。但这已经足以测试您的应用程序。
- 在`application-dev.yml`和`application-prod.yml`文件中，参考JHipster[常用应用程序属性]({{ site.url }}/common-application-properties/)，通过键`jhipster.cache.hazelcast.management-center`对其进行配置。请注意，默认情况下它是禁用的。
- JHipster生成了Docker Compose配置以轻松运行Hazelcast管理中心。请阅读我们的[Docker Compose文档]({{ site.url }}/docker-compose/)，然后使用`docker-compose -f src/main/docker/hazelcast-management-center.yml up -d`运行该应用程序。

## 使用Infinispan缓存

[Infinispan](http://infinispan.org/)是一种高性能的缓存解决方案，可以用作内存中的本地缓存以及群集缓存。它支持多种缓存模式，

  - [本地](http://infinispan.org/docs/stable/user_guide/user_guide.html#local_mode)
  - [invalidation](http://infinispan.org/docs/stable/user_guide/user_guide.html#invalidation_mode)
  - [分布式](http://infinispan.org/docs/stable/user_guide/user_guide.html#replicated_mode)
  - [复制](http://infinispan.org/docs/stable/user_guide/user_guide.html#distribution_mode)

通过JHipster，Infinispan可以被用于：

- 作为Spring Cache抽象的实现
- 作为Hibernate 2级缓存

以下是预配置的默认配置：

- 实体以invalidation缓存模式运行
- 对于特定于应用程序的缓存，预定义了三种缓存配置
  - **local-app-data** 用于缓存节点本地的数据
  - **dist-app-data** 用于跨节点的分布式数据缓存（由分布式副本数确定的副本数）
  - **repl-app-data** 用于跨节点复制数据

可以使用JHipster[通用应用程序属性]({{ site.url }}/common-application-properties/)，微调缓存中每个独立操作模式的对象逐出，生存时间和最大条目数，以及分布式模式的副本数。微调`jhipster.cache.infinispan`中的属性以用于特定于应用程序的缓存，并微调`spring.jpa.properties`以用于Hibernate的第二级缓存。

如果启用了JHipster Registry，将在Registry中注册主机列表。如果未启用JHipster Registry，则主机发现将基于Infinispan Jar中打包的`config-file`中定义的默认传输设置。Infinispan原生发现支持大多数平台（例如Kubernets/OpenShift，AWS，Azure和Google）。

尽管Infinispan 9.0.0.Final GA和更高版本，通过使用本机KUBE_PING发现，增加了对在Kubernetes和OpenShift上运行Infinispan嵌入式缓存应用程序的支持，但Hibernate依赖项尚未更新至9.x版本，因此不支持在Kubernetes和OpenShift本机发现。但是，您可以通过使用JHipster Registry进行实例发现来运行应用程序。

## 使用Memcached缓存

[Memcached](https://memcached.org/)是一个开源分布式缓存。它与JHipster支持的其他缓存实现完全不同：

- Memcached不能用作Hibernate 2级缓存，它仅支持Spring Cache抽象。
- Memcached在远程服务下运行，没有本地缓存​​。这样，您的对象始终会通过网络进行序列化/反序列化，这意味着如果您的对象集很小，很容易放入内存中，效率反而可能会降低。
- 它非常易于扩展，并且托管成本低。大多数大型云提供商（如Heroku，GCP或AWS）都支持Memcached。这样，拥有分布式（且便宜）的Memcached集群比使用其他缓存实现要容易得多。

JHipster将流行的[Xmemcached](https://github.com/killme2008/xmemcached) Java客户端用于Memcached，并使用通常的JHipster[通用应用程序属性]({{ site.url }}/common-application-properties/)来配置其最重要的属性。

请注意，每个高速缓存必须在`CacheConfiguration`配置Bean中配置为特定的Spring Bean。

由于Memcached需要在其类加载器中对对象进行序列化/反序列化，因此在使用Spring Boot devtools（使用特定的类加载器对应用程序类进行热重装）时，该功能不起作用。这就是在开发人员模式下默认禁用Memcached的原因。

JHipster依然如往日一样提供了Docker Compose配置，因此您可以轻松地在计算机上启动Memcached服务器。为了使用它，请运行`docker-compose -f src/main/docker/memcached.yml up -d`。

## 使用Redis缓存

[Redis](https://redis.io/)是一个开源的内存数据结构存储，可以用作高性能缓存解决方案。当前，它在生成器JHipster中作为单个服务器节点实现，但也可以作为分布式缓存使用。

JHipster使用[Redisson](https://redisson.org/)作为Redis Java客户端主要有两个原因：
- Redis强烈推荐
- 它提供了一个的JCache（JSR-107）的实现

由于我们在可用时使用JCache实现，因此这两者都可以与其他缓存保持一致，并在Spring缓存和Hibernate 2级缓存之间共享相同的Redis连接。