export default defineActionConstants([
  'API_RESP',
  'SUBMIT_TICKET',
  'SUBMIT_FEEDBACK',
  'FEEDBACK_RESP'
]);

function defineActionConstants(names) {
  return names.reduce((result, name) => {
    result[name] = name;
    return result;
  }, {});
}
