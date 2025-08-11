"use client";

import { useState } from "react";

export default function BookForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());

    console.log({
      title: formJson.book_title,
      author: formJson.author,
      qty: formJson.quantity,
    });
  }

  return (
    <>
      {error && (
        <div className="w-full max-w-sm px-3 py-2 text-white rounded bg-red-500/90">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm mx-auto p-6 space-y-4"
      >
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
          className="w-full blue-button cursor-pointer"
          type="submit"
          value="Add Book"
          disabled={loading}
        />
      </form>
    </>
  );
}
