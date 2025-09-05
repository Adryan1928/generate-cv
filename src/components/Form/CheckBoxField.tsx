import { Control, useController } from "react-hook-form";
import FieldWrapper from "./FieldWrapper";

interface CheckBoxFieldProps {
    name: string;
    control: Control<any>;
    disabled?: boolean;
    label?: string;
}

export function CheckBoxField({
    name,
    control,
    label,
    disabled,
}: CheckBoxFieldProps) {

    const { field, fieldState } = useController({name, control});

    return (
        <FieldWrapper
            fieldState={fieldState}
            label={label}
            name={name}
        >
            <input
                id={name}
                type="checkbox"
                checked={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                disabled={disabled}
                className="border-1 border-neutral-800 p-2 rounded-lg w-full placeholder:text-neutral-400 focus:outline-1 outline-neutral-50"
            />
        </FieldWrapper>
    );
}
