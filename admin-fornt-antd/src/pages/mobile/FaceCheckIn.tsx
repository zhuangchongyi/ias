import { Card, NavBar, Toast } from 'antd-mobile';
import { useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';

const FaceCheckIn = () => {
  const [checkInInfo, setCheckInInfo] = useState<null | {
    name: string;
    employeeId: string;
    department: string;
    checkInTime: string;
  }>(null);

  const webcamRef = useRef<Webcam>(null);

  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleString();
  };

  const captureAndCheckIn = async () => {
    if (!webcamRef.current) {
      Toast.show('摄像头未准备好，请重试');
      return;
    }
    const imageSrc = webcamRef.current.getScreenshot();
    if (!imageSrc) {
      Toast.show('未能获取到图像，请重试');
      return;
    }
    try {
      // 模拟返回的用户信息
      const response = {
        success: true,
        data: {
          name: '张三',
          employeeId: 'EMP001',
          department: '研发部',
        },
      };

      if (response.success) {
        setCheckInInfo({
          ...response.data,
          checkInTime: getCurrentTime(),
        });
        Toast.show('打卡成功');
      } else {
        Toast.show('未识别到您的面部，请重试');
        setCheckInInfo(null);
      }
    } catch (error) {
      Toast.show('打卡失败，请稍后再试');
    }
  };

  useEffect(() => {
    // 自动触发人脸识别打卡
    const intervalId = setInterval(() => {
      captureAndCheckIn();
    }, 5000); // 每隔5秒自动拍照检测

    return () => clearInterval(intervalId); // 清除定时器
  }, []);

  return (
    <>
      <NavBar backIcon={false} style={{ background: '#1677ff', color: '#fff' }}>
        打卡
      </NavBar>

      <div
        style={{
          position: 'relative',
          width: '100vw',
          height: '100vh',
          overflow: 'hidden',
        }}
      >
        {/* 全屏摄像头 */}
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={{
            facingMode: 'environment',
          }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 0, // 摄像头在背景层
          }}
        />

        {/* 页面内容 */}
        <div
          style={{
            position: 'absolute',
            zIndex: 1, // 内容在摄像头上方
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(4px)', // 模糊背景
            textAlign: 'center',
          }}
        >
          {checkInInfo && (
            <Card
              style={{
                marginTop: 32,
                width: '100%',
                maxWidth: 300,
                textAlign: 'left',
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                borderRadius: 12,
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              }}
              title="✅ 打卡成功"
            >
              <div style={{ fontSize: 16, marginBottom: 8 }}>👤 姓名：{checkInInfo.name}</div>
              <div style={{ fontSize: 16, marginBottom: 8 }}>🆔 工号：{checkInInfo.employeeId}</div>
              <div style={{ fontSize: 16, marginBottom: 8 }}>🏢 部门：{checkInInfo.department}</div>
              <div style={{ fontSize: 16 }}>🕒 时间：{checkInInfo.checkInTime}</div>
            </Card>
          )}
        </div>
      </div>
    </>
  );
};

export default FaceCheckIn;
