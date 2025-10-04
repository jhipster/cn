import {
  SectionDescription,
  SectionTitle,
  SectionWrapper,
} from '@site/src/components/ui/SectionWrapper';
import TeamList from '@site/src/components/sections/team/TeamList';
import styles from './styles.module.scss';

export default function TeamRetiredMembers() {
  return (
    <SectionWrapper className={styles.section}>
      <SectionTitle align="start" size="sm">
          开发者委员会荣誉委员
      </SectionTitle>

      <SectionDescription align="start">
        <p>
            JHipster 是一个开源项目，我们从不强求成员履行任何义务：他们可以随时离开项目或停止贡献。
            但鉴于管理委员会成员享有比其他成员更高的权限（包括对项目的写权限），我们需要他们持续保持活跃贡献。
        </p>
      </SectionDescription>

      <TeamList dataKey="retiredMembers" />
    </SectionWrapper>
  );
}
