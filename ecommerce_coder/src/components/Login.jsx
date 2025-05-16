import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function Login() {
  const email = useState("");
  const password = useState("");

  const login = async () => {
    try {
      const data = {
        email: email.current?.value,
        password: password.current.value,
      };
      const url = "http://localhost:8080/api/auth/login";
      const response = await axios.post(url, data);
      Swal.fire({
        icon: "success",
        title: "Ok",
        text: `${response.data.message}`,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error.response.data.error}`,
      });
    }
  };

  return (
    <>
      <h2 className="text-red-600 text-4xl font-bold py-4">Login</h2>
      <input
        className="border border-black mb-2 bg-white w-80  rounded-md"
        type="email"
        name="email"
        id="email"
        ref={email}
        placeholder="email"
      />
      <input
        className="border border-black mb-2 bg-white w-80  rounded-md"
        type="password"
        id="password"
        name="password"
        ref={password}
        placeholder="password"
      />
      <input
        className="border border-black mb-2 bg-white w-80  rounded-md"
        type="button"
        value="Login!"
        onClick={login}
      />
    </>
  );
}
