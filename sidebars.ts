import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  docsSidebar: [
    {
      type: 'doc',
      label: '快速开始',
      id: 'getting-started',
    },
    {
      type: 'category',
      label: '安装和设置',
      items: [
        {
          type: 'doc',
          label: '安装 JHipster',
          id: 'environment/installation',
        },
        {
          type: 'doc',
          label: '配置代理',
          id: 'environment/configuring-a-corporate-proxy',
        },
        {
          type: 'category',
          label: '配置 IDE',
          link: { type: 'doc', id: 'environment/configuring-ide/index' },
          items: [
            {
              type: 'doc',
              label: 'Eclipse 配合 Maven',
              id: 'environment/configuring-ide/configuring-ide-eclipse',
            },
            {
              type: 'doc',
              label: 'Eclipse 配合 Gradle',
              id: 'environment/configuring-ide/configuring-ide-eclipse-gradle',
            },
            {
              type: 'doc',
              label: 'Intellij IDEA',
              id: 'environment/configuring-ide/configuring-ide-idea',
            },
            {
              type: 'doc',
              label: 'Visual Studio Code',
              id: 'environment/configuring-ide/configuring-ide-visual-studio-code',
            },
            {
              type: 'doc',
              label: 'Netbeans',
              id: 'environment/configuring-ide/configuring-ide-netbeans',
            },
          ],
        },
        {
          type: 'doc',
          label: 'Docker Compose',
          id: 'environment/docker-compose',
        },
        {
          type: 'category',
          label: 'Shell 插件',
          link: { type: 'doc', id: 'environment/shell-plugins/index' },
          items: [
            {
              type: 'doc',
              label: 'Oh-My-Zsh JHipster 插件',
              id: 'environment/shell-plugins/oh-my-zsh',
            },
            {
              type: 'doc',
              label: 'Fisher JHipster 插件',
              id: 'environment/shell-plugins/fisher',
            },
          ],
        },
      ],
    },
    {
      type: 'category',
      label: '创建应用和实体',
      items: [
        {
          type: 'doc',
          label: '创建应用',
          id: 'core-tasks/creating-an-app',
        },
        {
          type: 'doc',
          label: '创建实体',
          id: 'core-tasks/creating-an-entity',
        },
        { type: 'doc', label: '创建 DTOs', id: 'core-tasks/using-dtos' },
        {
          type: 'doc',
          label: '管理关系',
          id: 'core-tasks/managing-relationships',
        },
        {
          type: 'doc',
          label: '国际化',
          id: 'core-tasks/installing-new-languages',
        },
        {
          type: 'doc',
          label: '升级应用',
          id: 'core-tasks/upgrading-an-application',
        },
      ],
    },
    {
      type: 'category',
      label: '可选技术',
      items: [
        { type: 'doc', label: '保护您的应用', id: 'options/security' },
        {
          type: 'doc',
          label: '过滤实体',
          id: 'options/entities-filtering',
        },
        {
          type: 'doc',
          label: '使用 Elasticsearch',
          id: 'options/using-elasticsearch',
        },
        {
          type: 'doc',
          label: '使用 Websockets',
          id: 'options/using-websockets',
        },
        {
          type: 'doc',
          label: 'API 优先开发',
          id: 'options/doing-api-first-development',
        },
        { type: 'doc', label: '使用缓存', id: 'options/using-cache' },
        { type: 'doc', label: '使用 Oracle', id: 'options/using-oracle' },
        { type: 'doc', label: '使用 MongoDB', id: 'options/using-mongodb' },
        {
          type: 'doc',
          label: '使用 Couchbase',
          id: 'options/using-couchbase',
        },
        { type: 'doc', label: '使用 Neo4j', id: 'options/using-neo4j' },
        {
          type: 'doc',
          label: '使用 Cassandra',
          id: 'options/using-cassandra',
        },
        { type: 'doc', label: '使用 Kafka', id: 'options/using-kafka' },
        { type: 'doc', label: '使用 Pulsar', id: 'options/using-pulsar' },
      ],
    },
    {
      type: 'category',
      label: 'JDL',
      items: [
        { type: 'doc', label: '概述', id: 'jdl/intro' },
        { type: 'doc', label: '快速开始', id: 'jdl/getting-started' },
        { type: 'doc', label: '应用程序', id: 'jdl/applications' },
        { type: 'doc', label: '实体和字段', id: 'jdl/entities-fields' },
        { type: 'doc', label: '枚举', id: 'jdl/enums' },
        { type: 'doc', label: '关系', id: 'jdl/relationships' },
        { type: 'doc', label: '选项', id: 'jdl/options' },
        { type: 'doc', label: '部署', id: 'jdl/deployments' },
        { type: 'doc', label: '问题排查', id: 'jdl/troubleshooting' },
      ],
    },
    {
      type: 'category',
      label: '开发',
      items: [
        {
          type: 'doc',
          label: '在开发中使用',
          id: 'development/development',
        },
        { type: 'doc', label: '管理配置文件', id: 'development/profiles' },
        {
          type: 'doc',
          label: '常用应用属性',
          id: 'development/common-application-properties',
        },
        { type: 'doc', label: '常用端口', id: 'development/common-ports' },
        {
          type: 'doc',
          label: '分离前端和 API',
          id: 'development/separating-front-end-and-api',
        },
        {
          type: 'category',
          label: '管理服务器错误',
          link: { type: 'doc', id: 'development/managing-server-errors' },
          items: [
            {
              type: 'doc',
              label: '带消息的问题',
              id: 'development/problem/problem-with-message',
            },
            {
              type: 'doc',
              label: '约束违反',
              id: 'development/problem/constraint-violation',
            },
            {
              type: 'doc',
              label: '带参数化消息的问题',
              id: 'development/problem/parameterized',
            },
            {
              type: 'doc',
              label: '实体未找到',
              id: 'development/problem/entity-not-found',
            },
            {
              type: 'doc',
              label: '密码无效',
              id: 'development/problem/invalid-password',
            },
            {
              type: 'doc',
              label: '邮箱已被使用',
              id: 'development/problem/email-already-used',
            },
            {
              type: 'doc',
              label: '登录名已被使用',
              id: 'development/problem/login-already-used',
            },
            {
              type: 'doc',
              label: '邮箱未找到',
              id: 'development/problem/email-not-found',
            },
          ],
        },
        {
          type: 'doc',
          label: '使用 Angular',
          id: 'development/using-angular',
        },
        { type: 'doc', label: '使用 React', id: 'development/using-react' },
        { type: 'doc', label: '使用 Vue', id: 'development/using-vue' },
        {
          type: 'doc',
          label: '自定义 Bootstrap',
          id: 'development/customizing-bootstrap',
        },
        { type: 'doc', label: '使用 TLS 和 HTTP/2', id: 'development/tls' },
      ],
    },
    {
      type: 'category',
      label: '测试和质量保证',
      items: [
        {
          type: 'doc',
          label: '运行测试',
          id: 'tests-and-qa/running-tests',
        },
        { type: 'doc', label: '代码质量', id: 'tests-and-qa/code-quality' },
        {
          type: 'doc',
          label: '依赖漏洞检查',
          id: 'tests-and-qa/dependency-vulnerabities-check',
        },
        {
          type: 'category',
          label: '持续集成',
          link: { type: 'doc', id: 'tests-and-qa/setting-up-ci/index' },
          items: [
            {
              type: 'category',
              label: '设置 Jenkins 1',
              link: {
                type: 'doc',
                id: 'tests-and-qa/setting-up-ci/setting-up-ci-jenkins1',
              },
              items: [
                {
                  type: 'doc',
                  label: 'Linux 上的 Jenkins 1',
                  id: 'tests-and-qa/setting-up-ci/setting-up-ci-linux',
                },
                {
                  type: 'doc',
                  label: 'Windows 上的 Jenkins 1',
                  id: 'tests-and-qa/setting-up-ci/setting-up-ci-windows',
                },
              ],
            },
            {
              type: 'doc',
              label: 'Setting up Jenkins 2',
              id: 'tests-and-qa/setting-up-ci/setting-up-ci-jenkins2',
            },
          ],
        },
      ],
    },
    {
      type: 'category',
      label: '生产环境',
      items: [
        {
          type: 'doc',
          label: '在生产中使用',
          id: 'production/production',
        },
        { type: 'doc', label: '监测', id: 'production/monitoring' },
        { type: 'doc', label: 'Docker Hub', id: 'production/docker-hub' },
        { type: 'doc', label: '部署到 Azure', id: 'production/azure' },
        {
          type: 'doc',
          label: '使用 CloudCaptain 进行部署',
          id: 'production/cloudcaptain',
        },
        {
          type: 'doc',
          label: '部署至 Clever Cloud',
          id: 'production/clever-cloud',
        },
        { type: 'doc', label: '部署到 Heroku', id: 'production/heroku' },
        {
          type: 'doc',
          label: '部署到 Kubernetes',
          id: 'production/kubernetes',
        },
      ],
    },
    {
      type: 'category',
      label: '微服务',
      items: [
        {
          type: 'doc',
          label: '总览',
          id: 'microservices/microservices-architecture',
        },
        { type: 'doc', label: 'API 网关', id: 'microservices/api-gateway' },
        { type: 'doc', label: 'Consul', id: 'microservices/consul' },
        {
          type: 'doc',
          label: 'JHipster Registry',
          id: 'microservices/jhipster-registry',
        },
        {
          type: 'doc',
          label: '创建微服务',
          id: 'microservices/creating-microservices',
        },
        {
          type: 'doc',
          label: '生产环境中使用微服务',
          id: 'microservices/microservices-in-production',
        },
        {
          type: 'doc',
          label: 'JHipster Control Center',
          id: 'microservices/jhipster-control-center',
        },
      ],
    },
    {
      type: 'category',
      label: '蓝图(Blueprints)',
      items: [
        {
          type: 'doc',
          label: '官方蓝图',
          id: 'modules/official-blueprints',
        },
        {
          type: 'doc',
          label: '蓝图基础',
          id: 'modules/extending-and-customizing',
        },
        {
          type: 'doc',
          label: '创建模块',
          id: 'modules/creating-a-module',
        },
        {
          type: 'doc',
          label: '创建蓝图',
          id: 'modules/creating-a-blueprint',
        },
        {
          type: 'category',
          label: 'Quarkus 文档',
          link: { type: 'doc', id: 'blueprints/quarkus/index' },
          items: [
            {
              type: 'doc',
              label: '安装JHipster Quarkus 蓝图',
              id: 'blueprints/quarkus/installing-jhipster-quarkus',
            },
            {
              type: 'doc',
              label: '创建应用',
              id: 'blueprints/quarkus/creating-an-application',
            },
            {
              type: 'doc',
              label: '创建实体',
              id: 'blueprints/quarkus/creating-an-entity',
            },
          ],
        },
      ],
    },
    {
      type: 'category',
      label: '工具',
      items: [
        {
          type: 'link',
          label: 'JDL Studio',
          href: 'https://start.jhipster.tech/jdl-studio/',
        },
        { type: 'doc', label: 'JHipster IDE', id: 'tools/jhipster-ide' },
        { type: 'doc', label: 'JHipster-UML', id: 'tools/jhipster-uml' },
      ],
    },
    {
      type: 'doc',
      label: 'JHipster Lite',
      id: 'jhipster-lite',
    },
    {
      type: 'category',
      label: '分分钟玩转 JHipster',
      items: [
        { type: 'doc', label: '技术栈', id: 'about/tech-stack' },
        {
          type: 'doc',
          label: '应用截图',
          id: 'about/screenshots',
        },
        {
          type: 'doc',
          label: "视频教程 (15')",
          id: 'about/video-tutorial',
        },
        {
          type: 'link',
          label: '在线指南',
          href: 'https://github.com/jhipster/jhipster-guides',
        },
        {
          type: 'doc',
          label: '谁在使用 JHipster',
          id: 'about/companies-using-jhipster',
        },
        {
          type: 'doc',
          label: 'JHipster 应用范例集锦',
          id: 'about/showcase',
        },
      ],
    },
    {
      type: 'category',
      label: '版本发布日志',
      collapsible: false,
      link: {
        type: 'doc',
        id: 'releases/index',
      },
      items: [{ type: 'autogenerated', dirName: 'releases' }],
    },
    {
      type: 'category',
      label: '更多帮助',
      items: [
        { type: 'doc', label: '社区帮助', id: 'help/help' },
        { type: 'doc', label: 'Bug 奖励', id: 'help/bug-bounties' },
      ],
    },
    {
      type: 'category',
      label: '捐助',
      items: [
        {
          type: 'doc',
          label: '赞助商',
          id: 'contributing/sponsors',
        },
        {
          type: 'doc',
          label: '个人捐助',
          id: 'contributing/contributing-individuals',
        },
        {
          type: 'doc',
          label: '捐助组织',
          id: 'contributing/contributing-companies',
        },
      ],
    },
    {
      type: 'category',
      label: '常用技巧',
      link: { type: 'doc', id: 'tips/index' },
      items: [
        {
          type: 'doc',
          label: '使用Bootswatch主题',
          id: 'tips/tips_using_bootswatch_themes',
        },
        {
          type: 'doc',
          label: '配置电子邮件-Gmail等',
          id: 'tips/tip_configuring_email_in_jhipster',
        },
        {
          type: 'doc',
          label: '加速generator-jhipster',
          id: 'tips/tip_speed_up_generator',
        },
        {
          type: 'doc',
          label: '本地SMTP服务器',
          id: 'tips/tip_local_smtp_server',
        },
        {
          type: 'doc',
          label: 'LDAP身份验证',
          id: 'tips/tip_ldap_authentication',
        },
        {
          type: 'doc',
          label: '使用远程shell的REPL (已弃用)',
          id: 'tips/tip_repl_with_the_remote_shell',
        },
        {
          type: 'doc',
          label: 'Kubernetes和Google Cloud SQL',
          id: 'tips/tip_kubernetes_and_google_cloud_sql',
        },
        {
          type: 'doc',
          label:
            '使用Slice通过无限滚动提高分页性能',
          id: 'tips/tip_infinite_scroll_with_slice',
        },
        {
          type: 'doc',
          label: '在Mac/Windows上将 Docker容器用作localhost',
          id: 'tips/tip_using_docker_containers_as_localhost_on_mac_and_windows',
        },
        {
          type: 'doc',
          label: '使用QueryDSL',
          id: 'tips/tip_add_querydsl_support',
        },
        {
          type: 'doc',
          label: '使用Apache（基本身份验证）保护 Kibana',
          id: 'tips/tip_protecting_kibana_with_apache_basic_authent',
        },
        {
          type: 'doc',
          label: '启用OAuth2第三方登录',
          id: 'tips/tip_enabling_social_login_with_oauth2',
        },
        {
          type: 'doc',
          label: '如何创建新的权限',
          id: 'tips/tip_create_new_authority',
        },
        {
          type: 'doc',
          label: '@OneToOne与@MapsId的问题',
          id: 'tips/tip_issue_of_onetoone_with_mapsid_how_to_avoid_it',
        },
        {
          type: 'doc',
          label:
            '懒惰bean初始化提高集成测试性能',
          id: 'tips/tip_lazy_init_test_beans',
        },
        {
          type: 'doc',
          label: '将PGAdmin连接到Heroku',
          id: 'tips/tip_pgadmin_heroku',
        },
        {
          type: 'doc',
          label: 'InternetExplorer支持',
          id: 'tips/tip_ie_support',
        },
        {
          type: 'doc',
          label:
            'IDE中打开前端，改善开发者体验',
          id: 'tips/tip_frontend_only',
        },
        {
          type: 'doc',
          label: '配置Redis主从复制',
          id: 'tips/tip_redis_replication',
        },
        {
          type: 'doc',
          label: 'IDEA中运行Protractor e2e测试',
          id: 'tips/tip_e2e_intellij',
        },
        {
          type: 'doc',
          label: 'Docker中的时间漂移',
          id: 'tips/tip_time_drift_docker',
        },
        { type: 'doc', label: '用户实体管理', id: 'user-entity' },
        {
          type: 'doc',
          label: '移除注册账户服务',
          id: 'tips/tip_remove_register_account_service',
        },
        {
          type: 'doc',
          label: '组合生成和自定义代码',
          id: 'tips/tip_combine_generation_and_custom_code',
        },
        {
          type: 'doc',
          label: '在Spring Security中允许Web字体',
          id: 'tips/tip_allow_common_web_fonts_in_spring_security',
        },
      ],
    },
    {
      type: 'doc',
      label: 'JHipster法律实体',
      id: 'association',
    },
    {
      type: 'doc',
      label: 'JHipster技术委员会',
      id: 'tech-board',
    },
    {
      type: 'doc',
      label: 'JHipster交流会',
      id: 'meetups',
    },
    {
      type: 'doc',
      label: '设计排版',
      id: 'artwork',
    },
  ],
};

export default sidebars;
