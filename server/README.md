<img src="https://img.shields.io/badge/NestJS-E0234E?style=flat-square&logo=nestjs"><img src="https://img.shields.io/badge/SQLite-003B57?style=flat-square&logo=sqlite"><img src="https://img.shields.io/badge/typeorm-f7a600?style=flat-square"><img src="https://img.shields.io/badge/npm-CB3837?style=flat-square&logo=npm">

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

### :gear: NestJS

- **OAuth**와 **로깅**만을 위한 백엔드 애플리케이션 제작이 목적이었기 때문에, `Express`와 같이 무척 자유로운 구조의 백엔드 프레임워크 보다는, 모듈 기반의 아키텍처를 제공해주어 빠른 기능 구현이 가능한 `NestJS`를 선택했다.
- TypeScript를 지원하여 코드의 안정성, 가독성, 유지보수성을 챙길 수 있다.

### :gear: typeorm

- TypeScript와 데코레이터 문법을 지원하기 때문에, Sequelize ORM 라이브러리에 비해 NestJS와 함께 사용했을 때 일관성 있는 코드를 작성할 수 있어 선택하였다.

### :gear: SQLite

- 오직 로그 데이터를 보관하기 위해 `MySQL`과 같은 영구 저장 데이터베이스를 사용하는 것은 오버 엔지니어링으로 여겨져, 파일 시스템 기반 데이터베이스인 `SQLite`를 선택하였다.
