import React from "react";
import { ControllerFieldState } from "react-hook-form";

interface Props {
  label?: string;
  fieldState: ControllerFieldState;
  children: React.ReactNode;
  name: string;
}

export default function FieldWrapper({
  label,
  fieldState,
  children,
  name,
}: Props) {
  const { error } = fieldState;
  const hasError = error !== undefined;

  return (
    <div className="flex flex-col gap-1 w-full">
      {label && <label htmlFor={name}>{label}</label>}

      {children}

      {hasError && (
        <p className="text-red-500">{error?.message}</p>
      )}
    </div>
  );
}
