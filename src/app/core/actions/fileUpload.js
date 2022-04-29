import axios from "axios";

export const fileUpload = (files) => {
  const data = new FormData();
  data.append('file', files )
  return axios.post('file', data, {
    onUploadProgress : (event) => {
            if (event.lengthComputable) {
               console.log(Math.round((100 * event.loaded) / event.total));
              // this.updateProgressBarValue(progressEvent);
            }
  }});
}

export const fileDelete = (Path) => {
  const body = {path : Path}
  return axios.post('delete/file', body);
}