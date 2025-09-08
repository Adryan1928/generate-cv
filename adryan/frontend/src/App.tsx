import { LeftBar } from './components/LeftBar'
import { useForm, SubmitHandler } from 'react-hook-form'
import { CV, getCV } from './services/cv'
import { MdAlternateEmail } from "react-icons/md";
import { FaLinkedin } from "react-icons/fa6";
import { FaPhoneSquareAlt } from "react-icons/fa";
import * as Yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { SkillBar } from './components/SkillBar';
import { useGenerateResumeMutation } from './hooks/ia';
import { useEffect, useRef, useState } from 'react';
import { useCreateCVMutation, useGetCVQuery } from './hooks/cv';


const schema: Yup.ObjectSchema<CV> = Yup.object({
  name: Yup.string().required("Nome é obrigatório").min(2, "Nome muito curto").max(100, "Nome muito longo"),
  email: Yup.string().required("Email é obrigatório").email("Email inválido"),
  phone: Yup.string().required("Telefone é obrigatório").min(10, "Telefone muito curto").max(15, "Telefone muito longo"),
  linkedin: Yup.string().required("LinkedIn é obrigatório"),
  // .url("URL inválida")
  resume: Yup.string().required("Resumo é obrigatório").max(300, "Resumo muito longo"),

  skills: Yup.array().of(
    Yup.object({
      name: Yup.string().required("Nome da skill é obrigatório").min(2, "Nome muito curto").max(50, "Nome muito longo"),
      level: Yup.number()
        .required("Nível é obrigatório")
        .min(1, "Mínimo é 1")
        .max(5, "Máximo é 5"),
    })
  ),

  experience: Yup.array().of(
    Yup.object({
      company: Yup.string().required("Empresa é obrigatória").min(2).max(100),
      position: Yup.string().required("Cargo é obrigatório").min(2).max(100),
      initial_date: Yup.date()
        .required("Data de início é obrigatória")
        .min(new Date(1900, 0, 1), "Data mínima é 01/01/1900")
        .max(new Date(), "Data não pode ser no futuro"),
      final_date: Yup.date()
        .nullable()
        .min(Yup.ref("initial_date"), "Data final não pode ser anterior à data de início")
        .max(new Date(), "Data não pode ser no futuro"),
      is_active: Yup.boolean().required("Status é obrigatório"),
      description: Yup.string().required("Descrição é obrigatória").max(300, "Descrição muito longa"),
    })
  ),

  code: Yup.string().required("Código é obrigatório"),
});


function App() {
  const [cvCode, setCvCode] = useState("");
  const cvRef = useRef<HTMLElement>(null);

  const {control, handleSubmit, watch,  getValues, setValue} = useForm<CV>({
    resolver: yupResolver(schema),
    mode: "onSubmit",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      linkedin: "",
      resume: "",
      code: "",
      skills: [],
      experience: [],
    },
  })

  const { data: cvData } = useGetCVQuery(cvCode);

  const generateResumeMutation = useGenerateResumeMutation()
  const createCVMutation = useCreateCVMutation()

  const onSubmit: SubmitHandler<CV> = (data) => {
    createCVMutation.mutate(data, {
      onSuccess: (response) => {
        alert("CV salvo com sucesso!");
      },
      onError: (error) => {
        console.error("Erro ao salvar CV:", error);
        alert("Não foi possível salvar o CV. Tente novamente.");
      }
    });
  }

  const handleGenerateResume = () => {
    const { name, skills, experience } = getValues();
    const skillsText = skills ? skills.map(s => s.name).join(', ') : '';
    const experienceText = experience ? experience.map(exp => `trabalhou como ${exp.position} na empresa ${exp.company}`).join('; ') : '';

    const prompt = `
      Crie um resumo profissional de 3 a 4 frases para um currículo em português, baseado nas seguintes informações:
      - Nome: ${name || 'o profissional'}
      - Habilidades: ${skillsText || 'nenhuma'}
      - Experiência: ${experienceText || 'nenhuma'}

      **Regras Importantes:**
      - Responda APENAS com o parágrafo do resumo.
      - NÃO inclua títulos, saudações, explicações ou qualquer outro texto.
      - O resultado deve ser apenas o texto pronto para ser copiado e colado.
      - Até no máximo 300 caracteres.
    `;

    generateResumeMutation.mutate(prompt, {
      onSuccess: (data) => {
        setValue('resume', data.data.candidates[0].content.parts[0].text.trim(), { shouldValidate: true, shouldDirty: true });
      },
      onError: (error) => {
        console.error("Erro ao gerar resumo:", error);
        alert("Não foi possível gerar o resumo. Tente novamente.");
      }
    })
  };

  useEffect(() => {
    if(cvData) {
      setValue('name', cvData.name);
      setValue('email', cvData.email);
      setValue('phone', cvData.phone);
      setValue('linkedin', cvData.linkedin);
      setValue('resume', cvData.resume);
      setValue('code', cvData.code);
    
      const skills = cvData.skills || [];
      setValue('skills', skills);

      const experience = (cvData.experience || []).map(exp => ({
        ...exp,
        initial_date: new Date(exp.initial_date),
        ...(exp.final_date && { final_date: new Date(exp.final_date) }),
      }));
      setValue('experience', experience);
    }
  }, [cvData, setValue]);

  return (
    <main className='flex flex-row'>
      <LeftBar
        control={control}
        onSubmit={handleSubmit(
          (data) => {
            console.log("Form válido", data);
            onSubmit(data);
          },
          (errors) => {
            console.log("Erros de validação:", errors);
            alert("Existem campos inválidos. Confira os dados do formulário.");
          }
        )}
        onGenerateResume={handleGenerateResume}
        isGenerating={generateResumeMutation.isPending}
        watch={watch}
        cvRef={cvRef}
        setCvCode={setCvCode}
      />
      <section className='flex flex-row w-3/4 print:w-full print:h-screen' id='cv-preview' ref={cvRef}>
        <section className='flex flex-col w-3/4 p-8'>
          <article className='flex flex-col w-full'>
            <h2 className='text-xl'>{watch("name")}</h2>
            <nav className='flex gap-2'>
              {watch("email") &&
                <a
                  href={`mailto:${watch("email")}`}
                  className='flex justify-center items-center gap-0.5 text-sm text-neutral-700'>
                    <MdAlternateEmail />{watch("email")}
                </a>
              }

              {watch("phone") &&
                <a
                  href={`tel:${watch("phone")}`}
                  className='flex justify-center items-center gap-0.5 text-sm text-neutral-700'>
                    <FaPhoneSquareAlt />{watch("phone")}
                </a>
              }

              {watch("linkedin") &&
                <a
                  href={watch("linkedin").startsWith("http") ? watch("linkedin") : `https://linkedin.com/in/${watch("linkedin")}`}
                  className='flex justify-center items-center gap-0.5 text-neutral-700'>
                    <FaLinkedin />{watch("linkedin")}
                </a>
              }
            </nav>
            <p
              className='text-neutral-700 mt-1 indent-4 text-justify'
            >
              {watch("resume")}
            </p>
          </article>

          <hr className='border-neutral-400'/>

          <article className='w-full'>
            <h2 className='text-xl mt-6 mb-2'>Experiência</h2>
            {watch("experience")?.map((exp, index) => (
              <div key={index} className='flex flex-col my-2'>
                <h3 className='text-lg font-semibold'>{exp.position} - {exp.company}</h3>
                <p className='text-xs text-neutral-600'>{exp.initial_date?.toLocaleDateString()} - {exp.is_active ? "Atual" : exp.final_date?.toLocaleDateString()}</p>
                <p className='text-sm'>{exp.description}</p>
              </div>
            ))}
          </article>
        </section>
        <aside className='w-1/4 bg-slate-700 p-8 flex flex-col gap-4'>
          <h2 className='text-xl text-neutral-50'>Habilidades</h2>
          <div className='flex flex-col gap-2'>
            {watch("skills")?.map((skill, index) => (
              <div key={index} className='flex items-center justify-start gap-2'>
                <span className='text-neutral-50 font-semibold'>{skill.name}</span>
                <SkillBar level={skill.level} />
              </div>
            ))}
          </div>
        </aside>
      </section>
    </main>
  )
}

export default App
