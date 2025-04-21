import { FiSidebar } from "react-icons/fi";
import useSidebarStore from "../../../store/sidebarStore";
import { TextView } from "../../common";
import { useGetUserSessions } from "../../../backend/requests/chat";
import { useLocation, useNavigate } from "react-router";
import { PiNotePencil } from "react-icons/pi";
import { motion, AnimatePresence } from "framer-motion";
import { useMedia } from "../../../hooks/useMedia";

const Sidebar = () => {
  const { open, setOpen } = useSidebarStore();
  const { data: sessions } = useGetUserSessions();
  const { pathname } = useLocation();
  const sessionId = pathname.split("/")[1];
  const navigate = useNavigate();
  const isTablet = useMedia("tablet");

  const sessionRenderer = () => {
    if (sessions?.length === 0) {
      return (
        <TextView type="display-2" weight="medium">
          No conversations yet
        </TextView>
      );
    }

    return (
      <div className="customScrollbar flex max-h-[60vh] flex-col gap-[2px] overflow-y-auto md:max-h-[80vh]">
        {sessions?.map((e) => (
          <div
            className={`cursor-pointer rounded-lg p-3 duration-200 hover:bg-neutral-700/80 ${sessionId === e._id ? "bg-neutral-700" : ""}`}
            onClick={() => {
              navigate(`/${e._id}`);
              if (!isTablet) setOpen(false); // Only auto-close on mobile
            }}
            key={e._id}
          >
            <TextView type="display-2" weight="medium">
              {e.title}
            </TextView>
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      <AnimatePresence>
        {open && !isTablet && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/50"
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: open ? 0 : "-100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className={`fixed left-0 top-0 z-50 h-full w-[260px] flex-col gap-10 bg-slate-950 p-4 md:relative md:bg-transparent md:p-0 ${!open ? "hidden" : "flex"}`}
      >
        <div className="flex w-full items-center justify-between pr-3">
          <FiSidebar
            className="h-6 w-6 cursor-pointer text-[#9b9b9b]"
            onClick={() => setOpen(false)}
          />
          <PiNotePencil
            className="h-6 w-6 cursor-pointer text-[#9b9b9b]"
            onClick={() => {
              navigate("/", { replace: true });
              if (!isTablet) setOpen(false); // Only auto-close on mobile
            }}
          />
        </div>

        <div className="flex flex-col gap-10 pr-6">
          <div className="flex flex-col gap-3">
            <TextView
              type="display-1"
              weight="medium"
              className="uppercase text-[#9BA5B5]"
            >
              Chat History
            </TextView>
            {sessionRenderer()}
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;
