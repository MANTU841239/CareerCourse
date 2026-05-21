import { Link } from 'react-router';
import { Home, Search } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md text-center">
        <div className="mb-8">
          <div className="text-8xl font-bold bg-gradient-to-br from-primary to-secondary bg-clip-text text-transparent mb-4">
            404
          </div>
          <h1 className="text-2xl md:text-3xl mb-3">Page Not Found</h1>
          <p className="text-muted-foreground">
            Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
          >
            <Home className="w-4 h-4" />
            Go Home
          </Link>
          <Link
            to="/courses"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-border rounded-lg hover:bg-accent transition-colors font-medium"
          >
            <Search className="w-4 h-4" />
            Browse Courses
          </Link>
        </div>
      </div>
    </div>
  );
}
