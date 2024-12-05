import { emailHeader } from './emailHeader';
import { emailFooter } from './emailFooter';

export default function findTalentResponseEmail(formData) {
  return `
    ${emailHeader('others')}
      <div style="padding: 20px;">
        <h3>
          Hi ${formData.firstName || 'User'},
        </h3>
        <p>Thank you for reaching out to us! We’ve received your message and our team will get back to you as soon as possible.</p>

        <p>Here are the details of your submission:</p>
        <ul>
          <li><strong>Name:</strong> ${formData.firstName || ''} ${formData.lastName || ''}</li>
          <li><strong>Email:</strong> ${formData.email}</li>
          <li><strong>Contact Number:</strong> ${formData.phone || 'N/A'}</li>
          <li><strong>Subject:</strong> ${formData.subject}</li>
          <li><strong>Message:</strong> ${formData.message}</li>
        </ul>

        <p>If you have any additional information to share or questions to ask, feel free to reply to this email.</p>

        <p style="margin: 0;">
          Best regards,<br><br>
          <strong>The ${process.env.APP_COMPANY || 'Team'}</strong>
        </p>
      </div>
    ${emailFooter()}
  `;
}
