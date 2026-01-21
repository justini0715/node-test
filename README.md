`package.json`
```json
{
  "scripts": {
    "dev": "nodemon --watch src --exec ts-node src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js"
  }
}
```

npm run dev
tsc + node 수동 안해도 됨.

`tsconfig.json`
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "CommonJS",
    "rootDir": "src",
    "outDir": "dist",
    "strict": true
  }
}
```
Nest는 기본적으로 CommonJS 사용, ESM 안씀

## 내가 해보던건 프레임워크 없이 Node 표준 http 서버를 사용해서 백엔드 동작 구현임.
### Node + Express + Nest가 최종 목표.
> Nest 프레임워크가 강제하는 것.
* Controller / Service / Module
* DI
* 데코레이터 기반 선언형 코드
* 테스트/확장성 중심

## 표준 Node에서 더 해볼만한 것.
1️⃣ 라우터 분리
```ts
// routes/ping.ts
export function ping(req, res) {
  res.end('pong');
}
```

```ts
// index.ts
if (method === 'GET' && pathname === '/ping') {
  return ping(req, res);
}
```
2️⃣ body 파싱 (POST)
```http
POST /echo
{ "message": "hello" }
```
```ts
let body = '';
req.on('data', chunk => body += chunk);
req.on('end', () => {
  const json = JSON.parse(body);
  res.end(json.message);
});
```

3️⃣ 비동기 처리 & 에러
* fs.readFileSync → fs.promises.readFile
* try/catch 없으면 서버 죽는 거 확인
```ts
try {
  const html = await fs.readFile(filePath, 'utf-8');
  res.end(html);
} catch (e) {
  res.statusCode = 500;
  res.end('server error');
}
```

4️⃣ 미들웨어 흉내내기
```ts
function logger(req, res, next) {
  console.log(req.method, req.url);
  next();
}
```
```ts
logger(req, res, () => {
  // 실제 라우팅 로직
});
```

5️⃣ 메모리 저장소 (가짜 DB)
* GET /todos
* POST /todos
* 배열에 저장
```ts
const todos = [];
```

## 최종 루트
1. POST + body 파싱
2. 라우터 분리
3. 미들웨어 흉내
4. todos CRUD
5. 정리 후 Nest 시작
