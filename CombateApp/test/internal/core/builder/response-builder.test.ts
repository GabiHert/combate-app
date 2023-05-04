import { responseBuilder } from '../../../../src/internal/core/builder/response-builder';

describe('response-builder test', () => {
  it('should', () => {
    const protocol = '&00S000xxxU,001220.00,A,3001.89425,S,05109.81024,W,0.374,,240719,,,A75';
    responseBuilder.build(protocol);
  });
});
