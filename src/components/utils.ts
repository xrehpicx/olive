export function fallbackCopyTextToClipboard(text: string) {
  var textArea = document.createElement("textarea");
  textArea.value = text;

  // Avoid scrolling to bottom
  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.position = "fixed";

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    var successful = document.execCommand("copy");
    var msg = successful ? "successful" : "unsuccessful";
    console.log("Fallback: Copying text command was " + msg);
  } catch (err) {
    console.error("Fallback: Oops, unable to copy", err);
  }

  document.body.removeChild(textArea);
}
export function copyTextToClipboard(text: string) {
  return new Promise((res, rej) => {
    if (!navigator.clipboard) {
      res(fallbackCopyTextToClipboard(text));
      return;
    }
    navigator.clipboard.writeText(text).then(
      function () {
        res(text);
      },
      function (err: any) {
        rej(err);
      }
    );
  });
}
