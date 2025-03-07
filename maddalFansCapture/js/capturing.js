// 사용자 설정 변수
const totalHeight = 7000; // 캡처할 전체 높이 (수동으로 설정)

// 기본 변수
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
var keepCapturing = false;

// 메서드
async function captureScreen() {
  let startOfY_value = document.getElementById("startOfY").value;
  let endOfY_value = document.getElementById("endOfY").value;

  if (!startOfY_value || !endOfY_value) {
    alert("시작점과 끝 점을 입력해주세요.");
    return;
  }

  if (Number(startOfY_value) === NaN || Number(endOfY_value) === NaN) {
    alert("시작점과 끝 점에 숫자를 입력해주세요.");
    return;
  }

  const captureStartY = window.innerHeight * (startOfY_value / 100); // 캡쳐할 화면높이(시작)
  const captureEndY = window.innerHeight * (endOfY_value / 100); // 캡쳐할 화면높이(끝)
  const captureHeight = captureEndY - captureStartY;

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
    console.error("화면 캡처 권한이 필요합니다.");
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
        0, // 이미지 내 x 좌표
        captureStartY, // 이미지 내 y 좌표
        canvas.width, // 이미지 내 좌표를 기준으로 그려질 그림의 가로 길이
        captureHeight, // 이미지 내 좌표를 기준으로 그려질 그림의 세로 길이
        0, // 캔버스 내 x 좌표
        capturedHeight, // 캔버스 내 y
        canvas.width, // 캔버스에 그릴 너비
        captureHeight // 캔버스에 그릴 높이
      );

      capturedHeight += captureHeight;
    }, 1000);
  } catch (err) {
    console.error("화면 캡처 실패:");
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
