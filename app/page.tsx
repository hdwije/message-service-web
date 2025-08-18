'use client';

import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

export default function Home() {
  const router = useRouter();

  const routeToDashboard = useCallback(() => {
    router.push('/dashboard');
  }, [router]);

  return (
    <div className="flex h-[100vh] flex-col items-center justify-center gap-6 border border-indigo-100 bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 p-6 shadow-lg">
      <h1 className="text-3xl font-bold text-gray-800 drop-shadow-sm md:text-4xl">
        Welcome To Message Service
      </h1>
      <div
        onClick={routeToDashboard}
        className="cursor-pointer rounded-xl bg-white px-6 py-3 font-medium text-indigo-600 shadow-md transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-xl"
      >
        Click Here
      </div>
    </div>
  );
}
