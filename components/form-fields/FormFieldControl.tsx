import * as React from 'react';

import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form';

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

export type FormFieldOption = {
  label: string;
  value: string;
};

type BaseFormFieldControlProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> = {
  control: Control<TFieldValues>;
  name: TName;
  label: string;
  placeholder?: string;
  description?: string;
  disabled?: boolean;
  className?: string;
  required?: boolean;
};

type InputFieldProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> = BaseFormFieldControlProps<TFieldValues, TName> & {
  type: 'text' | 'email' | 'password';
  inputMode?: React.HTMLAttributes<HTMLInputElement>['inputMode'];
  autoComplete?: string;
};

type TextareaFieldProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> = BaseFormFieldControlProps<TFieldValues, TName> & {
  type: 'textarea';
  rows?: number;
};

type SelectFieldProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> = BaseFormFieldControlProps<TFieldValues, TName> & {
  type: 'select';
  options: FormFieldOption[];
};

export type FormFieldControlProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> =
  | InputFieldProps<TFieldValues, TName>
  | TextareaFieldProps<TFieldValues, TName>
  | SelectFieldProps<TFieldValues, TName>;

export function FormFieldControl<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>(props: FormFieldControlProps<TFieldValues, TName>) {
  const {
    control,
    name,
    label,
    placeholder,
    description,
    disabled,
    className,
  } = props;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        return (
          <Field
            data-invalid={fieldState.invalid}
            className={className}
          >
            <FieldLabel htmlFor={name}>{label}</FieldLabel>
            <FieldContent>
              {props.type === 'select' ? (
                <Select
                  value={field.value ?? ''}
                  onValueChange={field.onChange}
                  disabled={disabled}
                >
                  <SelectTrigger
                    id={name}
                    aria-invalid={fieldState.invalid}
                  >
                    <SelectValue
                      placeholder={placeholder ?? 'Select an option'}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {props.options.map((option) => (
                      <SelectItem
                        key={option.value}
                        value={option.value}
                      >
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : props.type === 'textarea' ? (
                <Textarea
                  id={name}
                  value={field.value ?? ''}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  name={field.name}
                  ref={field.ref}
                  rows={props.rows ?? 5}
                  placeholder={placeholder}
                  disabled={disabled}
                  aria-invalid={fieldState.invalid}
                />
              ) : (
                <Input
                  id={name}
                  type={props.type}
                  value={field.value ?? ''}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  name={field.name}
                  ref={field.ref}
                  placeholder={placeholder}
                  disabled={disabled}
                  aria-invalid={fieldState.invalid}
                  inputMode={props.inputMode}
                  autoComplete={props.autoComplete}
                />
              )}

              {description ? (
                <FieldDescription>{description}</FieldDescription>
              ) : null}
              <FieldError errors={[fieldState.error]} />
            </FieldContent>
          </Field>
        );
      }}
    />
  );
}
