import { RequestDto } from "../dto/request-dto";
import { ResponseDto } from "../dto/response-dto";

export function calculateAppliedDoses(
  requestDto: RequestDto,
  responseDto: ResponseDto
) {
  let requestedApplicatorsAmount = 0;
  if (requestDto.dose) {
    requestedApplicatorsAmount =
      (requestDto.dose.centerApplicator ? 1 : 0) +
      (requestDto.dose.leftApplicator ? 1 : 0) +
      (requestDto.dose.rightApplicator ? 1 : 0);
  }

  let respondedApplicatorsAmount =
    (responseDto.centerApplicator ? 1 : 0) +
    (responseDto.leftApplicator ? 1 : 0) +
    (responseDto.rightApplicator ? 1 : 0);

  let doseAmount: number = 0;
  let systematicDoses: number = 0;
  const requestedDoses = requestDto?.dose?.amount || 0;

  if (responseDto.status != "N" && responseDto.status != "E") {
    let aux = Number(responseDto.status);
    if (aux == 0) {
      aux = 10;
    }

    if (aux > requestedDoses) {
      systematicDoses = (aux - requestedDoses) * respondedApplicatorsAmount;
      doseAmount = requestedDoses * requestedApplicatorsAmount;
    } else {
      doseAmount = aux * requestedApplicatorsAmount;
    }
  }

  return {
    doseAmount,
    systematicDoses,
    requestedApplicatorsAmount,
  };
}
