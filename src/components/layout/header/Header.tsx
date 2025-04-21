import { FiSidebar } from "react-icons/fi";
import useSidebarStore from "../../../store/sidebarStore";
import useUserStore from "../../../store/userStore";
import { Button, TextView } from "../../common";
import { isAuth } from "../../../utils";
import useAuthModalStore from "../../../store/authModalStore";
import { useEffect, useState } from "react";
import { BiLogOut } from "react-icons/bi";
import { useGetSystemPrompts } from "../../../backend";
import { Link, useNavigate } from "react-router";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import useLayoutStore from "../../../store/sidebarStore";
import { Select } from "../../common/select/Select";
import { PiNotePencil } from "react-icons/pi";
import { motion, AnimatePresence } from "framer-motion";
import { useMedia } from "../../../hooks/useMedia";

const Header = () => {
  const { open, setOpen } = useSidebarStore();
  const { data, setData } = useUserStore();
  const { setIsOpen } = useAuthModalStore();
  const { data: knowledgeData } = useGetSystemPrompts();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { selectedPrompt, setSelectedPrompt } = useLayoutStore();
  const navigate = useNavigate();

  const isTablet = useMedia("tablet");

  useEffect(() => {
    if (!knowledgeData || !knowledgeData.prompts.length) return;
    setSelectedPrompt(knowledgeData.prompts[0]._id);
  }, [knowledgeData]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setData(null);
    navigate("/");
    window.location.reload();
  };

  const userInfoRenderer = () => {
    if (!data || !isAuth()) {
      return (
        <Button variant="primary" onClick={() => setIsOpen(true)}>
          Login
        </Button>
      );
    }

    return (
      <div className="relative">
        <div
          className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-gray-200 text-sm font-medium"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          <TextView type="display-2" className="text-black">
            {data.username.charAt(0).toUpperCase()}
          </TextView>
        </div>

        <AnimatePresence>
          {dropdownOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute right-0 top-full z-[100] mt-2 flex flex-col gap-2 rounded-md bg-neutral-650 p-2 shadow-md"
            >
              {data.role === "admin" && (
                <Link
                  className="flex items-center gap-2 whitespace-nowrap"
                  to={"/admin/system-prompts"}
                >
                  <TextView type="paragraph-small">Admin</TextView>
                  <MdOutlineAdminPanelSettings />
                </Link>
              )}
              <div
                className="flex items-center gap-2 whitespace-nowrap"
                onClick={handleLogout}
              >
                <TextView type="paragraph-small">Logout</TextView>
                <BiLogOut />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  const selectOption =
    knowledgeData?.prompts.map((e) => ({
      value: e._id,
      label: e.label,
    })) || [];

  return (
    <div className="flex w-full items-center justify-between gap-2 border-b border-[#4B5268]/30 p-3">
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2">
          {open && isTablet ? null : (
            <>
              <FiSidebar
                className="h-6 w-6 cursor-pointer text-[#9b9b9b]"
                onClick={() => setOpen(true)}
              />
              <PiNotePencil
                className="h-6 w-6 cursor-pointer text-[#9b9b9b]"
                onClick={() =>
                  navigate("/", {
                    replace: true,
                  })
                }
              />
            </>
          )}
        </div>
        <div className="w-full min-w-[200px] sm:w-auto">
          <Select
            options={selectOption}
            value={selectedPrompt}
            onChange={(value) => setSelectedPrompt(value)}
          />
        </div>
      </div>
      {userInfoRenderer()}
    </div>
  );
};

export default Header;
