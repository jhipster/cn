import Link from '@docusaurus/Link';
import clsx from 'clsx';

import FamilyTeam from '@site/static/images/logo/family_team.svg';
import FamilyMember8 from '@site/static/images/logo/jhipster_family_member_8.svg';
import FamilyMember2 from '@site/static/images/logo/jhipster_family_member_2.svg';

import {
  SectionDescription,
  SectionTitle,
  SectionWrapper,
} from '@site/src/components/ui/SectionWrapper';
import styles from './styles.module.scss';

export default function TeamDescription() {
  return (
    <SectionWrapper className={styles.section}>
      {/* Where does the development team work? */}
      <div className={styles.sectionContent}>
        <FamilyTeam className={styles.sectionContentImage} />

        <div className={styles.sectionContentDescription}>
          <SectionTitle className={styles.sectionContentTitle} align="start">
              开发团队在哪里工作？
          </SectionTitle>

          <SectionDescription align="start">
            <p>
                我们的主要工作都在项目的{' '}
              <Link href="https://github.com/jhipster/generator-jhipster">
                  GitHub页面上
              </Link>
                完成。
            </p>

            <p>团队内部讨论通过以下渠道进行：</p>
            <ul>
              <li>
                {' '}
                <Link href="https://groups.google.com/forum/?hl=en#!forum/jhipster-dev">
                    jhipster-dev 邮件列表
                </Link>
              </li>
              <li>
                {' '}
                <Link href="https://gitter.im/jhipster/jhipster-dev-team">
                    jhipster-dev-team Gitter 聊天室
                </Link>
              </li>
            </ul>

            <p>
                这些讨论渠道虽公开可见（正如JHipster的所有工作都是公开的），但仅限开发者委员会成员参与。
                {' '}
              <Link href="https://groups.google.com/forum/?hl=en#!forum/jhipster-dev">
                  邮件列表存档
              </Link>{' '}可在Google Groups页面查看，
                {' '}
              <Link href="https://gitter.im/jhipster/jhipster-dev-team/archives/all">
                  聊天记录存档
              </Link>{' '}
                可在Gitter获取。
            </p>
          </SectionDescription>
        </div>
      </div>

      {/* How to join the board of developers? */}
      <div
        className={clsx(styles.sectionContent, styles.sectionContentReverse)}
      >
        <FamilyMember8 className={styles.sectionContentImage} />

        <div className={styles.sectionContentDescription}>
          <SectionTitle className={styles.sectionContentTitle} align="start">
              如何加入开发者委员会？
          </SectionTitle>

          <SectionDescription align="start">
            <ul>
              <li>定期参与项目：通过提交代码、处理拉取请求（PR）等方式，持续为项目作出贡献。</li>
              <li>
                  寻求提名：请一位现任委员会成员，附上您的个人简介和背景信息，在开发邮件列表上发起投票提案。
              </li>
              <li>
                  公开投票：开发邮件列表中的每位成员均可投票（同意则投“+1”，反对则投“-1”）。
                <ul>
                  <li>
                      否决规则：一张“-1”反对票即可否决新成员的加入，但投反对票者必须阐明其理由。
                  </li>
                </ul>
              </li>
            </ul>
          </SectionDescription>
        </div>
      </div>

      {/* What do people in the board of developers gain? */}
      <div className={styles.sectionContent}>
        <FamilyMember2 className={styles.sectionContentImage} />

        <div className={styles.sectionContentDescription}>
          <SectionTitle className={styles.sectionContentTitle} align="start">
              开发者委员会成员享有哪些权益？
          </SectionTitle>

          <SectionDescription align="start">
            <ul>
              <li>
                  代码库写入权限：可获得主仓库及{' '}
                <Link href="https://github.com/jhipster">
                    JHipster 组织
                </Link> 下大多数项目的直接写入权限。
              </li>
              <li>
                  项目相关费用支持：项目产生的相关费用（例如参加 JHipster 会议的差旅费）可由{' '}
                <Link href="https://opencollective.com/generator-jhipster">
                    我们的 OpenCollective 账户
                </Link>支付。 该项支持取决于账户可用资金，并由项目负责人审议批准。
              </li>
              <li>
                  免费许可与配额：可共享项目定期从友好公司获得的免费软件许可和云服务配额。
              </li>
            </ul>
          </SectionDescription>
        </div>
      </div>
    </SectionWrapper>
  );
}
