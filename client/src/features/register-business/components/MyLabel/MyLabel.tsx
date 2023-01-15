import { classNames } from 'src/utils/tailwind';

interface MyLabelProps {
  className?: string;
  name: string;
  sublabel: string;
}

function MyLabel({ className = '', name, sublabel }: MyLabelProps) {
  return (
    <div className={classNames(className, 'mb-5')}>
      <label
        htmlFor={name}
        className="mb-2 inline-block text-lg font-medium capitalize"
      >
        {name}
      </label>
      <span className="block text-gray-500">{sublabel}</span>
    </div>
  );
}

export default MyLabel;
