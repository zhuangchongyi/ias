package com.zcy.common.utils;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JavaType;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.type.SimpleType;
import com.zcy.common.utils.text.CharsetKit;
import lombok.extern.slf4j.Slf4j;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.Reader;
import java.lang.reflect.Type;
import java.net.URLDecoder;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

/**
 * Json工具类
 *
 * @author zhuangchongyi
 */
@Slf4j
public class JSONUtils {

    public final static ObjectMapper mapper = SpringUtils.getBean(ObjectMapper.class);

    /**
     * 对象转json
     */
    public static String toJson(Object obj) {
        String json = null;
        if (obj == null) {
            return json;
        }
        try {
            json = mapper.writeValueAsString(obj);
        } catch (JsonProcessingException e) {
            log.error("转换JSON异常：{}", obj, e);
        }
        return json;
    }

    /**
     * json转对象
     */
    public static <T> T toBean(String jsonStr, Class<T> objClass) {
        if (StringUtils.isEmpty(jsonStr)) {
            return null;
        }
        T t = null;
        try {
            t = mapper.readValue(jsonStr, objClass);
        } catch (Exception e) {
            log.error("objClass转换BEAN异常详情：{},{}", jsonStr, e.getMessage());
        }
        return t;
    }

    public static <T> T toBean(Reader reader, Type type) {
        T t = null;
        try {
            t = mapper.readValue(reader, mapper.constructType(type));
        } catch (Exception e) {
            log.error(e.getMessage());
        } finally {
            try {
                if (reader != null) {
                    reader.close();
                }
            } catch (IOException e) {
                log.error(e.getMessage());
            }
        }
        return t;
    }

    public static <T> T toBean(InputStream in, Type type) {
        T t = null;
        try {
            t = mapper.readValue(in, mapper.constructType(type));
        } catch (Exception e) {
            log.error(e.getMessage());
        } finally {
            try {
                if (in != null) {
                    in.close();
                }
            } catch (IOException e) {
                log.error(e.getMessage());
            }
        }
        return t;
    }

    private static <T> T toBean(String jsonStr, JavaType type) {
        if (StringUtils.isEmpty(jsonStr)) {
            return null;
        }
        T t = null;
        try {
            t = mapper.readValue(jsonStr, type);
        } catch (Exception e) {
            log.error("JavaType转换BEAN异常详情：" + jsonStr, e);
        }
        return t;
    }

    public static <T> T toBean(String jsonStr, Class<?> c1, Class<?> c2, Class<?> c3) {
        return toBean(jsonStr, mapper.getTypeFactory().constructParametricType(c1,
                mapper.getTypeFactory().constructParametricType(c2, c3)));
    }

    public static <T> T toBean(String jsonStr, Class<?> collectionClass, Class<?>... elementClasses) {
        return toBean(jsonStr, mapper.getTypeFactory().constructParametricType(collectionClass, elementClasses));
    }

    private static <T> T toCollection(String jsonStr, Class<?> collectionClass, Class<?>... elementClasses) {
        return toBean(jsonStr, mapper.getTypeFactory().constructParametricType(collectionClass, elementClasses));
    }

    public static <T> T toSet(String jsonStr, Class<?>... elementClasses) {
        return toCollection(jsonStr, Set.class, elementClasses);
    }

    public static <T> T toList(String jsonStr, Class<?>... elementClasses) {
        return toCollection(jsonStr, List.class, elementClasses);
    }

    public static <T> List<T> toList(File file, Class<T> elementClasses) {

        try {
            return mapper.readValue(file, mapper.getTypeFactory().constructParametricType(List.class, elementClasses));
        } catch (IOException e) {
            log.error(e.getMessage());
        }
        return null;
    }

    public static <T> T toMap(String jsonStr) {
        return toBean(jsonStr, mapper.getTypeFactory().constructMapType(Map.class, String.class, Object.class));
    }

    public static <T> T toMap(String jsonStr, Class<?> c) {
        return toBean(jsonStr, mapper.getTypeFactory().constructMapType(Map.class, String.class, c));
    }

    public static <T> T toMap(String jsonStr, Class<?> c1, Class<?> c2, Class<?>... c3) {
        JavaType keyType = SimpleType.constructUnsafe(c1);
        JavaType valueType = mapper.getTypeFactory().constructParametricType(c2, c3);
        return toBean(jsonStr, mapper.getTypeFactory().constructMapType(Map.class, keyType, valueType));
    }

    public static <T> T convertValue(Object obj, Class<T> clazz) {
        return mapper.convertValue(obj, clazz);
    }

    public static <T> T convertValue(Object obj, Type type) {
        return mapper.convertValue(obj, mapper.constructType(type));
    }

    /**
     * 将url参数转换成map
     *
     * @param param aa=11&bb=22&cc=33
     */
    public static Map<String, Object> toUrlMap(String param) {
        Map<String, Object> map = new HashMap<>(0);
        if (StringUtils.isBlank(param)) {
            return map;
        }
        String[] params = param.split("&");
        for (String s : params) {
            String[] p = s.split("=");
            if (p.length == 2) {
                map.put(p[0], URLDecoder.decode(String.valueOf(p[1]), CharsetKit.CHARSET_UTF_8));
            }
        }
        return map;
    }

    /**
     * 压缩 JSON 字符串，去除多余的空格和换行符
     *
     * @param jsonString 要压缩的 JSON 字符串
     * @return 压缩后的 JSON 字符串
     */
    public static String compressJson(String jsonString) {
        try {
            if (StringUtils.isEmpty(jsonString)) {
                return jsonString;
            }
            // 将 JSON 字符串转换为对象，然后再转回 JSON 字符串以压缩
            Object json = mapper.readValue(jsonString, Object.class);
            return mapper.writeValueAsString(json);
        } catch (Exception e) {
            return jsonString;
        }
    }

}
