import { assign, createMachine, fromCallback } from "xstate";
import { FormOneData } from "../../components/form-one";
import { FormTwoData } from "../../components/form-two";

import { getUserLevel } from "../../api";

type FlowMachineContext = {
	formOneData: FormOneData | null;
	formTwoData: FormTwoData | null;
};

type FlowMachineEvents =
	| { type: "SUBMIT_FORM_ONE"; data: FormOneData }
	| { type: "VALIDATED_FORM"; data: FormOneData }
	| { type: "SUBMIT_FORM_TWO"; data: FormTwoData }
	| { type: "VALIDATE_FAIL" };

export const flowMachine = createMachine({
	/** @xstate-layout N4IgpgJg5mDOIC5QAoC2BDAxgCwJYDswBKAOlgBcwAHARgGIA1AQQBkBJAESYBUBRDgPoAxAPIAlALIBtAAwBdRKCoB7WLnK5l+RSAAeiAKwAOGSQDMAThkA2GjSMB2BwBYjNMwBoQAT0QXnJABMFtaOgQYGZjSRgc4AvnFeaFh4hKQU1PTM7Fx8wkxsLLIKSCAqahpaOvoIxqaWNnaOLm6ePoiBNA4kDjJRgdbWZg40FsGBCUkYOATEZJS0JJDqBFB0AMoAqgBCEmzcwuISAiIAcrzFOuUrVaU1XdbmVtbhZpYWxv5evgj2NOZvMyBBzBfwOMzWeKJEDJGZpebUQIbHZ7A6iSQCbgAdREl1K10q2jufmcphB1kiMgcEQs1O+JKCITCESiMSh0PwyggcB0sNSxCuqhuRNANQAtLF6QgJVCpilZukFjRBRVNCK9B1nFLeiQjICzAYaM5nA4jM4jZMYdN+YrMksICt8FAVcLqogQVK-rr9aFOuNQpa+QqEYsAG7oAA2uAg6A0TpdhLdCDMRkeQLcXV64LsWvav2MAMBBhsgWGRgMgetwYyVECCbVSepRgBBisBnN1hkNGsUqGJGcFkHQ66recBsr8vhNcC9sdzvxQsTxIQJjTBrbHa7Pbz0X+Mn3+4sBt6VJcE7hcxrZnrt1FhgcUoM4RI0RekVG4Na55tJAAZuhcAjG91RqakzBfD5gkNSDLG3H5SwsEgxlpGRU2cToZGcAwHASBIgA */
	types: {} as {
		context: FlowMachineContext;
		events: FlowMachineEvents;
	},

	context: {
		formOneData: null,
		formTwoData: null,
	},
	initial: "step1",
	states: {
		step1: {
			initial: "editing",
			states: {
				editing: {
					on: {
						SUBMIT_FORM_ONE: {
							target: "validating",
						},
					},
				},
				validating: {
					invoke: {
						input: ({ event }) => event,
						src: fromCallback<
							FlowMachineEvents,
							{ type: "SUBMIT_FORM_ONE"; data: FormOneData }
						>(({ sendBack, input }) => {
							getUserLevel(input.data.name).then((level) => {
								if (level < 3) {
									sendBack({ type: "VALIDATED_FORM", data: input.data });
								} else {
									sendBack({ type: "VALIDATE_FAIL" });
								}
							});
						}),
					},
				},
			},
			on: {
				VALIDATED_FORM: {
					target: "step2",
					actions: [
						assign({
							formOneData: ({ event }) => event.data,
						}),
						"navigateToStep2",
					],
				},
				VALIDATE_FAIL: { target: "fail", actions: "navigateToFail" },
			},
		},
		step2: {
			initial: "editing",
			states: {
				editing: {},
			},
			on: {
				SUBMIT_FORM_TWO: {
					target: "step3",
					actions: [
						assign({
							formTwoData: ({ event }) => event.data,
						}),
						"navigateToStep3",
					],
				},
			},
		},
		step3: {
			type: "final",
		},
		fail: {
			type: "final",
		},
	},
});
