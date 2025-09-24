import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface StatusBadgeProps {
  status: "healthy" | "warning" | "critical" | "offline";
  children: React.ReactNode;
  className?: string;
}

const StatusBadge = ({ status, children, className }: StatusBadgeProps) => {
  const statusStyles = {
    healthy: "status-success hover:scale-105",
    warning: "status-warning hover:scale-105", 
    critical: "status-critical hover:scale-105 pulse-glow",
    offline: "status-offline hover:scale-105"
  };

  return (
    <Badge 
      className={cn(
        "transition-transform duration-200 font-medium",
        statusStyles[status],
        className
      )}
    >
      {children}
    </Badge>
  );
};

export default StatusBadge;