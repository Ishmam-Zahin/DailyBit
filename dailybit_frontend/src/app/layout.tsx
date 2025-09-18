import '@/globals.css';
import Providers from '@/components/Providers';
import { cookies} from 'next/headers';
import domain from '@/helper/backendDomain';


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cooki = await cookies();
  const token = cooki.get("jwt_token")?.value ?? '';
  var storeInitials = {
    userName: null,
    avatar: null,
    token: null,
  }
  const response = await fetch(`${domain}/auth/userInfo`, {
    method: "GET",
    credentials: "include",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    },
  })
  if(response.status == 200){
    storeInitials = await response.json();
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
