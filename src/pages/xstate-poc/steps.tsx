import { Box, AbsoluteCenter, Spinner, Heading } from "@chakra-ui/react";
import { FlowMachineContext } from "./context";
import { Navigate } from "react-router-dom";
import FormOne from "../../components/form-one";
import FormTwo from "../../components/form-two";

export const StepOne = () => {
	const isValidating = FlowMachineContext.useSelector((state) =>
		state.matches("step1.validating"),
	);
	const flowActor = FlowMachineContext.useActorRef();

	return (
		<Box h="500px">
			<AbsoluteCenter>
				{isValidating ? (
					<Spinner />
				) : (
					<FormOne
						onSubmit={(data) =>
							flowActor.send({ type: "SUBMIT_FORM_ONE", data })
						}
					/>
				)}
			</AbsoluteCenter>
		</Box>
	);
};

export const StepTwo = () => {
	const formOneData = FlowMachineContext.useSelector(
		({ context }) => context.formOneData,
	);
	const flowActor = FlowMachineContext.useActorRef();

	if (!formOneData) {
		return <Navigate to="../step1" replace />;
	}

	return (
		<Box h="500px">
			<AbsoluteCenter>
				<FormTwo
					onSubmit={(data) => flowActor.send({ type: "SUBMIT_FORM_TWO", data })}
				/>
			</AbsoluteCenter>
		</Box>
	);
};

export const StepThree = () => {
	const { formOneData, formTwoData } = FlowMachineContext.useSelector(
		({ context }) => context,
	);

	if (!formOneData || !formTwoData) {
		return <Navigate to="../step1" replace />;
	}

	return (
		<Box h="500px">
			<AbsoluteCenter>
				<Heading>finished</Heading>
			</AbsoluteCenter>
		</Box>
	);
};

export const Fail = () => {
	return (
		<Box h="500px">
			<AbsoluteCenter>
				<Heading>fail</Heading>
			</AbsoluteCenter>
		</Box>
	);
};
