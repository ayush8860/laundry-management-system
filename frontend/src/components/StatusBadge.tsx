import { Badge } from "@/components/ui/badge";
import { Clock, Package, Truck, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type LaundryStatus = "pending" | "picked-up" | "in-process" | "delivered";

interface StatusBadgeProps {
  status: LaundryStatus;
  showIcon?: boolean;
  className?: string;
}

const statusConfig = {
  pending: {
    label: "Pending",
    icon: Clock,
    variant: "pending" as const,
  },
  "picked-up": {
    label: "Picked Up",
    icon: Package,
    variant: "in-progress" as const,
  },
  "in-process": {
    label: "In Process",
    icon: Truck,
    variant: "in-progress" as const,
  },
  delivered: {
    label: "Delivered",
    icon: CheckCircle,
    variant: "completed" as const,
  },
};

const StatusBadge = ({ status, showIcon = true, className }: StatusBadgeProps) => {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <Badge 
      variant={config.variant} 
      className={cn("flex items-center gap-1.5", className)}
    >
      {showIcon && <Icon className="h-3 w-3" />}
      {config.label}
    </Badge>
  );
};

export default StatusBadge;