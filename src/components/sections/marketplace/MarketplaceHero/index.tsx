import { ChangeEvent } from 'react';
import Heading from '@theme/Heading';

import SearchInput from '@site/src/components/SearchInput';
import styles from './styles.module.scss';
import Link from '@docusaurus/Link';

type Props = {
  value: string;
  numberFilteredModules: number;
  numberModules: number;
  handleSearch: (event: ChangeEvent<HTMLInputElement>) => void;
};

export default function MarketplaceHero({
  value,
  numberFilteredModules = 0,
  numberModules = 0,
  handleSearch,
}: Props) {
  return (
    <header className={styles.section}>
      <div className="container">
        <Heading className={styles.sectionTitle} as="h1">
          模块中心
        </Heading>

        <Heading as="h2">
            可用模块和蓝图 (
          {`${numberFilteredModules}/${numberModules}`})
        </Heading>

        <SearchInput
          value={value}
          placeholder="按名称或关键词筛选"
          onInput={handleSearch}
        />

        <div className={styles.sectionButtons}>
          <Link
            className="button button--primary"
            to="/modules/creating-a-module"
          >
              创建您自己的模块
          </Link>
          <Link
            className="button button--secondary"
            to="/modules/creating-a-blueprint"
          >
              制定你自己的蓝图
          </Link>
        </div>
      </div>
    </header>
  );
}
