import React from 'react';
import DataRenderer from '../DataRenderer';
import { EMPTY_ANSWERS } from '@/constants/states';
import AnswerCard from '../cards/AnswerCard';
import { AnswerFilters } from '@/constants/filters';
import CommonFilter from '../filters/CommonFilter';

interface Props extends ActionResponse<Answer[]> {
    page: number;
    isNext: boolean;
    totalAnswers: number;
  }

const AllAnswers = ({ 
  data, 
  success, 
  error, 
  totalAnswers 
}: Props) => {
  return (
    <div className="mt-11">
      <div className='flex justify-between items-center'>
        <h3 className='primary-text-gradient'>
          {totalAnswers} {totalAnswers > 1 ? "Answers" : "Answer"}
        </h3>
        <CommonFilter
          filters={AnswerFilters}
          otherClasses="sm:min-w-32"
          containerClasses="max-xs:w-full"
        />
      </div>

     <DataRenderer 
       data={data}
       error={error}
       success={success}
       empty={EMPTY_ANSWERS}
       render={(answers) => 
          answers.map((answer) => 
            <AnswerCard key={answer._id} {...answer} />
      )}
     />
    </div>
  )
}

export default AllAnswers;