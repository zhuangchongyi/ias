import { Button, ImageUploader, Toast } from 'antd-mobile';
import React, { useState } from 'react';

const PunchCardTab: React.FC = () => {
  const [images, setImages] = useState([]);

  const handleCapture = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.capture = 'environment';
    input.onchange = (e: any) => {
      const file = e.target.files[0];
      if (file) {
        setImages((prev) => [...prev, { url: URL.createObjectURL(file) }]);
        Toast.show({ content: '拍照成功', icon: 'success' });
      }
    };
    input.click();
  };

  return (
    <div style={{ padding: 24, textAlign: 'center' }}>
      <Button color="primary" onClick={handleCapture}>
        拍照打卡
      </Button>
      <ImageUploader
        value={images}
        onChange={setImages}
        maxCount={5}
        preview
        showUpload={false}
        style={{ marginTop: 20 }}
      />
    </div>
  );
};

export default PunchCardTab;
