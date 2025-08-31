import { Control } from "react-hook-form"
import { CV } from "../services/cv"
import { TextInputField } from "./Form/TextInputField";
import { TextAreaField } from "./Form/TextAreaField";

interface LeftBarProps {
  control: Control<CV, any, CV>;
  onSubmit: () => void;
}

export function LeftBar({
  control,
  onSubmit
}: LeftBarProps){

    return (
        <section className="flex flex-col bg-neutral-900 w-1/4 items-center py-10 px-4 h-screen overflow-auto scrollbar-custom gap-12">
            <div>
                <h1 className="text-neutral-50 text-3xl">CV</h1>
            </div>
            <form onSubmit={onSubmit} className="flex flex-col gap-10 w-full">
                <div className="flex flex-col gap-6">
                    <h2 className="text-neutral-50 text-2xl">Dados Pessoais</h2>
                    <TextInputField
                        label="Nome"
                        name="name"
                        control={control}
                    />
                    <TextInputField
                        label="Email"
                        name="email"
                        control={control}
                    />
                    <TextInputField
                        label="Telefone"
                        name="phone"
                        control={control}
                    />
                    <TextInputField
                        label="Linkedin"
                        name="linkedin"
                        control={control}
                    />
                    <TextAreaField
                        label="Resume"
                        name="resume"
                        control={control}

                    />
                </div>
                <div>
                    <input type="submit" value="Salvar" />
                </div>
            </form>
        </section>
    )
}