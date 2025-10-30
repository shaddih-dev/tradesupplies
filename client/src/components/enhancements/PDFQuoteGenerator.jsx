import React from 'react';
import { jsPDF } from 'jspdf';

/**
 * Professional PDF Quote Generator
 * Generates beautiful, branded quote PDFs for customers
 */

const PDFQuoteGenerator = ({ 
    configuration, 
    pricing, 
    customerInfo = null 
}) => {
    
    const generatePDF = () => {
        const doc = new jsPDF();
        
        // Company Header with Branding
        doc.setFillColor(37, 99, 235); // Blue header
        doc.rect(0, 0, 210, 40, 'F');
        
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(24);
        doc.setFont(undefined, 'bold');
        doc.text('SIGN TRADE SUPPLIES', 105, 20, { align: 'center' });
        
        doc.setFontSize(12);
        doc.setFont(undefined, 'normal');
        doc.text('Custom Sign Panel Quote', 105, 30, { align: 'center' });
        
        // Quote Details Box
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(10);
        let y = 50;
        
        doc.setFont(undefined, 'bold');
        doc.text('QUOTE DETAILS', 20, y);
        doc.setFont(undefined, 'normal');
        y += 5;
        doc.setDrawColor(200, 200, 200);
        doc.line(20, y, 190, y);
        y += 8;
        
        // Quote metadata
        const quoteNumber = `STS-${Date.now().toString().slice(-8)}`;
        const quoteDate = new Date().toLocaleDateString('en-GB', { 
            day: '2-digit', 
            month: 'long', 
            year: 'numeric' 
        });
        
        doc.text(`Quote Number: ${quoteNumber}`, 20, y);
        doc.text(`Valid Until: ${new Date(Date.now() + 30*24*60*60*1000).toLocaleDateString('en-GB')}`, 120, y);
        y += 6;
        doc.text(`Date: ${quoteDate}`, 20, y);
        y += 10;
        
        // Panel Specifications Section
        doc.setFont(undefined, 'bold');
        doc.setFontSize(12);
        doc.text('PANEL SPECIFICATIONS', 20, y);
        doc.setFontSize(10);
        y += 5;
        doc.line(20, y, 190, y);
        y += 8;
        doc.setFont(undefined, 'normal');
        
        const specs = [
            ['Panel Dimensions:', `${configuration.width}mm × ${configuration.height}mm`],
            ['Panel Area:', `${pricing.breakdown.area} m²`],
            ['Panel Shape:', configuration.selectedPanelShape?.text || 'Rectangle'],
            ['Material:', configuration.selectedPanelMaterial?.text || 'ACM'],
            ['Panel Colour:', configuration.selectedPanelColour?.text || 'White/Grey'],
            ['Corner Type:', configuration.selectedRadius?.value ? `Radius ${configuration.selectedRadius.value}mm` : 'Square'],
        ];
        
        specs.forEach(([label, value]) => {
            doc.setFont(undefined, 'bold');
            doc.text(label, 20, y);
            doc.setFont(undefined, 'normal');
            doc.text(value, 80, y);
            y += 6;
        });
        
        y += 5;
        
        // Channel Configuration Section
        doc.setFont(undefined, 'bold');
        doc.setFontSize(12);
        doc.text('CHANNEL CONFIGURATION', 20, y);
        doc.setFontSize(10);
        y += 5;
        doc.line(20, y, 190, y);
        y += 8;
        doc.setFont(undefined, 'normal');
        
        const channelSpecs = [
            ['Channel Size:', configuration.selectedChannelSize?.text || 'Medium'],
            ['Channel Colour:', configuration.selectedChannelColour?.text || 'Grey'],
            ['Number of Channels:', pricing.breakdown.numChannels?.toString() || '2'],
            ['Total Channel Length:', `${pricing.breakdown.channelLength || 0}m`],
            ['Fixing Method:', configuration.selectedFixingMethod?.text || 'Adhesive'],
        ];
        
        channelSpecs.forEach(([label, value]) => {
            doc.setFont(undefined, 'bold');
            doc.text(label, 20, y);
            doc.setFont(undefined, 'normal');
            doc.text(value, 80, y);
            y += 6;
        });
        
        y += 5;
        
        // Post Configuration (if applicable)
        if (configuration.checkedPostOption) {
            doc.setFont(undefined, 'bold');
            doc.setFontSize(12);
            doc.text('POST CONFIGURATION', 20, y);
            doc.setFontSize(10);
            y += 5;
            doc.line(20, y, 190, y);
            y += 8;
            doc.setFont(undefined, 'normal');
            
            const postSpecs = [
                ['Post Profile:', configuration.selectedPostSize?.size || 'N/A'],
                ['Post Colour:', configuration.selectedPostColour?.text || 'N/A'],
                ['Number of Posts:', configuration.postQuantity?.toString() || '2'],
                ['Post Length:', configuration.selectedPostLength?.text || 'N/A'],
            ];
            
            postSpecs.forEach(([label, value]) => {
                doc.setFont(undefined, 'bold');
                doc.text(label, 20, y);
                doc.setFont(undefined, 'normal');
                doc.text(value, 80, y);
                y += 6;
            });
            
            y += 5;
        }
        
        // Price Breakdown Section
        y += 10;
        doc.setFillColor(240, 240, 240);
        doc.rect(20, y - 5, 170, 50, 'F');
        
        doc.setFont(undefined, 'bold');
        doc.setFontSize(12);
        doc.text('PRICE BREAKDOWN', 25, y);
        y += 10;
        doc.setFontSize(10);
        
        const priceRows = [
            ['Base Panel (including material & acreage):', `£${pricing.basePrice || '0.00'}`],
            ['Channels & Interlocking:', `£${pricing.channelPrice || '0.00'}`],
            ['Posts & Fixings:', `£${pricing.fixingsPrice || '0.00'}`],
        ];
        
        priceRows.forEach(([label, value]) => {
            doc.setFont(undefined, 'normal');
            doc.text(label, 25, y);
            doc.text(value, 160, y);
            y += 6;
        });
        
        y += 3;
        doc.setDrawColor(37, 99, 235);
        doc.setLineWidth(0.5);
        doc.line(25, y, 185, y);
        y += 8;
        
        // TOTAL
        doc.setFont(undefined, 'bold');
        doc.setFontSize(14);
        doc.setTextColor(37, 99, 235);
        doc.text('TOTAL PRICE:', 25, y);
        doc.text(`£${pricing.totalPrice || '0.00'}`, 160, y);
        
        // Footer with Terms
        doc.setTextColor(100, 100, 100);
        doc.setFontSize(8);
        doc.setFont(undefined, 'normal');
        y = 270;
        doc.text('Terms & Conditions:', 20, y);
        y += 4;
        doc.text('• Quote valid for 30 days from date of issue', 20, y);
        y += 4;
        doc.text('• Prices exclude VAT and delivery charges', 20, y);
        y += 4;
        doc.text('• Final price may vary based on actual measurements and specifications', 20, y);
        y += 4;
        doc.text('• Production time: 5-10 working days from order confirmation', 20, y);
        
        // Footer bar
        doc.setFillColor(37, 99, 235);
        doc.rect(0, 287, 210, 10, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(9);
        doc.text('Sign Trade Supplies | www.signtradesupplies.co.uk | info@signtradesupplies.co.uk', 105, 293, { align: 'center' });
        
        // Save the PDF
        const filename = `SignPanel-Quote-${quoteNumber}.pdf`;
        doc.save(filename);
        
        return filename;
    };
    
    return (
        <button
            onClick={generatePDF}
            className="pdf-quote-button"
            style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                padding: '12px 24px',
                borderRadius: '8px',
                border: 'none',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'transform 0.2s, box-shadow 0.2s',
            }}
            onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 10px 20px rgba(102, 126, 234, 0.3)';
            }}
            onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
            }}
        >
            📄 Download Quote PDF
        </button>
    );
};

export default PDFQuoteGenerator;
