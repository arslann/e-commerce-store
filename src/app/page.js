'use client';
import ProductCard from '@/components/ProductCard';
import ProductFilter from '@/components/ProductFilter';
import { getProducts } from '@/store/productsSlice';
import Image from 'next/image';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function Home() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const filteredProducts = useSelector(
    (state) => state.products.filteredProducts
  );

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between pt-10 bg-base-100">
      <ProductFilter />
      <div className="container mx-auto flex flex-row flex-wrap gap-8 justify-center break-words">
        {filteredProducts &&
          filteredProducts.map((product) => {
            return <ProductCard key={product.id} {...product} />;
          })}
      </div>
    </main>
  );
}
