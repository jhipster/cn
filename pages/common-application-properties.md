---
layout: default
title: 常用应用程序属性
permalink: /common-application-properties/
sitemap:
    priority: 0.7
    lastmod: 2018-03-18T18:20:00-00:00
---

# <i class="fa fa-flask"></i> 常用应用程序属性

JHipster生成一个Spring引导应用程序，可以使用标准的Spring引导属性机制进行配置。

这些属性是由jhipster在生成时配置的，并且在开发和生产模式中通常具有不同的值：在我们的[Profiles documentation]({{ site.url }}/profiles/)中了解更多信息。

在JHipster应用程序中，有三种属性：

1. [Spring Boot standard application properties](#1)
2. [JHipster application properties](#2)
3. [Application-specific properties](#3)

## <a name="1"></a> Spring Boot标准应用属性

与任何Spring Boot应用程序一样，JHipster允许您配置任何标准 [Spring Boot application property](http://docs.spring.io/spring-boot/docs/current/reference/html/common-application-properties.html).

## <a name="2"></a> JHipster应用属性

JHipster提供特定的应用程序属性，这些属性来自[JHipster server-side library](https://github.com/jhipster/jhipster). 这些属性是所有JHipster项目的标准属性，但其中一些属性仅根据您在构建应用程序时选择的内容工作: 例如 `jhipster.cache.hazelcast` 键仅在您选择Hazelcast作为二级Hibernate缓存时工作。.

这些属性是使用 `io.github.jhipster.config.JHipsterProperties`类配置的。

以下是这些属性的文档：

    jhipster:

        # Thread pool that will be used for asynchronous method calls in JHipster
        async:
            core-pool-size: 2 # Initial pool size
            max-pool-size: 50 # Maximum pool size
            queue-capacity: 10000 # Queue capacity of the pool

        # Specific configuration for JHipster gateways
        # See https://www.jhipster.tech/api-gateway/ for more information on JHipster gateways
        gateway:
            rate-limiting:
                enabled: false # Rate limiting is disabled by default
                limit: 100_000L # By default we allow 100,000 API calls
                duration-in-seconds: 3_600 # By default the rate limiting is reinitialized every hour
            authorized-microservices-endpoints: # Access Control Policy, if left empty for a route, all endpoints will be accessible
                app1: /api # recommended prod configuration, it allows the access to all API calls from the "app1" microservice

        # HTTP configuration
        http:
            # V_1_1 for HTTP/1.1 or V_2_0 for HTTP/2.
            # To use HTTP/2 you will need SSL support (see the Spring Boot "server.ssl" configuration)
            version: V_1_1
            #Force the server cipher suite to follow the exact order specifying in server.ssl.ciphers (For perfect forward secrecy)
            useUndertowUserCipherSuitesOrder: true
            cache: # Used by io.github.jhipster.web.filter.CachingHttpHeadersFilter
                timeToLiveInDays: 1461 # Static assets are cached for 4 years by default

        # Hibernate 2nd level cache, used by CacheConfiguration
        cache:
            hazelcast: # Hazelcast configuration
                time-to-live-seconds: 3600 # By default objects stay 1 hour in the cache
                backup-count: 1 # Number of objects backups
                # Configure the Hazelcast management center
                # Full reference is available at: http://docs.hazelcast.org/docs/management-center/3.9/manual/html/Deploying_and_Starting.html
                management-center:
                    enabled: false # Hazelcast management center is disabled by default
                    update-interval: 3 # Updates are sent to the Hazelcast management center every 3 seconds by default
                    # Default URL for Hazelcast management center when using JHipster's Docker Compose configuration
                    # See src/main/docker/hazelcast-management-center.yml
                    # Warning, the default port is 8180 as port 8080 is already used by JHipster
                    url: http://localhost:8180/mancenter
            ehcache: # Ehcache configuration
                time-to-live-seconds: 3600 # By default objects stay 1 hour in the cache
                max-entries: 100 # Number of objects in each cache entry
            infinispan: #Infinispan configuration
                config-file: default-configs/default-jgroups-tcp.xml
                # local app cache
                local:
                    time-to-live-seconds: 60 # By default objects stay 1 hour (in minutes) in the cache
                    max-entries: 100 # Number of objects in each cache entry
                #distributed app cache
                distributed:
                    time-to-live-seconds: 60 # By default objects stay 1 hour (in minutes) in the cache
                    max-entries: 100 # Number of objects in each cache entry
                    instance-count: 1
                #replicated app cache
                replicated:
                    time-to-live-seconds: 60 # By default objects stay 1 hour (in minutes) in the cache
                    max-entries: 100 # Number of objects in each cache entry
            # Memcached configuration
            # Uses the Xmemcached library, see https://github.com/killme2008/xmemcached
            memcached:
             # Disabled by default in dev mode, as it does not work with Spring Boot devtools
                enabled: true
                servers: localhost:11211 # Comma or whitespace separated list of servers' addresses
                expiration: 300 # Expiration time (in seconds) for the cache
                use-binary-protocol: true # Binary protocol is recommended for performance (and security)

        # E-mail properties
        mail:
            enabled: false # If e-mail sending is enabled. The standard `spring.mail` keys will need to be configured
            from: jhipster@localhost # The default "from" address for e-mails
            base-url: http://127.0.0.1:8080 # URL to the application, used inside e-mails

        # Spring Security specific configuration
        security:
            remember-me: # JHipster secure implementation of the remember-me mechanism, for session-based authentication
                # security key (this key should be unique for your application, and kept secret)
                key: 0b32a651e6a65d5731e869dc136fb301b0a8c0e4
            client-authorization: # Used with JHipster UAA authentication
                access-token-uri: # URL of the JHipster UAA server OAuth tokens
                token-service-id: # ID of the current application
                client-id: # OAuth client ID
                client-secret: # OAuth client secret
            authentication:
                jwt: # JHipster specific JWT implementation
                    # The secret token should be encoded using Base64 (you can type `echo 'secret-key'|base64` on your command line).
                    # If both properties are configured, the `secret` property has a higher priority than the `base64-secret` property.
                    secret: # JWT secret key in clear text (not recommended)
                    base64-secret:  # JWT secret key encoded in Base64 (recommended)
                    token-validity-in-seconds: 86400 # Token is valid 24 hours
                    token-validity-in-seconds-for-remember-me: 2592000 # Remember me token is valid 30 days

        # Swagger configuration
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

        # DropWizard Metrics configuration, used by MetricsConfiguration
        metrics:
            jmx: # Export metrics as JMX beans
                enabled: true # JMX is enabled by default
            # Send metrics to a Graphite server
            # Use the "graphite" Maven profile to have the Graphite dependencies
            graphite:
                enabled: false # Graphite is disabled by default
                host: localhost
                port: 2003
                prefix: jhipster
            # Send metrics to a Prometheus server
            prometheus:
                enabled: false # Prometheus is disabled by default
                endpoint: /prometheusMetrics
            logs: # Reports Dropwizard metrics in the logs
                enabled: false
                reportFrequency: 60 # frequency of reports in seconds

        # Logging configuration, used by LoggingConfiguration
        logging:
            logstash: # Forward logs to Logstash over a socket
                enabled: false # Logstash is disabled by default
                host: localhost # Logstash server URL
                port: 5000 # Logstash server port
                queue-size: 512 # Queue for buffering logs
            spectator-metrics: # Reports Netflix Spectator metrics in the logs
                enabled: false # Spectator is disabled by default

        # By default cross-origin resource sharing (CORS) is enabled in "dev" mode for
        # monoliths and gateways.
        # It is disabled by default in "prod" mode for security reasons, and for microservices
        # (as you are supposed to use a gateway to access them).
        # This configures a standard org.springframework.web.cors.CorsConfiguration
        # Note that "exposed-headers" is mandatory for JWT-based security, which uses
        # the "Authorization" header, and which is not a default exposed header.
        cors:
            allowed-origins: "*"
            allowed-methods: "*"
            allowed-headers: "*"
            exposed-headers: "Authorization"
            allow-credentials: true
            max-age: 1800

        # Ribbon displayed on the top left-hand side of JHipster applications
        ribbon:
            # Comma-separated list of profiles that display a ribbon
            display-on-active-profiles: dev

## <a name="3"></a> Application-specific properties

生成的应用程序也可以有自己的Spring引导属性。强烈建议这样做，因为它允许应用程序的类型安全配置，以及在一个IDE中自动完成和记录。

JHipster在“config”包中生成了一个“applicationproperties”类，该类已经预配置，并且已经在底部记录了“application.yml”、“application-dev.yml”和“application-prod.yml”文件。您需要做的只是编写您自己的特定属性代码。
