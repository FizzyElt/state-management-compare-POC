import { RouteObject, Outlet } from "react-router-dom";
import { FlowProvider } from "./context";
import { StepOne, StepTwo, StepThree, Fail } from "./steps";

export const zustandRoutes: RouteObject = {
	path: "",
	element: (
		<FlowProvider>
			<Outlet />
		</FlowProvider>
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
