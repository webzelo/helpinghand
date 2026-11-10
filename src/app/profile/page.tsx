import type { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { ProfileForm } from "@/components/profile-form";
import { auth } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Profile | Helping Hand",
};

export default async function ProfilePage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect("/login");
  }

  const { user } = session;

  return (
    <div className="flex flex-1 flex-col bg-page text-ink">
      <main className="flex-1">
        <div className="mx-auto max-w-[720px] px-5 py-16 sm:px-6 lg:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
            Account
          </p>

          <h1 className="mt-4 font-heading text-[clamp(2.3rem,4vw,3.2rem)] leading-none tracking-[-0.02em] text-ink">
            Your profile
          </h1>

          <p className="mt-4 max-w-[520px] text-sm leading-6 text-ink-muted">
            Update the name and photo shown across Helping Hand.
          </p>

          <ProfileForm
            name={user.name}
            image={user.image ?? ""}
            email={user.email}
          />
        </div>
      </main>
    </div>
  );
}
