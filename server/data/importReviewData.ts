import { IReview } from '@destiny/common/types';
import fs from 'fs';
import mongoose from 'mongoose';
import '../src/loadEnv';
import Review from '../src/models/reviewModel';

const DB = process.env.DB as string;

mongoose.connect(DB).then(() => {
  console.log('DB connection successful');
});

const BUSINESS_ID = new mongoose.Types.ObjectId('62c572d237dc8f4574ee74b8');

// READ JSON FILE
const reviews: IReview[] = JSON.parse(
  fs.readFileSync(`${__dirname}/reviewData.json`, 'utf-8')
);

// CREATE BUSINESS FIELD IN EVERY REVIEWS
reviews.forEach((review) => {
  review.business = BUSINESS_ID;
});

// IMPORT DATA INTO DB
const importData = async () => {
  try {
    await Review.create(reviews);
    console.log('src/data successfully loaded');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// DELETE ALL DATA FROM DB
const deleteData = async () => {
  try {
    await Review.deleteMany({ business: BUSINESS_ID });
    console.log('src/data successfully deleted!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
