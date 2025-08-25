import React from "react";

export default function InputField({ label, type, register, error }) {
  return (
    <div className="input-group">
      <label>{label}</label>
      <input type={type} {...register} />
      {error && <p className="error">{error.message}</p>}
    </div>
  );
}
