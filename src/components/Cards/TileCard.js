export default function TileCard({
  number = "",
  title = "",
  iconBG = "",
  icon = "",
}) {
  return (
    <li className="col-span-1 divide-y divide-gray-200 rounded-md bg-white bg-[#FFFFFF57] drop-shadow-[6px_4px_50px_#0000000D] border-2 border-[#DADADA]">
      <div className="flex w-full items-center justify-between space-x-6 p-6">
        <div className="flex-1 truncate">
          <div className="flex items-center gap-4">
            <span
              className={`flex justify-center items-center h-[46px] w-[46px] flex-shrink-0 rounded-full bg-${iconBG}`}
            >
              <img src={icon} />
            </span>
            <p className="mt-1 text-sm text-black">{title}</p>
          </div>
          <div className="flex items-center mt-3 -mb-2">
            <h2 className="truncate text-[25px] text-[#060606]">{number}</h2>
          </div>
        </div>
      </div>
    </li>
  );
}
