---
layout: default
title: 使用 Kafka
permalink: /using-kafka/
redirect_from:
  - /using_kafka.html
sitemap:
    priority: 0.7
    lastmod: 2016-09-22T00:00:00-00:00
---

# <i class="fa fa-envelope"></i> 使用 Kafka

## 功能

[Kafka](http://kafka.apache.org/) 是一个流行的发布和订阅消息系统。JHipster 对Kafka 有一个可选的支持，它将：

- 使用 JHipster 配置 [Spring Cloud Stream](https://cloud.spring.io/spring-cloud-stream/)。
- 在 `application-*.yml` 文件中加入必要的配置以获得一个简单的 `topic-jhipster` 话题（topic），并为 Kafka 提供健康检查监视器（可在 `health` 管理屏幕中看到）。
- 使用示例 `topic-jhipster` 话题生成 Docker Compose 配置文件，使用 Kafka 只需运行 `docker-compose -f src/main/docker/kafka.yml up -d`。
- 使用 Docker 在微服务环境中为 Kafka 提供支持。如果一个微服务或一个网关使用Kafka，Docker Compose 子生成器将会生成特定的 Kafka 配置。然后，所有微服务和网关将使用该 Kafka broker 来获取所有消息。broker 对于所有应用程序都是通用的，因为它通常用作应用程序之间的消息中间人。

## 在 JHipster 应用程序中使用 Kafka 和 Spring Cloud Stream 的教程

### 先决条件

生成一个新的应用程序，并确保在提示您要使用的技术时选择 `Asynchronous messages using Apache Kafka`。这会生成 Docker Compose 配置文件，您可以使用以下命令启动Kafka：

`docker-compose -f src/main/docker/kafka.yml up -d`


### 模型

创建一个简单的模型来表示我们将通过 Kafka 话题发送的消息。

```
public class Greeting {
    private String message;

    public Greeting() {
    }

    public String getMessage() {
        return message;
    }

    public Greeting setMessage(String message) {
        this.message = message;
        return this;
    }
}

```

### 消息频道

Spring Cloud Stream 引入了一个名为 `message channels` （消息通道）的抽象层。生产者将消息发送到输出通道（output channel），消费者在输入通道（input channel）上订阅消息。这使您可以灵活地使用不同的消息系统（称为绑定器（binder）），而无需编写大量特定于平台的代码。

让我们来创建输出通道和输入通道。

##### 输出通道
```
public interface ProducerChannel {

    String CHANNEL = "messageChannel";

    @Output
    MessageChannel messageChannel();
}
```

##### 输入通道
```
public interface ConsumerChannel {

    String CHANNEL = "subscribableChannel";

    @Input
    SubscribableChannel subscribableChannel();
}
```


### 配置

我们需要在 Jhipster 生成的配置类中告知 Spring Cloud Stream 我们的频道。
```
@EnableBinding(value = {Source.class, ProducerChannel.class, ConsumerChannel.class})
public class MessagingConfiguration {

}
```

我们还需要配置我们的应用程序让它可以与 Kafka 交谈。

```
spring:
    cloud:
      stream:
        bindings:
            messageChannel:
                destination: greetings
                content-type: application/json
            subscribableChannel:
                destination: greetings

```

这对应的模版：

`spring.cloud.stream.bindings.<channelName>.destination.<topic>`


### 生产者和消费者

##### 生产者的资源
让我们创建一个简单的 REST 端点，我们可以调用它来向 Kafka 话题 `greetings` 发送消息。

```

@RestController
@RequestMapping("/api")
public class ProducerResource{

    private MessageChannel channel;

    public ProducerResource(ProducerChannel channel) {
        this.channel = channel.messageChannel();
    }

    @GetMapping("/greetings/{count}")
    @Timed
    public void produce(@PathVariable int count) {
        while(count > 0) {
            channel.send(MessageBuilder.withPayload(new Greeting().setMessage("Hello world!: " + count)).build());
            count--;
        }
    }

}
```

##### 消费者的服务

我们可以使用 `StreamListener` 来消费消息，它将进行消息映射和自动类型转换。
```
@Service
public class ConsumerService {

    private final Logger log = LoggerFactory.getLogger(ConsumerService.class);


    @StreamListener(ConsumerChannel.CHANNEL)
    public void consume(Greeting greeting) {
        log.info("Received message: {}.", greeting.getMessage());
    }
}

```

### 运行应用程序

在 `SecurityConfiguration.java` 配置中允许访问端点:

`.antMatchers("/api/greetings/**").permitAll()`

如果调用端点 `http://localhost:8080/api/greetings/5`，您应该会看到记录到控制台的消息。

您可以在这里找到完整的源代码 [eosimosu/jhipster-kafka][6]。


[6]: https://github.com/eosimosu/jhipster-kafka
