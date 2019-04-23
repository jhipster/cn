---
layout: default
title: 使用DTOs
permalink: /using-dtos/
redirect_from:
  - /using_dtos.html
sitemap:
    priority: 0.7
    lastmod: 2015-05-28T23:41:00-00:00
---

# <i class="fa fa-briefcase"></i> 使用DTOs

## 介绍

默认情况下，JHipster直接在其REST端点中使用其域对象（通常是JPA实体）。这有很多好处，主要是它使代码易于使用、理解和扩展。

但是，对于复杂的用例，您可能希望使用将由REST端点公开的数据传输对象（或DTO）。这些对象在域对象的顶部添加了一个额外的层，并专门针对其余层进行了调整：它们的主要好处是可以聚合多个域对象。

## DTO在JHipster的工作原理

当生成JHipster实体时，您可以选择添加服务层：只有当您选择具有服务层时，DTO选项才可用，因为它需要该层来处理映射（如果您使用jpa，这是因为服务层是事务性的，因此延迟加载将起作用）。

一旦选择了具有服务层，您就可以选择为实体生成DTO。如果选择该选项：

- 将生成DTO，并将其映射到基础实体上。
- 它将聚合多对一关系，只使用ID和用于在客户端框架中显示它的字段（例如，角度）。因此，与“user”实体的多对一关系将向DTO添加“userid”字段和“userlogin”字段。
- 它将忽略非所有者端的一对多关系和多对多关系：这与实体的工作方式相匹配（这些字段上有一个“@jsonignore”注释）。
- 对于所有者端的多对多关系：它将使用来自另一个实体的DTO并在“集合”中使用它们。因此，只有当另一个实体也使用DTO时，这才有效。

## 使用MapStruct映射DTO和实体

由于DTO看起来很像实体，所以经常需要有一个解决方案来自动将它们相互映射。

JHipster中选择的解决方案是使用[mapstruct](http://mapstruct.org/)。它是一个插入到Java编译器中的注释处理器，它将自动生成所需的映射。

我们发现它非常干净和高效，并且喜欢它不使用反射（当它像在映射器中那样频繁地使用时，这对性能很不利）。

## 为MapStruct配置IDE

MapStruct是一个注释处理器，因此它也应该设置为在您的IDE编译项目时自动运行。

如果您使用的是Maven，则需要在您的IDE中激活`IDE` maven配置文件。Gradle用户不需要应用任何特定于IDE的内容。

Instructions for activating the profile are included in [Configuring your IDE]({{ site.url }}/configuring-ide/).

## 高级MapStruct用法

MapStruct映射器被配置为SpringBean，并支持依赖注入。一个很好的提示是，您可以将`Repository` 插入映射器中，这样就可以使用其ID从映射器中获取托管JPA实体。

以下是获取`User`实体的示例代码：

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
