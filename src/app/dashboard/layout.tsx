"use client";

import { cn } from "@/lib/utils";
import * as React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { useLocalStorage } from "react-use";

import { RxCross1 } from "react-icons/rx";
import { AiFillHome, AiOutlineMenu } from "react-icons/ai";
import { useLocation, useToggle } from "react-use";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/src/components/tooltip";
import Pivots from "@/src/customComponents/Pivots";

interface IPropslayout {
  children: React.ReactNode;
}
const tabs = [
  { name: "Task status", href: "/dashboard/taskStatus" },
  { name: "My task", href: "/dashboard/myTask" },
  { name: "Weekly Timesheet", href: "/dashboard/weeklyTimesheet" },
  { name: "Track Time", href: "/dashboard/trackTime" },
  { name: "Approval", href: "/dashboard/approved" },
  // { name: "", href: "/dashboard/taskStatus", current: false },
  {
    name: "Pending weekly timesheet",
    href: "/dashboard/pendingWeeklyTimesheet",
  },
];
const Dashboard: React.FunctionComponent<IPropslayout> = ({ children }) => {
  const queryClient = new QueryClient();
  const getCurrentTheme = () =>
    window?.matchMedia("(prefers-color-scheme: dark)")?.matches;
  const [isDarkTheme, setIsDarkTheme] = useLocalStorage(
    "themeDashboard",
    getCurrentTheme()
  );
  const [isFullNavbar, toggle] = useToggle(false);
  const router = useLocation();
  const navigation = React.useMemo(
    () => [
      {
        name: "Home",
        href: "dashboard/myTask",
        icon: AiFillHome,
      },
    ],
    []
  );
  return (
    <div className={cn(isDarkTheme ? "dark" : "light")}>
      <div className="min-h-screen  bg-slate-900 text-gray-100 transition-all ">
        <>
          <div>
            {/* Static sidebar for desktop */}
            <div
              className={cn(
                "hidden md:flex  md:flex-col md:fixed md:inset-y-0",
                isFullNavbar ? "md:w-64" : "md:w-9"
              )}
            >
              {/* Sidebar component, swap this element with another sidebar if you like */}
              <div className="flex-1 flex flex-col min-h-0 bg-gray-800">
                <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto relative">
                  <div className="flex items-center flex-shrink-0 px-4">
                    {/* <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg"
                    alt="Workflow"
                  /> */}
                  </div>
                  <div
                    className={cn("absolute top-2 right-2", "right-3")}
                    onClick={() => toggle()}
                  >
                    {isFullNavbar ? <RxCross1 /> : <AiOutlineMenu />}
                  </div>
                  <nav className="mt-5 flex-1 px-1 space-y-1">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => isFullNavbar && toggle()}
                        className={cn(
                          router.pathname?.includes(item.href)
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                        )}
                      >
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger className="flex items-center">
                              <>
                                <item.icon
                                  className={cn(
                                    router.pathname?.includes(item.href)
                                      ? "text-gray-300"
                                      : "text-gray-400 group-hover:text-gray-300",
                                    "mr-3 flex-shrink-0 h-3 w-3"
                                  )}
                                  aria-hidden="true"
                                />
                                {isFullNavbar ? item.name : null}
                              </>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{item.name}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </Link>
                    ))}
                  </nav>
                </div>
                {isFullNavbar ? (
                  <div className="flex-shrink-0 flex bg-gray-700 p-4">
                    <a href="#" className="flex-shrink-0 w-full group block">
                      <div className="flex items-center">
                        <div>
                          <img
                            className="inline-block h-9 w-9 rounded-full"
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt=""
                          />
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-white">
                            Tom Cook
                          </p>
                          <p className="text-xs font-medium text-gray-300 group-hover:text-gray-200">
                            View profile
                          </p>
                        </div>
                      </div>
                    </a>
                  </div>
                ) : (
                  <div className="w-full flex items-center justify-center">
                    <img
                      className="inline-block h-6 w-6 rounded-full "
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
                  </div>
                )}
              </div>
            </div>
            <div
              className={cn(
                " flex flex-col flex-1",
                isFullNavbar ? "md:pl-[17rem]" : "md:pl-10"
              )}
            >
              {/* <div className="sticky top-0 z-10 md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3 bg-gray-100">
                <button
                  type="button"
                  className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                  // onClick={() => setSidebarOpen(true)}
                >
                  <span className="sr-only">Open sidebar</span>
                  {/* <MenuIcon className="h-6 w-6" aria-hidden="true" /> 
                </button>
              </div> */}
              <main className="flex-1">
                <Pivots links={tabs} className="px-4"></Pivots>
                <div className="py-6">
                  {/* <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> */}
                  {/* </div> */}
                  <div className="max-w-screen-2xl mx-auto px-2  sm:px-3 ">
                    {/* Replace with your content */}
                    <div className=" w-full h-full ">
                      <QueryClientProvider client={queryClient}>
                        {children}
                      </QueryClientProvider>
                    </div>
                    {/* /End replace */}
                  </div>
                </div>
              </main>
            </div>
          </div>
        </>
      </div>
    </div>
  );
};

export default Dashboard;
