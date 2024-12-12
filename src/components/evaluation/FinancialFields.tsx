import { NumberField } from "../form/NumberField";
import { SelectField } from "../form/SelectField";

interface FinancialFieldsProps {
  formData: {
    revenue: string;
    growth: string;
    burnRate: string;
    fundingStage: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (field: string, value: string) => void;
  fundingStages: { value: string; label: string; }[];
  fieldTooltips: {
    revenue: string;
    growth: string;
    burnRate: string;
  };
}

export function FinancialFields({
  formData,
  handleChange,
  handleSelectChange,
  fundingStages,
  fieldTooltips
}: FinancialFieldsProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-700">Finansiell Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <NumberField
          label="Årlig Omsättning (SEK)"
          id="revenue"
          name="revenue"
          value={formData.revenue}
          onChange={handleChange}
          placeholder="Årlig omsättning i SEK"
          tooltip={fieldTooltips.revenue}
        />
        <NumberField
          label="Tillväxt YoY (%)"
          id="growth"
          name="growth"
          value={formData.growth}
          onChange={handleChange}
          placeholder="År över år tillväxt"
          tooltip={fieldTooltips.growth}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SelectField
          label="Finansieringsfas"
          value={formData.fundingStage}
          onChange={(value) => handleSelectChange("fundingStage", value)}
          options={fundingStages}
          placeholder="Välj finansieringsfas"
        />
        <NumberField
          label="Månatlig Burn Rate (SEK)"
          id="burnRate"
          name="burnRate"
          value={formData.burnRate}
          onChange={handleChange}
          placeholder="Månatlig burn rate i SEK"
          tooltip={fieldTooltips.burnRate}
        />
      </div>
    </div>
  );
}