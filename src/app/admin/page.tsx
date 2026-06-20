import { redirect } from 'next/navigation'

export default function AdminPage() {
  // Redirect the root /admin path to /admin/ambassadors by default
  redirect('/admin/ambassadors')
}
