import { cva, type VariantProps } from 'class-variance-authority';
import clsx from 'clsx';

import {
  SectionDescription,
  SectionTitle,
  SectionWrapper,
} from '@site/src/components/ui/SectionWrapper';
import CommunityCard from './CommunityCard';
import GithubButton from '@site/src/components/GithubButton';
import styles from './styles.module.scss';

import { useCommunity } from './use-community';

const sectionVariants = cva(styles.section, {
  variants: {
    color: {
      default: styles.sectionDefault,
      light: styles.sectionLight,
    },
  },
  defaultVariants: {
    color: 'default',
  },
});

type Props = VariantProps<typeof sectionVariants>;

export default function Community({ color }: Props) {
  const { npmDownloads, githubConfig } = useCommunity();

  return (
    <SectionWrapper className={clsx(sectionVariants({ color }))}>
      <SectionTitle>社区</SectionTitle>

      <SectionDescription>
        <p>
            JHipster 是一个开源项目，所有开发工作均在 GitHub 上进行。
            如果您正在使用 JHipster，欢迎成为我们的赞助者或支持者；如果您希望与我们共同编码，我们诚挚邀请您的加入！
            若您喜爱这个项目，请在 GitHub 为我们点亮 ⭐️
        </p>
      </SectionDescription>

      <div className={styles.sectionList}>
        <CommunityCard
          value={`${npmDownloads.downloads}`}
          text="月下载量"
        />
        <CommunityCard
          value={`${githubConfig.stargazers_count}`}
          text="GitHub点赞"
        />
        <CommunityCard value="600" text="贡献者" postfix="+" />
      </div>

      <div className={styles.sectionButtons}>
        <GithubButton>加入我们</GithubButton>
      </div>
    </SectionWrapper>
  );
}
