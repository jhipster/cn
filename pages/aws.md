---
layout: default
title: 发布到AWS
permalink: /aws/
# redirect_from:
#   - /aws.html
sitemap:
    priority: 0.7
    lastmod: 2018-01-17T00:00:00-00:00
---

# <i class="fa fa-cloud-upload"></i> 发布到AWS

[![Powered by AWS Cloud Computing]({{ site.url }}/images/logo/logo-aws.png)](https://aws.amazon.com/what-is-cloud-computing)

将JHipster项目部署到AWS有两个不同的子生成器：
* **aws-containers**: 基于Docker容器的子生成器，用于通过AWS弹性容器服务部署应用程序。这对于复杂的应用程序和/或微服务体系结构非常有用。
* **aws**: 基于实例的子生成器，用于通过弹性Beanstack部署应用程序。这很好（而且很便宜！）对于简单应用。

## *aws-containers* sub-generator
此子生成器将使用运行在弹性容器服务上的AWS Fargate自动部署基于Docker的Jhipster应用程序。它利用许多AWS服务来实现这一点：
- [AWS Fargate](https://aws.amazon.com/fargate/): 一个新的AWS服务，它允许容器运行而不需要担心底层的VM实例基础设施。子生成器当前使用弹性容器服务来管理容器。
- [Elastic Container Registry](https://aws.amazon.com/ecr/): Docker图像存储库，用于存储应用程序图像。
- [Elastic Load Balanacer - Network Load Balancer](https://aws.amazon.com/elasticloadbalancing): 网络负载平衡器用于将流量引导到容器。
- [Aurora](https://aws.amazon.com/rds/aurora): 一个与MySQL和PostgreSQL兼容的AWS托管数据库服务。
- [AWS S3](https://aws.amazon.com/s3): 用于存储CloudInformation脚本的文件存储。
- [CloudWatch](https://aws.amazon.com/cloudwatch): 分布式日志收集工具，用于查看容器的状态。
- [AWS Cloudformation](https://aws.amazon.com/cloudformation):  所有必需的服务（除了AWS系统管理器参数）都在一组CloudInformation文件中定义。基本文件包含高级服务，然后在自己的文件中定义每个应用程序，该文件称为嵌套堆栈。
- [AWS System Manager - Parameter Store](https://aws.amazon.com/systems-manager/features/):用于存储数据库密码的安全密码存储机制。运行子生成器将引入一个新的SpringCloud组件，该组件将在应用程序启动时读取密码。
- [AWS - IAM Role](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles.html): 生成器将创建一个新角色，ECS任务将在该角色下执行，并具有关联的策略。

![AWS Component Diagram]({{ site.url }}/images/aws_component_diagram.svg?sanitize=true)

如果您选择部署应用程序，子生成器将在应用程序启动之前经历许多步骤。
1. 重新构建应用程序的Docker Imager，因此它包括新生成的SpringCloud类。
2. 为CloudInformation yaml文件创建S3存储桶。
3. 将cloudformation yaml文件上载到S3 bucket。
4. 创建CloudInformation堆栈（不包括ECS服务）。该服务最初被排除在外，因此我们有机会将所需的Docker映像上载到新创建的注册表中，以便该服务在创建时能够成功启动。
5. 标记Docker图像并上传到注册表。
6. 在AWS SSM中设置数据库访问密码。这已从CloudInformation文件中排除，因为它当前不支持SecureStrings，并且在CloudInformation中存储密码是一种糟糕的做法。
7. 更新堆栈以包含ecs服务。打印出负载平衡器URL。

### 限制
- 目前只适用于单机应用程序。
- 仅支持以下数据库类型（全部通过aurora）：mysql、mariadb和postgresql。
- 写此文档时，Fargate仅在“美国西部-2”地区提供。在尝试针对不同区域运行子生成器之前，请检查[此列表]（https://aws.amazon.com/about-aws/global-infrastructure/regional-product-services/）。
- 当前不支持实例到实例的通信。最大的后果是节点之间不支持缓存同步。建议查看AWS'[弹性缓存]（https://aws.amazon.com/elasticache/）服务以了解分布式缓存要求。
- SSL未启用.

### 成本
<div class="alert alert-warning"><i>Warning: </i>
一旦部署开始，此生成器将开始产生成本。在不了解所用组件的成本影响的情况下，不要让它长时间运行。 </div>
此生成器使用的服务不包含在[AWS自由层]（https://aws.amazon.com/free/）中。此生成器旨在允许应用程序以生产级方式运行，此时不建议用于小型或成本敏感的工作负载。

### 运行 sub-generator

在运行子生成器之前，需要设置您的[AWS凭据]（https://docs.aws.amazon.com/cli/latest/userguide/cli-config-files.html），以便访问它们。尽管您不需要安装Amazon CLI来运行此生成器，但建议将其用于后续的开发目的。使用您的Amazon AWS帐户登录并为您的Jhipster应用程序创建一个用户。之后，在Mac/Linux上的`~/.aws/credentials`或Windows上的c:\users\username\.aws\credentials`创建凭证文件。凭据文件的另一种选择是使用[环境变量]（https://docs.aws.amazon.com/cli/latest/userguide/cli-environment.html）设置访问密钥id+secret。

在新的目录 **new folder** 运行:

`jhipster aws-containers`

子生成器将使用它将从您的AWS环境中确定的信息，询问有关您希望如何部署应用程序的一些问题。有几点需要考虑：
- 应用程序可以部署在单层（使用默认的vpc配置）或双层模型中（例如cloudformation文件[此处]（vpc.template中的https://github.com/satterly/awscloudformation samples/blob/master/multi-tier web app））。在确定部署子网时，应确保应用程序部署在至少两个可用性区域，否则Amazon Aurora将无法正确部署。
- 如果需要删除生成的CloudInformation堆栈，则在尝试删除该堆栈之前必须删除所有创建的ECR映像。如果注册表仍保留图像，则CloudInformation无法删除注册表。

### 更新已部署的应用程序

当您的应用程序已经部署时，您可以通过再次运行子生成器来重新部署它：

`jhipster aws-containers`

系统将重新提示您确认设置，使您有机会重新调整性能级别等内容。注意，在某些情况下，应用程序在终止先前部署的任务实例时会遇到问题，这可能需要通过控制台或CLI手动终止这些实例。

### 删除应用程序
要删除已部署的应用程序：
* 导航到 `Elastic Container Service > Repositories > [Your application names]` 然后删除存储库中的所有图像。不要删除存储库本身。如果存储库中有图像，则不能通过CloudInformation删除应用程序。
* 导航到 `CloudFormation` 并删除已创建的堆栈。这将取消大部分服务。

要彻底清理环境，需要删除两个附加配置。
* 通过删除存储的密码 `AWS Systems Manager > Parameter Store`.
* 从生成的“s3”bucket中删除cloudformation模板文件，格式为 `[Stack Name]-[timestamp]`.

## *aws* sub-generator
这个sub-generator 允许自动发布你的 JHipster 应用到 [Amazon AWS cloud](https://aws.amazon.com/) using [Elastic Beanstalk](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/Welcome.html).

<div class="alert alert-info"> <i>Tip:</i> 作为弹性Beanstalk的替代方案，您还可以使用 <a href="{{ site.url }}/boxfuse/">Boxfuse</a>.  
Boxfuse提供了对JHipster的一流支持，以及对MySQL和PostgreSQL数据库的支持。</div>

### 限制

*   只能与MySQL数据库一起使用（稍后将添加PostgreSQL和Oracle）。
*   默认情况下，WebSockets在负载均衡器后面不工作。

### 运行sub-generator

在运行子生成器之前，需要设置AWS SDK凭据。使用您的Amazon AWS帐户登录并为您的Jhipster应用程序创建一个用户。若要授予此用户所需的权限，请附加“awselasticbeanstalkfullaccess”策略。

然后在mac/linux上的`~/.aws/credentials`或Windows上的'c:\users\username\.aws\credentials'创建凭证文件。

```
[default]
aws_access_key_id = your_access_key
aws_secret_access_key = your_secret_key
```

要将应用程序部署到Amazon AWS，请输入：

`jhipster aws`

这应该以“生产”模式打包应用程序，创建一个BeanStack应用程序（使用MySQL数据库），上传代码，然后启动应用程序。

### 更新已部署的应用程序

当您的应用程序已经部署时，您可以通过再次运行子生成器来重新部署它：

`jhipster aws`

这个子generator会再问你的数据库凭证但在更新期间会被忽略.

### 更多

*   [AWS SDK for JavaScript](http://aws.amazon.com/sdk-for-node-js)
*   [Progressbar for WAR upload](https://github.com/tj/node-progress)
