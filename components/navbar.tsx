"use client";

import { Briefcase } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { getSession } from "@/lib/auth/auth";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { sign } from "crypto";
import { signOut, useSession } from "@/lib/auth/auth-client";
import SignOutButton from "./sign-out-btn";

export default function Navbar() {
  const{data:session} = useSession();

    return (
    <nav className="border-b border-gray-200 bg-white">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
            <Link href="/" className="flex items-center gap-2 text-lg font-semibold text-primary">
            <Briefcase />
            Job Tracker
            </Link>
            <div>
                {session?.user ?(
                    <>
                    <Link href ="/dashboard">
                    <Button
                    variant="ghost"
                    className="text-gray-700 hover:text-black">
                        Dashboard
                    </Button></Link>
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                                <Avatar className="h-8 w-8">
                                    <AvatarFallback className="bg-primary text-white ">
                                          {session.user.name[0].toUpperCase()   }   
                                    </AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent className="w-56" align="end">
                            <DropdownMenuLabel className="font-normal">
                                <div className="flex flex-col space-y-1">
                                    <p className="text-sm font-medium leading-none">
                                        {session.user.name}
                                    </p>
                                    <p className="text-xs leading-none text-muted-foreground">{session.user.email}</p>
                                </div>
                               <SignOutButton />
                            </DropdownMenuLabel>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    </>
                ):(
                    <>
                <Link href="/sign-in" >
                    <Button  variant="ghost" className="text-sm font-medium text-muted-foreground hover:text-black/80">
                        Log in
                    </Button>
                </Link>
                <Link href="/sign-up" >
                    <Button className="ml-4 text-sm font-medium bg-primary hover:bg-primary/90">
                        Sign up
                    </Button>
                </Link>
                <Link href="/dashboard" >
                    <Button className="ml-4 text-sm font-medium bg-primary hover:bg-primary/90">
                        Dashboard
                    </Button>
                </Link>
                </>
                )}
            </div>
        </div>
    </nav>
    );
}