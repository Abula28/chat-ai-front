import { FiSidebar } from "react-icons/fi";
import useSidebarStore from "../../../store/sidebarStore";
import useUserStore from "../../../store/userStore";
import { Button, TextView } from "../../common";
import { isAuth } from "../../../utils";
import useAuthModalStore from "../../../store/authModalStore";
import { useEffect, useState } from "react";
import { BiLogOut } from "react-icons/bi";
import { useGetSystemPrompts } from "../../../backend";
import { Select } from "../../common/select/Select";
import { Link, useNavigate } from "react-router";
import { MdAdminPanelSettings } from "react-icons/md";
import useLayoutStore from "../../../store/sidebarStore";

const Header = () => {
  const { open, setOpen } = useSidebarStore();
  const { data, setData } = useUserStore();
  const { setIsOpen } = useAuthModalStore();
  const { data: knowledgeData } = useGetSystemPrompts();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { selectedPrompt, setSelectedPrompt } = useLayoutStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!knowledgeData) return;
    setSelectedPrompt(knowledgeData.prompts[0]._id);
  }, [knowledgeData]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setData(null);
    navigate("/");
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
      <div
        className="relative flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-gray-200 text-sm font-medium"
        onClick={() => setDropdownOpen(!dropdownOpen)}
      >
        <TextView type="display-2" className="text-black">
          {data.username.charAt(0).toUpperCase()}
        </TextView>

        {dropdownOpen && (
          <div className="absolute right-0 top-full z-10 flex flex-col gap-2 rounded-md bg-neutral-650 p-2 shadow-md">
            {data.role === "admin" && (
              <div className="flex items-center gap-2">
                <Link to={"/admin"}>
                  <TextView type="paragraph-small">Admin</TextView>
                </Link>
                <MdAdminPanelSettings />
              </div>
            )}
            <div className="flex items-center gap-2" onClick={handleLogout}>
              <TextView type="paragraph-small">Logout</TextView>
              <BiLogOut />
            </div>
          </div>
        )}
      </div>
    );
  };

  const selectOption =
    knowledgeData?.prompts.map((e) => ({
      value: e._id,
      label: e.category.toUpperCase(),
    })) || [];

  return (
    <div className="flex w-full justify-between border-b border-[#4B5268]/30 p-3">
      <div className="flex items-center gap-2">
        {!open && (
          <FiSidebar
            className="h-6 w-6 cursor-pointer text-[#9b9b9b]"
            onClick={() => setOpen(true)}
          />
        )}
        <Select
          options={[...selectOption]}
          onChange={(e) => setSelectedPrompt(e.target.value)}
          value={selectedPrompt}
        />
      </div>
      {userInfoRenderer()}
    </div>
  );
};

export default Header;
