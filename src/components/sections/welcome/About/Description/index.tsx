import styles from './styles.module.scss';

export default function Description() {
  return (
    <ul className={styles.section}>
      <li>
        JHipster 是一个开发平台，可以快速生成、开发和部署现代 Web 应用程序和微服务架构。
      </li>
      <li>
        我们支持多种前端技术，包括 Angular、React 和 Vue。我们甚至支持 Ionic 和 React Native 移动应用开发！
      </li>
      <li>
        在后端，我们支持 Spring Boot（Java 或 Kotlin）、Micronaut、Quarkus、Node.js 和 .NET。
      </li>
      <li>
        在部署方面，我们采用 Docker 和 Kubernetes 的云原生原则。
      </li>
      <li>
        支持部署到 AWS、Azure、Google Cloud Platform、Heroku 和 OpenShift。
      </li>
    </ul>
  );
}
