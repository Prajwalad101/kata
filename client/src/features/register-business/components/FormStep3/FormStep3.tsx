import { businessCategories } from '@destiny/common/types/business/BusinessCategory';
import { FieldLayout } from '@features/register-business/layouts';
import { FormInputs } from '@features/register-business/layouts/FormContainer';
import { Control, Controller, useFormState, useWatch } from 'react-hook-form';
import CustomSelect from 'src/components/CustomSelect/CustomSelect';
import { classNames } from 'src/utils/tailwind';
import capitalizeWord from 'src/utils/text/capitalizeWord';
import MyLabel from '../MyLabel/MyLabel';

interface FormStep3Props {
  control: Control<FormInputs>;
  className?: string;
}

export default function FormStep3({ control, className = '' }: FormStep3Props) {
  const categoryOptions = businessCategories.map((category) => ({
    label: capitalizeWord(category.name),
    value: category.name,
  }));

  const selectedCategoryValue = useWatch({ control, name: 'category' });

  const selectedCategory = businessCategories.find(
    (option) => option.name === selectedCategoryValue
  );

  const subcategoryOptions = selectedCategory?.subcategories.map(
    (subcategory) => ({
      label: capitalizeWord(subcategory),
      value: subcategory,
    })
  );

  const featureOptions = selectedCategory?.features.map((feature) => ({
    label: capitalizeWord(feature),
    value: feature,
  }));

  const { errors } = useFormState({ control });

  return (
    <div className={classNames(className)}>
      {/* Select Business Category */}
      <FieldLayout>
        <MyLabel name="category" sublabel="Please select a category" />
        <Controller
          control={control}
          name="category"
          render={({ field: { value, onChange } }) => (
            <CustomSelect
              placeholder="Select a category"
              options={categoryOptions}
              value={categoryOptions.find((option) => option.value === value)}
              onChange={(selected) => onChange(selected?.value)}
              error={errors.category}
            />
          )}
        />
      </FieldLayout>
      {/* Select Business Subcategory */}
      <FieldLayout>
        <MyLabel name="subcategory" sublabel="Please select an subcategory" />
        <Controller
          control={control}
          name="subcategory"
          render={({ field: { value, onChange } }) => (
            <CustomSelect
              placeholder="Select a subcategory"
              options={subcategoryOptions}
              value={subcategoryOptions?.find(
                (option) => option.value === value
              )}
              onChange={(selected) => onChange(selected?.value)}
              error={errors.subcategory}
            />
          )}
        />
      </FieldLayout>
      {/* Select business feature */}
      <FieldLayout>
        <MyLabel name="features" sublabel="Please select some features" />
        <Controller
          control={control}
          name="features"
          render={({ field: { value, onChange } }) => (
            <CustomSelect
              placeholder="Select features"
              options={featureOptions}
              value={featureOptions?.filter((option) =>
                value?.includes(option.value)
              )}
              onChange={(selected) => {
                const selectedValues = selected.map(({ value }) => value);
                onChange(selectedValues);
              }}
              error={errors.features && errors.features[0]}
              isMulti
            />
          )}
        />
      </FieldLayout>
    </div>
  );
}
