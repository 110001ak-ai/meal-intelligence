export async function submitToSheets(payload: Record<string, string | number>) {
  const url = process.env.NEXT_PUBLIC_SHEET_URL
  if (!url || url === 'YOUR_APPS_SCRIPT_WEB_APP_URL_HERE') {
    console.warn('NEXT_PUBLIC_SHEET_URL not configured — skipping sheet submission')
    return
  }
  await fetch(url, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
}
