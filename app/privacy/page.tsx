import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy policy for our blog - Learn how we collect, use, and protect your data",
};

export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <article className="prose prose-gray dark:prose-invert max-w-none">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>

        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Effective Date:{" "}
          {new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
          <p>
            We respect your privacy and are committed to protecting your
            personal data. This privacy policy explains how we collect, use, and
            safeguard your information when you visit our blog.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            2. Information We Collect
          </h2>

          <h3 className="text-xl font-medium mb-2">
            2.1 Information You Provide
          </h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Name and email address (if you subscribe to our newsletter or
              leave comments)
            </li>
            <li>Any content you submit through comments or contact forms</li>
            <li>Communication preferences</li>
          </ul>

          <h3 className="text-xl font-medium mb-2 mt-4">
            2.2 Information Automatically Collected
          </h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>IP address and browser information</li>
            <li>Device type and operating system</li>
            <li>Pages visited and time spent on pages</li>
            <li>Referring website addresses</li>
            <li>Analytics data (via privacy-focused analytics tools)</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            3. How We Use Your Information
          </h2>
          <p>We use the collected information to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Provide and improve our blog content</li>
            <li>Send newsletters (with your consent)</li>
            <li>Respond to your comments and inquiries</li>
            <li>Analyze usage patterns to enhance user experience</li>
            <li>Detect and prevent security threats</li>
            <li>Comply with legal obligations</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            4. Cookies and Tracking
          </h2>
          <p>We use minimal, essential cookies to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Remember your preferences (such as theme selection)</li>
            <li>Provide basic analytics (page views, visitor counts)</li>
            <li>Ensure website security and functionality</li>
          </ul>
          <p className="mt-4">
            We do not use third-party advertising cookies or engage in
            cross-site tracking. You can disable cookies in your browser
            settings, though this may affect site functionality.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            5. Data Sharing and Third Parties
          </h2>
          <p>
            We do not sell, trade, or rent your personal information. We may
            share data only in these circumstances:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>With your explicit consent</li>
            <li>To comply with legal obligations or court orders</li>
            <li>To protect our rights, property, or safety</li>
            <li>
              With service providers who assist in operating our blog (under
              strict confidentiality agreements)
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Data Security</h2>
          <p>
            We implement industry-standard security measures to protect your
            data:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>HTTPS encryption for all data transmission</li>
            <li>Regular security audits and updates</li>
            <li>Limited access to personal data on a need-to-know basis</li>
            <li>Secure data storage with encryption at rest</li>
          </ul>
          <p className="mt-4">
            However, no method of transmission over the internet is 100% secure.
            While we strive to protect your personal information, we cannot
            guarantee absolute security.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            7. Your Rights and Choices
          </h2>
          <p>You have the right to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Access the personal information we hold about you</li>
            <li>Request correction of inaccurate data</li>
            <li>Request deletion of your data (right to be forgotten)</li>
            <li>Object to or restrict processing of your data</li>
            <li>Data portability (receive your data in a structured format)</li>
            <li>Withdraw consent at any time</li>
            <li>Opt-out of newsletters and marketing communications</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">8. Children's Privacy</h2>
          <p>
            Our blog is not directed to individuals under the age of 13. We do
            not knowingly collect personal information from children under 13.
            If we become aware that we have collected such information, we will
            promptly delete it.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            9. International Data Transfers
          </h2>
          <p>
            If you access our blog from outside our primary operating country,
            please be aware that your information may be transferred to, stored,
            and processed in different jurisdictions. We ensure appropriate
            safeguards are in place for any international data transfers.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">10. Data Retention</h2>
          <p>
            We retain personal information only for as long as necessary to
            fulfill the purposes outlined in this policy, unless a longer
            retention period is required by law. Analytics data is typically
            retained for 12 months, while account-related data is kept until you
            request deletion.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            11. Changes to This Policy
          </h2>
          <p>
            We may update this privacy policy from time to time. Any changes
            will be posted on this page with an updated effective date. For
            significant changes, we will provide additional notice (such as a
            banner on our homepage or email notification if you're subscribed).
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">12. Contact Us</h2>
          <p>
            If you have questions, concerns, or requests regarding this privacy
            policy or our data practices, please contact us at:
          </p>
          <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <p>Email: {process.env.NEXT_PUBLIC_EMAIL}</p>
            <p>Response time: Within 30 days</p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            13. Legal Basis for Processing (GDPR)
          </h2>
          <p>
            For users in the European Economic Area, we process personal data
            based on:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Consent: For newsletters and optional features</li>
            <li>Legitimate interests: For analytics and security</li>
            <li>Legal obligations: When required by law</li>
            <li>Performance of contract: For providing requested services</li>
          </ul>
        </section>

        <div className="mt-12 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <p className="text-sm">
            <strong>Your Privacy Matters:</strong> We are committed to
            transparency and giving you control over your data. This policy
            reflects our dedication to protecting your privacy while providing
            valuable content.
          </p>
        </div>
      </article>
    </div>
  );
}
