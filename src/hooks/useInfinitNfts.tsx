import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";

const useInfiniteNFTs = (myArray: number[]) => {
  const { ref, inView } = useInView();

  const fetchNFTs = async ({ pageParam }: { pageParam: number }) => {
    const start = (pageParam - 1) * 15;
    const end = pageParam * 15;
    await new Promise((resolve) => setTimeout(resolve, 1500));
    const nfts = myArray.slice(start, end).map((id) => ({
      id: id.toString(),
      title: `Bored Cutie  # ${id}`,
    }));
    
    console.log(nfts);
    return nfts;
  };

  const {
    data,
    status,
    error,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["nfts"],
    queryFn: fetchNFTs,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = lastPage.length ? allPages.length + 1 : undefined;
      return nextPage;
    },
  });

  useEffect(() => {
    if (inView && hasNextPage) {
        fetchNextPage();
      
    }
  }, [inView, hasNextPage, fetchNextPage]);

  return {
    ref,
    data,
    status,
    error,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    inView,
  };
};

export default useInfiniteNFTs;
