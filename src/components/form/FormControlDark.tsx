import {
  FormControl as CkFormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Alert,
  AlertIcon
} from '@chakra-ui/react'
import { Field } from 'formik'

interface IFormControl {
  name: string
  label: string
  placeholder?: string | ''
  helperText?: string | ''
  inputType: 'text' | 'password' | 'email'
}

const FormControl: React.FC<IFormControl> = ({
  name,
  label,
  inputType,
  placeholder,
  helperText
}) => {
  return (
    <Field name={name}>
      {({ field, form }) => (
        <CkFormControl
          id={name}
          py="0.75em"
          isInvalid={form.errors[name] && form.touched[name]}
        >
          <FormLabel htmlFor={name}>{label}</FormLabel>
          <Input
            {...field}
            type={inputType}
            max={20}
            placeholder={placeholder}
          />

          <FormHelperText fontStyle="italic" color="whitesmoke">
            {helperText}
          </FormHelperText>

          <FormErrorMessage>
            <Alert status="error" variant="left-accent">
              <AlertIcon />
              {form.errors[name]}
            </Alert>
          </FormErrorMessage>
        </CkFormControl>
      )}
    </Field>
  )
}
export default FormControl
