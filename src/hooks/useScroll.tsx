import { useState, useEffect, useCallback } from 'react';

const useInfiniteScroll = (): boolean => {
  const [isBottom, setIsBottom] = useState(false);

  // TODO: 디바운스 적용
  const handleScroll = useCallback(() => {
    /*
      - 스크롤 관련 참고 : https://ko.javascript.info/size-and-scroll
      - innerHeight: 현재 화면 영역의 높이(스크롤바의 높이도 포함됨)
      - scrollTop: 현재 스크롤바 위치 (scrollLeft와 scrollTop은 변경 가능)
        scrollTop 위치 그림 : https://media.vlpt.us/images/ksh4820/post/147fdb67-3461-4a28-a752-a9dfbdac8f2d/image.png
      - scrollHeight: 스크롤 영역을 포함한 브라우저 높이
    */
    /*
      scrollTop(스크롤바 위치) + innerHeight(화면 영역 높이)가
      scrollHeight와 같으면 스크롤 가장 아래에 도달했을 때
    */

    if (
      document.body.scrollHeight -
        (window.innerHeight + document.documentElement.scrollTop) >
      200
    ) {
      setIsBottom(false);
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      document.body.scrollHeight > 1500
        ? setIsBottom(true)
        : setIsBottom(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return isBottom;
};

export default useInfiniteScroll;
