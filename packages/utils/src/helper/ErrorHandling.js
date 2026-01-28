import Literal from "@ui/literals";
import { isString } from "./Helper";


export function handleAxiosError(response, lang) {
  // Handle the error (e.g., show a modal, toast, or alert)
  let isDuplicate =
    isString(response?.data) &&
    response?.data?.indexOf(Literal.duplicateMsgKey) > -1;
  if (response?.status >= 500 || response?.status == 404) {
    // store.dispatch(
    //   setError({
    //     title: getTitle(response),
    //     openDialog: true,
    //     message: response?.data,
    //     msgArray: showBullets(),
    //   })
    // );
  }
  function getTitle() {
    if (isDuplicate) {
      return Literal[lang].alert;
    } else {
      return Literal[lang].failed;
    }
  }
  function showBullets() {
    if (isDuplicate) {
      return "";
    } else {
      return [Literal[lang].technicalGlitch, Literal.contactSupport];
    }
  }
}
