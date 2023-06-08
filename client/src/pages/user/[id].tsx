import useUserProfile from '@features/user-profile/api/useUserProfile';
import useUserReviews from '@features/user-profile/api/useUserReviews';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { AiFillHeart } from 'react-icons/ai';
import { Divider } from 'src/components';
import { NavigationProvider } from 'src/components/context-provider';
import RatingIcons from 'src/components/icons/ratings/RatingIcons';
import { AppLayout } from 'src/components/layout';
import { Navbar, Sidebar } from 'src/components/navigation';
import Slider from 'src/components/slider/Slider';
import { getRelativeDate } from 'src/utils/date';
import { classNames } from 'src/utils/tailwind';
import { NextPageWithLayout } from '../_app';

const UserProfile: NextPageWithLayout = () => {
  const { data: user, isLoading } = useUserProfile();

  if (isLoading || !user) {
    return <div>Loading...</div>;
  }

  const userProfileData = [
    { label: 'Name', value: user?.userName },
    { label: 'Email', value: user?.email },
    { label: 'Trust Points', value: user?.trustPoints },
    { label: 'Reviews added', value: user?.numReviews },
    { label: 'Questions asked', value: user?.numQuestions },
  ];

  return (
    <div className="mt-10">
      <h1 className="mb-14 text-2xl font-medium">User Profile</h1>
      <div className="mb-10 flex items-start gap-10">
        <div className="hidden shrink-0 sm:block">
          <Image
            src={user?.picture}
            alt="user profile image"
            width={80}
            height={80}
            style={{ borderRadius: '50%' }}
          />
        </div>
        <div>
          {userProfileData.map((item, index) => (
            <div key={index} className="mb-3 flex gap-5">
              <p className="w-36 font-medium">{item.label}</p>
              <p className="text-gray-700">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
      <Divider className="mb-5" />
      <UserReviews />
    </div>
  );
};

function UserReviews() {
  const { data: reviews, isLoading } = useUserReviews();

  const router = useRouter();

  const arr = [1, 2, 3, 4, 5];
  if (isLoading) {
    return (
      <div>
        <h3 className="mb-5 text-xl font-medium text-gray-700">Your Reviews</h3>
        <div className="flex gap-5 overflow-scroll pb-5">
          {arr.map((value) => (
            <div
              key={value}
              className="h-[300px] min-w-[350px] animate-pulse bg-gray-200"
            ></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <h3 className="mb-5 text-xl font-medium text-gray-700">Your Reviews</h3>
      <div className="flex items-start gap-5 overflow-scroll pb-5">
        {reviews?.data.map((review, index) => (
          <div
            className="min-w-[350px] cursor-pointer rounded-md border border-gray-200
            bg-gray-100 transition-shadow hover:shadow-md"
            key={index}
          >
            {review.images && review.images.length !== 0 && (
              <Slider
                numItems={review.images.length}
                className="h-[250px] w-full"
              >
                {review.images.map((image, index) => (
                  <div key={index} className="relative h-full w-full">
                    <Image
                      src={image}
                      alt="image"
                      layout="fill"
                      objectFit="cover"
                      className="rounded-l-md rounded-r-md"
                    />
                  </div>
                ))}
              </Slider>
            )}
            <div
              onClick={() => router.push(`/search/business/${review.business}`)}
              className={classNames(review.images ? 'px-3 pb-4 pt-5' : 'p-3')}
            >
              <div className="mb-3 flex justify-between">
                <h3 className="cursor-pointer text-lg font-medium leading-tight decoration-red-400 decoration-2 hover:underline">
                  {/* {review.business?.name || '------------'} */}
                </h3>
              </div>
              <div className="mb-5 flex items-center justify-between">
                <div className="flex cursor-pointer items-center gap-2">
                  <div className="h-[25px] shrink-0">
                    <Image
                      src={review.author.picture}
                      alt="user profile image"
                      width={25}
                      height={25}
                      objectFit="cover"
                      className="rounded-full"
                    />
                  </div>
                  <span className="inline-block text-gray-700">
                    {review.author.userName}
                  </span>
                </div>
                <span className="inline-block text-sm text-gray-500">
                  {getRelativeDate(review.createdAt)}
                </span>
              </div>
              <RatingIcons className="mb-5" avgRating={review.rating} />
              <p
                className={classNames(
                  'mb-1 leading-relaxed'
                  // noImage ? 'line-clamp-15' : 'line-clamp-5'
                )}
              >
                {review.review}
              </p>
              <div className="flex items-center gap-1">
                <AiFillHeart size={21} className="text-primaryred" />
                <p className="text-gray-500">{review.likes.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

UserProfile.getLayout = (page) => (
  <AppLayout size="sm">
    <NavigationProvider>
      <Navbar theme="light" />
      <Sidebar />
    </NavigationProvider>
    {page}
  </AppLayout>
);

export default UserProfile;
