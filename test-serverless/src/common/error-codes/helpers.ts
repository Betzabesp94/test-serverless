import { BaseLogicError } from './codes';

export function mapBaseErrorType2ErrorCode(error: BaseLogicError) {
  return {
    status: error.status,
    appCode: error.code,
    message: error.message,
  };
}
