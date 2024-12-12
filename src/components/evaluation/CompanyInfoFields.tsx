import { FormFieldWithTooltip } from "../FormFieldWithTooltip";
import { SelectField } from "../form/SelectField";

interface CompanyInfoFieldsProps {
  formData: {
    companyName: string;
    industry: string;
    productStage: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (field: string, value: string) => void;
  productStages: { value: string; label: string; }[];
  fieldTooltips: {
    companyName: string;
    industry: string;
  };
}

export function CompanyInfoFields({
  formData,
  handleChange,
  handleSelectChange,
  productStages,
  fieldTooltips
}: CompanyInfoFieldsProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormFieldWithTooltip
          label="Företagsnamn"
          id="companyName"
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
          placeholder="Ange företagsnamn"
          tooltip={fieldTooltips.companyName}
          type="text"
        />
        <FormFieldWithTooltip
          label="Bransch"
          id="industry"
          name="industry"
          value={formData.industry}
          onChange={handleChange}
          placeholder="t.ex. SaaS, Fintech"
          tooltip={fieldTooltips.industry}
          type="text"
        />
      </div>
      <SelectField
        label="Produktstadie"
        value={formData.productStage}
        onChange={(value) => handleSelectChange("productStage", value)}
        options={productStages}
        placeholder="Välj produktstadie"
      />
    </div>
  );
}