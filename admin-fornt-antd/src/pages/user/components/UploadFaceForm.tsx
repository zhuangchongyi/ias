import FormUploadButton from '@/components/Form/UploadButton';
import { addUserFace, getUserFace } from '@/services/user';
import { joinIntlMessages } from '@/utils';
import { CameraOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { ModalForm } from '@ant-design/pro-components';
import { FormattedMessage, useIntl, useRequest } from '@umijs/max';
import type { UploadFile } from 'antd';
import { Button, message, Modal, Tag } from 'antd';
import { FC, useEffect, useRef, useState } from 'react';

interface UploadFaceFormProps {
  trigger: JSX.Element;
  values: Partial<API.SysUser>;
  onOk?: () => void;
}

const UploadFaceForm: FC<UploadFaceFormProps> = ({ trigger, values, onOk }) => {
  const intl = useIntl();
  const [messageApi, messageContextHolder] = message.useMessage();

  const [hasCamera, setHasCamera] = useState(false);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [capturedList, setCapturedList] = useState<any[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);

  const { run: runUploadFace, loading } = useRequest(addUserFace, {
    manual: true,
    onSuccess: () => {
      messageApi.success(intl.formatMessage({ id: 'message.operation.success' }));
      onOk?.();
    },
    onError: () => {
      messageApi.error(intl.formatMessage({ id: 'message.operation.failure' }));
    },
  });

  const getInfo = async (): Promise<API.SysUserFace> => {
    let { data } = await getUserFace(values.id);
    console.log('data', data);

    if (!data || data.length === 0) {
      return {
        userFaces: [],
      };
    }

    return {
      userFaces: data.map((item) => {
        let name = item.fileUrl?.substring(item.fileUrl?.lastIndexOf('/') + 1);
        return {
          uid: `${Date.now()}-${Math.random()}`,
          name: name,
          status: 'done',
          url: item.fileUrl,
          ...item,
        };
      }),
    };
  };

  useEffect(() => {
    const mediaDevices = navigator.mediaDevices;
    if (mediaDevices && mediaDevices.enumerateDevices) {
      mediaDevices
        .enumerateDevices()
        .then((devices) => {
          const hasCam = devices.some((device) => device.kind === 'videoinput');
          setHasCamera(hasCam);
        })
        .catch(() => {
          setHasCamera(false);
        });
    } else {
      setHasCamera(false);
    }
  }, []);

  const handleTakePhoto = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
    }
    setIsCameraOpen(true);
  };

  const handleCapture = () => {
    const video = videoRef.current;
    if (video) {
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0);
        const imgUrl = canvas.toDataURL('image/jpeg');
        const fileId = `${Date.now()}-${Math.random()}`;
        const fileName = `captured-${fileId}.jpg`;
        const capturedFile = {
          uid: fileId,
          name: fileName,
          status: 'done',
          url: imgUrl,
        };

        setCapturedList((prev) => [...prev, capturedFile]);
      }
      const stream = video.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      setIsCameraOpen(false);
    }
  };
  return (
    <>
      {messageContextHolder}
      <ModalForm<API.SysUserFace>
        title={`${values.nickname} ` + intl.formatMessage({ id: 'pages.SysUser.UploadFace.title' })}
        trigger={trigger}
        width={600}
        modalProps={{ okButtonProps: { loading } }}
        request={getInfo}
        onFinish={async (formValues) => {
          const { userFaces } = formValues;
          console.log('userFaces', userFaces);
          console.log('capturedList', capturedList);

          await runUploadFace(values.id, userFaces);
          return true;
        }}
      >
        {hasCamera ? (
          <Button icon={<CameraOutlined />} onClick={handleTakePhoto} style={{ marginBottom: 12 }}>
            <FormattedMessage id="pages.SysUser.UploadFace.TakePhotoUpload" />
          </Button>
        ) : (
          <Tag icon={<CloseCircleOutlined />} color="error">
            <FormattedMessage id="pages.SysUser.UploadFace.TakePhotoUploadErrorMsg" />
          </Tag>
        )}

        <FormUploadButton
          name="userFaces"
          max={10}
          label={<FormattedMessage id="pages.SysUser.UploadFace.userFace" />}
          fieldProps={{
            multiple: true,
            data: {
              userId: values.id,
            },
            onChange: (info: any) => {
              const { file, fileList } = info;

              if (file.status === 'error' || file?.response?.success === false) {
                messageApi.error(
                  file?.response?.msg ||
                    intl.formatMessage({ id: 'message.operation.upload.failure' }),
                );
                // 移除上传失败的文件
                info.fileList = fileList.filter((item: UploadFile) => item.uid !== file.uid);
              } else {
                info.fileList = fileList.map((item: UploadFile) => {
                  if (item.response) {
                    return {
                      ...item,
                      url: item.response.data?.fileUrl,
                    };
                  }
                  return item;
                });
              }
            },
          }}
          action="/api/sysUser/uploadUserFace"
          transform={(values: any[]) => {
            console.log('values1111111111', values);

            const userFaceData = (
              values.map((it) => {
                return {
                  id: it.id || null,
                  fileUrl: it.url || it?.response?.data?.fileUrl,
                  faceId: it.faceId || it?.response?.data?.otherData,
                };
              }) || []
            ).filter(Boolean);
            return { userFaces: userFaceData };
          }}
          rules={[
            {
              required: true,
              message: joinIntlMessages([
                'pages.common.required.upload',
                'pages.SysUser.UploadFace.userFace',
              ]),
            },
            {
              validator: async (_dom: any, value: any[]) => {
                const length = value?.length || 0;
                if (length < 3) {
                  return Promise.reject(
                    new Error(
                      intl.formatMessage({ id: 'pages.SysUser.UploadFace.required.minUserFace' }),
                    ),
                  );
                }
                if (length > 10) {
                  return Promise.reject(
                    new Error(
                      intl.formatMessage({ id: 'pages.SysUser.UploadFace.required.maxUserFace' }),
                    ),
                  );
                }
                return Promise.resolve();
              },
            },
          ]}
        />

        {/* 拍照弹窗组件 */}
        <Modal
          title={<FormattedMessage id="pages.SysUser.UploadFace.TakePhotoUpload" />}
          open={isCameraOpen}
          onOk={handleCapture}
          onCancel={() => {
            setIsCameraOpen(false);
            const video = videoRef.current;
            if (video?.srcObject) {
              const stream = video.srcObject as MediaStream;
              stream.getTracks().forEach((track) => track.stop());
            }
          }}
        >
          <video ref={videoRef} autoPlay style={{ width: '100%' }} />
        </Modal>
      </ModalForm>
    </>
  );
};

export default UploadFaceForm;
