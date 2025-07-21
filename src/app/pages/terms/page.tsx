import Link from 'next/link';
export default function Page() {
  return (
    <div className="bg-[var(--background)] min-h-screen py-12 container">
      <div className=" mb-12">
        <h1 className="text-3xl font-bold text-[var(--primaryDark)] mb-4">Terms and Conditions</h1>
        <p className="text-lg text-[var(--primary)]">Last Updated: {new Date().toLocaleDateString()}</p>
      </div>
      <div className="space-y-10">
        <section>
          <h2 className="text-2xl font-semibold text-[var(--primaryDark)] mb-4 border-b border-[var(--primaryLight)] pb-2">1. Introduction</h2>
          <p className="mb-4 text-[var(--primaryDark)]">
            Welcome to ecommerceKTM. These Terms and Conditions govern your use of our website located at www.ecommercektm.com and our services.
          </p>
          <p className="text-[var(--primaryDark)]">
            By accessing or using our website, you agree to be bound by these Terms. If you disagree with any part, you may not access the website.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold text-[var(--primaryDark)] mb-4 border-b border-[var(--primaryLight)] pb-2">2. User Accounts</h2>
          <ul className="list-disc pl-6 space-y-2 text-[var(--primaryDark)]">
            <li>You must be at least 18 years old to create an account</li>
            <li>You are responsible for maintaining the confidentiality of your account credentials</li>
            <li>You agree to provide accurate and complete information</li>
            <li>We reserve the right to suspend or terminate accounts that violate these terms</li>
          </ul>
        </section>
        <section>
          <h2 className="text-2xl font-semibold text-[var(--primaryDark)] mb-4 border-b border-[var(--primaryLight)] pb-2">3. Orders and Payments</h2>
          <p className="mb-4 text-[var(--primaryDark)]">
            All orders are subject to product availability. We reserve the right to refuse or cancel any order for any reason.
          </p>
          <p className="text-[var(--primaryDark)]">
            Prices are subject to change without notice. You agree to pay all charges for purchases made under your account.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold text-[var(--primaryDark)] mb-4 border-b border-[var(--primaryLight)] pb-2">4. Returns and Refunds</h2>
          <p className="text-[var(--primaryDark)]">
            Refunds will be issued to the original payment method within 7-10 business days after we receive the returned item.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold text-[var(--primaryDark)] mb-4 border-b border-[var(--primaryLight)] pb-2">5. Intellectual Property</h2>
          <p className="text-[var(--primaryDark)]">
            All content on this website, including text, graphics, logos, and images, is our property and protected by copyright laws.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold text-[var(--primaryDark)] mb-4 border-b border-[var(--primaryLight)] pb-2">6. Limitation of Liability</h2>
          <p className="text-[var(--primaryDark)]">
            ecommerceKTM shall not be liable for any indirect, incidental, or consequential damages arising from your use of the website.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold text-[var(--primaryDark)] mb-4 border-b border-[var(--primaryLight)] pb-2">7. Governing Law</h2>
          <p className="text-[var(--primaryDark)]">
            These Terms shall be governed by and construed in accordance with the laws of Nepal, without regard to its conflict of law provisions.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold text-[var(--primaryDark)] mb-4 border-b border-[var(--primaryLight)] pb-2">8. Changes to Terms</h2>
          <p className="text-[var(--primaryDark)]">
            We reserve the right to modify these terms at any time. Your continued use of the website constitutes acceptance of the updated terms.
          </p>
        </section>
      </div>
    </div>
  );
}