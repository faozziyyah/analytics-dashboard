import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuthStore } from '../../stores/authStore';
import Button from '../ui/Button';
import logo from '../../assets/logo.png'
import search from '../../assets/search.png'
import Image from 'next/image';
import line from '../../assets/line.png'
import more from '../../assets/more.png'
import notification from '../../assets/notification.png'
import profile from '../../assets/wrapper.png'
import tab from '../../assets/tab.png'
import user from '../../assets/user.png'
import logout1 from '../../assets/logout.png'
import { useState, useRef, useEffect } from "react";

export default function Header() {

    const router = useRouter();
    const logout = useAuthStore((s) => s.logout);
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    function handleLogout() {
        fetch('/api/auth/logout', { method: 'POST' }).finally(() => {
        logout();
        router.push('/login');
    });
    }

    useEffect(() => {
      function handleClickOutside(event: MouseEvent) {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
          setOpen(false);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
    <div className='flex flex-col'>

        <header className="flex items-center justify-between p-4 bg-white border-b">

            <Image src={logo} alt='' />

            <div className='flex items-center bg-[#FCFCFD] border rounded-sm py-[6px] px-[8px]'>

                <Image src={search} alt='' />

                <input placeholder='Search for anything' className='bg-[#FCFCFD] border-none outline-none ml-2' />

            </div>

            <div className="flex justify-between items-center gap-4 font-semibold text-sm">

                <Link href="/dashboard" className="text-[#1659E6] bg-[#E8EEFD] rounded-sm py-[2px] px-[8px]">
                  Home
                </Link>

                <Link href="" className="text-[#808080]">
                  Workbench
                </Link>

                <Link href="" className="text-[#808080]">
                  Ticket
                </Link>

                <Link href="" className="text-[#808080]">
                  Service Categories
                </Link>

                <Link href="" className="text-[#808080]">
                  Knowledge Management
                </Link>

                <Link href="" className="text-[#808080]">
                  Admin Settings
                </Link>

            </div>
            
            <div className="flex justify-between items-center gap-6">

                <Image src={line} alt='' />
                <Image src={notification} alt='' />
                <Image src={more} alt='' />

                <div className="relative" ref={dropdownRef}>

                    <Image src={profile} alt="profile" width={36} height={36}
                      className="rounded-full cursor-pointer border"
                      onClick={() => setOpen((prev) => !prev)}
                    />

                    {open && (
                      <div className="absolute right-0 mt-3 w-56 bg-white border rounded-lg shadow-lg p-4 z-50">

                        <div className="flex items-center gap-3 mb-3">

                          <Image src={profile} alt="User profile"
                            width={40} height={40} className="rounded-full"
                          />

                          <div>
                            <p className="font-medium text-gray-800">Daniel Joseph</p>
                            <p className="text-xs text-gray-500">daniel.joseph@example.com</p>
                          </div>

                        </div>
                    
                        <div className="border-t my-2"></div>
                    
                        <button onClick={() => router.push("/profile")}
                          className="w-full flex items-center px-2 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                        >
                          <Image src={user} alt='' /> 
                          <p className='ml-4'>Profile</p>
                        </button>
                    
                        <Button onClick={handleLogout} variant="ghost"
                          className="w-full flex items-center px-2 py-2 mt-1 hover:bg-gray-100"
                        >
                            <Image src={logout1} alt='' />
                          <p className='ml-4'>Logout</p>
                        </Button>
                      </div>
                    )}
        </div>

            </div>

        </header>

        <section className='flex items-center justify-between py-2 px-4 bg-[#1659E6]'>
            <Image src={tab} alt='' />
        </section>

    </div>
    );
}