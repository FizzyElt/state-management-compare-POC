import { createActorContext } from '@xstate/react';
import { flowMachine } from './flowMachine';
import { useNavigate } from 'react-router-dom';

export const FlowMachineContext = createActorContext(flowMachine);

export const FlowMachineProvider = ({ children }: React.PropsWithChildren) => {
  const navigate = useNavigate();

  return (
    <FlowMachineContext.Provider
      logic={flowMachine.provide({
        actions: {
          navigateToStep2: () => navigate('./step2'),
          navigateToStep3: () => navigate('./step3'),
          navigateToFail: () => navigate('./fail'),
        },
      })}
    >
      {children}
    </FlowMachineContext.Provider>
  );
};
