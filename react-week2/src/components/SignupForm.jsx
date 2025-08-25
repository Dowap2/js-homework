import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "./InputField";

const schema = z
  .object({
    name: z.string().min(2, "이름은 최소 2글자 이상이어야 합니다."),
    email: z.string().email("올바른 이메일 형식을 입력해주세요."),
    password: z.string().min(6, "비밀번호는 최소 6자리 이상이어야 합니다."),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["confirmPassword"],
  });

export default function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    console.log("회원가입 성공:", data);
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>회원가입</h2>

        <InputField
          label="이름"
          type="text"
          register={register("name")}
          error={errors.name}
        />

        <InputField
          label="이메일"
          type="email"
          register={register("email")}
          error={errors.email}
        />

        <InputField
          label="비밀번호"
          type="password"
          register={register("password")}
          error={errors.password}
        />

        <InputField
          label="비밀번호 확인"
          type="password"
          register={register("confirmPassword")}
          error={errors.confirmPassword}
        />

        <button type="submit">가입하기</button>
      </form>
    </div>
  );
}
