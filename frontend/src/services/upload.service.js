export const uploadService = {
  uploadImg
}
function uploadImg(ev) {
  const CLOUD_NAME = "dwdpgwxqv"
  const UPLOAD_PRESET = "mthqhg3r"
  const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`
  console.log(' ev.target.files[0]', ev.target.files[0])

  const formData = new FormData();
  formData.append('upload_preset', UPLOAD_PRESET);
  formData.append('file', ev.target.files[0])

  return fetch(UPLOAD_URL, {
    method: 'POST',
    body: formData
  })
    .then(res => res.json())
    .then(res => {
      return res
    })
    .catch(err => console.error(err))
}
