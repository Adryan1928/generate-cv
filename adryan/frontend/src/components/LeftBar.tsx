import { Control, useFieldArray, UseFormWatch } from "react-hook-form"
import { CV, Experience, Skill } from "../services/cv"
import { TextInputField } from "./Form/TextInputField";
import { TextAreaField } from "./Form/TextAreaField";
import { TiPlus } from "react-icons/ti";
import { ModalSkillForm } from "./ModalSkillForm";
import { SkillBar } from "./SkillBar";
import { useState } from "react";
import { ModalExperienceForm } from "./ModalExperienceForm";
import { ExportButton } from "./Preview/ExportButton";
import React from "react";

interface LeftBarProps {
  control: Control<CV, undefined, CV>;
  onSubmit: () => void;
  onGenerateResume: () => void; 
  isGenerating: boolean;
  watch: UseFormWatch<CV>;
  cvRef: React.RefObject<HTMLElement | null>;
  setCvCode: (query: string) => void;
}

export interface SelectedSkillProps extends Skill {
  index: number;
}

export interface SelectedExperienceProps extends Experience {
  index: number;
}

export function LeftBar({
  control,
  onSubmit,
  onGenerateResume,
  isGenerating,
  watch,
  cvRef,
  setCvCode
}: LeftBarProps){

    const [openSkillModal, setOpenSkillModal] = useState(false);
    const [selectedSkill, setSelectedSkill] = useState<SelectedSkillProps | null>(null);
    const [selectedExperience, setSelectedExperience] = useState<SelectedExperienceProps | null>(null);
    const [openExperienceModal, setOpenExperienceModal] = useState(false);

    const { fields: skills, append: appendSkill, remove: removeSkill, update: updateSkill } = useFieldArray({
        control,
        name: "skills"
    })

    const { fields: experience, append: appendExperience, remove: removeExperience, update: updateExperience } = useFieldArray({
        control,
        name: "experience"
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
                
                <button 
                    type="button" 
                    onClick={onGenerateResume} 
                    disabled={isGenerating}
                    className="w-full mt-2 p-2 bg-slate-800 text-white rounded-md hover:bg-slate-700 disabled:bg-slate-800 disabled:cursor-wait transition-colors cursor-pointer"
                >
                    {isGenerating ? 'Gerando...' : 'Gerar Resumo com IA'}
                </button>
                </div>
                <div className="flex flex-col gap-6">
                    <h2 className="text-2xl">Habilidades</h2>

                    <ul className="flex flex-col gap-2">
                        {skills.map((skill, index) => (
                            <li key={skill.id} className="flex justify-between items-center">
                                <div className="flex gap-4 cursor-pointer" onClick={() => {setSelectedSkill({index, ...skill});setOpenSkillModal(true);}}>
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

                    <div
                        className="flex self-end border rounded-full border-green-400 p-1 hover:bg-green-400/10 transition-colors cursor-pointer"
                        onClick={() => setOpenSkillModal(true)}
                    >
                        <TiPlus className="text-green-400" />
                    </div>

                    <ModalSkillForm
                        onAddSkill={appendSkill}
                        open={openSkillModal}
                        setOpen={setOpenSkillModal}
                        updateSkill={updateSkill}
                        selectedSkill={selectedSkill}
                        setSelectedSkill={setSelectedSkill}
                    />
                </div>
                <div className="flex flex-col gap-6">
                    <h2 className="text-2xl">Experiências</h2>

                    <ul className="flex flex-col gap-2">
                        {experience.map((exp, index) => (
                            <li key={exp.id} className="flex justify-between items-center">
                                <div className="flex flex-col cursor-pointer border-1 border-neutral-50 p-2 rounded w-3/4" onClick={() => {setSelectedExperience({index, ...exp});setOpenExperienceModal(true);}}>
                                    <div className="flex ">
                                        <span>{exp.company} - {exp.position}</span>
                                        
                                    </div>
                                    <div>
                                        <span className="text-xs text-neutral-300">{exp.initial_date?.toLocaleDateString()} - {exp.is_active ? "Atual" : exp.final_date?.toLocaleDateString()}</span>
                                    </div>
                                    <div>
                                        <span className="text-sm">{exp.description}</span>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => removeExperience(index)}
                                    className="text-red-500 hover:text-red-400 cursor-pointer"
                                >
                                    Remover
                                </button>
                            </li>
                        ))}
                    </ul>

                    <div
                        className="flex self-end border rounded-full border-green-400 p-1 hover:bg-green-400/10 transition-colors cursor-pointer"
                        onClick={() => setOpenExperienceModal(true)}
                    >
                        <TiPlus className="text-green-400" />
                    </div>

                    <ModalExperienceForm
                        onAddExperience={appendExperience}
                        open={openExperienceModal}
                        setOpen={setOpenExperienceModal}
                        updateExperience={updateExperience}
                        selectedExperience={selectedExperience}
                        setSelectedExperience={setSelectedExperience}
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <TextInputField
                        label="Código"
                        name="code"
                        control={control}
                    />
                    <div className="flex flex-col justify-center items-end">
                    <button type="button" onClick={() => setCvCode(watch("code"))} className="border-sky-800 border px-2 py-1 text-white rounded hover:bg-sky-800 transition-colors cursor-pointer mt-2">
                        Load
                    </button>
                </div>
                </div>
                
                <div className="flex justify-between">
                    <ExportButton name={watch("name")} cvRef={cvRef} />
                    <input type="submit" value="Salvar" className="bg-sky-800 text-white rounded px-4 py-2 hover:bg-sky-700 transition-colors cursor-pointer" />
                </div>
            </form>
        </section>
    )
}