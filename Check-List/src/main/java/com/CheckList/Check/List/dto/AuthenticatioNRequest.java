package com.CheckList.Check.List.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class AuthenticatioNRequest {
    private String email;
    private String password;
}
