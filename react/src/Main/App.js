// App.js 또는 메인 컴포넌트 파일
import React, { Suspense, lazy } from 'react';

const Main = lazy(() => import('./Pages/Main')); // Root 컴포넌트를 동적으로 로드

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Main />
    </Suspense>
  );
}

export default App; // 이 부분이 중요합니다.
