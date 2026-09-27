import TeluguHeroBackground from "@/components/TeluguHeroBackground";
import Logo from "@/components/branding/Logo";
import OtpSignInForm from "@/components/OtpSignInForm";

function Headline() {
  return (
    <div>
      <h1
        className="text-4xl font-bold leading-tight text-emerald-950 drop-shadow-sm sm:text-5xl"
        style={{ fontFamily: "var(--font-playfair)" }}
      >
        Telugu Hearts
        <br />
        United in
      </h1>
      <div
        className="mt-1 text-6xl text-amber-600 drop-shadow-sm sm:text-7xl"
        style={{ fontFamily: "var(--font-dancing)" }}
      >
        Pune
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main className="bg-[#F6CE81]">
      {/* Mobile: stacked layout, illustration as a fixed-height banner */}
      <div className="flex flex-col gap-8 px-6 py-8 md:hidden">
        <div className="flex justify-center">
          <Logo />
        </div>
        <div className="h-56 w-full overflow-hidden rounded-2xl shadow-inner">
          <TeluguHeroBackground className="h-full w-full" />
        </div>
        <Headline />
        <div className="flex justify-center pb-4">
          <OtpSignInForm />
        </div>
      </div>

      {/* Desktop: full-bleed hero with overlaid content */}
      <div className="relative hidden min-h-screen overflow-hidden md:block">
        <TeluguHeroBackground className="absolute inset-0 h-full w-full" />
        <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col px-10 py-8">
          <div className="flex justify-end">
            <Logo />
          </div>
          <div className="mt-10 max-w-md">
            <Headline />
          </div>
          <div className="mt-auto flex justify-end pb-10 pt-16">
            <OtpSignInForm />
          </div>
        </div>
      </div>
    </main>
  );
}
