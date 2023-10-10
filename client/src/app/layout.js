import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'The Carbon Offset Simulator',
  description: "Take steps towards a greener future with our Carbon Offset Simulator. Discover your country's average CO2 consumption, simulate tree-based carbon offset purchases, and visualize your journey to carbon neutrality. Calculate the impact of offsetting, considering upfront and annual costs, tree growth, and maximum tree purchases. Make informed decisions to reduce your carbon footprint.",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
