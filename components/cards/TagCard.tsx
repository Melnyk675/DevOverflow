import ROUTES from '@/constants/routes';
import Link from 'next/link';
import React from 'react';

interface Props {
    _id: number;
    name: string;
    questions: number;
    showCount?: boolean;
    compact?: boolean;
}

const TagCard = ({ _id, name, questions, showCount, compact }: Props) => {
  return (
    <Link
      href={ROUTES.TAGS(_id)}
      className='flex justify-between gap-2'
      >
        {name}
     </Link>
  )
}

export default TagCard;