
import { Award } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { getBadgeColorClass } from './ForumPost';

const BadgeCriteria = () => {
  return (
    <div className="bg-[#3498DB]/10 rounded-lg p-4 border border-[#3498DB]/20">
      <h3 className="text-lg font-semibold text-[#3498DB] mb-3 flex items-center">
        <Award className="h-5 w-5 mr-2" />
        Badge Achievement Criteria
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-3 bg-white rounded-lg border shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <Badge className={getBadgeColorClass('bronze')}>Bronze</Badge>
          </div>
          <p className="text-xs text-muted-foreground">
            Awarded for reporting 5+ issues or earning 500+ points. Entry level badge for all community members.
          </p>
        </div>
        <div className="p-3 bg-white rounded-lg border shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <Badge className={getBadgeColorClass('silver')}>Silver</Badge>
          </div>
          <p className="text-xs text-muted-foreground">
            Awarded for reporting 15+ issues or earning 1,500+ points. Shows consistent contributions.
          </p>
        </div>
        <div className="p-3 bg-white rounded-lg border shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <Badge className={getBadgeColorClass('gold')}>Gold</Badge>
          </div>
          <p className="text-xs text-muted-foreground">
            Awarded for reporting 25+ issues or earning 3,000+ points. Recognizes dedicated contributors.
          </p>
        </div>
        <div className="p-3 bg-white rounded-lg border shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <Badge className={getBadgeColorClass('platinum')}>Platinum</Badge>
          </div>
          <p className="text-xs text-muted-foreground">
            Awarded for reporting 50+ issues or earning 5,000+ points. Our most prestigious badge for top contributors.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BadgeCriteria;
