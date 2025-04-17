package com.zcy.ias.client;

import com.zcy.common.core.R;
import org.springframework.http.MediaType;
import org.springframework.http.client.MultipartBodyBuilder;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Objects;

@Component
public class FaceServerClient {

    private final WebClient webClient;

    public FaceServerClient(WebClient.Builder builder) {
        this.webClient = builder.baseUrl("http://127.0.0.1:39090").build();
    }

    /**
     * 注册人脸
     */
    public R<?> registerFace(Long userId, MultipartFile file) {
        WebClient.ResponseSpec response = webClient.post()
                .uri(uriBuilder -> uriBuilder
                        .path("/register_face")
                        .queryParam("user_id", userId)
                        .build())
                .contentType(MediaType.MULTIPART_FORM_DATA)
                .body(BodyInserters.fromMultipartData(this.getMultiValueMap(file)))
                .retrieve();
        return response.bodyToMono(R.class).block();
    }


    /**
     * 比较人脸数据
     */
    public R<?> compareFace(Long userId, MultipartFile file) {
        WebClient.ResponseSpec response = webClient.post()
                .uri(uriBuilder -> uriBuilder
                        .path("/register_face")
                        .queryParam("user_id", userId)
                        .build())
                .contentType(MediaType.MULTIPART_FORM_DATA)
                .body(BodyInserters.fromMultipartData(this.getMultiValueMap(file)))
                .retrieve();
        return response.bodyToMono(R.class).block();
    }

    private MultiValueMap<String, Object> getMultiValueMap(MultipartFile file) {
        MultiValueMap<String, Object> formData = new LinkedMultiValueMap<>();
        MultipartBodyBuilder.PartBuilder partBuilder = new MultipartBodyBuilder()
                .part("file", file.getResource())
                .filename(Objects.requireNonNull(file.getOriginalFilename()));
        formData.add("file", partBuilder);
        return formData;
    }


}
