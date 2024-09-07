export interface SearchFieldProps {
  inputValue: React.ComponentPropsWithRef<'input'>['value'];
  inputOnChange: React.ComponentPropsWithRef<'input'>['onChange'];
  buttonOnClick: React.ComponentProps<'button'>['onClick'];
}