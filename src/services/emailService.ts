import emailjs from '@emailjs/browser';

const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID!;
const templateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID!;
const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY!;


export const sendEmail = async (formData: { name: string; email: string; message: string }) => {
    return await emailjs.send(
        serviceID,
        templateID,
        {
            name: formData.name,
            email: formData.email,
            message: formData.message,
        },
        publicKey
    );
};
