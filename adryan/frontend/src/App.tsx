import { LeftBar } from './components/LeftBar'
import { useForm, SubmitHandler } from 'react-hook-form'
import { CV } from './services/cv'
import { MdAlternateEmail } from "react-icons/md";
import { FaLinkedin } from "react-icons/fa6";
import { FaPhoneSquareAlt } from "react-icons/fa";


function App() {

  const {control, handleSubmit, watch} = useForm<CV>()

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
