function getFirebaseDb() {
    // Your web app's Firebase configuration
    var firebaseConfig = {
    apiKey: "AIzaSyANVqen5gem3ef5Mu54lSyuRnaBHLB59oo",
    authDomain: "french-word-of-the-day-1f8ef.firebaseapp.com",
    databaseURL: "https://french-word-of-the-day-1f8ef.firebaseio.com",
    projectId: "french-word-of-the-day-1f8ef",
    storageBucket: "french-word-of-the-day-1f8ef.appspot.com",
    messagingSenderId: "981145687322",
    appId: "1:981145687322:web:a638af67d04766a0ee88a3"
    };

    //Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    //Create database instance
    var db = firebase.firestore();
    
    return db;
}

// Get words in the given date range
async function getFirebaseWords(startDate, endDate) {
    //Initialise Firebase connection
    let db = getFirebaseDb();
    //Get the reference to the word
    const results = db.collection("words").where("datetest", ">=", startDate).where("datetest", "<=", endDate);
    results.get().then((querySnapshot) => { 
        /*for (let doc of querySnapshot.docs) {
            console.log(doc.id, doc.data());
        }*/
        createWordElements(querySnapshot.docs.map((doc) => ({
            date : doc.id,
            data: doc.data()
        })));
     });
}

function createWordElements(words) {
    const elements = [];

    for (let word of words) {
        let dayContainer = document.createElement("div");
        dayContainer.className = "day-container";

        let date = document.createElement("p");
        date.className = "date";
        date.innerHTML = word.data.datetest.toDate().toLocaleString("en-gb", {dateStyle: "full"}).toUpperCase();

        let wordContainer = document.createElement("div");
        wordContainer.className = "word-container";

        let mainDetails = document.createElement("div");
        
        let frenchWord = document.createElement("p");
        frenchWord.className = "french-word";
        frenchWord.innerHTML = word.data.frenchWord;

        let wordType = document.createElement("p");
        wordType.className = "word-type";
        wordType.innerHTML = word.data.type;

        let gender = document.createElement("p");
        gender.className = "word-type";
        gender.innerHTML = word.data.gender;

        let englishWord = document.createElement("p");
        englishWord.className = "english-word";
        englishWord.innerHTML = word.data.englishWord;

        let sentencesContainer = document.createElement("div");
        sentencesContainer.className = "sentences-container";

        let frenchSentence = document.createElement("p");
        frenchSentence.className = "french-sentence";
        frenchSentence.innerHTML = word.data.frenchExample;

        let englishSentence = document.createElement("p");
        englishSentence.className = "english-sentence";
        englishSentence.innerHTML = word.data.englishExample;

        // Setup element tree
        dayContainer.appendChild(date);
        dayContainer.appendChild(wordContainer);

        wordContainer.appendChild(mainDetails);
        mainDetails.appendChild(frenchWord);
        mainDetails.appendChild(wordType);
        if (word.data.gender != "N/A") {
            mainDetails.appendChild(gender);
        }
        wordContainer.appendChild(englishWord);

        dayContainer.appendChild(sentencesContainer);
        sentencesContainer.appendChild(frenchSentence);
        sentencesContainer.appendChild(englishSentence);

        elements.push(dayContainer);
    }

    displayFirebaseWords(elements);
}


// Display the array of word elements passed
async function displayFirebaseWords(wordElements) {
    const wordContainer = document.getElementById("word-container");
    for (let wordElement of wordElements) {
        wordContainer.appendChild(wordElement);
    }
}

// End date is today at 23:59
const endDate = new Date();
endDate.setHours(23);
endDate.setMinutes(59);

// Start date is a week ago at 00:00
startDate = new Date();
startDate.setDate(endDate.getDate() - 7);
startDate.setHours(0);
startDate.setMinutes(0);

getFirebaseWords(startDate, endDate);


