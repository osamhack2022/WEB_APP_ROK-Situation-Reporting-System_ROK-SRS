export default function koreanTimeFormat(UTCdate) {
  const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
  const krDate = new Date(new Date(UTCdate) + KR_TIME_DIFF);
  return (
    '' + krDate.getFullYear() + '/' + (krDate.getMonth() + 1) + '/' + krDate.getDate()
    + ' ' + (krDate.getHours() < 10 ? '0' + krDate.getHours() : krDate.getHours())
    + ':' + (krDate.getMinutes() < 10 ? '0' + krDate.getMinutes() : krDate.getMinutes())
  )
}