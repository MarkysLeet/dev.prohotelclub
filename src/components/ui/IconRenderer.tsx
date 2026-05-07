import * as HugeIcons from 'hugeicons-react';

interface IconRendererProps {
  iconName: string;
  size?: number;
  className?: string;
}

export const IconRenderer = ({ iconName, size = 20, className }: IconRendererProps) => {
  const IconComponent = (HugeIcons as Record<string, React.ElementType>)[iconName] || HugeIcons.CircleIcon;
  return <IconComponent size={size} className={className} />;
};
