import { FieldError } from 'react-hook-form';
import Select, { GroupBase, Props } from 'react-select';

interface CustomProps {
  error?: FieldError | undefined;
}

export default function CustomSelect<
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>(props: Props<Option, IsMulti, Group> & CustomProps) {
  const { error, ...customProps } = { ...props };

  return (
    <Select
      {...customProps}
      styles={{
        control: (baseStyles, state) => ({
          ...baseStyles,
          borderColor: state.isFocused
            ? error?.message
              ? 'rgb(239 68 68)'
              : 'rgb(59 130 246)'
            : 'white',
          borderWidth: '2px',
          boxShadow: 'none',
          '&:hover': {
            borderColor: 'none',
          },
          borderRadius: '10px',
          padding: '12px 0 12px 5px',
          backgroundColor: 'rgb(243 244 246)',
        }),
      }}
    />
  );
}
