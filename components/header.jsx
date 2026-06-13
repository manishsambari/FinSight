import React from "react";
import { Button } from "./ui/button";
import { PenBox, LayoutDashboard, LogOut } from "lucide-react";
import Link from "next/link";
import { auth, signOut } from "@/auth";
import Image from "next/image";
import { ThemeToggle } from "./theme-toggle";

const Header = async () => {
  const session = await auth();

  return (
    <header className="fixed top-0 w-full bg-background/80 backdrop-blur-md z-50 border-b">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/">
          <Image
            src={"/logo.png"}
            alt="Welth Logo"
            width={200}
            height={60}
            className="h-12 w-auto object-contain"
          />
        </Link>

        {/* Navigation Links - Different for signed in/out users */}
        <div className="hidden md:flex items-center space-x-8">
          {!session && (
            <>
              <a href="#features" className="text-muted-foreground hover:text-primary">
                Features
              </a>
              <a href="#testimonials" className="text-muted-foreground hover:text-primary">
                Testimonials
              </a>
            </>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          
          {session ? (
            <>
              <Link
                href="/dashboard"
                className="text-muted-foreground hover:text-primary flex items-center gap-2"
              >
                <Button variant="outline">
                  <LayoutDashboard size={18} />
                  <span className="hidden md:inline">Dashboard</span>
                </Button>
              </Link>
              <a href="/transaction/create">
                <Button className="flex items-center gap-2">
                  <PenBox size={18} />
                  <span className="hidden md:inline">Add Transaction</span>
                </Button>
              </a>
              <form action={async () => {
                "use server";
                await signOut({ redirectTo: "/sign-in" });
              }}>
                <Button variant="ghost" size="icon" type="submit" title="Log Out">
                  <LogOut className="h-5 w-5 text-muted-foreground" />
                </Button>
              </form>
            </>
          ) : (
            <Link href="/sign-in">
              <Button variant="outline">Login</Button>
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
