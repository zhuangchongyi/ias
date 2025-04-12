import { Avatar, Space } from 'antd-mobile';
import React from 'react';

const ProfileTab: React.FC = () => {
  return (
    <div style={{ padding: 24, textAlign: 'center' }}>
      <Space direction="vertical" align="center">
        <Avatar src="https://avatars.githubusercontent.com/u/1?v=4" style={{ '--size': '80px' }} />
        <div style={{ fontSize: 18 }}>张三</div>
        <div style={{ color: '#999' }}>部门：开发部</div>
      </Space>
    </div>
  );
};

export default ProfileTab;
