import {
  Zap,
  Palette,
  Rocket,
  Star,
  Smile,
  Mail,
  Phone,
  Linkedin,
  Github,
  ArrowUpRight,
  Moon,
  Sun,
  Menu,
  X,
  Download,
  MapPin,
  GraduationCap,
  Award,
  type LucideIcon,
} from "lucide-react";
import type { IconName } from "./types";

export const iconMap: Record<IconName, LucideIcon> = {
  Zap,
  Palette,
  Rocket,
  Star,
  Smile,
  Mail,
  Phone,
  Linkedin,
  Github,
  ArrowUpRight,
  Moon,
  Sun,
  Menu,
  X,
  Download,
  MapPin,
  GraduationCap,
  Award,
};

export function getIcon(name: IconName): LucideIcon {
  return iconMap[name];
}
