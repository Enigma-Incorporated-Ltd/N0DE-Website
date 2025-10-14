import { Link } from 'react-router-dom';

const DMCAPolicy = () => {
  return (
    <div className="legal-document">
      <h2 className="text-light mb-4">DMCA Policy</h2>
      <div className="text-light-50">
        <p className="mb-4">
          This policy is issued in accordance with the US Digital Millennium Copyright Act (the "DMCA Policy") governs the rules which apply to all of Enigma's websites and services operating in the United States.
        </p>
        <p className="mb-4">
          By accessing or using Enigma's services, you acknowledge and agree to the terms of this DMCA Policy. It is intended to protect the rights of all users, ensure responsible usage, and support the secure and reliable operation of our systems. This DMCA Policy may be updated from time to time and applies in addition to Enigma's <Link to="/legal/standard-terms" className="text-primary hover:underline">Standard Terms</Link>.
        </p>
        <p className="mb-4">
          Any reference to Enigma services or product shall also include Third-Party Licences or any affiliated connections or networks, as appropriate. Any capitalised terms not otherwise defined herein, shall have the meanings ascribed to them in the Standard Terms.
        </p>
        <p className="mb-4">
          Except where expressly stated otherwise, this DMCA Policy is subject to and governed by Enigma's Standard Terms. In the event this document is silent on any matter, the relevant provisions of the Standard Terms shall apply and shall govern that subject matter accordingly.
        </p>

        <h4 className="mt-5 mb-3">1. GENERAL</h4>
        <ol className="mb-4">
          <li className="mb-2">We do all we can to protect the data you entrust us with</li>
          <li className="mb-2">This website and its contents are Enigma copyrighted. All rights reserved.</li>
          <li className="mb-2">
            Reproduction of all or any substantial part of its contents in any form is prohibited except that individual users or resellers of Enigma's Products and Services may print or save portions of the site for their own personal use.
          </li>
          <li className="mb-2">
            This acknowledgement does not permit users to incorporate the material or any substantial part of it in any other work or publication, whether in hard copy or electronic or any other form. In particular (but without limitation) no substantial part of the website may be distributed or copied for any commercial purpose without prior written agreement from Enigma.
          </li>
          <li>No substantial part of the website may be reproduced on or transmitted to or stored in any other website or other electronic retrieval system.</li>
        </ol>

        <h4 className="mt-5 mb-3">2. COPYRIGHT POLICY</h4>
        <p className="mb-4">
          We respect the intellectual property of others and we ask our users to do the same. In this policy, you will find information about copyright infringement procedures and policies that apply to our products and services.
        </p>

        <h4 className="mt-5 mb-3">3. COPYRIGHT INFRINGEMENT NOTIFICATION</h4>
        <p className="mb-3">
          To file a copyright infringement notification with us, you will need to send a written communication that includes substantially the following (please consult your legal counsel or see Section 512(c)(3) of the Digital Millennium Copyright Act to confirm these requirements):
        </p>
        <ol className="mb-4">
          <li className="mb-2">A physical or electronic signature of a person authorized to act on behalf of the owner of an exclusive right that is allegedly infringed.</li>
          <li className="mb-2">
            Identification of the copyrighted work claimed to have been infringed (including the infringing and/or source URL if possible), or, if multiple copyrighted works at a single online site are covered by a single notification, a representative list of such works at that site.
          </li>
          <li className="mb-2">
            Your written Notification of Claimed Infringement must be sent to our Designated Copyright Agent at the e-mail address listed below. We will review and address all notices that substantially comply with the requirements identified above. If your notice fails to substantially comply with all of these requirements, we may not be able to respond to your notice.
          </li>
          <li>Notification of Claimed Infringement must be sent to our support team.</li>
        </ol>
        <p className="mb-4">
          We suggest that you consult your legal advisor before filing a Notification of Claimed Infringement. Please note that you may be liable for damages if you make a false claim of copyright infringement. Section 512(f) of the Digital Millennium Copyright Act provides that any person who knowingly materially misrepresents that material is infringing may be subject to liability. Please also be advised that, in appropriate circumstances, we will terminate the accounts of users/subscribers who repeatedly misidentify copyrighted material.
        </p>

        <h4 className="mt-5 mb-3">4. COUNTER NOTIFICATION OF COPYRIGHT INFRINGEMENT</h4>
        <ol className="mb-4">
          <li className="mb-2">If you believe a copyright infringement claim was filed in error, you may send a Counter Notification to our Designated Copyright Agent to our support team.</li>
          <li className="mb-2">To file a Counter Notification with us, you must send us an e-mail that sets forth the items specified below:</li>
          <li className="mb-2">Identify the specific reason or available ID to which we have disabled access.</li>
          <li className="mb-2">Provide your full name, address, telephone number, and e-mail address.</li>
          <li className="mb-2">
            Provide a statement that you consent to the jurisdiction of Federal District Court for the judicial district in which your address is located, and that you will accept service of process from the person who the provided notification of claimed infringement to which your notice relates or an agent of such person.
          </li>
          <li className="mb-2">
            Include the following statement: "I swear, under penalty of perjury, that I have a good faith belief that the material was removed or disabled as a result of a mistake or misidentification of the material to be removed or disabled."
          </li>
          <li>Sign the notice. If you are providing notice by e-mail, an electronic signature (i.e. your typed name) or scanned physical signature will be accepted.</li>
        </ol>
        <p className="mb-4">
          If we receive a Counter Notification from you, we may forward it to the party who submitted the original Notification of Claimed Infringement. The Counter Notification we forward may include some of your personal information, such as your name and contact information. By submitting a Counter Notification, you consent to disclosure of your contact details to the original claimant, strictly in accordance with applicable data protection laws including the GDPR and CCPA. We will not forward the Counter Notification to any party other than the original claimant unless required or expressly permitted to do so by law.
        </p>
        <p className="mb-4">
          After we send out the Counter Notification, the original claimant must respond to us within 10 business days stating he or she has filed an action seeking a court order to restrain you from engaging in infringing activity.
        </p>
        <p className="mb-4">
          We suggest that you consult your legal advisor before filing a Counter Notification of Copyright Infringement. Please note that you may be liable for damages if you make a false claim. Under Section 512(f) of the Digital Millennium Copyright Act, any person who knowingly materially misrepresents that material was removed or disabled by mistake or misidentification may be subject to liability.
        </p>
        <p>
          Please note that we may not be able to contact you if we receive a Notification of Copyright Infringement about material. In accordance with our Standard Terms and any schedule thereto, we reserve the right to take action at any time to remain in compliance with the law.
        </p>
      </div>
    </div>
  );
};

export default DMCAPolicy;
