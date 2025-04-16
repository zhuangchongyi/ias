import { TabBar } from 'antd-mobile';
import { AppOutline, UnorderedListOutline, UserOutline } from 'antd-mobile-icons';
import React, { useState } from 'react';

import ProfileTab from './tabs/Profile';
import PunchCardTab from './tabs/PunchCard';
import RecordTab from './tabs/Record';

const MobileIndex: React.FC = () => {
  const [activeKey, setActiveKey] = useState('punchCard');

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

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1, overflow: 'auto' }}>
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
