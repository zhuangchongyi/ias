package com.zcy.common.utils.ip;

import com.zcy.common.utils.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.client.RestTemplate;

import java.util.Map;
import java.util.Objects;

/**
 * 获取地址类
 *
 * @author ruoyi
 */
public class AddressUtils {
    // IP地址查询
    public static final String IP_URL = "http://whois.pconline.com.cn/ipJson.jsp";
    // 未知地址
    public static final String UNKNOWN = "unknown";
    private static final Logger log = LoggerFactory.getLogger(AddressUtils.class);

    public static String getRealAddressByIP(String ip) {
        // 内网不查询
        if (IpUtils.internalIp(ip)) {
            return "内网IP";
        }
        try {

            RestTemplate restTemplate = new RestTemplate();
            String url = IP_URL + "?json=true" + "&ip=" + ip;
            var body = restTemplate.getForObject(url, Map.class);
            if (Objects.isNull(body)) {
                log.error("获取地理位置接口异常 {}", ip);
                return UNKNOWN;
            }

            String region = Objects.toString(body.get("pro"), StringUtils.EMPTY);
            String city = Objects.toString(body.get("city"), StringUtils.EMPTY);
            return String.format("%s%s", region, city);
        } catch (Exception e) {
            log.error("获取地理位置异常 {}", ip);
        }
        return UNKNOWN;
    }

    public static void main(String[] args) {
        System.out.println(getRealAddressByIP("116.30.7.31"));
    }
}
