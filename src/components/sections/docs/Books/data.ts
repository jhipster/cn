export const books = [
  {
    title: 'The JHipster Mini-Book 7.0',
    authors: ['Matt Raible'],
    image: require('/images/books/JHipster-Mini-book.webp').default,
    description:
      'JHipster Mini-Book 是一本关于如何使用当今最流行技术的入门指南：Angular、Bootstrap 和 Spring Boot。所有这些框架都集成在一个名为 JHipster 的易于使用的项目中。本版包含了更新的微服务章节，涵盖了 WebFlux 和基于 React 的微前端。',
    links: [
      {
        name: 'InfoQ',
        href: 'https://www.infoq.com/minibooks/jhipster-mini-book-7',
      },
    ],
  },
  {
    title: 'Full Stack Development with JHipster - Second edition',
    authors: ['Deepu K Sasidharan', 'Sendil Kumar'],
    image: require('/images/books/Full-Stack-Development-with-JHipster.webp')
      .default,
    description:
      '本书由 JHipster 核心开发团队编写，针对 JHipster 6、Java 11 和 Spring Boot 2.1 进行了全面更新，将通过真实案例和最佳实践向您展示如何构建现代化的 Web 应用程序',
    links: [
      {
        name: 'Packt',
        href: 'https://www.packtpub.com/web-development/full-stack-development-with-jhipster-second-edition',
      },
      {
        name: 'Amazon',
        href: 'https://smile.amazon.com/Full-Stack-Development-JHipster-microservices/dp/1838824987',
      },
    ],
  },
];
