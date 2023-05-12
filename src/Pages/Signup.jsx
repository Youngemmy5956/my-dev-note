import React, { useState } from "react";
import book from "../Assets/book.svg";
import hero from "../Assets/undraw_book_lover_mkck (1) 1.svg";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  return (
    <div className="w-full h-screen flex justify-center bg-[#E5E5E5]">
      <main className="w-[500px] bg-white px-6">
        <header className="flex items-center gap-4 mt-12">
          <img src={book} alt="book" />
          <p className="text-lg roboto">DevNote</p>
        </header>

        <div className="mt-12">
          <img src={hero} alt="" className="w-full" />
          <p className="text-lg roboto text-center">Sign up</p>
        </div>

        <form onSubmit={onSubmit} className="flex flex-col gap-4 mt-12">
          <input
            type="email"
            value={email}
            placeholder="Email address"
            onChange={onChangeEmail}
            className="h-14 border border-[#FB6900] rounded-[5px] outline-none px-6"
          />
          <input
            type="password"
            value={password}
            placeholder="Password"
            onChange={onChangePassword}
            className="h-14 border border-[#FB6900] rounded-[5px] outline-none px-6"
          />
          <button className="bg-[#FB6900] text-white text-lg h-14 rounded-[5px] roboto">
            Sign up
          </button>
        </form>
        <a
          href="/login"
          className="roboto text-[#FB6900] flex justify-center mt-4"
        >
          Registered? Login here
        </a>
      </main>
    </div>
  );
}