import "./App.css";
import { nft } from "./types/nft";
import { useEffect } from "react";
import { NFTCard } from "./components/NFTCard";
import useInfiniteNFTs from "./hooks/useInfinitNfts";
import { Skeleton } from "./components/ui/Skeleton";

const myArray = Array.from({ length: 100 }, (_, index) => index + 1);

function App() {
  
  const {
    ref,
    inView,
    data,
    status,
    error,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteNFTs(myArray);

  const content = data?.pages.map((NFTs: nft[]) =>
    NFTs.map((nfts, index) => {
      if (NFTs.length == index + 1) {
        return <NFTCard innerRef={ref} key={nfts.id} nfts={nfts} />;
      }
      return <NFTCard key={nfts.id} nfts={nfts} />;
    }),
  );

  useEffect(() => {
    if (inView && hasNextPage) {
      console.log("Fire!");
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (status === "pending") {
    return (
      <div className="grid grid-cols-2 gap-4 px-8 lg:grid-cols-4 ">
        <SkeletonLoader />
      </div>
    );
  }

  if (status === "error") {
    return <p>Error: {error?.message}</p>;
  }

  return (
    <div className="px-12">
      <div className="fixed top-0 left-0 right-0 flex justify-center w-full h-12 py-8 border-b bg-muted">
        <h1 className="text-2xl font-bold ">NFTList Bored Cutie collection</h1>
      </div>
      <div className="grid grid-cols-2 gap-12 px-8 md:grid-cols-3 lg:grid-cols-4 mt-[6rem]">
        {content}
        {isFetchingNextPage && <SkeletonLoader />}
      </div>
    </div>
  );
}

export default App;

const SkeletonLoader = () => {
  return (
    <>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((card) => {
        return (
          <>
            <Skeleton key={card} className="w-full h-[170px]" />
          </>
        );
      })}
    </>
  );
};
