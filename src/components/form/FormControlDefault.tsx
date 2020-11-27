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
  disabled?: boolean
}

const FormControl: React.FC<IFormControl> = ({
  name,
  label,
  inputType,
  placeholder,
  helperText,
  disabled
}) => {
  return (
    <Field name={name}>
      {({ field, form }) => (
        <CkFormControl
          id={name}
          isInvalid={form.errors[name] && form.touched[name]}
        >
          <FormLabel htmlFor={name}>{label}</FormLabel>
          <Input
            {...field}
            type={inputType}
            max={20}
            placeholder={placeholder}
            variant="filled"
            disabled={disabled}
          />

          <FormHelperText fontStyle="italic">{helperText}</FormHelperText>

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
