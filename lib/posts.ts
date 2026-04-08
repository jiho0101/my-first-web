export type Post = {
  id: number;
  title: string;
  content: string;
  author: string;
  date: string;
};

export const posts: Post[] = [
  {
    id: 1,
    title: "Next.js 16과 함께하는 첫걸음",
    content: "Next.js 16의 App Router를 활용하여 프로젝트를 구성하는 방법을 알아봅시다. React Server Components 기본기를 다지기에 매우 좋은 프레임워크입니다.",
    author: "개발자 A",
    date: "2026-04-06",
  },
  {
    id: 2,
    title: "Tailwind CSS 스타일링 팁",
    content: "유틸리티 퍼스트 CSS 프레임워크인 Tailwind CSS를 사용하면 마크업 내에서 빠르게 스타일을 구성할 수 있습니다. 반응형 디자인 적용도 매우 직관적입니다.",
    author: "디자이너 B",
    date: "2026-04-07",
  },
  {
    id: 3,
    title: "TypeScript로 안전한 코드 작성하기",
    content: "정적 타입을 지원하는 TypeScript는 컴파일 단계에서 여러 오류를 잡아줍니다. 인터페이스와 타입을 적극 활용하여 유지보수성을 크게 높일 수 있습니다.",
    author: "엔지니어 C",
    date: "2026-04-08",
  }
];
