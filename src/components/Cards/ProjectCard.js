import { Button } from "antd";

export default function ProjectCard({
  icon = "",
  department = "",
  amount = "",
  description = "",
  date = "",
  status = "",
}) {
  return (
    <li className="col-span-1 rounded-lg bg-white drop-shadow-[6px_4px_50px_#0000000D]">
      <div className="flex w-full items-center justify-between space-x-6 p-6">
        <div className="flex items-center space-x-3">
          <span className="flex justify-center items-center h-[31px] w-[31px] flex-shrink-0 rounded-full bg-[#3687B71F]">
            <img src={icon} />
          </span>
          <span className="text-[10px] text-FontColor">{department}</span>
        </div>
        <div className="truncate">
          <div className="flex items-center space-x-3">
            <h2 className="truncate text-[20px] font-bold text-FontColor">
              {amount}
            </h2>
          </div>
        </div>
      </div>
      <div className="p-6">
        <p className="text-[12px] font-semibold text-[#6E6B7B]">
          {description}
        </p>
      </div>

      <div className="flex px-6">
        <div className="flex w-0 flex-1">
          <span className="relative inline-flex w-0 flex-1 items-center rounded-bl-lg pb-4 text-[10px] text-[#6E6B7B]">
            {date}
          </span>
        </div>
        <div className="flex w-0 flex-1">
          <span className="relative inline-flex w-0 flex-1 items-center justify-end gap-x-3 rounded-br-lg pb-4">
            <Button
              type="primary"
              size="small"
              className="bg-PrimaryColor px-3 text-[10px]"
            >
              {status}
            </Button>
          </span>
        </div>
      </div>
    </li>
  );
}
