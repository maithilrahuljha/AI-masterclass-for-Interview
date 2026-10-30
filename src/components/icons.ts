import {
  Blocks,
  Bot,
  ChartColumn,
  FileText,
  ShieldCheck,
  RadioTower,
  type LucideIcon,
} from "lucide-react";

export const TOPIC_ICONS: Record<string, LucideIcon> = {
  foundations: Blocks,
  "modern-ai": Bot,
  ml: ChartColumn,
  dataeng: FileText,
  mlops: ShieldCheck,
  industry: RadioTower,
};
