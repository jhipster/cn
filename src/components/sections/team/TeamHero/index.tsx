import Link from '@docusaurus/Link';

import {
  SectionDescription,
  SectionTitle,
} from '@site/src/components/ui/SectionWrapper';
import TeamList from '@site/src/components/sections/team/TeamList';

import styles from './styles.module.scss';

export default function TeamHero() {
  return (
    <header className={styles.section}>
      <div className="container">
        <h1 className={styles.sectionTitle}>团队</h1>

        <SectionDescription align="start">
          <p>
              JHipster 由一支遍布全球的成员组成的团队共同开发。 我们拥有众多贡献者{' '}
            <Link href="https://github.com/jhipster/generator-jhipster/graphs/contributors">
              (Top100)
            </Link>
            ，但核心团队成员名单请查阅本页。若您希望加入团队或了解我们的工作方式，请参阅本页面末尾的社区准则。
          </p>
        </SectionDescription>

        <div className={styles.sectionTeam}>
          <SectionTitle align="start" size="sm">
              治理委员会
          </SectionTitle>

          <TeamList dataKey="governing" />
        </div>

        <div className={styles.sectionTeam}>
          <SectionTitle align="start" size="sm">
              项目牵头人
          </SectionTitle>

          <TeamList dataKey="leads" />
        </div>
      </div>
    </header>
  );
}
