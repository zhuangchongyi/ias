import { Button, Mask, Toast } from 'antd-mobile';
import { CheckCircleFill } from 'antd-mobile-icons';
import React, { useEffect, useRef, useState } from 'react';
import './index.css';

const PunchCard: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<string>(''); // 当前时间
  const [punchType, setPunchType] = useState<string>('上班打卡'); // 打卡类型
  const [hasPunched, setHasPunched] = useState<boolean>(false); // 是否已打卡
  const [lateDuration, setLateDuration] = useState<string>(''); // 迟到时长
  const [isMaskVisible, setIsMaskVisible] = useState<boolean>(false); // 蒙版显示状态
  const [isInRange, setIsInRange] = useState<boolean>(true); // 是否在打卡范围内
  const [isColonVisible, setIsColonVisible] = useState<boolean>(true); // 控制冒号闪动

  const videoRef = useRef<HTMLVideoElement | null>(null); // 视频流引用
  const streamRef = useRef<MediaStream | null>(null); // 媒体流引用

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

      // setPunchType('上班打卡');

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
      setIsColonVisible((prev) => !prev);
    }, 500);

    return () => clearInterval(timer); // 清除定时器
  }, [hasPunched]);

  // 初始化摄像头
  const initCamera = async () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      Toast.show({ content: '当前设备不支持摄像头', icon: 'fail' });
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current?.play();
        };
      }
    } catch (err) {
      console.error('摄像头获取失败:', err);
      Toast.show({ content: '无法访问摄像头', icon: 'fail' });
    }
  };

  // 关闭摄像头
  const stopCamera = () => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
  };

  // 打开蒙版处理
  const handleOpenMask = () => {
    setIsMaskVisible(true);
    initCamera();
  };

  // 关闭蒙版处理
  const handleCloseMask = () => {
    setIsMaskVisible(false);
    stopCamera();
  };

  // 拍照处理
  const handleCapture = async () => {
    if (!videoRef.current) return;

    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const imageUrl = canvas.toDataURL('image/png');

      try {
        // TODO 模拟发送到后端
      } catch (error) {
        console.error('校验请求失败:', error);
        Toast.show({ content: '网络异常，请重试', icon: 'fail' });
      }
    }
  };

  return (
    <>
      <div className="punch-card-container">
        {/* 中间打卡状态 */}
        <div className="status-container">
          <div className={`status-indicator ${isInRange ? 'in-range' : 'out-range'}`}>
            <div className="status-text">{isInRange ? '你已在打卡范围内' : '不在打卡范围内'}</div>
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

        {/* 蒙版 */}
        {isMaskVisible && (
          <Mask visible={isMaskVisible} onMaskClick={handleCloseMask}>
            <div className="camera-mask">
              <div className="camera-preview">
                <video ref={videoRef} autoPlay playsInline muted style={{ width: '100%' }} />
              </div>
              <Button color="primary" style={{ marginTop: 20 }} onClick={handleCapture}>
                拍照
              </Button>
            </div>
          </Mask>
        )}

        {/* 上下班时间提示 */}
        <div className="time-range">
          上班09:00 <span style={{ color: 'green' }}><CheckCircleFill /></span> — 下班18:00<span style={{ color: 'green' }}><CheckCircleFill /></span>
        </div>
      </div>
    </>
  );
};

export default PunchCard;
