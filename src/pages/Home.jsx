import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

function Home() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const { data, error } = await supabase
          .from("articles")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) {
          setError(error.message);
          return;
        }

        setArticles(data ?? []);
      } catch {
        setError("Unable to connect to the database.");
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  return (
    <main className="mx-auto max-w-6xl p-6">
      <h1 className="text-3xl font-bold">Articles</h1>

      <p className="mt-2 text-gray-600">Browse the latest articles.</p>

      {loading && (
        <p className="mt-6" role="status">
          Loading articles...
        </p>
      )}

      {!loading && error && (
        <p className="mt-6 text-red-600" role="alert">
          {error}
        </p>
      )}

      {!loading && !error && articles.length === 0 && (
        <p className="mt-6">No articles have been published yet.</p>
      )}

      {!loading && !error && articles.length > 0 && (
        <div className="mt-8 space-y-6">
          {articles.map((article) => (
            <article key={article.id} className="rounded-lg border p-5">
              <p className="text-sm text-gray-600">{article.category}</p>

              <h2 className="mt-2 text-xl font-bold">{article.title}</h2>

              <p className="mt-3 whitespace-pre-wrap">{article.body}</p>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}

export default Home;
