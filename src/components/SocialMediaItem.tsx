import { SOCIAL_MEDIA } from "@src/pages/constants/social-media";
import { FaXTwitter } from "react-icons/fa6";
import { AiFillFacebook } from "react-icons/ai";
import {
  BsInstagram,
  BsLinkedin,
  BsReddit,
  BsSnapchat,
  BsTelegram,
  BsTiktok,
  BsWhatsapp,
  BsYoutube,
  BsTwitch,
} from "react-icons/bs";
import { SocialMedia } from "@src/interfaces";
import { FC } from "react";
import { Toggle } from "./Toggle";

const ICONS = {
  [SOCIAL_MEDIA[0].name]: <FaXTwitter className="text-white text-xl" />, // x
  [SOCIAL_MEDIA[1].name]: <AiFillFacebook className="text-white text-xl" />, // facebook
  [SOCIAL_MEDIA[2].name]: <BsTiktok className="text-white text-xl" />, // tiktok
  [SOCIAL_MEDIA[3].name]: <BsInstagram className="text-white text-xl" />, // twitter
  [SOCIAL_MEDIA[4].name]: <BsYoutube className="text-white text-xl" />, // youtube
  [SOCIAL_MEDIA[5].name]: <BsReddit className="text-white text-xl" />, // reddit
  [SOCIAL_MEDIA[6].name]: <BsSnapchat className="text-white text-xl" />, // snapchat
  [SOCIAL_MEDIA[7].name]: <BsTelegram className="text-white text-xl" />, // telegram
  [SOCIAL_MEDIA[8].name]: <BsLinkedin className="text-white text-xl" />, // linkedin
  [SOCIAL_MEDIA[9].name]: <BsWhatsapp className="text-white text-xl" />, // whatsapp
  [SOCIAL_MEDIA[10].name]: <BsTwitch className="text-white text-xl" />, // whatsapp
};

interface SocialMediaProps {
  socialMedia: SocialMedia;
  toggleSocialMedia: (name: string) => void;
}

export const SocialMediaItem: FC<SocialMediaProps> = ({
  socialMedia,
  toggleSocialMedia,
}) => {
  return (
    <div
      key={socialMedia.name}
      className="flex flex-row justify-between border-b border-b-gray-500 items-center p-2"
    >
      <div className="flex flex-row items-center gap-2">
        {ICONS[socialMedia.name] || null}
        <span className="text-white capitalize">{socialMedia.name}</span>
      </div>
      <div className="flex flex-col gap-1">
        <p
          className={`${socialMedia.isBlocked ? "text-red-700" : "text-green-500"
            }`}
        >
          {socialMedia.isBlocked ? "blocked" : "allowed"}
        </p>
        <Toggle
          isBlocked={socialMedia.isBlocked}
          name={socialMedia.name}
          onToggle={toggleSocialMedia}
        />
      </div>
    </div>
  );
};
