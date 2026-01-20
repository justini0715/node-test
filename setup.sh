#!/bin/bash
# ===========================
# 최소 Node-Test 환경 설치 스크립트
# ===========================

echo "=== Node-Test 최소 환경 설치 시작 ==="

# 1️⃣ Node 확인
if ! command -v node &> /dev/null
then
    echo "⚠ Node.js가 설치되어 있지 않습니다. 설치 후 다시 시도하세요."
    exit 1
fi

echo "Node & npm 확인 완료: $(node -v) $(npm -v)"

# 2️⃣ TypeScript 설치 (로컬 devDependency)
if [ ! -d node_modules/typescript ]; then
    echo "TypeScript 설치..."
    npm install --save-dev typescript @types/node
else
    echo "TypeScript 이미 설치됨"
fi

# 3️⃣ dist 초기화
if [ -d dist ]; then
    echo "dist 삭제 후 새로 생성..."
    rm -rf dist
fi

mkdir -p dist
echo "dist 디렉토리 준비 완료"

# 4️⃣ TS 컴파일
echo "TypeScript 컴파일..."
npx tsc

echo "설치 + 컴파일 완료 ✅"
