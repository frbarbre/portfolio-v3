import { PrismTheme } from 'prism-react-renderer';

export const customTheme: PrismTheme = {
  plain: {
    backgroundColor: '#000',
    color: '#fff',
  },
  styles: [
    {
      types: ['comment'],
      style: {
        color: 'hsla(0,0%,63%,1)',
        fontStyle: 'italic', // Fixed type: must be "italic", "normal", or undefined
      },
    },
    {
      types: ['string', 'char', 'tag'],
      style: {
        color: 'oklch(73.1% 0.2158 148.29)',
      },
    },
    {
      types: ['function', 'attr-name'],
      style: {
        color: 'oklch(69.87% 0.2037 309.51)',
        fontWeight: 'normal', // Ensure it's either "bold" or "normal"
      },
    },
    {
      types: ['keyword', 'operator'],
      style: {
        color: 'oklch(69.36% 0.2223 3.91)',
      },
    },
    {
      types: ['variables'],
      style: {
        color: 'oklch(69.36% 0.2223 3.91)',
      },
    },
    // Add more types as needed
  ],
};
