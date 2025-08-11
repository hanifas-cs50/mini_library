"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function Signin() {
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

      // console.log(formJson);

      const result = await signIn("credentials", {
        username: formJson.username,
        password: formJson.password,
        redirect: false,
      });

      if (!result?.ok) {
        throw new Error("Invalid username or password");
      }
      
      router.push("/user");
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
          value="Sign in"
          disabled={loading}
        />
      </form>
    </>
  );
}
