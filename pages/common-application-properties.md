---
layout: default
title: 通用应用程序属性
permalink: /common-application-properties/
sitemap:
    priority: 0.7
    lastmod: 2018-03-18T18:20:00-00:00
---

# <i class="fa fa-flask"></i> 通用应用程序属性

JHipster生成一个Spring Boot应用程序，并且可以使用标准的Spring Boot属性机制进行配置。

这些属性是由JHipster在生成时配置的，并且在开发和生产模式中通常具有不同的值：请在我们的[Profiles文档]({{ site.url }}/profiles/)中了解有关此属性的更多信息。

在JHipster应用程序中，存在三种属性：

1. [Spring Boot标准应用程序属性](#1)
2. [JHipster应用程序属性](#2)
3. [应用程序特殊属性](#3)

## <a name="1"></a> Spring Boot标准应用程序属性

与其他任何Spring Boot应用程序一样，JHipster允许您配置任何标准[Spring Boot应用程序属性](http://docs.spring.io/spring-boot/docs/current/reference/html/common-application-properties.html)。

## <a name="2"></a> JHipster应用程序属性

JHipster提供来自[JHipster服务器端库](https://github.com/jhipster/jhipster)的特定应用程序属性。这些属性是所有JHipster项目的标准属性，但是其中一些属性仅取决于您在构建应用程序时选择的属性：例如，`jhipster.cache.hazelcast`键仅在您选择Hazelcast作为第二级Hibernate缓存时才有效。

这些属性是使用`io.github.jhipster.config.JHipsterProperties`类配置的。

这是这些属性的文档：
```YAML
    jhipster:

        # 在JHipster中用于异步方法调用的线程池
        async:
            core-pool-size: 2 # 初始池大小
            max-pool-size: 50 # 最大池大小
            queue-capacity: 10000 # 池的队列容量

        # JHipster网关的特定配置
        # 有关JHipster网关的更多信息，请参见https://www.jhipster.tech/api-gateway/
        gateway:
            rate-limiting:
                enabled: false # 速率限制默认为禁用
                limit: 100_000L # 默认情况下，我们允许100,000个API调用
                duration-in-seconds: 3_600 # 默认情况下，每小时限制速率会重新初始化
            authorized-microservices-endpoints: # 访问控制策略，如果将路由留空，则所有端点均可访问
                app1: /api # 建议的prod配置，它允许从"app1"微服务访问所有API调用

        # HTTP configuration
        http:
            cache: # 由io.github.jhipster.web.filter.CachingHttpHeadersFilter使用
                timeToLiveInDays: 1461 # 静态资源默认缓存4年

        # Hibernate 2级缓存，由CacheConfiguration使用
        cache:
            hazelcast: # Hazelcast配置
                time-to-live-seconds: 3600 # 默认情况下，对象在缓存中停留1小时
                backup-count: 1 # 对象备份数
                # 配置Hazelcast管理中心
                # 完整的参考资料可在以下网址获得：http://docs.hazelcast.org/docs/management-center/3.9/manual/html/Deploying_and_Starting.html
                management-center:
                    enabled: false # 默认情况下，Hazelcast管理中心处于禁用状态
                    update-interval: 3 # 默认情况下，更新每3秒钟将发送到Hazelcast管理中心
                    # 使用JHipster的Docker Compose配置时Hazelcast管理中心的默认URL
                    # 参见src/main/docker/hazelcast-management-center.yml
                    # 警告，默认端口为8180，因为JHipster已使用端口8080
                    url: http://localhost:8180/mancenter
            ehcache: # Ehcache配置
                time-to-live-seconds: 3600 # 默认情况下，对象在缓存中停留1小时
                max-entries: 100 # 每个高速缓存条目中的对象数
            caffeine: # Caffeine配置
                time-to-live-seconds: 3600 # 默认情况下，对象在缓存中停留1小时
                max-entries: 100 # 每个高速缓存条目中的对象数   
            infinispan: #Infinispan配置
                config-file: default-configs/default-jgroups-tcp.xml
                # 本地应用程序缓存
                local:
                    time-to-live-seconds: 60 # 默认情况下，对象在缓存中保留1小时（以分钟为单位）
                    max-entries: 100 # 每个高速缓存条目中的对象数
                #分布式应用程序缓存
                distributed:
                    time-to-live-seconds: 60 # 默认情况下，对象在缓存中保留1小时（以分钟为单位）
                    max-entries: 100 # 每个高速缓存条目中的对象数
                    instance-count: 1
                #复制的应用程序缓存
                replicated:
                    time-to-live-seconds: 60 # 默认情况下，对象在缓存中保留1小时（以分钟为单位）
                    max-entries: 100 # 每个高速缓存条目中的对象数
            # Memcached配置
            # 使用Xmemcached库，请参阅https://github.com/killme2008/xmemcached
            memcached:
                # 默认情况下在dev模式下禁用，因为它不适用于Spring Boot devtools
                enabled: true
                servers: localhost:11211 # 用逗号或空格分隔的服务器地址列表
                expiration: 300 # 缓存的过期时间（以秒为单位）
                use-binary-protocol: true # 建议使用二进制协议以提高性能（和安全性）
                authentication: # 如果需要身份验证，则可以使用以下参数进行设置。 默认禁用
                    enabled: false,
                    # username: 默认未设置
                    # password: 默认未设置
            redis: # Redis 配置
                expiration: 3600 # 默认情况下，对象在缓存中保留1小时（以秒为单位）
                server: redis://localhost:6379 # 服务器地址
                cluster: false
                connectionPoolSize: 64,
                connectionMinimumIdleSize: 24,
                subscriptionConnectionPoolSize: 50,
                subscriptionConnectionMinimumIdleSize: 1 

        # E-mail属性
        mail:
            enabled: false # 如果启用了电子邮件发送。需要配置标准的`spring.mail`键
            from: jhipster@localhost # 电子邮件的默认"from"地址
            base-url: http://127.0.0.1:8080 # 应用程序的URL，在电子邮件中使用

        # Spring Security特定的配置
        security:
            remember-me: # JHipster的"记住我"机制的安全实现，用于基于会话的身份验证
                # 安全密钥（此密钥对于您的应用程序应该是唯一的，并且应保密）
                key: 0b32a651e6a65d5731e869dc136fb301b0a8c0e4
            authentication:
                jwt: # JHipster特定的JWT实现
                    # 秘密令牌应使用Base64进行编码（您可以在命令行中输入`echo 'secret-key'|base64`）。
                    # 如果同时配置了这两个属性，则`secret`属性的优先级高于`base64-secret`属性。
                    secret: # JWT明文密钥（不推荐）
                    base64-secret:  # 使用Base64编码的JWT秘密密钥（推荐）
                    token-validity-in-seconds: 86400 # 令牌有效期为24小时
                    token-validity-in-seconds-for-remember-me: 2592000 # Remember me令牌有效期为30天

        # Swagger配置
        swagger:
            default-include-pattern: /api/.*
            title: JHipster API
            description: JHipster API documentation
            version: 0.0.1
            terms-of-service-url:
            contact-name:
            contact-url:
            contact-email:
            license:
            license-url:
            host:
            protocols:

        # DropWizard Metrics配置，由MetricsConfiguration使用
        metrics:
            jmx: # 将指标导出为JMX Bean
                enabled: true # 默认情况下启用JMX
            # 将指标发送到Graphite服务器
            # 使用"graphite" Maven配置文件来具有Graphite依赖项
            graphite:
                enabled: false # 默认情况下禁用Graphite
                host: localhost
                port: 2003
                prefix: jhipster
            # 将指标发送到Prometheus服务器
            prometheus:
                enabled: false # 默认情况下禁用Prometheus
                endpoint: /prometheusMetrics
            logs: # 在日志中报告Dropwizard指标
                enabled: false
                reportFrequency: 60 # 报告频率（以秒为单位）

        # 日志记录配置，由LoggingConfiguration使用
        logging:
            logstash: # 通过socket将日志转发到Logstash
                enabled: false # 默认情况下禁用Logstash
                host: localhost # Logstash服务器URL
                port: 5000 # Logstash服务器端口
                queue-size: 512 # 队列缓存日志
            spectator-metrics: # 在日志中报告Netflix Spectator指标
                enabled: false # Spectator默认是禁用的

        # 默认情况下，跨域资源共享（CORS）在"dev"模式下的monoliths和网关上启用
        # 出于安全原因和微服务的考虑，默认情况下在"prod"模式下将其禁用
        # （因为您应该使用网关来访问它们）。
        # 这将配置标准的org.springframework.web.cors.CorsConfiguration
        # 请注意，"exposed-headers"对于基于JWT的安全性是强制性的，它使用
        # "Authorization"头部，这不是默认的暴露头部。
        cors:
            allowed-origins: "*"
            allowed-methods: "*"
            allowed-headers: "*"
            exposed-headers: "Authorization"
            allow-credentials: true
            max-age: 1800

        # Ribbon显示在JHipster应用程序的左上方
        ribbon:
            # 以逗号分隔的显示ribbon的配置文件列表
            display-on-active-profiles: dev
```
## <a name="3"></a> 应用程序特殊属性

您生成的应用程序还可以具有自己的Spring Boot属性。强烈建议这样做，因为它允许对应用程序进行类型安全的配置，以及IDE中的自动完成和文档。

JHipster已在`config`包中生成了一个`ApplicationProperties`类，该类已经预先配置，并且已经在文件`application.yml`, `application-dev.yml`和`application-prod.yml`的底部进行了说明。您所需要做的就是编写自己的特定属性。