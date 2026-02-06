import { Link } from "react-router-dom";
import Layout from "../components/Layout";

export default function NotFound() {
  return (
    <Layout title="404">
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/20">
          <h2 className="text-4xl font-extrabold mb-4">Page Not Found</h2>
          <p className="text-white/90 mb-8">
            The page you requested does not exist or the route is invalid.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              to="/"
              className="px-6 py-3 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-bold transition-colors"
            >
              Go Home
            </Link>
            <Link
              to="/statistics"
              className="px-6 py-3 rounded-lg bg-white/15 hover:bg-white/25 text-white font-bold transition-colors"
            >
              Open Statistics
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
