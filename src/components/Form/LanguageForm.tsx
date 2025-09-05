import { useState } from "react";

interface Language {
  name: string;
  level: string;
}

export function LanguageForm({ onAdd }: { onAdd: (lang: Language) => void }) {
  const [name, setName] = useState("");
  const [level, setLevel] = useState("Básico");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({ name, level });
    setName("");
    setLevel("Básico");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <input
        type="text"
        placeholder="Idioma"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 rounded"
      />
      <select
        value={level}
        onChange={(e) => setLevel(e.target.value)}
        className="border p-2 rounded"
      >
        <option>Básico</option>
        <option>Intermediário</option>
        <option>Avançado</option>
        <option>Fluente</option>
      </select>
      <button type="submit" className="bg-green-500 text-white px-3 py-1 rounded">
        Adicionar
      </button>
    </form>
  );
}
