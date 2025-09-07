import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of service and conditions for using our blog",
};

export default function TermsOfService() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <article className="prose prose-gray dark:prose-invert max-w-none">
        <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
        
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Effective Date: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Agreement to Terms</h2>
          <p>
            By accessing and using this blog ("Service"), you accept and agree to be bound by these Terms of Service ("Terms"). If you do not agree to abide by these terms, you are not authorized to use or access the Service.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Description of Service</h2>
          <p>
            This blog provides informational content, articles, tutorials, and resources related to technology, programming, and related topics. The Service includes text, graphics, images, code examples, and other materials ("Content").
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. Use License and Restrictions</h2>
          
          <h3 className="text-xl font-medium mb-2">3.1 Permitted Use</h3>
          <p>You may:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Read and browse the content for personal and educational purposes</li>
            <li>Share links to articles on social media and other platforms</li>
            <li>Quote brief excerpts with proper attribution</li>
            <li>Use code examples in accordance with their respective licenses</li>
          </ul>

          <h3 className="text-xl font-medium mb-2 mt-4">3.2 Prohibited Use</h3>
          <p>You may not:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Reproduce, distribute, or republish substantial portions of content without permission</li>
            <li>Use automated systems to scrape or harvest content</li>
            <li>Attempt to gain unauthorized access to any part of the Service</li>
            <li>Use the Service for any illegal or unauthorized purpose</li>
            <li>Transmit viruses, malware, or other harmful code</li>
            <li>Impersonate us or suggest false affiliation</li>
            <li>Interfere with the proper functioning of the Service</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Intellectual Property Rights</h2>
          
          <h3 className="text-xl font-medium mb-2">4.1 Our Content</h3>
          <p>
            Unless otherwise noted, all content on this blog is owned by us and is protected by copyright, trademark, and other intellectual property laws. This includes but is not limited to text, graphics, logos, images, and software.
          </p>

          <h3 className="text-xl font-medium mb-2 mt-4">4.2 Code Examples</h3>
          <p>
            Code snippets and examples are provided for educational purposes. Unless explicitly stated otherwise, code examples are licensed under the MIT License, allowing for reuse with attribution.
          </p>

          <h3 className="text-xl font-medium mb-2 mt-4">4.3 Third-Party Content</h3>
          <p>
            Some content may include third-party materials used under fair use or with permission. Such content remains the property of its respective owners.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. User-Generated Content</h2>
          
          <h3 className="text-xl font-medium mb-2">5.1 Comments and Submissions</h3>
          <p>
            If you submit comments, questions, or other content ("User Content"), you grant us a non-exclusive, royalty-free, worldwide license to use, modify, and display such content in connection with the Service.
          </p>

          <h3 className="text-xl font-medium mb-2 mt-4">5.2 Content Standards</h3>
          <p>User Content must not:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Violate any applicable laws or regulations</li>
            <li>Infringe on intellectual property rights</li>
            <li>Contain spam, advertising, or promotional material</li>
            <li>Include harassment, threats, or abusive language</li>
            <li>Contain malicious code or links</li>
            <li>Be false, misleading, or defamatory</li>
          </ul>

          <h3 className="text-xl font-medium mb-2 mt-4">5.3 Moderation</h3>
          <p>
            We reserve the right to review, edit, or remove User Content at our discretion without notice.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Privacy</h2>
          <p>
            Your privacy is important to us. Please review our Privacy Policy, which explains how we collect, use, and protect your information when you use the Service.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. Disclaimers</h2>
          
          <h3 className="text-xl font-medium mb-2">7.1 "As Is" Basis</h3>
          <p>
            The Service is provided on an "as is" and "as available" basis. We make no warranties, expressed or implied, regarding the Service, including but not limited to warranties of merchantability, fitness for a particular purpose, or non-infringement.
          </p>

          <h3 className="text-xl font-medium mb-2 mt-4">7.2 Content Accuracy</h3>
          <p>
            While we strive for accuracy, we do not warrant that the content is error-free, complete, or current. Information may become outdated, and we are not obligated to update it.
          </p>

          <h3 className="text-xl font-medium mb-2 mt-4">7.3 Technical Availability</h3>
          <p>
            We do not guarantee that the Service will be available at all times or free from interruptions, delays, or technical issues.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">8. Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by law, we shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Loss of profits, revenue, or business opportunities</li>
            <li>Loss of data or corruption of data</li>
            <li>Cost of substitute goods or services</li>
            <li>Business interruption or downtime</li>
          </ul>
          <p className="mt-4">
            Our total liability for any claims arising from or related to the Service shall not exceed $100 USD.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibent mb-4">9. Indemnification</h2>
          <p>
            You agree to indemnify and hold us harmless from any claims, damages, liabilities, and expenses (including attorney fees) arising from:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Your use of the Service</li>
            <li>Your violation of these Terms</li>
            <li>Your violation of any third-party rights</li>
            <li>Any User Content you submit</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">10. External Links</h2>
          <p>
            Our blog may contain links to third-party websites or services. We do not control or endorse these external sites and are not responsible for their content, privacy practices, or terms of service. You access external links at your own risk.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">11. Termination</h2>
          <p>
            We reserve the right to terminate or suspend your access to the Service at any time, with or without cause or notice, for violation of these Terms or for any other reason at our sole discretion.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">12. Changes to Terms</h2>
          <p>
            We may modify these Terms at any time by posting updated terms on this page. Changes become effective immediately upon posting. Your continued use of the Service after changes constitutes acceptance of the new terms.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">13. Governing Law and Jurisdiction</h2>
          <p>
            These Terms are governed by and construed in accordance with the laws of [Your Jurisdiction], without regard to conflict of law principles. Any disputes arising from these Terms or the Service shall be resolved in the courts of [Your Jurisdiction].
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">14. Severability</h2>
          <p>
            If any provision of these Terms is found to be unenforceable or invalid, the remaining provisions will continue to be valid and enforceable to the fullest extent permitted by law.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">15. Entire Agreement</h2>
          <p>
            These Terms, together with our Privacy Policy, constitute the entire agreement between you and us regarding the use of the Service and supersede all prior agreements and understandings.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">16. Contact Information</h2>
          <p>
            If you have questions about these Terms, please contact us at:
          </p>
          <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <p>Email: legal@yourblog.com</p>
            <p>Response time: Within 30 days</p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">17. Special Provisions</h2>
          
          <h3 className="text-xl font-medium mb-2">17.1 Educational Use</h3>
          <p>
            Content on this blog is intended for educational purposes. While we strive for accuracy, you should verify information independently before implementing any code or following any advice in production environments.
          </p>

          <h3 className="text-xl font-medium mb-2 mt-4">17.2 Open Source Compliance</h3>
          <p>
            When we reference or include open source software or code, we strive to comply with all applicable licenses and provide proper attribution. If you believe we have made an error, please contact us immediately.
          </p>
        </section>

        <div className="mt-12 p-6 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
          <p className="text-sm">
            <strong>Legal Notice:</strong> These terms are provided as a starting point and may need to be customized for your specific situation. Consider consulting with a legal professional for comprehensive legal protection.
          </p>
        </div>
      </article>
    </div>
  );
}