
import { Report } from "@/types/reports";
import ReportCard from "./ReportCard";

type ReportsListProps = {
  reports: Report[];
};

const ReportsList = ({ reports }: ReportsListProps) => {
  return (
    <div className="space-y-4">
      {reports.length === 0 ? (
        <div className="text-center py-6">
          <p className="text-muted-foreground">No reports found</p>
        </div>
      ) : (
        reports.map((report) => (
          <ReportCard key={report.id} report={report} />
        ))
      )}
    </div>
  );
};

export default ReportsList;
