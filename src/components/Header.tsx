import { SocialMedia } from "@src/interfaces";
import { Toggle } from "./Toggle";
import { FC, useMemo } from "react";

interface SocialMediaProps {
  filter: string;
  onBlockAll: (isBlockedAll: boolean) => void;
  onChangeFilter: (filter: string) => void;
  socialMedias: SocialMedia[];
}

export const Header: FC<SocialMediaProps> = ({
  socialMedias,
  onBlockAll,
  filter,
  onChangeFilter,
}) => {
  const isBlockedAll = useMemo(() => {
    return socialMedias.every((socialMedia) => socialMedia.isBlocked);
  }, [socialMedias]);

  return (
    <div className="fixed bg-gray-700 w-full py-2 z-50 flex items-center justify-evenly px-2">
      <input
        type="text"
        placeholder="Search..."
        className="h-7 rounded-xl px-3 bg-gray-800 text-white"
        value={filter}
        onChange={(e) => onChangeFilter(e.target.value)}
      />
      <div className="flex flex-col gap-1">
        <p className="text-white">Block All</p>
        <Toggle
          name="block-all"
          isBlocked={isBlockedAll}
          onToggle={() => onBlockAll(isBlockedAll)}
        />
      </div>
    </div>
  );
};
