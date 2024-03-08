import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";

export type FormTwoData = {
  note: string;
};

interface FormTwoProps {
  defaultFormValues?: FormTwoData;
  onSubmit: (data: FormTwoData) => void;
}

const FormTwo = ({
  defaultFormValues = { note: "" },
  onSubmit,
}: FormTwoProps) => {
  const [formData, setFormData] = useState(defaultFormValues);

  return (
    <VStack w="500px">
      <FormControl>
        <FormLabel>note</FormLabel>
        <Input
          type="text"
          value={formData.note}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, note: e.target.value }))
          }
        />
      </FormControl>

      <Button onClick={() => onSubmit(formData)}>Submit</Button>
    </VStack>
  );
};

export default FormTwo;
