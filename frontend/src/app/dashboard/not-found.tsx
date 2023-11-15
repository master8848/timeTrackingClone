import Link from "next/link";

export default function NotFound() {
  return (
    <div className="dark">
      <div className="bg-background">
        <h2>Not Found</h2>
        gfddfghj
        <p>Could not find requested resource</p>
        <Link href="/">Return Home</Link>
      </div>
    </div>
  );
}
