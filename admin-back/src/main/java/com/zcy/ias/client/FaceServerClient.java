package com.zcy.ias.client;

import com.zcy.common.core.R;
import com.zcy.ias.vo.FaceData;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.MediaType;
import org.springframework.http.client.MultipartBodyBuilder;
import org.springframework.stereotype.Component;
import org.springframework.util.MultiValueMap;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.HashMap;
import java.util.List;
import java.util.Objects;

@Slf4j
@Component
public class FaceServerClient {

    private final WebClient webClient;

    public FaceServerClient(WebClient.Builder builder) {
        this.webClient = builder.baseUrl("http://127.0.0.1:39090").build();
    }

    /**
     * 注册人脸
     */
    public R<String> registerFace(Long userId, MultipartFile file) {
        ParameterizedTypeReference<R<String>> typeReference = new ParameterizedTypeReference<>() {
        };
        WebClient.ResponseSpec response = webClient.post()
                .uri(uriBuilder -> uriBuilder
                        .path("/register_face")
                        .queryParam("user_id", userId)
                        .build())
                .contentType(MediaType.MULTIPART_FORM_DATA)
                .body(BodyInserters.fromMultipartData(this.getMultiValueMap(file)))
                .retrieve();
        R<String> r = response.bodyToMono(typeReference).block();
        log.info("注册人脸:{}", r);
        return r;
    }

    /**
     * 比较人脸数据
     */
    public R<FaceData> compareFace(MultipartFile file) {
        WebClient.ResponseSpec response = webClient.post()
                .uri(uriBuilder -> uriBuilder
                        .path("/register_face")
                        .build())
                .contentType(MediaType.MULTIPART_FORM_DATA)
                .body(BodyInserters.fromMultipartData(this.getMultiValueMap(file)))
                .retrieve();
        ParameterizedTypeReference<R<FaceData>> elementTypeRef = new ParameterizedTypeReference<>() {
        };
        R<FaceData> r = response.bodyToMono(elementTypeRef).block();
        log.info("比较人脸数据:{}", r);
        return r;
    }

    /**
     * 删除用户人脸数据
     */
    public void deleteFace(Long userId, List<String> idList) {
        HashMap<String, Object> bodyMap = new HashMap<>();
        bodyMap.put("user_id", userId);
        bodyMap.put("id_list", idList);
        WebClient.ResponseSpec response = webClient.post()
                .uri(uriBuilder -> uriBuilder
                        .path("/delete_face")
                        .build())
                .body(BodyInserters.fromValue(bodyMap))
                .retrieve();
        R<?> r = response.bodyToMono(R.class).block();
        log.info("删除用户人脸数据:{}", r);
    }

    private MultiValueMap<String, HttpEntity<?>> getMultiValueMap(MultipartFile file) {
        MultipartBodyBuilder builder = new MultipartBodyBuilder();
        builder.part("file", file.getResource())
                .filename(Objects.requireNonNull(file.getOriginalFilename()));
        return builder.build();
    }

}
