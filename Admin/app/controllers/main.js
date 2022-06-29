// Cần call API để lấy danh sách giáo viên và hiển thị ra giao diện
mains();
function mains() {
  // B1: Gọi API lấy danh sách giáo viên
  apiGetTeacher().then(function (result) {
    // Tạo biến teachers nhận kết quả trả về từ API
    let teachers = result.data;
    console.log(teachers);
    // duyệt mảng data và tìm danh sách giáo viên
    for (let i = 0; i < teachers.length; i++) {
      let teacher = teachers[i];
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
  let html = "";
  for (let i = 0; i < teachers.length; i++) {
    let teacher = teachers[i];
    if (teacher.loaiND === "GV") {
      html += `
      <tr>
        <td>${i + 1}</td>
        <td>${teacher.taiKhoan}</td>
        <td>${teacher.matKhau}</td>
        <td>${teacher.hoTen}</td>
        <td>${teacher.email}</td>
        <td>${teacher.ngonNgu}</td>
        <td>${teacher.loaiND}</td>
        <td>
          <img src="../img/${teacher.hinhAnh}" width="70px" height="70px" />
        </td>
        <td>${teacher.moTa}</td>
        <td>
          <button
            class="btn btn-primary"
            data-toggle="modal"
            data-target="#myModal"
            data-type="update"
            data-id="${teacher.id}"
          >
            Cập Nhật
          </button>
          <button
            class="btn btn-danger"
            data-type="delete"
            data-id="${teacher.id}"
          >
            Xoá
          </button>
        </td>
      </tr>
    `;
    }
  }
  // DOM tới thẻ div và innerHTML bằng biến html
  console.log(html);
  document.getElementById("tblDanhSachNguoiDung").innerHTML = html;
}

// hàm xử lý gọi API thêm teacher
function addTeacher() {
  // B1 : Dom tới value
  let taiKhoan = document.getElementById("TaiKhoan").value;
  let hoTen = document.getElementById("HoTen").value;
  let matKhau = document.getElementById("MatKhau").value;
  let email = document.getElementById("Email").value;
  let loaiND = document.getElementById("loaiNguoiDung").value;
  let ngonNgu = document.getElementById("loaiNgonNgu").value;
  let moTa = document.getElementById("MoTa").value;
  let hinhAnh = document.getElementById("HinhAnh").value;

  // B2 : khởi tạo đối tượng Teacher
  let teacher = new Teacher(
    null,
    taiKhoan,
    hoTen,
    matKhau,
    email,
    loaiND,
    ngonNgu,
    moTa,
    hinhAnh
  );

  // B3 : gọi APi cập nhật teacher
  apiAddTeacher(teacher)
    .then(function (result) {
      mains();
      resetForm();
      
    })
    .catch(function (error) {
      console.log(error);
    });
    validation();
}

// Hàm xử lý gọi API xoá giáo viên
function deletetTeacher(teacherId) {
  apiDeleteTeacher(teacherId)
    .then(function () {
      // Xoá thành công
      mains();
    })
    .catch(function (error) {
      console.log(error);
    });
}

// Hàm xử lý gọi API cập nhật giáo viên
function updateTeacher() {
  // B1 : Dom tới value
  let id = document.getElementById("MaGV").value;
  let taiKhoan = document.getElementById("TaiKhoan").value;
  let hoTen = document.getElementById("HoTen").value;
  let matKhau = document.getElementById("MatKhau").value;
  let email = document.getElementById("Email").value;
  let loaiND = document.getElementById("loaiNguoiDung").value;
  let ngonNgu = document.getElementById("loaiNgonNgu").value;
  let hinhAnh = document.getElementById("HinhAnh").value;
  let moTa = document.getElementById("MoTa").value;

  // B2 : khởi tạo đối tượng Teacher
  let teacher = new Teacher(
    id,
    taiKhoan,
    hoTen,
    matKhau,
    email,
    loaiND,
    ngonNgu,
    moTa,
    hinhAnh
  );

  // B3: Gọi API cập nhật giáo viên
  apiUpdateTeacher(teacher)
    .then(function (result) {
      // Cập nhật thành công, dữ liệu chỉ mới thay đổi ở phía server, cần gọi lại API getTeacher và hiển thị lại giao diện (đã làm trong hàm mains)
      mains();
      resetForm();
    })
    .catch(function (error) {
      console.log(error);
    });
}

// hàm xử lý reset form và đóng modal
function resetForm() {
  document.getElementById("TaiKhoan").value = "";
  document.getElementById("HoTen").value = "";
  document.getElementById("MatKhau").value = "";
  document.getElementById("Email").value = "";
  document.getElementById("HinhAnh").value = "";
  document.getElementById("MoTa").value = "";

  // $("#myModal").modal("hide");
}

// DOM tới button 'Thêm' để lắng nghe sự kiện addEventListener
document
  .getElementById("btnThemNguoiDung")
  .addEventListener("click", showAddModal);
function showAddModal() {
  // thay đổi test của modal heading
  document.querySelector(".modal-title").innerHTML = "Thêm giáo viên";
  document.querySelector(".modal-footer").innerHTML = `
    <button
      class="btn btn-primary"
      data-type="add"
    >
      Thêm
    </button>
    <button
      class="btn btn-secondary"
      data-toggle="modal"
      data-target="#myModal"
    >
      Huỷ
    </button>
  `;
}

// Uỷ quyền lắng nghe event của các button từ thẻ .modal-footer
document.querySelector(".modal-footer").addEventListener("click", handleSubmit);
function handleSubmit(event) {
  var type = event.target.getAttribute("data-type");
  switch (type) {
    case "add":
      addTeacher();
      break;
    case "update":
      updateTeacher();
      break;
    default:
      break;
  }
}

// Uỷ quyền lắng nghe tất cả event của button Xoá và Cập nhật trong table cho tbody
document
  .getElementById("tblDanhSachNguoiDung")
  .addEventListener("click", handleTeacher);
function handleTeacher(event) {
  // Loại button (delete || update)
  var type = event.target.getAttribute("data-type");
  // Id của sản phẩm
  var id = event.target.getAttribute("data-id");

  switch (type) {
    case "delete":
      deletetTeacher(id);
      break;
    case "update": {
      // Cập nhật giao diện cho modal và call API get thông tin của sản phẩm và fill lên form
      showUpdateModal(id);
      break;
    }
    default:
      break;
  }
}

// Hàm này dùng để cập nhật giao diện cho modal update và call API lấy chi tiết sản phẩm để hiển thị lên giao diện
function showUpdateModal(teacherId) {
  // Thay đổi text của modal heading/ modal footer
  document.querySelector(".modal-title").innerHTML = "Cập nhật sản phẩm";
  document.querySelector(".modal-footer").innerHTML = `
      <button
        class="btn btn-primary"
        data-type="update"
      >
        Cập nhật
      </button>
      <button
        class="btn btn-secondary"
        data-dismiss="modal"
      >
        Huỷ
      </button>
    `;

  // Call API để lấy chi tiết giáo viên
  apiGetTeacherDetail(teacherId)
    .then(function (result) {
      // Thành công, fill data lên form
      var teacher = result.data;
      document.getElementById("MaGV").value = teacher.id;
      document.getElementById("TaiKhoan").value = teacher.taiKhoan;
      document.getElementById("HoTen").value = teacher.hoTen;
      document.getElementById("MatKhau").value = teacher.matKhau;
      document.getElementById("Email").value = teacher.email;
      document.getElementById("loaiNguoiDung").value = teacher.loaiND;
      document.getElementById("loaiNgonNgu").value = teacher.ngonNgu;
      document.getElementById("HinhAnh").value = teacher.hinhAnh;
      document.getElementById("MoTa").value = teacher.moTa;
    })
    .catch(function (error) {
      console.log(error);
    });
}

// DOM tới input search
document.getElementById("txtSearch").addEventListener("keypress", handleSearch);
function handleSearch(evt) {
  console.log(evt);
  // Kiểm tra nếu key click vào không phải là Enter thì bỏ qua
  if (evt.key !== "Enter") return;

  // Nếu key click vào là Enter thì bắt đầu lấy value của input và get teachers
  var value = evt.target.value;
  apiGetTeacher(value).then(function (result) {
    // Tạo biến teachers nhận kết quả trả về từ API
    let teachers = result.data;
    // Sau khi đã lấy được data từ API thành công
    // Duyệt mảng data và khởi tạo các đối tượng Teacher
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

// kiểm tra xem input có hợp lệ hay không
function validation() {
  let taiKhoan = document.getElementById("TaiKhoan").value;
  let hoTen = document.getElementById("HoTen").value;
  let matKhau = document.getElementById("MatKhau").value;
  let email = document.getElementById("Email").value;
  let moTa = document.getElementById("MoTa").value;
  let hinhAnh = document.getElementById("HinhAnh").value;

  let isValid = true;

  // kiểm tra tài khoản nhân viên
  if (!isRequired(taiKhoan)) {
    isValid = flase;
    document.getElementById("TaiKhoan").innerHTML =
      "tài khoản không được để trống";
  } else {
    document.getElementById("TaiKhoan").innerHTML = "";
  }

  // kiểm tra họ tên nhân viên
  let letters = new RegExp("^[A-Za-z]+$");
  if (!isRequired(hoTen)) {
    isValid = false;
    document.getElementById("HoTen").innerHTML = "Tên GV không được để trống";
  } else if (!letters.test(hoTen)) {
    isValid = false;
    document.getElementById("HoTen").innerHTML = "Tên GV có kí tự không hợp lệ";
  } else {
    // Đúng
    document.getElementById("HoTen").innerHTML = "";
  }

  // Dùng regex để kiểm tra mật khẩu có đúng định dạng hay không
  var pwPattern =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,8}$/;
  if (!isRequired(matKhau)) {
    isValid = false;
    document.getElementById("MatKhau").innerHTML =
      "Mật khẩu không được để trống";
  } else if (!pwPattern.test(matKhau)) {
    isValid = false;
    document.getElementById("MatKhau").innerHTML =
      "Mật khẩu không đúng định dạng";
  } else {
    // Đúng
    document.getElementById("MatKhau").innerHTML = "";
  }

  // Dùng regex để kiểm tra email có đúng định dạng hay không
  let emailPattern = new RegExp("[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$");
  if (!isRequired(email)) {
    isValid = false;
    document.getElementById("Email").innerHTML = "Email không được để trống";
  } else if (!emailPattern.test(email)) {
    isValid = false;
    document.getElementById("Email").innerHTML = "Email không đúng định dạng";
  } else {
    // Đúng
    document.getElementById("Email").innerHTML = "";
  }

  // kiểm tra hình ảnh nhân viên
  if (!isRequired(hinhAnh)) {
    isValid = flase;
    document.getElementById("HinhAnh").innerHTML =
      "hình ảnh không được để trống";
  } else {
    document.getElementById("HinhAnh").innerHTML = "";
  }

  // kiểm tra loại người dùng
  if (loaiNguoiDung === "Chọn loại người dùng") {
    isValid = flase;
    document.getElementById("loaiNguoiDung").innerHTML = "bắt buộc phải chọn";
  } else {
    document.getElementById("loaiNguoiDung").innerHTML = "";
  }

  // kiểm tra loại ngôn ngữ
  if(loaiNgonNgu === 'Chọn ngôn ngữ'){
    isValid = flase;
    document.getElementById("loaiNguoiDung").innerHTML = "bắt buộc phải chọn";
  } else {
    document.getElementById("loaiNguoiDung").innerHTML = "";
  }

  // kiểm tra mô tả có đúng định dạng hay không
  let ibPx = new RegExp("{0,60}$");
  if (!isRequired(moTa)) {
    isValid = false;
    document.getElementById("MoTa").innerHTML = "mô tả không được để trống";
  } else if (!ibPx.test(moTa)) {
    isValid = false;
    document.getElementById("MoTa").innerHTML = "mô tả phải có từ 0 - 60 kí tự";
  } else {
    // Đúng
    document.getElementById("MoTa").innerHTML = "";
  }
  return isValid
}
// Hàm kiểm tra input có rỗng hay không
function isRequired(value) {
  if (!value) {
    return false;
  }
  return true;
}
