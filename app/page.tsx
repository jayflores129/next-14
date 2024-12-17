import Image from "next/image";

export default async function Home() {
  return (
    <div>
      <header className="w-full bg-xxsurface h-[50px] border-b border-xxborder">
        <img src="https://localhost:3000/logos/main-logo-black.svg" />
      </header>
      <div className="flex">
        <aside className="bg-xxsurface border-r border-xxborder h-[calc(100vh-50px)] w-[240px]"></aside>
        <main className="bg-xxbackground w-[calc(100%-240px)] h-[calc(100vh-50px)] overflow-auto p-5">
          <button className="bg-xxsecondary text-white py-1 px-3 rounded-xl font-medium">
            Submit
          </button>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt quos
          quis, expedita et nostrum pariatur illo? Facere, atque alias? Ducimus
          a magnam iure labore ratione quisquam id sit aperiam aspernatur!
        </main>
      </div>
    </div>
  );
}
