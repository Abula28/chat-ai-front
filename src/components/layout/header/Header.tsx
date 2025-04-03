import { FiSidebar } from "react-icons/fi";
import useSidebarStore from "../../../store/sidebarStore";

const Header = () => {
  const { open, setOpen } = useSidebarStore();
  return (
    <div className="flex w-full justify-between p-3">
      {!open && (
        <FiSidebar
          className="h-6 w-6 cursor-pointer text-[#9b9b9b]"
          onClick={() => setOpen(true)}
        />
      )}
    </div>
  );
};

export default Header;
