import { classNames } from 'src/utils/tailwind';

interface DividerProps {
  className?: string;
  width?: number;
}

export default function Divider({ className = '', width = 1 }: DividerProps) {
  return (
    <hr
      className={classNames('border-gray-300', className)}
      style={{ borderTopWidth: width }}
    />
  );
}
