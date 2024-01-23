import { useEffect, useMemo, useState } from "react";
import Browser from "webextension-polyfill";
import { Header, SocialMediaItem } from "@src/components";
import { SocialMedia } from "@src/interfaces";

export default function Popup() {
  const [filter, setFilter] = useState<string>("");
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

  const onToggleAll = async (isBlockedAll: boolean) => {
    (await Browser.runtime.sendMessage({
      message: "toggle-all-social-medias",
      params: { isBlockedAll },
    })) as { ok: boolean };

    setSocialMedias(
      socialMedias.map((socialMedia) => {
        socialMedia.isBlocked = isBlockedAll ? false : true;
        return socialMedia;
      })
    );
  }

  useEffect(() => {
    loadSocialMedias();
  }, []);

  const filteredSocialMedias = useMemo(() => {
    if (filter.trim() === "") return socialMedias;
    return socialMedias.filter((socialMedia) =>
      socialMedia.name.toLowerCase().includes(filter.trim().toLowerCase())
    );
  }, [filter, socialMedias])

  return (
    <div className="bg-gray-800">
      <Header
        filter={filter}
        onChangeFilter={setFilter}
        socialMedias={filteredSocialMedias}
        onBlockAll={onToggleAll}
      />
      <div className="flex flex-col gap-2 p-2 pt-16">
        {filteredSocialMedias.map((socialMedia) => (
          <SocialMediaItem
            key={socialMedia.name}
            socialMedia={socialMedia}
            toggleSocialMedia={toggleSocialMedia}
          />
        ))}
      </div>
    </div>
  );
}
