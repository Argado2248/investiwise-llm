import { NumberField } from "../form/NumberField";

interface TeamMarketFieldsProps {
  formData: {
    teamSize: string;
    marketSize: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  fieldTooltips: {
    teamSize: string;
    marketSize: string;
  };
}

export function TeamMarketFields({
  formData,
  handleChange,
  fieldTooltips
}: TeamMarketFieldsProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <NumberField
          label="Teamstorlek"
          id="teamSize"
          name="teamSize"
          value={formData.teamSize}
          onChange={handleChange}
          placeholder="Antal anställda"
          tooltip={fieldTooltips.teamSize}
        />
        <NumberField
          label="Total Marknadsstorlek (MSEK)"
          id="marketSize"
          name="marketSize"
          value={formData.marketSize}
          onChange={handleChange}
          placeholder="TAM i miljoner SEK"
          tooltip={fieldTooltips.marketSize}
        />
      </div>
    </div>
  );
}