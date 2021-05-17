---
layout: default
title: Docker中的时间漂移
sitemap:
priority: 0.1
lastmod: 2020-05-02T06:14:00-00:00
---

# Docker中的时间漂移

**提交者 [@SudharakaP](https://github.com/SudharakaP)**

长时间运行Docker（之间有睡眠周期）时应考虑的事情之一是，在Docker容器与OS时钟之间可能会发生时间漂移。

这导致难以发现的错误，例如[https://github.com/jhipster/generator-jhipster/issues/11659](https://github.com/jhipster/generator-jhipster/issues/11659) 。

已报道[Macs](https://github.com/docker/for-mac/issues/2076)和[Windows](https://github.com/docker/for-win/issues/4526)的Docker时间漂移，
最简单的解决方案是在长时间的睡眠周期后重新启动Docker容器。