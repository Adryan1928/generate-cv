import { Control, useFieldArray } from "react-hook-form"
import { CV } from "../services/cv"
import { TextInputField } from "./Form/TextInputField";
import { TextAreaField } from "./Form/TextAreaField";
import { TiPlus } from "react-icons/ti";
import { ModalSkillForm } from "./ModalSkillForm";
import { SkillBar } from "./SkillBar";

interface LeftBarProps {
  control: Control<CV, any, CV>;
  onSubmit: () => void;
}

export function LeftBar({
  control,
  onSubmit
}: LeftBarProps){

    const { fields: skills, append: appendSkill, remove: removeSkill } = useFieldArray({
        control,
        name: "skills"
    })


    return (
        <section className="flex flex-col bg-neutral-900 w-1/4 items-center py-10 px-4 h-screen overflow-auto scrollbar-custom gap-12 text-neutral-50">
            <div>
                <h1 className="text-neutral-50 text-3xl">CV</h1>
            </div>
            <form onSubmit={onSubmit} className="flex flex-col gap-10 w-full">
                <div className="flex flex-col gap-6">
                    <h2 className="text-2xl">Dados Pessoais</h2>
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
                <div className="flex flex-col gap-6">
                    <h2 className="text-2xl">Habilidades</h2>

                    <ul className="flex flex-col gap-2">
                        {skills.map((skill, index) => (
                            <li key={skill.id} className="flex justify-between items-center">
                                <div className="flex gap-4">
                                    <span>{skill.name}</span>
                                    <SkillBar level={skill.level} />
                                </div>
                                <button
                                    type="button"
                                    onClick={() => removeSkill(index)}
                                    className="text-red-500 hover:text-red-400 cursor-pointer"
                                >
                                    Remover
                                </button>
                            </li>
                        ))}
                    </ul>

                    <ModalSkillForm onAddSkill={appendSkill}>
                        <div
                            className="border rounded-full border-green-400 p-1 hover:bg-green-400/10 transition-colors cursor-pointer"
                        >
                            <TiPlus className="text-green-400" />
                        </div>
                    </ModalSkillForm>
                </div>
                <div>
                    <input type="submit" value="Salvar" />
                </div>
            </form>
        </section>
    )
}