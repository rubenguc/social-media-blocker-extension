import { Switch } from "@headlessui/react";
import { FC } from "react";

interface SocialMediaProps {
  disabled?: boolean;
  isBlocked: boolean;
  name: string;
  onToggle: (name: string) => void;
}

export const Toggle: FC<SocialMediaProps> = ({
  disabled = false,
  isBlocked,
  name,
  onToggle,
}) => {
  return (
    <div className="flex flex-row items-center gap-2">
      <Switch
        aria-disabled={disabled}
        checked={isBlocked}
        onChange={() => onToggle(name)}
        className={`${isBlocked ? "bg-red-700" : "bg-green-500"}
        relative inline-flex h-[22px] w-[40px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
      >
        <span
          aria-hidden="true"
          className={`${isBlocked ? "translate-x-5" : "translate-x-0"}
          pointer-events-none inline-block h-[17px] w-[17px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
        />
      </Switch>
    </div>
  );
};
