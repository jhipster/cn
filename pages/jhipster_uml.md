---
layout: default
title: JHipster-UML
permalink: /jhipster-uml/
redirect_from:
  - /jhipster_uml.html
sitemap:
    priority: 0.5
    lastmod: 2017-11-27T12:00:00-00:00
---

# <i class="fa fa-magic"></i> JHipster-UML

请注意，该项目已过时，不再使用。

替代方案，我们建议您使用此项目的JDL导出功能将XMI文件导出到可以使用的JDL文件，并通过JDL Studio建立实体模型。

要了解有关JDL的更多信息，请前往[此处]({{ site.url }}/profiles/)。

***

JHipster-UML是一个JHipster子项目，可以用来代替[实体子生成器]({{ site.url }}/creating-an-entity/)。这个想法是，使用视觉工具来[管理关系]({{ site.url }}/managing-relationships/)比使用经典的Yeoman问答更容易。

JHipster-UML项目 [可在GitHub上获得](https://github.com/jhipster/jhipster-uml/)，它是一个开源项目，类似JHipster（Apache 2.0许可证）。如果您喜欢这个项目，别忘了在GitHub上给我们加星！

这是此页面上介绍的内容：

1. [介绍](#introduction)
2. [问题与错误](#issues)
3. [安装](#install)
4. [如何使用JHipster-UML](#howtouse)  
    4.1. [UML文件](#umlfile)  
    4.2. [使用JHipster-UML](#usejuml)  
    4.3. [生成了什么](#whatsgenerated)  
    4.4. [JHipster笔记](#jhipsternotes)  
    4.5. [保留字](#reservedwords)  
5. [示例](#examples)  
    5.1. [Modelio](#modelioexample)  
    5.2. [UML Designer](#umldesignerexample)  
    5.3. [GenMyModel](#genmymodelexample)  
    5.4. [其他编辑器](#othereditors)  
    5.5. [枚举](#enumerationexamples)  
    5.6. [表名](#tablenames)  
    5.7. [必要的关系](#requiredrels)  
6. [测试](#testing-juml)
7. [贡献：问题和提升](#contributing)  
    7.1. [解析器修改](#parsermodifications)
8. [附录](#annexes)

***

# <a name="introduction"></a>介绍

JHipster-UML是常用的问答式实体生成器替代方法，因为它使您可以使用UML编辑器创建将由JHipster-UML解析的图。

这是我们支持的编辑器列表：

  - [Modelio](https://www.modeliosoft.com/);
  - [UML Designer](http://www.umldesigner.org/);
  - [GenMyModel](https://www.genmymodel.com/) (not free, but online).

***

# <a name="issues"></a>问题与错误

JHipster-UML[在GitHub上可用](https://github.com/jhipster/jhipster-uml)，并[遵循与JHipster相同的贡献准则](https://github.com/jhipster/generator-jhipster/blob/master/CONTRIBUTING.md)。

请使用我们的项目提交问题和Pull Requests：

- [JHipster-UML issue tracker](https://github.com/jhipster/jhipster-uml/issues)
- [JHipster-UML Pull Requests](https://github.com/jhipster/jhipster-uml/pulls)

提交任何内容时，您都必须尽可能精确：
  - **一个isuue必须只包含一个问题**  (一个需求或一个问题);
  - 欢迎Pull requests，但是提交日志必须简洁明了，具有’原子’可读性。

请注意，使用JHipster-UML（或JHipster）可能会很麻烦（必须安装一些工具才能不会出现任何问题，真正使用Node环境）。如果您在Windows上遇到问题，此[链接](https://gist.github.com/nullivex/7115612)可能会有所帮助。
    
在Windows上可能遇到的另一个问题是[这个](https://stackoverflow.com/questions/30344858/node-script-executable-not-working-on-mac-env-node-r-no-such-file-or-directo#answer-30349952)。该链接提供了解决此问题的解决方案。

最后，Windows用户使用Git Bash报告的一个问题。JHipster生成器的问题（来自InquirerJS），无法正常工作（用户在回答问题时陷入困境）。使用JHipster UML（或JHipster）时，可能要使用Powershell或其他Shell。

***

# <a name="install"></a>安装
要安装JHipster UML，只需使用以下命令：

 ```
   npm install -g jhipster-uml
   # or
   yarn global add jhipster-uml
 ```

但是，如果您不希望在全局安装最新版本，因为它与您的生成器版本不匹配（请参见下文），或者您希望仅在当前目录安装，请使用以下命令：

  ```
    npm install jhipster-uml --save-dev
    # or
    yarn add jhipster-uml --dev
  ```

如果您想要一个“前卫”的（几乎完全可以安全使用）版本，则可以从[我们GitHub项目](https://github.com/jhipster/jhipster-uml)中克隆git repo：

  `git clone https://github.com/jhipster/jhipster-uml.git` 用于HTTPS

  `git clone git@github.com:jhipster/jhipster-uml.git` 用于SSH


JHipster UML是 _可以_ 与JHipster的生成器一起使用的工具。如果您使用的是v3.0.0之前的生成器，则必须使用JHipster UML v1.6.5（最新修补版本）。否则，使用v2.0.0+是生成器v3.0.0+的选择。

***

# <a name="howtouse"></a>如何使用它
JHipster-UML非常易于使用，您只需要在XMI中导出一个类图，JHipster-UML就会对其进行解析以创建您的实体。

## <a name="umlfile"></a>UML文件

类图应该对JHipster应用程序域的实体进行建模，因此存在一些限制，必须遵循这些方法。

### 实体
每个实体都由一个类表示，其字段是该类的属性。属性必须具有JHipster支持的类型，否则它将不起作用。要使JHipster支持“BigDecimal”，“LocalDate”…等类型，可以为其创建 _PrimitiveType_ 或 _DataType_。您可以在[此处](#annexes)查看具有JHipster支持的所有类型的表格以及可用于每种类型的验证方式。

![Book Entity]({{ site.url }}/images/jhipsteruml_book_datatype.png)

这是为JHipster正确创建的类的示例。具有属性 _publicationDate_ 和 _price_，它们的类型为 _BigDecimal_ 和 _LocalDate_，我们将其创建为 _DataType。_
请注意，您不需要将类型名称大写（**除了诸如BigDecimal**，JHipster-UML的组合名称大写简单名称）之外。

### 关系
我们仅使用JHipster中的示例来展示如何使用编辑器。
请注意，我们**仅**支持[关系管理]({{ site.url }}/managing-relationships/)页面中列出的关系。

#### 一对一
![One-to-One]({{ site.url }}/images/jhipsteruml_bi_oto.png)

在这里，我们在Driver和Car之间存在双向一对一关系，其中驾驶员为该关系的所有者。

如果您正在寻找单向关系：

![One-to-One2]({{ site.url }}/images/jhipsteruml_uni_oto.png)

请注意，为了实现单向关系，我们只是删除了`citizen`标签，以便`Passport`没有包含它。

#### 一对多
![One-to-Many]({{ site.url }}/images/jhipsteruml_bi_otm.png)

在这种双向关系中，所有者可以拥有许多汽车，而一辆汽车只能具有一个所有者。

JHipster尚不支持一对多关系的单向关系（有关此信息，请参阅[此]({{ site.url }}/managing-relationships/#3页面）。这是这种关联的一个示例：

![One-to-Many2]({{ site.url }}/images/jhipsteruml_uni_otm.png)


#### 多对一

如先前所示，一对多关系的等效关系是多对一：

![One-to-Many2]({{ site.url }}/images/jhipsteruml_uni_mto.png)

现在，汽车知道了它们的所有者，但相反却不可以。

#### 多对多
![Many-to-Many]({{ site.url }}/images/jhipsteruml_bi_mtm.png)

在这里，我们在车（所有者）和驾驶员之间建立了多对多关系。

#### 声明要用于在Angular中显示关系的字段
为此，必须在注入的字段名称之后的`(``)`之间添加字段名称。

在一对多关系中，您可以将其添加到关系的'Many'侧：

- UML

![otherEntityField One-to-Many]({{ site.url }}/images/jhipsteruml_otherEntityFieldOM.jpeg)

- JDL

      relationship OneToMany {
        One{many} to Many{one(<otherEntityField>)}
      }

在多对多关系中，您可以将其添加到实体的所有者侧：

- UML

![otherEntityField Many-to-Many]({{ site.url }}/images/jhipsteruml_otherEntityFieldMM.jpeg)

- JDL

      relationship ManyToMany {
        Owner{notOwner(<otherEntityField>)} to NotOwner{owner}
      }


#### 自反案例
![Reflexivity]({{ site.url }}/images/jhipsteruml_reflexivity.png)

如您所见，自反性有3种类型。JHipster-UML仅支持前两个（一对一和一对多）。**不**支持多对多情况，因为：

  - 这可能导致模型过于复杂和错误（可以更轻松地实现相同的效果）；
  - JHipster不支持（这是一件好事）。


### 一个完整的例子
我们使用[此处](http://docs.oracle.com/cd/B28359_01/server.111/b28328/diagrams.htm#G5482)提供的Oracle HR示例中的图表。

以下是此图表的屏幕截图（来自Modelio）：
![HR UML diagram]({{ site.url }}/images/jhipsteruml_overviewdiagram.png)

如您所见，我们对其进行了更改，以使其更加有趣。
JHipster可以在它们之间生成实体和关联（一对一，一对多等），并且在此示例中，我们添加了每种关联类型（甚至是自反和继承）。JHipster尚不支持继承（但JHipster支持自反，但会警告），但我们决定将其包括在示例中，以便具有坚实的基础。

## <a name="usejuml"></a>使用JHipster-UML

设置好JHipster应用程序并在UML编辑器中创建类图后，请按照以下步骤操作：

- 第1步-将类图导出为XMI文件格式

- 步骤2-在您的JHipster应用程序根文件夹中，执行命令

 `jhipster-uml <your_file.xmi>`

请注意，您不需要提供数据库类型（sql，mongodb或cassandra），因为JHipster-UML会从 _.yo-rc.json_ 文件中为您检测到该类型。

但是，如果您希望在JHipster应用程序外部执行JHipster-UML，则需要传递一个额外的参数：数据库类型名称。
这是要执行的命令：

 `jhipster-uml <your_file.xmi> [--db (sql | mongodb | cassandra)]`

也可以生成JHipster DTO，只需传递`--dto`参数即可启用此功能。

 `jhipster-uml <your_file.xmi> [--db (sql | mongodb | cassandra)] [--dto]`

您可以使用`--paginate`为实体选择分页。

 `jhipster-uml <your_file.xmi> [--db (sql | mongodb | cassandra)] [--paginate]`

最后，您可以使用`--service`为您的实体选择服务。

 `jhipster-uml <your_file.xmi> [--db (sql | mongodb | cassandra)] [--service]`

**请注意，使用`paginate`选项而不选择任何实体来生成分页，将取消您选择使用此选项的选择。**

最后，如果您需要帮助，也可以使用以下命令：

 `jhipster-uml --help`


* 步骤3-就是这样！


**注意：如果要使用可用的类和方法，则JHipster-UML的首选入口点是ParserFactory（这样就不必打开，读取文件，查找根元素等）。**

## <a name="jumlfile"></a>JHipster-UML文件

可以通过命令行和/或基于JSON的配置文件`jumlfile`来配置JHipster-UML。
帮助中描述的选项可以在两者中使用，但是命令行优先于`jumlfile`。

### 一个具体的例子

jumlfile内容：
```json
{
  "db": "sql",
  "force": "true"
}
```
使用:
```
jhipster-uml --no-force
```
您将具有以下执行的选项：
- db : sql
- force : false (without force)


## <a name="whatsgenerated"></a>发生了什么

执行JHipster-UML后，将创建 _.jhipster_ 文件夹（如果以前不存在），并以JSON格式填充XMI文件中存在的实体。

请注意，至少可能不会生成一个实体：用户实体。创建新应用程序时，它实际上是由JHipster搭建的（JHipster-UML会显示警告消息）。

接下来，这非常简单：只需运行您的应用程序即可！

## <a name="jhipsternotes"></a>JHipster笔记

JHipster是一个很棒的脚手架工具，具有许多约定，使用JHipster-UML生成实体时，其中一些值得一提：

  - 您无需在实体中使用`id`字段，因为JHipster默认会生成一个ID字段，并且JHipster-UML会在检测到任何ID字段时将其删除；
  - 您不必在关系中使用复数形式，JHipster会在需要时添加。例如，如果实体A和实体B之间存在多对多关系，那么您不必将关系的结尾命名为`as`或`bs`，因为JHipster会自动为您做到这一点。

## <a name="reservedwords"></a>保留字

JHipster维护（*在某些条件下*）禁止的单词列表。
例如，如果您想为您的应用程序生成实体，并且此应用程序使用Cassandra，则不能在字段名称或表名称中使用`BATCH`字样。

从v2.0.0版本开始，JHipster UML会检测到此类单词，并在遇到这种情况时立即引发异常。但是，当保留字不能使用或不能使用时，JHipster UML不能以100％的准确度检测。因此，当存在使用此类关键字的风险时，它会向用户发出黄色消息警告。

***

# <a name="examples"></a>范例

这里将讨论每个编辑器，以便您知道如何获取一个优秀的XMI文件。

**注意：JHipster-UML可以检测到错误的XMI文件，它将显示找到的第一个错误并立即退出（故障快速行为）。**

在JHipster-UML中，每个编辑器均已通过Oracle示例进行了测试。如果您希望在"dummy project"中看到示例，则只需为每个编辑器下载这些文件，然后测试JHipster和JHipster-UML：

  - 使用Modelio: [modelio.xmi](https://github.com/jhipster/jhipster-uml/blob/master/test/xmi/modelio.xmi);
  - 使用UML Designer: [umldesigner.uml](https://github.com/jhipster/jhipster-uml/blob/master/test/xmi/umldesigner.uml);
  - 使用GenMyModel: [genmymodel_evolve.xmi](https://github.com/jhipster/jhipster-uml/blob/master/test/xmi/genmymodel_evolve.xmi).


## <a name="modelioexample"></a>Modelio

**Mac用户注意：Modelio在Mac（GUI）上表现异常，可能是由于Mac上的图形和窗口管理器引起的，因为尚未在Linux Ubuntu上对其进行诊断。它可以工作，但是互动体验可能并不愉快。**

**重要版本说明：**  
  - Modelio v3.3已通过测试并可以正常工作，但是v3.4中存在一个错误，阻止用户导出图表。自v3.4.1起，此错误已修复。
  - Modelio v3.5.X在处理双向多对多关系时引入了一个错误（JHipster UML解析XMI时的错误是`Cannot read property '0' of undefined`）。此问题似乎已在更高版本（v3.6.X）中修复。

可在[此处](https://www.modelio.org/)免费下载Modelio。如果要下载任何3.3+版本，请确保您具有Java 8环境（否则将无法正常运行）。

示例文件在[这里](https://github.com/jhipster/jhipster-uml/blob/master/test/xmi/modelio.xmi)。

启动后，创建一个项目，您将看到以下视图：

![Empty Modelio project]({{ site.url }}/images/jhipsteruml_modelio_1.png)

请注意左侧面板上的'Class Model'。您只需要'Class', 'Attributes', 'Aggregation', 'Composition'和'Data Type'对象。
您已经猜到了为什么需要第一个2。'Aggregation'对象用于定义聚合：B聚合到A意味着A具有0、1或更多（n）个B实例。A不创建（并且销毁）B实例。
组合意味着如果A由B（0、1或n个实例）组成，那么它将创建，管理和销毁B实例。

您可以使用它们中的任何一个，无论如何，解析器只会将两者视为关联。

在两种情况下，基数名和关联名都很重要。

最后，'Data Types'对象使您可以创建自定义类型（M​​odelio不建议使用的类型），例如`BigDecimal`或`LocalDate`。

在此示例中，我们将说明如何连接两个类：

![Modelio composition example]({{ site.url }}/images/jhipsteruml_modelio_2.png)

如您所见，员工有工作（但也根本没有工作）。解析器将注意以下几点：

  - 两个类（员工和工作）；
  - 两个字段（电子邮件和标题），它们的类型，它们属于哪个类（每个类都包含其字段）。没有考虑它们的可见性；
  - 将它们链接起来的关联以及关联的**方向**（很重要！）；
  - 基数（1和0..1）表示一个雇员可以拥有一份工作（0或1），并且该工作不能由两名雇员共享（在此示例中，只有一名雇员）；
  - 有一个**注入的字段**：在员工中的job。
    
这种关联称为一对一。返回上几节以查看其他类型的关联。

Modelio支持约束。双击一个字段，转到'Notes and constraints'选项卡，第一个图标应为'Add a constraint'，然后选择'Constraint'，双击约束，并为其命名（它应该是JHipster约束之一）。对于约束值，请在'Body'字段中输入。

最后，完成图后，只需导出即可。

![Export to XMI Modelio]({{ site.url }}/images/jhipsteruml_modelio_3.png)

Check the Model perspective, once you locate your project, get down one level and right click the last element (you lower-cased project's name), XMI, Export XMI. A window should pop up, select the output path, change the compatibility to OMG UML2.4.1, leave the extension to XMI and you're ready to go.
检查模型透视图，找到项目后，进入下一层并右键单击最后一个元素（您的小写项目名称），XMI，导出XMI。应该会弹出一个窗口，选择输出路径，将兼容性更改为OMG UML2.4.1，将扩展名保留为XMI，您就可以开始了。

### 注释

要注释一个类（或属性），只需双击该元素，选择`Notes and constraints`选项卡，然后添加`note`。

![Modelio, commenting]({{ site.url }}/images/jhipsteruml_modelio_commenting.png)

请注意，此编辑器无法注解关系。

## <a name="umldesignerexample"></a>UML Designer

UML Designer可以在[这里](http://www.umldesigner.org/)下载。
它的工作方式与Eclipse相同。
要创建一个空项目，只需单击File-> New-> Modeling Project。输入名称，然后验证。
如果未创建file.uml，请右键单击您的项目，然后单击New -> Other -> UML Designer -> UML Model，然后输入所需的任何名称。

示例XMI文件在[此处](https://github.com/jhipster/jhipster-uml/blob/master/test/xmi/umldesigner.uml)可用。

然后，您将看到类似这样的视图：

![UML Designer, dashboard]({{ site.url }}/images/jhipsteruml_umldesigner_1.png)

双击'Design'类别下的'Class diagram'。
现在，您可以在右侧看到'Palette'。您只需要这些对象：'Class', 'PrimitiveType', 'DataType'（均在'Enumeration'下），'Composition'和'Aggregation'（均在'Association'下）。

使用UML Designer，您可以使用DataType或PrimitiveType（解析器识别两者）来创建自定义类型。

这是使用此编辑器的示例：

![Employee and Job with UML Designer]({{ site.url }}/images/jhipsteruml_umldesigner_2.png)

要创建属性，只需双击该类，然后添加您的属性。您可以通过右键单击图上的某个地方（在空白处）来导入类型，然后导入原始类型，然后选择UML和Java。
这将省去手动创建类型（使用DataTypes或PrimitiveTypes）的 _繁琐_ 工作。

不幸的消息是，UML Designer还不支持约束。

UML Designer提供的好处之一是，您无需导出到XMI，只需转到工作区，您将看到保存的项目已经采用了正确的格式，因此非常酷。

## 单向关系

该编辑器支持单向关系。为此，请在两个类之间创建所需的关系，双击该关系并进行调整。

### 注释

可以对类和属性（而不是关系）进行注释，并且很容易做到：单击一个元素，然后选择`comment`以添加自己的注释。

![Uml Designer, commenting]({{ site.url }}/images/jhipsteruml_umldesigner_commenting.png)


## <a name="genmymodelexample"></a>GenMyModel

GenMyModel是一个基于浏览器访问的UML编辑器，可以在[这里](https://dashboard.genmymodel.com/)找到。您可以免费使用它，但有限制，我们希望该编辑器将使用户能够轻松使用JHipster-UML，而无需下载应用程序。

XMI文件示例位于[此处](https://github.com/jhipster/jhipster-uml/blob/master/test/xmi/genmymodel_evolve.xmi)。

注册后，转到Projects ->  New Projects，给它一个名称，在Model Type中选择UML，在默认图中选择Diagram，然后单击Create project。
然后将显示此屏幕：

![GenMyModel dashbord]({{ site.url }}/images/jhipsteruml_genmymodel_empty_diagram.png)

在网格左侧的面板上，显示了所有可以绘制图表的元素。我们只需要元素'Class', 'DataType', 'Attribute', 'Aggregation'和'Composition'。您可以使用'Aggregation'或'Composition'，解析器将仅看到两个类之间的关联及其基数。

这是一个示例，说明如何创建两个实体，它们之间具有一对多的关系，并通过'DataType'声明JHipster类型：

![GenMyModel diagram]({{ site.url }}/images/jhipsteruml_genmymodel_relation.png)

解析器将注意以下几点：

  - 两个类, 'Author'和'Book'.

  - 两种数据类型, 'LocalDate'和'BigDecimal'.

  - 属性，您可以使用默认属性或声明的DataTypes设置类型。

  - 'Author'和'Book'之间的聚合关系（方向很重要！）。

  - 两个注入字段，Book中的'author'和Author的'book'。

  - 基数（1和0..\*）表示一本书可以有一个作者，而一个作者可以有几本书，这对应于作者和图书之间的一对多关系。

不幸的是，您不能为属性创建适合JHipster的自定义约束。

完成类图后，可以将其导出到XMI。为此，只需单击Tool -> Export as UML (XMI)

### 单向关系

在GenMyModel中，创建单向关系非常简单：只需从不需要的字段中删除该名称，就可以了。

例如，考虑以下简单情况：

![GenMyModel, unidirectional]({{ site.url }}/images/jhipsteruml_genmymodel_unidirectional.png)

在这里，`MyClass`将具有`myClass2`属性，但`MyClass2`将没有`myClass`字段。

### 注释

注释可用于类，属性和关系字段。

只需单击一个元素，然后在描述字段中写一条注释即可。

![GenMyModel, commenting]({{ site.url }}/images/jhipsteruml_genmymodel_commenting.png)


## <a name="#othereditors"></a> 其他编辑器

### Sparx EA

Guillaume Finance已添加了与该编辑器对接的支持。这是[仓库](https://github.com/guillaumefinance/MDG-Sparx-EA-UML-JHipster)，您可以在[此处](http://www.umlchannel.com/en/enterprise-architect/item/204-mdg-viseo-ea-uml-to-jhipster-generator-jdl-uml-model-sparx-enterprise-architect)阅读演示。

## <a name="enumerationexamples"></a>列举

JHipster和JHipster UML都支持枚举。
您如何定义它们：
  - 对于Modelio，将`Enumeration`对象拖放到某处。最后，将`Enumeration Literal`对象添加到枚举中以将其添加；
  - For UML Designer, there is the `Enumeration` object that can be placed and used. However, the literal is not called `Enumeration Literal` but just `Literal`;
  - 对于UML Designer，存在可以放置和使用的`Enumeration`对象。但是，literal不被称为`Enumeration Literal`，而只是`Literal`。
  - GenMyModel拥有所需的对象：主对象面板（在屏幕的左侧）中的`Enum`和`Enum Literal`。
  
## <a name="tablenames"></a>表名

从v1.6.2开始，现在可以为实体指定表名。

为此，只需指定表名以及类似的类名即可：

![tablenameimage](http://i.imgur.com/ECdb1bx.png)

该命名规则`<ENTITY_NAME>\s*(<TABLE_NAME>)`是通用的，与编辑器无关。

但是，如果您不想选择特殊的表名，则只需编写类名。JHipster UML将负责将其转换为适当的表名。例如，如果您的类名是`MyClass`，则表名将是`my_class`。

请注意，自v1.6.2起，此功能可用于UML编辑器。

## <a name="requiredrels"></a>必要的关系

从v2.0.0开始，可以建立所需的关系。
要指定一个，只需确保需要建立的关系的结尾不是"0"（"1"或"*"即可解决问题）。
要查看其中的一个示例，只需记住Oracle的完整HR示例，并注意JobHistory类具有3个必需的关系。

***

# <a name="testing-juml"></a>测试JHipster UML

这些测试位于test文件夹中，可以通过`npm test`运行。我们使用Mocha进行测试（使用chai和排除chai）。

If you want, an alternative command to run the tests, or run only the tests you want, is: `mocha`.
Please note that you need to be in the root directory for this command to work, and you also may need to install globally mocha with `npm install -g mocha` (or just use the file in the node_modules folder, which is available to you provided you do `npm install` in JHipster-UML's directory).
If, however, you don't want to install everything globally, just do:

如果需要，另一种运行测试或仅运行所需测试的命令是：`mocha`。
请注意，您需要在根目录中才能运行此命令，并且还可能需要使用`npm install -g mocha`全局安装mocha（或仅使用node_modules文件夹中的文件，只要您提供该文件即可）请在JHipster-UML的目录中进行`npm install`）。
但是，如果您不想在全局范围内安装所有软件，请执行以下操作：

  - `npm install`安装mocha依赖
  - `./node_modules/mocha/bin/mocha`运行测试，请注意，您可能需要在某些特殊操作系统上使用`\`。

***

# <a name="contributing"></a>贡献：问题和增强

由于我们的工具(_尚_)不完善，您可能会注意到一些不合规定之处。GitHub提供了一个非常不错的问题跟踪器，
因此每个人都可以发布问题。我们遵循与JHipster相同的准则，但也有一些补充：

  - 内部（由JHipster-UML团队发现）的错误可能会发布在问题跟踪器中，但与受支持的UML编辑器有关的错误除外。

  - 增强功能也是如此。

<b>注意：请在[此处](https://github.com/jhipster/jhipster-uml)的JHipster-UML的github页面上发布PR和问题。不在JHipster主页上。</b>

## <a name="parsermodifications"></a>解析器修改

1.0.0版本带来了一个新的解析器系统，只要是易于解析XMI，就可以轻松进行任何更改（创建，更新，删除解析器）。

### 添加解析器

#### 解析器实现

添加解析器非常容易。如果您是Java开发人员，则可能对OOP原理非常熟悉（我们希望如此）。在开发JHipster-UML时，我们会像 _通常_ 在Java中那样考虑其体系结构。

您只需要扩展我们的抽象解析器([AbstractParser](https://github.com/jhipster/jhipster-uml/blob/master/lib/editors/abstract_parser.js))，或实现我们的接口([Parser](https://github.com/jhipster/jhipster-uml/blob/master/lib/editors/parser.js))即可添加解析器的具体实现。

您应该注意到，解析器接口的某些方法会引发 _UnimplementedOperationException_ 。这个想法显然来自Java，您可以在具体的解析器中实现此方法。

有些方法不会引发任何异常，而只会调用其他方法。如果您熟悉Java 8，我们只是复制了其出色的默认方法，并做了相同的操作（因此您无需手动实现它们）。

就像在Java中一样，您可以覆盖所需的任何方法，然后创建自己的方法。您不受限制（除非您想大改）。

AbstractParser类提供了一些字段，默认构造函数和一些方法，因此您以后不必创建或实现它们。

显然，您 _应该_ 实现所有这些方法（或重写[#parse](https://github.com/jhipster/jhipster-uml/blob/master/lib/editors/parser.js#L13)或[#findElements](https://github.com/jhipster/jhipster-uml/blob/master/lib/editors/parser.js#L25)方法）。

getters不是强制性的，但可以用作获取一些重要字段的方法，并提供一种在发送这些字段之前对其进行修改的方法。

#### 编辑器检测

完成创建崭新的新解析器后，应将其添加到可用编辑器的列表中：

- 参照[这里](https://github.com/jhipster/jhipster-uml/blob/master/lib/editors/editors.js#L3)一样先要求它；

- 像[这里](https://github.com/jhipster/jhipster-uml/blob/master/lib/editors/editors.js#L9)一样使它可用；

- 就像[这里](https://github.com/jhipster/jhipster-uml/blob/master/lib/editors/editors.js#L16)一样，将其添加到列表中。

但是，必须遵守一些准则：

- 您的解析器名称必须为\<editor_parser\>;

- 编辑器的JS文件不得大写，并且不得包含任何空格（Modelio-> `modelio_parser.js`，UML Designer-> `umldesigner_parser.js`）；

- 编辑器的类名必须大写（Modelio-> `ModelioParser`，UML Designer-> `UMLDesignerParser`）。

关于EditorDetector，它可以检测到创建XMI文件的编辑器。为此，您必须首先找到XMI文件中提到编辑器的位置，然后像[此处](https://github.com/jhipster/jhipster-uml/blob/master/lib/editors/editor_detector.js#L23)一样添加返回编辑器的代码。如果无法检测到您的编辑器，请在[此处](https://github.com/jhipster/jhipster-uml/blob/master/lib/editors/editors.js#L23)添加它，并在此处指示其名称，就像在[此处](https://github.com/jhipster/jhipster-uml/blob/master/lib/editors/editor_detector.js#L56)为UML Designer所做的一样。

#### 测试

最后，在提交你的超级解析器之前，您需要做的下一件事就是对其进行测试。
因为我们相信测试，而且真心喜欢好的测试（使用BDD），所以我们的测试是通过Mocha和chai完成的。如果您还不知道全部内容，建议您访问[ChaiJS](http://chaijs.com/)页面，并查看我们的测试文件[之一](https://github.com/jhipster/jhipster-uml/blob/master/test/editors/modelio_parser_test.js)以了解它。

您可能想知道应该使用哪种测试形式。答案很简单：由您决定！无论是[应该的](http://chaijs.com/guide/styles/#should)还是[期望的](http://chaijs.com/guide/styles/#expect)（(à la RSpec），我们都不会在此处执行任何特殊规则。但是，我们建议使用Expect，因为我们这样做了，它应该使测试相当容易理解。

我们只希望您测试"值得测试"的所有内容：

  - 接口的方法（_公共_ 方法不是接口类！）；

  - 您没有义务测试其他方法（_私有_ 方法，因为它们在短期/长期内被认为是安全且不断变化的），但是（据我们所知）由于未在JS中实现可见性，因此您可能想要测试它们（取决于您）。

名称和文件的一般准则：

- 测试文件的名称应遵循前面提到的相同规则。例如，如果您的解析器名称为"Modelio"，则您的测试文件应为`modelio_parser_test.js`。
- 用于测试的XMI文件也是如此。如果解析器的名称是UMLDesigner，则测试XMI文件的名称之一可以是`umldesigner_parser_problem_test.[...]`（文件扩展名不是静态的）。

### 修改解析器

更改解析器（然后提交更改）非常简单：只需进行更改并进行测试（如果需要，请创建测试）。

如果需要通过测试（是否抛出异常等等），可以制作一个XMI文件。

如果您更改任何名称，请不要忘记修改[编辑器检测器](https://github.com/jhipster/jhipster-uml/blob/master/lib/editors/editor_detector.js)。

### 删除解析器

删除解析器是一件很容易的事情。
首先，将其从编辑器（`editors/editors.js`）中删除，然后将其从EditorDetector（`editors/editor_detector.js`）中删除。最后，只需删除解析器文件并为其创建测试。

如果您删除任何解析器，请不要忘记修改[编辑器检测器](https://github.com/jhipster/jhipster-uml/blob/master/lib/editors/editor_detector.js#L38)。

***

# <a name="annexes"></a>附录

这是该项目支持的类型：

<table class="table table-striped table-responsive">
  <tr>
    <th>SQL</th>
    <th>MongoDB</th>
    <th>Cassandra</th>
    <th>Validations</th>
  </tr>
  <tr>
    <td>String</td>
    <td>String</td>
    <td>String</td>
    <td><dfn>required, minlength, maxlength, pattern</dfn></td>
  </tr>
  <tr>
    <td>Integer</td>
    <td>Integer</td>
    <td>Integer</td>
    <td><dfn>required, min, max</dfn></td>
  </tr>
  <tr>
    <td>Long</td>
    <td>Long</td>
    <td>Long</td>
    <td><dfn>required, min, max</dfn></td>
  </tr>
  <tr>
    <td>BigDecimal</td>
    <td>BigDecimal</td>
    <td>BigDecimal</td>
    <td><dfn>required, min, max</dfn></td>
  </tr>
  <tr>
    <td>Float</td>
    <td>Float</td>
    <td>Float</td>
    <td><dfn>required, min, max</dfn></td>
  </tr>
  <tr>
    <td>Double</td>
    <td>Double</td>
    <td>Double</td>
    <td><dfn>required, min, max</dfn></td>
  </tr>
  <tr>
    <td>Enum</td>
    <td>Enum</td>
    <td></td>
    <td><dfn>required</dfn></td>
  </tr>
  <tr>
    <td>Boolean</td>
    <td>Boolean</td>
    <td>Boolean</td>
    <td>required</td>
  </tr>
  <tr>
    <td>LocalDate</td>
    <td>LocalDate</td>
    <td></td>
    <td><dfn>required</dfn></td>
  </tr>
  <tr>
    <td></td>
    <td></td>
    <td>Date</td>
    <td><dfn>required</dfn></td>
  </tr>
  <tr>
    <td>ZonedDateTime</td>
    <td>ZonedDateTime</td>
    <td></td>
    <td><dfn>required</dfn></td>
  </tr>
  <tr>
    <td></td>
    <td></td>
    <td>UUID</td>
    <td><dfn>required</dfn></td>
  </tr>
  <tr>
    <td>Blob</td>
    <td>Blob</td>
    <td></td>
    <td><dfn>required, minbytes, maxbytes</dfn></td>
  </tr>
  <tr>
    <td>AnyBlob</td>
    <td>AnyBlob</td>
    <td></td>
    <td><dfn>required, minbytes, maxbytes</dfn></td>
  </tr>
  <tr>
    <td>ImageBlob</td>
    <td>ImageBlob</td>
    <td></td>
    <td><dfn>required, minbytes, maxbytes</dfn></td>
  </tr>
  <tr>
    <td>TextBlob</td>
    <td>TextBlob</td>
    <td></td>
    <td><dfn>required, minbytes, maxbytes</dfn></td>
  </tr>
</table>
