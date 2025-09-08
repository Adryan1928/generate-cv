import { useState } from "react";

export function PhotoUpload() {
  const [image, setImage] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      {image ? (
        <img
          src={image}
          alt="Foto de perfil"
          className="w-24 h-24 rounded-full object-cover border border-neutral-400"
        />
      ) : (
        <div className="w-24 h-24 rounded-full border border-dashed border-neutral-500 flex items-center justify-center text-sm text-neutral-400">
          Sem foto
        </div>
      )}
      <input type="file" accept="image/*" onChange={handleFileChange} />
    </div>
  );
}
