import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <section className="bg-base-100">
        <div className="grid max-w-screen-xl px-4 pt-20 pb-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 lg:pt-28">
          <div className="mr-auto place-self-center lg:col-span-7">
            <h1 className="max-w-2xl mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl xl:text-6xl">
              Building digital <br />
              products & brands.
            </h1>
            <p className="max-w-2xl mb-6 font-light text-base-content lg:mb-8 md:text-lg lg:text-xl">
              This free and open-source landing page template was built using
              the utility classes from{" "}
              <a href="https://tailwindcss.com" className="hover:underline">
                Tailwind CSS
              </a>{" "}
              and based on the components from the{" "}
              <a
                href="https://flowbite.com/docs/getting-started/introduction/"
                className="hover:underline"
              >
                Flowbite Library
              </a>{" "}
              and the{" "}
              <a
                href="https://flowbite.com/blocks/"
                className="hover:underline"
              >
                Blocks System
              </a>
              .
            </p>
          </div>
          <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
            <img src="./images/hero.png" alt="hero image" />
          </div>
        </div>
      </section>
      <Link href="/dashboard" className="btn btn-primary">
        Dashboard
      </Link>
    </main>
  );
}
