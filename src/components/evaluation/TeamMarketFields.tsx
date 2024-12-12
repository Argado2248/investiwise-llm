import { NumberField } from "../form/NumberField";
import { FormFieldWithTooltip } from "../FormFieldWithTooltip";

interface TeamMarketFieldsProps {
  formData: {
    teamSize: string;
    marketSize: string;
    teamExperienceYears: string;
    teamDomainExpertise: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  fieldTooltips: {
    teamSize: string;
    marketSize: string;
    teamExperienceYears: string;
    teamDomainExpertise: string;
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <NumberField
          label="Genomsnittlig erfarenhet (år)"
          id="teamExperienceYears"
          name="teamExperienceYears"
          value={formData.teamExperienceYears}
          onChange={handleChange}
          placeholder="Antal år"
          tooltip={fieldTooltips.teamExperienceYears}
        />
        <FormFieldWithTooltip
          label="Domänexpertis"
          id="teamDomainExpertise"
          name="teamDomainExpertise"
          value={formData.teamDomainExpertise}
          onChange={handleChange}
          placeholder="t.ex. Fintech, AI, E-handel"
          tooltip={fieldTooltips.teamDomainExpertise}
          type="text"
        />
      </div>
    </div>
  );
}