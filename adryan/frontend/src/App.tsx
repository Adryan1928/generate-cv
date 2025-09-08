import { LeftBar } from './components/LeftBar'
import { useForm, SubmitHandler } from 'react-hook-form'
import { CV } from './services/cv'
import { MdAlternateEmail } from "react-icons/md";
import { FaLinkedin } from "react-icons/fa6";
import { FaPhoneSquareAlt } from "react-icons/fa";
import * as Yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { SkillBar } from './components/SkillBar';
import { ThemeSwitcher } from "./components/Form/ThemeSwitcher";  // <-- import novo


// Schema de validação com Yup
const schema: Yup.ObjectSchema<CV> = Yup.object().shape({
  name: Yup.string().required("Nome é obrigatório").min(2, "Nome muito curto").max(100, "Nome muito longo"),
  email: Yup.string().required("Email é obrigatório").email("Email inválido"),
  phone: Yup.string().required("Telefone é obrigatório").min(10, "Telefone muito curto").max(15, "Telefone muito longo"),
  linkedin: Yup.string().required("LinkedIn é obrigatório"),
  resume: Yup.string().required("Resumo é obrigatório").max(300, "Resumo muito longo"),

  skills: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required("Nome da skill é obrigatório").min(2, "Nome muito curto").max(50, "Nome muito longo"),
      level: Yup.number()
        .required("Nível é obrigatório")
        .min(1, "Mínimo é 1")
        .max(5, "Máximo é 5"),
    })
  ),

  experience: Yup.array().of(
    Yup.object().shape({
      company: Yup.string().required("Empresa é obrigatória").min(2).max(100),
      position: Yup.string().required("Cargo é obrigatório").min(2).max(100),
      initialDate: Yup.date()
        .required("Data de início é obrigatória")
        .min(new Date(1900, 0, 1), "Data mínima é 01/01/1900")
        .max(new Date(), "Data não pode ser no futuro"),
      finalDate: Yup.date()
        .nullable()
        .min(Yup.ref("initialDate"), "Data final não pode ser anterior à data de início")
        .max(new Date(), "Data não pode ser no futuro"),
      isActive: Yup.boolean().required("Status é obrigatório"),
      description: Yup.string().required("Descrição é obrigatória").max(300, "Descrição muito longa"),
    })
  ),
});


function App() {

  const { control, handleSubmit, watch } = useForm<CV>({
    resolver: yupResolver(schema),
    mode: "onSubmit",
    defaultValues: {
      skills: [],
      experience: [],
    },
  })

  const onSubmit: SubmitHandler<CV> = (data) => {
    console.log("Dados do formulário:", data)
    alert(`Olá, ${data.name}, seu email é ${data.email}`)
  }

  return (
    <div className="min-h-screen bg-white text-black dark:bg-neutral-900 dark:text-white transition-colors">
      {/* Botão do ThemeSwitcher no topo */}
      <div className="flex justify-end p-4">
        <ThemeSwitcher />
      </div>

      <main className='flex flex-row'>
        <LeftBar
          control={control}
          onSubmit={handleSubmit(onSubmit)}
        />

        <section className='flex flex-row w-3/4'>
          {/* Seção Principal */}
          <section className='flex flex-col w-3/4 p-8'>
            <article cla
