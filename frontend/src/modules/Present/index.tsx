"use client";
import Image from "next/image";
import cx from "clsx";
import { useAtomValue } from "jotai";
import MagicBall from "@/assets/magicBall.jpg";
import { tellAtom, tells, useListenTell } from "@/services/Tell";

const Present: React.FC = () => {
  const tell = useAtomValue(tellAtom);
  useListenTell();

  return (
    <div
      className={cx(
        "flex flex-col justify-between items-center col-span-2 w-full"
      )}
    >
      <div className="pt-[40px] w-4/5 text-center">
        {tell === -1 && (
          <div className="text-[24px] leading-[32px]">
            Reading...It may take a long time
          </div>
        )}
        {!!tell && tell !== -1 && <div>The profile is...{tells[tell - 1]}</div>}
      </div>
      <Image
        alt="bg"
        src={MagicBall}
        className=" pointer-events-none"
        draggable={false}
      />
    </div>
  );
};

export default Present;
