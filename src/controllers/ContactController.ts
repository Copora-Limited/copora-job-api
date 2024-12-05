import { Request, Response } from 'express';
import { sendContactFormSubmissionEmail, sendAdminInquiryEmail } from '../lib/emailActions'; // Email template function

class ContactController {
  /**
   * Handles sending an email based on contact form submission
   * @param req - Express request object
   * @param res - Express response object
   */
  public async sendContactFormEmail(req: Request, res: Response) {
    try {
      const { firstName, lastName, email, phone, subject, message, attachmentPath } = req.body;

      // Validate required fields
      if (!firstName || !email || !subject || !message) {
        return res.status(400).json({
          message: 'Missing required fields: firstName, email, subject, and message are mandatory.',
        });
      }

      // Prepare email data
      const user = { firstName, email };
      const formDetails = { subject, message, phone };

      // Call the email service to send the email
      await sendContactFormSubmissionEmail(user, formDetails, attachmentPath);

      console.log(`Contact form email sent successfully to ${email}.`);

      return res.status(200).json({
        message: 'Your message has been received. We will get back to you shortly.',
      });
    } catch (error) {
      console.error('Error sending contact form email:', error);
      return res.status(500).json({
        message: 'Failed to send your message. Please try again later.',
        error: error.message,
      });
    }
  }


  public async handleInquiry(req: Request, res: Response) {
    try {
        const { firstName, lastName, email, phone, subject, message } = req.body;

        // Validate required fields
        if (!firstName || !email || !subject || !message) {
            return res.status(400).json({
                message: 'Missing required fields: firstName, email, subject, and message are mandatory.',
            });
        }

        // Prepare inquiry details
        const user = { firstName, lastName, email };
        const formDetails = { subject, message, phone };

        // Check if there's an attachment in the request
        const attachmentPath = req.file?.path; // `req.file` is set by middleware like multer

        // Send email to the admin
        await sendAdminInquiryEmail(user, formDetails, attachmentPath);

        // Send confirmation email to the user (optional)
        await sendContactFormSubmissionEmail(user, formDetails, attachmentPath);

        console.log(`Admin notified about inquiry from ${email}`);

        return res.status(200).json({
            message: 'Your inquiry has been submitted successfully. We will get back to you soon.',
        });
    } catch (error) {
        console.error('Error handling customer inquiry:', error);
        return res.status(500).json({
            message: 'Failed to process your inquiry. Please try again later.',
            error: error.message,
        });
    }
}


  
}

export default new ContactController();

