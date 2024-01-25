<img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black"><img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=TypeScript&logoColor=white"><img src="https://img.shields.io/badge/Zustand-ecb63f?style=flat-square"><img src="https://img.shields.io/badge/React Query-FF4154?style=flat-square&logo=react-query&logoColor=white"><img src="https://img.shields.io/badge/Emotion-cc67bc?style=flat-square"><img src="https://img.shields.io/badge/npm-CB3837?style=flat-square&logo=npm">

## 개발 환경

- vscode
- node v18.12.1

## 실행 방법

1. 의존성 패키지 설치 후 실행

```bash
$ npm install

# 개발
$ npm start

# 빌드
$ npm run build

# 배포
$ npm run serve

# 도커 이미지 생성 후 실행
$ ./docker/build-and-run.sh
```

## 기술 스택 & 라이브러리 선정 이유

### :gear: React & TypeScript

- 빠른 시간 안에 개발하여 사용하기 위해 1) 익숙하고 2) 구현에 필요한 라이브러리가 다양한 React를 선택했다.
- 코드의 안정성과 가독성 그리고 유지보수성을 위해 TypeScript를 사용하여 개발하였다.
- Github OpenAPI를 이용하여 특정 레포지토리의 이슈를 조회하는것이 목적인 서비스라, 검색 엔진 최적화는 고려 대상이 아니었기에 React를 이용한 CSR 방식을 채택하였다.

### :gear: React Query

- 프로젝트에서 사용하는 Github OpenAPI에는 시간/분 당 요쳥량 제한이 존재하고, 요청량을 초과하게 되면 일정 시간동안 사용이 불가능해진다. 빠르게 요청량 제한에 도달하지 않도록, 동일 요청에 대해 **캐싱**을 수행하기 위하여 React Query를 도입하였다.
- React Query와 `ErrorBoundary`, `Suspense`를 함께 사용하면 **에러처리와 로딩 시 화면의 처리를 선언적**으로 할 수 있게된다.
- `useQuery`훅을 사용 할 경우, 비동기 요청으로 받아온 데이터를 추가 상태를 이용하여 관리하지 않아도 되어 코드의 **가독성과 유지보수성을 높일 수 있다**.

### :gear: Zustand

- 다양한 전역 상태관리 라이브러리 중 zustand를 고른 이유는, 사용법이 매우 쉽고 간단하며 react-devtools 와도 호환되기 때문이다. `persist` 기능 또한 쉽게 적용할 수 있어 history를 구현할 때 유용하게 사용하였다.

### :gear: Emotion

- `css` props를 이용하여 css 문법으로 jsx 문법 위에 스타일을 작성하므로써, 빠른 개발이 가능하기 때문에 선택했다.
