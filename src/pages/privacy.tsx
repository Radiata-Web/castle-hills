import { Hero } from "@/components/misc/hero";
import Footer from "@/components/nav/footer";
import { Link } from "@tanstack/react-router";


const linkClass =
  "font-medium text-primary underline underline-offset-2 hover:text-primary/90";

export default function PrivacyPage() {
  return (
    <>
      <Hero
        title="Privacy Policy"
        subtitle="Last updated: April 7, 2026"
        backgroundImageUrl="/photos/gates/gate-1.webp"
      />

      <div className="max-w-8xl mx-auto px-4 md:px-8 lg:px-8 mb-12">
        <article className="max-w-4xl mx-auto space-y-10 py-12 md:py-16 mt-4 md:mt-8 text-zinc-600 leading-relaxed">
          <section className="space-y-4">
            <p>
              Castle Hills Stain and Restoration LLC (&quot;us&quot;,
              &quot;we&quot;, or &quot;our&quot;) operates{" "}
              <a
                href="https://www.chstainandrestoration.com"
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
              >
                https://www.chstainandrestoration.com
              </a>{" "}
              (the &quot;Site&quot;). This page informs you of our policies
              regarding the collection, use and disclosure of Personal
              Information we receive from users of the Site.
            </p>
            <p>
              We use your Personal Information only for providing and improving
              the Site. By using the Site, you agree to the collection and use
              of information in accordance with this policy.
            </p>
          </section>

          <section aria-labelledby="information-collection-and-use">
            <h2
              id="information-collection-and-use"
              className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl mb-3"
            >
              Information Collection And Use
            </h2>
            <p>
              While using our Site, we may ask you to provide us with certain
              personally identifiable information that can be used to contact
              or identify you. Personally identifiable information may include,
              but is not limited to your name (&quot;Personal Information&quot;).
            </p>
          </section>

          <section aria-labelledby="log-data" className="space-y-4">
            <h2
              id="log-data"
              className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl mb-3"
            >
              Log Data
            </h2>
            <p>
              Like many site operators, we collect information that your browser
              sends whenever you visit our Site (&quot;Log Data&quot;).
            </p>
            <p>
              This Log Data may include information such as your computer&apos;s
              Internet Protocol (&quot;IP&quot;) address, browser type, browser
              version, the pages of our Site that you visit, the time and date
              of your visit, the time spent on those pages and other statistics.
            </p>
            <p>
              In addition, we may use third party services such as Google
              Analytics that collect, monitor and analyze this data. For more
              information regarding Google Analytics and its data collection
              policies, visit{" "}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
              >
                https://policies.google.com/privacy
              </a>
              .
            </p>
          </section>

          <section aria-labelledby="communications" className="space-y-4">
            <h2
              id="communications"
              className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl mb-3"
            >
              Communications
            </h2>
            <p>
              We may use your Personal Information to contact you with
              newsletters, marketing or promotional materials and other
              information that will allow us to better serve interested parties
              and our clients.
            </p>
          </section>

          <section aria-labelledby="cookies" className="space-y-4">
            <h2
              id="cookies"
              className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl mb-3"
            >
              Cookies
            </h2>
            <p>
              Cookies are files with a small amount of data, which may include an
              anonymous unique identifier. Cookies are sent to your browser from
              a web site and stored on your computer&apos;s hard drive.
            </p>
            <p>
              Like many sites, we use &quot;cookies&quot; to collect information.
              You can instruct your browser to refuse all cookies or to indicate
              when a cookie is being sent. However, if you do not accept cookies,
              you may not be able to use some portions of our Site.
            </p>
          </section>

          <section aria-labelledby="security" className="space-y-4">
            <h2
              id="security"
              className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl mb-3"
            >
              Security
            </h2>
            <p>
              The security of your Personal Information is important to us, but
              remember that no method of transmission over the Internet, or
              method of electronic storage, is 100% secure. While we strive to
              use commercially acceptable means to protect your Personal
              Information, we cannot guarantee its absolute security.
            </p>
          </section>

          <section
            aria-labelledby="changes-to-this-privacy-policy"
            className="space-y-4"
          >
            <h2
              id="changes-to-this-privacy-policy"
              className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl mb-3"
            >
              Changes To This Privacy Policy
            </h2>
            <p>
              This Privacy Policy is effective as of April 7, 2026 and will
              remain in effect except with respect to any changes in its
              provisions in the future, which will be in effect immediately after
              being posted on this page.
            </p>
            <p>
              We reserve the right to update or change our Privacy Policy at any
              time and you should check this Privacy Policy periodically. Your
              continued use of the Service after we post any modifications to the
              Privacy Policy on this page will constitute your acknowledgment of
              the modifications and your consent to abide and be bound by the
              modified Privacy Policy.
            </p>
            <p>
              If we make any material changes to this Privacy Policy, we will
              notify you either through the email address you have provided us,
              or by placing a prominent notice on our website.
            </p>
          </section>

          <section aria-labelledby="contact-us" className="space-y-4">
            <h2
              id="contact-us"
              className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl mb-3"
            >
              Contact Us
            </h2>
            <p>
              If you have any questions about this Privacy Policy, please contact
              us via the{" "}
              <Link to="/contact-us" className={linkClass}>
                contact form
              </Link>{" "}
              on the Site.
            </p>
          </section>
        </article>
      </div>

      <Footer />
    </>
  );
}
