package com.zcy.common.utils;

import com.zcy.common.exception.ServiceException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;

import java.io.ByteArrayInputStream;
import java.security.MessageDigest;

@Slf4j
public class FileUtils {
    private static final int BUFFER_SIZE = 16 * 1024 * 1024;

    /**
     * 从输入流计算哈希（可支持文件流、大文件分段计算）
     *
     * @param bytes 输入流字节
     * @return 哈希字符串（十六进制）
     */
    public static String calculateFileHash(byte[] bytes) {
        try (ByteArrayInputStream byteStream = new ByteArrayInputStream(bytes)) {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] buffer = new byte[BUFFER_SIZE];
            int bytesRead;
            while ((bytesRead = byteStream.read(buffer)) != -1) {
                digest.update(buffer, 0, bytesRead);
            }
            byte[] hashBytes = digest.digest();
            StringBuilder sb = new StringBuilder();
            for (byte b : hashBytes) {
                sb.append(String.format("%02x", b));
            }
            return sb.toString();
        } catch (Exception e) {
            log.error("计算文件哈希出错", e);
            throw new ServiceException("计算文件哈希出错");
        }
    }

    public static String getFileName(String originalFilename) {
        if (StringUtils.isEmpty(originalFilename) || !originalFilename.contains(StringUtils.DOT)) {
            return originalFilename;
        }
        return originalFilename.substring(0, originalFilename.lastIndexOf(StringUtils.DOT));
    }

    public static String getFileType(String originalFilename) {
        if (StringUtils.isEmpty(originalFilename) || !originalFilename.contains(StringUtils.DOT)) {
            return null;
        }
        int beginIndex = originalFilename.lastIndexOf(StringUtils.DOT) + 1;
        if (originalFilename.length() == beginIndex) {
            return "png";
        }
        return originalFilename.substring(beginIndex);
    }

    /**
     * 根据文件类型获取ContentType
     *
     * @param fileType 文件类型后缀
     */
    public static String getContentType(String fileType) {
        String contentType = MediaType.APPLICATION_OCTET_STREAM_VALUE;
        if (StringUtils.isNotEmpty(fileType)) {
            switch (fileType) {
                case "jpg":
                case "jpeg":
                    contentType = MediaType.IMAGE_JPEG_VALUE;
                    break;
                case "png":
                    contentType = MediaType.IMAGE_PNG_VALUE;
                    break;
                case "gif":
                    contentType = MediaType.IMAGE_GIF_VALUE;
                    break;
                case "pdf":
                    contentType = MediaType.APPLICATION_PDF_VALUE;
                    break;
                default:
                    break;
            }
        }
        return contentType;
    }
}
