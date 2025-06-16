import { FaGithub, FaStackOverflow, FaYoutube } from 'react-icons/fa6';
import WeixinIcon from '@site/src/components/WeixinIcon';

const socialLinks = [
  {
    icon: WeixinIcon,
    href: '#',
    alt: '微信',
    isCustomComponent: true,
  },
  {
    icon: FaGithub,
    href: 'https://github.com/jhipster/generator-jhipster',
    alt: 'GitHub',
  },
  {
    icon: FaYoutube,
    href: 'https://www.youtube.com/c/JHipsterDevelopersAssociation',
    alt: 'YouTube channel',
  },
  {
    icon: FaStackOverflow,
    href: 'http://stackoverflow.com/tags/jhipster/info',
    alt: 'Stackoverflow',
  },
];

export default socialLinks;
