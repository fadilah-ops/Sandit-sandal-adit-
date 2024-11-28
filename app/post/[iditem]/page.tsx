'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import '@/app/Banner.css';
import Navbar from '@/app/Navbar';

interface ProductType {
  id: number;
  Nama: string;
  Harga: number;
  Type: string;
  nama_foto: string;
  Brand: string;
  Rating: string;
}

interface CommentType {
  username: string;
  photo: string;
  text: string;
  rating: number; // Rating untuk komentar
}

const ProductCard = () => {
  const params = useParams();
  const iditem = params.iditem;
  const [product, setProduct] = useState<ProductType | null>(null);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState<number>(0); 
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [comments, setComments] = useState<CommentType[]>([
    {
      username: 'Aliyah',
      photo: '/cindo.jpeg',
      text: 'Sandal ini sangat nyaman dipakai!',
      rating: 5,
    },
    {
      username: 'Budi',
      photo: '/raff.jpeg',
      text: 'Kualitas bahan ringan dan nyaman.',
      rating: 4,
    },
  ]);

  const handleAddComment = () => {
    if (newComment.trim() === '' || newRating === 0) return;
    const newCommentObj = {
      username: 'Guest',
      photo: '/default-user.jpg',
      text: newComment,
      rating: newRating,
    };
    setComments([...comments, newCommentObj]);
    setNewComment('');
    setNewRating(0);
  };

  const diskon = (originalPrice: number) => {
    return originalPrice - originalPrice * (25 / 100);
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

  useEffect(() => {
    console.log('Fetching product data...');
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:8000/data/${iditem}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      setProduct(result);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center text-gray-600">Loading...</div>;
  }

  if (!product) {
    return <div className="text-center text-red-500">Product not found</div>;
  }
  
  const handleSizeSelection = (size: number) => {
    setSelectedSize(size);
  };
  return (
    <>
      <Navbar />
      <div className="w-1/2 mx-auto flex-shrink-0 overflow-hidden rounded-lg border border-gray-200 shadow-md bg-white">
        <div className="relative">
          <Image
            src={product.nama_foto || '/default.jpg'}
            alt={product.Nama || 'Product Image'}
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
          <h3 className="text-lg font-semibold text-gray-800 text-center">{product.Nama}</h3>
          <div className="flex justify-between items-center mt-2">
            <h1 className="text-sm text-gray-600 flex items-center">
              Rating: {product.Rating || 'N/A'}{' '}
              <span className="ml-2">{renderStars(parseInt(product.Rating))}</span>
            </h1>
            <h1 className="text-sm text-red-500 font-semibold">Diskon 25%</h1>
          </div>
          <h4 className="text-gray-400 mt-2 line-through text-sm">Rp.{product.Harga}</h4>
          <p className="text-gray-800 font-bold text-xl">Rp.{diskon(product.Harga)}</p>
          <h4 className="text-sm text-gray-800 font-semibold">Pilih Ukuran:</h4>
          <div>
            <div className="flex flex-wrap gap-2 mt-2">
              {[...Array(16)].map((_, i) => {
                const size = 50 - i;
                return (
                  <button
                    key={size}
                    className={`px-4 py-2 rounded border ${
                      selectedSize === size
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                    }`}
                    onClick={() => handleSizeSelection(size)}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
            {selectedSize && (
              <p className="mt-2 text-sm text-gray-600">
                Ukuran yang dipilih: <span className="font-bold">{selectedSize}</span>
              </p>
            )}
          </div>
          <button className="bg-blue-500 text-white px-4 py-2 mt-4 rounded w-full hover:bg-blue-600">
            Beli
          </button>
        </div>
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-gray-800">Komentar Pengguna</h2>
          <ul className="mt-4 space-y-3">
            {comments.length > 0 ? (
              comments.map((comment, index) => (
                <li
                  key={index}
                  className="flex items-start space-x-4 p-3 border border-gray-200 rounded shadow-sm"
                >
                  <Image
                    src={comment.photo}
                    alt={comment.username}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div>
                    <h4 className="text-sm font-semibold">{comment.username}</h4>
                    <div className="flex items-center">
                      {renderStars(comment.rating)}
                      <span className="ml-2 text-gray-600 text-sm">({comment.rating})</span>
                    </div>
                    <p className="text-gray-600 mt-1">{comment.text}</p>
                  </div>
                </li>
              ))
            ) : (
              <p className="text-gray-500">Belum ada komentar. Jadilah yang pertama memberikan ulasan!</p>
            )}
          </ul>
          <div className="mt-4 flex flex-col">
            <textarea
              className="flex-grow border border-gray-300 rounded px-3 py-2 text-gray-800 mb-2"
              placeholder="Tulis komentar Anda..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <div className="flex items-center space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  className={`text-xl ${newRating >= star ? 'text-yellow-500' : 'text-gray-300'}`}
                  onClick={() => setNewRating(star)}
                >
                  ★
                </button>
              ))}
            </div>
            <button
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={handleAddComment}
            >
              Kirim
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
