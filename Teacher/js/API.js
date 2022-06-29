var baseUrl = "https://62b6d6b66999cce2e808ccad.mockapi.io/teacher";

// hàm call API lấy danh sách giáo viên
function apiGetTeacher(search) {
  return axios({
    url: baseUrl,
    method: "GET",
  });
}
