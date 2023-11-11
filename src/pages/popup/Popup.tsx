import { useEffect, useState } from "react";
import Browser from "webextension-polyfill";
import { Switch } from "@headlessui/react";
import { SOCIAL_MEDIA } from "../constants/social-media";
import { FaXTwitter } from "react-icons/fa6"
import { AiFillFacebook } from "react-icons/ai"
import { BsInstagram, BsLinkedin, BsReddit, BsSnapchat, BsTelegram, BsTiktok, BsWhatsapp, BsYoutube } from "react-icons/bs"


interface SocialMedia {
  name: string;
  isBlocked: boolean;
}

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
}


export default function Popup() {
  const [socialMedias, setSocialMedias] = useState<SocialMedia[]>([]);

  const loadSocialMedias = async () => {
    const response = (await Browser.runtime.sendMessage({
      message: "get-social-medias",
    })) as { socialMedias: SocialMedia[] };
    setSocialMedias(response.socialMedias || []);
  };

  const toggleSocialMedia = async (name: string) => {
    (await Browser.runtime.sendMessage({
      message: "toggle-social-media",
      params: { socialMediaName: name },
    })) as { ok: boolean };

    setSocialMedias(
      socialMedias.map((socialMedia) => {
        if (socialMedia.name === name) {
          socialMedia.isBlocked = !socialMedia.isBlocked;
        }
        return socialMedia;
      })
    );
  };

  useEffect(() => {
    loadSocialMedias();
  }, []);

  return (
    <div className="bg-gray-800">
      <div className="flex flex-col gap-2 p-2">
        {socialMedias.map((socialMedia) => (
          <div
            key={socialMedia.name}
            className="flex flex-row justify-between items-center bg-gray-700 rounded-md p-2"
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
              <div className="flex flex-row items-center gap-2">
                <Switch
                  checked={socialMedia.isBlocked}
                  onChange={() => toggleSocialMedia(socialMedia.name)}
                  className={`${socialMedia.isBlocked ? "bg-red-700" : "bg-green-500"
                    }
                  relative inline-flex h-[22px] w-[40px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
                >
                  <span
                    aria-hidden="true"
                    className={`${socialMedia.isBlocked ? "translate-x-5" : "translate-x-0"
                      }
                    pointer-events-none inline-block h-[17px] w-[17px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                  />
                </Switch>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
