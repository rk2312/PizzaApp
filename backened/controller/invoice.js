import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import PDFDocument from 'pdfkit';
import fs from 'fs';
import transporter from "../config/emailconfig.js";
dotenv.config();

function generateInvoice(invoiceData, filePath) {
    return new Promise((resolve, reject) => {
        const doc = new PDFDocument();

        // Pipe the PDF document to a writable stream
        const stream = fs.createWriteStream(filePath);
        doc.pipe(stream);

        // Add content to the PDF document
        doc.fontSize(20).text('Invoice', { align: 'center' });
        doc.moveDown();
        doc.fontSize(12).text(`Invoice Number: ${invoiceData.invoiceNumber}`);
        doc.fontSize(12).text(`Date: ${invoiceData.date}`);
        doc.moveDown();
        doc.fontSize(14).text('Items:', { underline: true });
        doc.moveDown();
        invoiceData.items.forEach(item => {
            doc.fontSize(12).text(`- ${item.name}: $${item.price}`);
        });
        doc.moveDown();
        doc.fontSize(16).text(`Total: $${invoiceData.total}`, { align: 'right' });

        // Finalize the PDF document
        doc.end();

        stream.on('finish', () => {
            console.log(`Invoice PDF generated successfully at ${filePath}`);
            resolve();
        });

        stream.on('error', (error) => {
            console.error('Error generating invoice PDF:', error);
            reject(error);
        });
    });
}

function getFileSize(filePath) {
    try {
        const stats = fs.statSync(filePath);
        const fileSizeInBytes = stats.size;
        const fileSizeInKilobytes = fileSizeInBytes / 1024; // Convert bytes to kilobytes
        return fileSizeInKilobytes;
    } catch (error) {
        console.error('Error getting file size:', error);
        return null;
    }
}
// Function to send email with invoice attachment
export async function sendInvoiceEmail(customerEmail, invoiceData) {
    try {
        const pdfBuffer = await generateInvoice( invoiceData, 'invoice.pdf');
        console.log('Invoice PDF generated successfully.');

        //check size 
        const attachmentFilePath = 'invoice.pdf'; 
        const fileSizeInKilobytes = getFileSize(attachmentFilePath);
        console.log(`Attachment size: ${fileSizeInKilobytes} KB`);
        let info = await transporter.sendMail({
            from: process.env.EMAIL_FROM,
            to: customerEmail,
            subject: "Invoice for Your Recent Payment",
            text: 'Please find attached invoice for your recent payment.', // Plain text body of the email
            attachments: [{ filename: 'invoice.pdf', content: pdfBuffer }] // Attachment containing the invoice PDF
          })
        console.log('Invoice email sent successfully.');
    } catch (error) {
        console.error('Error sending invoice email:', error);
    }
}
