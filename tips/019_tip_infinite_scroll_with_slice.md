---
layout: default
title: 借助Slice提升无限滚动性能
sitemap:
priority: 0.5
lastmod: 2016-11-12T22:22:00-00:00
---

# 借助Slice提升无限滚动性能

__提交者 [@nkolosnjaji](https://github.com/nkolosnjaji)__

使用无限滚动的分页使用Spring Data Page从数据库中检索实体。
这将触发两个查询，一个查询获取实体，第二个查询“全部计数”以确定分页的总项。 无限滚动不需要有关总大小的信息，而仅在有下一页要加载时才需要。 为了避免使用`count all`查询（在处理大型数据集时这可能是一项昂贵的操作），请使用[Slice](http://docs.spring.io/spring-data/commons/docs/current/api/org/springframework/data/domain/Slice.html)（而不是Page）将提高无限滚动的性能。

我们将使用自定义HTTP标头“ X-Has-Next-Page”将信息发送到前端无限滚动插件。

  * 在您的实体存储库中定义新方法：

```
Slice<YourEntity> findSliceBy(Pageable pageable);
```

  * 在`web/rest/util`包中的`PaginationUtil.java`中定义新的静态方法

```
public static HttpHeaders generateSliceHttpHeaders(Slice<?> slice) {
  HttpHeaders headers = new HttpHeaders();
  headers.add("X-Has-Next-Page", "" + slice.hasNext());
  return headers;
}
```

  * 修改REST控制器以调用Slice而不是Page并生成新的HTTP标头。

```
@GetMapping("/<YourEntities>")
@Timed
public ResponseEntity<List<Repo>> getAllRepos(Pageable pageable)
    throws URISyntaxException {
    Slice<YourEntity> slice = repoRepository.findSliceBy(pageable);
    HttpHeaders headers = PaginationUtil.generateSliceHttpHeaders(slice);
    return new ResponseEntity<>(slice.getContent(), headers, HttpStatus.OK);
}
```

  * 在`entity.controller.js`中定义新的视图模型

```
vm.hasNextPage = false;
```

  * 从响应中提取HTTP标头值，并将其分配给以下视图模型

```
function onSuccess(data, headers) {
    vm.hasNextPage = headers('X-Has-Next-Page') === "true";
    ...
}
```

  * 在`<your-entities> .html`中使用带有无限滚动插件的视图模型

```
<tbody infinite-scroll="vm.loadPage(vm.page + 1)" infinite-scroll-disabled="!vm.hasNextPage">
```
