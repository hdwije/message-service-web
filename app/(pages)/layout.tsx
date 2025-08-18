'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';

export default function PagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const routeToPath = useCallback(
    (path: string) => {
      router.push(path);
    },
    [router],
  );

  const menuItems = useMemo(
    () => [
      {
        name: 'Create Message',
        path: 'create-message',
      },
      {
        name: 'Inbox',
        path: 'inbox',
      },
      {
        name: 'Sent Messages',
        path: 'sent-messages',
      },
    ],
    [],
  );

  const menuList = useMemo(
    () =>
      menuItems.map((item, index) => {
        const borderBottom = index === menuItems.length - 1 ? 'border-b-1' : '';

        return (
          <div
            key={index}
            onClick={() => routeToPath(item.path)}
            className={`flex cursor-pointer flex-col justify-center border-t-1 border-[#E2E8F0] p-2 font-semibold text-indigo-800 transition hover:text-indigo-900 ${borderBottom}`}
          >
            {item.name}
          </div>
        );
      }),
    [menuItems, routeToPath],
  );

  return (
    <div className="flex h-[100vh] flex-row justify-between gap-2">
      <div className="w-1/6 bg-gradient-to-b from-indigo-100 via-purple-100 to-pink-100 p-2">
        <div className="cursor-pointer text-lg font-bold text-indigo-900">
          Message Service
        </div>
        <div className="mt-3 flex flex-col">{menuList}</div>
      </div>
      <div className="w-5/6 p-2">{children}</div>
    </div>
  );
}
