import { useCallback, useEffect } from "react";
import {
  WebSocketProvider,
  Contract,
  parseEther,
  BrowserProvider,
} from "ethers";
import { atom, useSetAtom } from "jotai";
import { LENS_TELL_ADDR } from "@/utils/constants";
import Abi from "@/utils/contract/abi.json";
import { watchContractEvent } from "@wagmi/core";

export const tellAtom = atom<number | null>(null);

export const useTellProfile = () => {
  const setTell = useSetAtom(tellAtom);

  const tellProfile = useCallback(async (profileId: string) => {
    if (typeof window === "undefined") return;
    try {
      const signer = await new BrowserProvider(window.ethereum).getSigner();
      const lensTellContract = new Contract(LENS_TELL_ADDR, Abi, signer);
      let res = await lensTellContract.request(profileId, {
        value: parseEther("0.01"),
      });
      setTell(-1);
      return res;
    } catch (err) {
      throw err;
    }
  }, []);

  return { tellProfile };
};

interface ResponseLog {
  args: {
    value: bigint;
  };
}
export const useListenTell = () => {
  const setTell = useSetAtom(tellAtom);
  watchContractEvent(
    {
      address: LENS_TELL_ADDR,
      abi: Abi,
      eventName: "ResponseReceived",
    },
    (log) => {
      const value = parseInt(
        (log[0] as unknown as ResponseLog).args.value.toString()
      );
      setTell(value - 1);
    }
  );

};

export const tells = [
  "An enigmatic figure with robes of shimmering gold, the Enlightened Alchemist transmutes digital interactions into profound revelations. Their posts are like ancient scrolls, each containing a hidden elixir of wisdom. Collectors seek these scrolls, hoping to unlock the secrets within.",
  "A conductor of ethereal energies, the Luminous Conductor orchestrates symphonies of wisdom and insight. Their posts are notes in a celestial score, resonating with harmony. Collectors are drawn to these luminous compositions, forming a celestial orchestra of enlightenment.",
  "A celestial being with shimmering wings, the Stellar Muse brings inspiration from distant galaxies. They craft cosmic content that sparks creativity, and each of their posts is a guiding star in the digital sky. Admirers collect their posts like stardust, turning their profile into a constellation of brilliance.",
  "A wise being who weaves threads of understanding, the Unity Oracle unites minds through insightful interactions. Their posts are like threads of wisdom, stitching a tapestry of connection. Collectors gather these threads, creating a mosaic of enlightenment.",
  "A gentle spirit that weaves stories with the soft touch of a whisper, the Serenade Enchanter brings people together through harmonious connections. Their posts are like soft musical notes, creating a symphony of unity. Collectors save these notes, creating a melodious tapestry of shared experiences.",
  "A skilled artisan who weaves stories like delicate tapestries, the Enchanted Artisan combines harmony and creativity into each masterpiece. Their posts are like strokes of a painter's brush, forming intricate narratives that transport readers to enchanting worlds. Collectors treasure these stories, turning their profile into a gallery of captivating tales.",
  "A sage with an aura of serenity, the Ethereal Sage shares insights that seem to transcend reality. Their posts are like fragments of dreams, carrying profound meanings. Collectors cherish these fragments, creating a garden of transcendence.",
  "A sage with eyes that reflect the universe, the Cosmic Cantor imparts timeless wisdom through celestial tales. Their words are like cosmic echoes, resonating with ancient truths. Collectors gather these echoes, forming a constellation of enlightenment.",
  " A recluse of ancient scrolls, the Mystic Scriber weaves enchanting tales with ink made of starlight. Their posts are like scrolls of arcane knowledge, captivating readers with their depth. Collectors covet these scrolls, building a library of hidden truths.",
];
