import { Link } from "react-router-dom";

export function NotFoundPage(): React.JSX.Element {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-5xl font-bold">404</h1>

      <p className="text-muted-foreground">Page not found</p>

      <Link to="/">Go Home</Link>
    </div>
  );
}
