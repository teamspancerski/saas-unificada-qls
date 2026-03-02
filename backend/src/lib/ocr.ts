export const OCRService = {
  /**
   * Mock for Nanonets OCR Integration
   * In production, this would call Nanonets API with the document buffer.
   */
  async processDocument(documentUrl: string) {
    console.log(`[OCR] Processing document: ${documentUrl} with Nanonets...`);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Mock output based on filename/type
    if (documentUrl.includes('RG')) {
        return {
            type: 'Identity',
            extracted_data: { name: 'JOÃO SILVA', number: '12.345.678-9', issuer: 'SSP/SP' },
            confidence: 0.98
        };
    }

    return {
        type: 'General',
        extracted_data: { summary: 'Documento processado via Nanonets OCR.' },
        confidence: 0.95
    };
  }
};
