// components/ProductCard.js
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import './Banner.css';

interface ProductCardProps {
  title: string;
  originalPrice: number;
  productId: number; // Renamed from `key` for clarity
  rating: string;
  img: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ title, originalPrice, rating, img, productId }) => {
  const calculateDiscountPrice = (originalPrice: number) => {
    return originalPrice - originalPrice * 0.25; // Calculate 25% discount
  };

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} className={i < rating ? 'text-yellow-500' : 'text-gray-300'}>
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="w-full max-w-sm mx-auto flex-shrink-0 overflow-hidden rounded-lg border border-gray-200 shadow-md bg-white">
      <div className="relative">
        <Image
          src={img}
          alt={title}
          layout="responsive"
          width={200}
          height={200}
          objectFit="cover"
          priority
          className="rounded-t-lg"
        />
        <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">Sale</span>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 text-center">{title}</h3>
        <div className="flex justify-between items-center mt-2">
          <h1 className="text-sm text-gray-600 flex items-center">
              Rating: {rating || 'N/A'}{' '}
              <span className="ml-2">{renderStars(parseInt(rating))}</span>
          </h1>
        </div>
        <h4 className="text-gray-400 mt-2 line-through text-sm">Rp.{originalPrice.toLocaleString('id-ID')}</h4>
        <p className="text-gray-800 font-bold text-xl">Rp.{calculateDiscountPrice(originalPrice).toLocaleString('id-ID')}</p>
        <Link href={`/post/${productId}`}>
          <button className="bg-blue-500 text-white px-4 py-2 mt-4 rounded w-full hover:bg-blue-600">
            Pesan
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
