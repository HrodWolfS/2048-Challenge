export default function Header() {
  return (
    <div className="h-16 w-30 flex items-center text-orange-400 pl-7 pb-2 bg-gray-00 font-playwrite text-xl ">
      <p className="position absolute">
        <span className="inline-block -rotate-12">2048</span>
        <span className="font-rubik relative top-2 -left-2 "> Challenge</span>
      </p>
    </div>
  );
}
