import React from "react";
import { FC } from "react";
import { nft } from "../types/nft";
import { Card } from "./ui/Card";
interface TodoCardProps extends React.HTMLAttributes<HTMLParagraphElement> {
  nfts: nft;
  innerRef?: React.Ref<HTMLParagraphElement>;
}

const NFTCard: FC<TodoCardProps> = ({ nfts, innerRef, ...props }) => {
  const imageId = () => {
    if (Number(nfts.id) % 2 == 0) return "1";
    if (Number(nfts.id) % 3 == 0) return "2";
    return "3";
  };

  return (
    <Card ref={innerRef} {...props} className="overflow-hidden shadow-lg rounded-xl">
      <img src={`/finegirl${imageId()}.webp`} className="w-full h-[210px]" />
      <div className="bg-blue-500 h-[30px] px-2 font-bold flex items-center">
        <p>{nfts.title}</p>
      </div>
    </Card>
  );
};

export { NFTCard };
