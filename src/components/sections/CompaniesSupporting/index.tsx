// import Link from '@docusaurus/Link';
import clsx from 'clsx';

import {
  SectionDescription,
  SectionTitle,
  SectionWrapper,
} from '@site/src/components/ui/SectionWrapper';
import styles from './styles.module.scss';

export default function CompaniesSupporting() {
  return (
    <SectionWrapper className={styles.section}>
      <SectionTitle>支持JHipster的企业</SectionTitle>

      <SectionDescription>
        <p>
            如贵公司也希望加入本列表，请随时联系我们并说明相关理由。
        </p>
      </SectionDescription>

      {/*<p className="text--center">
          This support consists of: Time for development by core contributors
          (Okta)
      </p>*/}

      <ul className={styles.sectionList}>
        {/*<li>
          <Link href="https://auth0.com/blog/micro-frontends-for-java-microservices/">
            <div className={clsx('card', styles.card)}>
              <div className="card__body">
                <div className="card__image">
                  <img
                    src={require('@site/static/images/support/okta.png').default}
                    alt="Okta"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </Link>
        </li>*/}
        <li>
          <div className={clsx('card', styles.cardMock)}>
            <div className={clsx('card__body', styles.cardMockBody)}>
              <h3>您的公司</h3>
            </div>
          </div>
        </li>
      </ul>
    </SectionWrapper>
  );
}
