import { outLogin } from '@/services/auth';
import { TOKEN_KEY } from '@/utils/constant';
import { history, useModel } from '@umijs/max';
import { Avatar, Dialog, List, Space, Toast } from 'antd-mobile';
import { CloseCircleOutline, HeartOutline, UserOutline } from 'antd-mobile-icons';
import React from 'react';
import { flushSync } from 'react-dom';

const ProfileTab: React.FC = () => {
  const { initialState, setInitialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};

  const handleLogout = async () => {
    Dialog.confirm({
      content: '您确定要退出登录吗？',
      confirmText: '退出',
      cancelText: '取消',
      onConfirm: async () => {
        await outLogin();
        localStorage.removeItem(TOKEN_KEY);

        flushSync(() => {
          setInitialState((s) => ({ ...s, currentUser: undefined }));
        });

        /** 跳转到登录 */
        Toast.show('已退出登录');
        history.replace('/login');
      },
    });
  };

  const handleAboutUs = () => {
    Dialog.alert({
      title: '关于我们',
      content: '这是一个关于我们的弹窗，您可以添加更多内容。',
      confirmText: '确定',
    });
  };

  const handleEditProfile = () => {
    Toast.show('跳转到编辑资料页面');
    // history.push('/edit-profile');
  };

  return (
    <div style={{ padding: 24, textAlign: 'center' }}>
      <Space direction="vertical" align="center">
        <Avatar
          src={
            currentUser?.avatar ||
            'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png'
          }
          style={{ '--size': '80px' }}
        />
        <div style={{ fontSize: 18, fontWeight: 'bold' }}>
          {currentUser?.username || '未登录用户'}
        </div>
        <div style={{ fontSize: 16, color: '#888' }}>{currentUser?.nickname || '点击编辑资料'}</div>
      </Space>

      <List style={{ marginTop: 24 }}>
        <List.Item prefix={<UserOutline />} onClick={handleEditProfile}>
          编辑资料
        </List.Item>
        <List.Item prefix={<HeartOutline />} onClick={handleAboutUs}>
          关于我们
        </List.Item>
        <List.Item prefix={<CloseCircleOutline />} onClick={handleLogout} style={{ color: 'red' }}>
          退出登录
        </List.Item>
      </List>
    </div>
  );
};

export default ProfileTab;
