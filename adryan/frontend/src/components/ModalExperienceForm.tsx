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
