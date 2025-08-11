"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Signup() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());

    try {
      if (!formJson.username || !formJson.password) {
        throw new Error("Please fill in all fields");
      }

      if (formJson.username.length < 5) {
        throw new Error("Username length must be greater than 4 characters");
      }

      const regex = /^[a-zA-Z0-9]+$/;
      if (!regex.test(formJson.username)) {
        throw new Error("Username must be alphanumeric");
      }

      if (formJson.password.length < 5) {
        throw new Error("Password length must be greater than 4 characters");
      }

      // console.log(formJson);

      const response = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formJson),
      });
      const result = await response.json();
      console.log(result);

      // if (!result?.ok) {
      //   throw new Error("Error signing up");
      // }

      router.push("/signin");
    } catch (error) {
      console.error(`${error}`);
      setError(`${error}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {error && (
        <div className="w-full max-w-sm px-3 py-2 text-white rounded bg-red-500/90">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="auth-form">
        <div className="input-group">
          <label name="name" className="label">
            Name:
          </label>
          <input
            name="name"
            type="text"
            className="input"
            placeholder="Input your name..."
          />
        </div>
        <div className="input-group">
          <label name="username" className="label">
            Username:
          </label>
          <input
            name="username"
            type="text"
            className="input"
            placeholder="Input your username..."
          />
        </div>
        <div className="input-group">
          <label name="password" className="label">
            Password:
          </label>
          <input
            name="password"
            type="password"
            className="input"
            placeholder="Input your password..."
          />
        </div>
        <input
          className="w-full blue-button cursor-pointer"
          type="submit"
          value="Sign up"
          disabled={loading}
        />
      </form>
    </>
  );
}
