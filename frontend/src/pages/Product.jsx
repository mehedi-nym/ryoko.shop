import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';

const Product = ({ isAdmin, currentUser }) => {
  const { productId } = useParams();
  const { products, currency,addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');
  const [activeTab, setActiveTab] = useState('description');
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({
    name: '',
    phone: '',
    reviewText: '',
    photo: ''
  });
  const [editMode, setEditMode] = useState(null); // For editing reviews
  const [previewImage, setPreviewImage] = useState(''); // For displaying uploaded image

  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImage(item.image[0]);
        return null;
      }
    });
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleReviewChange = (e) => {
    setNewReview({ ...newReview, [e.target.name]: e.target.value });
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (editMode !== null) {
      // Update the existing review
      const updatedReviews = [...reviews];
      updatedReviews[editMode] = newReview;
      setReviews(updatedReviews);
      setEditMode(null); // Exit edit mode
    } else {
      setReviews([...reviews, newReview]);
    }
    setNewReview({ name: '', phone: '', reviewText: '', photo: '' });
    setPreviewImage(''); // Reset preview image
  };

  const handleEditReview = (index) => {
    setEditMode(index);
    setNewReview(reviews[index]);
    setPreviewImage(reviews[index].photo); // Load image for preview while editing
  };

  const handleDeleteReview = (index) => {
    const updatedReviews = reviews.filter((_, i) => i !== index);
    setReviews(updatedReviews);
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result); // Set preview image
        setNewReview({ ...newReview, photo: reader.result }); // Save image as base64
      };
      reader.readAsDataURL(file); // Convert file to base64 string
    }
  };

  const maskPhoneNumber = (phone) => {
    return phone ? `${phone.slice(0, 3)}****${phone.slice(-3)}` : '';
  };

  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      
      {/* Product Details */}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
        {/* Product images and info */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            {productData.image.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                src={item}
                key={index}
                className='w-[-24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer'
                alt=''
              />
            ))}
          </div>
          <div className='w-full sm:w-[80%]'>
            <img className='w-full h-auto' src={image} alt='' />
          </div>
        </div>

        <div className='flex-1'>
          <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
          <div className=' flex items-center gap-1 mt-2'>
            <img src={assets.star_icon} alt='' className='w-3 5' />
            <img src={assets.star_icon} alt='' className='w-3 5' />
            <img src={assets.star_icon} alt='' className='w-3 5' />
            <img src={assets.star_icon} alt='' className='w-3 5' />
            <img src={assets.star_dull_icon} alt='' className='w-3 5' />
            <p className='pl-2'>(45)</p>
          </div>
          <p className='mt-5 text-3xl font-medium'>
            {currency}
            {productData.price}
          </p>
          <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>
          <div className='flex flex-col gap-4 my-8'>
            <p>Select Size</p>
            <div className='flex gap-2'>
              {productData.sizes.map((item, index) => (
                <button
                  onClick={() => setSize(item)}
                  className={`border py-2 px-4 bg-gray-100 ${
                    item === size ? 'border-pink-500' : ''
                  }`}
                  key={index}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <button onClick={()=>addToCart(productData._id,size)} className='bg-[#FF33CC] hover:bg-[#FF1AB3] active:bg-[#990066] text-white px-8 py-3 text-sm'>
            ADD TO CART
          </button>
          <hr className='mt-8 sm:w-4/5' />
          <div className='text-sm text-gray-500 mt-5 flrx flex-col gap-1'>
            <p>100% Original Product.</p>
            <p>Cash on Delivery available.</p>
            <p>Easy Return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>

      {/* Description and Reviews */}
      <div className='mt-20'>
        <div className='flex'>
          <b
            onClick={() => handleTabClick('description')}
            className={`border px-5 py-3 text-sm cursor-pointer ${
              activeTab === 'description' ? 'text-[#FF33CC]' : ''
            }`}
          >
            Description
          </b>
          <b
            onClick={() => handleTabClick('reviews')}
            className={`border px-5 py-3 text-sm cursor-pointer ${
              activeTab === 'reviews' ? 'text-[#FF33CC]' : ''
            }`}
          >
            Reviews ({reviews.length})
          </b>
        </div>
        {activeTab === 'description' && (
          <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
            <p>{productData.description}</p>
          </div>
        )}
        {activeTab === 'reviews' && (
          <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
            {reviews.length > 0 ? (
              reviews.map((review, index) => (
                <div key={index} className='border p-4 mb-4'>
                  <p>
                    <strong>{review.name}</strong> (
                    {isAdmin ? review.phone : maskPhoneNumber(review.phone)})
                  </p>
                  <p>{review.reviewText}</p>
                  {review.photo && (
                    <img
                      src={review.photo}
                      alt='Review'
                      className='w-24 h-24 object-cover mt-2'
                    />
                  )}
                  <div className='flex gap-4 mt-2'>
                    {isAdmin && (
                      <button
                        onClick={() => handleDeleteReview(index)}
                        className='text-red-500'
                      >
                        Delete
                      </button>
                    )}
                    {currentUser === review.name && (
                      <button
                        onClick={() => handleEditReview(index)}
                        className='text-blue-500'
                      >
                        Edit
                      </button>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p>No reviews yet.</p>
            )}
            <form onSubmit={handleReviewSubmit} className='mt-4'>
              <input
                type='text'
                name='name'
                value={newReview.name}
                onChange={handleReviewChange}
                placeholder='Your Name'
                className='border p-2 mb-2 w-full'
              />
              <input
                type='text'
                name='phone'
                value={newReview.phone}
                onChange={handleReviewChange}
                placeholder='Phone Number'
                className='border p-2 mb-2 w-full'
              />
              <textarea
                name='reviewText'
                value={newReview.reviewText}
                onChange={handleReviewChange}
                placeholder='Write a review...'
                className='border p-2 mb-2 w-full'
              />
              <input
                type='file'
                accept='image/*'
                onChange={handlePhotoUpload}
                className='border p-2 mb-2 w-full'
              />
              {previewImage && (
                <img
                  src={previewImage}
                  alt='Uploaded Preview'
                  className='w-24 h-24 object-cover mt-2'
                />
              )}
              <button
                type='submit'
                className='bg-[#FF33CC] hover:bg-[#FF1AB3] text-white py-2 px-4 mt-2'
              >
                {editMode !== null ? 'Update Review' : 'Submit Review'}
              </button>
            </form>
          </div>
        )}
      </div>

      {/*----- Display Related Products-------- */}

      <RelatedProducts category={productData.category} subCategory={productData.subCategory}/>

</div>
) : <div className='opacity-0'></div>
}

export default Product
