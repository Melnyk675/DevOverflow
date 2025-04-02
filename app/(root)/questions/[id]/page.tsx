import React from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { after } from 'next/server';

import TagCard from '@/components/cards/TagCard';
import Metric from '@/components/Metric';
import UserAvatar from '@/components/UserAvatar';
import ROUTES from '@/constants/routes';
import { formatNumber, getTimeStamp } from '@/lib/utils';
import { Preview } from '@/components/editor/Preview';
import { getQuestion, incrementViews } from '@/lib/actions/question.action';
import AnswerForm from '@/components/forms/AnswerForm';
import { getAnswers } from '@/lib/actions/answer.action';
import AllAnswers from '@/components/answers/AllAnswers';
import Votes from '@/components/votes/Votes';

const QuestionDetails = async ({ params }: RouteParams) => {
  const { id } = await params;
  const { success, data: question } = await getQuestion({ questionId: id });
  
  after(async () => {
    await incrementViews({ questionId: id });

  })

  if (!success || !question) return redirect("/404");

  const { 
    success: answersLoaded, 
    data: answersResult, 
    error: answersError 
  } = await getAnswers({
    questionId: id,
    page: 1,
    pageSize: 10,
    filter: "latest"
  });

  console.log("Answers", answersResult)

  const { author, createdAt, answers, views, tags, content, title } = question;

  return (
    <>

      <div className='w-full flex-start flex-col'>
        <div className='w-full flex flex-col-reverse justify-between'>
          <div className='flex items-center justify-start gap-1'>
            <UserAvatar 
              id={author._id}
              name={author.name}
              className='size-[28px]'
              fallbackClassName='text-[18px]'
            />
            <Link href={ROUTES.PROFILE(author._id)}>
              <p className='paragraph-semibold text-dark300_light700'>
                {author.name}
              </p>
            </Link>
          </div>

          <div className='flex justify-end'>
            <Votes 
              upvotes={question.upvotes}
              downvotes={question.downvotes}
              hasupVoted={true}
              hasdownVoted={false}
            />
          </div>
        </div>

        <h2 className='h2-semibold text-dark200_light900 mt-3.5 w-full'>
          {title}
        </h2>
      </div>

      <div className='mt-5 mb-8 flex flex-wrap gap-4'>
        <Metric 
          imgUrl="/icons/clock.svg"
          alt="clock icon"
          value={` asked ${getTimeStamp(new Date(createdAt))}`}
          title=""
          textStyles="small-regular text-dark400_light700"
        />
         <Metric
          imgUrl="/icons/message.svg"
          alt="message icon"
          value={answers}
          title=""
          textStyles="small-regular text-dark400_light700"
        />
        <Metric 
            imgUrl='/icons/eye.svg'
            alt="views"
            value={formatNumber(views)}
            title=" Views"
            textStyles="small-medium text-dark400_light800"
        />
      </div>

      <Preview content={content} />

      <div className='mt-8 flex flex-wrap gap-2'>
        {tags.map((tag: Tag) => (
          <TagCard 
            key={tag._id}
            _id={tag._id as string}
            name={tag.name}
            compact
          />
        ))}
      </div>

      <section className='my-5'>
         <AllAnswers 
          data={answersResult?.answers}
          success={answersLoaded}
          error={answersError}
          totalAnswers={answersResult?.totalAnswers || 0} 
          page={0} 
          isNext={false}         
        />
      </section>

      <section className='my-5'>
         <AnswerForm 
          questionId={question._id}
          questionTitle={question.title}
          questionContent={question.content}
         />
      </section>
    </>
  )
}

export default QuestionDetails;