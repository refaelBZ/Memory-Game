const cardsArray = [
  "<i class='fa-solid fa-house'></i>",
  "<i class='fa-solid fa-user'></i>",
  "<i class='fa-solid fa-cloud'></i>",
  "<i class='fa-solid fa-music'></i>",
  "<i class='fa-solid fa-ghost'></i>",
  // "<i class='fa-solid fa-pen'></i>",
  // "<i class='fa-solid fa-gear'></i>",
  // "<i class='fa-solid fa-lock'></i>",
  // "<i class='fa-solid fa-droplet'></i>",
  // "<i class='fa-solid fa-camera'></i>"
];




let timerRunning = false;
let startTime;
let timerInterval;

function startTimer() {
  if (!timerRunning) {
    startTime = new Date();
    timerInterval = setInterval(updateTimer, 1000);
    timerRunning = true;
  }
}

function stopTimer() {
  clearInterval(timerInterval);
  timerRunning = false;
}

function updateTimer() {
  const currentTime = new Date();
  const elapsedTime = currentTime - startTime;
  const minutes = Math.floor(elapsedTime / 60000);
  const seconds = Math.floor((elapsedTime % 60000) / 1000);
  
  document.getElementById("timer").innerText = `Time: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}




let clicksCounter = 0;

function clicks() {
  clicksCounter++;
  document.getElementById("score").innerText = `Clicks: ${clicksCounter}`;
}




function shuffle(arrayForShuf) {
  for (let i = arrayForShuf.length - 1; i > 0; i--)         // Define variable i starting at end of array (last index)
  {
    const random = Math.floor(Math.random() * (i + 1)); // Generate random number between 0 and i for random valid index
    const temp = arrayForShuf[i]; // Store current value at i in temporary variable
    arrayForShuf[i] = arrayForShuf[random]; // Swap value at i with value at random index
    arrayForShuf[random] = temp; // Swap value at random index with temporary value
  }
  return arrayForShuf;
}

function isMatch(cardIndex1, cardIndex2)//פונקציה שמקבלת אינדקסים ומערך, ובודקת האם האלמנטים של האינדקסים זהים. אם כן מחזירה טרו
{
  return cardIndex1 == cardIndex2;
}




function resetGame() {
  stopTimer();
  document.getElementById("timer").innerText = "0:00";
  const boardElement = document.getElementById("board");
  boardElement.innerHTML = ''; // מחיקת כל הקלפים מהלוח
  init(); // יצירה חוזרת של הלוח עם קלפים מעורבבים
}



document.getElementById("reset").addEventListener("click", resetGame);



function init() {

  let matched = 0;
  //יצירת מערך חדש משוכפל בעצמו ואז שליחתו לפונקציה שמערבבת אותו
  let shuffledArray = (shuffle(cardsArray.concat(cardsArray)));

  let open = []; // מערך ריק שבתוכו יהיו הקלפים הפתוחים

  //הוספת כרטיסים בהתאם לכמות שנרצה, וגם קביעה מה קורה בלחיצה על אחד מהכרטיסים
  const boardElement = document.getElementById("board");
  
  shuffledArray.forEach((cardValue) => {

    const cardElement = document.createElement("div");
    boardElement.appendChild(cardElement);
    cardElement.classList.add("card");
    cardElement.value = cardValue;
    cardElement.onclick = (e) => {

      
      clicks();
      
      if (!timerRunning) {
        startTimer();
      }

      if (!open.includes(cardElement) && open.length < 2) // אם הכרטיס לא נמצא במערך הפתוחים, וגם אורך המערך הזה קטן משני קלפים
      {
        cardElement.innerHTML = cardValue;
        cardElement.style.backgroundColor = '#c8dfdd';
        open.push(cardElement);  // מוסיף את הכרטיס למערך הפתוחים
      }

      if (open.length == 2) //אם יש שני כרטיסים פתוחים, תבדוק את התנאי הבא
      {
        if (isMatch(open[0].value, open[1].value)) //  בדיקה האם הם זהים באמצעות קריאה לפונקציה שבודקת את זה, ובאמצעות שליחת הערכים שלהם אליה
        {
          open[0].onclick = ''; // ביטול היכולת ללחוץ, כלומר ביטול האון קליק לשני הקלפים
          open[1].onclick = '';
          open = []; // איפוס המערך כדי שיתחילו להתקבל שוב קלפים חדשים כשהשחקן ילחץ על שני קלפים חדשים.
          matched += 2;
          if (matched === shuffledArray.length) {
            stopTimer();
          }

        }
        else // אם הקלפים לא זהים, אז:
        {
          setTimeout(() => {
            open[0].style.backgroundColor = ''; //ביטול צבע הרקע החדש שלהם והחזרתם להיות סגולים
            open[1].style.backgroundColor = '';
            open = [];
          }, "1200");

        }
      }
    }
  });



}

document.addEventListener("DOMContentLoaded", function() {
  const nameForm = document.getElementById("nameForm");
  const nameInput = document.getElementById("name");
  const displayName = document.getElementById("displayName");
  const namePrompt = document.getElementById("namePrompt");

  // הצגת חלון הצף בטעינת הדף
  namePrompt.style.display = "block";

  nameForm.addEventListener("submit", function(event) {
    event.preventDefault();
    const name = nameInput.value;
    localStorage.setItem("name", name); // שמירת השם ב-LocalStorage
    displayName.innerText = `Hey, ${name}`; // הצגת השם
    namePrompt.style.display = "none"; // הסתרת החלון הצף
  });

  // טעינת השם מ-LocalStorage אם קיים
  const savedName = localStorage.getItem("name");
  if (savedName) {
    displayName.innerText = `שלום, ${savedName}`;
  }


});


init();































  // // יצירת משתנה כוכביות שחוזר על עצמו כאורך המערך, כאשר יש מרווח בין הכוכביות
  // // let stars = "*".repeat(shuffledArray.length).split("");
  // //הדפסת הכוכביות למשתמש

  // let cardsRevealed = 0;

  // while (cardsRevealed < shuffledArray.length && !isMatch(stars.toString(), shuffledArray.toString())) {

  //   // let cardIndex1 = getIndex();
  //   stars[cardIndex1] = shuffledArray[cardIndex1]; //הזנת הקלף הראשון שנמצא במערך המעורבב לתוך מערך הכוכביות, לפי האינדקס שהזין המשתמש
  //   let card1 = shuffledArray[cardIndex1]
  //   alert(stars); // מציג למהתמש את הקלף הראשון שבחר, בתוך מערך הכוכביות
  //   // let cardIndex2 = getIndex();
  //   stars[cardIndex2] = shuffledArray[cardIndex2]; //הזנת הקלף השני שנמצא במערך המעורבב לתוך מערך הכוכביות, לפי האינדקס שהזין המשתמש
  //   let card2 = shuffledArray[cardIndex2] // הכנסת האלמנט שבאינדקס השני שבחר המשתמש לתוך המשתנה כרטיס2
  //   alert(stars); // מציג למהתמש את שני הקלפים, בתוך מערך הכוכביות

  //   let match = isMatch(card1, card2);; //קריאה לפונקציה לבדוק האם הקלפים זהים

  //   if (match) {
  //     stars[cardIndex1] = card1;
  //     stars[cardIndex2] = card2;
  //     cardsRevealed += 2;


  //   } else {
  //     stars[cardIndex1] = "*";
  //     stars[cardIndex2] = "*";
  //   }

  // }

  // alert("Congrats! You've matched all the cards!");


