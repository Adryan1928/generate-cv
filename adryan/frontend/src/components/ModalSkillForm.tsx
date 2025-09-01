import { useState } from "react";

interface ModalSkillFormProps {
  children: React.ReactNode;
  onAddSkill: (skill: { name: string; level: number }) => void;
}

export function ModalSkillForm({ children, onAddSkill }: ModalSkillFormProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [level, setLevel] = useState(1);

  const resetForm = () => {
    setName("");
    setLevel(1);
    setOpen(false);
  };

  const handleAdd = () => {
    onAddSkill({ name, level });
    resetForm();
  };

  return (
    <>
      <div onClick={() => setOpen(true)} className="flex justify-end w-full">{children}</div>

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
                Adicionar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
