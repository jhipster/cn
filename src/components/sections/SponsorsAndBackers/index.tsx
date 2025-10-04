import Link from '@docusaurus/Link';

import {
  SectionDescription,
  SectionTitle,
  SectionWrapper,
} from '@site/src/components/ui/SectionWrapper';
import OpenCollectiveSponsors from './OpenCollectiveSponsors';
import OpenCollectiveBackers from './OpenCollectiveBackers';
import OpenCollectiveButton from './OpenCollectiveButton';
import styles from './styles.module.scss';

import { useOpenCollective } from './use-open-collective';

export default function SponsorsAndBackers() {
  const { silverSponsors, bronzeSponsors } = useOpenCollective();

  return (
    <SectionWrapper className={styles.section}>
      <SectionTitle>赞助者与支持者</SectionTitle>

      <SectionDescription>
        <p>
            如您在工作中因 JHipster 而受益，诚请考虑建议您的公司成为{' '}
          <Link href="https://opencollective.com/generator-jhipster#sponsor">
              赞助者
          </Link>
            ，以支持这一开源项目。
            您个人亦可通过成为{' '}
          <Link href="https://opencollective.com/generator-jhipster#backer">
              支持者
          </Link>
            的方式，为项目提供资助。
        </p>
      </SectionDescription>

      <OpenCollectiveButton />

      {/* Silver sponsors */}
      <OpenCollectiveSponsors
        title="感谢我们的白银级赞助商！"
        sponsors={silverSponsors}
      />

      {/* Bronze sponsors */}
      <OpenCollectiveSponsors
        title="感谢我们的青铜级赞助商！"
        sponsors={bronzeSponsors}
      />

      <OpenCollectiveButton />

      {/* Backers */}
      <OpenCollectiveBackers />
    </SectionWrapper>
  );
}
