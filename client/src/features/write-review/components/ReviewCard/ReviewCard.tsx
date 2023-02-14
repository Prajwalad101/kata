import Image from 'next/image';
import RatingIcons from 'src/components/icons/ratings/RatingIcons';

export default function ReviewCard() {
  return (
    <div className="h-[450px] overflow-hidden text-ellipsis rounded-md bg-gray-100 shadow-md transition-all hover:scale-[101%] hover:shadow-lg">
      <div className="relative h-[250px]">
        <Image
          src="https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
          alt="review-image"
          layout="fill"
          objectFit="cover"
          className="rounded-t-md"
        />
      </div>
      <div className="p-3">
        <div className="mb-3 flex justify-between">
          <h3 className="cursor-pointer text-lg font-medium leading-tight decoration-red-400 decoration-2 hover:underline">
            The Burger House
          </h3>
          <div>
            <RatingIcons rating={4.5} />
          </div>
        </div>
        <div className="mb-3 flex items-center justify-between">
          <div className="group flex cursor-pointer items-center gap-2">
            <div className="h-[25px] shrink-0">
              <Image
                src="https://images.unsplash.com/photo-1474978528675-4a50a4508dc3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fHByb2ZpbGV8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60"
                alt="user profile image"
                width={25}
                height={25}
                objectFit="cover"
                className="rounded-full"
              />
            </div>
            <span className="inline-block text-gray-700 hover:underline group-hover:underline">
              Milan shrestha
            </span>
            {/* <span className="pl-1 inline-block text-gray-700">wrote</span> */}
          </div>
          <span className="inline-block text-sm text-gray-500">5 min ago</span>
        </div>
        <p className="line-clamp-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci
          tempora possimus, explicabo distinctio provident velit quibusdam,
          suscipit vel blanditiis sed dolores veniam voluptatibus cum qui quis
          eum molestias perferendis ducimus maiores consectetur mollitia!
          Nostrum necessitatibus nemo iure minima saepe earum consequatur magni!
          Reiciendis nobis sequi debitis blanditiis, rerum dolores praesentium?
        </p>
      </div>
    </div>
  );
}
