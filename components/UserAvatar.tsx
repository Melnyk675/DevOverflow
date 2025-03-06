import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import ROUTES from '@/constants/routes';
import { Avatar } from './ui/avatar';
import { AvatarFallback } from '@radix-ui/react-avatar';

interface Props {
  id: string;
  name: string;
  imageUrl?: string | null;
  className?: string
}

const UserAvatar = ({ id, name, imageUrl, className = "h-9 w-9" }: Props) => {
  const initials = name
    .split(" ")
    .map((word: string)=> word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <Link href={ROUTES.PROFILE(id)}>
      <Avatar className={className}>
        {imageUrl ? (
          <Image 
            src={imageUrl} 
            alt={name} 
            className='object-cover'
            width={36}
            height={36}
            quality={100}
          /> 
        ) : (
          <AvatarFallback className='primary-gradient font-space-grotesk font-bold
           text-white tracking-wider'>
            {initials}
          </AvatarFallback>
        )}
        
      </Avatar>
    </Link>
    )
  }

export default UserAvatar;