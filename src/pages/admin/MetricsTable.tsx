import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface MetricsTableProps {
  filters: {
    score: string;
    industry: string;
    stage: string;
    marketSize: string;
  };
}

export function MetricsTable({ filters }: MetricsTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Företag</TableHead>
            <TableHead>Bransch</TableHead>
            <TableHead>Fas</TableHead>
            <TableHead>Marknadsstorlek</TableHead>
            <TableHead>Poäng</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">TechCorp AB</TableCell>
            <TableCell>SaaS</TableCell>
            <TableCell>Serie A</TableCell>
            <TableCell>1.2B SEK</TableCell>
            <TableCell className="font-semibold text-primary">85</TableCell>
            <TableCell>
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Godkänd
              </span>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">FinStart Solutions</TableCell>
            <TableCell>Fintech</TableCell>
            <TableCell>Sådd</TableCell>
            <TableCell>250M SEK</TableCell>
            <TableCell className="font-semibold text-primary">72</TableCell>
            <TableCell>
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                Under granskning
              </span>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}