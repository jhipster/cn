import {
  SectionDescription,
  SectionTitle,
  SectionWrapper,
} from '@site/src/components/ui/SectionWrapper';
import GithubButton from '@site/src/components/GithubButton';
import styles from './styles.module.scss';

export default function ConnectCommunity() {
  return (
    <SectionWrapper>
      <div className={styles.sectionContent}>
        <div>
          <SectionTitle className={styles.sectionTitle} align="start">
              加入社区交流
          </SectionTitle>

          <SectionDescription
            className={styles.sectionDescription}
            align="start"
          >
            <p>
                欢迎在此畅所欲言：提问解惑、报告问题、贡献代码、结识同道。
            </p>
          </SectionDescription>
        </div>

        <GithubButton>加入我们</GithubButton>
      </div>
    </SectionWrapper>
  );
}
