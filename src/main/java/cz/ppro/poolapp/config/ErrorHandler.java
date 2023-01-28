package cz.ppro.poolapp.config;

import lombok.Value;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ErrorHandler {

    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ExceptionRestResponse handleCustomException(Exception exception) {
        return new ExceptionRestResponse(404, exception.getMessage());
    }

    @Value
    public static class ExceptionRestResponse {
        int code;
        String message;
    }
}