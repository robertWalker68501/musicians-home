"use client";

import * as React from "react";
import { FileIcon, ImageIcon, XIcon } from "lucide-react";
import {
  type Control,
  type ControllerFieldState,
  type ControllerRenderProps,
  type FieldPath,
  type FieldValues,
  Controller,
} from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export type DeferredFileUploadFieldProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> = {
  control: Control<TFieldValues>;
  name: TName;
  label: string;
  description?: string;
  disabled?: boolean;
  className?: string;
  /** Passed to the hidden file input, e.g. `"image/*"` or `".pdf,image/*"`. */
  accept?: string;
  /** Choose-file button label. */
  chooseFileLabel?: string;
};

function isImageFile(file: File) {
  return file.type.startsWith("image/");
}

type InnerProps<TFieldValues extends FieldValues> = {
  field: ControllerRenderProps<TFieldValues, FieldPath<TFieldValues>>;
  fieldState: ControllerFieldState;
  label: string;
  description?: string;
  disabled?: boolean;
  className?: string;
  accept?: string;
  chooseFileLabel: string;
};

function DeferredFileUploadFieldInner<TFieldValues extends FieldValues>({
  field,
  fieldState,
  label,
  description,
  disabled,
  className,
  accept,
  chooseFileLabel,
}: InnerProps<TFieldValues>) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const previewObjectUrlRef = React.useRef<string | null>(null);
  const file = field.value as File | undefined;
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (previewObjectUrlRef.current) {
      URL.revokeObjectURL(previewObjectUrlRef.current);
      previewObjectUrlRef.current = null;
    }
    if (file && isImageFile(file)) {
      const url = URL.createObjectURL(file);
      previewObjectUrlRef.current = url;
      setPreviewUrl(url);
    } else {
      setPreviewUrl(null);
    }
    return () => {
      if (previewObjectUrlRef.current) {
        URL.revokeObjectURL(previewObjectUrlRef.current);
        previewObjectUrlRef.current = null;
      }
    };
  }, [file]);

  const clear = () => {
    field.onChange(undefined);
    if (inputRef.current) inputRef.current.value = "";
    if (previewObjectUrlRef.current) {
      URL.revokeObjectURL(previewObjectUrlRef.current);
      previewObjectUrlRef.current = null;
    }
    setPreviewUrl(null);
  };

  return (
    <Field
      data-invalid={fieldState.invalid}
      className={cn("gap-3", className)}
    >
      <FieldLabel>{label}</FieldLabel>
      <FieldContent className="gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <Input
            ref={inputRef}
            type="file"
            accept={accept}
            disabled={disabled}
            className="sr-only"
            onChange={(e) => {
              const next = e.target.files?.[0];
              field.onChange(next ?? undefined);
              field.onBlur();
            }}
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={disabled}
            onClick={() => inputRef.current?.click()}
          >
            {chooseFileLabel}
          </Button>
          {file ? (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              disabled={disabled}
              onClick={clear}
              className="text-muted-foreground"
            >
              <XIcon className="size-4" />
              Remove
            </Button>
          ) : null}
        </div>

        {file ? (
          <div className="overflow-hidden rounded-xl border border-border/80 bg-muted/20">
            {previewUrl ? (
              // eslint-disable-next-line @next/next/no-img-element -- local blob preview before upload
              <img
                src={previewUrl}
                alt=""
                className="max-h-56 w-full object-contain"
              />
            ) : (
              <div className="flex items-center gap-3 px-4 py-6">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-muted">
                  <FileIcon className="size-6 text-muted-foreground" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium text-foreground text-sm">
                    {file.name}
                  </p>
                  <p className="text-muted-foreground text-xs">
                    {(file.size / 1024).toFixed(1)} KB — preview not available
                    for this type
                  </p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex min-h-28 flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border/80 bg-muted/10 px-4 py-6 text-center">
            <ImageIcon className="size-8 text-muted-foreground opacity-60" />
            <p className="text-muted-foreground text-sm">
              No file selected. Choose a file; it uploads when you submit the
              form.
            </p>
          </div>
        )}

        {description ? (
          <FieldDescription>{description}</FieldDescription>
        ) : null}
        <FieldError errors={[fieldState.error]} />
      </FieldContent>
    </Field>
  );
}

export function DeferredFileUploadField<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>({
  control,
  name,
  label,
  description,
  disabled,
  className,
  accept,
  chooseFileLabel = "Choose file",
}: DeferredFileUploadFieldProps<TFieldValues, TName>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <DeferredFileUploadFieldInner<TFieldValues>
          field={field}
          fieldState={fieldState}
          label={label}
          description={description}
          disabled={disabled}
          className={className}
          accept={accept}
          chooseFileLabel={chooseFileLabel}
        />
      )}
    />
  );
}
