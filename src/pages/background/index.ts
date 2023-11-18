import Browser from "webextension-polyfill";
import { SOCIAL_MEDIA } from "../constants/social-media";

Browser.runtime.onMessage.addListener(
  async ({
    message,
    params,
  }: {
    message: string;
    params: Record<string, any>;
  }) => {
    switch (message) {
      case "get-social-medias": {
        const socialMedias = await getSocialMedias();
        return {
          socialMedias,
        };
      }

      case "get-blocked-social-medias-domains": {
        const blockedDomains = await getBlockedSocialMediasDomains();

        return {
          blockedDomains,
        };
      }

      case "toggle-social-media": {
        const { socialMediaName } = params;
        await toggleSocialMedia(socialMediaName);
        return {
          ok: true,
        };
      }

      default:
        break;
    }
    return true;
  }
);

const getSocialMedias = async () => {
  const storage = await Browser.storage.local.get();
  const socialMedias = Object.keys(storage).map((key) => {
    return {
      name: key,
      ...storage[key],
    };
  });

  return socialMedias;
};

const getBlockedSocialMediasDomains = async () => {
  const storage = await Browser.storage.local.get();
  const isEmpty = Object.keys(storage).length === 0;

  if (isEmpty) return [];

  const blockDomains = Object.keys(storage)
    .filter((key) => storage[key].isBlocked)
    .map((key) => storage[key].domains)
    .flat();

  return blockDomains;
};

const toggleSocialMedia = async (socialMediaName: string) => {
  const socialMedia = await Browser.storage.local.get(socialMediaName);

  if (socialMedia) {
    await Browser.storage.local.set({
      [socialMediaName]: {
        ...socialMedia[socialMediaName],
        isBlocked: !socialMedia[socialMediaName].isBlocked,
      },
    });
  }
};

const init = async () => {
  const storage = await Browser.storage.local.get();
  const isEmpty = Object.keys(storage).length === 0;

  if (isEmpty) {
    const toSave: { [key: string]: { isBlocked: boolean; domains: string[] } } =
      {};

    SOCIAL_MEDIA.forEach((socialMedia) => {
      toSave[socialMedia.name] = {
        isBlocked: true,
        domains: socialMedia.domains,
      };
    });

    await Browser.storage.local.set(toSave);
  }
};

init();
