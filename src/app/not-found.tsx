"use client";

import { ArrowLeft } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { useRouter } from "next/navigation";

export default function NotFoundIllustration01() {
  const router = useRouter()
  function goHome() {
    router.push("/")
  }
  function goBack() {
    router.back()
  }
    return (
        <section className="flex justify-center align-middle min-h-screen flex-1 bg-primary py-16 md:py-24">
          <div className="mx-auto flex h-full max-w-container flex-cols-1 items-center gap-8 px-4 md:flex-cols-2 md:px-8">
                <div className="flex h-full flex-1 flex-col items-start gap-8 md:justify-center md:gap-12 md:pr-8">


                    <div className="flex flex-col items-start gap-4 md:gap-6">
                        <div className="flex flex-col gap-3">
                            <span className="text-5xl font-semibold text-brand-secondary">404 error</span>
                            <h1 className="text-display-md font-semibold text-primary md:text-display-lg lg:text-display-xl">Page not found</h1>
                        </div>
                        <p className="max-w-120 text-lg text-tertiary md:text-xl">
                            Sorry, the page you are looking for doesn't exist. <br className="max-md:hidden" /> Here are some helpful links:
                        </p>
                    </div>
                    <div className="flex flex-col-reverse gap-3 self-stretch md:flex-row md:self-auto">
                        <Button onClick={goBack} color="secondary" size="xl" iconLeading={ArrowLeft}>
                            Go back
                        </Button>
                        <Button size="xl" onClick={goHome}>Take me home</Button>
                    </div>
                </div>

            </div>
        </section>
    );
};
