'use client';

import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

type Message = {
  To: string;
  From: string;
  Body: string;
  SmsSid: string;
};

export default function MessageBox() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [liveConnected, setLiveConnected] = useState(false);
  const [liveScocket, setLiveSocket] = useState<Socket | undefined>(undefined);

  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_API_URL, {
      transports: ['websocket'],
      secure: true,
    });

    socket.on('connect', () => {
      setLiveConnected(true);
      setLiveSocket(socket);
    });

    socket.on('newMessage', (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="mx-auto h-full max-w-2xl rounded-xl border border-indigo-100 bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 p-4 shadow-lg">
      <div className="flex flex-col">
        <div className="flex justify-center text-sm font-bold text-indigo-700">
          Notifications
        </div>
        {liveConnected && liveScocket && (
          <div className="mb-4 flex justify-center text-xs font-light text-indigo-700">
            Live Connected:{' '}
            <span className="font-light">{liveScocket?.id}</span>
          </div>
        )}
      </div>
      <div className="flex max-h-[60vh] flex-col gap-3 overflow-y-auto pr-2">
        {!messages || !messages.length ? (
          <div className="text-md flex justify-center font-bold text-indigo-700">
            No new messages
          </div>
        ) : null}
        {messages.map((message, index) => (
          <div
            key={index}
            className="h-full rounded-xl border border-indigo-100 bg-white px-4 py-2 text-gray-800 shadow-md transition-transform duration-200 hover:scale-[1.02]"
          >
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-medium text-indigo-600">
                From: {message.From}
              </span>
              <span className="text-xs text-gray-500">To: {message.To}</span>
            </div>
            <p className="mb-2 text-sm text-gray-700">{message.Body}</p>
            <div className="text-xs text-gray-400">
              SmsSid: {message.SmsSid}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
