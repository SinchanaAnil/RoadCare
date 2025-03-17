
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface RepairNotesProps {
  repairNotes: string;
  setRepairNotes: (notes: string) => void;
}

const RepairNotes = ({ repairNotes, setRepairNotes }: RepairNotesProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="repairNotes">Repair Notes</Label>
      <Textarea 
        id="repairNotes" 
        placeholder="Describe the repair work performed..." 
        className="min-h-[100px]" 
        value={repairNotes}
        onChange={(e) => setRepairNotes(e.target.value)}
      />
    </div>
  );
};

export default RepairNotes;
