import Layout from '@theme/Layout';

import Hero from '@site/src/components/sections/welcome/Hero';
import Learn from '@site/src/components/sections/welcome/Learn';
import About from '@site/src/components/sections/welcome/About';
import SponsorsAndBackers from '@site/src/components/sections/SponsorsAndBackers';
import CompaniesSupporting from '@site/src/components/sections/CompaniesSupporting';
import ConnectCommunity from '@site/src/components/sections/ConnectCommunity';
import Modules from '@site/src/components/sections/welcome/Modules';
import WhoUses from '@site/src/components/sections/welcome/WhoUses';

export default function WelcomePages(): JSX.Element {
  return (
    <Layout
      title="JHipster - 现代开发者的全栈平台！"
      description="JHipster 是一个开发平台，可以快速生成、开发和部署现代 Web 应用程序和微服务架构"
    >
      <Hero />

      <main>
        <Learn />
        <About />
        <SponsorsAndBackers />
        <CompaniesSupporting />
        <WhoUses />
        <ConnectCommunity />
        <Modules />
      </main>
    </Layout>
  );
}
