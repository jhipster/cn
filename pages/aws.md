---
layout: default
title: 部署到AWS
permalink: /aws/
# redirect_from:
#   - /aws.html
sitemap:
    priority: 0.7
    lastmod: 2018-01-17T00:00:00-00:00
---

# <i class="fa fa-cloud-upload"></i> 部署到AWS

[![Powered by AWS Cloud Computing]({{ site.url }}/images/logo/logo-aws.png)](https://aws.amazon.com/what-is-cloud-computing)

有两个不同的子生成器，用于将JHipster项目部署到AWS：
* **aws-containers**: 基于Docker容器的子生成器，用于通过AWS Elastic Container Service部署应用程序。这对于复杂的应用程序和/或微服务架构非常有用。
* **aws**: 基于实例的子生成器，用于通过Elastic Beanstalk部署应用程序。对于简单的应用程序来说，这很棒（而且非常便宜！）。

## *aws-containers*子生成器
该子生成器将使用在Elastic Container Service上运行的AWS Fargate自动部署基于docker的JHipster应用程序。它利用许多AWS服务来实现此目的：
- [AWS Fargate](https://aws.amazon.com/fargate/): 一种新的AWS服务，该服务允许运行容器而无需担心基础VM实例基础架构。子生成器当前使用弹性容器服务来管理容器。
- [Elastic Container Registry](https://aws.amazon.com/ecr/): Docker镜像仓库，用于存储应用程序镜像。
- [Elastic Load Balanacer - Network Load Balancer](https://aws.amazon.com/elasticloadbalancing): 网络负载均器用于将流量定向到容器。
- [Aurora](https://aws.amazon.com/rds/aurora): AWS托管数据库服务，与MySQL和PostgreSQL兼容。
- [AWS S3](https://aws.amazon.com/s3): 用于存储CloudFormation脚本的文件存储。
- [CloudWatch](https://aws.amazon.com/cloudwatch): 分布式日志收集工具，用于查看容器的状态。
- [AWS Cloudformation](https://aws.amazon.com/cloudformation):  所有必需的服务（AWS System Manager Parameters除外）均在一组CloudFormation文件中定义。基本文件包含高级服务，然后每个应用程序都在其自己的文件中定义，该文件称为嵌套架构。
- [AWS System Manager - Parameter Store](https://aws.amazon.com/systems-manager/features/): 安全密码存储机制，用于存储数据库密码。运行子生成器将引入一个新的Spring Cloud组件，该组件将在应用程序启动时读取密码。
- [AWS - IAM Role](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles.html): 生成器创建一个新角色，并将使用关联的策略执行ECS任务。

![AWS Component Diagram]({{ site.url }}/images/aws_component_diagram.svg?sanitize=true)

如果选择部署应用程序，则子生成器将在应用程序启动之前经历多个步骤。
1. 重建应用程序的Docker镜像，使其包含新生成的Spring Cloud类。
2. 为CloudFormation YAML文件创建一个S3存储。
3. 将Cloudformation YAML文件上传到S3存储。
4. 创建CloudFormation（不包括ECS服务）。最初不包括该服务，因此我们有机会将所需的Docker镜像上载到新创建的仓库中，因此该服务在创建后将成功启动。
5. 标记Docker镜像并上传到仓库。
6. 在AWS SSM中设置数据库访问密码。这已从Cloudformation文件中排除，因为它当前不支持SecureStrings，并且在Cloudformation中存储密码是一种不好的做法。
7. 更新架构以包括ECS服务。打印出负载均衡器URL。

### 局限性
- 当前仅适用于monolithic应用程序。
- 仅支持以下数据库类型（全部通过Aurora）：Mysql，MariaDB和PostgreSQL。
- 在撰写本文时，Fargate仅在`us-west-2`地区可用。在尝试针对其他区域运行子生成器之前，请检查[此列表](https://aws.amazon.com/about-aws/global-infrastructure/regional-product-services/)。
- 当前不支持实例间通信。其最大的后果是节点之间不支持缓存同步。建议查看AWS的[ElasticCache](https://aws.amazon.com/elasticache/)服务以了解分布式缓存要求。
- SSL不可用。

### 费用
<div class="alert alert-warning"><i>警告: </i>
一旦开始部署，此生成器将开始计算成本。在不了解所使用组件的成本影响的情况下，请勿使其长时间运行。 </div>
此生成器使用的服务不在[AWS Free Tier](https://aws.amazon.com/free/)范围内。该生成器旨在允许应用程序以生产级方式运行，因此不建议将其用于小型或对成本敏感的工作环境。

### 运行子生成器


在运行子生成器之前，您需要设置您的[AWS凭证](https://docs.aws.amazon.com/cli/latest/userguide/cli-config-files.html)，以便可以访问它们。尽管您无需安装Amazon CLI即可运行此生成器，但建议将其用于后续开发。使用您的Amazon AWS帐户登录并为JHipster应用程序创建用户。之后，在Mac/Linux上的`~/.aws/credentials`或Windows上的`C:\Users\USERNAME\.aws\credentials`处创建凭据文件。凭据文件的替代方法是使用环境变量来设置访问密钥ID+密码。

 在**新文件夹**中运行：

`jhipster aws-containers`

根据您的AWS环境, 子生成器将询问有关您如何部署应用程序的许多问题。有以下几件事情要考虑：
- 该应用程序可以部署在单层（使用默认VPC配置）中，也可以部署在双层模型中（[此处](https://github.com/satterly/AWSCloudFormation-samples/blob/master/multi-tier-web-app-in-vpc.template)为示例CloudFormation文件）。确定部署子网时，应确保至少在两个可用区中部署了应用程序，否则Amazon Aurora将无法正确部署。
- 如果需要删除生成的CloudFormation stack，则必须先删除所有创建的ECR镜像，然后再尝试删除stack。如果CloudFormation仍保留镜像，则无法删除该仓库。

### 更新已部署的应用程序

在部署了应用程序之后，可以通过再次运行子生成器来重新部署它：

`jhipster aws-containers`

系统将再次提示您确认设置，使您有机会重新调整性能等级。请注意，在某些情况下，应用程序在终止以前部署的任务实例时会遇到问题，这可能需要通过控制台或CLI手动终止它们。

### 删除应用程序
要删除已部署的应用程序：
* 导航到`Elastic Container Service > Repositories > [您的应用程序名称]`，然后删除存储库中的所有镜像。不要删除仓库本身。如果存储库中有图像，则无法通过CloudFormation删除应用程序。
* 导航到`CloudFormation`并删除您创建的stack。这将取消提供大多数服务。

为了彻底清除环境，还需要删除其他两个配置。
* 通过`AWS Systems Manager > Parameter Store`删除存储的密码。
* 从生成的`S3`存储桶中删除CloudFormation模板文件，该文件的格式为`[Stack Name]-[timestamp]`。

## *aws*子生成器

该子生成器允许使用[Elastic Beanstalk](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/Welcome.html)将JHipster应用程序自动部署到[Amazon AWS云](https://aws.amazon.com/)。

<div class="alert alert-info"> <i>提示:</i> 作为Elastic Beanstalk的替代方案，您还可以使用<a href="{{ site.url }}/boxfuse/">Boxfuse</a>将JHipster应用程序部署到AWS。
Boxfuse具有对JHipster的一流支持，以及对MySQL和PostgreSQL数据库的支持。</div>

### 局限性

*   您只能将其与SQL数据库一起使用（不支持Oracle和Microsoft SQL Server）。
*   默认情况下，Websocket在负载均衡后面不起作用。

### 先决条件

在运行子生成器之前，您需要设置您的AWS SDK凭证。使用您的Amazon AWS帐户登录并为JHipster应用程序创建用户。要授予该用户所需的权限，请附加`AWSElasticBeanstalkFullAccess`策略。

之后，在Mac/Linux上的`~/.aws/credentials`或Windows上的`C:\Users\USERNAME\.aws\credentials`处创建凭据文件。

```
[default]
aws_access_key_id = your_access_key
aws_secret_access_key = your_secret_key
```

如果您使用的命名配置文件与`default`配置文件不同，则只需为环境变量`AWS_PROFILE`设置正确的配置文件即可。

### 部署您的应用程序

要将您的应用程序部署到Amazon AWS，请输入：

`jhipster aws`

这应该将您的应用程序打包为"production"模式，创建一个Beanstalk应用程序（带有SQL数据库），在S3上上传代码，然后启动该应用程序。

### 更新已部署的应用程序

在部署了应用程序之后，可以通过再次运行子生成器来重新部署它：

`jhipster aws`

子生成器再次询问您的数据库凭据，但在更新期间将忽略它们。

### 更多信息

*   [适用于JavaScript的AWS SDK ](http://aws.amazon.com/sdk-for-node-js)
*   [WAR上传进度条](https://github.com/tj/node-progress)

