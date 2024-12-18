package org.example.tarolabver2.common.exception;

import org.springframework.http.HttpStatus;

public class MemberException {

    private final HttpStatus status;

    public MemberException(String message, HttpStatus status) {
        super();
        this.status = status;
    }

    public HttpStatus getStatus() {
        return status;
    }
}
