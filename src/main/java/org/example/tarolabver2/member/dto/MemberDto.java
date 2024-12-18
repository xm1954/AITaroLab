package org.example.tarolabver2.member.dto;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Data;
import org.example.tarolabver2.member.ROLE;

@Data
public class MemberDto {

    @NotBlank(message = "이름은 필수 입력 항목 입니다.")
    @Size(max =30, message="이름은 30자를 초과할 수  없습니다")
    private String name;

    @NotEmpty(message = "닉네임은 필수 입력값 입니다.")
    @Size(max =50, message="이름은 50자를 초과할 수 없습니다.")
    private String nickname;

    @NotEmpty(message = "이메일은 필수 입력값 입니다.")
    private String email;

    @NotEmpty(message = "비밀번호는 필수 입력 항목 입니다.")
    @Size(min = 6, max = 20, message = "비밀번호는 6자 이상, 20자 이하여야 합니다.")
    private String password;

    private ROLE role;

}
