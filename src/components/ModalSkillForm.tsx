import { useEffect, useState } from "react";
import { SelectedSkillProps } from "./LeftBar";
import { Skill } from "../services/cv";

interface ModalSkillFormProps {
  onAddSkill: (skill: Skill) => void;
  updateSkill: (index: number, skill: Skill) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedSkill?: SelectedSkillProps | null;
  setSelectedSkill: (skill: SelectedSkillProps | null) => void;
}

export function ModalSkillForm({
  onAddSkill,
  open,
  setOpen,
  selectedSkill,
  setSelectedSkill,
  updateSkill,
}: ModalSkillFormProps) {
  const [name, setName] = useState("");
  const [level, setLevel] = useState(1);

  useEffect(() => {
    if (selectedSkill) {
      setName(selectedSkill.name);
      setLevel(selectedSkill.level);
    } else {
      setName("");
      setLevel(1);
    }
  }, [selectedSkill, open]);

  const resetForm = () => {
    setName("");
    setLevel(1);
    setOpen(false);
    setSelectedSkill(null);
  };

  const handleAdd = () => {
    if (selectedSkill) {
      updateSkill(selectedSkill.index, { name, level });
    } else {
      onAddSkill({ name, level });
    }
    resetForm();
  };

  return (
    <>
      {open && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="bg-white dark:bg-neutral-900 p-6 rounded-lg shadow-lg w-1/4 flex flex-col gap-4 transition-colors">
            <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-50">
              {selectedSkill ? "Editar Habilidade" : "Adicionar Habilidade"}
            </h2>
            <input
              type="text"
              placeholder="Nome da skill"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 p-2 rounded-lg w-full placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-green-400"
            />
            <input
              type="number"
              min={1}
              max={5}
              value={level}
              onChange={(e) => setLevel(Number(e.target.value))}
              className="border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 p-2 rounded-lg w-full placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-green-400"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={reset
