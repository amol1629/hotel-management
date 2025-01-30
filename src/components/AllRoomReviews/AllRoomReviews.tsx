"use client"

import axios from 'axios';
import { FC, useEffect, useState } from 'react';
import { Review } from '@/models/review';
import Rating from '../Rating/Rating';

const AllRoomReviews: FC = () => {
  const [reviews, setReviews] = useState<Review[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch reviews from the API
    const fetchReviews = async () => {
      try {
        const response = await axios.get<Review[]>('/api/reviews');
        setReviews(response.data);  // Set reviews data
      } catch (err) {
        setError('Failed to fetch reviews');
      } finally {
        setLoading(false);  // Data is loaded or error occurs
      }
    };

    fetchReviews();
  }, []);  // Empty dependency array to fetch data once
    
    console.log("All : ", reviews);

  // Handle loading and error
  if (loading) return <p>Loading reviews...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="reviews-container">
      {reviews && reviews.length > 0 ? (
        reviews.map((review) => (
          <div className="review-card bg-gray-100 dark:bg-gray-900 p-4 rounded-lg mb-4" key={review._id}>
            <div className="flex items-center mb-2">
              <p className="font-semibold">{review.user.name}</p>
              <div className="ml-4 flex items-center text-tertiary-light text-lg">
                <Rating rating={review.userRating} />
              </div>
            </div>
            <p className="text-gray-700 dark:text-gray-300">{review.text}</p>
            <p className="italic text-sm text-gray-500 dark:text-gray-400 mt-2">
              {/* Room: {review.hotelRoom.title}  Displaying the room name */}
            </p>
          </div>
        ))
      ) : (
        <p>No reviews available.</p>
      )}
    </div>
  );
};

export default AllRoomReviews;
