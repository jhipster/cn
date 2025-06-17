import {
  SectionDescription,
  SectionTitle,
  SectionWrapper,
} from '@site/src/components/ui/SectionWrapper';
import EmbeddedVideo from '@site/src/components/EmbeddedVideo';
import styles from './styles.module.scss';

export default function Learn() {
  return (
    <SectionWrapper className={styles.section}>
      <SectionTitle>15 分钟学会 JHipster</SectionTitle>

      <SectionDescription>
        <p>
          Matt Raible 制作了一个视频教程，展示如何使用 JHipster 8 开发 Spring Boot + Angular 应用程序。
        </p>
      </SectionDescription>

      <div className={styles.sectionVideo}>
        <div class="video-container">
            <iframe width="640" height="360" src="//player.bilibili.com/player.html?aid=845289797&bvid=BV1454y1j75g&cid=333492148&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe>
        </div>
      </div>
    </SectionWrapper>
  );
}
