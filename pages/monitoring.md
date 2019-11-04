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
3. [JHipster Console](#jhipster-console)
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

健康状况仪表板使用Spring Boot Actuator的运行状况端点来提供有关应用程序各个部分的运行状况信息。Spring Boot Actuator提供了许多开箱即用的健康检查，并且添加特定于应用程序的健康检查也非常容易。

### 日志仪表板

日志仪表板允许在运行时管理正在运行的应用程序的Logback配置。更改Java软件包的日志级别就像单击按钮一样简单，这在开发和生产中都非常方便。

## <a name="jhipster-registry"></a> JHipster Registry

JHipster Registry[在此处具有自己单独的文档页面]({{ site.url }}/jhipster-registry/)。

它主要提供与上一部分相同的监视仪表板，但可在​​单独的服务器上工作。因此，设置起来有点复杂，但是强烈建议让仪表板与正在运行的应用程序隔离运行：否则，当应用程序出现故障时，它们将不可用。

## <a name="jhipster-console"></a> JHipster Console

当高级用户想要监视这些值随时间的变化时，前几节中描述的仪表板仅显示应用程序指标的当前值。

因此，可以将JHipster应用程序配置为将其指标转发到外部监视系统，在此可以根据时间对指标进行图形化和分析。

为此，JHipster提供了JHipster Console，这是一个基于ELK Stack并与JHipster完全集成的自定义监视解决方案。

<div class="alert alert-warning"><i> 提醒: </i>
随着我们最近从Dropwizard Metrics切换到为Micrometer，当前使用v5.8.0和更高版本生成的应用程序的指标仪表板已不可用。
</div>


### 将日志转发到JHipster Console

要配置JHipster应用程序将其日志转发到JHipster Console，请在其`application-dev.yml`或`application-prod.yml`中启用logstash日志记录：

    jhipster:
        logging:
            logstash:
                enabled: true
                host: localhost # If using a Virtual Machine on Mac OS X or Windows with docker-machine, use the Docker's host IP here
                port: 5000
                queueSize: 512

要配置指标监视，请在JHipster应用程序中启用指标日志报告：

    jhipster:
        metrics:
            logs:
                enabled: true
        	    reportFrequency: 60 # seconds

设置这些属性将使用来自Dropwizard metrics的指标来丰富您转发的日志。

### JHipster Console概述

JHipster控制台是基于[ELK Stack](https://www.elastic.co/products)的监视工具。它提供了现成的仪表板和分析工具，可实时概览基础架构的性能。

它是一个开源应用程序，可在GitHub的[jhipster/jhipster-console](https://github.com/jhipster/jhipster-console)上找到。

ELK Stack包括：

- [Elasticsearch](https://www.elastic.co/products/elasticsearch) 用于索引数据（日志和指标）
- [Logstash](https://www.elastic.co/products/logstash) 管理和处理从应用程序收到的日志
- [Kibana](https://www.elastic.co/products/kibana) 通过一个漂亮的界面可视化日志

JHipster Console是一个基于Docker的项目，在官方Elasticsearch，Logstash和Kibana Docker镜像之上添加了功能。我们对Kibana进行了一些视觉上的更改，并设置了有用的仪表板，以便您可以在几分钟之内开始监视JHipster应用程序，而不需要花费数小时建立自己的基础架构监视。

![JHipster Console Monitoring Dashboard][monitoring-dashboard]

### 监控JHipster微服务架构

JHipster Console完全支持对JHipster微服务体系结构的监视，甚至提供以下微服务特定的功能：

- 使用Zipkin进行分布式跟踪
- 使用服务名称，实例ID，Zipkin相关ID丰富日志内容
- Zipkin服务和UI可视化跟踪和跨度
- 对接Zipkin UI和Kibana，以便您可以快捷跳转到与特定跟踪ID对应的日志（要使用此日志，请单击跟踪页面中的<span class="btn btn-primary btn-xs badge">Logs</span>图标）


### 设置JHipster Console

如果您已经使用Docker Compose工作流设置了JHipster[微服务架构]({{ site.url }}/microservices-architecture/)，则Docker Compose子生成器可以自动设置JHipster Console。

如果您使用的是monolithic版本的JHipster，则可以[从GitHub](https://github.com/jhipster/jhipster-console/blob/master/bootstrap/docker-compose.yml)或使用以下命令获取JHipster控制台的Docker-Compose文件：

    curl -O https://raw.githubusercontent.com/jhipster/jhipster-console/master/bootstrap/docker-compose.yml

然后，您将能够使用以下命令启动console：

    docker-compose up -d

它将同时启动Elasticsearch，Logstash，Kibana和ElastAlert。然后，您将可以通过[http://localhost:5601](http://localhost:5601)访问JHipster Console。如果已将它们正确配置为将其日志和指标转发到Logstash，它将自动从您的应用程序接收日志。

<div class="alert alert-warning"><i> 注意: </i>
如果您使用docker-machine创建Docker主机，那就不是http//localhost:5601，此处应使用Docker的主机IP，即: http://&lt;docker-host-ip&gt;:5601
</div>


要停止所有服务，请运行：

    docker-compose stop

停止后，如果您不想再次启动它们，可以将其删除：

    docker-compose rm

您可以通过运行以下命令将前两个命令组合在一起：`docker-compose down`。

### 使用JHipster Console

在启用日志和指标转发的应用程序运行后，您可以通过单击**Dashboard**选项卡中的**Load Saved Dashboards**图标（ <i class="fa fa-folder-open-o"></i> ）来查看仪表板。

<div class="alert alert-info">提示: 如果仪表板遇到以下错误：<i>Cannot read property 'byName' of undefined</i>，请尝试使用黄色刷新按钮（<i class="fa fa-refresh"></i>）刷新<b>Settings</b> > <b>Indices</b> 下的<b>logstash-*</b>索引字段列表。</div>

您还可以使用Kibana的**Discover**和**Visualize**标签来浏览数据并创建新的可视化。要了解如何有效使用Kibana的界面，请参阅其官方文档，尤其是Kibana用户指南的[Discover](https://www.elastic.co/guide/en/kibana/current/discover.html)，[Visualize](https://www.elastic.co/guide/en/kibana/current/visualize.html)和[Dashboard](https://www.elastic.co/guide/en/kibana/current/dashboard.html)部分。

![JHipster Console JVM Dashboard][jvm-dashboard]

### Docker卷的数据持久性

使用JHipster Console时，可以在`docker-compose.yml`文件中通过取消注释相应行来启用Docker卷。这些卷用于在容器和主机之间共享数据。即使将容器从系统中删除，它们也将保留数据和配置。

- Elasticsearch将其数据保存到 `log-data/`
- Logstash从以下位置加载其配置 `log-conf/logstash.conf`, 您可以编辑此文件，为Logstash在UDP端口5000上接收的数据添加新的解析规则。
- Kibana在每次启动时从`dashboards/`加载仪表板描述文件。

<div class="alert alert-warning"><i>注意: </i>
如果在Mac或Windows上使用Docker Machine，则Docker守护程序仅具有对OS X或Windows文件系统的有限访问权限。Docker Machine尝试自动共享您的/Users (OS X)或C:\Users\&lt;username&gt; (Windows)目录。因此，您必须在这些目录下创建项目文件夹，以避免卷出现任何问题。
</div>

### 将您的自定义搜索，可视化效果和仪表板另存为JSON以便自动导入

可以使用**Management** > **Saved Objects**菜单导出在Kibana中创建的搜索，可视化和仪表板。
然后，您可以在export.json文件的`_source`字段下提取特定对象的JSON描述。
然后，您可以将此数据放在`jhipster-console/dashboards`文件夹之一中的JSON文件中以进行自动导入。

如果您已经为JHipster应用程序创建了有用的仪表板和可视化文件，请考虑通过在[JHipster Console的GitHub项目](https://github.com/jhipster/jhipster-console)上提交 Pull Request，将这些信息反馈给社区。

## <a name="configuring-metrics-forwarding"></a> 将指标转发到受支持的第三方监视系统（JMX，Prometheus）

JHipster还为JMX和Prometheus提供了Metrics导出器。

还支持将指标转发到备用系统，也可以在您的YAML配置文件中简单地启用它。

    jhipster:
        metrics:
            prometheus:
                enabled: true

注意：与以前的JHipster版本不同，JHipster 5.8指标报告开箱即用仅支持JMX和Prometheus。请查看Metrics官方文档，以获取有关如何设置其他报告器（如[Graphite](https://micrometer.io/docs/registry/graphite)）的说明。

这会将您的指标导出到`/management/prometheus`下。由于此端点不受保护，因此您可以使用基本身份验证对其进行保护，这样prometheus仍可以通过创建新的配置文件（例如`BasicAuthConfiguration.java`）来抓取该端点。

    @Configuration
    @Order(1)
    @ConditionalOnProperty(prefix = "jhipster", name = "metrics.prometheus.enabled")
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

您可以使用默认的`admin/admin`登录。您必须在prometheus配置中添加以下配置，以便prometheus仍然可以抓取您的应用程序。

    basic_auth:
        [ username: "admin" ]
        [ password: "admin" ]


## <a name="zipkin"></a> Zipkin

JHipster应用程序可以通过[Spring Cloud Sleuth](https://cloud.spring.io/spring-cloud-sleuth/)与[Zipkin](http://zipkin.io/)集成，从而为您的微服务架构提供分布式跟踪。要启用Zipkin跟踪，请使用zipkin maven/gradle配置文件打包您的应用程序，并将`spring.zipkin.enabled`属性设置为true。这将触发向Zipkin服务器的跨度报告，并且还将向请求标头和日志添加相关性ID（TraceId，SpanId和ParentId）。Zipkin服务和UI作为JHipster Console的一部分提供，并与Kibana仪表板集成。

Zipkin还提供了服务依赖关系图功能，使您可以直观地观察微服务之间的依赖关系。

如果在计算机上运行，​​则Zipkin实例应该在[http://127.0.0.1:9411/](http://127.0.0.1:9411/) 上可用；如果使用Docker运行，则应该在http://&lt;docker-host-ip&gt;:9411上可用。

## <a name="alerting"></a> 使用Elastalert进行告警

JHipster Console通过集成[Elastalert](https://github.com/Yelp/elastalert)（告警系统可以从Elasticsearch中的数据生成警报）来提供内置警报。Elastalert易于使用，并能够定义复杂的警报规则以检测故障：峰值或基于Elasticsearch查询的任何模式。

### 启用告警

要启用告警，请通过添加以下几行[`docker-compose.yml`](https://github.com/jhipster/jhipster-console/blob/master/bootstrap/docker-compose.yml)来设置`jhipster-alerter`容器。

    jhipster-alerter:
        image: jhipster/jhipster-alerter
        #volumes:
        #    - ../jhipster-alerter/rules/:/opt/elastalert/rules/
        #    - ../alerts/config.yaml:/opt/elastalert/config.yaml

### 配置告警

可以在`alerts/config.yaml`中修改Elastalert配置。例如，您可以通过更改以下属性来配置告警频率和缓冲时间：

    run_every:
        minutes: 1
    buffer_time:
        minutes: 5

然后，您将需要编写一些规则来定义何时引发警报。

### 编写告警规则

要定义新告警，请在`alerts/rules`中添加新的Yaml规则文件，然后使用以下命令对过去的数据进行测试：

    ./test-alerting-rule.sh rule.yaml

请注意，这些Yaml文件应具有`.yaml`文件扩展名。在[Elastalert的官方文档](https://elastalert.readthedocs.org/en/latest/ruletypes.html)中了解有关如何编写规则的更多信息。

[jhipster-metrics-page]: {{ site.url }}/images/jhipster_metrics_page.png "JHipster Metrics page"
[monitoring-dashboard]: {{ site.url }}/images/jhipster-console-monitoring.png "Monitoring Dashboard"
[jvm-dashboard]: {{ site.url }}/images/jhipster-console-jvm.png "JVM Dashboard"
