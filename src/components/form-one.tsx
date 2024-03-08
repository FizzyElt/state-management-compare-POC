import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";

export type FormOneData = {
  name: string;
  email: string;
};

interface FormOneProps {
  defaultFormValues?: FormOneData;
  onSubmit: (data: FormOneData) => void;
}

const FormOne = ({
  defaultFormValues = { name: "", email: "" },
  onSubmit,
}: FormOneProps) => {
  const [formData, setFormData] = useState(defaultFormValues);

  return (
    <VStack w="500px">
      <FormControl>
        <FormLabel>Name</FormLabel>
        <Input
          type="text"
          value={formData.name}
          placeholder="level2, level3, level4"
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, name: e.target.value }))
          }
        />
      </FormControl>
      <FormControl>
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          value={formData.email}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, email: e.target.value }))
          }
        />
      </FormControl>

      <Button onClick={() => onSubmit(formData)}>Submit</Button>
    </VStack>
  );
};

export default FormOne;
