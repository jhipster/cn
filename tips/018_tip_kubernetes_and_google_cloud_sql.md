---
layout: default
title: Kubernetes和Google Cloud SQL
sitemap:
priority: 0.5
lastmod: 2016-11-13T19:00:00-00:00
---

# Kubernetes和Google Cloud SQL

__提交者 [@bourdux](https://github.com/bourdux)__

使用[Kubernetes子生成器]({{site.url}}/kubernetes) 将JHipster应用程序部署到[Google Container Engine](https://cloud.google.com/container-engine/) 已经很容易了。 默认行为是为数据库创建Google Compute Engine VM。

如果您想更进一步，并使用完全托管的MySQL实例，则可以使用[Google Cloud SQL](https://cloud.google.com/sql/) 。
它允许自动备份，维护，复制以实现高可用性和出色的可伸缩性功能。

在本技巧/教程中，我将向您展示如何在Google Cloud上部署JHipster应用程序，该应用程序将Google Cloud SQL数据库用作MySQL后端。 为了简化过程，我们将使用单体应用程序。 我们还将使用Maven构建，因为它是我最喜欢的一个。

## 先决条件

对于本教程，您将需要：

* 一个Google Cloud Platform帐户。您可以使用[60天免费试用](https://cloud.google.com/free-trial/) 价值300美元的免费信用。
* [Google Cloud SDK](https://cloud.google.com/sdk/) 因为我们将从终端执行大部分操作. 我发现 [交互式安装程序](https://cloud.google.com/sdk/downloads#interactive) 非常方便。
* [Docker](https://www.docker.com/products/overview)
* 使用MySQL作为生产数据库的JHipster应用程序

## 初始化gcloud和kubectl

首先，如果您从未使用过`gcloud`，则需要使用以下命令对其进行初始化：

    gcloud init

使用`gcloud`，您可以在舒适的终端上执行大多数可以从Google Cloud Web控制台执行的操作。 首先，让我们安装`kubectl`

    gcloud components install kubectl

`Kubectl`是用于对Kubernetes集群运行命令的命令行界面。 您也可以直接从[Kubernetes网站](http://kubernetes.io/docs/user-guide/prereqs/) 进行安装，但总的来说，我发现gcloud的安装更为方便。

现在，您需要创建一个Google Cloud项目。 为此，您将需要通过Web控制台，因为gcloud不允许您从CLI创建项目（尚不是alpha功能）。
或者，您可以使用[资源管理器API](https://cloud.google.com/resource-manager/docs/creating-project) 。

* 转到 [Google Cloud Platform Console](https://console.cloud.google.com)
* 单击 **Create Project**
* 选择一个项目名称, 单击 **Create** 并记下项目ID，或者根据情况自定义。

在本教程中，我选择了名称`jhipster-kubernetes-cloud-sql`.

然后，您需要：

* 在项目上启用 [billing](https://console.cloud.google.com/billing) 
* 在项目上启用 [Container Engine API](https://console.cloud.google.com/projectselector/kubernetes/list) 
* 适用于Compute Engine，Cloud SQL和Container Engine，启用 [API Manager](https://console.cloud.google.com/apis/dashboard) 
* 启用 [Google Cloud SQL API](https://console.developers.google.com/apis/api/sqladmin/overview)

最后，您需要告诉`gcloud`您当前正在哪个项目上：

    gcloud config set project jhipster-kubernetes-cloud-sql

您还可以告诉它默认情况下您希望在何处创建实例。 我选择了`europe-west1-b`，因为我是一个欧洲人：)

    gcloud config set compute/zone europe-west1-b

## 创建一个Cloud SQL实例

然后，您需要创建一个Google Cloud SQL实例。 您可以通过Web控制台执行此操作，这将对可用选项有很好的了解，或者再次可以使用`gcloud`。

    gcloud beta sql instances create jhipster-sqlcloud-db --region=europe-west1 --tier=db-f1-micro\
     --authorized-networks=`curl -s ifconfig.co` --backup-start-time=01:00 --enable-bin-log \
     --activation-policy=ALWAYS --storage-type=HDD --storage-size=10GB


使用此命令，我们在`europe-west1`区域中创建一个名为`jhipster-sql-cloud-db`的SQL Cloud实例。 
我们选择最小的机器类型。 要查看可用层的完整列表，可以使用`gcloud sql tiers list`。 
然后，我们将自己的IP列入白名单，以便通过mysql CLI进行访问，设置从1AM UTC开始的备份时间窗口，启用二进制日志记录，以便在应用程序出现问题时可以及时返回。 
最后，我们将机器设置为始终处于激活状态（这是必要的，因为第二次使用的机器需要为每次使用付费），设置HDD存储（SSD性能更高，但性能更高 昂贵），并将存储大小设置为最小大小。 
注意：我们需要使用beta gcloud客户端来创建第二代SQL实例。

您可以使用以下命令检查您的实例是否已启动

    gcloud sql instances list
    NAME                   REGION        TIER         ADDRESS         STATUS
    jhipster-sqlcloud-db  europe-west1  db-f1-micro  146.148.21.155  RUNNABLE

由于我们将IP地址列入了白名单，因此我们应该能够使用mysql访问数据库实例。

    mysql --host=146.148.21.155 --user=root --password
    ...
    mysql>

由于我们已连接到数据库，因此让我们创建应用程序数据库和用户。 
由于我们将使用[Cloud SQL代理](https://cloud.google.com/sql/docs/sql-proxy) 从我们的应用程序容器连接SQL实例，因此可以将用户主机名设置为`cloudsqlproxy~%`如果您只想允许通过代理的连接。
本教程的应用程序名称为`jhipsterGoogleCloudSql`，因此，如果我们要使用JHipster生成的配置，则数据库名称应具有相同的名称。

    mysql> CREATE DATABASE jhipstergooglecloudsql;
    Query OK, 1 row affected (0,03 sec)

    mysql> CREATE USER 'jhipster'@'cloudsqlproxy~%';
    Query OK, 0 rows affected (0,01 sec)

    mysql> GRANT ALL PRIVILEGES ON jhipstergooglecloudsql.* TO 'jhipster'@'cloudsqlproxy~%';
    Query OK, 0 rows affected (0,01 sec)

    mysql> FLUSH PRIVILEGES;
    Query OK, 0 rows affected (0,02 sec)

别忘了在`application-prod.yml`中将数据库用户更改为jhipster。

## 创建一个容器集群

让我们使用[GKE](https://cloud.google.com/container-engine/docs/) 创建一个容器集群

    gcloud container clusters create jhipster-sqlcloud-cluster --zone=europe-west1-b --machine-type=g1-small --num-nodes=1

在本教程中，我们将仅使用1个小节点。 在生产中，您将需要至少3个节点：)

然后让我们让kubectl获得该集群的适当凭据

    gcloud container clusters get-credentials jhipster-sqlcloud-cluster

    Fetching cluster endpoint and auth data.
    kubeconfig entry generated for jhipster-sqlcloud-cluster.

## 构建并推送Docker映像

首先运行[Kubernetes子生成器]({{site.url}}/kubernetes) 。 
像往常一样回答问题，但让我们通过在Google Cloud上推送我们的docker镜像来使用Container引擎。
对于以下问题：“我们应该为基础Docker使用什么？ 存储库名称？”，通过`gcr.io / jhipster-kubernetes-cloud-sql`答复。替换为您的项目ID。对于docker镜像推送
命令让我们使用`gcloud docker-push`来推送到项目容器存储库。

建立你的映象

    mvn package -Pprod jibDockerBuild

标记图像（替换为您的jhipster应用程序名称）。 我们使用v1作为标记，以便能够轻松部署新版本
    应用程序或回滚（如果出现严重错误）。

    docker image tag jhipstergooglecloudsql gcr.io/jhipster-kubernetes-cloud-sql/jhipstergooglecloudsql:v1

然后，您可以按以下方式将图片推送到Google Container引擎：

    gcloud docker -- push gcr.io/jhipster-kubernetes-cloud-sql/jhipstergooglecloudsql:v1

##获取凭据并在Kubernetes中注册它们

为了使用Cloud SQL代理，我们将必须为我们的应用程序创建凭据并将其注册到 Kubernetes。
[Cloud SQL容器引擎连接文档](https://cloud.google.com/sql/docs/container-engine-connect) 中提供了完整的过程。
但让我在这里总结一下命令。

为您的JHipster应用程序创建一个服务帐户

    gcloud iam service-accounts create jhipster-application --display-name="JHipster application"

获取完整的IAM帐户名（用于生成密钥的电子邮件）

    gcloud iam service-accounts list
    NAME                                    EMAIL
    JHipster application                    jhipster-application@jhipster-kubernetes-cloud-sql.iam.gserviceaccount.com

将编辑者对项目的访问权限授予服务帐户

    gcloud projects add-iam-policy-binding jhipster-kubernetes-cloud-sql \
     --member serviceAccount:jhipster-application@jhipster-kubernetes-cloud-sql.iam.gserviceaccount.com \
     --role roles/editor

创建密钥并将其存储在 `jhipster-credentials.json`

    gcloud iam service-accounts keys create \
    --iam-account jhipster-application@jhipster-kubernetes-cloud-sql.iam.gserviceaccount.com jhipster-credentials.json

我们稍后将使用此密钥

用`kubectl`注册密钥

    kubectl create secret generic cloudsql-oauth-credentials --from-file=credentials.json=jhipster-credentials.json

## 修改Kubernetes部署配置

首先，由于我们要使用Cloud SQL实例，因此您可以删除生成的mysql部署文件。

然后，我们需要在`jhipstergooglecloudsql-deployment.yml`中进行一些更改。 首先是Spring数据源URL
应该更改为localhost，因为我们将使用Cloud SQL代理：

    jdbc:mysql://localhost:3306/jhipstergooglecloudsql?useUnicode=true&characterEncoding=utf8&useSSL=false

然后，您可以将版本号添加到容器映像中：

    image: gcr.io/jhipster-kubernetes-cloud-sql/jhipstergooglecloudsql:v1

然后，我们需要添加一个条目以使用sidecar模式部署云sql代理：

    - image: b.gcr.io/cloudsql-docker/gce-proxy:1.05
      name: cloudsql-proxy
      command: ["/cloud_sql_proxy", "--dir=/cloudsql",
                "-instances=jhipster-kubernetes-cloud-sql:europe-west1:jhipster-sqlcloud-db=tcp:3306",
                "-credential_file=/secrets/cloudsql/credentials.json"]
      volumeMounts:
        - name: cloudsql-oauth-credentials
          mountPath: /secrets/cloudsql
          readOnly: true
        - name: ssl-certs
          mountPath: /etc/ssl/certs

正如我们可能已经指出的，我们还需要提供SSL证书才能与Google API通信，以便我们可以连接到我们的
Cloud SQL实例。

最后添加适当的卷：

    volumes:
      - name: cloudsql-oauth-credentials
        secret:
          secretName: cloudsql-oauth-credentials
      - name: ssl-certs
        hostPath:
          path: /etc/ssl/certs

现在，完整的部署文件应如下所示：

    apiVersion: extensions/v1beta1
    kind: Deployment
    metadata:
      name: jhipstergooglecloudsql
    spec:
      replicas: 1
      template:
        metadata:
          labels:
            app: jhipstergooglecloudsql
        spec:
          containers:
          - name: jhipstergooglecloudsql
            image: gcr.io/jhipster-kubernetes-cloud-sql/jhipstergooglecloudsql:v1
            env:
            - name: SPRING_PROFILES_ACTIVE
              value: prod
            - name: SPRING_DATASOURCE_URL
              value: jdbc:mysql://localhost:3306/jhipstergooglecloudsql?useUnicode=true&characterEncoding=utf8&useSSL=false
            ports:
            - containerPort: 8080
          - image: b.gcr.io/cloudsql-docker/gce-proxy:1.05
            name: cloudsql-proxy
            command: ["/cloud_sql_proxy", "--dir=/cloudsql",
                      "-instances=jhipster-kubernetes-cloud-sql:europe-west1:jhipster-sqlcloud-db=tcp:3306",
                      "-credential_file=/secrets/cloudsql/credentials.json"]
            volumeMounts:
              - name: cloudsql-oauth-credentials
                mountPath: /secrets/cloudsql
                readOnly: true
              - name: ssl-certs
                mountPath: /etc/ssl/certs
          volumes:
            - name: cloudsql-oauth-credentials
              secret:
                secretName: cloudsql-oauth-credentials
            - name: ssl-certs
              hostPath:
                path: /etc/ssl/certs


然后，您可以使用`kubectl apply`来部署集群。

    kubectl apply -f jhipstergooglecloudsql

    deployment "jhipstergooglecloudsql" created
    service "jhipstergooglecloudsql" created


然后，您可以通过`kubectl get services”获得外部IP并测试您的应用程序

    kubectl get services jhipstergooglecloudsql
    NAME                     CLUSTER-IP     EXTERNAL-IP     PORT(S)    AGE
    jhipstergooglecloudsql   10.95.251.18   104.199.51.11   8080/TCP   1m
