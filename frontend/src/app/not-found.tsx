"use client";

import { useRouter } from "next/navigation";

import Link from "next/link";

export default function NotFound() {
  const router = useRouter();
  return (
    <div className="dark min-h-screen bg-background grid ">
      <div className=" dark:text-gray-100 text-gray-800 place-self-center h-fit w-fit">
        <h2 className="text-3xl">404 Not Found</h2>

        <p>Could not find requested resource</p>
        <div className="">
          <Link href="/" className="text-primary text-2xl mt-5">
            Return Home <span className="">{"==>"}</span>
          </Link>
        </div>
        <div className="">
          <Link
            onClick={(ev) => {
              ev.preventDefault();
              router.back();
            }}
            href={""}
            className="text-primary text-2xl mt-9"
          >
            Return Back <span className="">{"==>"}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
