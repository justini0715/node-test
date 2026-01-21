🎯 목표
node-test/
├─ src/              ← 기존 Node 백엔드 (유지)
├─ public/           ← 기존 index.html (유지)
├─ frontend/         ← ✨ 새 React 프론트


백엔드: localhost:3000

React: localhost:5173

둘은 fetch로만 연결

1️⃣ frontend 폴더 생성 + React 세팅

📍 node-test 디렉토리에서 실행

npm create vite@latest frontend -- --template react-ts


질문 나오면 이렇게 선택:

✔ Project name: frontend
✔ Framework: React
✔ Variant: TypeScript


그 다음 👇

cd frontend
npm install
npm run dev


성공하면 터미널에 👇 나옵니다:

Local: http://localhost:5173/


👉 브라우저에서 열어서 Vite + React 화면 보이면 성공

2️⃣ 생성된 구조 “이 정도만” 이해하자
frontend/
├─ src/
│  ├─ main.tsx        ← React 시작점
│  ├─ App.tsx         ← 메인 컴포넌트 ⭐
│  └─ index.css
├─ index.html         ← React용 HTML (건드리지 않음)
└─ vite.config.ts


👉 지금은 App.tsx만 보면 됨

3️⃣ App.tsx 정리 (연습용으로 단순화)

frontend/src/App.tsx를 전부 지우고 이렇게 바꿔줘 👇

import { useState } from 'react';

function App() {
  const [message, setMessage] = useState('아직 안 눌림');

  const ping = async () => {
    const res = await fetch('http://localhost:3000/ping');
    const text = await res.text();
    setMessage(text);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>React 프론트</h1>
      <button onClick={ping}>Ping</button>
      <p>결과: {message}</p>
    </div>
  );
}

export default App;


저장하면 👉 자동 리로드

4️⃣ 백엔드에 CORS 한 줄 추가

지금 Node 서버에서 응답 보내기 전에 이거 추가 👇

res.setHeader('Access-Control-Allow-Origin', '*');


예:

res.statusCode = 200;
res.setHeader('Access-Control-Allow-Origin', '*');
res.end('pong');


👉 안 하면 브라우저에서 막힘 (정상임)

5️⃣ 전체 실행 상태

터미널 2개 열어서:

터미널 1 (백엔드)
npm run dev
# 또는
node dist/index.js

터미널 2 (프론트)
cd frontend
npm run dev


브라우저:

http://localhost:5173
 → React

버튼 클릭 → 백엔드 /ping 호출

🎉 프론트 ↔ 백엔드 연결 완료

6️⃣ 지금 이 상태의 의미 (중요)

지금 구조는 아주 정석적인 연습 구조야.

React는 API만 소비

백엔드는 화면 몰라도 됨

나중에 Nest로 바꿔도:

fetch('http://localhost:3000/ping')


👉 그대로 유지

7️⃣ 다음으로 딱 좋은 연습 루트

이제 선택만 하면 돼 👇

🔹 A안 (프론트 집중)

상태(state)

컴포넌트 분리

로딩 / 에러 처리

🔹 B안 (백 + 프론트 연결)

/todos API 추가

React에서 리스트 렌더링

🔹 C안 (React 구조 이해)

main.tsx → App.tsx 흐름

JSX가 왜 이렇게 생겼는지