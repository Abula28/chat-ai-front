import { FiSidebar } from "react-icons/fi";
import useSidebarStore from "../../../store/sidebarStore";
import { TextView } from "../../common";
import { useGetUserSessions } from "../../../backend/requests/chat";
import { useLocation, useNavigate } from "react-router";
import { PiNotePencil } from "react-icons/pi";
const Sidebar = () => {
  const { open, setOpen } = useSidebarStore();
  const { data: sessions } = useGetUserSessions();
  const { pathname } = useLocation();
  const sessionId = pathname.split("/")[1];
  const navigate = useNavigate();

  const sessionRenderer = () => {
    if (sessions?.length === 0) {
      return (
        <TextView type="display-2" weight="medium">
          No conversations yet
        </TextView>
      );
    }

    return (
      <div className="flex flex-col gap-[2px]">
        {sessions?.map((e) => (
          <div
            className={`cursor-pointer rounded-lg p-3 duration-200 hover:bg-neutral-700/80 ${sessionId === e._id ? "bg-neutral-700" : ""}`}
            onClick={() => navigate(`/${e._id}`)}
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
    <div
      className={`hidden h-full w-[260px] flex-col gap-10 ${!open ? "hidden" : "md:flex"}`}
    >
      <div className="flex w-full items-center justify-between pr-3">
        <FiSidebar
          className="h-6 w-6 cursor-pointer text-[#9b9b9b]"
          onClick={() => setOpen(false)}
        />
        <PiNotePencil
          className="h-6 w-6 cursor-pointer text-[#9b9b9b]"
          onClick={() =>
            navigate("/", {
              replace: true,
            })
          }
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
    </div>
  );
};

export default Sidebar;
