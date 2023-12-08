package com.example.CampusConnect.Messaging;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResponseMessage {
    public ResponseMessage(String contents) {
        this.contents = contents;
    }

    private String contents;
}
