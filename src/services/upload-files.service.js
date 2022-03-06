import http from "./http-common";

class UploadFilesService {

  upload(file, onUploadProgress) {
    let formData = new FormData();
    formData.append("file", file);
    return http.post("/files/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress,
    });
  }

  getFiles() {
    return http.get("/files/allfiles");
  }

  downloadFile1(id) {
    return http.get("/files/"+id);
  }

  deleteFile(id) {
    return http.delete("/files/delete/"+id);
  }

}
export default new UploadFilesService();