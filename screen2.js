const messageQueue = [
  `Chúc các chị em không chỉ có một ngày 20/10 hạnh phúc, mà còn có thật nhiều ngày bình thường được iu thương thấu hiểu`,
  `Chúc tất cả mấy bạn nữ A1ồn ăn mau chóng lớn, lớn nhanh lớn khỏe, đóng góp thật nhiều sản lượng vào GDP đất nước nhé `,
  `Wishing you a day full of joy!
    Happy Vietnamese Women's Day`,
  `Tháng Mười nắng ghé bên thềm,
Gửi nàng một chút êm đềm mùa thu.
Mong nàng chẳng phải ưu tư,
Ngày vui nối tiếp, tâm tư hóa lành.
Mong cho mắt biếc long lanh,
Nụ cười vẫn nở trên cành thanh xuân.
Đường đời dẫu có đôi lần,
Mây đen kéo đến, nắng gần sẽ sang.
Mong nàng chẳng phải vội vàng,
Cứ vui, cứ sống dịu dàng nhẹ tênh.
Nếu đời có lúc chênh vênh,
Mong nàng vẫn thấy bình yên trong lòng.
Hai mươi tháng Mười nắng hồng,
Gửi nàng hạnh phúc, gửi lòng mến thương.
Mong nàng đi khắp muôn phương,
Vẫn luôn được quý, được thương thật nhiều `,
    
  ` Mong nhan sắc của bạn ngày càng thăng hạng, tài khoản thật nhiều số dư và mọi muộn phiền đều đăng xuất `,
  ` Gửi cậu một ít kẹo ngọt cho ngày vui. Hi vọng rằng mọi chuyện cũng sẽ ngọt ngào như chiếc kẹo ấy ',
  ' Hihi, cảm ơn vì đã là một mảnh ghép của 12A1. Nhân ngày hôm nay
    Chúc mấy bạn ngày càng xinh đẹp, học hành thuận lợi và sớm đạt được điều mình muốn. 
    Về tình cảm, mình xin chúc cho chị em nào đang yêu sẽ ngày càng nồng thắm, ai đang có crush thì sớm được tỏ tình, còn không nữa thì sớm tìm được nửa kia.
    Chúc mọi người ạn sự may mắn !`,
  `Mùng 20/10 không chúc các chị em cái gì, chỉ mong các chị em luôn độc lập - tự do - hạnh phúc. Độc lập thì đường hoàng, không phải dựa dẫm vào ai thì có tự do, mà có tự do, là có hạnh phúc.`,
  `Chúc chị em luôn xinh đẹp, tình đầy tim, tiền đầy túi`,
  `Chúc các chị em phụ nữ có một ngày 8/3 thật ý nghĩa và hạnh phúc bên gia đình và bạn bè của mình nhé.`,
  `Chúc cho hành trình phía trước của mọi người sẽ như mong đợi, đạt những thành tựu mong muốn, đặt chân đến ngôi trường đại học mà mình mơ ước`,
  `Chúc các bạn nữ một ngày 20/10 vui vẻ, luôn vui tươi, xinh đẹp và yêu đời như mọi ngày. Mặc kệ những lời đàm tiếu xung quanh, vì bạn đẹp nhất khi là chính mình.`,
];

const LETTER_WIDTH = 60 * 1.51;
const LETTER_HEIGHT = 60;

const MAX_VY = 3;
const MIN_VY = 1.5;
const MAX_VX = 1;
const MIN_VX = -1;
const TIME_STEP = 800;
const RENDER_EACH_TIME = 1;
const MARGIN = 100;
const NUMBER_OF_VIDEO_LETTER = 5;
const LETTER_IMAGE = "./assets/letter1.svg";
const LETTER_VIDEO_IMAGE = "./assets/letter2.svg";
const VIDEO_ELEM = `
    <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/pPjaJRC8p9w?si=udMX1jz9b8tWQDdK"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
    ></iframe>
`;

const dialogElem = document.getElementById("dialog");
const dialogInner = document.getElementById("dialog-inner");
const dialogInnerMessage = document.querySelector("#dialog-inner .message");
const dialogInnerVideo = document.querySelector("#dialog-inner .video");

function moveFirstToEnd(array) {
  if (array.length > 0) {
    const firstElement = array.shift();
    array.push(firstElement);
  }
}

function getRandomRange(min, max) {
  return Math.random() * (max - min) + min;
}

function Letter(type = "message", message, screenWidth, onClick) {
  this.type = type;
  this.message = message;
  this.vx = getRandomRange(MIN_VX, MAX_VX);
  this.vy = getRandomRange(MIN_VY, MAX_VY);
  this.x = getRandomRange(MARGIN, screenWidth - MARGIN);
  this.y = -LETTER_WIDTH;
  this.elem = (() => {
    const element = document.createElement("img");
    element.className = "letter";
    element.src = LETTER_IMAGE;
    if (type === "video") {
      element.classList.add("video");
      element.src = LETTER_VIDEO_IMAGE;
    }
    if (getRandomRange(-1, 1) > 0) {
      element.classList.add("rotate1");
    } else {
      element.classList.add("rotate2");
    }
    element.style.width = LETTER_WIDTH + "px";
    element.style.height = LETTER_HEIGHT + "px";
    element.style.left = this.x - LETTER_WIDTH / 2 + "px";
    element.style.top = this.y + "px";
    element.addEventListener("click", (e) => {
      dialogElem.classList.add("show");
      onClick();
    });
    return element;
  })();
}

setTimeout(() => {
  console.log(window.innerHeight, window.innerWidth);
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  const screenElem = document.getElementById("screen-2");
  screenElem.style.display = "block";
  const MESSAGES = [];
  const letterList = [];
  let letterQueue = [];
  for (let i = 1; i <= 100; i++) {
    MESSAGES.push(i);
  }
  for (let i = 0; i < NUMBER_OF_VIDEO_LETTER + MESSAGES.length; i++) {
    if (i % Math.round(MESSAGES.length / NUMBER_OF_VIDEO_LETTER) === 0) {
      letterQueue.push(
        new Letter("video", "", screenWidth, () => {
          dialogInner.classList.add("video");
          dialogInnerMessage.innerText = "";
          dialogInnerVideo.innerHTML = VIDEO_ELEM;
        })
      );
    } else {
      letterQueue.push(
        new Letter("message", "", screenWidth, () => {
          dialogInnerMessage.innerText = messageQueue[0];
          moveFirstToEnd(messageQueue);
          dialogInner.classList.remove("video");
          dialogInnerVideo.innerHTML = "";
        })
      );
    }
  }

  dialogInner.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  dialogElem.addEventListener("click", (e) => {
    e.target.classList.remove("show");
  });

  let previousTimeStamp;
  let timeCount = 0;

  function run(timeStamp) {
    if (previousTimeStamp === undefined) {
      previousTimeStamp = timeStamp;
    }
    const deltaTime = timeStamp - previousTimeStamp;
    timeCount += deltaTime;

    const willRemoveElemIndexs = [];
    for (let i = 0; i < letterList.length; i++) {
      letterList[i].x += letterList[i].vx;
      letterList[i].y += letterList[i].vy;

      letterList[i].elem.style.left = letterList[i].x - LETTER_WIDTH / 2 + "px";
      letterList[i].elem.style.top = letterList[i].y + "px";

      if (letterList[i].y > screenHeight + LETTER_HEIGHT) {
        willRemoveElemIndexs.push(i);
      }
    }

    for (let i = willRemoveElemIndexs.length - 1; i >= 0; i--) {
      screenElem.removeChild(letterList[willRemoveElemIndexs[i]].elem);
      letterList[willRemoveElemIndexs[i]].x = getRandomRange(
        MARGIN,
        screenWidth - MARGIN
      );
      letterList[willRemoveElemIndexs[i]].y = -LETTER_WIDTH;
      letterList.splice(willRemoveElemIndexs[i], 1);
    }

    if (timeCount > TIME_STEP) {
      for (i = 0; i < RENDER_EACH_TIME; i++) {
        const letter = letterQueue[0];
        letterList.push(letter);
        screenElem.appendChild(letter.elem);
        moveFirstToEnd(letterQueue);
      }

      timeCount = 0;
    }
    previousTimeStamp = timeStamp;

    window.requestAnimationFrame(run);
  }
  window.requestAnimationFrame(run);
}, 3000);
