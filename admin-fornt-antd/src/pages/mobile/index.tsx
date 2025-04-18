import { NavBar, TabBar } from 'antd-mobile';
import { AppOutline, UnorderedListOutline, UserOutline } from 'antd-mobile-icons';
import React, { useEffect, useState } from 'react';

import ProfileTab from './tabs/Profile';
import PunchCardTab from './tabs/PunchCard';
import RecordTab from './tabs/Record';

const MobileIndex: React.FC = () => {
  const [activeKey, setActiveKey] = useState('punchCard');
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);

  const tabs = [
    {
      key: 'punchCard',
      title: '打卡',
      icon: <AppOutline />,
      component: <PunchCardTab />,
    },
    {
      key: 'record',
      title: '记录',
      icon: <UnorderedListOutline />,
      component: <RecordTab />,
    },
    {
      key: 'profile',
      title: '我的',
      icon: <UserOutline />,
      component: <ProfileTab />,
    },
  ];

  const currentTitle = tabs.find((tab) => tab.key === activeKey)?.title || '';

  useEffect(() => {
    const handleResize = () => {
      setViewportHeight(window.innerHeight);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div style={{ height: `${viewportHeight}px`, display: 'flex', flexDirection: 'column' }}>
      <NavBar backArrow={false}>{currentTitle}</NavBar>
      <div style={{ flex: 1, overflow: 'auto', background: '#F1F2F8' }}>
        {tabs.find((tab) => tab.key === activeKey)?.component}
      </div>
      <TabBar activeKey={activeKey} onChange={setActiveKey}>
        {tabs.map((tab) => (
          <TabBar.Item key={tab.key} icon={tab.icon} title={tab.title} />
        ))}
      </TabBar>
    </div>
  );
};

export default () => {
  return <MobileIndex />;
};
