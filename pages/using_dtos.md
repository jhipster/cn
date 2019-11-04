---
layout: default
title: 使用DTO
permalink: /using-dtos/
redirect_from:
  - /using_dtos.html
sitemap:
    priority: 0.7
    lastmod: 2015-05-28T23:41:00-00:00
---

# <i class="fa fa-briefcase"></i> 使用DTO

## 介绍

默认情况下，JHipster直接在其REST端点中使用其Domain对象（通常是JPA实体）。这有很多好处，主要的好处是它使代码易于使用，理解和扩展。

但是，对于复杂的用例，您可能需要在REST端点使用对外部公开的数据传输对象（DTO）。这些对象在Domain对象之上添加了一个额外的层，并且专门针对REST层进行了调整：它们的主要好处是它们可以聚合多个Domain对象。

## DTO在JHipster中的工作方式

生成JHipster实体时，您可以选择是否添加服务层：但是DTO选项仅在选择使用服务层时才可用，因为它需要该层来处理映射（如果使用的是JPA，这是因为服务层是事务性的，所以可以进行延迟加载）。

选择使用服务层后，您将可以选择为实体生成对应DTO。如果选择该选项，将会：

- 将生成一个DTO，并将其映射到底层实体上。
- 它将仅使用ID用于在前端（例如，Angular）的显示字段，来聚合多对一的关系。最后情况是，与`User`实体的多对一关系，将向DTO添加一个`userId`字段和一个`userLogin`字段。
- 它将忽略非所有者侧的一对多关系和多对多关系：这与实体的工作方式匹配（它们在这些字段上具有`@JsonIgnore`注解）。
- 对于所有者方面的多对多关系：它将使用其他实体的DTO，并在`Set`中使用它们。因此，这仅在其他实体也使用DTO的情况下才有效。

## 使用MapStruct映射DTO和实体

由于DTO看起来很像实体，因此经常需要一种解决方案来自动相互映射。

在JHipster中选择的解决方案是使用[MapStruct](http://mapstruct.org/)。这是一个插入Java编译器的注解处理器，它将自动生成所需的映射。

我们发现它非常干净和高效，并且喜欢它不使用反射（当像在mapper中一样频繁使用时，这对性能不利）。

## 为MapStruct配置IDE

MapStruct是一个注解处理器，因此，它应该被设置为在IDE编译项目时自动运行。

如果使用的是Maven，则需要在IDE中激活`IDE`maven配置文件。Gradle用户不需要设置任何特定于IDE的东西。

配置文件激活的指引可以参考[配置IDE]({{ site.url }}/configuring-ide/)。

## MapStruct高级用法

MapStruct映射器配置为Spring Bean，并支持依赖注入。一个不错友情提示，您可以将`Repository`注入到映射器中，以便可以使用其ID从映射器中获取托管JPA实体。

这是获取`User`实体的示例代码：

    @Mapper
    public abstract class CarMapper {

        @Inject
        private UserRepository userRepository;

        @Mapping(source = "user.id", target = "userId")
        @Mapping(source = "user.login", target = "userLogin")
        public abstract CarDTO carToCarDTO(Car car);

        @Mapping(source = "userId", target = "user")
        public abstract Car carDTOToCar(CarDTO carDTO);

        public User userFromId(Long id) {
            if (id == null) {
                return null;
            }
            return userRepository.findOne(id);
        }
    }
