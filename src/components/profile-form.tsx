"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { cn } from "cn";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";

type ProfileFormProps = {
  name: string;
  image: string;
  email: string;
};

export function ProfileForm({ name, image, email }: ProfileFormProps) {
  const router = useRouter();

  const [currentName, setCurrentName] = React.useState(name);
  const [currentImage, setCurrentImage] = React.useState(image);
  const [isSaving, setIsSaving] = React.useState(false);
  const [message, setMessage] = React.useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const trimmedImage = currentImage.trim();
  const initial =
    currentName.trim().charAt(0).toUpperCase() ||
    email.charAt(0).toUpperCase() ||
    "U";

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextName = currentName.trim();

    if (!nextName) {
      setMessage({ type: "error", text: "Name cannot be empty." });
      return;
    }

    setMessage(null);
    setIsSaving(true);

    const { error } = await authClient.updateUser({
      name: nextName,
      image: trimmedImage || null,
    });

    setIsSaving(false);

    if (error) {
      setMessage({
        type: "error",
        text: error.message || "Could not update your profile.",
      });
      return;
    }

    setMessage({ type: "success", text: "Profile updated." });
    router.refresh();
  };

  return (
    <Card className="mt-8 gap-0 bg-surface py-0 text-ink ring-line">
      <CardHeader className="border-b border-line px-5 py-5 sm:px-7">
        <CardTitle className="font-heading text-xl text-ink">
          Profile details
        </CardTitle>

        <CardDescription className="text-ink-muted">
          Your name and picture are visible to other members.
        </CardDescription>
      </CardHeader>

      <CardContent className="px-5 py-6 sm:px-7">
        <form onSubmit={handleSubmit}>
          <FieldGroup className="gap-6">
            <div className="flex items-center gap-4">
              <Avatar className="size-16">
                <AvatarImage
                  key={trimmedImage}
                  src={trimmedImage || undefined}
                  alt={currentName}
                />
                <AvatarFallback className="bg-surface-2 font-heading text-2xl text-ink">
                  {initial}
                </AvatarFallback>
              </Avatar>

              <div>
                <p className="text-sm font-medium text-ink">Profile picture</p>
                <p className="mt-1 text-xs text-ink-muted">
                  Paste a public image URL to preview it here.
                </p>
              </div>
            </div>

            <Field>
              <FieldLabel htmlFor="name">Name</FieldLabel>
              <Input
                id="name"
                name="name"
                type="text"
                value={currentName}
                onChange={(event) => setCurrentName(event.target.value)}
                placeholder="Your name"
                maxLength={80}
                required
                className="h-10 border-line bg-input-bg px-3"
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="image">Profile picture URL</FieldLabel>
              <Input
                id="image"
                name="image"
                type="url"
                value={currentImage}
                onChange={(event) => setCurrentImage(event.target.value)}
                placeholder="https://example.com/photo.jpg"
                className="h-10 border-line bg-input-bg px-3"
              />
              <FieldDescription className="text-ink-muted">
                Leave it empty to show your initials instead.
              </FieldDescription>
            </Field>

            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                name="email"
                type="email"
                value={email}
                readOnly
                disabled
                className="h-10 border-line bg-surface-2 px-3"
              />
              <FieldDescription className="text-ink-muted">
                Email cannot be changed here.
              </FieldDescription>
            </Field>

            {message && (
              <p
                role="status"
                className={cn(
                  "rounded-xl border px-4 py-3 text-sm",
                  message.type === "success"
                    ? "border-brand-green/25 bg-brand-green/10 text-brand-green"
                    : "border-brand/25 bg-brand/10 text-brand"
                )}
              >
                {message.text}
              </p>
            )}

            <Button
              type="submit"
              disabled={isSaving}
              className="h-11 w-fit rounded-full bg-brand-fill px-6 text-sm font-semibold text-brand-foreground hover:bg-brand-fill-hover"
            >
              {isSaving ? "Saving…" : "Save changes"}
            </Button>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
