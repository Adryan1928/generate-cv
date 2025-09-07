import {
    useMutation,
} from '@tanstack/react-query';
import { generatePDF } from '../services/pdf';


export const useGeneratePDFMutation = () => {
    return useMutation({
        mutationFn: generatePDF,
        onSuccess: () => {
            console.log('PDF generated successfully');
        },
    });
}