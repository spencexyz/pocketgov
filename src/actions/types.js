export default defineActionConstants([
  'API_RESP',
  'SUBMIT_TICKET',
]);

function defineActionConstants(names) {
  return names.reduce((result, name) => {
    result[name] = name;
    return result;
  }, {});
}
