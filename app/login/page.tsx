import { signIn } from "@/auth";

export default function Page() {
  return (
    <form
      action={async (formData) => {
        "use server";
        await signIn("credentials", formData);
      }}
    >
      <input type="email" placeholder="Email" name="email" />
      <input type="password" placeholder="Password" name="password" />
      <button type="submit">Login</button>
    </form>
  );
}
