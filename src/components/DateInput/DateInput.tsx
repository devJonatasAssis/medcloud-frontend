'use client';

import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ptBR } from 'date-fns/locale';
import {
  Controller,
  type Control,
  type FieldError,
  type FieldPath,
  type FieldValues,
  type Path,
  type PathValue,
} from 'react-hook-form';

interface Props<T extends FieldValues> {
  name: FieldPath<T>;
  label: string;
  control: Control<T>;
  variant?: 'standard' | 'filled' | 'outlined';
  fontSize?: number;
  disabled?: boolean;
  onBlur?: () => void;
  maxDate?: Date;
  minDate?: Date;
  size?: 'small' | 'medium';
  defaultValue?: PathValue<T, Path<T>> | undefined;
  error?: any;
}

export function DateInput<T extends FieldValues>({
  name,
  control,
  label,
  variant = 'filled',
  fontSize,
  disabled = false,
  onBlur = () => null,
  size = 'small',
  // @ts-expect-error validate if is necessary
  defaultValue = '',
  error,
  ...dateProps
}: Props<T>) {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={null as never}
      render={({ field }) => {
        return (
          <LocalizationProvider
            dateAdapter={AdapterDateFns}
            adapterLocale={ptBR}
          >
            <DatePicker
              {...dateProps}
              disabled={disabled}
              value={field.value ? new Date(field.value) : null}
              onChange={(e: any) => field.onChange(e)}
              slotProps={{
                textField: {
                  error: !!error,
                  helperText: error?.message,
                  fullWidth: true,
                  label: label,
                  variant: variant,
                  onBlur,
                },
              }}
            />
          </LocalizationProvider>
        );
      }}
    />
  );
}
