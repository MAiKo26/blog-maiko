import { Button } from "@/components/ui/button";
import Link from "next/link";

function PrivacyPage() {
  return (
    <div className="dark:text-white text-black">
      <div className="mx-auto flex max-w-xl flex-col gap-5 p-3 lg:p-10">
        <header>
          <h1>Privacy Policy for maiko26 Blog</h1>
          <p>
            <strong>Effective Date:</strong> 25/10/2024
          </p>
        </header>

        <section>
          <h2>1. Information We Do Not Collect</h2>
          <p>
            maiko26 Blog does not collect any personal data or user information
            directly. We do not ask for or store any personal details such as
            names, emails, addresses, or payment information.
          </p>
        </section>

        <section>
          <h2>2. Use of Third-Party Services</h2>
          <p>
            We use the following third-party services that may collect, monitor,
            and analyze data as described below:
          </p>
          <ul>
            <li>
              <strong>Google Analytics</strong>: We use Google Analytics to
              understand website traffic and usage patterns. Google Analytics
              may collect information such as your IP address, browser type, and
              user behavior on the site.
            </li>
            <li>
              <strong>Google Adsense</strong>: We use Google Adsense to display
              advertisements on the site. Google may use cookies to show
              personalized ads based on your browsing history.
            </li>
            <li>
              <strong>Google Tag Manager</strong>: Google Tag Manager helps us
              manage analytics tags on the site efficiently. It may collect data
              for Google Analytics or other tools as needed.
            </li>
          </ul>
          <p>
            Please note that these services have their privacy policies which
            dictate how they use your data.
          </p>
        </section>

        <section>
          <h2>3. Cookies and Tracking Technologies</h2>
          <p>
            maiko26 Blog itself does not use cookies, but third-party services such
            as Google Analytics and Google Adsense may use cookies to collect
            user data and provide personalized experiences. For more details,
            please refer to
            <Link href="https://policies.google.com/privacy" target="_blank">
              Google&apos;s Privacy Policy
            </Link>
            .
          </p>
        </section>

        <section>
          <h2>4. Data Sharing</h2>
          <p>
            We do not sell or share your personal data with third parties. The
            third-party services we use may collect and process data, but
            maiko26 Blog does not control their use of this data.
          </p>
        </section>

        <section>
          <h2>5. Your Rights</h2>
          <p>
            Since maiko26 Blog does not collect personal information, there is no
            data to access, modify, or delete. However, you can manage cookies
            or opt-out of personalized ads via your browser settings or through
            <Link href="https://adssettings.google.com" target="_blank">
              Google&apos;s Ads Settings
            </Link>
            page.
          </p>
        </section>

        <section>
          <h2>6. Changes to the Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Any changes
            will be posted on this page with an updated effective date. Please
            review this page periodically to stay informed.
          </p>
        </section>

        {/* <section>
          <h2>7. Contact Us</h2>
          <p>
            If you have any questions or concerns about this Privacy Policy, you
            can contact us at:
          </p>
          <p>
            Email:
            <a href="mailto:contact@maiko26.tn">contact@maiko26.tn</a>
          </p>
        </section> */}
        <footer>
          <p>
            <Button variant="link" className="p-0">
              <Link href="/">Go back to homepage</Link>
            </Button>
          </p>
        </footer>
      </div>
    </div>
  );
}

export default PrivacyPage;
