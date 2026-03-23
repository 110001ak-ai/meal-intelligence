export async function submitToSheets(
  payload: Record<string, string | number>
) {
  const url = process.env.NEXT_PUBLIC_SHEET_URL

  // ❌ Missing / wrong config
  if (!url || url === 'YOUR_APPS_SCRIPT_WEB_APP_URL_HERE') {
    throw new Error('Sheet URL is missing or not configured properly')
  }

  try {
    await fetch(url, {
      method: 'POST',
      mode: 'no-cors', // kept as you want
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
  } catch (err: any) {
    // ❌ Network / invalid URL / DNS errors
    console.error('submitToSheets error:', err)
    throw new Error('Failed to reach Google Sheets endpoint')
  }
}