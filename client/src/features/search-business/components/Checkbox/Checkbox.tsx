import { BusinessFeature } from '@destiny/common/types';
import { ChangeEvent } from 'react';
import { classNames } from 'src/utils/tailwind';

interface CheckboxProps {
  feature: string;
  selectedFeatures: string[];
  setSelectedFilters: (_features: string[]) => void;
  className?: string;
}

function Checkbox({
  feature,
  selectedFeatures,
  setSelectedFilters,
  className = '',
}: CheckboxProps) {
  const features = [...selectedFeatures];

  // when checkbox is clicked
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    //* IMP: Only assert if input id for this event is of type BusinessFeature
    const feature = e.target.id as BusinessFeature;

    // when checkbox is checked
    if (e.target.checked && !features.includes(feature)) {
      features.push(feature);
      setSelectedFilters([...features]);
    }

    // when checkbox is unchecked and features exists
    if (!e.target.checked) {
      const index = features.indexOf(feature);
      if (index > -1) {
        // only remove if element is found
        features.splice(index, 1);
      }
      setSelectedFilters([...features]);
    }
  };

  return (
    <div className={classNames(className)}>
      <input
        type="checkbox"
        className="inp-cbx"
        id={feature}
        style={{ display: 'none' }}
        onChange={(e) => handleChange(e)}
        checked={features.includes(feature)}
      />
      <label className="cbx" htmlFor={feature}>
        <span>
          <svg width="12px" height="10px" viewBox="0 0 12 10">
            <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
          </svg>
        </span>
        <span className="capitalize">{feature}</span>
      </label>
    </div>
  );
}

export default Checkbox;
