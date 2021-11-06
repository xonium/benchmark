import { Suspense, useCallback, useEffect, useState } from 'react';
import './App.css';
import { RootStore } from './Stores/RootStore';
import { initApp } from './InitApp';
import { RootStoreContext } from './Stores/RootStoreContext';
import { RouterContext, RouterView } from 'mobx-state-router';
import { ViewMap } from './Routes/ViewMap';

let rootStore: RootStore;

export const App = () => {
  const [initRun, setInitRun] = useState(false);

  const startApp = useCallback(async () => {
    rootStore = await initApp();
    setInitRun(true);
  }, []);

  useEffect(() => {
    startApp();
  }, [startApp]);

  if (!initRun) return null;

  return (
    <Suspense fallback={"Loading"}>
      <RootStoreContext.Provider value={rootStore}>
        <RouterContext.Provider value={rootStore.routerStore}>
          <RouterView viewMap={ViewMap} />
        </RouterContext.Provider>
      </RootStoreContext.Provider>
    </Suspense>
  );
}

export default App;
