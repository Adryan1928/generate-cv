import { useEffect, useState } from "react";

export function ThemeSwitcher() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  return (
    <button
      onClick={() => setDark(!dark)}
      className="px-3 py-1 rounded bg-neutral-800 text-white hover:bg-neutral-700"
    >
      {dark ? "🌞 Modo Claro" : "🌙 Modo Escuro"}
    </button>
  );
}
