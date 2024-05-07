// src/controllers/certificateController.js
import { PDFDocument, rgb } from 'pdf-lib';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import Certificate from '../models/certificate.js';

// Dummy controller for now
export const getCertificates = async (req, res) => {
    try {
        // Fetch all certificate documents from the database
        const certificates = await Certificate.find();

        // If there are no certificates found, respond with a 404 status and a message
        if (!certificates || certificates.length === 0) {
            return res.status(404).json({ error: 'No certificates found' });
        }

        // If certificates are found, respond with the certificates
        res.status(200).json({ certificates });
    } catch (error) {
        // If an error occurs during the process, respond with a 500 status and an error message
        console.error('Error fetching certificates:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const viewCertificate = async (req, res) => {
    const certificateId = req.params.id; // Assuming the ID is passed in the request parameters

    try {
        // Find the certificate document by ID
        const certificate = await Certificate.findById(certificateId);

        // If no certificate is found, respond with a 404 status and a message
        if (!certificate) {
            return res.status(404).json({ error: 'Certificate not found' });
        }

        // If the certificate is found, respond with the certificate
        res.status(200).json({ certificate });
    } catch (error) {
        // If an error occurs during the process, respond with a 500 status and an error message
        console.error('Error viewing certificate:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const generateCertificate = async (req, res) => {
    const { email, name, course, date } = req.body;

    try {
        // Create a new certificate document
        // const certificate = new Certificate({
        //     name,
        //     email,
        //     date: new Date(), // Current date
        //     driveLink,
        //     course
        // });
        const certificate = new Certificate({
            name,
            email,
            date: date, // Current date
            driveLink: 'YOUR_GOOGLE_DRIVE_LINK_HERE', // Hardcoded for now
            course
        });

        // Save the certificate document to the database
        await certificate.save();

        res.status(201).json({ message: 'Certificate generated and saved successfully' });
    } catch (error) {
        console.error('Error generating certificate:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


const fillPdfForm = async (inputPath, outputPath, formData) => {
    try {
        // Get the directory path of the current module
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = dirname(__filename);

        // Construct the input path
        const inputPath1 = path.resolve(__dirname, inputPath);
        // Load existing PDF
        const pdfBytes = fs.readFileSync(inputPath1);
        const pdfDoc = await PDFDocument.load(pdfBytes);

        // Get form fields
        const form = pdfDoc.getForm();
        const fields = form.getFields();

        // Fill form fields with data
        for (const [fieldName, fieldValue] of Object.entries(formData)) {
            const field = fields[fieldName];
            if (field) {
                field.setText(fieldValue);
            }
        }

        // Serialize the PDF
        const pdfBytesFilled = await pdfDoc.save();

        // Write filled PDF to file
        fs.writeFileSync(outputPath, pdfBytesFilled);

        console.log('Filled PDF saved successfully:', outputPath);
    } catch (error) {
        console.error('Error filling PDF form:', error);
    }
};

// Example usage


