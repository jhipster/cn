---
layout: default
title: 配置Redis Leader-Follower（主-从）复制
sitemap:
priority: 0.1
lastmod: 2020-03-23T12:30:00-00:00
---

# 配置Redis Leader-Follower(master-slave)复制

**提交者 [@zhx828](https://github.com/zhx828)**

在最新的JHipster生成器中，它为生产部署提供了redis集群设置。 但是通常，对于小型项目而言，这可能是过大的选择。 本文档提供了配置RedisLeader-Follower（主-从）复制的解决方案。 有关Redis复制的更多信息，请参见[** 相关文档 **](https://redis.io/topics/replication) 。

以下更改基于我自己的项目设置。 我假设您已经修改了应用程序属性以设置Redis密码，因此可以相应地调整自己的密码。


## 第1步

增加文件 `RedisProperties.java`:
```
public class RedisProperties {
    String type;
    String password;
    MasterSlaveRedisCache masterSlaveCache;
    SingleRedisCache singleCache;

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public MasterSlaveRedisCache getMasterSlaveCache() {
        return masterSlaveCache;
    }

    public void setMasterSlaveCache(MasterSlaveRedisCache masterSlaveCache) {
        this.masterSlaveCache = masterSlaveCache;
    }

    public SingleRedisCache getSingleCache() {
        return singleCache;
    }

    public void setSingleCache(SingleRedisCache singleCache) {
        this.singleCache = singleCache;
    }
}
```

## 第二步
增加Redis属性文件 `ApplicationProperties.java`
```
public class ApplicationProperties {
    ...

    private RedisProperties redis;
    
    public RedisProperties getRedis() {
        return redis;
    }

    public void setRedis(RedisProperties redis) {
        this.redis = redis;
    }
    ...
}
```

## 第3步
更新文件 `CacheConfiguration.java`中的 `jcacheConfiguration`方法。这些更改必须与当前群集设置结合在一起。

```
if (applicationProperties.getRedis().getType().equals(RedisType.SINGLE.getType())) {
    config.useSingleServer()
        .setAddress(applicationProperties.getRedis().getSingleCache().getAddress())
        .setPassword(applicationProperties.getRedis().getPassword());
} else if (applicationProperties.getRedis().getType().equals(RedisType.MASTER_SLAVE.getType())) {
    config.useMasterSlaveServers()
        .setMasterAddress(applicationProperties.getRedis().getMasterSlaveCache().getMasterAddress())
        .addSlaveAddress(applicationProperties.getRedis().getMasterSlaveCache().getSlaveAddress())
        .setPassword(applicationProperties.getRedis().getPassword());
} else {
    throw new Exception("The redis type " + applicationProperties.getRedis().getType() + " is not supported. Only single and master-slave are supported.");
}
```

## 第4步
更新 `application-dev.yml` 使用单个服务器
```
application:
  profile: dev
  redis:
    type: 'single'
    password: 'public-redis-password'
    single-cache:
      address: 'redis://localhost:6379'

```

## 第5步
更新 `application-prod.yml` 使用主从服务器
```
application:
  profile: prod
  redis:
    type: 'master-slave'
    password: 'public-redis-password'
    master-slave-cache:
      master-address: 'redis://redis-master:6379'
      slave-address: 'redis://redis-slave:6379'

```
