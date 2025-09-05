import { useState } from "react";

interface Education {
  institution: string;
  degree: string;
  year: string;
}

export function EducationForm({ onAdd }: { onAdd: (edu: Education) => void }) {
  const [institution, setInstitution] = useState("");
  const [degree, setDegree] = useState("");
  const [year, setYear] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({ institution, degree, year });
    setInstitution("");
    setDegree("");
    setYear("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <input
        type="text"
        placeholder="Instituição"
        value={institution}
        onChange={(e) => setInstitution(e.target.value)}
        className="border p-2 rounded"
      />
      <input
        type="text"
        placeholder="Curso"
        value={degree}
        onChange={(e) => setDegree(e.target.value)}
        className="border p-2 rounded"
      />
      <input
        type="text"
        placeholder="Ano de conclusão"
        value={year}
        onChange={(e) => setYear(e.target.value)}
        className="border p-2 rounded"
      />
      <button type="submit" className="bg-blue-500 text-white px-3 py-1 rounded">
        Adicionar
      </button>
    </form>
  );
}
