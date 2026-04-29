export type Post = {
  id: number;
  title: string;
  content: string;
  author: string;
  date: string;
};

// JSONPlaceholder에서 게시글을 가져오는 비동기 함수
// 서버 컴포넌트나 서버 액션 등에서 직접 호출할 수 있습니다.
export async function fetchPosts(): Promise<Post[]> {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
    // Next.js 개발 모드에서 매번 새로운 데이터를 보기 원할 경우 대비해 캐시를 끕니다.
    // 실서비스에서는 cache: 'force-cache'나 revalidate를 사용할 수 있습니다.
    cache: "no-store", 
  });
  
  if (!res.ok) {
    throw new Error("Failed to fetch posts from JSONPlaceholder");
  }
  
  const json = await res.json();
  
  // 데이터가 100개이므로 초기엔 20개 정도만 가져오겠습니다.
  const data = json.slice(0, 20);

  return data.map((item: any) => ({
    id: item.id,
    title: item.title,
    content: item.body,
    author: `User ${item.userId}`,
    date: new Date().toISOString().split("T")[0],
  }));
}
