export default function ProfilePage(){
  return (
    <div className="min-h-screen bg-[#FAFBFB] p-8">
      <div className="max-w-4xl mx-auto card-surface">
        <h1 className="text-2xl font-bold mb-4">Profile</h1>
        <p className="text-sm text-[var(--gray)]">This is a static profile placeholder. Replace with real content when ready.</p>
        <div className="mt-6">
          <div className="mb-3">Name: John Doe</div>
          <div className="mb-3">Email: john@example.com</div>
          <div className="mb-3">Role: Admin</div>
        </div>
      </div>
    </div>
  )
}
