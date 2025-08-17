interface TitleProps {
  name: string;
}

export function Title({ name }: TitleProps) {
  return (
    <div className="flex w-full flex-col justify-center border-b-1 border-[#E2E8F0] py-3 text-2xl text-[#1E3A8A]">
      <div>{name}</div>
    </div>
  );
}
