const baseUrl = "https://62b6d6b66999cce2e808ccad.mockapi.io/teacher";

// hàm call API lấy danh sách giáo viên
function apiGetTeacher(search) {
  return axios({
    url: baseUrl,
    method: "GET",
    params: {
        name: search,
      },
  });
}

// Hàm call API thêm giáo viên
function apiAddTeacher(teacher) {
    return axios({
      url: baseUrl,
      method: "POST",
      data: teacher,
    });
  }

// Hàm call API xoá giáo viên
function apiDeleteTeacher(teacherId) {
    return axios({
      url: `${baseUrl}/${teacherId}`,
      method: "DELETE",
    });
  }

// Hàm call API lấy chi tiết giáo viên
function apiGetTeacherDetail(teacherId) {
    return axios({
      url: `${baseUrl}/${teacherId}`,
      method: "GET",
    });
  }

  // Hàm call API cập nhật giáo viên
function apiUpdateTeacher(teacher) {
    return axios({
      url: `${baseUrl}/${teacher.id}`,
      data: teacher,
      method: "PUT",
    });
  }