---
layout: default
title: 通用端口
permalink: /common-ports/
sitemap:
    priority: 0.7
    lastmod: 2018-10-15T10:20:00-00:00
---

# <i class="fa fa-plug"></i> 通用端口

JHipster配置了许多工具和服务，每个工具和服务都可能使用一个或多个端口。这个文档可帮助您了解每个端口的功能，并在端口冲突的情况下提供帮助。

请注意，根据JHipster[规范1]({{ site.url }}/policies/)，除非有问题（请在此处进行说明），否则每种技术均使用标准端口。

此处的端口按顺序列出，最常见的问题是端口`8080`, `9000`和`9060`。

<table class="table table-striped table-responsive">
  <tr>
    <th>端口</th>
    <th>描述</th>
  </tr>
  <tr>
    <td>2181</td>
    <td>Zookeeper (与Kafka一起使用)</td>
  </tr>
  <tr>
    <td>3000</td>
    <td>Grafana</td>
  </tr>
  <tr>
    <td>3306</td>
    <td>MySQL 和 MariaDB</td>
  </tr>
  <tr>
    <td>5000</td>
    <td>Logstash</td>
  </tr>
  <tr>
    <td>5432</td>
    <td>PostgreSQL</td>
  </tr>
  <tr>
    <td>5701</td>
    <td>Hazelcast</td>
  </tr>
  <tr>
    <td>7742</td>
    <td>Swagger Editor</td>
  </tr>
  <tr>
    <td>8080</td>
    <td>JHipster应用程序后端开发端口（Spring Boot服务器）</td>
  </tr>
  <tr>
    <td>8081</td>
    <td>JHipster微服务默认端口</td>
  </tr>
  <tr>
    <td>8091</td>
    <td>Couchbase - Web管理端口</td>
  </tr>
  <tr>
    <td>8092</td>
    <td>Couchbase - API 端口</td>
  </tr>
  <tr>
    <td>8093</td>
    <td>Couchbase - 查询服务用于REST/HTTP通信</td>
  </tr>
  <tr>
    <td>8180</td>
    <td>Hazelcast管理中心</td>
  </tr>
  <tr>
    <td>8301</td>
    <td>Consul - serflan-tcp 和 serflan-udp</td>
  </tr>
  <tr>
    <td>8302</td>
    <td>Consul - serfwan-tcp 和 serfwan-udp</td>
  </tr>
  <tr>
    <td>8300</td>
    <td>Consul - server</td>
  </tr>
  <tr>
    <td>8400</td>
    <td>Consul - RPC</td>
  </tr>
  <tr>
    <td>8500</td>
    <td>Consul - Web UI的HTTP端口</td>
  </tr>
  <tr>
    <td>8600</td>
    <td>Consul - DNS</td>
  </tr>
  <tr>
    <td>8761</td>
    <td>JHipster Registry (Netflix Eureka)</td>
  </tr>
  <tr>
    <td>9000</td>
    <td>带有BrowserSync的JHipster前端开发端口</td>
  </tr>
  <tr>
    <td>9001</td>
    <td>SonarQube</td>
  </tr>
  <tr>
    <td>9042</td>
    <td>Cassandra - CQL</td>
  </tr>
  <tr>
    <td>9060</td>
    <td>带Webpack热加载功能的JHipster前端开发端口</td>
  </tr>
  <tr>
    <td>9090</td>
    <td>Prometheus</td>
  </tr>
  <tr>
    <td>9092</td>
    <td>Kafka</td>
  </tr>
  <tr>
    <td>9093</td>
    <td>Prometheus 警报管理器</td>
  </tr>
  <tr>
    <td>9160</td>
    <td>Cassandra - Thrift</td>
  </tr>
  <tr>
    <td>9200</td>
    <td>Elasticsearch - HTTP连接 (REST API)</td>
  </tr>
  <tr>
    <td>9300</td>
    <td>Elasticsearch - 传输连接 (native API)</td>
  </tr>
  <tr>
    <td>9411</td>
    <td>Zipkin</td>
  </tr>
  <tr>
    <td>11210</td>
    <td>Couchbase - 内部/外部桶端口</td>
  </tr>
  <tr>
    <td>18080</td>
    <td>H2 (嵌入式数据库) 在单体应用内部运行。默认端口通常为9092，但这会与Kafka发生冲突，因此修正为`1`+`Spring Boot端口`</td>
  </tr>
  <tr>
    <td>18081</td>
    <td>H2 (嵌入式数据库) 在微服务中运行。有关更多信息，请参见上面的行</td>
  </tr>
  <tr>
    <td>27017</td>
    <td>MongoDB</td>
  </tr>
</table>
