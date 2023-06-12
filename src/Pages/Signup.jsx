import React, { useState } from "react";
import book from "../Assets/book.svg";
import hero from "../Assets/undraw_book_lover_mkck (1) 1.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Signup() {
  const [loading, setLoading] = useState(false);

  const [input, setInput] = useState({
    firstName: "",
    lastName: "",
    password: "",
    email: "",
  });
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const onChangeHandler = (e) => {
    setInput({ ...input, [e.target.id]: e.target.value });
  };

  // const onChangeEmail = (e) => {
  //   setEmail(e.target.value);
  // };
  // const onChangeFirstName = (e) => {
  //   setEmail(e.target.value);
  // };
  // const onChangeLastName = (e) => {
  //   setEmail(e.target.value);
  // };
  // const onChangePassword = (e) => {
  //   setPassword(e.target.value);
  // };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);




    try {

      await axios.post("http://localhost:5000/api/auth/register", input)
        .then((res) => {
          console.log(res.data);
          navigate("/login");
          setLoading(false);
          alert("Sign up successful");
        })

      } catch(err) {
        console.log(err);
        setLoading(false);
      
    }
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
            id="firstName"
            type="text"
            placeholder="firstName"
            onChange={onChangeHandler}
            className="h-14 border border-[#FB6900] rounded-[5px] outline-none px-6"
          />
          <input
          id="lastName"
            type="text"
            placeholder="lastName"
            onChange={onChangeHandler}
            className="h-14 border border-[#FB6900] rounded-[5px] outline-none px-6"
          />
          <input
            id="email"
            type="email"
            value={input.email}
            placeholder="Email address"
            onChange={onChangeHandler}
            className="h-14 border border-[#FB6900] rounded-[5px] outline-none px-6"
          />
          <input
          id="password"
            type="password"
            value={input.password}
            placeholder="Password"
            onChange={onChangeHandler}
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