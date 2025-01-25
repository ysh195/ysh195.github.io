// 사용자 설정 변수
const aws_lambda_url =
  "https://jpjspmelb1.execute-api.ap-northeast-2.amazonaws.com/default/extractTextFromBase64WithGoogleVision";

// 구글 스크립트 쪽은 요청이 아니라 url 이동으로 하기 때문에 따로 함수 없음

async function composeUrl(fileId, password) {
  const base64Image = image_data.split(",")[1];
  const extracted_text = await extractTextFromBase64Image(
    base64Image,
    fileId,
    password
  );
  const cleaned_text = cleanText(extracted_text);

  return `${google_script_url}?id=${fileId}&data=${cleaned_text}`;
}

// aws lambda에 요청 보내기(그 안에서 google vision api로 텍스트 추출)
async function extractTextFromBase64Image(base64Image, fileId, password) {
  const data = {
    id: fileId,
    pw: password,
    base64: base64Image,
  };

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  try {
    const res = await fetch(aws_lambda_url, options);
    const result = await res.json();
    console.log(result);

    return result;
  } catch (error) {
    console.error("aws lambda 호출 실패");
  }
}

// 텍스트 정리하고, url에 넣어서 구글시트에 GET요청하기 좋게 다시 구성
function cleanText(text) {
  const roles = ["리더", "서브리더", "멤버"];
  const list = text.split("\n");
  console.log(list);

  let compiled = [];
  let playerName = "";

  // 텍스트에서 필요한 정보만 추리기
  for (let i = 0; i < list.length; i++) {
    let str = simplifyText(list[i]);

    if (roles.includes(str)) {
      playerName = getCleanName(list[i + 1]);

      for (let j = i + 2; j < list.length; j++) {
        if (list[j].includes(",")) {
          let num = getCleanNumber(list[j]);

          if (num !== "") {
            let number = Number(num);
            const elementOfList = { playerName, number };
            compiled.push(elementOfList);

            i = j;
            break;
          }
        }
      }
    }
  }

  // 중복값 제거
  const uniqueData = compiled.filter(
    (value, index, self) =>
      index === self.findIndex((t) => t.playerName === value.playerName)
  );

  // url에 넣을 형태로 변환
  const result_text = uniqueData
    .map((e) => `${e.playerName}-${e.number}`)
    .join("_");

  return result_text;
}

function simplifyText(str) {
  return str.replace(/[\s"]/g, "");
}

function getCleanName(str) {
  return simplifyText(str)
    .replace(/\((i(, i)*)?\)|i|[()\-_]/g, "")
    .replace(/\bi\b/g, "");
}

function getCleanNumber(str) {
  return simplifyText(str).replace(/[^0-9]/g, "");
}
