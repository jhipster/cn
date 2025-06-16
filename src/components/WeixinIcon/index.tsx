import React, { useState } from 'react';
import { FaWeixin } from 'react-icons/fa6';
import styles from './styles.module.scss';

type Props = {
  className?: string;
};

export default function WeixinIcon({ className }: Props) {
  const [showQR, setShowQR] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowQR(!showQR);
  };

  return (
    <div className={styles.weixinContainer}>
      <button
        className={`${styles.weixinButton} ${className || ''}`}
        onClick={handleClick}
        aria-label="微信"
      >
        <FaWeixin />
      </button>
      {showQR && (
        <div className={styles.qrOverlay} onClick={() => setShowQR(false)}>
          <div className={styles.qrContainer}>
            <img
              src="/images/weixin-jhipster.png"
              alt="微信二维码"
              className={styles.qrImage}
            />
          </div>
        </div>
      )}
    </div>
  );
}