import { NavBar } from "@/app/navbar"

export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css" />
        <link href="https://use.fontawesome.com/releases/v6.2.0/css/all.css" rel="stylesheet" />
      </head>
      <body>
        <NavBar />
        <div className="columns mt-6">
          <div className="column is-10 is-offset-1 content">
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}
