export const metadata = {
  title: 'Classy News',
  description: 'A sophisticated news web app',
}

import './globals.css'
import { NewsProvider } from './context/NewsContext'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 font-serif">
        <NewsProvider>
          {children}
        </NewsProvider>
      </body>
    </html>
  )
}
