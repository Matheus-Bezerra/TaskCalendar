export const formatTableDate = (date: string) => {
  const [year, month, dayAndTime] = date.replace(/-/gi, '/').split('/');
  const [day, time] = dayAndTime.split(' ');
  const formattedtableWithDateTime = `${day}/${month}/${year} ${time}`;
  return formattedtableWithDateTime;
};