import Link from "next/link";
import Image from "next/image";
import heroImg from "@/../public/images/hero.png";

export default function Home() {
  return (
    <main>
      <section className="text-center">
        <div className="grid max-w-screen-xl px-4 pb-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
          <div className="mr-auto place-self-center lg:col-span-7 text-start">
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
            <Image src={heroImg} width={600} alt="hero image" />
          </div>
        </div>
      <Link href="/dashboard" className="btn btn-primary">
        Dashboard
      </Link>
      </section>
    </main>
  );
}
