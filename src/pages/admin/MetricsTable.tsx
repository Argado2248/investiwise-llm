import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface StartupEvaluation {
  id: string;
  company_name: string;
  industry: string;
  revenue: number;
  growth: number;
  market_size: number;
  team_size: number;
  funding_stage: string;
  burn_rate: number;
  product_stage: string;
  created_at: string;
  updated_at: string;
}

interface MetricsTableProps {
  data: StartupEvaluation[];
}

export function MetricsTable({ data }: MetricsTableProps) {
  return (
    <div className="w-full overflow-hidden border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Företag</TableHead>
            <TableHead>Bransch</TableHead>
            <TableHead>Fas</TableHead>
            <TableHead>Marknadsstorlek</TableHead>
            <TableHead>Tillväxt</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((evaluation) => (
            <TableRow key={evaluation.id}>
              <TableCell className="font-medium">{evaluation.company_name}</TableCell>
              <TableCell>{evaluation.industry}</TableCell>
              <TableCell>{evaluation.funding_stage}</TableCell>
              <TableCell>{evaluation.market_size.toLocaleString()} SEK</TableCell>
              <TableCell className="font-semibold text-primary">{evaluation.growth}%</TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  evaluation.growth > 80 
                    ? 'bg-green-100 text-green-800'
                    : evaluation.growth > 50
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {evaluation.growth > 80 
                    ? 'Godkänd'
                    : evaluation.growth > 50
                    ? 'Under granskning'
                    : 'Behöver förbättring'}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}