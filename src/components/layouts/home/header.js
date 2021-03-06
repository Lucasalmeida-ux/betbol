import Link from 'next/link'
import { useState } from 'react'
import { signIn, signOut, useSession } from 'next-auth/client'
import { useForm } from "react-hook-form"
import { useRouter } from 'next/router'
import { FcSettings } from 'react-icons/fc'

export default function Header(props) {
    let user = ""
    const datetoday = new Date().toISOString()
    if (props.userString) {
        user = JSON.parse(props.userString)
    }
    const [session, loading] = useSession()
    const router = useRouter()
    const pageSoccer = () => {
        if (router.asPath == '/') {
            return true
        }
        return false
    }
    const pageBasket = () => {
        if (router.asPath == '/sports/basket') {
            return true
        }
        return false
    }
    const Profile = () => {
        const [openSettings, setOpenSettings] = useState(false)

        return <>
            {!session && <>
                <div className="block-bgicon-enter items-center flex">
                    <div className={`${btnLogin ? 'hidden md:inline-block' : 'inline-block'}`}>
                        <form onSubmit={handleSubmit(registerUser)} className="absolute md:static z-10 bg-white top-16 right-0">
                            <input {...register('email', { required: true })} type="email" name="email" placeholder="Insira seu E-mail" className="inline-block p-1 border-2 border-gray-200 focus:outline-none focus:border-gray-300 rounded-full" required />
                            <button type="submit" className="btn mt-2 inline-block">Acessar</button>
                        </form>
                    </div>
                    <span className="bgicon-enter cursor-pointer mx-3 md:hidden" onClick={() => setBtnLogin(!btnLogin)}></span>
                </div>
                {/* <div className="relative group inline-block block-bgicon-register">
                    <Link href="/register"><a><span className="bgicon-register cursor-pointer mx-3"></span></a></Link>
                    <div className=" text-gray-600 rounded-md p-1 border bg-gray-100 border-gray-200 top-8 -left-5 absolute hidden group-hover:inline-block">CADASTRAR</div>
                </div> */}
            </>}
            {session && <>
                <div className="fex items-center">

                    <div className="relative group inline-block block-bgicon-soccerball opacity-50 hover:opacity-100">
                        {/* <Link href="/"><a className="flex items-center"><span className={`${pageSoccer() ? `bgicon-soccer-active` : `bgicon-soccer`} cursor-pointer mx-3`}></span> <span className="font-normal text-gray-500 hidden sm:inline-block">FUTEBOL</span></a></Link> */}
                    </div>
                    <div className="relative group inline-block block-bgicon-basketball opacity-50 hover:opacity-100">
                        {/* <Link href="/sports/basket"><a className="flex items-center"><span className={`${pageBasket() ? `bgicon-basket-active` : `bgicon-basket`} cursor-pointer mx-3`}></span> <span className="font-normal text-gray-500 hidden sm:inline-block">BASQUETE</span></a></Link> */}
                    </div>

                    <div className="relative group inline-block block-bgicon-basketball opacity-50 hover:opacity-100 cursor-pointer">
                        <FcSettings className="text-3xl ml-3" onClick={() => setOpenSettings(!openSettings)} />
                        <div className={`${openSettings ? `block` : `hidden`} border-2 border-gray-300 rounded-lg text-right absolute right-0 w-60 z-10 bg-white`} onMouseLeave={() => setOpenSettings(false)} >
                            <div className="p-2 hover:bg-gray-400 font-normal text-gray-800 hover:text-white rounded-t-lg border-b-2 border-gray-300"><Link href="/register">Atualizar Dados</Link></div>
                            <div className="p-2 hover:bg-gray-400 font-normal text-gray-800 hover:text-white rounded-t-lg border-b-2 border-gray-300"><Link href="/myBetsHistory">Historico Apostas</Link></div>
                            <div className="p-2 hover:bg-gray-400 font-normal text-gray-800 hover:text-white rounded-b-lg" onClick={() => signOut()}>Sair</div>
                        </div>
                        {/* <a className="flex items-center" ><span className="bgicon-enter mx-3"></span><span className="font-normal text-gray-500 hidden sm:inline-block">SAIR</span></a> */}
                    </div>

                </div>
            </>}
        </>
    }
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [btnLogin, setBtnLogin] = useState(true)
    const registerUser = async data => {
        await signIn('email', { email: data.email })
    }

    return <>
        <header className="bg-white border-b-2 border-gray-200 h-16 flex items-center justify-between">
            <div id="logo" className="mt-1 ml-10">
                <Link href="/">
                    <a>
                        <img width="100" height="38" src="/logoblack.png" className="hover:opacity-70 cursor-pointer" />
                    </a>
                </Link>
            </div>
            <nav id="menu-principal">

            </nav>
            <div id="profile" className="mr-10">
                <Profile />
            </div>

        </header>
        {session && <>
        <div id="logado" className="py-1 text-sm bg-yellow-200 border-b text-yellow-600 border-yellow-400 flex justify-between px-5">
            <span className="font-normal hidden md:inline-block">{user ? user.email: ""}</span>
            <span>{datetoday}</span>
            <div id="points" className="inline-block h-full items-center">
                <span className="bgicon-coin"></span>
                <span className="ml-2 font-normal">R$ {user ? user.points.toFixed(2) : `0.00`}</span>
            </div>
        </div>
        </>}
    </>
}