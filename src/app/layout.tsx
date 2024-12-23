import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import Providers from './queryProvider'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased h-screen dark">
        <Providers>
          <ClerkProvider
            appearance={{
              baseTheme: dark,
            }}
          >
            {children}
          </ClerkProvider>
        </Providers>
      </body>
    </html>
  )
}
