"use client";

import Link from "next/link";
import { useState } from "react";

export default function AddForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());

    try {
      if (!formJson.book_title || !formJson.author || !formJson.quantity) {
        throw new Error("Please fill in all fields");
      }

      const response = await fetch("/api/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: formJson.book_title,
          author: formJson.author,
          qty: formJson.quantity,
        }),
      });
      const result = await response.json();
      console.log(result);

      form.reset();
      setSuccess(true);
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

      {success && (
        <div className="w-full px-3 py-2 flex justify-between text-white rounded bg-green-600/80">
          Successfully added book!
          <span className="cursor-pointer" onClick={() => setSuccess(false)}>
            &#10799;
          </span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="w-full mx-auto space-y-4">
        <div className="input-group">
          <label name="book_title" className="label">
            Book Title:
          </label>
          <input
            name="book_title"
            type="text"
            className="input"
            placeholder="Input book title..."
          />
        </div>
        <div className="input-group">
          <label name="author" className="label">
            Book Author:
          </label>
          <input
            name="author"
            type="text"
            className="input"
            placeholder="Input book author..."
          />
        </div>
        <div className="input-group">
          <label name="quantity" className="label">
            Book Quantity:
          </label>
          <input
            name="quantity"
            type="number"
            className="input"
            placeholder="Input book quantity..."
          />
        </div>
        <input
          className="w-full blue-button cursor-pointer disabled:opacity-50"
          type="submit"
          value="Add Book"
          disabled={loading}
        />
        <Link
          className={`w-full px-3 py-2 flex justify-center font-medium text-white rounded bg-gray-500 ${loading ? "opacity-50" : ""}`}
          href={loading ? "#" : "/admin/books"}
        >
          Back
        </Link>
      </form>
    </>
  );
}
