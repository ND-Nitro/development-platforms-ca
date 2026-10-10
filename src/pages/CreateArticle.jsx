import { useState } from "react";
import { supabase } from "../lib/supabase";

function CreateArticle() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setMessage("");
    setLoading(true);

    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        setMessage("You must be logged in to create an article.");
        return;
      }

      const { error } = await supabase.from("articles").insert({
        title: title.trim(),
        body: body.trim(),
        category: category.trim(),
        submitted_by: user.id,
      });

      if (error) {
        setMessage(`Failed to create article: ${error.message}`);
        return;
      }

      setMessage("Article created successfully!");
      setTitle("");
      setBody("");
      setCategory("");
    } catch {
      setMessage("A network error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto max-w-2xl p-6">
      <h1 className="mb-6 text-3xl font-bold">Create Article</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="mb-1 block font-medium">
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
            maxLength={150}
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div>
          <label htmlFor="category" className="mb-1 block font-medium">
            Category
          </label>
          <input
            id="category"
            type="text"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            required
            maxLength={50}
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div>
          <label htmlFor="body" className="mb-1 block font-medium">
            Article
          </label>
          <textarea
            id="body"
            value={body}
            onChange={(event) => setBody(event.target.value)}
            required
            rows={8}
            className="w-full rounded-lg border p-3"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="cursor-pointer rounded-lg bg-black px-6 py-3 text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Publishing..." : "Publish Article"}
        </button>

        {message && (
          <p role="status" className="text-sm">
            {message}
          </p>
        )}
      </form>
    </main>
  );
}

export default CreateArticle;
