export default function PagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-[100vh] flex-row justify-between gap-2">
      <div className="w-1/4 bg-red-50">Side bar</div>
      <div className="w-3/4 bg-blue-50">{children}</div>
    </div>
  );
}
