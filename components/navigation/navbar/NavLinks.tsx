"use client";

import React from 'react';
import { usePathname } from 'next/navigation';
import { sidebarLinks } from '@/constants';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';


const NavLinks = ({ isMobileNav = false }: { isMobileNav?: boolean }) => {
   const pathname = usePathname();
  
    return <>{sidebarLinks.map((item) => {
        const isActive = (pathname.includes(item.route) 
             && item.route.length > 1) || pathname === item.route;
            
        const LinkComponent = (
          <Link 
            href={item.route} 
            key={item.label}
            className={cn
             (isActive 
              ? "primary-gradient rounded-lg text-light-900"
              : "text-dark300_light900",
              "flex items-center justify-start gap-4 p-4 bg-transparent"
            )}
          >
           <Image 
            src={item.imgURL}
            alt={item.label}
            width={20}
            height={20}
            className={cn({ "inver-colors": !isActive })}
           />
           <p className={cn( 
            isActive ? "base-bold": "base-medium", 
            !isMobileNav && "max-lg:hidden"
           )}>{item.label}</p>
          </Link>
        );

        return LinkComponent;
    })}
   </>;
  };

export default NavLinks;