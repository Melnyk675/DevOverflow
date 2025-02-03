import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ROUTES from '@/constants/routes';

const hotQuestions = [
    { _id: 1, title: "What is the best way to learn React?" },
    { _id: 2, title: "How to create a custom hook in React?" },
    { _id: 3, title: "How to use React Query?" },
    { _id: 4, title: "How to use Redux?" },
    { _id: 5, title: "How to use React Router?" },
];

const RightSidebar = () => {
  return (
    <section className='custom-scrollbar pt-36 background-light900_dark200
     light-border sticky right-0 top-0 flex h-screen w-[350px]
     flex-col gap-6 overflow-y-auto border-l p-6 shadow-light-300
     dark:shadow-none max-xl:hidden'>
     <div>
        <h3 className='h3-bold text-dark200_light900'>Top Questions</h3>

        <div className='mt-7 w-full flex flex-col gap-[30px]'>
         {hotQuestions.map(({ _id, title }) => (
            <Link 
              href={ROUTES.PROFILE(_id)}
              key={_id}
              className='flex items-center justify-between gap-7
              cursor-pointer'
            >
              <p className='body-medium text-dark500_light700'>{title}
              </p>

              <Image 
               src="/icons/chevron-right.svg"
               alt="Chevron"
               width={20}
               height={20}
               className='invert-colors'
               />
            </Link>
         ))}
        </div>
     </div>
    </section>
  )
}

export default RightSidebar;