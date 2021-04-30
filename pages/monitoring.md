---
layout: default
title: 监视您的JHipster应用程序
permalink: /monitoring/
sitemap:
    priority: 0.7
    lastmod: 2019-02-01T00:00:00-00:00
---
# <i class="fa fa-line-chart"></i> 监视您的JHipster应用程序

JHipster提供了几个选项来监视您运行应用程序。

## 摘要

1. [生成的仪表板](#generated-dashboards)
2. [JHipster Registry](#jhipster-registry)
3. [ELK](#elk)
4. [将指标转发到受支持的第三方监视系统](#configuring-metrics-forwarding)
5. [Zipkin](#zipkin)
6. [使用Elastalert进行告警](#elastalert)

## <a name="generated-dashboards"></a> 生成的仪表板

对于monoliths和网关，JHipster会生成多个仪表板来监视每个应用程序。这些仪表板在运行时可用，并且是进行一些简单监视的最简单方法。

![JHipster Metrics page][jhipster-metrics-page]

### 指标仪表板

指标仪表板使用Micrometer来提供应用程序性能的详细视图。

它提供以下指标：

- JVM
- HTTP请求
- 缓存使用率
- 数据库连接池

通过单击JVM线程指标旁边的Expand按钮，您将获得正在运行的应用程序的线程转储，这对于找出阻塞的线程非常有用。

### 健康状况仪表板

健康状况仪表板使用Spring Boot Actuator的运行状况端点来提供有关应用程序各个部分的运行状况信息。Spring Boot Actuator提供了许多开箱即用的健康检查，您可以添加特定于应用程序的运行状况检查。

### 日志仪表板

日志仪表板允许在运行时管理正在运行的应用程序的Logback配置。
您可以通过单击按钮来更改Java软件包的日志级别，这在开发和生产中都非常方便。

## <a name="jhipster-registry"></a> JHipster Registry

JHipster Registry[在此处具有自己单独的文档页面]({{ site.url }}/jhipster-registry/)。

它主要提供与上一部分相同的监视仪表板，但可在​​单独的服务器上工作。因此，设置起来有点复杂，但是强烈建议让仪表板与正在运行的应用程序隔离运行：否则，当应用程序出现故障时，它们将不可用。

## <a name="elk"></a> ELK (Elasticsearch, Logstash, Kibana) Stack

ELK技术栈通常用于日志聚合和搜索，它由以下组件组成：

- [Elasticsearch](https://www.elastic.co/products/elasticsearch) 用于索引数据（日志和指标）
- [Logstash](https://www.elastic.co/products/logstash) 管理和处理从应用程序收到的日志
- [Kibana](https://www.elastic.co/products/kibana) 用一个漂亮的界面可视化日志

<div class="alert alert-warning"><i> 警告: </i>
JHipster支持将日志转发到Logstash，但是从JHipster7开始，我们不提供任何ELK技术栈docker部署和可以使用仪表板。 这曾经是不再维护的[JHipster Console](https://github.com/jhipster/jhipster-console) 子项目的一部分。 我们建议现有用户迁移到另一个ELK解决方案。
</div>

### 将日志转发到Logstash

要配置JHipster应用程序将其日志转发到Logstash，请在它们的`application-dev.yml`或`application-prod.yml`中启用logstash日志记录：

```yaml
    jhipster:
        logging:
            logstash:
                enabled: true
                host: localhost
                port: 5000
                queueSize: 512
```

为了收集这些日志，可以在Logstash端提供一个简单的`logstash.conf`文件：

    input {
        tcp {
            port => "5000"
            type => syslog
            codec => json_lines
        }
    }

    output {
        elasticsearch {
                hosts => ["${ELASTICSEARCH_HOST}:${ELASTICSEARCH_PORT}"]
                index => "logs-%{+YYYY.MM.dd}"
            }
        }
    }

有关如何设置ELK技术栈的更多信息，请参考[官方Elastic文档](https://www.elastic.co/guide/en/elastic-stack/current/index.html) 。

## <a name="configuring-metrics-forwarding"></a> 将指标转发到受支持的第三方监视系统（JMX，Prometheus）

默认情况下，JHipster以[Prometheus](https://prometheus.io/) 格式公开应用程序指标。
它在`management/prometheus`下公开。
还可以通过[spring boot actuator](https://docs.spring.io/spring-boot/docs/current/reference/html/production-ready-features.html#production-ready-metrics) 将指标转发到备用系统。

如果您想禁用暴露指标端点，可以在`src/main/resources/application.yml`中禁用它。

```yaml
    management:
        metrics:
            export:
                prometheus:
                    enabled: false
```

Prometheus端点默认情况下不受保护。 如果您想通过Spring Security保护它，则可以通过向Prometheus端点添加基本身份验证来实现，因为Prometheus可以与受基本身份验证保护的抓取端点一起使用。

创建一个新的配置文件（例如`BasicAuthConfiguration.java`）。

```java
    @Configuration
    @Order(1)
    @ConditionalOnProperty(prefix = "management", name = "metrics.export.prometheus.enabled")
    public class BasicAuthConfiguration extends WebSecurityConfigurerAdapter {

        @Override
        protected void configure(HttpSecurity http) throws Exception {
            http
                .antMatcher("/management/prometheus/**")
                .authorizeRequests()
                .anyRequest().hasAuthority(AuthoritiesConstants.ADMIN)
                .and()
                .httpBasic().realmName("jhipster")
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and().csrf().disable();
        }
    }
```

您可以使用默认的`admin/admin`登录。您必须在prometheus配置中添加以下配置，以便prometheus仍然可以抓取您的应用程序。

    basic_auth:
        username: "admin"
        password: "admin"

您可以通过`docker-compose -f src/main/docker/monitoring.yml up -d`在本地计算机上启动预配置的Grafana和Prometheus实例，
以查看预配置的[jvm/micrometer仪表板](https://grafana.com/grafana/dashboards/4701) 。

![Grafana Micrometer Dashboard][grafana-micrometer-dashboard]

注意：与以前的JHipster版本不同，JHipster 5.8指标报告开箱即用仅支持JMX和Prometheus。 
请查看Metrics官方文档，以获取有关如何设置其他报告程序（如[Graphite](https://docs.spring.io/spring-boot/docs/current/reference/html/production-ready-features.html#production-ready-metrics-export-graphite) 的说明。。


## <a name="zipkin"></a> Zipkin

JHipster应用程序可以通过[Spring Cloud Sleuth](https://cloud.spring.io/spring-cloud-sleuth/)与[Zipkin](http://zipkin.io/)集成，从而为您的微服务架构提供分布式跟踪。要启用Zipkin跟踪，请使用 `zipkin` maven/gradle配置文件打包您的应用程序，并将`spring.zipkin.enabled`属性设置为true。这将触发向Zipkin服务器的跨度报告，并且还将向请求标头和日志添加相关性ID（TraceId，SpanId和ParentId）。

Zipkin还提供了服务依赖关系图功能，使您可以直观地观察微服务之间的依赖关系。

有关如何设置您的应用程序以将跟踪记录报告给Zipkin的更多信息，请遵循官方的[Spring Cloud Sleuth文档](https://cloud.spring.io/spring-cloud-sleuth/reference/html/#sending-spans-to-zipkin) 。

[jhipster-metrics-page]: {{ site.url }}/images/jhipster_metrics_page.png "JHipster Metrics page"
[grafana-micrometer-dashboard]: {{ site.url }}/images/monitoring_grafana_micrometer.png "Grafana Micrometer Dashboard" 
