export function Theme() {
  return {
    color: {
      b100: '#bcd8a7',
      b200: '#bcd8a7',
      b300: '#92a177',
      b400: '#344f38',
      b500: '#FFFFFF',

      sOk: '#A4C538',
      sError: '#DF2A2A',
      sWarning: '#FFCE3B',
    },
    font: {
      size: {
        s: (size: { width: number; height: number; scale: number }) => {
          return 12 - size.scale;
        },
        m: (size: { width: number; height: number; scale: number }) => {
          return 15 - size.scale;
        },
        l: (size: { width: number; height: number; scale: number }) => {
          return 20 - size.scale;
        },
        xl: (size: { width: number; height: number; scale: number }) => {
          return 25 - size.scale;
        },
        xxxl: (size: { width: number; height: number; scale: number }) => {
          return 30 - size.scale;
        },
      },
    },
  };
}
