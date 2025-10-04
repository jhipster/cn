import Link from '@docusaurus/Link';

import {
  SectionDescription,
  SectionTitle,
  SectionWrapper,
} from '@site/src/components/ui/SectionWrapper';
import StreamsList from './StreamsList';

export default function Streams() {
  return (
    <SectionWrapper>
      <SectionTitle align="start">JHipster 技术流</SectionTitle>

      <SectionDescription align="start">
        <p>
            JHipster 为您的应用程序提供广泛的技术选择。随着技术栈的不断扩展，我们为此设立了由特定负责人主导的“技术流”，
            旨在确保各项技术都能得到顺畅的维护。其余所有工作则将由项目负责人统筹。
        </p>
        <p>
            此处可找到最新表格{' '}
          <Link href="https://docs.google.com/spreadsheets/d/1fac4Uxv3bKr0rNmgg1WXv67CE_6nfHEPIuCp-_iU-uA/edit?usp=sharing">
              JHipster 技术流表格
          </Link>
        </p>
      </SectionDescription>

      <StreamsList />
    </SectionWrapper>
  );
}
