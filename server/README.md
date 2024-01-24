<img src="https://img.shields.io/badge/NestJS-E0234E?style=flat-square&logo=nestjs"><img src="https://img.shields.io/badge/SQLite-003B57?style=flat-square&logo=sqlite"><img src="https://img.shields.io/badge/npm-CB3837?style=flat-square&logo=npm">

## 개발 환경 

- vscode
- node v18.12.1

## 실행 방법

1. .env 설정

.env.template 파일을 .env 파일에 복사한 후 필요한 환경변수 값을 모두 채운다.

2. 의존성 패키지 설치 후 실행

```bash
$ npm install

# 개발
$ npm start

# 빌드
$ npm run build

# 배포
$ npm run start:prod

# 도커 이미지 생성 후 실행
$ ./docker/build-and-run.sh
```

## 기술 스택 & 라이브러리 선정 이유

### NestJS

### SQLite

### npm