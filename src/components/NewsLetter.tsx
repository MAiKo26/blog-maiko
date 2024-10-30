import { useState } from "react";
import { AddEmail, checkExistingEmail } from "@/lib/actions";

export function NewsletterForm() {
  const [subscribed, setSubscribed] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  async function handleSubmit({
    currentTarget,
    preventDefault,
  }: React.FormEvent<HTMLFormElement>) {
    preventDefault();
    const formData = new FormData(currentTarget);

    setError(false);
    setMessage("Submitting...");

    try {
      const existingEmail = await checkExistingEmail(
        formData.get("email") as string,
      );
      if (existingEmail) {
        setError(true);
        setMessage("This email is already subscribed.");
        return;
      }
      await AddEmail(formData);
      setSubscribed(true);
      setMessage("Thank you for subscribing! 🎉");
    } catch (error) {
      console.error(error);
      setError(true);
      setMessage("Something went wrong. Please try again later.");
    }
  }

  return (
    <div className="w-full max-w-md">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 sm:flex-row sm:gap-3"
      >
        <div className="flex-1">
          <label htmlFor="email-input" className="sr-only">
            Email address
          </label>
          <input
            type="email"
            id="email-input"
            name="email"
            autoComplete="email"
            required
            disabled={subscribed}
            placeholder={
              subscribed ? "You're subscribed! 🎉" : "Enter your email"
            }
            className="w-full rounded-md px-4 py-2 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900"
          />
        </div>

        <button
          type="submit"
          disabled={subscribed}
          className={`rounded-md px-4 py-2 text-sm font-medium text-white transition-colors ${
            subscribed
              ? "cursor-default bg-green-500"
              : "bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
          }`}
        >
          {subscribed ? "Thank you!" : "Sign up"}
        </button>
      </form>

      {message && (
        <div
          className={`mt-2 text-sm ${error ? "text-red-500 dark:text-red-400" : "text-green-500 dark:text-green-400"}`}
        >
          {message}
        </div>
      )}
    </div>
  );
}

export default NewsletterForm;
