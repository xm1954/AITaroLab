package org.example.tarolabver2.member.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;
import org.example.tarolabver2.member.ROLE;



@Getter
@Setter
@AllArgsConstructor
@Builder
@Entity
@NoArgsConstructor
@ToString
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id")
    private Long id;

    @NotBlank(message = "이름은 필수 입력 항목입니다.") // 빈 문자열과 공백 허용 안 함
    @Column(nullable = false, length = 30)
    private String name;

    @NotBlank(message = "닉네임은 필수 입력 항목입니다.")
    @Column(nullable = false, length = 50)
    private String nickname;

    @NotBlank(message = "이메일은 필수 입력 항목입니다.")
    @Column(nullable = false, length = 50)
    private String email;

    @NotBlank(message = "비밀번호는 필수 입력 항목입니다.")
    @Column(nullable = false, length = 200)
    private String password;

    @Enumerated(EnumType.STRING)
    private ROLE role;


}
