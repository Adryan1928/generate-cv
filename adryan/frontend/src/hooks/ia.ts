import {
    useMutation,
} from "@tanstack/react-query"
import { generateResume } from "../services/ia";

export const useGenerateResumeMutation = () => {
    return useMutation({
        mutationFn: generateResume,
        onSuccess: (data) => {
            console.log("Resume generated successfully:", data);
        },
    });
}
