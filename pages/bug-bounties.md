---
layout: default
title: 漏洞悬赏
permalink: /bug-bounties/
sitemap:
    priority: 0.1
    lastmod: 2018-07-20T00:00:00-00:00
---
# <i class="fa fa-usd"></i> 漏洞悬赏

## 介绍

在这里[JHipster bug tracker](https://github.com/jhipster/generator-jhipster/issues)处于opened状态, 带有"\$\$ bug-bounty \$\$"标签的问题: 谁解决了这些问题就可以获得赏金, 根据问题程度不同赏金从 $100、$200、$300到$500!

## 谁可以创建漏洞悬赏?

- [银牌赞助商和金牌赞助商]({{ site.url }}/sponsors/)
- 三个[核心开发团队组长]({{ site.url }}/team/), [@jdubois](https://github.com/jdubois), [@deepu105](https://github.com/deepu105)和[@pascalgrimaud](https://github.com/pascalgrimaud).

## 漏洞悬赏赏金有多少？?

"$$ bug-bounty $$"标签旁边应有一个"$100", "$200", "$300"或者"$500"标签，告诉了您该漏洞值多少赏金。

## 当前有效的漏洞赏金清单在哪里?

漏洞赏金主要在主项目上提供，但也会在GitHub上的JHipster组织下的子项目中提供。

- [所有项目的漏洞悬赏](https://github.com/search?l=&p=1&q=is%3Aissue+is%3Aopen+label%3A%22%24%24+bug-bounty+%24%24%22+user%3Ajhipster+state%3Aopen&ref=advsearch&type=Issues&utf8=%E2%9C%93)
- [主项目的漏洞悬赏](https://github.com/jhipster/generator-jhipster/labels/%24%24%20bug-bounty%20%24%24)
- [JHipster VueJS子项目的漏洞悬赏](https://github.com/jhipster/jhipster-vuejs/labels/%24%24%20bug-bounty%20%24%24)

漏洞狩猎愉快 :-)

## 漏洞悬赏创建流程

创建问题后，需要以下两个步骤来获取漏洞悬赏标签:

- 银牌赞助商或者金牌赞助商在问题下添加评论，要求添加漏洞悬赏标签, 并在Github通知[@jdubois](https://github.com/jdubois), [@deepu105](https://github.com/deepu105)或者[@pascalgrimaud](https://github.com/pascalgrimaud).
- [@jdubois](https://github.com/jdubois), [@deepu105](https://github.com/deepu105) or [@pascalgrimaud](https://github.com/pascalgrimaud) 会直接添加标签, 如果他们认为这是一项重要的新功能、严重的Bug、长期存在的问题或一项耗时的任务. 如果您正在处理某个问题，并且认为应该得到赏金，请毫不犹豫地询问项目负责人

为了有效性, 漏洞悬赏的标签[\$\$ bug-bounty \$\$](https://github.com/jhipster/generator-jhipster/labels/%24%24%20bug-bounty%20%24%24) 应该由
[@jdubois](https://github.com/jdubois), [@deepu105](https://github.com/deepu105) 或者[@pascalgrimaud](https://github.com/pascalgrimaud)来添加. 同时也应该有一个“$100”、“$200”、“$300”或“$500”标签来标识悬赏金额, 如果忘记添加了标签, 默认为"$100".

## 如何获得赏金

创建漏洞悬赏之后，任何人都可以提出修复建议（甚至包括[@jdubois](https://github.com/jdubois), [@deepu105](https://github.com/deepu105)或[@pascalgrimaud](https://github.com/pascalgrimaud)). 我们的目标是花费这笔钱，以便尽快解决问题.

为了可以正常获得赏金, 你必须:

- 创建一个Pull Request，用"\$\$ bug-bounty \$\$"标签标识已修复.
- 为了自动关闭问题，必须在提交日志中包含"Fix"关键字，例如，`Fix #1234`将关闭`#1234`问题
- 该Pull Request必须由核心团队中的某人合并。如果有多个Pull Request，核心团队成员则会选择最新的还是最好的一个-由团队成员来决定最适合项目的提交。
- 然后，您可以在JHipster的OpenCollective上增加一个$100，$200，$300或$500的支付费用。您必须在说明中添加Pull Request的链接（例如：`$100 bug bounty claim for https://github.com/jhipster/generator-jhipster/pull/1234`).
- 然后，您必须在Pull Request上添加注释，告知您已领取款项，并附带指向OpenCollective费用的链接。这可以确保解决此问题并和取得款项的是同一个人.
- 然后，这笔费用将通过[@jdubois](https://github.com/jdubois)、[@deepu105](https://github.com/deepu105)或者[@pascalgrimaud](https://github.com/pascalgrimaud)进行验证，您将从您的Paypal帐户中收到款项.