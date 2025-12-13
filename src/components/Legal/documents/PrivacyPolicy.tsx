import { Link } from "react-router-dom";

export default function PrivacyPolicy() {
  return (
    <>
      <div className="text-light-50">
        <h2 className="text-light mb-4">Privacy Policy</h2>
        <p className="mb-4">
          This privacy policy (the “Privacy Policy”) governs the rules which
          apply to Enigmaʼs data protection, collection, handling/transfer and
          usage practices
        </p>
        <p className="mb-4">
          By accessing or using Enigmaʼs services, you acknowledge and agree to
          the terms of this Privacy Policy. It is intended to protect the rights
          of all users, ensure responsible usage, and support the secure and
          reliable operation of our systems. This Privacy Policy may be updated
          from time to time and applies in addition to Enigmaʼs{" "}
          <Link to={"/legal"}>Standard Terms</Link>.
        </p>
        <p className="mb-4">
          Any reference to Enigma services or product shall also include
          Third-Party Licences or any affiliated connections or networks, as
          appropriate. Any capitalised terms not otherwise defined herein, shall
          have the meanings ascribed to them in the Standard Terms.
        </p>
        <p className="mb-4">
          Except where expressly stated otherwise, this Privacy Policy is
          subject to and governed by Enigmaʼs Standard Terms. In the event this
          document is silent on any matter, the relevant provisions of the
          Standard Terms shall apply and shall govern that subject matter
          accordingly.
        </p>
        {content.map((c, i) => (
          <>
            <h4 className="mb-3" key={i}>
              {i + 1}. {c.title}
            </h4>
            {c.subContent.map((s, j) => (
              <>
                {s.boldStatement && (
                  <p className="mb-2">
                    <strong>{s.boldStatement}</strong>
                  </p>
                )}
                <p className="mb-3">
                  {i + 1}.{j + 1}) {s.paragraph}
                </p>
                {s.list && (
                  <ul className="mb-4">
                    {s.list.map((li, k) => (
                      <li className="mb-2">{li}</li>
                    ))}
                  </ul>
                )}
              </>
            ))}
          </>
        ))}
        <p className="mt-10">Last updated: 24 June 2025</p>
      </div>
    </>
  );
}

type ContentItem = {
  paragraph: string;
  list?: string[];
  boldStatement?: string;
};

type ContentSection = {
  title: string;
  subContent: ContentItem[];
};
const content: ContentSection[] = [
  {
    title: "GENERAL",
    subContent: [
      {
        paragraph: "Our policy is broadly to: ",
        list: [
          "protect your privacy and the data you entrust us with;",
          "limit the amount of your private information we have access to, with such data required to operate our business or provide a service;",
          "not to buy or sell your private information;",
          "and protect the privacy of visitors to our website and the privacy of customers, contacts and other individuals whose personal data we handle.",
        ],
        boldStatement: "",
      },
      {
        paragraph:
          "Without our prior written approval, you must not (and must not permit anyone else to) use our Services to store, transfer or process any personal or sensitive data including patient, medical or other protected health or sensitive information regulated by the Health Insurance Portability and Accountability Act (HIPAA), General Data Protection Regulations (GDPR), Payment Card Industry Data Security Standard (PCI DSS) or California Consumer Privacy Act (CCPA).",
      },
    ],
  },
  {
    title: "DATA PROTECTION",
    subContent: [
      {
        paragraph: `In this clause 2 of this Privacy Policy, the defined term “Data Protection Legislation" means the Data Protection Act 2018, the UK General Data Protection Regulation(UK GDPR), the Privacy and Electronic Communications Regulations 2003(PECR), and all subordinate legislation, guidance, and rulings from the Information Commissionerʼs Office. And any otherapplicable data protection legislation and all rules made under any of the DPA98, the DPA18, the GDPR and the PECR by any competent body, including the “Information Commissioner's Office” in the United Kingdom.`,
      },
      {
        paragraph: `The Parties agree that on the date of signing of these Standard Terms no ‘personal dataʼ
is intended to be transferred. To the extent that either Party intends to process ‘personal dataʼ,
the Parties shall enter into a separate data processing agreement incorporating the mandatory
provisions of Article 28(3) UK GDPR before any personal data is processed. . In doing so, the
Parties shall also implement appropriate technical and organisational measures which meet the
requirements of applicable data protection law (in particular GDPR), and these Standard Terms.`,
      },
    ],
  },
  {
    title: "ENIGMAʼS COMMITMENT",
    subContent: [
      {
        paragraph: `Enigma is built upon a foundation of security, privacy and trust, with our core elements
including:`,
        list: [
          "we cannot access the data you transfer through our network",
          "we apply industry standard 128-bit AES encryption (or higher) to all data transferred",
          "our payment systems are run by authorised third-party providers",
          "our websitesʼ logs do not store any personally identifiable data",
          "we do not buy, sell or trade your data",
        ],
      },
    ],
  },
  {
    title: "PERSONAL DATA PRIVACY",
    subContent: [
      {
        paragraph: `Any collection and use of your personal information will depend on the particular
relationship and arrangements in place between us. Of the limited data collected or stored,
Enigma only use or share information where it is necessary to meet our legitimate interests.`,
      },
      {
        paragraph: `We explicitly do not collect or store the following data:`,
        list: [
          "any information about the applications, services or websites used by our customers",
          "usersʼ IP addresses visiting our websites",
          "usersʼ IP addresses upon service connection",
          "DNS queries whilst connected",
        ],
      },
      {
        paragraph: `We believe protection of personal data is a fundamental right. Access to information held
by us is restricted and we have systems and procedures in place to protect information and
keep it confidential. We monitor and revise the appropriateness of these security measures on a
regular basis.`,
      },
      {
        paragraph: `We process personal data in relation to:`,
        list: [
          "to undertake comparison tests",
          "maintain an account with us",
          "purchasing services and/or products",
        ],
      },
      {
        boldStatement:
          "What type of personal data is collected and processed by us, and on what basis?",
        paragraph: `We limit the collection of personal data to information which we can process pursuant to a
lawful basis, namely a contractual necessity, a legal obligation or to meet our legitimate
interests. We seek to limit data collection as follows: `,
        list: [
          "Name",
          "Email address",
          "Contact details for marketing, communications, purchase receipts and occasional product news",
          "Email confirmed",
          "Confirmation that your email address is valid",
          "Payment transactions",
        ],
      },
      {
        paragraph: `Customer payment information is handled by third-party payment providers; however,
Enigma may access limited non-sensitive payment-related data necessary for verification and
customer support.`,
      },
      {
        boldStatement: "Operational Data",
        paragraph: `We do collect and store some “Operational Data” required to operate our services. This is
data that we collect and store when we collect and store when you connect to our network,
such as:`,
        list: [
          "OS Version (e.g. iOS 7)",
          "Enigmaʼs product version (e.g. PC version 2.1.1)",
          "Active this month (e.g. 1 or 0), upgraded to paid subscription, online advertising referrals",
        ],
      },
      { paragraph: "Total data used this month (e.g. 22.34 GB)" },
      {
        paragraph: "What do we use it for?",
        list: [
          "User support, troubleshooting and product planning",
          "Customer satisfaction, support, network demand planning, granting free user data",
          "Operational events (e.g. created an account, complete bonus, made a payment, upgraded to paid subscription, online ad referrals, etc)",
          "Troubleshooting account and payment related issues and tracking where sales come from",
        ],
      },
      {
        paragraph:
          "We note that such events are not related to the time, activity or usage of Enigma products.",
      },
      {
        boldStatement: "Personal and Financial Data Collected at Payment",
        paragraph: `Making a purchase on any service will result in personal data being exchanged with our
payment processors. We currently do not accept payment by Bitcoin or other cryptocurrencies
as this would involve the collection of additional personal data including additional checks on
whether individuals are politically exposed persons (PEPs) or a close relative thereof.`,
      },
      {
        paragraph: `Payment card transactions – payment information is processed securely through our third
party payment providers. Such providers may store personal data (associated with such
financial transactions) outside of your jurisdiction.`,
      },
      {
        paragraph:
          "When you pay with a payment card, we may obtain the following payment data:",
        list: [
          "Cardholder last name (e.g. Smith)",
          "Date of card use (e.g. 2022/01/01)",
          "Last four numbers of credit card (e.g. 4567)",
          "Card Billing address",
          "Card Expiry",
          "Session information (e.g. device type, operating system, IP address at time of payment)",
        ],
      },
      {
        paragraph: "What do we use it for?",
        list: [
          "to operate, evaluate and improve our business",
          "to carry out auditing, accounting and other internal functions",
          "to prevent credit card fraud",
          "to carry out security maintenance over Enigmaʼs systems",
          "to monitor compliance with applicable laws and regulations.",
        ],
      },
      {
        paragraph: `Enigma can securely log-in and view the data stored by our third party payment providers,
albeit such viewable information is limited as described above. We adopt all available security
and available multi-factor authentication measures.`,
      },
      {
        paragraph: `hilst processing this information does not override your rights, we have a legitimate
interest in using it as it could potentially assist Enigma to further develop our business.`,
      },
      {
        paragraph: `Direct marketing procedures are currently limited to periodic updates sent to a very and
limited distribution list of business Contacts. Recipients of these emails are given the
opportunity to opt-out from distribution lists so that their information is not used for such a
purpose. The use of personal data for regular updates is targeted and proportionate in
accordance with the guidelines issued by the Information Commissionerʼs Office regarding the
GDPR provision of “legitimate interest”.`,
      },
      {
        boldStatement: "Cookies and Persistent Trackers",
        paragraph: `In building our websites and apps, we have tried to limit the use of cookies in your
browser.`,
      },
      {
        paragraph: `Unlike many of our competitors, we do not use any tracking tools for any purposes.`,
      },
      {
        boldStatement: "How do we obtain Personal Data?",
        paragraph: `We collect personal data in a number of ways, including:`,
        list: [
          "information provided directly from a customer and/or an end user, or business contact",
          "information received from third-party providers in relation to services, including fraud prevention or employment or other background checks",
          "data collected automatically from our systems when someone visits our website",
          "from publicly available sources, such as company websites, press and online search engines",
        ],
      },
      {
        boldStatement: "Transferring Information Overseas",
        paragraph: `ersonal data may be stored or transferred to systems located in the UK, EU, Canada, or
USA, subject to adequate safeguards in accordance, including adequacy decisions or standard
contractual clauses.`,
      },
      {
        paragraph: `Electronically stored information may be transferred outside your jurisdiction. When such
transfers take place, we ensure to transfer the information to:`,
        list: [
          "a country or organisation which has been categorised as adequate by the European Commission or UK authorities and/or meets the same standards of data protection as the UK, or",
          "an organisation pursuant to a contract between us and the third-party on terms that contain data privacy provisions approved by the European Commission or UK authorities.",
        ],
      },
      {
        boldStatement: "Sharing Information with Third Parties",
        paragraph:
          "We only share personal data with third parties pursuant to the legitimate interests as described.",
      },
      { paragraph: "We do not sell or buy personal data." },
      {
        paragraph: `We may be required to share information with other entities by law, in connection with any
legal proceedings or in response to an enforcement action or investigation carried out by an
authority or regulator (which, we would remind our customers, is effectively on a limited basis
due to the levels of data we receive and/or store).`,
      },
      {
        paragraph: `We would not transfer such information to third parties for their own marketing purposes
without requesting your express consent. We may, however, be required to send certain
information to third-party providers who operate services that help us with customer support,
email, hosting, protecting and securing our infrastructure and data, DDoS prevention, payment
processing, as well as understanding website analytics, app analytics, account and payment
related service usage.`,
      },
      {
        boldStatement: "How long will the information be stored?",
        paragraph: `We retain data for as long as it is considered necessary for the purpose for which it was
collected, subject to the applicable laws and regulations. The retention period is determined on
the type of information, the nature of the activity and the rules and regulations applicable at the
time. In general, we have policies and procedures in place to retain records for up to seven
years.`,
      },
      {
        paragraph: `We may have to retain personal data for longer periods, especially where Enigma has
been ordered to withhold destruction of the information by the Courts or an authority or agency.`,
      },
      {
        boldStatement: "What are your rights?",
        paragraph: `Should you wish to contact us in relation to any of your rights under the GDPR, you can
contact our support team quoting GDPR in the subject heading.`,
      },
      {
        paragraph: `Irrespective of the nature of your GDPR request, we will respond to you within thirty (30)
days of receipt of your initial notification to confirm whether we can take any action If we
determine your request cannot be fulfilled under GDPR, such as where it is manifestly
unfounded or excessive, we will notify you in writing with the applicable legal basis.`,
      },
      {
        paragraph: `The right to access your data: If you would like to receive a copy of the personal
information that we hold on you, you can contact us as per the above instructions. We may need
STRICTLY PRIVATE & CONFIDENTIAL
DATA EXPORT RESTRICTED
to verify your identity before we can take any further steps in response to your request.`,
      },
      {
        paragraph: `The right to rectify your data: If you believe that Enigma holds inaccurate information on
you, you can request us to rectify and update it. We may have to withhold the processing of your
personal data until the new information has been verified and updated on Enigmaʼs systems.`,
      },
      {
        paragraph: `The right to erase your data: If you believe that Enigma is processing your data unlawfully,
at a time when it no longer needs to or for the purpose for which it was provided, you can
request for your personal data to be erased. However, this request is not absolute under the
GDPR and depending on the circumstances, Enigma may not be able to meet your request.`,
      },
      {
        paragraph: `The right to restrict the processing of your data: You may wish to ask Enigma to limit the
processing of your data if you believe that the information is being unlawfully processed and/or
we no longer need it for a particular purpose. This request is not absolute under the GDPR and
Enigmaʼs ability to meet it will depend on the circumstances.`,
      },
      {
        paragraph: `The right to data portability: You have the right to receive a copy of the personal data that
we hold on you, and/or ask us to transfer your personal data to someone else. Either way, we
will seek to provide you with the information on a portable format which is safe and machine-
readable.`,
      },
      {
        paragraph: `The right to object to the processing of your data and/or direct marketing: You have the
right to object to the processing of your personal data by us. However, please note that this right
is not absolute under the GDPR. It is therefore subject to certain record-keeping requirements.
Applicable laws and regulations may restrict our ability to meet any request to stop processing
your information. However, you retain an absolute right to ask us to stop processing your
information for direct marketing purposes. Should wish you to notify us of such a request,
please contact us using the details set out above. In the event that we rely on your permission
to use your information for a particular purpose, you retain the right to withdraw your consent at
any time.`,
      },
      {
        paragraph: `The right to withdraw your consent: As set out in this Privacy Policy and depending on the
nature of our relationship with you, we rely on our legitimate interests in order to process
personal information. We do not rely on express consents as a lawful basis for processing your
information. We may therefore not be in a position to meet a request to stop processing it.
However, should you wish to withdraw your permission in relation to our periodic updates,
please contact us with your request and we will stop using your data for the purpose of direct
marketing.`,
      },
      {
        paragraph: `The right to lodge a complaint with the regulator: Should you wish to complain about the
way we use your personal data or handled your request pursuant to your rights under the GDPR,
STRICTLY PRIVATE & CONFIDENTIAL
DATA EXPORT RESTRICTED
please contact our Data Compliance Officer in the first instance. He will investigate the matter
and aim to address your concerns within thirty (30) days of receipt of your complaint. You can
also lodge a complaint with the Information Commissionerʼs Office (ICO). For more information,
please visit the Information Commissionerʼs Officeʼs website.`,
      },
      {
        boldStatement: "Residents of California and Nevada",
        paragraph: `Residents of California – We do not share information that identifies you personally with
non-affiliated third parties for our own marketing use without your permission.`,
      },
      {
        paragraph: `California Consumer Privacy Act – If you are a resident of California, you may exercise
your rights to personal data by contacting our support team quoting “California Consumer
Privacy Act” in the subject heading to request access to, receive (port), seek rectification, or
request erasure of personal data held about you. For the purposes of the California Consumer
Privacy Act, we do not “sell” your personal data.`,
      },
      {
        paragraph: `Residents of Nevada – We do not sell information that identifies you personally with non-
affiliated third parties. We do not sell or trade personal data for commercial purposes.`,
      },
      {
        boldStatement: "Data Protection",
        paragraph: `When using our products and services, your data is protected by our patented
multiplexing obfuscation technology and multiple layers of data protection and security
measures that ensure the privacy of our users whilst affording optimised, efficient and secure
data transfer.`,
      },
      {
        paragraph: `Enigma is committed to treating information and data (in all forms; written, verbal,
electronic, personnel and materials) with care and confidentiality as it is of the highest value to
the organisation, stakeholders and clients. We ensure data is gathered in a transparent way and
only with the full co-operation and knowledge of interested parties. It is transferred, stored, and
handled transparently, respecting individual rights.`,
      },
      {
        paragraph: "Data will not be:",
        list: [
          "Communicated informally or without the ownerʼs consent",
          "Stored for more than a specified amount of time",
          "Transferred to organizations, states or countries that do not have adequate data protection policies",
          "Distributed to any party other than the ones agreed upon by the dataʼs owner (exempting legitimate requests from law enforcement authorities)",
        ],
      },
      {
        paragraph: `This policy is an affirmation of Enigmaʼs commitment to safeguarding data protection,
privacy and maintaining data integrity. Data entrusted to us will be protected against any
unauthorized or illegal access by internal or external parties and will be processed within legal
and moral boundaries.`,
      },
      {
        boldStatement: "Changes to our Policies",
        paragraph: `We may need to change our policies from time to time and all updates will be posted
online. Your continued use of our products/devices and/or services after the effective date of
such changes constitutes your acceptance of such changes. These policies are effective from
the date of amendment (set out below) and are subject to periodic review.`,
      },
      {
        boldStatement: "Contact Information",
        paragraph: `If you have any questions in relation to this Privacy Policy or how Enigma processes
personal data, please contact our Data Compliance Officer via the support team.`,
      },
    ],
  },
];
