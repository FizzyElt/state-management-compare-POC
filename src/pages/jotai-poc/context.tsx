import { createContext, useContext, useRef } from "react";
import { FormOneData } from "../../components/form-one";
import { FormTwoData } from "../../components/form-two";
import { atom, PrimitiveAtom } from "jotai";
export type FormDataContextType = {
	formOneAtom: PrimitiveAtom<FormOneData | null>;
	formTwoAtom: PrimitiveAtom<FormTwoData | null>;
};

export const FormDataContext = createContext<FormDataContextType>(
	{} as FormDataContextType,
);

// eslint-disable-next-line react-refresh/only-export-components
export const useFormDataContext = () => useContext(FormDataContext);

export const FormDataProvider = ({ children }: React.PropsWithChildren) => {
	const contextRef = useRef({
		formOneAtom: atom<FormOneData | null>(null),
		formTwoAtom: atom<FormTwoData | null>(null),
	});

	return (
		<FormDataContext.Provider value={contextRef.current}>
			{children}
		</FormDataContext.Provider>
	);
};
