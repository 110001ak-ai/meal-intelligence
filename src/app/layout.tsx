import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Meal Intelligence',
  description: 'Discover insights about your daily kitchen habits — from regional food patterns to cooking fats, meal structure, and more.',
  keywords: [
    'meal profile',
    'Indian food habits',
    'kitchen intelligence',
    'diet tracker',
    'regional cuisine',
    'cooking habits',
    'nutrition insights',
    'food survey',
  ],
  authors: [{ name: 'Meal Intelligence' }],
  creator: 'Meal Intelligence',
  applicationName: 'Meal Intelligence',
  category: 'Food & Nutrition',

  // Open Graph — controls how the link looks when shared on WhatsApp, LinkedIn etc.
  openGraph: {
    title: 'Meal Intelligence — Know Your Kitchen',
    description: 'A 5-step profile that maps your daily food habits, cooking fats, and regional kitchen patterns.',
    type: 'website',
    locale: 'en_IN',
    siteName: 'Meal Intelligence',
  },

  // Twitter / X card
  twitter: {
    card: 'summary',
    title: 'Meal Intelligence — Know Your Kitchen',
    description: 'A 5-step profile that maps your daily food habits, cooking fats, and regional kitchen patterns.',
  },

  // Prevent search engines from indexing if this is a private/internal tool
  // Remove this block if you want it to be publicly indexed
  robots: {
    index: false,
    follow: false,
  },

  // Favicon — put a favicon.ico or icon.png inside /public and it will be picked up
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#f7f5f1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}