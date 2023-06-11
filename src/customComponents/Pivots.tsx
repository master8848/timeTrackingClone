"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { useLocation, useWindowSize } from "react-use";
import Link from "next/link";

interface IPropsPivots {
  links: {
    name: string;
    href: string;
  }[];
  className: string;
}

const Pivots: React.FunctionComponent<IPropsPivots> = ({
  links,
  className,
}) => {
  const router = useLocation();
  const linksRef = React.useRef<HTMLDivElement>(null);
  const WindowSize = useWindowSize();
  const [isDropDown, setIsDropDown] = React.useState<boolean>(false);
  React.useEffect(() => {
    setIsDropDown(
      // @ts-ignore
      linksRef.current?.clientWidth < linksRef.current?.scrollWidth
    );
  }, [WindowSize.width]);
  return (
    <div className={cn(className)}>
      <div className={cn(isDropDown ? "" : "hidden")}>
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
        <select
          id="tabs"
          name="tabs"
          className="block w-full pl-3 pr-10 py-1 mt-4 text-base text-gray-100 bg-gray-900 border-gray-200 focus:outline-none focus:ring-gray-100 focus:border-gray-100 sm:text-sm rounded-md"
          defaultValue={
            links.find((tab) => router.pathname?.includes(tab.href))?.name
          }
        >
          {links.map((tab) => (
            <option key={tab.name}>{tab.name}</option>
          ))}
        </select>
      </div>
      <div className={cn(isDropDown ? "hidden" : "")}>
        <div className="border-b border-gray-200">
          <nav
            className="-mb-px flex space-x-8 "
            ref={linksRef}
            aria-label="Tabs"
          >
            {links.map((tab) => (
              <Link
                key={tab.name}
                href={tab.href}
                className={cn(
                  router.pathname?.includes(tab.href)
                    ? "border-gray-100  border-b-4  text-lg  text-gray-100"
                    : "border-transparent   hover:border-b-4  text-gray-200 hover:text-gray-200 hover:border-gray-200",
                  "whitespace-nowrap py-2 px-1   text-sm"
                )}
                aria-current={
                  router.pathname?.includes(tab.href) ? "page" : undefined
                }
              >
                {router.pathname?.includes(tab.name)}
                {tab.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Pivots;
