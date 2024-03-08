import { PropsWithChildren, createContext, useContext, useRef } from "react";
import { createFlowStore, StoreState } from "./store";
import { StoreApi, useStore } from "zustand";

export const FlowContext = createContext<StoreApi<StoreState>>(
  {} as StoreApi<StoreState>,
);

export const FlowProvider = ({ children }: PropsWithChildren) => {
  const storeRef = useRef<StoreApi<StoreState>>();

  if (!storeRef.current) {
    storeRef.current = createFlowStore();
  }

  return (
    <FlowContext.Provider value={storeRef.current}>
      {children}
    </FlowContext.Provider>
  );
};

export const useFlowContext = <T,>(selector: (state: StoreState) => T) => {
  const store = useContext(FlowContext);

  return useStore(store, selector);
};
