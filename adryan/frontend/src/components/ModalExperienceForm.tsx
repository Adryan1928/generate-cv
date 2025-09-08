import { useEffect, useState } from "react";
import { Experience } from "../services/cv";
import { SelectedExperienceProps } from "./LeftBar";

interface ModalExperienceFormProps {
  onAddExperience: (experience: Experience) => void;
  updateExperience: (index: number, experience: Experience) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedExperience?: SelectedExperienceProps | null;
  setSelectedExperience: (experience: SelectedExperienceProps | null) => void;
}

export function ModalExperienceForm({
  onAddExperience,
  open,
  setOpen,
  selectedExperience,
  setSelectedExperience,
  updateExperience,
}: ModalExperienceFormProps) {
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [initialDate, setInitialDate] = useState<Date | undefined>(undefined);
  const [finalDate, setFinalDate] = useState<Date | undefined>(undefined);
  const [isActive, setIsActive] = useState(false);
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (selectedExperience) {
      setCompany(selectedExperience.company);
      setPosition(selectedExperience.position);
      setInitialDate(selectedExperience.initialDate);
      setFinalDate(selectedExperience.finalDate);
      setIsActive(selectedExperience.isActive);
      setDescription(selectedExperience.description);
    } else {
      setCompany("");
      setPosition("");
      setInitialDate(undefined);
      setFinalDate(undefined);
      setIsActive(false);
      setDescription("");
    }
  }, [selectedExperience, open]);

  const resetForm = () => {
    setCompany("");
    setPosition("");
    setInitialDate(undefined);
    setFinalDate(undefined);
    setIsActive(false);
    setDescription("");
    setOpen(false);
    setSelectedExperience(null);
  };

  const handleAdd = () => {
    if (selectedExperience) {
      updateExperience(selectedExperience.index, {
        company,
        position,
        initialDate: initialDate!,
        finalDate,
        isActive,
        description,
      });
    } else {
      onAddExperience({
        company,
        position,
        initialDate: initialDate!,
        finalDate,
        isActive,
        description,
      });
    }
    resetForm();
  };

  return (
    <>
      {open && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="bg-white dark:bg-neutral-900 p-6 rounded-lg shadow-lg w-1/4 flex flex-col gap-4 transition-colors">
            <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-50">
              {selectedExperience ? "Editar Experiência" : "Adicionar Experiência"}
            </h2>
            <input
              type="text"
              placeholder="Empresa"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 p-2 rounded-lg w-full placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-green-400"
            />
            <input
              type="text"
              placeholder="Cargo"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              className="border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 p-2 rounded-lg w-full placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-green-400"
            />
            <input
              type="date"
              placeholder="Data de Início"
              value={initialDate?.toISOString().split("T")[0]}
              onChange={(e) => setInitialDate(new Date(e.target.value))}
              className="border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 p-2 rounded-lg w-full placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-green-400"
            />
            {!isActive && (
              <input
                type="date"
                placeholder="Data de Término"
                value={finalDate?.toISOString().split("T")[0]}
                onChange={(e) => setFinalDate(new Date(e.target.value))}
                className="border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 p-2 rounded-lg w-full placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-green-400"
              />
            )}

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
                className="border border-neutral-400 dark:border-neutral-600"
              />
              <label className="text-sm text-neutral-800 dark:text-neutral-200">
                Trabalho Atual?
              </label>
            </div>
            <textarea
              placeholder="Descrição"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 p-2 rounded-lg w-full placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-green-400"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={resetForm}
                className="px-3 py-1 text-red-500 hover:text-red-400 cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={handleAdd}
                className="bg-green-500 text-white px-3 py-1 rounded cursor-pointer hover:bg-green-400"
              >
                {selectedExperience ? "Salvar" : "Adicionar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
