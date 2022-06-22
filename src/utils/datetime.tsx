export const getTimeFromNumber = (num: number) => {
  if (!num) return "";

  const hours = Math.floor(num / 3600);
  const minutes = Math.floor((num - hours * 3600) / 60);
  const seconds = num - hours * 3600 - minutes * 60;

  return (
    `${hours < 10 ? "0" + hours : hours}:` +
    `${minutes < 10 ? "0" + minutes : minutes}:` +
    `${seconds < 10 ? "0" + seconds : seconds}`
  );
};
