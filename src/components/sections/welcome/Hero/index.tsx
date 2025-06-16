import Link from '@docusaurus/Link';
import clsx from 'clsx';

import GithubButton from '@site/src/components/GithubButton';
import styles from './styles.module.scss';

const heroImageSrc =
  require('@site/static/images/logo/hero-family.webp').default;

export default function Hero() {
  return (
    <>
      <link rel="preload" as="image" href={heroImageSrc} />

      <header className={styles.section}>
        <div className={clsx('container', styles.sectionContent)}>
          <div>
            <h1 className={styles.sectionTitle}>
              你好，
              <br /> Java <span className="text--primary">潮人</span>！
            </h1>

            <p className={styles.sectionDescription}>
              JHipster 是一个开发平台，可以快速生成、开发和部署现代 Web 应用程序和微服务架构。
            </p>

            <div className={styles.sectionButtons}>
              <Link className="button button--primary" to="/getting-started">
                快速开始
              </Link>
              <GithubButton>GitHub</GithubButton>
            </div>
          </div>

          <img
            className={styles.sectionImage}
            src={heroImageSrc}
            alt="JHipster family"
            width={476}
            height={380}
          />
        </div>
      </header>
    </>
  );
}
