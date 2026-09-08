import '@/globals.css';
import Providers from '@/components/Providers';
import { cookies } from 'next/headers';
import domain from '@/helper/backendDomain';
import { User } from '@/helper/types';


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cooki = await cookies();
  const token = cooki.get("jwt_token")?.value ?? '';
  var storeInitials: User = {
    userName: null,
    avatarLink: null,
    role: null,
    token: null,
  }
  try{
    const response = await fetch(`${domain}/auth/userInfo`, {
      method: "GET",
      headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
      },
    })
    if(response.status == 200){
      storeInitials = await response.json();
    }
  }
  catch(err){
    console.log(err);
  }
  
  return (
    <html lang="en">
      <body>
        <Providers storeInitials={storeInitials}>
          {children}
        </Providers>
      </body>
    </html>
  );
}
