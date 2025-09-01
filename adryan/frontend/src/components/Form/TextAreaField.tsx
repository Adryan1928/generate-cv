import { Control, useController } from "react-hook-form";
import FieldWrapper from "./FieldWrapper";

interface TextInputProps {
    name: string;
    control: Control<any>;
    disabled?: boolean;
    label?: string;
    placeholder?: string;
}

export function TextAreaField({
    name,
    control,
    label,
    disabled,
    placeholder = "Digite aqui"
}: TextInputProps) {

    const { field, fieldState } = useController({name, control});

    return (
        <FieldWrapper
            fieldState={fieldState}
            label={label}
            name={name}
        >
            <textarea
                id={name}
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                placeholder={placeholder}
                disabled={disabled}
                className="border-1 border-neutral-800 p-2 rounded-lg w-full text-neutral-50 placeholder:text-neutral-400 focus:outline-1 outline-neutral-50"
            />
            <div className="text-neutral-400 text-xs flex justify-end">
                <p>{field.value?.length}/300</p>
            </div>
        </FieldWrapper>
    );
}
