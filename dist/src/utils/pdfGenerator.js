"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePDF = void 0;
const pdfkit_1 = __importDefault(require("pdfkit"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
// Function to generate a PDF using pdfkit with header and footer images
const generatePDF = (data, outputPath) => {
    return new Promise((resolve, reject) => {
        try {
            const dateSigned = `${data.day} ${data.month}, ${data.year}`;
            const doc = new pdfkit_1.default({ margins: { top: 100, bottom: 100, left: 50, right: 50 } });
            // Paths to the header and footer images
            const headerImagePath = path_1.default.join(__dirname, 'images', 'letter-header.png');
            const footerImagePath = path_1.default.join(__dirname, 'images', 'letter-footer.png');
            // Split jobDescription string into bullet points
            const jobDescriptionBullets = data.jobDescription
                .split('.')
                .map(item => item.trim())
                .filter(item => item.length > 0);
            // Write the PDF to a file
            const writeStream = fs_1.default.createWriteStream(outputPath);
            doc.pipe(writeStream);
            // Add the header image
            doc.image(headerImagePath, 0, 0, { width: doc.page.width });
            // Set a margin after the header image
            const contentTopMargin = 60; // Adjust this value as needed
            doc.moveDown(contentTopMargin / 20); // Move down to add space before the content
            // Add a footer image on every page
            const addFooter = () => {
                doc.image(footerImagePath, 0, doc.page.height - 90, { width: doc.page.width }); // Adjusted Y-position for footer
            };
            // Add footer to the first page
            addFooter();
            // Add event listener to add footer on each new page
            doc.on('pageAdded', () => {
                doc.image(headerImagePath, 0, 0, { width: doc.page.width });
                doc.moveDown(contentTopMargin / 20); // Adjust vertical position after header
                addFooter(); // Add footer to new pages
            });
            // Title
            doc.fontSize(16).font('Times-Bold').text(`${data.jobTitle}`, { align: 'center' });
            doc.fontSize(18).font('Times-Bold').text('SERVICE AGREEMENT', { align: 'center' });
            doc.moveDown(1.5);
            // Agreement content
            doc.fontSize(12).font('Times-Roman').text(`THIS GENERAL SERVICE AGREEMENT CONTRACT (the "Contract") is made and entered into on this ${data.day} day of ${data.month}, ${data.year}, by and between:`, { align: 'left' });
            doc.moveDown(1.5);
            doc.text('Copora Limited, a company duly registered under the laws of Nigeria, with its principal office located at 71-75 Shelton Street, London, England, WC2H 9JQ, United Kingdom ("Employer" or "Company"), represented by its Managing Director, Mr. Andrew Smith,', { align: 'left' });
            doc.moveDown();
            doc.text('AND', { align: 'center' });
            doc.moveDown();
            doc.text(`${data.firstName} ${data.middleName || ''} ${data.lastName}, residing at ${data.address} ("Employee").`, { align: 'left' });
            doc.moveDown(2);
            // Contract body content
            doc.text('1. POSITION', { underline: true });
            doc.moveDown(0.5);
            doc.text(`The Employer agrees to employ the Employee as a ${data.jobTitle}. The Employee shall report to the Employer's designated supervisor and shall perform the duties and responsibilities set forth by the Employer, including but not limited to:`);
            doc.list(jobDescriptionBullets, { bulletRadius: 2 });
            doc.moveDown(1.5);
            doc.text('2. COMMENCEMENT DATE', { underline: true });
            doc.moveDown(0.5);
            doc.text(`The Employee's employment shall commence on the ${data.startDate}.`);
            doc.moveDown(1.5);
            doc.text('3. TERM OF EMPLOYMENT', { underline: true });
            doc.moveDown(0.5);
            doc.text('This Agreement is for an indefinite period unless terminated earlier in accordance with the provisions of this Agreement.');
            doc.moveDown(1.5);
            doc.text('4. COMPENSATION', { underline: true });
            doc.moveDown(0.5);
            doc.text(`The Employee shall be paid a monthly salary of ${data.amount}, subject to deductions for taxes and other withholdings as required by law. Payment shall be made on the last working day of each calendar month.`);
            doc.moveDown(1.5);
            doc.text('5. WORKING HOURS', { underline: true });
            doc.moveDown(0.5);
            doc.text('The Employee shall work [specify working hours], with a lunch break of [specify duration] each day. Any additional hours worked shall be subject to overtime pay as per Nigerian labor law.');
            doc.moveDown(1.5);
            doc.text('6. LEAVE ENTITLEMENT', { underline: true });
            doc.moveDown(0.5);
            doc.text('The Employee shall be entitled to annual leave of [Number] days per calendar year, in accordance with the Company’s leave policy. Sick leave and other leave entitlements shall be provided in line with Nigerian labor laws.');
            doc.moveDown(1.5);
            doc.text('7. CONFIDENTIALITY', { underline: true });
            doc.moveDown(0.5);
            doc.text('The Employee agrees not to disclose any confidential information or trade secrets of the Company, either during the period of employment or after its termination, except as required by law or with the written consent of the Company.');
            doc.moveDown(1.5);
            doc.text('8. TERMINATION OF EMPLOYMENT', { underline: true });
            doc.moveDown(0.5);
            doc.text('8.1. Termination by Employer: The Employer may terminate this Agreement by providing the Employee with [Number] days’ notice or payment in lieu of notice.');
            doc.moveDown(0.5);
            doc.text('8.2. Termination by Employee: The Employee may terminate this Agreement by giving the Employer [Number] days’ notice in writing.');
            doc.moveDown(0.5);
            doc.text('8.3. Immediate Termination: The Employer reserves the right to terminate the Employee without notice in cases of gross misconduct, serious breach of duty, or any act that causes reputational or financial harm to the Company.');
            doc.moveDown(1.5);
            doc.text('9. GOVERNING LAW', { underline: true });
            doc.moveDown(0.5);
            doc.text('This Agreement shall be governed by and construed in accordance with the laws of the Federal Republic of Nigeria.');
            doc.moveDown(1.5);
            doc.text('10. ENTIRE AGREEMENT', { underline: true });
            doc.moveDown(0.5);
            doc.text('This Agreement contains the entire understanding between the parties and supersedes all prior agreements or understandings, oral or written, relating to the Employee\'s employment with the Company.');
            doc.moveDown(1.5);
            doc.text('11. AMENDMENTS', { underline: true });
            doc.moveDown(0.5);
            doc.text('Any amendments or modifications to this Agreement must be made in writing and signed by both parties.');
            doc.moveDown(1.5);
            doc.text('12. SIGNATURES', { underline: true });
            doc.moveDown(1.5);
            // Load and use cursive font for the signatures
            const cursiveFontPath = path_1.default.join(__dirname, 'fonts', 'GreatVibes-Regular.ttf');
            doc.font(cursiveFontPath);
            // Create a grid layout for the signatures
            const signatureYPosition = doc.y; // Capture the current vertical position
            // Employer Signature (left column)
            doc.fontSize(24).text('Andrew Smith', 50, signatureYPosition, { width: 200, align: 'left' });
            doc.font('Times-Roman').fontSize(12).text('Managing Director, Copora Limited', 50, doc.y, { width: 200, align: 'left' });
            doc.moveDown(2);
            doc.text(`Date: ${dateSigned}`, 50, doc.y, { width: 200, align: 'left' });
            // Employee Signature (right column, moved more to the right)
            doc.font(cursiveFontPath);
            doc.fontSize(24).text(`${data.firstName} ${data.middleName || ''} ${data.lastName}`, 400, signatureYPosition, { width: 200, align: 'left' });
            doc.font('Times-Roman').fontSize(12).text('Employee', 400, doc.y, { width: 200, align: 'left' });
            doc.moveDown(2);
            doc.text(`Date: ${dateSigned}`, 400, doc.y, { width: 200, align: 'left' });
            // Finalize the PDF file
            doc.end();
            // Listen for the 'finish' event to resolve the promise when the PDF is fully written
            writeStream.on('finish', resolve);
        }
        catch (error) {
            console.error('Error generating PDF:', error);
            reject(error);
        }
    });
};
exports.generatePDF = generatePDF;
