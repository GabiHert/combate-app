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
        s: (width: number) => {
          return (width * 15) / 600;
        },
        m: (width: number) => {
          return (width * 20) / 600;
        },
        l: (width: number) => {
          return (width * 25) / 600;
        },
        xl: (width: number) => {
          return (width * 30) / 600;
        },
        xxxl: (width: number) => {
          return (width * 50) / 600;
        },
        xxxxl: (width: number) => {
          return (width * 70) / 600;
        },
      },
    },
  };
}
