import { RouteObject, Outlet } from "react-router-dom";
import { FlowMachineProvider } from "./context";
import { StepOne, StepTwo, StepThree, Fail } from "./steps";

export const xstateRoutes: RouteObject = {
  path: "",
  element: (
    <FlowMachineProvider>
      <Outlet />
    </FlowMachineProvider>
  ),
  children: [
    {
      path: "step1",
      element: <StepOne />,
    },
    {
      path: "step2",
      element: <StepTwo />,
    },
    {
      path: "step3",
      element: <StepThree />,
    },
    {
      path: "fail",
      element: <Fail />,
    },
  ],
};
