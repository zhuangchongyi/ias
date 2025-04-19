import { Button, Mask, Tabs, Toast } from 'antd-mobile';
import { CheckCircleFill, CloseCircleOutline } from 'antd-mobile-icons';
import React, { useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import './index.css';

const PunchCard: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<string>(''); // 当前时间
  const [punchType, setPunchType] = useState<string>('上班打卡'); // 打卡类型
  const [hasPunched, setHasPunched] = useState<boolean>(false); // 是否已打卡
  const [lateDuration, setLateDuration] = useState<string>(''); // 迟到时长
  const [isMaskVisible, setIsMaskVisible] = useState<boolean>(false); // 蒙版显示状态
  const [isInRange, setIsInRange] = useState<boolean>(true); // 是否在打卡范围内
  const [isColonVisible, setIsColonVisible] = useState<boolean>(true); // 控制冒号闪动
  const [activeTab, setActiveTab] = useState<string>('face');

  const webcamRef = useRef<Webcam>(null); // React Webcam 引用

  // 更新当前时间和打卡类型
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes
        .toString()
        .padStart(2, '0')}`;
      setCurrentTime(formattedTime);

      // 根据时间和打卡状态动态设置打卡类型
      if (!hasPunched) {
        if (hours < 9) {
          setPunchType('上班打卡');
        } else if (hours >= 9 && hours < 18) {
          const lateHours = hours - 9;
          const lateMinutes = minutes;
          setLateDuration(`${lateHours}小时${lateMinutes}分钟`);
          setPunchType('迟到打卡');
        } else {
          setPunchType('下班打卡');
        }
      } else {
        setPunchType('下班打卡');
      }

      // 切换冒号的显示状态
      setIsColonVisible((prev: any) => !prev);
    }, 500);

    return () => clearInterval(timer); // 清除定时器
  }, [hasPunched]);

  // 打开蒙版处理
  const handleOpenMask = () => {
    setIsMaskVisible(true);
  };

  // 关闭蒙版处理
  const handleCloseMask = () => {
    setIsMaskVisible(false);
  };

  // 拍照处理
  const handleCapture = async () => {
    if (!webcamRef.current) return;

    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) {
      console.log('Captured Image:', imageSrc);
      try {
        // TODO 模拟发送到后端
      } catch (error) {
        console.error('校验请求失败:', error);
        Toast.show({ content: '网络异常，请重试', icon: 'fail' });
      }
    } else {
      Toast.show({ content: '拍照失败，请重试', icon: 'fail' });
    }
  };

  return (
    <>
      <Tabs
        activeKey={activeTab}
        onChange={(key) => setActiveTab(key)}
        style={{ marginBottom: 16 }}
      >
        <Tabs.Tab title="人脸打卡" key="face" />
        <Tabs.Tab title="定位打卡" key="location" />
      </Tabs>
      <div className="punch-card-container">
        {activeTab === 'face' && (
          <>
            {/* 中间打卡状态 */}
            <div className="status-container">
              <div className={`status-indicator ${isInRange ? 'in-range' : 'out-range'}`}>
                <div className="status-text">
                  {isInRange ? '你已在打卡范围内' : '不在打卡范围内'}
                </div>
                <div className="status-location">{process.env.UMI_APP_TITLE}</div>
              </div>
            </div>

            {/* 打卡按钮 */}
            <div className="punch-button-container">
              <Button
                className="punch-button"
                onClick={handleOpenMask}
                style={{
                  border: '10px solid #f0ad4e',
                  borderRadius: '50%',
                  width: 150,
                  height: 150,
                  fontSize: 18,
                  fontWeight: 'bold',
                  backgroundColor: punchType === '迟到打卡' ? '#f44336' : '#fff',
                  color: punchType === '迟到打卡' ? '#fff' : '#f0ad4e',
                }}
              >
                {punchType}
                <div style={{ fontSize: 24, marginTop: 6 }}>
                  {currentTime.split(':')[0]}
                  <span style={{ visibility: isColonVisible ? 'visible' : 'hidden' }}>:</span>
                  {currentTime.split(':')[1]}
                </div>
              </Button>
            </div>

            {/* 背景蒙层 */}
            {isMaskVisible && (
              <Mask visible={isMaskVisible} destroyOnClose onMaskClick={handleCloseMask}>
                <div className="camera-mask" onClick={(e) => e.stopPropagation()}>
                  <div className="camera-preview">
                    <Webcam
                      audio={false}
                      ref={webcamRef}
                      screenshotFormat="image/jpeg"
                      width="100%"
                      style={{ borderRadius: '8px' }}
                    />
                  </div>
                  {/* <Button color="primary" style={{ marginTop: 20 }} onClick={handleCapture}>
                    拍照
                  </Button> */}

                  {/* 关闭按钮 */}
                  <div className="close-mask-btn" onClick={handleCloseMask}>
                    <CloseCircleOutline fontSize={28} />
                  </div>
                </div>
              </Mask>
            )}
          </>
        )}

        {activeTab === 'location' && (
          <div style={{ padding: '24px', textAlign: 'center' }}>
            <p>🌍 定位打卡功能开发中...</p>
            <p>可集成 GPS 定位、地理围栏等逻辑</p>
          </div>
        )}

        <div className="time-range">
          上班09:00{' '}
          <span style={{ color: 'green' }}>
            <CheckCircleFill />
          </span>{' '}
          — 下班18:00
          <span style={{ color: 'green' }}>
            <CheckCircleFill />
          </span>
        </div>
      </div>
    </>
  );
};

export default PunchCard;
