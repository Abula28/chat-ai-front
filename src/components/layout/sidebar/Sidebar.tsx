import { FiSidebar } from "react-icons/fi";
import useSidebarStore from "../../../store/sidebarStore";
const Sidebar = () => {
  const { open, setOpen } = useSidebarStore();

  return (
    <div className={`h-full w-[260px] ${!open ? "hidden" : "md:block"}`}>
      <div className="flex w-full items-center justify-between">
        <FiSidebar
          className="h-6 w-6 cursor-pointer text-[#9b9b9b]"
          onClick={() => setOpen(false)}
        />
      </div>
    </div>
  );
};

export default Sidebar;
