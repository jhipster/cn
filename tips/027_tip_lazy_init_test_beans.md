---
layout: default
title: 通过延迟bean初始化来提高集成测试性能
sitemap:
priority: 0.1
lastmod: 2019-10-01T18:20:00-00:00
---

# 通过延迟bean初始化来提高集成测试性能

__提交者 [@atomfrede](https://github.com/atomfrede)__

在许多Spring集成测试中，您不需要所有bean，因此可以在context中初始化所有bean，例如:不需要进行repository测试，这会浪费宝贵的时间。

您可以将测试配置为延迟初始化bean，这样可以通过在`src/test/java/YOUR-PACKAGE/config`中创建类`TestLazyBeanInitConfiguration`来创建仅必需的bean，其内容如下：

```java
import org.springframework.beans.BeansException;
import org.springframework.beans.factory.config.BeanFactoryPostProcessor;
import org.springframework.beans.factory.config.ConfigurableListableBeanFactory;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
@Profile("!" + TestLazyBeanInitConfiguration.EAGER_BEAN_INIT)
public class TestLazyBeanInitConfiguration implements BeanFactoryPostProcessor {
    public static final String EAGER_BEAN_INIT = "eager-bean-init";

    @Override
    public void postProcessBeanFactory(ConfigurableListableBeanFactory beanFactory) throws BeansException {
        Arrays.stream(beanFactory.getBeanDefinitionNames())
            .map(beanFactory::getBeanDefinition)
            .forEach(beanDefinition -> beanDefinition.setLazyInit(true));
    }
}
```

如果您希望或者需要一个测试来初始化所有bean，则需要使用`@ActiveProfiles(TestLazyBeanInitConfiguration.EAGER_BEAN_INIT)`注解该测试。

可参考 [spring boot blog](https://spring.io/blog/2019/03/14/lazy-initialization-in-spring-boot-2-2) 和
[related pull request](https://github.com/jhipster/generator-jhipster/pull/10241).

谢谢 [@rabiori](https://github.com/rabiori) 的实现





