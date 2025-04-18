import { Button, Toast, Card } from 'antd-mobile';
import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';

const FaceCheckIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [checkInInfo, setCheckInInfo] = useState<null | {
    name: string;
    employeeId: string;
    department: string;
    checkInTime: string;
  }>(null);

  const webcamRef = useRef<Webcam>(null);

  const videoConstraints = {
    facingMode: 'environment',
  };

  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleString();
  };

  const capture = async () => {
    if (!webcamRef.current) {
      Toast.show('摄像头未准备好，请重试');
      return;
    }
    const imageSrc = webcamRef.current.getScreenshot();
    if (!imageSrc) {
      Toast.show('未能获取到图像，请重试');
      return;
    }

    setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f2f4f7',
      }}
    >
      <h2 style={{ marginBottom: 24, color: '#333' }}>门禁扫脸打卡</h2>

      <div
        style={{
          width: '100%',
          maxWidth: 360,
          borderRadius: 12,
          overflow: 'hidden',
          border: '1px solid #ddd',
          background: '#000',
        }}
      >
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width="100%"
          videoConstraints={videoConstraints}
        />
      </div>

      <Button
        style={{ marginTop: 24, width: 200 }}
        onClick={capture}
        color="primary"
        loading={isLoading}
      >
        {isLoading ? '识别中...' : '确认打卡'}
      </Button>

      {checkInInfo && (
        <Card
          style={{
            marginTop: 32,
            width: '100%',
            maxWidth: 360,
            textAlign: 'left',
            backgroundColor: '#ffffff',
            borderRadius: 12,
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
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
  );
};

export default FaceCheckIn;
