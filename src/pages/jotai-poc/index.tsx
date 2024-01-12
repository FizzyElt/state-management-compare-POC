import { Provider } from "jotai/react";
import { myStore } from "./store";
import { RouteObject, Outlet } from "react-router-dom";
import { FormDataProvider } from "./context";
import { StepOne, StepTwo, StepThree, Fail } from "./steps";

export const jotaiRoutes: RouteObject = {
	path: "",
	element: (
		<Provider store={myStore}>
			<FormDataProvider>
				<Outlet />
			</FormDataProvider>
		</Provider>
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
