// 사용자 설정 변수
const totalHeight = 5500; // 캡처할 전체 높이 (수동으로 설정)
const captureStartY = Math.floor(window.innerHeight * 0.47); // 캡쳐할 화면높이(시작)
const captureEndY = Math.floor(window.innerHeight * 0.8); // 캡쳐할 화면높이(끝)

// 기본 변수
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
let keepCapturing = false;
const captureHeight = captureEndY - captureStartY;

// 메서드
async function captureScreen() {
  let displayStream = null; // 화면 캡처를 위한 스트림
  let captureInterval = null; // 캡처를 위한 setInterval 저장 변수

  // 캡쳐 스트림 초기화
  try {
    if (!displayStream) {
      displayStream = await navigator.mediaDevices.getDisplayMedia({
        video: {
          cursor: "none", // 마우스 커서 숨기기
          mediaSource: "screen",
        },
      });
    }
  } catch (err) {
    console.error("화면 캡처 권한이 필요합니다 :", err);
    return;
  }

  // 캡쳐
  try {
    // 기본 세팅
    let capturedHeight = 0; // 현재까지 캡처한 높이
    keepCapturing = true;
    canvas.width = window.innerWidth;
    canvas.height = totalHeight; // 전체 캡처할 높이로 설정

    // 일정 시간마다 캡처하는 작업 시작
    captureInterval = setInterval(async () => {
      // 전체 캡처가 끝나면 인터벌 중지
      if (!keepCapturing) {
        // 인터벌 내장 메서드
        clearInterval(captureInterval);

        // 스트림 정리
        if (displayStream) {
          displayStream.getTracks().forEach((track) => track.stop());
          displayStream = null; // 스트림 정리
        }

        // 캔버스에 입력된 데이터를 이미지화 하여 html 요소로 저장
        image_data = canvas.toDataURL("image/png");
        createImgElement(image_data);

        return; // 종료
      }

      // 화면 캡처 진행
      const video = document.createElement("video");
      video.srcObject = displayStream; // 이미 생성된 displayStream을 재사용
      await video.play();

      // 캡처된 부분을 캔버스에 그리기
      ctx.drawImage(
        video, // video element
        0, // X좌표 (전체 화면 캡처)
        captureStartY, // 캡처 시작 Y 좌표
        canvas.width, // 캡처할 영역의 너비 (전체 화면)
        captureHeight, // 캡처할 영역의 높이
        0, // 캔버스에 그릴 X 좌표 (캔버스의 좌상단에 그리기)
        capturedHeight, // 캔버스에 그릴 Y 좌표
        canvas.width, // 캔버스에 그릴 너비
        captureHeight // 캔버스에 그릴 높이
      );

      capturedHeight += captureHeight;
    }, 1000);
  } catch (err) {
    console.error("화면 캡처 실패:", err);
    // 오류 발생 시 스트림 정리
    if (displayStream) {
      displayStream.getTracks().forEach((track) => track.stop());
      displayStream = null; // 스트림 정리
    }
  }
}

function stopCapturing() {
  keepCapturing = false;
}

function createImgElement(image_data) {
  const imgElement = document.createElement("img");

  imgElement.id = image_element_id;
  imgElement.src = image_data;
  imgElement.style.maxWidth = "100%"; // 화면 크기에 맞게 조정
  imgElement.style.height = "auto"; // 비율에 맞게 높이 자동 설정

  document.getElementById(image_container_id).appendChild(imgElement);
}
