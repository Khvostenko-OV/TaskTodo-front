export default function sendForm(event, path, request) {
  event.preventDefault();
  const formData = new FormData(event.target);
  request(path, 'POST', formData, '');
}
