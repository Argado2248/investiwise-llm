import { FormFieldWithTooltip } from "../FormFieldWithTooltip";

interface NumberFieldProps {
  label: string;
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  tooltip: string;
}

export function NumberField(props: NumberFieldProps) {
  return (
    <FormFieldWithTooltip
      {...props}
      type="number"
    />
  );
}