import { styled } from "@/styles";

export const container = styled(() => ({
    width: '100%',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 40px',
    '@media': {
        '(max-width: 1200px)': {
            padding: '0 32px',
        },
        '(max-width: 768px)': {
            padding: '0 24px',
        },
        '(max-width: 480px)': {
            padding: '0 12px',
        },
        '(max-width: 345px)': {
            padding: '0 8px',
        },
    },
}));