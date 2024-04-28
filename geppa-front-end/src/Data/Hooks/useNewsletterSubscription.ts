import {NewsletterService} from "../Services/NewsletterService.ts";
import {useEffect, useState} from "react";

export const useNewsletterSubscription = () => {
    const [email, setEmail] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [toast, setToast] = useState<{ message: string; isSuccess: boolean } | null>(null);

    useEffect(() => {
        if (toast) {
            const timer = setTimeout(() => {
                setToast(null);
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [toast]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setToast(null);

        try {
            const newsletterService = new NewsletterService();
            const {success, message} = await newsletterService.inscricaoNewsletter({email});

            setToast({
                message,
                isSuccess: success,
            });
            setEmail("");
        } catch (error) {
            setToast({
                message: "Ocorreu um erro ao se inscrever na newsletter. Por favor, tente novamente mais tarde.",
                isSuccess: false,
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return {email, handleChange, handleSubmit, isSubmitting, toast};
};