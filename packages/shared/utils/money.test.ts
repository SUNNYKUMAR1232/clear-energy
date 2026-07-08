import { formatMoney } from './money';

describe('formatMoney utility', () => {
    it('correctly formats paise to the Indian locale (INR)', () => {
        // 12345600 paise = 1,23,456.00 Rupees
        const result = formatMoney(12345600);
        
        // The exact space character between ₹ and the number can vary by Node/V8 version,
        // so we check if it includes the formatted numeric portion and the currency symbol.
        expect(result).toContain('1,23,456.00');
        expect(result).toContain('₹');
    });

    it('handles zero paise correctly', () => {
        const result = formatMoney(0);
        expect(result).toContain('0.00');
    });
});
