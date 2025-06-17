import { RxStack } from 'react-icons/rx';
import { MdOutlineStyle } from 'react-icons/md';
import { GoWorkflow } from 'react-icons/go';
import { TbCloudDataConnection } from 'react-icons/tb';
import { GrDeploy } from 'react-icons/gr';

import {
  SectionDescription,
  SectionTitle,
} from '@site/src/components/ui/SectionWrapper';
import styles from './styles.module.scss';

export default function Goals() {
  return (
    <div className={styles.section}>
      <SectionTitle align="start">目标</SectionTitle>

      <SectionDescription align="start">
        <p>
          我们的目标是生成完整且现代的 Web 应用程序或微服务架构，统一：
        </p>
      </SectionDescription>

      <ul className={styles.sectionList}>
        <li>
          <div>
            <div className={styles.cardIcon}>
              <RxStack />
            </div>
            <h3 className={styles.cardTitle}>强大的服务端技术栈</h3>
            <p className={styles.cardDescription}>
              高性能且强大的服务端技术栈，具有出色的测试覆盖率
            </p>
          </div>
        </li>

        <li>
          <div>
            <div className={styles.cardIcon}>
              <MdOutlineStyle />
            </div>
            <h3 className={styles.cardTitle}>现代时尚</h3>
            <p className={styles.cardDescription}>
              使用 Angular、React 或 Vue + Bootstrap CSS 构建时尚、现代、移动优先的用户界面
            </p>
          </div>
        </li>

        <li>
          <div>
            <div className={styles.cardIcon}>
              <GoWorkflow />
            </div>
            <h3 className={styles.cardTitle}>强大的工作流</h3>
            <p className={styles.cardDescription}>
              使用 Webpack 和 Maven 或 Gradle 构建应用程序的强大工作流
            </p>
          </div>
        </li>

        <li>
          <div>
            <div className={styles.cardIcon}>
              <TbCloudDataConnection />
            </div>
            <h3 className={styles.cardTitle}>弹性架构</h3>
            <p className={styles.cardDescription}>
              基于云原生原则的弹性微服务架构
            </p>
          </div>
        </li>

        <li>
          <div>
            <div className={styles.cardIcon}>
              <GrDeploy />
            </div>
            <h3 className={styles.cardTitle}>快速部署</h3>
            <p className={styles.cardDescription}>
              基础设施即代码，让您可以快速部署到云端 ☁️
            </p>
          </div>
        </li>
      </ul>
    </div>
  );
}
