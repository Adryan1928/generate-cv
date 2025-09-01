import { LeftBar } from './components/LeftBar'
import { useForm, SubmitHandler } from 'react-hook-form'
import { CV } from './services/cv'
import { MdAlternateEmail } from "react-icons/md";
import { FaLinkedin } from "react-icons/fa6";
import { FaPhoneSquareAlt } from "react-icons/fa";
import * as Yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';


const schema: Yup.ObjectSchema<CV> = Yup.object().shape({
  name: Yup.string().required("Nome é obrigatório").min(2, "Nome muito curto").max(100, "Nome muito longo"),
  email: Yup.string().required("Email é obrigatório").email("Email inválido"),
  phone: Yup.string().required("Telefone é obrigatório").min(10, "Telefone muito curto").max(15, "Telefone muito longo"),
  linkedin: Yup.string().required("LinkedIn é obrigatório"),
  // .url("URL inválida")
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
      jobTitle: Yup.string().required("Cargo é obrigatório").min(2).max(100),
      institution: Yup.string().required("Instituição é obrigatória").min(2).max(100),
      year: Yup.number()
        .required("Ano é obrigatório")
        .min(1900, "Ano mínimo é 1900")
        .max(new Date().getFullYear(), "Ano não pode ser no futuro"),
    })
  ),
});


function App() {

  const {control, handleSubmit, watch} = useForm<CV>({
    resolver: yupResolver(schema),
    mode: "onSubmit",
  })

  const onSubmit: SubmitHandler<CV> = (data) => {
    console.log("Dados do formulário:", data)
    alert(`Olá, ${data.name}, seu email é ${data.email}`)
  }

  return (
    <main className='flex flex-row'>
      <LeftBar
        control={control}
        onSubmit={handleSubmit(onSubmit)}
      />
      <section className='flex flex-row w-3/4'>
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
              className='text-sm text-neutral-700 mt-4 indent-4 text-justify'
            >
              {watch("resume")}
            </p>
          </article>

          <hr className='my-4 border-neutral-400'/>

          <article className='w-full'>
            <div>
            </div>
          </article>
        </section>
        <aside className='w-1/4 bg-slate-700 p-8'>
          <h2 className='text-xl text-neutral-50'>Habilidades</h2>
        </aside>
      </section>
    </main>
  )
}

export default App
