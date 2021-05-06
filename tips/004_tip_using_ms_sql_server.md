---
layout: default
title: 使用MS SQL Server
sitemap:
    priority: 0.1
    lastmod: 2016-12-01T00:00:00-00:00
---
# 如何在JHipster中使用MS SQL Server

__提交人 [@Zyst](https://github.com/Zyst)__

#### 自[pull request #4589](https://github.com/jhipster/generator-jhipster/pull/4589) 以后，MSSQL支持已添加到生成器中, 因此您不再需要任何特定的配置！

_目标：_ 在本教程结束时，您将在SQL Server上运行默认的JHipster应用程序，所有功能均已正常运行。

首先以`jhipster`正常运行JHipster，然后选择使用基于token的身份验证，SQL，MySQL作为开发数据库。 MySQL为产品数据库。 带有ehcache，无Elasticsearch，无集群HTTP，无Websockets，使用Maven和Grunt，不使用Sass。

然后，我们将MS SQL Server JDBC依赖项添加到项目`pom.xml`文件中。

_pom.xml_

    [...]
    <!-- Microsoft JDBC -->
    <dependency>
        <groupId>com.microsoft.sqlserver</groupId>
        <artifactId>sqljdbc41</artifactId>
        <version>4.1</version>
    </dependency>
    <!-- Liquibase MS SQL Server extensions -->
    <dependency>
        <groupId>com.github.sabomichal</groupId>
        <artifactId>liquibase-mssql</artifactId>
        <version>1.4</version>
    </dependency>
    [...]

我正在使用Sql JDBC 4.1，并且已经将其安装到我的个人仓库中，但是如果您不这样做，那么在没有进行进一步配置的情况下将无法正常工作，请查看[this](https://stackoverflow.com/questions/30207842/add-external-library-jar-to-spring-boot-jar-internal-lib) stackoverflow问题以供进一步参考。

Liquibase MS SQL Server扩展允许您执行一些更灵活的操作，我们将在本教程的后面部分中使用它们。

##数据库修改

进入`src\main\resources\config\application-dev.yml`并更改您的应用程序以使用新的数据源，并更改您的Hibernate配置以使用SQL Server的方言，如下所示：

_application-dev.yml_

    spring:
        profiles:
            active: dev
        datasource:
            driver-class-name: com.microsoft.sqlserver.jdbc.SQLServerDataSource
            url: jdbc:sqlserver://localhost:1433;databaseName=test
            databaseName:
            serverName:
            username: myuser
            password: supersecretpassword
            cachePrepStmts: true
            prepStmtCacheSize: 250
            prepStmtCacheSqlLimit: 2048
            useServerPrepStmts: true

        jpa:
            database-platform: org.hibernate.dialect.SQLServerDialect
            database: SQL_SERVER
            openInView: false
            show_sql: true
            generate-ddl: false
            [...]

假设您的数据库称为`test`，请根据需要更改连接URL。

现在进入 `*\src\main\resources\config\liquibase\changelog\00000000000000_initial_schema.xml` 并在文件顶部更改以下属性：

_00000000000000_initial_schema.xml_

    <databaseChangeLog
        xmlns="http://www.liquibase.org/xml/ns/dbchangelog"
        xmlns:ext="http://www.liquibase.org/xml/ns/dbchangelog-ext"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.liquibase.org/xml/ns/dbchangelog http://www.liquibase.org/xml/ns/dbchangelog/dbchangelog-3.1.xsd
        http://www.liquibase.org/xml/ns/dbchangelog-ext http://www.liquibase.org/xml/ns/dbchangelog/dbchangelog-ext.xsd">

        <property name="now" value="now()" dbms="mysql,h2"/>
        <property name="now" value="current_timestamp" dbms="postgresql"/>
        <property name="now" value="GETDATE()" dbms="mssql"/>

        <changeSet id="00000000000000" author="jhipster" dbms="postgresql">
            <createSequence sequenceName="hibernate_sequence" startValue="1000" incrementBy="1"/>
        </changeSet>
        [...]

首先，请确保您已将xml databaseChangeLog属性更改为包括ext。 现在在src\main\resources\config\liquibase\changelog\00000000000000_initial_schema.xml`中找到数据条目并进行更改：

_00000000000000_initial_schema.xml_

    <ext:loadData encoding="UTF-8"
              file="config/liquibase/users.csv"
              separator=";"
              tableName="JHI_USER" identityInsertEnabled="true">
        <column name="activated" type="boolean"/>
        <column name="created_date" type="timestamp"/>
    </ext:loadData>
    <dropDefaultValue tableName="JHI_USER" columnName="created_date" columnDataType="datetime"/>

    <ext:loadData encoding="UTF-8"
                  file="config/liquibase/authorities.csv"
                  separator=";"
                  tableName="JHI_AUTHORITY"
                  identityInsertEnabled="true" />

    <ext:loadData encoding="UTF-8"
                  file="config/liquibase/users_authorities.csv"
                  separator=";"
                  tableName="JHI_USER_AUTHORITY"
                  identityInsertEnabled="true" />

添加`identityInsertEnabled = "true"`与使用`IDENTITY_INSERT ON`和`IDENTITY_INSERT OFF`包裹插入内容相同，这将允许您直接插入项目自动生成的ID。 这就是为什么我们要使用MS SQL Server Liquibase。

现在尝试运行您的应用程序！ 一切都应该正常工作，并且您应该继续将JHipster应用程序与SQL Server一起使用。