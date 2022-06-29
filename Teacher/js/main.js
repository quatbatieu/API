// Tạo lớp đối tượng Teacher
function Teacher(
  id,
  taiKhoan,
  hoTen,
  matKhau,
  email,
  loaiND,
  ngonNgu,
  moTa,
  hinhAnh
) {
  // thuộc tính
  this.id = id;
  this.taiKhoan = taiKhoan;
  this.hoTen = hoTen;
  this.matKhau = matKhau;
  this.email = email;
  this.loaiND = loaiND;
  this.ngonNgu = ngonNgu;
  this.moTa = moTa;
  this.hinhAnh = hinhAnh;
}

// Cần call API để lấy danh sách giáo viên và hiển thị ra giao diện
mains();
function mains() {
  // B1: Gọi API lấy danh sách giáo viên
  apiGetTeacher().then(function (result) {
    // Tạo biến teachers nhận kết quả trả về từ API
    var teachers = result.data;
    console.log(teachers);
    // duyệt mảng data và tìm danh sách giáo viên
    for (var i = 0; i < teachers.length; i++) {
      var teacher = teachers[i];
      teachers[i] = new Teacher(
        teacher.id,
        teacher.taiKhoan,
        teacher.hoTen,
        teacher.matKhau,
        teacher.email,
        teacher.loaiND,
        teacher.ngonNgu,
        teacher.moTa,
        teacher.hinhAnh
      );
    }
    // Gọi hàm display để hiển thị danh sách sản phẩm ra giao diện
    display(teachers);
  });
}
function display(teachers) {
  var html = "";
  for (var i = 0; i < teachers.length; i++) {
    var teacher = teachers[i];
    if (teacher.loaiND === "GV") {
      html += `
        <div class="col-3">
            <div class="styleImg" >
              <img src="./img/${teacher.hinhAnh}" alt="" />
            </div>
            <div class="text">
              <p>${teacher.ngonNgu}</p>
              <h1>${teacher.hoTen}</h1>
              <span
                >${teacher.moTa}</span
              >
            </div>
          </div>
          `;
        console.log(teacher);
    }
    
  }
  // DOM tới thẻ div và innerHTML bằng biến html
  console.log(html);
  document.getElementById("dsTeacher").innerHTML = html;
}
