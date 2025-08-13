"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function EditForm({ data }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // console.log(data);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    console.log(formJson);

    try {
      if (!formJson.full_name || !formJson.username || !formJson.role) {
        throw new Error("Please fill in all fields");
      }

      const response = await fetch(`/api/users/${data.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formJson.full_name,
          username: formJson.username,
          role: formJson.role,
        }),
      });
      const result = await response.json();
      console.log(result);

      router.push("/admin/users");
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
        <div className="w-full px-3 py-2 flex justify-between text-white rounded bg-red-500/90">
          {error}
          <span className="cursor-pointer" onClick={() => setError("")}>
            &#10799;
          </span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="w-full mx-auto space-y-4">
        <div className="input-group">
          <label name="full_name" className="label">
            Full Name:
          </label>
          <input
            name="full_name"
            type="text"
            className="input"
            placeholder="Input full name..."
            defaultValue={data.name}
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
            placeholder="Input username..."
            defaultValue={data.username}
          />
        </div>
        <div className="input-group">
          <label name="role" className="label">
            Role:
          </label>
          <select
            name="role"
            className="pr-2 py-2 border-2 border-gray-300 rounded text-sm bg-white outline-none"
            defaultValue={data.role}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <input
          className="w-full blue-button cursor-pointer disabled:opacity-50"
          type="submit"
          value="Edit User"
          disabled={loading}
        />
        <Link
          className={`w-full px-3 py-2 flex justify-center font-medium text-white rounded bg-gray-500 ${
            loading ? "opacity-50" : ""
          }`}
          href={loading ? "#" : "/admin/users"}
        >
          Back
        </Link>
      </form>
    </>
  );
}
