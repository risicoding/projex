import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import Providers from './queryProvider';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased h-screen dark">
        <Providers>
          <ClerkProvider
            signInUrl="/login"
            signUpUrl="/signup"
            signInForceRedirectUrl="/select-organization"
            signUpForceRedirectUrl="/select-organization"
            appearance={{
              baseTheme: dark,
            }}
          >
            {children}
          </ClerkProvider>
        </Providers>
      </body>
    </html>
  );
}
