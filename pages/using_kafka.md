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

- 使用JHipster配置[Spring Cloud Stream](https://cloud.spring.io/spring-cloud-stream/)。
- 在`application-*.yml`文件中添加必要的配置，设置了一个示例的`topic-jhipster`主题，并针对Kafka的运行健康检查监视器（将在`health`管理屏幕中可用）。
- 生成带有示例`topic-jhipster`主题的Docker Compose配置文件，因此只需输入`docker-compose -f src/main/docker/kafka.yml up -d`，即可使用Kafka。
- 使用Docker时，在微服务环境中提供对Kafka的支持。如果一个微服务或一个网关使用Kafka，则Docker Compose子生成器将生成特定的Kafka配置。然后，所有微服务和网关都将使用该Kafka代理获取其所有消息。代理对于所有应用程序都是通用的，因为它通常用作应用程序之间的消息代理。

## 在JHipster应用程序中将Kafka与Spring Cloud Stream一起使用的教程

### 必备条件

生成一个新的应用程序，并确保在提示您要使用的技术时，选择`Asynchronous messages using Apache Kafka`。 一个Docker Compose配置文件将被生成，您可以使用以下命令启动Kafka：

`docker-compose -f src/main/docker/kafka.yml up -d`


### 模型

创建一个简单的模型来表示我们将通过Kafka主题发送的消息。

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

### 消息管道

Spring Cloud Stream引入了一个称为`message channels`的抽象层。生产者将消息发送到输出管道，而消费者订阅消息的输入管道。这使您可以灵活地使用不同的消息传递系统（称为binders），而无需编写很多特定于平台的代码。

让我们创建输出和输入管道。

##### 输出管道
```
public interface ProducerChannel {

    String CHANNEL = "messageChannel";

    @Output
    MessageChannel messageChannel();
}
```

##### 输入管道
```
public interface ConsumerChannel {

    String CHANNEL = "subscribableChannel";

    @Input
    SubscribableChannel subscribableChannel();
}
```


### 配置

我们需要在Jhipster生成的配置类中，告诉Spring Cloud Stream我们的管道。

```
@EnableBinding(value = {Source.class, ProducerChannel.class, ConsumerChannel.class})
public class MessagingConfiguration {

}
```

我们还需要配置我们的应用程序才能与Kafka通信。

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

这对应于：

`spring.cloud.stream.bindings.<channelName>.destination.<topic>`


### 生产者和消费者

##### 生产者Resource
让我们创建一个简单的REST端点，我们可以调用该端点将消息发送到Kafka主题，即`greetings`。

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

##### 消费者服务

我们可以使用`StreamListener`消费消息，以进行消息映射和自动类型转换。

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

### 运行应用

在`SecurityConfiguration.java`配置中允许访问的端点：

`.antMatchers("/api/greetings/**").permitAll()`

如果您调用端点`http://localhost:8080/api/greetings/5`, 则应该看到记录到控制台的消息。

您可以在[eosimosu/jhipster-kafka][6]上找到完整的源代码。

[6]: https://github.com/eosimosu/jhipster-kafka
