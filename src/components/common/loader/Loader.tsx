import { TextView } from "../text-view";
import { AiImage } from "../../../assets/images";
import { Divider } from "..";

export const Loader = () => {
  return (
    <div className="three-body animate-spin-three-body relative inline-block h-[35px] w-[35px]">
      <div className="three-body__dot absolute bottom-[5%] left-0 h-full w-[30%] origin-[50%_85%] rotate-[60deg]">
        <div className="after-dot animate-wobble1-delay"></div>
      </div>
      <div className="three-body__dot absolute bottom-[5%] right-0 h-full w-[30%] origin-[50%_85%] -rotate-[60deg]">
        <div className="after-dot animate-wobble1"></div>
      </div>
      <div className="three-body__dot absolute bottom-[-5%] left-0 h-full w-[30%] translate-x-[116.666%]">
        <div className="after-dot animate-wobble2"></div>
      </div>
    </div>
  );
};

export const AssistantLoader = () => {
  return (
    <div className="flex w-[90%] animate-pulse gap-3">
      <div className="h-8 w-8 shrink-0 overflow-hidden rounded-full bg-blue-600">
        <img src={AiImage} alt="AI" className="h-full w-full object-cover" />
      </div>
      <div className="flex w-full flex-col gap-2">
        <div className="flex items-center gap-3">
          <TextView type="display-2">LanguageGUI</TextView>
          <Divider type="vertical" />
          <TextView
            type="display-2"
            className="text-textView-neutral"
            weight="medium"
          >
            typing...
          </TextView>
        </div>
        <div className="rounded-lg bg-[#1E2235] p-4 text-[#ACB4C0]">
          <div className="text-sm italic text-gray-400">AI is thinking...</div>
        </div>
      </div>
    </div>
  );
};
