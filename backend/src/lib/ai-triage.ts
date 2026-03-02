import { prisma } from './prisma';
import { OCRService } from './ocr';

export const AIService = {
  /**
   * Enhanced AI Triage logic with OCR Integration
   */
  async processTriage(sessionId: string, intakeData: any) {
    const triage = await prisma.triage.findUnique({
      where: { session_id: sessionId },
    });

    if (!triage) throw new Error('Triage session not found');

    // If documents are present, trigger OCR (Simulated)
    let ocrResults: any[] = [];
    if (triage.document_links && triage.document_links.length > 0) {
        for (const link of triage.document_links) {
            const ocr = await OCRService.processDocument(link);
            ocrResults.push(ocr);
        }
    }

    const summary = `Caso triagado em ${new Date().toLocaleDateString()}. Fatos principais: ${intakeData.description.slice(0, 100)}... ${ocrResults.length > 0 ? '(Docs Processados via OCR)' : ''}`;

    // Auto classification
    let classification = 'Civil';
    const text = intakeData.description.toLowerCase();
    if (text.includes('crime') || text.includes('polícia')) classification = 'Criminal';
    if (text.includes('trabalho') || text.includes('demissão')) classification = 'Trabalhista';
    if (text.includes('divórcio') || text.includes('família')) classification = 'Família';

    return prisma.triage.update({
      where: { session_id: sessionId },
      data: {
        ai_summary: summary,
        auto_classification: classification,
        intake_data: { ...intakeData, ocr_results: ocrResults }
      },
    });
  },

  async generateTriagePDF(triageId: string) {
    return `https://aurexlaw.s3.amazonaws.com/triage_${triageId}.pdf`;
  }
};
