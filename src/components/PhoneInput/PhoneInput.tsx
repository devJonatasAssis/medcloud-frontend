'use client';

import React from 'react';
import { maskPhone } from '@/utils';
import type { TextFieldProps } from '@mui/material';
import type { Control, FieldPath, FieldValues } from 'react-hook-form';

import { TextFieldElement } from '../TextFieldElement';

const LANDLINE_NUMBER_LENGTH = 14;
const MOBILE_NUMBER_LENGTH = 15;

function maskPhoneInput(
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
) {
  e.target.value = maskPhone(e.target.value);
  return e;
}

type Props<T extends FieldValues> = Omit<TextFieldProps, 'name'> & {
  name: FieldPath<T>;
  control: any;
  phoneType: 'landlineNumber' | 'mobileNumber';
  defaultValue?: string;
};

export function PhoneInput<TFieldValues extends FieldValues>({
  phoneType,
  defaultValue,
  ...rest
}: Props<TFieldValues>): JSX.Element {
  const maxLength =
    phoneType === 'landlineNumber'
      ? LANDLINE_NUMBER_LENGTH
      : MOBILE_NUMBER_LENGTH;
  return (
    <TextFieldElement
      {...rest}
      mask={(ev) => maskPhoneInput(ev)}
      inputProps={{
        maxLength,
        defaultValue,
      }}
    />
  );
}
