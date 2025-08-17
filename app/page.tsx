'use client';

import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

export default function Home() {
  const router = useRouter();

  const routeToDashboard = useCallback(() => {
    router.push('/dashboard');
  }, [router]);

  return (
    <div className="flex h-[100vh] flex-col items-center justify-center gap-2">
      <div>Welcome To Message Service</div>
      <div onClick={routeToDashboard} className="cursor-pointer">
        Click Here
      </div>
    </div>
  );
}
