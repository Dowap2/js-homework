import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import "./app.css";

const schema = z
  .object({
    name: z.string().min(2, "이름은 최소 2글자 이상이어야 합니다."),
    email: z.string().email("올바른 이메일 형식이 아닙니다."),
    password: z.string().min(6, "비밀번호는 6자리 이상이어야 합니다."),
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
    console.log("폼 데이터:", data);
    alert("회원가입 성공!");
  };

  return (
    <div className="app">
      <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="form-title">회원가입</h2>

        <div className="form-group">
          <label className="form-label">이름</label>
          <input
            {...register("name")}
            className="form-input"
            type="text"
            placeholder="이름을 입력하세요"
          />
          {errors.name && <p className="form-error">{errors.name.message}</p>}
        </div>

        <div className="form-group">
          <label className="form-label">이메일</label>
          <input
            {...register("email")}
            className="form-input"
            type="email"
            placeholder="이메일을 입력하세요"
          />
          {errors.email && <p className="form-error">{errors.email.message}</p>}
        </div>

        <div className="form-group">
          <label className="form-label">비밀번호</label>
          <input
            {...register("password")}
            className="form-input"
            type="password"
            placeholder="비밀번호를 입력하세요"
          />
          {errors.password && (
            <p className="form-error">{errors.password.message}</p>
          )}
        </div>

        <div className="form-group">
          <label className="form-label">비밀번호 확인</label>
          <input
            {...register("confirmPassword")}
            className="form-input"
            type="password"
            placeholder="비밀번호를 다시 입력하세요"
          />
          {errors.confirmPassword && (
            <p className="form-error">{errors.confirmPassword.message}</p>
          )}
        </div>

        <button className="form-button" type="submit">
          가입하기
        </button>
      </form>
    </div>
  );
}
