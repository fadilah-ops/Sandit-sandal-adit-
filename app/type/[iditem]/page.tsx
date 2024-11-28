'use client';

import React, { useState, useEffect} from 'react';
import { useParams } from 'next/navigation';
import Navbar from '@/app/Navbar';
import Image from 'next/image';
import '@/app/banner.css'
import ProductCard from '@/app/cart';
import { GiSlippers } from "react-icons/gi";
export default function Home() {
  const params = useParams();
  const type = params.iditem;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fetchdata, setfetchdata] = useState<fetch[]>([]);
  const images = [
    '/Banner-W.jpg',
    '/Banner.Webp',
    '/gambar1 (2).jpeg',
    '/normal.jpg',
  ];

  interface fetch{
    id:any;
    Nama:string;
    Harga:number;
    type:string;
    Brand:string;
    Rating:string;
    nama_foto:string;
  }
  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:8000/data/type/${type}`);
      const result = await response.json();
      setfetchdata(result);
      console.log(response);
      console.log(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => {
    console.log("data");
    fetchData();
  }, []);
  
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000);

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, [images]);

  

  return (<>
     <Navbar />
     <div className="relative h-80 w-full flex items-center justify-center text-center bg-gray-800">
      <div className="absolute inset-0 w-2/4" id='banner'>
        <Image
          src={images[currentImageIndex]}
          alt="Banner Image"
          layout="fill"
          objectFit="cover"
          priority
        />
      </div>
    </div>
    <span className="Brand">
  <Image 
    src="/logo.jpeg"
    width={100}
    height={100}
    alt="Banner Image"
    objectFit="cover"
    priority
  />
  <h1 
    className="text-6xl font-bold text-gray-800" 
    id="eger"
  >
    EIGER
  </h1>
</span>

    <div className="w-screen flex gap-4 overflow-x-auto whitespace-nowrap scrollbar-hide">
    {fetchdata &&
    fetchdata
      .filter((data) => data.Brand === "EIGER")
      .map((data) => (
        <ProductCard
          key={data.id}
          title={data.Nama}
          originalPrice={data.Harga}
          rating={data.Rating}
          productId={data.id}
          img={data.nama_foto}
        />
      ))}
    </div>
    <span className='Brand'>
    <Image 
       src='/images (3).png'
       width={100}
       height={10}
       alt="Banner Image"
       objectFit="cover"
       priority
      />
      <h1 className='text-6xl font-bold text-gray-800' id='nc'>THE NORT FACE</h1>
    </span>
    <div className="w-screen flex gap-4 overflow-x-auto whitespace-nowrap scrollbar-hide">
    {fetchdata &&
    fetchdata
      .filter((data) => data.Brand === "NOTFAC")
      .map((data) => (
        <ProductCard
          key={data.id}
          title={data.Nama}
          originalPrice={data.Harga}
          rating={data.Rating}
          productId={data.id}
          img={data.nama_foto}
        />
      ))}
    </div>
    <span className='Brand'>
    <Image 
       src='/images (7).png'
       width={100}
       height={10}
       alt="Banner Image"
       objectFit="cover"
       priority
      />
    <h1 className='text-6xl font-bold text-gray-800' id='are'>Arei</h1></span>
    <div className="w-screen flex gap-4 overflow-x-auto whitespace-nowrap scrollbar-hide">
    {fetchdata &&
    fetchdata
      .filter((data) => data.Brand === "Arei")
      .map((data) => (
        <ProductCard
          key={data.id}
          title={data.Nama}
          originalPrice={data.Harga}
          rating={data.Rating}
          productId={data.id}
          img={data.nama_foto}
        />
      ))}
    </div>
    <div className="bg-gray-900 text-white py-4">
  <div className="max-w-6xl mx-auto flex flex-wrap justify-between items-center gap-6">
    <div className="flex items-center space-x-3">
      <div className="text-lg">
        <i className="fas fa-tags"></i>
      </div>
      <div>
        <h3 className="font-semibold">Flash Sale setiap hari</h3>
        <p className="text-sm">Dapatkan diskon menarik setiap hari</p>
      </div>
    </div>
    <div className="flex items-center space-x-3">
      <div className="text-lg">
        <i className="fas fa-truck"></i> 
      </div>
      <div>
        <h3 className="font-semibold">Extra Voucher & Gratis Ongkir</h3>
        <p className="text-sm">Syarat dan ketentuan berlaku</p>
      </div>
    </div>
    <div className="flex items-center space-x-3">
      <div className="text-lg">
        <i className="fas fa-headset"></i> 
      </div>
      <div>
        <h3 className="font-semibold">Customer Service 24 Jam</h3>
        <p className="text-sm">Kami siap menjawab keluhan Anda 24/7</p>
      </div>
    </div>
  </div>
</div>
<div className="bg-orange-100 py-12" id='about'>
  <div className="max-w-4xl mx-auto text-center px-6">
  <div className="text-xl font-semibold text-gray-800 flex items-center">
  <h2 className="text-3xl font-bold text-gray-800 mb-4 flex"><GiSlippers/>SANDIT</h2>
  </div>
    <p className="text-gray-600 text-lg leading-relaxed">
    "Sandit - Lebih dari Sekadar Sandal"
    Kami tidak hanya menjual sandal, kami menawarkan kenyamanan, kualitas, dan kepercayaan. Temukan produk terbaik dengan harga bersahabat untuk memenuhi kebutuhan gaya hidup Anda.
    </p>
  </div>
</div>


  </>);
}
