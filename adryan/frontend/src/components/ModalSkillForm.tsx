import { useEffect, useState } from "react";
import { SelectedSkillProps } from "./LeftBar";

interface ModalSkillFormProps {
  onAddSkill: (skill: { name: string; level: number }) => void;
  updateSkill: (index: number, skill: { name: string; level: number }) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedSkill?: SelectedSkillProps | null;
  setSelectedSkill: (skill: SelectedSkillProps | null) => void;
}

export function ModalSkillForm({ onAddSkill, open, setOpen, selectedSkill, setSelectedSkill, updateSkill }: ModalSkillFormProps) {
  const [name, setName] = useState('');
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
          <div className="bg-neutral-900 p-6 rounded-lg shadow-lg w-1/4 flex flex-col gap-4">
            <h2 className="text-xl">Adicionar Habilidade</h2>
            <input
              type="text"
              placeholder="Nome da skill"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border-1 border-neutral-800 p-2 rounded-lg w-full placeholder:text-neutral-400 focus:outline-1 outline-neutral-50"
            />
            <input
              type="number"
              min={1}
              max={5}
              value={level}
              onChange={(e) => setLevel(Number(e.target.value))}
              className="border-1 border-neutral-800 p-2 rounded-lg w-full placeholder:text-neutral-400 focus:outline-1 outline-neutral-50"
            />
            <div className="flex justify-end gap-2">
              <button onClick={resetForm} className="px-3 py-1 text-red-500 hover:text-red-400 cursor-pointer">
                Cancelar
              </button>
              <button
                onClick={handleAdd}
                className="bg-green-500 text-white px-3 py-1 rounded cursor-pointer hover:bg-green-400"
              >
                {selectedSkill ? "Salvar" : "Adicionar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
