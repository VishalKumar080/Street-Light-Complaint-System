import React from 'react'

export default function Error() {
  return (
    <>
      <header className="sticky left-0 top-0 w-full z-10 bg-red-500 font-bold text-white text-3xl p-2 mb-10">
        Street Light Complaint
      </header>
      <main className="flex items-center justify-center h-[90vh]">
        <div className="text-3xl font-bold text-red-500">404 Page not found...</div>
      </main>
    </>
  );
}
