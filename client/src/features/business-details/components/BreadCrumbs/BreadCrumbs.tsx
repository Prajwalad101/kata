import React from 'react';

export default function BreadCrumbs() {
  const breadCrumbsArr = ['food and drinks', 'resturants', 'kathmandu'];

  return (
    <div className="mt-5 mb-7 flex flex-wrap gap-4 md:mt-0">
      {breadCrumbsArr.map((name, i, arr) => (
        <React.Fragment key={i}>
          <span className="font-merriweathe4 shrink-0 cursor-pointer capitalize text-gray-700 underline underline-offset-2 hover:text-gray-500">
            {name}
          </span>
          {arr.length !== i + 1 && <span>{'>'}</span>}
        </React.Fragment>
      ))}
    </div>
  );
}
