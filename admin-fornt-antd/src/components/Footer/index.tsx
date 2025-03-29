import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import React from 'react';

const Footer: React.FC = () => {
  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      copyright="Powered by ZhuangChongYi"
      links={[
        {
          key: '智能考勤系统',
          title: '智能考勤系统',
          href: '/',
          blankTarget: false,
        },
        {
          key: 'github',
          title: <GithubOutlined />,
          href: 'https://github.com/zhuangchongyi/ias',
          blankTarget: true,
        },
        {
          key: 'Ant Design',
          title: 'Ant Design',
          href: 'https://ant-design.antgroup.com/index-cn',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
