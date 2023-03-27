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
        s: (scale: number) => {
          return scale * 3.5;
        },
        m: (scale: number) => {
          return scale * 5;
        },
        l: (scale: number) => {
          return scale * 6.5;
        },
        xl: (scale: number) => {
          return scale * 8;
        },
        xxxl: (scale: number) => {
          return scale * 15;
        },
      },
    },
  };
}
