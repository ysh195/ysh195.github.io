const captureSetClassName = "capture-set";
const imgSetClassName = "image-set";
const requestSetClassName = "request-set";

const start_capturing_btn_id = "start-btn";
const stop_capturing_btn_id = "stop-btn";
const complete_capturing_btn_id = "complete_btn";
const delete_img_btn_id = "delete-btn";
const request_btn_id = "request-btn";
const fileId_input_id = "fileId";
const password_input_id = "password";
const google_script_link_id = "link";

const nameOfSavedFileId = "googleSheet_file_id";
const nameOfSavedPassword = "maddal_fans_page_pw";

function page_init() {
  createCaptureAndStopButton();
  createImageControlBtn();
  createImageContainer();
  createRequestSet();

  applyMethodsToElements();

  getSavedIdAndPw();
}

function createCaptureAndStopButton() {
  const parent = document.createElement("div");
  const start_capturing_btn = document.createElement("button");
  const stop_capturing_btn = document.createElement("button");

  start_capturing_btn.innerText = "캡쳐 시작";
  start_capturing_btn.id = start_capturing_btn_id;
  start_capturing_btn.className = captureSetClassName;

  stop_capturing_btn.innerText = "캡쳐 종료";
  stop_capturing_btn.id = stop_capturing_btn_id;
  stop_capturing_btn.className = captureSetClassName;

  parent.appendChild(start_capturing_btn);
  parent.appendChild(stop_capturing_btn);

  document.body.appendChild(parent);
}

function createImageControlBtn() {
  const parent = document.createElement("div");
  const complete_capturing_btn = document.createElement("button");
  const delete_img_btn = document.createElement("button");

  complete_capturing_btn.innerText = "이미지 완성";
  complete_capturing_btn.id = complete_capturing_btn_id;
  complete_capturing_btn.className = imgSetClassName;
  complete_capturing_btn.hidden = true;
  complete_capturing_btn.disabled = true;

  delete_img_btn.innerText = "이미지 삭제";
  delete_img_btn.id = delete_img_btn_id;
  delete_img_btn.className = imgSetClassName;
  delete_img_btn.hidden = true;
  delete_img_btn.disabled = true;

  parent.appendChild(complete_capturing_btn);
  parent.appendChild(delete_img_btn);

  document.body.appendChild(parent);
}

function createImageContainer() {
  const parent = document.createElement("div");
  parent.id = image_container_id;
  parent.className = imgSetClassName;
  parent.hidden = true;

  document.body.appendChild(parent);
}

function createRequestSet() {
  const parent = document.createElement("div");
  const div1 = document.createElement("div");
  const div2 = document.createElement("div");
  const div3 = document.createElement("div");
  const label_for_fileId = document.createElement("label");
  const label_for_password = document.createElement("label");
  const input_for_fileId = document.createElement("input");
  const input_for_password = document.createElement("input");
  const request_btn = document.createElement("button");
  const link = document.createElement("a");

  parent.className = requestSetClassName;
  input_for_fileId.className = requestSetClassName;
  input_for_password.className = requestSetClassName;
  request_btn.className = requestSetClassName;
  link.className = requestSetClassName;

  parent.hidden = true;
  input_for_fileId.hidden = true;
  input_for_password.hidden = true;
  request_btn.hidden = true;
  link.hidden = true;

  input_for_fileId.disabled = true;
  input_for_password.disabled = true;
  request_btn.disabled = true;
  link.disabled = true;

  input_for_fileId.id = fileId_input_id;
  input_for_password.id = password_input_id;
  request_btn.id = request_btn_id;
  link.id = google_script_link_id;

  input_for_fileId.type = "text";
  input_for_password.type = "password";

  label_for_fileId.innerText = "파일ID  ";
  label_for_password.innerText = "비밀번호  ";
  request_btn.innerText = "텍스트 추출";

  div2.appendChild(label_for_fileId);
  div2.appendChild(input_for_fileId);

  div3.appendChild(label_for_password);
  div3.appendChild(input_for_password);

  div1.appendChild(div2);
  div1.appendChild(div3);
  div1.appendChild(request_btn);

  parent.appendChild(div1);
  parent.appendChild(link);

  document.body.appendChild(parent);
}

function applyMethodsToElements() {
  applyMethodToStartBtn();
  applyMethodToStopBtn();
  applyMethodToCompleteBtn();
  applyMethodToDeleteBtn();
  applyMethodToRequestBtn();
}

function applyMethodToStartBtn() {
  document
    .getElementById(start_capturing_btn_id)
    .addEventListener("click", async (e) => {
      e.stopPropagation();

      await captureScreen();
    });
}

function applyMethodToStopBtn() {
  document
    .getElementById(stop_capturing_btn_id)
    .addEventListener("click", (e) => {
      e.stopPropagation();

      stopCapturing();

      onOffClassElement(imgSetClassName, false);
      onOffClassElement(captureSetClassName, true);
    });
}

async function applyMethodToCompleteBtn() {
  document
    .getElementById(complete_capturing_btn_id)
    .addEventListener("click", (e) => {
      e.stopPropagation();

      onOffClassElement(requestSetClassName, false);
      onOffClassElement(imgSetClassName, true);
    });
}

function applyMethodToDeleteBtn() {
  document.getElementById(delete_img_btn_id).addEventListener("click", (e) => {
    e.stopPropagation();

    try {
      const parent = document.getElementById(image_container_id);
      const child = document.getElementById(image_element_id);
      parent.removeChild(child);
      image_data = null;

      onOffClassElement(captureSetClassName, false);
      onOffClassElement(imgSetClassName, true);
    } catch (error) {
      console.error(error);
    }
  });
}

function applyMethodToRequestBtn() {
  document
    .getElementById(request_btn_id)
    .addEventListener("click", async (e) => {
      e.stopPropagation();

      try {
        const fileId = document.getElementById(fileId_input_id).value;
        const password = document.getElementById(password_input_id).value;

        const url = await composeUrl(fileId, password);

        const link_element = document.getElementById(google_script_link_id);
        link_element.href = url;
        link_element.innerText = "구글시트 입력";
      } catch (error) {
        console.error(error);
      }
    });
}

function getSavedIdAndPw() {
  getSavedFileId();
  getSavedPw();
}

function getSavedFileId() {
  const fileId = localStorage.getItem(nameOfSavedFileId);
  if (!fileId) {
    return;
  }

  document.getElementById(fileId_input_id).value = fileId;
}

function getSavedPw() {
  const pw = localStorage.getItem(nameOfSavedPassword);
  if (!pw) {
    return;
  }

  document.getElementById(password_input_id).value = fileId;
}

// true면 꺼지고, false면 켜짐
function onOffClassElement(className, OnOff) {
  const imageSets = document.getElementsByClassName(className);
  for (let element of imageSets) {
    element.hidden = OnOff;
    element.disabled = OnOff;
  }
}
