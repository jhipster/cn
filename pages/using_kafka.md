---
layout: default
title: 使用Kafka
permalink: /using-kafka/
redirect_from:
  - /using_kafka.html
sitemap:
    priority: 0.7
    lastmod: 2016-09-22T00:00:00-00:00
---

# <i class="fa fa-envelope"></i> 使用Kafka

## 细节

[Kafka](http://kafka.apache.org/)是一个流行的发布-订阅消息系统。JHipster对Kafka具有可选支持，它将：

- 使用JHipster配置[Kafka clients](https://docs.confluent.io/5.3.1/clients/consumer.html#java-client)。
- 在`application-*.yml`文件中添加必要的配置。
- 生成Docker Compose配置文件，只需输入`docker-compose -f src/main/docker/kafka.yml up -d`，即可使用Kafka。

## 必备条件

生成一个新的应用程序，并确保在提示您要使用的技术时，选择`Asynchronous messages using Apache Kafka`。 一个Docker Compose配置文件将被生成，您可以使用以下命令启动Kafka：

`docker-compose -f src/main/docker/kafka.yml up -d`

## 消费者和生产者

消费者(`<appName>KafkaConsumer` class) 正在运行，可以适应您的需求。
生产者(`<appName>KafkaProducer` class) 也是可用的，并且可以通过REST端点（`<appName> KafkaResource class`）进行调用。

## 运行应用

在`SecurityConfiguration.java`配置中允许访问的端点：

`.antMatchers("/api/<appName>-kafka/publish").permitAll()`

如果您调用端点`http://localhost:8080/api/<appName>-kafka/publish?message=...`, 则应该看到记录到控制台的消息。

