'use client';

import type { TextFieldProps } from '@mui/material';
import { FormHelperText, TextField } from '@mui/material';
import type {
  Control,
  FieldError,
  FieldPath,
  FieldValues
} from 'react-hook-form';
import { Controller } from 'react-hook-form';

/**
 * code from https://raw.githubusercontent.com/dohomi/react-hook-form-mui
 */
type TextFieldElementProps<T extends FieldValues> = Omit<
  TextFieldProps,
  'name' | 'multiline'
> & {
  name: FieldPath<T>;
  parseError?: (error: FieldError) => string;
  control?: Control<T>;
  mask?: (
    ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  /**
   * will set multiline=true, fullWidth=true, minRows=4 and inputProps={maxLength}
   */
  maxLengthMultiline?: number;
};

const defaultMaxLengthProps = (maxLength: number) => ({
  minRows: 4,
  multiline: true,
  fullWidth: true,
  inputProps: { maxLength }
});

export function TextFieldElement<TFieldValues extends FieldValues>({
  parseError,
  type,
  required,
  name,
  control,
  mask,
  maxLengthMultiline,
  ...rest
}: TextFieldElementProps<TFieldValues>): JSX.Element {
  const maxLengthProps = maxLengthMultiline
    ? defaultMaxLengthProps(maxLengthMultiline)
    : {};
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { error }
      }) => (
        <>
          <TextField
            {...maxLengthProps}
            {...rest}
            name={name}
            value={value ?? ''}
            onChange={(ev: any) => {
              onChange(mask ? mask(ev) : ev);
              if (typeof rest.onChange === 'function') {
                rest.onChange(ev);
              }
            }}
            onBlur={onBlur}
            required={required}
            type={type}
            error={!!error?.message}
            helperText={
              error
                ? typeof parseError === 'function'
                  ? parseError(error)
                  : error.message
                : rest.helperText
            }
            defaultValue="87600000"
          />
          {maxLengthMultiline && !rest.disabled ? (
            <FormHelperText sx={{ textAlign: 'right' }}>{`${
              value?.length ?? 0
            }/${maxLengthMultiline}`}</FormHelperText>
          ) : null}
        </>
      )}
    />
  );
}
